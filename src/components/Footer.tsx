"use client";

import { Github, Linkedin, Mail, Heart } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/5 py-10 px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-1.5 font-mono text-sm">
          <span className="text-[#333]">© {year}</span>
          <span className="text-[#555]">·</span>
          <span className="text-white font-semibold">Kishore P</span>
          <span className="text-[#555]">·</span>
          <span className="text-[#444] text-xs flex items-center gap-1">
            Built with <Heart size={10} className="text-[#00ff9d]" /> Next.js & Appwrite
          </span>
        </div>

        <div className="flex items-center gap-4">
          {[
            { icon: <Github size={15} />, href: "https://github.com/kishorekrrish3", label: "GitHub" },
            { icon: <Linkedin size={15} />, href: "https://www.linkedin.com/in/kishore-p-vitc/", label: "LinkedIn" },
            { icon: <Mail size={15} />, href: "mailto:kidkrrish3@gmail.com", label: "Email" },
          ].map(({ icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="text-[#444] hover:text-[#00ff9d] transition-colors duration-200"
            >
              {icon}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
