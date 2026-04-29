"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "motion/react";
import Image from "next/image";

function useCounter(target: number, duration: number, active: boolean) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [active, target, duration]);

  return count;
}

const stats = [
  { label: "Horsepower", value: 1000, suffix: " CV", prefix: "", duration: 2 },
  { label: "Top Speed", value: 340, suffix: " km/h", prefix: "", duration: 1.8 },
  { label: "0–100 km/h", value: 25, suffix: "s", prefix: "2.", duration: 1.5 },
  { label: "V8 Displacement", value: 3990, suffix: "cc", prefix: "", duration: 2.2 },
];

function StatItem({
  stat,
  index,
  active,
}: {
  stat: (typeof stats)[0];
  index: number;
  active: boolean;
}) {
  const count = useCounter(stat.value, stat.duration, active);
  const display =
    stat.label === "0–100 km/h" ? `2.${count % 10}s` : `${count}${stat.suffix}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={active ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15 }}
      className="flex flex-col items-center md:items-start text-center md:text-left"
    >
      <div className="font-serif text-5xl md:text-6xl lg:text-7xl text-white font-light mb-2 tabular-nums">
        {active ? (
          <span>
            {stat.prefix}
            {stat.label === "0–100 km/h"
              ? `2.${Math.floor(count * 0.9) % 10}s`
              : `${count}${stat.suffix}`}
          </span>
        ) : (
          <span className="opacity-0">0</span>
        )}
      </div>
      <div className="text-ferrari-red text-[10px] tracking-[0.35em] uppercase font-sans font-semibold">
        {stat.label}
      </div>
    </motion.div>
  );
}

export function PerformanceSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-150px" });

  return (
    <section id="performance" ref={ref} className="relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1920&q=80"
          alt="Ferrari engine"
          fill
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-ferrari-black/88" />
        <div className="absolute inset-0 bg-gradient-to-b from-ferrari-black via-transparent to-ferrari-black" />
      </div>

      {/* Red vertical accent */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-ferrari-red via-ferrari-red/50 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-20 py-32">
        {/* Header */}
        <div className="mb-20">
          <motion.span
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            className="text-ferrari-red text-xs tracking-[0.4em] uppercase font-sans font-semibold block mb-4"
          >
            Engineering Excellence
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="font-serif text-5xl md:text-6xl text-white"
          >
            Numbers That
            <br />
            <span className="text-white/25">Defy Reason</span>
          </motion.h2>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-16 gap-x-8">
          {stats.map((stat, i) => (
            <div key={stat.label}>
              <StatItem stat={stat} index={i} active={inView} />
            </div>
          ))}
        </div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 1.2, delay: 0.5 }}
          style={{ originX: 0 }}
          className="mt-20 h-px bg-gradient-to-r from-ferrari-red via-white/20 to-transparent"
        />

        {/* Feature bullets */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            "Twin-Turbo V8",
            "3 Electric Motors",
            "eManettino",
            "Side Slip Angle Control",
          ].map((feature) => (
            <div key={feature} className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-ferrari-red flex-shrink-0" />
              <span className="text-white/50 text-xs tracking-[0.1em] uppercase font-sans">
                {feature}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
