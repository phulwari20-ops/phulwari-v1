'use client';

import React from 'react';

interface CurvedImageProps {
  src: string;
  alt: string;
  ringColor?: string;
  dotColors?: [string, string];
  size?: 'sm' | 'md' | 'lg';
}

const sizeMap = {
  sm: '18rem',
  md: '22rem',
  lg: '26rem',
};

const CurvedImage: React.FC<CurvedImageProps> = ({
  src,
  alt,
  ringColor = '#FFD166',
  dotColors = ['#FF4D8D', '#3D8BFF'],
  size = 'md',
}) => {
  return (
    <>
      <style>{`
        @keyframes blobFloat {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-16px) rotate(1.5deg); }
        }

        @keyframes blobMorph {
          0%, 100% { border-radius: 58% 42% 38% 62% / 60% 36% 64% 40%; }
          50% { border-radius: 42% 58% 62% 38% / 40% 62% 38% 60%; }
        }

        @media (prefers-reduced-motion: reduce) {
          .curved-img-wrap, .curved-img-shape { animation: none !important; }
        }

        .curved-img-wrap {
          position: relative;
          width: 100%;
          margin: 0 auto;
          aspect-ratio: 1 / 1;
          animation: blobFloat 7s ease-in-out infinite;
        }

        .curved-img-shape {
          position: absolute;
          inset: 0;
          overflow: hidden;
          border-radius: 58% 42% 38% 62% / 60% 36% 64% 40%;
          animation: blobMorph 9s ease-in-out infinite;
          box-shadow: 0 18px 36px rgba(0,0,0,0.12);
        }

        .curved-img-shape img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .curved-img-ring {
          position: absolute;
          inset: -14px;
          border: 3px dashed var(--ring-color);
          border-radius: 58% 42% 38% 62% / 60% 36% 64% 40%;
          opacity: 0.6;
        }

        .curved-img-dot {
          position: absolute;
          width: 16px;
          height: 16px;
          border-radius: 9999px;
        }
        .curved-img-dot-1 { top: -6px; right: 14%; }
        .curved-img-dot-2 { bottom: 6%; left: -10px; }
      `}</style>

      <div className="curved-img-wrap" style={{ maxWidth: sizeMap[size] }}>
        <div className="curved-img-ring" style={{ '--ring-color': ringColor } as React.CSSProperties} />
        <div className="curved-img-shape">
          <img src={src} alt={alt}  loading="lazy" decoding="async" />
        </div>
        <span className="curved-img-dot curved-img-dot-1" style={{ backgroundColor: dotColors[0] }} />
        <span className="curved-img-dot curved-img-dot-2" style={{ backgroundColor: dotColors[1] }} />
      </div>
    </>
  );
};

export default CurvedImage;