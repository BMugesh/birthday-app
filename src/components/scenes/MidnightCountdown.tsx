'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';

interface MidnightCountdownProps {
  onComplete: () => void;
  targetDate?: Date;
}

interface FireworkParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  color: string;
  size: number;
  gravity: number;
  decay: number;
  isHeart?: boolean;
}

interface Rocket {
  x: number;
  y: number;
  targetY: number;
  vy: number;
  color: string;
}

export default function MidnightCountdown({
  onComplete,
  targetDate = new Date('2026-07-27T00:00:00+05:30'),
}: MidnightCountdownProps) {
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [mounted, setMounted] = useState(false);
  const [stars, setStars] = useState<{ id: number; top: string; left: string; delay: number }[]>([]);
  
  // 5-second final countdown state
  const [inFinalCountdown, setInFinalCountdown] = useState(false);
  const [fiveSecCount, setFiveSecCount] = useState<number>(5);
  const [isCelebrationStarted, setIsCelebrationStarted] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const targetTime = targetDate.getTime();

  useEffect(() => {
    setMounted(true);
    // Generate stars background
    const newStars = Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      delay: Math.random() * 2,
    }));
    setStars(newStars);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const calculateTimeLeft = () => {
      const difference = targetTime - new Date().getTime();
      return Math.max(0, difference);
    };

    // Initial calculation
    const remaining = calculateTimeLeft();
    setTimeLeft(remaining);

    if (remaining <= 0 && !inFinalCountdown && !isCelebrationStarted) {
      triggerFinalCountdown();
      return;
    }

    const timer = setInterval(() => {
      const currentRemaining = calculateTimeLeft();
      setTimeLeft(currentRemaining);

      if (currentRemaining <= 0) {
        clearInterval(timer);
        if (!inFinalCountdown && !isCelebrationStarted) {
          triggerFinalCountdown();
        }
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetTime, mounted, inFinalCountdown, isCelebrationStarted]);

  // Function to trigger the 5-second final countdown
  const triggerFinalCountdown = () => {
    setInFinalCountdown(true);
    setFiveSecCount(5);

    let count = 5;
    const interval = setInterval(() => {
      count -= 1;
      setFiveSecCount(count);
      if (count <= 0) {
        clearInterval(interval);
        setInFinalCountdown(false);
        setIsCelebrationStarted(true);
      }
    }, 1000);
  };

  // FIREWORKS & HEARTS CANVAS PHYSICS ENGINE
  useEffect(() => {
    if (!isCelebrationStarted) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const particles: FireworkParticle[] = [];
    const rockets: Rocket[] = [];
    const floatingHearts: { x: number; y: number; vy: number; vx: number; size: number; alpha: number; symbol: string }[] = [];

    const colors = ['#e3bb7d', '#eec2d3', '#c7b3ea', '#ff4d6d', '#ff758f', '#ffb703', '#3a86ff', '#00f5d4'];
    const heartSymbols = ['❤️', '💖', '💕', '💗', '💓', '✨', '👑', '🎂'];

    // Spawn rockets randomly
    const spawnRocket = () => {
      const x = Math.random() * width;
      const targetY = Math.random() * (height * 0.4) + height * 0.1;
      const color = colors[Math.floor(Math.random() * colors.length)];
      rockets.push({ x, y: height, targetY, vy: -(Math.random() * 4 + 8), color });
    };

    // Spawn heart explosion
    const createExplosion = (x: number, y: number, baseColor: string) => {
      const count = 80;
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count;
        const speed = Math.random() * 6 + 2;

        const isHeart = Math.random() > 0.4;
        let vx = Math.cos(angle) * speed;
        let vy = Math.sin(angle) * speed;

        if (isHeart) {
          const t = Math.random() * Math.PI * 2;
          vx = 16 * Math.pow(Math.sin(t), 3) * (Math.random() * 0.3 + 0.2);
          vy = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)) * (Math.random() * 0.3 + 0.2);
        }

        particles.push({
          x,
          y,
          vx,
          vy,
          alpha: 1,
          color: baseColor,
          size: Math.random() * 3 + 2,
          gravity: 0.08,
          decay: Math.random() * 0.015 + 0.008,
          isHeart,
        });
      }

      for (let k = 0; k < 6; k++) {
        floatingHearts.push({
          x: x + (Math.random() * 40 - 20),
          y: y + (Math.random() * 40 - 20),
          vx: (Math.random() - 0.5) * 2,
          vy: -(Math.random() * 2 + 1),
          size: Math.random() * 16 + 18,
          alpha: 1,
          symbol: heartSymbols[Math.floor(Math.random() * heartSymbols.length)],
        });
      }
    };

    let lastRocketTime = 0;

    const render = (time: number) => {
      ctx.fillStyle = 'rgba(4, 5, 15, 0.25)';
      ctx.fillRect(0, 0, width, height);

      if (time - lastRocketTime > 350) {
        spawnRocket();
        if (Math.random() > 0.4) spawnRocket();
        lastRocketTime = time;
      }

      for (let i = rockets.length - 1; i >= 0; i--) {
        const r = rockets[i];
        r.y += r.vy;

        ctx.beginPath();
        ctx.arc(r.x, r.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = r.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = r.color;
        ctx.fill();
        ctx.shadowBlur = 0;

        if (r.y <= r.targetY) {
          createExplosion(r.x, r.y, r.color);
          rockets.splice(i, 1);
        }
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += p.gravity;
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = p.color;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      for (let i = floatingHearts.length - 1; i >= 0; i--) {
        const h = floatingHearts[i];
        h.x += h.vx;
        h.y += h.vy;
        h.alpha -= 0.01;

        if (h.alpha <= 0) {
          floatingHearts.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = h.alpha;
        ctx.font = `${h.size}px sans-serif`;
        ctx.fillText(h.symbol, h.x, h.y);
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isCelebrationStarted]);

  if (!mounted) return null;

  const secondsTotal = Math.floor(timeLeft / 1000);
  const days = Math.floor(secondsTotal / (3600 * 24));
  const hours = Math.floor((secondsTotal % (3600 * 24)) / 3600);
  const minutes = Math.floor((secondsTotal % 3600) / 60);
  const seconds = secondsTotal % 60;

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#04050f] p-4 text-[#f8f0e3]">
      {/* Full-screen Fireworks & Hearts Canvas */}
      {isCelebrationStarted && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 z-0 pointer-events-none w-full h-full"
        />
      )}

      {/* Twinkling Stars Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {stars.map((star) => (
          <motion.div
            key={star.id}
            className="absolute h-[2px] w-[2px] rounded-full bg-white/70 shadow-[0_0_2px_rgba(255,255,255,0.8)]"
            style={{ top: star.top, left: star.left }}
            animate={{ opacity: [0.2, 1, 0.2] }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: star.delay,
            }}
          />
        ))}
      </div>

      <div className="z-10 flex w-full flex-col items-center justify-center text-center px-4 max-w-4xl">
        <AnimatePresence mode="wait">
          
          {/* STAGE 1: 5-SECOND FINAL COUNTDOWN */}
          {inFinalCountdown ? (
            <motion.div
              key={`five-sec-${fiveSecCount}`}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: [0.8, 1.25, 1], opacity: 1 }}
              exit={{ scale: 1.5, opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="relative flex flex-col items-center justify-center py-12"
            >
              {/* Concentric Pulsing Rings */}
              <div className="absolute inset-0 -z-10 flex items-center justify-center pointer-events-none">
                <motion.div
                  animate={{ scale: [1, 2.5], opacity: [0.8, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="w-48 h-48 rounded-full border-4 border-[#e3bb7d]"
                />
                <motion.div
                  animate={{ scale: [1, 3.2], opacity: [0.6, 0] }}
                  transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                  className="w-48 h-48 rounded-full border-2 border-[#eec2d3]"
                />
              </div>

              <span className="font-sans text-sm sm:text-base uppercase tracking-[0.4em] text-[#eec2d3] mb-4 font-semibold">
                Get Ready, Anu Akka... 💖
              </span>

              {/* Big Animated 5-Second Number */}
              <motion.div 
                className="font-serif text-8xl sm:text-[12rem] md:text-[16rem] font-bold text-[#e3bb7d] leading-none drop-shadow-[0_0_50px_rgba(227,187,125,0.9)]"
              >
                {fiveSecCount}
              </motion.div>

              <span className="font-handwritten text-2xl sm:text-4xl text-[#c7b3ea] mt-6">
                The magical moment is here! ✨
              </span>
            </motion.div>
          ) : isCelebrationStarted ? (
            /* STAGE 2: FIREWORKS & CELEBRATION */
            <motion.div
              key="finished"
              initial={{ opacity: 0, scale: 0.8, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
              className="relative flex flex-col items-center justify-center py-10"
            >
              {/* Grand 22nd Birthday Crown Badge */}
              <motion.div
                animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gradient-to-tr from-[#e3bb7d] via-[#ff758f] to-[#eec2d3] p-1 shadow-[0_0_50px_rgba(227,187,125,0.6)] mb-6 flex items-center justify-center"
              >
                <div className="w-full h-full rounded-full bg-[#04050f] flex flex-col items-center justify-center border border-white/20">
                  <span className="text-3xl sm:text-4xl">👑</span>
                  <span className="font-serif text-2xl sm:text-3xl font-bold text-[#e3bb7d]">22</span>
                </div>
              </motion.div>

              {/* 22nd Birthday Heading */}
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="font-handwritten text-5xl sm:text-7xl md:text-8xl lg:text-[6.5rem] text-[#e3bb7d] leading-tight drop-shadow-[0_0_35px_rgba(227,187,125,0.8)] mb-4"
              >
                Happieeeest 22nd Birthday,<br className="hidden sm:inline" /> Anu Akka! 🥳🎂💖
              </motion.h1>

              {/* Special 22nd Birthday Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.4 }}
                className="font-serif text-lg sm:text-2xl md:text-3xl text-[#eec2d3] max-w-2xl leading-relaxed mb-8 drop-shadow-md"
              >
                Entering your golden 22nd year of life ✨<br/>
                May your heart always overflow with endless joy, smiles, peace, and God's richest blessings!
              </motion.p>

              {/* Action Button to Unfold the Experience */}
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                whileHover={{ scale: 1.06, boxShadow: '0 0 40px rgba(227,187,125,0.6)' }}
                whileTap={{ scale: 0.95 }}
                onClick={onComplete}
                className="px-8 py-4 rounded-full bg-gradient-to-r from-[#e3bb7d] via-[#eec2d3] to-[#c7b3ea] text-[#04050f] font-serif text-lg md:text-xl font-bold shadow-[0_0_30px_rgba(227,187,125,0.4)] border border-white/40 cursor-pointer flex items-center gap-3 transition-all"
              >
                <span>Unfold Your Birthday Gift</span>
                <span className="text-xl">✨🎁</span>
              </motion.button>

              <p className="font-handwritten text-xl text-[#c7b3ea] mt-4 opacity-80">
                Created with thousands of memories & love by Bala ❤️
              </p>
            </motion.div>
          ) : (
            /* STAGE 3: MAIN COUNTDOWN */
            <motion.div
              key="countdown"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex w-full flex-col items-center space-y-8 md:space-y-12"
            >
              <div className="space-y-2">
                <span className="text-xs sm:text-sm uppercase tracking-[0.3em] text-[#eec2d3] font-sans">
                  Special Countdown to July 27 🎂
                </span>
                <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#e3bb7d] font-medium tracking-wide">
                  Anu Akka's 22nd Birthday Begins At Midnight...
                </h2>
              </div>

              <div className="grid grid-cols-2 gap-4 md:flex md:gap-6 lg:gap-8">
                <CountdownBox label="Days" value={days} />
                <CountdownBox label="Hours" value={hours} />
                <CountdownBox label="Minutes" value={minutes} />
                <CountdownBox label="Seconds" value={seconds} />
              </div>

              {/* Test Button for 5-sec countdown */}
              <button
                onClick={triggerFinalCountdown}
                className="px-5 py-2 rounded-full bg-white/10 hover:bg-[#e3bb7d] text-white hover:text-[#04050f] font-sans text-xs uppercase tracking-wider font-bold transition-all border border-white/20 hover:border-[#e3bb7d] cursor-pointer"
              >
                ▶ Test 5-Sec Final Countdown
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Skip / Preview Button */}
      <button
        onClick={onComplete}
        className="absolute bottom-8 right-8 z-50 text-xs sm:text-sm md:text-base font-sans font-medium tracking-wider text-white/40 transition-all hover:text-white/90 hover:tracking-widest bg-white/5 hover:bg-white/10 px-4 py-2 rounded-full border border-white/10"
      >
        Skip to Experience →
      </button>
    </div>
  );
}

function CountdownBox({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-[#e3bb7d]/30 bg-white/5 p-6 backdrop-blur-xl md:min-h-[160px] md:min-w-[140px] shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
      <span className="font-serif text-4xl sm:text-5xl md:text-7xl font-medium text-[#f8f0e3]">
        {String(value).padStart(2, '0')}
      </span>
      <span className="mt-3 md:mt-4 text-xs md:text-sm font-sans uppercase tracking-[0.2em] text-[#eec2d3]">
        {label}
      </span>
    </div>
  );
}
