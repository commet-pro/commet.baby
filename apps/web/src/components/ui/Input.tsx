'use client';

import React from 'react';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'style'> {
  /** Field label rendered above the input */
  label?: string;
  /** Helper text below the field */
  hint?: string;
  /** Error message — turns the field red and replaces the hint */
  error?: string;
  /** Icon node inside the field, leading */
  iconLeft?: React.ReactNode;
  style?: React.CSSProperties;
}

/** Pill-shaped text input with soft border, focus ring, optional label, hint, error and leading icon. */
export function Input({ label, hint, iconLeft, error, style, ...rest }: InputProps) {
  const [focus, setFocus] = React.useState(false);
  return (
    <label style={{ display: 'block', fontFamily: 'var(--font-sans)' }}>
      {label && (
        <span
          style={{
            display: 'block',
            fontWeight: 'var(--fw-bold)' as React.CSSProperties['fontWeight'],
            fontSize: 'var(--fs-sm)',
            color: 'var(--text-body)',
            marginBottom: 6,
          }}
        >
          {label}
        </span>
      )}
      <span
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          height: 'var(--control-h-md)',
          padding: '0 18px',
          background: 'var(--paper)',
          borderRadius: 'var(--radius-pill)',
          border: `1.5px solid ${error ? 'var(--danger)' : focus ? 'var(--action-primary)' : 'var(--border-card)'}`,
          boxShadow: focus ? 'var(--ring)' : 'var(--shadow-xs)',
          transition: 'border-color var(--dur-base), box-shadow var(--dur-base)',
        }}
      >
        {iconLeft && (
          <span style={{ display: 'inline-flex', color: 'var(--text-muted)' }}>{iconLeft}</span>
        )}
        <input
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          style={{
            border: 'none',
            outline: 'none',
            background: 'transparent',
            flex: 1,
            fontFamily: 'inherit',
            fontSize: 'var(--fs-body)',
            color: 'var(--text-strong)',
            ...style,
          }}
          {...rest}
        />
      </span>
      {(hint || error) && (
        <span
          style={{
            display: 'block',
            fontSize: 'var(--fs-xs)',
            color: error ? 'var(--danger)' : 'var(--text-muted)',
            marginTop: 6,
          }}
        >
          {error || hint}
        </span>
      )}
    </label>
  );
}
