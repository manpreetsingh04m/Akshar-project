import { defineArrayMember, defineField, defineType } from "sanity";
import { PATHWAY_TYPES } from "./pathwayTypes";

export const documentChecklist = defineType({
  name: "documentChecklist",
  title: "Document Checklist",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "country",
      title: "Country",
      type: "reference",
      to: [{ type: "country" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "visaType",
      title: "Visa / Pathway Type",
      type: "string",
      options: { list: [...PATHWAY_TYPES] },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "items",
      title: "Checklist Items",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "checklistItem",
          fields: [
            defineField({
              name: "label",
              title: "Document Name",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "description",
              title: "Notes",
              type: "text",
              rows: 2,
            }),
            defineField({
              name: "required",
              title: "Required",
              type: "boolean",
              initialValue: true,
            }),
          ],
          preview: {
            select: { title: "label", subtitle: "required" },
            prepare: ({ title, subtitle }) => ({
              title,
              subtitle: subtitle ? "Required" : "Optional",
            }),
          },
        }),
      ],
      validation: (Rule) => Rule.min(1),
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "visaType" },
  },
});
