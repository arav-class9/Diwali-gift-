import React, { useState } from 'react';
import { audioSynth } from '../utils/audioSynth';
import { Sparkles } from 'lucide-react';

interface DiyaDecorationProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  isLit?: boolean;
  onToggleLit?: (newLitState: boolean) => void;
  label?: string;
  showSparkleOnHover?: boolean;
}

export const DiyaDecoration: React.FC<DiyaDecorationProps> = ({
  size = 'md',
  isLit = true,
  onToggleLit,
  label,
  showSparkleOnHover = true,
}) => {
  const [lit, setLit] = useState(isLit);
  const [isSparkling, setIsSparkling] = useState(false);

  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-36 h-36',
    xl: 'w-48 h-48',
  }[size];

  const flameScale = {
    sm: 'scale-75 -top-5',
    md: 'scale-100 -top-7',
    lg: 'scale-125 -top-11',
    xl: 'scale-150 -top-14',
  }[size];

  const handleTap = () => {
    const nextState = !lit;
    setLit(nextState);
    if (nextState) {
      audioSynth.playDiyaLightSound();
      setIsSparkling(true);
      setTimeout(() => setIsSparkling(false), 1200);
    }
    if (onToggleLit) {
      onToggleLit(nextState);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center group relative select-none">
      <button
        onClick={handleTap}
        className={`relative ${sizeClasses} focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded-full transition-transform duration-300 hover:scale-105 active:scale-95`}
        title={lit ? 'Tap to blow out / tap again to light Diya 🪔' : 'Tap to light the sacred Diya 🪔'}
        aria-label={lit ? 'Lit Diya oil lamp' : 'Unlit Diya oil lamp'}
      >
        {/* Ambient Light Aura when lit */}
        {lit && (
          <div className="absolute inset-0 rounded-full bg-amber-500/30 blur-2xl animate-pulse-glow pointer-events-none" />
        )}

        {/* Diya Clay Base SVG */}
        <svg viewBox="0 0 200 140" className="w-full h-full filter drop-shadow-lg overflow-visible">
          <defs>
            {/* Clay Terracotta Gradients */}
            <linearGradient id="clayGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#d97706" />
              <stop offset="45%" stopColor="#b45309" />
              <stop offset="85%" stopColor="#78350f" />
              <stop offset="100%" stopColor="#451a03" />
            </linearGradient>

            <linearGradient id="goldTrimGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ffe600" />
              <stop offset="50%" stopColor="#ffd700" />
              <stop offset="100%" stopColor="#b58a00" />
            </linearGradient>

            <radialGradient id="oilPoolGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fbbf24" />
              <stop offset="70%" stopColor="#d97706" />
              <stop offset="100%" stopColor="#92400e" />
            </radialGradient>
          </defs>

          {/* Diya Base Shadow */}
          <ellipse cx="100" cy="120" rx="75" ry="14" fill="#000000" opacity="0.45" />

          {/* Clay Bowl Body */}
          <path
            d="M 20 65 Q 100 135 180 65 Q 195 55 180 45 Q 100 25 20 45 Q 5 55 20 65 Z"
            fill="url(#clayGrad)"
            stroke="#f59e0b"
            strokeWidth="2"
          />

          {/* Golden Engravings & Lotus Petals on Clay Bowl */}
          <path
            d="M 40 70 Q 100 120 160 70"
            fill="none"
            stroke="url(#goldTrimGrad)"
            strokeWidth="3"
            strokeDasharray="4 3"
          />
          <circle cx="100" cy="98" r="4" fill="#ffd700" />
          <circle cx="75" cy="92" r="3" fill="#ffd700" />
          <circle cx="125" cy="92" r="3" fill="#ffd700" />
          <circle cx="55" cy="82" r="2.5" fill="#ffd700" />
          <circle cx="145" cy="82" r="2.5" fill="#ffd700" />

          {/* Inner Oil Surface */}
          <ellipse cx="100" cy="48" rx="68" ry="18" fill="url(#oilPoolGrad)" />
          <ellipse cx="100" cy="48" rx="55" ry="12" fill="#ffd700" opacity={lit ? '0.7' : '0.2'} />

          {/* Cotton Wick Spout Accent */}
          <path d="M 100 48 L 100 30" stroke="#fef08a" strokeWidth="4" strokeLinecap="round" />
        </svg>

        {/* Animated Flame (When Lit) */}
        {lit && (
          <div className={`absolute left-1/2 -translate-x-1/2 ${flameScale} pointer-events-none z-10 animate-flame`}>
            <div className="relative w-8 h-14 flex items-center justify-center">
              {/* Inner Flame Core (Bright Yellow White) */}
              <div className="absolute bottom-0 w-3 h-7 bg-amber-100 rounded-full blur-[1px]" />
              {/* Flame Middle (Gold Orange) */}
              <div className="absolute bottom-0 w-6 h-11 bg-amber-400 rounded-full blur-[2px] opacity-90" />
              {/* Outer Flame Glow (Crimson Orange) */}
              <div className="absolute bottom-0 w-8 h-14 bg-orange-600 rounded-full blur-md opacity-75" />
              {/* Flame Crown Tip */}
              <div className="absolute -top-1 w-2 h-4 bg-yellow-200 rounded-full blur-[0.5px]" />
            </div>
          </div>
        )}

        {/* Smoke particle when unlit */}
        {!lit && (
          <div className="absolute left-1/2 -translate-x-1/2 -top-6 text-slate-400/50 text-xs animate-bounce pointer-events-none">
            💨
          </div>
        )}

        {/* Sparkles Burst Effect when just lit */}
        {isSparkling && (
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 pointer-events-none flex items-center justify-center gap-1">
            <Sparkles className="w-5 h-5 text-amber-300 animate-spin" />
            <span className="text-xs font-bold text-amber-200 gold-text-gradient">Shubham!</span>
          </div>
        )}
      </button>

      {label && (
        <span className="mt-2 text-xs font-medium text-amber-200/90 tracking-wide font-cinzel">
          {label}
        </span>
      )}
    </div>
  );
};
