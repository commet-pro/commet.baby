'use client';

import React from 'react';

export interface TabItem {
  id: string;
  label: React.ReactNode;
}

export interface TabsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Array of {id,label} or plain strings */
  tabs: (TabItem | string)[];
  /** Active tab id */
  value?: string;
  /** Called with the next tab id */
  onChange?: (id: string) => void;
}

/** Pill segmented control. Active tab is a white lozenge on a sunk track. */
export function Tabs({ tabs = [], value, onChange, style, ...rest }: TabsProps) {
  const first = tabs[0];
  const firstId = first === undefined ? undefined : typeof first === 'string' ? first : first.id;
  const active = value ?? firstId;
  return (
    <div
      style={{
        display: 'inline-flex',
        gap: 4,
        padding: 4,
        background: 'var(--surface-sunk)',
        borderRadius: 'var(--radius-pill)',
        border: '1.5px solid var(--border-card)',
        fontFamily: 'var(--font-sans)',
        ...style,
      }}
      {...rest}
    >
      {tabs.map((t) => {
        const id = typeof t === 'string' ? t : t.id;
        const label = typeof t === 'string' ? t : t.label;
        const isActive = id === active;
        return (
          <button
            key={id}
            onClick={() => onChange && onChange(id)}
            style={{
              border: 'none',
              cursor: 'pointer',
              padding: '9px 18px',
              borderRadius: 'var(--radius-pill)',
              fontFamily: 'inherit',
              fontWeight: 'var(--fw-bold)' as React.CSSProperties['fontWeight'],
              fontSize: 'var(--fs-sm)',
              background: isActive ? 'var(--paper)' : 'transparent',
              color: isActive ? 'var(--text-strong)' : 'var(--text-muted)',
              boxShadow: isActive ? 'var(--shadow-sm)' : 'none',
              transition: 'all var(--dur-base) var(--ease-soft)',
            }}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
