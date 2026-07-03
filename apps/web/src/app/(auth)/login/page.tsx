'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { LoginInputSchema } from '@commet/shared';
import { Button, Card, Input } from '@/components/ui';
import { ApiError, authApi } from '@/lib/api';
import { fieldErrorsFromIssues } from '@/lib/form';
import { useAuthStore } from '@/stores/auth.store';

export default function LoginPage() {
  const router = useRouter();
  const setSession = useAuthStore((s) => s.setSession);

  const [values, setValues] = React.useState({ email: '', password: '' });
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [formError, setFormError] = React.useState<string | null>(null);
  const [notice, setNotice] = React.useState<string | null>(null);
  const [submitting, setSubmitting] = React.useState(false);

  const onChange = (key: 'email' | 'password') => (e: React.ChangeEvent<HTMLInputElement>) =>
    setValues((v) => ({ ...v, [key]: e.target.value }));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormError(null);
    setNotice(null);

    const parsed = LoginInputSchema.safeParse(values);
    if (!parsed.success) {
      setErrors(fieldErrorsFromIssues(parsed.error.issues));
      return;
    }
    setErrors({});
    setSubmitting(true);
    try {
      const res = await authApi.login(parsed.data);
      if (res.data?.accessToken) {
        setSession({ user: res.data.user, accessToken: res.data.accessToken });
        router.push('/home');
      } else {
        setNotice(
          'Login enviado, mas a autenticação do backend ainda é um stub (não retorna token). O fluxo está pronto para quando a API real estiver disponível.',
        );
      }
    } catch (err) {
      setFormError(err instanceof ApiError ? err.message : 'Erro inesperado. Tente novamente.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Card style={{ width: 'min(400px, 92vw)' }}>
      <h1 style={{ fontSize: 'var(--fs-h3)', margin: '0 0 4px' }}>Entrar</h1>
      <p
        style={{
          margin: '0 0 var(--space-5)',
          color: 'var(--text-muted)',
          fontSize: 'var(--fs-sm)',
        }}
      >
        Bem-vindo de volta ✨
      </p>

      <form onSubmit={onSubmit} noValidate style={{ display: 'grid', gap: 'var(--space-4)' }}>
        <Input
          label="Email"
          type="email"
          autoComplete="email"
          placeholder="voce@exemplo.com"
          value={values.email}
          onChange={onChange('email')}
          error={errors.email}
        />
        <Input
          label="Senha"
          type="password"
          autoComplete="current-password"
          placeholder="••••••••"
          value={values.password}
          onChange={onChange('password')}
          error={errors.password}
        />

        {formError && (
          <p role="alert" style={{ margin: 0, color: 'var(--danger)', fontSize: 'var(--fs-sm)' }}>
            {formError}
          </p>
        )}
        {notice && (
          <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: 'var(--fs-sm)' }}>
            {notice}
          </p>
        )}

        <Button type="submit" fullWidth disabled={submitting}>
          {submitting ? 'Entrando…' : 'Entrar'}
        </Button>
      </form>

      <div
        style={{ marginTop: 'var(--space-5)', display: 'grid', gap: 6, fontSize: 'var(--fs-sm)' }}
      >
        <Link href="/forgot-password" style={{ color: 'var(--text-link)' }}>
          Esqueci minha senha
        </Link>
        <span style={{ color: 'var(--text-muted)' }}>
          Não tem conta?{' '}
          <Link href="/register" style={{ color: 'var(--text-link)', fontWeight: 700 }}>
            Criar conta
          </Link>
        </span>
      </div>
    </Card>
  );
}
