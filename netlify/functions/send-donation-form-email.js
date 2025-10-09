const nodemailer = require('nodemailer');

exports.handler = async (event, context) => {
  // Handle CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  try {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_APP_PASSWORD) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({
          error: 'Email service configuration error',
          message: 'EMAIL_USER and EMAIL_APP_PASSWORD must be set'
        })
      };
    }

    let data;
    try {
      data = JSON.parse(event.body || '{}');
    } catch (e) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: 'Invalid JSON body' }) };
    }

    const {
      amount,
      type,
      fullName,
      phoneNumber,
      emailAddress,
      panNumber,
      address,
      message,
      newsletter
    } = data;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_APP_PASSWORD }
    });

    const text = `New Donate Now form submission (pre-payment)

Donor Details:
- Name: ${fullName || 'N/A'}
- Email: ${emailAddress || 'N/A'}
- Phone: ${phoneNumber || 'N/A'}
- PAN: ${panNumber || 'N/A'}
- Address: ${address || 'N/A'}
- Newsletter: ${newsletter ? 'Yes' : 'No'}

Donation Details:
- Amount: ₹${(amount || 0).toLocaleString('en-IN')}
- Type: ${type || 'one-time'}
- Date: ${new Date().toLocaleString('en-IN')}

Message:
${message || 'No message provided'}`;

    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #35BCFF;">📝 New Donate Now Form Submission</h2>
        <div style="background: #f8f9fa; padding: 16px; border-radius: 8px; margin: 16px 0;">
          <h3 style="color: #2c3e50; margin: 0 0 8px;">Donor Information</h3>
          <p><strong>Name:</strong> ${fullName || 'N/A'}</p>
          <p><strong>Email:</strong> ${emailAddress || 'N/A'}</p>
          <p><strong>Phone:</strong> ${phoneNumber || 'N/A'}</p>
          <p><strong>PAN:</strong> ${panNumber || 'N/A'}</p>
          <p><strong>Address:</strong> ${address || 'N/A'}</p>
          <p><strong>Newsletter:</strong> ${newsletter ? 'Yes' : 'No'}</p>
        </div>
        <div style="background: #e8f5e8; padding: 16px; border-radius: 8px; margin: 16px 0;">
          <h3 style="color: #27ae60; margin: 0 0 8px;">Donation Details</h3>
          <p><strong>Amount:</strong> ₹${(amount || 0).toLocaleString('en-IN')}</p>
          <p><strong>Type:</strong> ${type || 'one-time'}</p>
          <p><strong>Date:</strong> ${new Date().toLocaleString('en-IN')}</p>
        </div>
        ${message ? `<div style="background: #fff8e1; padding: 16px; border-radius: 8px; margin: 16px 0;">
          <h3 style="color: #8d6e63; margin: 0 0 8px;">Message</h3>
          <p style="margin: 0;">${message}</p>
        </div>` : ''}
        <p style="color:#666; font-size: 12px;">This email was sent immediately after the donor submitted the form, before payment.</p>
      </div>
    `;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: 'oktifoundationhq@gmail.com',
      subject: `Donate Now Form - ${fullName || 'Unknown'} - ₹${(amount || 0).toLocaleString('en-IN')}`,
      text,
      html
    });

    return { statusCode: 200, headers, body: JSON.stringify({ success: true }) };
  } catch (error) {
    console.error('Form email error:', error);
    return { statusCode: 500, headers, body: JSON.stringify({ error: 'Failed to send email', message: error.message }) };
  }
};


