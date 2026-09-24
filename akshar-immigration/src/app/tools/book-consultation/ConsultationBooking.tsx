"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

type Props = {
  calUrl?: string;
};

export function ConsultationBooking({ calUrl }: Props) {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function submitFallback(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setMessage(null);
    try {
      const res = await fetch("/api/hubspot/create-contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          firstName: firstName || undefined,
          lastName: lastName || undefined,
          phone: phone || undefined,
          purpose: notes || "consultation-request",
          source: "book-consultation-fallback",
        }),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) {
        setError(data.error ?? "Could not submit.");
        return;
      }
      setMessage("Thank you — we will contact you to arrange a time.");
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="space-y-8">
      <Card className="overflow-hidden border-[#EBE4D6] bg-white shadow-sm">
        <CardHeader>
          <CardTitle className="font-serif text-xl">Live calendar</CardTitle>
          <CardDescription>
            {calUrl
              ? "Pick an available slot below."
              : "Set NEXT_PUBLIC_CAL_COM_URL to enable online booking."}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          {calUrl ? (
            <iframe
              title="Book a consultation"
              src={calUrl}
              className="h-[620px] w-full border-0"
              loading="lazy"
            />
          ) : (
            <div className="flex min-h-[240px] items-center justify-center bg-[#EBE4D6]/40 px-6 py-12 text-center text-sm text-[#1A3358]/80">
              Calendar embed is not configured yet. Use the form below and our
              team will schedule your consultation manually.
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="border-[#EBE4D6] bg-white shadow-sm">
        <CardHeader>
          <CardTitle className="font-serif text-xl">Request a callback</CardTitle>
          <CardDescription>
            Prefer WhatsApp or a phone call? Share your details.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={submitFallback} className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="bc-email">Email *</Label>
              <Input
                id="bc-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bc-first">First name</Label>
              <Input
                id="bc-first"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bc-last">Last name</Label>
              <Input
                id="bc-last"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="bc-phone">Phone</Label>
              <Input
                id="bc-phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="bc-notes">What would you like to discuss?</Label>
              <Textarea
                id="bc-notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
              />
            </div>
            {error && (
              <p className="text-sm text-red-700 sm:col-span-2" role="alert">
                {error}
              </p>
            )}
            {message && (
              <p className="text-sm text-[#2F6B4F] sm:col-span-2">{message}</p>
            )}
            <div className="sm:col-span-2">
              <Button
                type="submit"
                disabled={submitting}
                className="bg-[#C4A35A] text-[#0B1F3A] hover:bg-[#D4B56A]"
              >
                {submitting ? "Sending…" : "Send request"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
