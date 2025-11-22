import { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
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
import { ShoppingBag, AlertCircle } from 'lucide-react';

export default function MyContent() {
  const { user } = useAuth();
  const { purchases, isLoading, error } = useUserPurchases();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  // Redirect to sign-in if not authenticated
  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading your content...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full mx-auto p-6">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <AlertCircle className="h-12 w-12 text-red-600 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-red-900 mb-2">Error Loading Content</h2>
            <p className="text-red-700">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  // No purchases
  if (purchases.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white border rounded-lg p-12 text-center">
            <ShoppingBag className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No Purchases Yet</h2>
            <p className="text-gray-600 mb-6">
              You haven't purchased any plans yet. Browse our pricing to get started!
            </p>
            <Link to="/pricing">
              <Button size="lg">
                View Pricing Plans
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Get unique plan names
  const planNames = [...new Set(purchases.map(p => p.plan_name))];

  // Select first plan by default
  const activePlan = selectedPlan || planNames[0];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Content</h1>
          <p className="text-gray-600">
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
                <div className="bg-white border rounded-lg p-6">
                  <PlanDocuments planName={planName} />
                </div>
              </TabsContent>
            ))}
          </Tabs>
        ) : (
          <div className="bg-white border rounded-lg p-6">
            <PlanDocuments planName={planNames[0]} />
          </div>
        )}

        {/* Purchase History Link */}
        <div className="mt-8 text-center">
          <Link to="/purchases">
            <Button variant="outline">
              View Purchase History
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
