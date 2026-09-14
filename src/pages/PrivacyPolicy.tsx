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
            Last Updated: September 2026
          </motion.p>
        </div>

        <div className="border-t border-white/5 pt-16">
          <Section title="Information Collected" delay={0.3}>
            <p>
              We collect account information, email address, order information, strategy information submitted through the adaptive interview, uploaded screenshots and files, payment/order status, and support communications.
            </p>
          </Section>

          <Section title="Use of Information" delay={0.4}>
            <p>
              We use collected information to operate LBES, generate and maintain strategy specifications, process and manage orders, communicate about orders, engineer requested deliverables, provide customer support, and maintain security and system reliability.
            </p>
          </Section>

          <Section title="Payment Information" delay={0.5}>
            <p>
              LBES does not store customers' card or payment credentials when payment is processed through an external payment provider. All checkout transactions are securely handled directly by external payment partners.
            </p>
          </Section>

          <Section title="Strategy Confidentiality" delay={0.6}>
            <p>
              Customer-provided strategy information is treated as confidential service information and used to provide the requested LBES service. Third-party infrastructure and service providers process application data under strict operational parameters.
            </p>
          </Section>

          <Section title="Cookies and Security" delay={0.7}>
            <p>
              LBES uses browser storage and session technologies to keep you signed in, restore interview progress, and protect account workflows. Do not share your account password.
            </p>
          </Section>
        </div>
      </div>

      <CTA />
    </div>
  );
};
