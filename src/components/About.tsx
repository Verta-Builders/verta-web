"use client";

import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, Github, Linkedin, Twitter } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { useTranslations } from "next-intl";

export default function About() {
  const t = useTranslations();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section
      id="about"
      ref={ref}
      className="relative py-24 lg:py-40 bg-dark-950 overflow-hidden"
      aria-labelledby="about-heading"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-white/[0.03] blur-[120px] rounded-full" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-white/[0.02] blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-[1600px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 mb-32"
        >
          <div className="max-w-3xl">
            <span className="text-xs text-dark-500 uppercase tracking-[0.4em] mb-6 block font-medium">
              {t('nav.about')}
            </span>
            <h2 id="about-heading" className="text-7xl lg:text-9xl font-display font-bold text-white leading-[0.85] tracking-tighter uppercase">
              {t('about.title').split(" ").slice(0, 1).join(" ")}<br />
              <span className="text-dark-700">{t('about.title').split(" ").slice(1).join(" ")}</span>
            </h2>
          </div>
          <p className="text-dark-400 text-xl lg:text-2xl font-light leading-relaxed max-w-xl">
            {t('about.subtitle')}
          </p>
        </motion.div>

        {/* Founders Grid */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
          {[0, 1].map((index) => (
            <FounderCard key={index} founderIndex={index} isInView={isInView} />
          ))}
        </div>

        {/* Bottom Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-32 pt-20 border-t border-white/5"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              { labelKey: "about.stats.genesis", value: "2018" },
              { labelKey: "about.stats.operation", valueKey: "about.stats.decentralized" },
              { labelKey: "about.stats.network", valueKey: "about.stats.global" },
              { labelKey: "about.stats.standard", valueKey: "about.stats.excellence" },
            ].map((stat) => (
              <StatItem key={stat.labelKey} labelKey={stat.labelKey} value={stat.value} valueKey={stat.valueKey} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function StatItem({ labelKey, value, valueKey }: { labelKey: string; value?: string; valueKey?: string }) {
  const t = useTranslations();
  return (
    <div className="group cursor-default">
      <div className="text-[10px] text-dark-600 uppercase tracking-[0.3em] mb-3 group-hover:text-dark-400 transition-colors">
        {t(labelKey)}
      </div>
      <div className="text-3xl lg:text-4xl font-display font-bold text-white/90 group-hover:text-white transition-colors">
        {value || (valueKey ? t(valueKey) : '')}
      </div>
    </div>
  );
}

function FounderCard({ founderIndex, isInView }: { founderIndex: number, isInView: boolean }) {
  const t = useTranslations();
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = (mouseX / width) - 0.5;
    const yPct = (mouseY / height) - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, delay: 0.3 + founderIndex * 0.2 }}
      className="relative w-full group h-full"
    >
      <div
        style={{ transform: "translateZ(50px)" }}
        className="relative h-full bg-gradient-to-br from-white/[0.08] to-white/[0.03] backdrop-blur-2xl rounded-3xl border border-white/10 overflow-hidden shadow-2xl flex flex-col p-10 lg:p-14"
      >
        {/* Glow Effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_var(--mouse-x)_var(--mouse-y),rgba(255,255,255,0.08),transparent_40%)] pointer-events-none"
          style={{
            // @ts-ignore
            "--mouse-x": `${(x.get() + 0.5) * 100}%`,
            "--mouse-y": `${(y.get() + 0.5) * 100}%`
          }}
        />

        <div className="flex justify-between items-start mb-12">
          <div className="relative">
            <div className="w-20 h-20 rounded-2xl bg-white flex items-center justify-center text-dark-950 text-3xl font-display font-bold shadow-[0_0_30px_rgba(255,255,255,0.2)]">
              {t(`about.founders.${founderIndex}.name`).charAt(0)}
            </div>
            <div className="absolute -inset-2 bg-white/10 blur-xl rounded-full -z-10 animate-pulse" />
          </div>

          <div className="flex gap-4 opacity-40 group-hover:opacity-100 transition-opacity">
            <Github className="w-5 h-5 text-white cursor-pointer hover:scale-110 transition-transform" />
            <Linkedin className="w-5 h-5 text-white cursor-pointer hover:scale-110 transition-transform" />
          </div>
        </div>

        <div style={{ transform: "translateZ(30px)" }} className="flex-1 flex flex-col">
          <h3 className="text-4xl lg:text-5xl font-display font-bold text-white mb-4 tracking-tight">
            {t(`about.founders.${founderIndex}.name`)}
          </h3>
          <p className="text-dark-400 text-sm font-medium uppercase tracking-[0.2em] mb-8">
            {t(`about.founders.${founderIndex}.role`)}
          </p>

          <div className="h-px w-12 bg-white/20 mb-8 group-hover:w-24 transition-all duration-500" />

          <p className="text-dark-300 text-lg lg:text-xl font-light leading-relaxed max-w-[90%] group-hover:text-white transition-colors duration-500 mb-12">
            {t(`about.founders.${founderIndex}.bio`)}
          </p>

          <div className="mt-auto flex items-center gap-4 text-dark-400 group-hover:text-white/70 transition-colors pt-8 border-t border-white/5">
            <div className="w-1.5 h-1.5 bg-white/60 rounded-full animate-pulse shadow-[0_0_8px_rgba(255,255,255,0.4)]" />
            <span className="text-xs uppercase tracking-widest">{t(`about.founders.${founderIndex}.location`)}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
