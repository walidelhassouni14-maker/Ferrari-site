"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";

export function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section ref={ref} className="relative h-screen w-full overflow-hidden">
      {/* Parallax Background */}
      <motion.div
        style={{ y: imageY }}
        className="absolute inset-0 scale-110"
      >
        <Image
          src="https://images.unsplash.com/photo-1592198084033-aade902d1aae?auto=format&fit=crop&w=1920&q=90"
          alt="Ferrari"
          fill
          priority
          className="object-cover object-center"
        />
      </motion.div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-ferrari-black via-transparent to-transparent" />

      {/* Red accent strip */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-ferrari-red" />

      {/* Content */}
      <motion.div
        style={{ y: textY, opacity }}
        className="relative z-10 h-full flex flex-col justify-center px-8 md:px-20 max-w-7xl mx-auto"
      >
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "80px" }}
          transition={{ duration: 1, delay: 0.3 }}
          className="h-px bg-ferrari-red mb-8"
        />

        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-ferrari-red text-xs tracking-[0.4em] uppercase font-sans font-semibold mb-4 block"
        >
          Since 1947 · Maranello, Italy
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5 }}
          className="font-serif text-6xl md:text-8xl lg:text-[110px] text-white leading-[0.9] tracking-tight mb-6"
        >
          The Art
          <br />
          <span className="text-ferrari-red italic">of Speed</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-white/60 text-base md:text-lg font-sans max-w-md leading-relaxed mb-10"
        >
          Every Ferrari is a masterpiece born from decades of racing heritage
          and relentless pursuit of perfection.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9 }}
          className="flex flex-wrap gap-4"
        >
          <a
            href="#models"
            className="group inline-flex items-center gap-3 px-8 py-4 bg-ferrari-red text-white text-xs tracking-[0.2em] uppercase font-sans font-semibold hover:bg-red-700 transition-all duration-300"
          >
            Explore Models
            <span className="group-hover:translate-x-1 transition-transform duration-200">
              →
            </span>
          </a>
          <a
            href="#heritage"
            className="inline-flex items-center gap-3 px-8 py-4 border border-white/30 text-white text-xs tracking-[0.2em] uppercase font-sans font-semibold hover:border-white/60 hover:bg-white/5 transition-all duration-300"
          >
            Our Heritage
          </a>
        </motion.div>
      </motion.div>

      {/* Bottom stats bar */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="absolute bottom-0 left-0 right-0 z-10 border-t border-white/10 bg-black/40 backdrop-blur-sm"
      >
        <div className="max-w-7xl mx-auto px-8 md:px-20 py-5 flex items-center gap-8 md:gap-16 overflow-x-auto scrollbar-hide">
          {[
            { label: "Founded", value: "1947" },
            { label: "F1 Titles", value: "16" },
            { label: "Models", value: "20+" },
            { label: "Countries", value: "60+" },
          ].map((stat) => (
            <div key={stat.label} className="flex-shrink-0 text-center">
              <div className="text-white font-serif text-2xl font-bold">
                {stat.value}
              </div>
              <div className="text-white/40 text-xs tracking-[0.15em] uppercase font-sans mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-24 right-8 md:right-20 z-10 flex flex-col items-center gap-2"
      >
        <span className="text-white/30 text-[10px] tracking-[0.3em] uppercase font-sans rotate-90 origin-center mb-4">
          Scroll
        </span>
        <div className="w-px h-16 bg-gradient-to-b from-white/40 to-transparent animate-scroll" />
      </motion.div>
    </section>
  );
}
