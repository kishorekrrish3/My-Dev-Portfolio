"use client";

import React, { useRef } from "react";
import { useInView } from "framer-motion";

interface HighlighterProps {
  children: React.ReactNode;
  color?: string;
  type?: "highlight" | "underline" | "box" | "circle";
  animationDuration?: number;
  padding?: number;
  multiline?: boolean;
}

export function Highlighter({
  children,
  color = "rgba(0,255,157,0.25)",
  type = "highlight",
  animationDuration = 600,
}: HighlighterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  const durationMs = `${animationDuration}ms`;

  if (type === "underline") {
    return (
      <span ref={ref} className="relative inline whitespace-nowrap">
        {children}
        <span
          aria-hidden
          style={{
            position: "absolute",
            left: 0,
            bottom: "-2px",
            height: "2px",
            width: inView ? "100%" : "0%",
            background: color,
            borderRadius: "1px",
            transition: `width ${durationMs} cubic-bezier(0.4,0,0.2,1)`,
            display: "block",
          }}
        />
      </span>
    );
  }

  if (type === "box") {
    return (
      <span ref={ref} className="relative inline">
        {children}
        <span
          aria-hidden
          style={{
            position: "absolute",
            inset: "-3px -5px",
            border: `2px solid ${color}`,
            borderRadius: "3px",
            opacity: inView ? 1 : 0,
            transition: `opacity ${durationMs} ease`,
            pointerEvents: "none",
          }}
        />
      </span>
    );
  }

  if (type === "circle") {
    return (
      <span ref={ref} className="relative inline">
        {children}
        <span
          aria-hidden
          style={{
            position: "absolute",
            inset: "-5px -8px",
            border: `2px solid ${color}`,
            borderRadius: "50%",
            opacity: inView ? 1 : 0,
            transition: `opacity ${durationMs} ease`,
            pointerEvents: "none",
          }}
        />
      </span>
    );
  }

  // Default: "highlight"
  return (
    <span ref={ref} className="relative inline">
      <span
        aria-hidden
        style={{
          position: "absolute",
          left: 0,
          bottom: 0,
          width: "100%",
          height: "85%",
          background: color,
          borderRadius: "3px",
          transformOrigin: "left",
          transform: inView ? "scaleX(1)" : "scaleX(0)",
          transition: `transform ${durationMs} cubic-bezier(0.4,0,0.2,1)`,
          zIndex: 0,
          pointerEvents: "none",
        }}
      />
      <span className="relative z-10">{children}</span>
    </span>
  );
}
