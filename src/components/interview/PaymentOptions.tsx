import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Shield, Check, ArrowLeft } from 'lucide-react';
import { GradientBorder } from '../ui/GradientBorder';
import { RollingText } from '../ui/RollingText';
import { PACKAGES, Package } from '../../types/interview';

interface PaymentOptionsProps {
  selectedPackage: 'tradingview' | 'tradingview-mt5' | 'full';
  onSelectOption: (option: 'booking' | 'full') => void;
  onBack: () => void;
}

export const PaymentOptions: React.FC<PaymentOptionsProps> = ({
  selectedPackage,
  onSelectOption,
  onBack
}) => {
  const [hoveredOption, setHoveredOption] = useState<'booking' | 'full' | null>(null);

  const pkg = PACKAGES.find(p => p.id === selectedPackage) || PACKAGES[1];
  const bookingAmount = (pkg.price * 0.05).toFixed(2);

  return (
    <div className="max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
          Your strategy is ready for engineering.
        </h1>
        <p className="text-gray-400 text-lg">
          Choose your payment option to proceed.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-[#0A0A0A] border border-white/10 rounded-2xl p-6 mb-8"
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-white font-bold text-lg">{pkg.name}</h3>
            <p className="text-gray-400 text-sm">{pkg.description}</p>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold text-white">${pkg.price}</p>
            <p className="text-gray-500 text-sm">one-time</p>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          onClick={() => onSelectOption('booking')}
          onMouseEnter={() => setHoveredOption('booking')}
          onMouseLeave={() => setHoveredOption(null)}
          className={`relative bg-[#0A0A0A] border rounded-2xl p-8 text-left transition-all ${
            hoveredOption === 'booking' 
              ? 'border-blue-500/50 shadow-[0_0_30px_rgba(59,130,246,0.1)]' 
              : 'border-white/10 hover:border-white/20'
          }`}
        >
          <div className="flex items-center justify-between mb-6">
            <span className="text-sm text-gray-500 uppercase tracking-wider">Option A</span>
            <CreditCard size={20} className="text-blue-400" />
          </div>

          <h3 className="text-2xl font-bold text-white mb-2">Reserve Your Slot</h3>
          <p className="text-gray-400 text-sm mb-6">
            Pay 5% to book your engineering slot. Remaining balance due before delivery.
          </p>

          <div className="flex items-baseline gap-1 mb-6">
            <span className="text-4xl font-bold text-white">${bookingAmount}</span>
            <span className="text-gray-500 text-sm">booking fee</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Shield size={14} />
            <span>Secure payment via Stripe</span>
          </div>
        </motion.button>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          onClick={() => onSelectOption('full')}
          onMouseEnter={() => setHoveredOption('full')}
          onMouseLeave={() => setHoveredOption(null)}
          className={`relative bg-[#0A0A0A] border rounded-2xl p-8 text-left transition-all ${
            hoveredOption === 'full' 
              ? 'border-orange-500/50 shadow-[0_0_30px_rgba(249,115,22,0.1)]' 
              : 'border-white/10 hover:border-white/20'
          }`}
        >
          <div className="absolute -top-3 right-6 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            Recommended
          </div>

          <div className="flex items-center justify-between mb-6">
            <span className="text-sm text-gray-500 uppercase tracking-wider">Option B</span>
            <Check size={20} className="text-orange-400" />
          </div>

          <h3 className="text-2xl font-bold text-white mb-2">Pay in Full</h3>
          <p className="text-gray-400 text-sm mb-6">
            Pay 100% now and proceed with the selected service immediately.
          </p>

          <div className="flex items-baseline gap-1 mb-6">
            <span className="text-4xl font-bold text-white">${pkg.price}</span>
            <span className="text-gray-500 text-sm">one-time</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Shield size={14} />
            <span>Secure payment via Stripe</span>
          </div>
        </motion.button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="flex justify-between items-center"
      >
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors"
        >
          <ArrowLeft size={16} />
          Back
        </button>

        <p className="text-gray-500 text-sm text-right">
          You'll be redirected to our secure payment provider
        </p>
      </motion.div>
    </div>
  );
};
