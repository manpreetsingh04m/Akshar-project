import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-auto relative overflow-hidden bg-ink text-parchment">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(196,163,90,0.12),transparent_50%)]" />
      <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-16 md:grid-cols-4 md:px-6">
        <div className="md:col-span-2">
          <p className="font-display text-4xl">Akshar</p>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-parchment/70">
            Licensed immigration consultancy for the UK, Canada, Australia, USA, and
            Schengen — with mention-only guidance for New Zealand and Dubai on request.
          </p>
          <Link
            href="/free-consultation"
            className="mt-6 inline-flex rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-ink transition hover:bg-gold-hot"
          >
            Free consultation
          </Link>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-gold">Destinations</p>
          <ul className="mt-4 space-y-2.5 text-sm text-parchment/80">
            {[
              ["/uk", "United Kingdom"],
              ["/canada", "Canada"],
              ["/australia", "Australia"],
              ["/usa", "USA"],
              ["/schengen", "Schengen"],
            ].map(([href, label]) => (
              <li key={href}>
                <Link href={href} className="transition hover:text-gold">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-gold">Tools</p>
          <ul className="mt-4 space-y-2.5 text-sm text-parchment/80">
            {[
              ["/tools/eligibility-checker", "Eligibility checker"],
              ["/tools/crs-calculator", "CRS calculator"],
              ["/tools/document-checklist", "Document checklist"],
              ["/tools/book-consultation", "Book consultation"],
            ].map(([href, label]) => (
              <li key={href}>
                <Link href={href} className="transition hover:text-gold">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="relative border-t border-parchment/10 px-4 py-5 text-center text-xs text-parchment/45 md:px-6">
        © {new Date().getFullYear()} Akshar Immigration Consultancy. All rights reserved.
      </div>
    </footer>
  );
}
