const nodemailer = require('nodemailer');

exports.handler = async (event, context) => {
  // Handle CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  try {
    // Parse request body
    const { 
      donorDetails, 
      paymentDetails, 
      donationAmount,
      donationType 
    } = JSON.parse(event.body);

    // Create email transporter using Gmail SMTP
    const transporter = nodemailer.createTransporter({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, // Your Gmail address
        pass: process.env.EMAIL_APP_PASSWORD // Gmail App Password
      }
    });

    // Format donor details
    const donorInfo = `
Donor Details:
- Name: ${donorDetails.fullName || 'N/A'}
- Email: ${donorDetails.emailAddress || 'N/A'}
- Phone: ${donorDetails.phoneNumber || 'N/A'}
- PAN: ${donorDetails.panNumber || 'N/A'}
- Address: ${donorDetails.address || 'N/A'}
- Newsletter: ${donorDetails.newsletter ? 'Yes' : 'No'}

Donation Details:
- Amount: ₹${donationAmount.toLocaleString()}
- Type: ${donationType}
- Payment ID: ${paymentDetails.razorpay_payment_id}
- Order ID: ${paymentDetails.razorpay_order_id}
- Date: ${new Date().toLocaleString('en-IN')}

Message: ${donorDetails.message || 'No message provided'}
    `;

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'oktifoundationhq@gmail.com',
      subject: `New Donation Received - ₹${donationAmount.toLocaleString()} from ${donorDetails.fullName}`,
      text: donorInfo,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #35BCFF;">🎉 New Donation Received!</h2>
          
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #2c3e50; margin-top: 0;">Donor Information</h3>
            <p><strong>Name:</strong> ${donorDetails.fullName || 'N/A'}</p>
            <p><strong>Email:</strong> ${donorDetails.emailAddress || 'N/A'}</p>
            <p><strong>Phone:</strong> ${donorDetails.phoneNumber || 'N/A'}</p>
            <p><strong>PAN Number:</strong> ${donorDetails.panNumber || 'N/A'}</p>
            <p><strong>Address:</strong> ${donorDetails.address || 'N/A'}</p>
            <p><strong>Newsletter Subscription:</strong> ${donorDetails.newsletter ? 'Yes' : 'No'}</p>
          </div>

          <div style="background: #e8f5e8; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #27ae60; margin-top: 0;">Donation Details</h3>
            <p><strong>Amount:</strong> ₹${donationAmount.toLocaleString()}</p>
            <p><strong>Type:</strong> ${donationType}</p>
            <p><strong>Payment ID:</strong> ${paymentDetails.razorpay_payment_id}</p>
            <p><strong>Order ID:</strong> ${paymentDetails.razorpay_order_id}</p>
            <p><strong>Date:</strong> ${new Date().toLocaleString('en-IN')}</p>
          </div>

          ${donorDetails.message ? `
          <div style="background: #fff3cd; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #856404; margin-top: 0;">Donor Message</h3>
            <p style="font-style: italic;">"${donorDetails.message}"</p>
          </div>
          ` : ''}

          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #666;">
            <p>This email was automatically sent from the Okti Foundation donation system.</p>
            <p>Please send the donor a receipt and 80G certificate.</p>
          </div>
        </div>
      `
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: 'Donation notification sent successfully'
      })
    };

  } catch (error) {
    console.error('Error sending donation email:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Failed to send donation notification',
        message: error.message
      })
    };
  }
};
