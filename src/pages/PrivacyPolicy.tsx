import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useSEO } from "@/hooks/useSEO";

const PrivacyPolicy = () => {
    useSEO({
        title: "Privacy Policy - Bamboo Reports",
        description: "Privacy Policy for Bamboo Reports. Learn how we collect, use, and safeguard your information.",
        keywords: "Privacy Policy, Data Protection, Bamboo Reports Privacy, GDPR, Data Security",
    });

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Header />
            <main className="flex-grow py-12 px-4">
                <div className="max-w-4xl mx-auto prose prose-slate dark:prose-invert">
                    <h1>Privacy Policy – Bamboo Reports</h1>
                    <p><strong>Effective Date:</strong> [Insert Date]</p>

                    <p>
                        Bamboo Reports (“we,” “our,” or “us”) is a product by <strong>Research NXT</strong> that provides data intelligence, insights, and analytics on Global Capability Centers (GCCs) and related enterprise information. This Privacy Policy explains how we collect, process, use, and safeguard your information.
                    </p>

                    <h2>1. Information We Collect</h2>
                    <ul>
                        <li><strong>Business & Professional Information:</strong> Name, company, designation, email, contact details.</li>
                        <li><strong>Usage Data:</strong> Login activities, navigation patterns, IP address, browser/device type.</li>
                        <li><strong>Subscription & Payment Information:</strong> Transaction details (handled securely via third-party payment processors).</li>
                        <li><strong>Survey / Form Inputs:</strong> Voluntary data provided through surveys, events, and research submissions.</li>
                        <li><strong>Third-Party Data:</strong> AI tools, analytics partners, or research repositories as permitted.</li>
                    </ul>

                    <h2>2. How We Use Your Information</h2>
                    <ul>
                        <li>To deliver and improve Bamboo Reports services.</li>
                        <li>To personalize dashboards, recommendations, and user experience.</li>
                        <li>To provide research insights, analytics updates, and notifications.</li>
                        <li>For account administration, billing, and support.</li>
                        <li>For internal analytics, product enhancement, and security monitoring.</li>
                        <li>With consent – for event invitations, marketing communication, or case study references.</li>
                    </ul>

                    <h2>3. Sharing & Disclosure</h2>
                    <p>We do not sell personal data. We may share information with:</p>
                    <ul>
                        <li>Internal Research NXT teams for delivery.</li>
                        <li>Trusted service providers (cloud hosting, payment gateways, analytics tools, CRM platforms) under confidentiality.</li>
                        <li>Compliance or legal authorities if required by applicable law.</li>
                    </ul>

                    <h2>4. Data Security</h2>
                    <p>We apply industry-standard safety controls (access control, encryption, log monitoring). However, no digital platform is 100% secure.</p>

                    <h2>5. Data Retention</h2>
                    <p>Information is retained only as required for service delivery, legal compliance, or until an account is deleted.</p>

                    <h2>6. Your Rights</h2>
                    <p>You may:</p>
                    <ul>
                        <li>Request access/update of your information.</li>
                        <li>Opt out of communications at any time.</li>
                        <li>Request deletion of account or data (subject to legal/business obligations).</li>
                    </ul>

                    <h2>7. Cookies & Tracking</h2>
                    <p>The platform may use cookies, analytics trackers, or session identifiers for improving user experience.</p>

                    <h2>8. Third-Party Links</h2>
                    <p>Links to third-party sites (e.g., ZoomInfo, LinkedIn, event pages) are not governed by this policy.</p>

                    <h2>9. Updates</h2>
                    <p>We may update this Policy occasionally. The latest version will be available on our platform.</p>

                    <h2>10. Contact</h2>
                    <p>For privacy concerns or requests:</p>
                    <p>
                        📧 <a href="mailto:support@researchnxt.com">support@researchnxt.com</a><br />
                        📍 Research NXT, Pune, India
                    </p>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default PrivacyPolicy;
