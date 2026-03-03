"use client";

import { cn } from "@/lib/utils";
import { motion, MotionProps } from "framer-motion";
import React from "react";

interface AuroraTextProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, keyof MotionProps> {
  className?: string;
  children: React.ReactNode;
  colors?: string[];
  speed?: number;
}

export const AuroraText = ({
  className,
  children,
  colors = ["#00ff9d", "#00d4ff", "#a78bfa", "#00ff9d"],
  speed = 1,
  ...props
}: AuroraTextProps) => {
  return (
    <motion.span
      className={cn(
        "relative inline-block bg-clip-text text-transparent",
        className
      )}
      style={
        {
          backgroundImage: `linear-gradient(90deg, ${colors[0]}, ${colors[1]}, ${colors[2]}, ${colors[3]}, ${colors[0]})`,
          backgroundSize: "300% auto",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        } as React.CSSProperties
      }
      initial={{ backgroundPosition: "0% center" }}
      animate={{ backgroundPosition: ["0% center", "300% center"] }}
      transition={{
        duration: 8 / speed,
        repeat: Infinity,
        ease: "linear",
      }}
      {...(props as any)}
    >
      {children}
    </motion.span>
  );
};
