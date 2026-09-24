import type { DocumentChecklist } from "@/types";

export const CHECKLIST_SEED: DocumentChecklist[] = [
  {
    _id: "checklist-uk-study",
    title: "UK Student visa — document checklist",
    countrySlug: "uk",
    visaType: "study",
    items: [
      {
        label: "Valid passport",
        description: "Must be valid for the full course duration.",
        required: true,
      },
      {
        label: "CAS letter",
        description: "Confirmation of Acceptance for Studies from your licensed sponsor.",
        required: true,
      },
      {
        label: "Financial evidence",
        description: "Bank statements or loan letter covering tuition + living costs for 28 days.",
        required: true,
      },
      {
        label: "English language test",
        description: "IELTS UKVI or equivalent if required by your CAS.",
        required: true,
      },
      {
        label: "TB test certificate",
        description: "If applying from a listed country.",
        required: false,
      },
      {
        label: "Academic transcripts",
        required: true,
      },
    ],
  },
  {
    _id: "checklist-uk-work",
    title: "UK Skilled Worker visa — document checklist",
    countrySlug: "uk",
    visaType: "work",
    items: [
      {
        label: "Valid passport",
        required: true,
      },
      {
        label: "Certificate of Sponsorship (CoS)",
        description: "Reference number from your UK employer.",
        required: true,
      },
      {
        label: "Proof of English",
        description: "IELTS, degree taught in English, or exempt nationality.",
        required: true,
      },
      {
        label: "Maintenance funds",
        description: "£1,270 held for 28 days unless certificated sponsor covers costs.",
        required: true,
      },
      {
        label: "Criminal record certificate",
        description: "For certain skilled roles.",
        required: false,
      },
    ],
  },
  {
    _id: "checklist-canada-study",
    title: "Canada study permit — document checklist",
    countrySlug: "canada",
    visaType: "study",
    items: [
      {
        label: "Valid passport",
        required: true,
      },
      {
        label: "Letter of acceptance",
        description: "From a Designated Learning Institution (DLI).",
        required: true,
      },
      {
        label: "Proof of funds",
        description: "Tuition + living expenses per IRCC guidelines.",
        required: true,
      },
      {
        label: "Statement of purpose",
        required: true,
      },
      {
        label: "Medical exam",
        description: "If required based on residence or program length.",
        required: false,
      },
      {
        label: "Biometrics confirmation",
        required: true,
      },
    ],
  },
  {
    _id: "checklist-canada-work",
    title: "Canada work permit — document checklist",
    countrySlug: "canada",
    visaType: "work",
    items: [
      {
        label: "Valid passport",
        required: true,
      },
      {
        label: "Job offer or LMIA",
        description: "Employer-specific permit unless LMIA-exempt category.",
        required: true,
      },
      {
        label: "Proof of qualifications",
        required: true,
      },
      {
        label: "Police certificates",
        description: "From countries where you lived 6+ months since age 18.",
        required: false,
      },
      {
        label: "Medical exam",
        required: false,
      },
    ],
  },
];

export function findChecklist(
  country: string,
  visaType: string,
): DocumentChecklist | undefined {
  const countrySlug = country.toLowerCase().trim();
  const type = visaType.toLowerCase().trim();
  return CHECKLIST_SEED.find(
    (c) => c.countrySlug === countrySlug && c.visaType === type,
  );
}
