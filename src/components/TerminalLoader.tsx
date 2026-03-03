"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BOOT_LINES = [
  { text: "> initializing system...", delay: 0 },
  { text: "> loading kernel modules...", delay: 600 },
  { text: "> starting dev server...", delay: 1200 },
  { text: "> running on localhost:3000...", delay: 1900 },
  { text: "> compiling AI and Web modules...", delay: 2700 },
  { text: "> mounting components...", delay: 3500 },
  { text: "> [  OK  ] All systems operational", delay: 4200 },
  { text: "> SUCCESS: Welcome, Kishore P.", delay: 4900 },
];

interface TerminalLineProps {
  text: string;
  onDone?: () => void;
  typingSpeed?: number;
  isSuccess?: boolean;
}

function TerminalLine({ text, onDone, typingSpeed = 28, isSuccess = false }: TerminalLineProps) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(interval);
        if (onDone) setTimeout(onDone, 120);
      }
    }, typingSpeed);
    return () => clearInterval(interval);
  }, [text, typingSpeed, onDone]);

  const getColor = () => {
    if (text.includes("SUCCESS")) return "text-green-400";
    if (text.includes("[  OK  ]")) return "text-green-300";
    if (text.includes("ERROR") || text.includes("FAIL")) return "text-red-400";
    return "text-green-200";
  };

  return (
    <div className={`font-mono text-sm md:text-base leading-relaxed ${getColor()}`}>
      {displayed}
      <span className="animate-pulse">▌</span>
    </div>
  );
}

interface TerminalLoaderProps {
  onComplete: () => void;
}

export default function TerminalLoader({ onComplete }: TerminalLoaderProps) {
  const [visibleLines, setVisibleLines] = useState<number[]>([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [done, setDone] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    BOOT_LINES.forEach((line, idx) => {
      const t = setTimeout(() => {
        setVisibleLines((prev) => [...prev, idx]);
        setCurrentLine(idx);
      }, line.delay);
      timers.push(t);
    });

    const lastDelay = BOOT_LINES[BOOT_LINES.length - 1].delay + 1200;
    const doneTimer = setTimeout(() => {
      setDone(true);
      setTimeout(() => {
        setFadeOut(true);
        setTimeout(onComplete, 800);
      }, 700);
    }, lastDelay);
    timers.push(doneTimer);

    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!fadeOut && (
        <motion.div
          key="terminal"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-50 bg-[#0a0a0a] flex items-center justify-center"
        >
          {/* CRT scanline overlay */}
          <div
            className="pointer-events-none absolute inset-0 z-10"
            style={{
              background:
                "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,70,0.015) 2px, rgba(0,255,70,0.015) 4px)",
            }}
          />

          {/* Glow vignette */}
          <div
            className="pointer-events-none absolute inset-0 z-10"
            style={{
              background:
                "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.7) 100%)",
            }}
          />

          <div className="relative z-20 w-full max-w-2xl mx-4">
            {/* Terminal window chrome */}
            <div className="rounded-xl overflow-hidden border border-green-900/40 shadow-2xl shadow-green-900/20">
              {/* Title bar */}
              <div className="flex items-center gap-2 px-4 py-3 bg-[#111] border-b border-green-900/30">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
                <span className="ml-3 text-xs text-green-700 font-mono">
                  bash — kishore@portfolio:~
                </span>
              </div>

              {/* Terminal body */}
              <div className="bg-[#0d0d0d] px-6 py-5 min-h-[320px] space-y-1">
                {/* Static header */}
                <div className="font-mono text-xs text-green-700 mb-4 pb-3 border-b border-green-900/20">
                  Portfolio OS v2.0 (GNU/Linux 6.8.0) — {new Date().getFullYear()}
                </div>

                {visibleLines.map((lineIdx) => (
                  <TerminalLine
                    key={lineIdx}
                    text={BOOT_LINES[lineIdx].text}
                    isSuccess={BOOT_LINES[lineIdx].text.includes("SUCCESS")}
                    typingSpeed={lineIdx === BOOT_LINES.length - 1 ? 22 : 28}
                  />
                ))}

                {done && (
                  <motion.div
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mt-4 font-mono text-green-400 text-sm animate-pulse"
                  >
                    &gt; press any key or wait...
                  </motion.div>
                )}
              </div>
            </div>

            {/* Bottom label */}
            <p className="text-center mt-4 text-green-900 font-mono text-xs tracking-widest uppercase">
              Kishore P — Portfolio
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
