"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useLoading } from "./LoadingProvider";

export default function Navigation() {
  const { isLoading } = useLoading();
  const t = useTranslations();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { href: "#services", label: t('nav.services') },
    { href: "#about", label: t('nav.about') },
    { href: "#projects", label: t('nav.projects') },
    { href: "#contact", label: t('nav.contact') },
  ];

  const scrollTo = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={!isLoading ? { y: 0 } : { y: -100 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? "bg-dark-950/90 backdrop-blur-xl" : "bg-transparent"
          }`}
      >
        <nav className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-20 lg:h-24">
            {/* Logo */}
            <motion.a
              href="#home"
              onClick={(e) => { e.preventDefault(); scrollTo("#home"); }}
              className="flex items-center"
              whileHover={{ scale: 1.02 }}
            >
              <Image
                src="/Verta-11.png"
                alt="VERTA Digital Agency"
                width={160}
                height={48}
                className="h-auto w-48"
                priority
              />
            </motion.a>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-12">
              {navItems.map((item) => (
                <motion.button
                  key={item.href}
                  onClick={() => scrollTo(item.href)}
                  className="text-sm text-dark-400 hover:text-white transition-colors uppercase tracking-widest"
                  whileHover={{ y: -2 }}
                >
                  {item.label}
                </motion.button>
              ))}
            </div>

            {/* Actions */}
            <div className="hidden lg:flex items-center gap-6">
              <motion.button
                onClick={() => scrollTo("#contact")}
                className="px-6 py-3 bg-white text-dark-950 text-sm font-semibold uppercase tracking-wider rounded-full hover:bg-dark-200 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {t('hero.cta')}
              </motion.button>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="flex lg:hidden items-center gap-4">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="w-10 h-10 flex items-center justify-center text-white"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 lg:hidden bg-dark-950"
          >
            <div className="flex flex-col items-center justify-center h-full gap-8">
              {navItems.map((item, i) => (
                <motion.button
                  key={item.href}
                  onClick={() => scrollTo(item.href)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="text-4xl font-display font-bold text-white hover:text-dark-400 transition-colors"
                >
                  {item.label}
                </motion.button>
              ))}
              <motion.button
                onClick={() => scrollTo("#contact")}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-8 px-8 py-4 bg-white text-dark-950 text-sm font-semibold uppercase tracking-wider rounded-full"
              >
                {t('hero.cta')}
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
