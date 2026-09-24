export const COUNTRY_BY_SLUG_QUERY = `*[_type == "country" && slug.current == $slug][0]{
  _id,
  name,
  "slug": slug.current,
  tagline,
  overview,
  pathways[]{
    title,
    pathwayType,
    order,
    summary,
    eligibility,
    processSteps,
    body,
    ctaLabel,
    ctaHref
  },
  schengenSections[]{
    countryName,
    summary,
    highlights
  },
  featuredTestimonials[]->{
    _id,
    clientName,
    quote,
    outcome
  },
  countryFaqs[]->{
    _id,
    question,
    answer,
    category,
    order
  },
  seoTitle,
  seoDescription
}`;

export const ALL_COUNTRIES_QUERY = `*[_type == "country"]|order(name asc){
  _id,
  name,
  "slug": slug.current,
  tagline
}`;

export const HOMEPAGE_FAQS_QUERY = `*[_type == "faq" && showOnHomepage == true]|order(order asc){
  _id,
  question,
  answer,
  category,
  order
}`;

export const FEATURED_TESTIMONIALS_QUERY = `*[_type == "testimonial" && featured == true][0...6]{
  _id,
  clientName,
  quote,
  outcome
}`;

export const SITE_SETTINGS_QUERY = `*[_type == "siteSettings"][0]{
  siteName,
  tagline,
  whatsappNumber,
  phoneUk,
  phoneCanada,
  email,
  addressUk,
  addressCanada,
  mentionOnlyDestinations,
  defaultSeoTitle,
  defaultSeoDescription
}`;

export const ALL_FAQS_QUERY = `*[_type == "faq"]|order(order asc){
  _id,
  question,
  answer,
  category,
  order
}`;

export const ALL_TESTIMONIALS_QUERY = `*[_type == "testimonial"]{
  _id,
  clientName,
  quote,
  outcome
}`;

export const ALL_TEAM_QUERY = `*[_type == "teamMember"]|order(order asc){
  _id,
  name,
  role,
  bio,
  office,
  order
}`;

export const ALL_BLOG_QUERY = `*[_type == "blogPost"]|order(publishedAt desc){
  _id,
  title,
  "slug": slug.current,
  excerpt,
  publishedAt
}`;

export const BLOG_BY_SLUG_QUERY = `*[_type == "blogPost" && slug.current == $slug][0]{
  _id,
  title,
  "slug": slug.current,
  excerpt,
  publishedAt,
  body,
  seoTitle,
  seoDescription
}`;

export const CHECKLIST_QUERY = `*[_type == "documentChecklist" && country->slug.current == $country && visaType == $visaType][0]{
  _id,
  title,
  "countrySlug": country->slug.current,
  visaType,
  items[]{ label, description, required }
}`;
