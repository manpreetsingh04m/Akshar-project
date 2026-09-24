import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";
import { hasSanityConfig, sanityClient } from "./client";

const builder = hasSanityConfig && sanityClient ? imageUrlBuilder(sanityClient) : null;

export function urlForImage(source: SanityImageSource) {
  if (!builder) return null;
  return builder.image(source);
}
