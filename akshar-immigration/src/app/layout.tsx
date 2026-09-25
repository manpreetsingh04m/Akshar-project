import type { Metadata } from "next";
import { Fraunces, Source_Sans_3, Geist_Mono } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { ChatWidget } from "@/components/shared/ChatWidget";
import { GoogleAnalytics } from "@/components/shared/GoogleAnalytics";
import { getSiteSettings } from "@/lib/sanity/fetch";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: settings.defaultSeoTitle || settings.siteName,
      template: `%s | ${settings.siteName}`,
    },
    description: settings.defaultSeoDescription || settings.tagline,
    openGraph: {
      type: "website",
      siteName: settings.siteName,
      title: settings.defaultSeoTitle || settings.siteName,
      description: settings.defaultSeoDescription,
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const settings = await getSiteSettings();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: settings.siteName,
    description: settings.tagline,
    url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
    telephone: settings.phoneUk,
    email: settings.email,
    areaServed: ["GB", "CA", "AU", "US", "EU"],
  };

  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${sourceSans.variable} ${geistMono.variable} h-full`}
    >
      <body className="flex min-h-full flex-col font-sans">
        <GoogleAnalytics />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Navbar />
        <div className="flex-1 pt-0">{children}</div>
        <Footer />
        <ChatWidget />
      </body>
    </html>
  );
}
