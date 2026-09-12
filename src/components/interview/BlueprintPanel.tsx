import React from 'react';
import { motion } from 'framer-motion';
import { Check, Circle, Clock, Package } from 'lucide-react';
import { Link } from 'react-router-dom';
import { InterviewSection } from '../../types/interview';
import { SECTION_LABELS } from '../../data/questions';

interface BlueprintPanelProps {
  sections: InterviewSection[];
  getSectionStatus: (section: string) => 'captured' | 'in-progress' | 'needs-clarification' | 'not-defined';
  currentSection: InterviewSection;
  readiness: number;
  selectedPackage: 'tradingview' | 'tradingview-mt5' | 'full';
}

const SECTION_ORDER: InterviewSection[] = [
  'trading-foundation',
  'strategy-discovery',
  'entry-logic',
  'trade-management',
  'risk-filters',
  'engineering-check'
];

const PACKAGE_LABELS = {
  'tradingview': { name: 'TradingView Indicator', price: 19 },
  'tradingview-mt5': { name: 'TradingView + MT5', price: 29 },
  'full': { name: 'Full Engineering', price: 49 }
};

export const BlueprintPanel: React.FC<BlueprintPanelProps> = ({
  getSectionStatus,
  currentSection,
  readiness,
  selectedPackage
}) => {
  const pkg = PACKAGE_LABELS[selectedPackage];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'captured':
        return <Check size={12} className="text-green-500" />;
      case 'in-progress':
        return <Clock size={12} className="text-orange-500 animate-pulse" />;
      case 'needs-clarification':
        return <Circle size={12} className="text-yellow-500" />;
      default:
        return <Circle size={12} className="text-gray-700" />;
    }
  };

  return (
    <div className="sticky top-32 space-y-6">
      <div className="bg-[#0A0A0A] border border-white/10 rounded-2xl p-6">
        <h3 className="text-white font-bold mb-4">ENGINEERING BLUEPRINT</h3>
        <div className="space-y-3">
          {SECTION_ORDER.map((section) => {
            const status = getSectionStatus(section);
            const isActive = currentSection === section;
            
            return (
              <div 
                key={section} 
                className={`flex items-center gap-3 p-2 rounded-lg transition-colors ${
                  isActive ? 'bg-white/5' : ''
                }`}
              >
                <div className="flex-shrink-0">
                  {getStatusIcon(status)}
                </div>
                <span className={`text-sm ${
                  status === 'captured' ? 'text-white' :
                  status === 'in-progress' ? 'text-white' :
                  status === 'needs-clarification' ? 'text-yellow-400' :
                  'text-gray-500'
                }`}>
                  {SECTION_LABELS[section]}
                </span>
              </div>
            );
          })}
        </div>

        <div className="mt-6 pt-6 border-t border-white/10">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-400">Engineering Readiness</span>
            <span className="text-sm text-white font-medium">{Math.round(readiness)}%</span>
          </div>
          <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-orange-500 to-blue-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${readiness}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2 text-gray-500 text-sm">
          <Clock size={14} />
          <span>Est. remaining: ~{Math.max(1, Math.ceil((100 - readiness) / 15))} min</span>
        </div>
      </div>

      <div className="bg-[#0A0A0A] border border-white/10 rounded-2xl p-6">
        <h3 className="text-white font-bold mb-4">SELECTED PACKAGE</h3>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-orange-500/10 border border-orange-500/30 flex items-center justify-center">
            <Package size={18} className="text-orange-400" />
          </div>
          <div>
            <p className="text-white font-medium">${pkg.price}</p>
            <p className="text-gray-500 text-sm">{pkg.name}</p>
          </div>
        </div>
        <Link to="/pricing" className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
          Change package →
        </Link>
      </div>
    </div>
  );
};
