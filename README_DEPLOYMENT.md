# Okti Foundation - Netlify Deployment

## Quick Start

1. **Set up Razorpay keys** in Netlify environment variables
2. **Deploy** using the build command: `npm run build`
3. **Test** the payment flow

## Environment Variables Required

```
RAZORPAY_KEY_ID=your_key_id
RAZORPAY_KEY_SECRET=your_secret
NODE_ENV=production
```

## Build Command

```bash
npm install
```

## Publish Directory

```
. (root directory)
```

## API Endpoints

- `/api/razorpay-key` - Get Razorpay public key
- `/api/create-order` - Create payment order
- `/api/verify-payment` - Verify payment

## Files Created for Netlify

- `netlify.toml` - Netlify configuration
- `_redirects` - URL redirects
- `netlify/functions/` - Serverless functions

## Deployment Steps

1. Connect your Git repository to Netlify
2. Set build command: `npm install`
3. Set publish directory: `.` (root)
4. Add environment variables
5. Deploy!

For detailed instructions, see `NETLIFY_DEPLOYMENT.md`
