import React, { useState } from 'react';
import { Gift, Sparkles, Heart } from 'lucide-react';
import { DiyaDecoration } from './DiyaDecoration';
import { AkashKandil } from './AkashKandil';
import { RangoliMandala } from './RangoliMandala';
import { audioSynth } from '../utils/audioSynth';
import confetti from 'canvas-confetti';

interface OpeningGiftScreenProps {
  toName?: string;
  fromName?: string;
  onOpenGift: () => void;
}

export const OpeningGiftScreen: React.FC<OpeningGiftScreenProps> = ({
  toName,
  fromName,
  onOpenGift,
}) => {
  const [isOpening, setIsOpening] = useState(false);

  const handleOpenClick = () => {
    setIsOpening(true);
    audioSynth.playGiftUnwrapSound();
    audioSynth.startMusic('santoor');

    // Confetti burst on gift unwrap
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#ffd700', '#ff9100', '#ff007f', '#ffffff', '#76ff03'],
    });

    setTimeout(() => {
      onOpenGift();
    }, 700);
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-between p-4 sm:p-8 overflow-hidden bg-gradient-to-b from-[#0b0813] via-[#160b29] to-[#0b0813] text-amber-50 selection:bg-amber-500">
      {/* Swaying Hanging Kandil Lanterns on Top Corners */}
      <div className="absolute top-0 left-4 sm:left-12 z-20">
        <AkashKandil color="gold" delay="0s" />
      </div>
      <div className="absolute top-0 right-4 sm:right-12 z-20">
        <AkashKandil color="orange" delay="1.5s" />
      </div>

      {/* Background Rotating Rangoli Mandala */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-25 pointer-events-none scale-125 sm:scale-150">
        <RangoliMandala size={420} theme="gold" />
      </div>

      {/* Top Banner Subtitle */}
      <div className="mt-12 text-center z-10 animate-in fade-in slide-in-from-top duration-700">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-semibold tracking-widest uppercase font-cinzel">
          <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin" />
          <span>Shubh Deepavali 🪔</span>
        </div>
      </div>

      {/* Center Gift Box & Title Card */}
      <div className="my-auto text-center max-w-xl z-20 px-4 flex flex-col items-center">
        {/* Glowing Golden Diya Pair */}
        <div className="flex items-center justify-center gap-6 sm:gap-12 mb-6">
          <DiyaDecoration size="lg" isLit={true} label="Shubh" />
          <DiyaDecoration size="lg" isLit={true} label="Labh" />
        </div>

        {/* Surprise Kicker Banner */}
        <div className="space-y-3">
          <h1 className="text-3xl sm:text-5xl font-extrabold font-display gold-text-gradient tracking-tight drop-shadow-[0_0_20px_rgba(255,215,0,0.5)]">
            ✨ You Have a Special Diwali Surprise! ✨
          </h1>

          {toName && (
            <div className="inline-block px-4 py-1.5 rounded-full bg-rose-500/20 border border-rose-400/40 text-rose-200 text-sm font-semibold mt-2 animate-pulse">
              A Special Gift For <span className="text-amber-300 font-bold">{toName}</span> ❤️
            </div>
          )}

          {fromName && (
            <p className="text-xs sm:text-sm text-amber-200/80 font-cinzel tracking-wider">
              Sent with love & warm blessings from <strong className="text-amber-300">{fromName}</strong>
            </p>
          )}

          <p className="text-sm sm:text-base text-amber-100/90 max-w-md mx-auto pt-2 font-medium">
            Tap the golden gift box below to unwrap your personalized Diwali greetings, festive music & sparkling fireworks!
          </p>
        </div>

        {/* Interactive "Open Your Gift 🎁" Button */}
        <div className="mt-8 relative group">
          <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 blur-xl opacity-70 group-hover:opacity-100 transition-opacity animate-pulse-glow" />

          <button
            onClick={handleOpenClick}
            disabled={isOpening}
            className={`relative px-8 py-4 sm:px-10 sm:py-5 rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 text-amber-950 font-black text-lg sm:text-xl font-cinzel shadow-[0_0_30px_rgba(255,215,0,0.6)] border-2 border-amber-200 hover:scale-105 active:scale-95 transition-all flex items-center gap-3 cursor-pointer ${
              isOpening ? 'scale-95 opacity-80' : ''
            }`}
          >
            <Gift className="w-6 h-6 sm:w-7 sm:h-7 text-amber-950 animate-bounce" />
            <span>{isOpening ? 'Unwrapping Gift...' : 'Open Your Gift 🎁'}</span>
          </button>
        </div>
      </div>

      {/* Bottom Footer Note */}
      <div className="mb-6 text-center z-10 text-xs text-amber-300/60 font-cinzel">
        <span>🪔 Light · Happiness · Prosperity · Festive Joy 🪔</span>
      </div>
    </div>
  );
};
