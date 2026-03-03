"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Dock, DockIcon } from "@/components/magicui/dock";
import {
  Home,
  Code2,
  Briefcase,
  FolderGit2,
  GraduationCap,
  Award,
  Mail,
  Users,
} from "lucide-react";

const NAV_LINKS = [
  { href: "hero", label: "Home", icon: Home },
  { href: "skills", label: "Skills", icon: Code2 },
  { href: "experience", label: "Experience", icon: Briefcase },
  { href: "projects", label: "Projects", icon: FolderGit2 },
  { href: "campus", label: "Campus", icon: Users },
  { href: "certificates", label: "Certificates", icon: Award },
  { href: "contact", label: "Contact", icon: Mail },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sections = NAV_LINKS.map((l) => l.href);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const handleNav = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* Top bar — visible only when NOT scrolled */}
      <AnimatePresence>
        {!scrolled && (
          <motion.nav
            key="top-nav"
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -80, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-0 left-0 right-0 z-40 bg-transparent"
          >
            <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
              {/* Logo */}
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="flex items-center gap-3"
                aria-label="Back to top"
              >
                <Image
                  src="/logo.png"
                  alt="Logo"
                  height={32}
                  width={32}
                  className="h-8 w-auto object-contain"
                  priority
                />
                <span className="font-mono text-sm font-semibold tracking-wider">
                  <span className="text-[#00ff9d]">&gt;</span>{" "}
                  <span className="text-white">kishore</span>
                  <span className="text-[#00ff9d]">.dev</span>
                </span>
              </button>

              {/* Desktop links */}
              <div className="hidden md:flex items-center gap-7">
                {NAV_LINKS.map((link) => (
                  <button
                    key={link.href}
                    onClick={() => handleNav(link.href)}
                    className={`font-mono text-xs tracking-widest uppercase transition-colors duration-200 relative ${activeSection === link.href
                      ? "text-[#00ff9d]"
                      : "text-[#888] hover:text-white"
                      }`}
                  >
                    {link.label}
                    {activeSection === link.href && (
                      <motion.span
                        layoutId="nav-indicator"
                        className="absolute -bottom-1 left-0 right-0 h-px bg-[#00ff9d]"
                      />
                    )}
                  </button>
                ))}
              </div>

              {/* Mobile hamburger */}
              <button
                className="md:hidden flex flex-col gap-1.5 p-1"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle menu"
              >
                <span className={`block w-5 h-px bg-white transition-all duration-200 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
                <span className={`block w-5 h-px bg-white transition-all duration-200 ${menuOpen ? "opacity-0" : ""}`} />
                <span className={`block w-5 h-px bg-white transition-all duration-200 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
              </button>
            </div>

            {/* Mobile menu */}
            <AnimatePresence>
              {menuOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="md:hidden overflow-hidden bg-[#0d0d0d]/95 border-b border-white/5 backdrop-blur-xl"
                >
                  <div className="px-6 py-4 flex flex-col gap-4">
                    {NAV_LINKS.map((link) => (
                      <button
                        key={link.href}
                        onClick={() => handleNav(link.href)}
                        className={`font-mono text-sm tracking-widest uppercase text-left transition-colors ${activeSection === link.href ? "text-[#00ff9d]" : "text-[#888]"
                          }`}
                      >
                        {activeSection === link.href ? "> " : "  "}
                        {link.label}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Dock — visible when scrolled */}
      <AnimatePresence>
        {scrolled && (
          <motion.div
            key="dock-nav"
            initial={{ y: 80, opacity: 0, scale: 0.9 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 80, opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50"
          >
            <Dock iconSize={38} iconMagnification={56} iconDistance={110}>
              {NAV_LINKS.map(({ href, label, icon: Icon }) => (
                <DockIcon
                  key={href}
                  onClick={() => handleNav(href)}
                  label={label}
                  isActive={activeSection === href}
                >
                  <Icon size={18} />
                </DockIcon>
              ))}
            </Dock>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
