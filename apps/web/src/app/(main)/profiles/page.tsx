'use client';

import React from 'react';
import Link from 'next/link';
import type { CreateBabyProfileInput } from '@commet/shared';
import { ApiError, profilesApi, type BabyProfile } from '@/lib/api';
import { Button, Card } from '@/components/ui';
import { BabyProfileCard } from '@/components/profile/BabyProfileCard';
import { ProfileForm } from '@/components/profile/ProfileForm';

export default function ProfilesPage() {
  const [profiles, setProfiles] = React.useState<BabyProfile[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [banner, setBanner] = React.useState<string | null>(null);
  const [formOpen, setFormOpen] = React.useState(false);
  const [editing, setEditing] = React.useState<BabyProfile | null>(null);
  const [submitting, setSubmitting] = React.useState(false);
  const [serverError, setServerError] = React.useState<string | null>(null);

  const load = React.useCallback(async () => {
    setLoading(true);
    setBanner(null);
    try {
      const res = await profilesApi.list();
      setProfiles(res.data ?? []);
    } catch (err) {
      setProfiles([]);
      if (err instanceof ApiError && (err.statusCode === 401 || err.statusCode === 0)) {
        setBanner('Entre para sincronizar e salvar os perfis do seu bebê.');
      } else {
        setBanner(err instanceof ApiError ? err.message : 'Não foi possível carregar os perfis.');
      }
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    load();
  }, [load]);

  function openCreate() {
    setEditing(null);
    setServerError(null);
    setFormOpen(true);
  }

  function openEdit(profile: BabyProfile) {
    setEditing(profile);
    setServerError(null);
    setFormOpen(true);
  }

  function closeForm() {
    setFormOpen(false);
    setEditing(null);
    setServerError(null);
  }

  async function handleSubmit(values: CreateBabyProfileInput) {
    setSubmitting(true);
    setServerError(null);
    try {
      if (editing) {
        const res = await profilesApi.update(editing.id, values);
        const updated = res.data ?? { ...editing, ...values };
        setProfiles((list) => list.map((p) => (p.id === editing.id ? updated : p)));
        closeForm();
      } else {
        const res = await profilesApi.create(values);
        if (res.data) {
          setProfiles((list) => [...list, res.data as BabyProfile]);
          closeForm();
        } else {
          setServerError(
            'Perfil validado, mas o backend ainda é um stub (não persistiu). Pronto para a API real.',
          );
        }
      }
    } catch (err) {
      if (err instanceof ApiError && (err.statusCode === 401 || err.statusCode === 0)) {
        setServerError(
          'Entre para salvar — a API de perfis exige login (em implementação no backend).',
        );
      } else {
        setServerError(err instanceof ApiError ? err.message : 'Erro inesperado. Tente novamente.');
      }
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(profile: BabyProfile) {
    if (!window.confirm(`Remover o perfil de ${profile.name}?`)) return;
    try {
      await profilesApi.remove(profile.id);
      setProfiles((list) => list.filter((p) => p.id !== profile.id));
    } catch (err) {
      if (err instanceof ApiError && (err.statusCode === 401 || err.statusCode === 0)) {
        setBanner('Entre para gerenciar os perfis.');
      } else {
        setBanner(err instanceof ApiError ? err.message : 'Erro ao remover o perfil.');
      }
    }
  }

  return (
    <main
      style={{
        maxWidth: 'var(--container-md)',
        margin: '0 auto',
        padding: 'var(--space-8) var(--space-6)',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 'var(--space-4)',
          flexWrap: 'wrap',
          marginBottom: 'var(--space-6)',
        }}
      >
        <div>
          <h1 style={{ margin: 0, fontSize: 'var(--fs-h2)' }}>Perfis do bebê</h1>
          <p style={{ margin: '4px 0 0', color: 'var(--text-muted)' }}>
            Cada perfil recebe conteúdo da sua faixa etária.
          </p>
        </div>
        {!formOpen && <Button onClick={openCreate}>+ Adicionar perfil</Button>}
      </div>

      {banner && (
        <Card tone="orange" style={{ marginBottom: 'var(--space-6)' }}>
          <span style={{ color: 'var(--text-body)' }}>{banner} </span>
          <Link href="/login" style={{ color: 'var(--text-link)', fontWeight: 700 }}>
            Entrar
          </Link>
        </Card>
      )}

      {formOpen && (
        <ProfileForm
          initial={editing ?? undefined}
          submitting={submitting}
          serverError={serverError}
          onSubmit={handleSubmit}
          onCancel={closeForm}
        />
      )}

      {loading ? (
        <p style={{ color: 'var(--text-muted)' }}>Carregando…</p>
      ) : profiles.length === 0 ? (
        !formOpen && (
          <Card tone="sunk" style={{ textAlign: 'center', padding: 'var(--space-10)' }}>
            <img src="/brand/char-nina.png" alt="" aria-hidden style={{ width: 96, height: 96 }} />
            <h2 style={{ fontSize: 'var(--fs-h4)', margin: 'var(--space-3) 0 6px' }}>
              Nenhum perfil ainda
            </h2>
            <p style={{ color: 'var(--text-muted)', margin: '0 0 var(--space-5)' }}>
              Crie o primeiro perfil para personalizar a experiência do seu bebê.
            </p>
            <Button onClick={openCreate}>+ Adicionar perfil</Button>
          </Card>
        )
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
            gap: 'var(--space-5)',
          }}
        >
          {profiles.map((profile) => (
            <BabyProfileCard
              key={profile.id}
              profile={profile}
              onEdit={() => openEdit(profile)}
              onDelete={() => handleDelete(profile)}
            />
          ))}
        </div>
      )}
    </main>
  );
}
