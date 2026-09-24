import type { PortableTextBlock } from "@/types";

export function PortableText({ value }: { value?: PortableTextBlock[] }) {
  if (!value?.length) return null;
  return (
    <div className="space-y-4 text-ink-soft leading-relaxed">
      {value.map((block) => (
        <p key={block._key}>
          {block.children?.map((span) => span.text).join("")}
        </p>
      ))}
    </div>
  );
}
