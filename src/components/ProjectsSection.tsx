"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import SectionWrapper, { SectionLabel, SectionTitle } from "./SectionWrapper";
import { getProjects } from "@/lib/appwrite";
import { ExternalLink, Github, Brain, Hand, FileText, Plus } from "lucide-react";

// Fallback static projects (shown when Appwrite is not configured)
const FALLBACK_PROJECTS = [
  {
    $id: "1",
    title: "Skin Lesion Classification CNN",
    description:
      "Deep learning capstone project for multi-class skin lesion classification. Built a CNN pipeline achieving classification across 14 distinct dermatological categories using HAM10000 dataset. Integrated data augmentation, transfer learning (EfficientNet), and Grad-CAM visualization for interpretability.",
    tags: ["Python", "TensorFlow", "CNN", "Medical AI", "Grad-CAM", "EfficientNet"],
    github_url: "#",
    live_url: "",
    icon: "brain",
    featured: true,
    order: 1,
  },
  {
    $id: "2",
    title: "Hand Gesture Robotic Arm",
    description:
      "Real-time hand gesture-controlled robotic arm system integrating MediaPipe for 21-point hand landmark detection and facial recognition via FaceNet for operator authentication. Servo motors respond with sub-200ms latency to recognized gestures over serial communication.",
    tags: ["Python", "MediaPipe", "OpenCV", "Arduino", "FaceNet", "Robotics"],
    github_url: "#",
    live_url: "",
    icon: "hand",
    featured: true,
    order: 2,
  },
  {
    $id: "3",
    title: "AI OCR Answer Grading System",
    description:
      "Automated grading system for handwritten answer papers using a multi-stage OCR pipeline. Extracts text from scanned answer sheets, semantically evaluates responses against a model answer key using cosine similarity and BERT embeddings, and produces detailed score reports.",
    tags: ["Python", "Tesseract OCR", "BERT", "NLP", "FastAPI", "React"],
    github_url: "#",
    live_url: "",
    icon: "file",
    featured: true,
    order: 3,
  },
];

const ICON_MAP: Record<string, React.ReactNode> = {
  brain: <Brain size={20} />,
  hand: <Hand size={20} />,
  file: <FileText size={20} />,
};

const COLORS = ["#00ff9d", "#00d4ff", "#a78bfa", "#f59e0b"];

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
}

function ProjectCard({ project, idx, isInView }: { project: Project; idx: number; isInView: boolean }) {
  const color = COLORS[idx % COLORS.length];
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
          <span className="text-xs text-[#333] font-mono">Private / In Progress</span>
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

  useEffect(() => {
    getProjects()
      .then((docs) => {
        setProjects(docs.length > 0 ? (docs as unknown as Project[]) : FALLBACK_PROJECTS);
      })
      .catch(() => setProjects(FALLBACK_PROJECTS))
      .finally(() => setLoading(false));
  }, []);

  return (
    <SectionWrapper id="projects">
      <SectionLabel label="Portfolio" />
      <SectionTitle title="Featured Projects" />

      <div ref={ref}>
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, idx) => (
              <ProjectCard key={project.$id} project={project} idx={idx} isInView={isInView} />
            ))}
          </div>
        )}
      </div>

      {/* More projects note */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.6 }}
        className="mt-10 text-center"
      >
        <a
          href="https://github.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm text-[#555] hover:text-[#00ff9d] transition-colors font-mono"
        >
          <Github size={14} />
          View all repositories on GitHub
        </a>
      </motion.div>
    </SectionWrapper>
  );
}
