import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, ArrowUpRight } from 'lucide-react';

export default function ProjectModal({ project, isOpen, onClose }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && project && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-12">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="relative w-full max-w-5xl max-h-[100vh] sm:max-h-[90vh] bg-card border border-white/10 rounded-2xl overflow-y-auto shadow-2xl flex flex-col z-10"
            role="dialog"
            aria-modal="true"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 w-10 h-10 bg-black/50 hover:bg-black/80 text-white rounded-full flex items-center justify-center backdrop-blur-md transition-smooth focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
            >
              <X size={20} />
            </button>

            {/* Hero Image */}
            <div className="w-full h-64 sm:h-80 md:h-96 relative bg-muted shrink-0">
              <img
                src={project.image || `https://picsum.photos/seed/${project.title.replace(/\s/g,'')}/1200/800`}
                alt={project.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8">
                <span className="px-3 py-1 bg-accent/20 text-accent text-xs font-bold uppercase tracking-widest rounded-full border border-accent/30 backdrop-blur-md">
                  {project.category}
                </span>
                <h2 className="text-4xl md:text-5xl font-extrabold text-white mt-4">
                  {project.title}
                </h2>
              </div>
            </div>

            {/* Details */}
            <div className="p-8 md:p-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                <div>
                  <h3 className="text-xl font-bold text-white mb-4">Overview</h3>
                  <div className="space-y-4 text-white/70 leading-relaxed">
                    {project.description?.map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                  </div>
                </div>

                {project.features && (
                  <div>
                    <h3 className="text-xl font-bold text-white mb-4">Key Deliverables</h3>
                    <ul className="space-y-3">
                      {project.features.map((feature, i) => (
                        <li key={i} className="flex items-start text-white/70">
                          <CheckCircle2 size={20} className="text-accent mr-3 shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <div className="space-y-8">
                {project.technologies && (
                  <div className="p-6 rounded-xl bg-white/5 border border-white/5">
                    <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
                      Technologies
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, i) => (
                        <span key={i} className="px-3 py-1 bg-black/40 text-white/80 text-xs rounded-md border border-white/10">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {project.results && (
                  <div className="p-6 rounded-xl bg-accent/10 border border-accent/20">
                    <h4 className="text-sm font-bold text-accent uppercase tracking-wider mb-4">
                      Impact
                    </h4>
                    <p className="text-white font-medium">
                      {project.results}
                    </p>
                  </div>
                )}

                {project.ctaUrl && (
                  <a
                    href={project.ctaUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-between px-6 py-4 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-smooth group"
                  >
                    <span>View Live Site</span>
                    <ArrowUpRight size={20} className="group-hover:rotate-45 transition-transform duration-300" />
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
