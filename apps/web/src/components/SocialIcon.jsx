import React from 'react';

export default function SocialIcon({ href, icon: Icon, ariaLabel }) {
  return (
    <a
      href={href}
      aria-label={ariaLabel}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative w-12 h-12 rounded-full double-bezel-outer flex items-center justify-center active:scale-95 transition-spring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
    >
      <div className="absolute inset-1 rounded-full double-bezel-inner flex items-center justify-center text-foreground/50 transition-spring group-hover:text-foreground group-hover:bg-black/5 group-hover:scale-105">
        <Icon size={18} className="transition-spring group-hover:-translate-y-[1px]" />
      </div>
    </a>
  );
}
