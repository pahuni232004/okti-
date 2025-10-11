// Google Apps Script Code for Okti Foundation Donations
// Copy this code into a new Google Apps Script project

function doPost(e) {
  try {
    // Parse the incoming data
    const data = JSON.parse(e.postData.contents);
    
    // Get the spreadsheet (replace with your spreadsheet ID)
    // Option 1: Use active spreadsheet (if you run the script from within the sheet)
    // const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    
    // Option 2: Use specific spreadsheet ID (recommended)
    // Replace 'YOUR_SPREADSHEET_ID' with your actual spreadsheet ID
    const SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID'; // Replace this with your spreadsheet ID
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    
    let sheet = spreadsheet.getSheetByName('Donations');
    
    // Create sheet if it doesn't exist
    if (!sheet) {
      sheet = spreadsheet.insertSheet('Donations');
      
      // Add headers
      sheet.getRange(1, 1, 1, 13).setValues([[
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
      ]]);
      
      // Format headers
      sheet.getRange(1, 1, 1, 13).setFontWeight('bold');
      sheet.getRange(1, 1, 1, 13).setBackground('#35BCFF');
      sheet.getRange(1, 1, 1, 13).setFontColor('white');
    }
    
    // Prepare row data
    const rowData = [
      new Date(data.timestamp).toLocaleString('en-IN'),
      data.donorName || 'N/A',
      data.emailAddress || 'N/A',
      data.phoneNumber || 'N/A',
      data.panNumber || 'N/A',
      data.address || 'N/A',
      `₹${data.donationAmount.toLocaleString()}`,
      data.donationType || 'one-time',
      data.paymentId || 'N/A',
      data.orderId || 'N/A',
      data.donorMessage || 'N/A',
      data.newsletterSubscription || 'No',
      'Completed'
    ];
    
    // Add the new row
    sheet.appendRow(rowData);
    
    // Auto-resize columns
    sheet.autoResizeColumns(1, 13);
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        message: 'Donation details saved successfully',
        timestamp: new Date().toISOString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        error: error.message,
        timestamp: new Date().toISOString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Test function to verify the script works
function testScript() {
  const testData = {
    timestamp: new Date().toISOString(),
    donorName: 'Test Donor',
    emailAddress: 'test@example.com',
    phoneNumber: '+91 98765 43210',
    panNumber: 'ABCDE1234F',
    address: '123 Test Street, Test City',
    donationAmount: 1000,
    donationType: 'one-time',
    paymentId: 'pay_test123',
    orderId: 'order_test123',
    donorMessage: 'This is a test donation',
    newsletterSubscription: 'Yes',
    status: 'Completed'
  };
  
  const result = doPost({
    postData: {
      contents: JSON.stringify(testData)
    }
  });
  
  console.log('Test result:', result.getContent());
}
