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
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-3xl md:text-4xl font-bold mb-6">Privacy Policy – Bamboo Reports</h1>
                    <p className="text-base text-muted-foreground leading-relaxed mb-8"><strong>Effective Date:</strong> [Insert Date]</p>

                    <p className="text-base text-muted-foreground leading-relaxed mb-8">
                        Bamboo Reports (“we,” “our,” or “us”) is a product by <strong>Research NXT</strong> that provides data intelligence, insights, and analytics on Global Capability Centers (GCCs) and related enterprise information. This Privacy Policy explains how we collect, process, use, and safeguard your information.
                    </p>

                    <h2 className="text-2xl font-semibold mt-8 mb-4">1. Information We Collect</h2>
                    <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-4">
                        <li className="pl-2"><strong>Business & Professional Information:</strong> Name, company, designation, email, contact details.</li>
                        <li className="pl-2"><strong>Usage Data:</strong> Login activities, navigation patterns, IP address, browser/device type.</li>
                        <li className="pl-2"><strong>Subscription & Payment Information:</strong> Transaction details (handled securely via third-party payment processors).</li>
                        <li className="pl-2"><strong>Survey / Form Inputs:</strong> Voluntary data provided through surveys, events, and research submissions.</li>
                        <li className="pl-2"><strong>Third-Party Data:</strong> AI tools, analytics partners, or research repositories as permitted.</li>
                    </ul>

                    <h2 className="text-2xl font-semibold mt-8 mb-4">2. How We Use Your Information</h2>
                    <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-4">
                        <li className="pl-2">To deliver and improve Bamboo Reports services.</li>
                        <li className="pl-2">To personalize dashboards, recommendations, and user experience.</li>
                        <li className="pl-2">To provide research insights, analytics updates, and notifications.</li>
                        <li className="pl-2">For account administration, billing, and support.</li>
                        <li className="pl-2">For internal analytics, product enhancement, and security monitoring.</li>
                        <li className="pl-2">With consent – for event invitations, marketing communication, or case study references.</li>
                    </ul>

                    <h2 className="text-2xl font-semibold mt-8 mb-4">3. Sharing & Disclosure</h2>
                    <p className="text-base text-muted-foreground leading-relaxed mb-4">We do not sell personal data. We may share information with:</p>
                    <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-4">
                        <li className="pl-2">Internal Research NXT teams for delivery.</li>
                        <li className="pl-2">Trusted service providers (cloud hosting, payment gateways, analytics tools, CRM platforms) under confidentiality.</li>
                        <li className="pl-2">Compliance or legal authorities if required by applicable law.</li>
                    </ul>

                    <h2 className="text-2xl font-semibold mt-8 mb-4">4. Data Security</h2>
                    <p className="text-base text-muted-foreground leading-relaxed mb-4">We apply industry-standard safety controls (access control, encryption, log monitoring). However, no digital platform is 100% secure.</p>

                    <h2 className="text-2xl font-semibold mt-8 mb-4">5. Data Retention</h2>
                    <p className="text-base text-muted-foreground leading-relaxed mb-4">Information is retained only as required for service delivery, legal compliance, or until an account is deleted.</p>

                    <h2 className="text-2xl font-semibold mt-8 mb-4">6. Your Rights</h2>
                    <p className="text-base text-muted-foreground leading-relaxed mb-4">You may:</p>
                    <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-4">
                        <li className="pl-2">Request access/update of your information.</li>
                        <li className="pl-2">Opt out of communications at any time.</li>
                        <li className="pl-2">Request deletion of account or data (subject to legal/business obligations).</li>
                    </ul>

                    <h2 className="text-2xl font-semibold mt-8 mb-4">7. Cookies & Tracking</h2>
                    <p className="text-base text-muted-foreground leading-relaxed mb-4">The platform may use cookies, analytics trackers, or session identifiers for improving user experience.</p>

                    <h2 className="text-2xl font-semibold mt-8 mb-4">8. Third-Party Links</h2>
                    <p className="text-base text-muted-foreground leading-relaxed mb-4">Links to third-party sites (e.g., ZoomInfo, LinkedIn, event pages) are not governed by this policy.</p>

                    <h2 className="text-2xl font-semibold mt-8 mb-4">9. Updates</h2>
                    <p className="text-base text-muted-foreground leading-relaxed mb-4">We may update this Policy occasionally. The latest version will be available on our platform.</p>

                    <h2 className="text-2xl font-semibold mt-8 mb-4">10. Contact</h2>
                    <p className="text-base text-muted-foreground leading-relaxed mb-4">For privacy concerns or requests:</p>
                    <p className="text-base text-muted-foreground leading-relaxed mb-4">
                        📧 <a href="mailto:support@researchnxt.com" className="text-primary hover:underline">support@researchnxt.com</a><br />
                        📍 Research NXT, Pune, India
                    </p>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default PrivacyPolicy;
