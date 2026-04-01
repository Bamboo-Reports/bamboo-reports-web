import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { CheckCircle, FileText, Home, ArrowRight, Calendar } from "lucide-react";
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

          <p className="text-lg text-muted-foreground mb-4">
            We've received your details successfully. Our team will be in
            touch with you shortly.
          </p>

          <p className="text-base text-muted-foreground mb-10">
            In the meantime, feel free to explore our latest GCC reports and
            insights.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              asChild
              className="rounded-full gap-2"
            >
              <a
                href="https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ0gkLpzha2NOvjdfQJjMaOc07Hd4LYmHa_S6u3uNA7pZo79nOO2NsNcKjctg_jb6gTTLm7URNvw"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Calendar className="h-4 w-4" />
                Get in Touch
              </a>
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate("/reports")}
              className="rounded-full gap-2"
            >
              <FileText className="h-4 w-4" />
              Explore Reports
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate("/")}
              className="rounded-full gap-2"
            >
              <Home className="h-4 w-4" />
              Go to Home
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ThankYou;
