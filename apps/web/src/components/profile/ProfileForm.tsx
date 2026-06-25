'use client';

import React from 'react';
import {
  CreateBabyProfileInputSchema,
  Language,
  type CreateBabyProfileInput,
} from '@commet/shared';
import { Avatar, Button, Card, Input } from '@/components/ui';
import { fieldErrorsFromIssues } from '@/lib/form';

const AVATARS: { id: string; name: string }[] = [
  { id: 'cometinho', name: 'Cometinho' },
  { id: 'lila', name: 'Lila' },
  { id: 'dino', name: 'Dino' },
  { id: 'nina', name: 'Nina' },
  { id: 'nuvito', name: 'Nuvito' },
];

export function ProfileForm({
  initial,
  submitting = false,
  serverError,
  onSubmit,
  onCancel,
}: {
  initial?: Partial<CreateBabyProfileInput>;
  submitting?: boolean;
  serverError?: string | null;
  onSubmit: (values: CreateBabyProfileInput) => void;
  onCancel?: () => void;
}) {
  const [name, setName] = React.useState(initial?.name ?? '');
  const [birthDate, setBirthDate] = React.useState(initial?.birthDate ?? '');
  const [avatarId, setAvatarId] = React.useState(initial?.avatarId ?? 'cometinho');
  const [languagePref, setLanguagePref] = React.useState<Language>(
    initial?.languagePref ?? Language.PT_BR,
  );
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = CreateBabyProfileInputSchema.safeParse({
      name,
      birthDate,
      avatarId,
      languagePref,
    });
    if (!parsed.success) {
      setErrors(fieldErrorsFromIssues(parsed.error.issues));
      return;
    }
    setErrors({});
    onSubmit(parsed.data);
  }

  return (
    <Card tone="sunk" style={{ marginBottom: 'var(--space-6)' }}>
      <h2 style={{ fontSize: 'var(--fs-h4)', margin: '0 0 var(--space-4)' }}>
        {initial ? 'Editar perfil' : 'Novo perfil'}
      </h2>

      <form onSubmit={submit} noValidate style={{ display: 'grid', gap: 'var(--space-4)' }}>
        <Input
          label="Nome do bebê"
          placeholder="Ex.: Helena"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={errors.name}
        />
        <Input
          label="Data de nascimento"
          type="date"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
          error={errors.birthDate}
        />

        <div>
          <span
            style={{
              display: 'block',
              fontWeight: 700,
              fontSize: 'var(--fs-sm)',
              color: 'var(--text-body)',
              marginBottom: 8,
            }}
          >
            Avatar
          </span>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-3)' }}>
            {AVATARS.map((a) => {
              const selected = a.id === avatarId;
              return (
                <button
                  key={a.id}
                  type="button"
                  onClick={() => setAvatarId(a.id)}
                  aria-pressed={selected}
                  title={a.name}
                  style={{
                    border: 'none',
                    background: 'transparent',
                    padding: 0,
                    cursor: 'pointer',
                    borderRadius: 999,
                    opacity: selected ? 1 : 0.55,
                    transform: selected ? 'scale(1.06)' : 'scale(1)',
                    transition: 'all var(--dur-fast) var(--ease-pop)',
                  }}
                >
                  <Avatar
                    src={`/brand/char-${a.id}.png`}
                    name={a.name}
                    ring={selected ? a.id : 'none'}
                    size="lg"
                  />
                </button>
              );
            })}
          </div>
          {errors.avatarId && (
            <span
              style={{
                display: 'block',
                fontSize: 'var(--fs-xs)',
                color: 'var(--danger)',
                marginTop: 6,
              }}
            >
              {errors.avatarId}
            </span>
          )}
        </div>

        <div>
          <span
            style={{
              display: 'block',
              fontWeight: 700,
              fontSize: 'var(--fs-sm)',
              color: 'var(--text-body)',
              marginBottom: 8,
            }}
          >
            Idioma preferido
          </span>
          <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
            <Button
              type="button"
              size="sm"
              variant={languagePref === Language.PT_BR ? 'primary' : 'soft'}
              onClick={() => setLanguagePref(Language.PT_BR)}
            >
              PT-BR
            </Button>
            <Button
              type="button"
              size="sm"
              variant={languagePref === Language.EN ? 'primary' : 'soft'}
              onClick={() => setLanguagePref(Language.EN)}
            >
              English
            </Button>
          </div>
        </div>

        {serverError && (
          <p role="alert" style={{ margin: 0, color: 'var(--danger)', fontSize: 'var(--fs-sm)' }}>
            {serverError}
          </p>
        )}

        <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
          <Button type="submit" disabled={submitting}>
            {submitting ? 'Salvando…' : initial ? 'Salvar' : 'Adicionar'}
          </Button>
          {onCancel && (
            <Button type="button" variant="ghost" onClick={onCancel} disabled={submitting}>
              Cancelar
            </Button>
          )}
        </div>
      </form>
    </Card>
  );
}
