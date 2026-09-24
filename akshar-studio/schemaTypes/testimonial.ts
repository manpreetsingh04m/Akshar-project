import { defineField, defineType } from "sanity";

export const testimonial = defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    defineField({
      name: "clientName",
      title: "Client Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "quote",
      title: "Quote",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "outcome",
      title: "Outcome",
      type: "string",
      description: "e.g. UK Skilled Worker Visa approved",
    }),
    defineField({
      name: "photo",
      title: "Photo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "relatedCountries",
      title: "Related Countries",
      type: "array",
      of: [{ type: "reference", to: [{ type: "country" }] }],
      validation: (Rule) => Rule.min(1),
    }),
    defineField({
      name: "featured",
      title: "Featured on homepage",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: {
    select: { title: "clientName", subtitle: "outcome" },
  },
});
