"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { PageHero, Reveal, SlideLink } from "@/components/shared/PageHero";
import { destinationVisuals } from "@/lib/destinations";
import type { Testimonial } from "@/types";
import { cn } from "@/lib/utils";

const filters = [
  { id: "all", label: "All" },
  { id: "uk", label: "UK" },
  { id: "canada", label: "Canada" },
  { id: "australia", label: "Australia" },
] as const;

function guessDestination(outcome?: string) {
  const o = (outcome || "").toLowerCase();
  if (o.includes("uk") || o.includes("skilled worker")) return "uk";
  if (o.includes("canada") || o.includes("express")) return "canada";
  if (o.includes("australia")) return "australia";
  if (o.includes("usa") || o.includes("united states")) return "usa";
  return "uk";
}

export function SuccessStoriesClient({ items }: { items: Testimonial[] }) {
  const [filter, setFilter] = useState<(typeof filters)[number]["id"]>("all");

  const filtered = useMemo(() => {
    if (filter === "all") return items;
    return items.filter((t) => guessDestination(t.outcome) === filter);
  }, [items, filter]);

  return (
    <main>
      <PageHero
        eyebrow="Outcomes"
        title="Success stories"
        description="Real clients, real pathways — study, work, and permanent residence journeys guided by Akshar."
        image="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=2000&q=80"
        primaryHref="/free-consultation"
        primaryLabel="Start your journey"
        compact
      />

      <section className="mx-auto max-w-6xl px-4 py-14 md:px-6 md:py-20">
        <Reveal>
          <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-gold">Filter</p>
              <h2 className="mt-2 font-display text-2xl md:text-3xl">By destination</h2>
            </div>
            <div className="flex flex-wrap gap-2 rounded-full border border-ink/10 bg-white/70 p-1.5 shadow-sm">
              {filters.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setFilter(f.id)}
                  className={cn(
                    "rounded-full px-4 py-2 text-sm font-medium transition",
                    filter === f.id
                      ? "bg-ink text-parchment"
                      : "text-ink-soft hover:text-ink",
                  )}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        <div className="grid gap-5 md:grid-cols-2">
          {filtered.map((t, i) => {
            const dest = guessDestination(t.outcome);
            const visual = destinationVisuals[dest] || destinationVisuals.uk;
            return (
              <Reveal key={t._id} delay={i * 0.06}>
                <motion.blockquote
                  whileHover={{ y: -6 }}
                  className="group h-full overflow-hidden rounded-2xl border border-ink/10 bg-white shadow-sm"
                >
                  <div className="relative h-36 overflow-hidden">
                    <div
                      className="absolute inset-0 scale-105 bg-cover bg-center transition duration-700 group-hover:scale-110"
                      style={{ backgroundImage: `url('${visual.image}')` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
                    <p className="absolute bottom-3 left-4 text-xs uppercase tracking-[0.18em] text-gold">
                      {visual.name}
                    </p>
                  </div>
                  <div className="p-6 md:p-7">
                    <p className="font-display text-5xl leading-none text-gold/30">“</p>
                    <p className="-mt-3 text-base leading-relaxed text-ink-soft">{t.quote}</p>
                    <cite className="mt-6 block not-italic">
                      <span className="font-medium text-ink">{t.clientName}</span>
                      {t.outcome ? (
                        <span className="mt-1 block text-sm text-gold">{t.outcome}</span>
                      ) : null}
                    </cite>
                  </div>
                </motion.blockquote>
              </Reveal>
            );
          })}
        </div>

        {filtered.length === 0 ? (
          <p className="mt-10 text-center text-ink-soft">No stories for this filter yet.</p>
        ) : null}

        <Reveal className="mt-14 overflow-hidden rounded-2xl bg-ink px-8 py-10 text-parchment md:flex md:items-center md:justify-between md:px-12">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-gold">Your turn</p>
            <h3 className="mt-2 font-display text-2xl md:text-3xl">
              Ready to write the next story?
            </h3>
          </div>
          <div className="mt-6 flex flex-wrap gap-3 md:mt-0">
            <SlideLink href="/free-consultation" variant="gold">
              Free consultation
            </SlideLink>
            <Link
              href="/tools/eligibility-checker"
              className="inline-flex items-center rounded-full border border-parchment/30 px-5 py-3 text-sm hover:border-gold hover:text-gold"
            >
              Check eligibility
            </Link>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
