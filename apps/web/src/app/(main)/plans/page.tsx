'use client';

import React from 'react';
import Link from 'next/link';
import { BillingCycle, CheckoutInputSchema, SubscriptionPlan } from '@commet/shared';
import { ApiError, billingApi, type SubscriptionInfo } from '@/lib/api';
import { Badge, Button, Card, Switch, Tabs } from '@/components/ui';

const CYCLE_TABS = [
  { id: BillingCycle.MONTHLY, label: 'Mensal' },
  { id: BillingCycle.ANNUAL, label: 'Anual (~20% off)' },
];

const PLANS: {
  plan: SubscriptionPlan;
  name: string;
  emoji: string;
  age: string;
  monthly: string;
  annual: string;
  cardTone: 'orange' | 'sky' | 'lavender';
  badgeTone: 'orange' | 'yellow' | 'lavender';
  perks: string[];
  featured?: boolean;
}[] = [
  {
    plan: SubscriptionPlan.COMETA,
    name: 'Cometa',
    emoji: '🌟',
    age: '0–12 meses',
    monthly: '19,90',
    annual: '189,90',
    cardTone: 'orange',
    badgeTone: 'orange',
    perks: ['Conteúdo 0–12m', '1 perfil de bebê', 'Modo áudio', 'PT-BR'],
  },
  {
    plan: SubscriptionPlan.GALAXIA,
    name: 'Galáxia',
    emoji: '🌌',
    age: '0–3 anos · all-access',
    monthly: '34,90',
    annual: '329,90',
    cardTone: 'lavender',
    badgeTone: 'lavender',
    perks: ['Todo o conteúdo', 'Até 3 perfis', 'Modo áudio', 'Acesso antecipado'],
    featured: true,
  },
  {
    plan: SubscriptionPlan.ESTRELA,
    name: 'Estrela',
    emoji: '⭐',
    age: '1–2 anos',
    monthly: '24,90',
    annual: '239,90',
    cardTone: 'sky',
    badgeTone: 'yellow',
    perks: ['Conteúdo 1–2a', '1 perfil de bebê', 'Modo áudio', 'PT-BR'],
  },
];

export default function PlansPage() {
  const [cycle, setCycle] = React.useState<BillingCycle>(BillingCycle.MONTHLY);
  const [bilingual, setBilingual] = React.useState(false);
  const [subscription, setSubscription] = React.useState<SubscriptionInfo | null>(null);
  const [submitting, setSubmitting] = React.useState<SubscriptionPlan | null>(null);
  const [notice, setNotice] = React.useState<string | null>(null);
  const [banner, setBanner] = React.useState<string | null>(null);

  React.useEffect(() => {
    billingApi
      .subscription()
      .then((r) => setSubscription(r.data ?? null))
      .catch(() => setSubscription(null));
  }, []);

  async function subscribe(plan: SubscriptionPlan) {
    setNotice(null);
    setBanner(null);
    const origin = window.location.origin;
    const parsed = CheckoutInputSchema.safeParse({
      planId: plan,
      billingCycle: cycle,
      hasBilingualAddon: bilingual,
      successUrl: `${origin}/home?checkout=success`,
      cancelUrl: `${origin}/plans`,
    });
    if (!parsed.success) {
      setBanner('Não foi possível montar o checkout. Tente novamente.');
      return;
    }

    setSubmitting(plan);
    try {
      const res = await billingApi.checkout(parsed.data);
      const url = res.data?.checkoutUrl;
      if (url?.startsWith('mock:')) {
        setNotice(
          '✅ Checkout de demonstração criado — em produção você seria redirecionado ao Stripe Checkout (PIX, Boleto e Cartão).',
        );
      } else if (url?.startsWith('http')) {
        window.location.assign(url);
      } else {
        setNotice('Checkout criado, mas o backend ainda não retornou a URL do Stripe (stub).');
      }
    } catch (err) {
      if (err instanceof ApiError && (err.statusCode === 401 || err.statusCode === 0)) {
        setBanner('Entre para assinar um plano.');
      } else {
        setBanner(err instanceof ApiError ? err.message : 'Erro inesperado. Tente novamente.');
      }
    } finally {
      setSubmitting(null);
    }
  }

  const addonLabel = cycle === BillingCycle.MONTHLY ? '+R$ 14,90/mês' : '+R$ 139,90/ano';

  return (
    <main
      style={{
        maxWidth: 'var(--container-lg)',
        margin: '0 auto',
        padding: 'var(--space-8) var(--space-6)',
      }}
    >
      <span className="cb-eyebrow">Assinatura</span>
      <h1 style={{ margin: '4px 0 var(--space-2)' }}>Um plano para cada fase</h1>
      <p style={{ margin: '0 0 var(--space-6)', color: 'var(--text-muted)' }}>
        7 dias grátis em qualquer plano · cancele quando quiser.
      </p>

      {subscription && (
        <Card tone="mint" style={{ marginBottom: 'var(--space-6)' }}>
          <span style={{ color: 'var(--text-body)' }}>
            Você já assina o plano <strong>{subscription.plan}</strong>
            {subscription.hasBilingualAddon ? ' + Bilíngue' : ''}.
          </span>
        </Card>
      )}

      {banner && (
        <Card tone="orange" style={{ marginBottom: 'var(--space-6)' }}>
          <span style={{ color: 'var(--text-body)' }}>{banner} </span>
          <Link href="/login" style={{ color: 'var(--text-link)', fontWeight: 700 }}>
            Entrar
          </Link>
        </Card>
      )}

      {notice && (
        <Card tone="mint" style={{ marginBottom: 'var(--space-6)' }}>
          <span style={{ color: 'var(--text-body)' }}>{notice}</span>
        </Card>
      )}

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 'var(--space-4)',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 'var(--space-6)',
        }}
      >
        <Tabs tabs={CYCLE_TABS} value={cycle} onChange={(id) => setCycle(id as BillingCycle)} />
        <Switch
          checked={bilingual}
          onChange={setBilingual}
          label={`Add-on bilíngue PT-BR ↔ EN (${addonLabel})`}
        />
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: 'var(--space-6)',
          alignItems: 'start',
        }}
      >
        {PLANS.map((p) => {
          const price = cycle === BillingCycle.MONTHLY ? p.monthly : p.annual;
          const per = cycle === BillingCycle.MONTHLY ? '/mês' : '/ano';
          return (
            <Card
              key={p.plan}
              tone={p.cardTone}
              style={
                p.featured
                  ? { boxShadow: 'var(--shadow-lg)', border: '2px solid var(--commet-lavender)' }
                  : undefined
              }
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: 8,
                }}
              >
                <h3 style={{ margin: 0 }}>
                  {p.emoji} {p.name}
                </h3>
                {p.featured ? (
                  <Badge tone="lavender" solid>
                    Mais popular
                  </Badge>
                ) : (
                  <Badge tone={p.badgeTone}>{p.age}</Badge>
                )}
              </div>
              {p.featured && (
                <p
                  style={{
                    margin: '6px 0 0',
                    fontSize: 'var(--fs-sm)',
                    color: 'var(--text-muted)',
                  }}
                >
                  {p.age}
                </p>
              )}

              <p
                style={{
                  margin: '12px 0',
                  fontSize: 'var(--fs-h2)',
                  fontWeight: 800,
                  color: 'var(--text-strong)',
                }}
              >
                R$ {price}
                <span
                  style={{ fontSize: 'var(--fs-sm)', fontWeight: 400, color: 'var(--text-muted)' }}
                >
                  {' '}
                  {per}
                </span>
              </p>
              {bilingual && (
                <p
                  style={{
                    margin: '-6px 0 12px',
                    fontSize: 'var(--fs-xs)',
                    color: 'var(--text-muted)',
                  }}
                >
                  {addonLabel} com o add-on bilíngue
                </p>
              )}

              <ul
                style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: '0 0 var(--space-5)',
                  display: 'grid',
                  gap: 8,
                }}
              >
                {p.perks.map((perk) => (
                  <li key={perk} style={{ fontSize: 'var(--fs-sm)', color: 'var(--text-body)' }}>
                    ✓ {perk}
                  </li>
                ))}
                {bilingual && (
                  <li style={{ fontSize: 'var(--fs-sm)', color: 'var(--text-body)' }}>
                    ✓ Conteúdo em inglês (EN) com pronúncia nativa
                  </li>
                )}
              </ul>

              <Button
                fullWidth
                variant={p.featured ? 'secondary' : 'primary'}
                disabled={submitting !== null}
                onClick={() => subscribe(p.plan)}
              >
                {submitting === p.plan ? 'Criando checkout…' : 'Assinar'}
              </Button>
            </Card>
          );
        })}
      </div>

      <p
        style={{
          textAlign: 'center',
          color: 'var(--text-muted)',
          fontSize: 'var(--fs-sm)',
          marginTop: 'var(--space-8)',
        }}
      >
        Pagamento seguro via Stripe · PIX, Boleto e Cartão. O plano dá acesso ao conteúdo da faixa
        etária correspondente.
      </p>
    </main>
  );
}
