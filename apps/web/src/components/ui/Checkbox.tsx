'use client';

import React from 'react';

export interface CheckboxProps {
  /** Checked state (controlled) */
  checked?: boolean;
  /** Called with the next boolean value */
  onChange?: (next: boolean) => void;
  /** Label rendered beside the box */
  label?: React.ReactNode;
  disabled?: boolean;
  style?: React.CSSProperties;
}

/** Rounded checkbox with a gentle pop animation on check. Orange fill when checked. */
export function Checkbox({
  checked = false,
  onChange,
  label,
  disabled = false,
  style,
  ...rest
}: CheckboxProps) {
  return (
    <label
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 10,
        fontFamily: 'var(--font-sans)',
        fontSize: 'var(--fs-body)',
        color: 'var(--text-body)',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        userSelect: 'none',
        ...style,
      }}
      {...rest}
    >
      <span
        onClick={() => !disabled && onChange && onChange(!checked)}
        style={{
          width: 24,
          height: 24,
          flexShrink: 0,
          borderRadius: 8,
          background: checked ? 'var(--action-primary)' : 'var(--paper)',
          border: `2px solid ${checked ? 'var(--action-primary)' : 'var(--border-card)'}`,
          boxShadow: checked ? 'var(--shadow-orange)' : 'var(--shadow-xs)',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all var(--dur-fast) var(--ease-pop)',
        }}
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          style={{
            opacity: checked ? 1 : 0,
            transform: checked ? 'scale(1)' : 'scale(0.5)',
            transition: 'all var(--dur-fast) var(--ease-pop)',
          }}
        >
          <path
            d="M5 12.5l4.5 4.5L19 7"
            stroke="#fff"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      {label}
    </label>
  );
}
