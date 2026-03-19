"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { useState } from "react";
import { useTranslations } from "next-intl";

const faqs = [
  {
    question: "What is the typical timeline for a custom web app?",
    answer: "Based on the project complexity, timelines typically range from 5 days to a few weeks for a production-ready MVP."
  },
  {
    question: "Do you provide blockchain consulting for startups?",
    answer: "Yes, we provide full-cycle blockchain consulting, auditing, and engineering for startups looking to scale."
  },
  {
    question: "Where is VERTA located and do you work remotely?",
    answer: "We are headquartered in Zakynthos, with an engineering hub in Thessaloniki. We work with clients globally using a seamless remote-first workflow."
  },
  {
    question: "What technology stack do you use?",
    answer: "We specialize in the Next.js/React ecosystem, TypeScript, Node.js, and specialized tools like MultiversX for blockchain and OpenAI/Mistral for AI solutions."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24 bg-dark-950 border-t border-white/5">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-xs text-dark-500 uppercase tracking-widest mb-4 block">Questions</span>
          <h2 className="text-4xl lg:text-5xl font-display font-medium text-white">Expert FAQ</h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-white/5 rounded-2xl overflow-hidden bg-white/[0.02]"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 lg:p-8 text-left transition-colors hover:bg-white/[0.05]"
              >
                <span className="text-lg lg:text-xl font-medium text-white pr-8">
                  {faq.question}
                </span>
                <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center flex-shrink-0">
                  {openIndex === index ? (
                    <Minus className="w-4 h-4 text-white" />
                  ) : (
                    <Plus className="w-4 h-4 text-white" />
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
                    <div className="p-6 lg:p-8 pt-0 text-dark-400 font-light text-lg leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
