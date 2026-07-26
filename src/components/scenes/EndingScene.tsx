'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function EndingScene() {
  const [stars, setStars] = useState<{ id: number, x: number, y: number, size: number, delay: number }[]>([]);
  const [showRestart, setShowRestart] = useState(false);
  const [shootingStars, setShootingStars] = useState<{ id: number, x: number, y: number, angle: number }[]>([]);

  useEffect(() => {
    const generatedStars = Array.from({ length: 200 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2.5 + 0.5,
      delay: Math.random() * 5,
    }));
    setStars(generatedStars);

    // Shooting stars
    const interval = setInterval(() => {
      const newStar = {
        id: Date.now(),
        x: Math.random() * 60,
        y: Math.random() * 40,
        angle: 20 + Math.random() * 30,
      };
      setShootingStars(prev => [...prev.slice(-4), newStar]);
      setTimeout(() => {
        setShootingStars(prev => prev.filter(s => s.id !== newStar.id));
      }, 2000);
    }, 4000);

    // Show restart after 8s
    const restartTimer = setTimeout(() => setShowRestart(true), 8000);

    return () => {
      clearInterval(interval);
      clearTimeout(restartTimer);
    };
  }, []);

  const stanzas = [
    [
      "Distance can separate us.",
      "Time can change us.",
      "Life can test us."
    ],
    [
      "But nothing...",
      "can ever change",
      "that you'll always be",
      "my favourite person."
    ],
    [
      "Happy Birthday,",
      "Anu Akka.",
      "❤️"
    ]
  ];

  return (
    <section className="min-h-screen bg-black relative flex flex-col items-center justify-center py-32 px-6 overflow-hidden">

      {/* Stars */}
      <div className="absolute inset-0 z-0">
        {stars.map(star => (
          <motion.div
            key={star.id}
            className="absolute rounded-full bg-white"
            style={{ left: `${star.x}%`, top: `${star.y}%`, width: star.size, height: star.size }}
            animate={{ opacity: [0.1, 0.8, 0.1], scale: [1, 1.2, 1] }}
            transition={{ duration: 3 + Math.random() * 3, repeat: Infinity, delay: star.delay, ease: "easeInOut" }}
          />
        ))}
      </div>

      {/* Shooting Stars */}
      <AnimatePresence>
        {shootingStars.map(ss => (
          <motion.div
            key={ss.id}
            initial={{ x: `${ss.x}vw`, y: `${ss.y}vh`, opacity: 1 }}
            animate={{ x: `${ss.x + 30}vw`, y: `${ss.y + 20}vh`, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: 'easeIn' }}
            className="absolute z-1 pointer-events-none"
            style={{
              width: 100,
              height: 2,
              background: 'linear-gradient(to right, rgba(255,255,255,0) 0%, white 50%, rgba(255,255,255,0) 100%)',
              transform: `rotate(${ss.angle}deg)`,
              transformOrigin: 'left center',
            }}
          />
        ))}
      </AnimatePresence>

      {/* Moon */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 2 }}
        className="absolute top-16 right-16 text-6xl md:text-7xl opacity-90 z-10 filter drop-shadow-[0_0_30px_rgba(255,255,255,0.4)]"
      >
        🌙
      </motion.div>

      {/* Main Text */}
      <div className="z-10 flex flex-col items-center max-w-xl text-center space-y-24">
        {stanzas.map((stanza, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, filter: 'blur(12px)', y: 20 }}
            whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 2, delay: 0.5 }}
            className="font-serif text-2xl md:text-3xl lg:text-4xl text-[#f8f0e3] leading-loose space-y-2"
          >
            {stanza.map((line, j) => (
              <motion.p
                key={j}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.5 + j * 0.3 }}
                className={line === "❤️"
                  ? "text-5xl mt-6"
                  : line === "Anu Akka."
                  ? "text-[#e3bb7d] font-bold text-4xl md:text-5xl"
                  : ""}
              >
                {line === "❤️" ? (
                  <motion.span animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1.5 }}>
                    ❤️
                  </motion.span>
                ) : line}
              </motion.p>
            ))}
          </motion.div>
        ))}

        {/* Signature */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2, delay: 1 }}
          className="pt-20 text-[#e3bb7d] font-handwritten text-4xl md:text-5xl leading-relaxed space-y-2"
        >
          <p>Forever,</p>
          <p>Your Little Brother,</p>
          <motion.p
            className="text-5xl md:text-6xl mt-4"
            animate={{ textShadow: ['0 0 0px #e3bb7d', '0 0 30px #e3bb7d', '0 0 0px #e3bb7d'] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            Bala
          </motion.p>
        </motion.div>
      </div>

      {/* Floating Hearts */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 pointer-events-none overflow-hidden z-20">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bottom-[-10%] text-xl md:text-2xl text-[#eec2d3]/60"
            style={{ left: `${Math.random() * 100}%` }}
            initial={{ y: 0, opacity: 0 }}
            whileInView={{ y: -600 - Math.random() * 300, opacity: [0, 1, 0.5, 0] }}
            viewport={{ once: true }}
            transition={{
              duration: 12 + Math.random() * 8,
              delay: 2 + Math.random() * 6,
              ease: "easeOut"
            }}
          >
            ❤️
          </motion.div>
        ))}
      </div>

      {/* Restart button */}
      <AnimatePresence>
        {showRestart && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(227,187,125,0.3)' }}
            whileTap={{ scale: 0.95 }}
            className="mt-20 z-30 px-8 py-3 bg-white/5 hover:bg-white/10 border border-[#e3bb7d]/30 hover:border-[#e3bb7d]/60 rounded-full font-sans text-sm uppercase tracking-widest text-[#e3bb7d]/70 hover:text-[#e3bb7d] transition-all backdrop-blur-md"
          >
            ↑ Read Again from the Beginning
          </motion.button>
        )}
      </AnimatePresence>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.5 }}
        viewport={{ once: true }}
        transition={{ duration: 2, delay: 3 }}
        className="absolute bottom-8 text-[10px] uppercase tracking-[0.3em] text-white/50 z-30 font-sans"
      >
        Made with ❤️ by Bala
      </motion.div>
    </section>
  );
}
