import React, { useState } from 'react';
import { Sparkles, Bell, Heart, Sun } from 'lucide-react';
import { audioSynth } from '../utils/audioSynth';
import confetti from 'canvas-confetti';

export const VirtualAartiThali: React.FC = () => {
  const [isAartiActive, setIsAartiActive] = useState(false);
  const [hasTilak, setHasTilak] = useState(false);
  const [flowersShowered, setFlowersShowered] = useState(0);
  const [bellRungCount, setBellRungCount] = useState(0);
  const [blessingMessage, setBlessingMessage] = useState<string | null>(null);

  // Perform Aarti Ceremony
  const handlePerformAarti = () => {
    setIsAartiActive(true);
    audioSynth.playGiftUnwrapSound();
    audioSynth.startMusic('aarti');
    setBlessingMessage('✨ Om Jai Laxmi Mata... May Goddess Lakshmi shower endless wealth, peace & joy upon your family! ✨');

    confetti({
      particleCount: 70,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#ffd700', '#ff9100', '#ffffff', '#ff007f'],
    });

    setTimeout(() => {
      setIsAartiActive(false);
    }, 4500);
  };

  // Ring Temple Bell
  const handleRingBell = () => {
    setBellRungCount((prev) => prev + 1);
    audioSynth.playTempleBellSound();
    setBlessingMessage('🔔 Sacred Temple Bells Chime: Dispelling all negativity & bringing divine harmony! 🌸');

    setTimeout(() => {
      audioSynth.playTempleBellSound();
    }, 300);
  };

  // Shower Flowers & Petals
  const handleShowerFlowers = () => {
    setFlowersShowered((prev) => prev + 1);
    audioSynth.playDiyaLightSound();
    setBlessingMessage('🌸 Fresh Marigold & Rose Petals offered at the Lotus Feet of Mahalakshmi! 🪷');

    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#ff1744', '#ffab00', '#ff6d00'],
    });
  };

  // Apply Sacred Kumkum Tilak
  const handleApplyTilak = () => {
    setHasTilak(true);
    audioSynth.playDiyaLightSound();
    setBlessingMessage('🔴 Auspicious Kumkum & Akshat Tilak applied: Shubh & Labh blessings on your forehead! ✨');

    confetti({
      particleCount: 50,
      spread: 50,
      origin: { y: 0.5 },
      colors: ['#d50000', '#ffd700'],
    });
  };

  return (
    <div className="bg-[#190b2d]/95 border border-amber-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl max-w-4xl mx-auto my-8 relative overflow-hidden">
      {/* Header */}
      <div className="text-center mb-6">
        <span className="text-xs font-bold uppercase tracking-widest text-amber-400 font-cinzel">
          🪔 Sacred Lakshmi Puja Ceremony
        </span>
        <h3 className="text-2xl sm:text-3xl font-bold font-display gold-text-gradient mt-1">
          Perform Virtual Lakshmi & Ganesha Aarti 🙏
        </h3>
        <p className="text-sm text-amber-200/80 mt-1 max-w-lg mx-auto">
          Ring the temple bell, perform circular Aarti, shower marigold petals, and receive divine Lakshmi & Ganesh blessings!
        </p>
      </div>

      <div className="flex flex-col lg:flex-row items-center justify-around gap-8 my-4">
        {/* Divine Icon Shrine (Goddess Lakshmi & Lord Ganesha blessing graphic) */}
        <div className="relative w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center">
          {/* Glowing Divine Aura Background */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-amber-500/30 via-orange-500/20 to-yellow-400/30 blur-2xl animate-pulse" />

          {/* Golden Shrine Mandala Ring */}
          <div className={`relative w-full h-full rounded-full border-4 border-amber-400/50 p-4 bg-[#110522] shadow-[0_0_40px_rgba(255,215,0,0.4)] flex flex-col items-center justify-center text-center ${isAartiActive ? 'ring-8 ring-amber-400/40' : ''}`}>
            {/* Sacred Om Symbol & Lotus Graphic */}
            <div className="text-amber-400 text-6xl font-bold drop-shadow-[0_0_20px_#ffd700] animate-bounce">
              🕉️
            </div>
            <div className="text-4xl mt-1">🪷 🐘 🪷</div>

            <span className="text-xs font-bold uppercase tracking-wider text-amber-200 font-cinzel mt-2">
              Shree Mahalakshmi & Ganesha
            </span>
            <span className="text-[11px] text-amber-400/80 italic font-serif">
              "Shubh Labh & Abundance"
            </span>

            {/* Sacred Tilak Mark on Shrine */}
            {hasTilak && (
              <div className="absolute top-10 left-1/2 -translate-x-1/2 flex flex-col items-center animate-in zoom-in">
                <div className="w-3 h-5 bg-red-600 rounded-full border border-amber-300 shadow-[0_0_10px_#ff0000]" />
                <div className="w-4 h-1 bg-amber-200 rounded-full -mt-0.5" />
              </div>
            )}
          </div>

          {/* Aarti Thali Floating Orbit (When Aarti Active) */}
          {isAartiActive && (
            <div className="absolute inset-0 rounded-full border-2 border-dashed border-amber-400/60 animate-rangoli-spin pointer-events-none">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-2xl animate-pulse">
                🪔
              </div>
            </div>
          )}
        </div>

        {/* Interactive Action Control Grid */}
        <div className="grid grid-cols-2 gap-3.5 w-full max-w-sm">
          {/* Perform Aarti Button */}
          <button
            onClick={handlePerformAarti}
            disabled={isAartiActive}
            className="p-4 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 text-amber-950 font-bold text-xs sm:text-sm shadow-[0_0_20px_rgba(255,215,0,0.5)] hover:scale-105 active:scale-95 transition-all flex flex-col items-center justify-center gap-2 col-span-2 disabled:opacity-50"
          >
            <div className="flex items-center gap-2 text-base font-cinzel">
              <Sun className="w-5 h-5 text-amber-950 animate-spin" />
              <span>{isAartiActive ? 'Performing Aarti...' : 'Rotate Aarti Thali 🪔'}</span>
            </div>
            <span className="text-[11px] font-medium opacity-90">
              Circulate glowing light & play devotional bhajan
            </span>
          </button>

          {/* Ring Temple Bell */}
          <button
            onClick={handleRingBell}
            className="p-3.5 rounded-2xl bg-[#100621] border border-amber-500/30 hover:border-amber-400 text-amber-200 font-semibold text-xs transition-all hover:scale-105 active:scale-95 flex flex-col items-center gap-1.5"
          >
            <Bell className="w-5 h-5 text-amber-400 animate-bounce" />
            <span>Ring Bell 🔔 ({bellRungCount})</span>
          </button>

          {/* Shower Flowers */}
          <button
            onClick={handleShowerFlowers}
            className="p-3.5 rounded-2xl bg-[#100621] border border-amber-500/30 hover:border-amber-400 text-amber-200 font-semibold text-xs transition-all hover:scale-105 active:scale-95 flex flex-col items-center gap-1.5"
          >
            <Sparkles className="w-5 h-5 text-rose-400" />
            <span>Offer Flowers 🌸 ({flowersShowered})</span>
          </button>

          {/* Apply Sacred Tilak */}
          <button
            onClick={handleApplyTilak}
            className="p-3.5 rounded-2xl bg-[#100621] border border-amber-500/30 hover:border-amber-400 text-amber-200 font-semibold text-xs transition-all hover:scale-105 active:scale-95 flex flex-col items-center gap-1.5 col-span-2"
          >
            <div className="flex items-center gap-1.5 text-rose-300 font-bold">
              <span className="w-2.5 h-2.5 rounded-full bg-red-600 border border-amber-300 inline-block" />
              <span>Apply Sacred Kumkum Tilak 🔴</span>
            </div>
          </button>
        </div>
      </div>

      {/* Dynamic Blessing Mantra Toast Box */}
      {blessingMessage && (
        <div className="mt-6 p-4 rounded-2xl bg-gradient-to-r from-amber-500/20 via-orange-500/25 to-amber-500/20 border border-amber-400/50 text-center animate-in fade-in zoom-in duration-300">
          <p className="text-sm font-bold text-amber-100 font-cinzel tracking-wide flex items-center justify-center gap-2">
            <Heart className="w-4 h-4 text-rose-400 fill-rose-400" />
            <span>{blessingMessage}</span>
          </p>
        </div>
      )}
    </div>
  );
};
