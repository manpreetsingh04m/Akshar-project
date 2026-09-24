import { sanityClient, hasSanityConfig } from "./client";
import {
  ALL_BLOG_QUERY,
  ALL_COUNTRIES_QUERY,
  ALL_FAQS_QUERY,
  ALL_TEAM_QUERY,
  ALL_TESTIMONIALS_QUERY,
  BLOG_BY_SLUG_QUERY,
  COUNTRY_BY_SLUG_QUERY,
  FEATURED_TESTIMONIALS_QUERY,
  HOMEPAGE_FAQS_QUERY,
  SITE_SETTINGS_QUERY,
} from "./queries";
import {
  blogSeed,
  countriesSeed,
  faqsSeed,
  siteSettingsSeed,
  teamSeed,
  testimonialsSeed,
} from "./seed/content";
import type {
  BlogPost,
  Country,
  CountrySlug,
  FaqItem,
  SiteSettings,
  TeamMember,
  Testimonial,
} from "@/types";
import { COUNTRY_SLUGS } from "@/types";

async function fetchOrSeed<T>(
  query: string,
  params: Record<string, unknown>,
  seed: T,
): Promise<T> {
  if (!hasSanityConfig || !sanityClient) return seed;
  try {
    const data = await sanityClient.fetch<T | null>(query, params);
    return (data ?? seed) as T;
  } catch {
    return seed;
  }
}

export async function getSiteSettings(): Promise<SiteSettings> {
  return fetchOrSeed(SITE_SETTINGS_QUERY, {}, siteSettingsSeed);
}

export async function getCountryBySlug(slug: string): Promise<Country | null> {
  if (!COUNTRY_SLUGS.includes(slug as CountrySlug)) return null;
  const seed = countriesSeed.find((c) => c.slug === slug) ?? null;
  if (!hasSanityConfig || !sanityClient) return seed;
  try {
    const data = await sanityClient.fetch<Country | null>(COUNTRY_BY_SLUG_QUERY, {
      slug,
    });
    return data ?? seed;
  } catch {
    return seed;
  }
}

export async function getAllCountries() {
  const seed = countriesSeed.map(({ _id, name, slug, tagline }) => ({
    _id,
    name,
    slug,
    tagline,
  }));
  return fetchOrSeed(ALL_COUNTRIES_QUERY, {}, seed);
}

export async function getHomepageFaqs(): Promise<FaqItem[]> {
  const seed = faqsSeed.filter((f) => f.showOnHomepage);
  return fetchOrSeed(HOMEPAGE_FAQS_QUERY, {}, seed);
}

export async function getFeaturedTestimonials(): Promise<Testimonial[]> {
  const seed = testimonialsSeed.filter((t) => t.featured);
  return fetchOrSeed(FEATURED_TESTIMONIALS_QUERY, {}, seed);
}

export async function getAllFaqs(): Promise<FaqItem[]> {
  return fetchOrSeed(ALL_FAQS_QUERY, {}, faqsSeed);
}

export async function getAllTestimonials(): Promise<Testimonial[]> {
  return fetchOrSeed(ALL_TESTIMONIALS_QUERY, {}, testimonialsSeed);
}

export async function getTeam(): Promise<TeamMember[]> {
  return fetchOrSeed(ALL_TEAM_QUERY, {}, teamSeed);
}

export async function getAllBlogPosts() {
  const seed = blogSeed.map(({ _id, title, slug, excerpt, publishedAt }) => ({
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
  }));
  return fetchOrSeed(ALL_BLOG_QUERY, {}, seed);
}

export async function getBlogBySlug(slug: string): Promise<BlogPost | null> {
  const seed = blogSeed.find((b) => b.slug === slug) ?? null;
  if (!hasSanityConfig || !sanityClient) return seed;
  try {
    const data = await sanityClient.fetch<BlogPost | null>(BLOG_BY_SLUG_QUERY, {
      slug,
    });
    return data ?? seed;
  } catch {
    return seed;
  }
}
