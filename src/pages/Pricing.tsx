import { useState } from "react"; // Import useState
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"; // Import ToggleGroup

const Pricing = () => {
  // State to manage the selected currency
  const [currency, setCurrency] = useState("USD");

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
                  className={`relative rounded-lg border p-8 flex flex-col ${
                    plan.popular
                      ? "border-primary shadow-lg scale-105"
                      : "border-border"
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
                          <span className="text-muted-foreground">
                            {plan.priceSuffix}
                          </span>
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
                      className="w-full"
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
                  ) : (
                    <Button
                      className="w-full"
                      variant={plan.popular ? "default" : "outline"}
                    >
                      Get Started
                    </Button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Pricing;
