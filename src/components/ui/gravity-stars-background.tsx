"use client";

import React, { useEffect, useRef, useCallback } from "react";
import { cn } from "@/lib/utils";

type GlowAnimation = "instant" | "ease" | "spring";
type MouseGravity = "attract" | "repel";
type StarsInteractionType = "bounce" | "merge";

interface GravityStarsBackgroundProps extends React.HTMLAttributes<HTMLDivElement> {
    starsCount?: number;
    starsSize?: number;
    starsOpacity?: number;
    glowIntensity?: number;
    glowAnimation?: GlowAnimation;
    movementSpeed?: number;
    mouseInfluence?: number;
    mouseGravity?: MouseGravity;
    gravityStrength?: number;
    starsInteraction?: boolean;
    starsInteractionType?: StarsInteractionType;
    starColor?: string;
}

interface Star {
    x: number;
    y: number;
    vx: number;
    vy: number;
    baseX: number;
    baseY: number;
    size: number;
    opacity: number;
    targetOpacity: number;
    glowScale: number;
    targetGlowScale: number;
    mass: number;
}

export function GravityStarsBackground({
    starsCount = 100,
    starsSize = 2,
    starsOpacity = 0.75,
    glowIntensity = 15,
    glowAnimation = "ease",
    movementSpeed = 0.3,
    mouseInfluence = 120,
    mouseGravity = "attract",
    gravityStrength = 75,
    starsInteraction = false,
    starsInteractionType = "bounce",
    starColor = "#00ff9d",
    className,
    ...props
}: GravityStarsBackgroundProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const starsRef = useRef<Star[]>([]);
    const mouseRef = useRef({ x: -9999, y: -9999, inside: false });
    const rafRef = useRef<number>(0);

    /* ── parse colour to rgb ─────────────────────────────────────────────────── */
    const parseColor = useCallback(
        (hex: string): [number, number, number] => {
            const h = hex.replace("#", "");
            return [
                parseInt(h.substring(0, 2), 16),
                parseInt(h.substring(2, 4), 16),
                parseInt(h.substring(4, 6), 16),
            ];
        },
        []
    );

    /* ── init stars ──────────────────────────────────────────────────────────── */
    const initStars = useCallback(
        (w: number, h: number) => {
            starsRef.current = Array.from({ length: starsCount }, () => {
                const x = Math.random() * w;
                const y = Math.random() * h;
                return {
                    x,
                    y,
                    vx: (Math.random() - 0.5) * movementSpeed,
                    vy: (Math.random() - 0.5) * movementSpeed,
                    baseX: x,
                    baseY: y,
                    size: starsSize * (0.5 + Math.random() * 0.8),
                    opacity: starsOpacity * (0.4 + Math.random() * 0.6),
                    targetOpacity: starsOpacity,
                    glowScale: 1,
                    targetGlowScale: 1,
                    mass: 0.5 + Math.random() * 1.5,
                } as Star;
            });
        },
        [starsCount, starsSize, starsOpacity, movementSpeed]
    );

    /* ── animate ─────────────────────────────────────────────────────────────── */
    const animate = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const W = canvas.width;
        const H = canvas.height;
        const mouse = mouseRef.current;
        const [r, g, b] = parseColor(starColor);

        ctx.clearRect(0, 0, W, H);

        const stars = starsRef.current;

        /* gravity / repulsion ── */
        for (const star of stars) {
            const dx = mouse.x - star.x;
            const dy = mouse.y - star.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (mouse.inside && dist < mouseInfluence) {
                const force = ((mouseInfluence - dist) / mouseInfluence) * (gravityStrength / 1000);
                const dir = mouseGravity === "attract" ? 1 : -1;
                star.vx += (dx / dist) * force * dir;
                star.vy += (dy / dist) * force * dir;
                star.targetGlowScale = 1 + (1 - dist / mouseInfluence) * 2.5;
                star.targetOpacity = Math.min(1, starsOpacity * 1.4);
            } else {
                // drift back
                const bDx = star.baseX - star.x;
                const bDy = star.baseY - star.y;
                star.vx += bDx * 0.003;
                star.vy += bDy * 0.003;
                star.targetGlowScale = 1;
                star.targetOpacity = starsOpacity;
            }

            // friction
            star.vx *= 0.93;
            star.vy *= 0.93;

            star.x += star.vx;
            star.y += star.vy;

            // wrap edges softly
            if (star.x < -20) star.x = W + 20;
            if (star.x > W + 20) star.x = -20;
            if (star.y < -20) star.y = H + 20;
            if (star.y > H + 20) star.y = -20;

            /* glow animation ── */
            const lerpRate =
                glowAnimation === "instant" ? 1 : glowAnimation === "spring" ? 0.25 : 0.1;

            star.glowScale += (star.targetGlowScale - star.glowScale) * lerpRate;
            star.opacity += (star.targetOpacity - star.opacity) * lerpRate;
        }

        /* star ↔ star interaction ── */
        if (starsInteraction) {
            for (let i = 0; i < stars.length; i++) {
                for (let j = i + 1; j < stars.length; j++) {
                    const a = stars[i];
                    const b2 = stars[j];
                    const dx = b2.x - a.x;
                    const dy = b2.y - a.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    const minDist = (a.size + b2.size) * 4;

                    if (dist < minDist && dist > 0) {
                        if (starsInteractionType === "bounce") {
                            const nx = dx / dist;
                            const ny = dy / dist;
                            const relV = (a.vx - b2.vx) * nx + (a.vy - b2.vy) * ny;
                            if (relV > 0) {
                                const j2 = (2 * relV) / (a.mass + b2.mass);
                                a.vx -= j2 * b2.mass * nx;
                                a.vy -= j2 * b2.mass * ny;
                                b2.vx += j2 * a.mass * nx;
                                b2.vy += j2 * a.mass * ny;
                            }
                        } else {
                            // merge: absorb smaller into larger
                            if (a.size >= b2.size) {
                                a.size = Math.min(starsSize * 3, a.size + b2.size * 0.1);
                                b2.x = Math.random() * W;
                                b2.y = Math.random() * H;
                                b2.baseX = b2.x;
                                b2.baseY = b2.y;
                                b2.size = starsSize * (0.5 + Math.random() * 0.8);
                            }
                        }
                    }
                }
            }
        }

        /* draw ── */
        for (const star of stars) {
            const glow = glowIntensity * star.glowScale;

            // glow halo
            if (glow > 0) {
                const grad = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, glow);
                grad.addColorStop(0, `rgba(${r},${g},${b},${star.opacity * 0.4})`);
                grad.addColorStop(1, `rgba(${r},${g},${b},0)`);
                ctx.beginPath();
                ctx.arc(star.x, star.y, glow, 0, Math.PI * 2);
                ctx.fillStyle = grad;
                ctx.fill();
            }

            // star core
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.size * star.glowScale, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${r},${g},${b},${star.opacity})`;
            ctx.fill();
        }

        rafRef.current = requestAnimationFrame(animate);
    }, [
        parseColor, starColor, mouseInfluence, mouseGravity, gravityStrength,
        starsOpacity, glowIntensity, glowAnimation, starsInteraction,
        starsInteractionType, starsSize,
    ]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const resize = () => {
            const parent = canvas.parentElement;
            if (!parent) return;
            canvas.width = parent.clientWidth;
            canvas.height = parent.clientHeight;
            initStars(canvas.width, canvas.height);
        };

        resize();
        const ro = new ResizeObserver(resize);
        ro.observe(canvas.parentElement!);

        const onMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            mouseRef.current = {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
                inside: true,
            };
        };
        const onLeave = () => { mouseRef.current.inside = false; };

        window.addEventListener("mousemove", onMove, { passive: true });
        canvas.addEventListener("mouseleave", onLeave);

        rafRef.current = requestAnimationFrame(animate);

        return () => {
            cancelAnimationFrame(rafRef.current);
            ro.disconnect();
            window.removeEventListener("mousemove", onMove);
            canvas.removeEventListener("mouseleave", onLeave);
        };
    }, [animate, initStars]);

    return (
        <div className={cn("absolute inset-0 overflow-hidden", className)} {...props}>
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
        </div>
    );
}
