'use client';

import { motion, Variants } from 'framer-motion';
import { useRef, useCallback } from 'react';

export default function HeroScene() {
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollToNext = () => {
    const nextSection = document.getElementById('verses');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Parallax on mouse move
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = (e.clientX - rect.left) / rect.width - 0.5;
    const cy = (e.clientY - rect.top) / rect.height - 0.5;
    el.querySelectorAll<HTMLElement>('.parallax-star').forEach((star, i) => {
      const depth = (i % 4 + 1) * 8;
      star.style.transform = `translate(${cx * depth}px, ${cy * depth}px)`;
    });
  }, []);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3, delayChildren: 0.2 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1, y: 0, scale: 1,
      transition: { duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }
    }
  };

  const sparkles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    size: Math.random() * 4 + 1,
    delay: Math.random() * 4,
    duration: 2 + Math.random() * 3,
  }));

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-[#04050f] py-16"
    >
      {/* Aurora layers */}
      <div className="absolute inset-0 z-0 aurora-bg opacity-80">
        <div className="aurora-layer aurora-1" />
        <div className="aurora-layer aurora-2" />
        <div className="aurora-layer aurora-3" />
      </div>

      {/* Parallax sparkle stars */}
      <div className="absolute inset-0 z-1 pointer-events-none">
        {sparkles.map(s => (
          <motion.div
            key={s.id}
            className="parallax-star absolute rounded-full transition-transform duration-75"
            style={{ left: s.left, top: s.top, width: s.size, height: s.size, background: '#fff' }}
            animate={{ opacity: [0.2, 1, 0.2], scale: [1, 1.5, 1] }}
            transition={{ duration: s.duration, delay: s.delay, repeat: Infinity }}
          />
        ))}
      </div>

      {/* Floating golden particles */}
      <div className="absolute inset-0 z-1 pointer-events-none overflow-hidden">
        {Array.from({ length: 20 }, (_, i) => (
          <motion.div
            key={`gold-${i}`}
            className="absolute w-1 h-1 rounded-full bg-[#e3bb7d]"
            style={{ left: `${Math.random() * 100}%`, bottom: '-10%' }}
            animate={{ y: '-110vh', x: ['0px', `${(Math.random() - 0.5) * 80}px`, '0px'], opacity: [0, 0.6, 0] }}
            transition={{
              duration: 8 + Math.random() * 8,
              delay: Math.random() * 10,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-4xl px-4 flex flex-col items-center justify-center my-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center text-center p-8 md:p-14 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl relative overflow-hidden w-full"
        >
          {/* Inner glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#e3bb7d]/5 via-transparent to-[#eec2d3]/5 pointer-events-none" />

          {/* Label */}
          <motion.div variants={itemVariants} className="mb-4">
            <span className="font-sans text-xs md:text-sm tracking-[0.3em] text-[#e3bb7d] uppercase opacity-80">
              ✦ A love letter for ✦
            </span>
          </motion.div>

          {/* Hero Portrait Photo */}
          <motion.div 
            variants={itemVariants} 
            className="relative mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-28 h-28 md:w-36 md:h-36 rounded-full p-1 bg-gradient-to-tr from-[#e3bb7d] via-[#eec2d3] to-[#c7b3ea] shadow-[0_0_30px_rgba(227,187,125,0.4)]">
              <div className="w-full h-full rounded-full overflow-hidden border-2 border-[#04050f]">
                <img 
                  src="/images/06_saree_smile.jpg" 
                  alt="Anu Akka"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </motion.div>

          {/* Main Titles */}
          <motion.h1 variants={itemVariants} className="font-serif text-3xl md:text-5xl lg:text-6xl text-[#f8f0e3] font-normal tracking-wide mb-1">
            Happy Birthday
          </motion.h1>

          <motion.div variants={itemVariants} className="flex flex-col items-center justify-center relative">
            <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#f7dea6] via-[#e3bb7d] to-[#eec2d3] tracking-wider py-1">
              ANU AKKA
            </h2>
            {/* Underline glow */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1.5, duration: 1, ease: 'easeOut' }}
              className="h-0.5 w-full rounded-full"
              style={{ background: 'linear-gradient(to right, transparent, #e3bb7d, transparent)' }}
            />
          </motion.div>

          {/* Heartbeat */}
          <motion.div
            variants={itemVariants}
            className="my-5 text-2xl md:text-3xl"
            animate={{ scale: [1, 1.25, 1, 1.15, 1] }}
            transition={{ repeat: Infinity, duration: 1.2, ease: 'easeInOut', times: [0, 0.14, 0.28, 0.42, 0.56] }}
          >
            ❤️
          </motion.div>

          {/* Quote */}
          <motion.p variants={itemVariants} className="font-handwritten text-xl md:text-3xl text-[#eec2d3] max-w-2xl leading-relaxed mb-8 px-4">
            "The first person who taught me love... before I even knew what love meant."
          </motion.p>

          {/* Stats Bar */}
          <motion.div
            variants={itemVariants}
            className="flex gap-6 md:gap-12 mb-8 flex-wrap justify-center"
          >
            {[
              { label: 'Chapters', value: '16' },
              { label: 'Memories', value: '12 Photos' },
              { label: 'Love', value: '100%' },
            ].map(stat => (
              <div key={stat.label} className="flex flex-col items-center gap-1">
                <span className="font-serif text-xl md:text-2xl text-[#e3bb7d]">{stat.value}</span>
                <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-white/40">{stat.label}</span>
              </div>
            ))}
          </motion.div>

          {/* CTA Button */}
          <motion.button
            variants={itemVariants}
            onClick={scrollToNext}
            className="group relative px-8 py-3.5 bg-white/5 hover:bg-white/10 backdrop-blur-md border border-[#e3bb7d]/50 hover:border-[#e3bb7d] rounded-full transition-all duration-300 overflow-hidden"
            whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(227,187,125,0.3)' }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10 font-sans tracking-wider uppercase text-sm md:text-base text-[#f8f0e3] group-hover:text-[#f7dea6] transition-colors">
              Open Our Story →
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#e3bb7d]/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
          </motion.button>
        </motion.div>
      </div>

      {/* Scroll Cue */}
      <motion.div
        className="absolute bottom-4 z-10 text-[#f8f0e3]/50 text-xl flex flex-col items-center gap-1"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.5, duration: 1 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          className="cursor-pointer flex flex-col items-center gap-1"
          onClick={scrollToNext}
        >
          <span className="font-sans text-[10px] uppercase tracking-widest text-white/30">Scroll</span>
          <span>↓</span>
        </motion.div>
      </motion.div>
    </section>
  );
}
