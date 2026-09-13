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

export const TermsConditions = () => {
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
              LEGAL
            </span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-7xl font-semibold text-white tracking-tight mb-6"
          >
            Terms & Conditions
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
          <Section title="Service Description" delay={0.3}>
            <p>
              LBES provides strategy documentation and software engineering services. We translate the rules and examples you provide into the TradingView, TradingView + MT5, or Full Engineering package you select. The specification is the source of truth for delivery.
            </p>
          </Section>

          <Section title="Accounts and Customer Information" delay={0.35}>
            <p>
              You are responsible for providing accurate information, protecting your account credentials, and reviewing your strategy specification. Do not submit passwords, payment credentials, or another person’s private information in the interview.
            </p>
          </Section>

          <Section title="Specification, Edits, and Delivery" delay={0.4}>
            <p>
              You can review and edit the generated specification before approval. After approval, engineering is based on the approved specification. Delivery targets shown on package pages are targets, not guarantees, and may change when requirements are incomplete, changed, or technically blocked.
            </p>
          </Section>

          <Section title="No Financial or Performance Advice" delay={0.5}>
            <p>
              LBES does not provide investment advice and does not guarantee profitability, win rate, funding, or any trading result. Backtests are historical analyses and do not predict future performance. You are solely responsible for deciding whether or how to use any deliverable.
            </p>
          </Section>

          <Section title="Intellectual Property and Use" delay={0.6}>
            <p>
              You retain ownership of the strategy information you provide. Subject to payment and these terms, LBES grants you a non-transferable license to use the delivered software for your own trading workflow. You may not resell, sublicense, publish, or redistribute LBES source code or deliverables unless agreed in writing.
            </p>
          </Section>

          <Section title="Payment and Refunds" delay={0.7}>
            <p>
              Payments are processed through Razorpay hosted payment pages. A booking payment reserves work under the selected package; it is not an automatic charge for the remaining balance. Refund and cancellation rules are described in the Refund Policy.
            </p>
          </Section>

          <Section title="Acceptable Use and Liability" delay={0.8}>
            <p>
              You may not use LBES to submit unlawful content, abuse the service, bypass access controls, or upload malicious files. To the extent permitted by law, LBES is not liable for trading losses, missed opportunities, market conditions, outages, or indirect financial outcomes resulting from the service or deliverables.
            </p>
          </Section>

          <Section title="Changes, Suspension, and Contact" delay={0.9}>
            <p>
              We may update these terms, suspend abusive accounts, or change service features. Continued use after an update means you accept the revised terms. Contact LBES through the website support page for questions or disputes.
            </p>
          </Section>
        </div>
      </div>

      <CTA />
    </div>
  );
};
