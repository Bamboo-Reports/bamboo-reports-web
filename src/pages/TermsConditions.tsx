import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useSEO } from "@/hooks/useSEO";

const TermsConditions = () => {
    useSEO({
        title: "Terms & Conditions - Bamboo Reports",
        description: "Terms and Conditions for Bamboo Reports. Read our terms of service, usage rights, and user responsibilities.",
        keywords: "Terms and Conditions, Terms of Service, Bamboo Reports Terms, Usage Rights, User Agreement",
    });

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Header />
            <main className="flex-grow py-12 px-4">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-3xl md:text-4xl font-bold mb-6">Terms & Conditions – Bamboo Reports</h1>
                    <p className="text-base text-muted-foreground leading-relaxed mb-8"><strong>Effective Date:</strong> [Insert Date]</p>

                    <h2 className="text-2xl font-semibold mt-8 mb-4">1. Acceptance</h2>
                    <p className="text-base text-muted-foreground leading-relaxed mb-4">By accessing Bamboo Reports, you agree to these Terms. If you disagree, please do not use the platform.</p>

                    <h2 className="text-2xl font-semibold mt-8 mb-4">2. License & Usage Rights</h2>
                    <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-4">
                        <li className="pl-2">Access is granted on a subscription or enterprise-license basis.</li>
                        <li className="pl-2">Users may view, analyze, and download insights for internal business use only.</li>
                        <li className="pl-2">Redistribution, repackaging, resale, or public disclosure of Bamboo Reports content without written consent is strictly prohibited.</li>
                    </ul>

                    <h2 className="text-2xl font-semibold mt-8 mb-4">3. Intellectual Property</h2>
                    <p className="text-base text-muted-foreground leading-relaxed mb-4">All data frameworks, visualizations, content, UI, and analytics presented are the proprietary intellectual property of Research NXT.</p>

                    <h2 className="text-2xl font-semibold mt-8 mb-4">4. Data Accuracy & Limitations</h2>
                    <p className="text-base text-muted-foreground leading-relaxed mb-4">While insights are derived from verified sources, we do not guarantee complete or error-free information. Decisions taken using Bamboo Reports data are at the user's risk.</p>

                    <h2 className="text-2xl font-semibold mt-8 mb-4">5. User Responsibilities</h2>
                    <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-4">
                        <li className="pl-2">Maintain confidentiality of login access.</li>
                        <li className="pl-2">Do not copy, circumvent, reverse-engineer, or export platform technology.</li>
                        <li className="pl-2">Ensure content usage complies with ethical, legal, and data privacy standards.</li>
                    </ul>

                    <h2 className="text-2xl font-semibold mt-8 mb-4">6. Payments & Subscription</h2>
                    <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-4">
                        <li className="pl-2">Subscription fees must be paid as agreed in advance.</li>
                        <li className="pl-2">Licenses will auto-expire unless renewed.</li>
                        <li className="pl-2">No refunds unless validated under a separate agreement.</li>
                    </ul>

                    <h2 className="text-2xl font-semibold mt-8 mb-4">7. Confidentiality</h2>
                    <p className="text-base text-muted-foreground leading-relaxed mb-4">All user-uploaded or shared internal data shall remain confidential. Research NXT will not disclose or use such data except for service delivery under NDA.</p>

                    <h2 className="text-2xl font-semibold mt-8 mb-4">8. Service Modifications</h2>
                    <p className="text-base text-muted-foreground leading-relaxed mb-4">Features, functionality, or access terms may evolve. Subscribed users will be notified of major changes.</p>

                    <h2 className="text-2xl font-semibold mt-8 mb-4">9. Warranty & Liability</h2>
                    <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-4">
                        <li className="pl-2">Bamboo Reports is provided “as-is” without express or implied warranty.</li>
                        <li className="pl-2">Research NXT is not liable for business loss, indirect damages, or third-party integration issues.</li>
                        <li className="pl-2">Maximum liability is limited to the subscription fee paid for the last 6 months.</li>
                    </ul>

                    <h2 className="text-2xl font-semibold mt-8 mb-4">10. Suspension / Termination</h2>
                    <p className="text-base text-muted-foreground leading-relaxed mb-4">We reserve the right to suspend or terminate access if:</p>
                    <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-4">
                        <li className="pl-2">Misuse or unlicensed sharing is detected.</li>
                        <li className="pl-2">Subscription terms lapse.</li>
                        <li className="pl-2">Legal or regulatory risk emerges.</li>
                    </ul>

                    <h2 className="text-2xl font-semibold mt-8 mb-4">11. Governing Law</h2>
                    <p className="text-base text-muted-foreground leading-relaxed mb-4">These Terms are governed by Indian law, jurisdiction Pune Courts, unless contractually handled otherwise.</p>

                    <h2 className="text-2xl font-semibold mt-8 mb-4">12. Communication</h2>
                    <p className="text-base text-muted-foreground leading-relaxed mb-4">Official communication will be via the registered email or platform alerts.</p>

                    <h2 className="text-2xl font-semibold mt-8 mb-4">13. Contact</h2>
                    <p className="text-base text-muted-foreground leading-relaxed mb-4">
                        📧 <a href="mailto:legal@researchnxt.com" className="text-primary hover:underline">legal@researchnxt.com</a><br />
                        📍 Research NXT, Pune, India
                    </p>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default TermsConditions;
