const { GoogleSpreadsheet } = require('google-spreadsheet');

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
    console.log('Google Sheets function called');
    
    // Check if environment variables are set
    if (!process.env.GOOGLE_SHEETS_ID || !process.env.GOOGLE_SHEETS_CREDENTIALS) {
      console.error('Missing Google Sheets credentials');
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({
          error: 'Google Sheets configuration error',
          message: 'GOOGLE_SHEETS_ID and GOOGLE_SHEETS_CREDENTIALS environment variables must be set',
          debug: {
            hasSheetsId: !!process.env.GOOGLE_SHEETS_ID,
            hasCredentials: !!process.env.GOOGLE_SHEETS_CREDENTIALS
          }
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

    console.log('Saving donation to Google Sheets:', {
      donorName: donorDetails?.fullName,
      donationAmount,
      hasPaymentDetails: !!paymentDetails
    });

    // Initialize Google Sheets
    const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEETS_ID);
    
    // Authenticate with service account
    const credentials = JSON.parse(process.env.GOOGLE_SHEETS_CREDENTIALS);
    await doc.useServiceAccountAuth(credentials);
    
    // Load document info
    await doc.loadInfo();
    
    // Get the first worksheet (or create if doesn't exist)
    let sheet;
    if (doc.sheetCount === 0) {
      // Create new sheet with headers
      sheet = await doc.addSheet({
        title: 'Donations',
        headerValues: [
          'Date & Time',
          'Donor Name', 
          'Email Address',
          'Phone Number',
          'PAN Number',
          'Address',
          'Donation Amount',
          'Donation Type',
          'Payment ID',
          'Order ID',
          'Donor Message',
          'Newsletter Subscription',
          'Status'
        ]
      });
    } else {
      sheet = doc.sheetsByIndex[0];
    }

    // Prepare row data
    const rowData = {
      'Date & Time': new Date().toLocaleString('en-IN'),
      'Donor Name': donorDetails.fullName || 'N/A',
      'Email Address': donorDetails.emailAddress || 'N/A',
      'Phone Number': donorDetails.phoneNumber || 'N/A',
      'PAN Number': donorDetails.panNumber || 'N/A',
      'Address': donorDetails.address || 'N/A',
      'Donation Amount': `₹${donationAmount.toLocaleString()}`,
      'Donation Type': donationType || 'one-time',
      'Payment ID': paymentDetails?.razorpay_payment_id || 'N/A',
      'Order ID': paymentDetails?.razorpay_order_id || 'N/A',
      'Donor Message': donorDetails.message || 'N/A',
      'Newsletter Subscription': donorDetails.newsletter ? 'Yes' : 'No',
      'Status': 'Completed'
    };

    // Add row to sheet
    const addedRow = await sheet.addRow(rowData);
    console.log('Row added to Google Sheets:', addedRow.rowNumber);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: 'Donation details saved to Google Sheets successfully',
        rowNumber: addedRow.rowNumber
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
          hasCredentials: !!(process.env.GOOGLE_SHEETS_ID && process.env.GOOGLE_SHEETS_CREDENTIALS)
        }
      })
    };
  }
};
