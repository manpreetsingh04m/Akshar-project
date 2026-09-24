"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export function FinalCta() {
  return (
    <section className="px-4 pb-28 md:px-6">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative mx-auto max-w-6xl overflow-hidden rounded-sm"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1800&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/90 to-ink/70" />
        <div className="relative px-8 py-16 text-parchment md:px-16 md:py-20">
          <p className="text-xs uppercase tracking-[0.25em] text-gold">Next step</p>
          <h2 className="mt-3 max-w-xl font-display text-3xl md:text-5xl">
            Ready to take the next step?
          </h2>
          <p className="mt-4 max-w-lg text-parchment/75">
            Book a free consultation or run a quick eligibility check — your details go
            straight to our team.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/free-consultation"
              className="rounded-sm bg-gold px-6 py-3.5 text-sm font-semibold text-ink shadow-lg transition hover:bg-gold-hot"
            >
              Free consultation
            </Link>
            <Link
              href="/contact"
              className="rounded-sm border border-parchment/30 px-6 py-3.5 text-sm transition hover:border-gold hover:text-gold"
            >
              Contact us
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
