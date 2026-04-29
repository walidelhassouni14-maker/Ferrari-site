"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";

const links = [
  { label: "Models", href: "#models" },
  { label: "Performance", href: "#performance" },
  { label: "Heritage", href: "#heritage" },
  { label: "Gallery", href: "#gallery" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-ferrari-black/95 backdrop-blur-md border-b border-white/5"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              className="transition-transform duration-300 group-hover:scale-110"
            >
              <rect width="28" height="28" fill="#DC0000" />
              <path
                d="M14 4 L18 10 L14 8 L10 10 Z"
                fill="#C9A84C"
              />
              <path
                d="M10 10 L14 8 L18 10 L16 22 L14 20 L12 22 Z"
                fill="#C9A84C"
              />
              <rect x="11" y="13" width="6" height="1.5" fill="#DC0000" />
              <rect x="11" y="16" width="6" height="1.5" fill="#DC0000" />
            </svg>
            <span className="text-white font-serif text-xl tracking-[0.25em] font-bold">
              FERRARI
            </span>
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-10">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-white/70 hover:text-white text-xs tracking-[0.2em] uppercase font-sans transition-colors duration-200 relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-ferrari-red group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </div>

          {/* CTA + Mobile */}
          <div className="flex items-center gap-4">
            <a
              href="#configure"
              className="hidden md:inline-flex items-center gap-2 px-6 py-2.5 bg-ferrari-red text-white text-xs tracking-[0.2em] uppercase font-sans font-semibold hover:bg-red-700 transition-colors duration-200"
            >
              Configure
            </a>
            <button
              onClick={() => setMenuOpen(true)}
              className="md:hidden text-white p-2"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="fixed inset-0 z-[60] bg-ferrari-black flex flex-col p-8"
          >
            <div className="flex justify-between items-center mb-16">
              <span className="text-white font-serif text-xl tracking-[0.25em]">
                FERRARI
              </span>
              <button
                onClick={() => setMenuOpen(false)}
                className="text-white"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <nav className="flex flex-col gap-8">
              {links.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                  onClick={() => setMenuOpen(false)}
                  className="text-3xl font-serif text-white/80 hover:text-ferrari-red transition-colors"
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>

            <a
              href="#configure"
              onClick={() => setMenuOpen(false)}
              className="mt-auto inline-flex items-center justify-center px-8 py-4 bg-ferrari-red text-white text-sm tracking-[0.2em] uppercase font-semibold"
            >
              Configure Your Ferrari
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
