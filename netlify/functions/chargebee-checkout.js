// Chargebee Node.js client - using correct constructor syntax
const Chargebee = require('chargebee');

// Initialize Chargebee with constructor (v18+ syntax)
const chargebee = new Chargebee({
    site: process.env.VITE_CHARGEBEE_SITE || '',
    apiKey: process.env.CHARGEBEE_API_KEY || '',
});

exports.handler = async (event) => {
    // CORS headers
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
    };

    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 204, headers, body: '' };
    }

    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            headers,
            body: JSON.stringify({ error: 'Method not allowed' }),
        };
    }

    try {
        const { planPriceId, customerEmail, customerName, userId } = JSON.parse(event.body || '{}');

        if (!planPriceId) {
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({ error: 'planPriceId is required' }),
            };
        }

        console.log('Creating checkout for:', { planPriceId, customerEmail });

        // Create hosted checkout page - using snake_case for API params
        const result = await chargebee.hostedPage.checkoutNewForItems({
            subscription_items: [{
                item_price_id: planPriceId,
                quantity: 1,
            }],
            customer: {
                email: customerEmail || `test-${Date.now()}@example.com`,
                first_name: customerName || 'Test User',
            },
            redirect_url: `${process.env.URL || 'http://localhost:8888'}/checkout-success`,
            cancel_url: `${process.env.URL || 'http://localhost:8888'}/pricing`,
        });

        console.log('Checkout created successfully:', result.hosted_page.id);

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({
                hostedPageUrl: result.hosted_page.url,
                hostedPageId: result.hosted_page.id,
            }),
        };
    } catch (error) {
        console.error('Chargebee checkout error:', error);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({
                error: error.message || 'Failed to create checkout session',
                details: error.api_error_code || 'unknown',
            }),
        };
    }
};
