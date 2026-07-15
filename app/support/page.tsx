import type { CSSProperties } from "react";
import type { Metadata } from "next";
import LegalLayout, { H2, P, UL, LI } from "../components/LegalLayout";
import { colors } from "../lib/tokens";
import { site, requirements, legalUpdated } from "../lib/config";

export const metadata: Metadata = {
  title: "Support — ONIS",
  description:
    "Get help with ONIS: setup, Premium, Apple Watch, widgets, privacy, and data controls.",
};

// Facts below come from the product brief, not the iOS source (unavailable
// to verify against here). Anything naming a specific in-app control, tab,
// or step is flagged for a final Release-build check before launch.
const linkStyle: CSSProperties = {
  color: colors.accent,
  textDecoration: "underline",
};

export default function SupportPage() {
  return (
    <LegalLayout title="Support" updated={legalUpdated}>
      <H2>Getting Started</H2>
      <P>ONIS is built around three simple intentions:</P>
      <UL>
        <LI>
          <strong>Build</strong> — for a habit you want to do more of.
        </LI>
        <LI>
          <strong>Reduce</strong> — for a habit you want to keep under a
          target.
        </LI>
        <LI>
          <strong>Track</strong> — to simply notice a pattern, with no
          forced goal.
        </LI>
      </UL>
      {/* VERIFY against Release build before launch */}
      <P>
        When you first open ONIS, you&apos;ll have a main tracker plus a set
        of starter trackers already set up, so there&apos;s something to log
        right away.
      </P>
      {/* VERIFY against Release build before launch */}
      <P>
        The app is organized into four tabs — Today, Trends, Coach, and You.
      </P>
      {/* VERIFY against Release build before launch */}

      <H2>Free vs Premium</H2>
      <P>
        ONIS is free to download, with core tracking included at no cost.
        ONIS Premium unlocks additional functionality and is available as:
      </P>
      <UL>
        <LI>
          <strong>Premium — Weekly</strong> — an auto-renewable
          subscription, billed weekly.
        </LI>
        <LI>
          <strong>Premium — Yearly</strong> — an auto-renewable
          subscription, billed yearly.
        </LI>
        <LI>
          <strong>Lifetime</strong> — a one-time purchase, with no recurring
          billing.
        </LI>
      </UL>
      {/* VERIFY against Release build before launch */}
      <P>
        An introductory trial is available to eligible customers on Weekly
        and Yearly. Lifetime is a one-time purchase with no trial. Apple
        determines eligibility and confirms it at purchase.
      </P>
      <P>
        Already purchased Premium on another device? Use{" "}
        <strong>Restore Purchases</strong>. To manage or cancel a
        subscription, use <strong>Manage Subscription</strong>, which opens
        your Apple ID subscription settings. You can also choose{" "}
        <strong>Continue with Free</strong> at any time to keep using ONIS
        without Premium.
      </P>
      {/* VERIFY against Release build before launch */}

      <H2>Apple Watch</H2>
      <UL>
        <LI>Log with one tap directly from your wrist.</LI>
        <LI>
          Turn the <strong>Digital Crown</strong> to switch between trackers
          on your watch.
        </LI>
        <LI>Start a timer on your watch and it stays in sync with iPhone.</LI>
        <LI>
          Your iPhone and Apple Watch sync directly with each other, so your
          counts match on both.
        </LI>
      </UL>
      {/* VERIFY against Release build before launch */}

      <H2>Widgets &amp; Complications</H2>
      <P>
        Add ONIS widgets to your Home Screen or Lock Screen, or a
        complication to your watch face, to see and log your trackers at a
        glance.
      </P>
      {/* VERIFY against Release build before launch */}

      <H2>Daily &amp; Weekly Goals</H2>
      <P>
        Set a daily or weekly goal for a tracker, and ONIS shows your
        progress toward it.
      </P>
      {/* VERIFY against Release build before launch */}

      <H2>Timers</H2>
      <P>
        Some trackers support timers, including background timers that keep
        running if you leave the app.
      </P>
      {/* VERIFY against Release build before launch */}

      <H2>Data &amp; Privacy Controls</H2>
      <P>ONIS gives you direct control over your data from within the app:</P>
      <UL>
        <LI>
          <strong>Export My Data</strong> — creates a copy of your ONIS data
          that you can save.
        </LI>
        <LI>
          <strong>Clear Log History</strong> — clears your logged history.
        </LI>
        <LI>
          <strong>Start Over</strong> — resets your ONIS data so you can
          start fresh.
        </LI>
        <LI>
          <strong>Delete All ONIS Data</strong> — permanently deletes your
          ONIS data from this device, including the copy shared with a
          paired Apple Watch.
        </LI>
      </UL>
      {/* VERIFY against Release build before launch */}
      <P>
        See our <a href="/privacy" style={linkStyle}>Privacy Policy</a> for
        more on how your data is handled, and our{" "}
        <a href="/terms" style={linkStyle}>
          Terms of Use
        </a>{" "}
        for details on Premium billing.
      </P>

      <H2>Requirements</H2>
      <P>
        ONIS requires {requirements.ios}. The Apple Watch app requires{" "}
        {requirements.watchos}.
      </P>
      {/* VERIFY against Release build before launch */}

      <H2>Contact</H2>
      <P>
        Can&apos;t find what you need? Email{" "}
        <a href={`mailto:${site.supportEmail}`} style={linkStyle}>
          {site.supportEmail}
        </a>
        . We respond within 48 hours, and a real person reads every message.
      </P>
    </LegalLayout>
  );
}
