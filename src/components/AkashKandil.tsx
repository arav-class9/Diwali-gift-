import React from 'react';

interface AkashKandilProps {
  color?: 'gold' | 'magenta' | 'teal' | 'orange';
  className?: string;
  delay?: string;
}

export const AkashKandil: React.FC<AkashKandilProps> = ({
  color = 'gold',
  className = '',
  delay = '0s',
}) => {
  const colorMap = {
    gold: {
      top: '#ffab00',
      mid: '#ffd700',
      bottom: '#d50000',
      tassel: '#ffea00',
      glow: 'rgba(255, 215, 0, 0.5)',
    },
    magenta: {
      top: '#aa00ff',
      mid: '#ff007f',
      bottom: '#ffd700',
      tassel: '#ff80ab',
      glow: 'rgba(255, 0, 127, 0.5)',
    },
    teal: {
      top: '#00b8d4',
      mid: '#00e5ff',
      bottom: '#ffd700',
      tassel: '#84ffff',
      glow: 'rgba(0, 229, 255, 0.5)',
    },
    orange: {
      top: '#ff3d00',
      mid: '#ff9100',
      bottom: '#ffea00',
      tassel: '#ffd54f',
      glow: 'rgba(255, 145, 0, 0.5)',
    },
  }[color];

  return (
    <div
      className={`relative animate-kandil-sway select-none pointer-events-none ${className}`}
      style={{ animationDelay: delay }}
    >
      {/* Top Hanging Cord */}
      <div className="w-[1.5px] h-12 bg-amber-200/50 mx-auto" />

      {/* Main Lantern Structure SVG */}
      <div className="relative w-24 h-36 filter drop-shadow-lg">
        {/* Glow Aura */}
        <div
          className="absolute inset-2 rounded-full blur-xl animate-pulse"
          style={{ backgroundColor: colorMap.glow }}
        />

        <svg viewBox="0 0 120 180" className="w-full h-full">
          {/* Top Hexagonal Cap */}
          <polygon points="30,10 90,10 110,35 10,35" fill={colorMap.top} stroke="#fff" strokeWidth="1" />

          {/* Central Diamond/Star Frame */}
          <polygon points="60,35 110,85 60,135 10,85" fill={colorMap.mid} stroke="#fff" strokeWidth="1.5" />

          {/* Inner Light Window Star Motif */}
          <polygon points="60,50 90,85 60,120 30,85" fill="#ffffff" fillOpacity="0.85" />
          <polygon points="60,58 80,85 60,112 40,85" fill="#fff9c4" />

          {/* Corner Frills */}
          <circle cx="10" cy="85" r="4" fill="#ffd700" />
          <circle cx="110" cy="85" r="4" fill="#ffd700" />
          <circle cx="60" cy="35" r="4" fill="#ffd700" />
          <circle cx="60" cy="135" r="4" fill="#ffd700" />

          {/* Bottom Rim */}
          <polygon points="10,135 110,135 90,150 30,150" fill={colorMap.bottom} stroke="#fff" strokeWidth="1" />

          {/* Hanging Tassels (Paper Strips) */}
          <g transform="translate(0, 150)">
            <rect x="25" y="0" width="4" height="28" fill={colorMap.tassel} rx="1" />
            <rect x="35" y="0" width="4" height="34" fill={colorMap.top} rx="1" />
            <rect x="45" y="0" width="4" height="26" fill={colorMap.tassel} rx="1" />
            <rect x="55" y="0" width="4" height="36" fill="#ffffff" rx="1" />
            <rect x="65" y="0" width="4" height="28" fill={colorMap.tassel} rx="1" />
            <rect x="75" y="0" width="4" height="34" fill={colorMap.bottom} rx="1" />
            <rect x="85" y="0" width="4" height="26" fill={colorMap.tassel} rx="1" />
          </g>
        </svg>
      </div>
    </div>
  );
};
