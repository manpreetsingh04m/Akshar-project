"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowDown, MapPin } from "lucide-react";

const quickDestinations = [
  { href: "/uk", label: "UK" },
  { href: "/canada", label: "Canada" },
  { href: "/australia", label: "Australia" },
  { href: "/usa", label: "USA" },
  { href: "/schengen", label: "Schengen" },
];

export function HomeHero() {
  return (
    <section className="relative min-h-[100svh] overflow-hidden">
      {/* Cinematic background with slow zoom */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=2400&q=80')",
        }}
        initial={{ scale: 1.12 }}
        animate={{ scale: 1 }}
        transition={{ duration: 14, ease: "easeOut" }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-[#061018]/95 via-[#0B1F3A]/72 to-[#0B1F3A]/35" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_30%,rgba(196,163,90,0.22),transparent_50%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.07] mix-blend-overlay [background-image:url('data:image/svg+xml,%3Csvg viewBox=%270 0 200 200%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27n%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.8%27 numOctaves=%274%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23n)%27/%3E%3C/svg%3E')]" />

      <div className="relative mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-end px-4 pb-10 pt-28 md:px-6 md:pb-14">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-gold/35 bg-ink/40 px-3 py-1.5 text-[11px] uppercase tracking-[0.2em] text-gold backdrop-blur-sm">
            <MapPin className="size-3.5" />
            UK · Canada · Global pathways
          </div>

          <p className="font-display text-[clamp(3.25rem,10vw,7.5rem)] leading-[0.9] tracking-tight text-parchment">
            Akshar
          </p>

          <div className="mt-5 h-px w-24 bg-gradient-to-r from-gold to-transparent" />

          <h1 className="mt-6 max-w-2xl font-display text-[clamp(1.5rem,3.5vw,2.75rem)] font-normal leading-snug text-parchment/95">
            Immigration is complex.
            <span className="block text-gold">We make it simple.</span>
          </h1>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-parchment/70 md:text-lg">
            Destination-first guidance for study, work, family, and permanent residence —
            with licensed consultants in the UK and Canada.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link
              href="/free-consultation"
              className="group relative overflow-hidden rounded-sm bg-gold px-7 py-3.5 text-sm font-semibold text-ink shadow-[0_12px_40px_-12px_rgba(196,163,90,0.7)] transition hover:bg-gold-hot"
            >
              <span className="relative z-10">Free consultation</span>
            </Link>
            <Link
              href="/tools/eligibility-checker"
              className="rounded-sm border border-parchment/35 bg-white/5 px-7 py-3.5 text-sm text-parchment backdrop-blur-sm transition hover:border-gold hover:bg-white/10 hover:text-gold"
            >
              Check eligibility
            </Link>
          </div>
        </motion.div>

        {/* Interactive destination chips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.7 }}
          className="mt-12 flex flex-wrap gap-2 border-t border-parchment/15 pt-8"
        >
          <span className="mr-2 self-center text-[11px] uppercase tracking-[0.22em] text-parchment/45">
            Explore
          </span>
          {quickDestinations.map((d, i) => (
            <motion.div
              key={d.href}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 + i * 0.06 }}
            >
              <Link
                href={d.href}
                className="inline-flex items-center rounded-full border border-parchment/25 bg-parchment/10 px-4 py-2 text-sm text-parchment backdrop-blur-md transition hover:border-gold hover:bg-gold/15 hover:text-gold"
              >
                {d.label}
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <motion.a
          href="#destinations"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="mt-8 hidden items-center gap-2 text-xs uppercase tracking-[0.2em] text-parchment/50 transition hover:text-gold md:inline-flex"
        >
          Scroll
          <ArrowDown className="size-3.5 animate-bounce [animation-duration:2.4s]" />
        </motion.a>
      </div>
    </section>
  );
}
