import Link from 'next/link';

export default function HomePage() {
  return (
    <main
      style={{
        minHeight: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        gap: 'var(--space-6)',
        padding: 'var(--space-8)',
        backgroundImage: "url('/brand/patterns/sky.png')",
        backgroundSize: '420px',
      }}
    >
      <img
        src="/brand/logo-lockup.png"
        alt="Commet Baby"
        style={{ width: 'min(360px, 80vw)', height: 'auto' }}
      />

      <p style={{ maxWidth: 460, fontSize: 'var(--fs-lg)', color: 'var(--text-body)' }}>
        Pequenas <strong style={{ color: 'var(--commet-orange)' }}>descobertas</strong>, grandes{' '}
        <strong style={{ color: 'var(--commet-lavender)' }}>começos</strong>.
      </p>

      <Link
        href="/design-system"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 10,
          height: 'var(--control-h-lg)',
          padding: '0 32px',
          borderRadius: 'var(--radius-pill)',
          background: 'var(--action-primary)',
          color: 'var(--text-onbrand)',
          fontWeight: 800,
          fontSize: 'var(--fs-lg)',
          boxShadow: 'var(--shadow-orange)',
          textDecoration: 'none',
        }}
      >
        Ver o Design System →
      </Link>
    </main>
  );
}
