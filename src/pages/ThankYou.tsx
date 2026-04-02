import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CheckCircle, FileText, ArrowRight, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSEO } from "@/hooks/useSEO";

const ThankYou = () => {
  useSEO({
    title: "Thank You - Bamboo Reports",
    description:
      "Thank you for reaching out to Bamboo Reports. Our team will review your request and get in touch shortly.",
    keywords:
      "Bamboo Reports, GCC Intelligence, Thank You, Inquiry Received",
  });

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-grow flex items-center justify-center py-20 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-6 flex justify-center">
            <div className="rounded-full bg-green-100 p-4 animate-check-bounce">
              <CheckCircle className="h-16 w-16 text-green-500" />
            </div>
          </div>

          <h1 className="text-4xl font-bold mb-4">Thank You!</h1>

          <p className="text-base sm:text-lg text-muted-foreground mb-4">
            We've received your details successfully. Our team will be in touch shortly.
          </p>

          <p className="text-sm sm:text-base text-muted-foreground mb-10">
            In the meantime, explore our latest GCC reports and insights.
          </p>

          <div className="grid grid-cols-2 gap-3 sm:gap-6 max-w-lg mx-auto">
            <a
              href="https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ0gkLpzha2NOvjdfQJjMaOc07Hd4LYmHa_S6u3uNA7pZo79nOO2NsNcKjctg_jb6gTTLm7URNvw"
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-2xl border border-primary/20 bg-primary/5 p-4 sm:p-6 text-center transition-all hover:shadow-lg hover:border-primary/40 hover:-translate-y-1"
            >
              <div className="mb-3 sm:mb-4 mx-auto flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <Calendar className="h-5 w-5 sm:h-6 sm:w-6" />
              </div>
              <h3 className="text-sm sm:text-lg font-semibold mb-1">Schedule a Discussion</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Book a time directly with our team
              </p>
              <div className="mt-3 sm:mt-4 flex items-center justify-center gap-1 text-xs sm:text-sm font-medium text-primary">
                Book now
                <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </a>

            <div
              onClick={() => navigate("/reports")}
              className="group rounded-2xl border border-border bg-card p-4 sm:p-6 text-center cursor-pointer transition-all hover:shadow-lg hover:border-primary/40 hover:-translate-y-1"
            >
              <div className="mb-3 sm:mb-4 mx-auto flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-muted text-muted-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <FileText className="h-5 w-5 sm:h-6 sm:w-6" />
              </div>
              <h3 className="text-sm sm:text-lg font-semibold mb-1">Access GCC Reports</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Explore and download the latest insights
              </p>
              <div className="mt-3 sm:mt-4 flex items-center justify-center gap-1 text-xs sm:text-sm font-medium text-primary">
                View reports
                <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ThankYou;
