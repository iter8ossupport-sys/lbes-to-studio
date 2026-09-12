import React from 'react';
import { motion } from 'framer-motion';
import { 
  Headset, 
  Activity, 
  Target, 
  GraduationCap, 
  Wallet,
  LucideIcon
} from 'lucide-react';
import { cn } from '../lib/utils';

interface UseCaseCardProps {
  icon: LucideIcon;
  label: string;
  delay: number;
}

const UseCaseCard: React.FC<UseCaseCardProps> = ({ icon: Icon, label, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="group relative flex flex-col items-center justify-center gap-4 p-8 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-orange-500/30 transition-all duration-300 hover:-translate-y-1 cursor-default"
    >
      {/* Hover Glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
      
      {/* Icon Container */}
      <div className="relative z-10 w-16 h-16 rounded-2xl bg-[#0A0A0A] border border-white/10 flex items-center justify-center shadow-lg group-hover:shadow-orange-500/10 transition-all duration-300">
        <div className="absolute inset-0 bg-blue-500/10 blur-xl rounded-full opacity-50 group-hover:opacity-0 transition-opacity" />
        <div className="absolute inset-0 bg-orange-500/10 blur-xl rounded-full opacity-0 group-hover:opacity-50 transition-opacity" />
        
        <Icon 
          size={32} 
          className="text-blue-400 group-hover:text-orange-400 transition-colors duration-300" 
          strokeWidth={1.5}
        />
      </div>

      {/* Label */}
      <span className="relative z-10 text-sm font-medium text-gray-400 group-hover:text-gray-200 transition-colors">
        {label}
      </span>
    </motion.div>
  );
};

export const UseCaseGrid = () => {
  const useCases = [
    { icon: Headset, label: "Customer Support" },
    { icon: Activity, label: "Healthcare" },
    { icon: Target, label: "Marketing" },
    { icon: GraduationCap, label: "Education" },
    { icon: Wallet, label: "Finance" },
  ];

  return (
    <section className="w-full pb-24 px-6 relative z-20">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {useCases.map((item, index) => (
            <UseCaseCard 
              key={index}
              icon={item.icon}
              label={item.label}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
