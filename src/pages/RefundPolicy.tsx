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
        <Section title="Before Engineering Starts" delay={0.2}><p>If you cancel before LBES has started work on your approved specification, contact support promptly. Eligible refunds are reviewed based on the payment made, work already performed, payment-provider fees, and applicable law.</p></Section>
        <Section title="After Engineering Starts" delay={0.3}><p>Once engineering, implementation, testing, or a custom deliverable has started, payments may be non-refundable because the service is performed specifically for your strategy. We will still review genuine delivery or service issues in good faith.</p></Section>
        <Section title="Booking Payments" delay={0.4}><p>A booking payment reserves a place in the engineering queue. It does not automatically charge the remaining balance. The remaining balance is due only through a separately agreed payment step before delivery.</p></Section>
        <Section title="Payment Errors and Duplicate Charges" delay={0.5}><p>If Razorpay shows a failed, duplicated, or reversed payment, keep the Razorpay reference and contact support. LBES will investigate the order record and coordinate with the payment provider where needed. A redirect back to LBES alone is not proof of payment.</p></Section>
        <Section title="How to Request Help" delay={0.6}><p>Include your LBES order ID, the email on the account, the Razorpay payment reference, and a short description. Never send card numbers, UPI PINs, passwords, API keys, or service-role credentials.</p></Section>
        <Section title="Policy Updates" delay={0.7}><p>This policy may change as the service and payment process evolve. The date above identifies the current version.</p></Section>
      </div>
    </div>
    <CTA />
  </div>
);
