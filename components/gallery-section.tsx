"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "motion/react";
import Image from "next/image";
import { X, ZoomIn } from "lucide-react";

const photos = [
  {
    src: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=900&q=85",
    alt: "Ferrari on mountain road",
    span: "col-span-2 row-span-2",
  },
  {
    src: "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=600&q=85",
    alt: "Ferrari detail",
    span: "col-span-1 row-span-1",
  },
  {
    src: "https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?auto=format&fit=crop&w=600&q=85",
    alt: "Ferrari showroom",
    span: "col-span-1 row-span-1",
  },
  {
    src: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=900&q=85",
    alt: "Ferrari side profile",
    span: "col-span-1 row-span-2",
  },
  {
    src: "https://images.unsplash.com/photo-1490274907034-7c1bc04029b5?auto=format&fit=crop&w=900&q=85",
    alt: "Ferrari on track",
    span: "col-span-2 row-span-1",
  },
];

export function GallerySection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [lightbox, setLightbox] = useState<string | null>(null);

  return (
    <section id="gallery" ref={ref} className="bg-ferrari-black py-28 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-14 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <motion.span
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              className="text-ferrari-red text-xs tracking-[0.4em] uppercase font-sans font-semibold block mb-4"
            >
              Visual Story
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 }}
              className="font-serif text-5xl md:text-6xl text-white"
            >
              The Gallery
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
            className="text-white/40 text-sm font-sans max-w-xs leading-relaxed"
          >
            Every angle is a composition. Every detail, intentional.
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-3 grid-rows-3 gap-3 h-[600px] md:h-[700px]">
          {photos.map((photo, i) => (
            <motion.div
              key={photo.src}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className={`relative overflow-hidden group cursor-pointer ${photo.span}`}
              onClick={() => setLightbox(photo.src)}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <ZoomIn className="w-8 h-8 text-white drop-shadow-lg" />
              </div>
              {/* Red corner accent */}
              <div className="absolute top-0 left-0 w-8 h-1 bg-ferrari-red opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute top-0 left-0 w-1 h-8 bg-ferrari-red opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
          >
            <motion.div
              initial={{ scale: 0.85 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.85 }}
              className="relative max-w-5xl w-full aspect-video"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={lightbox}
                alt="Gallery"
                fill
                className="object-contain"
              />
            </motion.div>
            <button
              onClick={() => setLightbox(null)}
              className="absolute top-6 right-6 text-white/70 hover:text-white"
              aria-label="Close"
            >
              <X className="w-7 h-7" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
