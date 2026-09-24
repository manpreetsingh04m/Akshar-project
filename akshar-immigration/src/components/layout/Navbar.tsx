"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ChevronDown, Menu, Phone } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { destinationVisuals } from "@/lib/destinations";
import { cn } from "@/lib/utils";

const destinations = [
  {
    href: "/uk",
    slug: "uk",
    description: "Study, Skilled Worker, family & visits",
  },
  {
    href: "/canada",
    slug: "canada",
    description: "Express Entry, study, work & sponsorship",
  },
  {
    href: "/australia",
    slug: "australia",
    description: "Student and skilled migration",
  },
  {
    href: "/usa",
    slug: "usa",
    description: "F-1, temporary work & visitor",
  },
  {
    href: "/schengen",
    slug: "schengen",
    description: "Italy, France, Germany, Spain + more",
  },
] as const;

const companyLinks = [
  { href: "/about", label: "About" },
  { href: "/success-stories", label: "Stories" },
  { href: "/blog", label: "Blog" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

const toolLinks = [
  { href: "/tools/eligibility-checker", label: "Eligibility checker" },
  { href: "/tools/crs-calculator", label: "CRS calculator" },
  { href: "/tools/document-checklist", label: "Document checklist" },
  { href: "/tools/book-consultation", label: "Book consultation" },
];

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [destOpen, setDestOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const onHero = pathname === "/" && !scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setSheetOpen(false);
    setDestOpen(false);
    setToolsOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        onHero
          ? "border-b border-white/10 bg-ink/25 backdrop-blur-md"
          : "border-b border-ink/10 bg-parchment/95 shadow-[0_8px_30px_-18px_rgba(11,31,58,0.35)] backdrop-blur-md",
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 md:h-[4.25rem] md:px-6">
        <Link href="/" className="group shrink-0 leading-none">
          <span
            className={cn(
              "font-display text-2xl tracking-tight transition",
              onHero ? "text-parchment" : "text-ink",
            )}
          >
            Akshar
          </span>
          <span
            className={cn(
              "mt-0.5 block text-[10px] uppercase tracking-[0.24em] transition group-hover:text-gold",
              onHero ? "text-parchment/55" : "text-mist",
            )}
          >
            Immigration
          </span>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          <DropdownMenu open={destOpen} onOpenChange={setDestOpen}>
            <DropdownMenuTrigger
              className={cn(
                "inline-flex h-9 items-center gap-1 rounded-lg px-2.5 text-sm font-medium outline-none transition",
                onHero
                  ? "text-parchment/90 hover:bg-white/10 hover:text-gold data-popup-open:bg-white/10"
                  : "text-ink hover:bg-ink/5 data-popup-open:bg-ink/5",
              )}
            >
              Destinations
              <ChevronDown
                className={cn(
                  "size-3.5 transition",
                  destOpen && "rotate-180",
                )}
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="start"
              className="w-[min(92vw,34rem)] p-2"
            >
              <div className="grid gap-1 sm:grid-cols-2">
                {destinations.map((d) => {
                  const visual = destinationVisuals[d.slug];
                  return (
                    <DropdownMenuItem
                      key={d.href}
                      className="cursor-pointer p-0 focus:bg-transparent"
                    >
                      <Link
                        href={d.href}
                        onClick={() => setDestOpen(false)}
                        className="flex w-full gap-3 rounded-lg p-2 hover:bg-parchment-deep"
                      >
                        <span
                          className="mt-0.5 size-12 shrink-0 overflow-hidden rounded-md bg-cover bg-center ring-1 ring-ink/10"
                          style={{
                            backgroundImage: `url('${visual.image}')`,
                          }}
                        />
                        <span className="min-w-0">
                          <span className="block font-medium text-ink">
                            {visual.name}
                          </span>
                          <span className="mt-0.5 block text-xs leading-snug text-mist">
                            {d.description}
                          </span>
                        </span>
                      </Link>
                    </DropdownMenuItem>
                  );
                })}
              </div>
              <p className="mt-1 border-t border-ink/10 px-2 pt-2 text-xs text-mist">
                Also on request: New Zealand · Dubai (UAE)
              </p>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu open={toolsOpen} onOpenChange={setToolsOpen}>
            <DropdownMenuTrigger
              className={cn(
                "inline-flex h-9 items-center gap-1 rounded-lg px-2.5 text-sm font-medium outline-none transition",
                onHero
                  ? "text-parchment/90 hover:bg-white/10 hover:text-gold data-popup-open:bg-white/10"
                  : "text-ink hover:bg-ink/5 data-popup-open:bg-ink/5",
              )}
            >
              Tools
              <ChevronDown
                className={cn(
                  "size-3.5 transition",
                  toolsOpen && "rotate-180",
                )}
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="min-w-56 p-1">
              {toolLinks.map((t) => (
                <DropdownMenuItem
                  key={t.href}
                  className="cursor-pointer p-0 focus:bg-transparent"
                >
                  <Link
                    href={t.href}
                    onClick={() => setToolsOpen(false)}
                    className="block w-full rounded-md px-3 py-2 text-sm text-ink hover:bg-parchment-deep"
                  >
                    {t.label}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Separator
            orientation="vertical"
            className={cn(
              "mx-2 !h-5",
              onHero ? "bg-parchment/25" : "bg-ink/15",
            )}
          />

          <nav className="flex items-center gap-0.5">
            {companyLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={cn(
                  buttonVariants({ variant: "ghost", size: "sm" }),
                  "h-9 px-2.5 text-sm font-medium",
                  onHero
                    ? "text-parchment/75 hover:bg-white/10 hover:text-parchment"
                    : "text-mist hover:bg-ink/5 hover:text-ink",
                )}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <Link
            href="/free-consultation"
            className={cn(
              buttonVariants({ size: "lg" }),
              "ml-3 h-10 rounded-md px-4 font-semibold shadow-sm",
              onHero
                ? "bg-gold text-ink hover:bg-gold-hot"
                : "bg-ink text-parchment hover:bg-ink-soft",
            )}
          >
            <Phone className="size-3.5 opacity-80" />
            Free consultation
          </Link>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <Link
            href="/free-consultation"
            className={cn(
              buttonVariants({ size: "sm" }),
              "hidden h-8 rounded-md px-3 sm:inline-flex",
              onHero ? "bg-gold text-ink" : "bg-ink text-parchment",
            )}
          >
            Consult
          </Link>
          <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger
              render={
                <Button
                  variant="outline"
                  size="icon"
                  className={cn(
                    onHero
                      ? "border-parchment/30 bg-white/5 text-parchment hover:bg-white/15"
                      : "border-ink/15 bg-transparent text-ink",
                  )}
                />
              }
            >
              <Menu className="size-5" />
              <span className="sr-only">Open menu</span>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[min(100%,20rem)] border-ink/10 bg-parchment p-0"
            >
              <SheetHeader className="border-b border-ink/10 px-5 py-4 text-left">
                <SheetTitle className="font-display text-2xl text-ink">
                  Akshar
                </SheetTitle>
                <p className="text-[10px] uppercase tracking-[0.22em] text-mist">
                  Immigration
                </p>
              </SheetHeader>
              <div className="flex flex-1 flex-col gap-6 overflow-y-auto px-5 py-5">
                <div>
                  <p className="mb-2 text-xs uppercase tracking-[0.18em] text-gold">
                    Destinations
                  </p>
                  <div className="flex flex-col gap-1">
                    {destinations.map((d) => (
                      <Link
                        key={d.href}
                        href={d.href}
                        onClick={() => setSheetOpen(false)}
                        className="rounded-md px-2 py-2 text-sm font-medium text-ink hover:bg-parchment-deep"
                      >
                        {destinationVisuals[d.slug].name}
                      </Link>
                    ))}
                  </div>
                </div>
                <Separator />
                <div>
                  <p className="mb-2 text-xs uppercase tracking-[0.18em] text-gold">
                    Tools
                  </p>
                  <div className="flex flex-col gap-1">
                    {toolLinks.map((t) => (
                      <Link
                        key={t.href}
                        href={t.href}
                        onClick={() => setSheetOpen(false)}
                        className="rounded-md px-2 py-2 text-sm text-ink-soft hover:bg-parchment-deep"
                      >
                        {t.label}
                      </Link>
                    ))}
                  </div>
                </div>
                <Separator />
                <div className="flex flex-col gap-1">
                  {companyLinks.map((l) => (
                    <Link
                      key={l.href}
                      href={l.href}
                      onClick={() => setSheetOpen(false)}
                      className="rounded-md px-2 py-2 text-sm text-ink-soft hover:bg-parchment-deep"
                    >
                      {l.label}
                    </Link>
                  ))}
                </div>
                <Link
                  href="/free-consultation"
                  onClick={() => setSheetOpen(false)}
                  className={cn(
                    buttonVariants({ size: "lg" }),
                    "mt-auto h-11 w-full rounded-md bg-ink text-parchment",
                  )}
                >
                  Free consultation
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
