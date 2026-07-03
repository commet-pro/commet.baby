'use client';

import React from 'react';
import { PlayMode } from '@commet/shared';
import { Tabs } from '@/components/ui';
import type { Content } from '@/lib/api';
import { AudioPlayer } from './AudioPlayer';
import { YouTubeEmbed } from './YouTubeEmbed';

const MODE_TABS = [
  { id: PlayMode.VIDEO, label: '▶ Vídeo' },
  { id: PlayMode.AUDIO, label: '♪ Áudio' },
];

/** Player do conteúdo: vídeo (YouTube privacy-enhanced), áudio, ou toggle entre os dois. */
export function StoryPlayer({ content }: { content: Content }) {
  const hasVideo = Boolean(content.youtubeVideoId);
  const hasAudio = Boolean(content.audioUrl);
  const [mode, setMode] = React.useState<PlayMode>(hasVideo ? PlayMode.VIDEO : PlayMode.AUDIO);

  if (!hasVideo && !hasAudio) {
    return (
      <div
        style={{
          aspectRatio: '16 / 9',
          background: 'var(--surface-sunk)',
          border: '1.5px solid var(--border-card)',
          borderRadius: 'var(--radius-lg)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--text-muted)',
          fontSize: 'var(--fs-sm)',
        }}
      >
        Este conteúdo ainda não tem mídia disponível.
      </div>
    );
  }

  return (
    <div style={{ display: 'grid', gap: 'var(--space-4)' }}>
      {hasVideo && hasAudio && (
        <Tabs tabs={MODE_TABS} value={mode} onChange={(id) => setMode(id as PlayMode)} />
      )}

      {mode === PlayMode.VIDEO && hasVideo ? (
        <YouTubeEmbed videoId={content.youtubeVideoId as string} title={content.title} />
      ) : (
        <AudioPlayer
          src={content.audioUrl as string}
          title={content.title}
          subtitle="Modo áudio · continua em segundo plano"
        />
      )}
    </div>
  );
}
