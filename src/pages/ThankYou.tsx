import { ArrowRight, Calendar, CheckCircle, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { GoogleCalendarSchedulingButton } from "@/components/GoogleCalendarSchedulingButton";
import { useSEO } from "@/hooks/useSEO";

const ThankYou = () => {
  useSEO({
    title: "Thank You | Bamboo Reports",
    description: "Thank you for reaching out to Bamboo Reports. Our team will review your request and get in touch shortly.",
    keywords: "Bamboo Reports, GCC Intelligence, Thank You, Inquiry Received",
  });

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 border-b bg-secondary/30 px-4 py-12 md:py-16">
        <div className="mx-auto max-w-3xl">
          <CheckCircle className="h-10 w-10 text-primary" aria-hidden />
          <h1 className="mt-6 text-3xl font-bold tracking-tight md:text-4xl">Thank You!</h1>
          <p className="mt-4 text-lg text-muted-foreground">We've received your details successfully. Our team will be in touch shortly.</p>
          <p className="mt-3 text-muted-foreground">In the meantime, explore our latest GCC reports and insights.</p>

          <div className="mt-10 border-t">
            <GoogleCalendarSchedulingButton className="group grid min-h-20 w-full grid-cols-[1.5rem_1fr_auto] items-center gap-4 border-b py-6 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
              <Calendar className="h-5 w-5 text-primary" aria-hidden />
              <span><span className="block text-lg font-semibold">Schedule a Discussion</span><span className="mt-1 block text-sm text-muted-foreground">Book a time directly with our team</span></span>
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary">Get a demo<ArrowRight className="h-4 w-4" aria-hidden /></span>
            </GoogleCalendarSchedulingButton>
            <Link to="/resources" className="group grid min-h-20 w-full grid-cols-[1.5rem_1fr_auto] items-center gap-4 border-b py-6 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
              <FileText className="h-5 w-5 text-primary" aria-hidden />
              <span><span className="block text-lg font-semibold">Explore Resources</span><span className="mt-1 block text-sm text-muted-foreground">Roundtables and insights from our team</span></span>
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary">View resources<ArrowRight className="h-4 w-4" aria-hidden /></span>
            </Link>
          </div>
        </div>
      </main>
      <Footer showCta={false} />
    </div>
  );
};

export default ThankYou;
