import type {
  BlogPost,
  Country,
  FaqItem,
  SiteSettings,
  TeamMember,
  Testimonial,
} from "@/types";

function block(text: string, key: string) {
  return {
    _type: "block" as const,
    _key: key,
    style: "normal",
    children: [{ _type: "span" as const, _key: `${key}-s`, text, marks: [] }],
  };
}

export const siteSettingsSeed: SiteSettings = {
  siteName: "Akshar Immigration Consultancy",
  tagline: "Immigration is complex. We make it simple.",
  whatsappNumber: "+447918036171",
  phoneUk: "+44 7918 036171",
  phoneCanada: "+1 437 983 6171",
  email: "info@aksharimmigrationconsultancy.com",
  addressUk: "West Bromwich, England, United Kingdom",
  addressCanada: "Canada",
  mentionOnlyDestinations: [
    { name: "New Zealand", note: "Guidance available on request" },
    { name: "Dubai (UAE)", note: "Guidance available on request" },
  ],
  defaultSeoTitle: "Akshar Immigration Consultancy | UK & Canada Immigration",
  defaultSeoDescription:
    "Licensed immigration consultancy for study, work, family, and permanent residence pathways across the UK, Canada, Australia, USA, and Schengen.",
};

export const testimonialsSeed: Testimonial[] = [
  {
    _id: "t1",
    clientName: "Priya S.",
    quote:
      "Akshar guided our UK Skilled Worker application end to end. Clear timelines, honest advice, and no surprises.",
    outcome: "UK Skilled Worker approved",
    featured: true,
  },
  {
    _id: "t2",
    clientName: "Rahul M.",
    quote:
      "The Canada Express Entry prep and document checklist saved us months. We always knew the next step.",
    outcome: "Canada PR — Express Entry",
    featured: true,
  },
  {
    _id: "t3",
    clientName: "Ananya K.",
    quote:
      "Student visa for Australia felt overwhelming until we spoke with Akshar. Professional and responsive.",
    outcome: "Australia Student Visa",
    featured: true,
  },
];

export const faqsSeed: FaqItem[] = [
  {
    _id: "f1",
    question: "What destinations do you help with?",
    answer:
      "We provide full pathway guidance for the UK, Canada, Australia, USA, and Schengen (Italy, France, Germany, Spain, Belgium, Switzerland). New Zealand and Dubai are available on request.",
    category: "general",
    order: 1,
    showOnHomepage: true,
  },
  {
    _id: "f2",
    question: "How does the process work?",
    answer:
      "We start with a free consultation, assess your profile, map the right pathway, prepare documents, and submit with ongoing updates until a decision.",
    category: "process",
    order: 2,
    showOnHomepage: true,
  },
  {
    _id: "f3",
    question: "Are there hidden fees?",
    answer:
      "No. We explain government fees and our professional fees upfront so you always know what to expect.",
    category: "fees",
    order: 3,
    showOnHomepage: true,
  },
  {
    _id: "f4",
    question: "Can I check eligibility online first?",
    answer:
      "Yes. Use our Eligibility Checker under Tools, or book a free consultation for a personalised review.",
    category: "process",
    order: 4,
    showOnHomepage: true,
  },
];

const basePathwaysUk = [
  {
    title: "Student Visa",
    pathwayType: "study" as const,
    order: 1,
    summary:
      "Study at UK universities and colleges with a clear CAS and financial evidence plan.",
    eligibility: [
      "Confirmed offer / CAS from a licensed sponsor",
      "English language requirement met",
      "Funds for tuition and living costs",
    ],
    processSteps: [
      "Profile & course shortlist",
      "Offer & CAS",
      "Documents & funds evidence",
      "Application & biometrics",
    ],
    ctaLabel: "Check study eligibility",
    ctaHref: "/tools/eligibility-checker?destination=uk&purpose=study",
  },
  {
    title: "Skilled Worker",
    pathwayType: "work" as const,
    order: 2,
    summary:
      "Work for a UK-licensed sponsor in an eligible skilled role with Certificate of Sponsorship.",
    eligibility: [
      "Job offer from licensed sponsor",
      "Skill & salary thresholds met",
      "English language requirement",
    ],
    processSteps: [
      "Role & sponsor check",
      "CoS issuance",
      "Application package",
      "Decision & arrival",
    ],
    ctaLabel: "Check work eligibility",
    ctaHref: "/tools/eligibility-checker?destination=uk&purpose=work",
  },
  {
    title: "Visitor Visa",
    pathwayType: "visitor" as const,
    order: 3,
    summary: "Short stays for tourism, family visits, or business meetings.",
    eligibility: [
      "Genuine visitor intent",
      "Ties to home country",
      "Funds for the trip",
    ],
    processSteps: ["Purpose assessment", "Evidence pack", "Application", "Travel prep"],
    ctaLabel: "Start visitor check",
    ctaHref: "/tools/eligibility-checker?destination=uk&purpose=visitor",
  },
  {
    title: "Family & Settlement",
    pathwayType: "family" as const,
    order: 4,
    summary: "Partner, spouse, and family routes toward life in the UK.",
    eligibility: [
      "Eligible relationship",
      "Financial & accommodation requirements",
      "English & relationship evidence",
    ],
    processSteps: ["Eligibility map", "Evidence", "Application", "Decision"],
    ctaLabel: "Book consultation",
    ctaHref: "/tools/book-consultation?destination=uk&purpose=family",
  },
];

export const countriesSeed: Country[] = [
  {
    _id: "c-uk",
    name: "United Kingdom",
    slug: "uk",
    tagline: "Study, work, and settle with clarity",
    overview: [
      block(
        "The UK offers structured routes for students, skilled workers, visitors, and families. We map the right pathway, prepare evidence, and keep your application decision-ready.",
        "uk1",
      ),
    ],
    pathways: basePathwaysUk,
    featuredTestimonials: [testimonialsSeed[0]],
    countryFaqs: [faqsSeed[0], faqsSeed[1]],
    seoTitle: "UK Immigration & Visas | Akshar Immigration",
    seoDescription:
      "Expert UK student, skilled worker, visitor, and family visa guidance from Akshar Immigration Consultancy.",
  },
  {
    _id: "c-canada",
    name: "Canada",
    slug: "canada",
    tagline: "From study permits to Express Entry",
    overview: [
      block(
        "Canada pathways include study, work, family sponsorship, and permanent residence through Express Entry and provincial programs. We align your profile to the strongest route.",
        "ca1",
      ),
    ],
    pathways: [
      {
        title: "Study Permit",
        pathwayType: "study",
        order: 1,
        summary: "Study at a designated learning institution with a solid study plan.",
        eligibility: ["DLI acceptance", "Proof of funds", "Genuine temporary resident intent"],
        processSteps: ["School offer", "Study plan", "Application", "Arrival & compliance"],
        ctaLabel: "Check study eligibility",
        ctaHref: "/tools/eligibility-checker?destination=canada&purpose=study",
      },
      {
        title: "Work Permits",
        pathwayType: "work",
        order: 2,
        summary: "Employer-specific and open work permit strategies based on your situation.",
        eligibility: ["Job offer or open WP eligibility", "LMIA where required", "Admissibility"],
        processSteps: ["Pathway check", "Employer docs", "Application", "Landing"],
        ctaLabel: "Check work eligibility",
        ctaHref: "/tools/eligibility-checker?destination=canada&purpose=work",
      },
      {
        title: "Permanent Residence",
        pathwayType: "permanent-residence",
        order: 3,
        summary:
          "Express Entry and PNP strategies. Use our CRS calculator to estimate competitiveness.",
        eligibility: [
          "Age, education, language, experience factors",
          "Express Entry pool or PNP nomination path",
        ],
        processSteps: [
          "CRS estimate",
          "Language & ECA",
          "Profile & docs",
          "ITA & PR application",
        ],
        ctaLabel: "Estimate your CRS",
        ctaHref: "/tools/crs-calculator",
      },
      {
        title: "Family Sponsorship",
        pathwayType: "family",
        order: 4,
        summary: "Sponsor a spouse, partner, or eligible family member.",
        eligibility: ["Eligible sponsor", "Relationship evidence", "Financial undertakings"],
        processSteps: ["Eligibility", "Forms & evidence", "Submission", "Decision"],
        ctaLabel: "Book consultation",
        ctaHref: "/tools/book-consultation?destination=canada&purpose=family",
      },
    ],
    featuredTestimonials: [testimonialsSeed[1]],
    countryFaqs: [faqsSeed[1], faqsSeed[3]],
    seoTitle: "Canada Immigration | Akshar Immigration",
    seoDescription:
      "Canada study, work, Express Entry, and family sponsorship guidance from Akshar Immigration.",
  },
  {
    _id: "c-aus",
    name: "Australia",
    slug: "australia",
    tagline: "Study and skilled migration pathways",
    overview: [
      block(
        "Australia offers student visas and skilled migration streams. We clarify subclass options and prepare a clean evidence pack.",
        "au1",
      ),
    ],
    pathways: [
      {
        title: "Student Visa",
        pathwayType: "study",
        order: 1,
        summary: "Enrol with a registered provider and meet GTE / genuine student criteria.",
        eligibility: ["COE", "Funds & English", "Genuine student assessment"],
        processSteps: ["Offer & COE", "GTE statement", "Application", "Visa grant"],
        ctaLabel: "Check eligibility",
        ctaHref: "/tools/eligibility-checker?destination=australia&purpose=study",
      },
      {
        title: "Skilled Migration",
        pathwayType: "permanent-residence",
        order: 2,
        summary: "Points-tested and employer-sponsored skilled options.",
        eligibility: ["Occupation lists", "Skills assessment", "Points / nomination"],
        processSteps: ["Occupation check", "Skills assessment", "EOI / nomination", "Visa"],
        ctaLabel: "Book consultation",
        ctaHref: "/tools/book-consultation?destination=australia",
      },
      {
        title: "Visitor Visa",
        pathwayType: "visitor",
        order: 3,
        summary: "Tourism and short family visits.",
        eligibility: ["Genuine visitor", "Funds", "Home ties"],
        processSteps: ["Purpose", "Evidence", "Apply"],
        ctaLabel: "Start visitor check",
        ctaHref: "/tools/eligibility-checker?destination=australia&purpose=visitor",
      },
    ],
    featuredTestimonials: [testimonialsSeed[2]],
    countryFaqs: [faqsSeed[0]],
    seoTitle: "Australia Immigration | Akshar Immigration",
    seoDescription: "Australia student and skilled migration guidance from Akshar Immigration.",
  },
  {
    _id: "c-usa",
    name: "United States",
    slug: "usa",
    tagline: "Study, work, and visit with structured support",
    overview: [
      block(
        "US pathways vary by intent — F-1 study, temporary work categories, and visitor visas. We help you choose the right category and prepare a coherent file.",
        "us1",
      ),
    ],
    pathways: [
      {
        title: "Student (F-1)",
        pathwayType: "study",
        order: 1,
        summary: "SEVIS / I-20 based study pathway with interview preparation.",
        eligibility: ["I-20", "Funds", "Non-immigrant intent evidence"],
        processSteps: ["Admission", "I-20 & SEVIS", "DS-160 & interview", "Travel"],
        ctaLabel: "Check eligibility",
        ctaHref: "/tools/eligibility-checker?destination=usa&purpose=study",
      },
      {
        title: "Temporary Work",
        pathwayType: "work",
        order: 2,
        summary: "Employer-led categories depending on role and nationality.",
        eligibility: ["Employer petition where required", "Category-specific criteria"],
        processSteps: ["Category map", "Petition / forms", "Consular steps"],
        ctaLabel: "Book consultation",
        ctaHref: "/tools/book-consultation?destination=usa&purpose=work",
      },
      {
        title: "Visitor (B-1/B-2)",
        pathwayType: "visitor",
        order: 3,
        summary: "Business and tourism visits with strong home ties.",
        eligibility: ["Purpose clarity", "Funds", "Ties"],
        processSteps: ["DS-160", "Evidence", "Interview"],
        ctaLabel: "Start visitor check",
        ctaHref: "/tools/eligibility-checker?destination=usa&purpose=visitor",
      },
    ],
    featuredTestimonials: [],
    countryFaqs: [faqsSeed[1]],
    seoTitle: "USA Visas | Akshar Immigration",
    seoDescription: "US student, work, and visitor visa guidance from Akshar Immigration.",
  },
  {
    _id: "c-schengen",
    name: "Schengen",
    slug: "schengen",
    tagline: "Europe’s short-stay corridor — six focus countries",
    overview: [
      block(
        "One Schengen short-stay strategy covering Italy, France, Germany, Spain, Belgium, and Switzerland. We help you pick the right consulate and assemble a consistent itinerary and funds trail.",
        "sch1",
      ),
    ],
    pathways: [
      {
        title: "Short-Stay Visitor",
        pathwayType: "visitor",
        order: 1,
        summary: "Tourism and family visits up to 90 days in any 180-day period.",
        eligibility: ["Itinerary", "Funds & insurance", "Ties & purpose"],
        processSteps: ["Main destination", "Appointment", "Biometrics", "Decision"],
        ctaLabel: "Check eligibility",
        ctaHref: "/tools/eligibility-checker?destination=schengen&purpose=visitor",
      },
      {
        title: "Business Visit",
        pathwayType: "business",
        order: 2,
        summary: "Meetings, conferences, and short commercial visits.",
        eligibility: ["Invitation / agenda", "Company letters", "Funds"],
        processSteps: ["Purpose letters", "File build", "Appointment"],
        ctaLabel: "Book consultation",
        ctaHref: "/tools/book-consultation?destination=schengen&purpose=business",
      },
    ],
    schengenSections: [
      {
        countryName: "Italy",
        summary: "Popular for tourism and family visits via Italian consulates.",
        highlights: ["Tourism", "Family visit", "Business meetings"],
      },
      {
        countryName: "France",
        summary: "Strong tourism demand; careful itinerary and hotel evidence help.",
        highlights: ["Tourism", "Short business", "Family"],
      },
      {
        countryName: "Germany",
        summary: "Business and tourism with clear invitation letters when applicable.",
        highlights: ["Business", "Tourism", "Trade fairs"],
      },
      {
        countryName: "Spain",
        summary: "Tourism-focused short stays with proof of accommodation.",
        highlights: ["Tourism", "Family", "Short courses"],
      },
      {
        countryName: "Belgium",
        summary: "Often used for family and institutional visits.",
        highlights: ["Family", "Business", "EU institutions"],
      },
      {
        countryName: "Switzerland",
        summary: "Tourism and business with higher cost-of-stay evidence expectations.",
        highlights: ["Tourism", "Business", "Conferences"],
      },
    ],
    featuredTestimonials: [],
    countryFaqs: [faqsSeed[0]],
    seoTitle: "Schengen Visa Guidance | Akshar Immigration",
    seoDescription:
      "Schengen short-stay guidance for Italy, France, Germany, Spain, Belgium, and Switzerland.",
  },
];

export const teamSeed: TeamMember[] = [
  {
    _id: "m1",
    name: "Akshay Sharma",
    role: "Director & Lead Consultant",
    bio: "Leads strategy across UK and Canada files with a focus on transparent advice.",
    office: "both",
    order: 1,
  },
  {
    _id: "m2",
    name: "Consultation Team",
    role: "Case Coordinators",
    bio: "Coordinate documents, timelines, and client updates across destinations.",
    office: "both",
    order: 2,
  },
];

export const blogSeed: BlogPost[] = [
  {
    _id: "b1",
    title: "How to choose between UK study and Canada study",
    slug: "uk-vs-canada-study",
    excerpt:
      "A practical comparison of costs, post-study work, and long-term stay options.",
    publishedAt: "2026-03-01T10:00:00.000Z",
    body: [
      block(
        "Both the UK and Canada offer strong study pathways. Your choice often depends on budget, post-study work goals, and whether permanent residence is a medium-term target.",
        "b1a",
      ),
      block(
        "Book a free consultation and we will map both options against your profile.",
        "b1b",
      ),
    ],
  },
  {
    _id: "b2",
    title: "What a strong visitor visa file looks like",
    slug: "strong-visitor-visa-file",
    excerpt: "Purpose, funds, and ties — and how they work together.",
    publishedAt: "2026-02-10T10:00:00.000Z",
    body: [
      block(
        "Visitor refusals often come from mixed signals: unclear purpose, weak funds trail, or missing home ties. We build a coherent story across all three.",
        "b2a",
      ),
    ],
  },
];
