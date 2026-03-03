"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import SectionWrapper, { SectionLabel, SectionTitle } from "./SectionWrapper";
import { Music, Code2, Trophy, CalendarDays } from "lucide-react";

const CAMPUS_ACTIVITIES = [
  {
    org: "Arignar Anna Thamizh Mandram",
    role: "Design Lead & Joint Secretary",
    period: "2025",
    icon: <Music size={18} />,
    color: "#f59e0b",
    highlights: [
      "Organized an international-level Pongal Thiruvizha 2025 featuring 12+ cultural and literary events, with renowned playback singer Velmurugan as the chief guest — drawing large-scale student participation and inter-college recognition",
      "Led the end-to-end design strategy for the club, conceptualizing and executing all branding, posters, stage visuals, and digital assets for a consistent and elevated cultural identity",
      "Designed and published 3–4 editions of Kanaiyazhi, the student-curated literary magazine, overseeing layout design, visual storytelling, and structured presentation of fully student-written content",
      "Worked within a 20-member core committee and led a 500+ member community to successfully conduct 35+ events spanning cultural festivals, literary competitions, workshops, and intra-college celebrations",
      "Continued involvement for 3 years as a mentor and advisor to current design leads, ensuring continuity in creative and organizational standards",
    ],
    badge: "Cultural & Literature",

  },
  {
    org: "Artificial Intelligence Club",
    role: "General Secretary & Advisor",
    period: "2025 — Current",
    icon: <Code2 size={18} />,
    color: "#00d4ff",
    highlights: [
      "Organized and led large-scale AI-focused technical events, hackathons, and workshops impacting 800+ students across AI, ML, Cloud, and Product Engineering domains",
      "Drove strategic planning, technical roadmap design, and cross-domain collaboration as General Secretary and later Advisor to elevate the club's innovation standards",
      "Led a 400+ member technical community and a 15–20 member core leadership team to execute 25+ high-impact events including hackathons, hands-on bootcamps, research sessions, and industry speaker events",
      "Strengthened industry-academia connections by onboarding external speakers, collaborating with IBM Z Ambassadors and tech professionals",
      "Mentored multiple project teams across AI, Full Stack, and Cloud domains — guiding students from ideation to deployment",
    ],
    badge: "Technical",
  },
  {
    org: "Student Welfare Office — VIT",
    role: "Events & Outreach Member",
    period: "2024 — Current",
    icon: <Trophy size={18} />,
    color: "#a78bfa",
    highlights: [
      "Led design and print production for major university festivals including Vibrance (Cultural Fest) and TechnoVIT (Technical Fest) for 2.5 years — overseeing visual branding, stage creatives, merchandise, and on-ground branding execution",
      "Contributed to event planning, discipline management, logistics coordination, and guest hospitality for Fresher's Induction, Graduation Ceremony, Crystal Connexions (15-Year Alumni Meet featuring Kamal Haasan & MaKaPa)",
      "Managed celebrity campus promotions including Nani, Priyanka Mohan, and Surya's Saturday promotional event",
      "Collaborated across design, operations, hospitality, and guest care committees to ensure structured execution of high-footfall events involving thousands of participants and distinguished guests",
    ],
    badge: "Leadership & Events",
  },
];


export default function CampusSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <SectionWrapper id="campus">
      <SectionLabel label="Journey" />
      <SectionTitle title="My Journey So Far" />

      <div ref={ref}>

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
