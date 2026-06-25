import type { ReactNode } from 'react';
import Link from 'next/link';

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <main
      style={{
        minHeight: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 'var(--space-6)',
        padding: 'var(--space-6)',
        backgroundImage: "url('/brand/patterns/sky.png')",
        backgroundSize: '420px',
      }}
    >
      <Link href="/" aria-label="Commet Baby">
        <img
          src="/brand/logo-lockup.png"
          alt="Commet Baby"
          style={{ width: 'min(220px, 70vw)', height: 'auto' }}
        />
      </Link>
      {children}
    </main>
  );
}
