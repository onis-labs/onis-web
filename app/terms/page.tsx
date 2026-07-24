import type { CSSProperties } from "react";
import type { Metadata } from "next";
import LegalLayout, { H2, P, UL, LI } from "../components/LegalLayout";
import { colors } from "../lib/tokens";
import { site, legalUpdated } from "../lib/config";
import {
  foundingLifetimePrice,
  lifetimePrice,
  pricing,
  yearlyPrice,
} from "../lib/pricing";

export const metadata: Metadata = {
  title: "Terms of Use — ONIS",
  description: "Terms of Use for the ONIS habit tracker by ONIS Labs.",
};

// Purchases are processed by Apple through StoreKit. This website does not
// sell Premium access. Exact prices and eligibility are confirmed by Apple.
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
        ONIS includes a Free experience for core Today logging with a
        limited tracker allowance, without an ONIS account. Additional
        functionality is available through ONIS Premium, described below.
        Continue with Free remains available at any time.
      </P>

      <H2>Seven-Day Premium Preview</H2>
      <UL>
        <LI>
          Eligible users may experience a separate seven-day Premium
          preview before choosing Yearly, Lifetime, or continuing with Free.
        </LI>
        <LI>
          The Premium preview is not the Lifetime product and does{" "}
          <strong>not</strong> automatically charge Lifetime after seven
          days.
        </LI>
        <LI>
          When the preview ends, ONIS returns to Free unless you purchase
          Premium Yearly or ONIS Lifetime through Apple.
        </LI>
      </UL>

      <H2>Premium Yearly</H2>
      <P>
        <strong>Premium Yearly — {yearlyPrice} per year</strong> is an
        auto-renewable annual subscription. Eligible customers may receive a
        seven-day introductory trial. The subscription renews at the
        displayed annual price unless cancelled through Apple before the
        renewal date. It is <strong>not</strong> a one-time purchase.
      </P>
      <P>
        Manage or cancel Premium Yearly in your Apple&nbsp;ID subscription
        settings. {pricing.yearly.renewalDisclosure}
      </P>

      <H2>ONIS Lifetime</H2>
      <P>
        <strong>ONIS Lifetime — {lifetimePrice} once</strong> is a
        non-consumable, one-time purchase for permanent Premium access. It
        is not a subscription, does not renew, and does not automatically
        charge after a trial or preview. The Lifetime product itself does
        not include an introductory subscription trial —{" "}
        {pricing.lifetime.disclosure}.
      </P>

      <H2>Founding Lifetime Offer</H2>
      <P>
        Some eligible users may receive a limited founding offer for
        Lifetime (for example, {foundingLifetimePrice} once) through a
        legitimate App Store offer code or StoreKit-supported mechanism.
        Availability, eligibility, and final pricing are confirmed by Apple.
        This offer is not advertised as a public plan on the marketing site
        and is not available unless Apple can honor it.
      </P>

      <H2>Billing and Restoration</H2>
      <P>
        All Premium purchases are processed by Apple through your
        Apple&nbsp;ID, not by ONIS Labs directly, and not through this
        website. You can bring a previous purchase to a new device with{" "}
        <strong>Restore Purchases</strong> in the app. For refunds, contact
        Apple — App Store purchases are subject to Apple&apos;s refund
        policies.
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
        Any tracking of substances or health-related habits within ONIS is
        provided for personal awareness only. ONIS does not guarantee any
        particular outcome, and results will vary from person to person. If
        you have concerns about a habit or substance use, consult a
        qualified professional.
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
