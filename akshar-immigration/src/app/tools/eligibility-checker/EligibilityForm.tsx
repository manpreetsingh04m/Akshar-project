"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { COUNTRY_SLUGS, type CountrySlug, type PathwayType } from "@/types";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";
import { useMemo, useState } from "react";

const STEP_COUNT = 7;

const countryLabels: Record<CountrySlug, string> = {
  uk: "United Kingdom",
  canada: "Canada",
  australia: "Australia",
  usa: "United States",
  schengen: "Schengen (Europe)",
};

const pathwayOptions: { value: PathwayType; label: string }[] = [
  { value: "study", label: "Study" },
  { value: "work", label: "Work" },
  { value: "visitor", label: "Visitor" },
  { value: "family", label: "Family" },
  { value: "permanent-residence", label: "Permanent residence" },
  { value: "business", label: "Business" },
];

const educationOptions = [
  { value: "less-than-secondary", label: "Less than secondary school" },
  { value: "secondary", label: "Secondary / high school" },
  { value: "diploma", label: "Diploma / certificate" },
  { value: "bachelors", label: "Bachelor's degree" },
  { value: "masters", label: "Master's degree" },
  { value: "doctoral", label: "Doctoral / PhD" },
];

const workOptions = [
  { value: "0", label: "None" },
  { value: "1", label: "Less than 1 year" },
  { value: "2", label: "1–2 years" },
  { value: "5", label: "3–5 years" },
  { value: "8", label: "6–10 years" },
  { value: "10", label: "10+ years" },
];

const languageOptions = [
  { value: "basic", label: "Basic / below IELTS 6" },
  { value: "intermediate", label: "Intermediate (IELTS 6–6.5)" },
  { value: "strong", label: "Strong (IELTS 7+ / CLB 9+)" },
  { value: "exempt", label: "Exempt / native speaker" },
];

function ChoiceGrid({
  options,
  value,
  onChange,
  columns = 2,
}: {
  options: { value: string; label: string }[];
  value: string;
  onChange: (v: string) => void;
  columns?: 1 | 2;
}) {
  return (
    <div
      className={cn(
        "grid gap-2",
        columns === 2 ? "sm:grid-cols-2" : "grid-cols-1",
      )}
    >
      {options.map((opt) => {
        const selected = value === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className={cn(
              "flex items-center justify-between gap-3 rounded-xl border px-4 py-3 text-left text-sm transition",
              selected
                ? "border-gold bg-gold/15 text-ink shadow-sm"
                : "border-ink/10 bg-parchment/50 text-ink-soft hover:border-ink/25 hover:bg-white",
            )}
          >
            <span className="font-medium">{opt.label}</span>
            <span
              className={cn(
                "flex size-5 shrink-0 items-center justify-center rounded-full border transition",
                selected
                  ? "border-gold bg-ink text-gold"
                  : "border-ink/20 text-transparent",
              )}
            >
              <Check className="size-3" />
            </span>
          </button>
        );
      })}
    </div>
  );
}

type Props = {
  initialDestination?: string;
  initialPurpose?: string;
};

export function EligibilityForm({
  initialDestination,
  initialPurpose,
}: Props) {
  const [step, setStep] = useState(1);
  const [destination, setDestination] = useState(
    initialDestination?.toLowerCase() ?? "",
  );
  const [purpose, setPurpose] = useState(initialPurpose ?? "");
  const [age, setAge] = useState("");
  const [education, setEducation] = useState("");
  const [workYears, setWorkYears] = useState("");
  const [languageLevel, setLanguageLevel] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const stepTitle = useMemo(() => {
    const titles = [
      "Where do you want to go?",
      "What is your main goal?",
      "How old are you?",
      "Your highest education",
      "Work experience",
      "English / language level",
      "How can we reach you?",
    ];
    return titles[step - 1];
  }, [step]);

  function canAdvance(): boolean {
    switch (step) {
      case 1:
        return Boolean(destination);
      case 2:
        return Boolean(purpose);
      case 3:
        return Boolean(age) && Number(age) >= 16 && Number(age) <= 80;
      case 4:
        return Boolean(education);
      case 5:
        return workYears !== "";
      case 6:
        return Boolean(languageLevel);
      case 7:
        return Boolean(email);
      default:
        return false;
    }
  }

  async function submit() {
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/hubspot/create-contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          firstName: firstName || undefined,
          lastName: lastName || undefined,
          phone: phone || undefined,
          destination,
          purpose,
          source: "eligibility-checker",
        }),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) {
        setError(data.error ?? "Something went wrong.");
        return;
      }
      setDone(true);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  function next() {
    if (step < STEP_COUNT && canAdvance()) setStep((s) => s + 1);
    else if (step === STEP_COUNT && canAdvance()) void submit();
  }

  function back() {
    if (step > 1) setStep((s) => s - 1);
  }

  if (done) {
    return (
      <div className="rounded-2xl border border-gold/30 bg-gold/10 p-8 text-center">
        <p className="font-display text-3xl text-ink">Thank you</p>
        <p className="mt-3 text-sm leading-relaxed text-ink-soft">
          A consultant will review your answers and contact you shortly. This
          check is not a visa decision — it helps us guide your next steps.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex gap-1.5">
          {Array.from({ length: STEP_COUNT }, (_, i) => (
            <div
              key={i}
              className="h-1.5 flex-1 overflow-hidden rounded-full bg-parchment-deep"
            >
              <motion.div
                className="h-full rounded-full bg-gold"
                initial={false}
                animate={{ width: i < step ? "100%" : "0%" }}
                transition={{ type: "spring", stiffness: 280, damping: 28 }}
              />
            </div>
          ))}
        </div>
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-mist">
          Step {step} of {STEP_COUNT}
        </p>
        <h2 className="font-display text-2xl text-ink md:text-3xl">{stepTitle}</h2>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -12 }}
          transition={{ duration: 0.22 }}
          className="min-h-[180px]"
        >
          {step === 1 && (
            <ChoiceGrid
              value={destination}
              onChange={setDestination}
              options={COUNTRY_SLUGS.map((slug) => ({
                value: slug,
                label: countryLabels[slug],
              }))}
            />
          )}

          {step === 2 && (
            <ChoiceGrid
              value={purpose}
              onChange={setPurpose}
              options={pathwayOptions}
            />
          )}

          {step === 3 && (
            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                type="number"
                min={16}
                max={80}
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="e.g. 28"
                className="h-11 rounded-xl"
              />
            </div>
          )}

          {step === 4 && (
            <ChoiceGrid
              value={education}
              onChange={setEducation}
              options={educationOptions}
              columns={1}
            />
          )}

          {step === 5 && (
            <ChoiceGrid
              value={workYears}
              onChange={setWorkYears}
              options={workOptions}
            />
          )}

          {step === 6 && (
            <ChoiceGrid
              value={languageLevel}
              onChange={setLanguageLevel}
              options={languageOptions}
              columns={1}
            />
          )}

          {step === 7 && (
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-11 rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="firstName">First name</Label>
                <Input
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="h-11 rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last name</Label>
                <Input
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="h-11 rounded-xl"
                />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="phone">Phone / WhatsApp</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="h-11 rounded-xl"
                />
              </div>
              <p className="rounded-xl bg-parchment-deep/60 px-4 py-3 text-sm text-ink-soft sm:col-span-2">
                Destination:{" "}
                <span className="font-medium text-ink">
                  {destination
                    ? countryLabels[destination as CountrySlug]
                    : "—"}
                </span>
                {" · "}
                Purpose:{" "}
                <span className="font-medium text-ink">
                  {pathwayOptions.find((p) => p.value === purpose)?.label ||
                    "—"}
                </span>
              </p>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {error ? (
        <p className="text-sm text-red-700" role="alert">
          {error}
        </p>
      ) : null}

      <div className="flex justify-between gap-3 border-t border-ink/10 pt-5">
        <Button
          type="button"
          variant="outline"
          onClick={back}
          disabled={step === 1 || submitting}
          className="rounded-full border-ink/15"
        >
          <ChevronLeft />
          Back
        </Button>
        <Button
          type="button"
          onClick={next}
          disabled={!canAdvance() || submitting}
          className="rounded-full bg-ink px-6 text-parchment hover:bg-ink-soft"
        >
          {step === STEP_COUNT
            ? submitting
              ? "Sending…"
              : "Submit"
            : "Continue"}
          {step < STEP_COUNT ? <ChevronRight /> : null}
        </Button>
      </div>
    </div>
  );
}
