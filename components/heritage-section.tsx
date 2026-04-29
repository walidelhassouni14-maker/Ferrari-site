"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "motion/react";
import Image from "next/image";

const milestones = [
  { year: "1947", event: "Founded by Enzo Ferrari in Maranello" },
  { year: "1950", event: "First Formula 1 World Championship entry" },
  { year: "1984", event: "Enzo Ferrari — the car that bore his name" },
  { year: "2002", event: "Enzo wins every single F1 race that season" },
  { year: "2013", event: "LaFerrari — first hybrid Ferrari supercar" },
  { year: "2023", event: "Purosangue redefines the Ferrari experience" },
];

export function HeritageSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef(null);
  const textInView = useInView(textRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const imageX = useTransform(scrollYProgress, [0, 1], ["5%", "-5%"]);

  return (
    <section
      id="heritage"
      ref={sectionRef}
      className="bg-ferrari-dark overflow-hidden"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 min-h-[90vh]">
        {/* Left — Text */}
        <div
          ref={textRef}
          className="flex flex-col justify-center px-8 md:px-16 py-24 order-2 lg:order-1"
        >
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={textInView ? { opacity: 1, x: 0 } : {}}
            className="text-ferrari-red text-xs tracking-[0.4em] uppercase font-sans font-semibold block mb-5"
          >
            Our Story
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={textInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="font-serif text-5xl md:text-6xl text-white leading-tight mb-6"
          >
            Born from
            <br />
            <em className="text-white/30">Passion</em>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={textInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.25 }}
            className="text-white/55 text-base leading-relaxed font-sans mb-12 max-w-md"
          >
            Enzo Ferrari's dream was never just to build cars. It was to create
            rolling sculptures that would awaken the soul — machines that would
            push humanity's limits and redefine what was thought possible on
            four wheels.
          </motion.p>

          {/* Timeline */}
          <div className="space-y-5">
            {milestones.map((m, i) => (
              <motion.div
                key={m.year}
                initial={{ opacity: 0, x: -30 }}
                animate={textInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.08 }}
                className="flex items-start gap-5 group"
              >
                <div className="flex items-center gap-3 flex-shrink-0">
                  <div className="w-1.5 h-1.5 rounded-full bg-ferrari-red mt-1.5 group-hover:scale-150 transition-transform" />
                  <span className="text-ferrari-red text-xs font-semibold font-sans tracking-widest w-10">
                    {m.year}
                  </span>
                </div>
                <span className="text-white/45 text-sm font-sans leading-relaxed group-hover:text-white/70 transition-colors">
                  {m.event}
                </span>
              </motion.div>
            ))}
          </div>

          <motion.a
            initial={{ opacity: 0 }}
            animate={textInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.9 }}
            href="#"
            className="mt-12 inline-flex items-center gap-3 text-white/50 hover:text-white text-xs tracking-[0.25em] uppercase font-sans transition-colors group"
          >
            <span className="w-10 h-px bg-ferrari-red group-hover:w-14 transition-all duration-300" />
            Full History
          </motion.a>
        </div>

        {/* Right — Image */}
        <div className="relative h-64 lg:h-auto overflow-hidden order-1 lg:order-2">
          <motion.div style={{ x: imageX }} className="absolute inset-0 scale-110">
            <Image
              src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1200&q=85"
              alt="Ferrari heritage"
              fill
              className="object-cover object-center"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-r from-ferrari-dark via-transparent to-transparent lg:via-transparent lg:to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent to-transparent lg:bg-gradient-to-l lg:from-ferrari-dark/0 lg:to-ferrari-dark/80" />

          {/* Quote overlay */}
          <div className="absolute bottom-10 left-8 right-8">
            <blockquote className="border-l-2 border-ferrari-red pl-4">
              <p className="text-white/80 font-serif text-lg italic leading-relaxed">
                "Racing is in Ferrari's DNA. It is not something we do —
                it is who we are."
              </p>
              <cite className="text-white/40 text-xs tracking-[0.2em] uppercase font-sans not-italic mt-2 block">
                — Enzo Ferrari
              </cite>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}
