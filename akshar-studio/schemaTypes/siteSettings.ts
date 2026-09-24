import { defineArrayMember, defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "siteName",
      title: "Site Name",
      type: "string",
      validation: (Rule) => Rule.required(),
      initialValue: "Akshar Immigration Consultancy",
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
    }),
    defineField({
      name: "whatsappNumber",
      title: "WhatsApp Number",
      type: "string",
      description: "E.164 format, e.g. +447918036171",
      validation: (Rule) => Rule.required(),
      initialValue: "+447918036171",
    }),
    defineField({
      name: "phoneUk",
      title: "UK Phone",
      type: "string",
    }),
    defineField({
      name: "phoneCanada",
      title: "Canada Phone",
      type: "string",
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      validation: (Rule) => Rule.email(),
    }),
    defineField({
      name: "addressUk",
      title: "UK Address",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "addressCanada",
      title: "Canada Address",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "mentionOnlyDestinations",
      title: "Mention-only Destinations",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "name", type: "string", title: "Name" }),
            defineField({ name: "note", type: "string", title: "Note" }),
          ],
        }),
      ],
      initialValue: [
        { name: "New Zealand", note: "Available on request" },
        { name: "Dubai (UAE)", note: "Available on request" },
      ],
    }),
    defineField({
      name: "defaultSeoTitle",
      title: "Default SEO Title",
      type: "string",
    }),
    defineField({
      name: "defaultSeoDescription",
      title: "Default SEO Description",
      type: "text",
      rows: 3,
    }),
  ],
});
