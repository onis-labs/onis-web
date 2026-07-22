import SiteHeader from "./components/SiteHeader";
import HeroSection from "./components/HeroSection";
import ProblemSection from "./components/ProblemSection";
import WatchSection from "./components/WatchSection";
import WidgetsSection from "./components/WidgetsSection";
import ModesSection from "./components/ModesSection";
import { TrendsSection, CoachSection } from "./components/InsightSections";
import RemindersSection from "./components/RemindersSection";
import Pricing from "./components/Pricing";
import PrivacySection from "./components/PrivacySection";
import Faq from "./components/Faq";
import SiteFooter from "./components/SiteFooter";

// Homepage — the final launch structure, in the approved order:
// hero → problem → Apple Watch → widgets → Build/Reduce/Understand →
// Trends → Coach → reminders → pricing → privacy → FAQ.
export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="main-content">
        <HeroSection />
        <ProblemSection />
        <WatchSection />
        <WidgetsSection />
        <ModesSection />
        <TrendsSection />
        <CoachSection />
        <RemindersSection />
        <Pricing />
        <PrivacySection />
        <Faq />
      </main>
      <SiteFooter />
    </>
  );
}
