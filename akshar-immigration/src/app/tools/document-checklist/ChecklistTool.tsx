"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Download,
  FileText,
  Loader2,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { findChecklist } from "@/lib/sanity/seed/checklists";
import { destinationVisuals } from "@/lib/destinations";
import type { DocumentChecklist, PathwayType } from "@/types";
import { cn } from "@/lib/utils";
import { jsPDF } from "jspdf";

const countries = [
  { value: "uk", label: "United Kingdom" },
  { value: "canada", label: "Canada" },
  { value: "australia", label: "Australia" },
  { value: "usa", label: "USA" },
];

const visaTypes: { value: PathwayType; label: string }[] = [
  { value: "study", label: "Study" },
  { value: "work", label: "Work" },
  { value: "visitor", label: "Visitor" },
  { value: "permanent-residence", label: "PR" },
];

const tips = [
  {
    title: "Start with identity docs",
    text: "Passport validity, photos, and civil documents usually sit on every list.",
  },
  {
    title: "Keep scans crisp",
    text: "Colour PDFs, full pages, and readable stamps reduce back-and-forth.",
  },
  {
    title: "Match the pathway",
    text: "Study, work, and PR packs differ — pick the right visa type first.",
  },
];

export function ChecklistTool() {
  const [country, setCountry] = useState("uk");
  const [visaType, setVisaType] = useState<PathwayType>("study");
  const [checklist, setChecklist] = useState<DocumentChecklist | null>(null);
  const [checked, setChecked] = useState<Record<number, boolean>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadChecklist = useCallback(async () => {
    setLoading(true);
    setError(null);
    setChecked({});
    try {
      const res = await fetch(
        `/api/checklists?country=${encodeURIComponent(country)}&visaType=${encodeURIComponent(visaType)}`,
      );
      if (res.ok) {
        const data = (await res.json()) as DocumentChecklist;
        setChecklist(data);
        return;
      }
      const local = findChecklist(country, visaType);
      if (local) {
        setChecklist(local);
        return;
      }
      setChecklist(null);
      setError("No checklist for this combination yet — try UK/Canada study or work.");
    } catch {
      const local = findChecklist(country, visaType);
      if (local) setChecklist(local);
      else setError("Could not load checklist. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [country, visaType]);

  useEffect(() => {
    void loadChecklist();
  }, [loadChecklist]);

  const doneCount = useMemo(() => {
    if (!checklist) return 0;
    return checklist.items.reduce(
      (n, _, i) => n + (checked[i] ? 1 : 0),
      0,
    );
  }, [checklist, checked]);

  const progress = checklist
    ? Math.round((doneCount / Math.max(checklist.items.length, 1)) * 100)
    : 0;

  function downloadPdf() {
    if (!checklist) return;
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Akshar Immigration — Document checklist", 14, 20);
    doc.setFontSize(12);
    doc.text(checklist.title, 14, 30);
    let y = 42;
    checklist.items.forEach((item, index) => {
      const mark = checked[index] ? "[x]" : "[ ]";
      const req = item.required ? " (required)" : "";
      const lines = doc.splitTextToSize(`${mark} ${item.label}${req}`, 180) as string[];
      lines.forEach((line) => {
        if (y > 270) {
          doc.addPage();
          y = 20;
        }
        doc.text(line, 14, y);
        y += 7;
      });
      if (item.description) {
        doc.setFontSize(10);
        const desc = doc.splitTextToSize(item.description, 170) as string[];
        desc.forEach((line) => {
          if (y > 270) {
            doc.addPage();
            y = 20;
          }
          doc.text(line, 18, y);
          y += 6;
        });
        doc.setFontSize(12);
        y += 2;
      }
    });
    doc.save(`akshar-checklist-${checklist.countrySlug}-${checklist.visaType}.pdf`);
  }

  const visual = destinationVisuals[country];

  return (
    <div className="space-y-8">
      <div className="overflow-hidden rounded-2xl border border-ink/10 bg-white shadow-sm">
        <div className="grid md:grid-cols-[1.1fr_0.9fr]">
          <div className="p-6 md:p-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-gold">
              <Sparkles className="size-3.5" />
              Interactive checklist
            </div>
            <h2 className="mt-4 font-display text-2xl text-ink md:text-3xl">
              Build your list
            </h2>
            <p className="mt-2 text-sm text-ink-soft">
              Pick a destination and pathway — we load a starter pack you can tick and
              export as PDF.
            </p>

            <p className="mt-6 text-xs uppercase tracking-[0.18em] text-mist">Country</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {countries.map((c) => (
                <button
                  key={c.value}
                  type="button"
                  onClick={() => setCountry(c.value)}
                  className={cn(
                    "rounded-full px-4 py-2 text-sm font-medium transition",
                    country === c.value
                      ? "bg-ink text-parchment shadow-md"
                      : "bg-parchment-deep text-ink-soft hover:bg-ink/10",
                  )}
                >
                  {c.label}
                </button>
              ))}
            </div>

            <p className="mt-5 text-xs uppercase tracking-[0.18em] text-mist">Visa type</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {visaTypes.map((v) => (
                <button
                  key={v.value}
                  type="button"
                  onClick={() => setVisaType(v.value)}
                  className={cn(
                    "rounded-full px-4 py-2 text-sm font-medium transition",
                    visaType === v.value
                      ? "bg-gold text-ink shadow-md"
                      : "bg-parchment-deep text-ink-soft hover:bg-ink/10",
                  )}
                >
                  {v.label}
                </button>
              ))}
            </div>

            <p className="mt-6 text-xs text-mist">
              Checklist updates automatically when you change country or visa type.
            </p>
            {loading ? (
              <p className="mt-3 inline-flex items-center gap-2 text-sm text-ink-soft">
                <Loader2 className="size-4 animate-spin" />
                Updating checklist…
              </p>
            ) : null}
            {error ? (
              <p className="mt-3 text-sm text-red-700" role="alert">
                {error}
              </p>
            ) : null}
          </div>

          <div className="relative min-h-[220px] overflow-hidden bg-ink md:min-h-full">
            <div
              className="absolute inset-0 bg-cover bg-center opacity-70"
              style={{ backgroundImage: `url('${visual?.image || destinationVisuals.uk.image}')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-transparent" />
            <div className="relative flex h-full flex-col justify-end p-6 text-parchment md:p-8">
              <FileText className="mb-3 size-8 text-gold" />
              <p className="font-display text-2xl">{visual?.name || "Destination"}</p>
              <p className="mt-1 text-sm text-parchment/70">
                {visaTypes.find((v) => v.value === visaType)?.label} pathway pack
              </p>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {checklist ? (
          <motion.div
            key={checklist._id + visaType + country}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="rounded-2xl border border-ink/10 bg-white p-6 shadow-sm md:p-8"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h3 className="font-display text-2xl text-ink">{checklist.title}</h3>
                <p className="mt-1 text-sm text-ink-soft">
                  Tick items as you gather them, then download a PDF.
                </p>
              </div>
              <Button
                type="button"
                onClick={downloadPdf}
                className="rounded-full border border-gold/40 bg-gold/15 text-ink hover:bg-gold hover:text-ink"
                variant="outline"
              >
                <Download />
                Download PDF
              </Button>
            </div>

            <div className="mt-6">
              <div className="mb-2 flex items-center justify-between text-xs uppercase tracking-[0.16em] text-mist">
                <span>Progress</span>
                <span className="text-gold">
                  {doneCount}/{checklist.items.length} · {progress}%
                </span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-parchment-deep">
                <motion.div
                  className="h-full rounded-full bg-gold"
                  animate={{ width: `${progress}%` }}
                  transition={{ type: "spring", stiffness: 200, damping: 24 }}
                />
              </div>
            </div>

            <ul className="mt-6 space-y-3">
              {checklist.items.map((item, index) => {
                const on = Boolean(checked[index]);
                return (
                  <li key={item.label}>
                    <label
                      htmlFor={`item-${index}`}
                      className={cn(
                        "flex cursor-pointer gap-3 rounded-xl border p-4 transition",
                        on
                          ? "border-gold/50 bg-gold/10"
                          : "border-ink/10 bg-parchment/40 hover:border-ink/20",
                      )}
                    >
                      <Checkbox
                        id={`item-${index}`}
                        checked={on}
                        onCheckedChange={(v) =>
                          setChecked((prev) => ({ ...prev, [index]: v === true }))
                        }
                      />
                      <span className="min-w-0">
                        <span className="flex flex-wrap items-center gap-2 font-medium text-ink">
                          {item.label}
                          {item.required ? (
                            <span className="rounded-full bg-ink px-2 py-0.5 text-[10px] uppercase tracking-wider text-gold">
                              Required
                            </span>
                          ) : null}
                          {on ? (
                            <CheckCircle2 className="size-4 text-gold" />
                          ) : null}
                        </span>
                        {item.description ? (
                          <span className="mt-1 block text-sm text-mist">
                            {item.description}
                          </span>
                        ) : null}
                      </span>
                    </label>
                  </li>
                );
              })}
            </ul>

            <div className="mt-8 flex flex-wrap gap-3 border-t border-ink/10 pt-6">
              <Link
                href={`/tools/book-consultation?destination=${country}`}
                className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-parchment hover:bg-ink-soft"
              >
                Book consultation
                <ArrowRight className="size-4" />
              </Link>
              <Link
                href={`/tools/eligibility-checker?destination=${country}&purpose=${visaType}`}
                className="inline-flex items-center rounded-full border border-ink/15 px-5 py-2.5 text-sm text-ink-soft hover:border-gold hover:text-gold"
              >
                Check eligibility
              </Link>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid gap-4 sm:grid-cols-3"
          >
            {tips.map((tip, i) => (
              <div
                key={tip.title}
                className="rounded-2xl border border-ink/10 bg-white/70 p-5 shadow-sm"
              >
                <p className="font-display text-lg text-gold">0{i + 1}</p>
                <p className="mt-2 font-medium text-ink">{tip.title}</p>
                <p className="mt-2 text-sm text-ink-soft">{tip.text}</p>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {!checklist ? null : (
        <div className="grid gap-4 sm:grid-cols-3">
          {tips.map((tip, i) => (
            <div
              key={tip.title}
              className="rounded-2xl border border-dashed border-ink/15 bg-parchment-deep/40 p-5"
            >
              <p className="text-xs uppercase tracking-[0.16em] text-gold">Tip 0{i + 1}</p>
              <p className="mt-2 font-medium text-ink">{tip.title}</p>
              <p className="mt-1 text-sm text-ink-soft">{tip.text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
