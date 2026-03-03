"use client";

import React, { useEffect, useRef, useCallback } from "react";
import { cn } from "@/lib/utils";

interface HoleBackgroundProps extends React.HTMLAttributes<HTMLDivElement> {
    strokeColor?: string;
    numberOfLines?: number;
    numberOfDiscs?: number;
    particleRGBColor?: [number, number, number];
}

export function HoleBackground({
    strokeColor = "#00ff9d",
    numberOfLines = 40,
    numberOfDiscs = 34,
    particleRGBColor = [0, 255, 157],
    className,
    ...props
}: HoleBackgroundProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animFrameRef = useRef<number>(0);
    const mouseRef = useRef({ x: 0, y: 0 });
    const targetRef = useRef({ x: 0, y: 0 });

    const animate = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const W = canvas.width;
        const H = canvas.height;
        const cx = W / 2;
        const cy = H / 2;

        // Smooth mouse follow
        mouseRef.current.x += (targetRef.current.x - mouseRef.current.x) * 0.06;
        mouseRef.current.y += (targetRef.current.y - mouseRef.current.y) * 0.06;

        const mx = mouseRef.current.x - cx;
        const my = mouseRef.current.y - cy;
        const maxR = Math.sqrt(cx * cx + cy * cy);

        ctx.clearRect(0, 0, W, H);

        // ── Concentric ellipses ──────────────────────────────────────────
        for (let i = 1; i <= numberOfDiscs; i++) {
            const t = i / numberOfDiscs;
            // perspective shrink toward mouse direction
            const spread = 0.8 + 0.2 * (1 - t);
            const radiusX = (cx * t * spread) + (mx * t * 0.15);
            const radiusY = (cy * t * spread * 0.55) + (my * t * 0.08);

            const alpha = 0.08 + 0.18 * (1 - t);
            ctx.beginPath();
            ctx.ellipse(cx, cy, Math.max(1, radiusX), Math.max(1, radiusY), 0, 0, Math.PI * 2);
            ctx.strokeStyle = hexToRgba(strokeColor, alpha);
            ctx.lineWidth = 0.7;
            ctx.stroke();
        }

        // ── Radial spokes ────────────────────────────────────────────────
        for (let i = 0; i < numberOfLines; i++) {
            const angle = (i / numberOfLines) * Math.PI * 2;
            const len = maxR * 1.05;
            const distort = 1 + (mx * Math.cos(angle) + my * Math.sin(angle)) / (maxR * 4);

            const ex = cx + Math.cos(angle) * len * distort;
            const ey = cy + Math.sin(angle) * len * distort;

            const alpha = 0.05 + 0.12 * Math.abs(Math.cos(angle - Math.atan2(my, mx)));
            ctx.beginPath();
            ctx.moveTo(cx, cy);
            ctx.lineTo(ex, ey);
            ctx.strokeStyle = hexToRgba(strokeColor, alpha);
            ctx.lineWidth = 0.6;
            ctx.stroke();
        }

        // ── Center glow ──────────────────────────────────────────────────
        const [r, g, b] = particleRGBColor;
        const glowRadius = Math.min(cx, cy) * 0.35;
        const grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, glowRadius);
        grd.addColorStop(0, `rgba(${r},${g},${b},0.15)`);
        grd.addColorStop(1, `rgba(${r},${g},${b},0)`);
        ctx.beginPath();
        ctx.arc(cx, cy, glowRadius, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();

        animFrameRef.current = requestAnimationFrame(animate);
    }, [strokeColor, numberOfLines, numberOfDiscs, particleRGBColor]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const resize = () => {
            const parent = canvas.parentElement;
            if (!parent) return;
            canvas.width = parent.clientWidth;
            canvas.height = parent.clientHeight;
            // Reset mouse to center so it doesn't start at 0,0
            mouseRef.current = { x: canvas.width / 2, y: canvas.height / 2 };
            targetRef.current = { x: canvas.width / 2, y: canvas.height / 2 };
        };

        resize();
        const ro = new ResizeObserver(resize);
        ro.observe(canvas.parentElement!);

        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            targetRef.current = {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
            };
        };

        window.addEventListener("mousemove", handleMouseMove, { passive: true });
        animFrameRef.current = requestAnimationFrame(animate);

        return () => {
            cancelAnimationFrame(animFrameRef.current);
            ro.disconnect();
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, [animate]);

    return (
        <div className={cn("absolute inset-0 overflow-hidden", className)} {...props}>
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
        </div>
    );
}

// ── Utility ───────────────────────────────────────────────────────────────────
function hexToRgba(hex: string, alpha: number): string {
    // Handle rgb/rgba strings passed directly
    if (hex.startsWith("rgb")) return hex.replace(/[\d.]+\)$/, `${alpha})`);
    const h = hex.replace("#", "");
    const r = parseInt(h.substring(0, 2), 16);
    const g = parseInt(h.substring(2, 4), 16);
    const b = parseInt(h.substring(4, 6), 16);
    return `rgba(${r},${g},${b},${alpha})`;
}
