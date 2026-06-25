import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Link from 'next/link';
import { SubscriptionPlan } from '@commet/shared';
import { Avatar, Badge, Card } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Commet Baby — Conteúdo seguro que vira aprendizagem',
  description:
    'Histórias, músicas e descobertas para bebês de 0 a 3 anos. Conteúdo curado por faixa etária, bilíngue (PT-BR/EN) e com modo áudio. Conteúdo seguro, aprovado por famílias.',
  keywords: [
    'bebê',
    'educação infantil',
    '0 a 3 anos',
    'conteúdo infantil',
    'bilíngue',
    'histórias',
    'músicas',
  ],
  openGraph: {
    title: 'Commet Baby — Pequenas descobertas, grandes começos',
    description:
      'Streaming educacional para bebês de 0 a 3 anos: histórias, músicas e metas de aprendizagem.',
    type: 'website',
    images: ['/brand/logo-lockup.png'],
  },
};

/* ------------------------------- primitives ------------------------------- */

function CtaLink({
  href,
  children,
  variant = 'primary',
  size = 'md',
}: {
  href: string;
  children: ReactNode;
  variant?: 'primary' | 'ghost';
  size?: 'md' | 'lg';
}) {
  const sizes = {
    md: { height: 'var(--control-h-md)', padding: '0 24px', fontSize: 'var(--fs-body)' },
    lg: { height: 'var(--control-h-lg)', padding: '0 32px', fontSize: 'var(--fs-lg)' },
  } as const;
  const variants = {
    primary: {
      background: 'var(--action-primary)',
      color: 'var(--text-onbrand)',
      boxShadow: 'var(--shadow-orange)',
      border: 'none',
    },
    ghost: {
      background: 'var(--paper)',
      color: 'var(--text-strong)',
      boxShadow: 'var(--shadow-sm)',
      border: '1.5px solid var(--border-card)',
    },
  } as const;
  return (
    <Link
      href={href}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        borderRadius: 'var(--radius-pill)',
        fontWeight: 800,
        textDecoration: 'none',
        whiteSpace: 'nowrap',
        ...sizes[size],
        ...variants[variant],
      }}
    >
      {children}
    </Link>
  );
}

function Section({ children, style }: { children: ReactNode; style?: React.CSSProperties }) {
  return (
    <section style={{ width: '100%', padding: 'var(--space-12) var(--space-6)', ...style }}>
      <div style={{ maxWidth: 'var(--container-lg)', margin: '0 auto' }}>{children}</div>
    </section>
  );
}

/* --------------------------------- data ----------------------------------- */

const VALUES = ['Seguro', 'Afetivo', 'Inteligente', 'Imaginativo', 'Crescimento'];

const FEATURES: { icon: string; title: string; desc: string }[] = [
  {
    icon: 'book',
    title: 'Histórias & músicas',
    desc: 'Curadoria por faixa etária, do recém-nascido aos 3 anos.',
  },
  {
    icon: 'moon',
    title: 'Hora de dormir',
    desc: 'Canções de ninar e rotinas calmas para o soninho.',
  },
  { icon: 'star', title: 'Estímulo na medida', desc: 'Conteúdo que estimula sem superestimular.' },
  {
    icon: 'medal',
    title: 'Metas de aprendizagem',
    desc: 'Acompanhe marcos de desenvolvimento do bebê.',
  },
  {
    icon: 'music-note',
    title: 'Modo áudio',
    desc: 'Reprodução em background — ideal para o carro e o sono.',
  },
  { icon: 'cap', title: 'Bilíngue PT-BR ↔ EN', desc: 'Add-on opcional com pronúncia nativa.' },
];

const PLANS: {
  plan: SubscriptionPlan;
  name: string;
  age: string;
  price: string;
  cardTone: 'orange' | 'sky' | 'lavender';
  badgeTone: 'orange' | 'yellow' | 'lavender';
  perks: string[];
  featured?: boolean;
}[] = [
  {
    plan: SubscriptionPlan.COMETA,
    name: 'Cometa',
    age: '0–12 meses',
    price: '19,90',
    cardTone: 'orange',
    badgeTone: 'orange',
    perks: ['Conteúdo 0–12m', '1 perfil', 'Modo áudio', 'PT-BR'],
  },
  {
    plan: SubscriptionPlan.GALAXIA,
    name: 'Galáxia',
    age: '0–3 anos',
    price: '34,90',
    cardTone: 'lavender',
    badgeTone: 'lavender',
    perks: ['Todo o conteúdo', 'Até 3 perfis', 'Modo áudio', 'PT-BR'],
    featured: true,
  },
  {
    plan: SubscriptionPlan.ESTRELA,
    name: 'Estrela',
    age: '1–2 anos',
    price: '24,90',
    cardTone: 'sky',
    badgeTone: 'yellow',
    perks: ['Conteúdo 1–2a', '1 perfil', 'Modo áudio', 'PT-BR'],
  },
];

const CHARACTERS: { file: string; name: string; ring: string }[] = [
  { file: 'char-cometinho', name: 'Cometinho', ring: 'cometinho' },
  { file: 'char-lila', name: 'Lila', ring: 'lila' },
  { file: 'char-dino', name: 'Dino', ring: 'dino' },
  { file: 'char-nina', name: 'Nina', ring: 'nina' },
  { file: 'char-nuvito', name: 'Nuvito', ring: 'nuvito' },
];

/* --------------------------------- page ----------------------------------- */

export default function HomePage() {
  return (
    <>
      {/* Top nav */}
      <header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 'var(--space-4)',
          maxWidth: 'var(--container-lg)',
          margin: '0 auto',
          padding: 'var(--space-4) var(--space-6)',
        }}
      >
        <img src="/brand/logo-lockup.png" alt="Commet Baby" style={{ height: 36 }} />
        <nav style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
          <CtaLink href="/login" variant="ghost">
            Entrar
          </CtaLink>
          <CtaLink href="/register">Criar conta</CtaLink>
        </nav>
      </header>

      {/* Hero */}
      <Section style={{ paddingTop: 'var(--space-10)' }}>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 'var(--space-10)',
            alignItems: 'center',
          }}
        >
          <div style={{ flex: '1 1 320px', minWidth: 280 }}>
            <span className="cb-eyebrow">Para bebês de 0 a 3 anos</span>
            <h1 style={{ fontSize: 'clamp(2.25rem, 6vw, var(--fs-display))', margin: '8px 0 0' }}>
              Pequenas <span style={{ color: 'var(--commet-orange)' }}>descobertas</span>, grandes{' '}
              <span style={{ color: 'var(--commet-lavender)' }}>começos</span>.
            </h1>
            <p
              style={{
                fontSize: 'var(--fs-lg)',
                color: 'var(--text-body)',
                maxWidth: 520,
                marginTop: 'var(--space-4)',
              }}
            >
              Conteúdo direcionado que transforma tempo de tela em tempo de aprendizagem —
              histórias, músicas e descobertas, com opção bilíngue e modo áudio.
            </p>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 'var(--space-3)',
                marginTop: 'var(--space-6)',
              }}
            >
              <CtaLink href="/register" size="lg">
                Começar agora →
              </CtaLink>
              <CtaLink href="#planos" variant="ghost" size="lg">
                Ver planos
              </CtaLink>
            </div>
            <p
              style={{
                fontSize: 'var(--fs-sm)',
                color: 'var(--text-muted)',
                marginTop: 'var(--space-4)',
              }}
            >
              7 dias grátis · cancele quando quiser
            </p>
          </div>
          <div
            style={{ flex: '1 1 320px', minWidth: 280, display: 'flex', justifyContent: 'center' }}
          >
            <img
              src="/brand/characters-row.png"
              alt="Cometinho, Lila, Dino, Nina e Nuvito"
              style={{ width: '100%', maxWidth: 520, height: 'auto' }}
            />
          </div>
        </div>
      </Section>

      {/* Trust seal */}
      <Section style={{ paddingTop: 0, paddingBottom: 'var(--space-8)' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 'var(--space-4)',
            flexWrap: 'wrap',
            textAlign: 'center',
          }}
        >
          <img src="/brand/seal-safe.png" alt="Selo de conteúdo seguro" style={{ height: 64 }} />
          <p style={{ margin: 0, fontWeight: 700, color: 'var(--text-body)' }}>
            Conteúdo seguro · aprovado por famílias
          </p>
        </div>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: 'var(--space-2)',
            marginTop: 'var(--space-5)',
          }}
        >
          {VALUES.map((v) => (
            <Badge key={v} tone="lavender">
              {v}
            </Badge>
          ))}
        </div>
      </Section>

      {/* Features */}
      <Section style={{ background: 'var(--bg-canvas-alt)' }}>
        <h2 style={{ textAlign: 'center', margin: '0 0 var(--space-2)' }}>
          Feito para o ritmo do bebê
        </h2>
        <p
          style={{ textAlign: 'center', color: 'var(--text-muted)', margin: '0 0 var(--space-8)' }}
        >
          Tudo curado por faixa etária, com a suavidade que essa fase pede.
        </p>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: 'var(--space-5)',
          }}
        >
          {FEATURES.map((f) => (
            <Card key={f.title}>
              <img
                src={`/brand/icons/ic-${f.icon}.png`}
                alt=""
                aria-hidden
                style={{ width: 56, height: 56 }}
              />
              <h3 style={{ fontSize: 'var(--fs-h4)', margin: 'var(--space-3) 0 6px' }}>
                {f.title}
              </h3>
              <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: 'var(--fs-sm)' }}>
                {f.desc}
              </p>
            </Card>
          ))}
        </div>
      </Section>

      {/* Plans */}
      <Section style={{ scrollMarginTop: 'var(--space-6)' }}>
        <div id="planos" />
        <h2 style={{ textAlign: 'center', margin: '0 0 var(--space-2)' }}>
          Um plano para cada fase
        </h2>
        <p
          style={{ textAlign: 'center', color: 'var(--text-muted)', margin: '0 0 var(--space-8)' }}
        >
          Acesso ao conteúdo da faixa etária do seu bebê. Galáxia é o all-access.
        </p>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: 'var(--space-6)',
            alignItems: 'start',
          }}
        >
          {PLANS.map(({ plan, name, age, price, cardTone, badgeTone, perks, featured }) => (
            <Card
              key={plan}
              tone={cardTone}
              style={
                featured
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
                <h3 style={{ margin: 0 }}>{name}</h3>
                {featured ? (
                  <Badge tone="lavender" solid>
                    Mais popular
                  </Badge>
                ) : (
                  <Badge tone={badgeTone}>{age}</Badge>
                )}
              </div>
              {featured && (
                <p
                  style={{
                    margin: '6px 0 0',
                    fontSize: 'var(--fs-sm)',
                    color: 'var(--text-muted)',
                  }}
                >
                  {age}
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
                  /mês
                </span>
              </p>
              <ul
                style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: '0 0 var(--space-5)',
                  display: 'grid',
                  gap: 8,
                }}
              >
                {perks.map((p) => (
                  <li key={p} style={{ fontSize: 'var(--fs-sm)', color: 'var(--text-body)' }}>
                    ✓ {p}
                  </li>
                ))}
              </ul>
              <CtaLink href="/register" variant={featured ? 'primary' : 'ghost'}>
                Começar agora
              </CtaLink>
            </Card>
          ))}
        </div>
        <p
          style={{
            textAlign: 'center',
            color: 'var(--text-muted)',
            fontSize: 'var(--fs-sm)',
            marginTop: 'var(--space-6)',
          }}
        >
          Add-on bilíngue (PT-BR ↔ EN) por +R$ 14,90/mês em qualquer plano.
        </p>
      </Section>

      {/* Characters */}
      <Section style={{ background: 'var(--bg-canvas-alt)' }}>
        <h2 style={{ textAlign: 'center', margin: '0 0 var(--space-2)' }}>Conheça a turminha</h2>
        <p
          style={{ textAlign: 'center', color: 'var(--text-muted)', margin: '0 0 var(--space-8)' }}
        >
          Personagens que guiam cada descoberta. Cometinho é o nosso guia ✨
        </p>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: 'var(--space-8)',
          }}
        >
          {CHARACTERS.map((c) => (
            <div key={c.file} style={{ textAlign: 'center' }}>
              <Avatar src={`/brand/${c.file}.png`} name={c.name} ring={c.ring} size="xl" />
              <div style={{ marginTop: 8, fontWeight: 700, color: 'var(--text-strong)' }}>
                {c.name}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Final CTA */}
      <Section>
        <Card tone="lavender" style={{ textAlign: 'center', padding: 'var(--space-10)' }}>
          <h2 style={{ margin: '0 0 var(--space-2)' }}>Comece hoje, com 7 dias grátis</h2>
          <p style={{ color: 'var(--text-body)', margin: '0 0 var(--space-6)' }}>
            Aprender, <strong style={{ color: 'var(--commet-lavender)' }}>sonhar</strong> e{' '}
            <strong style={{ color: 'var(--commet-orange)' }}>crescer</strong> — juntos.
          </p>
          <CtaLink href="/register" size="lg">
            Criar conta grátis →
          </CtaLink>
        </Card>
      </Section>

      {/* Footer */}
      <footer
        style={{ borderTop: '1.5px solid var(--border-card)', background: 'var(--bg-canvas-alt)' }}
      >
        <div
          style={{
            maxWidth: 'var(--container-lg)',
            margin: '0 auto',
            padding: 'var(--space-8) var(--space-6)',
            display: 'flex',
            flexWrap: 'wrap',
            gap: 'var(--space-6)',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
            <img src="/brand/logo-mark.png" alt="Commet Baby" style={{ height: 40 }} />
            <span style={{ color: 'var(--text-muted)', fontSize: 'var(--fs-sm)' }}>
              Pequenas descobertas, grandes começos.
            </span>
          </div>
          <div style={{ display: 'flex', gap: 'var(--space-5)', fontSize: 'var(--fs-sm)' }}>
            <Link href="/login" style={{ color: 'var(--text-link)' }}>
              Entrar
            </Link>
            <Link href="/register" style={{ color: 'var(--text-link)' }}>
              Criar conta
            </Link>
          </div>
        </div>
        <p
          style={{
            textAlign: 'center',
            color: 'var(--text-muted)',
            fontSize: 'var(--fs-xs)',
            margin: 0,
            paddingBottom: 'var(--space-6)',
          }}
        >
          © 2026 Commet Baby. Todos os direitos reservados.
        </p>
      </footer>
    </>
  );
}
