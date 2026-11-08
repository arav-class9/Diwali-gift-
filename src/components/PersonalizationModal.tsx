import React, { useState } from 'react';
import { Copy, Share2, Check, Download, Sparkles, RefreshCw, MessageSquare, BookOpen } from 'lucide-react';
import { toPng } from 'html-to-image';
import { audioSynth } from '../utils/audioSynth';
import { DiwaliQuotesLibrary } from './DiwaliQuotesLibrary';

interface PersonalizationModalProps {
  initialToName: string;
  initialFromName: string;
  initialMessage: string;
  initialTheme: string;
  onUpdateGreeting: (to: string, from: string, msg: string, theme: string) => void;
  onClose?: () => void;
}

export const PersonalizationModal: React.FC<PersonalizationModalProps> = ({
  initialToName,
  initialFromName,
  initialMessage,
  initialTheme,
  onUpdateGreeting,
  onClose,
}) => {
  const [toName, setToName] = useState(initialToName || '');
  const [fromName, setFromName] = useState(initialFromName || '');
  const [message, setMessage] = useState(initialMessage);
  const [theme, setTheme] = useState(initialTheme || 'gold');
  const [copied, setCopied] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [showQuotesVault, setShowQuotesVault] = useState(false);

  const presetMessages = [
    {
      label: 'Family & Home Blessings 🏡',
      text: 'May this Diwali bring endless happiness, prosperity, success, peace and new opportunities into your life. May your home always shine with love and positivity. Wishing you and your family a very Happy and Blessed Diwali! ✨',
    },
    {
      label: 'Friends & Joyful Wishes 🥂',
      text: 'Wishing you a Diwali full of sparkling laughter, delicious sweets, unforgettable memories, and brilliant success! May your year ahead be as bright as a million sparkling diyas! Happy Diwali my friend! 🪔',
    },
    {
      label: 'Teachers & Mentors 🙏',
      text: 'On this divine occasion of Diwali, expressing my heartfelt gratitude for your guidance, wisdom, and light in my life. May Goddess Lakshmi bless you with health, joy, and peace! Happy Diwali Respected Teacher! 🕯️',
    },
    {
      label: 'Relatives & Loved Ones ❤️',
      text: 'Sending you warmest Diwali love across the miles! May the festive lights illuminate your path toward joy, eternal good health, and abundance. Happy and prosperous Diwali to you and everyone at home! 🌸',
    },
  ];

  const generateShareUrl = () => {
    const baseUrl = window.location.origin + window.location.pathname;
    const params = new URLSearchParams();
    if (toName.trim()) params.set('to', toName.trim());
    if (fromName.trim()) params.set('from', fromName.trim());
    if (message.trim()) params.set('msg', message.trim());
    if (theme) params.set('theme', theme);
    return `${baseUrl}?${params.toString()}`;
  };

  const handleApplyChanges = () => {
    onUpdateGreeting(
      toName.trim() || 'Dear One',
      fromName.trim() || 'Your Wellwisher',
      message.trim(),
      theme
    );
    audioSynth.playDiyaLightSound();
  };

  const handleCopyLink = async () => {
    handleApplyChanges();
    const url = generateShareUrl();
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      audioSynth.playDiyaLightSound();
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  const handleWebShare = async () => {
    handleApplyChanges();
    const url = generateShareUrl();
    const title = `Happy Diwali Surprise for ${toName || 'You'} 🪔`;
    const text = `✨ You have a special Diwali surprise wish from ${fromName || 'Someone Special'}! Click to open your gift:`;

    if (navigator.share) {
      try {
        await navigator.share({ title, text, url });
      } catch {
        // User cancelled share
      }
    } else {
      handleCopyLink();
    }
  };

  const handleWhatsAppShare = () => {
    handleApplyChanges();
    const url = generateShareUrl();
    const sender = fromName.trim() || 'Someone Special';
    const recipient = toName.trim() ? ` *${toName.trim()}*` : '';
    const text = `🪔 *HAPPY DIWALI!* ✨\n\nHey${recipient}, you have received a personalized Diwali surprise gift from *${sender}*! 🎁\n\nOpen your special Diwali card here:\n${url}`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleDownloadCard = async () => {
    handleApplyChanges();
    const cardElement = document.getElementById('main-diwali-card');
    if (!cardElement) return;

    try {
      setIsDownloading(true);
      const dataUrl = await toPng(cardElement, { quality: 0.95 });
      const link = document.createElement('a');
      link.download = `Diwali_Wish_${toName || 'Greeting'}.png`;
      link.href = dataUrl;
      link.click();
      audioSynth.playGiftUnwrapSound();
    } catch (e) {
      console.error('Download failed', e);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="bg-[#180a2b]/95 border border-amber-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-2xl text-amber-50 max-w-2xl mx-auto my-6 relative animate-in fade-in zoom-in duration-300">
      <div className="flex items-center justify-between border-b border-amber-500/20 pb-4 mb-6">
        <div className="flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-amber-400" />
          <h2 className="text-xl sm:text-2xl font-bold font-display gold-text-gradient">
            Personalize Your Diwali Surprise 💌
          </h2>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="text-amber-400/70 hover:text-amber-200 text-sm font-bold p-1"
          >
            ✕
          </button>
        )}
      </div>

      <div className="space-y-5 text-left">
        {/* Recipient Name Input */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-amber-300 mb-1.5 font-cinzel">
            1. Recipient's Name (To):
          </label>
          <input
            type="text"
            value={toName}
            onChange={(e) => setToName(e.target.value)}
            placeholder="e.g. Grandma, Rahul, Sharma Family, Teacher"
            className="w-full px-4 py-3 rounded-xl bg-[#0e061a] border border-amber-500/30 text-amber-100 placeholder:text-amber-500/40 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 font-medium text-sm transition-all"
          />
        </div>

        {/* Sender Name Input */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-amber-300 mb-1.5 font-cinzel">
            2. Your Name (From):
          </label>
          <input
            type="text"
            value={fromName}
            onChange={(e) => setFromName(e.target.value)}
            placeholder="e.g. Aarav, Priya & Family"
            className="w-full px-4 py-3 rounded-xl bg-[#0e061a] border border-amber-500/30 text-amber-100 placeholder:text-amber-500/40 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 font-medium text-sm transition-all"
          />
        </div>

        {/* Wish Preset Picker */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-amber-300 font-cinzel">
              3. Choose Wish Message Template:
            </label>

            <button
              onClick={() => setShowQuotesVault(!showQuotesVault)}
              className="text-xs text-amber-300 font-semibold flex items-center gap-1 hover:underline"
            >
              <BookOpen className="w-3.5 h-3.5 text-amber-400" />
              <span>{showQuotesVault ? 'Hide Quotes Vault' : 'Browse Quotes & Shayari 📜'}</span>
            </button>
          </div>

          {showQuotesVault && (
            <div className="mb-4 p-3 bg-[#0a0314] rounded-2xl border border-amber-500/30 max-h-60 overflow-y-auto">
              <DiwaliQuotesLibrary
                onSelectQuote={(q) => {
                  setMessage(q);
                  setShowQuotesVault(false);
                }}
              />
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-2">
            {presetMessages.map((p, idx) => (
              <button
                key={idx}
                onClick={() => setMessage(p.text)}
                className="px-3 py-2 rounded-xl bg-[#0e061a] border border-amber-500/20 hover:border-amber-400/60 text-xs font-medium text-amber-200/90 hover:text-amber-100 text-left transition-colors flex items-center justify-between gap-1"
              >
                <span>{p.label}</span>
                <MessageSquare className="w-3.5 h-3.5 text-amber-400/60 shrink-0" />
              </button>
            ))}
          </div>

          <textarea
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Write your custom heart-felt Diwali blessing..."
            className="w-full px-4 py-3 rounded-xl bg-[#0e061a] border border-amber-500/30 text-amber-100 placeholder:text-amber-500/40 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 text-sm font-medium transition-all"
          />
        </div>

        {/* Card Color Theme Picker */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-amber-300 mb-1.5 font-cinzel">
            4. Card Theme Palette:
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              { id: 'gold', name: 'Royal Gold', color: 'from-amber-500 to-yellow-600' },
              { id: 'crimson', name: 'Velvet Crimson', color: 'from-rose-600 to-red-800' },
              { id: 'peacock', name: 'Peacock Teal', color: 'from-cyan-600 to-teal-800' },
              { id: 'marigold', name: 'Marigold Sunset', color: 'from-orange-500 to-amber-700' },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setTheme(t.id)}
                className={`p-2.5 rounded-xl border flex items-center gap-2 text-xs font-semibold transition-all ${
                  theme === t.id
                    ? 'border-amber-300 bg-amber-500/20 text-amber-100 ring-1 ring-amber-300'
                    : 'border-amber-500/20 bg-[#0e061a] text-amber-300/70 hover:bg-amber-500/10'
                }`}
              >
                <div className={`w-3.5 h-3.5 rounded-full bg-gradient-to-r ${t.color}`} />
                <span>{t.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Action Buttons: Apply, Copy Link, Share */}
      <div className="mt-8 pt-6 border-t border-amber-500/20 flex flex-col sm:flex-row items-center justify-between gap-3">
        <button
          onClick={handleApplyChanges}
          className="w-full sm:w-auto px-5 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 text-amber-950 font-bold text-sm shadow-[0_0_15px_rgba(255,215,0,0.4)] hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2"
        >
          <RefreshCw className="w-4 h-4 text-amber-950" />
          <span>Update Card Preview</span>
        </button>

        <div className="w-full sm:w-auto flex items-center gap-2">
          {/* WhatsApp Share Button */}
          <button
            onClick={handleWhatsAppShare}
            className="flex-1 sm:flex-none px-4 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5"
            title="Share directly via WhatsApp"
          >
            <span>📱 WhatsApp</span>
          </button>

          {/* Web Share / Copy Link */}
          <button
            onClick={handleWebShare}
            className="flex-1 sm:flex-none px-4 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5"
            title="Share link"
          >
            <Share2 className="w-4 h-4" />
            <span>Share</span>
          </button>

          {/* Copy Link Button */}
          <button
            onClick={handleCopyLink}
            className="flex-1 sm:flex-none px-4 py-3 rounded-xl bg-[#0e061a] border border-amber-400/50 hover:bg-amber-500/20 text-amber-200 font-bold text-xs transition-all flex items-center justify-center gap-1.5"
            title="Copy URL"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copied!' : 'Copy Link'}</span>
          </button>

          {/* Download Image Button */}
          <button
            onClick={handleDownloadCard}
            disabled={isDownloading}
            className="p-3 rounded-xl bg-[#0e061a] border border-amber-400/50 hover:bg-amber-500/20 text-amber-200 transition-all disabled:opacity-50"
            title="Download greeting card image"
          >
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
