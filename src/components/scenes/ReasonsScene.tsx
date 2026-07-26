'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const reasons = [
  { num: "01", text: "Because you always stood beside me.", detail: "Even when the whole world walked away, you stayed. That kind of loyalty is rare — and I don't take it for granted.", emoji: "🛡️" },
  { num: "02", text: "Because you believed in me when I couldn't believe in myself.", detail: "Your faith in me has carried me further than you'll ever know. Thank you for seeing something in me that I couldn't see.", emoji: "🌟" },
  { num: "03", text: "Because you're my biggest blessing.", detail: "Out of everything God has given me in this life, you are near the very top. Not second to anything.", emoji: "🙏" },
  { num: "04", text: "Because your love is unconditional.", detail: "You've loved me at my worst, celebrated me at my best, and never made me feel I had to earn it. That is everything.", emoji: "💖" },
  { num: "05", text: "Because you taught me what family really means.", detail: "Family isn't just blood. It's who shows up. Who stays. Who prays for you. You taught me that.", emoji: "🌸" },
  { num: "06", text: "Because you never gave up on me.", detail: "I gave you plenty of reasons to. You chose differently. I'll spend my whole life being worthy of that choice.", emoji: "🌻" },
  { num: "07", text: "Because your prayers keep me safe.", detail: "I genuinely believe the moments I've been protected... were because of your prayers going before me. Thank you.", emoji: "✝️" },
  { num: "08", text: "Because your smile heals everything.", detail: "When I'm sad and I see you smile, somehow everything feels manageable again. Your joy is contagious and precious.", emoji: "😊" },
  { num: "09", text: "Because you chose to be my sister.", detail: "You weren't required to. Life didn't force you to. You chose it. And that deliberate choice means the world to me.", emoji: "💝" },
  { num: "∞", text: "Because you're you. And that's more than enough.", detail: "No extra explanation needed. You are enough. You have always been enough. Never forget that.", emoji: "❤️" },
];

export default function ReasonsScene() {
  const [expanded, setExpanded] = useState<number | null>(null);
  const [loved, setLoved] = useState<Set<number>>(new Set());

  const handleLove = (e: React.MouseEvent, idx: number) => {
    e.stopPropagation();
    setLoved(prev => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  };

  const isLast = (i: number) => i === reasons.length - 1;

  return (
    <section className="relative min-h-screen w-full bg-[#04050f] py-24 px-6 md:px-12 flex flex-col items-center overflow-hidden">

      {/* Background aurora glow */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#c7b3ea]/8 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#eec2d3]/8 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-4xl w-full relative z-10">

        {/* Header */}
        <div className="text-center mb-16">
          <motion.p
            className="text-[#e3bb7d] font-sans tracking-widest uppercase text-sm mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Chapter VIII
          </motion.p>
          <motion.h2
            className="font-serif text-5xl md:text-6xl text-[#f8f0e3]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Reasons I Love You
          </motion.h2>
          <motion.p
            className="font-handwritten text-xl text-[#c7b3ea] mt-3"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            Tap each reason to discover what's behind it 💛
          </motion.p>
        </div>

        <div className="flex flex-col gap-5">
          {reasons.map((reason, i) => {
            const isExpanded = expanded === i;
            const isLovedByUser = loved.has(i);
            const last = isLast(i);

            return (
              <motion.div
                key={reason.num}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.7, delay: i * 0.07 }}
              >
                <motion.div
                  onClick={() => setExpanded(isExpanded ? null : i)}
                  whileHover={{ scale: 1.01, y: -2 }}
                  className={`relative rounded-2xl p-5 md:p-7 cursor-pointer transition-all duration-300 overflow-hidden group ${
                    last
                      ? 'border-2 border-[#e3bb7d]/60 bg-gradient-to-br from-[#e3bb7d]/10 to-[#eec2d3]/10'
                      : 'border border-white/10 bg-white/5 hover:border-white/20'
                  } backdrop-blur-md shadow-xl`}
                  style={{
                    boxShadow: isExpanded
                      ? '0 0 40px rgba(227,187,125,0.2), 0 20px 60px rgba(0,0,0,0.3)'
                      : undefined,
                  }}
                >
                  {/* Background gradient hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#e3bb7d]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  <div className="flex items-center gap-5 relative z-10">
                    {/* Number */}
                    <div className={`font-serif leading-none select-none shrink-0 ${
                      last
                        ? 'text-5xl md:text-7xl bg-clip-text text-transparent bg-gradient-to-b from-[#e3bb7d] to-[#f7dea6]'
                        : 'text-4xl md:text-6xl text-transparent'
                    }`}
                      style={!last ? { WebkitTextStroke: '1.5px rgba(227,187,125,0.7)' } : {}}
                    >
                      {reason.num}
                    </div>

                    {/* Text */}
                    <div className="flex-1">
                      <p className={`font-serif ${last ? 'text-2xl md:text-4xl font-bold text-[#e3bb7d]' : 'text-xl md:text-3xl text-[#f8f0e3]'} leading-snug`}>
                        {reason.text}
                      </p>
                    </div>

                    {/* Right side: emoji + love + expand */}
                    <div className="flex flex-col items-center gap-2 shrink-0">
                      <span className="text-2xl">{reason.emoji}</span>
                      <motion.button
                        onClick={(e) => handleLove(e, i)}
                        whileTap={{ scale: 1.4 }}
                        className="text-lg transition-all"
                        title="Send love"
                      >
                        {isLovedByUser ? '💗' : '🤍'}
                      </motion.button>
                      <motion.span
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="text-[#e3bb7d] text-sm opacity-60"
                      >
                        ▼
                      </motion.span>
                    </div>
                  </div>

                  {/* Expanded Detail */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.4, ease: 'easeOut' }}
                        className="overflow-hidden"
                      >
                        <div className="mt-4 pt-4 border-t border-white/10 relative z-10">
                          <p className="font-handwritten text-xl md:text-2xl text-[#eec2d3] leading-relaxed">
                            "{reason.detail}"
                          </p>
                          {isLovedByUser && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className="mt-3 inline-flex items-center gap-2 bg-[#e3bb7d]/10 rounded-full px-4 py-1.5"
                            >
                              <span className="text-sm">💗</span>
                              <span className="font-sans text-[#e3bb7d] text-xs uppercase tracking-wider">You loved this reason</span>
                            </motion.div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Love summary */}
        <AnimatePresence>
          {loved.size > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-12 text-center"
            >
              <p className="font-handwritten text-2xl md:text-3xl text-[#f7dea6]">
                You loved {loved.size} reason{loved.size > 1 ? 's' : ''}... 💖 Akka will be so happy to know.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
