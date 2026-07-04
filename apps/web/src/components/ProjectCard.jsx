import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '../lib/utils';

export default function ProjectCard({ project, onClick, index = 0, offset = false }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: (index % 2) * 0.1 }}
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
        <img
          src={project.image || `https://picsum.photos/seed/${project.title.replace(/\s/g,'')}/800/600`}
          alt={project.title}
          className="w-full h-full object-cover transition-slow group-hover:scale-105"
        />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80 group-hover:opacity-100 transition-smooth" />
        
        {/* Content */}
        <div className="absolute inset-0 p-8 flex flex-col justify-end">
          <p className="text-accent text-sm font-bold uppercase tracking-widest mb-2 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-smooth">
            {project.category}
          </p>
          <h3 className="text-3xl font-extrabold text-white">
            {project.title}
          </h3>
        </div>

        {/* Floating Arrow Badge */}
        <div className="absolute top-8 right-8 w-12 h-12 bg-accent text-accent-foreground rounded-full flex items-center justify-center opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100 transition-smooth group-hover:glow-shadow">
          <ArrowUpRight size={24} className="group-hover:rotate-45 transition-transform duration-300" />
        </div>
      </div>
    </motion.div>
  );
}
