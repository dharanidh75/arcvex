import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    q: "What does Arcvex Studio do?",
    a: "Arcvex Studio designs and builds full-stack web applications and AI agent systems for startups and businesses. We handle custom web app development, AI/LLM agent pipelines, and end-to-end product delivery from design to deployment.",
  },
  {
    q: "What technologies does Arcvex Studio use?",
    a: "We build with React, FastAPI, LangGraph for multi-agent AI orchestration, ChromaDB and RAG pipelines, PostgreSQL, and deploy on Vercel, Render, and Cloudflare.",
  },
  {
    q: "Who does Arcvex Studio work with?",
    a: "We work with startups and businesses globally, including retainer clients who need ongoing full-stack and AI development support.",
  },
  {
    q: "How is Arcvex Studio different from a typical dev agency?",
    a: "We specialize in AI-agent-heavy full-stack systems, not just standard web development — with hands-on experience shipping production AI pipelines using LangGraph, RAG, and multi-agent orchestration.",
  },
  {
    q: "What services does Arcvex Studio offer?",
    a: "Arcvex Studio offers SEO, software development, website development, app development, AI integrations, generative AI solutions, custom billing software, and CRM/CMD systems.",
  },
  {
    q: "Does Arcvex Studio do SEO?",
    a: "Yes. Arcvex Studio provides SEO services alongside development work, including technical SEO, on-page optimization, and generative-engine optimization (GEO) for AI search visibility.",
  },
  {
    q: "Does Arcvex Studio build mobile apps?",
    a: "Yes. Arcvex Studio builds mobile apps, including React Native cross-platform apps with backend integrations such as Supabase and PostgreSQL.",
  },
  {
    q: "Can Arcvex Studio integrate AI into an existing product?",
    a: "Yes. Arcvex Studio integrates AI and generative AI features into existing software, including LLM-powered agents, RAG-based search, and automation pipelines using LangGraph and vector databases.",
  },
  {
    q: "Does Arcvex Studio build billing software?",
    a: "Yes. Arcvex Studio has delivered custom billing software, including desktop billing applications with synced mobile dashboards for real business clients.",
  },
];

function FAQItem({ item, index }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: index * 0.05 }}
      className="border border-border/50 rounded-xl overflow-hidden"
    >
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="w-full flex items-center justify-between px-6 py-5 text-left bg-card/40 hover:bg-card/70 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-inset group"
      >
        <h3 className="text-base md:text-lg font-semibold text-white group-hover:text-accent transition-colors duration-200 pr-4">
          {item.q}
        </h3>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="shrink-0 text-accent"
        >
          <ChevronDown size={20} />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <p className="px-6 pb-5 pt-2 text-muted-foreground leading-relaxed font-serif" style={{ fontFamily: '"PT Serif", serif' }}>
              {item.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  return (
    <section id="faq" aria-label="Frequently Asked Questions" className="py-24 bg-background">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <div className="w-full border-b border-accent/40 pb-4 mb-8">
            <p className="text-accent font-serif uppercase tracking-[0.25em] text-xl md:text-2xl">
              FAQ
            </p>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white">
            Frequently Asked Questions
          </h2>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((item, i) => (
            <FAQItem key={i} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
