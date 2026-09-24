"use client";

import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import type { Country } from "@/types";
import { PortableText } from "@/components/shared/PortableText";
import { cn } from "@/lib/utils";

export function PathwayTabs({ country }: { country: Country }) {
  const pathways = [...(country.pathways || [])].sort((a, b) => a.order - b.order);
  const [active, setActive] = useState(pathways[0]?.pathwayType ?? "");
  const listRef = useRef<HTMLDivElement>(null);
  const btnRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
  const [pill, setPill] = useState({ left: 0, width: 0 });
  const layoutId = useId();

  const measure = () => {
    const el = btnRefs.current.get(active);
    const parent = listRef.current;
    if (!el || !parent) return;
    const parentBox = parent.getBoundingClientRect();
    const box = el.getBoundingClientRect();
    setPill({ left: box.left - parentBox.left + parent.scrollLeft, width: box.width });
  };

  useLayoutEffect(() => {
    measure();
  }, [active, pathways.length]);

  useEffect(() => {
    const onResize = () => measure();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [active]);

  if (!pathways.length) return null;

  return (
    <div className="space-y-8">
      {/* Sliding segmented control */}
      <div className="overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div
          ref={listRef}
          role="tablist"
          aria-label="Pathways"
          className="relative inline-flex min-w-full gap-1 rounded-full border border-ink/10 bg-parchment-deep/80 p-1.5 shadow-inner sm:min-w-0"
        >
          <motion.span
            aria-hidden
            className="absolute top-1.5 bottom-1.5 rounded-full bg-ink shadow-lg shadow-ink/25"
            initial={false}
            animate={{ left: pill.left, width: pill.width }}
            transition={{ type: "spring", stiffness: 380, damping: 32 }}
          />
          {pathways.map((p) => {
            const selected = active === p.pathwayType;
            const key = p.pathwayType + p.title;
            return (
              <button
                key={key}
                type="button"
                role="tab"
                aria-selected={selected}
                ref={(node) => {
                  if (node) btnRefs.current.set(p.pathwayType, node);
                  else btnRefs.current.delete(p.pathwayType);
                }}
                onClick={() => setActive(p.pathwayType)}
                className={cn(
                  "relative z-10 whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-medium transition-colors",
                  selected ? "text-parchment" : "text-ink-soft hover:text-ink",
                )}
              >
                {p.title}
              </button>
            );
          })}
        </div>
      </div>

      {/* Hybrid: all panels in DOM; visibility toggled */}
      <div className="relative">
        {pathways.map((p) => {
          const visible = active === p.pathwayType;
          return (
            <article
              key={p.pathwayType + p.title}
              role="tabpanel"
              hidden={!visible}
              className={cn(visible ? "block" : "hidden")}
            >
              <AnimatePresence mode="wait">
                {visible ? (
                  <motion.div
                    key={p.pathwayType}
                    layoutId={`${layoutId}-panel`}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.28 }}
                    className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]"
                  >
                    <div>
                      <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-gold">
                        <Sparkles className="size-3.5" />
                        Pathway
                      </div>
                      <h2 className="mt-4 font-display text-3xl text-ink md:text-4xl">
                        {p.title}
                      </h2>
                      <p className="mt-3 max-w-2xl text-base leading-relaxed text-ink-soft">
                        {p.summary}
                      </p>

                      {p.body ? (
                        <div className="mt-6">
                          <PortableText value={p.body} />
                        </div>
                      ) : null}

                      {p.ctaHref ? (
                        <Link
                          href={p.ctaHref}
                          className="group mt-10 inline-flex items-center gap-3 overflow-hidden rounded-full bg-gold px-6 py-3.5 text-sm font-semibold text-ink shadow-[0_14px_40px_-16px_rgba(196,163,90,0.9)] transition hover:bg-gold-hot"
                        >
                          <span>{p.ctaLabel || "Continue"}</span>
                          <span className="flex size-8 items-center justify-center rounded-full bg-ink/10 transition group-hover:translate-x-1 group-hover:bg-ink/15">
                            <ArrowRight className="size-4" />
                          </span>
                        </Link>
                      ) : null}
                    </div>

                    <div className="space-y-4">
                      {p.eligibility?.length ? (
                        <div className="rounded-2xl border border-ink/10 bg-white/70 p-6 shadow-sm backdrop-blur-sm">
                          <h3 className="text-xs uppercase tracking-[0.2em] text-gold">
                            Eligibility highlights
                          </h3>
                          <ul className="mt-4 space-y-3">
                            {p.eligibility.map((item) => (
                              <li
                                key={item}
                                className="flex gap-3 text-sm leading-relaxed text-ink-soft"
                              >
                                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-gold" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ) : null}

                      {p.processSteps?.length ? (
                        <div className="rounded-2xl border border-ink/10 bg-ink p-6 text-parchment shadow-lg">
                          <h3 className="text-xs uppercase tracking-[0.2em] text-gold">
                            Process
                          </h3>
                          <ol className="mt-5 space-y-4">
                            {p.processSteps.map((step, i) => (
                              <li key={step} className="flex gap-4 text-sm">
                                <span className="font-display text-xl leading-none text-gold">
                                  {String(i + 1).padStart(2, "0")}
                                </span>
                                <span className="pt-0.5 text-parchment/85">{step}</span>
                              </li>
                            ))}
                          </ol>
                        </div>
                      ) : null}
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </article>
          );
        })}
      </div>
    </div>
  );
}
