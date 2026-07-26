'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

interface MidnightCountdownProps {
  onComplete: () => void;
  targetDate?: Date;
}

export default function MidnightCountdown({
  onComplete,
  targetDate = new Date('2026-07-27T00:00:00+05:30'),
}: MidnightCountdownProps) {
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [mounted, setMounted] = useState(false);
  const [stars, setStars] = useState<{ id: number; top: string; left: string; delay: number }[]>([]);

  const targetTime = targetDate.getTime();

  useEffect(() => {
    setMounted(true);
    // Generate stars background
    const newStars = Array.from({ length: 40 }).map((_, i) => ({
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
    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      const remaining = calculateTimeLeft();
      setTimeLeft(remaining);

      if (remaining <= 0) {
        clearInterval(timer);
        // Transition to next scene 5 seconds after midnight
        setTimeout(() => {
          onComplete();
        }, 5000);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetTime, mounted, onComplete]);

  if (!mounted) return null;

  const secondsTotal = Math.floor(timeLeft / 1000);
  const isClose = secondsTotal > 0 && secondsTotal <= 10;
  const isFinished = secondsTotal === 0;

  const days = Math.floor(secondsTotal / (3600 * 24));
  const hours = Math.floor((secondsTotal % (3600 * 24)) / 3600);
  const minutes = Math.floor((secondsTotal % 3600) / 60);
  const seconds = secondsTotal % 60;

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#04050f] p-4">
      {/* Twinkling Stars Background */}
      <div className="absolute inset-0 z-0">
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

      <div className="z-10 flex w-full flex-col items-center justify-center text-center">
        <AnimatePresence mode="wait">
          {isFinished ? (
            <motion.div
              key="finished"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
              className="relative flex flex-col items-center"
            >
              {/* CSS Fireworks Animation */}
              <div className="absolute inset-0 -z-10 flex items-center justify-center">
                <motion.div 
                  initial={{ opacity: 1, scale: 0 }} 
                  animate={{ opacity: 0, scale: 2.5 }} 
                  transition={{ duration: 1.2, ease: "easeOut" }}
                  className="absolute h-32 w-32 md:h-64 md:w-64 rounded-full border-[8px] border-[#e3bb7d]/50" 
                />
                <motion.div 
                  initial={{ opacity: 1, scale: 0 }} 
                  animate={{ opacity: 0, scale: 3.5 }} 
                  transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                  className="absolute h-32 w-32 md:h-64 md:w-64 rounded-full border-[6px] border-[#eec2d3]/50" 
                />
                <motion.div 
                  initial={{ opacity: 1, scale: 0 }} 
                  animate={{ opacity: 0, scale: 4.5 }} 
                  transition={{ duration: 2, ease: "easeOut", delay: 0.4 }}
                  className="absolute h-32 w-32 md:h-64 md:w-64 rounded-full border-[4px] border-[#c7b3ea]/50" 
                />
              </div>
              
              <h1 className="font-handwritten text-6xl md:text-8xl lg:text-[7rem] text-[#e3bb7d] drop-shadow-[0_0_20px_rgba(227,187,125,0.6)]">
                Happy Birthday,<br className="md:hidden" /> Anu Akka! ❤️
              </h1>
            </motion.div>
          ) : isClose ? (
            <motion.div
              key={`close-${secondsTotal}`}
              initial={{ opacity: 0.5, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center justify-center"
            >
              <span className="font-serif text-7xl md:text-[10rem] lg:text-[12rem] text-[#e3bb7d] tracking-widest drop-shadow-[0_0_25px_rgba(227,187,125,0.4)]">
                23:59:{String(seconds).padStart(2, '0')}
              </span>
            </motion.div>
          ) : (
            <motion.div
              key="countdown"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex w-full flex-col items-center space-y-10 md:space-y-16"
            >
              <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl text-[#e3bb7d] font-medium tracking-wide">
                The celebration begins at midnight...
              </h2>
              <div className="grid grid-cols-2 gap-4 md:flex md:gap-6 lg:gap-8">
                <CountdownBox label="Days" value={days} />
                <CountdownBox label="Hours" value={hours} />
                <CountdownBox label="Minutes" value={minutes} />
                <CountdownBox label="Seconds" value={seconds} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Skip Button */}
      <button
        onClick={onComplete}
        className="absolute bottom-8 right-8 z-50 text-sm md:text-base font-sans font-medium tracking-wider text-white/40 transition-all hover:text-white/90 hover:tracking-widest"
      >
        Skip →
      </button>
    </div>
  );
}

function CountdownBox({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl md:min-h-[160px] md:min-w-[140px] shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
      <span className="font-serif text-5xl md:text-7xl font-medium text-[#f8f0e3]">
        {String(value).padStart(2, '0')}
      </span>
      <span className="mt-3 md:mt-4 text-xs md:text-sm font-sans uppercase tracking-[0.2em] text-white/60">
        {label}
      </span>
    </div>
  );
}
