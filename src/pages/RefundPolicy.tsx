import React from 'react';
import { motion } from 'framer-motion';
import { CTA } from '../components/CTA';

const Section = ({ title, children, delay }: { title: string; children: React.ReactNode; delay: number }) => (
  <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay, duration: 0.5 }} className="mb-16">
    <h2 className="text-2xl md:text-3xl font-semibold text-white mb-6 tracking-tight">{title}</h2>
    <div className="text-gray-400 text-lg leading-relaxed space-y-4">{children}</div>
  </motion.div>
);

export const RefundPolicy = () => (
  <div className="relative w-full min-h-screen pt-32 bg-[#050505] overflow-x-hidden">
    <div className="fixed inset-0 pointer-events-none z-0"><div className="absolute top-0 left-0 w-[60vw] h-[60vw] bg-orange-600/10 blur-[120px] rounded-full opacity-60" /><div className="absolute top-0 right-0 w-[60vw] h-[60vw] bg-blue-600/10 blur-[120px] rounded-full opacity-60" /></div>
    <div className="relative z-10 max-w-4xl mx-auto px-6 mb-24">
      <div className="text-center mb-24"><div className="inline-block border border-white/20 bg-white/5 rounded-full px-4 py-1.5 mb-8"><span className="text-[10px] md:text-xs font-bold tracking-widest text-white uppercase">REFUND POLICY</span></div><h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold text-white tracking-tight mb-6">Refund Policy</h1><p className="text-gray-400 text-sm md:text-base">Last Updated: September 2026</p></div>
      <div className="border-t border-white/5 pt-16">
        <Section title="Before Engineering" delay={0.2}>
          <p>If LBES cannot reasonably implement the approved specification, the order will be handled according to the applicable cancellation/refund terms. Contact support promptly if you need to adjust your order prior to engineering kickoff.</p>
        </Section>
        <Section title="After Engineering Begins" delay={0.3}>
          <p>Refund eligibility may depend on work already performed and the circumstances of the request. Once engineering work has commenced on an approved specification, resources are allocated specifically to your deliverable.</p>
        </Section>
        <Section title="Delivered Software" delay={0.4}>
          <p>Technical defects in an agreed deliverable should first be reported to LBES for correction. We will review and address implementation defects that deviate from your approved specification in a timely manner.</p>
        </Section>
        <Section title="Customer-Requested Strategy Changes" delay={0.5}>
          <p>Changes to an approved strategy are different from implementation defects and may require additional work or revised scope.</p>
        </Section>
        <Section title="Test Results" delay={0.6}>
          <p>Unfavorable historical testing results do not by themselves constitute an engineering defect or guarantee a refund, because testing is intended to report the historical behavior of the defined rules.</p>
        </Section>
        <Section title="Booking Payments" delay={0.7}>
          <p>Customers may choose the available booking payment or full-payment option. A booking payment reserves the engineering slot and is applied toward the selected package total where applicable.</p>
        </Section>
      </div>
    </div>
    <CTA />
  </div>
);
