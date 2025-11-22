import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CheckCircle2, Package, Calendar, CreditCard, IndianRupee, DollarSign } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import usePageTitle from "@/hooks/usePageTitle";
import { Skeleton } from "@/components/ui/skeleton";

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
  const { user } = useAuth();
  const { toast } = useToast();
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [loading, setLoading] = useState(true);

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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatAmount = (amount: number, currency: string) => {
    const formattedAmount = amount.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    return currency === "INR" ? `₹${formattedAmount}` : `$${formattedAmount}`;
  };

  const getCurrencyIcon = (currency: string) => {
    return currency === "INR" ? IndianRupee : DollarSign;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 py-12 px-4 sm:px-6 lg:px-8">
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
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <Package className="h-8 w-8 text-primary" />
            My Purchases
          </h1>
          <p className="text-muted-foreground mt-2">
            View all your purchased plans and their features
          </p>
        </div>

        {/* Purchases List */}
        {purchases.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <Package className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">No purchases yet</h3>
              <p className="text-muted-foreground mb-6">
                You haven't made any purchases yet. Check out our pricing plans to get started.
              </p>
              <a
                href="/pricing"
                className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                View Pricing Plans
              </a>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {purchases.map((purchase) => {
              const CurrencyIcon = getCurrencyIcon(purchase.currency);

              return (
                <Card key={purchase.id} className="overflow-hidden">
                  <CardHeader className="bg-muted/50">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-2xl flex items-center gap-2">
                          {purchase.plan_name}
                          <Badge variant="secondary" className="ml-2">
                            <CheckCircle2 className="h-3 w-3 mr-1" />
                            {purchase.status}
                          </Badge>
                        </CardTitle>
                        <CardDescription className="mt-2 flex items-center gap-4 text-sm">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            Purchased on {formatDate(purchase.purchased_at)}
                          </span>
                          <span className="flex items-center gap-1">
                            <CreditCard className="h-4 w-4" />
                            Order #{purchase.order_id}
                          </span>
                        </CardDescription>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center justify-end gap-1 text-2xl font-bold text-primary">
                          <CurrencyIcon className="h-6 w-6" />
                          {formatAmount(purchase.amount, purchase.currency)}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          {purchase.currency}
                        </p>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="pt-6">
                    {/* Features Section */}
                    {purchase.features && purchase.features.length > 0 && (
                      <div>
                        <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide mb-4">
                          What's Included
                        </h4>
                        <div className="grid gap-4 sm:grid-cols-2">
                          {purchase.features.map((feature, index) => (
                            <div
                              key={index}
                              className="flex gap-3 p-3 rounded-lg border bg-card hover:bg-muted/50 transition-colors"
                            >
                              <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                              <div>
                                <h5 className="font-medium text-sm leading-tight">
                                  {feature.title}
                                </h5>
                                <p className="text-xs text-muted-foreground mt-1">
                                  {feature.description}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Payment Details */}
                    <Separator className="my-6" />
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      {purchase.razorpay_payment_id && (
                        <div>
                          <p className="text-muted-foreground mb-1">Payment ID</p>
                          <p className="font-mono text-xs bg-muted px-2 py-1 rounded">
                            {purchase.razorpay_payment_id}
                          </p>
                        </div>
                      )}
                      {purchase.payment_method && (
                        <div>
                          <p className="text-muted-foreground mb-1">Payment Method</p>
                          <p className="font-medium capitalize">{purchase.payment_method}</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Purchases;
