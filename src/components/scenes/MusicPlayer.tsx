'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const songs = [
  { 
    title: "My Little Princess", 
    artist: "For Anu Akka", 
    src: "/audio/my_little_princess.mp3",
    coverImg: "/images/03_campus_selfie.jpg", 
    emoji: "👑", 
    color: "#e3bb7d" 
  }
];

const BAR_COUNT = 32;

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(80);
  const [bars, setBars] = useState<number[]>(Array(BAR_COUNT).fill(0.15));

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const song = songs[0];

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration || 0);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  // Equalizer visualizer effect when playing
  useEffect(() => {
    let barInterval: NodeJS.Timeout;
    if (isPlaying) {
      barInterval = setInterval(() => {
        setBars(Array.from({ length: BAR_COUNT }, () => 0.15 + Math.random() * 0.85));
      }, 100);
    } else {
      setBars(Array(BAR_COUNT).fill(0.15));
    }
    return () => clearInterval(barInterval);
  }, [isPlaying]);

  // Handle volume change
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(err => {
        console.error("Audio playback error:", err);
      });
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current || duration === 0) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const newTime = pct * duration;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const formatTime = (secs: number) => {
    if (isNaN(secs) || secs < 0) return "0:00";
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const progressPct = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <section className="min-h-screen bg-[#04050f] flex flex-col items-center justify-center py-20 px-4 relative overflow-hidden text-[#f8f0e3]">
      {/* Hidden Audio Element */}
      <audio ref={audioRef} src={song.src} preload="metadata" />

      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0d24] to-[#04050f] opacity-80" />

      {/* Floating Notes */}
      <AnimatePresence>
        {isPlaying && (
          <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
            {[...Array(16)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-2xl"
                style={{ color: `${song.color}80` }}
                initial={{ y: '105vh', x: `${Math.random() * 100}vw`, opacity: 0, scale: 0.5 }}
                animate={{ y: '-10vh', opacity: [0, 1, 0], scale: 0.7 + Math.random() * 0.6, rotate: Math.random() * 40 - 20 }}
                transition={{ duration: 7 + Math.random() * 6, repeat: Infinity, ease: 'linear', delay: Math.random() * 6 }}
              >
                {i % 3 === 0 ? '♪' : i % 3 === 1 ? '♫' : '♬'}
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="z-20 text-center mb-12"
      >
        <p className="text-[#e3bb7d] text-sm uppercase tracking-[0.3em] mb-3 font-sans">Chapter XII</p>
        <h2 className="text-4xl md:text-5xl font-serif text-[#eec2d3] mb-3">Birthday Song 🎵</h2>
        <p className="font-handwritten text-2xl text-[#c7b3ea]">Dedicated to my little princess 💖</p>
      </motion.div>

      {/* Player Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.2 }}
        className="z-20 w-full max-w-sm relative"
      >
        <div
          className="rounded-3xl p-6 shadow-[0_0_60px_rgba(227,187,125,0.15),0_30px_80px_rgba(0,0,0,0.6)] border border-white/10"
          style={{
            background: 'rgba(255,255,255,0.04)',
            backdropFilter: 'blur(30px)',
          }}
        >
          {/* Album Art / Photo Frame */}
          <div 
            className="w-full aspect-square rounded-2xl mb-6 relative overflow-hidden flex items-center justify-center border border-white/10 shadow-2xl bg-black"
          >
            {/* Background Album Photo */}
            <img 
              src={song.coverImg} 
              alt="My Little Princess"
              className="w-full h-full object-cover object-top filter brightness-90 group-hover:scale-105 transition-transform duration-700"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

            {/* Equalizer Bars on top of photo */}
            <div className="absolute bottom-0 left-0 right-0 flex items-end justify-center gap-1 px-4 pb-3 h-28 pointer-events-none z-20">
              {bars.map((h, i) => (
                <motion.div
                  key={i}
                  animate={{ height: `${isPlaying ? h * 100 : 12}%` }}
                  transition={{ duration: 0.1 }}
                  className="rounded-t-sm flex-1"
                  style={{
                    background: `linear-gradient(to top, ${song.color}, ${song.color}60)`,
                    opacity: 0.85,
                    minHeight: 4,
                  }}
                />
              ))}
            </div>

            {/* Floating Crown Badge */}
            <div className="absolute top-3 right-3 z-20">
              <motion.div
                animate={{ scale: isPlaying ? [1, 1.15, 1] : 1, rotate: isPlaying ? [0, 5, -5, 0] : 0 }}
                transition={{ duration: 2, repeat: isPlaying ? Infinity : 0, ease: 'easeInOut' }}
                className="w-10 h-10 rounded-full bg-black/60 backdrop-blur-md border border-[#e3bb7d]/50 flex items-center justify-center text-xl shadow-lg"
              >
                👑
              </motion.div>
            </div>

            {/* Glow overlay when playing */}
            {isPlaying && (
              <motion.div
                animate={{ opacity: [0.2, 0.45, 0.2] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 rounded-2xl pointer-events-none z-10"
                style={{ background: `radial-gradient(circle, ${song.color}40, transparent 75%)` }}
              />
            )}
          </div>

          {/* Song Info */}
          <div className="mb-5 text-center">
            <h3 className="text-2xl font-serif text-white mb-1 font-bold tracking-wide">{song.title}</h3>
            <p className="font-handwritten text-2xl text-[#e3bb7d]">{song.artist}</p>
          </div>

          {/* Progress Bar */}
          <div className="mb-5 group cursor-pointer" onClick={handleSeek}>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden w-full relative">
              <motion.div
                className="absolute left-0 top-0 bottom-0 rounded-full"
                style={{ 
                  width: `${progressPct}%`,
                  background: `linear-gradient(to right, ${song.color}, ${song.color}ee)` 
                }}
              />
            </div>
            <div className="flex justify-between mt-2 text-xs text-white/50 font-sans font-semibold">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-6 mb-6">
            <motion.button
              onClick={togglePlay}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.94 }}
              className="w-16 h-16 rounded-full flex items-center justify-center text-[#0a0d24] shadow-2xl transition-all cursor-pointer"
              style={{
                background: song.color,
                boxShadow: isPlaying ? `0 0 30px ${song.color}70` : `0 0 15px ${song.color}30`,
              }}
            >
              {isPlaying ? (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" />
                </svg>
              ) : (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" className="ml-1">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
              )}
            </motion.button>
          </div>

          {/* Volume Control */}
          <div className="flex items-center gap-3 text-white/50 px-2">
            <span className="text-sm">🔈</span>
            <div
              className="h-1.5 bg-white/10 rounded-full flex-1 cursor-pointer relative overflow-hidden"
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const v = Math.round(Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width)) * 100);
                setVolume(v);
              }}
            >
              <div className="h-full rounded-full" style={{ width: `${volume}%`, background: song.color }} />
            </div>
            <span className="text-sm">🔊</span>
          </div>

          {/* Single Song item in list */}
          <div className="mt-5 border-t border-white/10 pt-4">
            <div className="flex items-center gap-3 p-2.5 rounded-xl bg-white/10 border border-[#e3bb7d]/30">
              <div className="w-10 h-10 rounded-lg overflow-hidden border border-white/20">
                <img src={song.coverImg} alt="Cover" className="w-full h-full object-cover object-top" />
              </div>
              <div className="flex-1">
                <p className="font-serif text-base text-white font-medium">{song.title}</p>
                <p className="font-handwritten text-base text-[#e3bb7d]">{song.artist}</p>
              </div>
              {isPlaying && (
                <div className="flex items-end gap-0.5 h-4">
                  {[1, 0.6, 0.9, 0.5].map((h, bi) => (
                    <motion.div
                      key={bi}
                      animate={{ height: ['40%', '100%', '40%'] }}
                      transition={{ duration: 0.5 + bi * 0.1, repeat: Infinity, ease: 'easeInOut', delay: bi * 0.1 }}
                      className="w-0.5 rounded-full"
                      style={{ background: song.color }}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
