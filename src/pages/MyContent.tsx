import { useState, useEffect } from 'react';
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom';
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
  const [searchParams, setSearchParams] = useSearchParams();
  const { user } = useAuth();
  const { purchases, isLoading, error } = useUserPurchases();

  // CRITICAL: Read view parameter directly from URL to prevent flicker
  // This ensures we show the correct loading screen even during component remounts
  const getViewFromUrl = () => {
    const params = new URLSearchParams(window.location.search);
    return params.get('view');
  };
  const currentView = getViewFromUrl();

  // Redirect to sign-in if not authenticated
  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  // If viewing PDF or table, skip the loading screen and go straight to PlanDocuments
  // This prevents flicker from light loading screen → dark PDF/table loading screen
  if (isLoading && (currentView === 'pdf' || currentView === 'table')) {
    // Get the plan from URL or default to first available (we'll show it once loaded)
    const urlPlan = searchParams.get('plan');

    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="bg-card border rounded-lg p-6">
              {/* Render PlanDocuments immediately - it will show its own loading state */}
              {/* This maintains visual consistency (dark loading screen for PDFs) */}
              <PlanDocuments planName={urlPlan || ''} />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
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
        <main className="py-16 sm:py-20 px-3 sm:px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-card border rounded-lg p-8 sm:p-12 text-center">
              <ShoppingBag className="h-16 w-16 sm:h-20 sm:w-20 text-muted-foreground mx-auto mb-4 sm:mb-6" />
              <h2 className="text-xl sm:text-2xl font-semibold mb-2">No Purchases Yet</h2>
              <p className="text-muted-foreground mb-6 sm:mb-8 max-w-md mx-auto text-sm sm:text-base">
                You haven't purchased any plans yet. Browse our pricing to get started with GCC Intelligence Platform.
              </p>
              <Button
                onClick={() => navigate("/pricing")}
                size="lg"
                className="rounded-full hover:scale-100 active:scale-100 text-sm sm:text-base"
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

  // Get plan from URL or use first plan as default
  const urlPlan = searchParams.get('plan');
  const activePlan = urlPlan && planNames.includes(urlPlan) ? urlPlan : planNames[0];

  // Update plan in URL when changed (preserve other params)
  const handlePlanChange = (planName: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('plan', planName);
    // Clear view and doc when switching plans
    params.delete('view');
    params.delete('doc');
    setSearchParams(params);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="py-16 sm:py-20 px-3 sm:px-4">
        <div className={currentView === 'table' ? 'max-w-[1800px] mx-auto' : 'max-w-7xl mx-auto'}>
          {/* Page Header with Back Button */}
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
              <FileText className="h-7 w-7 sm:h-9 sm:w-9 lg:h-10 lg:w-10 text-primary" />
              My Content
            </h1>
            <p className="text-muted-foreground mt-1 sm:mt-2 text-sm sm:text-base lg:text-lg">
              Access all your purchased reports, documents, and data
            </p>
          </div>

          {/* Plan Tabs */}
          {planNames.length > 1 ? (
            <Tabs value={activePlan} onValueChange={handlePlanChange} className="space-y-4 sm:space-y-6">
              <TabsList className="grid w-full max-w-md text-xs sm:text-sm" style={{ gridTemplateColumns: `repeat(${planNames.length}, 1fr)` }}>
                {planNames.map((planName) => (
                  <TabsTrigger key={planName} value={planName}>
                    {planName}
                  </TabsTrigger>
                ))}
              </TabsList>

              {planNames.map((planName) => (
                <TabsContent key={planName} value={planName}>
                  <div className="bg-card border rounded-lg p-4 sm:p-6">
                    <PlanDocuments planName={planName} />
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          ) : (
            <div className="bg-card border rounded-lg p-4 sm:p-6">
              <PlanDocuments planName={planNames[0]} />
            </div>
          )}

          {/* CTA Section */}
          <div className="mt-8 sm:mt-12 bg-muted/30 rounded-lg border border-border p-6 sm:p-8 text-center">
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
                onClick={() => navigate("/purchases")}
                size="lg"
                className="rounded-full hover:scale-100 active:scale-100 text-sm sm:text-base"
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
