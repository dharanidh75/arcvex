import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '../lib/utils';

export default function ProjectCard({ project, onClick, index = 0, offset = false }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: (index % 2) * 0.1 }}
      className={cn(
        "group relative block cursor-pointer outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent rounded-2xl overflow-hidden",
        offset && "md:mt-12"
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
      <div className="aspect-[4/3] w-full overflow-hidden relative bg-muted">
        {project.video ? (
          <video
            src={project.video}
            onLoadedData={(e) => {
              e.target.playbackRate = 1.5;
            }}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover transition-slow group-hover:scale-105"
          />
        ) : (
          <img
            src={project.image || `https://picsum.photos/seed/${project.title.replace(/\s/g,'')}/800/600`}
            alt={project.title}
            className="w-full h-full object-cover transition-slow group-hover:scale-105"
          />
        )}
        
        {/* Sleek Minimalist Overlay */}
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black via-black/60 to-transparent opacity-80 group-hover:opacity-100 transition-smooth" />
        
        {/* Content */}
        <div className="absolute bottom-0 left-0 w-full p-8 flex flex-col justify-end">
          <h3 className="text-3xl font-extrabold text-white mb-1 group-hover:-translate-y-1 transition-smooth">
            {project.title}
          </h3>
          <p className="text-accent/90 text-sm font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 group-hover:-translate-y-1 transition-smooth delay-75">
            {project.category}
          </p>
        </div>

      </div>
    </motion.div>
  );
}
