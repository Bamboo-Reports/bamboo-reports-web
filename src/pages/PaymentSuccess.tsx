import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { usePageTitle } from "@/hooks/usePageTitle";

const PaymentSuccess = () => {
  usePageTitle("Payment Successful");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const paymentId = searchParams.get("payment_id");
  const orderId = searchParams.get("order_id");
  const planName = searchParams.get("plan");

  useEffect(() => {
    // You can send this data to your backend for verification
    if (paymentId) {
      console.log("Payment successful:", { paymentId, orderId, planName });
      // TODO: Send payment details to backend for verification
    }
  }, [paymentId, orderId, planName]);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="py-20 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8 flex justify-center">
            <CheckCircle className="h-24 w-24 text-green-500" />
          </div>
          
          <h1 className="text-4xl font-bold mb-4">Payment Successful!</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Thank you for your purchase. Your payment has been processed successfully.
          </p>

          <div className="bg-muted/30 rounded-lg border border-border p-6 mb-8">
            <div className="space-y-2">
              {planName && (
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Plan:</span>
                  <span className="font-semibold">{planName}</span>
                </div>
              )}
              {paymentId && (
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Payment ID:</span>
                  <span className="font-mono text-sm">{paymentId}</span>
                </div>
              )}
              {orderId && (
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Order ID:</span>
                  <span className="font-mono text-sm">{orderId}</span>
                </div>
              )}
            </div>
          </div>

          <p className="text-muted-foreground mb-8">
            A confirmation email has been sent to your registered email address.
            Our team will contact you shortly with access to your reports.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" onClick={() => navigate("/")} className="rounded-full">
              Go to Home
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate("/reports")}
              className="rounded-full"
            >
              View Reports
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PaymentSuccess;

