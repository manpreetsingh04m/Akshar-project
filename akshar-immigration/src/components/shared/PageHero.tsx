"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description?: string;
  image: string;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  compact?: boolean;
};

export function PageHero({
  eyebrow,
  title,
  description,
  image,
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
  compact,
}: PageHeroProps) {
  return (
    <section
      className={cn(
        "relative overflow-hidden text-parchment",
        compact ? "min-h-[42vh]" : "min-h-[52vh] md:min-h-[58vh]",
      )}
    >
      <Image
        src={image}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#061018]/94 via-[#0B1F3A]/75 to-[#0B1F3A]/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-ink/20" />
      <div className="relative mx-auto flex max-w-6xl flex-col justify-end px-4 pb-12 pt-28 md:px-6 md:pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs uppercase tracking-[0.25em] text-gold">{eyebrow}</p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl leading-tight md:text-6xl">
            {title}
          </h1>
          {description ? (
            <p className="mt-4 max-w-2xl text-base text-parchment/75 md:text-lg">
              {description}
            </p>
          ) : null}
          {(primaryHref || secondaryHref) && (
            <div className="mt-8 flex flex-wrap gap-3">
              {primaryHref && primaryLabel ? (
                <SlideLink href={primaryHref} variant="gold">
                  {primaryLabel}
                </SlideLink>
              ) : null}
              {secondaryHref && secondaryLabel ? (
                <SlideLink href={secondaryHref} variant="ghost">
                  {secondaryLabel}
                </SlideLink>
              ) : null}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}

export function SlideLink({
  href,
  children,
  variant = "gold",
  className,
}: {
  href: string;
  children: React.ReactNode;
  variant?: "gold" | "ink" | "ghost";
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex w-full items-center overflow-hidden rounded-full py-2 pl-6 pr-2 text-sm font-semibold transition sm:w-auto",
        variant === "gold" &&
          "bg-gold text-ink shadow-[0_14px_40px_-16px_rgba(196,163,90,0.85)] hover:bg-gold-hot",
        variant === "ink" && "bg-ink text-parchment hover:bg-ink-soft",
        variant === "ghost" &&
          "border border-parchment/35 bg-white/5 text-parchment backdrop-blur-sm hover:border-gold hover:text-gold",
        className,
      )}
    >
      <span>{children}</span>
      <span className="arrow-track" aria-hidden />
      <span
        className={cn(
          "flex size-8 shrink-0 items-center justify-center rounded-full",
          variant === "ghost" ? "bg-white/10" : "bg-black/10",
        )}
      >
        <ArrowRight className="size-3.5" />
      </span>
    </Link>
  );
}

export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
