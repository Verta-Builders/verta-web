"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { sendContactEmail } from "@/lib/actions/email";
import { useTranslations, useLocale } from "next-intl";

export default function Contact() {
  const t = useTranslations();
  const locale = useLocale();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [formState, setFormState] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("submitting");
    setErrorMessage("");

    try {
      const result = await sendContactEmail(formData, locale);
      if (result.success) {
        setFormState("success");
        setFormData({ name: "", email: "", company: "", message: "" });
        setTimeout(() => setFormState("idle"), 5000);
      } else {
        setFormState("error");
        setErrorMessage(result.error || t('contact.form.error'));
        setTimeout(() => setFormState("idle"), 5000);
      }
    } catch {
      setFormState("error");
      setErrorMessage(t('contact.form.error'));
      setTimeout(() => setFormState("idle"), 5000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section
      id="contact"
      ref={ref}
      className="relative py-20 lg:py-32 bg-dark-900 overflow-hidden"
      aria-labelledby="contact-heading"
    >
      <div className="absolute inset-0 bg-dark-900" />

      <div className="relative z-10 max-w-[1600px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-24"
        >
          <div>
            <span className="text-xs text-dark-500 uppercase tracking-[0.3em] mb-4 block">{t('nav.contact')}</span>
            <h2
              id="contact-heading"
              className="text-5xl lg:text-7xl xl:text-8xl font-display font-bold text-white leading-[0.9]"
            >
              {t('contact.title').split(" ").slice(0, 2).join(" ")}<br />
              <span className="text-dark-500">{t('contact.title').split(" ").slice(2).join(" ")}</span>
            </h2>
          </div>
          <p className="text-dark-400 text-lg font-light max-w-md">
            {t('contact.subtitle')}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-32">
          {/* Left - Form */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid sm:grid-cols-2 gap-8">
                <div>
                  <label className="block text-xs text-dark-500 uppercase tracking-widest mb-3">{t('contact.form.name')} *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder={t('contact.form.namePlaceholder')}
                    className="w-full bg-transparent border-b-2 border-dark-700 py-4 text-white text-lg font-light placeholder:text-dark-700 focus:border-white focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs text-dark-500 uppercase tracking-widest mb-3">{t('contact.form.email')} *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder={t('contact.form.emailPlaceholder')}
                    className="w-full bg-transparent border-b-2 border-dark-700 py-4 text-white text-lg font-light placeholder:text-dark-700 focus:border-white focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-dark-500 uppercase tracking-widest mb-3">{t('contact.form.company')}</label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder={t('contact.form.companyPlaceholder')}
                  className="w-full bg-transparent border-b-2 border-dark-700 py-4 text-white text-lg font-light placeholder:text-dark-700 focus:border-white focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs text-dark-500 uppercase tracking-widest mb-3">{t('contact.form.message')} *</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  placeholder={t('contact.form.messagePlaceholder')}
                  className="w-full bg-transparent border-b-2 border-dark-700 py-4 text-white text-lg font-light placeholder:text-dark-700 focus:border-white focus:outline-none transition-colors resize-none"
                />
              </div>

              <div className="space-y-4">
                <motion.button
                  type="submit"
                  disabled={formState === "submitting" || formState === "success"}
                  className="group flex items-center gap-4 mt-8"
                  whileHover={{ x: formState === "idle" ? 8 : 0 }}
                >
                  <span className="text-sm uppercase tracking-widest font-medium text-white">
                    {formState === "idle" && t('contact.form.submit')}
                    {formState === "submitting" && t('contact.form.sending')}
                    {formState === "success" && t('contact.form.success')}
                    {formState === "error" && t('contact.form.submit')}
                  </span>
                  <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center group-hover:scale-105 transition-transform">
                    {formState === "idle" && <ArrowRight className="w-6 h-6 text-dark-950" />}
                    {formState === "submitting" && <Loader2 className="w-6 h-6 text-dark-950 animate-spin" />}
                    {formState === "success" && <CheckCircle className="w-6 h-6 text-dark-950" />}
                    {formState === "error" && <AlertCircle className="w-6 h-6 text-red-600" />}
                  </div>
                </motion.button>

                {formState === "error" && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-sm font-light mt-4"
                  >
                    {errorMessage}
                  </motion.p>
                )}
              </div>
            </form>
          </motion.div>

          {/* Right - Info */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col justify-between"
          >
            {/* Contact Details */}
            <div className="space-y-8 mb-16">
              <div>
                <div className="text-xs text-dark-600 uppercase tracking-widest mb-2">{t('contact.info.email')}</div>
                <a href="mailto:info@verta.builders" className="text-2xl lg:text-3xl font-display font-bold text-white hover:text-dark-300 transition-colors">
                  info@verta.builders
                </a>
              </div>
              <div>
                <div className="text-xs text-dark-600 uppercase tracking-widest mb-2">{t('contact.info.location')}</div>
                <div className="text-2xl lg:text-3xl font-display font-bold text-white">
                  {t('about.founders.0.location')}
                </div>
              </div>
            </div>

            {/* Status */}
            <div className="p-8 bg-dark-950 border border-dark-800 rounded-2xl">
              <div className="flex items-center gap-3 mb-4">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-white" />
                </span>
                <span className="text-sm font-medium text-white uppercase tracking-wider">{t('contact.info.availabilityText')}</span>
              </div>
              <p className="text-dark-500 text-sm font-light">
                {t('contact.subtitle')}
              </p>
            </div>

            {/* Large Text */}
            <div className="mt-16 text-[100px] lg:text-[150px] font-display font-bold text-dark-800 leading-none select-none">
              {new Date().getFullYear()}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
