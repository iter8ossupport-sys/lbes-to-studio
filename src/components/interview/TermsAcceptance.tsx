import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, FileText, AlertTriangle, Clock, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { GradientBorder } from '../ui/GradientBorder';
import { RollingText } from '../ui/RollingText';

interface TermsAcceptanceProps {
  onAccept: () => void;
  onBack: () => void;
}

const TERMS_SECTIONS = [
  {
    title: 'Privacy Policy',
    content: `Your strategy information is used solely to engineer the software deliverable you selected. We do not share, sell, or use your strategy for any purpose other than delivering your order. Your data is stored securely and deleted after delivery unless you request otherwise.`
  },
  {
    title: 'Terms of Service',
    content: `LBES provides trading strategy engineering services. The strategy you provide remains your intellectual property. The engineered software deliverable is licensed to you for personal use. You may not resell or redistribute the software.`
  },
  {
    title: 'Engineering Scope',
    content: `Your strategy will be engineered based on the approved specification. Any changes after approval may require additional engineering time and cost. The final deliverable will match the approved specification as closely as technically possible.`
  },
  {
    title: 'Delivery Expectations',
    content: `Delivery targets are estimates based on complexity and current queue. While we aim to meet stated targets, actual delivery time may vary. You will be notified of any significant delays.`
  },
  {
    title: 'No Performance Guarantee',
    content: `LBES does not guarantee trading performance, profitability, or specific results. Backtesting shows historical performance only and does not predict future results. Trading involves risk of loss.`
  },
  {
    title: 'Refund Policy',
    content: `5% booking payments are non-refundable once engineering begins. Full payment refunds are available before engineering starts, minus processing fees. After delivery, all sales are final.`
  }
];

export const TermsAcceptance: React.FC<TermsAcceptanceProps> = ({ onAccept, onBack }) => {
  const [accepted, setAccepted] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  return (
    <div className="max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
          Before we proceed
        </h1>
        <p className="text-gray-400 text-lg">
          Please review and accept the terms before continuing to payment.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-[#0A0A0A] border border-white/10 rounded-2xl overflow-hidden"
      >
        <div className="max-h-[400px] overflow-y-auto p-6 space-y-4">
          {TERMS_SECTIONS.map((section, index) => (
            <div key={index} className="border border-white/5 rounded-xl overflow-hidden">
              <button
                onClick={() => setExpandedSection(expandedSection === section.title ? null : section.title)}
                className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors"
              >
                <span className="text-white font-medium">{section.title}</span>
                <span className="text-gray-500 text-sm">
                  {expandedSection === section.title ? 'Collapse' : 'Expand'}
                </span>
              </button>
              {expandedSection === section.title && (
                <div className="px-4 pb-4">
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {section.content}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-6"
      >
        <label className="flex items-start gap-3 cursor-pointer group">
          <div className="relative mt-1">
            <input
              type="checkbox"
              checked={accepted}
              onChange={(e) => setAccepted(e.target.checked)}
              className="sr-only"
            />
            <div className={`w-5 h-5 rounded border-2 transition-colors ${
              accepted 
                ? 'bg-blue-500 border-blue-500' 
                : 'border-gray-600 group-hover:border-gray-500'
            }`}>
              {accepted && (
                <svg className="w-full h-full text-white p-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </div>
          </div>
          <span className="text-gray-300 text-sm">
            I have read and agree to the Terms of Service, Privacy Policy, and understand the engineering scope, delivery expectations, and refund policy.
          </span>
        </label>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex justify-between items-center mt-8"
      >
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors"
        >
          <ArrowLeft size={16} />
          Back to Review
        </button>

        <GradientBorder
          gradient="from-orange-500 via-red-500 to-orange-600"
          containerClassName="rounded-xl p-[1px]"
        >
          <button
            onClick={onAccept}
            disabled={!accepted}
            className="px-8 py-3 bg-[#0F0F0F] text-white font-medium rounded-xl hover:bg-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <RollingText text="Continue to Payment" />
          </button>
        </GradientBorder>
      </motion.div>
    </div>
  );
};
