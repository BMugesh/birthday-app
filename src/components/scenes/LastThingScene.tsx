'use client';

import React, { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

export default function LastThingScene() {
  const [highlightedPromise, setHighlightedPromise] = useState<number | null>(null);
  const [checkedPromises, setCheckedPromises] = useState<Set<number>>(new Set());
  const [apologyAccepted, setApologyAccepted] = useState(false);
  const [holdProgress, setHoldProgress] = useState(0);

  const holdTimerRef = useRef<NodeJS.Timeout | null>(null);

  const startHold = () => {
    if (apologyAccepted) return;
    let p = 0;
    holdTimerRef.current = setInterval(() => {
      p += 5;
      setHoldProgress(p);
      if (p >= 100) {
        clearInterval(holdTimerRef.current!);
        setApologyAccepted(true);
      }
    }, 50);
  };

  const endHold = () => {
    if (apologyAccepted) return;
    if (holdTimerRef.current) clearInterval(holdTimerRef.current);
    setHoldProgress(0);
  };

  const FadeInSection = ({ children, className = "", delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 1.2, delay }}
        className={`min-h-[75vh] flex flex-col justify-center items-center px-6 ${className}`}
      >
        {children}
      </motion.div>
    );
  };

  const promises = [
    { emoji: "🌸", text: "I promise to listen to you with patience, even when we disagree." },
    { emoji: "🌸", text: "I promise to think before I speak, so I never cause you pain again." },
    { emoji: "🌸", text: "I promise to grow into the responsible brother you always believed I could be." },
    { emoji: "🌸", text: "I promise to handle every situation in life with more maturity and care." },
    { emoji: "🌸", text: "I promise to learn from my mistakes instead of repeating them." },
    { emoji: "🌸", text: "I promise never to take your sacrifices or your unconditional love for granted." },
    { emoji: "🌸", text: "I promise to stand by your side through every single storm life brings." },
    { emoji: "🌸", text: "I promise to protect your smile and your happiness at any cost." },
    { emoji: "🌸", text: "I promise to make your name proud wherever I go in this world." },
    { emoji: "🌸", text: "And no matter how old we grow, or how far life takes us..." },
    { emoji: "❤️", text: "I promise I will ALWAYS remain your little brother.", special: true },
  ];

  const allChecked = checkedPromises.size === promises.length;

  return (
    <div className="bg-[#04050f] text-[#f8f0e3] w-full pt-28 pb-36 relative overflow-hidden">
      
      {/* Background Soft Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-gradient-to-r from-[#e3bb7d]/10 via-[#eec2d3]/10 to-[#c7b3ea]/10 rounded-full blur-[160px] pointer-events-none" />

      {/* PART 1: THE APOLOGY (SOULFUL LETTER STYLE) */}
      <FadeInSection>
        <div className="max-w-3xl w-full mx-auto relative">
          
          {/* Decorative Letter Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="bg-white/5 backdrop-blur-2xl border border-[#e3bb7d]/30 rounded-3xl p-8 sm:p-12 md:p-16 shadow-[0_0_80px_rgba(227,187,125,0.15)] relative overflow-hidden"
          >
            {/* Paper Texture Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#e3bb7d]/5 via-transparent to-[#eec2d3]/5 pointer-events-none" />

            {/* Candle Light Icon */}
            <div className="text-center mb-8">
              <motion.span 
                animate={{ scale: [1, 1.2, 1], opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-5xl inline-block filter drop-shadow-[0_0_15px_rgba(227,187,125,0.6)]"
              >
                🕯️
              </motion.span>
              <h3 className="font-sans text-xs tracking-[0.3em] uppercase text-[#e3bb7d] mt-3">From My Heart To Yours</h3>
            </div>

            {/* Letter Content */}
            <div className="font-serif text-lg sm:text-xl md:text-2xl text-[#f8f0e3]/95 leading-relaxed space-y-6 text-center sm:text-left">
              <p className="font-handwritten text-3xl md:text-4xl text-[#e3bb7d]">
                My Dearest Anu Akka, ❤️
              </p>

              <p>
                Before this journey reaches its final page, there is something my soul has been holding onto... something I need to say to you from the very depths of my heart.
              </p>

              <div className="p-6 bg-white/5 rounded-2xl border-l-4 border-[#eec2d3] my-6 space-y-3 italic text-[#eec2d3] font-serif text-xl sm:text-2xl">
                <p>"I am deeply, truly sorry."</p>
                <p className="text-base sm:text-lg text-white/80 not-italic">
                  • Sorry for every moment I caused you worry or stress.<br/>
                  • Sorry for every thoughtless word that ever hurt your feelings.<br/>
                  • Sorry for every time I acted with impatience instead of understanding.<br/>
                  • Sorry for all the mistakes I've made along the way.
                </p>
              </div>

              <p>
                Every single time I disappointed you or made you sad, it broke my own heart too. You have given me so much love, so much guidance, and so much grace—even when I didn't deserve it.
              </p>

              <p>
                I know I cannot erase yesterday's mistakes... but today, on your special day, I promise you that I am working every single day to become the brother you can always rely on and be proud of.
              </p>

              <p className="font-handwritten text-2xl sm:text-3xl text-[#e3bb7d] pt-4 text-right">
                Thank you for forgiving me, Akka. 💖
              </p>
            </div>

            {/* Interactive Forgiveness Seal */}
            <div className="mt-12 pt-8 border-t border-white/10 flex flex-col items-center justify-center text-center">
              {!apologyAccepted ? (
                <>
                  <p className="font-sans text-xs uppercase tracking-widest text-[#eec2d3] mb-4">
                    Press & hold the heart to accept Bala's apology ❤️
                  </p>
                  <div className="relative">
                    <motion.button
                      onMouseDown={startHold}
                      onMouseUp={endHold}
                      onTouchStart={startHold}
                      onTouchEnd={endHold}
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.95 }}
                      className="relative w-20 h-20 rounded-full bg-gradient-to-tr from-[#e3bb7d] to-[#eec2d3] p-1 shadow-[0_0_30px_rgba(227,187,125,0.4)] flex items-center justify-center cursor-pointer select-none"
                    >
                      <div className="w-full h-full rounded-full bg-[#0a0d24] flex items-center justify-center text-3xl">
                        ❤️
                      </div>

                      {/* Radial Progress Ring */}
                      <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none">
                        <circle
                          cx="40"
                          cy="40"
                          r="37"
                          stroke="rgba(227,187,125,0.3)"
                          strokeWidth="4"
                          fill="transparent"
                        />
                        <circle
                          cx="40"
                          cy="40"
                          r="37"
                          stroke="#e3bb7d"
                          strokeWidth="4"
                          fill="transparent"
                          strokeDasharray={232}
                          strokeDashoffset={232 - (232 * holdProgress) / 100}
                          strokeLinecap="round"
                        />
                      </svg>
                    </motion.button>
                  </div>
                  <span className="text-xs text-white/40 mt-3 font-sans">
                    {holdProgress > 0 ? `Holding... ${holdProgress}%` : "Hold down to seal"}
                  </span>
                </>
              ) : (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", bounce: 0.4 }}
                  className="bg-[#e3bb7d]/20 border border-[#e3bb7d]/50 p-6 rounded-2xl max-w-md"
                >
                  <span className="text-4xl block mb-2">🕊️✨</span>
                  <p className="font-handwritten text-2xl text-[#f7dea6]">
                    Apology Sealed with Endless Love & Forgiveness ❤️
                  </p>
                  <p className="font-sans text-xs text-white/70 mt-2">
                    "A sister's heart is a deep ravine at the bottom of which you will always find forgiveness."
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </FadeInSection>

      {/* PART 2: INTERACTIVE LIFETIME PROMISE CARD */}
      <div className="py-24 flex justify-center items-center px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="w-full max-w-3xl relative overflow-hidden rounded-3xl"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)',
            backdropFilter: 'blur(30px)',
            border: '1px solid rgba(227,187,125,0.3)',
            boxShadow: '0 0 80px rgba(227,187,125,0.15), 0 30px 90px rgba(0,0,0,0.6)',
          }}
        >
          {/* Header */}
          <div className="relative z-10 p-8 sm:p-12 md:p-14">
            <div className="text-center mb-10">
              <span className="text-4xl block mb-2">📜✨</span>
              <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#e3bb7d] font-normal mb-2">
                My Lifetime Promises to You
              </h3>
              <p className="font-handwritten text-2xl text-[#eec2d3]">
                Written in my heart, promised for eternity 💛
              </p>
              <p className="font-sans text-[#c7b3ea]/70 text-xs uppercase tracking-widest mt-3">
                Tap each promise to seal it ({checkedPromises.size} of {promises.length})
              </p>
            </div>

            {/* Promise List */}
            <div className="space-y-4">
              {promises.map((promise, idx) => {
                const isChecked = checkedPromises.has(idx);
                const isHighlighted = highlightedPromise === idx;

                return (
                  <motion.div
                    key={idx}
                    onClick={() => {
                      setCheckedPromises(prev => {
                        const next = new Set(prev);
                        if (next.has(idx)) next.delete(idx);
                        else next.add(idx);
                        return next;
                      });
                      setHighlightedPromise(idx);
                      setTimeout(() => setHighlightedPromise(null), 600);
                    }}
                    whileHover={{ x: 6, backgroundColor: isChecked ? 'rgba(227,187,125,0.15)' : 'rgba(255,255,255,0.08)' }}
                    whileTap={{ scale: 0.98 }}
                    className={`flex items-center gap-4 p-4 rounded-2xl cursor-pointer transition-all duration-300 group border ${
                      isChecked 
                        ? 'bg-[#e3bb7d]/15 border-[#e3bb7d]/50 shadow-[0_0_20px_rgba(227,187,125,0.15)]' 
                        : 'bg-white/5 border-white/10 hover:border-[#e3bb7d]/30'
                    } ${promise.special ? 'mt-6 p-5 bg-gradient-to-r from-[#eec2d3]/20 via-[#e3bb7d]/20 to-[#c7b3ea]/20 border-[#eec2d3]/40' : ''}`}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.05 }}
                  >
                    {/* Interactive Checkbox */}
                    <motion.div
                      animate={{
                        scale: isHighlighted ? [1, 1.3, 1] : 1,
                        backgroundColor: isChecked ? '#e3bb7d' : 'transparent',
                      }}
                      transition={{ duration: 0.3 }}
                      className={`w-7 h-7 rounded-full shrink-0 border-2 flex items-center justify-center transition-colors ${
                        isChecked ? 'border-[#e3bb7d]' : 'border-white/30 group-hover:border-[#e3bb7d]'
                      }`}
                    >
                      {isChecked && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="text-[#04050f] text-sm font-bold"
                        >
                          ✓
                        </motion.span>
                      )}
                    </motion.div>

                    {/* Promise Text */}
                    <p className={`font-serif leading-relaxed transition-colors ${
                      promise.special
                        ? 'text-[#f7dea6] font-bold text-lg sm:text-xl md:text-2xl font-serif'
                        : isChecked ? 'text-[#f7dea6] font-medium text-base sm:text-lg' : 'text-white/90 text-base sm:text-lg'
                    }`}>
                      <span className="mr-2 inline-block">{promise.emoji}</span>
                      {promise.text}
                    </p>
                  </motion.div>
                );
              })}
            </div>

            {/* Celebration when all checked */}
            <AnimatePresence>
              {allChecked && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ type: "spring", bounce: 0.4 }}
                  className="mt-10 p-6 rounded-2xl bg-gradient-to-r from-[#e3bb7d]/20 via-[#eec2d3]/20 to-[#c7b3ea]/20 border border-[#e3bb7d]/60 text-center shadow-[0_0_40px_rgba(227,187,125,0.3)]"
                >
                  <span className="text-4xl block mb-2">🎉✨👑</span>
                  <p className="font-handwritten text-3xl md:text-4xl text-[#f7dea6] font-bold">
                    Every promise sealed forever in my heart.
                  </p>
                  <p className="font-serif text-lg text-white/90 mt-2">
                    "I will honor each of these promises every single day of my life, Akka." — Bala ❤️
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      {/* PART 3: DEEP GRATITUDE LINES */}
      <div className="py-24 space-y-[35vh]">
        {[
          "Thank you... for believing in me when I didn't believe in myself.",
          "Thank you... for staying by my side through every mistake.",
          "Thank you... for being the greatest blessing God ever gave me."
        ].map((line, idx) => {
          const ref = useRef(null);
          const inView = useInView(ref, { once: true, margin: "-20%" });
          return (
            <motion.div
              ref={ref}
              key={idx}
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={inView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.9, y: 30 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="text-center px-4 max-w-4xl mx-auto"
            >
              <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#e3bb7d] leading-relaxed drop-shadow-md">
                "{line}"
              </h2>
            </motion.div>
          );
        })}
      </div>

      {/* PART 4: UNBREAKABLE BOND STATEMENT */}
      <FadeInSection>
        <div className="max-w-3xl text-center font-serif text-xl sm:text-2xl md:text-3xl leading-relaxed text-white/90 space-y-8 px-4">
          <p>
            "Even if life takes us to different places...<br/>
            Even if we become busy with our own journeys...<br/>
            Even if time and distance stretch between us..."
          </p>

          <p className="text-[#eec2d3] font-medium font-serif text-2xl sm:text-3xl md:text-4xl">
            Please remember this single truth:
          </p>

          <div className="p-8 rounded-3xl bg-white/5 border border-[#e3bb7d]/30 shadow-[0_0_50px_rgba(227,187,125,0.1)] space-y-4">
            <p className="text-[#f7dea6] text-2xl sm:text-3xl md:text-4xl font-serif">
              You will NEVER face this world alone.
            </p>
            <p className="text-lg sm:text-xl text-white/80 font-sans leading-relaxed">
              Because somewhere in this world, your little brother will always be praying for your peace, cheering for your dreams, and holding you in his heart forever.
            </p>
          </div>
        </div>
      </FadeInSection>

      {/* PART 5: BIBLE VERSE */}
      <FadeInSection className="py-20">
        <div className="max-w-3xl w-full relative">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#e3bb7d]/15 to-transparent blur-3xl rounded-full pointer-events-none" />
          <div className="relative text-center font-serif py-12 px-6 border-y border-[#e3bb7d]/30 bg-white/5 backdrop-blur-md rounded-2xl">
            <p className="text-xs sm:text-sm tracking-[0.3em] text-[#e3bb7d] uppercase mb-4 font-sans">1 Corinthians 13:7</p>
            <p className="text-2xl sm:text-3xl md:text-4xl text-[#f8f0e3] italic leading-relaxed font-serif">
              "Love bears all things, believes all things,<br/>hopes all things, endures all things."
            </p>
          </div>
        </div>
      </FadeInSection>

      {/* PART 6: FINAL SIGNATURE */}
      <FadeInSection>
        <div className="max-w-2xl text-center mt-12">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2 }}
            className="font-serif text-2xl sm:text-3xl md:text-4xl leading-relaxed text-white/95 mb-16 space-y-6"
          >
            <p>
              "Not by blood...<br/>
              but by God's grace...<br/>
              you became my sister.
            </p>
            <p className="text-[#eec2d3] font-handwritten text-4xl sm:text-5xl">
              And by my choice...<br/>
              you'll always be my family." ❤️
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: 0.5 }}
            className="font-handwritten text-3xl sm:text-4xl text-[#e3bb7d] leading-relaxed text-right pr-6 sm:pr-12"
          >
            <p>With all my love & gratitude,</p>
            <p>Your forever loving little brother,</p>
            <motion.p
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
              className="text-5xl sm:text-6xl mt-4 font-bold text-[#f7dea6]"
            >
              Bala ❤️
            </motion.p>
          </motion.div>
        </div>
      </FadeInSection>

    </div>
  );
}
