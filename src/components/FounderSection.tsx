import React from 'react';
import { motion } from 'framer-motion';
import { Compass, Cpu } from 'lucide-react';

export const FounderSection = () => {
  return (
    <section className="w-full py-20 px-6 relative z-20">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-[#0A0A0A] border border-white/10 rounded-2xl p-8 md:p-12 relative overflow-hidden"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-8 pb-8 border-b border-white/10">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 mb-4">
                <span className="text-[10px] font-bold tracking-wider text-blue-400 uppercase">
                  FOUNDER & TRUST
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                Built from both sides of the problem.
              </h2>
            </div>

            <div className="flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 rounded-xl whitespace-nowrap text-xs font-semibold text-gray-300">
              <Compass size={16} className="text-orange-400" />
              <span>Trader POV</span>
              <span className="text-gray-500">×</span>
              <Cpu size={16} className="text-blue-400" />
              <span>Engineering POV</span>
            </div>
          </div>

          <div className="space-y-4 text-gray-300 text-base md:text-lg leading-relaxed">
            <p>
              LBES was built by a retail trader who also works with strategy engineering and automation.
            </p>
            <p>
              That means we understand the gap between how a trader describes a strategy and how software needs those rules defined.
            </p>
            <p className="text-white font-medium pt-2">
              You explain the strategy in trader language. We help translate it into engineering language.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
