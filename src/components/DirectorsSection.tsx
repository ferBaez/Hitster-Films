import useEmblaCarousel from 'embla-carousel-react';
import { useCallback, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ExternalLink, Play } from 'lucide-react';
import { motion } from 'motion/react';
import { VideoModal } from './VideoModal';

type VideoMedia = {
  id: string;
  type: 'youtube' | 'vimeo';
};

const directors = [
  {
    name: "Oscar Azula",
    description: "Dirección visual y narrativa potente.",
    video: { id: "HBTi0wnyuP0", type: 'youtube' as const },
  },
  {
    name: "Kremer & Johnson",
    description: "Estética colaborativa y contemporánea.",
    video: { id: "243349917", type: 'vimeo' as const },
  },
  {
    name: "Mayra Berry",
    description: "Una visión íntima y audaz de la narrativa contemporánea.",
    video: { id: "xq-tCRAK0xY", type: 'youtube' as const },
    website: "https://ferbaez.github.io/Mayra-Berry/"
  },
  {
    name: "Camilo Sánchez",
    description: "Estética cruda y cinematografía vanguardista.",
    video: { id: "8_wirbOyr6M", type: 'youtube' as const }, 
  },
  {
    name: "Sofía Rossi",
    description: "Especialista en belleza, moda y dirección de arte meticulosa.",
    video: { id: "IX_dE3S1MXU", type: 'youtube' as const },
  }
];

function Thumbnail({ video, className, alt }: { video: VideoMedia, className: string, alt: string }) {
  const [vimeoSrc, setVimeoSrc] = useState('');

  useEffect(() => {
    if (video.type === 'vimeo') {
      fetch(`https://vimeo.com/api/v2/video/${video.id}.json`)
        .then(res => res.json())
        .then(data => {
          if (data && data[0]) setVimeoSrc(data[0].thumbnail_large);
        })
        .catch(() => {});
    }
  }, [video]);

  if (video.type === 'vimeo') {
    if (!vimeoSrc) return <div className={`${className} bg-neutral-900 animate-pulse`} />;
    return <img src={vimeoSrc} alt={alt} className={className} />;
  }

  return (
    <img 
      src={`https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`} 
      onError={(e) => {
        (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${video.id}/hqdefault.jpg`;
      }}
      alt={alt}
      className={className}
    />
  );
}

export function DirectorsSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, align: 'start' });
  const [activeVideo, setActiveVideo] = useState<{id: string, type: 'youtube' | 'vimeo'} | null>(null);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <>
      <section className="py-32 px-6 md:px-12 bg-black relative border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            
            <div className="lg:col-span-4 z-10">
              <motion.div
                 initial={{ opacity: 0, x: -30 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 viewport={{ once: true }}
                 transition={{ duration: 0.8 }}
              >
                <h2 className="text-sm tracking-widest uppercase text-hitster-accent mb-4 font-semibold">El Rostro del Cine</h2>
                <h3 className="text-5xl md:text-6xl font-heading text-white mb-6">Nuestros Directores</h3>
                <p className="text-gray-400 text-lg leading-relaxed mb-10 text-justify">
                  Detrás de cada gran proyecto hay una mente maestra. Nuestro roster está compuesto por directores que no solo cuentan historias, sino que desafían los límites visuales y narrativos para concebir piezas memorables.
                </p>
                
                <div className="flex gap-4">
                  <button onClick={scrollPrev} className="p-4 rounded-full bg-white/5 border border-white/10 hover:bg-white hover:text-black transition-all">
                    <ChevronLeft size={20} />
                  </button>
                  <button onClick={scrollNext} className="p-4 rounded-full bg-white/5 border border-white/10 hover:bg-white hover:text-black transition-all">
                    <ChevronRight size={20} />
                  </button>
                </div>
              </motion.div>
            </div>

            <div className="lg:col-span-8 overflow-hidden">
               <div className="embla" ref={emblaRef}>
                <div className="embla__container flex cursor-grab active:cursor-grabbing">
                  {directors.map((director, index) => (
                    <div className="embla__slide flex-[0_0_100%] sm:flex-[0_0_80%] min-w-0 mr-8" key={index}>
                      <div 
                        className="aspect-video w-full rounded-sm overflow-hidden bg-black mb-6 relative border border-white/5 cursor-pointer group"
                        onClick={() => setActiveVideo(director.video)}
                      >
                        <Thumbnail 
                          video={director.video}
                          alt={director.name}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100 grayscale group-hover:grayscale-0"
                        />
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="w-16 h-16 rounded-full bg-black/40 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white">
                            <Play size={24} fill="white" className="ml-1" />
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                        <div>
                          <h4 className="text-3xl font-heading text-white mb-2">{director.name}</h4>
                          <p className="text-gray-400 text-justify">{director.description}</p>
                        </div>
                        {director.website && (
                          <a 
                            href={director.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-sm uppercase tracking-wider text-white border-b border-white/30 pb-1 hover:text-hitster-accent hover:border-hitster-accent transition-colors whitespace-nowrap"
                          >
                            Más de {director.name.split(' ')[0]} <ExternalLink size={14} />
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <VideoModal 
        isOpen={!!activeVideo} 
        video={activeVideo} 
        onClose={() => setActiveVideo(null)} 
      />
    </>
  );
}
