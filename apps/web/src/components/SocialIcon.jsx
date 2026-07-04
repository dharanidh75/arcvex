import { motion } from 'framer-motion';

export default function SocialIcon({ href, icon: Icon }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:bg-accent/10 hover:text-accent hover:border-accent/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      whileHover={{ scale: 1.15, y: -4 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <Icon size={18} />
    </motion.a>
  );
}
