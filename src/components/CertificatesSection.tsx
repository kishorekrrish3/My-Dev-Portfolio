"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import SectionWrapper, { SectionLabel, SectionTitle } from "./SectionWrapper";
import { getCertificates } from "@/lib/appwrite";
import { Award, ExternalLink, Shield, Cpu, Globe, Database } from "lucide-react";

const FALLBACK_CERTIFICATES = [
  {
    $id: "c1",
    title: "Deep Learning Specialization",
    issuer: "Coursera / deeplearning.ai",
    date: "2024",
    credential_url: "#",
    category: "AI/ML",
    icon: "cpu",
    order: 1,
  },
  {
    $id: "c2",
    title: "Machine Learning with Python",
    issuer: "IBM / Coursera",
    date: "2024",
    credential_url: "#",
    category: "AI/ML",
    icon: "cpu",
    order: 2,
  },
  {
    $id: "c3",
    title: "Full-Stack Web Development",
    issuer: "freeCodeCamp",
    date: "2023",
    credential_url: "#",
    category: "Web Dev",
    icon: "globe",
    order: 3,
  },
  {
    $id: "c4",
    title: "Introduction to Cybersecurity",
    issuer: "Cisco NetAcad",
    date: "2023",
    credential_url: "#",
    category: "Security",
    icon: "shield",
    order: 4,
  },
  {
    $id: "c5",
    title: "Python for Data Science",
    issuer: "NPTEL / IIT",
    date: "2023",
    credential_url: "#",
    category: "Python",
    icon: "database",
    order: 5,
  },
  {
    $id: "c6",
    title: "Computer Vision with OpenCV",
    issuer: "Udemy",
    date: "2024",
    credential_url: "#",
    category: "AI/ML",
    icon: "cpu",
    order: 6,
  },
];

const ICON_MAP: Record<string, React.ReactNode> = {
  cpu: <Cpu size={16} />,
  globe: <Globe size={16} />,
  shield: <Shield size={16} />,
  database: <Database size={16} />,
  award: <Award size={16} />,
};

const CATEGORY_COLORS: Record<string, string> = {
  "AI/ML": "#00ff9d",
  "Web Dev": "#00d4ff",
  "Security": "#f59e0b",
  "Python": "#a78bfa",
  "Networks": "#fb7185",
  "Database": "#34d399",
};

interface Certificate {
  $id: string;
  title: string;
  issuer: string;
  date: string;
  credential_url?: string;
  category?: string;
  icon?: string;
  order?: number;
}

export default function CertificatesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [certs, setCerts] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    getCertificates()
      .then((docs) => {
        setCerts(docs.length > 0 ? (docs as unknown as Certificate[]) : FALLBACK_CERTIFICATES);
      })
      .catch(() => setCerts(FALLBACK_CERTIFICATES))
      .finally(() => setLoading(false));
  }, []);

  const categories = ["All", ...Array.from(new Set(certs.map((c) => c.category || "Other")))];
  const filtered = filter === "All" ? certs : certs.filter((c) => c.category === filter);

  return (
    <SectionWrapper id="certificates">
      <SectionLabel label="Credentials" />
      <SectionTitle title="Certificates" />

      {/* Filter pills */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all duration-200 ${
              filter === cat
                ? "bg-[#00ff9d] text-[#0a0a0a] font-semibold"
                : "bg-white/5 text-[#666] hover:text-white border border-white/8"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div ref={ref}>
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="bg-[#111] border border-white/5 rounded-xl p-5 h-32 animate-pulse"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((cert, idx) => {
              const color = CATEGORY_COLORS[cert.category || "Other"] || "#888";
              const icon = ICON_MAP[cert.icon || ""] || <Award size={16} />;

              return (
                <motion.div
                  key={cert.$id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: idx * 0.07, ease: [0.22, 1, 0.36, 1] }}
                  className="group bg-[#111] border border-white/5 rounded-xl p-5 hover:border-white/10 transition-all duration-300 relative overflow-hidden"
                  whileHover={{ y: -2 }}
                >
                  {/* Subtle color bar left */}
                  <div
                    className="absolute left-0 top-0 bottom-0 w-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: color }}
                  />

                  <div className="flex items-start gap-3">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                      style={{ background: `${color}15`, color }}
                    >
                      {icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-white text-sm font-semibold leading-snug mb-1 truncate">
                        {cert.title}
                      </h4>
                      <p className="text-[#555] text-xs mb-2 truncate">{cert.issuer}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs text-[#333]">{cert.date}</span>
                          {cert.category && (
                            <span
                              className="px-1.5 py-0.5 rounded text-xs font-mono"
                              style={{ background: `${color}12`, color }}
                            >
                              {cert.category}
                            </span>
                          )}
                        </div>
                        {cert.credential_url && cert.credential_url !== "#" && (
                          <a
                            href={cert.credential_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#444] hover:text-[#00ff9d] transition-colors"
                          >
                            <ExternalLink size={12} />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </SectionWrapper>
  );
}
