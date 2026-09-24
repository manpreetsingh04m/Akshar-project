import { createClient } from "next-sanity";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const apiVersion = "2025-01-01";

export const hasSanityConfig = Boolean(projectId && projectId !== "your-project-id");

export const sanityClient = hasSanityConfig
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: true,
      token: process.env.SANITY_API_TOKEN,
    })
  : null;
