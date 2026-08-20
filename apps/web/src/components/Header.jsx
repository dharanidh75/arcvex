import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';

gsap.registerPlugin(useGSAP, ScrambleTextPlugin);

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const headerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Work', href: '#work' },
    { name: 'Support', href: '#support' },
    { name: 'Contact', href: '#contact' },
  ];

  const { contextSafe } = useGSAP({ scope: headerRef });

  const handleLinkHover = contextSafe((e, name) => {
    gsap.to(e.target, {
      duration: 0.4,
      scrambleText: { text: name, chars: 'upperAndLowerCase', speed: 0.5 },
      ease: 'power2.out'
    });
  });

  return (
    <>
      <header ref={headerRef} className="site-header fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-6 md:pt-8 pointer-events-none opacity-0 translate-y-[-100px]">
        <div 
          className={`pointer-events-auto flex items-center justify-between px-6 py-3 rounded-full transition-all duration-500 ${
            isScrolled ? 'glass-light w-full md:w-[600px]' : 'bg-transparent w-full md:w-[600px] md:glass-light'
          }`}
        >
          {/* Logo */}
          <a href="/" className="relative flex items-center h-8 group magnetic" data-magnetic-strength="0.2">
            <span 
              className="text-xl font-extrabold tracking-tight text-foreground transition-transform duration-500 group-hover:scale-105"
              onMouseEnter={(e) => handleLinkHover(e, 'ARCVEX.')}
            >
              ARCVEX<span className="text-accent">.</span>
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onMouseEnter={(e) => handleLinkHover(e, link.name)}
                className="px-4 py-2 rounded-full text-sm font-medium text-foreground/70 hover:text-foreground hover:bg-white/5 transition-colors duration-300 magnetic"
                data-magnetic-strength="0.1"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Mobile Hamburger Morph (Physics based CSS) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden relative w-10 h-10 flex flex-col justify-center items-center rounded-full bg-white/5 active:scale-90 transition-spring z-[60]"
            aria-label="Toggle menu"
          >
            <span className={`w-5 h-[1.5px] bg-foreground transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${mobileMenuOpen ? 'rotate-45 translate-y-[1.5px]' : '-translate-y-1'}`} />
            <span className={`w-5 h-[1.5px] bg-foreground transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${mobileMenuOpen ? '-rotate-45 -translate-y-[1.5px]' : 'translate-y-1'}`} />
          </button>
        </div>
      </header>

      {/* We are focusing on Hero right now, but leaving the basic mobile menu structure if needed */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[45] glass-modal flex flex-col justify-center items-center px-6">
          <nav className="flex flex-col space-y-6 text-center">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-4xl font-bold tracking-tight text-foreground hover:text-accent transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}
