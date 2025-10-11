# Quick Google Sheets Access Guide

## 🎯 **Where to Access Your Donation Data**

### **Step 1: Create Your Spreadsheet**
1. **Go to [Google Sheets](https://sheets.google.com)**
2. **Click "Blank"** to create a new spreadsheet
3. **Name it**: `Okti Foundation Donations`
4. **Bookmark this page** - this is where all donations will appear!

### **Step 2: Get Your Spreadsheet ID**
1. **Look at the URL** in your browser: 
   ```
   https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit
   ```
2. **Copy the SPREADSHEET_ID** part (the long string of letters and numbers)
3. **Keep this ID safe** - you'll need it for setup

### **Step 3: Update the Apps Script Code**
1. **Go to [Google Apps Script](https://script.google.com)**
2. **Create new project**
3. **Copy the code** from `google-apps-script-code.js`
4. **Replace `YOUR_SPREADSHEET_ID`** with your actual spreadsheet ID
5. **Save and deploy** as web app

---

## 📱 **How to Access Your Data**

### **From Computer:**
- **Google Sheets website**: [sheets.google.com](https://sheets.google.com)
- **Look for "Okti Foundation Donations"** in your recent files
- **Click to open it**

### **From Phone:**
- **Download Google Sheets app**
- **Sign in** with your Google account
- **Find "Okti Foundation Donations"** in your sheets
- **View donations on the go**

### **Direct Link:**
Once you have your spreadsheet ID, you can access it directly:
```
https://docs.google.com/spreadsheets/d/YOUR_SPREADSHEET_ID/edit
```

---

## 📊 **What You'll See**

### **Your Spreadsheet Will Have These Columns:**
| A | B | C | D | E | F | G | H | I | J | K | L | M |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| **Date & Time** | **Donor Name** | **Email** | **Phone** | **PAN** | **Address** | **Amount** | **Type** | **Payment ID** | **Order ID** | **Message** | **Newsletter** | **Status** |

### **Sample Data:**
| 12/15/2024 2:30 PM | John Doe | john@example.com | +91 98765 43210 | ABCDE1234F | 123 Main St | ₹2,500 | one-time | pay_123456 | order_123456 | Thank you! | Yes | Completed |

---

## 🔧 **Quick Setup Steps**

1. **Create Google Sheets file** ✅
2. **Copy the spreadsheet ID** ✅
3. **Set up Google Apps Script** (use the provided code)
4. **Replace `YOUR_SPREADSHEET_ID`** with your actual ID
5. **Deploy as web app**
6. **Add web app URL to Netlify**
7. **Redeploy your site**
8. **Test with a donation**
9. **Check your spreadsheet** - you should see the data!

---

## 🎉 **Benefits**

✅ **All donations automatically saved**
✅ **Access from anywhere** (computer, phone, tablet)
✅ **Easy to share with team**
✅ **Export to Excel or PDF**
✅ **Create charts and reports**
✅ **No email setup required**
✅ **Real-time updates**

---

## 🆘 **Need Help?**

### **Can't Find Your Spreadsheet?**
- Check [Google Drive](https://drive.google.com)
- Search for "Okti Foundation" in Google Sheets
- Make sure you're signed in to the correct Google account

### **Spreadsheet Not Updating?**
- Check that Apps Script is deployed
- Verify environment variable in Netlify
- Test using the test page: `test-sheets.html`

### **Want to Share with Team?**
- Click "Share" in your Google Sheets
- Add email addresses
- Set permissions (View, Comment, or Edit)

---

**Once set up, every donation will automatically appear in your Google Sheets!** 🎉

Your donation data will be organized, accessible, and easy to manage - much better than email notifications!
