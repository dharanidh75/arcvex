import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '../lib/utils';

export default function ProjectCard({ project, onClick, index = 0, offset = false }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, filter: 'blur(10px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: (index % 2) * 0.1 }}
      className={cn(
        "group relative block cursor-pointer outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent",
        offset && "md:mt-24"
      )}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
    >
      <div className="double-bezel-outer transition-spring group-hover:scale-[0.98]">
        <div className="double-bezel-inner overflow-hidden relative aspect-[4/5] md:aspect-[3/4] bg-muted w-full transition-spring">
          {project.video && !navigator.userAgent.includes("ReactSnap") ? (
            <video
              src={project.video}
              onLoadedData={(e) => {
                e.target.playbackRate = 1.2;
              }}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover transition-slower group-hover:scale-110"
            />
          ) : (
            <img
              src={project.image || `https://picsum.photos/seed/${project.title.replace(/\s/g, '')}/800/1000`}
              alt={project.title}
              className="w-full h-full object-cover transition-slower group-hover:scale-110"
            />
          )}

          {/* Luxury Minimalist Overlay (keeps text legible) */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-90 transition-spring" />

          {/* Floating Icon Button */}
          <div className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-spring delay-75 shadow-2xl">
            <ArrowUpRight size={20} className="group-hover:rotate-12 transition-transform duration-300" />
          </div>

          {/* Content */}
          <div className="absolute bottom-0 left-0 w-full p-8 flex flex-col justify-end text-left z-10">
            <h3 className="text-3xl md:text-4xl font-extrabold text-white mb-2 group-hover:-translate-y-1 transition-spring tracking-tight">
              {project.title}
            </h3>
            <div className="overflow-hidden">
              <p className="text-white/80 font-serif text-lg tracking-wide opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-spring delay-75" style={{ fontFamily: '"Instrument Serif", serif' }}>
                {project.category}
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}