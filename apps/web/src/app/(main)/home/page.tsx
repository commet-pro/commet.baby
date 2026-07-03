'use client';

import React from 'react';
import Link from 'next/link';
import type { AgeGroup, ContentCategory } from '@commet/shared';
import { ApiError, contentApi, type Content } from '@/lib/api';
import { Card } from '@/components/ui';
import { FilterBar } from '@/components/content/FilterBar';
import { StoryCard } from '@/components/content/StoryCard';

export default function ContentHomePage() {
  const [ageGroup, setAgeGroup] = React.useState<AgeGroup | undefined>(undefined);
  const [category, setCategory] = React.useState<ContentCategory | undefined>(undefined);
  const [search, setSearch] = React.useState('');

  const [items, setItems] = React.useState<Content[]>([]);
  const [featured, setFeatured] = React.useState<Content[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [banner, setBanner] = React.useState<string | null>(null);

  const noFilters = !ageGroup && !category && search.trim() === '';

  // Featured (once)
  React.useEffect(() => {
    contentApi
      .featured()
      .then((r) => setFeatured(r.data ?? []))
      .catch(() => setFeatured([]));
  }, []);

  // Catalog (on filter change, debounced for search)
  React.useEffect(() => {
    let active = true;
    setLoading(true);
    setBanner(null);
    const t = setTimeout(() => {
      contentApi
        .list({ ageGroup, category, search: search.trim() || undefined })
        .then((r) => {
          if (active) setItems(r.data ?? []);
        })
        .catch((err) => {
          if (!active) return;
          setItems([]);
          if (err instanceof ApiError && (err.statusCode === 401 || err.statusCode === 0)) {
            setBanner('Entre para ver o catálogo completo.');
          } else {
            setBanner(
              err instanceof ApiError ? err.message : 'Não foi possível carregar o catálogo.',
            );
          }
        })
        .finally(() => {
          if (active) setLoading(false);
        });
    }, 250);
    return () => {
      active = false;
      clearTimeout(t);
    };
  }, [ageGroup, category, search]);

  return (
    <main
      style={{
        maxWidth: 'var(--container-lg)',
        margin: '0 auto',
        padding: 'var(--space-8) var(--space-6)',
      }}
    >
      <span className="cb-eyebrow">Catálogo</span>
      <h1 style={{ margin: '4px 0 var(--space-6)' }}>Explorar</h1>

      <FilterBar
        ageGroup={ageGroup}
        category={category}
        search={search}
        onAgeGroup={setAgeGroup}
        onCategory={setCategory}
        onSearch={setSearch}
      />

      {banner && (
        <Card tone="orange" style={{ marginBottom: 'var(--space-6)' }}>
          <span style={{ color: 'var(--text-body)' }}>{banner} </span>
          <Link href="/login" style={{ color: 'var(--text-link)', fontWeight: 700 }}>
            Entrar
          </Link>
        </Card>
      )}

      {/* Em destaque — só quando sem filtros */}
      {noFilters && featured.length > 0 && (
        <section style={{ marginBottom: 'var(--space-10)' }}>
          <h2 style={{ fontSize: 'var(--fs-h3)', margin: '0 0 var(--space-4)' }}>Em destaque</h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
              gap: 'var(--space-5)',
            }}
          >
            {featured.map((c) => (
              <StoryCard key={c.id} content={c} />
            ))}
          </div>
        </section>
      )}

      <h2 style={{ fontSize: 'var(--fs-h3)', margin: '0 0 var(--space-4)' }}>
        {noFilters ? 'Todo o catálogo' : 'Resultados'}
      </h2>

      {loading ? (
        <p style={{ color: 'var(--text-muted)' }}>Carregando…</p>
      ) : items.length === 0 ? (
        <Card tone="sunk" style={{ textAlign: 'center', padding: 'var(--space-10)' }}>
          <img src="/brand/char-nuvito.png" alt="" aria-hidden style={{ width: 88, height: 88 }} />
          <p style={{ color: 'var(--text-muted)', margin: 'var(--space-3) 0 0' }}>
            Nada encontrado com esses filtros. Tente outra combinação.
          </p>
        </Card>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
            gap: 'var(--space-5)',
          }}
        >
          {items.map((c) => (
            <StoryCard key={c.id} content={c} />
          ))}
        </div>
      )}
    </main>
  );
}
