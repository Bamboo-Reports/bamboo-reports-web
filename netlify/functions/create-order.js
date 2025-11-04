import Razorpay from 'razorpay';

export const handler = async (event) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const { amount, currency, planName } = JSON.parse(event.body);

    // Validate input
    if (!amount || !currency || !planName) {
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
          error: 'Missing required fields: amount, currency, planName',
        }),
      };
    }

    // Initialize Razorpay
    const razorpay = new Razorpay({
      key_id: process.env.VITE_RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    // Create order options
    const options = {
      amount: amount, // amount in smallest currency unit (paise for INR, cents for USD)
      currency: currency,
      receipt: `receipt_${Date.now()}`,
      notes: {
        plan: planName,
        created_at: new Date().toISOString(),
      },
    };

    // Create order
    const order = await razorpay.orders.create(options);

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        orderId: order.id,
        amount: order.amount,
        currency: order.currency,
        receipt: order.receipt,
      }),
    };
  } catch (error) {
    console.error('Error creating order:', error);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        error: 'Failed to create order',
        message: error.message,
      }),
    };
  }
};

