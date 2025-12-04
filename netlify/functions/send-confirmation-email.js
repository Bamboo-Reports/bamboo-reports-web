import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const handler = async (event) => {
  console.log('[SEND-EMAIL] Function called');
  console.log('[SEND-EMAIL] Timestamp:', new Date().toISOString());
  
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    console.log('[SEND-EMAIL] Wrong HTTP method:', event.httpMethod);
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const { 
      customerEmail, 
      customerName, 
      planName, 
      amount, 
      currency, 
      paymentId, 
      orderId,
      invoiceId,
      invoiceNumber,
      invoiceUrl,
      invoicePdfBase64,
      invoiceFileName,
    } = JSON.parse(event.body);
    
    console.log('[SEND-EMAIL] Email details:');
    console.log('[SEND-EMAIL] To:', customerEmail);
    console.log('[SEND-EMAIL] Name:', customerName);
    console.log('[SEND-EMAIL] Plan:', planName);
    console.log('[SEND-EMAIL] Amount:', amount);
    console.log('[SEND-EMAIL] Currency:', currency);
    console.log('[SEND-EMAIL] Payment ID:', paymentId);
    console.log('[SEND-EMAIL] Order ID:', orderId);
    console.log('[SEND-EMAIL] Invoice ID:', invoiceId);
    console.log('[SEND-EMAIL] Invoice Number:', invoiceNumber);
    console.log('[SEND-EMAIL] Invoice URL:', invoiceUrl);
    console.log('[SEND-EMAIL] Invoice file:', invoiceFileName);

    // Validate input
    if (!customerEmail || !planName || !paymentId) {
      console.log('[SEND-EMAIL] Missing required fields');
      console.log('[SEND-EMAIL] customerEmail:', customerEmail ? 'present' : 'missing');
      console.log('[SEND-EMAIL] planName:', planName ? 'present' : 'missing');
      console.log('[SEND-EMAIL] paymentId:', paymentId ? 'present' : 'missing');
      
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

    const currencySymbol =
      currency === 'USD'
        ? '$'
        : currency === 'INR'
        ? '₹'
        : `${currency || ''} `;

    // Check API key
    if (!process.env.RESEND_API_KEY) {
      console.log('[SEND-EMAIL] RESEND_API_KEY not found in environment variables');
      throw new Error('RESEND_API_KEY not configured');
    }
    
    console.log('[SEND-EMAIL] RESEND_API_KEY found:', process.env.RESEND_API_KEY.substring(0, 8) + '...');

    const attachments =
      invoicePdfBase64 && invoiceFileName
        ? [
            {
              filename: invoiceFileName,
              content: invoicePdfBase64,
              type: 'application/pdf',
            },
          ]
        : undefined;

    if (attachments) {
      console.log('[SEND-EMAIL] Attaching invoice PDF');
    } else {
      console.log('[SEND-EMAIL] No invoice attachment provided');
    }

    const invoiceHtmlBlock =
      invoiceNumber || invoiceUrl || invoicePdfBase64 || invoiceId
        ? `
          <div style="background: #f0f4ff; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #334155;">Invoice</h3>
            ${invoiceNumber ? `<p style="margin: 0 0 8px;">Invoice Number: <strong>${invoiceNumber}</strong></p>` : ''}
            ${invoiceId ? `<p style="margin: 0 0 8px;">Invoice ID: <strong>${invoiceId}</strong></p>` : ''}
            ${invoiceUrl ? `<p style="margin: 0 0 8px;">View online: <a href="${invoiceUrl}" style="color: #667eea; text-decoration: none;">${invoiceUrl}</a></p>` : ''}
            ${invoicePdfBase64 ? `<p style="margin: 0;">A PDF copy is attached for your records.</p>` : ''}
          </div>
        `
        : '';

    const invoiceTextLines = [];
    if (invoiceNumber) invoiceTextLines.push(`Invoice Number: ${invoiceNumber}`);
    if (invoiceId) invoiceTextLines.push(`Invoice ID: ${invoiceId}`);
    if (invoiceUrl) invoiceTextLines.push(`Invoice Link: ${invoiceUrl}`);
    if (invoicePdfBase64) invoiceTextLines.push('Invoice PDF attached.');
    const invoiceTextBlock =
      invoiceTextLines.length > 0
        ? `\nInvoice:\n${invoiceTextLines.map((line) => `- ${line}`).join('\n')}\n`
        : '';

    console.log('[SEND-EMAIL] Attempting to send email via Resend');

    // Send email using Resend
    const data = await resend.emails.send({
      from: 'Bamboo Reports <noreply@updates.bambooreports.io>',
      to: [customerEmail],
      subject: `Payment Confirmation - ${planName}`,
      attachments,
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
              <h1 style="color: white; margin: 0;">Payment Successful!</h1>
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

              ${invoiceHtmlBlock}
              
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
${invoiceTextBlock}
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

    console.log('[SEND-EMAIL] Email sent successfully');
    console.log('[SEND-EMAIL] Email ID:', data.id);
    console.log('[SEND-EMAIL] Function completed successfully');

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
    console.error('[SEND-EMAIL] ERROR SENDING EMAIL');
    console.error('[SEND-EMAIL] Error type:', error.name);
    console.error('[SEND-EMAIL] Error message:', error.message);
    console.error('[SEND-EMAIL] Full error:', error);
    
    // Check for common issues
    if (error.message.includes('domain')) {
      console.error('[SEND-EMAIL] TIP: Domain might not be verified in Resend dashboard');
    }
    if (error.message.includes('API key') || error.message.includes('unauthorized')) {
      console.error('[SEND-EMAIL] TIP: Check RESEND_API_KEY in Netlify environment variables');
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
