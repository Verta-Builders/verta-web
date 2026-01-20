"use client";

import { motion } from "framer-motion";
import { ArrowRight, ArrowDownRight } from "lucide-react";
import { useTranslations } from "next-intl";

export default function Hero() {
  const t = useTranslations();

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-between overflow-hidden bg-dark-950"
      aria-label="Hero section"
    >
      {/* Background Grid */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-dark-950" />
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
              <path d="M 100 0 L 0 0 0 100" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex-1 flex items-center">
        <div className="w-full max-w-[1600px] mx-auto px-6 lg:px-12 pt-32">
          {/* Top Line */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="flex items-center gap-4 mb-12"
          >
            <div className="w-2 h-2 bg-white rounded-full" />
            <span className="text-xs text-dark-500 uppercase tracking-[0.3em]">{t('hero.badge')}</span>
            <div className="flex-1 h-px bg-dark-800" />
            <span className="text-xs text-dark-600 font-mono">{t('hero.established')}</span>
          </motion.div>

          {/* Massive Title */}
          <div className="mb-16">
            <motion.h1
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="text-[12vw] lg:text-[10vw] font-display font-bold leading-[0.85] tracking-tighter"
            >
              <span className="block text-white uppercase">{t('hero.title1')}</span>
            </motion.h1>
            <motion.h1
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-[12vw] lg:text-[10vw] font-display font-bold leading-[0.85] tracking-tighter"
            >
              <span className="block text-dark-600 uppercase">{t('hero.title2')}</span>
            </motion.h1>
            <motion.h1
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-[12vw] lg:text-[10vw] font-display font-bold leading-[0.85] tracking-tighter"
            >
              <span className="block text-white uppercase">{t('hero.title3')}</span>
            </motion.h1>
          </div>

          {/* Bottom Row */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-col lg:flex-row lg:items-end justify-between gap-12"
          >
            {/* Left - Description */}
            <div className="max-w-md">
              <p className="text-lg text-dark-400 font-light leading-relaxed mb-8">
                {t('hero.subtitle')}
              </p>
              <motion.button
                onClick={() => scrollToSection("#contact")}
                className="group flex items-center gap-4 text-white"
                whileHover={{ x: 8 }}
              >
                <span className="text-sm uppercase tracking-widest font-medium">{t('hero.cta')}</span>
                <div className="w-12 h-12 rounded-full border border-dark-700 flex items-center justify-center group-hover:bg-white group-hover:border-white transition-all">
                  <ArrowRight className="w-5 h-5 group-hover:text-dark-950 transition-colors" />
                </div>
              </motion.button>
            </div>

            {/* Right - Stats */}
            <div className="flex gap-16">
              <Stat value="50+" label={t('hero.stats.projects')} />
              <Stat value="10+" label={t('hero.stats.years')} />
              <Stat value="30+" label={t('hero.stats.clients')} />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="relative z-10 pb-12 px-6 lg:px-12"
      >
        <div className="max-w-[1600px] mx-auto flex items-center justify-between">
          <motion.button
            onClick={() => scrollToSection("#services")}
            className="flex items-center gap-3 text-dark-500 hover:text-white transition-colors"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ArrowDownRight className="w-5 h-5" />
            <span className="text-xs uppercase tracking-widest">{t('nav.home')}</span>
          </motion.button>
          <div className="hidden lg:flex items-center gap-8">
            <span className="text-xs text-dark-600">{t('about.founders.0.location')}</span>
            <span className="text-xs text-dark-600">•</span>
            <span className="text-xs text-dark-600">{t('contact.info.availabilityText')}</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="text-5xl lg:text-6xl font-display font-bold text-white mb-1">{value}</div>
      <div className="text-xs text-dark-500 uppercase tracking-widest">{label}</div>
    </div>
  );
}
