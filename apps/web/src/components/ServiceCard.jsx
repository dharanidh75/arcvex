import { motion } from 'framer-motion';
import { cn } from '../lib/utils';

export default function ServiceCard({ title, description, icon: Icon, variant = 'default', index = 0 }) {
  const baseClasses = "h-full w-full group p-8 rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(149,252,137,0.1)] cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent outline-offset-2";
  
  const variants = {
    default: "bg-card border border-white/5 hover:border-accent",
    muted: "bg-muted/50 hover:bg-muted hover:border-accent border border-transparent",
    accent: "bg-accent/5 border border-accent/20 hover:border-accent",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={cn(baseClasses, variants[variant])}
      tabIndex={0}
    >
      <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent group-hover:scale-110 transition-all duration-300">
        {Icon && <Icon className="w-7 h-7 text-accent group-hover:text-accent-foreground transition-all duration-300" />}
      </div>
      
      <h3 className="text-xl font-semibold mb-3 text-white group-hover:text-accent transition-all duration-300">
        {title}
      </h3>
      
      <p className="text-white/60 leading-relaxed font-serif text-lg group-hover:text-white/80 transition-all duration-300">
        {description}
      </p>
    </motion.div>
  );
}
