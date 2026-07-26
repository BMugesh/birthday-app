'use client';

import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function PostcardScene() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const photoSrc = "/images/13_silk_saree_regal.jpg"; // Regal silk saree portrait

  const generateAndDownloadPostcard = async () => {
    setIsGenerating(true);

    try {
      // Ensure fonts are loaded before drawing to canvas
      if (typeof document !== 'undefined' && document.fonts) {
        await document.fonts.ready;
      }

      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // High Resolution Canvas (1200 x 1600)
      const width = 1200;
      const height = 1600;
      canvas.width = width;
      canvas.height = height;

      // Dark Midnight background frame
      const bgGrad = ctx.createLinearGradient(0, 0, width, height);
      bgGrad.addColorStop(0, '#04050f');
      bgGrad.addColorStop(0.5, '#0a0d24');
      bgGrad.addColorStop(1, '#04050f');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Card Dimensions inside canvas
      const cardMarginX = 100;
      const cardMarginY = 120;
      const cardW = width - (cardMarginX * 2); // 1000px
      const cardH = height - (cardMarginY * 2); // 1360px
      const cardX = cardMarginX;
      const cardY = cardMarginY;
      const cardRadius = 40;

      // 1. Draw Card Shadow & Cream Background (#f7f0e4)
      ctx.save();
      ctx.shadowColor = 'rgba(0, 0, 0, 0.6)';
      ctx.shadowBlur = 50;
      ctx.shadowOffsetY = 25;

      ctx.beginPath();
      ctx.roundRect(cardX, cardY, cardW, cardH, cardRadius);
      ctx.fillStyle = '#f7f0e4';
      ctx.fill();

      // Card Gold Outer Border
      ctx.shadowColor = 'transparent';
      ctx.strokeStyle = '#e3bb7d';
      ctx.lineWidth = 6;
      ctx.stroke();
      ctx.restore();

      // 2. Draw Top Pin Dot (centered on card top border)
      const pinX = cardX + cardW / 2; // 600
      const pinY = cardY; // 120
      const pinR = 26;

      ctx.save();
      const pinGrad = ctx.createLinearGradient(pinX - pinR, pinY - pinR, pinX + pinR, pinY + pinR);
      pinGrad.addColorStop(0, '#f47b7b');
      pinGrad.addColorStop(1, '#eb5757');

      ctx.beginPath();
      ctx.arc(pinX, pinY, pinR, 0, Math.PI * 2);
      ctx.fillStyle = pinGrad;
      ctx.fill();

      // Pin White Ring Border
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 5;
      ctx.stroke();

      // Pin Center White Dot
      ctx.beginPath();
      ctx.arc(pinX, pinY, 7, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.fill();
      ctx.restore();

      // 3. Load Photo & Draw with exact aspect ratio (no stretching!)
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = photoSrc;

      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
      });

      const photoPadding = 60;
      const photoX = cardX + photoPadding; // 160
      const photoY = cardY + 70; // 190
      const photoW = cardW - (photoPadding * 2); // 880
      const photoH = 880;
      const photoRadius = 24;

      ctx.save();
      ctx.beginPath();
      ctx.roundRect(photoX, photoY, photoW, photoH, photoRadius);
      ctx.clip();

      // Aspect cover calculations
      const imgAspect = img.width / img.height;
      const boxAspect = photoW / photoH;
      let sx = 0, sy = 0, sw = img.width, sh = img.height;

      if (imgAspect > boxAspect) {
        sw = img.height * boxAspect;
        sx = (img.width - sw) / 2;
      } else {
        sh = img.width / boxAspect;
        sy = 0; // crop from top
      }

      ctx.drawImage(img, sx, sy, sw, sh, photoX, photoY, photoW, photoH);

      // Photo Inner Dark Stroke
      ctx.strokeStyle = 'rgba(42, 30, 23, 0.25)';
      ctx.lineWidth = 3;
      ctx.stroke();
      ctx.restore();

      // 4. Crown Pill Badge (Top-Right inside photo)
      const badgeW = 230;
      const badgeH = 54;
      const badgeX = photoX + photoW - badgeW - 24;
      const badgeY = photoY + 24;
      const badgeRadius = 27;

      ctx.save();
      ctx.beginPath();
      ctx.roundRect(badgeX, badgeY, badgeW, badgeH, badgeRadius);
      ctx.fillStyle = 'rgba(25, 18, 12, 0.75)';
      ctx.fill();
      ctx.strokeStyle = 'rgba(227, 187, 125, 0.6)';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.fillStyle = '#e3bb7d';
      ctx.font = '500 24px Georgia, serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('👑 22nd Birthday', badgeX + badgeW / 2, badgeY + badgeH / 2 + 1);
      ctx.restore();

      // 5. Text Section below photo
      ctx.save();
      ctx.textAlign = 'center';

      // Line 1: Title
      ctx.fillStyle = '#2a1e17';
      ctx.font = 'normal 46px "Instrument Serif", Georgia, serif';
      ctx.fillText('Happy 22nd Birthday, Anu Akka!', cardX + cardW / 2, photoY + photoH + 85);

      // Line 2: Heart Emoji centered on its own line
      ctx.font = '38px sans-serif';
      ctx.fillText('💖', cardX + cardW / 2, photoY + photoH + 145);

      // Line 3: Subtitle / Quote
      ctx.fillStyle = '#6e553f';
      ctx.font = '500 32px "Caveat", "Brush Script MT", cursive';
      ctx.fillText('"To my first home... forever & always." — Bala', cardX + cardW / 2, photoY + photoH + 210);
      ctx.restore();

      // 6. Trigger Download
      const link = document.createElement('a');
      link.download = 'Anu_Akka_22nd_Birthday_Postcard.png';
      link.href = canvas.toDataURL('image/png', 1.0);
      link.click();

      setIsGenerating(false);
      setDownloaded(true);
    } catch (err) {
      console.error('Postcard generation error:', err);
      setIsGenerating(false);
      alert('Failed to generate postcard. Please try again!');
    }
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
          className="bg-[#f7f0e4] p-5 sm:p-7 pb-8 sm:pb-10 rounded-[28px] sm:rounded-[32px] max-w-md w-full mx-auto shadow-[0_25px_60px_rgba(0,0,0,0.6)] border-[2.5px] border-[#e3bb7d] relative group transition-transform duration-500 hover:scale-[1.02]"
        >
          {/* Top Pin Dot */}
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20 w-8 h-8 rounded-full bg-gradient-to-tr from-[#f47b7b] to-[#eb5757] shadow-md border-2 border-white flex items-center justify-center">
            <div className="w-2.5 h-2.5 rounded-full bg-white" />
          </div>

          {/* Photo Frame */}
          <div className="w-full aspect-[4/5] rounded-2xl overflow-hidden shadow-sm relative bg-[#1c1611] border border-[#2a1e17]/20">
            <img
              src={photoSrc}
              alt="Anu Akka 22nd Birthday Souvenir"
              className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
            />
            {/* Crown Overlay Pill Badge */}
            <div className="absolute top-3 right-3 bg-black/65 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#e3bb7d]/50 flex items-center gap-1.5 text-xs sm:text-sm font-serif text-[#e3bb7d]">
              <span>👑</span>
              <span className="font-medium tracking-wide">22nd Birthday</span>
            </div>
          </div>

          {/* Postcard Text */}
          <div className="mt-6 text-center flex flex-col items-center gap-2">
            <h3 className="font-serif text-2xl sm:text-3xl text-[#2a1e17] font-semibold tracking-wide">
              Happy 22nd Birthday, Anu Akka!
            </h3>
            <div className="text-2xl sm:text-3xl my-0.5">💖</div>
            <p className="font-handwritten text-xl sm:text-2xl text-[#6e553f] italic">
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

