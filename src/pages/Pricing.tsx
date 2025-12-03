import { useState, useEffect } from "react"; // Import useState and useEffect
import { Link, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Check, Compass, Map, Building2 } from "lucide-react";
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

  const deliverables = [
    {
      category: "GCC coverage",
      explorer: "L1 list: 2,400+ GCCs with sector, city, headcount",
      navigator: "L1 + L2: leadership, signals, benchmarks",
      enterprise: "Org-wide coverage + tailored cohorts",
    },
    {
      category: "Signals & updates",
      explorer: "Quarterly view, annual snapshot",
      navigator: "Monthly signals: hiring, city moves, capability adds",
      enterprise: "Signals + analyst validation and callouts",
    },
    {
      category: "Exports & activation",
      explorer: "Download-ready shortlists",
      navigator: "Saved views, exports, CRM/Sheets push",
      enterprise: "Custom delivery for GTM, PMO, HR, Finance",
    },
    {
      category: "Benchmarks",
      explorer: "Sector & city snapshots",
      navigator: "Benchmarking by sector, headcount, maturity",
      enterprise: "Executive-grade benchmarks with scenarios",
    },
    {
      category: "Analyst time",
      explorer: "Email support",
      navigator: "Up to 6 hours included",
      enterprise: "Program-level analyst hours and workshops",
    },
  ];

  const addOns = [
    {
      title: "Prospect enrichment sprint",
      description: "Custom prospect list aligned to your ICP and region focus.",
      price: "Starts $2,000 / INR 1,65,000",
    },
    {
      title: "Executive workshop",
      description: "90-minute session on GCC signals, benchmarks, and next steps.",
      price: "$1,200 / INR 99,000",
    },
    {
      title: "CRM integration",
      description: "Push Explorer/Navigator shortlists into your CRM/Sheets.",
      price: "Quote on request",
    },
  ];

  const faqs = [
    {
      question: "Do you refresh signals monthly?",
      answer: "Navigator and Enterprise include monthly signal refreshes; Explorer is quarterly with an annual snapshot.",
    },
    {
      question: "Can we pilot before Enterprise?",
      answer: "Yes - most teams start with Navigator for 60-90 days, then scope an Enterprise program.",
    },
    {
      question: "What is included in analyst hours?",
      answer: "Analysts synthesize signals, validate accounts, and prepare short POVs or slides for leadership.",
    },
    {
      question: "Do you support multi-team access?",
      answer: "Enterprise programs include coordinated intake and tailored deliverables for GTM, PMO, HR/TA, and Finance.",
    },
  ];

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

          {/* --- Deliverables Table --- */}
          <div className="mt-16 rounded-2xl border bg-muted/20 p-6 lg:p-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
              <div>
                <p className="text-sm font-semibold text-primary uppercase tracking-[0.18em]">Deliverables</p>
                <h2 className="text-2xl lg:text-3xl font-bold">What you get in each tier</h2>
              </div>
              <Button variant="outline" className="rounded-full" asChild>
                <a href="https://meetings-na2.hubspot.com/anam-khoja" target="_blank" rel="noopener noreferrer">Book a 20-min call</a>
              </Button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b text-muted-foreground">
                    <th className="py-3 pr-6 font-medium text-foreground">Deliverable</th>
                    <th className="py-3 pr-6 font-medium">Explorer</th>
                    <th className="py-3 pr-6 font-medium">Navigator</th>
                    <th className="py-3 font-medium">Enterprise</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {deliverables.map((row) => (
                    <tr key={row.category} className="align-top">
                      <td className="py-4 pr-6 font-semibold text-foreground">{row.category}</td>
                      <td className="py-4 pr-6 text-muted-foreground">{row.explorer}</td>
                      <td className="py-4 pr-6 text-muted-foreground">{row.navigator}</td>
                      <td className="py-4 text-muted-foreground">{row.enterprise}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* --- Add-ons --- */}
          <div className="mt-12 rounded-2xl border bg-card p-6 lg:p-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
              <div>
                <p className="text-sm font-semibold text-primary uppercase tracking-[0.18em]">Add-ons</p>
                <h2 className="text-2xl lg:text-3xl font-bold">Layer on what your team needs</h2>
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              {addOns.map((item) => (
                <div key={item.title} className="rounded-xl border bg-muted/30 p-5 shadow-sm">
                  <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{item.description}</p>
                  <p className="text-sm font-semibold text-primary">{item.price}</p>
                </div>
              ))}
            </div>
          </div>

          {/* --- FAQs --- */}
          <div className="mt-12 rounded-2xl border bg-muted/20 p-6 lg:p-8">
            <div className="flex flex-col gap-2 mb-6">
              <p className="text-sm font-semibold text-primary uppercase tracking-[0.18em]">FAQs</p>
              <h2 className="text-2xl lg:text-3xl font-bold">Answers to common questions</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {faqs.map((faq) => (
                <div key={faq.question} className="rounded-xl border bg-background p-5 shadow-sm">
                  <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>

          {/* --- CTA Strip --- */}
          <div className="mt-12 rounded-2xl border bg-gradient-to-r from-primary/15 via-primary/10 to-background p-6 lg:p-8 flex flex-col lg:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center lg:text-left">
              <h3 className="text-2xl font-bold">Want a walkthrough of Explorer, Navigator, or Enterprise?</h3>
              <p className="text-muted-foreground">Book a 20-min call and we will map the right deliverables to your team.</p>
            </div>
            <div className="flex flex-wrap justify-center lg:justify-end gap-3">
              <Button size="lg" className="rounded-full" asChild>
                <a href="https://meetings-na2.hubspot.com/anam-khoja" target="_blank" rel="noopener noreferrer">Book a 20-min call</a>
              </Button>
              <Button size="lg" variant="outline" className="rounded-full" asChild>
                <Link to="/products/explorer">View Explorer</Link>
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
