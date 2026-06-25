'use client';

import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style. @default "primary" */
  variant?: 'primary' | 'secondary' | 'soft' | 'ghost';
  /** Control height. @default "md" */
  size?: 'sm' | 'md' | 'lg';
  /** Icon node rendered before the label */
  iconLeft?: React.ReactNode;
  /** Icon node rendered after the label */
  iconRight?: React.ReactNode;
  /** Stretch to container width */
  fullWidth?: boolean;
  disabled?: boolean;
  children?: React.ReactNode;
}

const VARIANTS: Record<string, React.CSSProperties> = {
  primary: {
    background: 'var(--action-primary)',
    color: 'var(--text-onbrand)',
    boxShadow: 'var(--shadow-orange)',
  },
  secondary: {
    background: 'var(--action-secondary)',
    color: 'var(--text-onbrand)',
    boxShadow: 'var(--shadow-lavender)',
  },
  soft: {
    background: 'var(--orange-100)',
    color: 'var(--orange-700)',
    boxShadow: 'none',
  },
  ghost: {
    background: 'var(--paper)',
    color: 'var(--text-strong)',
    boxShadow: 'var(--shadow-sm)',
    border: '1.5px solid var(--border-card)',
  },
};

const SIZES: Record<string, React.CSSProperties> = {
  sm: { height: 'var(--control-h-sm)', padding: '0 16px', fontSize: 'var(--fs-sm)' },
  md: { height: 'var(--control-h-md)', padding: '0 24px', fontSize: 'var(--fs-body)' },
  lg: { height: 'var(--control-h-lg)', padding: '0 32px', fontSize: 'var(--fs-lg)' },
};

/**
 * Primary action button for Commet Baby. Pill-shaped, rounded, with a soft colored
 * glow and a gentle press-spring. Use `primary` (orange) for the main action,
 * `secondary` (lavender) for the alternative, `soft`/`ghost` for low emphasis.
 */
export function Button({
  children,
  variant = 'primary',
  size = 'md',
  iconLeft,
  iconRight,
  fullWidth = false,
  disabled = false,
  style,
  ...rest
}: ButtonProps) {
  const v = VARIANTS[variant] || VARIANTS.primary;
  const s = SIZES[size] || SIZES.md;
  const [pressed, setPressed] = React.useState(false);
  return (
    <button
      disabled={disabled}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px',
        whiteSpace: 'nowrap',
        fontFamily: 'var(--font-sans)',
        fontWeight: 'var(--fw-extrabold)' as React.CSSProperties['fontWeight'],
        borderRadius: 'var(--radius-pill)',
        border: v.border || 'none',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        width: fullWidth ? '100%' : 'auto',
        transition:
          'transform var(--dur-fast) var(--ease-pop), filter var(--dur-base) var(--ease-soft), box-shadow var(--dur-base) var(--ease-soft)',
        transform: pressed ? 'scale(0.96)' : 'scale(1)',
        filter: pressed ? 'brightness(0.96)' : 'none',
        ...v,
        ...s,
        ...style,
      }}
      onMouseEnter={(e) => {
        if (!disabled) e.currentTarget.style.filter = 'brightness(1.05)';
      }}
      {...rest}
    >
      {iconLeft && <span style={{ display: 'inline-flex' }}>{iconLeft}</span>}
      {children}
      {iconRight && <span style={{ display: 'inline-flex' }}>{iconRight}</span>}
    </button>
  );
}
