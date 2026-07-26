'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingSceneProps {
  onComplete: () => void;
}

export default function LoadingScene({ onComplete }: LoadingSceneProps) {
  const [isVisible, setIsVisible] = useState(true);
  const text = "Unfolding memories for Anu Akka...";

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => {
        onComplete();
      }, 1000); // Wait for exit animation
    }, 4000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#04050f] overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 1, ease: "easeInOut" } }}
        >
          {/* Card/Paper wrapper with perspective */}
          <div style={{ perspective: '1000px' }}>
            <motion.div
              className="relative flex flex-col items-center justify-center p-8 sm:p-12 max-w-[90vw] w-[500px] h-[300px] rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
              style={{
                backgroundColor: '#f8f0e3',
                backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22 opacity=%220.05%22/%3E%3C/svg%3E")',
              }}
              initial={{ rotateX: 90, scale: 0.8, opacity: 0 }}
              animate={{ rotateX: 0, scale: 1, opacity: 1 }}
              exit={{ rotateX: -90, scale: 0.8, opacity: 0, transition: { duration: 0.8 } }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            >
              
              {/* Typewriter text */}
              <div className="font-serif text-[#04050f] text-2xl md:text-3xl text-center mb-8 h-16 flex items-center justify-center">
                {text.split('').map((char, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                      duration: 0.1,
                      delay: 1 + index * 0.05,
                    }}
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </motion.span>
                ))}
              </div>

              {/* Progress bar section */}
              <motion.div 
                className="w-full max-w-[300px] flex flex-col items-center gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 0.5 }}
              >
                <div className="flex justify-between w-full text-xs font-sans text-gray-500 uppercase tracking-widest">
                  <span>2025</span>
                  <span>2026</span>
                </div>
                
                <div className="w-full h-[2px] bg-gray-300 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-[#04050f]"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ delay: 2, duration: 1.5, ease: "easeInOut" }}
                  />
                </div>
                
                <motion.p 
                  className="font-handwritten text-[#04050f]/70 text-xl mt-4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2.5, duration: 0.5 }}
                >
                  Collecting the moments...
                </motion.p>
              </motion.div>

            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
