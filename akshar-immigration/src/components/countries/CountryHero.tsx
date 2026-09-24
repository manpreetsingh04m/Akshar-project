"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Compass } from "lucide-react";
import { destinationVisuals } from "@/lib/destinations";

type Props = {
  slug: string;
  name: string;
  tagline: string;
};

export function CountryHero({ slug, name, tagline }: Props) {
  const visual = destinationVisuals[slug] ?? destinationVisuals.uk;

  return (
    <section className="relative min-h-[68vh] overflow-hidden text-parchment md:min-h-[72vh]">
      <Image
        src={visual.image}
        alt={name}
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#061018]/92 via-[#0B1F3A]/70 to-[#0B1F3A]/35" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/30" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_20%,rgba(196,163,90,0.28),transparent_40%)]" />

      <div className="relative mx-auto flex min-h-[68vh] max-w-6xl flex-col justify-end px-4 pb-14 pt-32 md:min-h-[72vh] md:px-6 md:pb-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-gold/35 bg-white/10 px-3 py-1.5 text-[11px] uppercase tracking-[0.2em] text-gold backdrop-blur-md">
            <Compass className="size-3.5" />
            Destination
          </div>
          <h1 className="font-display text-[clamp(2.75rem,8vw,5.5rem)] leading-[0.95] tracking-tight">
            {name}
          </h1>
          <p className="mt-5 max-w-xl text-lg text-parchment/80 md:text-xl">{tagline}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={`/tools/eligibility-checker?destination=${slug}`}
              className="group inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-semibold text-ink shadow-lg transition hover:bg-gold-hot"
            >
              Check eligibility
              <ArrowRight className="size-4 transition group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/tools/book-consultation"
              className="inline-flex items-center rounded-full border border-parchment/35 bg-white/5 px-6 py-3 text-sm text-parchment backdrop-blur-sm transition hover:border-gold hover:text-gold"
            >
              Book consultation
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
