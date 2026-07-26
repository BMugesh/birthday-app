'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';

interface Coupon {
  id: number;
  title: string;
  emoji: string;
  tagline: string;
  description: string;
  code: string;
  color: string;
  unlocked: boolean;
}

const INITIAL_COUPONS: Coupon[] = [
  {
    id: 1,
    title: "1 Free Coffee & Deep Talk",
    emoji: "☕",
    tagline: "Warm Cup & Open Heart",
    description: "Whenever you need a quiet conversation, a warm coffee, or just someone to listen without judgment.",
    code: "AKKA-COFFEE-01",
    color: "#e3bb7d",
    unlocked: false,
  },
  {
    id: 2,
    title: "Midnight Ice-Cream Run",
    emoji: "🍦",
    tagline: "Late Night Sweet Craving",
    description: "No matter how late it is, your brother will bring your favorite ice cream straight to you.",
    code: "AKKA-ICE-CREAM-02",
    color: "#eec2d3",
    unlocked: false,
  },
  {
    id: 3,
    title: "Movie Night (She Chooses!)",
    emoji: "🎬",
    tagline: "Zero Objections Guaranteed",
    description: "You pick the movie, the show, or the marathon. No arguments, no channel fighting allowed!",
    code: "AKKA-MOVIE-03",
    color: "#c7b3ea",
    unlocked: false,
  },
  {
    id: 4,
    title: "1-Day Queen Privilege",
    emoji: "👑",
    tagline: "Your Word Is Law",
    description: "24 hours of full royal treatment. Zero arguments, total obedience, and endless treats!",
    code: "AKKA-[#1-QUEEN-04]",
    color: "#f7dea6",
    unlocked: false,
  },
  {
    id: 5,
    title: "Shopping Trip Companion",
    emoji: "🛍️",
    tagline: "Bag Carrier Extraordinaire",
    description: "I'll carry all your shopping bags, give honest outfit feedback, and never complain about waiting.",
    code: "AKKA-SHOPPING-05",
    color: "#ffb703",
    unlocked: false,
  },
  {
    id: 6,
    title: "Late-Night Snack Rescue",
    emoji: "🍕",
    tagline: "2 AM Hunger Savior",
    description: "When midnight hunger strikes, I'll cook or order your favorite snack right to your room.",
    code: "AKKA-SNACK-06",
    color: "#ff758f",
    unlocked: false,
  },
];

export default function SisterCoupons() {
  const [coupons, setCoupons] = useState<Coupon[]>(INITIAL_COUPONS);
  const [activeCoupon, setActiveCoupon] = useState<Coupon | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const unlockCoupon = (id: number) => {
    setCoupons(prev =>
      prev.map(c => (c.id === id ? { ...c, unlocked: true } : c))
    );
  };

  const unlockedCount = coupons.filter(c => c.unlocked).length;

  return (
    <section 
      ref={ref}
      className="min-h-screen py-24 px-4 sm:px-8 flex flex-col items-center justify-center relative overflow-hidden bg-[#04050f] text-[#f8f0e3]"
    >
      {/* Background Ambient Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-gradient-to-r from-[#e3bb7d]/10 via-[#eec2d3]/10 to-[#c7b3ea]/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-6xl w-full mx-auto z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <span className="font-sans text-xs sm:text-sm tracking-[0.3em] uppercase text-[#e3bb7d] mb-3 block font-semibold">
            Special Gift • Sister Vouchers
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#f8f0e3] font-normal drop-shadow-md">
            Sister Coupons 🎟️✨
          </h2>
          <p className="font-handwritten text-2xl sm:text-3xl text-[#eec2d3] mt-3">
            Scratch to reveal redeemable promises from Bala ({unlockedCount}/{coupons.length} Unlocked)
          </p>
        </motion.div>

        {/* Coupons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {coupons.map((coupon, idx) => (
            <motion.div
              key={coupon.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="relative group rounded-3xl overflow-hidden shadow-2xl border border-white/10"
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                backdropFilter: 'blur(20px)',
              }}
            >
              {/* Top Colored Accent */}
              <div 
                className="h-3 w-full"
                style={{ background: coupon.color }}
              />

              <div className="p-6 sm:p-7 flex flex-col justify-between h-full min-h-[300px]">
                {/* Header info */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-4xl sm:text-5xl filter drop-shadow-md">{coupon.emoji}</span>
                    <span 
                      className={`text-xs font-sans font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${
                        coupon.unlocked 
                          ? 'bg-[#e3bb7d]/20 text-[#f7dea6] border-[#e3bb7d]/40' 
                          : 'bg-white/5 text-white/40 border-white/10'
                      }`}
                    >
                      {coupon.unlocked ? "✓ Unlocked & Valid" : "🔒 Scratch to Reveal"}
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl text-white font-bold mb-1">
                    {coupon.title}
                  </h3>
                  <p className="font-handwritten text-xl text-[#eec2d3] mb-4">
                    "{coupon.tagline}"
                  </p>

                  <p className="font-sans text-sm text-white/80 leading-relaxed mb-6">
                    {coupon.description}
                  </p>
                </div>

                {/* Redeem Action */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="font-mono text-xs text-white/40 tracking-wider">
                    {coupon.unlocked ? coupon.code : "••••-••••-••"}
                  </span>

                  <button
                    onClick={() => {
                      unlockCoupon(coupon.id);
                      setActiveCoupon(coupon);
                    }}
                    className={`px-4 py-2 rounded-full font-sans text-xs uppercase tracking-wider font-bold transition-all border cursor-pointer ${
                      coupon.unlocked
                        ? 'bg-[#e3bb7d] text-[#04050f] border-[#e3bb7d] hover:bg-white shadow-[0_0_20px_rgba(227,187,125,0.4)]'
                        : 'bg-white/10 hover:bg-white/20 text-[#f8f0e3] border-white/20 hover:border-[#e3bb7d]'
                    }`}
                  >
                    {coupon.unlocked ? "View Voucher ✨" : "Scratch Off 🎟️"}
                  </button>
                </div>
              </div>

              {/* Scratch Overlay Layer for locked cards */}
              {!coupon.unlocked && (
                <ScratchOverlay 
                  color={coupon.color} 
                  onScratchComplete={() => {
                    unlockCoupon(coupon.id);
                    setActiveCoupon(coupon);
                  }} 
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal for Unlocked Coupon Voucher */}
      <AnimatePresence>
        {activeCoupon && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveCoupon(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 cursor-pointer"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-gradient-to-br from-[#0a0d24] via-[#131736] to-[#04050f] p-8 sm:p-10 rounded-3xl max-w-lg w-full border-2 border-[#e3bb7d] shadow-[0_0_80px_rgba(227,187,125,0.3)] relative text-center"
            >
              <button
                onClick={() => setActiveCoupon(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center font-bold text-lg"
              >
                ✕
              </button>

              {/* Voucher Stamp */}
              <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-tr from-[#e3bb7d] to-[#eec2d3] p-1 mb-4 shadow-[0_0_30px_rgba(227,187,125,0.4)] flex items-center justify-center">
                <span className="text-4xl">{activeCoupon.emoji}</span>
              </div>

              <span className="font-sans text-xs tracking-[0.3em] uppercase text-[#e3bb7d] block mb-1">
                Official Sister Voucher
              </span>

              <h3 className="font-serif text-3xl sm:text-4xl text-white font-bold mb-2">
                {activeCoupon.title}
              </h3>
              <p className="font-handwritten text-2xl text-[#eec2d3] mb-6">
                "{activeCoupon.tagline}"
              </p>

              <div className="p-4 bg-white/5 rounded-2xl border border-white/10 mb-6 text-left space-y-2">
                <p className="font-sans text-sm text-white/90 leading-relaxed">
                  {activeCoupon.description}
                </p>
                <div className="pt-2 border-t border-white/10 flex justify-between items-center text-xs font-sans text-white/60">
                  <span>Issued By: Bala</span>
                  <span>Valid For: Lifetime</span>
                </div>
              </div>

              {/* Code */}
              <div className="p-3 bg-[#e3bb7d]/20 border border-[#e3bb7d]/50 rounded-xl mb-6 inline-block w-full">
                <p className="font-sans text-xs uppercase text-[#e3bb7d] tracking-widest mb-1">Voucher Code</p>
                <p className="font-mono text-xl text-white font-bold tracking-wider">{activeCoupon.code}</p>
              </div>

              <p className="font-handwritten text-xl text-[#f7dea6]">
                Show this voucher to Bala anytime to redeem your promise! ❤️
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

// Scratch Off Canvas Component
function ScratchOverlay({ color, onScratchComplete }: { color: string; onScratchComplete: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isScratching, setIsScratching] = useState(false);
  const [scratchedPct, setScratchedPct] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = (canvas.width = canvas.parentElement?.clientWidth || 320);
    const height = (canvas.height = canvas.parentElement?.clientHeight || 300);

    // Draw silver/metallic scratch foil
    const grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, '#2a2d45');
    grad.addColorStop(0.5, '#4a4e69');
    grad.addColorStop(1, '#1d1e30');

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // Add foil pattern text
    ctx.fillStyle = 'rgba(227, 187, 125, 0.4)';
    ctx.font = 'bold 16px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('✨ SCRATCH WITH MOUSE OR TOUCH ✨', width / 2, height / 2);
    ctx.font = '12px sans-serif';
    ctx.fillText('Tap or drag to reveal your coupon!', width / 2, height / 2 + 25);
  }, []);

  const scratch = (x: number, y: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 28, 0, Math.PI * 2);
    ctx.fill();

    // Check scratched percentage
    if (scratchedPct < 50) {
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      let clearPixels = 0;
      for (let i = 3; i < imageData.data.length; i += 16) {
        if (imageData.data[i] === 0) clearPixels++;
      }
      const pct = Math.round((clearPixels / (imageData.data.length / 16)) * 100);
      setScratchedPct(pct);

      if (pct > 35) {
        onScratchComplete();
      }
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isScratching) return;
    const rect = e.currentTarget.getBoundingClientRect();
    scratch(e.clientX - rect.left, e.clientY - rect.top);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const touch = e.touches[0];
    scratch(touch.clientX - rect.left, touch.clientY - rect.top);
  };

  return (
    <canvas
      ref={canvasRef}
      onMouseDown={() => setIsScratching(true)}
      onMouseUp={() => setIsScratching(false)}
      onMouseLeave={() => setIsScratching(false)}
      onMouseMove={handleMouseMove}
      onTouchStart={() => setIsScratching(true)}
      onTouchEnd={() => setIsScratching(false)}
      onTouchMove={handleTouchMove}
      onClick={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        scratch(e.clientX - rect.left, e.clientY - rect.top);
      }}
      className="absolute inset-0 z-20 cursor-pointer touch-none transition-opacity duration-500"
    />
  );
}
