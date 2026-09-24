import { EligibilitySession } from "@/app/tools/eligibility-checker/EligibilitySession";
import { PageHero } from "@/components/shared/PageHero";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Eligibility checker | Akshar Immigration",
  description:
    "Answer a few questions about your destination and profile so our team can guide your next steps.",
};

type PageProps = {
  searchParams: Promise<{ destination?: string; purpose?: string }>;
};

export default async function EligibilityCheckerPage({ searchParams }: PageProps) {
  const params = await searchParams;

  return (
    <main>
      <PageHero
        eyebrow="Free tool"
        title="Eligibility checker"
        description="Seven quick steps — not a visa guarantee. We match your answers to the right pathway and a consultant follow-up."
        image="https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=2000&q=80"
        compact
      />
      <section className="relative z-10 -mt-8 px-4 pb-20 md:px-6">
        <div className="mx-auto max-w-xl rounded-2xl border border-ink/10 bg-white/90 p-1 shadow-[0_24px_60px_-28px_rgba(11,31,58,0.4)] backdrop-blur-md">
          <div className="rounded-xl bg-white p-4 md:p-6">
            <EligibilitySession
              initialDestination={params.destination}
              initialPurpose={params.purpose}
            />
          </div>
        </div>
      </section>
    </main>
  );
}
