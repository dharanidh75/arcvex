import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink } from 'lucide-react';
import { cn } from '../lib/utils';

gsap.registerPlugin(ScrollTrigger);

export default function CinematicWorkSection({ projects }) {
  const containerRef = useRef(null);
  const [isInView, setIsInView] = useState(false);
  const totalProjects = projects.length;

  useEffect(() => {
    // Wait until the container is near the viewport before downloading heavy videos
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect(); // Only need to trigger once
        }
      },
      { rootMargin: '1200px' } // Start downloading well before it scrolls into view
    );
    
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    
    return () => observer.disconnect();
  }, []);

  useGSAP(() => {
    // We attach the scroll trigger to the container.
    // The container is pinned, and scrubbing controls the timeline.
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: `+=${totalProjects * 150}%`, // Extended scroll length so the animation takes longer to complete
        scrub: 1.5, // Added more inertia for a smoother, heavier feel
        pin: true,
        anticipatePin: 1,
      }
    });

    // The timeline orchestrates the transition between projects
    projects.forEach((project, index) => {
      // Skip transition for the very first project, as it's visible by default
      if (index === 0) return;

      const prevVideo = `.video-container-${index - 1}`;
      const nextVideo = `.video-container-${index}`;
      const prevText = `.text-container-${index - 1}`;
      const nextText = `.text-container-${index}`;

      const label = `transition-${index}`;

      // Introduce a slightly longer pause between transitions
      tl.addLabel(label, `+=${1.0}`);

      // Ensure the new video wipes OVER the previous one
      tl.set(nextVideo, { zIndex: 20 }, label);
      tl.set(prevVideo, { zIndex: 10 }, label);

      // 1. PREVIOUS TEXT EXITS: Smooth upward drift
      tl.to(prevText, {
        opacity: 0,
        y: -100,
        duration: 2.5,
        ease: "power3.inOut"
      }, label);

      // 2. PREVIOUS VIDEO EXITS: Subtle push back and dim
      tl.to(prevVideo, {
        scale: 0.9,
        opacity: 0.3,
        duration: 2.5,
        ease: "power3.inOut"
      }, label);

      // 3. NEXT VIDEO ENTERS: The "Curtain Reveal" wiping up from the bottom
      tl.fromTo(nextVideo,
        {
          opacity: 1,
          scale: 1.3,
          clipPath: 'inset(100% 0% 0% 0%)'
        },
        {
          scale: 1,
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: 2.5,
          ease: "power3.inOut"
        },
        label
      );

      // 4. NEXT TEXT ENTERS: Dramatic slow rise
      tl.fromTo(nextText,
        { opacity: 0, y: 100 },
        { opacity: 1, y: 0, duration: 2.5, ease: "power3.out" },
        `${label}+=1.5` // Adjusted natural delay to match the slower video
      );
    });

  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      className="relative h-[100dvh] w-full bg-black overflow-hidden font-['Plus_Jakarta_Sans'] group"
      id="work"
    >
      {/* Pinned Title Layer */}
      <div className="absolute top-12 left-12 z-50 mix-blend-difference pointer-events-none">
        <h2 className="text-white text-xl font-bold tracking-[0.2em] uppercase">Work</h2>
      </div>

      {/* Media Stack */}
      <div className="absolute inset-0 z-0">
        {projects.map((project, index) => (
          <div
            key={`video-${index}`}
            className={cn(
              `video-container-${index} absolute inset-0 w-full h-full will-change-transform origin-center`,
              index === 0 ? 'opacity-100 z-10' : 'opacity-0 z-0'
            )}
          >
            <video
              src={isInView ? project.video : ""}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover object-center"
              ref={(el) => {
                if (el) el.playbackRate = 1.25;
              }}
            />
            {/* Cinematic Gradient Overlay for Left-Aligned Text Legibility */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent pointer-events-none"></div>
          </div>
        ))}
      </div>

      {/* Typography Stack */}
      <div className="absolute inset-0 z-20 flex items-center justify-start text-left p-5 md:p-16 lg:p-24 pointer-events-none">
        {projects.map((project, index) => (
          <div
            key={`text-${index}`}
            className={cn(
              `text-container-${index} absolute flex flex-col items-start max-w-4xl will-change-transform`,
              index === 0 ? 'opacity-100' : 'opacity-0'
            )}
          >
            <p className="text-accent uppercase tracking-[0.3em] font-medium text-xs md:text-sm mb-4 md:mb-6 drop-shadow-md">
              {project.category}
            </p>
            <h3 className="text-white text-3xl md:text-5xl lg:text-7xl font-bold tracking-tighter leading-[1] mb-4 md:mb-6 drop-shadow-2xl">
              {project.title}
            </h3>
            {project.description && (
              <p className="text-white/80 text-base md:text-xl font-serif leading-relaxed mb-6 md:mb-10 max-w-2xl drop-shadow-md" style={{ fontFamily: '"PT Serif", serif' }}>
                {project.description[0]}
              </p>
            )}
            <div className="flex flex-wrap justify-start gap-2 md:gap-3 mb-6 md:mb-10 max-w-2xl">
              {project.features.map((feat, i) => (
                <span key={i} className="px-3 py-1.5 md:px-5 md:py-2.5 rounded-full bg-black/40 backdrop-blur-xl border border-white/10 text-[10px] md:text-sm text-white/90 shadow-2xl tracking-wide">
                  {feat}
                </span>
              ))}
            </div>

          </div>
        ))}
      </div>
    </section>
  );
}
