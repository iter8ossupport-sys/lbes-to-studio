import React from 'react';
import { motion } from 'framer-motion';
import { Check, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { GradientBorder } from './ui/GradientBorder';
import { RollingText } from './ui/RollingText';
import { cn } from '../lib/utils';

const packages = [
  {
    id: 'tradingview',
    name: 'TradingView Indicator',
    price: '$19',
    description: 'Turn my strategy into TradingView software.',
    features: [
      'Adaptive strategy interview',
      'AI interview assistance',
      'Strategy summary',
      'TradingView indicator',
      '6-month backtest',
      '5+ pairs',
      'Multiple timeframes',
      '24–48 hour delivery target'
    ],
    cta: 'Build My Indicator',
    highlight: false
  },
  {
    id: 'tradingview-mt5',
    name: 'TradingView + MT5',
    price: '$29',
    description: 'Take my strategy from TradingView into MT5.',
    features: [
      'Everything in TradingView Indicator',
      'MT5 implementation',
      'MT5 source/code deliverable',
      '1-year backtest'
    ],
    cta: 'Build My System',
    highlight: true
  },
  {
    id: 'full',
    name: 'Full Engineering',
    price: '$49',
    description: 'Give my strategy the full engineering treatment.',
    features: [
      'Everything in TradingView + MT5',
      '10+ pairs',
      '2+ timeframes per pair',
      'Broader backtesting package',
      'Complete MT5 engineering deliverables',
      'VPS setup guidance'
    ],
    cta: 'Start Full Engineering',
    highlight: false
  }
];

const PricingFeature = ({ text }: { text: string }) => (
  <div className="flex items-start gap-3">
    <div className="mt-1 flex-shrink-0">
      <Sparkles size={14} className="text-blue-500 fill-blue-500/20" />
    </div>
    <span className="text-gray-300 text-sm font-medium">{text}</span>
  </div>
);

export const PricingSection = () => {
  return (
    <section id="pricing" className="w-full py-24 px-6 relative z-20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center rounded-full border border-white/20 bg-white/5 backdrop-blur-sm px-4 py-1.5 mb-6">
            <span className="text-[10px] md:text-xs font-bold tracking-widest text-white uppercase">
              PRICING
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-6">
            Choose how far you want to take it.
          </h2>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {packages.map((pkg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={cn(
                "relative flex flex-col bg-[#0A0A0A] border rounded-2xl p-8 transition-all h-full",
                pkg.highlight 
                  ? "border-orange-500/50 shadow-[0_0_40px_rgba(249,115,22,0.15)]" 
                  : "border-white/10 hover:border-white/20"
              )}
            >
              {pkg.highlight && (
                <div className="absolute -top-4 right-8 bg-gradient-to-r from-orange-500 to-red-500 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg">
                  Recommended
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-xl font-bold text-white mb-2">{pkg.name}</h3>
                <p className="text-gray-400 text-sm">{pkg.description}</p>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-white">{pkg.price}</span>
                </div>
              </div>

              <div className="mb-6">
                {pkg.highlight ? (
                  <GradientBorder
                    gradient="from-orange-500 via-red-500 to-orange-600"
                    containerClassName="w-full rounded-xl p-[1px]"
                    className="rounded-xl"
                  >
                    <Link
                      to={`/interview?package=${pkg.id}`}
                      className="block w-full py-3 bg-[#0F0F0F] text-white font-medium rounded-xl hover:bg-black transition-colors text-center"
                    >
                      <RollingText text={pkg.cta} className="justify-center" />
                    </Link>
                  </GradientBorder>
                ) : (
                  <Link
                    to={`/interview?package=${pkg.id}`}
                    className="block w-full py-3 rounded-xl border border-white/20 bg-white/5 text-white font-medium hover:bg-white/10 transition-colors text-center"
                  >
                    <RollingText text={pkg.cta} className="justify-center" />
                  </Link>
                )}
              </div>

              <div className="mt-auto space-y-4">
                <p className="text-xs font-semibold text-white uppercase tracking-wider mb-4">
                  What's Included
                </p>
                {pkg.features.map((feature, i) => (
                  <PricingFeature key={i} text={feature} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
