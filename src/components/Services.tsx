"use client";

import { motion, useInView } from "framer-motion";
import { Globe, Smartphone, Blocks, Brain, ArrowUpRight } from "lucide-react";
import { useRef } from "react";
import { useTranslations } from "next-intl";

const serviceIcons = [Globe, Blocks, Smartphone, Brain];
const serviceTech = [
  ["Next.js", "TypeScript", "Node.js", "React"],
  ["MultiversX", "Solidity", "Rust", "DeFi"],
  ["React Native", "Swift", "Kotlin", "Flutter"],
  ["OpenAI", "Python", "Mistral", "Vector DBs"]
];

export default function Services() {
  const t = useTranslations();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section
      id="services"
      ref={ref}
      className="relative py-20 lg:py-32 bg-dark-950 overflow-hidden"
      aria-labelledby="services-heading"
    >
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-white/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />

      <div className="relative z-10 max-w-[1600px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-24"
        >
          <div>
            <span className="text-xs text-dark-500 uppercase tracking-[0.3em] mb-4 block">{t('nav.services')}</span>
            <h2 id="services-heading" className="text-6xl lg:text-8xl font-display font-bold text-white leading-[0.9]">
              {t('services.title').split(" ").slice(0, 2).join(" ")}<br />
              <span className="text-dark-500">{t('services.title').split(" ").slice(2).join(" ")}</span>
            </h2>
          </div>
          <p className="text-dark-400 text-xl font-light leading-relaxed max-w-md">
            {t('services.subtitle')}
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-dark-800 border border-dark-800">
          {[0, 1, 2, 3].map((index) => {
            const Icon = serviceIcons[index];
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 1, delay: index * 0.1 }}
                className="group relative bg-dark-950 p-12 lg:p-16 hover:bg-dark-900 transition-colors"
              >
                <div className="relative z-10 h-full flex flex-col">
                  <div className="flex items-start justify-between mb-12">
                    <div className="w-16 h-16 rounded-2xl bg-dark-900 border border-dark-800 flex items-center justify-center group-hover:bg-white group-hover:border-white transition-all duration-500">
                      <Icon className="w-8 h-8 text-white group-hover:text-dark-950 transition-colors" />
                    </div>
                    <span className="text-[10px] font-mono text-dark-700 tracking-[0.2em] font-bold">
                      0{index + 1}
                    </span>
                  </div>

                  <h3 className="text-3xl font-display font-medium text-white mb-6 group-hover:translate-x-2 transition-transform duration-500">
                    {t(`services.items.${index}.title`)}
                  </h3>

                  <p className="text-dark-500 text-lg font-light leading-relaxed mb-8 flex-grow">
                    {t(`services.items.${index}.description`)}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {serviceTech[index].map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-mono text-dark-600 border border-dark-800 px-2 py-1 rounded group-hover:border-dark-700 transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="absolute top-12 right-12 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <ArrowUpRight className="w-6 h-6 text-dark-500" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
