# Vercel Environment Variables Setup Guide

This guide will help you set up all required environment variables in your Vercel project.

## How to Set Environment Variables in Vercel

1. Go to your Vercel Dashboard: https://vercel.com/dashboard
2. Select your project: **MainCommerce1**
3. Go to **Settings** → **Environment Variables**
4. Add each variable below using the **Add** button

## Required Environment Variables

### 1. Database (REQUIRED)
```
DATABASE_URL=postgresql://neondb_owner:npg_Fn6w0yUlWuMb@ep-winter-poetry-ahpds6ug-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require
```
**Note:** This is your current Neon database connection string. Make sure to keep this secure.

### 2. NextAuth.js (REQUIRED)
```
AUTH_SECRET=<generate-a-random-secret-key>
AUTH_URL=https://your-vercel-domain.vercel.app
```

**To generate AUTH_SECRET:**
- Run: `openssl rand -base64 32` in your terminal
- Or use: https://generate-secret.vercel.app/32

**AUTH_URL:** Should be your Vercel deployment URL (e.g., `https://maincommerce.vercel.app`)

### 3. NextAuth.js OAuth Providers (OPTIONAL - but recommended)
```
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret
```

**How to get OAuth credentials:**
- **Google:** https://console.cloud.google.com/apis/credentials
- **GitHub:** https://github.com/settings/developers

### 4. Resend (Email) - OPTIONAL
```
RESEND_API_KEY=your-resend-api-key
EMAIL_FROM=noreply@yourdomain.com
```

**Get Resend API Key:** https://resend.com/api-keys

### 5. Uploadthing - OPTIONAL
```
UPLOADTHING_SECRET=your-uploadthing-secret
UPLOADTHING_APP_ID=your-uploadthing-app-id
```

**Get Uploadthing credentials:** https://uploadthing.com/dashboard

### 6. Stripe - OPTIONAL (Required for payments)
```
STRIPE_SECRET_KEY=sk_live_... (or sk_test_... for testing)
STRIPE_PUBLISHABLE_KEY=pk_live_... (or pk_test_... for testing)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_... (same as above)
STRIPE_WEBHOOK_SECRET=whsec_...
```

**Get Stripe keys:** https://dashboard.stripe.com/apikeys
**Get Webhook secret:** https://dashboard.stripe.com/webhooks

### 7. App Configuration
```
NEXT_PUBLIC_APP_URL=https://your-vercel-domain.vercel.app
```

## Environment-Specific Settings

Vercel allows you to set different values for different environments:

- **Production:** For your live site
- **Preview:** For pull request previews
- **Development:** For local development (usually not needed)

## Quick Setup Checklist

For a minimal working setup, you need at minimum:

- [x] `DATABASE_URL` ✅ (Already set)
- [ ] `AUTH_SECRET` (Generate one)
- [ ] `AUTH_URL` (Set to your Vercel URL)
- [ ] `NEXT_PUBLIC_APP_URL` (Set to your Vercel URL)

Everything else can be added later as you implement those features.

## After Setting Variables

1. **Redeploy your application** for the changes to take effect
2. Go to **Deployments** tab
3. Click **...** menu on the latest deployment
4. Select **Redeploy**

## Security Notes

⚠️ **Important:**
- Never commit `.env` files to Git
- Use Vercel's environment variables for all secrets
- Use `NEXT_PUBLIC_` prefix only for variables that need to be exposed to the browser
- Rotate secrets regularly, especially if exposed

## Testing Your Setup

After setting variables, you can verify they're working by:
1. Checking your Vercel deployment logs
2. Testing authentication (if AUTH_SECRET is set)
3. Testing database connection (if DATABASE_URL is set)

## Troubleshooting

If you encounter issues:
1. Check Vercel deployment logs for errors
2. Verify variable names match exactly (case-sensitive)
3. Ensure no extra spaces in variable values
4. Redeploy after adding new variables

