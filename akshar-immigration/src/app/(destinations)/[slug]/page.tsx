import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CountryHero } from "@/components/countries/CountryHero";
import { PathwayTabs } from "@/components/countries/PathwayTabs";
import { PortableText } from "@/components/shared/PortableText";
import { getCountryBySlug } from "@/lib/sanity/fetch";
import { COUNTRY_SLUGS, type CountrySlug } from "@/types";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return COUNTRY_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const country = await getCountryBySlug(slug);
  if (!country) return { title: "Destination not found" };
  return {
    title: country.seoTitle || `${country.name} | Akshar Immigration`,
    description: country.seoDescription || country.tagline,
  };
}

export default async function CountryPage({ params }: Props) {
  const { slug } = await params;
  if (!COUNTRY_SLUGS.includes(slug as CountrySlug)) notFound();
  const country = await getCountryBySlug(slug);
  if (!country) notFound();

  return (
    <main>
      <CountryHero slug={slug} name={country.name} tagline={country.tagline} />

      <section className="relative z-10 -mt-8 px-4 md:px-6">
        <div className="mx-auto max-w-6xl rounded-2xl border border-ink/10 bg-parchment/95 p-6 shadow-[0_24px_60px_-28px_rgba(11,31,58,0.35)] backdrop-blur-md md:p-8">
          <p className="text-xs uppercase tracking-[0.22em] text-gold">Overview</p>
          <div className="mt-3 max-w-3xl text-base leading-relaxed md:text-lg">
            <PortableText value={country.overview} />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-20">
        <div className="mb-10 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-gold">Pathways</p>
            <h2 className="mt-2 font-display text-3xl md:text-4xl">Choose a pathway</h2>
            <p className="mt-2 max-w-lg text-sm text-ink-soft">
              Slide between options — all pathway content stays on the page for SEO.
            </p>
          </div>
          <Link
            href={`/tools/document-checklist?country=${slug}`}
            className="text-sm font-medium text-gold underline-offset-4 hover:underline"
          >
            Document checklist →
          </Link>
        </div>
        <PathwayTabs country={country} />
      </section>

      {country.schengenSections?.length ? (
        <section className="bg-parchment-deep/60 px-4 py-16 md:px-6">
          <div className="mx-auto max-w-6xl">
            <h2 className="font-display text-3xl">Schengen focus countries</h2>
            <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {country.schengenSections.map((s) => (
                <div
                  key={s.countryName}
                  className="rounded-2xl border border-ink/10 bg-white/70 p-6 shadow-sm transition hover:-translate-y-1 hover:border-gold/40 hover:shadow-md"
                >
                  <h3 className="font-display text-xl">{s.countryName}</h3>
                  <p className="mt-2 text-sm text-ink-soft">{s.summary}</p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {s.highlights?.map((h) => (
                      <li
                        key={h}
                        className="rounded-full bg-ink/5 px-3 py-1 text-xs text-ink-soft"
                      >
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {country.featuredTestimonials?.length ? (
        <section className="mx-auto max-w-6xl px-4 py-16 md:px-6">
          <h2 className="font-display text-2xl md:text-3xl">Client stories</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {country.featuredTestimonials.map((t) => (
              <blockquote
                key={t._id}
                className="rounded-2xl border border-ink/10 bg-white/60 p-6 shadow-sm transition hover:border-gold/40"
              >
                <p className="text-base leading-relaxed text-ink-soft">“{t.quote}”</p>
                <cite className="mt-4 block text-sm not-italic">
                  <span className="font-medium text-ink">{t.clientName}</span>
                  {t.outcome ? (
                    <span className="mt-1 block text-gold">{t.outcome}</span>
                  ) : null}
                </cite>
              </blockquote>
            ))}
          </div>
        </section>
      ) : null}

      {country.countryFaqs?.length ? (
        <section className="mx-auto max-w-3xl px-4 pb-24 md:px-6">
          <h2 className="font-display text-2xl md:text-3xl">FAQs</h2>
          <div className="mt-8 divide-y divide-ink/10 rounded-2xl border border-ink/10 bg-white/50 px-5">
            {country.countryFaqs.map((f) => (
              <details key={f._id} className="group py-5">
                <summary className="cursor-pointer list-none font-medium marker:content-none [&::-webkit-details-marker]:hidden">
                  <span className="flex items-center justify-between gap-3">
                    {f.question}
                    <span className="text-gold transition group-open:rotate-45">+</span>
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">{f.answer}</p>
              </details>
            ))}
          </div>
        </section>
      ) : null}

      <section className="px-4 pb-24 md:px-6">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 overflow-hidden rounded-2xl bg-ink px-8 py-10 text-parchment md:flex-row md:items-center md:px-12">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-gold">Next step</p>
            <h2 className="mt-2 font-display text-2xl md:text-3xl">
              Ready for {country.name}?
            </h2>
            <p className="mt-2 max-w-md text-sm text-parchment/70">
              Run eligibility or book a free consult — we map the strongest pathway for you.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href={`/tools/eligibility-checker?destination=${slug}`}
              className="rounded-full bg-gold px-6 py-3 text-sm font-semibold text-ink hover:bg-gold-hot"
            >
              Check eligibility
            </Link>
            <Link
              href="/free-consultation"
              className="rounded-full border border-parchment/30 px-6 py-3 text-sm hover:border-gold hover:text-gold"
            >
              Free consultation
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
