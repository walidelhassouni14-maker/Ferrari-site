"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import Image from "next/image";

const models = [
  {
    name: "Ferrari Roma",
    category: "Gran Turismo",
    power: "620 CV",
    topSpeed: "320 km/h",
    acceleration: "3.4s",
    description:
      "A contemporary interpretation of the carefree, pleasurable lifestyle that characterised Rome in the 1950s and '60s.",
    image:
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=900&q=85",
    accent: "#DC0000",
  },
  {
    name: "SF90 Stradale",
    category: "Plug-In Hybrid",
    power: "1000 CV",
    topSpeed: "340 km/h",
    acceleration: "2.5s",
    description:
      "Ferrari's most powerful road car ever built, combining a turbocharged V8 with three electric motors.",
    image:
      "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&w=900&q=85",
    accent: "#DC0000",
    featured: true,
  },
  {
    name: "Purosangue",
    category: "Ferrari Utility Vehicle",
    power: "725 CV",
    topSpeed: "310 km/h",
    acceleration: "3.3s",
    description:
      "The first Ferrari with four full-sized seats and four doors, without compromising the driving thrill.",
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=900&q=85",
    accent: "#DC0000",
  },
];

function ModelCard({
  model,
  index,
}: {
  model: (typeof models)[0];
  index: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15, ease: "easeOut" }}
      className={`group relative overflow-hidden bg-ferrari-card border border-white/5 hover:border-ferrari-red/40 transition-all duration-500 ${
        model.featured ? "md:scale-105 md:z-10 border-ferrari-red/20" : ""
      }`}
    >
      {model.featured && (
        <div className="absolute top-4 right-4 z-20 px-3 py-1 bg-ferrari-red text-white text-[10px] tracking-[0.25em] uppercase font-semibold">
          Flagship
        </div>
      )}

      {/* Image */}
      <div className="relative h-56 overflow-hidden">
        <Image
          src={model.image}
          alt={model.name}
          fill
          className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ferrari-card via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="p-7">
        <div className="text-ferrari-red text-[10px] tracking-[0.35em] uppercase font-semibold mb-2">
          {model.category}
        </div>
        <h3 className="font-serif text-2xl text-white mb-3">{model.name}</h3>
        <p className="text-white/50 text-sm leading-relaxed font-sans mb-6">
          {model.description}
        </p>

        {/* Specs */}
        <div className="grid grid-cols-3 gap-3 mb-7 pt-5 border-t border-white/8">
          {[
            { label: "Power", value: model.power },
            { label: "Top Speed", value: model.topSpeed },
            { label: "0–100", value: model.acceleration },
          ].map((spec) => (
            <div key={spec.label}>
              <div className="text-white text-sm font-semibold font-sans">
                {spec.value}
              </div>
              <div className="text-white/35 text-[10px] tracking-[0.15em] uppercase mt-0.5">
                {spec.label}
              </div>
            </div>
          ))}
        </div>

        <a
          href="#configure"
          className="group/btn inline-flex items-center gap-2 text-white/70 hover:text-white text-xs tracking-[0.2em] uppercase font-sans transition-colors duration-200"
        >
          <span className="w-8 h-px bg-ferrari-red group-hover/btn:w-12 transition-all duration-300" />
          Discover More
        </a>
      </div>
    </motion.div>
  );
}

export function ModelsSection() {
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true });

  return (
    <section id="models" className="bg-ferrari-black py-28 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div ref={titleRef} className="mb-16">
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={titleInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-ferrari-red text-xs tracking-[0.4em] uppercase font-sans font-semibold block mb-4"
          >
            Our Lineup
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-serif text-5xl md:text-6xl text-white"
          >
            Extraordinary
            <br />
            <span className="text-white/30">Machines</span>
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            animate={titleInView ? { width: "60px" } : {}}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="h-px bg-ferrari-red mt-6"
          />
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4 items-start">
          {models.map((model, i) => (
            <ModelCard key={model.name} model={model} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-14 text-center"
        >
          <a
            href="#configure"
            className="inline-flex items-center gap-3 px-10 py-4 border border-white/20 text-white text-xs tracking-[0.25em] uppercase font-sans hover:border-ferrari-red/60 hover:bg-ferrari-red/5 transition-all duration-300"
          >
            View All Models
          </a>
        </motion.div>
      </div>
    </section>
  );
}
