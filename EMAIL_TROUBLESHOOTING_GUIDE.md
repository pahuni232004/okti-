# Email Feature Troubleshooting Guide

## Current Issue
The email detail feature is not working because the email environment variables are not configured in your Netlify deployment.

## Quick Fix Steps

### Step 1: Set Up Gmail App Password
1. Go to your Gmail account (the one you want to send emails from)
2. Enable 2-Factor Authentication if not already enabled
3. Go to [Google Account Settings](https://myaccount.google.com)
4. Security → 2-Step Verification → App passwords
5. Generate App Password for "Mail"
6. Copy the 16-character password (example: `abcd efgh ijkl mnop`)

### Step 2: Configure Netlify Environment Variables
1. Go to your Netlify dashboard
2. Select your site (okti-foundation)
3. Go to **Site Settings** → **Environment Variables**
4. Add these two variables:

```
EMAIL_USER=your-gmail-address@gmail.com
EMAIL_APP_PASSWORD=your-16-character-app-password
```

**Example:**
```
EMAIL_USER=oktifoundationhq@gmail.com
EMAIL_APP_PASSWORD=abcd efgh ijkl mnop
```

### Step 3: Redeploy
1. After adding environment variables, trigger a new deployment
2. Go to **Deploys** → **Trigger deploy** → **Deploy site**

### Step 4: Test Email Function
Visit this URL to test if emails are working:
```
https://okti-foundation.netlify.app/.netlify/functions/test-email
```

## What Should Happen

### When Someone Donates:
1. Payment is processed through Razorpay
2. Payment is verified
3. **Email is automatically sent** to `oktifoundationhq@gmail.com`
4. Email contains all donor details and payment information

### Email Content Includes:
- ✅ Donor name, email, phone, PAN, address
- ✅ Donation amount and type
- ✅ Payment IDs (Razorpay)
- ✅ Donor message (if any)
- ✅ Newsletter subscription status

## Debugging Steps

### Check Environment Variables
Visit: `https://okti-foundation.netlify.app/.netlify/functions/test-email`

**If you see:**
- `"Email configuration missing"` → Environment variables not set
- `"Failed to send test email"` → Check Gmail app password
- `"Not Found"` → Function not deployed properly

### Check Function Logs
1. Go to Netlify Dashboard → Functions
2. Click on `send-donation-email` function
3. Check the logs for error messages

## Common Issues & Solutions

### Issue 1: "Email configuration missing"
**Solution:** Add `EMAIL_USER` and `EMAIL_APP_PASSWORD` to Netlify environment variables

### Issue 2: "Invalid credentials"
**Solution:** 
- Check Gmail app password is correct (16 characters)
- Ensure 2FA is enabled on Gmail account
- Make sure there are no spaces in the app password

### Issue 3: "Authentication failed"
**Solution:**
- Re-generate Gmail app password
- Double-check the email address in `EMAIL_USER`

### Issue 4: "Not Found" when testing
**Solution:**
- Redeploy the site after adding environment variables
- Check that all functions are properly deployed

## Testing the Complete Flow

1. **Test Email Function:** Visit the test URL above
2. **Test Donation:** Make a test donation
3. **Check Email:** Look for email at `oktifoundationhq@gmail.com`

## Files Involved

- `netlify/functions/send-donation-email.js` - Main email function
- `netlify/functions/verify-payment.js` - Calls email after payment
- `netlify/functions/test-email.js` - Test email function
- `package.json` - Contains nodemailer dependency

## Security Notes

- ✅ App passwords are more secure than regular passwords
- ✅ Environment variables are encrypted in Netlify
- ✅ No email credentials are stored in code
- ✅ All emails sent over HTTPS

## Alternative Solutions

If Gmail doesn't work, you can use:
- **SendGrid** (free tier: 100 emails/day)
- **Mailgun** (free tier: 5,000 emails/month)
- **AWS SES** (very cheap, pay per email)

---

**Next Steps:**
1. Set up Gmail app password
2. Add environment variables to Netlify
3. Redeploy the site
4. Test the email function
5. Make a test donation to verify end-to-end functionality

The email feature will work once the environment variables are properly configured! 🎉
