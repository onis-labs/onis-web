import ScrollHero from "./components/ScrollHero";
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
      <MathSection />
      <BiggerPicture />
      <DifferenceSection />
      <FeaturesSection />
      <PrivacySection />
      <ClosingCTA />
    </main>
  );
}
