# Complete Google Sheets Setup Guide

## Overview
Instead of emails, all donation details will be automatically saved to a Google Sheets spreadsheet. This is much easier to set up and manage.

## What You'll Get
✅ **All donation details in one spreadsheet**
✅ **Automatic data entry when someone donates**
✅ **Easy to view, sort, and analyze donations**
✅ **No complex API setup required**
✅ **Real-time data updates**

---

## Step 1: Create Google Sheets File

1. **Go to [Google Sheets](https://sheets.google.com)**
2. **Click "Blank" to create a new spreadsheet**
3. **Name it**: "Okti Foundation Donations"
4. **Keep this tab open** - you'll need the spreadsheet ID

---

## Step 2: Set Up Google Apps Script

### 2.1 Create Apps Script Project
1. **Go to [Google Apps Script](https://script.google.com)**
2. **Click "New Project"**
3. **Delete the default code** and replace it with the code from `google-apps-script-code.js`
4. **Save the project** (Ctrl+S)
5. **Name it**: "Okti Foundation Donations Handler"

### 2.2 Deploy as Web App
1. **Click "Deploy" → "New deployment"**
2. **Click the gear icon** → **"Web app"**
3. **Set these options:**
   - **Execute as**: "Me"
   - **Who has access**: "Anyone"
4. **Click "Deploy"**
5. **Copy the Web App URL** (you'll need this for Netlify)

### 2.3 Test the Script
1. **In Apps Script editor, click "Run"** (the play button)
2. **Authorize the script** when prompted
3. **Check your Google Sheets** - you should see a test row added

---

## Step 3: Configure Netlify

### 3.1 Add Environment Variable
1. **Go to your Netlify dashboard**
2. **Site Settings** → **Environment Variables**
3. **Add this variable:**
   ```
   GOOGLE_APPS_SCRIPT_URL=your-web-app-url-from-step-2.2
   ```

### 3.2 Redeploy
1. **Trigger a new deployment** after adding the environment variable
2. **Go to Deploys** → **Trigger deploy** → **Deploy site**

---

## Step 4: Test the Integration

### 4.1 Test the Function
Visit: `https://okti-foundation.netlify.app/.netlify/functions/save-to-sheets-simple`

### 4.2 Make a Test Donation
1. **Go to your donation form**
2. **Fill out the form with test data**
3. **Complete the payment process**
4. **Check your Google Sheets** - you should see the donation details

---

## What Data Will Be Stored

| Column | Data |
|--------|------|
| A | Date & Time |
| B | Donor Name |
| C | Email Address |
| D | Phone Number |
| E | PAN Number |
| F | Address |
| G | Donation Amount |
| H | Donation Type |
| I | Payment ID |
| J | Order ID |
| K | Donor Message |
| L | Newsletter Subscription |
| M | Status |

---

## Benefits Over Email System

✅ **No email setup required**
✅ **All data in one organized spreadsheet**
✅ **Easy to export to Excel**
✅ **Can create charts and reports**
✅ **Real-time updates**
✅ **No email delivery issues**
✅ **Easy to share with team**
✅ **Automatic data backup**

---

## Troubleshooting

### Issue: "Google Sheets configuration error"
**Solution:** Make sure you added `GOOGLE_APPS_SCRIPT_URL` to Netlify environment variables

### Issue: "Failed to save donation details"
**Solution:** 
1. Check that your Google Apps Script is deployed as a web app
2. Verify the web app URL is correct
3. Make sure the script has permission to access your spreadsheet

### Issue: No data appears in sheets
**Solution:**
1. Check that the Apps Script is deployed with "Anyone" access
2. Verify the spreadsheet ID is correct
3. Run the test function in Apps Script editor

---

## Files Modified

- ✅ `netlify/functions/save-to-sheets-simple.js` - New function to save to sheets
- ✅ `netlify/functions/verify-payment.js` - Updated to use sheets instead of email
- ✅ `google-apps-script-code.js` - Code for Google Apps Script

---

## Next Steps

1. **Create Google Sheets file**
2. **Set up Google Apps Script** (copy the code)
3. **Deploy as web app**
4. **Add environment variable to Netlify**
5. **Redeploy your site**
6. **Test with a donation**

Once set up, every donation will automatically appear in your Google Sheets! 🎉

---

## Support

If you need help with any step, I can guide you through the process. The Google Sheets integration is much simpler than email setup and gives you better data management.
