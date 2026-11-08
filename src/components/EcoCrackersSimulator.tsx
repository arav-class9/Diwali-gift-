import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Flame, RotateCw, Rocket } from 'lucide-react';
import { audioSynth } from '../utils/audioSynth';
import confetti from 'canvas-confetti';

export const EcoCrackersSimulator: React.FC = () => {
  const [activeCracker, setActiveCracker] = useState<'phuljhari' | 'anar' | 'chakri' | 'rocket'>('phuljhari');
  const [anarActive, setAnarActive] = useState(false);
  const [chakriActive, setChakriActive] = useState(false);
  const sparklerCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // Anar / Fountain effect
  const triggerAnar = () => {
    setAnarActive(true);
    audioSynth.playCrackerBurstSound();

    const duration = 2.5 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 8,
        angle: 90,
        spread: 45,
        origin: { x: 0.5, y: 0.75 },
        colors: ['#ffd700', '#ff9100', '#ffffff', '#ff1744'],
        scalar: 1.2,
        ticks: 80,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      } else {
        setAnarActive(false);
      }
    };
    frame();
  };

  // Chakri / Ground Spinner effect
  const triggerChakri = () => {
    setChakriActive(true);
    audioSynth.playCrackerBurstSound();

    let angle = 0;
    const interval = setInterval(() => {
      angle += 45;
      confetti({
        particleCount: 12,
        angle: angle % 360,
        spread: 60,
        origin: { x: 0.5, y: 0.65 },
        colors: ['#00e5ff', '#ffd700', '#ff007f', '#76ff03'],
        scalar: 0.9,
      });
    }, 150);

    setTimeout(() => {
      clearInterval(interval);
      setChakriActive(false);
    }, 2800);
  };

  // Rocket Launch
  const triggerRocket = () => {
    audioSynth.playGiftUnwrapSound();
    setTimeout(() => {
      audioSynth.playCrackerBurstSound();
      confetti({
        particleCount: 120,
        spread: 100,
        origin: { x: Math.random() * 0.6 + 0.2, y: 0.3 },
        colors: ['#ffd700', '#ff4500', '#d500f9', '#00e5ff', '#ffffff'],
      });
    }, 400);
  };

  // Phuljhari / Sparkler drawing effect
  useEffect(() => {
    if (activeCracker !== 'phuljhari') return;
    const canvas = sparklerCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let isDrawing = false;

    const handlePointerDown = (e: PointerEvent) => {
      isDrawing = true;
      drawSparkle(e);
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (!isDrawing) return;
      drawSparkle(e);
    };

    const handlePointerUp = () => {
      isDrawing = false;
    };

    const drawSparkle = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      audioSynth.playCrackerBurstSound();

      // Draw glowing gold spark burst
      for (let i = 0; i < 15; i++) {
        const radius = Math.random() * 18;
        const angle = Math.random() * Math.PI * 2;
        const px = x + Math.cos(angle) * radius;
        const py = y + Math.sin(angle) * radius;

        ctx.fillStyle = ['#ffd700', '#fff3a1', '#ff9100', '#ffffff'][Math.floor(Math.random() * 4)];
        ctx.beginPath();
        ctx.arc(px, py, Math.random() * 3.5 + 1, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    canvas.addEventListener('pointerdown', handlePointerDown);
    canvas.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);

    return () => {
      canvas.removeEventListener('pointerdown', handlePointerDown);
      canvas.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, [activeCracker]);

  const clearSparklerCanvas = () => {
    const canvas = sparklerCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  return (
    <div className="bg-[#160a29]/90 border border-amber-500/30 rounded-3xl p-6 shadow-2xl backdrop-blur-xl my-8 max-w-4xl mx-auto">
      <div className="text-center mb-6">
        <span className="text-xs font-bold uppercase tracking-widest text-amber-400 font-cinzel">
          🌱 Eco-Friendly Celebration
        </span>
        <h3 className="text-2xl font-bold font-display gold-text-gradient mt-1">
          Digital Diwali Firecrackers Simulator 🎆
        </h3>
        <p className="text-sm text-amber-200/80 mt-1 max-w-lg mx-auto">
          Celebrate an eco-friendly Diwali! Select a firecracker below to burst sparkling lights without smoke or harm.
        </p>
      </div>

      {/* Cracker Selector Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        <button
          onClick={() => setActiveCracker('phuljhari')}
          className={`p-3.5 rounded-2xl border flex flex-col items-center gap-1.5 transition-all text-xs font-semibold ${
            activeCracker === 'phuljhari'
              ? 'bg-amber-500/30 border-amber-400 text-amber-100 shadow-[0_0_15px_rgba(255,215,0,0.3)]'
              : 'bg-[#100720] border-amber-500/20 text-amber-300/70 hover:bg-amber-500/10'
          }`}
        >
          <Sparkles className="w-5 h-5 text-amber-300" />
          <span>✨ Golden Phuljhari</span>
        </button>

        <button
          onClick={() => setActiveCracker('anar')}
          className={`p-3.5 rounded-2xl border flex flex-col items-center gap-1.5 transition-all text-xs font-semibold ${
            activeCracker === 'anar'
              ? 'bg-amber-500/30 border-amber-400 text-amber-100 shadow-[0_0_15px_rgba(255,215,0,0.3)]'
              : 'bg-[#100720] border-amber-500/20 text-amber-300/70 hover:bg-amber-500/10'
          }`}
        >
          <Flame className="w-5 h-5 text-orange-400" />
          <span>🌋 Royal Anar Fountain</span>
        </button>

        <button
          onClick={() => setActiveCracker('chakri')}
          className={`p-3.5 rounded-2xl border flex flex-col items-center gap-1.5 transition-all text-xs font-semibold ${
            activeCracker === 'chakri'
              ? 'bg-amber-500/30 border-amber-400 text-amber-100 shadow-[0_0_15px_rgba(255,215,0,0.3)]'
              : 'bg-[#100720] border-amber-500/20 text-amber-300/70 hover:bg-amber-500/10'
          }`}
        >
          <RotateCw className="w-5 h-5 text-cyan-300" />
          <span>🌀 Zameen Chakri</span>
        </button>

        <button
          onClick={() => setActiveCracker('rocket')}
          className={`p-3.5 rounded-2xl border flex flex-col items-center gap-1.5 transition-all text-xs font-semibold ${
            activeCracker === 'rocket'
              ? 'bg-amber-500/30 border-amber-400 text-amber-100 shadow-[0_0_15px_rgba(255,215,0,0.3)]'
              : 'bg-[#100720] border-amber-500/20 text-amber-300/70 hover:bg-amber-500/10'
          }`}
        >
          <Rocket className="w-5 h-5 text-pink-400" />
          <span>🚀 Sky Rocket Burst</span>
        </button>
      </div>

      {/* Interactive Display Area */}
      <div className="bg-[#0b0517] border border-amber-500/20 rounded-2xl min-h-[220px] p-4 relative flex flex-col items-center justify-center overflow-hidden">
        {activeCracker === 'phuljhari' && (
          <div className="w-full flex flex-col items-center">
            <span className="text-xs text-amber-300/80 mb-2 font-medium">
              ✨ Drag or tap inside the box below to write golden sparkler trails!
            </span>
            <div className="relative w-full max-w-md h-40 border border-amber-500/30 rounded-xl bg-black/60 overflow-hidden cursor-crosshair">
              <canvas
                ref={sparklerCanvasRef}
                width={450}
                height={160}
                className="w-full h-full touch-none"
              />
            </div>
            <button
              onClick={clearSparklerCanvas}
              className="mt-3 text-xs text-amber-400 underline hover:text-amber-200"
            >
              Clear Sparkler Canvas
            </button>
          </div>
        )}

        {activeCracker === 'anar' && (
          <div className="flex flex-col items-center gap-4 py-4">
            <div className={`relative w-20 h-24 ${anarActive ? 'scale-110' : ''} transition-transform`}>
              {/* Anar Clay Pot Graphic */}
              <svg viewBox="0 0 100 120" className="w-full h-full">
                <polygon points="20,110 80,110 90,50 10,50" fill="#d97706" stroke="#ffd700" strokeWidth="2" />
                <polygon points="35,50 65,50 55,25 45,25" fill="#92400e" stroke="#ffd700" strokeWidth="1.5" />
                {anarActive && (
                  <path d="M 50 25 Q 20 -30 50 -60 Q 80 -30 50 25" fill="#ffe600" opacity="0.8" className="animate-pulse" />
                )}
              </svg>
            </div>
            <button
              onClick={triggerAnar}
              disabled={anarActive}
              className="px-6 py-2.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-amber-950 font-bold text-sm shadow-[0_0_20px_rgba(255,145,0,0.5)] hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
            >
              {anarActive ? '🔥 Fountain Bursting...' : '🔥 Light Anar Fountain'}
            </button>
          </div>
        )}

        {activeCracker === 'chakri' && (
          <div className="flex flex-col items-center gap-4 py-4">
            <div className={`w-20 h-20 ${chakriActive ? 'animate-spin' : ''} transition-all`}>
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <circle cx="50" cy="50" r="45" fill="#00e5ff" fillOpacity="0.3" stroke="#00e5ff" strokeWidth="2" />
                <path d="M 50 5 A 45 45 0 0 1 95 50 L 50 50 Z" fill="#ffd700" />
                <path d="M 50 95 A 45 45 0 0 1 5 50 L 50 50 Z" fill="#ff007f" />
                <circle cx="50" cy="50" r="12" fill="#ffffff" />
              </svg>
            </div>
            <button
              onClick={triggerChakri}
              disabled={chakriActive}
              className="px-6 py-2.5 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 font-bold text-sm shadow-[0_0_20px_rgba(0,229,255,0.5)] hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
            >
              {chakriActive ? '🌀 Spinning Sparks...' : '🌀 Spin Ground Chakri'}
            </button>
          </div>
        )}

        {activeCracker === 'rocket' && (
          <div className="flex flex-col items-center gap-4 py-4">
            <div className="w-12 h-24">
              <svg viewBox="0 0 60 120" className="w-full h-full">
                <rect x="26" y="40" width="8" height="70" fill="#f59e0b" />
                <polygon points="15,40 45,40 30,10" fill="#ff007f" stroke="#ffd700" strokeWidth="1.5" />
                <rect x="22" y="40" width="16" height="35" fill="#d32f2f" />
              </svg>
            </div>
            <button
              onClick={triggerRocket}
              className="px-6 py-2.5 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold text-sm shadow-[0_0_20px_rgba(255,0,127,0.5)] hover:scale-105 active:scale-95 transition-all"
            >
              🚀 Launch Sky Rocket
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
