import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';
import { TrendingUp, Box, Hexagon } from 'lucide-react';

// --- MOCK DATA ---

const testimonials = [
  {
    company: "startup",
    logo: TrendingUp,
    quote: "Automating lead follow-ups boosted our conversion rate by 30% without adding headcount. Converge AI is a game-changer.",
    name: "Audrey Madden",
    role: "Chief Growth Officer",
    image: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    gradient: "from-blue-600/20 via-purple-500/10 to-orange-500/20"
  },
  {
    company: "company",
    logo: Box,
    quote: "Real-time insights from AI agents help us spot trends before they emerge—our decisions are smarter and faster.",
    name: "Jamal Richardson",
    role: "Head of Analytics",
    image: "https://i.pravatar.cc/150?u=a04258a2462d826712d",
    gradient: "from-orange-600/20 via-red-500/10 to-purple-500/20"
  },
  {
    company: "Logoipsum",
    logo: Hexagon,
    quote: "Seamless Slack and Salesforce integrations keep our teams aligned. Converge AI ensures everyone is on the same page.",
    name: "Priya Desai",
    role: "Customer Success Lead",
    image: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    gradient: "from-blue-500/20 via-cyan-500/10 to-blue-600/20"
  },
  {
    company: "TechFlow",
    logo: TrendingUp,
    quote: "We reduced our support ticket resolution time by 60% within the first month. The AI agents are incredibly accurate.",
    name: "Marcus Chen",
    role: "VP of Engineering",
    image: "https://i.pravatar.cc/150?u=a048581f4e29026701d",
    gradient: "from-emerald-600/20 via-blue-500/10 to-emerald-500/20"
  }
];

const TestimonialCard = ({ data }: { data: typeof testimonials[0] }) => (
  <div className="relative w-[350px] md:w-[400px] h-[450px] flex-shrink-0 rounded-3xl overflow-hidden border border-white/10 bg-[#0A0A0A] group">
    
    {/* Background Gradient Mesh */}
    <div className={cn("absolute inset-0 bg-gradient-to-br opacity-40 blur-3xl transition-opacity duration-500", data.gradient)} />
    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0A0A0A]/80 to-[#0A0A0A]" />

    <div className="relative z-10 h-full p-8 md:p-10 flex flex-col">
      {/* Company Logo */}
      <div className="flex items-center gap-3 mb-10">
        <data.logo className="w-8 h-8 text-white" strokeWidth={2.5} />
        <span className="text-xl font-bold text-white tracking-tight">{data.company}</span>
      </div>

      {/* Quote */}
      <blockquote className="text-lg md:text-xl font-medium text-gray-200 leading-relaxed mb-auto">
        “{data.quote}”
      </blockquote>

      {/* Profile */}
      <div className="flex items-center gap-4 mt-8 pt-8 border-t border-white/5">
        <div className="w-12 h-12 rounded-xl overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-500">
          <img src={data.image} alt={data.name} className="w-full h-full object-cover" />
        </div>
        <div>
          <div className="text-white font-medium">{data.name}</div>
          <div className="text-sm text-gray-500">{data.role}</div>
        </div>
      </div>
    </div>
  </div>
);

export const Testimonials = () => {
  return (
    <section className="w-full py-32 overflow-hidden relative z-20">
      
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 mb-16 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center rounded-full border border-blue-500/30 bg-blue-950/10 px-4 py-1.5 mb-6"
        >
          <span className="text-[10px] md:text-xs font-bold tracking-wider text-blue-400 uppercase">
            Success Stories
          </span>
        </motion.div>
        
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-6xl font-bold text-white tracking-tight max-w-2xl"
        >
          Hear from our customers <br />
          & their success stories
        </motion.h2>
      </div>

      {/* Infinite Scroll Ticker - Constrained Width on Desktop with Overflow Hidden */}
      <div className="w-full lg:w-[60%] lg:mx-auto relative overflow-hidden">
        {/* Fade Masks */}
        <div className="absolute left-0 top-0 bottom-0 w-24 md:w-32 bg-gradient-to-r from-[#050505] to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 md:w-32 bg-gradient-to-l from-[#050505] to-transparent z-20 pointer-events-none" />

        <div className="flex gap-8 animate-scroll pl-6">
          {/* Set 1 */}
          {testimonials.map((t, i) => (
            <TestimonialCard key={`t1-${i}`} data={t} />
          ))}
          {/* Set 2 (Duplicate for loop) */}
          {testimonials.map((t, i) => (
            <TestimonialCard key={`t2-${i}`} data={t} />
          ))}
          {/* Set 3 (Extra buffer) */}
          {testimonials.map((t, i) => (
            <TestimonialCard key={`t3-${i}`} data={t} />
          ))}
        </div>
      </div>

    </section>
  );
};
