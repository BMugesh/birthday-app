'use client';

import { motion, Variants } from 'framer-motion';

const timelineData = [
  { 
    year: '🌸 July 27, 2021', 
    title: 'Where It All Grew Deeper', 
    text: 'The day God wrote a new chapter. We may not have shared the same childhood, but from this time, my heart chose you as my sister.', 
    emoji: '🌸',
    image: '/images/15_red_dress_bday21.jpg',
    caption: 'July 27, 2021 Birthday ❤️',
    objectPos: 'object-[center_10%]'
  },
  { 
    year: '💛 July 27, 2022', 
    title: 'Growing Closer Every Day', 
    text: "I didn't know then... one simple relationship would become one of the greatest blessings in my life. Another birthday celebrated with love.", 
    emoji: '💛',
    image: '/images/16_black_dress_bday22.jpg',
    caption: 'July 27, 2022 Birthday ✨',
    objectPos: 'object-top'
  },
  { 
    year: '🌻 Campus Days', 
    title: 'Becoming Family', 
    text: "Without realizing it, our campus conversations became comfort... and 'you' slowly became 'my Akka.'", 
    emoji: '🌻',
    image: '/images/03_campus_selfie.jpg',
    caption: 'Campus Memories 🏫',
    objectPos: 'object-top'
  },
  { 
    year: '🏆 Milestones', 
    title: 'Celebrating Victories', 
    text: 'Every trophy, every win, every achievement feels ten times sweeter when you are standing right beside me.', 
    emoji: '🏆',
    image: '/images/02_trophy_memory.jpg',
    caption: 'Our Shared Victory 🥇',
    objectPos: 'object-top'
  },
  { 
    year: '🌸 Every Laugh', 
    title: 'Moments Stitched in Gold', 
    text: 'Every laugh, every silly selfie, every quiet walk... quietly stitched us together into an unbreakable family.', 
    emoji: '🌸',
    image: '/images/01_favourite_day.jpg',
    caption: 'My Favourite Day 💖',
    objectPos: 'object-center'
  },
  { 
    year: '🌙 Special Events', 
    title: 'Shining Like a Queen', 
    text: 'Seeing you dressed in traditional silk saree... proud, regal, and full of grace. You inspire me every day.', 
    emoji: '👑',
    image: '/images/13_silk_saree_regal.jpg',
    caption: 'Elegance & Grace ✨',
    objectPos: 'object-top'
  },
  { 
    year: '❤️ Today', 
    title: 'July 27, 2026', 
    text: "Today isn't just your birthday. It's the day the world was blessed with someone who became my sister, my safe place, and one of the greatest gifts God ever gave me.", 
    emoji: '❤️',
    image: '/images/07_family_uniform.jpg',
    caption: 'My Akka, My Family ❤️',
    objectPos: 'object-top'
  },
  { 
    year: '♾️ Forever', 
    title: 'In Every Lifetime', 
    text: "We may not share the same blood... but we share something even stronger—a bond that love chose. And if I had the chance to choose my sister in every lifetime... I'd still choose you. Every single time. ❤️", 
    emoji: '♾️',
    image: '/images/19_family_car_selfie.jpg',
    caption: 'Forever & Always 🚘',
    objectPos: 'object-center'
  },
];

export default function TimelineScene() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.35
      }
    }
  };

  const leftCardVariants: Variants = {
    hidden: { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const rightCardVariants: Variants = {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const climaxVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: "easeInOut" } }
  };

  return (
    <section className="min-h-screen py-24 bg-[#0a0d24] text-[#f8f0e3] relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-[#c7b3ea]/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/3 left-0 w-[500px] h-[500px] bg-[#eec2d3]/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-24"
        >
          <motion.p variants={climaxVariants} className="text-[#e3bb7d] font-sans text-sm tracking-[0.3em] uppercase mb-4">
            Chapter II
          </motion.p>
          <motion.h2 variants={climaxVariants} className="font-serif text-5xl md:text-6xl text-[#f8f0e3] mb-4">
            Our Journey Through Time
          </motion.h2>
          <motion.p variants={climaxVariants} className="font-handwritten text-3xl text-[#eec2d3]">
            A bond not made by blood, but chosen by love 💖
          </motion.p>
        </motion.div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-6 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-[#e3bb7d] via-[#eec2d3] to-[#c7b3ea] opacity-30 rounded-full" />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="flex flex-col gap-16 md:gap-24"
          >
            {timelineData.map((item, index) => {
              const isEven = index % 2 === 0;
              return (
                <div key={index} className="relative flex items-center md:justify-between flex-col md:flex-row w-full">
                  
                  {/* Content Card */}
                  <div className={`w-full md:w-5/12 ${isEven ? 'md:order-1' : 'md:order-3'}`}>
                    <motion.div
                      variants={isEven ? leftCardVariants : rightCardVariants}
                      className="ml-16 md:ml-0 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-8 shadow-xl relative overflow-hidden group hover:border-[#e3bb7d]/40 transition-all duration-300"
                    >
                      {/* Photo Thumbnail with generous height and custom top positioning */}
                      {item.image && (
                        <div className="w-full h-64 sm:h-72 md:h-80 rounded-xl overflow-hidden mb-5 relative bg-black/40 border border-white/10 shadow-inner">
                          <img 
                            src={item.image} 
                            alt={item.title}
                            className={`w-full h-full object-cover ${item.objectPos || 'object-top'} group-hover:scale-105 transition-transform duration-700`}
                          />
                          <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full text-xs font-sans text-[#f7dea6] border border-white/10 shadow-md">
                            {item.caption}
                          </div>
                        </div>
                      )}

                      <div>
                        <span className="font-sans font-bold text-sm tracking-wider text-[#e3bb7d] block mb-1">{item.year}</span>
                        <h3 className="font-serif text-2xl md:text-3xl text-[#f8f0e3] mb-3">{item.title}</h3>
                      </div>
                      <p className="font-sans text-[#f8f0e3]/90 leading-relaxed text-base md:text-lg">
                        {item.text}
                      </p>
                    </motion.div>
                  </div>

                  {/* Center Node */}
                  <div className="absolute left-6 md:left-1/2 top-8 md:top-1/2 -translate-x-1/2 md:-translate-y-1/2 w-12 h-12 rounded-full bg-[#0a0d24] border-2 border-[#e3bb7d] flex items-center justify-center z-20 shadow-[0_0_15px_rgba(227,187,125,0.4)] md:order-2">
                    <span className="text-xl">{item.emoji}</span>
                  </div>
                  
                  {/* Spacer for desktop layout */}
                  <div className="hidden md:block w-5/12 order-1 md:order-1" style={{ display: isEven ? 'none' : 'block' }}></div>
                  <div className="hidden md:block w-5/12 order-3 md:order-3" style={{ display: isEven ? 'block' : 'none' }}></div>
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* Emotional Climax Section */}
        <div className="mt-48 mb-24 max-w-4xl mx-auto text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-20"
          >
            <motion.p 
              variants={climaxVariants}
              className="font-serif text-3xl md:text-4xl lg:text-5xl leading-relaxed text-[#f8f0e3]"
            >
              "People often say that family is made by blood. I smile... because I know mine was made by love. Thank you for becoming my sister, Anu Akka."
            </motion.p>

            <motion.p 
              variants={climaxVariants}
              className="font-serif text-3xl md:text-4xl lg:text-5xl leading-relaxed text-[#eec2d3]"
            >
              "You weren't there from the beginning of my story... but you became one of the most beautiful chapters in it." ❤️
            </motion.p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
