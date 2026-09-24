import type { Metadata } from "next";
import { SuccessStoriesClient } from "@/components/home/SuccessStoriesClient";
import { getAllTestimonials } from "@/lib/sanity/fetch";

export const metadata: Metadata = {
  title: "Success Stories",
  description: "Client outcomes from Akshar Immigration Consultancy.",
};

export default async function SuccessStoriesPage() {
  const items = await getAllTestimonials();
  return <SuccessStoriesClient items={items} />;
}
