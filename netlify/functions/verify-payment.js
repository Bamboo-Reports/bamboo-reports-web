import crypto from 'crypto';
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
      productSlug,
      customerPhone
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
      
      // Fetch payment details from Razorpay to get customer email
      let actualCustomerEmail = customerEmail;
      let actualCustomerName = customerName;
      
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
      } catch (fetchError) {
        console.error('[VERIFY] Could not fetch payment details:', fetchError.message);
        console.log('[VERIFY] Will use email from request if available');
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

      // Save purchase to database if user is logged in
      if (userId && productSlug && actualCustomerEmail) {
        console.log('[PURCHASE] Saving purchase to database');
        console.log('[PURCHASE] User ID:', userId);
        console.log('[PURCHASE] Product:', productSlug);

        try {
          const savePurchaseUrl = `${process.env.URL || 'http://localhost:8888'}/.netlify/functions/save-purchase`;
          console.log('[PURCHASE] Calling save-purchase function at:', savePurchaseUrl);

          const purchaseResponse = await fetch(savePurchaseUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              userId,
              productSlug,
              razorpayOrderId: razorpay_order_id,
              razorpayPaymentId: razorpay_payment_id,
              amount,
              currency,
              customerEmail: actualCustomerEmail,
              customerName: actualCustomerName,
              customerPhone,
            }),
          });

          console.log('[PURCHASE] Save purchase response status:', purchaseResponse.status);

          if (!purchaseResponse.ok) {
            const errorData = await purchaseResponse.json();
            console.error('[PURCHASE] Failed to save purchase');
            console.error('[PURCHASE] Error details:', errorData);
          } else {
            const successData = await purchaseResponse.json();
            console.log('[PURCHASE] Purchase saved successfully');
            console.log('[PURCHASE] Purchase ID:', successData.purchaseId);
          }
        } catch (purchaseError) {
          // Don't fail the payment verification if database save fails
          console.error('[PURCHASE] Error calling save-purchase function:', purchaseError.message);
          console.error('[PURCHASE] Full error:', purchaseError);
        }
      } else {
        console.log('[PURCHASE] Skipping database save - user not logged in or missing data');
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
