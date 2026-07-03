'use client';

import Link from 'next/link';
import { ContentCategory } from '@commet/shared';
import { Badge, Card } from '@/components/ui';
import type { Content } from '@/lib/api';

const CATEGORY: Record<ContentCategory, { label: string; icon: string; bg: string }> = {
  [ContentCategory.STORY]: { label: 'História', icon: 'book', bg: 'var(--lavender-100)' },
  [ContentCategory.MUSIC]: { label: 'Música', icon: 'music', bg: 'var(--sky-100)' },
  [ContentCategory.LULLABY]: { label: 'Ninar', icon: 'moon', bg: 'var(--lavender-200)' },
  [ContentCategory.SENSORY]: { label: 'Sensorial', icon: 'star', bg: 'var(--yellow-200)' },
  [ContentCategory.ROUTINE]: { label: 'Rotina', icon: 'cloud', bg: 'var(--mint-100)' },
  [ContentCategory.LEARNING]: { label: 'Aprender', icon: 'cap', bg: 'var(--orange-100)' },
  [ContentCategory.NATURE]: { label: 'Natureza', icon: 'leaf', bg: 'var(--mint-200)' },
};

function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = String(seconds % 60).padStart(2, '0');
  return `${m}:${s}`;
}

export function StoryCard({ content }: { content: Content }) {
  const cat = CATEGORY[content.category];
  return (
    <Link href={`/story/${content.slug}`} style={{ textDecoration: 'none' }}>
      <Card interactive padding="0" style={{ overflow: 'hidden' }}>
        <div
          style={{
            position: 'relative',
            aspectRatio: '16 / 10',
            background: cat.bg,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <img
            src={`/brand/icons/ic-${cat.icon}.png`}
            alt=""
            aria-hidden
            style={{ width: 72, height: 72 }}
          />
          <span
            style={{
              position: 'absolute',
              bottom: 8,
              right: 8,
              background: 'rgba(11, 13, 20, 0.7)',
              color: '#fff',
              fontSize: 'var(--fs-xs)',
              fontWeight: 700,
              padding: '2px 8px',
              borderRadius: 'var(--radius-pill)',
            }}
          >
            {formatDuration(content.durationSeconds)}
          </span>
        </div>
        <div style={{ padding: 'var(--space-4)' }}>
          <div style={{ display: 'flex', gap: 6, marginBottom: 8 }}>
            <Badge tone="neutral">{cat.label}</Badge>
            {content.isFree && <Badge tone="success">Grátis</Badge>}
          </div>
          <strong style={{ color: 'var(--text-strong)', display: 'block' }}>{content.title}</strong>
          <p
            style={{
              margin: '4px 0 0',
              fontSize: 'var(--fs-sm)',
              color: 'var(--text-muted)',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {content.description}
          </p>
        </div>
      </Card>
    </Link>
  );
}
