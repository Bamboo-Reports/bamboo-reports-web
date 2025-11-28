import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CheckCircle2, Package, Calendar, CreditCard, IndianRupee, DollarSign, ChevronDown, ChevronUp, ArrowLeft, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import usePageTitle from "@/hooks/usePageTitle";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";

interface PurchaseFeature {
  title: string;
  description: string;
}

interface Purchase {
  id: string;
  order_id: string;
  razorpay_order_id: string;
  razorpay_payment_id: string;
  plan_name: string;
  amount: number;
  currency: string;
  status: string;
  features: PurchaseFeature[];
  payment_method: string;
  purchased_at: string;
}

const Purchases = () => {
  usePageTitle("My Purchases");
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedPurchases, setExpandedPurchases] = useState<Set<string>>(new Set());

  useEffect(() => {
    const fetchPurchases = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from("purchases")
          .select("*")
          .eq("user_id", user.id)
          .eq("status", "completed")
          .order("purchased_at", { ascending: false });

        if (error) throw error;

        setPurchases(data || []);
      } catch (error) {
        console.error("Error fetching purchases:", error);
        toast({
          variant: "destructive",
          title: "Error loading purchases",
          description: "Failed to load your purchases. Please try again later.",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchPurchases();
  }, [user, toast]);

  const togglePurchase = (purchaseId: string) => {
    setExpandedPurchases((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(purchaseId)) {
        newSet.delete(purchaseId);
      } else {
        newSet.add(purchaseId);
      }
      return newSet;
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatAmount = (amount: number, currency: string) => {
    return amount.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const getCurrencyIcon = (currency: string) => {
    return currency === "INR" ? IndianRupee : DollarSign;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <Skeleton className="h-10 w-64 mb-2" />
              <Skeleton className="h-6 w-96" />
            </div>
            <div className="space-y-6">
              {[1, 2].map((i) => (
                <Card key={i}>
                  <CardHeader>
                    <Skeleton className="h-8 w-48 mb-2" />
                    <Skeleton className="h-5 w-32" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-20 w-full" />
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="py-16 sm:py-20 px-3 sm:px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header with Back Button */}
          <div className="mb-6 sm:mb-8">
            <Button
              variant="ghost"
              onClick={() => navigate(-1)}
              className="mb-3 sm:mb-4 -ml-2 sm:-ml-4 text-xs sm:text-sm"
              size="sm"
            >
              <ArrowLeft className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
              Back
            </Button>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground flex items-center gap-2 sm:gap-3">
              <Package className="h-7 w-7 sm:h-9 sm:w-9 lg:h-10 lg:w-10 text-primary" />
              My Purchases
            </h1>
            <p className="text-muted-foreground mt-1 sm:mt-2 text-sm sm:text-base lg:text-lg">
              View all your purchased plans and their features
            </p>
          </div>

          {/* Purchases List */}
          {purchases.length === 0 ? (
            <Card className="text-center">
              <CardContent className="py-16">
                <Package className="h-20 w-20 mx-auto text-muted-foreground mb-6" />
                <h3 className="text-2xl font-semibold mb-2">No purchases yet</h3>
                <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                  You haven't made any purchases yet. Check out our pricing plans to get started with GCC Intelligence Platform.
                </p>
                <Button
                  onClick={() => navigate("/pricing")}
                  size="lg"
                  className="rounded-full hover:scale-100 active:scale-100"
                >
                  View Pricing Plans
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4 sm:space-y-6">
              {purchases.map((purchase) => {
                const CurrencyIcon = getCurrencyIcon(purchase.currency);
                const isExpanded = expandedPurchases.has(purchase.id);

                return (
                  <Collapsible
                    key={purchase.id}
                    open={isExpanded}
                    onOpenChange={() => togglePurchase(purchase.id)}
                  >
                    <Card className="overflow-hidden">
                      <CardHeader className="bg-muted/50">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <CardTitle className="text-lg sm:text-xl lg:text-2xl flex flex-wrap items-center gap-2 mb-2 sm:mb-3">
                              <span className="break-words">{purchase.plan_name}</span>
                              <Badge variant="secondary" className="shrink-0">
                                <CheckCircle2 className="h-3 w-3 mr-1" />
                                {purchase.status}
                              </Badge>
                            </CardTitle>
                            <CardDescription className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm">
                              <span className="flex items-center gap-1">
                                <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
                                {formatDate(purchase.purchased_at)}
                              </span>
                              <span className="flex items-center gap-1 break-all">
                                <CreditCard className="h-3 w-3 sm:h-4 sm:w-4" />
                                <span className="truncate">Order #{purchase.order_id}</span>
                              </span>
                            </CardDescription>
                          </div>
                          <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-2 shrink-0">
                            <div className="flex items-center gap-1 text-xl sm:text-2xl font-bold text-primary">
                              <CurrencyIcon className="h-5 w-5 sm:h-6 sm:w-6" />
                              <span className="whitespace-nowrap">{formatAmount(purchase.amount, purchase.currency)}</span>
                            </div>
                            <p className="text-xs text-muted-foreground">
                              {purchase.currency}
                            </p>
                          </div>
                        </div>

                        {/* Collapsible Trigger */}
                        <CollapsibleTrigger asChild>
                          <Button
                            variant="ghost"
                            className="w-full mt-3 sm:mt-4 flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99] text-xs sm:text-sm"
                            size="sm"
                          >
                            {isExpanded ? "Hide Details" : "View Details"}
                            <ChevronDown
                              className={cn(
                                "h-3 w-3 sm:h-4 sm:w-4 transition-transform duration-micro ease-smooth",
                                isExpanded && "rotate-180"
                              )}
                            />
                          </Button>
                        </CollapsibleTrigger>
                      </CardHeader>

                      <CollapsibleContent>
                        <CardContent className="pt-4 sm:pt-6">
                          {/* Features Section */}
                          {purchase.features && purchase.features.length > 0 && (
                            <div>
                              <h4 className="font-semibold text-xs sm:text-sm text-muted-foreground uppercase tracking-wide mb-3 sm:mb-4">
                                What's Included
                              </h4>
                              <div className="grid gap-2 sm:gap-3 sm:grid-cols-2 mb-4 sm:mb-6">
                                {purchase.features.map((feature, index) => (
                                  <div
                                    key={index}
                                    className="flex gap-2 sm:gap-3 p-2.5 sm:p-3 rounded-lg border bg-card hover:bg-muted/50 transition-colors duration-micro ease-smooth"
                                  >
                                    <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-primary flex-shrink-0 mt-0.5" />
                                    <div>
                                      <h5 className="font-medium text-xs sm:text-sm leading-tight">
                                        {feature.title}
                                      </h5>
                                      <p className="text-xs text-muted-foreground mt-0.5 sm:mt-1">
                                        {feature.description}
                                      </p>
                                    </div>
                                  </div>
                                ))}
                              </div>

                              {/* View Content Button */}
                              <div className="mt-4 sm:mt-6">
                                <Button
                                  onClick={() => navigate("/my-content")}
                                  size="lg"
                                  className="w-full sm:w-auto hover:scale-100 active:scale-100 text-sm sm:text-base"
                                >
                                  <FileText className="h-4 w-4 mr-2" />
                                  Access Your Content
                                </Button>
                              </div>
                            </div>
                          )}

                          {/* Payment Details */}
                          <Separator className="my-4 sm:my-6" />
                          <div>
                            <h4 className="font-semibold text-xs sm:text-sm text-muted-foreground uppercase tracking-wide mb-3 sm:mb-4">
                              Payment Details
                            </h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm">
                              {purchase.razorpay_payment_id && (
                                <div>
                                  <p className="text-muted-foreground mb-1 text-xs sm:text-sm">Payment ID</p>
                                  <p className="font-mono text-xs bg-muted px-2 sm:px-3 py-1.5 sm:py-2 rounded break-all">
                                    {purchase.razorpay_payment_id}
                                  </p>
                                </div>
                              )}
                              {purchase.payment_method && (
                                <div>
                                  <p className="text-muted-foreground mb-1 text-xs sm:text-sm">Payment Method</p>
                                  <p className="font-medium capitalize bg-muted px-2 sm:px-3 py-1.5 sm:py-2 rounded text-xs sm:text-sm">
                                    {purchase.payment_method}
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </CollapsibleContent>
                    </Card>
                  </Collapsible>
                );
              })}
            </div>
          )}

          {/* CTA Section */}
          {purchases.length > 0 && (
            <div className="mt-8 sm:mt-12 text-center bg-muted/30 rounded-lg border border-border p-6 sm:p-8">
              <h3 className="text-xl sm:text-2xl font-semibold mb-2">Need More Intelligence?</h3>
              <p className="text-muted-foreground mb-4 sm:mb-6 text-sm sm:text-base">
                Explore our other plans to unlock more features and insights
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <Button
                  onClick={() => navigate("/pricing")}
                  size="lg"
                  className="rounded-full hover:scale-100 active:scale-100 text-sm sm:text-base"
                >
                  View Pricing Plans
                </Button>
                <Button
                  variant="outline"
                  onClick={() => navigate("/reports")}
                  size="lg"
                  className="rounded-full hover:scale-100 active:scale-100 text-sm sm:text-base"
                >
                  View Reports
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Purchases;
