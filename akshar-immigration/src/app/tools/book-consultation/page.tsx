import { ConsultationBooking } from "@/app/tools/book-consultation/ConsultationBooking";
import { PageHero } from "@/components/shared/PageHero";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book a consultation | Akshar Immigration",
  description: "Schedule a call with a licensed immigration consultant.",
};

export default function BookConsultationPage() {
  const calUrl = process.env.NEXT_PUBLIC_CAL_COM_URL?.trim();

  return (
    <main>
      <PageHero
        eyebrow="Speak with us"
        title="Book a consultation"
        description="Pick a time that works. If the calendar is offline, leave your details and we will call you back."
        image="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=2000&q=80"
        compact
      />
      <section className="relative z-10 -mt-8 px-4 pb-20 md:px-6">
        <div className="mx-auto max-w-3xl rounded-2xl border border-ink/10 bg-white/95 p-4 shadow-xl md:p-8">
          <ConsultationBooking calUrl={calUrl} />
        </div>
      </section>
    </main>
  );
}
