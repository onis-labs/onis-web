import SiteHeader from "./components/SiteHeader";
import ScrollHero from "./components/ScrollHero";
import TrustStrip from "./components/TrustStrip";
import OneTapStory from "./components/OneTapStory";
import BuildReduceTrack from "./components/BuildReduceTrack";
import MathSection from "./components/MathSection";
import ProductStory from "./components/ProductStory";
import WatchWidgets from "./components/WatchWidgets";
import PrivacySection from "./components/PrivacySection";
import Pricing from "./components/Pricing";
import Faq from "./components/Faq";
import SiteFooter from "./components/SiteFooter";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="main-content">
        <ScrollHero />
        <TrustStrip />
        <OneTapStory />
        <BuildReduceTrack />
        <MathSection />
        <ProductStory />
        <WatchWidgets />
        <PrivacySection />
        <Pricing />
        <Faq />
      </main>
      <SiteFooter />
    </>
  );
}
