import React from 'react';
import { motion } from 'framer-motion';
import { Edit, Check, AlertCircle, Download, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import { StrategySpecification, SpecificationSection } from '../../types/interview';
import { GradientBorder } from '../ui/GradientBorder';
import { RollingText } from '../ui/RollingText';

interface SpecificationReviewProps {
  specification: StrategySpecification;
  onEditSection: (sectionId: string) => void;
  onApprove: () => void;
}

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

export const SpecificationReview: React.FC<SpecificationReviewProps> = ({
  specification,
  onEditSection,
  onApprove
}) => {
  const capturedCount = specification.sections.filter(s => s.status === 'captured').length;
  const needsAttention = specification.sections.filter(s => 
    s.status === 'needs-clarification' || s.status === 'not-defined'
  ).length;

  return (
    <div className="space-y-8">
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center rounded-full border border-blue-500/30 bg-blue-900/10 px-4 py-1.5 mb-6"
        >
          <span className="text-[10px] md:text-xs font-bold tracking-widest text-blue-400 uppercase">
            STRATEGY SPECIFICATION
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4"
        >
          This is what we understood.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-gray-400 text-lg max-w-2xl mx-auto"
        >
          Review your strategy in your own words before anything is engineered.
        </motion.p>
      </div>

      {needsAttention > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-yellow-500/10 border border-yellow-500/30 rounded-2xl p-6 flex items-start gap-4"
        >
          <AlertCircle className="text-yellow-500 flex-shrink-0 mt-0.5" size={20} />
          <div>
            <p className="text-yellow-300 font-medium mb-1">
              {needsAttention} section{needsAttention > 1 ? 's' : ''} need{needsAttention === 1 ? 's' : ''} attention
            </p>
            <p className="text-yellow-300/70 text-sm">
              Consider adding more detail to sections marked as "Needs Clarification" for a more accurate engineering specification.
            </p>
          </div>
        </motion.div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {specification.sections.map((section, index) => (
          <motion.div
            key={section.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
            className="bg-[#0A0A0A] border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-lg font-bold text-white">{section.title}</h3>
              <span className={`text-xs px-2 py-1 rounded-full border ${STATUS_COLORS[section.status]}`}>
                {STATUS_LABELS[section.status]}
              </span>
            </div>

            <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap min-h-[60px]">
              {section.content}
            </p>

            <button
              onClick={() => onEditSection(section.id)}
              className="mt-4 flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
            >
              <Edit size={14} />
              Edit
            </button>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8"
      >
        <Link
          to="/specification"
          className="flex items-center gap-2 px-6 py-3 rounded-xl border border-white/20 bg-white/5 text-white font-medium hover:bg-white/10 transition-colors"
        >
          <FileText size={16} />
          Open Full Specification
        </Link>

        <GradientBorder
          gradient="from-orange-500 via-red-500 to-orange-600"
          containerClassName="rounded-xl p-[1px]"
        >
          <button
            onClick={onApprove}
            className="px-8 py-3 bg-[#0F0F0F] text-white font-medium rounded-xl hover:bg-black transition-colors flex items-center gap-2"
          >
            <Check size={16} />
            <RollingText text="Approve Strategy" />
          </button>
        </GradientBorder>
      </motion.div>

      <p className="text-center text-gray-500 text-sm">
        Once approved, this specification becomes the basis for engineering.
      </p>
    </div>
  );
};
