import { useState, useEffect } from "react"; // Import useState and useEffect
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Check, Compass, Map, Building2, X } from "lucide-react";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"; // Import ToggleGroup
import { useToast } from "@/hooks/use-toast";
import { useSEO } from "@/hooks/useSEO";
import { useAuth } from "@/contexts/AuthContext";
import { useGeolocation } from "@/hooks/useGeolocation";
import JotFormEmbed from "@/components/JotFormEmbed";
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

  // Detect user's location for automatic currency selection
  const { countryCode, loading: geoLoading } = useGeolocation();

  // State to manage the selected currency
  // Auto-detect based on country: IN = INR, others = USD
  const [currency, setCurrency] = useState(() => {
    // Check if there's a manually selected currency in sessionStorage
    const savedCurrency = sessionStorage.getItem("selectedCurrency");
    if (savedCurrency) {
      return savedCurrency;
    }
    // Default to USD while loading
    return "USD";
  });

  // Update currency when geolocation is detected
  useEffect(() => {
    if (!geoLoading && countryCode) {
      // Only auto-set if user hasn't manually selected a currency
      const savedCurrency = sessionStorage.getItem("selectedCurrency");
      if (!savedCurrency) {
        const detectedCurrency = countryCode === "IN" ? "INR" : "USD";
        setCurrency(detectedCurrency);
      }
    }
  }, [countryCode, geoLoading]);

  // Save currency selection when user manually changes it
  const handleCurrencyChange = (value: string) => {
    if (value) {
      setCurrency(value);
      sessionStorage.setItem("selectedCurrency", value);
    }
  };

  const [processingPlan, setProcessingPlan] = useState<string | null>(null);
  const [isInquiryPopupOpen, setIsInquiryPopupOpen] = useState(false);



  useEffect(() => {
    if (!isInquiryPopupOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsInquiryPopupOpen(false);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isInquiryPopupOpen]);

  const plans = [
    {
      name: "Explorer",
      icon: Compass,
      tagline: "Fast, defensible GCC coverage",
      price: { USD: "1,299", INR: "1,09,999" }, // <-- Add your INR price
      originalPrice: { USD: "5,000", INR: "4,15,000" }, // <-- Add your INR price
      // priceSuffix: "/onetime",
      popular: true,
      features: [
        {
          title: "Standard Trends Report",
          description: "Comprehensive GCC market insights",
        },
        {
          title: "L1 List - 2,500+ GCCs",
          description: "Limited view of GCC database",
        },
      ],
    },
    {
      name: "Navigator",
      icon: Map,
      tagline: "Signals and scenarios on tap",
      price: { USD: "6,999", INR: "5,79,999" }, // <-- Add your INR price
      originalPrice: { USD: "15,000", INR: "12,50,000" }, // <-- Add your INR price
      // priceSuffix: "/onetime",
      features: [
        {
          title: "Everything from Explorer",
          description: "All base features included",
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
      name: "Enterprise Intelligence",
      icon: Building2,
      tagline: "Program-level intelligence and support",
      price: "Custom", // Custom plan remains the same
      originalPrice: null,
      // priceSuffix: null,
      features: [
        {
          title: "Everything from Explorer + Navigator",
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

  const currencySymbol = currency === "USD" ? "$" : "INR ";


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
            const customerEmail = response.email || "";
            const customerName = response.name || "";

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

            // Redirect to success page with payment details
            navigate(
              `/payment-success?payment_id=${response.razorpay_payment_id}&order_id=${response.razorpay_order_id || ""}&plan=${encodeURIComponent(planName)}`
            );
          } catch (verifyError) {
            // Payment error toast notification is shown to the user below
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
      // Payment error toast notification is shown to the user below
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
              onValueChange={handleCurrencyChange}
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
                  className={`relative rounded-2xl border bg-card/80 p-8 flex flex-col gap-4 shadow-sm transition-transform duration-200 hover:-translate-y-1 ${plan.popular
                    ? "border-primary/60 shadow-lg shadow-primary/10"
                    : "border-border"
                    }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <span className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium shadow-sm">
                        Most Popular
                      </span>
                    </div>
                  )}

                  <div className="flex items-start gap-3">
                    <span className="rounded-full bg-primary/10 text-primary p-3">
                      <plan.icon className="h-5 w-5" />
                    </span>
                    <div className="space-y-1">
                      <h3 className="text-2xl font-bold">{plan.name}</h3>
                      <p className="text-sm text-muted-foreground">{plan.tagline}</p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    {isCustom ? (
                      <span className="text-4xl font-bold">Custom</span>
                    ) : (
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
                    )}
                  </div>

                  <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />

                  <ul className="space-y-4 flex-grow">
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

                  <div className="flex flex-col gap-2">
                    {isCustom ? (
                      <Button
                        className="w-full rounded-full"
                        variant={plan.popular ? "default" : "outline"}
                        onClick={() => setIsInquiryPopupOpen(true)}
                      >
                        Get Started
                      </Button>
                    ) : !isSubscriptionEnabled ? (
                      <Button
                        className="w-full rounded-full"
                        variant={plan.popular ? "default" : "outline"}
                        onClick={() => setIsInquiryPopupOpen(true)}
                      >
                        Get Started
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
                </div>
              );
            })}
          </div>


        </div>
      </main>

      <div
        className={`fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm transition-opacity duration-200 ${
          isInquiryPopupOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            setIsInquiryPopupOpen(false);
          }
        }}
        aria-hidden={!isInquiryPopupOpen}
      >
        <div className={`bg-white rounded-3xl shadow-2xl w-[95vw] lg:w-[420px] max-h-[95vh] lg:max-h-[90vh] relative overflow-hidden ${
          isInquiryPopupOpen ? "animate-modal-content" : ""
        }`}>
          <button
            onClick={() => setIsInquiryPopupOpen(false)}
            className="absolute top-4 right-5 bg-[#f39122] hover:bg-[#f39122]/90 text-white w-9 h-9 rounded-full flex items-center justify-center z-10 transition-transform duration-micro ease-smooth hover:scale-105"
            aria-label="Close inquiry form"
          >
            <X size={20} />
          </button>

          <div className="bg-gradient-to-br from-[#F2994A] to-[#F2C94C] text-white p-6 text-center">
            <h2 className="text-2xl font-bold mb-2">Bamboo Reports</h2>
            <p className="text-sm opacity-90">Fill out the form below to get started</p>
          </div>

          <div className="h-[600px] lg:h-[539px] overflow-hidden relative">
            <JotFormEmbed
              formId="260714112843450"
              title="[ BR ] - Inquiry"
              height="539px"
            />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Pricing;
