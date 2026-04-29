"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import Image from "next/image";

export function CTASection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="configure" ref={ref} className="relative overflow-hidden min-h-[70vh] flex items-center">
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1920&q=80"
          alt="Ferrari configurator"
          fill
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-ferrari-black/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-ferrari-black/90 via-ferrari-black/60 to-ferrari-black/30" />
      </div>

      {/* Diagonal red stripe */}
      <div
        className="absolute top-0 bottom-0 w-2 bg-ferrari-red"
        style={{ left: "50%", transform: "skewX(-6deg)" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-8 md:px-20 py-24 w-full">
        <div className="max-w-2xl">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="text-ferrari-red text-xs tracking-[0.4em] uppercase font-sans font-semibold block mb-6"
          >
            Make it Yours
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.15 }}
            className="font-serif text-5xl md:text-7xl text-white leading-tight mb-6"
          >
            Configure
            <br />
            Your Dream
            <br />
            <em className="text-white/30">Ferrari</em>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
            className="text-white/55 text-base font-sans leading-relaxed mb-10 max-w-md"
          >
            With over 30 exterior colours, bespoke interior options, and
            personalisation programmes, your Ferrari is a unique expression
            of who you are.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.45 }}
            className="flex flex-wrap gap-4"
          >
            <a
              href="#"
              className="group inline-flex items-center gap-3 px-10 py-4 bg-ferrari-red text-white text-xs tracking-[0.25em] uppercase font-sans font-semibold hover:bg-red-700 transition-colors duration-300"
            >
              Open Configurator
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </a>
            <a
              href="#"
              className="inline-flex items-center gap-3 px-10 py-4 border border-white/25 text-white text-xs tracking-[0.25em] uppercase font-sans hover:border-white/50 hover:bg-white/5 transition-all duration-300"
            >
              Find a Dealer
            </a>
          </motion.div>

          {/* Feature chips */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6 }}
            className="mt-14 flex flex-wrap gap-3"
          >
            {[
              "Tailor Made",
              "30+ Colors",
              "Bespoke Interior",
              "Personalisation",
            ].map((tag) => (
              <span
                key={tag}
                className="px-4 py-1.5 border border-white/10 text-white/40 text-[10px] tracking-[0.2em] uppercase font-sans"
              >
                {tag}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
