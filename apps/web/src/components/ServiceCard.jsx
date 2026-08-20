import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { cn } from '../lib/utils';

export default function ServiceCard({ title, description, icon: Icon, index = 0, isActive, onHover }) {
  return (
    <div
      className={cn(
        "group relative w-full border-t border-black/10 cursor-pointer transition-colors duration-500",
        isActive ? "bg-black/[0.02]" : "hover:bg-black/[0.02]"
      )}
      onMouseEnter={onHover}
      tabIndex={0}
    >
      <div className="py-8 md:py-12 px-4 md:px-8 flex flex-col md:flex-row md:items-center justify-between gap-8 w-full max-w-[1400px] mx-auto">
        {/* Left Side: Number & Title */}
        <div className="flex items-center gap-6 md:gap-12 w-full md:w-1/2">
          <span className="text-foreground/30 font-serif text-2xl md:text-3xl font-bold italic w-12" style={{ fontFamily: '"Instrument Serif", serif' }}>
            0{index + 1}
          </span>
          <h3 className={cn(
            "text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tighter text-foreground transition-transform duration-500",
            isActive ? "md:translate-x-4 text-accent" : "group-hover:translate-x-2"
          )}>
            {title}
          </h3>
        </div>

        {/* Right Side: Description & Icon */}
        <div className="flex items-start md:items-center justify-between gap-8 w-full md:w-1/2 pl-12 md:pl-0">
          <div className="overflow-hidden">
            <AnimatePresence initial={false}>
              {isActive ? (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
                >
                  <p className="text-foreground/70 leading-relaxed font-serif text-lg md:text-xl py-2" style={{ fontFamily: '"Instrument Serif", serif' }}>
                    {description}
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-sm font-bold tracking-widest uppercase text-accent group-hover:gap-4 transition-all duration-300">
                    Explore <ArrowRight size={16} />
                  </div>
                </motion.div>
              ) : (
                <div className="h-0 md:h-auto overflow-hidden">
                   <p className="text-foreground/0 leading-relaxed font-serif text-lg md:text-xl md:opacity-0 transition-opacity duration-300 h-0 hidden md:block">
                     {description}
                   </p>
                </div>
              )}
            </AnimatePresence>
          </div>

          <div className="hidden md:flex shrink-0 w-16 h-16 rounded-full border border-black/10 items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:bg-accent group-hover:border-transparent group-hover:shadow-2xl">
            {Icon && <Icon className={cn(
              "w-6 h-6 transition-colors duration-500",
              isActive ? "text-background" : "text-foreground group-hover:text-background"
            )} />}
          </div>
        </div>
      </div>
    </div>
  );
}
