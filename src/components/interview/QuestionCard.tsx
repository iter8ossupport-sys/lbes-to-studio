import React from 'react';
import { motion } from 'framer-motion';
import { HelpCircle, ChevronRight, ChevronLeft } from 'lucide-react';
import { Question } from '../../types/interview';
import { GradientBorder } from '../ui/GradientBorder';
import { RollingText } from '../ui/RollingText';

interface QuestionCardProps {
  question: Question;
  experienceLevel: 'beginner' | 'intermediate' | 'advanced';
  currentAnswer: string;
  onAnswerChange: (answer: string) => void;
  onSubmit: () => void;
  onBack: () => void;
  canGoBack: boolean;
  questionNumber: number;
  totalQuestions: number;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  experienceLevel,
  currentAnswer,
  onAnswerChange,
  onSubmit,
  onBack,
  canGoBack,
  questionNumber,
  totalQuestions
}) => {
  const isBeginner = experienceLevel === 'beginner';
  const answerLength = currentAnswer.trim().length;
  const isVague = answerLength > 0 && answerLength < 10;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey) && currentAnswer.trim()) {
      onSubmit();
    }
  };

  return (
    <motion.div
      key={question.id}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="bg-[#0A0A0A] border border-white/10 rounded-2xl p-8"
      onKeyDown={handleKeyDown}
    >
      <div className="flex items-center gap-2 mb-6">
        <span className="text-sm text-gray-500">
          Question {questionNumber} of {totalQuestions}
        </span>
        {question.required && (
          <span className="text-xs bg-orange-500/10 text-orange-400 px-2 py-0.5 rounded-full">
            Required
          </span>
        )}
      </div>

      <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4 leading-relaxed">
        {question.question}
      </h2>

      {isBeginner && question.whyWeAreAsking && (
        <div className="mb-6 p-4 bg-blue-500/5 border border-blue-500/20 rounded-xl">
          <p className="text-sm text-blue-300">
            {question.whyWeAreAsking}
          </p>
        </div>
      )}

      <textarea
        value={currentAnswer}
        onChange={(e) => onAnswerChange(e.target.value)}
        placeholder={question.placeholder}
        className="w-full h-32 bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:border-blue-500/50 focus:bg-black/60 outline-none transition-all resize-none"
        autoFocus
      />

      {isBeginner && question.helperText && (
        <p className="mt-2 text-sm text-gray-500">
          Example: {question.helperText}
        </p>
      )}

      {isBeginner && question.answerStructure && (
        <div className="mt-4 p-4 bg-white/5 border border-white/10 rounded-xl">
          <p className="text-sm text-gray-400 mb-2">You can explain it like this:</p>
          <ol className="list-decimal list-inside space-y-1">
            {question.answerStructure.map((item, i) => (
              <li key={i} className="text-sm text-gray-300">{item}</li>
            ))}
          </ol>
        </div>
      )}

      {isVague && (
        <div className="mt-3 flex items-center gap-2 text-yellow-500 text-sm">
          <HelpCircle size={14} />
          <span>Consider adding more detail for a more accurate specification</span>
        </div>
      )}

      <button className="flex items-center gap-2 text-sm text-gray-500 hover:text-white transition-colors mt-4">
        <HelpCircle size={14} />
        I'm not sure how to explain this
      </button>

      <div className="flex justify-between items-center mt-8 pt-6 border-t border-white/10">
        {canGoBack ? (
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors"
          >
            <ChevronLeft size={16} />
            Back
          </button>
        ) : (
          <div />
        )}

        <GradientBorder
          gradient="from-orange-500 via-red-500 to-orange-600"
          containerClassName="rounded-xl p-[1px]"
        >
          <button
            onClick={onSubmit}
            disabled={!currentAnswer.trim()}
            className="px-8 py-3 bg-[#0F0F0F] text-white font-medium rounded-xl hover:bg-black transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <RollingText text="Continue" />
            <ChevronRight size={16} />
          </button>
        </GradientBorder>
      </div>

      <p className="text-center text-gray-600 text-xs mt-4">
        Press <kbd className="px-2 py-1 bg-gray-800 rounded text-gray-400">⌘ + Enter</kbd> to submit
      </p>
    </motion.div>
  );
};
