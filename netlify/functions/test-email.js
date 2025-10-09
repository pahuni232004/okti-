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
    console.log('Testing email configuration...');
    console.log('Environment check:', {
      hasEmailUser: !!process.env.EMAIL_USER,
      hasEmailPassword: !!process.env.EMAIL_APP_PASSWORD,
      emailUser: process.env.EMAIL_USER ? process.env.EMAIL_USER.substring(0, 5) + '...' : 'not set'
    });

    // Check if environment variables are set
    if (!process.env.EMAIL_USER || !process.env.EMAIL_APP_PASSWORD) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({
          error: 'Email configuration missing',
          message: 'EMAIL_USER and EMAIL_APP_PASSWORD environment variables must be set',
          debug: {
            hasEmailUser: !!process.env.EMAIL_USER,
            hasEmailPassword: !!process.env.EMAIL_APP_PASSWORD
          }
        })
      };
    }

    // Create email transporter using Gmail SMTP
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASSWORD
      }
    });

    // Test email content
    const testEmail = {
      from: process.env.EMAIL_USER,
      to: 'oktifoundationhq@gmail.com',
      subject: 'Test Email from Okti Foundation Donation System',
      text: 'This is a test email to verify that the email notification system is working correctly.',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #35BCFF;">🧪 Test Email</h2>
          <p>This is a test email to verify that the email notification system is working correctly.</p>
          <p><strong>Test Details:</strong></p>
          <ul>
            <li>Date: ${new Date().toLocaleString('en-IN')}</li>
            <li>Function: test-email</li>
            <li>Status: ✅ Email system is working</li>
          </ul>
          <p style="margin-top: 30px; color: #666;">
            If you received this email, your donation notification system is properly configured!
          </p>
        </div>
      `
    };

    // Send test email
    const result = await transporter.sendMail(testEmail);
    console.log('Test email sent successfully:', result.messageId);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: 'Test email sent successfully',
        messageId: result.messageId,
        debug: {
          from: testEmail.from,
          to: testEmail.to,
          subject: testEmail.subject
        }
      })
    };

  } catch (error) {
    console.error('Error sending test email:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Failed to send test email',
        message: error.message,
        debug: {
          errorType: error.name,
          hasCredentials: !!(process.env.EMAIL_USER && process.env.EMAIL_APP_PASSWORD)
        }
      })
    };
  }
};
