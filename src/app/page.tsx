"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

import TerminalLoader from "@/components/TerminalLoader";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import SkillsSection from "@/components/SkillsSection";
import ExperienceSection from "@/components/ExperienceSection";
import ProjectsSection from "@/components/ProjectsSection";
import CampusSection from "@/components/CampusSection";
import CertificatesSection from "@/components/CertificatesSection";
import ResumeSection from "@/components/ResumeSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  // Prevent scrolling while terminal is showing
  useEffect(() => {
    if (!loaded) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [loaded]);

  return (
    <>
      {/* Terminal Intro Loader */}
      <TerminalLoader onComplete={() => setLoaded(true)} />

      {/* Main portfolio — revealed after terminal */}
      <AnimatePresence>
        {loaded && (
          <motion.div
            key="portfolio"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative min-h-screen bg-[#0a0a0a]"
          >
            <Navbar />

            <main>
              {/* Hero */}
              <HeroSection />

              {/* Divider */}
              <div className="max-w-6xl mx-auto px-6">
                <div className="h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
              </div>

              {/* About anchor for smooth scroll from hero */}
              <div id="about" />

              {/* Skills */}
              <SkillsSection />

              {/* Experience */}
              <ExperienceSection />

              {/* Projects */}
              <ProjectsSection />

              {/* Campus Footprint */}
              <CampusSection />

              {/* Certificates */}
              <CertificatesSection />

              {/* Resume CTA */}
              <ResumeSection />

              {/* Contact */}
              <ContactSection />
            </main>

            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
