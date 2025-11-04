import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const handler = async (event) => {
  console.log('🚀 send-confirmation-email function called');
  console.log('📅 Timestamp:', new Date().toISOString());
  
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    console.log('❌ Wrong HTTP method:', event.httpMethod);
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    console.log('📦 Raw event body:', event.body);
    
    const { 
      customerEmail, 
      customerName, 
      planName, 
      amount, 
      currency, 
      paymentId, 
      orderId 
    } = JSON.parse(event.body);
    
    console.log('📧 Email details:');
    console.log('  - To:', customerEmail);
    console.log('  - Name:', customerName);
    console.log('  - Plan:', planName);
    console.log('  - Amount:', amount);
    console.log('  - Currency:', currency);
    console.log('  - Payment ID:', paymentId);
    console.log('  - Order ID:', orderId);

    // Validate input
    if (!customerEmail || !planName || !paymentId) {
      console.log('❌ Missing required fields!');
      console.log('  - customerEmail:', customerEmail ? '✅' : '❌');
      console.log('  - planName:', planName ? '✅' : '❌');
      console.log('  - paymentId:', paymentId ? '✅' : '❌');
      
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
          error: 'Missing required fields: customerEmail, planName, paymentId',
        }),
      };
    }

    const currencySymbol = currency === 'USD' ? '$' : '₹';

    // Check API key
    if (!process.env.RESEND_API_KEY) {
      console.log('❌ RESEND_API_KEY not found in environment variables!');
      throw new Error('RESEND_API_KEY not configured');
    }
    
    console.log('✅ RESEND_API_KEY found:', process.env.RESEND_API_KEY.substring(0, 8) + '...');
    console.log('📨 Attempting to send email via Resend...');

    // Send email using Resend
    const data = await resend.emails.send({
      from: 'Bamboo Reports <noreply@updates.bambooreports.io>',
      to: [customerEmail],
      subject: `Payment Confirmation - ${planName}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Payment Confirmation</title>
          </head>
          <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
              <h1 style="color: white; margin: 0;">Payment Successful! 🎉</h1>
            </div>
            
            <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
              <p style="font-size: 16px;">Hi ${customerName || 'there'},</p>
              
              <p style="font-size: 16px;">Thank you for your purchase! Your payment has been processed successfully.</p>
              
              <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #667eea;">
                <h2 style="margin-top: 0; color: #667eea;">Order Details</h2>
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 8px 0; font-weight: bold;">Plan:</td>
                    <td style="padding: 8px 0;">${planName}</td>
                  </tr>
                  ${amount ? `
                  <tr>
                    <td style="padding: 8px 0; font-weight: bold;">Amount:</td>
                    <td style="padding: 8px 0; font-size: 18px; color: #667eea; font-weight: bold;">${currencySymbol}${(amount / 100).toLocaleString()}</td>
                  </tr>
                  ` : ''}
                  <tr>
                    <td style="padding: 8px 0; font-weight: bold;">Payment ID:</td>
                    <td style="padding: 8px 0; font-family: monospace; font-size: 12px;">${paymentId}</td>
                  </tr>
                  ${orderId ? `
                  <tr>
                    <td style="padding: 8px 0; font-weight: bold;">Order ID:</td>
                    <td style="padding: 8px 0; font-family: monospace; font-size: 12px;">${orderId}</td>
                  </tr>
                  ` : ''}
                  <tr>
                    <td style="padding: 8px 0; font-weight: bold;">Date:</td>
                    <td style="padding: 8px 0;">${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</td>
                  </tr>
                </table>
              </div>
              
              <div style="background: #e3f2fd; padding: 15px; border-radius: 8px; margin: 20px 0;">
                <h3 style="margin-top: 0; color: #1976d2;">What's Next?</h3>
                <ul style="margin: 0; padding-left: 20px;">
                  <li>Our team will review your purchase</li>
                  <li>You'll receive access credentials within 24 hours</li>
                  <li>Check your dashboard for report access</li>
                  <li>Contact us if you have any questions</li>
                </ul>
              </div>
              
              <p style="font-size: 16px;">If you have any questions, feel free to reply to this email or contact our support team.</p>
              
              <div style="text-align: center; margin-top: 30px;">
                <a href="https://bambooreports.io/reports" style="background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 25px; display: inline-block; font-weight: bold;">View Your Reports</a>
              </div>
              
              <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
              
              <p style="font-size: 14px; color: #666; text-align: center;">
                Bamboo Reports - GCC Intelligence Platform<br>
                <a href="https://bambooreports.io" style="color: #667eea; text-decoration: none;">www.bambooreports.io</a>
              </p>
            </div>
          </body>
        </html>
      `,
      text: `
Payment Confirmation - ${planName}

Hi ${customerName || 'there'},

Thank you for your purchase! Your payment has been processed successfully.

Order Details:
- Plan: ${planName}
${amount ? `- Amount: ${currencySymbol}${(amount / 100).toLocaleString()}` : ''}
- Payment ID: ${paymentId}
${orderId ? `- Order ID: ${orderId}` : ''}
- Date: ${new Date().toLocaleDateString()}

What's Next?
- Our team will review your purchase
- You'll receive access credentials within 24 hours
- Check your dashboard for report access
- Contact us if you have any questions

If you have any questions, feel free to reply to this email or contact our support team.

Bamboo Reports - GCC Intelligence Platform
www.bambooreports.io
      `,
    });

    console.log('✅ Email sent successfully!');
    console.log('📬 Email ID:', data.id);
    console.log('🎉 Function completed successfully');

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        success: true,
        message: 'Confirmation email sent successfully',
        emailId: data.id,
      }),
    };
  } catch (error) {
    console.error('❌❌❌ ERROR SENDING EMAIL ❌❌❌');
    console.error('Error type:', error.name);
    console.error('Error message:', error.message);
    console.error('Full error:', error);
    
    // Check for common issues
    if (error.message.includes('domain')) {
      console.error('💡 TIP: Domain might not be verified in Resend dashboard');
    }
    if (error.message.includes('API key') || error.message.includes('unauthorized')) {
      console.error('💡 TIP: Check RESEND_API_KEY in Netlify environment variables');
    }
    
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        error: 'Failed to send confirmation email',
        message: error.message,
      }),
    };
  }
};

