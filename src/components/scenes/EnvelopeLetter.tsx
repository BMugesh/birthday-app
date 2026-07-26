'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const letterLines = [
  { text: "Dear Anu Akka,", style: "text-[#e3bb7d] text-2xl md:text-3xl font-bold" },
  { text: "", style: "" },
  { text: "If someone ever asked me who raised me...", style: "" },
  { text: "I'd probably smile and say,", style: "" },
  { text: "\"You.\"", style: "text-[#f7dea6] text-2xl md:text-3xl italic" },
  { text: "", style: "" },
  { text: "You weren't just my sister.", style: "" },
  { text: "You became my safe place.", style: "text-[#eec2d3]" },
  { text: "The person who scolded me.", style: "" },
  { text: "Protected me.", style: "" },
  { text: "Believed in me.", style: "" },
  { text: "Loved me...", style: "text-[#c7b3ea]" },
  { text: "even when I probably didn't deserve it.", style: "" },
  { text: "", style: "" },
  { text: "Life will change.", style: "" },
  { text: "People will change.", style: "" },
  { text: "Cities will change.", style: "" },
  { text: "But one thing never will...", style: "text-[#e3bb7d]" },
  { text: "", style: "" },
  { text: "You'll always be my first home...", style: "text-[#eec2d3] text-xl md:text-2xl italic" },
  { text: "and I'll always be your annoying little brother.", style: "" },
  { text: "", style: "" },
  { text: "No matter how old we become...", style: "" },
  { text: "You'll never walk alone.", style: "text-[#e3bb7d] font-semibold text-xl md:text-2xl" },
  { text: "I promise.", style: "" },
  { text: "", style: "" },
  { text: "Happy Birthday, Akka.", style: "text-[#f7dea6] text-2xl md:text-3xl" },
  { text: "I love you.", style: "text-[#eec2d3]" },
  { text: "", style: "" },
  { text: "— Bala ❤️", style: "text-[#e3bb7d] text-2xl md:text-3xl font-bold text-right" },
];

export default function EnvelopeLetter() {
  const [isOpen, setIsOpen] = useState(false);
  const [showLetter, setShowLetter] = useState(false);
  const [sealPopped, setSealPopped] = useState(false);

  const handleOpen = () => {
    if (isOpen) return;
    setSealPopped(true);
    setTimeout(() => {
      setIsOpen(true);
      setTimeout(() => {
        setShowLetter(true);
      }, 1400);
    }, 300);
  };

  return (
    <section className="min-h-screen bg-[#04050f] text-[#f8f0e3] py-24 flex flex-col items-center justify-center overflow-hidden">
      <div className="container mx-auto px-4 max-w-4xl relative z-10">

        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <span className="text-[#e3bb7d] text-sm uppercase tracking-[0.3em] font-sans">Chapter V</span>
          <h2 className="text-4xl md:text-5xl font-serif mt-4 text-[#eec2d3]">The Letter</h2>
          <p className="font-handwritten text-xl text-[#c7b3ea] mt-2">Open the envelope to read what's inside 💌</p>
        </motion.div>

        <div className="relative flex justify-center items-center min-h-[70vh]">

          {/* ENVELOPE */}
          <AnimatePresence>
            {!showLetter && (
              <motion.div
                className="relative cursor-pointer select-none"
                initial={{ scale: 0.9, opacity: 0, y: 30 }}
                animate={{
                  scale: isOpen ? 1.05 : 1,
                  opacity: isOpen ? 0 : 1,
                  y: isOpen ? 120 : 0,
                }}
                exit={{ opacity: 0, scale: 0.8, y: 60 }}
                transition={{ duration: 1.4, ease: "easeInOut" }}
                onClick={handleOpen}
                style={{ width: 380, maxWidth: '90vw' }}
              >
                {/* Envelope Body */}
                <div className="relative rounded-lg overflow-visible shadow-2xl" style={{ paddingBottom: '65%' }}>

                  {/* Back of envelope */}
                  <div className="absolute inset-0 rounded-lg" style={{ background: '#f7dea6', border: '2px solid #d4b060' }} />

                  {/* Envelope flap (triangle) */}
                  <motion.div
                    className="absolute top-0 left-0 w-full z-30 origin-top"
                    animate={{ rotateX: isOpen ? 180 : 0 }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                    style={{
                      height: '55%',
                      clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                      background: '#e3bb7d',
                      transformStyle: 'preserve-3d',
                    }}
                  />

                  {/* Left diagonal fold */}
                  <div className="absolute bottom-0 left-0 w-1/2 h-full"
                    style={{ background: '#f0d090', clipPath: 'polygon(0 100%, 0 0, 100% 100%)' }} />
                  {/* Right diagonal fold */}
                  <div className="absolute bottom-0 right-0 w-1/2 h-full"
                    style={{ background: '#ead08a', clipPath: 'polygon(100% 100%, 100% 0, 0 100%)' }} />
                  {/* Bottom fold */}
                  <div className="absolute bottom-0 left-0 right-0"
                    style={{ height: '50%', background: '#f8e9b5', clipPath: 'polygon(0 100%, 50% 0, 100% 100%)' }} />

                  {/* Wax Seal */}
                  <AnimatePresence>
                    {!sealPopped && (
                      <motion.div
                        key="seal"
                        exit={{ scale: 0, opacity: 0, rotate: 45 }}
                        transition={{ duration: 0.3 }}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 flex flex-col items-center gap-2"
                      >
                        <motion.div
                          whileHover={{ scale: 1.15, rotate: 5 }}
                          whileTap={{ scale: 0.85, rotate: -10 }}
                          className="w-20 h-20 rounded-full flex items-center justify-center text-4xl shadow-2xl"
                          style={{
                            background: 'radial-gradient(circle, #a01010, #6b0000)',
                            boxShadow: '0 0 0 4px #c04040, 0 8px 20px rgba(0,0,0,0.5)',
                          }}
                        >
                          💌
                        </motion.div>
                        <motion.p
                          animate={{ opacity: [0.5, 1, 0.5] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="text-[#a9884f] font-sans text-xs tracking-widest uppercase mt-1"
                        >
                          Tap to open
                        </motion.p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Peeking Paper */}
                  <motion.div
                    className="absolute bottom-0 w-[92%] left-[4%] bg-[#fdfbf5] rounded-t-sm z-20 flex items-center justify-center"
                    initial={{ height: '30%' }}
                    animate={{ height: isOpen ? '90%' : '30%', y: isOpen ? '-40%' : 0 }}
                    transition={{ duration: 1.2, delay: 0.4, ease: "easeInOut" }}
                    style={{ boxShadow: '0 -4px 12px rgba(0,0,0,0.1)' }}
                  >
                    <span className="font-handwritten text-[#a9884f] text-xl opacity-50">For Anu Akka, with love 💛</span>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* LETTER */}
          <AnimatePresence>
            {showLetter && (
              <motion.div
                className="w-full max-w-2xl relative z-30"
                initial={{ opacity: 0, y: 80, scale: 0.92 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.9, ease: "easeOut" }}
              >
                {/* Paper texture card */}
                <div
                  className="rounded-2xl p-8 md:p-12 shadow-2xl relative overflow-hidden"
                  style={{
                    background: 'linear-gradient(135deg, #fdfbf5 0%, #f8f0e0 50%, #fdfaf3 100%)',
                    boxShadow: '0 30px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.8)',
                  }}
                >
                  {/* Paper Lines */}
                  <div className="absolute inset-0 pointer-events-none opacity-10"
                    style={{ backgroundImage: 'linear-gradient(#94a3b8 1px, transparent 1px)', backgroundSize: '100% 2rem' }} />
                  {/* Left margin line */}
                  <div className="absolute left-16 top-0 bottom-0 w-px bg-[#eec2d3]/40 pointer-events-none" />
                  {/* Corner curl effect */}
                  <div className="absolute bottom-0 right-0 w-12 h-12 pointer-events-none"
                    style={{ background: 'linear-gradient(135deg, transparent 50%, rgba(0,0,0,0.05) 50%)', borderRadius: '0 0 12px 0' }} />

                  {/* Header decoration */}
                  <div className="flex justify-between items-center mb-6 pb-3 border-b border-[#d4c5a0]">
                    <span className="font-sans text-xs tracking-widest uppercase text-[#a9884f]">July 27, 2026</span>
                    <span className="font-handwritten text-2xl text-[#a9884f]">Page 1</span>
                  </div>

                  <div className="font-handwritten text-lg md:text-2xl leading-relaxed text-[#2c1d11] space-y-1">
                    {letterLines.map((line, index) => (
                      <motion.p
                        key={index}
                        initial={{ opacity: 0, x: -15 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.12 }}
                        className={`${line.style || 'text-[#3d2b1f]'} ${line.text === '' ? 'h-3' : ''}`}
                      >
                        {line.text}
                      </motion.p>
                    ))}
                  </div>

                  {/* Footer decoration */}
                  <div className="h-px w-full bg-gradient-to-r from-transparent via-[#d4c5a0] to-transparent mt-8 opacity-60" />

                  {/* Stamp */}
                  <motion.div
                    initial={{ opacity: 0, rotate: -15 }}
                    animate={{ opacity: 1, rotate: -12 }}
                    transition={{ delay: 2, duration: 0.5 }}
                    className="absolute top-8 right-8 w-16 h-20 border-2 border-[#e3bb7d]/50 rounded flex flex-col items-center justify-center gap-1 opacity-60"
                    style={{ background: 'rgba(227,187,125,0.1)' }}
                  >
                    <span className="text-2xl">❤️</span>
                    <span className="font-sans text-[8px] text-[#a9884f] tracking-widest">LOVE</span>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
