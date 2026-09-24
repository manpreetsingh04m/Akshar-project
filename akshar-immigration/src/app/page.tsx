import {
  DestinationTiles,
} from "@/components/home/DestinationTiles";
import { FinalCta } from "@/components/home/FinalCta";
import { HomeFaq } from "@/components/home/HomeFaq";
import { HomeHero } from "@/components/home/HomeHero";
import { HowItWorks } from "@/components/home/HowItWorks";
import { SocialProof } from "@/components/home/SocialProof";
import { TrustStrip } from "@/components/home/TrustStrip";
import { ImpactNumbers } from "@/components/home/ImpactNumbers";
import { WhyAkshar } from "@/components/home/WhyAkshar";
import {
  getFeaturedTestimonials,
  getHomepageFaqs,
} from "@/lib/sanity/fetch";

export default async function HomePage() {
  const [faqs, testimonials] = await Promise.all([
    getHomepageFaqs(),
    getFeaturedTestimonials(),
  ]);

  return (
    <main>
      <HomeHero />
      <DestinationTiles />
      <TrustStrip />
      <HowItWorks />
      <WhyAkshar />
      <ImpactNumbers />
      <SocialProof items={testimonials} />
      <HomeFaq items={faqs} />
      <FinalCta />
    </main>
  );
}
