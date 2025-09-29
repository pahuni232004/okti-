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
    const hasKeyId = !!process.env.RAZORPAY_KEY_ID;
    const hasKeySecret = !!process.env.RAZORPAY_KEY_SECRET;
    const nodeEnv = process.env.NODE_ENV || 'development';

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        status: 'ok',
        environment: {
          hasRazorpayKeyId: hasKeyId,
          hasRazorpayKeySecret: hasKeySecret,
          nodeEnv: nodeEnv,
          keyIdPrefix: process.env.RAZORPAY_KEY_ID ? process.env.RAZORPAY_KEY_ID.substring(0, 8) + '...' : 'not set'
        },
        message: hasKeyId && hasKeySecret ? 'Payment system configured correctly' : 'Missing Razorpay credentials'
      })
    };
  } catch (error) {
    console.error('Test payment error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Test failed',
        message: error.message 
      })
    };
  }
};
