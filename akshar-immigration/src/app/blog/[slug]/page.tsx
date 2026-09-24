import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero, Reveal, SlideLink } from "@/components/shared/PageHero";
import { PortableText } from "@/components/shared/PortableText";
import { getBlogBySlug, getAllBlogPosts } from "@/lib/sanity/fetch";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const posts = await getAllBlogPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogBySlug(slug);
  if (!post) return { title: "Post not found" };
  return { title: post.title, description: post.excerpt };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getBlogBySlug(slug);
  if (!post) notFound();

  return (
    <main>
      <PageHero
        eyebrow={new Date(post.publishedAt).toLocaleDateString("en-GB", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
        title={post.title}
        description={post.excerpt}
        image="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=2000&q=80"
        compact
      />
      <article className="mx-auto max-w-3xl px-4 py-14 md:px-6">
        <Reveal>
          <div className="rounded-2xl border border-ink/10 bg-white/70 p-8 shadow-sm md:p-10">
            <PortableText value={post.body} />
          </div>
        </Reveal>
        <Reveal className="mt-10">
          <SlideLink href="/free-consultation" variant="ink">
            Discuss this with a consultant
          </SlideLink>
        </Reveal>
      </article>
    </main>
  );
}
