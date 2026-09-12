import React from 'react';
import { motion } from 'framer-motion';
import { CTA } from '../components/CTA';

const examples = [
  {
    title: 'Breakout Strategy',
    type: 'Trend-Based',
    description: 'Price breaks above the high of the previous three candles on the 1H timeframe with volume confirmation.',
    entry: 'Enter on close above the breakout candle',
    exit: 'Take profit at 2R, stop loss below the swing low',
    platform: 'TradingView + MT5'
  },
  {
    title: 'Support Bounce',
    type: 'Reversal',
    description: 'Price touches a horizontal support level that has been tested at least 3 times in the past 50 candles.',
    entry: 'Enter when price rejects support with a bullish engulfing pattern',
    exit: 'Take profit at nearest resistance, stop loss below support',
    platform: 'TradingView'
  },
  {
    title: 'Moving Average Crossover',
    type: 'Indicator-Based',
    description: 'EMA 9 crosses above EMA 21 on the 4H timeframe while price is above both EMAs.',
    entry: 'Enter on the close of the crossover candle',
    exit: 'Exit when EMA 9 crosses back below EMA 21',
    platform: 'Full Engineering'
  }
];

const ExampleCard = ({ example, index }: { example: typeof examples[0]; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1 }}
    className="bg-[#0A0A0A] border border-white/10 rounded-2xl p-8 hover:border-white/20 transition-all"
  >
    <div className="flex items-center justify-between mb-6">
      <div>
        <h3 className="text-xl font-bold text-white mb-1">{example.title}</h3>
        <span className="text-xs font-medium text-orange-400 uppercase tracking-wider">{example.type}</span>
      </div>
      <span className="text-xs text-gray-500 bg-white/5 px-3 py-1 rounded-full">{example.platform}</span>
    </div>

    <div className="space-y-4">
      <div>
        <h4 className="text-sm font-medium text-gray-500 mb-1">Strategy Description</h4>
        <p className="text-gray-300 text-sm">{example.description}</p>
      </div>
      <div>
        <h4 className="text-sm font-medium text-gray-500 mb-1">Entry</h4>
        <p className="text-gray-300 text-sm">{example.entry}</p>
      </div>
      <div>
        <h4 className="text-sm font-medium text-gray-500 mb-1">Exit</h4>
        <p className="text-gray-300 text-sm">{example.exit}</p>
      </div>
    </div>

    <div className="mt-6 pt-6 border-t border-white/10">
      <p className="text-xs text-gray-500 italic">
        This is an example of how a strategy explanation translates into structured information. Not a guarantee of performance.
      </p>
    </div>
  </motion.div>
);

export const Examples = () => {
  return (
    <div className="relative w-full min-h-screen pt-32 bg-[#050505] overflow-x-hidden">
      {/* Background Ambient Glows */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-[60vw] h-[60vw] bg-orange-600/10 blur-[120px] rounded-full opacity-40" />
        <div className="absolute top-0 right-0 w-[60vw] h-[60vw] bg-blue-600/10 blur-[120px] rounded-full opacity-40" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 mb-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center rounded-full border border-white/20 bg-white/5 backdrop-blur-sm px-4 py-1.5 mb-8">
            <span className="text-[10px] md:text-xs font-bold tracking-widest text-white uppercase">
              EXAMPLES
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold text-white tracking-tight mb-6">
            See what LBES produces
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
            These examples show how strategy explanations translate into structured information and engineering output.
          </p>
        </motion.div>

        {/* Disclaimer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-blue-900/10 border border-blue-500/20 rounded-2xl p-6 mb-12"
        >
          <p className="text-blue-300 text-sm">
            <strong>Note:</strong> These are examples of the engineering process, not trading recommendations. Backtesting shows historical performance only and does not guarantee future results.
          </p>
        </motion.div>

        {/* Examples Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {examples.map((example, index) => (
            <ExampleCard key={index} example={example} index={index} />
          ))}
        </div>
      </div>

      <CTA />
    </div>
  );
};
