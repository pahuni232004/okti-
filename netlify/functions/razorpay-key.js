exports.handler = async (event, context) => {
  // Handle CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, OPTIONS'
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
    if (!process.env.RAZORPAY_KEY_ID) {
      console.error('Missing Razorpay key ID');
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ 
          error: 'Payment service configuration error',
          message: 'Razorpay credentials not configured' 
        })
      };
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        key: process.env.RAZORPAY_KEY_ID
      })
    };
  } catch (error) {
    console.error('Error getting Razorpay key:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Failed to get Razorpay key',
        message: error.message 
      })
    };
  }
};
