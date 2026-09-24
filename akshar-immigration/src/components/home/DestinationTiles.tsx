"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { destinationVisuals } from "@/lib/destinations";

const tiles = [
  { href: "/uk", slug: "uk" },
  { href: "/canada", slug: "canada" },
  { href: "/australia", slug: "australia" },
  { href: "/usa", slug: "usa" },
  { href: "/schengen", slug: "schengen" },
] as const;

export function DestinationTiles() {
  return (
    <section id="destinations" className="relative mx-auto max-w-6xl px-4 py-24 md:px-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-gold">Destinations</p>
          <h2 className="mt-3 font-display text-3xl text-ink md:text-5xl">
            Where do you want to go?
          </h2>
          <p className="mt-3 max-w-xl text-ink-soft">
            Pick a country — pathways for study, work, visits, and PR live inside each page.
          </p>
        </div>
        <Link
          href="/tools/eligibility-checker"
          className="text-sm font-medium text-gold underline-offset-4 hover:underline"
        >
          Not sure yet? Check eligibility →
        </Link>
      </div>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {tiles.map((tile, i) => {
          const visual = destinationVisuals[tile.slug];
          const wide = tile.slug === "schengen";
          return (
            <motion.div
              key={tile.href}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.07, duration: 0.55 }}
              className={wide ? "sm:col-span-2 lg:col-span-2" : undefined}
            >
              <Link
                href={tile.href}
                className="group relative block min-h-[280px] overflow-hidden rounded-sm shadow-[0_20px_50px_-28px_rgba(11,31,58,0.45)]"
              >
                <div
                  className="absolute inset-0 scale-105 bg-cover bg-center transition duration-700 ease-out group-hover:scale-110"
                  style={{ backgroundImage: `url('${visual.image}')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-transparent opacity-90 transition group-hover:opacity-95" />
                <div className="absolute left-4 top-4 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-parchment backdrop-blur-md">
                  Explore
                </div>
                <div className="relative flex h-full min-h-[280px] flex-col justify-end p-7 text-parchment">
                  <span className="font-display text-3xl md:text-4xl">{visual.name}</span>
                  <p className="mt-2 max-w-sm text-sm text-parchment/75">{visual.blurb}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-gold transition group-hover:gap-3">
                    View pathways
                    <span
                      className="inline-block transition group-hover:translate-x-1"
                      aria-hidden
                    >
                      →
                    </span>
                  </span>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>

      <p className="mt-10 text-center text-sm text-mist">
        Also available on request:{" "}
        <span className="text-ink-soft">New Zealand · Dubai (UAE)</span>
      </p>
    </section>
  );
}
