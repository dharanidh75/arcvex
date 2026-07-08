import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Card = ({ project, i, progress, range, targetScale }) => {
  const container = useRef(null);
  
  // As the user scrolls, we map the progress to a scale value.
  // When this card is pinned at the top and the user keeps scrolling down, it shrinks slightly.
  const scale = useTransform(progress, range, [1, targetScale]);
  
  // Calculate dynamic top positioning so the cards stack elegantly with a small offset
  const topPosition = `calc(10vh + ${i * 30}px)`;

  return (
    <div ref={container} className="h-screen flex items-center justify-center sticky top-0">
      <motion.div 
        style={{ scale, top: topPosition }}
        className="relative flex flex-col w-[92%] md:w-[85%] max-w-6xl h-[75vh] md:h-[80vh] rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl origin-top border border-white/10 group"
      >
        <video 
           src={project.video}
           autoPlay loop muted playsInline
           className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
        />
        
        {/* Cinematic gradient to ensure text is perfectly readable */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent pointer-events-none" />
        
        <div className="absolute inset-0 p-8 md:p-16 flex flex-col justify-end">
           <div className="max-w-4xl">
             <p className="text-accent uppercase tracking-[0.3em] font-medium text-xs md:text-sm mb-3 md:mb-4 drop-shadow-md">
               {project.category}
             </p>
             <h3 className="text-white text-3xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-4 md:mb-6 drop-shadow-2xl">
               {project.title}
             </h3>
             {project.description && (
               <p className="text-white/80 text-base md:text-xl font-serif leading-relaxed mb-6 md:mb-8 drop-shadow-md max-w-2xl" style={{ fontFamily: '"PT Serif", serif' }}>
                 {project.description[0]}
               </p>
             )}
             <div className="flex flex-wrap gap-2 md:gap-3">
                {project.features.map((feat, idx) => (
                   <span key={idx} className="px-3 py-1.5 md:px-5 md:py-2 rounded-full bg-black/40 backdrop-blur-xl border border-white/10 text-xs md:text-sm text-white/90 shadow-2xl tracking-wide">
                      {feat}
                   </span>
                ))}
             </div>
           </div>
        </div>
      </motion.div>
    </div>
  );
};

export default function CinematicWorkSection({ projects }) {
  const container = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    // Only mount heavy videos when section is near
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '800px' } 
    );
    
    if (container.current) {
      observer.observe(container.current);
    }
    
    return () => observer.disconnect();
  }, []);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end']
  });

  return (
    <section ref={container} className="relative w-full bg-black pb-24 pt-24 font-['Plus_Jakarta_Sans']" id="work">
      <div className="text-center mb-16 relative z-10 px-6">
         <div className="w-full border-b border-accent/40 pb-4 mb-8 max-w-2xl mx-auto">
           <p className="text-accent font-serif uppercase tracking-[0.25em] text-xl md:text-2xl">
             Our Work
           </p>
         </div>
         <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight">
           Everything we build.
         </h2>
      </div>
      
      <div className="relative z-20">
        {isInView && projects.map((project, i) => {
          const targetScale = 1 - ((projects.length - i) * 0.05);
          return (
            <Card 
              key={i} 
              project={project} 
              i={i} 
              progress={scrollYProgress} 
              range={[i * (1 / projects.length), 1]} 
              targetScale={targetScale}
            />
          );
        })}
      </div>
    </section>
  );
}
