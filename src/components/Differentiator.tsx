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
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
            Whether you're just beginning to define your strategy or already have a detailed system, LBES adjusts the interview to what you can actually explain.
          </p>
        </motion.div>

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
