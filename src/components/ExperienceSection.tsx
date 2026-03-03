"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import SectionWrapper, { SectionLabel, SectionTitle } from "./SectionWrapper";
import { Briefcase, GraduationCap, MapPin, CalendarDays } from "lucide-react";

const EXPERIENCE = [
  {
    role: "Specialist Programmer (L1) Trainee",
    company: "Infosys",
    location: "India",
    period: "Upcoming",
    type: "Full-Time · 10 LPA",
    status: "upcoming",
    description:
      "Selected as a Specialist Programmer (L1) Trainee at Infosys — one of India's largest IT services and consulting companies. Will contribute to enterprise-scale software solutions and digital transformation projects.",
    tags: ["Enterprise Software", "Cloud", "Digital Transformation", "Full-Stack"],
    color: "#00ff9d",
  },
  {
    role: "Frontend & UI/UX Intern",
    company: "VITADATA (Startup)",
    location: "Remote / Chennai, India",
    period: "2025 — May",
    type: "Internship",
    status: "completed",
    description:
      "Working as a Frontend and UI/UX Intern at VITADATA, a startup, focusing on building responsive user interfaces and designing intuitive user experiences for data-driven products.",
    tags: ["React", "UI/UX", "Figma", "Frontend", "TypeScript"],
    color: "#00d4ff",
  },
];

const EDUCATION = [
  {
    degree: "B.Tech — Computer Science & Engineering (AI & Robotics)",
    institution: "Vellore Institute of Technology (VIT), Chennai",
    location: "Chennai, Tamil Nadu",
    period: "2023 — Ongoing",
    status: "active",
    description:
      "Specializing in Artificial Intelligence & Robotics. Active leader in technical and cultural clubs, research collaborations, and large-scale campus events. Strong academic focus on applied ML, full-stack development, and systems design. CGPA: 8.21",
    tags: ["AI & Robotics", "Computer Science", "Full-Stack", "CGPA: 8.21"],
    color: "#00ff9d",

  },
  {
    degree: "Higher Secondary Education (Class XII)",
    institution: "The Optimus Public School, Bhavani",
    location: "Tamil Nadu, India",
    period: "2022",
    status: "completed",
    description:
      "Completed Class XII under the CBSE board with Maths, Physics, Chemistry, and Computer Science. Built strong analytical and programming foundations.",
    tags: ["CBSE", "Mathematics", "Physics", "Computer Science"],
    color: "#f59e0b",
  },
  {
    degree: "Secondary Education (Class X)",
    institution: "The Optimus Public School, Bhavani",
    location: "Tamil Nadu, India",
    period: "2020",
    status: "completed",
    description:
      "Completed Class X under the CBSE board with distinction. Developed strong foundations in Mathematics, Science, and Computer Science.",
    tags: ["CBSE", "Mathematics", "Science", "Computer Science"],
    color: "#00d4ff",
  },
];


type Tab = "experience" | "education";

interface TimelineCardProps {
  title: string;
  subtitle: string;
  location: string;
  period: string;
  type: string;
  status: string;
  description: string;
  tags: string[];
  color: string;
  idx: number;
  isInView: boolean;
}


function TimelineCard({
  title,
  subtitle,
  location,
  period,
  type,
  status,
  description,
  tags,
  color,
  idx,
  isInView,
}: TimelineCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -24 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      exit={{ opacity: 0, x: 24 }}
      transition={{ duration: 0.55, delay: idx * 0.12, ease: [0.22, 1, 0.36, 1] }}
      className="relative md:pl-14 group"
    >
      {/* Timeline dot */}
      <div
        className="absolute left-4 top-6 w-3.5 h-3.5 rounded-full border-2 border-[#0a0a0a] hidden md:block -translate-x-1/2"
        style={{ background: color }}
      />

      <div className="bg-[#0f0f0f] border border-white/[0.06] rounded-2xl p-5 hover:border-white/10 transition-all duration-300 group-hover:bg-[#111]">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-3">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-0.5">
              <h3 className="text-white font-semibold text-base">{title}</h3>
              {status === "upcoming" && (
                <span className="px-2 py-0.5 bg-[#00ff9d]/10 text-[#00ff9d] text-[10px] font-mono rounded-full border border-[#00ff9d]/20 animate-pulse">
                  Upcoming
                </span>
              )}
              {status === "active" && (
                <span className="px-2 py-0.5 bg-white/5 text-[#666] text-[10px] font-mono rounded-full border border-white/8">
                  Active
                </span>
              )}
              {status === "completed" && (
                <span className="px-2 py-0.5 bg-white/5 text-[#555] text-[10px] font-mono rounded-full border border-white/8">
                  Completed
                </span>
              )}
            </div>
            <span className="text-sm font-medium" style={{ color }}>
              {subtitle}
            </span>
          </div>
          <div className="flex flex-col items-start sm:items-end gap-1 shrink-0 text-[#555]">
            <div className="flex items-center gap-1.5 text-xs">
              <CalendarDays size={11} />
              <span className="font-mono">{period}</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs">
              <MapPin size={11} />
              <span>{location}</span>
            </div>
            <span className="font-mono text-[10px] text-[#444]">{type}</span>
          </div>
        </div>

        <p className="text-[#777] text-sm leading-relaxed mb-3">{description}</p>

        <div className="flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-0.5 bg-white/[0.04] text-[#666] text-[11px] rounded-lg border border-white/6"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function ExperienceSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const [activeTab, setActiveTab] = useState<Tab>("experience");

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: "experience", label: "Work Experience", icon: <Briefcase size={14} /> },
    { id: "education", label: "Education", icon: <GraduationCap size={14} /> },
  ];

  return (
    <SectionWrapper id="experience">
      <SectionLabel label="Background" />
      <SectionTitle title="Experience & Education" />

      {/* Tab switcher */}
      <div className="flex items-center gap-1 p-1 bg-white/[0.03] border border-white/8 rounded-xl w-fit mb-10">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`relative flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${activeTab === tab.id ? "text-white" : "text-[#555] hover:text-[#888]"
              }`}
          >
            {activeTab === tab.id && (
              <motion.div
                layoutId="tab-bg"
                className="absolute inset-0 bg-white/8 rounded-lg border border-white/10"
                transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-2">
              {tab.icon}
              {tab.label}
            </span>
          </button>
        ))}
      </div>

      <div ref={ref} className="relative">
        {/* Vertical timeline line */}
        <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-[#00ff9d]/30 via-white/5 to-transparent hidden md:block" />

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-5"
          >
            {activeTab === "experience"
              ? EXPERIENCE.map((exp, idx) => (
                <TimelineCard
                  key={exp.role + exp.company}
                  title={exp.role}
                  subtitle={exp.company}
                  location={exp.location}
                  period={exp.period}
                  type={exp.type}
                  status={exp.status}
                  description={exp.description}
                  tags={exp.tags}
                  color={exp.color}
                  idx={idx}
                  isInView={isInView}
                />
              ))
              : EDUCATION.map((edu, idx) => (
                <TimelineCard
                  key={edu.degree}
                  title={edu.degree}
                  subtitle={edu.institution}
                  location={edu.location}
                  period={edu.period}
                  type={"Full-Time"}
                  status={edu.status}
                  description={edu.description}
                  tags={edu.tags}
                  color={edu.color}
                  idx={idx}
                  isInView={isInView}
                />
              ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </SectionWrapper>
  );
}
