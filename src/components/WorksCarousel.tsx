import useEmblaCarousel from 'embla-carousel-react';
import { useCallback, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { VideoModal } from './VideoModal';

type VideoMedia = {
  id: string;
  type: 'youtube' | 'vimeo';
  title?: string;
};

const videos: VideoMedia[] = [
  { id: "8_wirbOyr6M", type: 'youtube' },
  { id: "9j4r0DNjLDk", type: 'youtube' },
  { id: "Z4tsdgPp8RY", type: 'youtube' },
  { id: "ESseLuRvKFY", type: 'youtube' },
  { id: "iHXTDlg6JzY", type: 'youtube' },
  { id: "IX_dE3S1MXU", type: 'youtube' },
  { id: "bED6GX2_HBM", type: 'youtube' }
];

function Thumbnail({ video, className }: { video: VideoMedia, className: string }) {
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
    return <img src={vimeoSrc} alt="Video thumbnail" className={className} />;
  }

  return (
    <img 
      src={`https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`} 
      onError={(e) => {
        (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${video.id}/hqdefault.jpg`;
      }}
      alt="Video thumbnail"
      className={className}
    />
  );
}

export function WorksCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'center' });
  const [activeVideo, setActiveVideo] = useState<VideoMedia | null>(null);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <>
      <section id="reels" className="py-24 bg-[#050505] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-12 flex justify-between items-end">
          <div>
            <h2 className="text-sm tracking-widest uppercase text-gray-500 mb-2 font-semibold">Portafolio</h2>
            <h3 className="text-4xl md:text-5xl font-heading text-white">Obra Seleccionada</h3>
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
            {videos.map((video, index) => (
              <div className="embla__slide flex-[0_0_90%] sm:flex-[0_0_70%] md:flex-[0_0_60%] lg:flex-[0_0_45%] min-w-0 mr-6 md:mr-10" key={index}>
                <div 
                  className="aspect-video w-full rounded-sm overflow-hidden bg-black shadow-2xl relative border border-white/5 cursor-pointer group"
                  onClick={() => setActiveVideo(video)}
                >
                  <Thumbnail video={video} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100 grayscale group-hover:grayscale-0" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-16 h-16 rounded-full bg-black/40 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white">
                      <Play size={24} fill="white" className="ml-1" />
                    </div>
                  </div>
                  {video.title && (
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                      <h4 className="text-white text-lg font-heading tracking-wider uppercase">{video.title}</h4>
                    </div>
                  )}
                </div>
              </div>
            ))}
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
