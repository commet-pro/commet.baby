'use client';

import React from 'react';
import { SubscriptionPlan } from '@commet/shared';
import {
  Avatar,
  Badge,
  Button,
  Card,
  Checkbox,
  Input,
  ProgressBar,
  Switch,
  Tabs,
} from '@/components/ui';

/* ----------------------------- layout helpers ----------------------------- */

function Section({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section style={{ marginTop: 'var(--space-12)' }}>
      <header style={{ marginBottom: 'var(--space-6)' }}>
        <h2 style={{ margin: 0 }}>{title}</h2>
        {subtitle && <p style={{ margin: '6px 0 0', color: 'var(--text-muted)' }}>{subtitle}</p>}
      </header>
      {children}
    </section>
  );
}

function Row({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-4)', alignItems: 'center' }}>
      {children}
    </div>
  );
}

function Swatch({ name, token }: { name: string; token: string }) {
  return (
    <div style={{ width: 132 }}>
      <div
        style={{
          height: 64,
          borderRadius: 'var(--radius-md)',
          background: `var(${token})`,
          border: '1.5px solid var(--border-card)',
          boxShadow: 'var(--shadow-xs)',
        }}
      />
      <div
        style={{
          marginTop: 8,
          fontWeight: 700,
          fontSize: 'var(--fs-sm)',
          color: 'var(--text-strong)',
        }}
      >
        {name}
      </div>
      <code style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-muted)' }}>{token}</code>
    </div>
  );
}

/* --------------------------------- data ----------------------------------- */

const BRAND = [
  ['Ink', '--commet-ink'],
  ['Orange', '--commet-orange'],
  ['Lavender', '--commet-lavender'],
  ['Sky', '--commet-sky'],
  ['Mint', '--commet-mint'],
  ['Yellow', '--commet-yellow'],
  ['Peach', '--commet-peach'],
  ['Cream', '--commet-cream'],
] as const;

const TINTS = [
  ['orange-700', '--orange-700'],
  ['orange-200', '--orange-200'],
  ['orange-100', '--orange-100'],
  ['lavender-600', '--lavender-600'],
  ['lavender-200', '--lavender-200'],
  ['lavender-100', '--lavender-100'],
  ['sky-600', '--sky-600'],
  ['sky-200', '--sky-200'],
  ['mint-600', '--mint-600'],
  ['mint-200', '--mint-200'],
  ['yellow-200', '--yellow-200'],
  ['peach-200', '--peach-200'],
] as const;

const NEUTRALS = [
  ['ink-900', '--ink-900'],
  ['ink-700', '--ink-700'],
  ['ink-500', '--ink-500'],
  ['ink-300', '--ink-300'],
  ['ink-200', '--ink-200'],
  ['ink-100', '--ink-100'],
  ['paper', '--paper'],
] as const;

const SEMANTIC = [
  ['success', '--success'],
  ['warning', '--warning'],
  ['danger', '--danger'],
  ['info', '--info'],
] as const;

const TYPE = [
  ['Display', '--fs-display', '56px · ExtraBold'],
  ['H1', '--fs-h1', '40px · ExtraBold'],
  ['H2', '--fs-h2', '32px · ExtraBold'],
  ['H3', '--fs-h3', '24px · Bold'],
  ['H4', '--fs-h4', '20px · Bold'],
  ['Body Large', '--fs-lg', '18px · Regular'],
  ['Body', '--fs-body', '16px · Regular'],
  ['Small', '--fs-sm', '14px · Regular'],
] as const;

const ICONS = [
  'star',
  'heart',
  'cloud',
  'moon',
  'telescope',
  'rocket',
  'leaf',
  'book',
  'music',
  'music-note',
  'gamepad',
  'cap',
  'medal',
];

const BADGES = ['explorer', 'reading', 'music', 'achievement', 'safety'];

const CHARACTERS: { file: string; name: string; ring: string }[] = [
  { file: 'char-cometinho', name: 'Cometinho', ring: 'cometinho' },
  { file: 'char-lila', name: 'Lila', ring: 'lila' },
  { file: 'char-dino', name: 'Dino', ring: 'dino' },
  { file: 'char-nina', name: 'Nina', ring: 'nina' },
  { file: 'char-nuvito', name: 'Nuvito', ring: 'nuvito' },
];

const PLANS: {
  plan: SubscriptionPlan;
  age: string;
  price: string;
  cardTone: 'orange' | 'sky' | 'lavender';
  badgeTone: 'orange' | 'yellow' | 'lavender';
  emoji: string;
}[] = [
  {
    plan: SubscriptionPlan.COMETA,
    age: '0–12 meses',
    price: 'R$ 19,90',
    cardTone: 'orange',
    badgeTone: 'orange',
    emoji: '🌟',
  },
  {
    plan: SubscriptionPlan.ESTRELA,
    age: '1–2 anos',
    price: 'R$ 24,90',
    cardTone: 'sky',
    badgeTone: 'yellow',
    emoji: '⭐',
  },
  {
    plan: SubscriptionPlan.GALAXIA,
    age: '0–3 anos',
    price: 'R$ 34,90',
    cardTone: 'lavender',
    badgeTone: 'lavender',
    emoji: '🌌',
  },
];

/* --------------------------------- page ----------------------------------- */

export default function DesignSystemPage() {
  const [tab, setTab] = React.useState('todos');
  const [check, setCheck] = React.useState(true);
  const [toggle, setToggle] = React.useState(true);

  return (
    <main
      style={{
        maxWidth: 'var(--container-lg)',
        margin: '0 auto',
        padding: 'var(--space-10) var(--space-6) var(--space-20)',
      }}
    >
      {/* Header */}
      <div
        style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-5)', flexWrap: 'wrap' }}
      >
        <img src="/brand/logo-mark.png" alt="Commet Baby" style={{ width: 72, height: 72 }} />
        <div>
          <span className="cb-eyebrow">Design System</span>
          <h1 style={{ margin: '4px 0 0' }}>Commet Baby</h1>
          <p style={{ margin: '4px 0 0', color: 'var(--text-muted)' }}>
            Pequenas <strong style={{ color: 'var(--commet-orange)' }}>descobertas</strong>, grandes{' '}
            <strong style={{ color: 'var(--commet-lavender)' }}>começos</strong>.
          </p>
        </div>
      </div>

      {/* Colors */}
      <Section
        title="Cores"
        subtitle="Canvas creme, tinta profunda e a laranja-cometa como ação primária."
      >
        <h4>Paleta de marca</h4>
        <Row>
          {BRAND.map(([n, t]) => (
            <Swatch key={t} name={n} token={t} />
          ))}
        </Row>
        <h4 style={{ marginTop: 'var(--space-6)' }}>Tints & fills</h4>
        <Row>
          {TINTS.map(([n, t]) => (
            <Swatch key={t} name={n} token={t} />
          ))}
        </Row>
        <h4 style={{ marginTop: 'var(--space-6)' }}>Neutros (warm-tinted)</h4>
        <Row>
          {NEUTRALS.map(([n, t]) => (
            <Swatch key={t} name={n} token={t} />
          ))}
        </Row>
        <h4 style={{ marginTop: 'var(--space-6)' }}>Semânticas</h4>
        <Row>
          {SEMANTIC.map(([n, t]) => (
            <Swatch key={t} name={n} token={t} />
          ))}
        </Row>
      </Section>

      {/* Typography */}
      <Section
        title="Tipografia"
        subtitle="Nunito — terminais arredondados são toda a personalidade."
      >
        <Card>
          {TYPE.map(([label, token, meta]) => (
            <div
              key={token}
              style={{
                display: 'flex',
                alignItems: 'baseline',
                gap: 'var(--space-4)',
                padding: '10px 0',
                borderBottom: '1px solid var(--border-soft)',
              }}
            >
              <span
                style={{
                  width: 120,
                  flexShrink: 0,
                  color: 'var(--text-muted)',
                  fontSize: 'var(--fs-sm)',
                }}
              >
                {meta}
              </span>
              <span
                style={{
                  fontSize: `var(${token})`,
                  fontWeight: 800,
                  color: 'var(--text-strong)',
                  lineHeight: 1.1,
                }}
              >
                {label}
              </span>
            </div>
          ))}
        </Card>
      </Section>

      {/* Spacing, radius, shadows */}
      <Section
        title="Espaçamento, raio & sombras"
        subtitle="Base 4px, cantos suaves, elevação quente e de baixo contraste."
      >
        <h4>Raio</h4>
        <Row>
          {(
            ['--radius-sm', '--radius-md', '--radius-lg', '--radius-xl', '--radius-pill'] as const
          ).map((r) => (
            <div key={r} style={{ textAlign: 'center' }}>
              <div
                style={{
                  width: 80,
                  height: 80,
                  background: 'var(--lavender-200)',
                  border: '1.5px solid var(--lavender-200)',
                  borderRadius: `var(${r})`,
                }}
              />
              <code style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-muted)' }}>{r}</code>
            </div>
          ))}
        </Row>
        <h4 style={{ marginTop: 'var(--space-6)' }}>Sombras</h4>
        <Row>
          {(
            [
              '--shadow-sm',
              '--shadow-md',
              '--shadow-lg',
              '--shadow-orange',
              '--shadow-lavender',
            ] as const
          ).map((s) => (
            <div key={s} style={{ textAlign: 'center' }}>
              <div
                style={{
                  width: 120,
                  height: 64,
                  background: 'var(--paper)',
                  borderRadius: 'var(--radius-md)',
                  boxShadow: `var(${s})`,
                }}
              />
              <code style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-muted)' }}>{s}</code>
            </div>
          ))}
        </Row>
      </Section>

      {/* Buttons */}
      <Section
        title="Botões"
        subtitle="Pílulas arredondadas com glow colorido e mola suave no clique."
      >
        <Row>
          <Button variant="primary">Começar agora</Button>
          <Button variant="secondary">Explorar</Button>
          <Button variant="soft">Saiba mais</Button>
          <Button variant="ghost">Cancelar</Button>
          <Button disabled>Desabilitado</Button>
        </Row>
        <Row>
          <Button size="sm">Pequeno</Button>
          <Button size="md">Médio</Button>
          <Button size="lg">Grande</Button>
          <Button iconLeft={<span>▶</span>}>Ouvir</Button>
        </Row>
      </Section>

      {/* Cards */}
      <Section
        title="Cards"
        subtitle="Superfície de 24px, sombra quente e bordas finas. Tons pastel para destaque."
      >
        <Row>
          {(['paper', 'sunk', 'lavender', 'sky', 'mint', 'orange'] as const).map((tone) => (
            <Card key={tone} tone={tone} interactive style={{ width: 160 }}>
              <strong style={{ color: 'var(--text-strong)' }}>{tone}</strong>
              <p
                style={{ margin: '6px 0 0', fontSize: 'var(--fs-sm)', color: 'var(--text-muted)' }}
              >
                Card interativo
              </p>
            </Card>
          ))}
        </Row>
      </Section>

      {/* Badges */}
      <Section title="Badges" subtitle="Rótulos em pílula para status, categorias e níveis.">
        <Row>
          {(
            ['orange', 'lavender', 'sky', 'mint', 'yellow', 'peach', 'neutral', 'success'] as const
          ).map((tone) => (
            <Badge key={tone} tone={tone}>
              {tone}
            </Badge>
          ))}
        </Row>
        <Row>
          <Badge tone="success" dot>
            Conteúdo seguro
          </Badge>
          <Badge tone="orange" solid>
            Novo
          </Badge>
          <Badge tone="lavender" solid>
            Premium
          </Badge>
        </Row>
      </Section>

      {/* Form controls */}
      <Section
        title="Formulários"
        subtitle="Campos em pílula, foco com anel laranja, checkbox e switch com mola."
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: 'var(--space-6)',
          }}
        >
          <Input
            label="Email"
            placeholder="voce@exemplo.com"
            hint="Usamos para o login dos pais."
          />
          <Input
            label="Senha"
            type="password"
            placeholder="••••••••"
            error="Mínimo de 8 caracteres."
          />
        </div>
        <Row>
          <Checkbox checked={check} onChange={setCheck} label="Aceito os termos de uso" />
          <Switch checked={toggle} onChange={setToggle} label="Modo áudio em background" />
        </Row>
      </Section>

      {/* Feedback */}
      <Section
        title="Feedback & navegação"
        subtitle="Progresso de aprendizagem, avatares de personagem e tabs segmentadas."
      >
        <div style={{ display: 'grid', gap: 'var(--space-5)', maxWidth: 420 }}>
          <ProgressBar value={70} tone="orange" showLabel />
          <ProgressBar value={45} tone="lavender" />
          <ProgressBar value={90} tone="mint" />
        </div>
        <Row>
          <Tabs tabs={['todos', 'histórias', 'músicas', 'sono']} value={tab} onChange={setTab} />
        </Row>
        <Row>
          {CHARACTERS.map((c) => (
            <div key={c.file} style={{ textAlign: 'center' }}>
              <Avatar src={`/brand/${c.file}.png`} name={c.name} ring={c.ring} size="xl" />
              <div style={{ marginTop: 6, fontSize: 'var(--fs-xs)', color: 'var(--text-muted)' }}>
                {c.name}
              </div>
            </div>
          ))}
          <Avatar name="Rafael" ring="orange" size="xl" />
        </Row>
      </Section>

      {/* Brand assets */}
      <Section title="Marca" subtitle="Logos, ícones soft-3D, badges de conquista, selo e padrões.">
        <h4>Logos & selo</h4>
        <Row>
          <Card>
            <img src="/brand/logo-lockup.png" alt="Logo lockup" style={{ height: 64 }} />
          </Card>
          <Card>
            <img src="/brand/logo-mark.png" alt="Símbolo" style={{ height: 64 }} />
          </Card>
          <Card tone="sky">
            <img
              src="/brand/logo-circle-light.png"
              alt="Logo circular claro"
              style={{ height: 64 }}
            />
          </Card>
          <Card>
            <img src="/brand/seal-safe.png" alt="Selo de conteúdo seguro" style={{ height: 64 }} />
          </Card>
        </Row>

        <h4 style={{ marginTop: 'var(--space-6)' }}>Ícones soft-3D</h4>
        <Row>
          {ICONS.map((ic) => (
            <img
              key={ic}
              src={`/brand/icons/ic-${ic}.png`}
              alt={ic}
              title={ic}
              style={{ width: 56, height: 56 }}
            />
          ))}
        </Row>

        <h4 style={{ marginTop: 'var(--space-6)' }}>Badges de conquista</h4>
        <Row>
          {BADGES.map((b) => (
            <img
              key={b}
              src={`/brand/badges/badge-${b}.png`}
              alt={b}
              title={b}
              style={{ width: 80, height: 80 }}
            />
          ))}
        </Row>

        <h4 style={{ marginTop: 'var(--space-6)' }}>Padrões & céus</h4>
        <Row>
          {(['patterns/sky', 'patterns/planets', 'patterns/hearts'] as const).map((p) => (
            <div
              key={p}
              style={{
                width: 160,
                height: 100,
                borderRadius: 'var(--radius-md)',
                backgroundImage: `url('/brand/${p}.png')`,
                backgroundSize: '120px',
                border: '1.5px solid var(--border-card)',
              }}
            />
          ))}
          {(['bg-day', 'bg-sunset', 'bg-night'] as const).map((bg) => (
            <img
              key={bg}
              src={`/brand/${bg}.png`}
              alt={bg}
              style={{
                width: 160,
                height: 100,
                objectFit: 'cover',
                borderRadius: 'var(--radius-md)',
              }}
            />
          ))}
        </Row>
      </Section>

      {/* Plans — ties DS to domain constants from @commet/shared */}
      <Section title="Planos" subtitle="Composição real usando os enums de @commet/shared.">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 'var(--space-6)',
          }}
        >
          {PLANS.map(({ plan, age, price, cardTone, badgeTone, emoji }) => (
            <Card key={plan} tone={cardTone} interactive>
              <div
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
              >
                <h3 style={{ margin: 0 }}>
                  {emoji} {plan.charAt(0) + plan.slice(1).toLowerCase()}
                </h3>
                <Badge tone={badgeTone}>{age}</Badge>
              </div>
              <p
                style={{
                  margin: '12px 0',
                  fontSize: 'var(--fs-h3)',
                  fontWeight: 800,
                  color: 'var(--text-strong)',
                }}
              >
                {price}
                <span
                  style={{ fontSize: 'var(--fs-sm)', fontWeight: 400, color: 'var(--text-muted)' }}
                >
                  {' '}
                  /mês
                </span>
              </p>
              <Button fullWidth variant={cardTone === 'lavender' ? 'secondary' : 'primary'}>
                Assinar
              </Button>
            </Card>
          ))}
        </div>
      </Section>

      <footer
        style={{
          marginTop: 'var(--space-20)',
          textAlign: 'center',
          color: 'var(--text-muted)',
          fontSize: 'var(--fs-sm)',
        }}
      >
        Commet Baby · Design System — Seguro · Afetivo · Inteligente · Imaginativo · Crescimento
      </footer>
    </main>
  );
}
