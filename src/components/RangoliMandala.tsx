import React from 'react';

interface RangoliMandalaProps {
  size?: number; // width & height in px
  className?: string;
  theme?: 'gold' | 'peacock' | 'crimson' | 'marigold';
}

export const RangoliMandala: React.FC<RangoliMandalaProps> = ({
  size = 320,
  className = '',
  theme = 'gold',
}) => {
  const themeColors = {
    gold: {
      outer: '#ffd700',
      mid: '#ff9100',
      inner: '#d32f2f',
      accent: '#fff59d',
    },
    peacock: {
      outer: '#00e5ff',
      mid: '#1de9b6',
      inner: '#aa00ff',
      accent: '#ffd700',
    },
    crimson: {
      outer: '#ff1744',
      mid: '#ff9100',
      inner: '#ffd700',
      accent: '#ffffff',
    },
    marigold: {
      outer: '#ff6d00',
      mid: '#ffd600',
      inner: '#d50000',
      accent: '#fff9c4',
    },
  }[theme];

  return (
    <div
      className={`relative flex items-center justify-center select-none pointer-events-none ${className}`}
      style={{ width: size, height: size }}
    >
      {/* Outer Rotating Flower Mandala Layer */}
      <svg
        viewBox="0 0 400 400"
        className="absolute inset-0 w-full h-full animate-rangoli-spin opacity-80 filter drop-shadow-[0_0_15px_rgba(255,215,0,0.3)]"
      >
        <g transform="translate(200, 200)">
          {/* 12 Petals outer ring */}
          {Array.from({ length: 12 }).map((_, i) => (
            <g key={i} transform={`rotate(${i * 30})`}>
              <path
                d="M 0 -180 C 25 -140, 25 -100, 0 -80 C -25 -100, -25 -140, 0 -180 Z"
                fill="none"
                stroke={themeColors.outer}
                strokeWidth="2.5"
              />
              <circle cx="0" cy="-160" r="5" fill={themeColors.accent} />
              <path
                d="M 0 -170 L 0 -90"
                stroke={themeColors.mid}
                strokeWidth="1.5"
                strokeDasharray="3 3"
              />
            </g>
          ))}
          {/* Ring borders */}
          <circle cx="0" cy="0" r="145" fill="none" stroke={themeColors.outer} strokeWidth="2" />
          <circle cx="0" cy="0" r="135" fill="none" stroke={themeColors.mid} strokeWidth="1.5" strokeDasharray="6 4" />
        </g>
      </svg>

      {/* Middle Counter-Rotating Geometries */}
      <svg
        viewBox="0 0 400 400"
        className="absolute inset-0 w-full h-full animate-rangoli-spin-reverse opacity-90"
      >
        <g transform="translate(200, 200)">
          {/* 8 Star Points */}
          {Array.from({ length: 8 }).map((_, i) => (
            <g key={i} transform={`rotate(${i * 45})`}>
              <path
                d="M 0 -115 L 20 -70 L 0 -50 L -20 -70 Z"
                fill={themeColors.inner}
                fillOpacity="0.35"
                stroke={themeColors.mid}
                strokeWidth="2"
              />
              <circle cx="0" cy="-115" r="4" fill={themeColors.accent} />
            </g>
          ))}
          <circle cx="0" cy="0" r="95" fill="none" stroke={themeColors.accent} strokeWidth="2" />
        </g>
      </svg>

      {/* Central Glowing Lotus Core */}
      <svg viewBox="0 0 200 200" className="w-1/2 h-1/2 z-10 filter drop-shadow-md">
        <g transform="translate(100, 100)">
          {/* Lotus petals */}
          {Array.from({ length: 6 }).map((_, i) => (
            <path
              key={i}
              transform={`rotate(${i * 60})`}
              d="M 0 -45 C 18 -25, 18 -10, 0 0 C -18 -10, -18 -25, 0 -45 Z"
              fill={themeColors.outer}
              fillOpacity="0.75"
              stroke="#ffffff"
              strokeWidth="1.5"
            />
          ))}
          <circle cx="0" cy="0" r="18" fill="#ffd700" />
          <circle cx="0" cy="0" r="10" fill="#d32f2f" />
        </g>
      </svg>
    </div>
  );
};
