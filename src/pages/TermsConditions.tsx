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
          <Section title="Service Scope" delay={0.3}>
            <p>
              LBES provides software engineering and strategy-documentation services based on customer-provided rules. We translate the strategy rules you submit into the TradingView, TradingView + MT5, or Full Engineering package you select.
            </p>
          </Section>

          <Section title="Strategy Ownership" delay={0.35}>
            <p>
              The customer remains responsible for the strategy, rules, assumptions, and information they provide. LBES does not claim ownership over customer-provided strategy logic.
            </p>
          </Section>

          <Section title="Specification Approval" delay={0.4}>
            <p>
              Before engineering begins, the customer can review the generated strategy specification and identify inaccuracies. Engineering is based on the approved specification.
            </p>
          </Section>

          <Section title="Testing" delay={0.45}>
            <p>
              Backtests are historical simulations based on the defined rules, instruments, timeframes, data and testing methodology. Historical results do not guarantee future results.
            </p>
          </Section>

          <Section title="No Performance Guarantee" delay={0.5}>
            <p>
              LBES does not guarantee profitability, win rate, returns, funded-account approval, or future trading performance.
            </p>
          </Section>

          <Section title="No Investment Advice" delay={0.55}>
            <p>
              LBES does not provide personalized investment recommendations, trade signals, or instructions to buy or sell financial instruments.
            </p>
          </Section>

          <Section title="T→T Educational Support" delay={0.6}>
            <p>
              T→T is educational support concerning the customer's LBES deliverables, strategy specification, implementation and reported testing evidence.
            </p>
          </Section>

          <Section title="Customer Changes" delay={0.65}>
            <p>
              Changes to an approved strategy may require a new scope, additional work, or a revised delivery timeline.
            </p>
          </Section>

          <Section title="Delivery" delay={0.7}>
            <p>
              Delivery targets apply to complete and sufficiently specified orders. Delays caused by missing information, customer responses, third-party services, data availability or technical dependencies may affect delivery time.
            </p>
          </Section>

          <Section title="Payment" delay={0.75}>
            <p>
              Customers may choose the available booking payment or full-payment option. A booking payment reserves the engineering slot and is applied toward the selected package total where applicable.
            </p>
          </Section>
        </div>
      </div>

      <CTA />
    </div>
  );
};
