'use client';

import React from 'react';
import Link from 'next/link';
import { ApiError, contentApi, type Content } from '@/lib/api';
import { Badge, Card } from '@/components/ui';
import { StoryPlayer } from '@/components/player/StoryPlayer';

export default function StoryDetailPage({ params }: { params: { slug: string } }) {
  const [content, setContent] = React.useState<Content | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    let active = true;
    contentApi
      .bySlug(params.slug)
      .then((r) => {
        if (active) setContent(r.data ?? null);
      })
      .catch((err) => {
        if (active) setError(err instanceof ApiError ? err.message : 'Erro ao carregar.');
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [params.slug]);

  return (
    <main
      style={{
        maxWidth: 'var(--container-md)',
        margin: '0 auto',
        padding: 'var(--space-8) var(--space-6)',
      }}
    >
      <Link
        href="/home"
        style={{ color: 'var(--text-link)', fontWeight: 700, fontSize: 'var(--fs-sm)' }}
      >
        ← Voltar ao catálogo
      </Link>

      {loading ? (
        <p style={{ color: 'var(--text-muted)', marginTop: 'var(--space-6)' }}>Carregando…</p>
      ) : error || !content ? (
        <Card
          tone="sunk"
          style={{ marginTop: 'var(--space-6)', textAlign: 'center', padding: 'var(--space-10)' }}
        >
          <p style={{ color: 'var(--text-muted)', margin: 0 }}>
            {error ?? 'Conteúdo não encontrado.'}
          </p>
        </Card>
      ) : (
        <article style={{ marginTop: 'var(--space-5)' }}>
          <div style={{ marginBottom: 'var(--space-5)' }}>
            <StoryPlayer content={content} />
          </div>

          <h1 style={{ margin: '0 0 var(--space-2)' }}>{content.title}</h1>
          <div style={{ display: 'flex', gap: 6, marginBottom: 'var(--space-4)' }}>
            <Badge tone="neutral">{content.category}</Badge>
            <Badge tone="lavender">{content.ageGroup}</Badge>
            {content.isFree && <Badge tone="success">Grátis</Badge>}
          </div>
          <p style={{ color: 'var(--text-body)' }}>{content.description}</p>
        </article>
      )}
    </main>
  );
}
