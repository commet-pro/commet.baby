'use client';

import React from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Color tone. @default "lavender" */
  tone?: 'orange' | 'lavender' | 'sky' | 'mint' | 'yellow' | 'peach' | 'neutral' | 'success';
  /** Filled (solid color) instead of soft tint. @default false */
  solid?: boolean;
  /** Show a leading status dot. @default false */
  dot?: boolean;
  children?: React.ReactNode;
}

const TONES: Record<string, { bg: string; fg: string }> = {
  orange: { bg: 'var(--orange-100)', fg: 'var(--orange-700)' },
  lavender: { bg: 'var(--lavender-100)', fg: 'var(--lavender-600)' },
  sky: { bg: 'var(--sky-100)', fg: 'var(--sky-600)' },
  mint: { bg: 'var(--mint-100)', fg: 'var(--mint-600)' },
  yellow: { bg: 'var(--yellow-200)', fg: '#9A6B00' },
  peach: { bg: 'var(--peach-200)', fg: '#C2553A' },
  neutral: { bg: 'var(--ink-100)', fg: 'var(--ink-700)' },
  success: { bg: '#DCF3E8', fg: '#2E7D55' },
};

/** Small pill label for status, categories, levels or counts. Soft tinted by default. */
export function Badge({
  children,
  tone = 'lavender',
  solid = false,
  dot = false,
  style,
  ...rest
}: BadgeProps) {
  const t = TONES[tone] || TONES.lavender;
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        fontFamily: 'var(--font-sans)',
        fontWeight: 'var(--fw-bold)' as React.CSSProperties['fontWeight'],
        fontSize: 'var(--fs-xs)',
        lineHeight: 1,
        padding: '6px 12px',
        borderRadius: 'var(--radius-pill)',
        background: solid ? t.fg : t.bg,
        color: solid ? '#fff' : t.fg,
        ...style,
      }}
      {...rest}
    >
      {dot && (
        <span style={{ width: 6, height: 6, borderRadius: 999, background: 'currentColor' }} />
      )}
      {children}
    </span>
  );
}
