import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Palette, Code, TrendingUp, Zap, Smartphone, ArrowRight, Share2, MessageCircle, Link, Search, Bot, Monitor } from 'lucide-react';
import { Instagram, Linkedin, Twitter } from '../components/BrandIcons';
import ServiceCard from '../components/ServiceCard';
import ProjectCard from '../components/ProjectCard';
import ProjectModal from '../components/ProjectModal';
import SocialIcon from '../components/SocialIcon';

// Mock Data
const services = [
  {
    title: 'Search Engine Optimization',
    description: 'Data-driven SEO strategies that increase your visibility, drive organic traffic, and improve your search rankings.',
    icon: Search,
    variant: 'default',
  },
  {
    title: 'Web Development',
    description: 'High-performance, accessible, and scalable web applications built with modern technologies.',
    icon: Code,
    variant: 'muted',
  },
  {
    title: 'UI/UX Design',
    description: 'Intuitive and engaging user experiences designed to convert visitors into loyal customers.',
    icon: TrendingUp,
    variant: 'muted',
  },
  {
    title: 'Bot Development',
    description: 'Custom intelligent bots for Telegram, Discord, and WhatsApp to automate workflows and engage your community.',
    icon: Bot,
    variant: 'default',
  },
  {
    title: 'App Development',
    description: 'Native and cross-platform mobile applications that deliver seamless experiences on iOS and Android.',
    icon: Smartphone,
    variant: 'muted',
  },
  {
    title: 'Software Applications',
    description: 'Bespoke enterprise software including billing applications and other custom applications tailored to streamline your business operations.',
    icon: Monitor,
    variant: 'muted',
  },
];

const projects = [
  {
    title: 'Neon Genesis',
    category: 'E-Commerce',
    image: 'https://picsum.photos/seed/neongenesis/800/600',
    description: [
      'A complete replatforming of a premium streetwear brand to a modern headless commerce architecture.',
      'The goal was to increase performance, improve mobile conversion rates, and allow the marketing team to deploy campaigns faster.'
    ],
    features: ['Headless Shopify integration', 'Sanity CMS', 'Framer Motion animations', 'Algolia search'],
    technologies: ['React', 'Next.js', 'Tailwind CSS', 'Shopify'],
    results: '140% increase in mobile conversion rate and 2s faster page loads.',
    ctaUrl: '#',
  },
  {
    title: 'Apex Financial',
    category: 'Fintech',
    image: 'https://picsum.photos/seed/apexfinancial/800/600',
    description: [
      'Redesigning the core dashboard for a leading fintech application to simplify complex data visualization.',
      'We focused on clarity, accessibility, and creating a design system that could scale with their growing product line.'
    ],
    features: ['Custom charting library', 'Dark mode support', 'WCAG 2.1 AA compliance', 'Component library'],
    technologies: ['Vue.js', 'D3.js', 'SCSS', 'Storybook'],
    results: 'Reduced customer support tickets by 30% related to navigation.',
    ctaUrl: '#',
  },
  {
    title: 'Lumina Health',
    category: 'Healthcare',
    image: 'https://picsum.photos/seed/luminahealth/800/600',
    description: [
      'A patient portal designed from the ground up to make managing health records and appointments effortless.',
      'Security and ease of use were paramount.'
    ],
    features: ['HIPAA compliant architecture', 'Real-time messaging', 'Telehealth video integration'],
    technologies: ['React Native', 'Node.js', 'WebRTC', 'AWS'],
    results: '4.8/5 average app store rating within first 3 months.',
    ctaUrl: '#',
  },
  {
    title: 'Echo Acoustics',
    category: 'Marketing',
    image: 'https://picsum.photos/seed/echoacoustics/800/600',
    description: [
      'An immersive marketing site for a high-end audio equipment manufacturer.',
      'We utilized 3D rendering and scroll-tied animations to showcase the intricate details of their products.'
    ],
    features: ['WebGL product viewers', 'Scroll-driven animations', 'Global CDN delivery'],
    technologies: ['Three.js', 'GSAP', 'Vite', 'Contentful'],
    results: 'Featured on Awwwards and doubled average time on site.',
    ctaUrl: '#',
  },
];

export default function HomePage() {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <main className="min-h-screen">
      <Helmet>
        <title>ArcVex Agency | Bold Digital Experiences</title>
        <meta name="description" content="A digital agency building high-contrast, premium marketing surfaces and applications." />
      </Helmet>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        {/* Background Image & Gradient */}
        <div className="absolute inset-0 z-0 bg-muted">
          <img
            src="https://picsum.photos/seed/agencyhero/1920/1080"
            alt="Agency Workspace"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="text-accent font-bold uppercase tracking-[0.2em] mb-6 text-sm font-serif">
              We build digital futures
            </p>
            <h1 className="text-[clamp(3rem,13vw,10rem)] leading-[0.9] font-extrabold text-white tracking-tighter mb-8">
              ARCVEX<span className="text-accent">.</span>
            </h1>
            <p className="max-w-2xl mx-auto text-xl md:text-2xl text-white/70 mb-12 leading-relaxed font-serif">
              We craft premium digital experiences that elevate brands and drive meaningful engagement through design, motion, and technology.
            </p>
            <a
              href="#work"
              className="inline-flex items-center px-8 py-4 bg-accent text-accent-foreground font-bold rounded-2xl hover:bg-accent/90 hover:glow-shadow transition-smooth group"
            >
              <span className="mr-2">Explore Our Work</span>
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        </div>


      </section>



      {/* About Section */}
      <section id="about" className="py-24 bg-background relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Visuals */}
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="aspect-square rounded-2xl bg-muted border border-border/50 overflow-hidden relative"
            >
              <img
                src="/about-image.png"
                alt="ArcVex Workspace"
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Copy */}
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
              className="flex flex-col justify-center space-y-6"
            >
              <p className="text-primary font-bold tracking-wider uppercase text-sm">
                Who We Are
              </p>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-6">
                A collective of digital craftsmen building the future.
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed font-serif">
                ArcVex Agency was founded on a simple premise: technology should feel like magic. We blend rigorous engineering with editorial design to create marketing surfaces that don't just perform—they inspire.
              </p>
              <p className="text-xl text-muted-foreground leading-relaxed font-serif">
                Our team is composed of industry veterans from leading tech companies and creative agencies. We approach every project with a builder's mindset and a designer's eye, ensuring every pixel and every line of code serves a purpose.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-background relative">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-center mb-16"
          >
            <p className="text-primary font-bold mb-4 tracking-wider uppercase text-sm">Our Services</p>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-12">
              Why choose ArcVex for your <br className="hidden md:block" /> digital transformation?
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

      {/* Work Section */}
      <section id="work" className="py-24 md:py-32 relative bg-black/30">
        <div className="w-24 h-1 bg-accent rounded-b-full opacity-50 mx-auto absolute top-0 left-1/2 -translate-x-1/2" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-6">Selected Work</h2>
              <p className="text-xl text-white/60">
                A showcase of our recent partnerships and the digital experiences we've brought to life.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-start">
            {projects.map((project, index) => (
              <ProjectCard
                key={index}
                project={project}
                index={index}
                offset={index % 2 !== 0}
                onClick={() => setSelectedProject(project)}
              />
            ))}
          </div>
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
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="lg:col-span-5 flex flex-col justify-center"
            >
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-6">
                LET'S WORK <br /> <span className="text-primary">TOGETHER.</span>
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed font-serif mb-8">
                Ready to transform your digital presence? We're currently taking on new projects. Reach out and let's build something extraordinary.
              </p>

              <div className="space-y-6 mb-12">
                <div>
                  <p className="text-sm font-semibold text-white/50 uppercase tracking-wider mb-2">Email</p>
                  <a href="mailto:hello@arcvex.com" className="text-xl font-medium text-white hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded">
                    hello@arcvex.com
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
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
              className="lg:col-span-7"
            >
              <div className="bg-card/40 border border-border/50 p-8 md:p-10 rounded-2xl backdrop-blur-sm">
                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium text-white/80">Name</label>
                      <input
                        type="text"
                        id="name"
                        className="w-full h-12 px-4 bg-background border border-border/80 rounded-lg text-white focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none focus-visible:border-transparent transition-all"
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium text-white/80">Email</label>
                      <input
                        type="email"
                        id="email"
                        className="w-full h-12 px-4 bg-background border border-border/80 rounded-lg text-white focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none focus-visible:border-transparent transition-all"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium text-white/80">Message</label>
                    <textarea
                      id="message"
                      className="w-full min-h-[120px] p-4 bg-background border border-border/80 rounded-lg text-white focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none focus-visible:border-transparent transition-all resize-y"
                      placeholder="Tell us about your project..."
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full h-12 bg-accent text-accent-foreground font-semibold rounded-lg hover:bg-accent/90 hover:glow-shadow transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background cursor-pointer"
                  >
                    Submit
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
                <SocialIcon href="#" icon={Instagram} />
                <SocialIcon href="#" icon={Linkedin} />
                <SocialIcon href="#" icon={Twitter} />
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
