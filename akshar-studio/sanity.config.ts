import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemaTypes";
import { structure } from "./structure";

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || "your-project-id";
const dataset = process.env.SANITY_STUDIO_DATASET || "production";

export default defineConfig({
  name: "akshar-studio",
  title: "Akshar Immigration",
  projectId,
  dataset,
  plugins: [structureTool({ structure }), visionTool()],
  schema: {
    types: schemaTypes,
  },
  document: {
    actions: (prev, { schemaType }) => {
      if (schemaType === "siteSettings") {
        return prev.filter(
          ({ action }) =>
            action !== "duplicate" &&
            action !== "delete" &&
            action !== "unpublish",
        );
      }
      return prev;
    },
  },
});
