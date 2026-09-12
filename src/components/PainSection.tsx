import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Settings2, Code2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { GradientBorder } from './ui/GradientBorder';
import { RollingText } from './ui/RollingText';

const PainCard = ({ 
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
    className="group relative flex flex-col bg-[#0A0A0A] border border-white/10 rounded-2xl p-8 hover:border-white/20 transition-all"
  >
    <div className="flex items-start gap-4 mb-6">
      <span className="text-4xl font-bold text-white/10">{number}</span>
      <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
        <Icon size={24} className="text-blue-400" />
      </div>
    </div>
    <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
    <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
  </motion.div>
);

export const PainSection = () => {
  return (
    <section className="w-full py-24 px-6 relative z-20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-6">
            The difficult part isn't always the strategy. <br />
            It's getting it out of your head.
          </h2>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
            A strategy can make perfect sense to you and still be difficult to explain, test, or engineer.
          </p>
        </motion.div>

        {/* Pain Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <PainCard
            number="01"
            icon={Brain}
            title="You know it. But explaining it is different."
            description="Your strategy may live across your memory, charts, notes and experience. Getting it all out clearly takes more than just writing it down."
            delay={0.1}
          />
          <PainCard
            number="02"
            icon={Settings2}
            title="Generic tools don't know your rules."
            description="Predefined tools cannot always represent the strategy you actually have. Your entry logic, exit conditions, and risk management are unique to you."
            delay={0.2}
          />
          <PainCard
            number="03"
            icon={Code2}
            title="Turning rules into software takes engineering."
            description="The gap between 'this is how I trade' and 'this is buildable software' is where the work begins. Testing, refining, and delivering takes technical effort."
            delay={0.3}
          />
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center"
        >
          <GradientBorder
            gradient="from-orange-500 via-red-500 to-orange-600"
            containerClassName="rounded-full p-[1px] inline-block"
          >
            <Link
              to="/interview"
              className="px-8 py-3 bg-black text-white font-medium rounded-full hover:bg-gray-900 transition-colors group"
            >
              <RollingText text="Explain Mine" />
            </Link>
          </GradientBorder>
        </motion.div>
      </div>
    </section>
  );
};
