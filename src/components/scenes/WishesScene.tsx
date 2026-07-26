'use client';

import { motion } from 'framer-motion';

const row1 = [
  { name: "From a Friend 💜", text: "May your birthday be filled with laughter, love, and everything your heart desires. You deserve the world!" },
  { name: "Family 🌸", text: "Happy Birthday to someone who makes every gathering brighter. Your warmth is a gift to everyone around you." },
  { name: "With Love 💖", text: "Another year of your beautiful existence. The world is better because you're in it." },
  { name: "A Prayer 🙏", text: "May God shower you with His richest blessings today and always. Happy Birthday!" }
];

const row2 = [
  { name: "With Gratitude ✨", text: "Thank you for being the kind of person who makes everyone feel loved. Happy Birthday!" },
  { name: "Forever & Always ❤️", text: "No matter how many birthdays pass, you'll always be one of a kind. Celebrate big!" },
  { name: "Blessings 🌟", text: "May this new year of your life be your most beautiful chapter yet. Happy Birthday!" },
  { name: "With Joy 🎉", text: "Here's to another year of making memories, sharing love, and being absolutely amazing!" }
];

export default function WishesScene() {
  return (
    <section className="relative min-h-screen w-full bg-[#0a0d24] py-24 overflow-hidden flex flex-col justify-center">
      <style>{`
        @keyframes marquee-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .animate-marquee-left {
          animation: marquee-left 40s linear infinite;
        }
        .animate-marquee-right {
          animation: marquee-right 40s linear infinite;
        }
        .pause-on-hover:hover {
          animation-play-state: paused;
        }
      `}</style>
      
      <div className="container mx-auto px-6 mb-16 text-center">
        <motion.p 
          className="text-[#e3bb7d] font-sans tracking-widest uppercase text-sm mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Chapter VII
        </motion.p>
        <motion.h2 
          className="font-serif text-5xl md:text-6xl text-[#f8f0e3]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          Birthday Wishes
        </motion.h2>
      </div>

      <div className="flex flex-col gap-8 relative z-10 w-[200%] sm:w-[150%] md:w-full max-w-none">
        {/* Row 1 */}
        <div className="flex w-max animate-marquee-left pause-on-hover hover:cursor-pointer gap-6 px-4">
          {[...row1, ...row1].map((wish, i) => (
            <div key={`r1-${i}`} className="w-[300px] md:w-[400px] p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shrink-0 flex flex-col gap-4">
              <h3 className="font-handwritten text-3xl text-[#c7b3ea]">{wish.name}</h3>
              <p className="font-sans text-[#f8f0e3]/80 leading-relaxed text-sm md:text-base">"{wish.text}"</p>
            </div>
          ))}
        </div>

        {/* Row 2 */}
        <div className="flex w-max animate-marquee-right pause-on-hover hover:cursor-pointer gap-6 px-4">
          {[...row2, ...row2].map((wish, i) => (
            <div key={`r2-${i}`} className="w-[300px] md:w-[400px] p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shrink-0 flex flex-col gap-4">
              <h3 className="font-handwritten text-3xl text-[#eec2d3]">{wish.name}</h3>
              <p className="font-sans text-[#f8f0e3]/80 leading-relaxed text-sm md:text-base">"{wish.text}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
