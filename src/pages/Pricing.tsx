import React from 'react';
import { motion } from 'framer-motion';
import { PricingSection } from '../components/PricingSection';
import { FAQSection } from '../components/FAQSection';
import { CTA } from '../components/CTA';

export const Pricing = () => {
  return (
    <div className="relative w-full min-h-screen pt-32 bg-[#050505] overflow-x-hidden">
      {/* Background Ambient Glows */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-[60vw] h-[60vw] bg-orange-600/10 blur-[120px] rounded-full opacity-40" />
        <div className="absolute top-0 right-0 w-[60vw] h-[60vw] bg-blue-600/10 blur-[120px] rounded-full opacity-40" />
      </div>

      <div className="relative z-10">
        <PricingSection />
        <FAQSection />
        <CTA />
      </div>
    </div>
  );
};
