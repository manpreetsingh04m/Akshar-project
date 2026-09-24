"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const stats = [
  {
    value: 4800,
    suffix: "+",
    label: "Happy Clients",
    note: "Successfully helped in their immigration journey",
  },
  {
    value: 50,
    suffix: "+",
    label: "Countries",
    note: "Global presence across continents",
  },
  {
    value: 6,
    suffix: "+",
    label: "Years",
    note: "Years of excellence in immigration services",
  },
  {
    value: 99,
    suffix: "%",
    label: "Success Rate",
    note: "Consistently high approval rate",
  },
];

function CountUp({
  value,
  suffix,
  active,
}: {
  value: number;
  suffix: string;
  active: boolean;
}) {
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!active) return;
    let frame = 0;
    const frames = 48;
    const id = window.setInterval(() => {
      frame += 1;
      const progress = Math.min(1, frame / frames);
      const eased = 1 - (1 - progress) ** 3;
      setN(Math.round(value * eased));
      if (frame >= frames) window.clearInterval(id);
    }, 24);
    return () => window.clearInterval(id);
  }, [active, value]);

  return (
    <span>
      {n.toLocaleString()}
      {suffix}
    </span>
  );
}

export function ImpactNumbers() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="bg-ink px-4 py-20 text-parchment md:px-6">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-xs uppercase tracking-[0.25em] text-gold">Our Impact</p>
          <h2 className="mt-3 font-display text-3xl md:text-5xl">Our Impact in Numbers</h2>
          <p className="mt-3 max-w-xl text-parchment/70">
            Trusted by thousands for their immigration journey
          </p>
        </motion.div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="border border-parchment/15 bg-ink-soft/40 p-6 text-center transition hover:border-gold/60"
            >
              <p className="font-display text-4xl text-gold md:text-5xl">
                <CountUp value={s.value} suffix={s.suffix} active={inView} />
              </p>
              <p className="mt-3 text-sm font-medium uppercase tracking-wider">
                {s.label}
              </p>
              <p className="mt-2 text-xs text-parchment/55">{s.note}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
