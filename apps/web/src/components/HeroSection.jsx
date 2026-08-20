import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { SplitText } from 'gsap/SplitText';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import BrowserMockup from './BrowserMockup';

gsap.registerPlugin(useGSAP, SplitText, ScrollTrigger);

export default function HeroSection() {
  const containerRef = useRef(null);
  const headlineRef = useRef(null);
  const subtextRef = useRef(null);
  const ctaRef = useRef(null);
  const scrollCueRef = useRef(null);
  const bgGlowRef = useRef(null);
  const textContainerRef = useRef(null);
  const gridLinesRef = useRef([]);
  const mockupRef = useRef(null);

  useGSAP(() => {
    // 1. Setup SplitText for the primary headline (Lines only)
    const splitHeadline = new SplitText(headlineRef.current, { 
      type: 'lines',
      linesClass: 'headline-line' 
    });

    splitHeadline.lines.forEach((line) => {
      const wrapper = document.createElement('div');
      wrapper.style.overflow = 'hidden';
      wrapper.style.paddingTop = '20px'; 
      wrapper.style.marginTop = '-20px'; 
      wrapper.style.paddingBottom = '30px'; 
      wrapper.style.marginBottom = '-30px'; 
      line.parentNode.insertBefore(wrapper, line);
      wrapper.appendChild(line);
      gsap.set(line, { yPercent: 120, opacity: 0 }); // Hide initially
    });

    // 2. Setup SplitText for the subtext (Lines)
    const splitSubtext = new SplitText(subtextRef.current, { 
      type: 'lines',
      linesClass: 'subtext-line'
    });
    
    splitSubtext.lines.forEach((line) => {
      const wrapper = document.createElement('div');
      wrapper.style.overflow = 'hidden';
      wrapper.style.paddingTop = '15px';
      wrapper.style.marginTop = '-15px';
      wrapper.style.paddingBottom = '20px';
      wrapper.style.marginBottom = '-20px';
      line.parentNode.insertBefore(wrapper, line);
      wrapper.appendChild(line);
      gsap.set(line, { yPercent: 120, opacity: 0 }); // Hide initially
    });

    // Initial states
    gsap.set([ctaRef.current, scrollCueRef.current], { opacity: 0, y: 30 });
    gsap.set(gridLinesRef.current[0], { scaleX: 0 }); // Top line
    gsap.set(gridLinesRef.current[1], { scaleX: 0 }); // Bottom line
    gsap.set(gridLinesRef.current[2], { scaleY: 0 }); // Vertical separator
    gsap.set(mockupRef.current, { opacity: 0, scale: 0.96 }); // Browser mockup

    // Master Timeline
    const masterTl = gsap.timeline();

    // Header entrance
    const headerEl = document.querySelector('.site-header');
    if (headerEl) {
      masterTl.to(headerEl, { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }, 0);
    }

    // Grid lines draw in
    masterTl.to(gridLinesRef.current, {
      scaleX: 1,
      scaleY: 1,
      duration: 1.5,
      stagger: 0.2,
      ease: 'power3.inOut'
    }, 0.2);

    // Headline sweep up
    masterTl.to(splitHeadline.lines, {
      yPercent: 0,
      opacity: 1,
      duration: 1.6,
      stagger: 0.15, 
      ease: 'power4.out'
    }, 0.8);

    // Subtext sweep up
    masterTl.to(splitSubtext.lines, {
      yPercent: 0,
      opacity: 1,
      duration: 1.4,
      stagger: 0.1,
      ease: 'power4.out'
    }, 1.2);

    // CTA & Scroll Cue entrance
    masterTl.to([ctaRef.current, scrollCueRef.current], {
      opacity: 1,
      y: 0,
      duration: 1,
      stagger: 0.1,
      ease: 'power3.out'
    }, 1.4);

    // Browser Mockup entrance
    masterTl.to(mockupRef.current, {
      opacity: 1,
      scale: 1,
      duration: 1.2,
      ease: 'power3.out'
    }, 1.5);

    // Subtle CTA emerald glow pulse
    masterTl.to(ctaRef.current, {
      boxShadow: '0 0 30px -5px rgba(21, 207, 137, 0.6)',
      duration: 1,
      yoyo: true,
      repeat: -1,
      ease: 'sine.inOut'
    }, "+=0.5");

    // Scroll Cue continuous bounce
    gsap.to(scrollCueRef.current.querySelector('.arrow'), {
      y: 5,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });

    // Scroll-Linked Parallax (Depth Dive)
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "bottom top",
      scrub: true,
      animation: gsap.timeline()
        .to(textContainerRef.current, { y: -150, scale: 0.9, filter: 'blur(8px)', opacity: 0, ease: 'power1.inOut' }, 0)
        .to(gridLinesRef.current, { opacity: 0, ease: 'none' }, 0)
        .to(scrollCueRef.current, { opacity: 0, ease: 'none' }, 0)
        .to(bgGlowRef.current, { opacity: 0, ease: 'none' }, 0),
      toggleActions: "play reverse play reverse"
    });

    // Interactive Mouse Spotlight & Mockup Tilt
    const glowXTo = gsap.quickTo(bgGlowRef.current, "x", { duration: 0.8, ease: "power3" });
    const glowYTo = gsap.quickTo(bgGlowRef.current, "y", { duration: 0.8, ease: "power3" });
    const mockupRotXTo = gsap.quickTo(mockupRef.current, "rotateX", { duration: 1, ease: "power3" });
    const mockupRotYTo = gsap.quickTo(mockupRef.current, "rotateY", { duration: 1, ease: "power3" });

    const onMouseMove = (e) => {
      // Raw pixel values for background glow
      const pxX = e.clientX - window.innerWidth / 2;
      const pxY = e.clientY - window.innerHeight / 2;
      glowXTo(pxX * 0.5); 
      glowYTo(pxY * 0.5); 

      // Normalized -1 to +1 values for 3D tilt
      const normX = (e.clientX / window.innerWidth - 0.5) * 2;
      const normY = (e.clientY / window.innerHeight - 0.5) * 2;
      mockupRotXTo(normY * -4); // Tilt up/down
      mockupRotYTo(normX * 4);  // Tilt left/right
    };

    window.addEventListener('mousemove', onMouseMove);
    return () => {
      splitHeadline.revert();
      splitSubtext.revert();
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative min-h-[100dvh] w-full flex flex-col justify-center overflow-hidden bg-background">
      
      {/* Interactive Mouse Spotlight Glow */}
      <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center overflow-hidden">
        <div 
          ref={bgGlowRef}
          className="w-[70vw] h-[70vw] max-w-[800px] max-h-[800px] rounded-full opacity-30 mix-blend-screen"
          style={{
            background: 'radial-gradient(circle, rgba(21,207,137,0.15) 0%, rgba(21,207,137,0) 60%)',
            filter: 'blur(60px)'
          }}
        />
      </div>

      {/* Structural Glassmorphic Grid Lines */}
      <div ref={el => gridLinesRef.current[0] = el} className="absolute top-[15vh] left-0 w-full h-[1px] bg-white/5 origin-left z-0" />
      <div ref={el => gridLinesRef.current[1] = el} className="absolute bottom-[15vh] left-0 w-full h-[1px] bg-white/5 origin-right z-0" />
      <div ref={el => gridLinesRef.current[2] = el} className="hidden lg:block absolute top-[15vh] bottom-[15vh] right-[33%] w-[1px] bg-white/5 origin-top z-0" />

      {/* Main Grid Container */}
      <div 
        ref={textContainerRef}
        className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-12 gap-8 h-full"
      >
        
        {/* Left Column: Typography & Content (Cols 1-8) */}
        <div className="col-span-12 lg:col-span-8 flex flex-col items-start justify-center py-20 lg:pr-12">
          
          <h1 
            ref={headlineRef}
            className="flex flex-col gap-2 text-5xl sm:text-6xl md:text-[6.5vw] lg:text-[6vw] leading-[1.05] relative z-10"
          >
            {/* Typographic Contrast: Bold Sans */}
            <span className="font-bold tracking-tighter text-foreground block">
              We build digital futures
            </span>
            {/* Typographic Contrast: Elegant Serif Italic */}
            <span className="font-serif italic font-light text-muted-foreground/80 tracking-normal block" style={{ fontSize: '0.9em' }}>
              for ambitious brands.
            </span>
          </h1>

          <p 
            ref={subtextRef} 
            className="text-lg md:text-xl lg:text-[1.35rem] text-muted-foreground font-sans leading-relaxed max-w-2xl mt-10"
          >
            Engineering custom software, intelligent AI automation, and high-performance web platforms that scale with absolute precision.
          </p>
          
          <div className="pt-12">
            <a 
              ref={ctaRef}
              href="#work" 
              className="magnetic inline-flex items-center gap-4 bg-accent text-accent-foreground px-8 py-4 rounded-full font-bold uppercase tracking-widest transition-colors hover:bg-accent/90 relative group"
              data-cursor-text="Explore"
              data-magnetic-cursor-strength="0.7"
              data-magnetic-element-strength="0.3"
            >
              <span>Explore Work</span>
              <div className="w-8 h-8 rounded-full bg-black/10 flex items-center justify-center transition-transform group-hover:translate-x-1">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
              </div>
            </a>
          </div>

        </div>

        {/* Right Column: Browser Mockup Showcase (Cols 9-12) */}
        <div className="hidden lg:flex col-span-4 flex-col justify-center items-center relative min-h-[400px]">
          <BrowserMockup ref={mockupRef} />
        </div>
      </div>

      {/* Scroll Cue */}
      <div 
        ref={scrollCueRef}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground z-10"
      >
        <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Scroll</span>
        <div className="arrow w-px h-8 bg-gradient-to-b from-muted-foreground to-transparent" />
      </div>
    </section>
  );
}
