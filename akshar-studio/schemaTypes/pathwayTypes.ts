export const PATHWAY_TYPES = [
  { title: "Study", value: "study" },
  { title: "Work", value: "work" },
  { title: "Visitor", value: "visitor" },
  { title: "Family", value: "family" },
  { title: "Permanent Residence", value: "permanent-residence" },
  { title: "Business", value: "business" },
] as const;

export type PathwayType = (typeof PATHWAY_TYPES)[number]["value"];
