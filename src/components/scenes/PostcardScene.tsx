'use client';

import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function PostcardScene() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const photoSrc = "/images/13_silk_saree_regal.jpg"; // Regal silk saree portrait

  const generateAndDownloadPostcard = () => {
    setIsGenerating(true);

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // High Resolution Canvas (1200 x 1600)
    canvas.width = 1200;
    canvas.height = 1600;

    // 1. Draw Vintage Dark/Gold Background
    const bgGrad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    bgGrad.addColorStop(0, '#0a0d24');
    bgGrad.addColorStop(0.5, '#131736');
    bgGrad.addColorStop(1, '#04050f');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Subtle Gold Border Frame
    ctx.strokeStyle = '#e3bb7d';
    ctx.lineWidth = 12;
    ctx.strokeRect(30, 30, canvas.width - 60, canvas.height - 60);

    // Inner Accent Frame
    ctx.strokeStyle = 'rgba(227, 187, 125, 0.4)';
    ctx.lineWidth = 2;
    ctx.strokeRect(45, 45, canvas.width - 90, canvas.height - 90);

    // Load Photo
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = photoSrc;

    img.onload = () => {
      // 2. Draw Polaroid Photo Card Background
      const pX = 150;
      const pY = 140;
      const pW = 900;
      const pH = 1100;

      // Polaroid Card shadow & white background
      ctx.shadowColor = 'rgba(0, 0, 0, 0.6)';
      ctx.shadowBlur = 40;
      ctx.shadowOffsetY = 20;

      ctx.fillStyle = '#f8f0e3';
      ctx.fillRect(pX, pY, pW, pH);

      ctx.shadowColor = 'transparent'; // Reset shadow

      // Draw Photo Inside Polaroid
      const imgX = pX + 40;
      const imgY = pY + 40;
      const imgW = pW - 80;
      const imgH = 800;

      ctx.drawImage(img, imgX, imgY, imgW, imgH);

      // Photo Inner Shadow / Border
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.15)';
      ctx.lineWidth = 4;
      ctx.strokeRect(imgX, imgY, imgW, imgH);

      // 3. Draw Polaroid Handwritten Text
      ctx.fillStyle = '#2c1d11';
      ctx.font = 'bold 42px Georgia, serif';
      ctx.textAlign = 'center';
      ctx.fillText('Happy 22nd Birthday, Anu Akka! 💖', canvas.width / 2, pY + 920);

      ctx.fillStyle = '#7c6346';
      ctx.font = 'italic 28px Georgia, serif';
      ctx.fillText('"To my first home... forever & always." — Bala', canvas.width / 2, pY + 975);

      // 4. Draw Royal Crown Badge at Top
      ctx.fillStyle = '#e3bb7d';
      ctx.font = 'bold 36px Georgia, serif';
      ctx.fillText('👑 22ND BIRTHDAY SOUVENIR POSTCARD 👑', canvas.width / 2, 1330);

      ctx.fillStyle = 'rgba(248, 240, 227, 0.7)';
      ctx.font = '24px sans-serif';
      ctx.fillText('July 27, 2026 • Created with Love by Bala', canvas.width / 2, 1380);

      // 5. Trigger High-Res Download
      const link = document.createElement('a');
      link.download = 'Anu_Akka_22nd_Birthday_Postcard.png';
      link.href = canvas.toDataURL('image/png', 1.0);
      link.click();

      setIsGenerating(false);
      setDownloaded(true);
    };

    img.onerror = () => {
      setIsGenerating(false);
      alert('Downloading postcard preview...');
    };
  };

  return (
    <section
      ref={ref}
      className="min-h-screen py-24 px-4 sm:px-8 flex flex-col items-center justify-center relative overflow-hidden bg-[#04050f] text-[#f8f0e3]"
    >
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-r from-[#e3bb7d]/15 via-[#eec2d3]/15 to-[#c7b3ea]/15 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-4xl w-full mx-auto z-10 text-center">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <span className="font-sans text-xs sm:text-sm tracking-[0.3em] uppercase text-[#e3bb7d] mb-3 block font-semibold">
            Memory Keepsake • Souvenir
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#f8f0e3] font-normal drop-shadow-md">
            Download Birthday Postcard 🖼️✨
          </h2>
          <p className="font-handwritten text-2xl sm:text-3xl text-[#eec2d3] mt-3">
            Save a beautifully framed digital Polaroid souvenir to your gallery!
          </p>
        </motion.div>

        {/* Postcard Preview Frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={isInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.9, y: 30 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="bg-[#f8f0e3] p-6 sm:p-10 pb-16 sm:pb-24 rounded-2xl max-w-md mx-auto shadow-[0_0_80px_rgba(227,187,125,0.25)] border-4 border-[#e3bb7d] relative group transform rotate-1 hover:rotate-0 transition-transform duration-500"
        >
          {/* Top Pin */}
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20 w-8 h-8 rounded-full bg-gradient-to-tr from-[#e3bb7d] to-[#ff758f] shadow-lg border-2 border-white flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-white" />
          </div>

          {/* Photo Frame */}
          <div className="w-full aspect-[4/5] rounded overflow-hidden shadow-inner relative bg-black border border-black/10">
            <img
              src={photoSrc}
              alt="Anu Akka 22nd Birthday Souvenir"
              className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
            />
            {/* Crown Overlay */}
            <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-[#e3bb7d]/50 flex items-center gap-1.5 text-xs font-serif text-[#e3bb7d]">
              <span>👑</span>
              <span>22nd Birthday</span>
            </div>
          </div>

          {/* Postcard Text */}
          <div className="mt-6 text-center">
            <h3 className="font-serif text-2xl sm:text-3xl text-[#2c1d11] font-bold">
              Happy 22nd Birthday, Anu Akka! 💖
            </h3>
            <p className="font-handwritten text-xl text-[#7c6346] mt-2">
              "To my first home... forever & always." — Bala
            </p>
          </div>
        </motion.div>

        {/* Download Action Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.5 }}
          className="mt-10 flex flex-col items-center gap-4"
        >
          <motion.button
            onClick={generateAndDownloadPostcard}
            disabled={isGenerating}
            whileHover={{ scale: 1.06, boxShadow: '0 0 40px rgba(227,187,125,0.6)' }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 rounded-full bg-gradient-to-r from-[#e3bb7d] via-[#eec2d3] to-[#c7b3ea] text-[#04050f] font-serif text-lg md:text-xl font-bold shadow-[0_0_30px_rgba(227,187,125,0.4)] border border-white/40 cursor-pointer flex items-center gap-3 transition-all"
          >
            <span>{isGenerating ? "Generating Postcard..." : "Download Postcard to Gallery 📥"}</span>
            <span className="text-xl">✨</span>
          </motion.button>

          {downloaded && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-handwritten text-xl text-[#e3bb7d]"
            >
              Saved to your gallery! Share or keep it close to your heart ❤️
            </motion.p>
          )}
        </motion.div>
      </div>
    </section>
  );
}
