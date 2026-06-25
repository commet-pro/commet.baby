'use client';

import React from 'react';

export interface AvatarProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Image URL. Falls back to initials if absent. */
  src?: string;
  alt?: string;
  /** Used to derive a single-letter fallback */
  name?: string;
  /** Explicit fallback text */
  initials?: string;
  /** @default "md" */
  size?: 'sm' | 'md' | 'lg' | 'xl' | number;
  /** Colored ring. Character names tint to that character's color. @default "lavender" */
  ring?:
    | 'cometinho'
    | 'lila'
    | 'dino'
    | 'nina'
    | 'nuvito'
    | 'orange'
    | 'lavender'
    | 'sky'
    | 'mint'
    | 'none'
    | string;
}

const RING: Record<string, string> = {
  cometinho: 'var(--c-cometinho)',
  lila: 'var(--c-lila)',
  dino: 'var(--c-dino)',
  nina: 'var(--c-nina)',
  nuvito: 'var(--c-nuvito)',
  orange: 'var(--commet-orange)',
  lavender: 'var(--commet-lavender)',
  sky: 'var(--commet-sky)',
  mint: 'var(--commet-mint)',
  none: 'transparent',
};
const SIZES: Record<string, number> = { sm: 36, md: 48, lg: 64, xl: 88 };

/**
 * Round avatar with image or initials and an optional brand-colored ring.
 * The five Commet Baby characters each have a named ring tone.
 */
export function Avatar({
  src,
  alt,
  name,
  initials,
  size = 'md',
  ring = 'lavender',
  style,
  ...rest
}: AvatarProps) {
  const px = typeof size === 'number' ? size : SIZES[size] || 48;
  const ringColor = RING[ring] ?? ring;
  const text = initials || (name ? name.trim().slice(0, 1).toUpperCase() : '?');
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: px,
        height: px,
        borderRadius: 999,
        flexShrink: 0,
        background: 'var(--lavender-100)',
        color: 'var(--lavender-600)',
        fontFamily: 'var(--font-sans)',
        fontWeight: 'var(--fw-extrabold)' as React.CSSProperties['fontWeight'],
        fontSize: px * 0.4,
        overflow: 'hidden',
        border: ring !== 'none' ? `3px solid ${ringColor}` : 'none',
        boxShadow: 'var(--shadow-sm)',
        ...style,
      }}
      {...rest}
    >
      {src ? (
        <img
          src={src}
          alt={alt || name || ''}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      ) : (
        text
      )}
    </span>
  );
}
