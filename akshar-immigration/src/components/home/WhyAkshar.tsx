"use client";

import {
  Award,
  Clock3,
  Handshake,
  Newspaper,
  Route,
  ShieldCheck,
} from "lucide-react";
import { motion } from "framer-motion";

const reasons = [
  {
    icon: Award,
    title: "Experienced Experts",
    text: "We have years of experience in handling student visas, visitor visas, and work permits for countries like Canada, UK, Europe, Australia, USA and more.",
    note: "You're in safe hands.",
  },
  {
    icon: ShieldCheck,
    title: "100% Transparent Process",
    text: "No hidden charges. We explain each step clearly and honestly so you always know what's happening with your file.",
    note: "Honest advice, no surprises.",
  },
  {
    icon: Clock3,
    title: "Fast & Timely Processing",
    text: "We value your time. Our team works quickly to submit your application on time and keeps you updated.",
    note: "No unnecessary delays.",
  },
  {
    icon: Handshake,
    title: "High Success Rate",
    text: "We have helped hundreds of people successfully get their visas.",
    note: "Our success speaks for itself.",
  },
  {
    icon: Newspaper,
    title: "Latest Immigration Updates",
    text: "We keep track of all government changes and guide you based on the most recent rules.",
    note: "No outdated info – only the latest.",
  },
  {
    icon: Route,
    title: "End-to-End Services",
    text: "From your profile assessment to file submission and post-visa support — we handle everything.",
    note: "You don't have to run anywhere else.",
  },
];

export function WhyAkshar() {
  return (
    <section className="relative overflow-hidden px-4 py-20 md:px-6">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(196,163,90,0.12),transparent_55%)]" />
      <div className="relative mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-xs uppercase tracking-[0.25em] text-gold">
            Why Choose Akshar Immigration
          </p>
          <h2 className="mt-3 max-w-3xl font-display text-3xl text-ink md:text-5xl">
            Your Trusted Partner in Global Immigration Services
          </h2>
        </motion.div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((r, i) => {
            const Icon = r.icon;
            return (
              <motion.article
                key={r.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.06, duration: 0.45 }}
                whileHover={{ y: -6 }}
                className="group border border-ink/10 bg-white/70 p-6 shadow-sm backdrop-blur-sm transition hover:border-gold/50 hover:shadow-lg"
              >
                <div className="flex size-11 items-center justify-center rounded-sm bg-ink text-gold transition group-hover:bg-gold group-hover:text-ink">
                  <Icon className="size-5" />
                </div>
                <h3 className="mt-5 font-display text-xl text-ink">{r.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">{r.text}</p>
                <p className="mt-4 text-sm font-medium text-gold">{r.note}</p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
