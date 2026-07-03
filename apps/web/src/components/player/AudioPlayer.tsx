'use client';

import React from 'react';
import { Card } from '@/components/ui';

function fmt(t: number): string {
  if (!Number.isFinite(t)) return '0:00';
  const m = Math.floor(t / 60);
  const s = String(Math.floor(t % 60)).padStart(2, '0');
  return `${m}:${s}`;
}

/**
 * Player de áudio (modo áudio — RF-CONT-04). Reprodução continua em background
 * (tab oculta / tela bloqueada) e integra a Media Session API para metadata e
 * controles do sistema (lock screen / notificação).
 */
export function AudioPlayer({
  src,
  title,
  subtitle,
}: {
  src: string;
  title: string;
  subtitle?: string;
}) {
  const audioRef = React.useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = React.useState(false);
  const [current, setCurrent] = React.useState(0);
  const [duration, setDuration] = React.useState(0);
  const [failed, setFailed] = React.useState(false);

  // Metadata + handlers da Media Session (controles do sistema)
  React.useEffect(() => {
    if (typeof navigator === 'undefined' || !('mediaSession' in navigator)) return;
    navigator.mediaSession.metadata = new MediaMetadata({
      title,
      artist: 'Commet Baby',
      album: subtitle ?? 'Commet Baby',
      artwork: [{ src: '/brand/logo-mark.png', sizes: '512x512', type: 'image/png' }],
    });
    const audio = audioRef.current;
    navigator.mediaSession.setActionHandler('play', () => audio?.play());
    navigator.mediaSession.setActionHandler('pause', () => audio?.pause());
    navigator.mediaSession.setActionHandler('seekbackward', () => {
      if (audio) audio.currentTime = Math.max(0, audio.currentTime - 10);
    });
    navigator.mediaSession.setActionHandler('seekforward', () => {
      if (audio) audio.currentTime = Math.min(audio.duration || 0, audio.currentTime + 10);
    });
    return () => {
      navigator.mediaSession.setActionHandler('play', null);
      navigator.mediaSession.setActionHandler('pause', null);
      navigator.mediaSession.setActionHandler('seekbackward', null);
      navigator.mediaSession.setActionHandler('seekforward', null);
    };
  }, [title, subtitle]);

  function toggle() {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) void audio.play();
    else audio.pause();
  }

  function seek(e: React.ChangeEvent<HTMLInputElement>) {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = Number(e.target.value);
    setCurrent(audio.currentTime);
  }

  return (
    <Card tone="lavender">
      <audio
        ref={audioRef}
        src={src}
        preload="metadata"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onTimeUpdate={(e) => setCurrent(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        onEnded={() => setPlaying(false)}
        onError={() => setFailed(true)}
      />

      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
        <button
          type="button"
          onClick={toggle}
          disabled={failed}
          aria-label={playing ? 'Pausar' : 'Reproduzir'}
          style={{
            width: 'var(--control-h-lg)',
            height: 'var(--control-h-lg)',
            flexShrink: 0,
            borderRadius: 'var(--radius-pill)',
            border: 'none',
            cursor: failed ? 'not-allowed' : 'pointer',
            background: 'var(--action-primary)',
            color: 'var(--text-onbrand)',
            boxShadow: 'var(--shadow-orange)',
            fontSize: 'var(--fs-lg)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: failed ? 0.5 : 1,
            transition: 'transform var(--dur-fast) var(--ease-pop)',
          }}
        >
          {playing ? '❚❚' : '▶'}
        </button>

        <div style={{ flex: 1, minWidth: 0 }}>
          <strong style={{ color: 'var(--text-strong)', display: 'block' }}>{title}</strong>
          <span style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-muted)' }}>
            {failed ? 'Áudio indisponível' : (subtitle ?? 'Modo áudio · continua em segundo plano')}
          </span>

          <div
            style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginTop: 8 }}
          >
            <span style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-muted)', minWidth: 34 }}>
              {fmt(current)}
            </span>
            <input
              type="range"
              min={0}
              max={duration || 0}
              step={1}
              value={Math.min(current, duration || 0)}
              onChange={seek}
              disabled={failed || !duration}
              aria-label="Posição do áudio"
              style={{ flex: 1, accentColor: 'var(--commet-orange)', height: 6, cursor: 'pointer' }}
            />
            <span style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-muted)', minWidth: 34 }}>
              {fmt(duration)}
            </span>
          </div>
        </div>

        <img
          src="/brand/icons/ic-music-note.png"
          alt=""
          aria-hidden
          style={{ width: 48, height: 48, flexShrink: 0 }}
        />
      </div>
    </Card>
  );
}
