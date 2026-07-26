'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const EMOJIS = ['💖', '✨', '🌸', '❤️', '🌟', '🦋', '🌺', '💕', '🌷', '💝', '⭐', '🎀'];

interface Particle {
  id: number;
  x: number;
  y: number;
  emoji: string;
  tx: number;
  ty: number;
  rotation: number;
  scale: number;
}

interface CursorTrail {
  id: number;
  x: number;
  y: number;
  color: string;
}

export default function InteractiveHearts() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [trail, setTrail] = useState<CursorTrail[]>([]);
  const [totalHearts, setTotalHearts] = useState(0);
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);
  const [showMessage, setShowMessage] = useState(false);
  const trailCounterRef = useRef(0);
  const particleCounterRef = useRef(0);
  const COLORS = ['#e3bb7d', '#eec2d3', '#c7b3ea', '#f8f0e3', '#ffd6e7', '#fffacd'];

  const handlePointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    // Ripple effect
    const rippleId = Date.now();
    setRipples(prev => [...prev, { id: rippleId, x: clickX, y: clickY }]);
    setTimeout(() => setRipples(prev => prev.filter(r => r.id !== rippleId)), 1500);

    // Burst of particles
    const burst: Particle[] = Array.from({ length: 14 }).map((_, i) => {
      const angle = (i / 14) * Math.PI * 2 + Math.random() * 0.4;
      const distance = 60 + Math.random() * 160;
      particleCounterRef.current += 1;
      return {
        id: particleCounterRef.current * 1000 + i,
        x: clickX,
        y: clickY,
        emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
        tx: clickX + Math.cos(angle) * distance,
        ty: clickY + Math.sin(angle) * distance,
        rotation: Math.random() * 540 - 270,
        scale: 0.8 + Math.random() * 1.2,
      };
    });

    setParticles(prev => [...prev, ...burst]);
    setTotalHearts(prev => {
      const next = prev + 14;
      if (next >= 100 && !showMessage) setShowMessage(true);
      return next;
    });
  }, [showMessage]);

  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    trailCounterRef.current += 1;
    const trailId = trailCounterRef.current;
    const newTrail = {
      id: trailId,
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    };
    setTrail(prev => [...prev.slice(-18), newTrail]);
    setTimeout(() => setTrail(prev => prev.filter(t => t.id !== trailId)), 600);
  }, []);

  const handleAnimationComplete = (id: number) => {
    setParticles(prev => prev.filter(p => p.id !== id));
  };

  const heartMilestones = [50, 100, 200, 500];
  const nextMilestone = heartMilestones.find(m => m > totalHearts) ?? 1000;
  const progress = Math.min(100, (totalHearts / nextMilestone) * 100);

  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center py-20 px-4 bg-[#04050f] overflow-hidden">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center z-10 pointer-events-none mb-8"
      >
        <h2 className="font-serif text-[#e3bb7d] text-xl md:text-2xl mb-2 tracking-widest uppercase">Chapter IX</h2>
        <h3 className="font-serif text-3xl md:text-5xl text-[#f8f0e3] mb-3">Touch of Love</h3>
        <p className="font-sans text-[#c7b3ea] text-sm md:text-base">Click & move anywhere to spread love ❤️</p>
      </motion.div>

      {/* Heart Counter */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
        className="z-10 pointer-events-none mb-6 flex flex-col items-center gap-2"
      >
        <div className="flex items-center gap-3 bg-white/5 backdrop-blur-md border border-white/10 rounded-full px-6 py-2">
          <motion.span
            key={totalHearts}
            initial={{ scale: 1.5 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
            className="font-serif text-3xl text-[#e3bb7d]"
          >
            {totalHearts.toLocaleString()}
          </motion.span>
          <span className="font-sans text-[#f8f0e3]/60 text-sm uppercase tracking-widest">hearts shared</span>
        </div>
        {/* Progress to next milestone */}
        <div className="w-48 h-1.5 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
            className="h-full rounded-full bg-gradient-to-r from-[#c7b3ea] to-[#e3bb7d]"
          />
        </div>
        <span className="font-sans text-[#c7b3ea]/60 text-xs">{nextMilestone - totalHearts} more to unlock a message ✨</span>
      </motion.div>

      {/* Interactive Zone */}
      <div
        className="absolute inset-0 cursor-crosshair"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
      >
        {/* Cursor Trail */}
        {trail.map((t, idx) => (
          <motion.div
            key={t.id}
            initial={{ scale: 1, opacity: 0.6 }}
            animate={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute w-3 h-3 rounded-full pointer-events-none"
            style={{
              left: t.x - 6,
              top: t.y - 6,
              backgroundColor: t.color,
              boxShadow: `0 0 8px ${t.color}`,
              opacity: (idx / trail.length) * 0.7,
            }}
          />
        ))}

        {/* Ripple Rings */}
        <AnimatePresence>
          {ripples.map(r => (
            <motion.div
              key={r.id}
              initial={{ scale: 0, opacity: 0.8 }}
              animate={{ scale: 4, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
              className="absolute pointer-events-none rounded-full border-2 border-[#e3bb7d]"
              style={{ left: r.x - 20, top: r.y - 20, width: 40, height: 40 }}
            />
          ))}
        </AnimatePresence>

        {/* Particle Bursts */}
        <AnimatePresence>
          {particles.map(p => (
            <motion.div
              key={p.id}
              initial={{ x: p.x, y: p.y, opacity: 1, scale: p.scale, rotate: 0 }}
              animate={{ x: p.tx, y: p.ty, opacity: 0, scale: 0.2, rotate: p.rotation }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
              onAnimationComplete={() => handleAnimationComplete(p.id)}
              className="absolute text-2xl pointer-events-none select-none"
              style={{ left: 0, top: 0 }}
            >
              {p.emoji}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Unlocked Message */}
      <AnimatePresence>
        {showMessage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ type: 'spring', bounce: 0.4 }}
            className="z-20 mt-4 max-w-md text-center bg-white/5 backdrop-blur-xl border border-[#e3bb7d]/30 rounded-2xl p-6 pointer-events-none"
          >
            <p className="font-handwritten text-2xl md:text-3xl text-[#f7dea6] leading-relaxed">
              "Every heart you just sent... is one prayer of mine that you'll be happy, always." 💖
            </p>
            <p className="font-sans text-[#c7b3ea] text-sm mt-3 uppercase tracking-widest">— Bala</p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
