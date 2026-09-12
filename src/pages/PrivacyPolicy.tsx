import React from 'react';
import { motion } from 'framer-motion';
import { CTA } from '../components/CTA';

const Section = ({ title, children, delay }: { title: string, children: React.ReactNode, delay: number }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.5 }}
    className="mb-16"
  >
    <h2 className="text-2xl md:text-3xl font-semibold text-white mb-6 tracking-tight">
      {title}
    </h2>
    <div className="text-gray-400 text-lg leading-relaxed space-y-4">
      {children}
    </div>
  </motion.div>
);

export const PrivacyPolicy = () => {
  return (
    <div className="relative w-full min-h-screen pt-32 bg-[#050505] overflow-x-hidden">
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-[60vw] h-[60vw] bg-orange-600/10 blur-[120px] rounded-full opacity-60" />
        <div className="absolute top-0 right-0 w-[60vw] h-[60vw] bg-blue-600/10 blur-[120px] rounded-full opacity-60" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 mb-24">
        <div className="text-center mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block border border-white/20 bg-white/5 backdrop-blur-sm rounded-full px-4 py-1.5 mb-8"
          >
            <span className="text-[10px] md:text-xs font-bold tracking-widest text-white uppercase">
              PRIVACY POLICY
            </span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-7xl font-semibold text-white tracking-tight mb-6"
          >
            Privacy Policy
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-sm md:text-base"
          >
            Last Updated: January 2025
          </motion.p>
        </div>

        <div className="border-t border-white/5 pt-16">
          <Section title="Information We Collect" delay={0.3}>
            <p>
              We collect information you provide directly, including your name, email, and strategy details during the interview process. We also collect payment information through our secure payment provider.
            </p>
          </Section>

          <Section title="How We Use Your Data" delay={0.4}>
            <p>
              Your strategy information is used solely to engineer the software deliverable you selected. We do not share, sell, or use your strategy for any purpose other than delivering your order.
            </p>
          </Section>

          <Section title="Data Security" delay={0.5}>
            <p>
              We employ industry-standard security measures to protect your information. Your strategy details are stored securely and deleted after delivery unless you request otherwise.
            </p>
          </Section>

          <Section title="Your Rights" delay={0.6}>
            <p>
              You have the right to request access to, modification of, or deletion of your personal data. Contact us at any time to exercise these rights.
            </p>
          </Section>

          <Section title="Contact Us" delay={0.7}>
            <p>
              If you have questions about this Privacy Policy, please contact us through our support page.
            </p>
          </Section>
        </div>
      </div>

      <CTA />
    </div>
  );
};
