import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JotFormEmbed from "@/components/JotFormEmbed";

type ReportPageTemplateProps = {
  title: string;
  description: string;
  formId: string;
  formTitle: string;
  formDescription: string;
};

const ReportPageTemplate = ({
  title,
  description,
  formId,
  formTitle,
  formDescription,
}: ReportPageTemplateProps) => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <main className="flex-1">
        <section className="relative overflow-hidden border-b">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_14%_18%,hsl(var(--accent)/0.16),transparent_30%),radial-gradient(circle_at_88%_12%,hsl(var(--primary)/0.16),transparent_36%),linear-gradient(140deg,hsl(var(--background))_0%,hsl(var(--muted)/0.42)_100%)]" />
          <div className="absolute inset-0 opacity-[0.08] bg-[linear-gradient(90deg,hsl(var(--foreground))_1px,transparent_1px),linear-gradient(180deg,hsl(var(--foreground))_1px,transparent_1px)] bg-[size:44px_44px]" />

          <div className="relative max-w-6xl mx-auto px-4 py-14 lg:py-20">
            <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-8 lg:gap-10 items-start">
              <div className="relative overflow-hidden rounded-3xl border bg-background/70 backdrop-blur p-7 lg:p-10 min-h-[380px] lg:min-h-[440px] shadow-[0_22px_48px_-34px_hsl(var(--foreground)/0.45)]">
                <div className="absolute inset-0 opacity-[0.05] bg-[linear-gradient(120deg,hsl(var(--foreground))_0.6px,transparent_0.6px)] bg-[size:12px_12px]" />
                <div className="absolute -top-10 -right-10 h-48 w-48 rounded-full bg-primary/10 blur-3xl" />
                <div className="absolute -bottom-14 -left-10 h-56 w-56 rounded-full bg-accent/10 blur-3xl" />
                <div className="relative space-y-5">
                  <h1 className="text-4xl lg:text-[3.35rem] font-black leading-[1.02] tracking-tight max-w-4xl">{title}</h1>
                  <p className="text-lg lg:text-xl text-muted-foreground max-w-3xl">{description}</p>

                  <div className="pt-2 flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-primary/70" />
                    <span className="h-2.5 w-2.5 rounded-full bg-primary/45" />
                    <span className="h-2.5 w-2.5 rounded-full bg-accent/65" />
                    <span className="ml-2 h-px flex-1 bg-gradient-to-r from-primary/40 to-transparent" />
                  </div>
                </div>
              </div>

              <div id="download-form" className="lg:sticky lg:top-24">
                <div className="relative overflow-hidden rounded-3xl border bg-card shadow-[0_22px_48px_-34px_hsl(var(--foreground)/0.45)] p-6 lg:p-7">
                  <div className="absolute inset-0 opacity-[0.05] bg-[linear-gradient(120deg,hsl(var(--foreground))_0.6px,transparent_0.6px)] bg-[size:12px_12px]" />
                  <div className="relative">
                    <h3 className="text-2xl font-black mb-2">{formTitle}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{formDescription}</p>
                    <JotFormEmbed formId={formId} title={formTitle} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ReportPageTemplate;
