import { useState, useEffect } from "react"; // Import useState and useEffect
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"; // Import ToggleGroup
import { useToast } from "@/hooks/use-toast";
import { useSEO } from "@/hooks/useSEO";
import { useAuth } from "@/contexts/AuthContext";
import {
  initiateRazorpayPayment,
  createRazorpayOrder,
  verifyRazorpayPayment,
  convertToPaise,
  getRazorpayKey,
  loadRazorpayScript,
  type RazorpayResponse,
} from "@/lib/razorpay";

const Pricing = () => {
  useSEO({
    title: "Pricing - GCC Intelligence Platform Plans & Packages",
    description: "Choose from flexible GCC Intelligence plans. Access GCC contact database, market intelligence, benchmarking data, and custom research packages. Transparent pricing for strategy intelligence platform.",
    keywords: "GCC Intelligence Pricing, GCC Data Plans, Strategy intelligence platform, Market Intelligence India, GCC benchmarking, GCC Contact Database pricing, ABM research, Roundtable as a Service",
  });
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();

  // Check if subscriptions are enabled via feature flag
  const isSubscriptionEnabled = import.meta.env.VITE_SUBSCRIPTION_ENABLED === 'true';

  // Preload Razorpay script when component mounts (only if subscriptions are enabled)
  useEffect(() => {
    if (isSubscriptionEnabled) {
      loadRazorpayScript();
    }
  }, [isSubscriptionEnabled]);

  // State to manage the selected currency
  const [currency, setCurrency] = useState("USD");
  const [processingPlan, setProcessingPlan] = useState<string | null>(null);

  const plans = [
    {
      name: "Base Layer",
      price: { USD: "1,299", INR: "1,09,999" }, // <-- Add your INR price
      originalPrice: { USD: "5,000", INR: "4,15,000" }, // <-- Add your INR price
      // priceSuffix: "/onetime",
      features: [
        {
          title: "Standard Trends Report",
          description: "Comprehensive GCC market insights",
        },
        {
          title: "L1 List - 2,500+ GCCs",
          description: "Limited view of GCC database",
        },
        {
          title: "Annual Snapshot 2024-25",
          description: "Free update in December",
        },
        {
          title: "Historic View (3 Years)",
          description: "GCC movement trends in India",
        },
        {
          title: "Quarterly View",
          description: "Latest quarter insights",
        },
      ],
    },
    {
      name: "Custom Layer",
      price: { USD: "6,999", INR: "5,79,999" }, // <-- Add your INR price
      originalPrice: { USD: "15,000", INR: "12,50,000" }, // <-- Add your INR price
      // priceSuffix: "/onetime",
      popular: true,
      features: [
        {
          title: "Everything from Base Layer",
          description: "All base features included",
        },
        {
          title: "Trends Report (Up to 3 Filters)",
          description: "Customizable filtering options",
        },
        {
          title: "Standard L2 - Up to 250 Accounts",
          description: "Detailed account information",
        },
        {
          title: "Standard Prospects Database - Up to 1,200 Verified Prospects",
          description: "Predefined prospect template",
        },
        {
          title: "35+ Customization Possibilities",
          description: "Multiple filter combinations",
        },
      ],
    },
    {
      name: "Consult Layer",
      price: "Custom", // Custom plan remains the same
      originalPrice: null,
      // priceSuffix: null,
      features: [
        {
          title: "Everything from Base + Custom Layer",
          description: "All base and custom features",
        },
        {
          title: "Specialized Dataset (10+ Filters)",
          description: "Exclusive Bamboo Reports filters",
        },
        {
          title: "Custom Trends Report",
          description: "Based on 10+ specific filters",
        },
        {
          title: "Custom L2 - Up to 600 Accounts",
          description: "Enhanced with exclusive filters",
        },
        {
          title: "Custom Prospects Database - Up to 1,200 Verified Prospects",
          description: "Tailored for your marketing campaigns",
        },
        {
          title: "Analyst Consultation",
          description: "Expert guidance on package design",
        },
      ],
    },
  ];

  const currencySymbol = currency === "USD" ? "$" : "₹";

  const handlePayment = async (
    planName: string,
    price: { USD: string; INR: string }
  ) => {
    // Check if user is authenticated
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in or create an account to make a purchase.",
        variant: "default",
      });
      // Redirect to sign-in page with return URL
      navigate("/signin?redirect=/pricing");
      return;
    }

    try {
      setProcessingPlan(planName);

      // Get the current price based on selected currency
      const currentPrice = price[currency as keyof typeof price];
      const amountInPaise = convertToPaise(currentPrice);
      const selectedCurrency = currency === "USD" ? "USD" : "INR";

      // Find the plan features
      const selectedPlan = plans.find((plan) => plan.name === planName);
      const planFeatures = selectedPlan?.features || [];

      // Create order on backend first
      const order = await createRazorpayOrder(
        amountInPaise,
        selectedCurrency,
        planName
      );

      // Get Razorpay key
      const razorpayKey = getRazorpayKey();

      // Initiate Razorpay payment with order_id
      await initiateRazorpayPayment({
        key: razorpayKey,
        amount: order.amount,
        currency: order.currency,
        order_id: order.orderId, // This ensures the correct currency
        name: "Bamboo Reports",
        description: `${planName} - GCC Intelligence Platform`,
        handler: async (response: RazorpayResponse) => {
          try {
            // Get customer details from Razorpay prefill (they enter this in the form)
            const customerEmail = (response as any).email || "";
            const customerName = (response as any).name || "";

            // Verify payment on backend and send confirmation email
            await verifyRazorpayPayment(
              response.razorpay_order_id || "",
              response.razorpay_payment_id,
              response.razorpay_signature || "",
              customerEmail,
              customerName,
              planName,
              order.amount,
              order.currency,
              user?.id,
              planFeatures,
              order.orderId
            );
            
            // Payment verified successfully
            console.log("Payment verified:", response);
            
            // Redirect to success page with payment details
            navigate(
              `/payment-success?payment_id=${response.razorpay_payment_id}&order_id=${response.razorpay_order_id || ""}&plan=${encodeURIComponent(planName)}`
            );
          } catch (verifyError) {
            console.error("Payment verification failed:", verifyError);
            toast({
              title: "Verification Failed",
              description: "Payment received but verification failed. Please contact support.",
              variant: "destructive",
            });
          }
        },
        prefill: {
          name: "",
          email: "",
          contact: "",
        },
        theme: {
          color: "#3b82f6", // Customize this to match your brand color
        },
        // Enable all payment methods including UPI
        method: {
          netbanking: true,
          card: true,
          upi: true,
          wallet: true,
        },
        // Configure display preferences to show UPI prominently
        config: {
          display: {
            blocks: {
              banks: {
                name: "All payment methods",
                instruments: [
                  { method: "upi" },
                  { method: "card" },
                  { method: "netbanking" },
                  { method: "wallet" },
                ],
              },
            },
            sequence: ["block.banks"],
            preferences: {
              show_default_blocks: true,
            },
          },
        },
        modal: {
          ondismiss: () => {
            setProcessingPlan(null);
            toast({
              title: "Payment Cancelled",
              description: "You cancelled the payment process.",
              variant: "destructive",
            });
          },
        },
      });
    } catch (error) {
      console.error("Payment error:", error);
      setProcessingPlan(null);
      
      toast({
        title: "Payment Failed",
        description:
          error instanceof Error
            ? error.message
            : "Unable to process payment. Please try again.",
        variant: "destructive",
      });

      // Redirect to failure page
      navigate(
        `/payment-failure?error=${encodeURIComponent(error instanceof Error ? error.message : "Unknown error")}&plan=${encodeURIComponent(planName)}`
      );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-4">
              Simple, Transparent Pricing
            </h1>
            <p className="text-xl text-muted-foreground">
              Choose the plan that's right for your business
            </p>
          </div>

          {/* --- Currency Switcher --- */}
          <div className="flex justify-end mb-8">
            <ToggleGroup
              type="single"
              value={currency}
              onValueChange={(value) => {
                if (value) setCurrency(value); // Set state only if value is selected
              }}
            >
              <ToggleGroupItem value="USD" aria-label="Select US Dollars">
                USD
              </ToggleGroupItem>
              <ToggleGroupItem value="INR" aria-label="Select Indian Rupees">
                INR
              </ToggleGroupItem>
            </ToggleGroup>
          </div>

          <div className="grid md:grid-cols-3 gap-8 items-start">
            {plans.map((plan) => {
              const isCustom = plan.price === "Custom";
              const currentPrice = !isCustom ? plan.price[currency] : null;
              const currentOriginalPrice =
                !isCustom && plan.originalPrice
                  ? plan.originalPrice[currency]
                  : null;

              return (
                <div
                  key={plan.name}
                  className={`relative rounded-lg border p-8 flex flex-col transition-all duration-200 ${
                    plan.popular
                      ? "border-primary shadow-lg"
                      : "border-border hover:shadow-md"
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <span className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">
                        Most Popular
                      </span>
                    </div>
                  )}

                  <div className="mb-8">
                    <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
                    <div className="flex flex-col">
                      {isCustom ? (
                        <span className="text-4xl font-bold">Custom</span>
                      ) : (
                        <>
                          <div className="flex items-baseline gap-2">
                            <span className="text-4xl font-bold">
                              {currencySymbol}
                              {currentPrice}
                            </span>
                            {currentOriginalPrice && (
                              <span className="text-xl text-muted-foreground line-through">
                                {currencySymbol}
                                {currentOriginalPrice}
                              </span>
                            )}
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  <ul className="space-y-4 mb-8 flex-grow">
                    {plan.features.map((feature) => (
                      <li
                        key={feature.title}
                        className="flex items-start gap-3"
                      >
                        <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <div>
                          <span className="font-medium">{feature.title}</span>
                          <p className="text-sm text-muted-foreground">
                            {feature.description}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>

                  {isCustom ? (
                    <Button
                      asChild
                      className="w-full rounded-full"
                      variant={plan.popular ? "default" : "outline"}
                    >
                      <a
                        href="https://meetings-na2.hubspot.com/anam-khoja"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Contact Sales
                      </a>
                    </Button>
                  ) : !isSubscriptionEnabled ? (
                    <Button
                      className="w-full rounded-full"
                      variant="outline"
                      disabled
                    >
                      Coming Soon
                    </Button>
                  ) : (
                    <Button
                      className="w-full rounded-full"
                      variant={plan.popular ? "default" : "outline"}
                      onClick={() => handlePayment(plan.name, plan.price)}
                      disabled={processingPlan !== null}
                    >
                      {processingPlan === plan.name ? "Processing..." : "Get Started"}
                    </Button>
                  )}
                </div>
              );
            })}
          </div>

          {/* --- Not Sure Section --- */}
          <div className="text-center mt-16 p-8 bg-muted/30 rounded-lg border border-border">
            <h2 className="text-2xl font-semibold mb-6">
              Not sure what to choose?
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="rounded-full">
                <a
                  href="https://meetings-na2.hubspot.com/anam-khoja"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Contact Sales
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full">
                <a href="/gcc-list">Get Free GCC Data</a>
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Pricing;
