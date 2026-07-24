import type { CSSProperties } from "react";
import type { Metadata } from "next";
import LegalLayout, { H2, P, UL, LI } from "../components/LegalLayout";
import { colors } from "../lib/tokens";
import { site, requirements, legalUpdated } from "../lib/config";
import {
  foundingLifetimePrice,
  lifetimePrice,
  pricing,
  yearlyPrice,
} from "../lib/pricing";

export const metadata: Metadata = {
  title: "Support — ONIS",
  description:
    "Get help with ONIS: setup, Apple Watch, widgets, reminders, Premium Yearly, Lifetime, Restore Purchases, and data controls.",
};

// Callers: /support route. User: Update Support with Yearly vs Lifetime,
// Restore Purchases, Apple subscription management, refund guidance.
const linkStyle: CSSProperties = {
  color: colors.accent,
  textDecoration: "underline",
};

export default function SupportPage() {
  return (
    <LegalLayout title="Support" updated={legalUpdated}>
      <H2>Getting Started</H2>
      <P>ONIS is built around three directions:</P>
      <UL>
        <LI>
          <strong>Build</strong> — for a habit you want to do more of.
        </LI>
        <LI>
          <strong>Reduce</strong> — for a habit you want to keep under a
          limit.
        </LI>
        <LI>
          <strong>Understand</strong> — to simply notice a pattern, with no
          forced goal. (In the app this direction is labeled{" "}
          <strong>Track</strong>.)
        </LI>
      </UL>
      <P>
        When you first open ONIS, starter trackers are already set up so
        there&apos;s something to log right away. Free includes core Today
        logging with a limited tracker allowance. The app is organized into
        four tabs — Today, Trends, Coach, and You.
      </P>

      <H2>Apple Watch Setup</H2>
      <UL>
        <LI>
          Install the ONIS Watch app from the Watch app on your iPhone (My
          Watch → Available Apps), then open it on your wrist.
        </LI>
        <LI>Log a count with one tap (+1), or mark a tracker done.</LI>
        <LI>
          Start, pause, resume, and stop timers — the minutes are logged for
          you.
        </LI>
        <LI>
          Turn the Digital Crown or swipe to move between trackers.
        </LI>
        <LI>
          Your iPhone and Apple Watch sync directly with each other, so your
          counts match on both.
        </LI>
      </UL>

      <H2>Widget Setup</H2>
      <UL>
        <LI>
          Touch and hold your Home Screen, tap the + (or Edit) button, and
          search for ONIS to add a widget; Lock Screen widgets and Watch
          complications are added the same way from iOS and watchOS.
        </LI>
        <LI>
          Touch and hold the widget, then choose <strong>Edit Widget</strong>{" "}
          to pick which tracker it shows.
        </LI>
        <LI>
          Supported widgets include +1 and Done buttons, and arrows to
          switch trackers without opening the app. Timer actions open ONIS.
        </LI>
      </UL>

      <H2>Reminders</H2>
      <P>
        ONIS can send tracker reminders (daily or on chosen weekdays), timer
        completion alerts, a note when you reach a limit you set, and an
        optional Sunday weekly review. All reminders are optional, off by
        default, and managed in the app&apos;s notification settings.
      </P>

      <H2>Premium Preview</H2>
      <P>
        Eligible users may try Premium free for 7 days, then choose Yearly,
        Lifetime, or continue with Free. The preview does not automatically
        charge Lifetime. Start it from Trends or Coach when available in the
        app.
      </P>

      <H2>Premium Yearly</H2>
      <P>
        <strong>Premium Yearly — {yearlyPrice} per year</strong> is an
        auto-renewable subscription. Eligible customers may receive a
        seven-day introductory trial. {pricing.yearly.renewalDisclosure}{" "}
        Manage or cancel in{" "}
        <strong>Settings → Apple&nbsp;ID → Subscriptions</strong> on your
        Apple device.
      </P>

      <H2>ONIS Lifetime</H2>
      <P>
        <strong>ONIS Lifetime — {lifetimePrice} once</strong> unlocks
        Premium permanently: one payment, no subscription, no renewal. Apple
        confirms the localized price at purchase. Lifetime does not
        automatically charge after the Premium preview.
      </P>

      <H2>Founding Lifetime Offer</H2>
      <P>
        Some eligible users may see a limited founding offer (for example,{" "}
        {foundingLifetimePrice} once). It only appears when Apple can honor a
        real StoreKit-backed offer. It is not a public plan on this website.
      </P>

      <H2>Restore Purchases</H2>
      <P>
        Bought Premium on another device, or reinstalled ONIS? Use{" "}
        <strong>Restore Purchases</strong> in the app — purchases stay with
        your Apple&nbsp;ID.
      </P>

      <H2>Refunds</H2>
      <P>
        App Store purchases are handled by Apple. To request a refund, use
        Apple&apos;s purchase history / report-a-problem flow for your
        Apple&nbsp;ID. ONIS Labs cannot process App Store refunds on this
        website.
      </P>

      <H2>Continue with Free</H2>
      <P>
        Free remains fully usable. After a Premium preview ends, ONIS
        returns to Free unless you choose Yearly or Lifetime.
      </P>

      <H2>Export &amp; Data Controls</H2>
      <P>ONIS gives you direct control over your data from within the app:</P>
      <UL>
        <LI>
          <strong>Export My Data</strong> — creates a copy of your ONIS data
          (JSON and CSV) that you can save.
        </LI>
        <LI>
          <strong>Clear Log History</strong> — clears your logged history
          while keeping your trackers.
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

      <H2>Troubleshooting: Watch Sync</H2>
      <UL>
        <LI>Open ONIS on both iPhone and Apple Watch to nudge a sync.</LI>
        <LI>
          Check that Bluetooth is on and the Watch is paired and nearby.
        </LI>
        <LI>
          Log once from the Watch — pending entries transfer as soon as the
          devices reconnect; nothing is lost while offline.
        </LI>
        <LI>If it still lags, restart both devices.</LI>
      </UL>

      <H2>Troubleshooting: Widgets</H2>
      <UL>
        <LI>
          If a widget looks out of date, open ONIS once — widgets refresh
          from the app&apos;s shared data.
        </LI>
        <LI>
          If a widget shows the wrong tracker, touch and hold it, choose{" "}
          <strong>Edit Widget</strong>, and pick the tracker again.
        </LI>
        <LI>
          After an iOS update or reinstall, remove and re-add the widget if
          it doesn&apos;t appear in the gallery.
        </LI>
      </UL>

      <H2>Requirements</H2>
      <P>
        ONIS requires {requirements.ios}. The Apple Watch app is optional
        and requires {requirements.watchos}.
      </P>

      <H2>Privacy &amp; Terms</H2>
      <P>
        See our <a href="/privacy" style={linkStyle}>Privacy Policy</a> and{" "}
        <a href="/terms" style={linkStyle}>
          Terms of Use
        </a>
        .
      </P>

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
