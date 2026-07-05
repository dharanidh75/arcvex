import React from 'react';

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

export default function FAQ() {
  return (
    <section id="faq" aria-label="Frequently Asked Questions" className="max-w-4xl mx-auto py-16 px-4">
      <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
      <div className="space-y-6">
        {faqs.map((item, i) => (
          <div key={i} className="border-b border-gray-200 pb-4">
            <h3 className="text-xl font-semibold mb-2">{item.q}</h3>
            <p className="text-gray-600">{item.a}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
