import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useSEO } from "@/hooks/useSEO";

const panelists = [
  {
    name: "Prem Kumar",
    title: "VP Sales & Demand Generation",
    company: "NLB Services",
    image: "https://files.catbox.moe/7km0jh.png",
  },
  {
    name: "Ritesh Kapoor",
    title: "VP Marketing & Comms",
    company: "Accenture",
    image: "https://files.catbox.moe/nyk1g3.jpg",
  },
  {
    name: "Glen Mary George",
    title: "Marketing Director",
    company: "Bloom Value Corporation",
    image: "https://files.catbox.moe/0vq8o1.jpg",
  },
  {
    name: "Souvik Mukherjee",
    title: "Marketing & Communications Lead",
    company: "Tietoevry India Private Limited",
    image: "https://files.catbox.moe/6sx3o3.jpg",
  },
  {
    name: "Diptarup Chakrabarti",
    title: "Fractional CMO",
    company: "ABC Ltd",
    image: "https://files.catbox.moe/lsmp8f.jpg",
  },
  {
    name: "Shivam Gupta",
    title: "Growth Marketing Lead",
    company: "Routematics",
    image: "https://files.catbox.moe/ah2obs.jpeg",
  },
  {
    name: "Pamela Kundu",
    title: "Sales Director",
    company: "Celonis",
    image: "https://files.catbox.moe/z0xc00.jpg",
  },
  {
    name: "Vivek Veeraraghavan",
    title: "Senior VP Digital Transformation APAC",
    company: "Northern Trust",
    image: "https://files.catbox.moe/8m0p6o.jpg",
  },
  {
    name: "Randeep Singh",
    title: "Head Captive Business",
    company: "Yethi Consulting",
    image: "https://files.catbox.moe/7b6nsc.jpg",
  },
  {
    name: "Madhav Vemuri",
    title: "Leader",
    company: "Inpace / X ABB",
    image: "https://files.catbox.moe/45bruy.jpg",
  },
  {
    name: "Tarun Devasia",
    title: "CMO",
    company: "Ramco",
    image: "https://files.catbox.moe/3il39l.jpg",
  },
  {
    name: "Vinod Kumar",
    title: "SVP Head Marketing",
    company: "247.ai",
    image: "https://files.catbox.moe/6dszzw.jpg",
  },
  {
    name: "Anisha Chawla",
    title: "Lead Global Events",
    company: "Amagi",
    image: "https://files.catbox.moe/hnmgkc.jpg",
  },
  {
    name: "Shivendra Tripathi",
    title: "Associate Director Performance Marketing",
    company: "Facilio",
    image: "https://files.catbox.moe/yhnzoj.jpg",
  },
  {
    name: "Kieran Thakky",
    title: "Director Marketing Global",
    company: "Harman",
    image: "https://files.catbox.moe/l6y909.jpg",
  },
];

const highlights = [
  {
    title: "India's advantage is strategic",
    copy: "The H-1B policy shift is less a shock and more a reset. Leaders see India moving from execution to value-creation as global models rebalance.",
  },
  {
    title: "GCCs are decision engines",
    copy: "Roles across R&D, customer support, engineering, marketing, and procurement are already being run from India with budget and innovation control.",
  },
  {
    title: "Scale beats regional rivals",
    copy: "Vietnam and Southeast Asia are rising, but when enterprises need 10k to 50k people with enterprise-grade consistency, India still wins on depth and scale.",
  },
];

const playbookPrompts = [
  "Design GCC-specific ABM and city-hub strategies for faster leadership buy-in.",
  "Run internal storytelling campaigns so HQ sees India as a strategy hub, not just delivery.",
  "Double down on employer brand and ecosystem positioning to lock in senior talent.",
];

const signalBullets = [
  "Value creation is catching up with capability; Indian leaders are influencing budgets and procurement directly.",
  "Internal marketing is mandatory: if HQ does not see the wins, budgets stay limited.",
  "Talent depth is India's edge, but strategic roles must sit in-market to avoid translation layers.",
  "Outsourcing tax chatter has already triggered operating model redesigns toward India-led teams.",
];

const H1BStrategicReset = () => {
  useSEO({
    title: "H-1B Shock or Strategic Reset? Bengaluru Roundtable | Bamboo Reports",
    description:
      "Roundtable recap on how India's GCCs are shifting from delivery hubs to decision engines. Key signals, panelists, and playbook prompts from the Bengaluru discussion.",
    keywords:
      "India GCC roundtable, GCC strategy India, H-1B impact India, Global Capability Centers insights, Bengaluru GCC event, GCC operating models India",
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="py-16 lg:py-20 px-4">
        <div className="max-w-6xl mx-auto space-y-10">
          <section className="rounded-3xl border bg-gradient-to-br from-primary/10 via-background to-background p-8 lg:p-12 space-y-6 shadow-sm">
            <div className="inline-flex items-center gap-3 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
              Roundtable Recap
            </div>
            <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-6 items-center">
              <div className="space-y-3">
                <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
                  H-1B Shock or Strategic Reset? Bengaluru Roundtable Reveals India's GCC Power Shift
                </h1>
                <p className="text-lg text-muted-foreground max-w-3xl">
                  Hosted by Research NXT - Bamboo Reports, leaders across marketing, strategy, sales, and GCC operations debated how global delivery and decision-making are being rebuilt around India.
                </p>
                <div className="flex flex-wrap gap-3 text-sm font-semibold text-primary">
                  <span className="rounded-full bg-primary/10 px-3 py-1 border border-primary/30">13 November 2025</span>
                  <span className="rounded-full bg-primary/10 px-3 py-1 border border-primary/30">Hilton Bengaluru</span>
                </div>
              </div>
              <div className="rounded-2xl overflow-hidden border bg-muted/30">
                <img
                  src="https://files.catbox.moe/v7a2ub.jpg"
                  alt="Roundtable discussion on India's GCC power shift"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </section>

          <section className="grid md:grid-cols-3 gap-4">
            {highlights.map((item) => (
              <div key={item.title} className="h-full rounded-2xl border bg-card p-5 shadow-sm space-y-2">
                <p className="text-sm font-semibold text-primary uppercase tracking-[0.14em]">{item.title}</p>
                <p className="text-base text-muted-foreground leading-relaxed">{item.copy}</p>
              </div>
            ))}
          </section>

          <section className="rounded-3xl border bg-card p-8 lg:p-10 shadow-sm space-y-4">
            <div className="space-y-2">
              <p className="text-sm font-semibold text-primary uppercase tracking-[0.18em]">Setting the context</p>
              <h2 className="text-3xl font-bold">This is not outsourcing shock. It is intelligent insourcing.</h2>
            </div>
            <p className="text-base text-muted-foreground leading-relaxed">
              Participants agreed the proposed 25% outsourcing tax is already forcing operating model shifts. For many, it is accelerating something bigger: India moving up the value chain from scalable execution to accurate decision-making and value creation. Past models left Indian teams on the periphery; this moment is about owning budgets, innovation, and enterprise-grade delivery in-market.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="rounded-2xl border bg-muted/40 px-4 py-3">
                <p className="text-sm font-semibold text-primary uppercase tracking-[0.14em]">India vs Southeast Asia</p>
                <p className="text-sm text-foreground leading-relaxed">
                  Vietnam can build strong 5k-member teams, but for 10k to 50k enterprise-grade scale with consistency, India still leads. Capability plus scale remains the differentiator.
                </p>
              </div>
              <div className="rounded-2xl border bg-muted/40 px-4 py-3">
                <p className="text-sm font-semibold text-primary uppercase tracking-[0.14em]">What changes inside GCCs</p>
                <p className="text-sm text-foreground leading-relaxed">
                  Decision rights are shifting to India across R&D, engineering, marketing, customer support, and procurement. Leaders are pushing for strategic roles to sit in-market to avoid translation layers.
                </p>
              </div>
            </div>
          </section>

          <section className="rounded-3xl border bg-muted/40 p-8 lg:p-10 shadow-sm space-y-5">
            <div className="space-y-2">
              <p className="text-sm font-semibold text-primary uppercase tracking-[0.18em]">Signals from the room</p>
              <h3 className="text-2xl font-bold">What leaders are already acting on</h3>
            </div>
            <div className="grid gap-3">
              {signalBullets.map((bullet) => (
                <div key={bullet} className="flex items-start gap-3 rounded-2xl border bg-background px-4 py-3">
                  <span className="mt-1 h-2.5 w-2.5 rounded-full bg-primary" />
                  <p className="text-base text-foreground leading-relaxed">{bullet}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-3xl border bg-card p-8 lg:p-10 shadow-sm space-y-5">
            <div className="space-y-2">
              <p className="text-sm font-semibold text-primary uppercase tracking-[0.18em]">Playbook prompts</p>
              <h3 className="text-2xl font-bold">How GCC teams and vendors should respond</h3>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              {playbookPrompts.map((prompt) => (
                <div key={prompt} className="rounded-2xl border bg-muted/40 px-4 py-3 text-base leading-relaxed text-foreground">
                  {prompt}
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-3xl border bg-muted/40 p-8 lg:p-10 shadow-sm space-y-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-primary uppercase tracking-[0.18em]">The panel</p>
                <h3 className="text-2xl font-bold">Leaders steering the conversation</h3>
                <p className="text-base text-muted-foreground mt-2">
                  A cross-section of marketing, sales, digital transformation, and GCC leaders who unpacked the shift from outsourcing to intelligent insourcing.
                </p>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {panelists.map((panelist) => (
                <div key={panelist.name} className="rounded-2xl border bg-background p-4 shadow-sm flex gap-3">
                  <div className="h-16 w-16 shrink-0 rounded-full overflow-hidden border bg-muted">
                    <img
                      src={panelist.image}
                      alt={`${panelist.name} headshot`}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="space-y-1">
                    <p className="text-lg font-semibold leading-tight">{panelist.name}</p>
                    <p className="text-sm text-foreground leading-snug">{panelist.title}</p>
                    <p className="text-sm text-muted-foreground leading-snug">{panelist.company}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-3xl border bg-card p-8 lg:p-10 shadow-sm space-y-3">
            <p className="text-sm font-semibold text-primary uppercase tracking-[0.18em]">Final takeaway</p>
            <h3 className="text-2xl font-bold">Global capability centers are in India because capability is higher.</h3>
            <p className="text-base text-muted-foreground leading-relaxed">
              The Bengaluru roundtable made one point clear: the outsourcing era is ending. As GCCs take on strategic mandates and own budgets, India is positioned to be the primary strategy hub for global enterprises. The call to action is simple—market your wins internally, elevate strategic roles in India, and treat capability plus scale as the advantage to defend.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default H1BStrategicReset;
