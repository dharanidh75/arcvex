import { useState, useEffect } from 'react';

import { motion } from 'framer-motion';
import { CheckCircle, ShieldCheck, RefreshCw, Rocket, Brain, Palette, Code, TrendingUp, Zap, Smartphone, ArrowRight, Share2, MessageCircle, Link, Search, Bot, Monitor } from 'lucide-react';
import { Instagram, Linkedin, XIcon } from '../components/BrandIcons';
import ServiceCard from '../components/ServiceCard';
import ProjectCard from '../components/ProjectCard';
import ProjectModal from '../components/ProjectModal';
import CinematicWorkSection from '../components/CinematicWorkSection';
import SocialIcon from '../components/SocialIcon';

import { Turnstile } from '@marsidev/react-turnstile';

import video1 from "../assets/video/Reshub(1).mp4";
import video2 from '../assets/video/AI.mp4';
import video3 from '../assets/video/web.mp4';
import video4 from '../assets/video/BOTS.mp4';
import video5 from '../assets/video/App(1).mp4';
import video6 from '../assets/video/software.mp4';
import heroVideo from '../assets/video/looping_seamless.mp4';

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

export default function DesktopHomePage() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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
      const apiUrl = rawApiUrl.replace(/\/+$/, ''); // Remove any trailing slashes
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
    <main className="min-h-[100dvh]">

      {/* Hero Section */}
      <section className="relative min-h-[100dvh] flex items-center justify-center pt-20 overflow-hidden bg-black">
        {/* Background Video & Overlays */}
        <div className="absolute inset-0 z-0">
          {!navigator.userAgent.includes("ReactSnap") && !isMobile && (
            <motion.video
              src={heroVideo}
              className="w-full h-full object-cover pointer-events-none"
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              onLoadedData={() => setIsVideoLoaded(true)}
              initial={{ opacity: 0 }}
              animate={{ opacity: isVideoLoaded ? 1 : 0 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            >
              <track kind="captions" srcLang="en" label="English" />
            </motion.video>
          )}
          {!navigator.userAgent.includes("ReactSnap") && isMobile && (
            <img 
              src="/about-image.webp" 
              alt="Hero background" 
              className="w-full h-full object-cover pointer-events-none opacity-50"
            />
          )}
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-black/45" />
          {/* Bottom gradient fade into background */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 1, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-white font-serif text-xl md:text-2xl tracking-wide mb-3">
              We build digital futures
            </p>
            <h1 className="text-[clamp(3rem,13vw,10rem)] leading-[0.9] font-extrabold text-white tracking-tighter mb-8">
              ARCVEX<span className="text-accent">.</span>
            </h1>
            <p className="max-w-4xl mx-auto text-lg md:text-2xl text-white/70 mb-12 leading-relaxed font-serif" style={{ fontFamily: '"PT Serif", serif' }}>
              We build custom websites, business software, mobile applications, AI-powered bots, and intuitive digital experiences that help businesses streamline operations, strengthen their online presence, and grow with confidence.
            </p>
            <a
              href="#work"
              className="relative overflow-hidden inline-flex items-center px-8 py-4 bg-accent text-accent-foreground font-bold rounded-2xl transition-smooth group hover:glow-shadow"
            >
              <span className="absolute inset-0 w-full h-full bg-white origin-left transform scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100"></span>
              <span className="relative z-10 flex items-center group-hover:text-black transition-colors duration-300">
                <span className="mr-2">Explore Our Work</span>
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </a>
          </motion.div>
        </div>


      </section>



      {/* About Section */}
      <section id="about" className="py-24 bg-background relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
            {/* Visuals */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="h-full min-h-[400px] rounded-2xl bg-muted border border-border/50 overflow-hidden relative"
            >
              <img
                src="/about-image.webp"
                alt="ArcVex Workspace"
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Copy */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="flex flex-col justify-center space-y-6"
            >
              <div className="border-b border-accent/40 pb-4 mb-2">
                <p className="text-accent font-serif uppercase tracking-[0.25em] text-xl md:text-2xl">
                  Who We Are
                </p>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-6">
                Engineering Digital Solutions That Power Business Growth.
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed font-serif" style={{ fontFamily: '"PT Serif", serif' }}>
                ArcVex is a technology-driven software agency dedicated to building innovative digital solutions for modern businesses. We specialize in web development, custom software applications, mobile app development, UI/UX design, search engine optimization (SEO), and AI-powered bot development. Every solution we create is designed to simplify business operations, enhance user experiences, and help our clients grow with confidence.
              </p>
              <p className="text-xl text-muted-foreground leading-relaxed font-serif" style={{ fontFamily: '"PT Serif", serif' }}>
                ArcVex is powered by a passionate team of innovators dedicated to building exceptional digital products. By combining technical expertise, creativity, and a client-first approach, we transform ideas into reliable, high-quality solutions that help businesses grow with confidence.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-background relative">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-16"
          >
            <div className="w-full border-b border-accent/40 pb-4 mb-8">
              <p className="text-accent font-serif uppercase tracking-[0.25em] text-xl md:text-2xl">
                Our Services
              </p>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-12">
              Everything You Need to Build, Scale & Grow.
            </h2>
          </motion.div>
          <div className="flex flex-wrap justify-center gap-6">
            {services.map((service, index) => (
              <div key={index} className="w-full md:w-[calc(50%-0.75rem)] lg:w-[calc(33.333333%-1rem)] flex">
                <ServiceCard index={index} {...service} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <CinematicWorkSection projects={projects} />

      {/* Support & Maintenance Section */}
      <section id="support" className="py-24 bg-background relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-16"
          >
            <div className="w-full border-b border-accent/40 pb-4 mb-8">
              <p className="text-accent font-serif uppercase tracking-[0.25em] text-xl md:text-2xl">
                Support & Maintenance
              </p>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-6">
              6-Month Complimentary Support
            </h2>
            <p className="max-w-3xl mx-auto text-xl text-muted-foreground leading-relaxed font-serif" style={{ fontFamily: '"PT Serif", serif' }}>
              Every ArcVex project includes 6 months of complimentary technical support to help keep your application stable, reliable, and running smoothly after launch.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Card 1 */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="bg-card/40 border border-accent/50 hover:border-accent p-8 md:p-10 rounded-2xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(149,252,137,0.15)] group"
            >
              <div className="flex items-center space-x-4 mb-8">
                <CheckCircle className="w-8 h-8 text-accent" />
                <h3 className="text-2xl font-bold text-white group-hover:text-accent transition-colors">Included for 6 Months</h3>
              </div>

              <ul className="space-y-5">
                {[
                  'Bug Fixes & Maintenance',
                  'Technical Assistance',
                  'Email & Remote Support',
                  'Issue Monitoring & Troubleshooting'
                ].map((text, i) => (
                  <li key={i} className="flex items-start space-x-3 text-lg text-white/80">
                    <CheckCircle className="w-6 h-6 text-accent shrink-0 mt-0.5" />
                    <span>{text}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Card 2 */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
              className="bg-card/40 border border-white/10 hover:border-accent/50 p-8 md:p-10 rounded-2xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(149,252,137,0.1)] group"
            >
              <div className="flex items-center space-x-4 mb-8">
                <ShieldCheck className="w-8 h-8 text-white/80 group-hover:text-accent transition-colors" />
                <div>
                  <h3 className="text-2xl font-bold text-white group-hover:text-accent transition-colors">Additional Services</h3>
                </div>
              </div>

              <ul className="space-y-5">
                {[
                  { icon: ShieldCheck, text: 'Security Updates' },
                  { icon: Zap, text: 'Performance Optimization' },
                  { icon: RefreshCw, text: 'Platform & Technology Updates' },
                  { icon: Rocket, text: 'Feature Enhancements' }
                ].map((item, i) => (
                  <li key={i} className="flex items-start space-x-3 text-lg text-white/60 group-hover:text-white/80 transition-colors">
                    <item.icon className="w-6 h-6 text-accent/70 group-hover:text-accent shrink-0 mt-0.5 transition-colors" />
                    <span>{item.text}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
            className="text-center mt-12"
          >
            <p className="text-sm text-white/40 max-w-2xl mx-auto">
              Complimentary support includes maintenance, bug fixes, and technical assistance for the first 6 months after project delivery. Additional services such as feature enhancements, security improvements, performance optimization, and platform upgrades are available upon request. Contact <a href="mailto:support@arcvex.in" className="text-accent hover:underline font-medium">support@arcvex.in</a> for assistance.
            </p>
          </motion.div>
        </div>
      </section>


      {/* Contact / Footer Section */}
      <section id="contact" className="py-24 bg-background border-t border-border/50 relative overflow-hidden">
        {/* Glow effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Panel */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5 flex flex-col justify-center"
            >
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-6 uppercase">
                START THE <br /> <span className="text-primary">CONVERSATION.</span>
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed font-serif mb-8" style={{ fontFamily: '"PT Serif", serif' }}>
                Every successful product starts with a simple conversation. Whether you need a business website, custom software, AI solutions, mobile applications, or automation, we're ready to understand your goals and deliver the right solution.
              </p>

              <div className="space-y-6 mb-12">
                <div>
                  <p className="text-sm font-semibold text-white/50 uppercase tracking-wider mb-2">Email</p>
                  <a href="mailto:hello@arcvex.in" className="text-xl font-medium text-white hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded">
                    hello@arcvex.in
                  </a>
                </div>
                <div>
                  <p className="text-sm font-semibold text-white/50 uppercase tracking-wider mb-2">Location</p>
                  <p className="text-xl font-medium text-white">Coimbatore</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-white/50 uppercase tracking-wider mb-2">Phone</p>
                  <a href="tel:+919363778981" className="text-xl font-medium text-white hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded">
                    +91 93637 78981
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Right Panel (Form) */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="lg:col-span-7 h-full"
            >
              <div className="bg-card/40 border border-border/50 p-8 md:p-10 rounded-2xl backdrop-blur-sm h-full flex flex-col">
                <form className="space-y-6 flex flex-col flex-1" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium text-white/80">Name</label>
                      <input
                        type="text"
                        id="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full h-12 px-4 bg-background border border-border/80 rounded-lg text-white focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none focus-visible:border-transparent transition-all"
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium text-white/80">Email</label>
                      <input
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full h-12 px-4 bg-background border border-border/80 rounded-lg text-white focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none focus-visible:border-transparent transition-all"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium text-white/80">Subject</label>
                    <input
                      type="text"
                      id="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full h-12 px-4 bg-background border border-border/80 rounded-lg text-white focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none focus-visible:border-transparent transition-all"
                      placeholder="How can we help?"
                    />
                  </div>
                  <div className="space-y-2 flex flex-col flex-1">
                    <label htmlFor="message" className="text-sm font-medium text-white/80">Message</label>
                    <textarea
                      id="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      className="w-full flex-1 min-h-[120px] p-4 bg-background border border-border/80 rounded-lg text-white focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none focus-visible:border-transparent transition-all resize-none"
                      placeholder="Tell us about your project..."
                    ></textarea>
                  </div>

                  <div className="w-full pt-2 pb-1 flex justify-center">
                    <div className="transition-all rounded-lg overflow-hidden flex justify-center items-center">
                      {!navigator.userAgent.includes("ReactSnap") ? (
                        <Turnstile
                          key={turnstileKey}
                          siteKey="0x4AAAAAADvlDxbG189yGJXi"
                          options={{
                            theme: 'dark'
                          }}
                          onSuccess={(token) => {
                            setSubmitStatus({ type: '', message: '' });
                            setFormData(prev => ({ ...prev, captchaToken: token }));
                          }}
                          onError={(errorCode) => {
                            console.error('Turnstile Error:', errorCode);
                            setSubmitStatus({ type: 'error', message: `Captcha error: ${errorCode || 'Unknown error'}. Check console or ensure the Site Key allows localhost.` });
                          }}
                          onExpire={() => setFormData(prev => ({ ...prev, captchaToken: '' }))}
                        />
                      ) : (
                        <div className="p-4 text-sm text-white/50 text-center">Turnstile Captcha (Disabled during pre-rendering)</div>
                      )}
                    </div>
                  </div>

                  {submitStatus.message && (
                    <div className={`p-4 rounded-lg ${submitStatus.type === 'success' ? 'bg-green-500/20 text-green-200' : 'bg-red-500/20 text-red-200'}`}>
                      {submitStatus.message}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting || !formData.captchaToken}
                    className={`relative overflow-hidden w-full h-12 bg-accent text-accent-foreground font-semibold rounded-lg transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background group hover:glow-shadow ${(isSubmitting || !formData.captchaToken) ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'}`}
                  >
                    {(!isSubmitting && formData.captchaToken) && <span className="absolute inset-0 w-full h-full bg-white origin-left transform scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100"></span>}
                    <span className="relative z-10 group-hover:text-black transition-colors duration-300">
                      {isSubmitting ? 'Submitting...' : 'Submit'}
                    </span>
                  </button>
                </form>
              </div>
            </motion.div>
          </div>

          {/* Footer Legal Bar */}
          <div className="border-t border-border/50 mt-24 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-muted-foreground text-sm">
                &copy; {new Date().getFullYear()} ArcVex Agency. All rights reserved.
              </p>
              <div className="flex space-x-4">
                <SocialIcon href="https://www.instagram.com/arcvex3/" icon={Instagram} ariaLabel="Instagram" />
                <SocialIcon href="https://www.linkedin.com/in/arcvex-505ba041b" icon={Linkedin} ariaLabel="LinkedIn" />
                <SocialIcon href="https://x.com/ARCVEX3" icon={XIcon} ariaLabel="X" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <ProjectModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </main>
  );
}
