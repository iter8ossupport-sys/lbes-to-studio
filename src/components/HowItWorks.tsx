import React from 'react';
import { motion } from 'framer-motion';
import { Package, MessageSquare, FileSearch, CheckCircle, Cog, Download } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: Package,
    title: 'Choose What You Need',
    description: 'TradingView, TradingView + MT5, or Full Engineering — select the package that fits your goals.'
  },
  {
    number: '02',
    icon: MessageSquare,
    title: 'Explain Your Strategy',
    description: 'Answer questions in your own words. No technical knowledge required.'
  },
  {
    number: '03',
    icon: FileSearch,
    title: 'Review What We Understood',
    description: 'Your strategy is summarized before engineering begins. You stay in control.'
  },
  {
    number: '04',
    icon: CheckCircle,
    title: 'Confirm and Book',
    description: 'Approve the summary and choose your payment option.'
  },
  {
    number: '05',
    icon: Cog,
    title: 'We Engineer It',
    description: 'Your selected package moves into engineering and testing.'
  },
  {
    number: '06',
    icon: Download,
    title: 'Receive Your Deliverable',
    description: 'Your completed package is delivered within the stated service window.'
  }
];

const StepCard = ({ 
  number, 
  icon: Icon, 
  title, 
  description, 
  delay 
}: { 
  number: string; 
  icon: React.ElementType; 
  title: string; 
  description: string;
  delay: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    className="group relative flex flex-col bg-[#0A0A0A] border border-white/10 rounded-2xl p-6 hover:border-orange-500/30 transition-all"
  >
    <div className="flex items-center gap-4 mb-4">
      <span className="text-2xl font-bold text-orange-500">{number}</span>
      <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-orange-500/10 transition-colors">
        <Icon size={20} className="text-gray-400 group-hover:text-orange-400 transition-colors" />
      </div>
    </div>
    <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
    <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
  </motion.div>
);

export const HowItWorks = () => {
  return (
    <section id="how-it-works" className="w-full py-24 px-6 relative z-20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center rounded-full border border-blue-500/30 bg-blue-900/10 px-4 py-1.5 mb-6">
            <span className="text-[10px] md:text-xs font-bold tracking-widest text-blue-400 uppercase">
              THE PROCESS
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-6">
            From your words to your software.
          </h2>
        </motion.div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((step, index) => (
            <StepCard key={index} {...step} delay={index * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
};
