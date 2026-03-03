"use client";

import { useEffect, useRef } from "react";
import { motion, useSpring } from "framer-motion";

interface Position {
  x: number;
  y: number;
}

export interface SmoothCursorProps {
  cursor?: React.ReactNode;
}

function CursorDot() {
  return (
    <div className="relative flex items-center justify-center">
      <div className="w-4 h-4 rounded-full bg-[#00ff9d] opacity-90" />
      <div className="absolute w-8 h-8 rounded-full border border-[#00ff9d]/40" />
    </div>
  );
}

export function SmoothCursor({ cursor = <CursorDot /> }: SmoothCursorProps) {
  const lastMousePos = useRef<Position>({ x: 0, y: 0 });
  const velocity = useRef<Position>({ x: 0, y: 0 });
  const lastUpdateTime = useRef(Date.now());
  const accumulatedRotation = useRef(0);
  const previousAngle = useRef(0);

  const springConfig = { damping: 38, stiffness: 600, mass: 1, restDelta: 0.001 };

  const cursorX = useSpring(0, springConfig);
  const cursorY = useSpring(0, springConfig);
  const scale = useSpring(1, { ...springConfig, stiffness: 650, damping: 30 });

  useEffect(() => {
    // Only show on desktop
    if (!window.matchMedia("(hover: hover)").matches) return;

    const handleMove = (e: MouseEvent) => {
      const now = Date.now();
      const dt = now - lastUpdateTime.current;
      if (dt > 0) {
        velocity.current = {
          x: (e.clientX - lastMousePos.current.x) / dt,
          y: (e.clientY - lastMousePos.current.y) / dt,
        };
      }

      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      const speed = Math.sqrt(velocity.current.x ** 2 + velocity.current.y ** 2);
      if (speed > 0.1) {
        scale.set(0.85);
      } else {
        scale.set(1);
      }

      lastMousePos.current = { x: e.clientX, y: e.clientY };
      lastUpdateTime.current = now;
    };

    const handleMouseDown = () => scale.set(0.7);
    const handleMouseUp = () => scale.set(1);

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [cursorX, cursorY, scale]);

  return (
    <motion.div
      style={{
        position: "fixed",
        left: cursorX,
        top: cursorY,
        translateX: "-50%",
        translateY: "-50%",
        scale,
        zIndex: 99999,
        pointerEvents: "none",
      }}
    >
      {cursor}
    </motion.div>
  );
}
