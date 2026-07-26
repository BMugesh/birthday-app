'use client';

import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

export interface PhotoItem {
  id: number;
  src: string;
  title: string;
  caption: string;
  category: 'memories' | 'portraits' | 'family';
  rot: number;
  emoji: string;
  objectPos?: string;
}

export const ALL_PHOTOS: PhotoItem[] = [
  {
    id: 1,
    src: "/images/01_favourite_day.jpg",
    title: "Favourite Day",
    caption: "This was one of my favourite days.",
    category: 'memories',
    rot: -3,
    emoji: "💖",
    objectPos: "object-center"
  },
  {
    id: 2,
    src: "/images/02_trophy_memory.jpg",
    title: "Achievements Together",
    caption: "I don't know if you remember... But I always will.",
    category: 'memories',
    rot: 4,
    emoji: "🏆",
    objectPos: "object-top"
  },
  {
    id: 3,
    src: "/images/03_campus_selfie.jpg",
    title: "Campus Days",
    caption: "Every moment with you is a blessing.",
    category: 'memories',
    rot: -5,
    emoji: "✨",
    objectPos: "object-top"
  },
  {
    id: 4,
    src: "/images/04_sunset_beach.jpg",
    title: "Golden Hour",
    caption: "The world felt brighter that day.",
    category: 'memories',
    rot: 3,
    emoji: "🌅",
    objectPos: "object-center"
  },
  {
    id: 5,
    src: "/images/05_night_together.jpg",
    title: "Late Night Memories",
    caption: "You made everything better.",
    category: 'memories',
    rot: -4,
    emoji: "🌙",
    objectPos: "object-center"
  },
  {
    id: 6,
    src: "/images/06_saree_smile.jpg",
    title: "Beautiful Smile",
    caption: "This smile says everything.",
    category: 'portraits',
    rot: 5,
    emoji: "🌺",
    objectPos: "object-top"
  },
  {
    id: 7,
    src: "/images/07_family_uniform.jpg",
    title: "My Family",
    caption: "My Akka, My Family ❤️",
    category: 'family',
    rot: -3,
    emoji: "👔",
    objectPos: "object-top"
  },
  {
    id: 8,
    src: "/images/08_beach_feet.jpg",
    title: "By the Shore",
    caption: "A memory I'll hold forever.",
    category: 'memories',
    rot: 4,
    emoji: "🌊",
    objectPos: "object-center"
  },
  {
    id: 9,
    src: "/images/09_forest_selfie.jpg",
    title: "Nature Walk",
    caption: "Because of you, I know what love is.",
    category: 'memories',
    rot: -4,
    emoji: "🌲",
    objectPos: "object-[center_80%]"
  },
  {
    id: 10,
    src: "/images/10_first_home.jpg",
    title: "Together Always",
    caption: "To My First Home.",
    category: 'family',
    rot: 3,
    emoji: "🏡",
    objectPos: "object-top"
  },
  {
    id: 11,
    src: "/images/11_protected.jpg",
    title: "Protected & Safe",
    caption: "You protected me always.",
    category: 'family',
    rot: -5,
    emoji: "🛡️",
    objectPos: "object-top"
  },
  {
    id: 12,
    src: "/images/12_night_lights.jpg",
    title: "Under the Lights",
    caption: "Shining bright through every season.",
    category: 'memories',
    rot: 4,
    emoji: "💡",
    objectPos: "object-center"
  },
  {
    id: 13,
    src: "/images/13_silk_saree_regal.jpg",
    title: "Regal Elegance",
    caption: "Looking like a queen in gold silk 👑",
    category: 'portraits',
    rot: -3,
    emoji: "✨",
    objectPos: "object-top"
  },
  {
    id: 14,
    src: "/images/14_night_bench_vines.jpg",
    title: "Midnight Garden",
    caption: "A quiet moment under hanging vines 🌿",
    category: 'portraits',
    rot: 4,
    emoji: "🌸",
    objectPos: "object-top"
  },
  {
    id: 15,
    src: "/images/15_red_dress_bday21.jpg",
    title: "July 27, 2021",
    caption: "Birthday bliss in red — where the journey grew deeper 🌹",
    category: 'portraits',
    rot: -4,
    emoji: "🎂",
    objectPos: "object-[center_10%]"
  },
  {
    id: 16,
    src: "/images/16_black_dress_bday22.jpg",
    title: "July 27, 2022",
    caption: "Birthday smiles & warm memories on your special day 🖤",
    category: 'portraits',
    rot: 3,
    emoji: "🎉",
    objectPos: "object-top"
  },
  {
    id: 17,
    src: "/images/17_balcony_pose_1.jpg",
    title: "Sunlit Balcony",
    caption: "Gentle sunshine & casual grace ☀️",
    category: 'portraits',
    rot: -3,
    emoji: "🌷",
    objectPos: "object-top"
  },
  {
    id: 18,
    src: "/images/18_balcony_pose_2.jpg",
    title: "Mirror Reflection",
    caption: "Soft reflections of a beautiful soul 🌸",
    category: 'portraits',
    rot: 5,
    emoji: "🪞",
    objectPos: "object-top"
  },
  {
    id: 19,
    src: "/images/19_family_car_selfie.jpg",
    title: "Family Trip",
    caption: "Fun rides & unforgettable family smiles 🚗❤️",
    category: 'family',
    rot: -4,
    emoji: "👨‍👩‍👧‍👦",
    objectPos: "object-center"
  },
  {
    id: 20,
    src: "/images/20_mother_daughter_selfie.jpg",
    title: "Mother's Love",
    caption: "Warm smiles & pure affection 💕",
    category: 'family',
    rot: 3,
    emoji: "👩‍👧",
    objectPos: "object-top"
  },
  {
    id: 21,
    src: "/images/21_siblings_fun_1.jpg",
    title: "Sibling Joy",
    caption: "Crazy laughs & sibling shenanigans 😄",
    category: 'family',
    rot: -5,
    emoji: "🥳",
    objectPos: "object-center"
  },
  {
    id: 22,
    src: "/images/22_siblings_fun_2.jpg",
    title: "Cozy Home Moments",
    caption: "Warmest family hugs at home 🏠❤️",
    category: 'family',
    rot: 4,
    emoji: "🤗",
    objectPos: "object-center"
  }
];

export default function GalleryScene() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoItem | null>(null);
  const [activeFilter, setActiveFilter] = useState<'all' | 'memories' | 'portraits' | 'family'>('all');

  const filteredPhotos = ALL_PHOTOS.filter(p => activeFilter === 'all' || p.category === activeFilter);

  return (
    <section 
      ref={ref}
      className="min-h-screen py-24 px-6 md:px-12 flex flex-col items-center justify-center relative overflow-hidden bg-[#04050f]"
    >
      {/* Glow Backdrops */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-[#e3bb7d]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-10 w-96 h-96 bg-[#eec2d3]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl w-full mx-auto z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10"
        >
          <span className="text-[#e3bb7d] tracking-[0.3em] uppercase text-sm mb-3 block font-sans">Chapter III</span>
          <h2 className="font-serif text-5xl md:text-6xl text-[#f8f0e3] drop-shadow-lg">Wall of Memories</h2>
          <p className="font-handwritten text-2xl text-[#eec2d3] mt-3">22 unforgettable moments with Anu Akka 📸</p>
        </motion.div>

        {/* Filter Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-3 mb-16"
        >
          {[
            { id: 'all', label: '✨ All Moments (22)' },
            { id: 'memories', label: '💖 Memories' },
            { id: 'portraits', label: '🌸 Anu Akka' },
            { id: 'family', label: '🏠 Family & Bond' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id as any)}
              className={`px-5 py-2 rounded-full font-sans text-xs tracking-wider uppercase transition-all border ${
                activeFilter === tab.id
                  ? 'bg-[#e3bb7d] text-[#04050f] font-bold border-[#e3bb7d] shadow-[0_0_20px_rgba(227,187,125,0.4)]'
                  : 'bg-white/5 hover:bg-white/10 text-[#f8f0e3]/70 border-white/10 hover:border-[#e3bb7d]/50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </motion.div>

        {/* Gallery Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 md:gap-10 place-items-center">
          <AnimatePresence>
            {filteredPhotos.map((photo, index) => (
              <motion.div
                key={photo.id}
                layout
                initial={{ opacity: 0, scale: 0.85, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ duration: 0.5, delay: (index % 8) * 0.06 }}
                whileHover={{ 
                  rotate: 0, 
                  scale: 1.06, 
                  y: -12,
                  zIndex: 30,
                  boxShadow: '0 20px 40px rgba(0,0,0,0.6), 0 0 25px rgba(227,187,125,0.3)'
                }}
                style={{ rotate: photo.rot }}
                onClick={() => setSelectedPhoto(photo)}
                className="bg-[#f8f0e3] p-3.5 pb-16 md:p-4 md:pb-20 shadow-2xl rounded-md cursor-pointer border border-[#e3bb7d]/30 w-full max-w-[280px] relative group transition-all duration-300"
              >
                {/* Pin Accent */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 w-6 h-6 rounded-full bg-gradient-to-tr from-[#cc3300] to-[#ff9900] shadow-md border border-white/50 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-white/80" />
                </div>

                {/* Photo Container */}
                <div className="w-full aspect-[4/5] overflow-hidden rounded-sm relative bg-gray-900 border border-black/10">
                  <img 
                    src={photo.src} 
                    alt={photo.caption}
                    className={`w-full h-full object-cover ${photo.objectPos || 'object-top'} group-hover:scale-110 transition-transform duration-700 ease-out`}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                    <span className="text-white text-xs font-sans tracking-wider uppercase bg-black/60 backdrop-blur-sm px-2 py-1 rounded">
                      🔍 Click to expand
                    </span>
                  </div>
                </div>

                {/* Polaroid Caption */}
                <div className="absolute bottom-3 left-0 right-0 px-3 text-center">
                  <p className="font-handwritten text-[#2c1d11] text-base md:text-lg leading-tight line-clamp-2">
                    {photo.caption}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 md:p-10 cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 20 }}
              transition={{ type: 'spring', bounce: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#f8f0e3] p-4 md:p-6 pb-16 md:pb-24 rounded-lg max-w-2xl w-full shadow-2xl relative border-2 border-[#e3bb7d] flex flex-col items-center"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/10 hover:bg-black/20 text-[#2c1d11] flex items-center justify-center text-xl font-bold transition-colors z-30"
              >
                ✕
              </button>

              {/* Expanded Image */}
              <div className="w-full max-h-[65vh] rounded overflow-hidden shadow-inner bg-black flex items-center justify-center">
                <img
                  src={selectedPhoto.src}
                  alt={selectedPhoto.caption}
                  className="max-h-[65vh] w-auto object-contain"
                />
              </div>

              {/* Expanded Caption */}
              <div className="mt-6 text-center">
                <div className="text-3xl mb-1">{selectedPhoto.emoji}</div>
                <h3 className="font-serif text-[#a9884f] text-sm uppercase tracking-widest mb-1">{selectedPhoto.title}</h3>
                <p className="font-handwritten text-[#2c1d11] text-2xl md:text-3xl font-bold px-4">
                  "{selectedPhoto.caption}"
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
