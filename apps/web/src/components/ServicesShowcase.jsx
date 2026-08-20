import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

gsap.registerPlugin(ScrollTrigger);

import aiImage from '../assets/Images/AI_autimation(1).png';
import aiVideo from '../assets/video/AI_Automationa.webm';
import dpImage from '../assets/Images/Digital_Product.png';
import dpVideo from '../assets/video/digital_product.webm';
import weImage from '../assets/Images/Web_Experiences.png';
import weVideo from '../assets/video/Web_Experiences.webm';

const services = [
  {
    title: 'AI Automation',
    description: 'Custom AI agents and autonomous workflows engineered to multiply your operational bandwidth.',
    image: aiImage,
    video: aiVideo,
  },
  {
    title: 'Digital Products',
    description: 'High-performance web and mobile applications with agency-grade motion and interaction design.',
    image: dpImage,
    video: dpVideo,
  },
  {
    title: 'Web Experiences',
    description: 'Immersive, high-performance websites designed to turn attention into meaningful digital experiences.',
    image: weImage,
    video: weVideo,
  },
];

function ServiceCard({ service, spanClass, cardRef }) {
  const videoRef = useRef(null);

  const handleMouseEnter = () => {
    // Only play on desktop/devices with hover
    if (videoRef.current) {
      videoRef.current.play().catch(e => console.warn("Video autoplay prevented:", e));
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div 
      ref={cardRef}
      className={`group ${spanClass} double-bezel-outer cursor-pointer`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="double-bezel-inner relative h-full min-h-[400px] md:min-h-[500px] flex flex-col justify-end p-8 md:p-12 transition-spring group-hover:scale-[0.98]">
        
        {/* Media Container */}
        <div className="absolute inset-0 z-0 overflow-hidden rounded-[calc(2rem-0.375rem)]">
          {/* Gradient Overlay for text readability, much lighter than before */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a1715]/90 via-[#1a1715]/40 to-transparent z-10 transition-opacity duration-700 ease-out group-hover:opacity-50" />
          
          <div className="absolute inset-0 transition-transform duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105">
            {/* Static Image Layer */}
            <img 
              src={service.image} 
              alt={service.title}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out ${service.video ? 'md:group-hover:opacity-0' : 'opacity-100'}`}
            />
            {/* Video Layer */}
            {service.video && (
              <video
                ref={videoRef}
                src={service.video}
                muted
                loop
                playsInline
                preload="metadata"
                className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-500 ease-in-out md:group-hover:opacity-100 hidden md:block"
              />
            )}
          </div>
        </div>

        {/* Content */}
        <div className="relative z-20 flex flex-col gap-4 transform transition-transform duration-700 ease-out group-hover:-translate-y-4">
          <h3 className="text-3xl md:text-5xl font-bold text-foreground">{service.title}</h3>
          <p className="text-muted-foreground text-lg md:text-xl max-w-lg">
            {service.description}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function ServicesShowcase() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Split-line heading reveal on scroll
      if (headingRef.current) {
        const text = new SplitType(headingRef.current, { types: 'lines, words' });
        
        // Wrap lines in hidden containers to clip the animation
        text.lines.forEach(line => {
          const wrapper = document.createElement('div');
          wrapper.style.overflow = 'hidden';
          line.parentNode.insertBefore(wrapper, line);
          wrapper.appendChild(line);
        });

        gsap.from(text.words, {
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 85%',
          },
          yPercent: 100,
          opacity: 0,
          duration: 1,
          stagger: 0.04,
          ease: 'power4.out',
        });
      }

      // 2. Staggered card entrance
      if (cardsRef.current.length > 0) {
        gsap.from(cardsRef.current, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
          y: 60,
          opacity: 0,
          duration: 1.2,
          stagger: 0.15,
          ease: 'power3.out',
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full min-h-[100dvh] bg-background py-32 px-4 md:px-8">
      <div className="max-w-7xl mx-auto flex flex-col gap-24">
        
        {/* Section Header */}
        <div className="w-full flex flex-col md:flex-row justify-between items-start gap-8">
          <div className="flex flex-col gap-4 w-full md:w-2/3">
            <span className="inline-block rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.2em] font-medium border border-white/10 bg-white/5 w-max text-muted-foreground">
              Core Capabilities
            </span>
            <h2 ref={headingRef} className="text-4xl md:text-6xl font-bold tracking-tight text-foreground leading-tight">
              We engineer scalable systems and craft premium digital experiences.
            </h2>
          </div>
          <div className="w-full md:w-1/3 flex justify-end">
            <button className="magnetic group inline-flex items-center gap-4 border border-white/20 hover:border-accent text-white px-6 py-3 rounded-full font-bold uppercase tracking-wide transition-spring hover:scale-[0.98]">
              <span>View All Services</span>
              <div className="w-8 h-8 rounded-full bg-white/5 group-hover:bg-accent/20 flex items-center justify-center transition-transform group-hover:translate-x-1 group-hover:scale-105 group-hover:text-accent">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
              </div>
            </button>
          </div>
        </div>

        {/* Services Grid (Asymmetrical Layout concept) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
          {services.map((service, index) => {
            // Asymmetric spanning: First item spans 12 (full width), others span 6 (half)
            const spanClass = index === 0 ? "md:col-span-12" : "md:col-span-6";
            return (
              <ServiceCard 
                key={index} 
                service={service} 
                spanClass={spanClass} 
                cardRef={el => cardsRef.current[index] = el} 
              />
            );
          })}
        </div>

      </div>
    </section>
  );
}
