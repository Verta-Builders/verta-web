"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Globe, Languages } from "lucide-react";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { useState } from "react";

export default function Footer() {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isLangOpen, setIsLangOpen] = useState(false);

  const year = new Date().getFullYear();
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const switchLocale = (newLocale: 'en' | 'el') => {
    router.replace(pathname, { locale: newLocale });
    setIsLangOpen(false);
  };

  const links = [
    { label: t('footer.social.github'), href: "https://github.com/verta" },
    { label: t('footer.social.linkedin'), href: "https://linkedin.com/company/verta" },
    { label: t('footer.social.twitter'), href: "https://twitter.com/verta" },
  ];

  return (
    <footer className="relative bg-dark-950 border-t border-dark-800 overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
        {/* Main Footer */}
        <div className="py-24 grid lg:grid-cols-2 gap-16">
          {/* Left */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <div className="text-5xl lg:text-6xl font-display font-bold text-white leading-tight mb-6">
                {t('contact.title').split(" ").slice(0, 2).join(" ")}<br />{t('contact.title').split(" ").slice(2).join(" ")}
              </div>
              <motion.a
                href="#contact"
                className="inline-flex items-center gap-4 text-white group"
                whileHover={{ x: 8 }}
              >
                <span className="text-lg font-medium">{t('hero.cta')}</span>
                <div className="w-12 h-12 rounded-full border border-dark-600 flex items-center justify-center group-hover:bg-white group-hover:border-white transition-all">
                  <ArrowUpRight className="w-5 h-5 group-hover:text-dark-950 transition-colors" />
                </div>
              </motion.a>
            </motion.div>

            {/* Language Switcher */}
            <div className="relative inline-block">
              <motion.button
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="pr-6 pt-3 border border-dark-600 rounded-full text-white hover:bg-white hover:text-dark-950 transition-colors uppercase tracking-wider font-semibold text-xs flex items-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Languages className="w-5 h-5" />
                <span>{locale === 'en' ? 'EN' : 'EL'}</span>
              </motion.button>

              {isLangOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute top-full left-0 p-2 mb-2 bg-dark-950 border border-dark-700 rounded-lg overflow-hidden shadow-xl min-w-[160px] z-20"
                >
                  <button
                    onClick={() => switchLocale('en')}
                    className={`block w-full px-4 py-3 text-left text-xs uppercase tracking-wider transition-colors ${locale === 'en' ? 'text-white bg-dark-800' : 'text-dark-400 hover:text-white hover:bg-dark-800'
                      }`}
                  >
                    🇬🇧 English
                  </button>
                  <button
                    onClick={() => switchLocale('el')}
                    className={`block w-full px-4 py-3 text-left text-xs uppercase tracking-wider transition-colors ${locale === 'el' ? 'text-white bg-dark-800' : 'text-dark-400 hover:text-white hover:bg-dark-800'
                      }`}
                  >
                    🇬🇷 Ελληνικά
                  </button>
                </motion.div>
              )}
            </div>
          </div>

          {/* Right */}
          <div className="flex flex-col lg:items-end justify-between">
            <div className="flex flex-col lg:items-end gap-4 mb-12">
              <div className="text-xs text-dark-600 uppercase tracking-widest">{t('contact.info.email')}</div>
              <a href="mailto:info@verta.builders" className="text-2xl font-display font-bold text-white hover:text-dark-400 transition-colors">
                info@verta.builders
              </a>
            </div>

            <div className="flex gap-8">
              {links.map((link) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-dark-500 hover:text-white transition-colors uppercase tracking-wider"
                  whileHover={{ y: -2 }}
                >
                  {link.label}
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-8 border-t border-dark-800 flex flex-col lg:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <Image
            src="/Verta-8.png"
            alt="VERTA Digital Agency"
            width={140}
            height={42}
            className="h-auto w-20 z-10"
          />

          {/* Copyright */}
          <div className="text-xs text-dark-600">
            © {year} VERTA. {t('footer.rights')}
          </div>



          {/* Back to top */}
          <motion.button
            onClick={scrollToTop}
            className="text-xs text-dark-500 hover:text-white transition-colors uppercase tracking-wider flex items-center gap-2"
            whileHover={{ y: -2 }}
          >
            {t('nav.home')}
            <ArrowUpRight className="w-4 h-4" />
          </motion.button>
        </div>
      </div>

      {/* Giant Background Text */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden pointer-events-none select-none">
        <div className="text-[20vw] font-display font-bold text-dark-900/30 leading-none whitespace-nowrap translate-y-1/3">
          VERTA
        </div>
      </div>
    </footer>
  );
}
