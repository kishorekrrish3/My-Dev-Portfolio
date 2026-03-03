"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import { AuroraText } from "@/components/magicui/aurora-text";
import { Highlighter } from "@/components/magicui/highlighter";
import { GravityStarsBackground } from "@/components/ui/gravity-stars-background";

const SOCIAL_LINKS = [
  { icon: Github, href: "https://github.com/kishorekrrish3", label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/kishore-p-vitc/", label: "LinkedIn" },
  { icon: Mail, href: "mailto:kidkrrish3@gmail.com", label: "Email" },
];

const TITLES = [
  "Full-Stack Developer",
  "AI, ML & Deep Learning Enthusiast",
  "Programmer",
  "Robotics Engineer",
];

function TypewriterRole() {
  const [titleIdx, setTitleIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const target = TITLES[titleIdx];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && displayed.length < target.length) {
      timeout = setTimeout(() => setDisplayed(target.slice(0, displayed.length + 1)), 60);
    } else if (!deleting && displayed.length === target.length) {
      timeout = setTimeout(() => setDeleting(true), 2200);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 32);
    } else {
      setDeleting(false);
      setTitleIdx((prev) => (prev + 1) % TITLES.length);
    }

    return () => clearTimeout(timeout);
  }, [displayed, deleting, titleIdx]);

  return (
    <span className="text-[#00ff9d] font-mono">
      {displayed}
      <span className="animate-pulse ml-0.5">|</span>
    </span>
  );
}

export default function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.13, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden"
    >
      {/* Animate UI – Gravity Stars Background */}
      <GravityStarsBackground
        className="absolute inset-0 z-0"
        starColor="#00ff9d"
        starsCount={110}
        starsSize={0.8}
        starsOpacity={0.35}
        glowIntensity={5}
        glowAnimation="ease"
        movementSpeed={0.2}
        mouseInfluence={130}
        mouseGravity="attract"
        gravityStrength={80}
        starsInteraction={false}
      />

      {/* Subtle radial vignette */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,transparent_40%,#0a0a0a_100%)]" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 text-center max-w-3xl"
      >
        {/* Status badge */}
        <motion.div variants={itemVariants} className="inline-flex items-center gap-2 mb-10">
          <div className="flex items-center gap-2 bg-white/[0.04] border border-white/10 rounded-full px-4 py-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00ff9d] animate-pulse" />
            <span className="font-mono text-[11px] text-[#666] tracking-widest uppercase">
              Available for opportunities
            </span>
          </div>
        </motion.div>

        {/* Name — AuroraText */}
        <motion.h1
          variants={itemVariants}
          className="text-6xl sm:text-7xl md:text-8xl font-black tracking-tight leading-none mb-4"
        >
          <span className="text-white">Kishore</span>{" "}
          <AuroraText
            className="font-black"
            colors={["#00ff9d", "#00d4ff", "#a78bfa", "#00ff9d"]}
            speed={0.8}
          >
            P
          </AuroraText>
        </motion.h1>

        {/* Typewriter */}
        <motion.div
          variants={itemVariants}
          className="text-xl sm:text-2xl text-[#555] mb-8 h-9 flex items-center justify-center"
        >
          <TypewriterRole />
        </motion.div>

        {/* About Bio with Highlighter */}
        <motion.p
          variants={itemVariants}
          className="text-[#666] text-base md:text-[17px] leading-[1.85] max-w-2xl mx-auto mb-10"
        >
          3rd-year B.Tech student at{" "}
          <Highlighter color="rgba(0,255,157,0.18)" type="underline">
            <span className="text-white font-medium">
              Vellore Institute of Technology, Chennai
            </span>
          </Highlighter>
          . Passionate about building intelligent systems at the intersection of{" "}
          <Highlighter color="rgba(0,255,157,0.2)" type="highlight">
            <span className="text-[#ccc]">AI/ML</span>
          </Highlighter>
          ,{" "}
          <Highlighter color="rgba(0,212,255,0.2)" type="highlight">
            <span className="text-[#ccc]">Full-Stack Web</span>
          </Highlighter>
          , and{" "}
          <Highlighter color="rgba(167,139,250,0.2)" type="highlight">
            <span className="text-[#ccc]">Robotics</span>
          </Highlighter>
          .
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-10"
        >
          <button
            onClick={() =>
              document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
            }
            className="px-7 py-3 bg-[#00ff9d] text-[#0a0a0a] font-semibold text-sm rounded-full hover:bg-[#00e68a] transition-all duration-200 hover:scale-[1.03] active:scale-95"
          >
            View My Work
          </button>
          <button
            onClick={() =>
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
            }
            className="px-7 py-3 border border-white/10 text-[#888] font-medium text-sm rounded-full hover:border-white/20 hover:text-white transition-all duration-200 hover:scale-[1.03] active:scale-95"
          >
            Get In Touch
          </button>
        </motion.div>

        {/* Social links */}
        <motion.div variants={itemVariants} className="flex items-center justify-center gap-4">
          {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="w-9 h-9 flex items-center justify-center rounded-full border border-white/8 text-[#555] hover:text-white hover:border-white/20 transition-all duration-200 hover:scale-110"
            >
              <Icon size={15} />
            </a>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.6 }}
        onClick={() =>
          document.getElementById("skills")?.scrollIntoView({ behavior: "smooth" })
        }
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-[#333] hover:text-[#00ff9d] transition-colors duration-200"
      >
        <span className="font-mono text-[10px] tracking-widest uppercase">scroll</span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
        >
          <ArrowDown size={14} />
        </motion.div>
      </motion.button>
    </section>
  );
}
