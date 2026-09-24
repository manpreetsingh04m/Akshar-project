"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { FaqItem } from "@/types";

export function HomeFaq({ items }: { items: FaqItem[] }) {
  return (
    <section className="mx-auto max-w-3xl px-4 py-24 md:px-6">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <p className="text-xs uppercase tracking-[0.25em] text-gold">FAQ</p>
        <h2 className="mt-3 font-display text-3xl md:text-4xl">Common questions</h2>
      </motion.div>
      <div className="mt-10 overflow-hidden rounded-2xl border border-ink/10 bg-white/60 shadow-sm">
        {items.map((f, i) => (
          <motion.details
            key={f._id}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="group border-b border-ink/10 px-5 last:border-b-0"
          >
            <summary className="cursor-pointer list-none py-5 font-medium text-ink marker:content-none [&::-webkit-details-marker]:hidden">
              <span className="flex items-center justify-between gap-4">
                {f.question}
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-parchment-deep text-gold transition group-open:rotate-45 group-open:bg-ink group-open:text-gold">
                  +
                </span>
              </span>
            </summary>
            <p className="pb-5 text-sm leading-relaxed text-ink-soft">{f.answer}</p>
          </motion.details>
        ))}
      </div>
      <p className="mt-6 text-center text-sm text-mist">
        More answers on our{" "}
        <Link href="/faq" className="text-gold underline-offset-4 hover:underline">
          FAQ page
        </Link>
        .
      </p>
    </section>
  );
}
