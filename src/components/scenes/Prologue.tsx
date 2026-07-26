'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface PrologueProps {
  onComplete: () => void;
}

export default function Prologue({ onComplete }: PrologueProps) {
  const [stars, setStars] = useState<{ id: number; top: string; left: string; delay: number }[]>([]);

  useEffect(() => {
    const newStars = Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      delay: Math.random() * 2,
    }));
    setStars(newStars);
  }, []);

  useEffect(() => {
    // 12 seconds total duration before progressing
    const timer = setTimeout(() => {
      onComplete();
    }, 12000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#04050f] p-6">
      {/* Stars Background */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 2 }}
        className="absolute inset-0 z-0"
      >
        {stars.map((star) => (
          <motion.div
            key={star.id}
            className="absolute h-[2px] w-[2px] rounded-full bg-white/60 shadow-[0_0_2px_rgba(255,255,255,0.8)]"
            style={{ top: star.top, left: star.left }}
            animate={{ opacity: [0.2, 1, 0.2] }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: star.delay,
            }}
          />
        ))}
      </motion.div>

      {/* Text Container */}
      <div className="z-10 flex flex-col items-center justify-center text-center">
        {/* Phase 1 & 2: The Setup */}
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ delay: 6.5, duration: 1 }}
          className="absolute flex flex-col items-center justify-center space-y-6 md:space-y-8"
        >
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.5, duration: 1.5, ease: 'easeOut' }}
            className="font-serif text-3xl font-medium tracking-wide text-[#f8f0e3] md:text-5xl"
          >
            Some people are born as sisters...
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 4.5, duration: 1.5, ease: 'easeOut' }}
            className="font-serif text-3xl font-medium tracking-wide text-[#e3bb7d] md:text-5xl"
          >
            Mine was born as my first home.
          </motion.p>
        </motion.div>

        {/* Phase 3: The Reveal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: [0, 1, 1, 0], scale: [0.95, 1, 1, 1.05] }}
          transition={{ delay: 8, duration: 3.5, times: [0, 0.3, 0.7, 1] }}
          className="absolute flex items-center justify-center w-full"
        >
          <p className="font-serif text-4xl font-medium tracking-wider text-[#f8f0e3] md:text-6xl drop-shadow-[0_0_10px_rgba(248,240,227,0.3)]">
            Happy Birthday, Anu Akka.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
