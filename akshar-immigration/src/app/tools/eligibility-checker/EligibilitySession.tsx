"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { EligibilityForm } from "@/app/tools/eligibility-checker/EligibilityForm";

const DRAFT_KEY = "akshar-eligibility-draft";

type Props = {
  initialDestination?: string;
  initialPurpose?: string;
};

/**
 * Fresh form every time the user enters this page.
 * Clears any draft on leave and strips URL query after one-time prefill.
 */
export function EligibilitySession({
  initialDestination,
  initialPurpose,
}: Props) {
  const router = useRouter();
  const [visitId, setVisitId] = useState(() => Date.now());

  useEffect(() => {
    sessionStorage.removeItem(DRAFT_KEY);

    // Apply ?destination=&purpose= once, then clean the URL so a later visit is blank
    if (typeof window !== "undefined" && window.location.search) {
      router.replace("/tools/eligibility-checker", { scroll: false });
    }

    const onPageShow = (event: PageTransitionEvent) => {
      if (event.persisted) {
        sessionStorage.removeItem(DRAFT_KEY);
        setVisitId(Date.now());
      }
    };
    window.addEventListener("pageshow", onPageShow);

    return () => {
      sessionStorage.removeItem(DRAFT_KEY);
      window.removeEventListener("pageshow", onPageShow);
    };
  }, [router]);

  return (
    <EligibilityForm
      key={visitId}
      initialDestination={initialDestination}
      initialPurpose={initialPurpose}
    />
  );
}
