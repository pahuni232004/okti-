# How to Get Gmail App Password - Step by Step Guide

## What is a Gmail App Password?
A Gmail App Password is a special 16-character password that allows applications (like your donation system) to send emails through your Gmail account. It's more secure than using your regular Gmail password.

## Step-by-Step Instructions

### Step 1: Go to Your Gmail Account
1. Open your web browser
2. Go to [gmail.com](https://gmail.com)
3. Sign in to your Gmail account (the one you want to send emails from)

### Step 2: Enable 2-Factor Authentication (if not already enabled)
1. Click on your **profile picture** (top right corner)
2. Click **"Manage your Google Account"**
3. Click **"Security"** (left sidebar)
4. Under **"Signing in to Google"**, find **"2-Step Verification"**
5. If it says **"Off"**, click on it and follow the setup process
6. If it says **"On"**, you're good to go!

### Step 3: Generate App Password
1. In the same **Security** section
2. Look for **"2-Step Verification"** (should show "On")
3. Click on **"2-Step Verification"**
4. Scroll down to find **"App passwords"**
5. Click **"App passwords"**

### Step 4: Create the App Password
1. You might need to sign in again
2. In the **"App passwords"** section:
   - **App**: Select **"Mail"** from the dropdown
   - **Device**: Type **"Okti Foundation Donation System"** (or any name you prefer)
3. Click **"Generate"**

### Step 5: Copy the Password
1. Google will show you a **16-character password**
2. It looks like: `abcd efgh ijkl mnop` (with spaces)
3. **Copy this password** - you'll need it for Netlify
4. Click **"Done"**

## Important Notes

### ✅ What the Password Looks Like
- **16 characters** (letters and numbers)
- **Spaces between every 4 characters**
- Example: `abcd efgh ijkl mnop`
- **Keep the spaces** when copying to Netlify

### ✅ Which Gmail Account to Use
- Use the Gmail account where you want to **receive** the donation emails
- This should be: `oktifoundationhq@gmail.com`
- Or any Gmail account you have access to

### ✅ Security
- This password is **only for your donation system**
- It's **more secure** than your regular Gmail password
- You can **delete it anytime** from Google Account settings
- It **won't affect** your regular Gmail login

## Next Steps After Getting the Password

### 1. Go to Netlify Dashboard
1. Go to [netlify.com](https://netlify.com)
2. Sign in to your account
3. Click on your **"okti-foundation"** site

### 2. Add Environment Variables
1. Go to **"Site Settings"**
2. Click **"Environment Variables"**
3. Click **"Add a variable"**

### 3. Add These Two Variables
**Variable 1:**
- **Key**: `EMAIL_USER`
- **Value**: `oktifoundationhq@gmail.com` (or your Gmail address)

**Variable 2:**
- **Key**: `EMAIL_APP_PASSWORD`
- **Value**: `abcd efgh ijkl mnop` (the 16-character password you copied)

### 4. Save and Redeploy
1. Click **"Save"**
2. Go to **"Deploys"**
3. Click **"Trigger deploy"** → **"Deploy site"**

## Testing the Setup

### Test Your Email Setup
1. Visit: `https://okti-foundation.netlify.app/test-email.html`
2. Click **"Test Email Function"**
3. Check your Gmail for the test email

### If You Get Errors
- **"Invalid credentials"**: Check the app password is correct
- **"Authentication failed"**: Make sure 2FA is enabled
- **"Not Found"**: Redeploy the site after adding variables

## Troubleshooting

### Can't Find "App passwords"?
- Make sure **2-Step Verification is ON**
- Try refreshing the page
- Make sure you're using a personal Gmail account (not work/school account)

### App Password Not Working?
- Double-check you copied all 16 characters
- Make sure there are no extra spaces
- Try generating a new app password

### Still Having Issues?
- Make sure you're using a **personal Gmail account**
- Some work/school accounts don't allow app passwords
- Try with a different Gmail account

## Security Reminder

- ✅ **Never share** your app password
- ✅ **Delete it** if you no longer need it
- ✅ **Regenerate it** if you suspect it's compromised
- ✅ **Use only** for your donation system

---

**Once you complete these steps, your email feature will work perfectly!** 🎉

The donation system will automatically send emails to `oktifoundationhq@gmail.com` whenever someone makes a donation.
