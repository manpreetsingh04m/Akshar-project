import { ChecklistTool } from "@/app/tools/document-checklist/ChecklistTool";
import { PageHero } from "@/components/shared/PageHero";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Document checklist | Akshar Immigration",
  description:
    "Build a destination-specific document checklist and download a PDF.",
};

export default function DocumentChecklistPage() {
  return (
    <main className="pb-8">
      <PageHero
        eyebrow="Preparation"
        title="Document checklist"
        description="Select your destination and visa type, track documents, then download a PDF for your consultation."
        image="https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=2000&q=80"
        compact
      />
      <section className="relative z-10 -mt-10 px-4 pb-16 md:px-6 md:pb-24">
        <div className="mx-auto max-w-5xl">
          <ChecklistTool />
        </div>
      </section>
    </main>
  );
}
