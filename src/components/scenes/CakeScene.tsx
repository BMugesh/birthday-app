'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function useTypewriter(text: string, speed = 60, start = false) {
  const [displayed, setDisplayed] = useState('');
  useEffect(() => {
    if (!start) return;
    setDisplayed('');
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i + 1));
      i++;
      if (i >= text.length) clearInterval(interval);
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed, start]);
  return displayed;
}

export default function CakeScene() {
  const [phase, setPhase] = useState<'pre' | 'blowing' | 'blown'>('pre');
  const [blowPower, setBlowPower] = useState(0); // 0–100
  const [clickCount, setClickCount] = useState(0);
  const blowInterval = useRef<NodeJS.Timeout | null>(null);

  const confetti = useMemo(() => {
    return Array.from({ length: 80 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: Math.random() * 2.5,
      color: ['#eec2d3', '#e3bb7d', '#c7b3ea', '#f8f0e3', '#ff9ecd', '#ffd700'][Math.floor(Math.random() * 6)],
      rotation: Math.random() * 720,
      size: 6 + Math.random() * 10,
      shape: Math.random() > 0.5 ? 'circle' : 'rect',
    }));
  }, []);

  const wishText = "Happy Birthday, Anu Akka! 🎉🎂✨";
  const displayed = useTypewriter(wishText, 80, phase === 'blown');

  // Blow on click — build up power
  const handleBlow = () => {
    if (phase !== 'pre') return;
    setClickCount(c => c + 1);
    setBlowPower(p => {
      const next = Math.min(100, p + 20 + Math.random() * 15);
      if (next >= 100) {
        setTimeout(() => {
          setPhase('blowing');
          setTimeout(() => setPhase('blown'), 1200);
        }, 100);
      }
      return next;
    });
    // Slowly decay power
    if (blowInterval.current) clearTimeout(blowInterval.current);
    blowInterval.current = setTimeout(() => setBlowPower(p => Math.max(0, p - 15)), 800);
  };

  const flameScale = phase === 'pre' ? 1 - (blowPower / 200) : 0;
  const flameOpacity = phase === 'pre' ? 1 - (blowPower / 120) : 0;

  return (
    <section
      className={`relative w-full min-h-screen transition-colors duration-1000 flex flex-col items-center justify-center py-20 px-4 overflow-hidden ${phase === 'blown' ? 'bg-[#020205]' : 'bg-[#04050f]'}`}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center z-10 absolute top-16"
      >
        <h2 className="font-serif text-[#e3bb7d] text-xl md:text-2xl mb-2 tracking-widest uppercase">Chapter XI</h2>
        <h3 className="font-serif text-3xl md:text-5xl text-[#f8f0e3]">The Birthday Cake 🎂</h3>
      </motion.div>

      {/* Confetti Rain */}
      <AnimatePresence>
        {phase === 'blown' && confetti.map((c) => (
          <motion.div
            key={`confetti-${c.id}`}
            initial={{ top: '-5%', opacity: 1, rotate: 0, scale: 1 }}
            animate={{ top: '110%', rotate: c.rotation, scale: [1, 0.8, 1] }}
            transition={{ duration: 3.5 + Math.random(), delay: c.delay, repeat: Infinity, ease: 'easeIn' }}
            className="absolute z-0 pointer-events-none"
            style={{
              left: c.left,
              width: c.size,
              height: c.size,
              backgroundColor: c.color,
              borderRadius: c.shape === 'circle' ? '50%' : '2px',
            }}
          />
        ))}
      </AnimatePresence>

      {/* Firework Burst Rings */}
      <AnimatePresence>
        {phase === 'blown' && [0, 0.3, 0.6, 1.0, 1.4].map((d, i) => (
          <motion.div
            key={`ring-${i}`}
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: [0, 3 + i], opacity: [1, 0] }}
            transition={{ duration: 1.5, delay: d, ease: 'easeOut' }}
            className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            style={{
              width: 80,
              height: 80,
              borderRadius: '50%',
              border: `3px solid ${['#e3bb7d', '#eec2d3', '#c7b3ea', '#f7dea6', '#ff9ecd'][i % 5]}`,
            }}
          />
        ))}
      </AnimatePresence>

      {/* Cake Stack */}
      <div className="relative mt-24 flex flex-col items-center z-10">
        {/* Candle + Flame */}
        <div className="relative flex flex-col items-center mb-[-2px]">
          {/* Flame */}
          <AnimatePresence>
            {phase === 'pre' && (
              <motion.div
                key="flame"
                exit={{ opacity: 0, scale: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                style={{ scale: flameScale, opacity: flameOpacity }}
                className="relative mb-1"
              >
                {/* Outer glow */}
                <motion.div
                  animate={{ opacity: [0.4, 0.9, 0.4], scale: [0.8, 1.2, 0.8] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                  className="absolute -inset-3 rounded-full bg-orange-400/20 blur-md"
                />
                {/* Flame body */}
                <motion.div
                  animate={{ scaleX: [1, 1.1, 0.9, 1], scaleY: [1, 0.95, 1.1, 1], rotate: [-2, 2, -1, 2, -2] }}
                  transition={{ duration: 0.6, repeat: Infinity, ease: 'easeInOut' }}
                  className="w-5 h-8 rounded-t-full rounded-b-sm shadow-[0_0_30px_rgba(255,165,0,0.9),0_0_60px_rgba(255,100,0,0.5)]"
                  style={{
                    background: 'radial-gradient(ellipse at 50% 80%, #fff 0%, #ffe066 25%, #ff9900 60%, #cc3300 100%)',
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Smoke after blow */}
          <AnimatePresence>
            {phase === 'blowing' && (
              <motion.div
                initial={{ opacity: 0.8, y: 0, scale: 0.5 }}
                animate={{ opacity: 0, y: -80, scale: 2.5 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.5, ease: 'easeOut' }}
                className="absolute bottom-8 w-4 h-4 bg-gray-400/60 rounded-full blur-md pointer-events-none"
              />
            )}
          </AnimatePresence>

          {/* Candle stick */}
          <div className="w-4 h-14 rounded-t-sm relative overflow-hidden shadow-inner"
            style={{ background: 'linear-gradient(to bottom, #fff 0%, #f0f0f0 100%)', border: '1px solid #ddd' }}>
            {[0, 1, 2].map(i => (
              <div key={i} className="absolute w-8 h-2 bg-pink-400/70 rotate-45 origin-left"
                style={{ top: `${i * 18 + 4}px`, left: -2 }} />
            ))}
          </div>
        </div>

        {/* Top Tier */}
        <div className="w-36 h-16 rounded-xl border border-white/20 shadow-lg relative flex justify-center z-30"
          style={{ background: 'linear-gradient(to bottom, #eec2d3, #d69fbc)' }}>
          <div className="absolute top-0 w-full h-5 flex justify-around px-2">
            {[6, 8, 5, 7, 6].map((h, i) => (
              <div key={i} className="w-4 rounded-b-full shadow-sm" style={{ height: h * 4, background: '#f8f0e3' }} />
            ))}
          </div>
        </div>

        {/* Middle Tier */}
        <div className="w-52 h-20 rounded-xl border border-white/20 shadow-lg relative flex justify-center -mt-2 z-20"
          style={{ background: 'linear-gradient(to bottom, #c7b3ea, #a48ac9)' }}>
          <div className="absolute top-0 w-full h-5 flex justify-around px-3">
            {[6, 8, 5, 7, 6, 8].map((h, i) => (
              <div key={i} className="w-4 rounded-b-full shadow-sm" style={{ height: h * 4, background: '#eec2d3' }} />
            ))}
          </div>
        </div>

        {/* Bottom Tier */}
        <div className="w-72 h-24 rounded-xl border border-white/20 shadow-lg relative flex justify-center -mt-2 z-10"
          style={{ background: 'linear-gradient(to bottom, #f7dea6, #e3bb7d)' }}>
          <div className="absolute top-0 w-full h-5 flex justify-around px-5">
            {[6, 5, 8, 7, 6, 8, 5].map((h, i) => (
              <div key={i} className="w-5 rounded-b-full shadow-sm" style={{ height: h * 4, background: '#c7b3ea' }} />
            ))}
          </div>
          {/* Inscription */}
          <div className="absolute bottom-4 w-full text-center">
            <span className="font-handwritten text-[#0a0d24] text-sm md:text-base font-bold tracking-wide drop-shadow-sm">
              Anu Akka 🎂
            </span>
          </div>
        </div>

        {/* Plate */}
        <div className="w-80 h-5 rounded-[100%] shadow-[0_10px_30px_rgba(0,0,0,0.5)] border border-white/20 mt-[-10px] z-0"
          style={{ background: 'rgba(255,255,255,0.12)' }} />
      </div>

      {/* Blow Power Bar + Instruction */}
      <AnimatePresence>
        {phase === 'pre' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ delay: 0.8 }}
            className="mt-10 flex flex-col items-center gap-5 z-20"
          >
            <p className="font-handwritten text-2xl md:text-3xl text-[#eec2d3] text-center">
              {blowPower < 30
                ? '🌬️ Tap the button to blow the candle!'
                : blowPower < 65
                ? '💨 Keep blowing... almost there!'
                : blowPower < 90
                ? '🌪️ Almost! Blow harder!'
                : '💥 One more!'}
            </p>

            {/* Progress Bar */}
            <div className="w-64 h-3 bg-white/10 rounded-full overflow-hidden border border-white/20">
              <motion.div
                animate={{ width: `${blowPower}%` }}
                transition={{ duration: 0.15 }}
                className="h-full rounded-full"
                style={{
                  background: blowPower < 50
                    ? 'linear-gradient(to right, #c7b3ea, #eec2d3)'
                    : 'linear-gradient(to right, #e3bb7d, #ff9900)',
                  boxShadow: blowPower > 70 ? '0 0 12px rgba(227,187,125,0.8)' : 'none',
                }}
              />
            </div>

            <motion.button
              onClick={handleBlow}
              whileHover={{ scale: 1.07 }}
              whileTap={{ scale: 0.9 }}
              className="px-10 py-4 bg-white/10 hover:bg-white/20 border border-[#e3bb7d]/60 backdrop-blur-md rounded-full text-[#f8f0e3] font-sans text-lg transition-all duration-200 z-20 shadow-lg hover:shadow-xl hover:border-[#e3bb7d]"
              style={{ boxShadow: blowPower > 60 ? '0 0 25px rgba(227,187,125,0.4)' : undefined }}
            >
              🌬️ Blow! ({5 - Math.ceil(clickCount / 1.5) > 0 ? `${Math.max(0, 5 - clickCount)} more` : 'Almost!'})
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success Celebration */}
      <AnimatePresence>
        {phase === 'blown' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.7, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, type: 'spring', bounce: 0.4 }}
            className="mt-14 text-center z-20 px-4"
          >
            <motion.p
              className="font-handwritten text-4xl md:text-6xl lg:text-7xl text-[#e3bb7d]"
              style={{ textShadow: '0 0 30px rgba(227,187,125,0.7), 0 0 60px rgba(227,187,125,0.3)' }}
            >
              {displayed}
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.6, repeat: Infinity }}
                className="inline-block ml-1 text-[#f7dea6]"
              >
                {displayed.length < wishText.length ? '|' : ''}
              </motion.span>
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3 }}
              className="font-serif text-xl md:text-2xl text-[#eec2d3] mt-6 italic"
            >
              "May every wish of your heart come true. 🌟"
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
