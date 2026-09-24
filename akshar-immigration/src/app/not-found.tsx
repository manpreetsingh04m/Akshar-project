import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-start justify-center px-4 py-20 md:px-6">
      <p className="text-xs uppercase tracking-[0.25em] text-gold">404</p>
      <h1 className="mt-3 font-display text-4xl">Page not found</h1>
      <p className="mt-4 text-ink-soft">
        That route does not exist. Try a destination page or head home.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-sm bg-ink px-5 py-3 text-sm text-parchment hover:bg-ink-soft"
      >
        Back home
      </Link>
    </main>
  );
}
