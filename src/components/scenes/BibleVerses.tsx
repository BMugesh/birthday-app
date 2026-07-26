'use client';

import { useState } from 'react';
import { motion, Variants, AnimatePresence } from 'framer-motion';

const verses = [
  {
    reference: "Proverbs 17:17",
    text: "A friend loves at all times, and a brother is born for adversity.",
    prayer: "May this bond be one of those timeless friendships — one that holds through every storm.",
    emoji: "🌸",
    color: "#eec2d3"
  },
  {
    reference: "Isaiah 41:10",
    text: "Fear not, for I am with you; be not dismayed, for I am your God. I will strengthen you, I will help you, I will uphold you with my righteous right hand.",
    prayer: "May you never feel alone. May His hand hold yours on every difficult road.",
    emoji: "✝️",
    color: "#e3bb7d"
  },
  {
    reference: "Numbers 6:24-26",
    text: "The Lord bless you and keep you; the Lord make his face shine on you and be gracious to you; the Lord turn his face toward you and give you peace.",
    prayer: "This is the prayer I whisper for you every single day, Akka.",
    emoji: "🕊️",
    color: "#c7b3ea"
  },
  {
    reference: "Jeremiah 29:11",
    text: "For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, plans to give you hope and a future.",
    prayer: "God's best plans are still ahead of you. The most beautiful chapters haven't been written yet.",
    emoji: "🌟",
    color: "#f7dea6"
  }
];

export default function BibleVerses() {
  const [flipped, setFlipped] = useState<Set<number>>(new Set());
  const [glowing, setGlowing] = useState<number | null>(null);

  const handleFlip = (index: number) => {
    setFlipped(prev => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
    setGlowing(index);
    setTimeout(() => setGlowing(null), 800);
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.25 } }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <section className="min-h-screen py-24 px-6 md:px-12 flex flex-col items-center justify-center bg-[#04050f] text-[#f8f0e3] relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#e3bb7d]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#eec2d3]/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Header */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="text-center mb-16 relative z-10"
      >
        <motion.p variants={itemVariants} className="text-[#e3bb7d] font-sans text-sm tracking-[0.3em] uppercase mb-4">
          Chapter I
        </motion.p>
        <motion.h2 variants={itemVariants} className="font-serif text-5xl md:text-6xl text-[#f8f0e3]">
          Verses of Gratitude
        </motion.h2>
        <motion.p variants={itemVariants} className="font-handwritten text-xl text-[#c7b3ea] mt-3">
          Tap each verse to reveal a personal prayer 🙏
        </motion.p>
      </motion.div>

      {/* Cards Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl w-full relative z-10"
      >
        {verses.map((verse, index) => {
          const isFlipped = flipped.has(index);
          const isGlowing = glowing === index;

          return (
            <motion.div
              key={index}
              variants={itemVariants}
              onClick={() => handleFlip(index)}
              className="relative cursor-pointer"
              style={{ perspective: 1000, minHeight: 280 }}
            >
              <motion.div
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.7, ease: [0.645, 0.045, 0.355, 1] }}
                style={{ transformStyle: 'preserve-3d', position: 'relative', width: '100%', height: '100%', minHeight: 280 }}
              >
                {/* FRONT — Verse */}
                <motion.div
                  animate={{
                    boxShadow: isGlowing
                      ? `0 0 40px ${verse.color}60, 0 0 80px ${verse.color}30`
                      : `0 8px 30px rgba(0,0,0,0.3)`,
                  }}
                  className="absolute inset-0 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 md:p-10 flex flex-col items-center text-center overflow-hidden group"
                  style={{ backfaceVisibility: 'hidden' }}
                >
                  {/* Hover gradient */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-2xl"
                    style={{ background: `radial-gradient(circle at 50% 50%, ${verse.color}10, transparent 70%)` }} />

                  <div className="text-3xl mb-4">{verse.emoji}</div>
                  <p className="font-serif text-xl md:text-2xl leading-relaxed mb-6 text-[#f8f0e3] flex-1">
                    "{verse.text}"
                  </p>
                  <p className="font-sans text-sm tracking-widest text-[#e3bb7d] uppercase mt-auto mb-3">
                    {verse.reference}
                  </p>
                  <motion.p
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="font-sans text-xs tracking-wider text-white/30 uppercase"
                  >
                    Tap to reveal my prayer →
                  </motion.p>
                </motion.div>

                {/* BACK — Personal prayer */}
                <div
                  className="absolute inset-0 rounded-2xl p-8 md:p-10 flex flex-col items-center justify-center text-center overflow-hidden"
                  style={{
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                    background: `linear-gradient(135deg, ${verse.color}20, ${verse.color}10)`,
                    border: `1px solid ${verse.color}40`,
                  }}
                >
                  <div className="absolute inset-0 rounded-2xl pointer-events-none"
                    style={{ background: `radial-gradient(circle at 50% 50%, ${verse.color}15, transparent 70%)` }} />
                  <div className="text-4xl mb-6">🙏</div>
                  <p className="font-sans text-xs tracking-[0.2em] uppercase mb-4" style={{ color: verse.color }}>
                    My Prayer for You
                  </p>
                  <p className="font-handwritten text-2xl md:text-3xl text-[#f8f0e3] leading-relaxed">
                    "{verse.prayer}"
                  </p>
                  <p className="font-handwritten text-lg text-[#eec2d3] mt-6">— Bala ❤️</p>
                  <p className="font-sans text-xs tracking-wider text-white/30 uppercase mt-4">Tap to flip back</p>
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Unlocked message when all flipped */}
      <AnimatePresence>
        {flipped.size === verses.length && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-12 max-w-2xl text-center z-10"
          >
            <p className="font-handwritten text-2xl md:text-3xl text-[#e3bb7d]">
              "Four verses. Four prayers. All from the same heart — yours truly." 💛
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
