import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Edit, Download, ArrowLeft, Check, AlertCircle } from 'lucide-react';
import { useInterview } from '../context/InterviewContext';
import { CTA } from '../components/CTA';

const STATUS_COLORS = {
  'captured': 'text-green-400 bg-green-500/10 border-green-500/30',
  'in-progress': 'text-orange-400 bg-orange-500/10 border-orange-500/30',
  'needs-clarification': 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30',
  'not-defined': 'text-gray-400 bg-gray-500/10 border-gray-500/30'
};

const STATUS_LABELS = {
  'captured': 'Captured',
  'in-progress': 'In Progress',
  'needs-clarification': 'Needs Clarification',
  'not-defined': 'Not Defined'
};

export const Specification: React.FC = () => {
  const { specification, editSection, approveSpecification, state } = useInterview();

  if (!specification) {
    return (
      <div className="relative w-full min-h-screen pt-32 bg-[#050505]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">No Specification Found</h1>
          <p className="text-gray-400 mb-8">Please complete the interview first.</p>
          <Link to="/interview" className="text-blue-400 hover:text-blue-300 transition-colors">
            Start Interview →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full min-h-screen pt-32 bg-[#050505] overflow-x-hidden">
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-[60vw] h-[60vw] bg-orange-600/10 blur-[120px] rounded-full opacity-40" />
        <div className="absolute top-0 right-0 w-[60vw] h-[60vw] bg-blue-600/10 blur-[120px] rounded-full opacity-40" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 mb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <Link
            to={state.status === 'customer-approved' ? '/' : '/interview'}
            className="inline-flex items-center gap-2 text-gray-500 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft size={16} />
            {state.status === 'customer-approved' ? 'Back to Home' : 'Back to Interview'}
          </Link>

          <div className="flex items-start justify-between">
            <div>
              <div className="inline-flex items-center rounded-full border border-blue-500/30 bg-blue-900/10 px-4 py-1.5 mb-6">
                <span className="text-[10px] md:text-xs font-bold tracking-widest text-blue-400 uppercase">
                  ENGINEERING SPECIFICATION
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
                Your Strategy Specification
              </h1>
              <p className="text-gray-400 text-lg max-w-2xl">
                This document represents your strategy as captured through the interview process. Review each section carefully before approval.
              </p>
            </div>

            <div className="text-right hidden md:block">
              <p className="text-gray-500 text-sm mb-1">Generated</p>
              <p className="text-white text-sm">
                {specification.generatedAt.toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>
          </div>
        </motion.div>

        <div className="space-y-6 mb-12">
          {specification.sections.map((section, index) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-[#0A0A0A] border border-white/10 rounded-2xl overflow-hidden"
            >
              <div className="flex items-center justify-between p-6 border-b border-white/5">
                <div className="flex items-center gap-4">
                  <h3 className="text-xl font-bold text-white">{section.title}</h3>
                  <span className={`text-xs px-3 py-1 rounded-full border ${STATUS_COLORS[section.status]}`}>
                    {STATUS_LABELS[section.status]}
                  </span>
                </div>
                <button
                  onClick={() => editSection(section.id)}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 text-gray-400 hover:text-white hover:border-white/20 transition-colors"
                >
                  <Edit size={14} />
                  Edit
                </button>
              </div>

              <div className="p-6">
                <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                  {section.content}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {!specification.approved && state.status !== 'customer-approved' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-[#0A0A0A] border border-white/10 rounded-2xl p-8"
          >
            <h3 className="text-xl font-bold text-white mb-4">
              Does this accurately represent your strategy?
            </h3>
            <p className="text-gray-400 mb-6">
              Once approved, this specification becomes the basis for engineering. You can still edit sections if needed.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <button
                onClick={() => approveSpecification()}
                className="w-full sm:w-auto px-8 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
              >
                <Check size={16} />
                Approve Strategy
              </button>
              <Link
                to="/interview"
                className="w-full sm:w-auto px-8 py-3 rounded-xl border border-white/20 text-white font-medium hover:bg-white/5 transition-colors text-center"
              >
                Edit an Answer
              </Link>
            </div>
          </motion.div>
        )}

        {specification.approved && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-green-500/10 border border-green-500/30 rounded-2xl p-8 text-center"
          >
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-500/20 flex items-center justify-center">
              <Check size={32} className="text-green-500" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Specification Approved</h3>
            <p className="text-green-300/70">
              Your strategy specification has been approved and is ready for engineering.
            </p>
          </motion.div>
        )}
      </div>

      <CTA />
    </div>
  );
};
