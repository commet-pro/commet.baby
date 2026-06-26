'use client';

import { AgeGroup, ContentCategory } from '@commet/shared';
import { Button, Input, Tabs } from '@/components/ui';

const AGE_TABS = [
  { id: 'all', label: 'Todas as idades' },
  { id: AgeGroup.NEWBORN_12M, label: '0–12m' },
  { id: AgeGroup.TODDLER_1_2Y, label: '1–2a' },
  { id: AgeGroup.PRESCHOOL_2_3Y, label: '2–3a' },
];

const CATEGORIES: { id: ContentCategory; label: string }[] = [
  { id: ContentCategory.STORY, label: 'Histórias' },
  { id: ContentCategory.MUSIC, label: 'Músicas' },
  { id: ContentCategory.LULLABY, label: 'Ninar' },
  { id: ContentCategory.SENSORY, label: 'Sensorial' },
  { id: ContentCategory.ROUTINE, label: 'Rotina' },
  { id: ContentCategory.LEARNING, label: 'Aprender' },
  { id: ContentCategory.NATURE, label: 'Natureza' },
];

export function FilterBar({
  ageGroup,
  category,
  search,
  onAgeGroup,
  onCategory,
  onSearch,
}: {
  ageGroup?: AgeGroup;
  category?: ContentCategory;
  search: string;
  onAgeGroup: (value?: AgeGroup) => void;
  onCategory: (value?: ContentCategory) => void;
  onSearch: (value: string) => void;
}) {
  return (
    <div style={{ display: 'grid', gap: 'var(--space-4)', marginBottom: 'var(--space-6)' }}>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 'var(--space-4)',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Tabs
          tabs={AGE_TABS}
          value={ageGroup ?? 'all'}
          onChange={(id) => onAgeGroup(id === 'all' ? undefined : (id as AgeGroup))}
        />
        <div style={{ width: 'min(280px, 100%)' }}>
          <Input
            placeholder="Buscar histórias, músicas…"
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            aria-label="Buscar conteúdo"
          />
        </div>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
        <Button
          size="sm"
          variant={category === undefined ? 'primary' : 'soft'}
          onClick={() => onCategory(undefined)}
        >
          Tudo
        </Button>
        {CATEGORIES.map((c) => (
          <Button
            key={c.id}
            size="sm"
            variant={category === c.id ? 'primary' : 'soft'}
            onClick={() => onCategory(c.id)}
          >
            {c.label}
          </Button>
        ))}
      </div>
    </div>
  );
}
