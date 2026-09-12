import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    question: "What do I need before starting?",
    answer: "You need a trading strategy — even if it's not fully defined. It can exist in your head, in notes, on charts, or as a rough set of rules. LBES helps you extract and structure it."
  },
  {
    question: "Do I need coding knowledge?",
    answer: "No. You explain your strategy in plain language. LBES handles the technical translation. You review what we understood before anything is engineered."
  },
  {
    question: "How does the interview work?",
    answer: "The interview adapts to your experience and strategy depth. It asks questions based on what you've already told it, identifying missing information and clarifying ambiguity as you go."
  },
  {
    question: "Can I explain my strategy in plain English?",
    answer: "Yes. There are no technical terms you need to know. Explain things the way you normally would. If something is unclear, LBES will ask follow-up questions."
  },
  {
    question: "What happens after I approve the summary?",
    answer: "Your strategy moves into engineering based on the package you selected. You can track the status of your order from your dashboard."
  },
  {
    question: "What is included in each package?",
    answer: "TradingView Indicator ($19) includes the indicator, 6-month backtest, 5+ pairs, and multiple timeframes. TradingView + MT5 ($29) adds MT5 implementation and 1-year backtest. Full Engineering ($49) includes 10+ pairs, broader testing, and VPS guidance."
  },
  {
    question: "What platforms are supported?",
    answer: "TradingView and MetaTrader 5 (MT5). The TradingView package delivers a Pine Script indicator. The MT5 packages include both TradingView and MT5 implementations."
  },
  {
    question: "How long does delivery take?",
    answer: "TradingView Indicator targets 24–48 hours. TradingView + MT5 targets 48–72 hours. Full Engineering timing depends on scope and will be communicated during booking."
  },
  {
    question: "Can I review my strategy before engineering?",
    answer: "Yes. You always review and approve the strategy summary before any engineering begins. You can edit answers if something doesn't look right."
  },
  {
    question: "What are the limitations of backtesting?",
    answer: "Backtesting shows how your strategy would have performed on historical data. It is not a guarantee of future performance. Results depend on data quality, execution assumptions, and market conditions."
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
