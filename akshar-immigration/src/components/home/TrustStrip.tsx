"use client";

import { motion } from "framer-motion";

const items = [
  "Licensed consultancy",
  "UK & Canada offices",
  "Transparent fees",
  "End-to-end file support",
];

export function TrustStrip() {
  return (
    <section className="relative overflow-hidden bg-ink py-5 text-parchment">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(196,163,90,0.12),transparent)]" />
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-10 gap-y-3 px-4 text-sm tracking-wide md:px-6">
        {items.map((item, i) => (
          <motion.span
            key={item}
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="flex items-center gap-2.5"
          >
            <span className="size-1.5 rounded-full bg-gold shadow-[0_0_12px_rgba(196,163,90,0.8)]" />
            {item}
          </motion.span>
        ))}
      </div>
    </section>
  );
}
