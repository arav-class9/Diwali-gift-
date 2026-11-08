import React, { useState, useEffect } from 'react';
import { Clock, Sparkles } from 'lucide-react';

export const DiwaliCountdown: React.FC = () => {
  // Target Diwali Date: November 8, 2026
  const targetDate = new Date('2026-11-08T18:00:00');

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-[#150926]/90 border border-amber-500/30 rounded-3xl p-6 shadow-xl backdrop-blur-xl max-w-4xl mx-auto my-6 text-center">
      <div className="flex items-center justify-center gap-2 mb-4">
        <Clock className="w-5 h-5 text-amber-400 animate-pulse" />
        <h3 className="text-xl font-bold font-display gold-text-gradient">
          Diwali Lakshmi Puja Countdown & Auspicious Mahurat ⏳
        </h3>
      </div>

      {/* Countdown Timer Digit Blocks */}
      <div className="grid grid-cols-4 gap-3 max-w-lg mx-auto mb-4">
        {[
          { label: 'Days', val: timeLeft.days },
          { label: 'Hours', val: timeLeft.hours },
          { label: 'Mins', val: timeLeft.minutes },
          { label: 'Secs', val: timeLeft.seconds },
        ].map((item, idx) => (
          <div
            key={idx}
            className="p-3 sm:p-4 rounded-2xl bg-[#0b0416] border border-amber-500/25 flex flex-col items-center justify-center shadow-inner"
          >
            <span className="text-2xl sm:text-4xl font-black font-cinzel text-amber-300 tabular-nums">
              {String(item.val).padStart(2, '0')}
            </span>
            <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-amber-400/70 mt-1 font-sans">
              {item.label}
            </span>
          </div>
        ))}
      </div>

      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-200 text-xs font-medium">
        <Sparkles className="w-3.5 h-3.5 text-amber-400" />
        <span>Pradosh Kaal Lakshmi Puja Evening Mahurat: <strong>06:15 PM – 08:15 PM</strong></span>
      </div>
    </div>
  );
};
