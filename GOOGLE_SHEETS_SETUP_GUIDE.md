# Google Sheets Integration Setup Guide

## Overview
Instead of sending emails, we'll store all donation details directly in a Google Sheets spreadsheet. This is much easier to manage and gives you a complete database of all donations.

## What You'll Get
- ✅ All donation details in one Google Sheets file
- ✅ Automatic data entry when someone donates
- ✅ Easy to view, sort, and analyze donations
- ✅ No email setup required
- ✅ Real-time data updates

## Step 1: Create Google Sheets File

1. **Go to [Google Sheets](https://sheets.google.com)**
2. **Create a new spreadsheet**
3. **Name it**: "Okti Foundation Donations"
4. **Set up columns** (I'll create the exact format for you)

## Step 2: Set Up Google Sheets API

### Option A: Simple Method (Recommended)
1. **Go to [Google Cloud Console](https://console.cloud.google.com)**
2. **Create a new project** or select existing one
3. **Enable Google Sheets API**
4. **Create Service Account credentials**
5. **Download the JSON key file**

### Option B: Quick Setup (I'll help you with this)
I'll create a simpler method using Google Apps Script that doesn't require complex API setup.

## Step 3: Configure Netlify

Add these environment variables to Netlify:
```
GOOGLE_SHEETS_ID=your-spreadsheet-id
GOOGLE_SHEETS_API_KEY=your-api-key
```

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

## Benefits Over Email System

✅ **No email setup required**
✅ **All data in one place**
✅ **Easy to export to Excel**
✅ **Can create charts and reports**
✅ **Real-time updates**
✅ **No email delivery issues**
✅ **Easy to share with team**

## Next Steps

1. I'll create the Google Sheets integration code
2. You'll get a simple setup process
3. All donations will automatically appear in your spreadsheet
4. You can view, sort, and analyze all donation data

Would you like me to proceed with setting up the Google Sheets integration?
