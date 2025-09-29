# Payment System Setup Guide

## Issues Fixed

✅ **Environment Variable Validation**: Added proper checks for Razorpay credentials
✅ **Error Handling**: Improved error messages and user feedback
✅ **API Endpoints**: Fixed endpoint URLs to use `.netlify/functions/` directly
✅ **Loading States**: Added loading indicators during payment processing
✅ **CORS Configuration**: Ensured proper CORS headers for all functions

## Required Setup Steps

### 1. Get Razorpay Credentials

1. **Sign up for Razorpay**: Go to [razorpay.com](https://razorpay.com) and create an account
2. **Get API Keys**: 
   - Go to Dashboard → Settings → API Keys
   - Copy your **Key ID** (starts with `rzp_test_` or `rzp_live_`)
   - Copy your **Key Secret**

### 2. Set Environment Variables in Netlify

1. **Go to Netlify Dashboard**:
   - Navigate to your site
   - Go to Site settings → Environment variables

2. **Add these variables**:
   ```
   RAZORPAY_KEY_ID=rzp_test_your_key_id_here
   RAZORPAY_KEY_SECRET=your_secret_key_here
   NODE_ENV=production
   ```

3. **Redeploy your site** after adding environment variables

### 3. Test Your Setup

1. **Test Environment**: Visit `https://your-site.netlify.app/.netlify/functions/test-payment`
   - Should show: `"Payment system configured correctly"`
   - If not, check your environment variables

2. **Test Payment Flow**:
   - Go to your donation page
   - Fill out the form
   - Try a small test payment
   - Use Razorpay test cards: `4111 1111 1111 1111`

## Test Cards for Razorpay

```
Card Number: 4111 1111 1111 1111
Expiry: Any future date (e.g., 12/25)
CVV: Any 3 digits (e.g., 123)
Name: Any name
```

## Common Issues & Solutions

### Issue: "Payment service not configured"
**Solution**: Environment variables are not set in Netlify

### Issue: "Failed to create order"
**Solution**: Check Razorpay Key Secret is correct

### Issue: "Payment verification failed"
**Solution**: Ensure both Key ID and Secret are from the same Razorpay account

### Issue: API endpoints not working
**Solution**: 
1. Check Netlify Functions are deployed
2. Verify redirect rules in `netlify.toml`
3. Try accessing functions directly: `/.netlify/functions/function-name`

## Debugging Steps

1. **Check Environment Variables**:
   ```bash
   # Visit this URL to test
   https://your-site.netlify.app/.netlify/functions/test-payment
   ```

2. **Check Function Logs**:
   - Go to Netlify Dashboard → Functions tab
   - Look for error logs

3. **Browser Console**:
   - Open Developer Tools (F12)
   - Check Console tab for JavaScript errors
   - Check Network tab for failed API calls

## Going Live

1. **Get Production Keys**: 
   - Contact Razorpay to activate live mode
   - Get production Key ID and Secret

2. **Update Environment Variables**:
   - Replace test keys with live keys
   - Redeploy site

3. **Test with Real Payments**:
   - Start with small amounts
   - Verify all payment methods work

## Security Notes

- ✅ Never commit API keys to Git
- ✅ Use environment variables only
- ✅ Regularly rotate your keys
- ✅ Monitor Razorpay dashboard for suspicious activity

## Support

- **Razorpay Support**: [support.razorpay.com](https://support.razorpay.com)
- **Netlify Support**: [support.netlify.com](https://support.netlify.com)
- **Function Logs**: Netlify Dashboard → Functions tab

---

**Next Steps**: 
1. Set up your Razorpay account and get API keys
2. Add environment variables to Netlify
3. Test the payment flow
4. Go live with production keys
