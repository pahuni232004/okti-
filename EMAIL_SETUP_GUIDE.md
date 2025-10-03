# Email Notification Setup Guide

## Overview
Your donation system now automatically sends email notifications to `oktifoundationhq@gmail.com` whenever someone makes a donation.

## Required Setup

### Step 1: Create Gmail App Password

1. **Go to your Gmail account** (the one you want to send emails from)
2. **Enable 2-Factor Authentication** if not already enabled
3. **Go to Google Account Settings**: [myaccount.google.com](https://myaccount.google.com)
4. **Security** → **2-Step Verification** → **App passwords**
5. **Generate App Password** for "Mail"
6. **Copy the 16-character password** (you'll need this)

### Step 2: Set Up Environment Variables in Netlify

Add these environment variables to your Netlify site:

1. **Go to Netlify Dashboard** → **Site Settings** → **Environment Variables**
2. **Add these variables**:

```
EMAIL_USER=your-gmail-address@gmail.com
EMAIL_APP_PASSWORD=your-16-character-app-password
```

**Example:**
```
EMAIL_USER=oktifoundationhq@gmail.com
EMAIL_APP_PASSWORD=abcd efgh ijkl mnop
```

### Step 3: Deploy and Test

1. **Redeploy your site** after adding environment variables
2. **Test a donation** to verify email notifications work
3. **Check your email** at `oktifoundationhq@gmail.com`

## What Happens When Someone Donates

### Automatic Email Sent To: `oktifoundationhq@gmail.com`

**Email Subject:** `New Donation Received - ₹X,XXX from [Donor Name]`

**Email Content Includes:**
- ✅ **Donor Information**: Name, email, phone, PAN, address
- ✅ **Donation Details**: Amount, type, payment ID, date
- ✅ **Donor Message**: Any message they included
- ✅ **Newsletter Subscription**: Whether they opted in
- ✅ **Payment IDs**: Razorpay payment and order IDs

### Email Format
The email is sent in both **HTML** and **text** format with:
- Professional styling
- Organized sections
- All donor details
- Payment information
- Reminder to send receipt and 80G certificate

## Troubleshooting

### Email Not Sending?
1. **Check environment variables** are set correctly
2. **Verify Gmail App Password** is correct (16 characters, no spaces)
3. **Check Netlify function logs** for errors
4. **Ensure 2FA is enabled** on the Gmail account

### Test the Email Function
Visit: `https://your-site.netlify.app/.netlify/functions/send-donation-email`

### Common Issues:
- **"Invalid credentials"**: Check EMAIL_APP_PASSWORD
- **"Authentication failed"**: Enable 2FA and create app password
- **"Network error"**: Check Netlify function logs

## Security Notes

- ✅ **App Password**: More secure than regular password
- ✅ **Environment Variables**: Never commit email credentials to code
- ✅ **HTTPS Only**: All emails sent over secure connection
- ✅ **No Storage**: Donor data not stored, only sent via email

## Alternative Email Services

If Gmail doesn't work, you can use:
- **SendGrid** (free tier available)
- **Mailgun** (free tier available)
- **AWS SES** (very cheap)

Contact me if you need help setting up alternative email services.

## Files Modified

- ✅ `netlify/functions/send-donation-email.js` - Email sending function
- ✅ `netlify/functions/verify-payment.js` - Updated to send emails
- ✅ `payment-screen-1.html` - Updated to send donor details
- ✅ `package.json` - Added nodemailer dependency

---

**Next Steps:**
1. Set up Gmail App Password
2. Add environment variables to Netlify
3. Deploy and test
4. You'll receive email notifications for every donation! 🎉
