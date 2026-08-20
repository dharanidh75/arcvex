import { useState, useEffect } from 'react';
import HeroSection from '../components/HeroSection';
import ServicesShowcase from '../components/ServicesShowcase';
import CinematicWorkSection from '../components/CinematicWorkSection';

// Keep the existing projects data for the CinematicWorkSection
const projects = [
  {
    title: 'Intelligent AI Systems',
    category: 'ABOUT OUR AI SOLUTIONS',
    image: 'https://picsum.photos/seed/reshub/800/600',
    description: [
      'From intelligent assistants to enterprise-grade automation, we build AI systems that understand, reason, and take action—helping businesses work faster, smarter, and at scale.',
    ],
    features: ['AI Chatbots', 'RAG Systems', 'AI Agents', 'Multi-Agent AI', 'Generative AI'],
    technologies: ['React', 'Next.js', 'Vercel'],
    results: 'Great success and improved user retention.',
    ctaUrl: '#',
    ctaText: 'Explore AI Solutions',
  },
  {
    title: 'Company AI Assistant',
    category: 'AI PLATFORM',
    image: 'https://picsum.photos/seed/medcode/800/600',
    description: [
      'A secure AI assistant built for organizations to search company knowledge, automate repetitive tasks, generate content, and improve team productivity.'
    ],
    features: ['Enterprise AI', 'RAG Search', 'AI Assistant', 'Automation'],
    technologies: ['Vue.js', 'Node.js', 'PostgreSQL'],
    results: 'Increased efficiency by 40%.',
    ctaUrl: '#',
  },
  {
    title: 'Web Development',
    category: 'WEB SOLUTIONS',
    image: 'https://picsum.photos/seed/webdev/800/600',
    description: [
      'From immersive 3D experiences to high-converting business websites, we build modern web platforms that combine stunning visuals, smooth interactions, and exceptional performance.'
    ],
    features: ['3D Experiences', 'Product Websites', 'Business Platforms'],
    technologies: ['React', 'Vite', 'Tailwind CSS'],
    results: 'High performance and seamless user experiences.',
    ctaUrl: '#',
  }
];

export default function DesktopHomePage() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <main className="bg-background text-foreground overflow-x-hidden selection:bg-accent selection:text-white">
      <HeroSection />
      <ServicesShowcase />
      {/* We keep CinematicWorkSection to show some more content, though it may need a dark theme pass later */}
      <CinematicWorkSection projects={projects} />
      
      {/* Minimal Footer placeholder matching the new dark theme */}
      <footer className="w-full py-12 border-t border-white/5 mt-32 text-center text-muted-foreground">
        <p className="text-sm font-medium tracking-wide uppercase">
          &copy; {new Date().getFullYear()} ArcVex Studio. All rights reserved.
        </p>
      </footer>
    </main>
  );
}
