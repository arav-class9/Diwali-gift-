import React, { useState } from 'react';
import { BookOpen, Copy, Check, Sparkles, MessageCircle } from 'lucide-react';
import { audioSynth } from '../utils/audioSynth';

interface DiwaliQuotesLibraryProps {
  onSelectQuote?: (quoteText: string) => void;
}

export const DiwaliQuotesLibrary: React.FC<DiwaliQuotesLibraryProps> = ({ onSelectQuote }) => {
  const [activeCategory, setActiveCategory] = useState<'blessings' | 'shayari' | 'mantra' | 'english'>('blessings');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const categories = [
    { id: 'blessings', name: 'Family & Prosperity 🙏' },
    { id: 'shayari', name: 'Hindi Festive Shayari 📜' },
    { id: 'mantra', name: 'Sanskrit Mantras 🕉️' },
    { id: 'english', name: 'Modern English Wishes 🌟' },
  ];

  const quotes = {
    blessings: [
      'May the light of a thousand diyas illuminate your home with peace, health, wealth, and eternal happiness. Wishing you and your loved ones a joyful and blessed Deepavali! 🪔✨',
      'May Goddess Lakshmi bless your house with prosperity, Lord Ganesha bless you with wisdom, and Goddess Saraswati bless you with knowledge on this auspicious Diwali! 🌸',
      'May the supreme light of Diwali remove darkness from your path and fill your life with warmth, success, and pure delight! Happy Diwali! 🕯️',
    ],
    shayari: [
      'दीपक का प्रकाश हर पल आपके जीवन में नई रोशनी लाए,\nबस यही शुभकामना है हमारी आपके लिए इस दीपावली के पावन अवसर पर।\nशुभ दीपावली! 🪔✨',
      'झिलमिलाते दीपों की रोशनी से प्रकाशित हो आपका घर-आंगन,\nहर तरफ खुशियां ही खुशियां हों, ऐसा हो आपका यह पावन पर्व।\nहैप्पी दिवाली! ❤️',
      'गुल ने गुलशन से गुलफाम भेजा है,\nसितारों ने गगन से सलाम भेजा है,\nमुबारक हो आपको यह दीवाली,\nहमने दिल से आपको यह पैगाम भेजा है! 🎁',
    ],
    mantra: [
      'ॐ श्रीम ह्रीम क्लीम महालक्ष्म्यै नमः ॥\nMay the divine goddess of fortune Mahalakshmi bestow eternal peace, prosperity and victory upon your household. Shubh Deepavali! 🕉️✨',
      'ॐ गं गणपतये नमः ॥\nMay Lord Ganesha destroy all obstacles in your path and bless your new endeavors with grand success and good health! 🪷',
      'असतो मा सद्गमय, तमसो मा ज्योतिर्गमय ।\nLead us from darkness to light, from ignorance to truth. Wishing you a light-filled Deepavali! 🪔',
    ],
    english: [
      'Wishing you a festival filled with sweet memories, delicious feasts, sparkling laughter, and bright new beginnings. Happy Diwali! 🥂',
      'May your year ahead shine as brightly as a million sparkling fireworks. Wishing you limitless success and joy! 🎆',
      'Sending you a pocket full of smiles, a heart full of joy, and a home full of divine light. Have a wonderful Diwali! ✨',
    ],
  }[activeCategory];

  const handleCopy = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    audioSynth.playDiyaLightSound();
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleApply = (text: string) => {
    if (onSelectQuote) {
      onSelectQuote(text);
      audioSynth.playDiyaLightSound();
    }
  };

  return (
    <div className="bg-[#170a2a]/95 border border-amber-500/30 rounded-3xl p-6 shadow-2xl backdrop-blur-xl max-w-4xl mx-auto my-8">
      <div className="text-center mb-6">
        <span className="text-xs font-bold uppercase tracking-widest text-amber-400 font-cinzel">
          📜 Festive Wishes Vault
        </span>
        <h3 className="text-2xl font-bold font-display gold-text-gradient mt-1">
          Diwali Quotes, Shayari & Sanskrit Mantras 🌸
        </h3>
        <p className="text-sm text-amber-200/80 mt-1 max-w-lg mx-auto">
          Choose from curated festive poetry, Hindi Shayari, or Sanskrit mantras to personalize your gift card!
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center justify-center gap-2 flex-wrap mb-6">
        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => setActiveCategory(c.id as any)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeCategory === c.id
                ? 'bg-amber-500/30 border border-amber-400 text-amber-100 shadow-[0_0_15px_rgba(255,215,0,0.3)]'
                : 'bg-[#0f061c] border border-amber-500/20 text-amber-300/70 hover:bg-amber-500/10'
            }`}
          >
            {c.name}
          </button>
        ))}
      </div>

      {/* Quote Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {quotes.map((q, idx) => (
          <div
            key={idx}
            className="p-5 rounded-2xl bg-[#0f051e] border border-amber-500/20 hover:border-amber-400/50 transition-all flex flex-col justify-between group"
          >
            <p className="text-xs sm:text-sm text-amber-100/90 whitespace-pre-line leading-relaxed font-serif italic">
              "{q}"
            </p>

            <div className="mt-4 pt-3 border-t border-amber-500/15 flex items-center justify-between gap-2">
              {onSelectQuote && (
                <button
                  onClick={() => handleApply(q)}
                  className="text-xs font-bold text-amber-400 hover:text-amber-200 flex items-center gap-1 group-hover:underline"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Use in My Card</span>
                </button>
              )}

              <button
                onClick={() => handleCopy(q, idx)}
                className="p-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 text-xs transition-colors"
                title="Copy Quote text"
              >
                {copiedIndex === idx ? (
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
