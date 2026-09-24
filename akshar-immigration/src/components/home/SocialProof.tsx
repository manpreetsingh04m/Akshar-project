"use client";

import { motion } from "framer-motion";
import type { Testimonial } from "@/types";

export function SocialProof({ items }: { items: Testimonial[] }) {
  return (
    <section className="relative overflow-hidden bg-ink px-4 py-24 text-parchment md:px-6">
      <div className="pointer-events-none absolute -right-20 top-0 size-72 rounded-full bg-gold/10 blur-3xl" />
      <div className="mx-auto max-w-6xl">
        <p className="text-xs uppercase tracking-[0.25em] text-gold">Social proof</p>
        <h2 className="mt-3 font-display text-3xl md:text-5xl">Client outcomes</h2>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {items.map((t, i) => (
            <motion.blockquote
              key={t._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -6 }}
              className="rounded-2xl border border-parchment/15 bg-gradient-to-br from-ink-soft/60 to-ink-soft/20 p-7 shadow-lg"
            >
              <p className="font-display text-4xl leading-none text-gold/40">“</p>
              <p className="-mt-2 text-sm leading-relaxed text-parchment/90">{t.quote}</p>
              <footer className="mt-6 text-sm">
                <cite className="not-italic font-medium text-gold">{t.clientName}</cite>
                {t.outcome ? (
                  <span className="mt-1 block text-xs text-parchment/55">{t.outcome}</span>
                ) : null}
              </footer>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
