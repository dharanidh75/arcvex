import React from 'react';
import { motion } from 'framer-motion';

export default function CinematicWorkSection({ projects }) {
  return (
    <section 
      className="relative w-full bg-background min-h-screen py-24 md:py-48 overflow-hidden" 
      id="work"
    >
      {/* Exaggerated Minimalism Header */}
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-24 mb-24 md:mb-40">
        <p className="text-accent uppercase tracking-[0.3em] font-bold text-xs md:text-sm mb-6 ml-2">
          Featured Case Studies
        </p>
        <h2 className="text-[clamp(3.5rem,10vw,12rem)] font-black tracking-[-0.05em] text-foreground leading-[0.8] uppercase max-w-5xl">
          Proven <br/> Results.
        </h2>
        <p className="text-foreground/60 text-lg md:text-2xl max-w-2xl mt-12 font-medium">
          We don't just build beautiful interfaces; we engineer digital products that drive measurable business growth and user engagement.
        </p>
      </div>

      {/* Alternating Feature Layout (Client-Focused) */}
      <div className="flex flex-col w-full">
        {projects.map((project, i) => {
          const isEven = i % 2 === 0;

          return (
            <div 
              key={i}
              className={`flex flex-col md:flex-row w-full items-stretch min-h-[80vh] border-t border-foreground/10 group ${
                !isEven ? 'md:flex-row-reverse' : ''
              }`}
            >
              {/* Text & Metrics Column */}
              <div className="w-full md:w-1/2 flex flex-col justify-center p-8 md:p-16 lg:p-24 xl:p-32 bg-background transition-colors duration-500 group-hover:bg-foreground/[0.02]">
                <div className="flex flex-col">
                  {/* Category & Number */}
                  <div className="flex items-center justify-between mb-8">
                    <span className="text-accent font-bold tracking-widest uppercase text-sm">
                      {project.category}
                    </span>
                    <span className="text-foreground/20 font-black text-4xl">
                      0{i + 1}
                    </span>
                  </div>

                  {/* Massive Title */}
                  <h3 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground leading-[1.1] mb-8">
                    {project.title}
                  </h3>

                  {/* Client-Focused Metrics / Description */}
                  <p className="text-foreground/70 text-lg md:text-xl leading-relaxed mb-10 max-w-xl">
                    {project.description || "Delivered a comprehensive digital transformation that streamlined user workflows, enhanced engagement metrics, and established a scalable foundation for future growth."}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-3 mb-12">
                    {project.features.map((feat, idx) => (
                      <span key={idx} className="px-4 py-2 rounded-full border border-foreground/20 text-xs font-semibold text-foreground/80 tracking-wide uppercase">
                        {feat}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  <button className="self-start flex items-center gap-4 text-foreground font-bold text-sm tracking-widest uppercase group/btn">
                    <span className="border-b-2 border-transparent group-hover/btn:border-accent transition-colors pb-1">Read Case Study</span>
                    <span className="w-8 h-8 rounded-full border border-foreground/20 flex items-center justify-center group-hover/btn:bg-accent group-hover/btn:border-accent group-hover/btn:text-white transition-all">
                      →
                    </span>
                  </button>
                </div>
              </div>

              {/* Video Column - Visible by default for clients! */}
              <div className="w-full md:w-1/2 relative h-[50vh] md:h-auto overflow-hidden bg-foreground/5">
                <motion.div 
                  className="absolute inset-0 w-full h-full"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <video 
                    src={project.video} 
                    autoPlay 
                    loop 
                    muted 
                    playsInline 
                    className="w-full h-full object-cover"
                  />
                  {/* Subtle gradient overlay to ensure the border feels cohesive */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                </motion.div>
              </div>

            </div>
          );
        })}
      </div>
    </section>
  );
}
