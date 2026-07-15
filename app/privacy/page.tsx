import type { CSSProperties } from "react";
import type { Metadata } from "next";
import LegalLayout, { H2, P, UL, LI } from "../components/LegalLayout";
import { colors } from "../lib/tokens";
import { site, legalUpdated } from "../lib/config";

export const metadata: Metadata = {
  title: "Privacy Policy — ONIS",
  description:
    "How ONIS handles your data: local-first, no ONIS account, no analytics on your habit history.",
};

// Copy verified 2026-07-15 against the iOS source
// (FreeTier/SubscriptionManager/PrivacyView/ONIS.storekit).
const linkStyle: CSSProperties = {
  color: colors.accent,
  textDecoration: "underline",
};

export default function PrivacyPage() {
  return (
    <LegalLayout title="Privacy Policy" updated={legalUpdated}>
      <H2>Summary</H2>
      <P>
        ONIS does not have an account system — there is nothing to sign up
        for. Your habit data is stored locally, on your device. ONIS has no
        ads, and your habit history is never analyzed or shared.
      </P>

      <H2>What&apos;s Stored, and Where</H2>
      <UL>
        <LI>
          Your trackers and logged history are stored locally in the ONIS
          app, on your device.
        </LI>
        <LI>
          If you use widgets or the Apple Watch app, ONIS keeps a local copy
          of the data they need in a shared App Group container on your
          device, so widgets and the Watch app can stay in sync with your
          iPhone.
        </LI>
        <LI>
          Your iPhone and Apple Watch sync directly with each other using
          Apple&apos;s WatchConnectivity framework — not through a ONIS
          server.
        </LI>
        <LI>
          If you turn on reminders, ONIS schedules local notifications on
          your device.
        </LI>
        <LI>
          ONIS does not have a developer server or account system. No copy
          of your data is sent to us.
        </LI>
      </UL>

      <H2>Purchases</H2>
      <P>
        ONIS Premium purchases are handled entirely by Apple through
        StoreKit, Apple&apos;s in-app purchase system. ONIS never sees or
        stores your payment details. Subscriptions are billed and managed by
        Apple through your Apple ID. See{" "}
        <a href="/terms" style={linkStyle}>
          Terms of Use
        </a>{" "}
        for details on ONIS Premium.
      </P>

      <H2>Backups</H2>
      <P>
        If you have iCloud Backup or device backups turned on, Apple&apos;s
        backup system may include ONIS app data as part of your normal
        device backup, the same as any other app. This is controlled by your
        device&apos;s backup settings, not by ONIS.
      </P>

      <H2>Apple Health</H2>
      <P>ONIS does not connect to Apple Health.</P>

      <H2>Your Controls</H2>
      <P>
        ONIS gives you direct control over your data from within the app:
      </P>
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
      <P>
        Deleting your data does not cancel a subscription. To manage or
        cancel a subscription, or to restore a previous purchase, use Manage
        Subscription or Restore Purchases — both are handled by Apple
        through your Apple ID.
      </P>
      <P>
        For step-by-step help with these controls, visit{" "}
        <a href="/support" style={linkStyle}>
          Support
        </a>
        .
      </P>

      <H2>This Website</H2>
      <P>
        This website ({site.domain}) does not use cookies, analytics,
        advertising, or tracking scripts, and has no forms that collect
        personal information. Our hosting provider may keep ordinary server
        request logs (such as IP address and request time) for security and
        reliability, as with any website.
      </P>

      <H2>Contact</H2>
      <P>
        Questions about this policy? Email{" "}
        <a href={`mailto:${site.supportEmail}`} style={linkStyle}>
          {site.supportEmail}
        </a>
        .
      </P>
    </LegalLayout>
  );
}
