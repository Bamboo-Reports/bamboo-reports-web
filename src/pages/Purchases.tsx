import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase, Purchase } from '@/lib/supabase';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, ShoppingBag, Calendar, DollarSign, Package, CheckCircle2, XCircle, Clock } from 'lucide-react';

const Purchases = () => {
  const { user } = useAuth();
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPurchases = async () => {
      if (!user) return;

      try {
        const { data, error } = await supabase
          .from('purchases')
          .select(`
            *,
            product:products(*)
          `)
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (error) throw error;

        setPurchases(data || []);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPurchases();
  }, [user]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="h-5 w-5 text-green-600" />;
      case 'failed':
        return <XCircle className="h-5 w-5 text-red-600" />;
      default:
        return <Clock className="h-5 w-5 text-yellow-600" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Completed</Badge>;
      case 'failed':
        return <Badge variant="destructive">Failed</Badge>;
      default:
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pending</Badge>;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-bamboo" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-bamboo-light/10 to-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-bamboo mb-2 flex items-center gap-2">
            <ShoppingBag className="h-8 w-8" />
            My Purchases
          </h1>
          <p className="text-gray-600">View and manage your Bamboo Reports purchases</p>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {purchases.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <ShoppingBag className="h-16 w-16 mx-auto text-gray-300 mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No purchases yet</h3>
              <p className="text-gray-500 mb-6">
                You haven't made any purchases. Check out our pricing page to get started.
              </p>
              <a
                href="/pricing"
                className="inline-flex items-center justify-center px-6 py-3 bg-bamboo text-white rounded-md hover:bg-bamboo-dark transition-colors"
              >
                View Pricing
              </a>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {purchases.map((purchase) => (
              <Card key={purchase.id} className="overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-bamboo-light/5 to-transparent">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <CardTitle className="flex items-center gap-2 mb-2">
                        <Package className="h-5 w-5 text-bamboo" />
                        {purchase.product?.name || 'Product'}
                      </CardTitle>
                      <CardDescription className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        {new Date(purchase.created_at).toLocaleDateString('en-US', {
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-3">
                      {getStatusIcon(purchase.status)}
                      {getStatusBadge(purchase.status)}
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="pt-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium text-gray-500 mb-1">Product Description</h4>
                        <p className="text-base">{purchase.product?.description || 'N/A'}</p>
                      </div>

                      {purchase.product?.features && purchase.product.features.length > 0 && (
                        <div>
                          <h4 className="text-sm font-medium text-gray-500 mb-2">Features</h4>
                          <ul className="space-y-1">
                            {(purchase.product.features as string[]).slice(0, 3).map((feature, index) => (
                              <li key={index} className="text-sm flex items-start gap-2">
                                <CheckCircle2 className="h-4 w-4 text-bamboo mt-0.5 flex-shrink-0" />
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                    <div className="space-y-4">
                      <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Amount</span>
                          <span className="text-lg font-bold text-bamboo flex items-center gap-1">
                            <DollarSign className="h-4 w-4" />
                            {purchase.amount.toLocaleString()} {purchase.currency}
                          </span>
                        </div>

                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Order ID</span>
                          <span className="font-mono text-xs bg-white px-2 py-1 rounded">
                            {purchase.razorpay_order_id}
                          </span>
                        </div>

                        {purchase.razorpay_payment_id && (
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Payment ID</span>
                            <span className="font-mono text-xs bg-white px-2 py-1 rounded">
                              {purchase.razorpay_payment_id}
                            </span>
                          </div>
                        )}
                      </div>

                      {purchase.status === 'completed' && (
                        <Alert className="bg-green-50 border-green-200">
                          <CheckCircle2 className="h-4 w-4 text-green-600" />
                          <AlertDescription className="text-green-800">
                            Payment successful! You should receive access details via email within 24 hours.
                          </AlertDescription>
                        </Alert>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Purchases;
