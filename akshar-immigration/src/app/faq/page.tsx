import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, Reveal, SlideLink } from "@/components/shared/PageHero";
import { getAllFaqs } from "@/lib/sanity/fetch";
import {
  CircleHelp,
  FileCheck2,
  MessagesSquare,
  Route,
} from "lucide-react";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Frequently asked questions about immigration with Akshar.",
};

const icons = [Route, FileCheck2, CircleHelp, MessagesSquare];

export default async function FaqPage() {
  const faqs = await getAllFaqs();
  return (
    <main>
      <PageHero
        eyebrow="Help"
        title="Frequently asked questions"
        description="Straight answers on destinations, process, and how our tools feed your file."
        image="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=2000&q=80"
        primaryHref="/contact"
        primaryLabel="Ask us anything"
        compact
      />

      <section className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-20">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <Reveal>
            <div className="space-y-3">
              {faqs.map((f, i) => {
                const Icon = icons[i % icons.length];
                return (
                  <details
                    key={f._id}
                    className="group overflow-hidden rounded-2xl border border-ink/10 bg-white/80 shadow-sm open:border-gold/40 open:shadow-md"
                  >
                    <summary className="cursor-pointer list-none p-5 marker:content-none [&::-webkit-details-marker]:hidden md:p-6">
                      <span className="flex items-start gap-4">
                        <span className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-xl bg-parchment-deep text-gold transition group-open:bg-ink group-open:text-gold">
                          <Icon className="size-5" />
                        </span>
                        <span className="flex min-w-0 flex-1 items-center justify-between gap-3">
                          <span className="font-medium text-ink md:text-lg">
                            {f.question}
                          </span>
                          <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-parchment-deep text-lg text-gold transition group-open:rotate-45 group-open:bg-gold group-open:text-ink">
                            +
                          </span>
                        </span>
                      </span>
                    </summary>
                    <p className="border-t border-ink/5 px-5 pb-5 pl-[4.25rem] text-sm leading-relaxed text-ink-soft md:px-6 md:pb-6 md:pl-[4.75rem]">
                      {f.answer}
                    </p>
                  </details>
                );
              })}
            </div>
          </Reveal>

          <Reveal delay={0.1} className="space-y-5">
            <div className="rounded-2xl border border-ink/10 bg-ink p-7 text-parchment shadow-lg">
              <p className="text-xs uppercase tracking-[0.2em] text-gold">Still unsure?</p>
              <h2 className="mt-3 font-display text-2xl">Talk to a consultant</h2>
              <p className="mt-3 text-sm text-parchment/70">
                Share your destination and goal — we map the pathway and document pack
                with you.
              </p>
              <div className="mt-6 flex flex-col gap-3">
                <SlideLink href="/free-consultation" variant="gold">
                  Free consultation
                </SlideLink>
                <Link
                  href="/tools/eligibility-checker"
                  className="inline-flex items-center justify-center rounded-full border border-parchment/25 px-5 py-3 text-sm transition hover:border-gold hover:text-gold"
                >
                  Run eligibility check
                </Link>
              </div>
            </div>

            <div className="rounded-2xl border border-ink/10 bg-white/70 p-6">
              <p className="font-display text-xl text-ink">Quick links</p>
              <ul className="mt-4 space-y-3 text-sm">
                {[
                  ["/uk", "UK pathways"],
                  ["/canada", "Canada pathways"],
                  ["/tools/document-checklist", "Document checklist"],
                  ["/tools/crs-calculator", "CRS calculator"],
                ].map(([href, label]) => (
                  <li key={href}>
                    <Link href={href} className="text-ink-soft transition hover:text-gold">
                      {label} →
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
