import React, { useState } from 'react';
import { Sparkles, Share2, Edit3, Heart, Flame, Check, Send, Sun } from 'lucide-react';
import { DiyaDecoration } from './DiyaDecoration';
import { RangoliMandala } from './RangoliMandala';
import { AkashKandil } from './AkashKandil';
import { EcoCrackersSimulator } from './EcoCrackersSimulator';
import { SweetOfferingModal } from './SweetOfferingModal';
import { VirtualAartiThali } from './VirtualAartiThali';
import { DiwaliQuotesLibrary } from './DiwaliQuotesLibrary';
import { DiwaliCountdown } from './DiwaliCountdown';
import { PersonalizationModal } from './PersonalizationModal';
import { audioSynth } from '../utils/audioSynth';
import confetti from 'canvas-confetti';

interface GreetingCardViewProps {
  toName: string;
  fromName: string;
  message: string;
  theme: string;
  onUpdateGreeting: (to: string, from: string, msg: string, theme: string) => void;
}

export const GreetingCardView: React.FC<GreetingCardViewProps> = ({
  toName,
  fromName,
  message,
  theme,
  onUpdateGreeting,
}) => {
  const [showPersonalizeModal, setShowPersonalizeModal] = useState(false);
  const [diyasLitCount, setDiyasLitCount] = useState(5);
  const [copiedLink, setCopiedLink] = useState(false);

  const themeClasses = {
    gold: {
      cardBg: 'from-[#1a0e2e]/90 via-[#22103a]/90 to-[#130722]/90',
      border: 'border-amber-500/40',
      textGrad: 'gold-text-gradient',
      accentBg: 'bg-amber-500/20 text-amber-200',
    },
    crimson: {
      cardBg: 'from-[#2b0816]/90 via-[#3d0b1e]/90 to-[#1c040d]/90',
      border: 'border-rose-500/40',
      textGrad: 'bg-gradient-to-r from-rose-200 via-amber-200 to-rose-300 bg-clip-text text-transparent',
      accentBg: 'bg-rose-500/20 text-rose-200',
    },
    peacock: {
      cardBg: 'from-[#05212e]/90 via-[#073042]/90 to-[#02141d]/90',
      border: 'border-cyan-500/40',
      textGrad: 'bg-gradient-to-r from-cyan-200 via-emerald-200 to-amber-200 bg-clip-text text-transparent',
      accentBg: 'bg-cyan-500/20 text-cyan-200',
    },
    marigold: {
      cardBg: 'from-[#2b1406]/90 via-[#3d1d09]/90 to-[#1b0c03]/90',
      border: 'border-orange-500/40',
      textGrad: 'bg-gradient-to-r from-amber-200 via-orange-300 to-yellow-200 bg-clip-text text-transparent',
      accentBg: 'bg-orange-500/20 text-orange-200',
    },
  }[theme] || {
    cardBg: 'from-[#1a0e2e]/90 via-[#22103a]/90 to-[#130722]/90',
    border: 'border-amber-500/40',
    textGrad: 'gold-text-gradient',
    accentBg: 'bg-amber-500/20 text-amber-200',
  };

  const handleShareClick = async () => {
    const url = window.location.href;
    const shareData = {
      title: `Happy Diwali Surprise for ${toName || 'You'} 🪔`,
      text: `✨ You have received a special Diwali greeting surprise from ${fromName || 'Someone Special'}! Click to open:`,
      url,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        // User cancelled
      }
    } else {
      try {
        await navigator.clipboard.writeText(url);
        setCopiedLink(true);
        audioSynth.playDiyaLightSound();
        setTimeout(() => setCopiedLink(false), 2500);
      } catch {
        // Fallback
      }
    }
  };

  const handleSendWishBack = () => {
    // Reverse sender and recipient to send wish back
    onUpdateGreeting(
      fromName || 'Dear Friend',
      toName || 'Your Name',
      'Thank you so much for the wonderful Diwali surprise! Wishing you and your family a very Happy, Healthy, and Prosperous Diwali! May Goddess Lakshmi shower endless blessings upon your home! 🪔✨',
      theme
    );
    setShowPersonalizeModal(true);
    audioSynth.playGiftUnwrapSound();
  };

  const handleRelightAllDiyas = () => {
    setDiyasLitCount(5);
    audioSynth.playGiftUnwrapSound();
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ffd700', '#ff9100', '#ffffff'],
    });
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-start p-4 sm:p-8 z-20">
      {/* Swaying Hanging Kandil Lanterns */}
      <div className="fixed top-0 left-2 sm:left-10 z-30 pointer-events-none">
        <AkashKandil color="gold" delay="0s" />
      </div>
      <div className="fixed top-0 right-2 sm:right-10 z-30 pointer-events-none">
        <AkashKandil color="magenta" delay="1.2s" />
      </div>

      {/* Top Floating Control Toolbar */}
      <div className="w-full max-w-4xl flex items-center justify-between mb-6 pt-2 z-40">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowPersonalizeModal(true)}
            className="px-4 py-2 rounded-full bg-[#1b0d35]/90 border border-amber-500/40 text-amber-300 font-cinzel text-xs font-bold hover:bg-amber-500/20 transition-all flex items-center gap-1.5 shadow-lg backdrop-blur-md"
          >
            <Edit3 className="w-3.5 h-3.5 text-amber-300" />
            <span>Customize Wish</span>
          </button>

          {/* Send Wish Back Button */}
          {fromName && (
            <button
              onClick={handleSendWishBack}
              className="px-4 py-2 rounded-full bg-rose-600/90 hover:bg-rose-500 border border-rose-400/50 text-rose-100 font-cinzel text-xs font-bold transition-all flex items-center gap-1.5 shadow-lg backdrop-blur-md"
            >
              <Send className="w-3.5 h-3.5 text-rose-200" />
              <span>Reply to {fromName} 💌</span>
            </button>
          )}
        </div>

        <button
          onClick={handleShareClick}
          className="px-4 py-2 rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 text-amber-950 font-bold text-xs shadow-[0_0_15px_rgba(255,215,0,0.4)] hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5"
        >
          {copiedLink ? (
            <>
              <Check className="w-3.5 h-3.5 text-amber-950" />
              <span>Copied Link!</span>
            </>
          ) : (
            <>
              <Share2 className="w-3.5 h-3.5 text-amber-950" />
              <span>Share Wish 💌</span>
            </>
          )}
        </button>
      </div>

      {/* Main Diwali Greeting Card Box */}
      <div
        id="main-diwali-card"
        className={`w-full max-w-4xl rounded-3xl bg-gradient-to-b ${themeClasses.cardBg} border ${themeClasses.border} p-6 sm:p-10 shadow-[0_0_50px_rgba(255,215,0,0.2)] backdrop-blur-2xl relative overflow-hidden my-4 text-center`}
      >
        {/* Background Decorative Rangoli Watermark */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-15 pointer-events-none scale-150">
          <RangoliMandala size={500} theme={theme === 'peacock' ? 'peacock' : theme === 'crimson' ? 'crimson' : 'gold'} />
        </div>

        {/* Shubh Deepavali Header Tag */}
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-widest font-cinzel mb-4">
          <Sparkles className="w-4 h-4 text-amber-300 animate-spin" />
          <span>Shubh Deepavali Blessings 🪔</span>
        </div>

        {/* Main HUGE Animated Title: "HAPPY DIWALI 🪔" */}
        <h1 className={`text-4xl sm:text-6xl md:text-7xl font-extrabold font-display ${themeClasses.textGrad} tracking-tight leading-none mb-3 drop-shadow-[0_0_30px_rgba(255,215,0,0.5)]`}>
          HAPPY DIWALI 🪔
        </h1>

        {/* Personalized Recipient Name Subtitle */}
        {toName && (
          <div className="mt-2 mb-4">
            <span className="inline-block text-lg sm:text-2xl font-bold font-display text-amber-200">
              A Special Diwali Wish For You, <span className="text-amber-300 underline underline-offset-4 decoration-amber-500/60">{toName}</span> ❤️
            </span>
          </div>
        )}

        {/* Horizontal Diya String Decoration */}
        <div className="my-6 flex items-center justify-center gap-3 sm:gap-8 flex-wrap">
          <DiyaDecoration
            size="md"
            isLit={diyasLitCount >= 1}
            onToggleLit={(lit) => setDiyasLitCount((prev) => (lit ? prev + 1 : prev - 1))}
          />
          <DiyaDecoration
            size="lg"
            isLit={diyasLitCount >= 2}
            onToggleLit={(lit) => setDiyasLitCount((prev) => (lit ? prev + 1 : prev - 1))}
          />
          <DiyaDecoration
            size="xl"
            isLit={diyasLitCount >= 3}
            onToggleLit={(lit) => setDiyasLitCount((prev) => (lit ? prev + 1 : prev - 1))}
            label="Shubham"
          />
          <DiyaDecoration
            size="lg"
            isLit={diyasLitCount >= 4}
            onToggleLit={(lit) => setDiyasLitCount((prev) => (lit ? prev + 1 : prev - 1))}
          />
          <DiyaDecoration
            size="md"
            isLit={diyasLitCount >= 5}
            onToggleLit={(lit) => setDiyasLitCount((prev) => (lit ? prev + 1 : prev - 1))}
          />
        </div>

        {/* Diya Lighting Count Status */}
        <div className="mb-6">
          <button
            onClick={handleRelightAllDiyas}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-300/90 text-xs font-semibold hover:bg-amber-500/20 transition-all"
            title="Relight all 5 sacred diyas"
          >
            <Flame className="w-3.5 h-3.5 text-orange-400" />
            <span>{diyasLitCount} / 5 Sacred Diyas Glowing • Tap to Relight 🕯️</span>
          </button>
        </div>

        {/* The Special Diwali Wish Message Box */}
        <div className="bg-[#0f061c]/80 border border-amber-500/30 rounded-2xl p-6 sm:p-8 max-w-2xl mx-auto shadow-inner relative my-6">
          <div className="text-3xl text-amber-400/30 font-serif absolute top-3 left-4 select-none">“</div>
          <p className="text-base sm:text-xl font-medium text-amber-100/95 leading-relaxed font-sans italic relative z-10 px-4 whitespace-pre-line">
            {message}
          </p>
          <div className="text-3xl text-amber-400/30 font-serif absolute bottom-2 right-4 select-none">”</div>
        </div>

        {/* Sender Name Signature */}
        {fromName && (
          <div className="mt-4 mb-2">
            <span className="text-sm sm:text-base font-cinzel tracking-wider text-amber-300/90 block">
              With Warmest Love & Blessings,
            </span>
            <span className="text-xl sm:text-3xl font-bold font-script gold-text-gradient block mt-1">
              From: {fromName} ❤️
            </span>
          </div>
        )}

        {/* Primary CTA Buttons */}
        <div className="mt-8 pt-6 border-t border-amber-500/20 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={handleShareClick}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 text-amber-950 font-black text-base font-cinzel shadow-[0_0_25px_rgba(255,215,0,0.5)] hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <Share2 className="w-5 h-5 text-amber-950" />
            <span>Share This Diwali Wish 💌</span>
          </button>

          {fromName && (
            <button
              onClick={handleSendWishBack}
              className="w-full sm:w-auto px-6 py-4 rounded-full bg-gradient-to-r from-rose-600 to-pink-600 text-white font-bold text-sm shadow-md hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4 text-white" />
              <span>Send Wish Back to {fromName} 💌</span>
            </button>
          )}

          <button
            onClick={() => setShowPersonalizeModal(true)}
            className="w-full sm:w-auto px-6 py-4 rounded-full bg-[#100720] border border-amber-400/40 text-amber-200 font-bold text-sm hover:bg-amber-500/20 transition-all flex items-center justify-center gap-2"
          >
            <Edit3 className="w-4 h-4 text-amber-400" />
            <span>Create Your Own Surprise 🎁</span>
          </button>
        </div>
      </div>

      {/* Interactive Virtual Lakshmi Aarti Ceremony Section */}
      <div className="w-full">
        <VirtualAartiThali />
      </div>

      {/* Interactive Eco Crackers Section */}
      <div className="w-full">
        <EcoCrackersSimulator />
      </div>

      {/* Virtual Sweets & Prasad Offering Section */}
      <div className="w-full">
        <SweetOfferingModal recipientName={toName || 'Dear Friend'} senderName={fromName || 'Wellwisher'} />
      </div>

      {/* Quotes & Shayari Library Vault */}
      <div className="w-full">
        <DiwaliQuotesLibrary
          onSelectQuote={(q) => {
            onUpdateGreeting(toName, fromName, q, theme);
            window.scrollTo({ top: 150, behavior: 'smooth' });
          }}
        />
      </div>

      {/* Live Countdown & Evening Mahurat Clock */}
      <div className="w-full">
        <DiwaliCountdown />
      </div>

      {/* Modal for Personalization Customizer */}
      {showPersonalizeModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto">
          <PersonalizationModal
            initialToName={toName}
            initialFromName={fromName}
            initialMessage={message}
            initialTheme={theme}
            onUpdateGreeting={(t, f, m, th) => {
              onUpdateGreeting(t, f, m, th);
              setShowPersonalizeModal(false);
            }}
            onClose={() => setShowPersonalizeModal(false)}
          />
        </div>
      )}
    </div>
  );
};
