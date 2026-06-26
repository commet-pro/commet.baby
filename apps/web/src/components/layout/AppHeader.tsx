'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Avatar } from '@/components/ui';
import { useAuthStore } from '@/stores/auth.store';

const NAV = [
  { href: '/home', label: 'Explorar' },
  { href: '/profiles', label: 'Perfis' },
];

export function AppHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const accessToken = useAuthStore((s) => s.accessToken);
  const clear = useAuthStore((s) => s.clear);

  function logout() {
    clear();
    router.push('/');
  }

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 10,
        background: 'rgba(255, 246, 230, 0.85)',
        backdropFilter: 'blur(8px)',
        borderBottom: '1.5px solid var(--border-card)',
      }}
    >
      <div
        style={{
          maxWidth: 'var(--container-lg)',
          margin: '0 auto',
          padding: 'var(--space-3) var(--space-6)',
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-5)',
        }}
      >
        <Link href="/home" aria-label="Commet Baby">
          <img src="/brand/logo-lockup.png" alt="Commet Baby" style={{ height: 30 }} />
        </Link>

        <nav style={{ display: 'flex', gap: 'var(--space-4)', marginLeft: 'var(--space-2)' }}>
          {NAV.map((item) => {
            const active = pathname === item.href || pathname.startsWith(item.href + '/');
            return (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  fontWeight: 700,
                  fontSize: 'var(--fs-sm)',
                  color: active ? 'var(--text-strong)' : 'var(--text-muted)',
                  textDecoration: 'none',
                }}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div
          style={{
            marginLeft: 'auto',
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-3)',
          }}
        >
          {accessToken ? (
            <>
              {user && <Avatar name={user.name} ring="cometinho" size="sm" />}
              <button
                onClick={logout}
                style={{
                  border: 'none',
                  background: 'transparent',
                  cursor: 'pointer',
                  color: 'var(--text-link)',
                  fontWeight: 700,
                  fontSize: 'var(--fs-sm)',
                }}
              >
                Sair
              </button>
            </>
          ) : (
            <Link
              href="/login"
              style={{ color: 'var(--text-link)', fontWeight: 700, fontSize: 'var(--fs-sm)' }}
            >
              Entrar
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
