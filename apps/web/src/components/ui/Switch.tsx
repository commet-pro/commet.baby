'use client';

import React from 'react';

export interface SwitchProps {
  checked?: boolean;
  onChange?: (next: boolean) => void;
  label?: React.ReactNode;
  disabled?: boolean;
  style?: React.CSSProperties;
}

/** Pill toggle switch with a gentle spring on the thumb. Orange track when on. */
export function Switch({
  checked = false,
  onChange,
  label,
  disabled = false,
  style,
  ...rest
}: SwitchProps) {
  return (
    <label
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 12,
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
          width: 52,
          height: 30,
          flexShrink: 0,
          borderRadius: 999,
          background: checked ? 'var(--action-primary)' : 'var(--ink-200)',
          boxShadow: checked ? 'var(--shadow-orange)' : 'inset 0 1px 3px rgba(0,0,0,.12)',
          padding: 3,
          transition: 'background var(--dur-base) var(--ease-soft)',
          position: 'relative',
        }}
      >
        <span
          style={{
            display: 'block',
            width: 24,
            height: 24,
            borderRadius: 999,
            background: '#fff',
            boxShadow: 'var(--shadow-sm)',
            transform: checked ? 'translateX(22px)' : 'translateX(0)',
            transition: 'transform var(--dur-base) var(--ease-pop)',
          }}
        />
      </span>
      {label}
    </label>
  );
}
