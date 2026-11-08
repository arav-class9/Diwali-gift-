import React, { useMemo } from 'react';

interface Particle {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  type: 'gold' | 'petal' | 'star';
}

export const FloatingParticles: React.FC = () => {
  const particles = useMemo<Particle[]>(() => {
    return Array.from({ length: 35 }).map((_, i) => ({
      id: i,
      left: Math.random() * 98,
      size: Math.random() * (i % 3 === 0 ? 14 : 6) + 4,
      duration: Math.random() * 12 + 8,
      delay: Math.random() * 10,
      type: i % 4 === 0 ? 'petal' : i % 5 === 0 ? 'star' : 'gold',
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-10">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute animate-float-particle"
          style={{
            left: `${p.left}%`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        >
          {p.type === 'petal' ? (
            // Marigold Petal (Orange Gold)
            <div
              className="rounded-full bg-gradient-to-tr from-orange-500 via-amber-400 to-yellow-300 opacity-75 shadow-sm transform rotate-45"
              style={{ width: p.size, height: p.size * 1.5 }}
            />
          ) : p.type === 'star' ? (
            // Sparkling Star
            <div className="text-amber-200 text-xs opacity-90 drop-shadow-[0_0_8px_rgba(255,215,0,0.8)]">
              ✨
            </div>
          ) : (
            // Golden Dust Particle
            <div
              className="rounded-full bg-amber-300 opacity-80 blur-[0.5px] shadow-[0_0_10px_#ffd700]"
              style={{ width: p.size, height: p.size }}
            />
          )}
        </div>
      ))}
    </div>
  );
};
