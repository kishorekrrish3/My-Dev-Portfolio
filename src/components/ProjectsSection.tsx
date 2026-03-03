"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import SectionWrapper, { SectionLabel, SectionTitle } from "./SectionWrapper";
import { getProjects } from "@/lib/appwrite";
import { ExternalLink, Github, Brain, Hand, FileText, Plus } from "lucide-react";
import { HoleBackground } from "@/components/ui/hole-background";

// Fallback static projects (shown when Appwrite is not configured)
const FALLBACK_PROJECTS = [
  {
    $id: "1",
    title: "LMS AI SaaS Platform",
    description:
      "AI-powered Learning Management SaaS platform designed for scalable course delivery, analytics, and intelligent student interaction. Built with a modern TypeScript stack focusing on modular architecture and production-grade deployment readiness.",
    tags: ["TypeScript", "Next.js", "AI Integration", "SaaS", "Full Stack"],
    github_url: "#",
    live_url: "",
    icon: "brain",
    featured: true,
    order: 1,
    color: "#00d4ff",
    category: "AI",
  },
  {
    $id: "2",
    title: "Realtime Multimodal Violence Detection",
    description:
      "Real-time multimodal violence detection system combining MobiLSTM for video sequence modeling, 1D-CNN for audio classification, and Autoencoder-based anomaly detection for weapon recognition. Integrated via a Streamlit dashboard for live monitoring and decision fusion.",
    tags: ["Python", "Deep Learning", "CNN", "Audio & Video Classification", "Autoencoder", "Streamlit"],
    github_url: "#",
    live_url: "",
    icon: "brain",
    featured: true,
    order: 2,
    color: "#00ff9d",
    category: "ML/DL",
  },
  {
    $id: "3",
    title: "AI Network Routing Simulator",
    description:
      "Interactive network routing simulator comparing Traditional Dijkstra's Algorithm vs Reinforcement Learning-based Q-Learning Routing. Simulates congestion scenarios and evaluates adaptive intelligence in dynamic network environments.",
    tags: ["Python", "Networking", "Q-Learning", "Dijkstra", "Streamlit"],
    github_url: "#",
    live_url: "",
    icon: "file",
    featured: true,
    order: 3,
    color: "#00d4ff",
    category: "AI",
  },
  {
    $id: "4",
    title: "Multimodal MCI Detection (EEG & Behavioral)",
    description:
      "Advanced multimodal diagnostic framework for early detection of Mild Cognitive Impairment and Dementia using EEG signal processing, facial emotion recognition, audio feature extraction, speech-language metrics, and weighted late-fusion strategy. Focused on interpretable AI for healthcare diagnostics.",
    tags: ["Python", "Jupyter", "Multimodal AI", "EEG Processing", "Medical AI"],
    github_url: "#",
    live_url: "",
    icon: "brain",
    featured: true,
    order: 4,
    color: "#00ff9d",
    category: "ML/DL",
  },
  {
    $id: "5",
    title: "Resumind – AI Resume Analyzer",
    description:
      "AI-powered ATS Resume Analyzer that extracts skills & keywords, generates ATS compatibility scores, provides improvement suggestions, and offers resume feedback instantly. Built with modern frontend architecture and AI integration.",
    tags: ["React", "Vite", "TypeScript", "Puter.js", "AI", "Vercel"],
    github_url: "#",
    live_url: "",
    icon: "file",
    featured: true,
    order: 5,
    color: "#00d4ff",
    category: "AI",
  },
  {
    $id: "6",
    title: "DevEvents – Event Discovery Platform",
    description:
      "Production-ready event discovery platform built using Next.js 16, featuring MongoDB database integration, PostHog analytics, modern deployment workflow, and scalable architecture designed for performance and real-world usability.",
    tags: ["Next.js 16", "TypeScript", "MongoDB", "PostHog", "Vercel"],
    github_url: "#",
    live_url: "",
    icon: "file",
    featured: true,
    order: 6,
    color: "#f97316",
    category: "Web Dev",
  },
  {
    $id: "7",
    title: "Portfolio Website",
    description:
      "Modern, responsive personal portfolio built with Vite + React, Tailwind CSS, and Supabase backend. Showcases projects, skills, certifications, and experience with performance-focused frontend design.",
    tags: ["React", "TypeScript", "Tailwind CSS", "Supabase"],
    github_url: "#",
    live_url: "",
    icon: "file",
    featured: false,
    order: 7,
    color: "#f97316",
    category: "Web Dev",
  },
  {
    $id: "8",
    title: "Data Dashboard using Streamlit",
    description:
      "Interactive data dashboard allowing users to upload CSV files, apply dynamic filters, generate real-time visualizations, and explore datasets interactively. Built for rapid exploratory data analysis.",
    tags: ["Python", "Pandas", "Matplotlib", "Streamlit", "Data Visualization"],
    github_url: "#",
    live_url: "",
    icon: "file",
    featured: false,
    order: 8,
    color: "#a78bfa",
    category: "Others",
  },
  {
    $id: "9",
    title: "SQL Query Generator using Gemini AI",
    description:
      "Natural Language → SQL conversion tool using Gemini API. Converts English prompts into SQL queries, provides explanation and sample outputs, designed for data learners and developers.",
    tags: ["Python", "SQL", "Gemini API", "Generative AI", "Streamlit"],
    github_url: "#",
    live_url: "",
    icon: "brain",
    featured: false,
    order: 9,
    color: "#00d4ff",
    category: "AI",
  },
  {
    $id: "10",
    title: "SentinelAI – Phishing Detection Engine",
    description:
      "AI-powered browser security extension that detects phishing attacks, spam content, and social engineering attempts in real-time using heuristic + NLP techniques.",
    tags: ["React", "TypeScript", "Chrome Extension APIs", "NLP", "AI Security"],
    github_url: "#",
    live_url: "",
    icon: "hand",
    featured: false,
    order: 10,
    color: "#00ff9d",
    category: "ML/DL",
  },
  {
    $id: "11",
    title: "Cognitive Visual Attention Simulation",
    description:
      "AI simulation of human visual focus using saliency maps, fixation modeling, and attention heatmaps. Demonstrates cognitive modeling through computer vision techniques.",
    tags: ["Python", "OpenCV", "NumPy", "Matplotlib", "Streamlit", "Computer Vision"],
    github_url: "#",
    live_url: "",
    icon: "brain",
    featured: false,
    order: 11,
    color: "#00ff9d",
    category: "ML/DL",
  },
  {
    $id: "12",
    title: "Automated Answer Grading System (EasyOCR)",
    description:
      "AI-based grading system for handwritten answer sheets using OCR extraction via EasyOCR, spelling correction using TextBlob, and semantic similarity scoring using SentenceTransformers. Significantly reduces manual grading workload.",
    tags: ["Python", "OCR", "NLP", "SentenceTransformers", "Computer Vision", "Streamlit"],
    github_url: "#",
    live_url: "",
    icon: "file",
    featured: false,
    order: 12,
    color: "#00ff9d",
    category: "ML/DL",
  },
  {
    $id: "13",
    title: "Custom MCP Server for AI Sticky Notes",
    description:
      "Lightweight productivity server enabling natural language note creation, reminder management, and AI-integrated workflow with Claude Desktop compatibility. Built using FastMCP + uv runtime.",
    tags: ["Python", "FastMCP", "REST API", "AI Productivity Tools"],
    github_url: "#",
    live_url: "",
    icon: "file",
    featured: false,
    order: 13,
    color: "#00d4ff",
    category: "AI",
  },
];

const ICON_MAP: Record<string, React.ReactNode> = {
  brain: <Brain size={20} />,
  hand: <Hand size={20} />,
  file: <FileText size={20} />,
};

const GITHUB_REPOS = "https://github.com/kishorekrrish3?tab=repositories";



interface Project {
  $id: string;
  title: string;
  description: string;
  tags: string[];
  github_url?: string;
  live_url?: string;
  icon?: string;
  featured?: boolean;
  order?: number;
  color?: string;
  category?: string;
}

function ProjectCard({ project, idx, isInView }: { project: Project; idx: number; isInView: boolean }) {
  const FALLBACK_COLORS = ["#00ff9d", "#00d4ff", "#a78bfa", "#f97316"];
  const color = project.color ?? FALLBACK_COLORS[idx % FALLBACK_COLORS.length];
  const icon = ICON_MAP[project.icon || ""] || <Brain size={20} />;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6, delay: idx * 0.13, ease: [0.22, 1, 0.36, 1] }}
      className="group relative bg-[#111] border border-white/5 rounded-2xl p-6 hover:border-white/10 transition-all duration-300 flex flex-col"
      style={{
        boxShadow: "0 0 0 transparent",
      }}
      whileHover={{
        boxShadow: `0 0 40px ${color}10`,
        y: -4,
      }}
    >
      {/* Top bar accent */}
      <div
        className="absolute top-0 left-6 right-6 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }}
      />

      {/* Icon + number */}
      <div className="flex items-start justify-between mb-4">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ background: `${color}15`, color }}
        >
          {icon}
        </div>
        <span className="font-mono text-xs text-[#333]">0{idx + 1}</span>
      </div>

      {/* Title */}
      <h3 className="text-white font-semibold text-lg mb-3 leading-snug group-hover:text-[#e8e8e8] transition-colors">
        {project.title}
      </h3>

      {/* Description */}
      <p className="text-[#666] text-sm leading-relaxed flex-1 mb-5">{project.description}</p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mb-5">
        {(Array.isArray(project.tags)
          ? project.tags
          : typeof project.tags === "string"
            ? (project.tags as string).split(",").map((t) => t.trim())
            : []
        ).slice(0, 6).map((tag) => (
          <span
            key={tag}
            className="px-2 py-0.5 text-xs rounded-md border"
            style={{
              background: `${color}08`,
              borderColor: `${color}20`,
              color: `${color}cc`,
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Links */}
      <div className="flex items-center gap-3 pt-4 border-t border-white/5">
        {project.github_url && project.github_url !== "#" && (
          <a
            href={project.github_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs text-[#666] hover:text-white transition-colors"
          >
            <Github size={13} />
            <span>Code</span>
          </a>
        )}
        {project.live_url && (
          <a
            href={project.live_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs text-[#666] hover:text-white transition-colors"
          >
            <ExternalLink size={13} />
            <span>Live</span>
          </a>
        )}
        {(!project.github_url || project.github_url === "#") && !project.live_url && (
          <a
            href={GITHUB_REPOS}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <span
              className="px-2 py-0.5 text-[10px] font-mono rounded-md"
              style={{ background: `${color}15`, color }}
            >
              ✓ Completed
            </span>
            <span
              className="px-2 py-0.5 text-[10px] font-mono rounded-md"
              style={{ background: `${color}15`, color }}
            >
              ◉ Public
            </span>
          </a>
        )}

      </div>
    </motion.div>
  );
}

export default function ProjectsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    getProjects()
      .then((docs) => {
        setProjects(docs.length > 0 ? (docs as unknown as Project[]) : FALLBACK_PROJECTS);
      })
      .catch(() => setProjects(FALLBACK_PROJECTS))
      .finally(() => setLoading(false));
  }, []);

  const FILTER_TABS = [
    { label: "All", color: "#00ff9d" },
    { label: "AI", color: "#00d4ff" },
    { label: "ML/DL", color: "#00ff9d" },
    { label: "Web Dev", color: "#f97316" },
    { label: "Others", color: "#a78bfa" },
  ];

  const filtered = filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <SectionWrapper id="projects">
      <div className="relative isolate w-full h-full pb-10">
        <HoleBackground
          className="absolute inset-0 -z-10 pointer-events-none mask-[radial-gradient(ellipse_at_top,white,transparent_75%)]"
          strokeColor="rgba(0, 255, 157, 0.15)"
        />

        <SectionLabel label="Portfolio" />
        <SectionTitle title="Featured Projects" />

        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {FILTER_TABS.map((tab) => (
            <button
              key={tab.label}
              onClick={() => setFilter(tab.label)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all duration-200 ${filter === tab.label
                ? "font-semibold text-[#0a0a0a]"
                : "bg-white/5 text-[#666] hover:text-white border border-white/8"
                }`}
              style={
                filter === tab.label
                  ? { background: tab.color }
                  : {}
              }
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div ref={ref} className="relative z-10 w-full">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="bg-[#111] border border-white/5 rounded-2xl p-6 h-72 animate-pulse"
                />
              ))}
            </div>
          ) : (
            <motion.div
              key={filter}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filtered.map((project, idx) => (
                <ProjectCard key={project.$id} project={project} idx={idx} isInView={isInView} />
              ))}
              {filtered.length === 0 && (
                <p className="col-span-3 text-center text-[#444] text-sm py-16 font-mono">No projects in this category.</p>
              )}
            </motion.div>
          )}
        </div>

        {/* More projects note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="mt-10 text-center relative z-10"
        >
          <a
            href={GITHUB_REPOS}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-[#555] hover:text-[#00ff9d] transition-colors font-mono"
          >
            <Github size={14} />
            View all repositories on GitHub
          </a>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
