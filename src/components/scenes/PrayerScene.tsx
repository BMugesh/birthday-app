'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function PrayerScene() {
  const [amenPressed, setAmenPressed] = useState(false);
  const [candleOn, setCandleOn] = useState(true);

  const prayerParagraphs = [
    { text: "Dear Lord,", style: "text-[#e3bb7d] text-2xl md:text-3xl font-semibold" },
    { text: "Thank You for giving me\nthe blessing of Anu Akka.", style: "" },
    { text: "Protect her.\nHeal every hidden wound.\nReplace every tear with joy.\nGuide every step.\nBless her dreams.\nKeep her smiling.", style: "text-[#eec2d3]" },
    { text: "May she always remember\nhow deeply she is loved.", style: "" },
    { text: "Amen.", style: "text-[#e3bb7d] text-2xl md:text-3xl font-semibold" },
  ];

  const particles = Array.from({ length: 24 }).map((_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    duration: 6 + Math.random() * 10,
    delay: Math.random() * 5,
    size: 2 + Math.random() * 4,
  }));

  const amenParticles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    angle: (i / 30) * Math.PI * 2,
    distance: 60 + Math.random() * 120,
    emoji: ['✝️', '✨', '🕊️', '🌟', '💛', '🙏'][i % 6],
  }));

  return (
    <section className="min-h-screen bg-[#04050f] text-[#f8f0e3] py-24 relative overflow-hidden flex flex-col items-center justify-center">

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {particles.map(p => (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-[#e3bb7d] opacity-40 blur-[1px]"
            style={{ left: p.left, top: p.top, width: p.size, height: p.size }}
            animate={{ y: [0, -120, 0], opacity: [0.15, 0.5, 0.15] }}
            transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "linear" }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 max-w-4xl relative z-10 flex flex-col items-center">

        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
        >
          <span className="text-[#e3bb7d] text-sm uppercase tracking-[0.3em] font-sans">Chapter VI</span>
          <h2 className="text-4xl md:text-5xl font-serif mt-4 text-[#eec2d3] flex items-center justify-center gap-3">
            Prayer &amp; Blessing ✝️
          </h2>
          <p className="font-handwritten text-xl text-[#c7b3ea] mt-3">
            Press Amen to seal this prayer with your heart 🙏
          </p>
        </motion.div>

        {/* Candle + Cross atmosphere */}
        <div className="flex items-center gap-8 mb-10">
          {/* Candle */}
          <motion.div
            className="flex flex-col items-center cursor-pointer select-none"
            onClick={() => setCandleOn(c => !c)}
            title="Click to toggle candle"
          >
            <AnimatePresence>
              {candleOn && (
                <motion.div
                  key="flame"
                  exit={{ scale: 0, opacity: 0 }}
                  className="relative mb-1"
                >
                  <motion.div
                    animate={{ scaleX: [1, 1.15, 0.9, 1], scaleY: [1, 0.9, 1.1, 1], rotate: [-2, 2, -1, 2, -2] }}
                    transition={{ duration: 0.7, repeat: Infinity }}
                    className="w-4 h-7 rounded-t-full"
                    style={{
                      background: 'radial-gradient(ellipse at 50% 80%, #fff 0%, #ffe066 30%, #ff9900 70%, #cc3300 100%)',
                      boxShadow: '0 0 20px rgba(255,165,0,0.8), 0 0 50px rgba(255,100,0,0.4)',
                    }}
                  />
                </motion.div>
              )}
            </AnimatePresence>
            <div className="w-3 h-16 rounded-t-sm border border-gray-200"
              style={{ background: 'linear-gradient(to bottom, #fff, #f0f0f0)' }}>
              <div className="w-5 h-1.5 bg-pink-400/70 rotate-45 origin-left ml-[-4px] mt-2" />
              <div className="w-5 h-1.5 bg-pink-400/70 rotate-45 origin-left ml-[-4px] mt-4" />
            </div>
            {!candleOn && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-sans text-[8px] uppercase tracking-widest text-white/30 mt-1"
              >
                Tap to light
              </motion.div>
            )}
          </motion.div>

          {/* Glowing Cross */}
          <motion.div
            animate={{
              textShadow: amenPressed
                ? ['0 0 40px #e3bb7d, 0 0 80px #e3bb7d', '0 0 20px #e3bb7d', '0 0 40px #e3bb7d']
                : ['0 0 5px rgba(227,187,125,0.3)', '0 0 15px rgba(227,187,125,0.6)', '0 0 5px rgba(227,187,125,0.3)'],
              scale: amenPressed ? [1, 1.3, 1] : 1,
            }}
            transition={{ duration: amenPressed ? 0.5 : 3, repeat: amenPressed ? 0 : Infinity }}
            className="text-5xl md:text-6xl"
          >
            ✝️
          </motion.div>

          {/* Second Candle (mirror) */}
          <motion.div className="flex flex-col items-center cursor-pointer select-none" onClick={() => setCandleOn(c => !c)}>
            <AnimatePresence>
              {candleOn && (
                <motion.div key="flame2" exit={{ scale: 0, opacity: 0 }} className="relative mb-1">
                  <motion.div
                    animate={{ scaleX: [1, 0.9, 1.1, 1], rotate: [2, -2, 1, -2, 2] }}
                    transition={{ duration: 0.9, repeat: Infinity }}
                    className="w-4 h-7 rounded-t-full"
                    style={{
                      background: 'radial-gradient(ellipse at 50% 80%, #fff 0%, #ffe066 30%, #ff9900 70%, #cc3300 100%)',
                      boxShadow: '0 0 20px rgba(255,165,0,0.8), 0 0 50px rgba(255,100,0,0.4)',
                    }}
                  />
                </motion.div>
              )}
            </AnimatePresence>
            <div className="w-3 h-16 rounded-t-sm border border-gray-200"
              style={{ background: 'linear-gradient(to bottom, #fff, #f0f0f0)' }}>
              <div className="w-5 h-1.5 bg-blue-300/70 rotate-45 origin-left ml-[-4px] mt-2" />
              <div className="w-5 h-1.5 bg-blue-300/70 rotate-45 origin-left ml-[-4px] mt-4" />
            </div>
          </motion.div>
        </div>

        {/* Radial glow when amenPressed */}
        <AnimatePresence>
          {amenPressed && (
            <motion.div
              initial={{ scale: 0, opacity: 0.8 }}
              animate={{ scale: 4, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full pointer-events-none z-0"
              style={{ background: 'radial-gradient(circle, rgba(227,187,125,0.4), transparent 70%)' }}
            />
          )}
        </AnimatePresence>

        {/* Amen Particles */}
        <AnimatePresence>
          {amenPressed && amenParticles.map(p => (
            <motion.div
              key={p.id}
              initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
              animate={{
                x: Math.cos(p.angle) * p.distance,
                y: Math.sin(p.angle) * p.distance - 60,
                opacity: 0,
                scale: 0.5,
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
              className="absolute top-1/2 left-1/2 text-xl pointer-events-none z-20"
              style={{ transform: 'translate(-50%,-50%)' }}
            >
              {p.emoji}
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Glass Card */}
        <motion.div
          className="w-full max-w-lg bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 md:p-14 text-center shadow-[0_0_50px_rgba(227,187,125,0.1)] relative overflow-hidden"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#e3bb7d]/5 via-transparent to-[#eec2d3]/5 pointer-events-none" />

          <div className="font-handwritten text-2xl md:text-3xl text-[#f8f0e3] space-y-6 whitespace-pre-line leading-relaxed relative z-10">
            {prayerParagraphs.map((para, index) => (
              <motion.p
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: 0.6 + index * 0.4 }}
                className={para.style}
              >
                {para.text}
              </motion.p>
            ))}
          </div>
        </motion.div>

        {/* Amen Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 3.5 }}
          onClick={() => {
            setAmenPressed(true);
            setTimeout(() => setAmenPressed(false), 2000);
          }}
          whileHover={{ scale: 1.07, boxShadow: '0 0 30px rgba(227,187,125,0.4)' }}
          whileTap={{ scale: 0.92 }}
          className={`mt-12 px-10 py-4 rounded-full font-handwritten text-2xl md:text-3xl transition-all duration-300 border ${
            amenPressed
              ? 'bg-[#e3bb7d] text-[#04050f] border-[#e3bb7d] shadow-[0_0_40px_rgba(227,187,125,0.6)]'
              : 'bg-white/5 hover:bg-white/10 border-[#e3bb7d]/40 hover:border-[#e3bb7d] text-[#f7dea6]'
          } backdrop-blur-md`}
        >
          {amenPressed ? '🙏 Amen — Prayer Sealed! ✝️' : '🙏 Press to say Amen'}
        </motion.button>

        <motion.p
          className="mt-8 text-[#c7b3ea] italic text-sm md:text-base font-serif"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 4, duration: 1 }}
        >
          Prayed with all my heart ❤️
        </motion.p>
      </div>
    </section>
  );
}
