'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Lantern {
  id: number;
  left: number;
  scale: number;
  delay: number;
  duration: number;
  wish: string;
  color: string;
}

const WISHES = [
  "Always be happy 🌸",
  "Be blessed beyond measure ✨",
  "Your dreams come true 🌟",
  "Peace in your heart 🕊️",
  "Joy every morning 🌅",
  "Love always finds you 💖",
  "God's grace upon you ✝️",
  "Endless laughter 😊",
  "A beautiful future 🌈",
  "You are never alone 💛",
];

const LANTERN_COLORS = [
  { body: '#f7dea6', glow: '#e3bb7d' },
  { body: '#fce4ec', glow: '#eec2d3' },
  { body: '#ede7f6', glow: '#c7b3ea' },
  { body: '#fff9e6', glow: '#f7dea6' },
  { body: '#fce8f3', glow: '#ff9ecd' },
];

export default function MemorySky() {
  const [userLanterns, setUserLanterns] = useState<Lantern[]>([]);
  const [wishInput, setWishInput] = useState('');
  const [showWishInput, setShowWishInput] = useState(false);
  const [releasedCount, setReleasedCount] = useState(0);

  const baseLanterns = useMemo(() => {
    return Array.from({ length: 12 }).map((_, i) => ({
      id: i,
      left: 10 + Math.random() * 80,
      scale: 0.6 + Math.random() * 0.6,
      delay: Math.random() * 6,
      duration: 12 + Math.random() * 10,
      wish: WISHES[i % WISHES.length],
      color: LANTERN_COLORS[i % LANTERN_COLORS.length].glow,
    }));
  }, []);

  const stars = useMemo(() => {
    return Array.from({ length: 80 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 60,
      size: Math.random() * 2.5 + 0.5,
      delay: Math.random() * 4,
    }));
  }, []);

  const releasePersonalLantern = () => {
    if (!wishInput.trim()) return;
    const newLantern: Lantern = {
      id: Date.now(),
      left: 20 + Math.random() * 60,
      scale: 1,
      delay: 0,
      duration: 14 + Math.random() * 6,
      wish: wishInput.trim(),
      color: '#f7dea6',
    };
    setUserLanterns(prev => [...prev, newLantern]);
    setReleasedCount(c => c + 1);
    setWishInput('');
    setShowWishInput(false);
  };

  const allLanterns = [...baseLanterns, ...userLanterns];

  return (
    <section className="relative w-full min-h-screen bg-gradient-to-b from-[#050818] via-[#0a0d24] to-[#04050f] overflow-hidden py-20 flex flex-col justify-between">

      {/* Twinkling Stars */}
      <div className="absolute inset-0 pointer-events-none">
        {stars.map(star => (
          <motion.div
            key={`star-${star.id}`}
            className="absolute rounded-full bg-white"
            style={{ left: `${star.left}%`, top: `${star.top}%`, width: star.size, height: star.size }}
            animate={{ opacity: [0.2, 1, 0.2], scale: [1, 1.3, 1] }}
            transition={{ duration: 2 + Math.random() * 3, delay: star.delay, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
      </div>

      {/* Shooting Stars */}
      {[0, 1, 2].map(i => (
        <motion.div
          key={`shoot-${i}`}
          className="absolute h-px rounded-full pointer-events-none"
          style={{
            width: 80,
            background: 'linear-gradient(to right, transparent, white, transparent)',
            top: `${5 + i * 15}%`,
            left: '-10%',
          }}
          animate={{ x: ['0vw', '120vw'], opacity: [0, 1, 0] }}
          transition={{ duration: 1.5, delay: 4 + i * 7, repeat: Infinity, repeatDelay: 12 + i * 5, ease: 'easeIn' }}
        />
      ))}

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center z-10 mt-10 px-4"
      >
        <h2 className="font-serif text-[#e3bb7d] text-xl md:text-2xl mb-2 tracking-widest uppercase">Chapter X</h2>
        <h3 className="font-serif text-3xl md:text-5xl text-[#f8f0e3] mb-2">Sky of Wishes</h3>
        <p className="font-handwritten text-xl text-[#c7b3ea]">Release a lantern with your wish for Akka 🪔</p>
      </motion.div>

      {/* Lanterns */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {allLanterns.map(lantern => (
          <motion.div
            key={`lantern-${lantern.id}`}
            className="absolute bottom-[-120px] flex flex-col items-center gap-1"
            style={{ left: `${lantern.left}%`, scale: lantern.scale }}
            initial={{ y: 0, opacity: 0 }}
            animate={{
              y: '-130vh',
              opacity: [0, 1, 1, 1, 0],
              x: ['0px', '15px', '-15px', '10px', '-5px'],
            }}
            transition={{
              duration: lantern.duration,
              repeat: Infinity,
              delay: lantern.delay,
              ease: 'linear',
              x: { duration: 3, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' },
              opacity: { times: [0, 0.08, 0.5, 0.9, 1] },
            }}
          >
            {/* Lantern body */}
            <div className="relative w-12 h-16 rounded-t-3xl rounded-b-2xl flex items-end justify-center pb-1 overflow-hidden"
              style={{
                background: `linear-gradient(to top, ${lantern.color}aa, ${lantern.color}ff)`,
                boxShadow: `0 0 20px ${lantern.color}80, 0 0 40px ${lantern.color}40`,
              }}>
              {/* Inner glow */}
              <div className="absolute inset-2 rounded-t-2xl rounded-b-xl"
                style={{ background: 'rgba(255,255,200,0.3)' }} />
              {/* Flame */}
              <motion.div
                animate={{ opacity: [0.6, 1, 0.7], scale: [0.9, 1.1, 0.9] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="w-3 h-3 rounded-full relative z-10"
                style={{ background: 'radial-gradient(circle, #fff, #ffcc44)' }}
              />
            </div>
            {/* Strings */}
            <div className="flex gap-2">
              <div className="w-px h-4" style={{ background: `${lantern.color}80` }} />
              <div className="w-px h-4" style={{ background: `${lantern.color}80` }} />
            </div>
            {/* Wish label */}
            {lantern.wish && (
              <div className="bg-black/30 backdrop-blur-sm rounded px-2 py-0.5 max-w-[100px]">
                <span className="font-handwritten text-white text-[9px] text-center block leading-tight">{lantern.wish}</span>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Interactive Release Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
        className="z-10 flex flex-col items-center gap-5 px-6 mb-16"
      >
        {releasedCount > 0 && (
          <motion.p
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="font-handwritten text-[#f7dea6] text-xl md:text-2xl text-center"
          >
            You released {releasedCount} lantern{releasedCount > 1 ? 's' : ''}! 🕯️ Each one carries a prayer to the sky.
          </motion.p>
        )}

        <AnimatePresence mode="wait">
          {!showWishInput ? (
            <motion.button
              key="btn"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowWishInput(true)}
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(227,187,125,0.4)' }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white/10 hover:bg-white/20 border border-[#e3bb7d]/50 hover:border-[#e3bb7d] backdrop-blur-md rounded-full text-[#f8f0e3] font-sans text-base transition-all duration-300 shadow-lg"
            >
              🪔 Release a Wish Lantern for Akka
            </motion.button>
          ) : (
            <motion.div
              key="input"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-3 w-full max-w-sm"
            >
              <p className="font-handwritten text-[#eec2d3] text-xl text-center">Write your wish for Akka...</p>
              <input
                type="text"
                value={wishInput}
                onChange={e => setWishInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && releasePersonalLantern()}
                placeholder="May she always..."
                maxLength={40}
                className="w-full px-5 py-3 bg-white/10 border border-[#e3bb7d]/40 rounded-full text-[#f8f0e3] font-handwritten text-lg placeholder-white/30 focus:outline-none focus:border-[#e3bb7d] backdrop-blur-md text-center"
                autoFocus
              />
              <div className="flex gap-3">
                <motion.button
                  onClick={releasePersonalLantern}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-2.5 bg-[#e3bb7d]/20 hover:bg-[#e3bb7d]/30 border border-[#e3bb7d]/60 rounded-full text-[#f7dea6] font-sans text-sm transition-all"
                >
                  🕯️ Release
                </motion.button>
                <button
                  onClick={() => setShowWishInput(false)}
                  className="px-6 py-2.5 bg-white/5 hover:bg-white/10 border border-white/20 rounded-full text-white/50 font-sans text-sm transition-all"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer Quote */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: 1 }}
          className="font-handwritten text-2xl md:text-3xl text-[#f7dea6] text-center max-w-xl mt-4"
          style={{ textShadow: '0 0 15px rgba(247,222,166,0.3)' }}
        >
          "Every memory is a lantern... rising to light up the sky of our bond."
        </motion.p>
      </motion.div>
    </section>
  );
}
