import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, ShieldCheck, RefreshCw, Rocket, Brain, Palette, Code, TrendingUp, Zap, Smartphone, ArrowRight, Share2, MessageCircle, Link, Search, Bot, Monitor } from 'lucide-react';
import { Instagram, Linkedin, XIcon } from '../components/BrandIcons';
import ServiceCard from '../components/ServiceCard';
import ProjectCard from '../components/ProjectCard';
import SocialIcon from '../components/SocialIcon';

import { Turnstile } from '@marsidev/react-turnstile';

const video1 = null;
const video2 = null;
const video3 = null;
const video4 = null;
const video5 = null;
const video6 = null;

// Mock Data
const services = [
  {
    title: 'Search Engine Optimization',
    description: 'We optimize your website through keyword research, on-page SEO, technical optimization, content strategy, and performance improvements to increase search rankings, attract qualified traffic, and grow your online presence.',
    icon: Search,
    variant: 'default',
  },
  {
    title: 'Web Development',
    description: 'We design and develop responsive websites, business portals, eCommerce platforms, and custom web applications that deliver fast performance, strong security, and seamless user experiences.',
    icon: Code,
    variant: 'muted',
  },
  {
    title: 'AI Solutions',
    description: 'We build AI-powered solutions including intelligent chatbots, AI agents, multi-agent systems, generative AI applications, workflow automation, and custom AI integrations that help businesses automate processes, improve productivity, and deliver smarter customer experiences.',
    icon: Brain,
    variant: 'muted',
  },
  {
    title: 'Bot Development',
    description: 'We build intelligent bots for WhatsApp, Telegram, Discord, and business platforms to automate customer support, streamline workflows, send notifications, and improve user engagement.',
    icon: Bot,
    variant: 'default',
  },
  {
    title: 'App Development',
    description: 'We develop native and cross-platform Android and iOS applications with modern UI, secure architecture, API integration, and optimized performance to help businesses connect with users everywhere.',
    icon: Smartphone,
    variant: 'muted',
  },
  {
    title: 'Software Applications',
    description: 'We develop custom software applications tailored to your business, including billing systems, management tools, workflow automation, and industry-specific solutions that improve efficiency and support business growth.',
    icon: Monitor,
    variant: 'muted',
  },
];

const projects = [
  {
    title: 'Intelligent AI Systems',
    category: 'ABOUT OUR AI SOLUTIONS',
    image: 'https://picsum.photos/seed/reshub/800/600',
    video: video1,
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
    video: video2,
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
    video: video3,
    description: [
      'From immersive 3D experiences to high-converting business websites, we build modern web platforms that combine stunning visuals, smooth interactions, and exceptional performance.'
    ],
    features: ['3D Experiences', 'Product Websites', 'Business Platforms'],
    technologies: ['React', 'Vite', 'Tailwind CSS'],
    results: 'High performance and seamless user experiences.',
    ctaUrl: '#',
  },
  {
    title: 'Bots',
    category: 'AUTOMATION',
    image: 'https://picsum.photos/seed/bots/800/600',
    video: video4,
    description: [
      'We build intelligent automation that works behind the scenes—from customer conversations and authentication to order tracking, notifications, and business workflows that save time and improve every interaction.'
    ],
    features: ['Instagram Bots', 'WhatsApp Bots', 'Telegram Bots', 'Discord Bots'],
    technologies: ['Python', 'Node.js', 'OpenAI'],
    results: '24/7 Support availability.',
    ctaUrl: '#',
  },
  {
    title: 'App Development',
    category: 'MOBILE EXPERIENCES',
    image: 'https://picsum.photos/seed/appdev/800/600',
    video: video5,
    description: [
      'From consumer apps to enterprise platforms, we create mobile experiences that combine intuitive design, smooth interactions, and performance users love.'
    ],
    features: ['Business Apps', 'Consumer Apps', 'Enterprise Mobility'],
    technologies: ['React Native', 'Flutter'],
    results: 'High user engagement on mobile.',
    ctaUrl: '#',
  },
  {
    title: 'Software Applications',
    category: 'CUSTOM SOFTWARE',
    image: 'https://picsum.photos/seed/software/800/600',
    video: video6,
    description: [
      'From internal business platforms to enterprise systems, we build software that simplifies operations, improves productivity, and scales with growing businesses.'
    ],
    features: ['Business Platforms', 'Enterprise Systems', 'Internal Tools'],
    technologies: ['Java', 'C#', 'Cloud infrastructure'],
    results: 'Streamlined business operations.',
    ctaUrl: '#',
  },
];

export default function MobileHomePage() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeService, setActiveService] = useState(0);
  
  // Form State
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '', captchaToken: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });
  const [turnstileKey, setTurnstileKey] = useState(0);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: '', message: '' });

    try {
      const rawApiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
      const apiUrl = rawApiUrl.replace(/\/+$/, '');
      const response = await fetch(`${apiUrl}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus({ type: 'success', message: 'Message sent successfully!' });
        setFormData({ name: '', email: '', subject: '', message: '', captchaToken: '' });
        setTurnstileKey(prev => prev + 1);
      } else {
        setSubmitStatus({ type: 'error', message: data.detail || 'Failed to send message.' });
      }
    } catch (error) {
      setSubmitStatus({ type: 'error', message: 'An error occurred. Please try again later.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-[100dvh] bg-background text-foreground overflow-clip selection:bg-accent selection:text-white">

      {/* Massive Typography Hero Section for Mobile */}
      <section className="relative min-h-[100dvh] flex flex-col justify-center pt-24 pb-20 px-4 sm:px-6">
        
        {/* Mobile Background Logo at 30-40% opacity */}
        <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
          <img 
            src="/logo.png" 
            alt="Arcvex Logo" 
            className="w-[80%] max-w-[300px] object-contain opacity-35"
          />
        </div>

        <div className="relative z-10 w-full flex flex-col items-start mt-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-foreground/60 font-serif italic text-xl tracking-wide mb-4">
              We build digital futures.
            </p>
            {/* The Logo Animation was requested to be removed from Nav and Left only as ARCVEX, which we did in Header.jsx */}
            <h1 className="text-[clamp(4rem,20vw,7rem)] leading-[0.85] font-extrabold tracking-tighter mb-8 -ml-1 text-foreground">
              ARCVEX<span className="text-accent">.</span>
            </h1>
          </motion.div>
          
          <div className="flex flex-col gap-8 items-start w-full mt-4">
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-lg sm:text-xl text-foreground/80 leading-[1.4] max-w-lg font-serif" 
              style={{ fontFamily: '"Instrument Serif", serif' }}
            >
              We engineer custom software, beautiful web platforms, and intelligent AI systems that help businesses scale with precision.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.32, 0.72, 0, 1] }}
              className="w-full sm:w-auto"
            >
              <a
                href="#work"
                className="group w-full relative inline-flex items-center justify-center px-8 py-4 bg-foreground text-background rounded-full font-medium overflow-hidden active:scale-[0.98] transition-spring shadow-xl"
              >
                <span className="relative z-10 flex items-center gap-3 text-lg">
                  Explore Our Work
                  <div className="w-8 h-8 rounded-full bg-background/20 flex items-center justify-center group-hover:translate-x-1 group-hover:-translate-y-[1px] group-hover:scale-105 transition-spring">
                    <ArrowRight size={16} strokeWidth={2.5} />
                  </div>
                </span>
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 relative px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-6">
          {/* Visuals - Bento Box */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="h-[350px] double-bezel-outer p-2"
          >
            <div className="double-bezel-inner w-full h-full overflow-hidden relative">
              <img
                src="/about-image.webp"
                alt="ArcVex Workspace"
                loading="lazy"
                className="w-full h-full object-cover transition-slower hover:scale-105"
              />
            </div>
          </motion.div>

          {/* Copy - Side Bento Box */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="flex flex-col justify-center space-y-6 bg-black/5 p-8 rounded-3xl border border-black/5"
          >
            <div>
              <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent text-xs font-bold uppercase tracking-[0.2em] mb-4">
                Who We Are
              </span>
              <h2 className="text-3xl font-extrabold tracking-tight text-foreground leading-[1.1] mb-5">
                Engineering Digital Solutions.
              </h2>
              <div className="space-y-4">
                <p className="text-lg text-foreground/70 leading-relaxed font-serif" style={{ fontFamily: '"Instrument Serif", serif' }}>
                  ArcVex is a technology-driven software agency dedicated to building innovative digital solutions for modern businesses. We specialize in web development, custom software applications, mobile app development, UI/UX design, search engine optimization (SEO), and AI-powered bot development.
                </p>
                <p className="text-lg text-foreground/70 leading-relaxed font-serif" style={{ fontFamily: '"Instrument Serif", serif' }}>
                  By combining technical expertise, creativity, and a client-first approach, we transform ideas into reliable, high-quality solutions that help businesses grow with confidence.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 relative px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-black/5 text-foreground/80 text-xs font-bold uppercase tracking-[0.2em] mb-4">
            Our Capabilities
          </span>
          <h2 className="text-4xl font-extrabold tracking-tighter text-foreground leading-[1.1]">
            Build, Scale & Grow.
          </h2>
        </motion.div>
        
        <div className="flex flex-col border-b border-black/10">
          {services.map((service, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: (index % 3) * 0.1 }}
            >
              <ServiceCard 
                index={index} 
                {...service} 
                isActive={activeService === index}
                onHover={() => setActiveService(index)}
              />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Standard Vertical Work Section for Mobile */}
      <section className="py-24 px-4 sm:px-6" id="work">
        <div className="mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-black/5 text-foreground/80 text-xs font-bold uppercase tracking-[0.2em] mb-4">
            Our Work
          </span>
          <h2 className="text-4xl font-extrabold tracking-tighter text-foreground leading-[1.1] mb-4">
            Everything we build.
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl">
            Discover how we've helped businesses transform their digital presence and streamline operations.
          </p>
        </div>
        <div className="flex flex-col gap-8">
          {projects.map((project, index) => (
            <div key={index} className="w-full flex">
               <ProjectCard 
                 project={project}
                 onClick={() => setSelectedProject(project)}
               />
            </div>
          ))}
        </div>
      </section>

      {/* Support Section */}
      <section id="support" className="py-24 relative px-4 sm:px-6 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent text-xs font-bold uppercase tracking-[0.2em] mb-4">
            Assurance
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tighter text-foreground mb-4">
            6-Month Complimentary Support
          </h2>
          <p className="text-lg text-foreground/70 leading-relaxed font-serif" style={{ fontFamily: '"Instrument Serif", serif' }}>
            Every ArcVex project includes 6 months of complimentary technical support to keep your application stable, reliable, and smooth.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="double-bezel-outer"
          >
            <div className="double-bezel-inner h-full p-8 flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mb-6">
                  <CheckCircle className="w-7 h-7 text-accent" />
                </div>
                <h3 className="text-xl font-extrabold text-foreground mb-6 tracking-tight">Included for 6 Months</h3>
                <ul className="space-y-4">
                  {['Bug Fixes & Maintenance', 'Technical Assistance', 'Email & Remote Support', 'Issue Monitoring'].map((text, i) => (
                    <li key={i} className="flex items-start space-x-3 text-base text-foreground/80">
                      <CheckCircle className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                      <span>{text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="double-bezel-outer"
          >
            <div className="double-bezel-inner h-full p-8 flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-black/5 flex items-center justify-center mb-6">
                  <ShieldCheck className="w-7 h-7 text-foreground/80" />
                </div>
                <h3 className="text-xl font-extrabold text-foreground mb-6 tracking-tight">Additional Services</h3>
                <ul className="space-y-4">
                  {[
                    { icon: ShieldCheck, text: 'Security Updates' },
                    { icon: Zap, text: 'Performance Optimization' },
                    { icon: RefreshCw, text: 'Platform Updates' },
                    { icon: Rocket, text: 'Feature Enhancements' }
                  ].map((item, i) => (
                    <li key={i} className="flex items-start space-x-3 text-base text-foreground/70">
                      <item.icon className="w-5 h-5 text-foreground/50 shrink-0 mt-0.5" />
                      <span>{item.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 relative px-4 sm:px-6 overflow-hidden">
        <div className="double-bezel-outer p-1.5">
          <div className="double-bezel-inner bg-foreground text-background p-8 sm:p-10 flex flex-col gap-12 relative overflow-hidden">
            {/* Subtle light orb in the dark container */}
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-accent/20 rounded-full blur-[80px] pointer-events-none transform translate-x-1/2 -translate-y-1/2" />

            {/* Left Panel */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10"
            >
              <h2 className="text-4xl font-extrabold tracking-tighter text-background mb-6 leading-[1.1]">
                Let's Build <br /> <span className="text-accent">Together.</span>
              </h2>
              <p className="text-xl text-background/70 leading-relaxed font-serif mb-8" style={{ fontFamily: '"Instrument Serif", serif' }}>
                Every successful product starts with a simple conversation. We're ready to understand your goals.
              </p>

              <div className="space-y-6">
                <div>
                  <p className="text-xs font-bold text-background/50 uppercase tracking-[0.2em] mb-1">Email</p>
                  <a href="mailto:hello@arcvex.in" className="text-xl font-medium text-background hover:text-accent transition-colors">
                    hello@arcvex.in
                  </a>
                </div>
                <div>
                  <p className="text-xs font-bold text-background/50 uppercase tracking-[0.2em] mb-1">Phone</p>
                  <a href="tel:+919363778981" className="text-xl font-medium text-background hover:text-accent transition-colors">
                    +91 93637 78981
                  </a>
                </div>
                
                <div className="flex gap-4 pt-4">
                  <SocialIcon href="https://instagram.com/arcvex" icon={Instagram} ariaLabel="Instagram" />
                  <SocialIcon href="https://linkedin.com/company/arcvex" icon={Linkedin} ariaLabel="LinkedIn" />
                  <SocialIcon href="https://x.com/arcvex" icon={XIcon} ariaLabel="X (Twitter)" />
                </div>
              </div>
            </motion.div>

            {/* Right Panel (Form) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="relative z-10 mt-4"
            >
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-background/70">Name</label>
                    <input
                      id="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full bg-background/5 border-b border-background/20 px-0 py-3 text-background placeholder-background/30 focus:border-accent focus:outline-none transition-colors rounded-none"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-background/70">Email</label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full bg-background/5 border-b border-background/20 px-0 py-3 text-background placeholder-background/30 focus:border-accent focus:outline-none transition-colors rounded-none"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium text-background/70">Subject</label>
                  <input
                    id="subject"
                    required
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full bg-background/5 border-b border-background/20 px-0 py-3 text-background placeholder-background/30 focus:border-accent focus:outline-none transition-colors rounded-none"
                    placeholder="How can we help?"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-background/70">Message</label>
                  <textarea
                    id="message"
                    required
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full bg-background/5 border-b border-background/20 px-0 py-3 text-background placeholder-background/30 focus:border-accent focus:outline-none transition-colors rounded-none resize-none"
                    placeholder="Tell us about your project..."
                  />
                </div>
                
                <div className="pt-2 flex justify-center w-full overflow-hidden">
                  <Turnstile
                    siteKey="1x00000000000000000000AA"
                    key={turnstileKey}
                    onSuccess={(token) => setFormData(prev => ({ ...prev, captchaToken: token }))}
                    onError={() => setSubmitStatus({ type: 'error', message: 'Captcha verification failed. Please try again.' })}
                    options={{
                      theme: 'dark',
                    }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group relative w-full inline-flex items-center justify-center px-8 py-4 bg-background text-foreground rounded-full font-medium overflow-hidden active:scale-[0.98] transition-spring disabled:opacity-70 mt-4"
                >
                  <span className="relative z-10 flex items-center gap-3">
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                    {!isSubmitting && (
                      <div className="w-8 h-8 rounded-full bg-foreground/10 flex items-center justify-center group-hover:translate-x-1 group-hover:-translate-y-[1px] group-hover:scale-105 transition-spring">
                        <ArrowRight size={16} strokeWidth={2.5} />
                      </div>
                    )}
                  </span>
                </button>

                {submitStatus.message && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-4 rounded-xl text-center text-sm font-medium ${submitStatus.type === 'success' ? 'bg-accent/20 text-accent' : 'bg-destructive/20 text-destructive'}`}
                  >
                    {submitStatus.message}
                  </motion.div>
                )}
              </form>
            </motion.div>
          </div>
        </div>
        
        <div className="mt-8 text-center pb-8">
          <p className="text-xs text-foreground/40 font-medium">
            &copy; {new Date().getFullYear()} ArcVex Studio. All rights reserved.
          </p>
        </div>
      </section>
    </main>
  );
}
