import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations('accessibility');
  
  return (
    <>
      {/* Skip to content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-accent-DEFAULT focus:text-white focus:rounded-md focus:outline-none"
      >
        {t('skipToContent')}
      </a>
      
      <Navigation />
      
      <main id="main-content" className="min-h-screen" role="main">
        <Hero />
        <Services />
        <About />
        <Projects />
        <Contact />
      </main>
      
      <Footer />
    </>
  );
}
