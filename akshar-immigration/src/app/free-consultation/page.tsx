import type { Metadata } from "next";
import Link from "next/link";
import {
  CalendarDays,
  CheckCircle2,
  MessageCircle,
  Sparkles,
} from "lucide-react";
import { ContactForm } from "@/components/shared/ContactForm";
import { PageHero, Reveal, SlideLink } from "@/components/shared/PageHero";

export const metadata: Metadata = {
  title: "Free Consultation",
  description: "Book a free immigration consultation with Akshar.",
};

const perks = [
  {
    icon: Sparkles,
    title: "No obligation",
    text: "A clear pathway map — fees and next steps explained upfront.",
  },
  {
    icon: CheckCircle2,
    title: "Destination-first",
    text: "We start with where you want to go, then match the right visa type.",
  },
  {
    icon: MessageCircle,
    title: "Fast follow-up",
    text: "UK & Canada team respond on WhatsApp, phone, or email.",
  },
];

export default function FreeConsultationPage() {
  return (
    <main>
      <PageHero
        eyebrow="Start here"
        title="Free consultation"
        description="Share a few details and we will follow up. Prefer a calendar slot? Book directly online."
        image="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=2000&q=80"
        primaryHref="/tools/book-consultation"
        primaryLabel="Book on calendar"
        secondaryHref="/tools/eligibility-checker"
        secondaryLabel="Check eligibility"
      />

      <section className="relative z-10 -mt-10 px-4 pb-20 md:px-6 md:pb-28">
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <Reveal>
            <div className="h-full rounded-2xl border border-ink/10 bg-ink p-7 text-parchment shadow-xl md:p-9">
              <p className="text-xs uppercase tracking-[0.22em] text-gold">
                What you get
              </p>
              <h2 className="mt-3 font-display text-3xl">
                A clear next step in one conversation
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-parchment/70">
                Tell us your destination and goal. We outline eligibility, documents,
                and a realistic timeline — no pressure, no hidden charges.
              </p>

              <ul className="mt-8 space-y-5">
                {perks.map((p) => {
                  const Icon = p.icon;
                  return (
                    <li key={p.title} className="flex gap-4">
                      <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-gold/15 text-gold">
                        <Icon className="size-5" />
                      </span>
                      <span>
                        <span className="block font-medium text-parchment">
                          {p.title}
                        </span>
                        <span className="mt-1 block text-sm text-parchment/65">
                          {p.text}
                        </span>
                      </span>
                    </li>
                  );
                })}
              </ul>

              <div className="mt-10 rounded-xl border border-parchment/15 bg-white/5 p-5">
                <div className="flex items-start gap-3">
                  <CalendarDays className="mt-0.5 size-5 text-gold" />
                  <div>
                    <p className="font-medium">Want a fixed time slot?</p>
                    <p className="mt-1 text-sm text-parchment/65">
                      Use our calendar booking tool for a scheduled call.
                    </p>
                    <Link
                      href="/tools/book-consultation"
                      className="mt-3 inline-flex text-sm text-gold underline-offset-4 hover:underline"
                    >
                      Open booking calendar →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="rounded-2xl border border-ink/10 bg-white p-6 shadow-[0_24px_60px_-28px_rgba(11,31,58,0.35)] md:p-9">
              <p className="text-xs uppercase tracking-[0.2em] text-gold">
                Request a call-back
              </p>
              <h2 className="mt-2 font-display text-2xl text-ink md:text-3xl">
                Tell us about your plans
              </h2>
              <p className="mt-2 text-sm text-ink-soft">
                Takes under a minute. We will contact you during business hours.
              </p>
              <div className="mt-8">
                <ContactForm source="free-consultation" showDestination />
              </div>
              <p className="mt-6 text-center text-sm text-mist">
                Prefer to self-check first?{" "}
                <Link
                  href="/tools/eligibility-checker"
                  className="font-medium text-gold underline-offset-4 hover:underline"
                >
                  Run eligibility
                </Link>
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal className="mx-auto mt-10 flex max-w-6xl flex-wrap items-center justify-center gap-3">
          <SlideLink href="/contact" variant="ink">
            Contact offices
          </SlideLink>
          <Link
            href="/success-stories"
            className="rounded-full border border-ink/15 px-5 py-3 text-sm text-ink-soft transition hover:border-gold hover:text-gold"
          >
            See success stories
          </Link>
        </Reveal>
      </section>
    </main>
  );
}
