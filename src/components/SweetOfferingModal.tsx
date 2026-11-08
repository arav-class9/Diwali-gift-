import React, { useState } from 'react';
import { Sparkles, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';
import { audioSynth } from '../utils/audioSynth';

interface SweetOfferingModalProps {
  recipientName?: string;
  senderName?: string;
}

export const SweetOfferingModal: React.FC<SweetOfferingModalProps> = ({
  recipientName = 'Dear Friend',
  senderName = 'Wellwisher',
}) => {
  const [selectedSweet, setSelectedSweet] = useState<string | null>(null);
  const [offeredCount, setOfferedCount] = useState<number>(0);
  const [lastSweetMessage, setLastSweetMessage] = useState<string | null>(null);

  const sweets = [
    {
      id: 'kaju-katli',
      name: 'Kaju Katli',
      emoji: '💎',
      desc: 'Silver foil cashew diamond of prosperity & sweet moments!',
      color: 'from-slate-200 to-amber-100 text-slate-900',
    },
    {
      id: 'ladoo',
      name: 'Motichoor Ladoo',
      emoji: '🟠',
      desc: 'Golden saffron boondi ladoo packed with auspicious blessings!',
      color: 'from-amber-400 to-orange-500 text-amber-950',
    },
    {
      id: 'gulab-jamun',
      name: 'Gulab Jamun',
      emoji: '🤎',
      desc: 'Soft cardamom syrup dumpling to sweeten every relationship!',
      color: 'from-amber-900 to-amber-700 text-amber-100',
    },
    {
      id: 'jalebi',
      name: 'Crispy Jalebi',
      emoji: '🌀',
      desc: 'Crispy golden saffron whorls of pure happiness!',
      color: 'from-orange-400 to-amber-300 text-amber-950',
    },
  ];

  const handleOfferSweet = (sweetName: string, emoji: string) => {
    setSelectedSweet(sweetName);
    setOfferedCount((prev) => prev + 1);
    setLastSweetMessage(`Offered sweet ${sweetName} ${emoji} with lots of warmth!`);
    audioSynth.playDiyaLightSound();

    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#ffd700', '#ff9100', '#ffffff', '#ff007f'],
    });

    setTimeout(() => {
      setSelectedSweet(null);
    }, 2500);
  };

  return (
    <div className="bg-[#180c2e]/90 border border-amber-500/30 rounded-3xl p-6 shadow-2xl backdrop-blur-xl my-8 max-w-4xl mx-auto">
      <div className="text-center mb-6">
        <span className="text-xs font-bold uppercase tracking-widest text-amber-400 font-cinzel">
          🍬 Virtual Diwali Prasad
        </span>
        <h3 className="text-2xl font-bold font-display gold-text-gradient mt-1">
          Share Diwali Sweets & Blessings 😋
        </h3>
        <p className="text-sm text-amber-200/80 mt-1 max-w-lg mx-auto">
          Tap any sweet below to offer it to <strong className="text-amber-300">{recipientName}</strong> with love from <strong className="text-amber-300">{senderName}</strong>!
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {sweets.map((s) => (
          <button
            key={s.id}
            onClick={() => handleOfferSweet(s.name, s.emoji)}
            className="p-5 rounded-2xl bg-[#100720] border border-amber-500/20 hover:border-amber-400 text-left transition-all hover:scale-105 active:scale-95 group relative flex flex-col justify-between"
          >
            <div>
              <div className="text-4xl mb-3 group-hover:scale-125 transition-transform duration-300">
                {s.emoji}
              </div>
              <h4 className="font-bold text-amber-100 text-base">{s.name}</h4>
              <p className="text-xs text-amber-300/70 mt-1">{s.desc}</p>
            </div>
            <div className="mt-4 flex items-center justify-between pt-3 border-t border-amber-500/15">
              <span className="text-[11px] font-semibold text-amber-400 group-hover:underline">
                Offer Sweet ✨
              </span>
              <Heart className="w-4 h-4 text-rose-400 group-hover:fill-rose-400 transition-colors" />
            </div>
          </button>
        ))}
      </div>

      {lastSweetMessage && (
        <div className="mt-6 p-4 rounded-2xl bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-amber-500/20 border border-amber-400/40 text-center animate-in fade-in zoom-in duration-300">
          <span className="text-sm font-semibold text-amber-200 flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-300" />
            {lastSweetMessage}
          </span>
          <span className="block text-xs text-amber-400/80 mt-1">
            Total sweets shared in this session: <strong>{offeredCount}</strong> 🎁
          </span>
        </div>
      )}
    </div>
  );
};
