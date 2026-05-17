import { motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { useState, useEffect } from 'react';

export function HeroSection() {
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const scrollToNext = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <section className="relative w-full h-screen overflow-hidden bg-black flex items-center justify-center">
      {/* Video Background */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 w-[300vw] sm:w-[200vw] md:w-[150vw] xl:w-[115vw] h-[300vw] sm:h-[200vw] md:h-[150vw] xl:h-[115vh] pointer-events-none opacity-40 left-1/2 -translate-x-1/2">
        {isMounted && (
          <iframe
            src="https://www.youtube.com/embed/hYf9ABw5ziw?autoplay=1&mute=1&controls=0&loop=1&playlist=hYf9ABw5ziw&playsinline=1&rel=0&showinfo=0&modestbranding=1"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full object-cover"
            allow="autoplay; encrypted-media"
            frameBorder="0"
          />
        )}
      </div>

      {/* Overlay to ensure text readability */}
      <div className="absolute inset-0 bg-black/40 z-10" />
      <div className="absolute inset-0 grid-bg z-[5] opacity-20 hidden md:block"></div>

      {/* Content */}
      <div className="relative z-20 text-center px-4 w-full flex flex-col items-center">
        <motion.h1 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="font-heading text-6xl md:text-[8rem] lg:text-[10rem] font-bold tracking-tighter text-white uppercase leading-[0.8]"
        >
          Hitster <br/>
          <span className="text-transparent" style={{ WebkitTextStroke: '2px rgba(255,255,255,0.6)' }}>Films</span>
        </motion.h1>
      </div>

      {/* Scroll indicator */}
      <motion.button 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        onClick={scrollToNext}
        className="absolute bottom-12 z-20 text-white/50 hover:text-white transition-colors cursor-pointer"
      >
        <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}>
          <ChevronDown size={40} strokeWidth={1} />
        </motion.div>
      </motion.button>
    </section>
  );
}
