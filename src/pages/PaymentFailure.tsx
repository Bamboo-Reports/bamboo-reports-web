import { useNavigate, useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { XCircle } from "lucide-react";
import { usePageTitle } from "@/hooks/usePageTitle";

const PaymentFailure = () => {
  usePageTitle("Payment Failed");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const error = searchParams.get("error");
  const planName = searchParams.get("plan");

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="py-20 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8 flex justify-center">
            <XCircle className="h-24 w-24 text-red-500" />
          </div>
          
          <h1 className="text-4xl font-bold mb-4">Payment Failed</h1>
          <p className="text-xl text-muted-foreground mb-8">
            We couldn't process your payment. Please try again.
          </p>

          {error && (
            <div className="bg-red-50 dark:bg-red-950/20 rounded-lg border border-red-200 dark:border-red-800 p-6 mb-8">
              <p className="text-red-600 dark:text-red-400">
                Error: {error}
              </p>
            </div>
          )}

          <div className="bg-muted/30 rounded-lg border border-border p-6 mb-8">
            <h2 className="font-semibold mb-4">What you can do:</h2>
            <ul className="text-left space-y-2 text-muted-foreground">
              <li>• Check your card details and try again</li>
              <li>• Ensure you have sufficient balance</li>
              <li>• Try using a different payment method</li>
              <li>• Contact your bank if the issue persists</li>
              <li>• Contact our support team for assistance</li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={() => navigate("/pricing")} 
              className="rounded-full"
            >
              Try Again
            </Button>
            <Button
              variant="outline"
              size="lg"
              asChild
              className="rounded-full"
            >
              <a
                href="https://meetings-na2.hubspot.com/anam-khoja"
                target="_blank"
                rel="noopener noreferrer"
              >
                Contact Support
              </a>
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PaymentFailure;

