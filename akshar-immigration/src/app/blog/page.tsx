import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, Reveal } from "@/components/shared/PageHero";
import { getAllBlogPosts } from "@/lib/sanity/fetch";

export const metadata: Metadata = {
  title: "Blog",
  description: "Immigration insights from Akshar Immigration Consultancy.",
};

export default async function BlogPage() {
  const posts = await getAllBlogPosts();
  return (
    <main>
      <PageHero
        eyebrow="Insights"
        title="Immigration blog"
        description="Practical notes on pathways, documents, and destination decisions."
        image="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=2000&q=80"
        compact
      />
      <section className="mx-auto max-w-6xl px-4 py-16 md:px-6">
        <ul className="grid gap-5 md:grid-cols-2">
          {posts.map((p, i) => (
            <Reveal key={p._id} delay={i * 0.06}>
              <li>
                <Link
                  href={`/blog/${p.slug}`}
                  className="group block h-full rounded-2xl border border-ink/10 bg-white/70 p-7 shadow-sm transition hover:-translate-y-1 hover:border-gold/40 hover:shadow-md"
                >
                  <p className="text-xs text-mist">
                    {new Date(p.publishedAt).toLocaleDateString("en-GB", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                  <h2 className="mt-3 font-display text-2xl text-ink transition group-hover:text-ink-soft">
                    {p.title}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-ink-soft">{p.excerpt}</p>
                  <span className="mt-5 inline-flex text-xs uppercase tracking-[0.18em] text-gold transition group-hover:gap-2">
                    Read article →
                  </span>
                </Link>
              </li>
            </Reveal>
          ))}
        </ul>
      </section>
    </main>
  );
}
