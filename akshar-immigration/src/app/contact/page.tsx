import type { Metadata } from "next";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { ContactForm } from "@/components/shared/ContactForm";
import { PageHero, Reveal } from "@/components/shared/PageHero";
import { getSiteSettings } from "@/lib/sanity/fetch";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Akshar Immigration Consultancy.",
};

export default async function ContactPage() {
  const settings = await getSiteSettings();
  return (
    <main>
      <PageHero
        eyebrow="Contact"
        title="Talk to our team"
        description="UK and Canada offices — reach us by phone, WhatsApp, or the form below."
        image="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?auto=format&fit=crop&w=2000&q=80"
        compact
      />
      <section className="mx-auto max-w-6xl px-4 py-16 md:px-6">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <div className="rounded-2xl border border-ink/10 bg-ink p-8 text-parchment shadow-lg">
              <p className="text-xs uppercase tracking-[0.2em] text-gold">Reach us</p>
              <ul className="mt-6 space-y-4 text-sm text-parchment/85">
                {settings.email ? <li>Email: {settings.email}</li> : null}
                {settings.phoneUk ? <li>UK: {settings.phoneUk}</li> : null}
                {settings.phoneCanada ? <li>Canada: {settings.phoneCanada}</li> : null}
                {settings.addressUk ? <li>UK office: {settings.addressUk}</li> : null}
                {settings.addressCanada ? (
                  <li>Canada office: {settings.addressCanada}</li>
                ) : null}
                <li>WhatsApp: {settings.whatsappNumber}</li>
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="rounded-2xl border border-ink/10 bg-white/70 p-6 shadow-sm md:p-8">
              <h2 className="font-display text-2xl">Send a message</h2>
              <p className="mt-2 text-sm text-ink-soft">
                We respond during business hours — urgent? Use WhatsApp.
              </p>
              <ContactForm source="contact-page" />
            </div>
          </Reveal>
        </div>
      </section>
      <WhatsAppButton />
    </main>
  );
}
