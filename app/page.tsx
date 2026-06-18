import ScrollHero from "./components/ScrollHero";
import WhatItIs from "./components/WhatItIs";
import WhoItsFor from "./components/WhoItsFor";
import HowItWorks from "./components/HowItWorks";
import MathSection from "./components/MathSection";
import BiggerPicture from "./components/BiggerPicture";
import DifferenceSection from "./components/DifferenceSection";
import FeaturesSection from "./components/FeaturesSection";
import PrivacySection from "./components/PrivacySection";
import ClosingCTA from "./components/ClosingCTA";

export default function Home() {
  return (
    <main style={{ background: "#F4F0E6" }}>
      <ScrollHero />
      <WhatItIs />
      <WhoItsFor />
      <HowItWorks />
      <MathSection />
      <BiggerPicture />
      <DifferenceSection />
      <FeaturesSection />
      <PrivacySection />
      <ClosingCTA />
    </main>
  );
}
