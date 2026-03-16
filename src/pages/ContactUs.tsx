import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useSEO } from "@/hooks/useSEO";
import { Link } from "react-router-dom";

const ContactUs = () => {
    useSEO({
        title: "Contact Us - Bamboo Reports",
        description: "Contact Bamboo Reports for product details, pricing, partnership opportunities, or custom insights.",
        keywords: "Contact Bamboo Reports, Research NXT Contact, GCC Intelligence Support, Sales Enquiry",
    });

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Header />
            <main className="flex-grow py-12 px-4">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-3xl md:text-4xl font-bold mb-6">Contact Us – Bamboo Reports</h1>

                    <p className="text-base text-muted-foreground leading-relaxed mb-8">
                        We’re here to help you make smarter decisions with data. Whether you’re looking for product details, pricing, partnership opportunities, or custom insights – connect with us.
                    </p>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-card p-6 rounded-lg border border-border shadow-sm">
                            <h2 className="text-xl font-semibold mb-3">📬 General Enquiries</h2>
                            <p className="text-sm text-muted-foreground mb-2">For product information, demo requests, or research collaboration:</p>
                            <a href="mailto:enquiry@researchnxt.com" className="text-primary font-medium hover:underline">✉️ enquiry@researchnxt.com</a>
                        </div>

                        <div className="bg-card p-6 rounded-lg border border-border shadow-sm">
                            <h2 className="text-xl font-semibold mb-3">💼 Sales & Subscriptions</h2>
                            <p className="text-sm text-muted-foreground mb-2">For enterprise licensing, product packs, and onboarding:</p>
                            <a href="mailto:sales@researchnxt.com" className="text-primary font-medium hover:underline">✉️ sales@researchnxt.com</a>
                        </div>

                        <div className="bg-card p-6 rounded-lg border border-border shadow-sm">
                            <h2 className="text-xl font-semibold mb-3">📊 Research & Data Insights</h2>
                            <p className="text-sm text-muted-foreground mb-2">To collaborate on reports or request custom intelligence:</p>
                            <a href="mailto:insights@researchnxt.com" className="text-primary font-medium hover:underline">✉️ insights@researchnxt.com</a>
                        </div>

                        <div className="bg-card p-6 rounded-lg border border-border shadow-sm">
                            <h2 className="text-xl font-semibold mb-3">🛠️ Technical Support</h2>
                            <p className="text-sm text-muted-foreground mb-2">Platform access, login, or usage issues:</p>
                            <a href="mailto:support@researchnxt.com" className="text-primary font-medium hover:underline">✉️ support@researchnxt.com</a>
                        </div>

                        <div className="bg-card p-6 rounded-lg border border-border shadow-sm">
                            <h2 className="text-xl font-semibold mb-3">🤝 Partnerships & Media</h2>
                            <p className="text-sm text-muted-foreground mb-2">For sponsorships, roundtables, and media collaborations:</p>
                            <a href="mailto:partnerships@researchnxt.com" className="text-primary font-medium hover:underline">✉️ partnerships@researchnxt.com</a>
                        </div>

                        <div className="bg-card p-6 rounded-lg border border-border shadow-sm">
                            <h2 className="text-xl font-semibold mb-3">📍 Office</h2>
                            <p className="text-sm text-muted-foreground mb-1"><strong>Research NXT Pvt. Ltd.</strong></p>
                            <p className="text-sm text-muted-foreground">Pune, Maharashtra, India</p>
                        </div>
                    </div>

                    <div className="mt-12 p-6 bg-muted/30 rounded-lg border border-border">
                        <h2 className="text-xl font-semibold mb-4">📢 Have a specific requirement?</h2>
                        <p className="text-base text-muted-foreground mb-4">
                            Tell us what you’re looking for and we’ll get back to you within 1–2 business days.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            {/* Placeholder for a form or call to action if needed */}
                        </div>
                    </div>

                    <div className="mt-8 text-sm text-muted-foreground">
                        <h3 className="font-semibold mb-2">🔒 Data Privacy Assurance</h3>
                        <p>
                            Any information shared with us will be handled securely in line with our <Link to="/privacy-policy" className="text-primary hover:underline">Privacy Policy</Link>.
                        </p>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default ContactUs;
