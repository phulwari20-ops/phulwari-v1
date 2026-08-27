'use client';

import dynamic from 'next/dynamic';

const GalleryPage = dynamic(() => import('./page'), {
  ssr: false,
  loading: () => (
    <div
      style={{
        background: '#FFF7EC',
        minHeight: '420px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1rem',
      }}
    >
      <div
        style={{
          width: '80px',
          height: '80px',
          border: '4px solid #FFD16640',
          borderTop: '4px solid #FFD166',
          borderRadius: '50%',
          animation: 'spin 0.9s linear infinite',
        }}
      />
      <p
        style={{
          fontFamily: 'Quicksand, sans-serif',
          fontWeight: 700,
          color: '#A39CB5',
          fontSize: '0.9rem',
        }}
      >
        Loading Gallery…
      </p>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  ),
});

export default function GalleryClientWrapper({
  headingLevel,
}: {
  headingLevel?: 'h1' | 'h2';
}) {
  return <GalleryPage headingLevel={headingLevel} />;
}
