"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import SectionWrapper, { SectionLabel, SectionTitle } from "./SectionWrapper";
import { Users, Music, Code2, Trophy, CalendarDays, Star } from "lucide-react";

const CAMPUS_ACTIVITIES = [
  {
    org: "Arignar Anna Thamizh Mandram",
    role: "Core Member & Technical Lead",
    period: "2023 — Present",
    icon: <Music size={18} />,
    color: "#f59e0b",
    highlights: [
      "Organized Muthamizh Thiruvizha — an annual cultural celebration honoring Tamil literature, music, and arts with 500+ attendees",
      "Spearheaded technical infrastructure: AV setup, live streaming, digital stage management",
      "Led a cross-functional volunteer team of 25+ members coordinating logistics and event flow",
      "Bridged technical and cultural domains, creating hybrid events showcasing Tamil digital art",
    ],
    badge: "Cultural & Tech",
  },
  {
    org: "Technical Collaborative Events",
    role: "Event Coordinator",
    period: "2023 — Present",
    icon: <Code2 size={18} />,
    color: "#00d4ff",
    highlights: [
      "Coordinated inter-departmental hackathons and coding competitions with 200+ participants",
      "Designed event websites and registration portals using React and Node.js",
      "Conducted workshops on AI/ML fundamentals for first and second-year students",
      "Mentored junior peers on project ideation, tech stack selection, and presentation skills",
    ],
    badge: "Tech Events",
  },
  {
    org: "VIT Student Research Cell",
    role: "Research Contributor",
    period: "2024 — Present",
    icon: <Trophy size={18} />,
    color: "#a78bfa",
    highlights: [
      "Active contributor to capstone research on medical image classification",
      "Presented project findings at intra-department seminars and tech showcases",
      "Collaborated with faculty on grant proposals for AI-driven healthcare tools",
    ],
    badge: "Research",
  },
];

const STATS = [
  { value: "500+", label: "Event Attendees", icon: <Users size={16} /> },
  { value: "25+", label: "Volunteers Led", icon: <Star size={16} /> },
  { value: "3+", label: "Events Organized", icon: <CalendarDays size={16} /> },
  { value: "200+", label: "Students Mentored", icon: <Trophy size={16} /> },
];

export default function CampusSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <SectionWrapper id="campus">
      <SectionLabel label="Campus Life" />
      <SectionTitle title="Campus Footprint" />

      <div ref={ref}>
        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-[#111] border border-white/5 rounded-2xl p-4 text-center"
            >
              <div className="flex justify-center mb-2 text-[#00ff9d]">{stat.icon}</div>
              <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-xs text-[#555] font-mono uppercase tracking-wider">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Activity cards */}
        <div className="space-y-6">
          {CAMPUS_ACTIVITIES.map((activity, idx) => (
            <motion.div
              key={activity.org}
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: idx * 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="bg-[#111] border border-white/5 rounded-2xl p-6 hover:border-white/10 transition-all duration-300 group"
            >
              <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                {/* Icon */}
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: `${activity.color}15`, color: activity.color }}
                >
                  {activity.icon}
                </div>

                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-white font-semibold text-base">{activity.org}</h3>
                        <span
                          className="px-2 py-0.5 text-xs rounded-full border font-mono"
                          style={{
                            background: `${activity.color}10`,
                            borderColor: `${activity.color}25`,
                            color: activity.color,
                          }}
                        >
                          {activity.badge}
                        </span>
                      </div>
                      <p className="text-sm mt-0.5" style={{ color: activity.color }}>
                        {activity.role}
                      </p>
                    </div>
                    <div className="flex items-center gap-1.5 text-[#444] shrink-0">
                      <CalendarDays size={12} />
                      <span className="font-mono text-xs">{activity.period}</span>
                    </div>
                  </div>

                  <ul className="space-y-2 mt-3">
                    {activity.highlights.map((point) => (
                      <li key={point} className="flex items-start gap-2 text-sm text-[#666]">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-[#333] shrink-0" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
