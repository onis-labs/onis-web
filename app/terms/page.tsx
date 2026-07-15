import type { CSSProperties } from "react";
import type { Metadata } from "next";
import LegalLayout, { H2, P, UL, LI } from "../components/LegalLayout";
import { colors } from "../lib/tokens";
import { site, legalUpdated } from "../lib/config";

export const metadata: Metadata = {
  title: "Terms of Use — ONIS",
  description: "Terms of Use for the ONIS habit tracker by ONIS Labs.",
};

// Copy verified 2026-07-15 against the iOS source
// (FreeTier/SubscriptionManager/PrivacyView/ONIS.storekit). Prices are never
// hardcoded — Apple shows the price at the time of purchase.
const linkStyle: CSSProperties = {
  color: colors.accent,
  textDecoration: "underline",
};

export default function TermsPage() {
  return (
    <LegalLayout title="Terms of Use" updated={legalUpdated}>
      <H2>Agreement to Terms</H2>
      <P>
        These Terms of Use govern your use of ONIS, the habit-tracking app
        made by ONIS Labs. By downloading, installing, or using ONIS, you
        agree to these Terms. If you do not agree, do not use the app.
      </P>

      <H2>License</H2>
      <P>
        Subject to these Terms and Apple&apos;s Usage Rules, ONIS Labs
        grants you a limited, personal, non-exclusive, non-transferable,
        non-commercial license to use ONIS on Apple devices that you own or
        control.
      </P>

      <H2>Free Functionality</H2>
      <P>
        ONIS is free to use for its core tracking functionality. Additional
        functionality is available through ONIS Premium, described below.
      </P>

      <H2>ONIS Premium</H2>
      <UL>
        <LI>
          ONIS Premium is offered as auto-renewable subscriptions —{" "}
          <strong>Weekly</strong> and <strong>Yearly</strong>.
        </LI>
        <LI>
          ONIS Premium is also available as a <strong>Lifetime</strong>{" "}
          purchase — a one-time, non-consumable purchase with no recurring
          billing.
        </LI>
      </UL>
      <P>
        Introductory offers, such as a free trial, may be available to
        eligible customers on auto-renewable plans. Apple determines
        eligibility for introductory offers and confirms it at the time of
        purchase.
      </P>
      <P>
        All prices are the price shown by Apple at the time of purchase, in
        your local currency, and may change over time or vary by region.
      </P>

      <H2>Billing, Cancellation, and Restoration</H2>
      <P>
        All purchases, billing, subscription renewals, and cancellations are
        handled by Apple through your Apple ID, not by ONIS Labs directly. A
        subscription automatically renews unless auto-renew is turned off at
        least 24 hours before the end of the current period. You can manage
        or cancel a subscription using Manage Subscription in the app, or
        directly in your Apple ID account settings, and restore a previous
        purchase using Restore Purchases in the app.
      </P>

      <H2>No ONIS Account</H2>
      <P>
        ONIS does not use an account system. There is no sign-up, sign-in,
        or password. Data related to your use of the app is stored locally
        on your device, as described in our{" "}
        <a href="/privacy" style={linkStyle}>
          Privacy Policy
        </a>
        .
      </P>

      <H2>Not Medical Advice</H2>
      <P>
        ONIS is a habit-tracking productivity tool. It is not a medical
        device, and it is not a mental-health, clinical, or diagnostic tool.
        ONIS does not provide medical advice, and nothing in the app should
        be treated as medical advice.
      </P>
      <P>
        Any tracking of tobacco, alcohol, nicotine, or caffeine use within
        ONIS is provided for personal awareness only. ONIS does not
        guarantee any particular outcome, and results will vary from person
        to person. If you have concerns about a habit or substance use,
        consult a qualified professional.
      </P>

      <H2>Apple</H2>
      <P>
        Apple is not a party to these Terms and is not responsible for ONIS
        or its content. Apple has no obligation to provide maintenance or
        support for ONIS. In the event of any conflict between these Terms
        and Apple&apos;s Media Services Terms and Conditions, Apple&apos;s
        terms will govern your use of the App Store. Apple and its
        subsidiaries are third-party beneficiaries of these Terms and may
        enforce them against you.
      </P>

      <H2>Trademarks</H2>
      <P>
        ONIS and the ONIS logo are trademarks of ONIS Labs. Apple, iPhone,
        Apple Watch, and App Store are trademarks of Apple Inc. ONIS is not
        affiliated with, endorsed by, or sponsored by Apple Inc.
      </P>

      <H2>Changes to These Terms</H2>
      <P>
        We may update these Terms from time to time. If we make material
        changes, we will update the &quot;Last updated&quot; date above.
        Continuing to use ONIS after changes take effect means you accept
        the updated Terms.
      </P>

      <H2>Contact</H2>
      <P>
        Questions about these Terms? Email{" "}
        <a href={`mailto:${site.supportEmail}`} style={linkStyle}>
          {site.supportEmail}
        </a>
        . For help using the app, visit{" "}
        <a href="/support" style={linkStyle}>
          Support
        </a>
        .
      </P>
    </LegalLayout>
  );
}
