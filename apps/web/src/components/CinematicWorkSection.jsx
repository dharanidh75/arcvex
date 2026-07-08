import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const CrossfadeSlide = ({ project, i, total, progress }) => {
  const step = 1 / total;
  
  // Calculate precise crossfade timings based on scroll progress
  let input, output, scaleOutput;
  
  if (i === 0) {
    input = [0, step * 0.8, step];
    output = [1, 1, 0];
    scaleOutput = [1, 1.02, 1.05];
  } else if (i === total - 1) {
    input = [(i - 0.2) * step, i * step, 1];
    output = [0, 1, 1];
    scaleOutput = [0.95, 1, 1.02];
  } else {
    input = [(i - 0.2) * step, i * step, (i + 0.8) * step, (i + 1) * step];
    output = [0, 1, 1, 0];
    scaleOutput = [0.95, 1, 1.02, 1.05];
  }

  const opacity = useTransform(progress, input, output);
  const scale = useTransform(progress, input, scaleOutput);

  return (
    <motion.div 
      style={{ opacity }} 
      className="absolute inset-0 w-full h-full flex items-center will-change-transform"
    >
      <motion.div style={{ scale }} className="absolute inset-0 w-full h-full z-0 origin-center will-change-transform">
        <video 
          src={project.video} 
          autoPlay loop muted playsInline 
          className="w-full h-full object-cover" 
        />
      </motion.div>
      
      {/* Cinematic Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent z-10 pointer-events-none" />
      
      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 w-full flex flex-col items-start text-left">
        <p className="text-accent uppercase tracking-[0.3em] font-medium text-xs md:text-sm mb-4 drop-shadow-md">
           {project.category}
        </p>
        <h3 className="text-white text-4xl md:text-6xl lg:text-8xl font-bold tracking-tighter leading-[1] mb-6 drop-shadow-2xl">
           {project.title}
        </h3>
        {project.description && (
          <p className="text-white/80 text-lg md:text-2xl font-serif leading-relaxed mb-10 max-w-2xl drop-shadow-md" style={{ fontFamily: '"PT Serif", serif' }}>
            {project.description[0]}
          </p>
        )}
        <div className="flex flex-wrap gap-3">
          {project.features.map((feat, idx) => (
            <span key={idx} className="px-4 py-2 rounded-full bg-black/40 backdrop-blur-xl border border-white/10 text-sm text-white/90 shadow-2xl tracking-wide">
              {feat}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default function CinematicWorkSection({ projects }) {
  const container = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    // Only mount heavy videos when section is near the viewport
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
    <section 
      ref={container} 
      className="relative w-full bg-black font-['Plus_Jakarta_Sans']" 
      style={{ height: `${projects.length * 100}vh` }} 
      id="work"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        
        {/* Pinned Title Layer */}
        <div className="absolute top-12 left-12 z-50 pointer-events-none">
          <h2 className="text-white/50 text-xl font-bold tracking-[0.2em] uppercase">Work</h2>
        </div>

        {isInView && projects.map((project, i) => (
          <CrossfadeSlide 
            key={i} 
            project={project} 
            i={i} 
            total={projects.length} 
            progress={scrollYProgress} 
          />
        ))}

      </div>
    </section>
  );
}
