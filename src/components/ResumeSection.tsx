"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Download, FileText, Eye } from "lucide-react";

export default function ResumeSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const RESUME_URL = process.env.NEXT_PUBLIC_RESUME_URL || "#";

  return (
    <section id="resume" className="py-20 px-6">
      <div ref={ref} className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-2xl border border-white/8 bg-[#0f0f0f] p-8 md:p-12"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-10">
            {/* Left */}
            <div className="text-center md:text-left">
              <p className="font-mono text-xs text-[#444] tracking-widest uppercase mb-3">
                Resume
              </p>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
                Want to work together?
              </h2>
              <p className="text-[#666] text-sm max-w-md leading-relaxed mb-5">
                Download my resume to explore my skills, experience, and projects in detail.
                Currently open to full-time roles and internship opportunities.
              </p>
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                {["B.Tech CSE — VIT Chennai", "CGPA: 8.5+", "Open to Relocation"].map((item) => (
                  <span
                    key={item}
                    className="px-3 py-1 bg-white/[0.04] border border-white/8 rounded-full text-xs text-[#777]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Right: buttons */}
            <div className="flex flex-col sm:flex-row md:flex-col gap-3 shrink-0">
              <a
                href={RESUME_URL}
                download
                className="group flex items-center gap-2.5 px-7 py-3.5 bg-white text-[#0a0a0a] rounded-xl font-semibold text-sm hover:bg-[#e8e8e8] transition-all duration-200 hover:scale-[1.03] active:scale-95"
              >
                <Download size={16} className="group-hover:-translate-y-0.5 transition-transform" />
                Download Resume
              </a>
              {RESUME_URL !== "#" && (
                <a
                  href={RESUME_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 px-7 py-3.5 border border-white/10 text-[#888] rounded-xl font-medium text-sm hover:border-white/20 hover:text-white transition-all duration-200 hover:scale-[1.03] active:scale-95"
                >
                  <Eye size={16} />
                  Preview Online
                </a>
              )}
            </div>
          </div>

          <div className="mt-6 pt-5 border-t border-white/5 flex items-center gap-2">
            <FileText size={12} className="text-[#333]" />
            <span className="font-mono text-xs text-[#333]">PDF • Last updated: March 2026</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
