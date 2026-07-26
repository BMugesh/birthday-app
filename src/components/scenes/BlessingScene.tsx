'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function BlessingScene() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Generate random positions for crosses and fireflies
  const crosses = Array.from({ length: 40 }).map((_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    delay: Math.random() * 5,
    duration: 3 + Math.random() * 4,
    opacity: 0.2 + Math.random() * 0.4,
    scale: 0.5 + Math.random() * 0.8
  }));

  const fireflies = Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    delay: Math.random() * 5,
    duration: 4 + Math.random() * 6,
  }));

  return (
    <section className="relative min-h-screen w-full bg-[#04050f] overflow-hidden flex items-center justify-center">
      {/* Golden radial gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(227,187,125,0.15)_0%,rgba(4,5,15,0)_60%)] pointer-events-none" />

      {/* Stars/Crosses */}
      {mounted && crosses.map(cross => (
        <motion.div
          key={`cross-${cross.id}`}
          className="absolute text-[#e3bb7d]"
          style={{ left: cross.left, top: cross.top }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: [0, cross.opacity, 0],
            scale: [cross.scale * 0.8, cross.scale, cross.scale * 0.8]
          }}
          transition={{
            duration: cross.duration,
            delay: cross.delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          ✝️
        </motion.div>
      ))}

      {/* Fireflies */}
      {mounted && fireflies.map(fly => (
        <motion.div
          key={`fly-${fly.id}`}
          className="absolute w-1.5 h-1.5 rounded-full bg-[#f7dea6] shadow-[0_0_8px_2px_rgba(247,222,166,0.6)]"
          style={{ left: fly.left, top: fly.top }}
          animate={{
            y: [0, -40, 20, -20, 0],
            x: [0, 30, -20, 10, 0],
            opacity: [0, 0.8, 0.2, 0.9, 0]
          }}
          transition={{
            duration: fly.duration,
            delay: fly.delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}

      <motion.div 
        className="relative z-10 max-w-4xl px-8 text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.5 }}
      >
        <p className="font-handwritten text-4xl md:text-5xl lg:text-6xl text-[#f8f0e3] leading-relaxed tracking-wide shadow-black drop-shadow-2xl"
           style={{ textShadow: '0 0 20px rgba(227,187,125,0.5)' }}>
          "May grace wrap around your path like a gentle golden blanket, today and all the days to come."
        </p>
      </motion.div>
    </section>
  );
}
