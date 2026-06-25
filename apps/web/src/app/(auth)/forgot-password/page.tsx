'use client';

import React from 'react';
import Link from 'next/link';
import { ForgotPasswordInputSchema } from '@commet/shared';
import { Button, Card, Input } from '@/components/ui';
import { ApiError, authApi } from '@/lib/api';
import { fieldErrorsFromIssues } from '@/lib/form';

export default function ForgotPasswordPage() {
  const [email, setEmail] = React.useState('');
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [formError, setFormError] = React.useState<string | null>(null);
  const [done, setDone] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormError(null);

    const parsed = ForgotPasswordInputSchema.safeParse({ email });
    if (!parsed.success) {
      setErrors(fieldErrorsFromIssues(parsed.error.issues));
      return;
    }
    setErrors({});
    setSubmitting(true);
    try {
      await authApi.forgotPassword(parsed.data);
      // Não revelamos se o e-mail existe — sempre confirmamos o envio.
      setDone(true);
    } catch (err) {
      setFormError(err instanceof ApiError ? err.message : 'Erro inesperado. Tente novamente.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Card style={{ width: 'min(400px, 92vw)' }}>
      <h1 style={{ fontSize: 'var(--fs-h3)', margin: '0 0 4px' }}>Recuperar senha</h1>

      {done ? (
        <>
          <p
            style={{
              margin: '0 0 var(--space-5)',
              color: 'var(--text-body)',
              fontSize: 'var(--fs-sm)',
            }}
          >
            Se houver uma conta com esse e-mail, enviamos um link para redefinir a senha. Confira
            sua caixa de entrada.
          </p>
          <Link
            href="/login"
            style={{ color: 'var(--text-link)', fontWeight: 700, fontSize: 'var(--fs-sm)' }}
          >
            Voltar para entrar
          </Link>
        </>
      ) : (
        <>
          <p
            style={{
              margin: '0 0 var(--space-5)',
              color: 'var(--text-muted)',
              fontSize: 'var(--fs-sm)',
            }}
          >
            Informe seu e-mail e enviaremos um link para redefinir a senha.
          </p>
          <form onSubmit={onSubmit} noValidate style={{ display: 'grid', gap: 'var(--space-4)' }}>
            <Input
              label="Email"
              type="email"
              autoComplete="email"
              placeholder="voce@exemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={errors.email}
            />

            {formError && (
              <p
                role="alert"
                style={{ margin: 0, color: 'var(--danger)', fontSize: 'var(--fs-sm)' }}
              >
                {formError}
              </p>
            )}

            <Button type="submit" fullWidth disabled={submitting}>
              {submitting ? 'Enviando…' : 'Enviar link'}
            </Button>
          </form>

          <p
            style={{
              marginTop: 'var(--space-5)',
              fontSize: 'var(--fs-sm)',
              color: 'var(--text-muted)',
            }}
          >
            Lembrou a senha?{' '}
            <Link href="/login" style={{ color: 'var(--text-link)', fontWeight: 700 }}>
              Entrar
            </Link>
          </p>
        </>
      )}
    </Card>
  );
}
