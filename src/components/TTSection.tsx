import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, GraduationCap, ShieldCheck } from 'lucide-react';

const conceptTags = [
  'Backtesting',
  'Win Rate',
  'Drawdown',
  'Profit Factor',
  'Multi-Timeframe Testing',
  'Pair Differences',
  'Historical Limitations'
];

export const TTSection = () => {
  return (
    <section id="tt-support" className="w-full py-24 px-6 relative z-20 bg-gradient-to-b from-transparent via-orange-950/10 to-transparent">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-1.5 mb-6">
            <GraduationCap size={14} className="text-orange-400" />
            <span className="text-[10px] md:text-xs font-bold tracking-widest text-orange-400 uppercase">
              T→T
            </span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-6">
            Trader-to-Trader Learning Support
          </h2>
          
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto font-medium">
            Understand what you received. Not just how it was built.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="bg-[#0A0A0A] border border-white/10 rounded-2xl p-8 md:p-12 max-w-4xl mx-auto shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/5 blur-3xl rounded-full pointer-events-none" />

          <p className="text-gray-300 text-lg leading-relaxed mb-6">
            Every LBES order includes educational support from the founder, who understands both trading strategy and software engineering.
          </p>

          <p className="text-gray-400 text-base leading-relaxed mb-8">
            After your strategy is engineered and tested, you can ask questions about your strategy specification, implementation, testing report, and what the reported evidence means.
          </p>

          {/* Concept Tags */}
          <div className="mb-8">
            <p className="text-xs font-bold tracking-wider text-gray-400 uppercase mb-4">
              Topics covered in T→T sessions:
            </p>
            <div className="flex flex-wrap gap-2">
              {conceptTags.map((tag) => (
                <span
                  key={tag}
                  className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-gray-300 hover:border-orange-500/40 transition-colors"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <BookOpen size={18} className="text-orange-400" />
              <span className="text-sm font-semibold text-white">
                Trader language. Engineering context. Educational support.
              </span>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-white/5 flex items-start gap-2 text-xs text-gray-500">
            <ShieldCheck size={14} className="text-gray-600 flex-shrink-0 mt-0.5" />
            <p>
              T→T support is educational and related to your LBES order. It does not provide trade signals, personalized investment recommendations, or guarantees of future performance.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
