import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Site Settings")
        .id("siteSettings")
        .child(
          S.document()
            .schemaType("siteSettings")
            .documentId("siteSettings")
            .title("Site Settings"),
        ),
      S.divider(),
      S.documentTypeListItem("country").title("Countries"),
      S.documentTypeListItem("testimonial").title("Testimonials"),
      S.documentTypeListItem("faq").title("FAQs"),
      S.documentTypeListItem("blogPost").title("Blog Posts"),
      S.documentTypeListItem("teamMember").title("Team Members"),
      S.documentTypeListItem("documentChecklist").title("Document Checklists"),
    ]);
