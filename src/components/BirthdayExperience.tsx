'use client';

import { useState, useCallback, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';

// Effects
import StarField from '@/components/effects/StarField';
import SmoothScroll from '@/components/effects/SmoothScroll';
import AuroraBackground from '@/components/effects/AuroraBackground';

// Pre-experience scenes (loaded eagerly for instant display)
import MidnightCountdown from '@/components/scenes/MidnightCountdown';
import Prologue from '@/components/scenes/Prologue';
import LoadingScene from '@/components/scenes/LoadingScene';

// Main scenes (dynamically imported for performance)
const HeroScene = dynamic(() => import('@/components/scenes/HeroScene'), { ssr: false });
const BibleVerses = dynamic(() => import('@/components/scenes/BibleVerses'), { ssr: false });
const TimelineScene = dynamic(() => import('@/components/scenes/TimelineScene'), { ssr: false });
const GalleryScene = dynamic(() => import('@/components/scenes/GalleryScene'), { ssr: false });
const MemoryBook = dynamic(() => import('@/components/scenes/MemoryBook'), { ssr: false });
const EnvelopeLetter = dynamic(() => import('@/components/scenes/EnvelopeLetter'), { ssr: false });
const PrayerScene = dynamic(() => import('@/components/scenes/PrayerScene'), { ssr: false });
const BlessingScene = dynamic(() => import('@/components/scenes/BlessingScene'), { ssr: false });
const WishesScene = dynamic(() => import('@/components/scenes/WishesScene'), { ssr: false });
const ReasonsScene = dynamic(() => import('@/components/scenes/ReasonsScene'), { ssr: false });
const InteractiveHearts = dynamic(() => import('@/components/scenes/InteractiveHearts'), { ssr: false });
const MemorySky = dynamic(() => import('@/components/scenes/MemorySky'), { ssr: false });
const CakeScene = dynamic(() => import('@/components/scenes/CakeScene'), { ssr: false });
const MusicPlayer = dynamic(() => import('@/components/scenes/MusicPlayer'), { ssr: false });
const SisterCoupons = dynamic(() => import('@/components/scenes/SisterCoupons'), { ssr: false });
const LastThingScene = dynamic(() => import('@/components/scenes/LastThingScene'), { ssr: false });
const PostcardScene = dynamic(() => import('@/components/scenes/PostcardScene'), { ssr: false });
const EndingScene = dynamic(() => import('@/components/scenes/EndingScene'), { ssr: false });

type Phase = 'countdown' | 'prologue' | 'loading' | 'experience';

const NAV_SECTIONS = [
  { id: 'hero', label: 'Home', emoji: '🏠' },
  { id: 'verses', label: 'Verses', emoji: '✝️' },
  { id: 'timeline', label: 'Journey', emoji: '🌸' },
  { id: 'gallery', label: 'Gallery', emoji: '📸' },
  { id: 'book', label: 'Diary', emoji: '📖' },
  { id: 'letter', label: 'Letter', emoji: '💌' },
  { id: 'prayer', label: 'Prayer', emoji: '🙏' },
  { id: 'blessing', label: 'Blessing', emoji: '🕊️' },
  { id: 'wishes', label: 'Wishes', emoji: '🎉' },
  { id: 'reasons', label: 'Love', emoji: '💖' },
  { id: 'hearts', label: 'Hearts', emoji: '❤️' },
  { id: 'sky', label: 'Sky', emoji: '🪔' },
  { id: 'cake', label: 'Cake', emoji: '🎂' },
  { id: 'music', label: 'Music', emoji: '🎵' },
  { id: 'coupons', label: 'Vouchers', emoji: '🎟️' },
  { id: 'last-thing', label: 'Promise', emoji: '🌟' },
  { id: 'postcard', label: 'Postcard', emoji: '🖼️' },
  { id: 'ending', label: 'End', emoji: '🌙' },
];

function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-0.5 origin-left z-[100] pointer-events-none"
      style={{ scaleX, background: 'linear-gradient(to right, #e3bb7d, #eec2d3, #c7b3ea)' }}
    />
  );
}

function FloatingNav({ activeSection }: { activeSection: string }) {
  const [expanded, setExpanded] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setExpanded(false);
  };

  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 z-50 flex flex-col items-end gap-1.5"
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => { setExpanded(false); setHovered(null); }}
    >
      {NAV_SECTIONS.map((section) => {
        const isActive = activeSection === section.id;
        return (
          <div key={section.id} className="relative flex items-center justify-end gap-2">
            {/* Label tooltip */}
            <AnimatePresence>
              {(hovered === section.id || (expanded && isActive)) && (
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="bg-black/70 backdrop-blur-sm rounded-full px-3 py-1 pointer-events-none"
                >
                  <span className="font-sans text-xs text-white/80 whitespace-nowrap">{section.emoji} {section.label}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Dot */}
            <motion.button
              onClick={() => scrollTo(section.id)}
              onMouseEnter={() => setHovered(section.id)}
              onMouseLeave={() => setHovered(null)}
              animate={{
                width: isActive ? 8 : 6,
                height: isActive ? 8 : 6,
                backgroundColor: isActive ? '#e3bb7d' : 'rgba(255,255,255,0.3)',
                boxShadow: isActive ? '0 0 10px rgba(227,187,125,0.8)' : '0 0 0px rgba(0,0,0,0)',
              }}
              whileHover={{ scale: 1.8, backgroundColor: '#e3bb7d' }}
              className="rounded-full cursor-pointer flex-shrink-0"
              transition={{ duration: 0.2 }}
            />
          </div>
        );
      })}
    </div>
  );
}

export default function BirthdayExperience() {
  // Always start at countdown phase so every visit gets the 5-sec countdown & fireworks intro
  const [phase, setPhase] = useState<Phase>('countdown');

  const [activeSection, setActiveSection] = useState('hero');

  const handleCountdownComplete = useCallback(() => setPhase('prologue'), []);
  const handlePrologueComplete = useCallback(() => setPhase('loading'), []);
  const handleLoadingComplete = useCallback(() => setPhase('experience'), []);

  // Intersection Observer for active nav section
  useEffect(() => {
    if (phase !== 'experience') return;
    const observers: IntersectionObserver[] = [];
    NAV_SECTIONS.forEach(section => {
      const el = document.getElementById(section.id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(section.id); },
        { threshold: 0.3 }
      );
      observer.observe(el);
      observers.push(observer);
    });
    return () => observers.forEach(o => o.disconnect());
  }, [phase]);

  return (
    <>
      {/* Global background effects */}
      <StarField />
      <AuroraBackground />

      {/* Phase 1: Midnight Countdown */}
      {phase === 'countdown' && (
        <MidnightCountdown onComplete={handleCountdownComplete} />
      )}

      {/* Phase 2: Emotional Prologue */}
      {phase === 'prologue' && (
        <Prologue onComplete={handlePrologueComplete} />
      )}

      {/* Phase 3: Loading Animation */}
      {phase === 'loading' && (
        <LoadingScene onComplete={handleLoadingComplete} />
      )}

      {/* Phase 4: The Full Experience */}
      {phase === 'experience' && (
        <>
          {/* Scroll Progress Bar */}
          <ScrollProgressBar />

          {/* Floating Navigation */}
          <FloatingNav activeSection={activeSection} />

          <SmoothScroll>
            <main className="relative z-10">
              <section id="hero"><HeroScene /></section>
              <section id="verses"><BibleVerses /></section>
              <section id="timeline"><TimelineScene /></section>
              <section id="gallery"><GalleryScene /></section>
              <section id="book"><MemoryBook /></section>
              <section id="letter"><EnvelopeLetter /></section>
              <section id="prayer"><PrayerScene /></section>
              <section id="blessing"><BlessingScene /></section>
              <section id="wishes"><WishesScene /></section>
              <section id="reasons"><ReasonsScene /></section>
              <section id="hearts"><InteractiveHearts /></section>
              <section id="sky"><MemorySky /></section>
              <section id="cake"><CakeScene /></section>
              <section id="music"><MusicPlayer /></section>
              <section id="coupons"><SisterCoupons /></section>
              <section id="last-thing"><LastThingScene /></section>
              <section id="postcard"><PostcardScene /></section>
              <section id="ending"><EndingScene /></section>
            </main>
          </SmoothScroll>
        </>
      )}
    </>
  );
}
