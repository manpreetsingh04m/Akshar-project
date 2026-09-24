import { defineField, defineType } from "sanity";

export const faq = defineType({
  name: "faq",
  title: "FAQ",
  type: "document",
  fields: [
    defineField({
      name: "question",
      title: "Question",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "answer",
      title: "Answer",
      type: "text",
      rows: 5,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "General", value: "general" },
          { title: "Process", value: "process" },
          { title: "Fees", value: "fees" },
          { title: "Documents", value: "documents" },
        ],
      },
      initialValue: "general",
    }),
    defineField({
      name: "relatedCountries",
      title: "Related Countries",
      type: "array",
      of: [{ type: "reference", to: [{ type: "country" }] }],
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      initialValue: 0,
    }),
    defineField({
      name: "showOnHomepage",
      title: "Show on homepage",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: {
    select: { title: "question", subtitle: "category" },
  },
});
