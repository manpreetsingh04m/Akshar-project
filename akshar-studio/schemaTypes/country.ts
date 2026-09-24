import { defineArrayMember, defineField, defineType } from "sanity";
import { PATHWAY_TYPES } from "./pathwayTypes";

export const country = defineType({
  name: "country",
  title: "Country",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name", maxLength: 64 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "heroImage",
      title: "Hero Image",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          type: "string",
          title: "Alt text",
        }),
      ],
    }),
    defineField({
      name: "overview",
      title: "Overview",
      type: "array",
      of: [defineArrayMember({ type: "block" })],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "pathways",
      title: "Pathways",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "pathway",
          title: "Pathway",
          fields: [
            defineField({
              name: "title",
              title: "Title",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "pathwayType",
              title: "Pathway Type",
              type: "string",
              options: { list: [...PATHWAY_TYPES] },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "order",
              title: "Order",
              type: "number",
              validation: (Rule) => Rule.required().integer().min(0),
            }),
            defineField({
              name: "summary",
              title: "Summary",
              type: "text",
              rows: 3,
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "eligibility",
              title: "Eligibility Highlights",
              type: "array",
              of: [defineArrayMember({ type: "string" })],
            }),
            defineField({
              name: "processSteps",
              title: "Process Steps",
              type: "array",
              of: [defineArrayMember({ type: "string" })],
            }),
            defineField({
              name: "body",
              title: "Full Content",
              type: "array",
              of: [defineArrayMember({ type: "block" })],
            }),
            defineField({
              name: "ctaLabel",
              title: "CTA Label",
              type: "string",
            }),
            defineField({
              name: "ctaHref",
              title: "CTA Link",
              type: "string",
              description:
                "Relative path, e.g. /tools/eligibility-checker?destination=canada&purpose=permanent-residence",
            }),
          ],
          preview: {
            select: { title: "title", subtitle: "pathwayType", order: "order" },
            prepare: ({ title, subtitle, order }) => ({
              title: `${order ?? "?"}. ${title}`,
              subtitle,
            }),
          },
        }),
      ],
      validation: (Rule) => Rule.min(1),
    }),
    defineField({
      name: "schengenSections",
      title: "Schengen Country Sections",
      type: "array",
      description: "Only used on the Schengen page",
      of: [
        defineArrayMember({
          type: "object",
          name: "schengenSection",
          fields: [
            defineField({
              name: "countryName",
              title: "Country Name",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "summary",
              title: "Summary",
              type: "text",
              rows: 3,
            }),
            defineField({
              name: "highlights",
              title: "Highlights",
              type: "array",
              of: [defineArrayMember({ type: "string" })],
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "featuredTestimonials",
      title: "Featured Testimonials",
      type: "array",
      of: [
        defineArrayMember({
          type: "reference",
          to: [{ type: "testimonial" }],
        }),
      ],
    }),
    defineField({
      name: "countryFaqs",
      title: "Country FAQs",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: [{ type: "faq" }] })],
    }),
    defineField({
      name: "seoTitle",
      title: "SEO Title",
      type: "string",
    }),
    defineField({
      name: "seoDescription",
      title: "SEO Description",
      type: "text",
      rows: 3,
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "slug.current" },
  },
});
