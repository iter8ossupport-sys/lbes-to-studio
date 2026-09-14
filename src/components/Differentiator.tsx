import React from 'react';
import { motion } from 'framer-motion';
import { User, GraduationCap, Crown } from 'lucide-react';
import { cn } from '../lib/utils';

const LevelCard = ({
  icon: Icon,
  level,
  description,
  process,
  delay,
  color
}: {
  icon: React.ElementType;
  level: string;
  description: string;
  process: string;
  delay: number;
  color: string;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    className={cn(
      "relative flex flex-col bg-[#0A0A0A] border rounded-2xl p-8 transition-all hover:scale-[1.02]",
      color
    )}
  >
    <div className="flex items-center gap-4 mb-6">
      <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
        <Icon size={24} className="text-white" />
      </div>
      <span className="text-lg font-bold text-white">{level}</span>
    </div>
    <p className="text-gray-400 text-sm mb-4">{description}</p>
    <div className="mt-auto pt-4 border-t border-white/10">
      <p className="text-gray-300 text-sm font-medium">{process}</p>
    </div>
  </motion.div>
);

export const Differentiator = () => {
  return (
    <section className="w-full py-24 px-6 relative z-20 bg-gradient-to-b from-transparent via-blue-900/5 to-transparent">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center rounded-full border border-orange-500/30 bg-orange-900/10 px-4 py-1.5 mb-6">
            <span className="text-[10px] md:text-xs font-bold tracking-widest text-orange-400 uppercase">
              Adaptive Interview
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-6">
            Start with what you know. <br />
            Not what you don't.
          </h2>
          <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            You don't need to speak developer language. Explain your strategy the way you understand it. LBES handles the translation into a structured engineering specification.
          </p>
        </motion.div>

        {/* 3 Compact Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col bg-[#0A0A0A] border border-blue-500/30 rounded-2xl p-8 hover:border-blue-500/50 transition-all"
          >
            <span className="text-sm font-bold text-blue-400 tracking-wider uppercase mb-2">01 — Explain</span>
            <h3 className="text-xl font-bold text-white mb-2">Tell us how you trade.</h3>
            <p className="text-gray-400 text-sm">Explain your strategy rules, indicators, entries, and exits in plain trader terms.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col bg-[#0A0A0A] border border-orange-500/30 rounded-2xl p-8 hover:border-orange-500/50 transition-all"
          >
            <span className="text-sm font-bold text-orange-400 tracking-wider uppercase mb-2">02 — Verify</span>
            <h3 className="text-xl font-bold text-white mb-2">See what LBES understood before engineering.</h3>
            <p className="text-gray-400 text-sm">Review your structured strategy specification and confirm all parameters before code is built.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col bg-[#0A0A0A] border border-purple-500/30 rounded-2xl p-8 hover:border-purple-500/50 transition-all"
          >
            <span className="text-sm font-bold text-purple-400 tracking-wider uppercase mb-2">03 — Understand</span>
            <h3 className="text-xl font-bold text-white mb-2">Receive your software and learn how to read the testing evidence.</h3>
            <p className="text-gray-400 text-sm">Get your TradingView indicator or MT5 system along with clear educational testing reports.</p>
          </motion.div>
        </div>

        {/* Level Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <LevelCard
            icon={User}
            level="Beginner"
            description="Simple explanation in your own words"
            process="→ LBES asks deeper questions"
            delay={0.1}
            color="border-blue-500/20 hover:border-blue-500/40"
          />
          <LevelCard
            icon={GraduationCap}
            level="Intermediate"
            description="Existing rules but needs structure"
            process="→ LBES identifies missing detail"
            delay={0.2}
            color="border-orange-500/20 hover:border-orange-500/40"
          />
          <LevelCard
            icon={Crown}
            level="Advanced"
            description="Detailed strategy ready for engineering"
            process="→ LBES goes deeper into implementation requirements"
            delay={0.3}
            color="border-purple-500/20 hover:border-purple-500/40"
          />
        </div>

        {/* Core Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center bg-[#0A0A0A] border border-white/10 rounded-2xl p-8 md:p-12"
        >
          <p className="text-xl md:text-2xl text-white font-medium leading-relaxed">
            You don't need to know how to write the specification. <br />
            You need to explain what your strategy does.
          </p>
        </motion.div>
      </div>
    </section>
  );
};
