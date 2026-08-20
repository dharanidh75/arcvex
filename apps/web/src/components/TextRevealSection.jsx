import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { SplitText } from 'gsap/SplitText';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP, SplitText, ScrollTrigger);

export default function TextRevealSection() {
  const containerRef = useRef(null);
  const textRef = useRef(null);

  useGSAP(() => {
    let mm = gsap.matchMedia();

    // Apply scrubbed animation only if user has no motion reduction preference
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // Split the paragraph into words
      const split = new SplitText(textRef.current, { type: 'words' });
      
      // Initial state: dim all words
      gsap.set(split.words, { opacity: 0.15 });

      // Create scroll-scrubbed reveal sequence
      gsap.to(split.words, {
        opacity: 1,
        stagger: 0.1,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: "center center",
          end: "+=150%", // Scroll distance required to complete the reveal
          scrub: 1, // 1-second smoothing for the scrub
          pin: true,
          anticipatePin: 1
        }
      });
      
      return () => {
        split.revert();
      };
    });

    // If reduced-motion is preferred, the timeline isn't created 
    // and the opacity remains natively at 1.0.

    return () => mm.revert();
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative w-full flex items-center justify-center min-h-[100dvh] bg-background px-6 py-24 z-10 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <p 
          ref={textRef} 
          className="text-4xl md:text-5xl lg:text-[5vw] font-bold leading-[1.2] tracking-tighter text-foreground"
        >
          The future belongs to those who <span className="text-accent">automate the ordinary</span>. We build intelligent platforms and custom software that multiply your most valuable asset: <span className="text-accent">time</span>.
        </p>
      </div>
    </section>
  );
}
