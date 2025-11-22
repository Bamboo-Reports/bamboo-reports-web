import { useState } from 'react';
import { Navigate, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useUserPurchases } from '../hooks/usePurchaseAccess';
import { PlanDocuments } from '../components/PlanDocuments';
import { Button } from '../components/ui/button';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../components/ui/tabs';
import { ShoppingBag, AlertCircle, FileText, ArrowLeft } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import usePageTitle from '../hooks/usePageTitle';

export default function MyContent() {
  usePageTitle("My Content");
  const navigate = useNavigate();
  const { user } = useAuth();
  const { purchases, isLoading, error } = useUserPurchases();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  // Redirect to sign-in if not authenticated
  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground text-lg">Loading your content...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="py-20 px-4">
          <div className="max-w-md w-full mx-auto">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
              <AlertCircle className="h-12 w-12 text-red-600 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-red-900 mb-2">Error Loading Content</h2>
              <p className="text-red-700">{error}</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // No purchases
  if (purchases.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-card border rounded-lg p-12 text-center">
              <ShoppingBag className="h-20 w-20 text-muted-foreground mx-auto mb-6" />
              <h2 className="text-2xl font-semibold mb-2">No Purchases Yet</h2>
              <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                You haven't purchased any plans yet. Browse our pricing to get started with GCC Intelligence Platform.
              </p>
              <Button
                onClick={() => navigate("/pricing")}
                size="lg"
                className="rounded-full"
              >
                View Pricing Plans
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Get unique plan names
  const planNames = [...new Set(purchases.map(p => p.plan_name))];

  // Select first plan by default
  const activePlan = selectedPlan || planNames[0];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Page Header with Back Button */}
          <div className="mb-8">
            <Button
              variant="ghost"
              onClick={() => navigate(-1)}
              className="mb-4 -ml-4"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            <h1 className="text-4xl font-bold tracking-tight text-foreground flex items-center gap-3">
              <FileText className="h-10 w-10 text-primary" />
              My Content
            </h1>
            <p className="text-muted-foreground mt-2 text-lg">
              Access all your purchased reports, documents, and data
            </p>
          </div>

          {/* Plan Tabs */}
          {planNames.length > 1 ? (
            <Tabs value={activePlan} onValueChange={setSelectedPlan} className="space-y-6">
              <TabsList className="grid w-full max-w-md" style={{ gridTemplateColumns: `repeat(${planNames.length}, 1fr)` }}>
                {planNames.map((planName) => (
                  <TabsTrigger key={planName} value={planName}>
                    {planName}
                  </TabsTrigger>
                ))}
              </TabsList>

              {planNames.map((planName) => (
                <TabsContent key={planName} value={planName}>
                  <div className="bg-card border rounded-lg p-6">
                    <PlanDocuments planName={planName} />
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          ) : (
            <div className="bg-card border rounded-lg p-6">
              <PlanDocuments planName={planNames[0]} />
            </div>
          )}

          {/* CTA Section */}
          <div className="mt-12 bg-muted/30 rounded-lg border border-border p-8 text-center">
            <h3 className="text-2xl font-semibold mb-2">Need More Intelligence?</h3>
            <p className="text-muted-foreground mb-6">
              Explore our other plans to unlock more features and insights
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => navigate("/pricing")}
                size="lg"
                className="rounded-full"
              >
                View Pricing Plans
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate("/purchases")}
                size="lg"
                className="rounded-full"
              >
                View Purchase History
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
