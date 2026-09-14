import { Link } from "react-router-dom";
import { GradientBorder } from "./ui/GradientBorder";
import { RollingText } from "./ui/RollingText";
import { motion } from "framer-motion";
import { ArrowDown, MessageSquare, FileCode, CheckCircle } from "lucide-react";
import { TrustLogos } from "./TrustLogos";

export const Hero = () => {
  return (
    <div className="relative w-full min-h-[95vh] overflow-hidden flex flex-col items-center justify-center pt-24 pb-48">
      {/* Background Video/Effect */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-transparent to-orange-900/20" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/80 via-transparent to-[#050505]" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 flex flex-col items-center justify-center h-full mt-10 md:mt-0">
        {/* Eyebrow */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <div className="inline-flex items-center rounded-full border border-blue-500/30 bg-blue-900/10 backdrop-blur-md px-4 py-1.5 shadow-[0_0_20px_rgba(77,121,255,0.2)]">
            <span className="text-[10px] md:text-xs font-bold tracking-wider uppercase bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-400">
              FROM YOUR STRATEGY → WORKING SOFTWARE
            </span>
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-[clamp(42px,10vw,54px)] md:text-[clamp(48px,6.5vw,68px)] lg:text-[clamp(56px,5.5vw,84px)] font-bold tracking-[-0.045em] leading-[1.0] mb-6 max-w-4xl text-center drop-shadow-[0_10px_35px_rgba(59,130,246,0.25)]"
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-b from-white via-slate-100 to-blue-200/80">
            Your strategy is in your head
          </span>
          <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-200 to-orange-300">
            Let's make it clear
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-gray-400 text-lg md:text-xl max-w-3xl leading-relaxed mb-10 font-light text-center"
        >
          AI can write code. The harder part is making sure the code represents what you actually mean. LBES starts with understanding your strategy, asking the right questions, and turning your rules into verified software.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center gap-4 mb-6"
        >
          <GradientBorder
            gradient="from-orange-500 via-red-500 to-orange-600"
            containerClassName="rounded-full p-[1px]"
          >
            <Link
              to="/interview"
              className="px-8 py-3.5 bg-black text-white font-medium rounded-full hover:bg-gray-900 transition-colors flex items-center gap-2 group"
            >
              <RollingText text="Start Your Strategy" />
            </Link>
          </GradientBorder>

          <Link
            to="/#how-it-works"
            className="px-8 py-3.5 text-white font-medium border border-white/20 rounded-full hover:bg-white/10 transition-colors backdrop-blur-sm group"
          >
            <RollingText text="See How It Works" />
          </Link>
        </motion.div>

        {/* Microcopy */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-gray-500 text-sm mb-20"
        >
          No coding required to explain your strategy.
        </motion.p>

        {/* Visual Flow */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="w-full max-w-4xl"
        >
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
            {/* Step 1: Your Strategy */}
            <div className="flex-1 w-full max-w-xs">
              <div className="bg-[#0A0A0A] border border-white/10 rounded-2xl p-6 hover:border-blue-500/30 transition-colors">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-blue-500/10 border border-blue-500/30 flex items-center justify-center">
                    <MessageSquare size={18} className="text-blue-400" />
                  </div>
                  <span className="text-white font-medium">Your Strategy</span>
                </div>
                <p className="text-gray-400 text-sm italic">"I enter when price breaks above the high of the previous three candles..."</p>
              </div>
            </div>

            {/* Arrow */}
            <div className="hidden md:block">
              <ArrowDown size={24} className="text-gray-600 md:hidden" />
              <svg width="40" height="24" viewBox="0 0 40 24" className="text-gray-600">
                <path d="M0 12h32M24 4l8 8-8 8" stroke="currentColor" strokeWidth="2" fill="none" />
              </svg>
            </div>
            <div className="md:hidden">
              <ArrowDown size={24} className="text-gray-600" />
            </div>

            {/* Step 2: LBES Interview */}
            <div className="flex-1 w-full max-w-xs">
              <div className="bg-[#0A0A0A] border border-orange-500/30 rounded-2xl p-6 shadow-[0_0_30px_rgba(249,115,22,0.1)]">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-orange-500/10 border border-orange-500/30 flex items-center justify-center">
                    <MessageSquare size={18} className="text-orange-400" />
                  </div>
                  <span className="text-white font-medium">LBES Interview</span>
                </div>
                <p className="text-gray-400 text-sm">"Tell us what happens next after the breakout..."</p>
              </div>
            </div>

            {/* Arrow */}
            <div className="hidden md:block">
              <svg width="40" height="24" viewBox="0 0 40 24" className="text-gray-600">
                <path d="M0 12h32M24 4l8 8-8 8" stroke="currentColor" strokeWidth="2" fill="none" />
              </svg>
            </div>
            <div className="md:hidden">
              <ArrowDown size={24} className="text-gray-600" />
            </div>

            {/* Step 3: Software */}
            <div className="flex-1 w-full max-w-xs">
              <div className="bg-[#0A0A0A] border border-white/10 rounded-2xl p-6 hover:border-green-500/30 transition-colors">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center">
                    <FileCode size={18} className="text-green-400" />
                  </div>
                  <span className="text-white font-medium">Your Software</span>
                </div>
                <p className="text-gray-400 text-sm">TradingView Indicator / MT5 System</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="w-full mt-16 relative z-20">
        <TrustLogos />
      </div>
    </div>
  );
};
