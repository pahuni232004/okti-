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
    console.log('Simple Google Sheets function called');
    
    // Check if Google Apps Script URL is configured
    if (!process.env.GOOGLE_APPS_SCRIPT_URL) {
      console.error('Missing Google Apps Script URL');
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({
          error: 'Google Sheets configuration error',
          message: 'GOOGLE_APPS_SCRIPT_URL environment variable must be set',
          instructions: 'Please set up Google Apps Script and add the web app URL to Netlify environment variables'
        })
      };
    }

    // Parse request body
    const { 
      donorDetails, 
      paymentDetails, 
      donationAmount,
      donationType 
    } = JSON.parse(event.body);

    console.log('Saving donation to Google Sheets via Apps Script:', {
      donorName: donorDetails?.fullName,
      donationAmount,
      hasPaymentDetails: !!paymentDetails
    });

    // Prepare data for Google Sheets
    const donationData = {
      timestamp: new Date().toISOString(),
      donorName: donorDetails.fullName || 'N/A',
      emailAddress: donorDetails.emailAddress || 'N/A',
      phoneNumber: donorDetails.phoneNumber || 'N/A',
      panNumber: donorDetails.panNumber || 'N/A',
      address: donorDetails.address || 'N/A',
      donationAmount: donationAmount,
      donationType: donationType || 'one-time',
      paymentId: paymentDetails?.razorpay_payment_id || 'N/A',
      orderId: paymentDetails?.razorpay_order_id || 'N/A',
      donorMessage: donorDetails.message || 'N/A',
      newsletterSubscription: donorDetails.newsletter ? 'Yes' : 'No',
      status: 'Completed'
    };

    // Send data to Google Apps Script
    const response = await fetch(process.env.GOOGLE_APPS_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(donationData)
    });

    if (!response.ok) {
      throw new Error(`Google Apps Script request failed: ${response.status}`);
    }

    const result = await response.json();
    console.log('Google Sheets response:', result);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: 'Donation details saved to Google Sheets successfully',
        result: result
      })
    };

  } catch (error) {
    console.error('Error saving to Google Sheets:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Failed to save donation details',
        message: error.message,
        debug: {
          errorType: error.name,
          hasAppScriptUrl: !!process.env.GOOGLE_APPS_SCRIPT_URL
        }
      })
    };
  }
};
