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
      currency
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
      console.log('✅ Payment signature verified successfully!');
      
      // Fetch payment details from Razorpay to get customer email
      let actualCustomerEmail = customerEmail;
      let actualCustomerName = customerName;
      
      try {
        console.log('🔍 Fetching payment details from Razorpay API...');
        
        const razorpay = new Razorpay({
          key_id: process.env.VITE_RAZORPAY_KEY_ID,
          key_secret: process.env.RAZORPAY_KEY_SECRET,
        });
        
        const paymentDetails = await razorpay.payments.fetch(razorpay_payment_id);
        console.log('📦 Payment details received:', {
          email: paymentDetails.email,
          contact: paymentDetails.contact,
          method: paymentDetails.method
        });
        
        // Use email from Razorpay if available
        if (paymentDetails.email) {
          actualCustomerEmail = paymentDetails.email;
          console.log('✅ Customer email found from Razorpay:', actualCustomerEmail);
        }
        
        // Extract name from notes or use provided name
        if (paymentDetails.notes && paymentDetails.notes.name) {
          actualCustomerName = paymentDetails.notes.name;
        }
      } catch (fetchError) {
        console.error('⚠️ Could not fetch payment details:', fetchError.message);
        console.log('   Will use email from request if available');
      }
      
      // Payment is verified - send confirmation email
      if (actualCustomerEmail && planName) {
        console.log('📧 Preparing to send confirmation email...');
        console.log('  - Customer Email:', actualCustomerEmail);
        console.log('  - Customer Name:', actualCustomerName);
        console.log('  - Plan:', planName);
        
        try {
          const functionUrl = `${process.env.URL || 'http://localhost:8888'}/.netlify/functions/send-confirmation-email`;
          console.log('🔗 Calling email function at:', functionUrl);
          
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
          
          console.log('📬 Email function response status:', emailResponse.status);
          
          if (!emailResponse.ok) {
            const errorData = await emailResponse.json();
            console.error('❌ Failed to send confirmation email');
            console.error('Error details:', errorData);
          } else {
            const successData = await emailResponse.json();
            console.log('✅ Confirmation email sent successfully!');
            console.log('Email ID:', successData.emailId);
          }
        } catch (emailError) {
          // Don't fail the payment verification if email fails
          console.error('❌ Error calling email function:', emailError.message);
          console.error('Full error:', emailError);
        }
      } else {
        console.log('⚠️ Skipping email - missing customer data:');
        console.log('  - customerEmail:', actualCustomerEmail ? '✅' : '❌');
        console.log('  - planName:', planName ? '✅' : '❌');
        if (!actualCustomerEmail) {
          console.log('💡 TIP: Make sure to enter email in Razorpay payment form!');
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

