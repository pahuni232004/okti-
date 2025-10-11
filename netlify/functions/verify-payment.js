const crypto = require('crypto');

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
    // Check if environment variables are set
    if (!process.env.RAZORPAY_KEY_SECRET) {
      console.error('Missing Razorpay key secret');
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ 
          error: 'Payment service configuration error',
          message: 'Razorpay credentials not configured' 
        })
      };
    }

    // Parse request body
    const { 
      razorpay_order_id, 
      razorpay_payment_id, 
      razorpay_signature,
      donorDetails,
      donationAmount,
      donationType
    } = JSON.parse(event.body);
    
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ 
          error: 'Missing required payment parameters' 
        })
      };
    }

    const body = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest('hex');

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      // Save donation details to Google Sheets if donor details are provided
      if (donorDetails && donationAmount) {
        try {
          console.log('Attempting to save donation to Google Sheets...', {
            donorName: donorDetails?.fullName,
            donationAmount,
            hasSheetsConfig: !!(process.env.GOOGLE_APPS_SCRIPT_URL)
          });
          
          const sheetsResponse = await fetch(`https://${event.headers.host}/.netlify/functions/save-to-sheets-simple`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              donorDetails,
              paymentDetails: {
                razorpay_payment_id,
                razorpay_order_id,
                razorpay_signature
              },
              donationAmount,
              donationType
            })
          });
          
          const sheetsResult = await sheetsResponse.json();
          console.log('Google Sheets save result:', {
            ok: sheetsResponse.ok,
            status: sheetsResponse.status,
            result: sheetsResult
          });
          
          if (!sheetsResponse.ok) {
            console.error('Google Sheets save failed:', {
              status: sheetsResponse.status,
              error: sheetsResult.error,
              message: sheetsResult.message,
              debug: sheetsResult.debug
            });
          } else {
            console.log('Donation details saved to Google Sheets successfully');
          }
        } catch (sheetsError) {
          console.error('Failed to save to Google Sheets:', {
            error: sheetsError.message,
            stack: sheetsError.stack
          });
          // Don't fail the payment verification if sheets save fails
        }
      }

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          message: 'Payment verified successfully',
          payment_id: razorpay_payment_id
        })
      };
    } else {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          success: false,
          error: 'Invalid payment signature'
        })
      };
    }
  } catch (error) {
    console.error('Error verifying payment:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Failed to verify payment',
        message: error.message 
      })
    };
  }
};
