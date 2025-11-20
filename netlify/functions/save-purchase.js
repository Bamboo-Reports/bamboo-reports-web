import { createClient } from '@supabase/supabase-js';

export const handler = async (event) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const {
      userId,
      productSlug,
      razorpayOrderId,
      razorpayPaymentId,
      amount,
      currency,
      customerEmail,
      customerName,
      customerPhone,
    } = JSON.parse(event.body);

    // Validate required fields
    if (!userId || !productSlug || !razorpayOrderId || !amount || !currency || !customerEmail) {
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
          error: 'Missing required fields',
        }),
      };
    }

    // Initialize Supabase client with service role key (bypasses RLS)
    const supabaseUrl = process.env.VITE_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseServiceKey) {
      console.error('Supabase credentials are missing');
      return {
        statusCode: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
          error: 'Server configuration error',
        }),
      };
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Find the product by slug
    const { data: product, error: productError } = await supabase
      .from('products')
      .select('id')
      .eq('slug', productSlug)
      .single();

    if (productError || !product) {
      console.error('Product not found:', productError);
      return {
        statusCode: 404,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
          error: 'Product not found',
        }),
      };
    }

    // Check if purchase already exists (prevent duplicates)
    const { data: existingPurchase } = await supabase
      .from('purchases')
      .select('id')
      .eq('razorpay_order_id', razorpayOrderId)
      .single();

    if (existingPurchase) {
      console.log('Purchase already exists for order:', razorpayOrderId);
      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
          status: 'success',
          message: 'Purchase already recorded',
          purchaseId: existingPurchase.id,
        }),
      };
    }

    // Create purchase record
    const { data: purchase, error: purchaseError } = await supabase
      .from('purchases')
      .insert({
        user_id: userId,
        product_id: product.id,
        razorpay_order_id: razorpayOrderId,
        razorpay_payment_id: razorpayPaymentId,
        amount: amount,
        currency: currency,
        status: razorpayPaymentId ? 'completed' : 'pending',
        customer_email: customerEmail,
        customer_name: customerName,
        customer_phone: customerPhone,
      })
      .select()
      .single();

    if (purchaseError) {
      console.error('Error saving purchase:', purchaseError);
      return {
        statusCode: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
          error: 'Failed to save purchase',
          message: purchaseError.message,
        }),
      };
    }

    console.log('Purchase saved successfully:', purchase.id);

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        status: 'success',
        message: 'Purchase saved successfully',
        purchaseId: purchase.id,
      }),
    };
  } catch (error) {
    console.error('Error in save-purchase function:', error);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        error: 'Internal server error',
        message: error.message,
      }),
    };
  }
};
