import LegalPageShell from "@/components/LegalPageShell";
import { useSEO } from "@/hooks/useSEO";

const TermsConditions = () => {
  useSEO({
    title: "Terms & Conditions | Bamboo Reports",
    description: "Terms and Conditions for Bamboo Reports. Read our terms of service, usage rights, and user responsibilities.",
    keywords: "Terms and Conditions, Terms of Service, Bamboo Reports Terms, Usage Rights, User Agreement",
  });

  return (
    <LegalPageShell title="Terms & Conditions – Bamboo Reports">
      <h2>1. Acceptance</h2>
      <p>By accessing Bamboo Reports, you agree to these Terms. If you disagree, please do not use the platform.</p>
      <h2>2. License & Usage Rights</h2>
      <ul>
        <li>Access is granted on a subscription or enterprise-license basis.</li>
        <li>Users may view, analyze, and download insights for internal business use only.</li>
        <li>Redistribution, repackaging, resale, or public disclosure of Bamboo Reports content without written consent is strictly prohibited.</li>
        <li>Automated access, scraping, crawling, or bulk extraction of the platform's data, whether by bots, scripts, or any automated means, is prohibited without prior written authorization. This includes using the content to train machine learning or AI models.</li>
      </ul>
      <h2>3. Intellectual Property</h2>
      <p>All data frameworks, visualizations, content, UI, and analytics presented are the proprietary intellectual property of Research NXT.</p>
      <h2>4. Data Accuracy & Limitations</h2>
      <p>While insights are derived from verified sources, we do not guarantee complete or error-free information. Decisions taken using Bamboo Reports data are at the user's risk.</p>
      <h2>5. User Responsibilities</h2>
      <ul><li>Maintain confidentiality of login access.</li><li>Do not copy, circumvent, reverse-engineer, or export platform technology.</li><li>Ensure content usage complies with ethical, legal, and data privacy standards.</li></ul>
      <h2>6. Payments & Subscription</h2>
      <ul><li>Subscription fees must be paid as agreed in advance.</li><li>Licenses will auto-expire unless renewed.</li><li>No refunds unless validated under a separate agreement.</li></ul>
      <h2>7. Confidentiality</h2>
      <p>All user-uploaded or shared internal data shall remain confidential. Research NXT will not disclose or use such data except for service delivery under NDA.</p>
      <h2>8. Service Modifications</h2>
      <p>Features, functionality, or access terms may evolve. Subscribed users will be notified of major changes.</p>
      <h2>9. Warranty & Liability</h2>
      <ul><li>Bamboo Reports is provided “as-is” without express or implied warranty.</li><li>Research NXT is not liable for business loss, indirect damages, or third-party integration issues.</li><li>Maximum liability is limited to the subscription fee paid for the last 6 months.</li></ul>
      <h2>10. Suspension / Termination</h2>
      <p>We reserve the right to suspend or terminate access if:</p>
      <ul><li>Misuse or unlicensed sharing is detected.</li><li>Subscription terms lapse.</li><li>Legal or regulatory risk emerges.</li></ul>
      <h2>11. Governing Law</h2>
      <p>These Terms are governed by Indian law, jurisdiction Pune Courts, unless contractually handled otherwise.</p>
      <h2>12. Communication</h2>
      <p>Official communication will be via the registered email or platform alerts.</p>
      <h2>13. Contact</h2>
      <p>Research NXT, Pune, India</p>
    </LegalPageShell>
  );
};

export default TermsConditions;
