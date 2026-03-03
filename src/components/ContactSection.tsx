"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import SectionWrapper, { SectionLabel, SectionTitle } from "./SectionWrapper";
import { submitContact } from "@/lib/appwrite";
import { DottedGlowBackground } from "@/components/ui/dotted-glow-background";
import {
  Send,
  Mail,
  MapPin,
  Github,
  Linkedin,
  CheckCircle,
  AlertCircle,
  Loader2,
} from "lucide-react";

const CONTACT_INFO = [
  {
    icon: <Mail size={16} />,
    label: "Email",
    value: "kidkrrish3@gmail.com",
    href: "mailto:kidkrrish3@gmail.com",
  },
  {
    icon: <MapPin size={16} />,
    label: "Location",
    value: "Chennai, Tamil Nadu, India",
    href: null,
  },
];

const SOCIAL_LINKS = [
  { icon: <Github size={18} />, href: "https://github.com/kishorekrrish3", label: "GitHub" },
  { icon: <Linkedin size={18} />, href: "https://www.linkedin.com/in/kishore-p-vitc/", label: "LinkedIn" },
];

type FormStatus = "idle" | "submitting" | "success" | "error";

export default function ContactSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setErrorMsg("All fields are required.");
      setStatus("error");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setErrorMsg("Please enter a valid email address.");
      setStatus("error");
      return;
    }

    setStatus("submitting");
    setErrorMsg("");

    try {
      await submitContact(form.name, form.email, form.message);
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      setErrorMsg(
        msg.includes("collection") || msg.includes("not found")
          ? "Contact service not configured yet. Please reach out via email."
          : "Something went wrong. Please try again."
      );
      setStatus("error");
    }
  };

  const inputClass =
    "w-full bg-[#0d0d0d] border border-white/8 rounded-xl px-4 py-3.5 text-white text-sm placeholder-[#444] focus:outline-none focus:border-[#00ff9d]/40 focus:ring-1 focus:ring-[#00ff9d]/20 transition-all duration-200 resize-none";

  return (
    <SectionWrapper id="contact">
      <div className="relative isolate px-4 md:px-0">
        <DottedGlowBackground
          className="absolute inset-0 -z-10 pointer-events-none mask-[radial-gradient(circle_at_center,white,transparent_80%)]"
          opacity={0.8}
          gap={16}
          radius={1.5}
          color="rgba(0,255,157,0.3)"
          glowColor="rgba(0,255,157,0.8)"
          backgroundOpacity={0}
          speedMin={0.3}
          speedMax={1.6}
          speedScale={1}
        />

        <SectionLabel label="Let's Talk" />
        <SectionTitle title="Get In Touch" />

        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-5 gap-12 relative z-10 mt-8">
          {/* Left: Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-2 space-y-8"
          >
            <div>
              <p className="text-[#888] text-base leading-relaxed">
                I'm currently open to internship opportunities, research collaborations, and
                full-time roles starting 2026. Whether you have a project idea, a job offer, or
                just want to chat about tech — my inbox is always open.
              </p>
            </div>

            {/* Contact details */}
            <div className="space-y-4">
              {CONTACT_INFO.map((info) => (
                <div key={info.label} className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#111] border border-white/5 flex items-center justify-center text-[#00ff9d]">
                    {info.icon}
                  </div>
                  <div>
                    <p className="text-xs text-[#444] font-mono uppercase tracking-wider">
                      {info.label}
                    </p>
                    {info.href ? (
                      <a
                        href={info.href}
                        className="text-sm text-white hover:text-[#00ff9d] transition-colors"
                      >
                        {info.value}
                      </a>
                    ) : (
                      <p className="text-sm text-white">{info.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Social links */}
            <div>
              <p className="font-mono text-xs text-[#444] uppercase tracking-widest mb-3">
                Find me online
              </p>
              <div className="flex gap-3">
                {SOCIAL_LINKS.map(({ icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-10 h-10 rounded-xl bg-[#111] border border-white/5 flex items-center justify-center text-[#555] hover:text-[#00ff9d] hover:border-[#00ff9d]/20 transition-all duration-200 hover:scale-110"
                  >
                    {icon}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-3"
          >
            <div className="bg-[#111] border border-white/5 rounded-2xl p-6 md:p-8">
              {status === "success" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center h-64 text-center gap-4"
                >
                  <div className="w-16 h-16 rounded-full bg-[#00ff9d]/10 flex items-center justify-center">
                    <CheckCircle size={32} className="text-[#00ff9d]" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-lg mb-2">Message Sent!</h3>
                    <p className="text-[#666] text-sm">
                      Thanks for reaching out. I'll get back to you within 24 hours.
                    </p>
                  </div>
                  <button
                    onClick={() => setStatus("idle")}
                    className="mt-2 font-mono text-xs text-[#444] hover:text-[#00ff9d] transition-colors"
                  >
                    Send another message →
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-mono text-xs text-[#555] uppercase tracking-widest mb-2">
                        Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Kishore P"
                        className={inputClass}
                        disabled={status === "submitting"}
                        autoComplete="name"
                      />
                    </div>
                    <div>
                      <label className="block font-mono text-xs text-[#555] uppercase tracking-widest mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="you@email.com"
                        className={inputClass}
                        disabled={status === "submitting"}
                        autoComplete="email"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-mono text-xs text-[#555] uppercase tracking-widest mb-2">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Hi Kishore, I'd like to discuss..."
                      rows={6}
                      className={inputClass}
                      disabled={status === "submitting"}
                    />
                  </div>

                  {status === "error" && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-2 text-red-400 bg-red-400/8 border border-red-400/15 rounded-xl px-4 py-3"
                    >
                      <AlertCircle size={14} />
                      <span className="text-sm">{errorMsg}</span>
                    </motion.div>
                  )}

                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-[#00ff9d] text-[#0a0a0a] font-bold text-sm rounded-xl hover:bg-[#00e88a] transition-all duration-200 hover:scale-[1.02] active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg shadow-[#00ff9d]/15"
                  >
                    {status === "submitting" ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        Send Message
                      </>
                    )}
                  </button>

                  <p className="text-center font-mono text-xs text-[#333]">
                    Messages stored securely via Appwrite
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  );
}
