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
          <Section title="Information We Collect" delay={0.3}>
            <p>
              We collect your email and account details, the answers and files you submit during the strategy interview, order identifiers, and basic service activity needed to operate LBES. Card, UPI, and other payment credentials are handled by Razorpay and are not stored by LBES.
            </p>
          </Section>

          <Section title="How We Use Your Data" delay={0.4}>
            <p>
              We use your data to authenticate your account, save and restore your interview, prepare your specification, deliver the package you selected, process support requests, and verify payment status. We do not sell your strategy or use it to make trading recommendations.
            </p>
          </Section>

          <Section title="Service Providers" delay={0.5}>
            <p>
              LBES uses Supabase for authentication and application data storage and Razorpay for hosted payment pages and payment notifications. These providers process data under their own terms and privacy policies. Access to customer records is restricted by account ownership policies.
            </p>
          </Section>

          <Section title="Retention and Your Rights" delay={0.6}>
            <p>
              You may request access, correction, export, or deletion of your personal data, subject to records we must retain for legal, accounting, fraud-prevention, or payment purposes. Contact LBES through the support channel listed on the website.
            </p>
          </Section>

          <Section title="Cookies and Security" delay={0.7}>
            <p>
              LBES uses browser storage and session technologies to keep you signed in, restore interview progress, and protect account workflows. Do not share your password or service-role credentials. LBES will not ask for a Supabase service-role key.
            </p>
          </Section>

          <Section title="Changes and Contact" delay={0.8}>
            <p>
              We may update this policy as the service changes. The effective date above identifies the current version. Questions or privacy requests should be sent through the LBES support/contact page.
            </p>
          </Section>
        </div>
      </div>

      <CTA />
    </div>
  );
};
