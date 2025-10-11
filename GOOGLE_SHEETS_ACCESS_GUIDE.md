# Google Sheets Access Guide

## Where to Access Your Donation Data

### **Option 1: Direct Google Sheets Access (Recommended)**

**Step 1: Create Your Spreadsheet**
1. Go to [Google Sheets](https://sheets.google.com)
2. Click "Blank" to create a new spreadsheet
3. Name it: **"Okti Foundation Donations"**
4. **Bookmark this spreadsheet** - this is where all donations will appear

**Step 2: Get the Spreadsheet ID**
1. Look at the URL: `https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit`
2. Copy the `SPREADSHEET_ID` part
3. You'll need this for the Apps Script setup

**Step 3: Set Up Apps Script**
1. Go to [Google Apps Script](https://script.google.com)
2. Create new project
3. Copy the code from `google-apps-script-code.js`
4. **IMPORTANT**: Replace `SpreadsheetApp.getActiveSpreadsheet()` with:
   ```javascript
   const spreadsheet = SpreadsheetApp.openById('YOUR_SPREADSHEET_ID');
   ```
5. Deploy as web app with "Anyone" access

---

### **Option 2: Use Existing Spreadsheet**

If you already have a Google Sheets file:
1. **Open your existing spreadsheet**
2. **Copy the spreadsheet ID** from the URL
3. **Update the Apps Script code** with your spreadsheet ID
4. **Deploy the script**

---

## How to Find Your Spreadsheet

### **Method 1: From Google Drive**
1. Go to [Google Drive](https://drive.google.com)
2. Look for "Okti Foundation Donations"
3. Click to open it

### **Method 2: From Google Sheets**
1. Go to [Google Sheets](https://sheets.google.com)
2. Look for "Okti Foundation Donations" in "Recent"
3. Click to open it

### **Method 3: Direct URL**
Once you have the spreadsheet ID, you can access it directly:
```
https://docs.google.com/spreadsheets/d/YOUR_SPREADSHEET_ID/edit
```

---

## What You'll See in Your Spreadsheet

### **Headers (Row 1):**
| A | B | C | D | E | F | G | H | I | J | K | L | M |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Date & Time | Donor Name | Email Address | Phone Number | PAN Number | Address | Donation Amount | Donation Type | Payment ID | Order ID | Donor Message | Newsletter Subscription | Status |

### **Sample Data (Row 2+):**
| 12/15/2024 2:30 PM | John Doe | john@example.com | +91 98765 43210 | ABCDE1234F | 123 Main St | ₹2,500 | one-time | pay_123456 | order_123456 | Thank you! | Yes | Completed |

---

## Sharing and Access

### **Make it Accessible to Your Team:**
1. **Click "Share"** in your Google Sheets
2. **Add email addresses** of team members
3. **Set permissions** (View, Comment, or Edit)
4. **Send the link** to your team

### **Make it Public (Optional):**
1. **Click "Share"** → **"Change to anyone with the link"**
2. **Copy the public link**
3. **Share with stakeholders**

---

## Mobile Access

### **Google Sheets App:**
1. **Download Google Sheets app** on your phone
2. **Sign in** with your Google account
3. **Find "Okti Foundation Donations"** in your sheets
4. **View donations on the go**

---

## Backup and Export

### **Export to Excel:**
1. **File** → **Download** → **Microsoft Excel (.xlsx)**
2. **Save to your computer**

### **Export to PDF:**
1. **File** → **Download** → **PDF Document (.pdf)**
2. **Perfect for reports**

### **Automatic Backup:**
- Google Sheets automatically saves every change
- No need to manually save
- Version history available

---

## Troubleshooting Access

### **Can't Find Your Spreadsheet?**
1. **Check Google Drive** - it might be there
2. **Search for "Okti Foundation"** in Google Sheets
3. **Check the correct Google account** (same one used for Apps Script)

### **Spreadsheet Not Updating?**
1. **Check Apps Script deployment** - make sure it's deployed
2. **Verify environment variable** in Netlify
3. **Test the function** using the test page

### **Permission Issues?**
1. **Make sure you're signed in** to the correct Google account
2. **Check if the spreadsheet is shared** with you
3. **Try accessing from a different browser**

---

## Quick Setup Checklist

- [ ] Create Google Sheets file named "Okti Foundation Donations"
- [ ] Copy the spreadsheet ID from the URL
- [ ] Set up Google Apps Script with the provided code
- [ ] Update the script with your spreadsheet ID
- [ ] Deploy the script as a web app
- [ ] Add the web app URL to Netlify environment variables
- [ ] Redeploy your site
- [ ] Test with a donation
- [ ] Check your spreadsheet for the new data

---

## Pro Tips

### **Organize Your Data:**
- **Freeze the header row** (View → Freeze → 1 row)
- **Sort by date** (Data → Sort range)
- **Filter by donation type** (Data → Create a filter)

### **Create Reports:**
- **Use pivot tables** for analysis
- **Create charts** to visualize donations
- **Set up automatic summaries**

### **Notifications:**
- **Set up email notifications** for new donations
- **Use Google Apps Script** to send alerts
- **Create automated reports**

---

**Your donation data will be automatically saved to this spreadsheet every time someone makes a donation!** 🎉
