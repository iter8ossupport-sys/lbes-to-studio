import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, ChevronLeft, Check } from 'lucide-react';
import { GradientBorder } from '../ui/GradientBorder';
import { RollingText } from '../ui/RollingText';

interface Option {
  value: string;
  label: string;
}

interface CalibrationStepProps {
  question: string;
  options: Option[];
  multiSelect: boolean;
  selectedValue: string | string[];
  onSelect: (value: string | string[]) => void;
  onContinue: () => void;
  onBack: () => void;
  canGoBack: boolean;
  isLastStep: boolean;
  currentStep: number;
  totalSteps: number;
}

export const CalibrationStep: React.FC<CalibrationStepProps> = ({
  question,
  options,
  multiSelect,
  selectedValue,
  onSelect,
  onContinue,
  onBack,
  canGoBack,
  isLastStep,
  currentStep,
  totalSteps
}) => {
  const handleOptionClick = (value: string) => {
    if (multiSelect) {
      const currentValues = Array.isArray(selectedValue) ? selectedValue : [];
      const newValues = currentValues.includes(value)
        ? currentValues.filter(v => v !== value)
        : [...currentValues, value];
      onSelect(newValues);
    } else {
      onSelect(value);
    }
  };

  const isSelected = (value: string) => {
    if (multiSelect) {
      return Array.isArray(selectedValue) && selectedValue.includes(value);
    }
    return selectedValue === value;
  };

  const canContinue = multiSelect
    ? Array.isArray(selectedValue) && selectedValue.length > 0
    : !!selectedValue;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && canContinue) {
      onContinue();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-8"
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      <div className="flex items-center gap-2 mb-4">
        <span className="text-sm text-gray-500">
          Step {currentStep} of {totalSteps}
        </span>
        <div className="flex-1 h-1 bg-gray-800 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-gradient-to-r from-blue-500 to-orange-500"
            initial={{ width: 0 }}
            animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      <h2 className="text-2xl md:text-3xl font-semibold text-white leading-relaxed">
        {question}
      </h2>

      {multiSelect && (
        <p className="text-sm text-gray-500">Select all that apply</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {options.map((option, index) => (
          <motion.button
            key={option.value}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => handleOptionClick(option.value)}
            className={`p-4 rounded-xl border text-left transition-all ${
              isSelected(option.value)
                ? 'bg-blue-500/10 border-blue-500/50 text-white'
                : 'bg-[#0A0A0A] border-white/10 text-gray-300 hover:border-white/30'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-medium">{option.label}</span>
              {isSelected(option.value) && (
                <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center">
                  <Check size={12} className="text-white" />
                </div>
              )}
            </div>
          </motion.button>
        ))}
      </div>

      <div className="flex justify-between items-center pt-4">
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
            onClick={onContinue}
            disabled={!canContinue}
            className="px-8 py-3 bg-[#0F0F0F] text-white font-medium rounded-xl hover:bg-black transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <RollingText text={isLastStep ? "Start Interview" : "Continue"} />
            <ChevronRight size={16} />
          </button>
        </GradientBorder>
      </div>

      <p className="text-center text-gray-600 text-xs">
        Press <kbd className="px-2 py-1 bg-gray-800 rounded text-gray-400">Enter</kbd> to continue
      </p>
    </motion.div>
  );
};
