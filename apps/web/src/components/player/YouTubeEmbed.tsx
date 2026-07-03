'use client';

/**
 * Embed do YouTube em privacy-enhanced mode (COPPA/LGPD — RNF-SEC-05):
 * usa youtube-nocookie.com com rel=0, modestbranding e playsinline, lazy-loaded.
 * IDs de mock (prefixo "mock-") não existem no YouTube, então mostramos um
 * poster de marca no lugar do iframe.
 */
export function YouTubeEmbed({ videoId, title }: { videoId: string; title: string }) {
  const isMock = videoId.startsWith('mock-');

  if (isMock) {
    return (
      <div
        style={{
          aspectRatio: '16 / 9',
          borderRadius: 'var(--radius-lg)',
          border: '1.5px solid var(--border-card)',
          backgroundImage: "url('/brand/bg-night.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 'var(--space-3)',
          overflow: 'hidden',
        }}
      >
        <img src="/brand/cometinho-glow.png" alt="" aria-hidden style={{ width: 96, height: 96 }} />
        <span
          style={{
            background: 'rgba(11, 13, 20, 0.7)',
            color: '#fff',
            fontSize: 'var(--fs-sm)',
            fontWeight: 700,
            padding: '6px 14px',
            borderRadius: 'var(--radius-pill)',
          }}
        >
          Prévia indisponível no modo demo
        </span>
      </div>
    );
  }

  return (
    <div
      style={{
        aspectRatio: '16 / 9',
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        border: '1.5px solid var(--border-card)',
        background: 'var(--commet-ink)',
      }}
    >
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1&playsinline=1`}
        title={title}
        allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        loading="lazy"
        style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
      />
    </div>
  );
}
