import Hero from "@/components/angel/Hero";
import DestinationIntro from "@/components/angel/DestinationIntro";
import ValueSection from "@/components/angel/ValueSection";
import DestinationGrid from "@/components/angel/DestinationGrid";
import JourneyGraph from "@/components/angel/JourneyGraph";
import HowItWorks from "@/components/angel/HowItWorks";
import QuoteBand from "@/components/angel/QuoteBand";
import Cycle from "@/components/angel/Cycle";
import { BecomeAngel, FinalCTA } from "@/components/angel/CTABands";
import FAQ from "@/components/angel/FAQ";

export default function AngelsPage() {
  return (
    <main>
      <Hero />
      <DestinationIntro />
      <ValueSection />
      <DestinationGrid />
      <JourneyGraph />
      <HowItWorks />
      <QuoteBand />
      <Cycle />
      <BecomeAngel />
      <FAQ />
      <FinalCTA />
    </main>
  );
}
