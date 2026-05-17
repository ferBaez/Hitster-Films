import useEmblaCarousel from 'embla-carousel-react';
import { useCallback, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { VideoModal } from './VideoModal';

const videos = [
  "8_wirbOyr6M",
  "9j4r0DNjLDk",
  "Z4tsdgPp8RY",
  "ESseLuRvKFY",
  "iHXTDlg6JzY",
  "IX_dE3S1MXU",
  "bED6GX2_HBM"
];

export function WorksCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'center' });
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <>
      <section className="py-24 bg-[#050505] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-12 flex justify-between items-end">
          <div>
            <h2 className="text-sm tracking-widest uppercase text-gray-500 mb-2 font-semibold">Portafolio</h2>
            <h3 className="text-4xl md:text-5xl font-heading text-white">Nuestro Trabajo</h3>
          </div>
          <div className="flex gap-4">
            <button onClick={scrollPrev} className="p-3 bg-white/5 rounded-full border border-white/10 hover:bg-white hover:text-black transition-all">
              <ChevronLeft size={24} />
            </button>
            <button onClick={scrollNext} className="p-3 bg-white/5 rounded-full border border-white/10 hover:bg-white hover:text-black transition-all">
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        <div className="embla" ref={emblaRef}>
          <div className="embla__container flex cursor-grab active:cursor-grabbing">
            {videos.map((videoId, index) => (
              <div className="embla__slide flex-[0_0_90%] sm:flex-[0_0_70%] md:flex-[0_0_60%] lg:flex-[0_0_45%] min-w-0 mr-6 md:mr-10" key={index}>
                <div 
                  className="aspect-video w-full rounded-sm overflow-hidden bg-black shadow-2xl relative border border-white/5 cursor-pointer group"
                  onClick={() => setActiveVideo(videoId)}
                >
                  <img 
                    src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`} 
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
                    }}
                    alt="Video thumbnail"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100 grayscale group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-16 h-16 rounded-full bg-black/40 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white">
                      <Play size={24} fill="white" className="ml-1" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <VideoModal 
        isOpen={!!activeVideo} 
        videoId={activeVideo} 
        onClose={() => setActiveVideo(null)} 
      />
    </>
  );
}
