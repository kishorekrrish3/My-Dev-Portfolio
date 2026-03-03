"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface SectionWrapperProps {
  id: string;
  children: React.ReactNode;
  className?: string;
}

export default function SectionWrapper({ id, children, className = "" }: SectionWrapperProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id={id} className={`py-24 px-6 ${className}`}>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 48 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 48 }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-6xl mx-auto"
      >
        {children}
      </motion.div>
    </section>
  );
}

export function SectionLabel({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 mb-3">
      <span className="font-mono text-[#00ff9d] text-[11px] tracking-[0.2em] uppercase">
        {label}
      </span>
      <div className="h-px w-12 bg-[#00ff9d]/25" />
    </div>
  );
}

export function SectionTitle({ title }: { title: string }) {
  return (
    <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 tracking-tight leading-tight">
      {title}
    </h2>
  );
}
