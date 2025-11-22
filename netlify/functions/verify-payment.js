import crypto from 'crypto';
import Razorpay from 'razorpay';
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
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      customerEmail,
      customerName,
      planName,
      amount,
      currency,
      userId,
      features,
      orderId
    } = JSON.parse(event.body);

    // Validate input
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
          error: 'Missing required fields for verification',
        }),
      };
    }

    // Create signature
    const sign = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(sign.toString())
      .digest('hex');

    // Verify signature
    if (razorpay_signature === expectedSign) {
      console.log('[VERIFY] Payment signature verified successfully');

      // Initialize Supabase client with service role key for admin operations
      const supabase = createClient(
        process.env.VITE_SUPABASE_URL,
        process.env.SUPABASE_SERVICE_ROLE_KEY // Service role key for bypassing RLS
      );

      // Fetch payment details from Razorpay to get customer email
      let actualCustomerEmail = customerEmail;
      let actualCustomerName = customerName;
      let paymentMethod = null;

      try {
        console.log('[VERIFY] Fetching payment details from Razorpay API');
        
        const razorpay = new Razorpay({
          key_id: process.env.VITE_RAZORPAY_KEY_ID,
          key_secret: process.env.RAZORPAY_KEY_SECRET,
        });
        
        const paymentDetails = await razorpay.payments.fetch(razorpay_payment_id);
        console.log('[VERIFY] Payment details received:', {
          email: paymentDetails.email,
          contact: paymentDetails.contact,
          method: paymentDetails.method
        });

        // Use email from Razorpay if available
        if (paymentDetails.email) {
          actualCustomerEmail = paymentDetails.email;
          console.log('[VERIFY] Customer email found:', actualCustomerEmail);
        }

        // Extract name from notes or use provided name
        if (paymentDetails.notes && paymentDetails.notes.name) {
          actualCustomerName = paymentDetails.notes.name;
        }

        // Capture payment method
        if (paymentDetails.method) {
          paymentMethod = paymentDetails.method;
          console.log('[VERIFY] Payment method:', paymentMethod);
        }
      } catch (fetchError) {
        console.error('[VERIFY] Could not fetch payment details:', fetchError.message);
        console.log('[VERIFY] Will use email from request if available');
      }

      // Insert purchase record into Supabase
      if (userId) {
        try {
          console.log('[DB] Inserting purchase record into database');
          console.log('[DB] User ID:', userId);
          console.log('[DB] Plan:', planName);
          console.log('[DB] Amount:', amount / 100); // Convert paise to rupees/dollars

          const purchaseData = {
            user_id: userId,
            order_id: orderId || razorpay_order_id,
            razorpay_order_id: razorpay_order_id,
            razorpay_payment_id: razorpay_payment_id,
            plan_name: planName,
            amount: amount / 100, // Convert paise to rupees/dollars
            currency: currency,
            status: 'completed',
            features: features || [],
            payment_method: paymentMethod,
            purchased_at: new Date().toISOString(),
          };

          const { data: purchase, error: dbError } = await supabase
            .from('purchases')
            .insert([purchaseData])
            .select()
            .single();

          if (dbError) {
            console.error('[DB] Error inserting purchase:', dbError);
            // Don't fail the payment verification if database insert fails
            // The payment was successful, we just couldn't record it
          } else {
            console.log('[DB] Purchase record created successfully');
            console.log('[DB] Purchase ID:', purchase.id);
          }
        } catch (dbError) {
          console.error('[DB] Exception while inserting purchase:', dbError);
          // Don't fail the payment verification if database insert fails
        }
      } else {
        console.log('[DB] Skipping purchase record - no user ID provided');
      }

      // Payment is verified - send confirmation email
      if (actualCustomerEmail && planName) {
        console.log('[EMAIL] Preparing to send confirmation email');
        console.log('[EMAIL] Customer Email:', actualCustomerEmail);
        console.log('[EMAIL] Customer Name:', actualCustomerName);
        console.log('[EMAIL] Plan:', planName);
        
        try {
          const functionUrl = `${process.env.URL || 'http://localhost:8888'}/.netlify/functions/send-confirmation-email`;
          console.log('[EMAIL] Calling email function at:', functionUrl);
          
          // Call the send-confirmation-email function
          const emailResponse = await fetch(functionUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              customerEmail: actualCustomerEmail,
              customerName: actualCustomerName,
              planName,
              amount,
              currency,
              paymentId: razorpay_payment_id,
              orderId: razorpay_order_id,
            }),
          });
          
          console.log('[EMAIL] Email function response status:', emailResponse.status);
          
          if (!emailResponse.ok) {
            const errorData = await emailResponse.json();
            console.error('[EMAIL] Failed to send confirmation email');
            console.error('[EMAIL] Error details:', errorData);
          } else {
            const successData = await emailResponse.json();
            console.log('[EMAIL] Confirmation email sent successfully');
            console.log('[EMAIL] Email ID:', successData.emailId);
          }
        } catch (emailError) {
          // Don't fail the payment verification if email fails
          console.error('[EMAIL] Error calling email function:', emailError.message);
          console.error('[EMAIL] Full error:', emailError);
        }
      } else {
        console.log('[EMAIL] Skipping email - missing customer data');
        console.log('[EMAIL] customerEmail:', actualCustomerEmail ? 'present' : 'missing');
        console.log('[EMAIL] planName:', planName ? 'present' : 'missing');
        if (!actualCustomerEmail) {
          console.log('[EMAIL] TIP: Make sure to enter email in Razorpay payment form');
        }
      }

      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
          status: 'success',
          message: 'Payment verified successfully',
          paymentId: razorpay_payment_id,
          orderId: razorpay_order_id,
        }),
      };
    } else {
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
          status: 'failure',
          message: 'Invalid payment signature',
        }),
      };
    }
  } catch (error) {
    console.error('Error verifying payment:', error);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        error: 'Failed to verify payment',
        message: error.message,
      }),
    };
  }
};
