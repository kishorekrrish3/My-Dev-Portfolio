"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import SectionWrapper, { SectionLabel, SectionTitle } from "./SectionWrapper";

// SVG skill logos
const SKILL_ICONS: Record<string, JSX.Element> = {
  Python: (
    <svg viewBox="0 0 128 128" className="w-full h-full"><path fill="#3572A5" d="M63.9 0C38.3 0 39.9 11.1 39.9 11.1l.1 11.5h24.5v3.5H25.3S8 24.4 8 50.3s15.4 24.9 15.4 24.9h9.2v-12s-.5-15.4 15.2-15.4h26.2s14.7.2 14.7-14.2V15.1S91.1 0 63.9 0zm-14.6 8.4c2.6 0 4.7 2.1 4.7 4.7s-2.1 4.7-4.7 4.7-4.7-2.1-4.7-4.7 2.1-4.7 4.7-4.7z"/><path fill="#FFD43B" d="M64.1 128c25.6 0 24-11.1 24-11.1l-.1-11.5H63.5v-3.5h39.2s17.3 1.7 17.3-24.2-15.4-24.9-15.4-24.9h-9.2v12s.5 15.4-15.2 15.4H54s-14.7-.2-14.7 14.2v23.6S36.9 128 64.1 128zm14.6-8.4c-2.6 0-4.7-2.1-4.7-4.7s2.1-4.7 4.7-4.7 4.7 2.1 4.7 4.7-2.1 4.7-4.7 4.7z"/></svg>
  ),
  "TensorFlow": (
    <svg viewBox="0 0 128 128" className="w-full h-full"><path fill="#FF6F00" d="M63.3 0L0 36.5v91.3l63.3-36.5V54.9L28 74.7V45.5l35.3-20.4z"/><path fill="#FFA800" d="M63.3 0l63.4 36.5v91.3L63.3 91.3V54.9l35.3 19.8V45.5z"/></svg>
  ),
  "PyTorch": (
    <svg viewBox="0 0 128 128" className="w-full h-full"><path fill="#EE4C2C" d="M64 10L26 38l38 26 38-26z"/><circle cx="64" cy="95" r="20" fill="#EE4C2C"/><circle cx="78" cy="38" r="7" fill="#EE4C2C"/></svg>
  ),
  "OpenCV": (
    <svg viewBox="0 0 128 128" className="w-full h-full"><circle cx="34" cy="64" r="24" fill="#5C3EE8"/><circle cx="94" cy="64" r="24" fill="#00A650"/><circle cx="64" cy="24" r="24" fill="#E44D26"/></svg>
  ),
  "React": (
    <svg viewBox="0 0 128 128" className="w-full h-full"><circle cx="64" cy="64" r="11.4" fill="#61DAFB"/><g stroke="#61DAFB" strokeWidth="5" fill="none"><ellipse rx="48" ry="18" cx="64" cy="64"/><ellipse rx="48" ry="18" cx="64" cy="64" transform="rotate(60 64 64)"/><ellipse rx="48" ry="18" cx="64" cy="64" transform="rotate(120 64 64)"/></g></svg>
  ),
  "Next.js": (
    <svg viewBox="0 0 128 128" className="w-full h-full"><circle cx="64" cy="64" r="60" fill="#000"/><path fill="#fff" d="M106.3 109.4L44.7 26.8H26.8v74.5h15.3V48.5l53.8 67.5c3.6-2 7-4.2 10.4-6.6zM81.2 26.8h15.3v74.2H81.2z"/></svg>
  ),
  "Node.js": (
    <svg viewBox="0 0 128 128" className="w-full h-full"><path fill="#83CD29" d="M64 3.6L10.2 34.8v62.4L64 128.4l53.8-31.2V34.8z"/><path fill="#404137" d="M64 3.6v124.8"/><path fill="#fff" d="M54.5 82.7c0 5 2.9 9.6 8.9 9.6 5.7 0 9-3.8 9-9.4V44.5H64v38.2c0 2.8-1.3 3.9-3.3 3.9-2.2 0-3.4-1.5-3.4-3.9l.2-.2h-3z"/></svg>
  ),
  "TypeScript": (
    <svg viewBox="0 0 128 128" className="w-full h-full"><rect fill="#3178C6" width="128" height="128" rx="6"/><path fill="#fff" d="M21.8 99.6V113c2.3 1.2 5 2 8.2 2.7 3.2.7 6.6 1 10.1 1 3.4 0 6.7-.3 9.8-1 3.1-.7 5.9-1.8 8.3-3.4 2.4-1.6 4.3-3.8 5.7-6.5 1.4-2.7 2.1-6 2.1-9.9 0-2.8-.4-5.3-1.3-7.5-.8-2.1-2-4-3.6-5.7-1.5-1.7-3.4-3.2-5.6-4.5-2.2-1.3-4.6-2.5-7.4-3.7-2-.8-3.7-1.6-5.2-2.3-1.5-.7-2.7-1.5-3.7-2.2-1-.7-1.7-1.5-2.2-2.4-.5-.9-.7-1.9-.7-3.1 0-1.1.2-2.1.7-2.9.5-.9 1.2-1.6 2.1-2.2.9-.6 2-.9 3.3-1.2 1.3-.2 2.7-.3 4.3-.3 1.2 0 2.4.1 3.7.2 1.3.1 2.6.4 3.8.7 1.3.3 2.5.8 3.7 1.3 1.2.5 2.3 1.2 3.3 2V44c-2.1-.8-4.4-1.4-6.8-1.8-2.4-.4-5.1-.6-8.1-.6-3.3 0-6.5.4-9.5 1.1-3 .7-5.7 1.9-8 3.5-2.3 1.6-4.1 3.7-5.4 6.2-1.3 2.6-2 5.6-2 9.1 0 4.5 1.3 8.4 3.9 11.5 2.6 3.1 6.5 5.8 11.8 7.9 2.1.8 4 1.6 5.7 2.4 1.7.8 3.2 1.6 4.4 2.4 1.2.8 2.1 1.7 2.8 2.8.7 1 1 2.2 1 3.5 0 1.1-.2 2-.6 2.9-.4.9-1 1.6-1.9 2.2-.9.6-2 1-3.3 1.3-1.3.3-2.9.5-4.7.5-3 0-5.9-.5-8.8-1.5-2.9-1-5.5-2.5-7.9-4.5z"/><path fill="#fff" d="M107.7 43.5H85.2v10h14.4V115h12V53.5h14.3V43.5z"/></svg>
  ),
  "Tailwind": (
    <svg viewBox="0 0 128 128" className="w-full h-full"><path fill="#38BDF8" d="M64 16c-17.1 0-27.8 8.5-32 25.6 6.4-8.5 13.9-11.7 22.4-9.6 4.9 1.2 8.3 4.7 12.2 8.5C72.9 46.8 80 53.8 96 53.8c17.1 0 27.8-8.5 32-25.6-6.4 8.5-13.9 11.7-22.4 9.6-4.9-1.2-8.3-4.7-12.2-8.5C87.1 23 80 16 64 16zm-32 38.2c-17.1 0-27.8 8.5-32 25.6 6.4-8.5 13.9-11.7 22.4-9.6 4.9 1.2 8.3 4.7 12.2 8.5 6.3 6.3 13.4 13.3 29.4 13.3 17.1 0 27.8-8.5 32-25.6-6.4 8.5-13.9 11.7-22.4 9.6-4.9-1.2-8.3-4.7-12.2-8.5C55.1 61.2 48 54.2 32 54.2z"/></svg>
  ),
  "MongoDB": (
    <svg viewBox="0 0 128 128" className="w-full h-full"><path fill="#4FAA41" d="M64 3S36 50.5 36 76.8c0 15.5 12.6 28.2 28 28.2s28-12.7 28-28.2C92 50.5 64 3 64 3zm0 98c-6.6 0-12-5.4-12-12 0-4.5 2.5-8.6 6.4-10.7l5.6 26.1 5.6-26.1c3.9 2.1 6.4 6.1 6.4 10.7 0 6.6-5.4 12-12 12z"/></svg>
  ),
  "Docker": (
    <svg viewBox="0 0 128 128" className="w-full h-full"><path fill="#2496ED" d="M124.8 52.1c-2.8-1.9-9.3-2.6-14.3-1.6-.6-5.2-4-9.7-9.9-13.7l-3.4-2.2-2.2 3.4c-2.8 4.3-3.6 11.4-3.1 16.8-2.4-1.3-7.1-3.1-13.8-3H5.7L5 53.6c-.5 8.7 1.2 21.6 8.5 30.5C20 93 30.3 97 43.8 97c26.5 0 46.2-12.3 55.4-34.6 3.6.2 11.4.1 15.4-7.4l.8-1.4-3.5-2.3zM62 38H51V27h11v11zm0 14H51V41h11v11zm14-14H65V27h11v11zm0 14H65V41h11v11zm-28-14H37V27h11v11zm0 14H37V41h11v11zm0 14H37V55h11v11zm14 0H51V55h11v11zm14 0H65V55h11v11z"/></svg>
  ),
  "Arduino": (
    <svg viewBox="0 0 128 128" className="w-full h-full"><rect width="128" height="128" rx="8" fill="#00878A"/><path fill="#fff" d="M42 52c-6.6 0-12 5.4-12 12s5.4 12 12 12 12-5.4 12-12-5.4-12-12-12zm44 0c-6.6 0-12 5.4-12 12s5.4 12 12 12 12-5.4 12-12-5.4-12-12-12zM32 61h20M76 61h20M52 64h24"/><path stroke="#fff" strokeWidth="4" fill="none" d="M32 61h20M76 61h20"/></svg>
  ),
  "MediaPipe": (
    <svg viewBox="0 0 128 128" className="w-full h-full"><rect width="128" height="128" rx="8" fill="#1A73E8"/><circle cx="64" cy="40" r="12" fill="#fff"/><circle cx="30" cy="80" r="10" fill="#fff"/><circle cx="98" cy="80" r="10" fill="#fff"/><line x1="64" y1="52" x2="30" y2="70" stroke="#fff" strokeWidth="3"/><line x1="64" y1="52" x2="98" y2="70" stroke="#fff" strokeWidth="3"/><line x1="30" y1="80" x2="98" y2="80" stroke="#fff" strokeWidth="3"/></svg>
  ),
  "REST APIs": (
    <svg viewBox="0 0 128 128" className="w-full h-full"><rect width="128" height="128" rx="8" fill="#FF6B35"/><path fill="#fff" d="M20 44h88v10H20zm0 30h88v10H20zM44 20v88h10V20zM74 20v88h10V20z"/></svg>
  ),
  "Scikit-learn": (
    <svg viewBox="0 0 128 128" className="w-full h-full"><rect width="128" height="128" rx="8" fill="#F7931E"/><path fill="#fff" d="M22 64c0-23.2 18.8-42 42-42s42 18.8 42 42-18.8 42-42 42-42-18.8-42-42zm14 0c0 15.5 12.5 28 28 28s28-12.5 28-28-12.5-28-28-28-28 12.5-28 28z"/><circle cx="64" cy="64" r="10" fill="#F7931E"/></svg>
  ),
  "WebSockets": (
    <svg viewBox="0 0 128 128" className="w-full h-full"><rect width="128" height="128" rx="8" fill="#6366F1"/><path stroke="#fff" strokeWidth="6" fill="none" d="M20 64 Q64 20 108 64 Q64 108 20 64"/><circle cx="64" cy="64" r="8" fill="#fff"/></svg>
  ),
};

const SKILL_CATEGORIES = [
  {
    category: "AI / Machine Learning",
    color: "#00ff9d",
    borderGlow: "rgba(0,255,157,0.15)",
    skills: [
      { name: "Python", icon: "Python" },
      { name: "TensorFlow", icon: "TensorFlow" },
      { name: "PyTorch", icon: "PyTorch" },
      { name: "Scikit-learn", icon: "Scikit-learn" },
      { name: "OpenCV", icon: "OpenCV" },
      { name: "MediaPipe", icon: "MediaPipe" },
    ],
  },
  {
    category: "Full-Stack Web",
    color: "#00d4ff",
    borderGlow: "rgba(0,212,255,0.15)",
    skills: [
      { name: "React", icon: "React" },
      { name: "Next.js", icon: "Next.js" },
      { name: "Node.js", icon: "Node.js" },
      { name: "TypeScript", icon: "TypeScript" },
      { name: "Tailwind", icon: "Tailwind" },
      { name: "MongoDB", icon: "MongoDB" },
    ],
  },
  {
    category: "Computer Networks",
    color: "#f59e0b",
    borderGlow: "rgba(245,158,11,0.15)",
    skills: [
      { name: "REST APIs", icon: "REST APIs" },
      { name: "WebSockets", icon: "WebSockets" },
      { name: "Docker", icon: "Docker" },
      { name: "TypeScript", icon: "TypeScript" },
      { name: "Node.js", icon: "Node.js" },
      { name: "MongoDB", icon: "MongoDB" },
    ],
  },
  {
    category: "Robotics & Embedded",
    color: "#a78bfa",
    borderGlow: "rgba(167,139,250,0.15)",
    skills: [
      { name: "Arduino", icon: "Arduino" },
      { name: "Python", icon: "Python" },
      { name: "OpenCV", icon: "OpenCV" },
      { name: "MediaPipe", icon: "MediaPipe" },
      { name: "REST APIs", icon: "REST APIs" },
      { name: "React", icon: "React" },
    ],
  },
];

const SOFT_SKILLS = [
  "Team Leadership",
  "Event Management",
  "Problem Solving",
  "Research & Analysis",
  "Communication",
  "Agile / Scrum",
  "Technical Writing",
  "Mentoring",
];

const TOOLS = [
  "Git / GitHub",
  "Linux",
  "Figma",
  "Jupyter",
  "VS Code",
  "Postman",
  "Firebase",
  "Appwrite",
  "MATLAB",
  "C++",
  "Java",
  "Redis",
];

function SkillCard({
  name,
  icon,
  delay,
  isInView,
  accentColor,
}: {
  name: string;
  icon: string;
  delay: number;
  isInView: boolean;
  accentColor: string;
}) {
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const rx = ((e.clientY - cy) / (rect.height / 2)) * 10;
    const ry = ((e.clientX - cx) / (rect.width / 2)) * -10;
    setRotation({ x: rx, y: ry });
  };

  const handleMouseLeave = () => {
    setHovered(false);
    setRotation({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(600px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
        transition: hovered ? "transform 0.05s" : "transform 0.4s ease",
        boxShadow: hovered ? `0 8px 30px ${accentColor}20` : "none",
      }}
      className="relative flex flex-col items-center justify-center gap-2 p-3.5 bg-[#111] border border-white/5 rounded-xl hover:border-white/10 cursor-default aspect-square"
    >
      {/* Icon */}
      <div className="w-9 h-9 flex items-center justify-center">
        {SKILL_ICONS[icon] ?? (
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center text-xs font-bold text-white"
            style={{ background: `${accentColor}22` }}
          >
            {name.slice(0, 2)}
          </div>
        )}
      </div>
      <span className="text-[11px] font-medium text-[#888] text-center leading-tight">
        {name}
      </span>

      {/* Shine on hover */}
      {hovered && (
        <div className="absolute inset-0 rounded-xl pointer-events-none overflow-hidden">
          <div
            className="absolute -top-1/2 -left-1/2 w-full h-full rotate-45 opacity-5"
            style={{
              background: `linear-gradient(135deg, ${accentColor} 0%, transparent 60%)`,
            }}
          />
        </div>
      )}
    </motion.div>
  );
}

export default function SkillsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <SectionWrapper id="skills">
      <SectionLabel label="Expertise" />
      <SectionTitle title="Skills & Technologies" />

      <div ref={ref} className="space-y-8">
        {SKILL_CATEGORIES.map((cat, catIdx) => (
          <motion.div
            key={cat.category}
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: catIdx * 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Category header */}
            <div className="flex items-center gap-3 mb-4">
              <span
                className="font-mono text-xs tracking-widest uppercase"
                style={{ color: cat.color }}
              >
                {cat.category}
              </span>
              <div className="flex-1 h-px" style={{ background: `${cat.color}25` }} />
            </div>

            {/* 3D skill cards grid */}
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
              {cat.skills.map((skill, si) => (
                <SkillCard
                  key={skill.name + si}
                  name={skill.name}
                  icon={skill.icon}
                  delay={catIdx * 0.08 + si * 0.05}
                  isInView={isInView}
                  accentColor={cat.color}
                />
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Soft skills */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="mt-12 pt-10 border-t border-white/5"
      >
        <p className="font-mono text-xs text-[#444] uppercase tracking-widest mb-4">
          Soft Skills
        </p>
        <div className="flex flex-wrap gap-2 mb-8">
          {SOFT_SKILLS.map((s) => (
            <span
              key={s}
              className="px-3 py-1.5 bg-white/[0.03] border border-white/8 rounded-full text-xs text-[#777] hover:text-[#aaa] hover:border-white/15 transition-colors duration-200 cursor-default"
            >
              {s}
            </span>
          ))}
        </div>

        <p className="font-mono text-xs text-[#444] uppercase tracking-widest mb-4">
          Tools & Platforms
        </p>
        <div className="flex flex-wrap gap-2">
          {TOOLS.map((t) => (
            <span
              key={t}
              className="px-3 py-1.5 bg-white/[0.03] border border-white/8 rounded-full text-xs text-[#777] hover:text-[#aaa] hover:border-white/15 transition-colors duration-200 cursor-default"
            >
              {t}
            </span>
          ))}
        </div>
      </motion.div>
    </SectionWrapper>
  );
}
