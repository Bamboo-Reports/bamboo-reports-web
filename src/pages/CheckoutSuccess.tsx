import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { CheckCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function CheckoutSuccess() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [isProcessing, setIsProcessing] = useState(true);

    useEffect(() => {
        // Chargebee redirects with id parameter (hosted_page_id)
        const hostedPageId = searchParams.get('id');
        const state = searchParams.get('state');

        if (hostedPageId) {
            // Wait a moment then show success
            setTimeout(() => setIsProcessing(false), 1500);
        } else {
            setIsProcessing(false);
        }
    }, [searchParams]);

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-white">
            <Header />
            <main className="flex-1 container mx-auto px-4 py-16 flex items-center justify-center">
                <div className="max-w-md w-full text-center space-y-6">
                    {isProcessing ? (
                        <>
                            <Loader2 className="w-16 h-16 mx-auto animate-spin text-emerald-500" />
                            <h1 className="text-2xl font-bold">Processing your order...</h1>
                            <p className="text-gray-600">Please wait while we confirm your payment.</p>
                        </>
                    ) : (
                        <>
                            <CheckCircle className="w-16 h-16 mx-auto text-emerald-500" />
                            <h1 className="text-3xl font-bold">Payment Successful! 🎉</h1>
                            <p className="text-gray-600">
                                Thank you for your purchase. Your order is complete!
                            </p>
                            <div className="flex gap-3 justify-center">
                                <Button onClick={() => navigate('/purchases')}>
                                    View Purchases
                                </Button>
                                <Button variant="outline" onClick={() => navigate('/')}>
                                    Go Home
                                </Button>
                            </div>
                        </>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
}
