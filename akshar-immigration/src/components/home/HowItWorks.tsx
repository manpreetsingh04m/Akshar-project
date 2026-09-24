"use client";

import { motion } from "framer-motion";

const steps = [
  {
    n: "01",
    title: "Assess",
    text: "Free consultation and profile review against destination rules.",
  },
  {
    n: "02",
    title: "Prepare",
    text: "Document checklist, evidence pack, and application strategy.",
  },
  {
    n: "03",
    title: "Submit & support",
    text: "Filing, updates, and guidance through to decision.",
  },
];

export function HowItWorks() {
  return (
    <section className="bg-parchment-deep/60 px-4 py-20 md:px-6">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs uppercase tracking-[0.25em] text-gold">Process</p>
        <h2 className="mt-3 font-display text-3xl md:text-4xl">How it works</h2>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {steps.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              whileHover={{ x: 4 }}
              className="border-l-2 border-gold/60 bg-white/30 py-4 pl-5 pr-3 transition hover:bg-white/60"
            >
              <p className="font-display text-4xl text-ink/20">{s.n}</p>
              <h3 className="mt-2 font-display text-xl">{s.title}</h3>
              <p className="mt-2 text-sm text-ink-soft">{s.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
