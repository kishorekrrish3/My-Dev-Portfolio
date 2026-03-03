"use client";

import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import SectionWrapper, { SectionLabel, SectionTitle } from "./SectionWrapper";
import { DotPattern } from "@/components/ui/dot-pattern";

/* ─── Devicons CDN Icons ─────────────────────────────────────────────────── */
const CDN = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons";

const DEVICON_PATH: Record<string, string> = {
  // AI/ML
  TensorFlow: "tensorflow/tensorflow-original.svg",
  PyTorch: "pytorch/pytorch-original.svg",
  OpenCV: "opencv/opencv-original.svg",
  Pandas: "pandas/pandas-original.svg",
  "Scikit-learn": "scikitlearn/scikitlearn-original.svg",
  "Jupyter Notebook": "jupyter/jupyter-original.svg",
  // Web Dev
  React: "react/react-original.svg",
  "Next.js": "nextjs/nextjs-original.svg",
  Tailwind: "tailwindcss/tailwindcss-original.svg",
  "Node.js": "nodejs/nodejs-original.svg",
  TypeScript: "typescript/typescript-original.svg",
  Bootstrap: "bootstrap/bootstrap-original.svg",
  MongoDB: "mongodb/mongodb-original.svg",
  MySQL: "mysql/mysql-original.svg",
  Appwrite: "appwrite/appwrite-original.svg",
  Git: "git/git-original.svg",
  GitHub: "github/github-original.svg",
  Postman: "postman/postman-original.svg",
  Vercel: "vercel/vercel-original.svg",
  Firebase: "firebase/firebase-original.svg",
  // Programming
  Python: "python/python-original.svg",
  C: "c/c-original.svg",
  "C++": "cplusplus/cplusplus-original.svg",
  "C#": "csharp/csharp-original.svg",
  Java: "java/java-original.svg",
  HTML5: "html5/html5-original.svg",
  CSS3: "css3/css3-original.svg",
  JavaScript: "javascript/javascript-original.svg",
  SQL: "mysql/mysql-original.svg",
  // Cloud / DevOps
  Docker: "docker/docker-original.svg",
  Arduino: "arduino/arduino-original.svg",
  Kubernetes: "kubernetes/kubernetes-original.svg",
  GCP: "googlecloud/googlecloud-original.svg",
  AWS: "amazonwebservices/amazonwebservices-original-wordmark.svg",
  Azure: "azure/azure-original.svg",
};

// Fallback monogram colors for skills with no devicon
const MONOGRAM_COLORS: Record<string, string> = {
  HuggingFace: "#FFD21E",
  Ollama: "#888",
  MediaPipe: "#1A73E8",
  "REST APIs": "#FF6B35",
};

// Local PNG overrides — served from /public
const LOCAL_ICONS: Record<string, string> = {
  Pandas: "/pandas.png",
  "Scikit-learn": "/scikitlearn.png",
  "Jupyter Notebook": "/jupyter.png",
  Ollama: "/ollama.png",
  GitHub: "/github.png",
  Vercel: "/vercel.png",
  "REST APIs": "/rest.png",
  AWS: "/aws.png",
  SQL: "/sql.png",
};

function SkillIcon({ name, accentColor }: { name: string; accentColor: string }) {
  // Prefer local PNG if available
  const local = LOCAL_ICONS[name];
  if (local) {
    return (
      <img
        src={local}
        alt={name}
        width={32}
        height={32}
        className="w-full h-full object-contain drop-shadow-sm"
        loading="lazy"
      />
    );
  }
  // Fall back to devicons CDN
  const path = DEVICON_PATH[name];
  if (path) {
    return (
      <img
        src={`${CDN}/${path}`}
        alt={name}
        width={32}
        height={32}
        className="w-full h-full object-contain drop-shadow-sm"
        loading="lazy"
      />
    );
  }
  // Last resort — colored monogram
  return (
    <div
      className="w-full h-full flex items-center justify-center text-[9px] font-bold leading-none text-center rounded"
      style={{ color: accentColor }}
    >
      {name.slice(0, 3).toUpperCase()}
    </div>
  );
}




/* ─── Data ─────────────────────────────────────────────────────────────────── */
const SKILL_CATEGORIES = [
  {
    id: "ai",
    category: "AI / Machine Learning",
    color: "#00ff9d",
    bg: "rgba(0,255,157,0.06)",
    border: "rgba(0,255,157,0.2)",
    skills: ["TensorFlow", "PyTorch", "OpenCV", "Pandas", "Scikit-learn", "Jupyter Notebook", "Ollama"],
  },
  {
    id: "web",
    category: "Full-Stack Web Development",
    color: "#00d4ff",
    bg: "rgba(0,212,255,0.06)",
    border: "rgba(0,212,255,0.2)",
    skills: ["React", "Next.js", "Tailwind", "Node.js", "TypeScript", "Bootstrap", "MongoDB", "MySQL", "Appwrite", "REST APIs", "Git", "GitHub", "Postman", "Vercel", "Firebase"],
  },
  {
    id: "prog",
    category: "Programming",
    color: "#a78bfa",
    bg: "rgba(167,139,250,0.06)",
    border: "rgba(167,139,250,0.2)",
    skills: ["Python", "C", "C++", "C#", "Java", "HTML5", "CSS3", "JavaScript", "SQL"],
  },
  {
    id: "cloud",
    category: "Cloud, DevOps & Infrastructure",
    color: "#f59e0b",
    bg: "rgba(245,158,11,0.06)",
    border: "rgba(245,158,11,0.2)",
    skills: ["Docker", "Arduino", "Kubernetes", "GCP", "AWS", "Azure"],
  },
];

const SOFT_SKILLS = [
  "Leadership", "Team Management", "Communication", "Public Speaking",
  "Strategic Planning", "Time Management", "Critical Thinking", "Adaptability",
  "Creativity", "Collaboration", "Ownership", "Responsibility",
  "Scrum / Agile", "Technical Documentation",
];

const TOOLS = [
  "VS Code", "Linux", "Figma", "MATLAB", "EC2",
];

/* ─── Skill Chip ────────────────────────────────────────────────────────────── */
function SkillChip({
  name, accentColor, bg, border, delay, isInView,
}: {
  name: string; accentColor: string; bg: string; border: string;
  delay: number; isInView: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 14, scale: 0.94 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] as const }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group flex flex-col items-center gap-2 p-4 rounded-2xl border cursor-default relative overflow-hidden transition-all duration-300"
      style={{
        background: hovered ? bg : "rgba(255,255,255,0.02)",
        borderColor: hovered ? border : "rgba(255,255,255,0.07)",
        boxShadow: hovered ? `0 0 24px ${accentColor}18` : "none",
      }}
    >
      {hovered && (
        <div
          className="absolute -top-4 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full blur-2xl opacity-30 pointer-events-none"
          style={{ background: accentColor }}
        />
      )}
      <div
        className="relative w-10 h-10 rounded-xl flex items-center justify-center p-1.5 transition-transform duration-200 group-hover:scale-110"
        style={{ background: `${accentColor}18` }}

      >
        <SkillIcon name={name} accentColor={accentColor} />

      </div>
      <span
        className="text-[11px] font-semibold text-center leading-tight transition-colors duration-200"
        style={{ color: hovered ? accentColor : "#888" }}
      >
        {name}
      </span>
    </motion.div>
  );
}

/* ─── Category Card ─────────────────────────────────────────────────────────── */
function CategoryCard({
  cat, catIdx, isInView,
}: {
  cat: typeof SKILL_CATEGORIES[number]; catIdx: number; isInView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: catIdx * 0.12, ease: [0.22, 1, 0.36, 1] as const }}
      className="rounded-2xl border overflow-hidden"
      style={{ borderColor: cat.border, background: `${cat.color}04` }}
    >
      <div
        className="flex items-center gap-3 px-5 py-4 border-b"
        style={{ borderColor: cat.border, background: `${cat.color}08` }}
      >
        <span
          className="w-2.5 h-2.5 rounded-full shrink-0"
          style={{ background: cat.color, boxShadow: `0 0 8px ${cat.color}` }}
        />
        <span
          className="font-mono text-xs tracking-widest uppercase font-semibold"
          style={{ color: cat.color }}
        >
          {cat.category}
        </span>
        <span className="ml-auto font-mono text-[10px] text-[#333]">
          {cat.skills.length} skills
        </span>
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-3 p-5">
        {cat.skills.map((skill, si) => (
          <SkillChip
            key={skill + si}
            name={skill}
            accentColor={cat.color}
            bg={cat.bg}
            border={cat.border}
            delay={catIdx * 0.08 + si * 0.03}
            isInView={isInView}
          />
        ))}
      </div>
    </motion.div>
  );
}

/* ─── Main Section ──────────────────────────────────────────────────────────── */
export default function SkillsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <SectionWrapper id="skills">
      <div className="relative isolate" ref={ref}>
        <DotPattern
          width={24}
          height={24}
          cr={1}
          className="absolute inset-0 -z-10 text-white/5 mask-[radial-gradient(ellipse_at_top,white,transparent_80%)]"
        />

        <SectionLabel label="Expertise" />
        <SectionTitle title="Skills & Technologies" />

        <div className="mt-8 space-y-4">
          {SKILL_CATEGORIES.map((cat, catIdx) => (
            <CategoryCard key={cat.id} cat={cat} catIdx={catIdx} isInView={isInView} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div className="rounded-2xl border border-white/5 bg-white/2 p-6">
            <p className="font-mono text-xs text-[#444] uppercase tracking-widest mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#00ff9d] inline-block" />
              Soft Skills
            </p>
            <div className="flex flex-wrap gap-2">
              {SOFT_SKILLS.map((s) => (
                <span
                  key={s}
                  className="px-3 py-1.5 bg-white/3 border border-white/8 rounded-full text-xs text-[#777] hover:text-[#00ff9d] hover:border-[#00ff9d]/30 transition-all duration-200 cursor-default"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-white/5 bg-white/2 p-6">
            <p className="font-mono text-xs text-[#444] uppercase tracking-widest mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#00d4ff] inline-block" />
              Tools & Platforms
            </p>
            <div className="flex flex-wrap gap-2">
              {TOOLS.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1.5 bg-white/3 border border-white/8 rounded-full text-xs text-[#777] hover:text-[#00d4ff] hover:border-[#00d4ff]/30 transition-all duration-200 cursor-default"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
