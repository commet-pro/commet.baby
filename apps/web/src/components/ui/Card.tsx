'use client';

import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Inner padding (CSS length). @default "var(--space-6)" */
  padding?: string;
  /** Background tone. @default "paper" */
  tone?: 'paper' | 'sunk' | 'lavender' | 'sky' | 'mint' | 'orange';
  /** Lift on hover (for clickable cards). @default false */
  interactive?: boolean;
  children?: React.ReactNode;
}

/**
 * The default content surface: large 24px radius, soft warm shadow, hairline border.
 * Pastel `tone`s tint the surface for feature/character cards.
 */
export function Card({
  children,
  padding = 'var(--space-6)',
  tone = 'paper',
  interactive = false,
  style,
  ...rest
}: CardProps) {
  const TONES: Record<string, React.CSSProperties> = {
    paper: { background: 'var(--surface-card)', border: '1.5px solid var(--border-card)' },
    sunk: { background: 'var(--surface-sunk)', border: '1.5px solid var(--border-card)' },
    lavender: { background: 'var(--lavender-100)', border: '1.5px solid var(--lavender-200)' },
    sky: { background: 'var(--sky-100)', border: '1.5px solid var(--sky-200)' },
    mint: { background: 'var(--mint-100)', border: '1.5px solid var(--mint-200)' },
    orange: { background: 'var(--orange-100)', border: '1.5px solid var(--orange-200)' },
  };
  const t = TONES[tone] || TONES.paper;
  const [hover, setHover] = React.useState(false);
  return (
    <div
      onMouseEnter={() => interactive && setHover(true)}
      onMouseLeave={() => interactive && setHover(false)}
      style={{
        borderRadius: 'var(--radius-lg)',
        padding,
        boxShadow: hover ? 'var(--shadow-md)' : 'var(--shadow-sm)',
        transform: hover ? 'translateY(-2px)' : 'none',
        transition:
          'transform var(--dur-base) var(--ease-soft), box-shadow var(--dur-base) var(--ease-soft)',
        cursor: interactive ? 'pointer' : 'default',
        ...t,
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}
