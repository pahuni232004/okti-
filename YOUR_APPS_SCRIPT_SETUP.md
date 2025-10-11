# Google Apps Script Setup for Your Spreadsheet

## Your Spreadsheet Details
- **Spreadsheet ID**: `1NPjFMtKV7DAh9eTur4gcU9GCBoHYWBgg8yGcGtTpyZQ`
- **URL**: https://docs.google.com/spreadsheets/d/1NPjFMtKV7DAh9eTur4gcU9GCBoHYWBgg8yGcGtTpyZQ/edit?usp=sharing

## Step-by-Step Setup

### Step 1: Go to Google Apps Script
1. **Open this link**: [Google Apps Script](https://script.google.com)
2. **Sign in** with the same Google account that owns your spreadsheet
3. **Click "New Project"**

### Step 2: Replace the Default Code
1. **Delete all the default code** in the editor
2. **Copy and paste this code** (I've already updated it with your spreadsheet ID):

```javascript
// Google Apps Script Code for Okti Foundation Donations
// This code is already configured for your spreadsheet

function doPost(e) {
  try {
    // Parse the incoming data
    const data = JSON.parse(e.postData.contents);
    
    // Your specific spreadsheet ID
    const SPREADSHEET_ID = '1NPjFMtKV7DAh9eTur4gcU9GCBoHYWBgg8yGcGtTpyZQ';
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
```

### Step 3: Save the Project
1. **Click "Save"** (Ctrl+S)
2. **Name your project**: "Okti Foundation Donations Handler"
3. **Click "Save"**

### Step 4: Test the Script
1. **Click "Run"** (the play button)
2. **Authorize the script** when prompted:
   - Click "Review permissions"
   - Choose your Google account
   - Click "Advanced" → "Go to [Project Name] (unsafe)"
   - Click "Allow"
3. **Check your spreadsheet** - you should see a test row added

### Step 5: Deploy as Web App
1. **Click "Deploy"** → **"New deployment"**
2. **Click the gear icon** → **"Web app"**
3. **Set these options:**
   - **Execute as**: "Me"
   - **Who has access**: "Anyone"
4. **Click "Deploy"**
5. **Copy the Web App URL** (you'll need this for Netlify)

### Step 6: Configure Netlify
1. **Go to your Netlify dashboard**
2. **Site Settings** → **Environment Variables**
3. **Add this variable:**
   ```
   GOOGLE_APPS_SCRIPT_URL=your-web-app-url-from-step-5
   ```
4. **Redeploy your site**

### Step 7: Test the Integration
1. **Visit**: `https://okti-foundation.netlify.app/test-sheets.html`
2. **Click "Test Sheets Function"**
3. **Check your spreadsheet** - you should see the test data

## What Will Happen

### When Someone Donates:
1. ✅ Payment is processed through Razorpay
2. ✅ Payment is verified
3. ✅ **Data is automatically saved to your spreadsheet**
4. ✅ You can see all donation details in real-time

### Your Spreadsheet Will Show:
- Date & Time of donation
- Donor's full details (name, email, phone, PAN, address)
- Donation amount and type
- Payment IDs
- Donor message
- Newsletter subscription status
- Status (Completed)

## Troubleshooting

### If the test doesn't work:
1. **Check that you're signed in** to the correct Google account
2. **Make sure the script has permission** to access your spreadsheet
3. **Verify the spreadsheet ID** is correct
4. **Check the Netlify environment variable**

### If you see errors:
1. **Check the Apps Script logs** for error messages
2. **Verify the web app URL** is correct
3. **Make sure the script is deployed** with "Anyone" access

## Next Steps

1. **Set up the Apps Script** (follow steps above)
2. **Deploy as web app**
3. **Add the URL to Netlify**
4. **Redeploy your site**
5. **Test with a real donation**

Once set up, every donation will automatically appear in your spreadsheet! 🎉

Your spreadsheet URL: https://docs.google.com/spreadsheets/d/1NPjFMtKV7DAh9eTur4gcU9GCBoHYWBgg8yGcGtTpyZQ/edit?usp=sharing
