import React from 'react';

const names = [
  'TradingView',
  'MT5',
  'FundedPips',
  'Forex Factory',
  'investing.com'
];

interface TrustLogosProps {
  title?: string;
}

export const TrustLogos: React.FC<TrustLogosProps> = ({ title }) => {
  return (
    <section className="w-full py-8 overflow-hidden border-y border-white/5 relative z-20 bg-black/30 backdrop-blur-sm">
      {title && (
        <div className="text-center mb-5 px-4">
          <p className="text-xs font-semibold tracking-[0.2em] text-gray-500 uppercase">{title}</p>
        </div>
      )}
      <div className="relative w-full max-w-[100vw] flex overflow-hidden">
        {/* Side Fade Masks */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#050505] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#050505] to-transparent z-10 pointer-events-none" />

        {/* Scrolling Infinite Marquee Container */}
        <div className="flex items-center gap-16 md:gap-24 animate-scroll whitespace-nowrap">
          {/* Loop 1 */}
          <div className="flex items-center gap-16 md:gap-24 min-w-full">
            {[...names, ...names].map((name, index) => (
              <span
                key={`name-1-${index}`}
                className="text-white/35 hover:text-white/70 transition-colors duration-300 font-semibold text-base md:text-lg tracking-tight flex-shrink-0 cursor-default select-none"
              >
                {name}
              </span>
            ))}
          </div>
          {/* Loop 2 for seamless continuous ticker */}
          <div className="flex items-center gap-16 md:gap-24 min-w-full">
            {[...names, ...names].map((name, index) => (
              <span
                key={`name-2-${index}`}
                className="text-white/35 hover:text-white/70 transition-colors duration-300 font-semibold text-base md:text-lg tracking-tight flex-shrink-0 cursor-default select-none"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
