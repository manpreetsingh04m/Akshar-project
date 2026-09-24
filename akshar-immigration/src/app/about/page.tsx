import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, Reveal, SlideLink } from "@/components/shared/PageHero";
import { getTeam } from "@/lib/sanity/fetch";

export const metadata: Metadata = {
  title: "About",
  description: "About Akshar Immigration Consultancy — UK and Canada offices.",
};

export default async function AboutPage() {
  const team = await getTeam();
  return (
    <main>
      <PageHero
        eyebrow="About"
        title="Licensed guidance across borders"
        description="UK and Canada offices helping families navigate study, work, visitor, family, and permanent residence pathways — with clear fees and honest timelines."
        image="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=2000&q=80"
        primaryHref="/free-consultation"
        primaryLabel="Talk to us"
        secondaryHref="/success-stories"
        secondaryLabel="See stories"
      />

      <section className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-20">
        <Reveal className="grid gap-10 md:grid-cols-2 md:gap-16">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-gold">Our approach</p>
            <h2 className="mt-3 font-display text-3xl md:text-4xl">
              Destination-first, never generic
            </h2>
          </div>
          <p className="text-ink-soft leading-relaxed md:pt-8">
            Akshar Immigration Consultancy maps the right pathway to where you want to go,
            prepares a clean evidence pack, and keeps you updated from assessment to
            decision. No inflated promises — just structured support.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-5 sm:grid-cols-3">
          {[
            { label: "Offices", value: "UK + Canada" },
            { label: "Focus", value: "Families & professionals" },
            { label: "Promise", value: "Transparent fees" },
          ].map((item, i) => (
            <Reveal key={item.label} delay={i * 0.08}>
              <div className="rounded-2xl border border-ink/10 bg-white/70 p-6 shadow-sm transition hover:-translate-y-1 hover:border-gold/40">
                <p className="text-xs uppercase tracking-[0.18em] text-mist">{item.label}</p>
                <p className="mt-2 font-display text-2xl text-ink">{item.value}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <section className="mt-20">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.22em] text-gold">Team</p>
            <h2 className="mt-3 font-display text-3xl">People behind your file</h2>
          </Reveal>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {team.map((m, i) => (
              <Reveal key={m._id} delay={i * 0.06}>
                <div className="group rounded-2xl border border-ink/10 bg-gradient-to-br from-white to-parchment-deep/40 p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                  <div className="flex size-14 items-center justify-center rounded-full bg-ink font-display text-xl text-gold transition group-hover:scale-105">
                    {m.name.charAt(0)}
                  </div>
                  <h3 className="mt-5 font-display text-2xl">{m.name}</h3>
                  <p className="text-sm text-gold">{m.role}</p>
                  {m.bio ? (
                    <p className="mt-3 text-sm leading-relaxed text-ink-soft">{m.bio}</p>
                  ) : null}
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <Reveal className="mt-16">
          <SlideLink href="/contact" variant="ink">
            Contact the team
          </SlideLink>
        </Reveal>
      </section>
    </main>
  );
}
