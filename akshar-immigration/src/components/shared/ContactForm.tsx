"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

const destinations = [
  { value: "uk", label: "UK" },
  { value: "canada", label: "Canada" },
  { value: "australia", label: "Australia" },
  { value: "usa", label: "USA" },
  { value: "schengen", label: "Schengen" },
  { value: "other", label: "Other" },
];

type Props = {
  source: string;
  showDestination?: boolean;
  className?: string;
};

export function ContactForm({
  source,
  showDestination = false,
  className,
}: Props) {
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">(
    "idle",
  );
  const [message, setMessage] = useState("");
  const [destination, setDestination] = useState("");
  const [visitId] = useState(() => Date.now());

  useEffect(() => {
    return () => {
      setStatus("idle");
      setMessage("");
      setDestination("");
    };
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");
    const form = e.currentTarget;
    const fd = new FormData(form);
    try {
      const res = await fetch("/api/hubspot/create-contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: fd.get("email"),
          firstName: fd.get("firstName"),
          lastName: fd.get("lastName"),
          phone: fd.get("phone"),
          destination: destination || undefined,
          source,
          message: fd.get("message"),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");
      setStatus("ok");
      setMessage("Thanks — we will be in touch shortly.");
      form.reset();
      setDestination("");
    } catch (err) {
      setStatus("error");
      setMessage(
        err instanceof Error ? err.message : "Could not send. Try WhatsApp.",
      );
    }
  }

  if (status === "ok") {
    return (
      <div className="rounded-2xl border border-gold/30 bg-gold/10 p-8 text-center">
        <p className="font-display text-2xl text-ink">Request received</p>
        <p className="mt-2 text-sm text-ink-soft">{message}</p>
        <Button
          type="button"
          className="mt-6 rounded-full bg-ink text-parchment"
          onClick={() => {
            setStatus("idle");
            setMessage("");
          }}
        >
          Send another
        </Button>
      </div>
    );
  }

  return (
    <form
      key={visitId}
      onSubmit={onSubmit}
      className={cn("space-y-5", className)}
    >
      {showDestination ? (
        <div>
          <Label className="text-xs uppercase tracking-[0.16em] text-mist">
            Interested destination
          </Label>
          <div className="mt-2 flex flex-wrap gap-2">
            {destinations.map((d) => (
              <button
                key={d.value}
                type="button"
                onClick={() => setDestination(d.value)}
                className={cn(
                  "rounded-full px-3.5 py-1.5 text-sm font-medium transition",
                  destination === d.value
                    ? "bg-ink text-parchment"
                    : "bg-parchment-deep text-ink-soft hover:bg-ink/10",
                )}
              >
                {d.label}
              </button>
            ))}
          </div>
        </div>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="firstName">First name</Label>
          <Input
            id="firstName"
            name="firstName"
            required
            className="mt-1.5 h-11 rounded-xl"
            placeholder="Priya"
          />
        </div>
        <div>
          <Label htmlFor="lastName">Last name</Label>
          <Input
            id="lastName"
            name="lastName"
            className="mt-1.5 h-11 rounded-xl"
            placeholder="Sharma"
          />
        </div>
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          required
          className="mt-1.5 h-11 rounded-xl"
          placeholder="you@email.com"
        />
      </div>
      <div>
        <Label htmlFor="phone">Phone / WhatsApp</Label>
        <Input
          id="phone"
          name="phone"
          className="mt-1.5 h-11 rounded-xl"
          placeholder="+44 …"
        />
      </div>
      <div>
        <Label htmlFor="message">How can we help?</Label>
        <Textarea
          id="message"
          name="message"
          rows={4}
          className="mt-1.5 rounded-xl"
          placeholder="Tell us your goal — study, work, visit, or PR…"
        />
      </div>
      <Button
        type="submit"
        disabled={status === "loading"}
        className="group h-12 w-full rounded-full bg-ink text-parchment hover:bg-ink-soft sm:w-auto sm:px-8"
      >
        {status === "loading" ? (
          <>
            <Loader2 className="animate-spin" />
            Sending…
          </>
        ) : (
          <>
            Request free consultation
            <ArrowRight className="transition group-hover:translate-x-0.5" />
          </>
        )}
      </Button>
      {message && status === "error" ? (
        <p className="text-sm text-red-700" role="alert">
          {message}
        </p>
      ) : null}
    </form>
  );
}
