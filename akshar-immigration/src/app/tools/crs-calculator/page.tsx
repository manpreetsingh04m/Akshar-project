import { CrsForm } from "@/app/tools/crs-calculator/CrsForm";
import { PageHero } from "@/components/shared/PageHero";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CRS calculator | Akshar Immigration",
  description:
    "Estimate your Comprehensive Ranking System score for Canada Express Entry.",
};

export default function CrsCalculatorPage() {
  return (
    <main>
      <PageHero
        eyebrow="Canada PR"
        title="CRS score calculator"
        description="IRCC-inspired estimate for planning. Skill transferability and full spouse factors are simplified — not for filing."
        image="https://images.unsplash.com/photo-1503614472-8c93d56e92ce?auto=format&fit=crop&w=2000&q=80"
        compact
      />
      <section className="relative z-10 -mt-8 px-4 pb-20 md:px-6">
        <div className="mx-auto max-w-4xl rounded-2xl border border-ink/10 bg-white/95 p-4 shadow-xl md:p-8">
          <CrsForm />
        </div>
      </section>
    </main>
  );
}
