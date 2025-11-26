import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useSEO } from "@/hooks/useSEO";

const AboutUs = () => {
    useSEO({
        title: "About Us - Bamboo Reports",
        description: "Learn about Bamboo Reports, a flagship data intelligence platform by Research NXT providing verified insights on India's Global Capability Centers (GCCs).",
        keywords: "About Bamboo Reports, Research NXT, GCC Intelligence, GCC Data Platform, About Us",
    });

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Header />
            <main className="flex-grow py-12 px-4">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-3xl md:text-4xl font-bold mb-6">About Us – Bamboo Reports</h1>

                    <p className="text-base text-muted-foreground leading-relaxed mb-8">
                        <strong>Bamboo Reports</strong> is a flagship data intelligence platform by <strong>Research NXT</strong>, providing verified insights on India’s Global Capability Centers (GCCs). We empower enterprises, consulting firms, technology providers, and investors with structured data, strategic trends, and market intelligence.
                    </p>

                    <div className="my-8 border-t border-border" />

                    <h2 className="text-2xl font-semibold mt-8 mb-4">🌍 What We Do</h2>
                    <p className="text-base text-muted-foreground leading-relaxed mb-4">We curate and analyze:</p>
                    <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-4">
                        <li className="pl-2">GCC location intelligence and expansion patterns</li>
                        <li className="pl-2">Operating models, functions, and strategic capabilities</li>
                        <li className="pl-2">Workforce, talent, and EVP insights</li>
                        <li className="pl-2">ESG, hybrid work, and compliance metrics</li>
                        <li className="pl-2">Technology & AI adoption across GCCs</li>
                    </ul>

                    <div className="my-8 border-t border-border" />

                    <h2 className="text-2xl font-semibold mt-8 mb-4">🎯 Our Mission</h2>
                    <p className="text-base text-muted-foreground leading-relaxed mb-4">
                        To help businesses make informed strategic decisions through reliable GCC data, curated insights, and intelligent analytics.
                    </p>

                    <div className="my-8 border-t border-border" />

                    <h2 className="text-2xl font-semibold mt-8 mb-4">🧭 Our Vision</h2>
                    <p className="text-base text-muted-foreground leading-relaxed mb-4">
                        To become the most trusted intelligence source for GCC trends, investments, workforce dynamics, and enterprise decision-making in emerging markets.
                    </p>

                    <div className="my-8 border-t border-border" />

                    <h2 className="text-2xl font-semibold mt-8 mb-4">💡 Why Bamboo Reports?</h2>
                    <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-4">
                        <li className="pl-2">✔ Analyst-grade intelligence (not just raw data)</li>
                        <li className="pl-2">✔ 90% more GCC coverage vs public sources</li>
                        <li className="pl-2">✔ Verified through research, surveys & expert inputs</li>
                        <li className="pl-2">✔ Updated quarterly, dynamic, and insight-driven</li>
                        <li className="pl-2">✔ Built for enterprise, consulting, and strategy use</li>
                    </ul>

                    <div className="my-8 border-t border-border" />

                    <h2 className="text-2xl font-semibold mt-8 mb-4">👥 Who We Serve</h2>
                    <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-4">
                        <li className="pl-2">Global Enterprises & GCC Leaders</li>
                        <li className="pl-2">Consulting & Advisory Firms</li>
                        <li className="pl-2">SaaS & Technology Providers</li>
                        <li className="pl-2">Investors, Analysts & Policy Makers</li>
                    </ul>

                    <div className="my-8 border-t border-border" />

                    <h2 className="text-2xl font-semibold mt-8 mb-4">🤝 Powered by Research NXT</h2>
                    <p className="text-base text-muted-foreground leading-relaxed mb-4">
                        Research NXT is a research-driven advisory firm focused on B2B intelligence, data products, and thought leadership content. Bamboo Reports combines strong primary research, curated datasets, and domain expertise to deliver actionable insights.
                    </p>

                    <div className="my-8 border-t border-border" />

                    <h2 className="text-2xl font-semibold mt-8 mb-4">📌 Our Core Values</h2>
                    <p className="text-lg font-medium text-primary mb-4">
                        Accuracy | Transparency | Innovation | Partnership | Impact
                    </p>

                    <div className="my-8 border-t border-border" />

                    <h2 className="text-2xl font-semibold mt-8 mb-4">🚀 Let’s Work Together</h2>
                    <p className="text-base text-muted-foreground leading-relaxed mb-4">
                        To explore subscriptions, custom data packs, or collaboration:<br />
                        📧 <a href="mailto:hello@researchnxt.com" className="text-primary hover:underline">hello@researchnxt.com</a><br />
                        🌐 <a href="https://www.bambooreports.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">www.bambooreports.com</a>
                    </p>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default AboutUs;
