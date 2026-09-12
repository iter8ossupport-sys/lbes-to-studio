import React from 'react';
import { motion } from 'framer-motion';
import { Check, Clock, Package, FileText, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PACKAGES, OrderStatus } from '../../types/interview';

interface OrderConfirmationProps {
  orderId: string;
  packageId: 'tradingview' | 'tradingview-mt5' | 'full';
  status: OrderStatus;
  onViewSpecification: () => void;
}

const STATUS_STEPS = [
  { key: 'payment', label: 'Payment', statuses: ['payment-confirmed', 'order-confirmed', 'engineering-queued', 'engineering', 'backtest', 'qa', 'ready', 'delivered'] },
  { key: 'strategy', label: 'Strategy', statuses: ['order-confirmed', 'engineering-queued', 'engineering', 'backtest', 'qa', 'ready', 'delivered'] },
  { key: 'engineering', label: 'Engineering', statuses: ['engineering', 'backtest', 'qa', 'ready', 'delivered'] },
  { key: 'testing', label: 'Testing', statuses: ['backtest', 'qa', 'ready', 'delivered'] },
  { key: 'delivery', label: 'Delivery', statuses: ['ready', 'delivered'] }
];

export const OrderConfirmation: React.FC<OrderConfirmationProps> = ({
  orderId,
  packageId,
  status,
  onViewSpecification
}) => {
  const pkg = PACKAGES.find(p => p.id === packageId) || PACKAGES[1];

  const getStatusIcon = (stepKey: string, isComplete: boolean, isCurrent: boolean) => {
    if (isComplete) {
      return <Check size={14} className="text-green-500" />;
    }
    if (isCurrent) {
      return <Clock size={14} className="text-orange-500 animate-pulse" />;
    }
    return <div className="w-3.5 h-3.5 rounded-full bg-gray-700" />;
  };

  return (
    <div className="max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center">
          <Check size={32} className="text-green-500" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
          Your strategy is in the engineering queue.
        </h1>
        <p className="text-gray-400 text-lg">
          Order confirmed. Engineering will begin shortly.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-[#0A0A0A] border border-white/10 rounded-2xl p-8 mb-8"
      >
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-gray-500 text-sm mb-1">Order ID</p>
            <p className="text-white font-mono">#{orderId.slice(0, 8).toUpperCase()}</p>
          </div>
          <div className="text-right">
            <p className="text-gray-500 text-sm mb-1">Package</p>
            <p className="text-white font-medium">{pkg.name}</p>
          </div>
        </div>

        <div className="space-y-4">
          {STATUS_STEPS.map((step, index) => {
            const isComplete = step.statuses.includes(status);
            const isCurrent = index === STATUS_STEPS.findIndex(s => !s.statuses.includes(status)) - 1;
            
            return (
              <div key={step.key} className="flex items-center gap-4">
                <div className="flex-shrink-0">
                  {getStatusIcon(step.key, isComplete, isCurrent)}
                </div>
                <div className="flex-1 flex items-center justify-between">
                  <span className={`text-sm ${isComplete ? 'text-white' : isCurrent ? 'text-white' : 'text-gray-500'}`}>
                    {step.label}
                  </span>
                  <span className={`text-sm ${isComplete ? 'text-green-400' : isCurrent ? 'text-orange-400' : 'text-gray-600'}`}>
                    {isComplete ? 'Complete' : isCurrent ? 'In Progress' : 'Pending'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 pt-8 border-t border-white/10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm mb-1">Delivery Target</p>
              <p className="text-white font-medium">{pkg.deliveryTarget}</p>
            </div>
            <div className="text-right">
              <p className="text-gray-500 text-sm mb-1">Status</p>
              <p className="text-orange-400 font-medium capitalize">
                {status.replace(/-/g, ' ')}
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex flex-col sm:flex-row items-center justify-center gap-4"
      >
        <button
          onClick={onViewSpecification}
          className="flex items-center gap-2 px-6 py-3 rounded-xl border border-white/20 bg-white/5 text-white font-medium hover:bg-white/10 transition-colors"
        >
          <FileText size={16} />
          View Strategy Specification
        </button>

        <Link
          to="/"
          className="flex items-center gap-2 px-6 py-3 rounded-xl border border-white/10 text-gray-400 hover:text-white hover:border-white/20 transition-colors"
        >
          Return Home
        </Link>
      </motion.div>
    </div>
  );
};
