"use client";

import { motion, useInView } from "framer-motion";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { useRef } from "react";
import { useTranslations } from "next-intl";

export default function Projects() {
  const t = useTranslations();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section
      id="projects"
      ref={ref}
      className="relative py-20 lg:py-32 bg-dark-950 overflow-hidden"
      aria-labelledby="projects-heading"
    >
      <div className="absolute inset-0 bg-dark-950" />

      <div className="relative z-10 max-w-[1600px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-24"
        >
          <div>
            <span className="text-xs text-dark-500 uppercase tracking-[0.3em] mb-4 block">{t('nav.projects')}</span>
            <h2 id="projects-heading" className="text-5xl lg:text-7xl font-display font-bold text-white leading-[0.9]">
              {t('projects.title').split(" ").slice(0, 1).join(" ")}<br /><span className="text-dark-500">{t('projects.title').split(" ").slice(1).join(" ")}</span>
            </h2>
          </div>
          <p className="text-dark-400 text-lg font-light max-w-md">
            {t('projects.subtitle')}
          </p>
        </motion.div>

        {/* Projects List */}
        <div className="border-t border-dark-800 grid grid-cols-1 lg:grid-cols-2">
          {[0, 1, 2, 3, 4, 5].map((index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              className={`
                group relative border-b border-dark-800 py-8 lg:py-12
                ${index < 2 ? "lg:col-span-1" : "lg:col-span-2"}
                ${index === 0 ? "lg:border-r" : ""}
              `}
            >
              {/* Main Project Link Overlay */}
              <a
                href={t(`projects.items.${index}.link`)}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-0 z-0"
                aria-label={t(`projects.items.${index}.name`)}
              />

              <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6 pointer-events-none">
                {/* Left */}
                <div className="flex items-center gap-8">
                  {/* Number */}
                  <span className="text-sm font-mono text-dark-700 w-8">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  {/* Name */}
                  <div className="flex flex-col items-start gap-2">
                    {t(`projects.items.${index}.badge`) && (
                      <a
                        href={t(`projects.items.${index}.badgeLink`) || undefined}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`
                          pointer-events-auto
                          inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] uppercase tracking-wider font-bold border transition-all
                          ${t(`projects.items.${index}.badge`).includes("Winner") || t(`projects.items.${index}.badge`).includes("Νικητής")
                            ? "border-yellow-500/50 text-yellow-500 bg-yellow-500/10 hover:bg-yellow-500/20"
                            : "border-zinc-500/50 text-zinc-400 bg-zinc-500/10 hover:bg-zinc-500/20"
                          }
                          ${!t(`projects.items.${index}.badgeLink`) ? "pointer-events-none" : "hover:border-yellow-500"}
                        `}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trophy"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" /><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" /><path d="M4 22h16" /><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" /><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" /><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" /></svg>
                        {t(`projects.items.${index}.badge`)}
                      </a>
                    )}
                    <h3 className="text-3xl lg:text-5xl font-display font-bold text-white group-hover:text-dark-300 transition-colors">
                      {t(`projects.items.${index}.name`)}
                    </h3>
                    <p className="text-xs text-dark-600 font-light mt-1 max-w-sm hidden lg:block opacity-0 group-hover:opacity-100 transition-opacity">
                      {t(`projects.items.${index}.description`)}
                    </p>
                  </div>

                  {/* Tech Badges */}
                  <div className="hidden lg:flex gap-2 ml-8">
                    {(t.raw(`projects.items.${index}.tech`) as string[]).map((tag: string) => (
                      <span key={tag} className="px-2 py-0.5 text-[8px] font-bold tracking-wider text-dark-500 border border-dark-800 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right */}
                <div className="flex items-center gap-8 lg:gap-16 pl-16 lg:pl-0">
                  <span className="text-sm font-mono text-dark-600">{t(`projects.items.${index}.year`)}</span>
                  <motion.div
                    className="w-12 h-12 rounded-full border border-dark-700 flex items-center justify-center group-hover:bg-white group-hover:border-white transition-all"
                    whileHover={{ scale: 1.1 }}
                  >
                    <ArrowUpRight className="w-5 h-5 text-dark-500 group-hover:text-dark-950 transition-colors" />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-24 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8"
        >
          <p className="text-dark-500 text-lg">
            {t('contact.subtitle')}
          </p>
          <motion.a
            href="#contact"
            className="group flex items-center gap-4 text-white"
            whileHover={{ x: 8 }}
          >
            <span className="text-sm uppercase tracking-widest font-medium">{t('hero.cta')}</span>
            <div className="w-12 h-12 rounded-full border border-dark-700 flex items-center justify-center group-hover:bg-white group-hover:border-white transition-all">
              <ExternalLink className="w-5 h-5 group-hover:text-dark-950 transition-colors" />
            </div>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
