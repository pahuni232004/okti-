# Netlify Deployment Guide for Okti Foundation

This guide will help you deploy your Okti Foundation website to Netlify with full payment processing capabilities.

## Prerequisites

1. **Netlify Account**: Sign up at [netlify.com](https://netlify.com)
2. **Razorpay Account**: Get your API keys from [razorpay.com](https://razorpay.com)
3. **Git Repository**: Your code should be in a Git repository (GitHub, GitLab, or Bitbucket)

## Step 1: Prepare Your Razorpay Keys

1. Log in to your Razorpay Dashboard
2. Go to Settings > API Keys
3. Copy your **Key ID** and **Key Secret**
4. Keep these secure - you'll need them for Netlify environment variables

## Step 2: Deploy to Netlify

### Option A: Deploy via Netlify Dashboard (Recommended)

1. **Connect Repository**:
   - Go to [app.netlify.com](https://app.netlify.com)
   - Click "New site from Git"
   - Connect your Git provider (GitHub/GitLab/Bitbucket)
   - Select your repository

2. **Configure Build Settings**:
   - Build command: (leave empty - no build needed)
   - Publish directory: `.` (root directory)
   - Node version: `18`

3. **Set Environment Variables**:
   - Go to Site settings > Environment variables
   - Add the following variables:
     ```
     RAZORPAY_KEY_ID=your_razorpay_key_id_here
     RAZORPAY_KEY_SECRET=your_razorpay_key_secret_here
     NODE_ENV=production
     ```

4. **Deploy**:
   - Click "Deploy site"
   - Wait for the build to complete

### Option B: Deploy via Netlify CLI

1. **Install Netlify CLI**:
   ```bash
   npm install -g netlify-cli
   ```

2. **Login to Netlify**:
   ```bash
   netlify login
   ```

3. **Initialize and Deploy**:
   ```bash
   netlify init
   netlify deploy --prod
   ```

## Step 3: Configure Custom Domain (Optional)

1. Go to Site settings > Domain management
2. Add your custom domain
3. Configure DNS settings as instructed by Netlify
4. Enable HTTPS (automatic with Netlify)

## Step 4: Test Your Deployment

1. **Test Static Pages**: Visit your site and check all pages load correctly
2. **Test Payment Flow**:
   - Go to the donation page
   - Fill out the donation form
   - Test with Razorpay test mode first
   - Verify payment processing works

## Step 5: Go Live with Production Razorpay Keys

1. **Update Environment Variables**:
   - Go to Site settings > Environment variables
   - Update `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET` with your live keys
   - Redeploy the site

2. **Test Live Payments**:
   - Test with small amounts first
   - Verify payment confirmations
   - Check that receipts are generated correctly

## File Structure After Deployment

```
your-site/
├── netlify.toml                 # Netlify configuration
├── _redirects                   # URL redirects
├── netlify/
│   └── functions/
│       ├── create-order.js      # Razorpay order creation
│       ├── verify-payment.js    # Payment verification
│       └── razorpay-key.js       # Get Razorpay key
├── dist/                        # Built static files
│   ├── index.html
│   ├── styles.css
│   ├── Images/
│   └── ...
└── package.json                 # Updated with build scripts
```

## Environment Variables Required

| Variable | Description | Example |
|----------|-------------|---------|
| `RAZORPAY_KEY_ID` | Your Razorpay Key ID | `rzp_test_...` or `rzp_live_...` |
| `RAZORPAY_KEY_SECRET` | Your Razorpay Key Secret | `your_secret_key` |
| `NODE_ENV` | Environment | `production` |

## API Endpoints

Your site will have these API endpoints:
- `GET /api/razorpay-key` - Get Razorpay public key
- `POST /api/create-order` - Create Razorpay order
- `POST /api/verify-payment` - Verify payment signature

## Troubleshooting

### Common Issues:

1. **Build Fails**:
   - Check that all dependencies are in `package.json`
   - Verify build command is correct
   - Check Node.js version (should be 18)

2. **Payment Not Working**:
   - Verify Razorpay keys are set correctly
   - Check browser console for errors
   - Test with Razorpay test mode first

3. **Images Not Loading**:
   - Ensure all images are in the `dist` folder after build
   - Check file paths are correct

4. **API Functions Not Working**:
   - Verify environment variables are set
   - Check function logs in Netlify dashboard
   - Ensure CORS headers are properly set

### Getting Help:

1. **Netlify Documentation**: [docs.netlify.com](https://docs.netlify.com)
2. **Razorpay Documentation**: [razorpay.com/docs](https://razorpay.com/docs)
3. **Check Function Logs**: Go to Functions tab in Netlify dashboard

## Security Notes

1. **Never commit** your `.env` file with real keys
2. **Use environment variables** for all sensitive data
3. **Enable HTTPS** (automatic with Netlify)
4. **Regularly rotate** your Razorpay keys
5. **Monitor** your Razorpay dashboard for suspicious activity

## Performance Optimization

1. **Image Optimization**: Consider using Netlify's image optimization
2. **CDN**: Netlify provides global CDN automatically
3. **Caching**: Static assets are cached automatically
4. **Compression**: Gzip compression is enabled by default

## Monitoring and Analytics

1. **Netlify Analytics**: Available in your Netlify dashboard
2. **Razorpay Dashboard**: Monitor payments and transactions
3. **Google Analytics**: Add tracking code to your HTML files if needed

## Backup and Recovery

1. **Code Backup**: Your code is in Git repository
2. **Database**: No database required (static site)
3. **Environment Variables**: Document your environment variables securely

## Support

For technical support:
- **Netlify Support**: [support.netlify.com](https://support.netlify.com)
- **Razorpay Support**: [razorpay.com/support](https://razorpay.com/support)

---

**Congratulations!** Your Okti Foundation website is now deployed on Netlify with full payment processing capabilities. 🎉
