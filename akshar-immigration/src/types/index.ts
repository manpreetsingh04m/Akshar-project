export type PathwayType =
  | "study"
  | "work"
  | "visitor"
  | "family"
  | "permanent-residence"
  | "business";

export type PortableTextBlock = {
  _type: "block";
  _key: string;
  style?: string;
  children: { _type: "span"; _key: string; text: string; marks?: string[] }[];
};

export type Pathway = {
  title: string;
  pathwayType: PathwayType;
  order: number;
  summary: string;
  eligibility: string[];
  processSteps: string[];
  body?: PortableTextBlock[];
  ctaLabel?: string;
  ctaHref?: string;
};

export type SchengenSection = {
  countryName: string;
  summary: string;
  highlights: string[];
};

export type Testimonial = {
  _id: string;
  clientName: string;
  quote: string;
  outcome?: string;
  featured?: boolean;
};

export type FaqItem = {
  _id: string;
  question: string;
  answer: string;
  category?: string;
  order?: number;
  showOnHomepage?: boolean;
};

export type Country = {
  _id: string;
  name: string;
  slug: string;
  tagline: string;
  overview: PortableTextBlock[];
  pathways: Pathway[];
  schengenSections?: SchengenSection[];
  featuredTestimonials?: Testimonial[];
  countryFaqs?: FaqItem[];
  seoTitle?: string;
  seoDescription?: string;
};

export type BlogPost = {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  publishedAt: string;
  body: PortableTextBlock[];
};

export type TeamMember = {
  _id: string;
  name: string;
  role: string;
  bio?: string;
  office?: string;
  order?: number;
};

export type SiteSettings = {
  siteName: string;
  tagline?: string;
  whatsappNumber: string;
  phoneUk?: string;
  phoneCanada?: string;
  email?: string;
  addressUk?: string;
  addressCanada?: string;
  mentionOnlyDestinations?: { name: string; note?: string }[];
  defaultSeoTitle?: string;
  defaultSeoDescription?: string;
};

export type ChecklistItem = {
  label: string;
  description?: string;
  required: boolean;
};

export type DocumentChecklist = {
  _id: string;
  title: string;
  countrySlug: string;
  visaType: PathwayType;
  items: ChecklistItem[];
};

export const COUNTRY_SLUGS = [
  "uk",
  "canada",
  "australia",
  "usa",
  "schengen",
] as const;

export type CountrySlug = (typeof COUNTRY_SLUGS)[number];
