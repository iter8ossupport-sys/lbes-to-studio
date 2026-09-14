import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    question: "Will LBES guarantee that my strategy is profitable?",
    answer: "No. LBES engineers and tests the rules you provide. Historical testing is evidence about historical behavior, not a guarantee of future performance."
  },
  {
    question: "Do I need coding knowledge?",
    answer: "No. The strategy interview is designed so you can explain your strategy in your own words."
  },
  {
    question: "What is T→T?",
    answer: "T→T means Trader-to-Trader Learning Support. You can ask educational questions about your LBES specification, implementation and testing evidence."
  },
  {
    question: "Can T→T tell me what trades to take?",
    answer: "No. T→T is educational support and does not provide trade signals or personalized investment recommendations."
  },
  {
    question: "What if my backtest isn't good?",
    answer: "The test reports what your defined rules showed under the specified historical conditions. A weak result is useful evidence about the current specification; it is not presented as a promise of profitability."
  },
  {
    question: "What do I need before starting?",
    answer: "You need a trading strategy — even if it's not fully defined. It can exist in your head, in notes, on charts, or as a rough set of rules. LBES helps you extract and structure it."
  },
  {
    question: "How does the interview work?",
    answer: "The interview adapts to your experience and strategy depth. It asks questions based on what you've already told it, identifying missing information and clarifying ambiguity as you go."
  },
  {
    question: "What is included in each package?",
    answer: "TradingView Indicator ($19) includes indicator + 6-month backtest. TradingView + MT5 ($29) adds MT5 algorithm & source code + 1-year backtest. Full Engineering ($49) includes 10+ pairs, 5+ timeframes, broader historical testing, and 30-day T→T support."
  },
  {
    question: "Can I review my strategy before engineering?",
    answer: "Yes. You always review and approve the strategy specification before any engineering begins."
  }
];

export const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="w-full py-24 px-6 relative z-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
        {/* Left Column: Header */}
        <div className="flex flex-col justify-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-6xl lg:text-7xl font-semibold text-white tracking-tight leading-[1.1] mb-8"
          >
            Frequently <br />
            asked <br />
            questions
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 text-lg leading-relaxed max-w-md"
          >
            Everything you need to know about turning your strategy into working software.
          </motion.p>
        </div>

        {/* Right Column: Accordion */}
        <div className="flex flex-col gap-4 justify-center">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="bg-gradient-to-br from-[#0A0A0A] to-[#050505] border border-white/10 rounded-2xl overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-white/[0.02] transition-colors"
              >
                <span className="text-base md:text-lg font-medium text-white pr-8">
                  {faq.question}
                </span>
                <div className="flex-shrink-0 text-gray-400">
                  {openIndex === index ? (
                    <Minus size={20} />
                  ) : (
                    <Plus size={20} />
                  )}
                </div>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-6 pb-6 text-gray-400 leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
