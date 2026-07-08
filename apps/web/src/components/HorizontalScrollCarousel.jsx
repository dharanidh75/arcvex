import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import ProjectCard from "./ProjectCard";

export default function HorizontalScrollCarousel({ projects, setSelectedProject }) {
  const targetRef = useRef(null);
  const trackRef = useRef(null);
  const [scrollRange, setScrollRange] = useState(0);

  useEffect(() => {
    const updateRange = () => {
      if (trackRef.current) {
        setScrollRange(trackRef.current.scrollWidth - window.innerWidth);
      }
    };

    updateRange();

    const observer = new ResizeObserver(updateRange);
    if (trackRef.current) {
      observer.observe(trackRef.current);
    }

    window.addEventListener("resize", updateRange);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateRange);
    };
  }, [projects]);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  });

  // Calculate the horizontal translation dynamically in pixels.
  const x = useTransform(scrollYProgress, (progress) => -progress * scrollRange);

  return (
    <div id="work">
      {/* Desktop / Tablet: Horizontal Pinned Scroll */}
      <section ref={targetRef} className="relative h-[500vh] bg-black/30 hidden md:block">
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">

          {/* Scrolling Track */}
          <motion.div
            ref={trackRef}
            style={{ x }}
            className="flex h-full items-center gap-12 px-6 lg:px-16 w-max"
          >

            {/* 1st Item: Static Text Content */}
            <div className="w-[80vw] md:w-[45vw] shrink-0 pr-8 self-start pt-24 md:pt-32 flex flex-col">
              <div className="w-[110%] border-b border-accent/40 pb-4 mb-8">
                <p className="text-accent font-serif uppercase tracking-[0.25em] text-xl md:text-2xl">
                  Work
                </p>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight text-white mb-8">
                A showcase of our recent partnerships and the digital experiences we've brought to life.
              </h2>
              <p className="text-lg md:text-xl text-white/70 leading-relaxed max-w-2xl mb-8" style={{ fontFamily: '"PT Serif", serif' }}>
                From custom software and mobile applications to business websites, AI-powered bots, and enterprise solutions, every project reflects our commitment to innovation, quality, and delivering measurable results for our clients.
              </p>
            </div>

            {/* Project Cards */}
            {projects.map((project, index) => (
              <div key={index} className="w-[400px] lg:w-[500px] shrink-0">
                <ProjectCard
                  project={project}
                  index={index}
                // onClick={() => window.open(project.url || '#', '_blank')}
                />
              </div>
            ))}

            {/* Final Item: Closing Text */}
            <div className="w-[85vw] md:w-[50vw] shrink-0 pl-6 md:pl-12 pr-8 md:pr-24 flex flex-col justify-center">
              <div className="w-full border-b border-accent/40 pb-4 mb-8">
                <p className="text-accent font-serif uppercase tracking-[0.25em] text-xl md:text-2xl">
                  Impact
                </p>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight text-white mb-6">
                Building Software That Creates Real Business Impact.
              </h2>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mobile: Vertical Standard Scroll */}
      <section id="work-mobile" className="py-24 md:hidden relative bg-black/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-left mb-16"
          >
            <div className="w-full border-b border-accent/40 pb-4 mb-8">
              <p className="text-accent font-serif uppercase tracking-[0.25em] text-xl">
                Work
              </p>
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-white mb-6">
              A showcase of our recent partnerships and the digital experiences we've brought to life.
            </h2>
          </motion.div>

          <div className="flex flex-col gap-8">
            {projects.map((project, index) => (
              <ProjectCard
                key={index}
                project={project}
                index={index}
                onClick={() => setSelectedProject(project)}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
