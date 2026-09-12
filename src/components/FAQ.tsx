import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { RollingText } from "./ui/RollingText";

const faqs = [
  {
    question: "Which apps can I integrate?",
    answer:
      "Converge AI supports 50+ integrations, including Slack, HubSpot, Zendesk, Salesforce, Google Workspace, WhatsApp, Zapier, and more.",
  },
  {
    question: "How does Converge AI automate tasks?",
    answer:
      "Converge AI connects your existing tools and uses intelligent agents to listen for triggers (like a new email or form submission) and execute multi-step workflows automatically.",
  },
  {
    question: "Is my data secure with Converge AI?",
    answer:
      "Yes, we prioritize security. All data is encrypted at rest and in transit, and we are SOC2 Type II compliant to ensure your information remains protected.",
  },
  {
    question: "What kind of support do you offer?",
    answer:
      "We offer 24/7 priority support for all enterprise plans, along with a comprehensive knowledge base and community forum for all users.",
  },
];

export const FAQ = () => {
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

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="space-y-8"
          >
            <div className="space-y-2">
              <h3 className="text-xl font-medium text-white">
                Got any Questions?
              </h3>
              <p className="text-gray-400 text-lg leading-relaxed max-w-md">
                Let us know! Reach out and our team will get right back to you.
              </p>
            </div>

            <button
              className="w-fit px-8 py-3 rounded-full border border-white/20 text-white font-medium hover:bg-white/10 transition-colors group"
              name="contact-us"
            >
              <RollingText text="Contact us" />
            </button>
          </motion.div>
        </div>

        {/* Right Column: Accordion */}
        <div className="flex flex-col gap-4 justify-center">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-gradient-to-br from-[#0A0A0A] to-[#050505] border border-white/10 rounded-2xl overflow-hidden"
            >
              <button
                name={`faq-${index}`}
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-white/[0.02] transition-colors"
              >
                <span className="text-lg md:text-xl font-medium text-white pr-8">
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
