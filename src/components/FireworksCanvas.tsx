import React, { useEffect, useRef } from 'react';
import { audioSynth } from '../utils/audioSynth';

interface FireworksCanvasProps {
  autoLaunch?: boolean;
  intensity?: 'low' | 'medium' | 'high';
  interactive?: boolean;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  decay: number;
  color: string;
  size: number;
  flicker?: boolean;
}

interface Rocket {
  x: number;
  y: number;
  targetY: number;
  vy: number;
  color: string;
  trail: { x: number; y: number }[];
}

export const FireworksCanvas: React.FC<FireworksCanvasProps> = ({
  autoLaunch = true,
  intensity = 'medium',
  interactive = true,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    let rockets: Rocket[] = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const colors = [
      '#ffd700', // Gold
      '#ff4500', // Orange Red
      '#ff007f', // Deep Pink
      '#00e5ff', // Bright Cyan
      '#76ff03', // Lime Green
      '#d500f9', // Electric Purple
      '#ffffff', // Sparkle White
      '#ffab00', // Amber
    ];

    const createExplosion = (x: number, y: number, colorOverride?: string) => {
      const color = colorOverride || colors[Math.floor(Math.random() * colors.length)];
      const count = intensity === 'high' ? 80 : intensity === 'medium' ? 50 : 35;
      
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + (Math.random() * 0.2 - 0.1);
        const speed = Math.random() * 6 + 2;
        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          alpha: 1,
          decay: Math.random() * 0.018 + 0.01,
          color,
          size: Math.random() * 3 + 1.5,
          flicker: Math.random() > 0.4,
        });
      }

      // Add a ring of extra golden sparkles
      for (let j = 0; j < 15; j++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 2 + 1;
        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          alpha: 1,
          decay: Math.random() * 0.01 + 0.005,
          color: '#fff3a1',
          size: Math.random() * 2 + 1,
          flicker: true,
        });
      }

      audioSynth.playCrackerBurstSound();
    };

    const launchRocket = (targetX?: number, targetY?: number) => {
      const startX = targetX ?? Math.random() * (canvas.width * 0.8) + canvas.width * 0.1;
      const startY = canvas.height;
      const endY = targetY ?? Math.random() * (canvas.height * 0.45) + canvas.height * 0.1;

      rockets.push({
        x: startX,
        y: startY,
        targetY: endY,
        vy: -(Math.random() * 4 + 11),
        color: colors[Math.floor(Math.random() * colors.length)],
        trail: [],
      });
    };

    // Auto launcher interval
    let autoLaunchTimer: number | null = null;
    if (autoLaunch) {
      const intervalMs = intensity === 'high' ? 900 : intensity === 'medium' ? 1600 : 2600;
      autoLaunchTimer = window.setInterval(() => {
        if (Math.random() < 0.85) {
          launchRocket();
        }
      }, intervalMs);
    }

    // Canvas click event
    const handleCanvasClick = (e: MouseEvent) => {
      if (!interactive) return;
      const rect = canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      // Direct explosion at click point plus launch 2 rocket bursts
      createExplosion(clickX, clickY);
      setTimeout(() => createExplosion(clickX + (Math.random() * 60 - 30), clickY + (Math.random() * 40 - 20)), 200);
    };

    if (interactive) {
      canvas.addEventListener('click', handleCanvasClick);
    }

    // Animation Loop
    const render = () => {
      // Trail effect fade
      ctx.fillStyle = 'rgba(11, 8, 19, 0.22)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Render Rockets
      for (let i = rockets.length - 1; i >= 0; i--) {
        const rocket = rockets[i];
        rocket.y += rocket.vy;
        rocket.trail.push({ x: rocket.x, y: rocket.y });
        if (rocket.trail.length > 8) rocket.trail.shift();

        // Draw trail
        ctx.beginPath();
        ctx.strokeStyle = rocket.color;
        ctx.lineWidth = 2.5;
        for (let j = 0; j < rocket.trail.length; j++) {
          const pt = rocket.trail[j];
          if (j === 0) ctx.moveTo(pt.x, pt.y);
          else ctx.lineTo(pt.x, pt.y);
        }
        ctx.stroke();

        // Rocket head spark
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(rocket.x, rocket.y, 3, 0, Math.PI * 2);
        ctx.fill();

        // Check target reached
        if (rocket.y <= rocket.targetY) {
          createExplosion(rocket.x, rocket.y, rocket.color);
          rockets.splice(i, 1);
        }
      }

      // Render Particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.045; // Gravity
        p.vx *= 0.985; // Drag
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = Math.max(0, p.flicker && Math.random() > 0.5 ? p.alpha * 0.4 : p.alpha);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (interactive) canvas.removeEventListener('click', handleCanvasClick);
      if (autoLaunchTimer) clearInterval(autoLaunchTimer);
      cancelAnimationFrame(animationFrameId);
    };
  }, [autoLaunch, intensity, interactive]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-auto z-0 ${interactive ? 'cursor-pointer' : ''}`}
      style={{ touchAction: 'none' }}
      title={interactive ? 'Tap anywhere to launch fireworks! ✨' : undefined}
    />
  );
};
