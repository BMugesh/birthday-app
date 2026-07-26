'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

interface DiaryPageData {
  title: string;
  subtitle: string;
  note: string;
  date: string;
  imageSrc: string;
  emoji: string;
  decorations: string[];
  polaroidCaption: string;
  objectPos?: string;
}

const diaryPages: DiaryPageData[] = [
  {
    title: "Our Memory Diary",
    subtitle: "A collection of moments stitched together by love",
    note: "Every page in this book holds a piece of my heart and a memory I will never forget.",
    date: "July 27, 2026",
    imageSrc: "/images/10_first_home.jpg",
    emoji: "👑",
    decorations: ["🌸", "💛", "✨", "🦋"],
    polaroidCaption: "To My First Home",
    objectPos: "object-[center_20%]"
  },
  {
    title: "The Day We Became Family",
    subtitle: "God's perfect timing",
    note: "We didn't grow up under the same roof, but from the moment we started talking, you felt like home.",
    date: "The Beginning",
    imageSrc: "/images/03_campus_selfie.jpg",
    emoji: "🌸",
    decorations: ["🌺", "💖", "🌷"],
    polaroidCaption: "A moment I'll treasure forever",
    objectPos: "object-[center_20%]"
  },
  {
    title: "Laughing Together",
    subtitle: "Our silly, golden moments",
    note: "Your laugh is my favorite sound. Thank you for filling my days with so much joy and endless giggles.",
    date: "Every Single Day",
    imageSrc: "/images/01_favourite_day.jpg",
    emoji: "💕",
    decorations: ["✨", "❤️", "🎈"],
    polaroidCaption: "Your laugh heals everything",
    objectPos: "object-[center_30%]"
  },
  {
    title: "Through Every Storm",
    subtitle: "My safe sanctuary",
    note: "Whenever life got heavy, you were the lantern in my darkest night. You never let me stand alone.",
    date: "Unshakeable Bond",
    imageSrc: "/images/11_protected.jpg",
    emoji: "🌙",
    decorations: ["✨", "🛡️", "⭐"],
    polaroidCaption: "You protected me always",
    objectPos: "object-[center_70%]"
  },
  {
    title: "Growing Together",
    subtitle: "One day at a time",
    note: "Watching you be my guide, my sister, and my biggest cheerleader is the greatest gift God ever gave me.",
    date: "Forever Growing",
    imageSrc: "/images/09_forest_selfie.jpg",
    emoji: "🌻",
    decorations: ["🌷", "🍃", "💛"],
    polaroidCaption: "Every day with you is a gift",
    objectPos: "object-[center_80%]"
  },
  {
    title: "Forever & Always",
    subtitle: "The chapter that never ends",
    note: "This diary isn't finished... because our story will keep going, through every lifetime.",
    date: "Until Infinity",
    imageSrc: "/images/08_beach_feet.jpg",
    emoji: "♾️",
    decorations: ["✨", "💖", "🎀", "👑"],
    polaroidCaption: "A memory I'll hold forever ❤️",
    objectPos: "object-center"
  }
];

export default function MemoryBook() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDirection, setFlipDirection] = useState<'next' | 'prev'>('next');

  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView && !isOpen) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [isInView, isOpen]);

  const currentSpread = Math.floor(currentPage / 2);

  const handleNext = () => {
    if (currentPage < diaryPages.length - 2 && !isFlipping) {
      setFlipDirection('next');
      setIsFlipping(true);
      setTimeout(() => {
        setCurrentPage(p => Math.min(diaryPages.length - 2, p + 2));
        setIsFlipping(false);
      }, 700);
    }
  };

  const handlePrev = () => {
    if (currentPage > 0 && !isFlipping) {
      setFlipDirection('prev');
      setIsFlipping(true);
      setTimeout(() => {
        setCurrentPage(p => Math.max(0, p - 2));
        setIsFlipping(false);
      }, 700);
    }
  };

  const leftPageData = diaryPages[currentSpread * 2];
  const rightPageData = diaryPages[currentSpread * 2 + 1];

  return (
    <section 
      ref={ref}
      className="min-h-screen py-24 px-4 flex flex-col items-center justify-center relative overflow-hidden bg-[#04050f] text-[#f8f0e3]"
    >
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-r from-[#e3bb7d]/10 via-[#eec2d3]/10 to-[#c7b3ea]/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12 z-10"
      >
        <span className="font-sans text-xs md:text-sm tracking-[0.3em] uppercase text-[#e3bb7d] opacity-80 mb-2 block">
          Chapter IV • Memory Diary
        </span>
        <h2 className="font-serif text-5xl md:text-6xl text-[#f8f0e3] font-normal tracking-wide drop-shadow-md">
          Our Handwritten Book
        </h2>
        <p className="font-handwritten text-2xl md:text-3xl text-[#eec2d3] mt-2">
          Click the diary to open or flip through the memories 📖
        </p>
      </motion.div>

      {/* 3D Book Container */}
      <div className="relative w-full max-w-5xl h-[520px] sm:h-[580px] md:h-[640px] lg:h-[680px] z-10 flex items-center justify-center perspective-[2000px]">
        
        {/* Book Container with 3D transform */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.85, rotateX: 10 }}
          animate={isInView ? { opacity: 1, scale: 1, rotateX: 0 } : { opacity: 0, scale: 0.85, rotateX: 10 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative w-full h-full flex items-center justify-center"
        >
          {/* THE PHYSICAL BOOK */}
          <div className={`relative w-full max-w-4xl h-full transition-all duration-1000 transform-style-3d ${isOpen ? 'shadow-[0_30px_100px_rgba(0,0,0,0.8)]' : 'shadow-[0_20px_60px_rgba(0,0,0,0.6)] cursor-pointer'}`}>
            
            {/* 1. CLOSED BOOK COVER */}
            <AnimatePresence>
              {!isOpen && (
                <motion.div 
                  initial={{ rotateY: 0 }}
                  exit={{ rotateY: -160, opacity: 0 }}
                  transition={{ duration: 1.2, ease: [0.645, 0.045, 0.355, 1.000] }}
                  onClick={() => setIsOpen(true)}
                  style={{ transformOrigin: 'left center' }}
                  className="absolute inset-0 z-50 bg-gradient-to-br from-[#0a0d24] via-[#131736] to-[#04050f] rounded-2xl border-4 border-[#e3bb7d]/40 p-8 flex flex-col items-center justify-center text-center shadow-[inset_0_0_60px_rgba(0,0,0,0.8)] group"
                >
                  <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-[#e3bb7d]/60 rounded-tl-lg" />
                  <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-[#e3bb7d]/60 rounded-tr-lg" />
                  <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-[#e3bb7d]/60 rounded-bl-lg" />
                  <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-[#e3bb7d]/60 rounded-br-lg" />

                  <div className="w-24 h-24 rounded-full border-2 border-[#e3bb7d]/50 flex items-center justify-center mb-6 bg-white/5 backdrop-blur-md shadow-[0_0_30px_rgba(227,187,125,0.2)] group-hover:scale-110 transition-transform duration-500">
                    <span className="text-5xl">📖</span>
                  </div>

                  <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#e3bb7d] tracking-wide font-normal mb-3">
                    Anu Akka's Diary
                  </h3>
                  <p className="font-handwritten text-2xl text-[#eec2d3] mb-8">
                    To My First Home ❤️
                  </p>

                  <div className="px-6 py-3 bg-[#e3bb7d]/10 hover:bg-[#e3bb7d]/20 border border-[#e3bb7d]/40 rounded-full font-sans text-xs tracking-widest uppercase text-[#f7dea6] transition-all group-hover:shadow-[0_0_20px_rgba(227,187,125,0.4)]">
                    Tap to Open Diary ✨
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* 2. OPEN DIARY BODY */}
            <div className="absolute inset-0 bg-[#0a0d24] rounded-2xl p-2 sm:p-4 border-2 border-[#e3bb7d]/30 shadow-2xl flex">
              
              {/* BOOK SPREAD CONTAINER */}
              <div className="relative w-full h-full bg-[#fbf7ee] rounded-xl shadow-inner flex overflow-hidden border border-[#e2d6b5]">
                
                {/* Lined Paper */}
                <div 
                  className="absolute inset-0 pointer-events-none opacity-20"
                  style={{
                    backgroundImage: 'linear-gradient(#94a3b8 1px, transparent 1px)',
                    backgroundSize: '100% 1.8rem',
                  }}
                />

                {/* Margins */}
                <div className="absolute top-0 bottom-0 left-[8%] md:left-[6%] w-[1px] bg-[#eec2d3]/60 z-10 pointer-events-none" />
                <div className="absolute top-0 bottom-0 right-[8%] md:right-[6%] w-[1px] bg-[#eec2d3]/60 z-10 pointer-events-none" />

                {/* Spine */}
                <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-12 z-30 pointer-events-none flex items-center justify-center">
                  <div className="w-full h-full bg-gradient-to-r from-black/15 via-black/35 to-black/15 shadow-[inset_0_0_20px_rgba(0,0,0,0.3)]" />
                  <div className="absolute top-0 w-3 h-[105%] bg-gradient-to-b from-[#e3bb7d] to-[#eec2d3] shadow-md rounded-b-md z-40" />
                </div>

                {/* LEFT PAGE */}
                <div className="w-1/2 h-full p-4 sm:p-5 md:p-8 relative z-20 flex flex-col justify-between overflow-hidden border-r border-[#e5d8b8]">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`left-page-${currentSpread}`}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      transition={{ duration: 0.4 }}
                      className="h-full flex flex-col justify-between"
                    >
                      <div>
                        {/* Page Header */}
                        <div className="flex justify-between items-center mb-3 border-b border-[#d4c5a0] pb-1.5">
                          <span className="font-sans text-[10px] sm:text-xs tracking-widest uppercase text-[#a9884f] font-semibold">
                            {leftPageData.date}
                          </span>
                          <span className="font-handwritten text-lg sm:text-xl text-[#a9884f]">
                            Page {currentSpread * 2 + 1}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="font-handwritten text-xl sm:text-2xl md:text-3xl text-[#2c1d11] font-bold mb-1 leading-snug">
                          {leftPageData.title}
                        </h3>
                        <p className="font-serif italic text-xs sm:text-sm text-[#7c6346] mb-3">
                          {leftPageData.subtitle}
                        </p>

                        {/* Note */}
                        <p className="font-handwritten text-base sm:text-lg md:text-xl text-[#3d2b1f] leading-relaxed mb-2">
                          "{leftPageData.note}"
                        </p>
                      </div>

                      {/* Polaroid Real Image */}
                      <div className="relative mt-auto pt-1 flex items-center justify-center">
                        <div className="polaroid w-40 sm:w-48 md:w-52 -rotate-2 hover:rotate-0 transition-transform duration-300 bg-white p-2 pb-5 shadow-md rounded-sm border border-gray-200">
                          <div className="w-full aspect-[4/3] rounded overflow-hidden shadow-inner relative bg-gray-100">
                            <img 
                              src={leftPageData.imageSrc} 
                              alt={leftPageData.polaroidCaption} 
                              className={`w-full h-full object-cover ${leftPageData.objectPos || 'object-center'}`}
                            />
                            <div className="absolute top-1.5 right-1.5 text-base">{leftPageData.decorations[0]}</div>
                          </div>
                          <p className="font-handwritten text-center text-xs sm:text-sm md:text-base text-[#3d2b1f] mt-1.5 font-medium">
                            {leftPageData.polaroidCaption}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* RIGHT PAGE */}
                <div className="w-1/2 h-full p-4 sm:p-5 md:p-8 relative z-20 flex flex-col justify-between overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`right-page-${currentSpread}`}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.4 }}
                      className="h-full flex flex-col justify-between"
                    >
                      <div>
                        {/* Page Header */}
                        <div className="flex justify-between items-center mb-3 border-b border-[#d4c5a0] pb-1.5">
                          <span className="font-handwritten text-lg sm:text-xl text-[#a9884f]">
                            Page {currentSpread * 2 + 2}
                          </span>
                          <span className="font-sans text-[10px] sm:text-xs tracking-widest uppercase text-[#a9884f] font-semibold">
                            {rightPageData.date}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="font-handwritten text-xl sm:text-2xl md:text-3xl text-[#2c1d11] font-bold mb-1 leading-snug">
                          {rightPageData.title}
                        </h3>
                        <p className="font-serif italic text-xs sm:text-sm text-[#7c6346] mb-3">
                          {rightPageData.subtitle}
                        </p>

                        {/* Note */}
                        <p className="font-handwritten text-base sm:text-lg md:text-xl text-[#3d2b1f] leading-relaxed mb-2">
                          "{rightPageData.note}"
                        </p>
                      </div>

                      {/* Polaroid Real Image */}
                      <div className="relative mt-auto pt-1 flex items-center justify-center">
                        <div className="polaroid w-40 sm:w-48 md:w-52 rotate-2 hover:rotate-0 transition-transform duration-300 bg-white p-2 pb-5 shadow-md rounded-sm border border-gray-200">
                          <div className="w-full aspect-[4/3] rounded overflow-hidden shadow-inner relative bg-gray-100">
                            <img 
                              src={rightPageData.imageSrc} 
                              alt={rightPageData.polaroidCaption} 
                              className={`w-full h-full object-cover ${rightPageData.objectPos || 'object-center'}`}
                            />
                            <div className="absolute top-1.5 left-1.5 text-base">{rightPageData.decorations[0]}</div>
                          </div>
                          <p className="font-handwritten text-center text-xs sm:text-sm md:text-base text-[#3d2b1f] mt-1.5 font-medium">
                            {rightPageData.polaroidCaption}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* 3D ANIMATED FLIPPING PAGE LAYER */}
                {isFlipping && (
                  <motion.div
                    initial={{ rotateY: flipDirection === 'next' ? 0 : -180 }}
                    animate={{ rotateY: flipDirection === 'next' ? -180 : 0 }}
                    transition={{ duration: 0.7, ease: [0.645, 0.045, 0.355, 1.000] }}
                    style={{ 
                      transformOrigin: flipDirection === 'next' ? 'left center' : 'right center',
                      backfaceVisibility: 'hidden'
                    }}
                    className={`absolute top-0 bottom-0 ${flipDirection === 'next' ? 'left-1/2 w-1/2' : 'right-1/2 w-1/2'} bg-[#fbf7ee] border-l border-[#d4c5a0] shadow-[-15px_0_30px_rgba(0,0,0,0.25)] z-40 flex items-center justify-center overflow-hidden pointer-events-none`}
                  >
                    <div className="w-full h-full p-8 flex items-center justify-center">
                      <span className="font-handwritten text-3xl text-[#a9884f] animate-pulse">Turning page... 📖</span>
                    </div>
                  </motion.div>
                )}

              </div>
            </div>

          </div>
        </motion.div>
      </div>

      {/* Navigation Controls */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 flex items-center gap-6 z-20"
        >
          <button
            onClick={handlePrev}
            disabled={currentPage === 0 || isFlipping}
            className={`px-6 py-2.5 rounded-full font-sans text-sm tracking-wider uppercase border transition-all flex items-center gap-2 ${
              currentPage === 0 || isFlipping
                ? 'opacity-30 border-white/10 text-white/40 cursor-not-allowed'
                : 'bg-white/10 hover:bg-white/20 border-[#e3bb7d]/40 text-[#f8f0e3] hover:border-[#e3bb7d] shadow-lg cursor-pointer'
            }`}
          >
            ← Previous Page
          </button>

          <span className="font-handwritten text-xl text-[#eec2d3]">
            Spread {currentSpread + 1} of {Math.ceil(diaryPages.length / 2)}
          </span>

          <button
            onClick={handleNext}
            disabled={currentPage >= diaryPages.length - 2 || isFlipping}
            className={`px-6 py-2.5 rounded-full font-sans text-sm tracking-wider uppercase border transition-all flex items-center gap-2 ${
              currentPage >= diaryPages.length - 2 || isFlipping
                ? 'opacity-30 border-white/10 text-white/40 cursor-not-allowed'
                : 'bg-white/10 hover:bg-white/20 border-[#e3bb7d]/40 text-[#f8f0e3] hover:border-[#e3bb7d] shadow-lg cursor-pointer'
            }`}
          >
            Next Page →
          </button>
        </motion.div>
      )}
    </section>
  );
}
