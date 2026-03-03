"use client";

import React, { useRef } from "react";
import { RoughNotation, RoughNotationProps } from "react-rough-notation";
import { useInView } from "framer-motion";

interface HighlighterProps {
  children: React.ReactNode;
  color?: string;
  type?: RoughNotationProps["type"];
  strokeWidth?: number;
  animationDuration?: number;
  iterations?: number;
  padding?: number;
  multiline?: boolean;
}

export function Highlighter({
  children,
  color = "rgba(0,255,157,0.25)",
  type = "highlight",
  strokeWidth = 1.5,
  animationDuration = 600,
  iterations = 2,
  padding = 3,
  multiline = true,
}: HighlighterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <span ref={ref} className="inline">
      <RoughNotation
        type={type}
        show={inView}
        color={color}
        strokeWidth={strokeWidth}
        animationDuration={animationDuration}
        iterations={iterations}
        padding={padding}
        multiline={multiline}
      >
        {children}
      </RoughNotation>
    </span>
  );
}
