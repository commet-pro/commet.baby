'use client';

import React from 'react';

export interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number;
  /** @default 100 */
  max?: number;
  /** Fill color. @default "lavender" */
  tone?: 'orange' | 'lavender' | 'sky' | 'mint';
  /** Track height in px. @default 12 */
  height?: number;
  /** Show "value / max XP" caption. @default false */
  showLabel?: boolean;
}

/** Soft rounded progress track for XP, levels and lesson completion. */
export function ProgressBar({
  value = 0,
  max = 100,
  tone = 'lavender',
  height = 12,
  showLabel = false,
  style,
  ...rest
}: ProgressBarProps) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  const FILL: Record<string, string> = {
    orange: 'var(--commet-orange)',
    lavender: 'var(--commet-lavender)',
    sky: 'var(--commet-sky)',
    mint: 'var(--commet-mint)',
  };
  return (
    <div style={{ fontFamily: 'var(--font-sans)', ...style }} {...rest}>
      <div
        style={{
          height,
          width: '100%',
          background: 'var(--ink-100)',
          borderRadius: 999,
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            height: '100%',
            width: pct + '%',
            background: FILL[tone] || FILL.lavender,
            borderRadius: 999,
            transition: 'width var(--dur-slow) var(--ease-soft)',
          }}
        />
      </div>
      {showLabel && (
        <div
          style={{
            marginTop: 6,
            fontSize: 'var(--fs-xs)',
            fontWeight: 'var(--fw-bold)' as React.CSSProperties['fontWeight'],
            color: 'var(--text-muted)',
            textAlign: 'right',
          }}
        >
          {value} / {max} XP
        </div>
      )}
    </div>
  );
}
