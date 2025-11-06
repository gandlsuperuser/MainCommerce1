# Add Vercel Environment Variables - Step by Step

Follow these steps to add all environment variables to Vercel:

## Step 1: Authenticate with Vercel

```bash
npx vercel login
```

This will open a browser. Complete the authentication.

## Step 2: Link Your Project (if not already linked)

```bash
npx vercel link
```

Select your project or create a new one.

## Step 3: Add Environment Variables

Run these commands one by one, or use the script below:

### Required Variables

```bash
# 1. Database URL
echo "postgresql://neondb_owner:npg_Fn6w0yUlWuMb@ep-winter-poetry-ahpds6ug-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require" | npx vercel env add DATABASE_URL production
echo "postgresql://neondb_owner:npg_Fn6w0yUlWuMb@ep-winter-poetry-ahpds6ug-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require" | npx vercel env add DATABASE_URL preview

# 2. Generate and add AUTH_SECRET
AUTH_SECRET=$(openssl rand -base64 32)
echo "Generated AUTH_SECRET: $AUTH_SECRET"
echo "$AUTH_SECRET" | npx vercel env add AUTH_SECRET production
echo "$AUTH_SECRET" | npx vercel env add AUTH_SECRET preview

# 3. After deployment, add these with your actual Vercel URL:
# Replace https://your-project.vercel.app with your actual URL
# echo "https://your-project.vercel.app" | npx vercel env add AUTH_URL production
# echo "https://your-project.vercel.app" | npx vercel env add AUTH_URL preview
# echo "https://your-project.vercel.app" | npx vercel env add NEXT_PUBLIC_APP_URL production
# echo "https://your-project.vercel.app" | npx vercel env add NEXT_PUBLIC_APP_URL preview
```

### Optional Variables (Add when implementing features)

```bash
# OAuth - Google
# echo "your-google-client-id" | npx vercel env add GOOGLE_CLIENT_ID production
# echo "your-google-client-secret" | npx vercel env add GOOGLE_CLIENT_SECRET production

# OAuth - GitHub
# echo "your-github-client-id" | npx vercel env add GITHUB_CLIENT_ID production
# echo "your-github-client-secret" | npx vercel env add GITHUB_CLIENT_SECRET production

# Resend (Email)
# echo "your-resend-api-key" | npx vercel env add RESEND_API_KEY production
# echo "noreply@yourdomain.com" | npx vercel env add EMAIL_FROM production

# Uploadthing
# echo "your-uploadthing-secret" | npx vercel env add UPLOADTHING_SECRET production
# echo "your-uploadthing-app-id" | npx vercel env add UPLOADTHING_APP_ID production

# Stripe
# echo "sk_test_..." | npx vercel env add STRIPE_SECRET_KEY production
# echo "pk_test_..." | npx vercel env add STRIPE_PUBLISHABLE_KEY production
# echo "pk_test_..." | npx vercel env add NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY production
# echo "whsec_..." | npx vercel env add STRIPE_WEBHOOK_SECRET production
```

## Quick Script (All at once)

Save this as a script and run it after authentication:

```bash
#!/bin/bash
# Make sure you're logged in first: npx vercel login

DATABASE_URL="postgresql://neondb_owner:npg_Fn6w0yUlWuMb@ep-winter-poetry-ahpds6ug-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require"
AUTH_SECRET=$(openssl rand -base64 32)

echo "Adding DATABASE_URL..."
echo "$DATABASE_URL" | npx vercel env add DATABASE_URL production
echo "$DATABASE_URL" | npx vercel env add DATABASE_URL preview

echo "Adding AUTH_SECRET..."
echo "$AUTH_SECRET" | npx vercel env add AUTH_SECRET production
echo "$AUTH_SECRET" | npx vercel env add AUTH_SECRET preview

echo "✅ Done!"
echo "📋 AUTH_SECRET: $AUTH_SECRET"
echo "   (Save this for your local .env file)"
echo ""
echo "⚠️  Don't forget to add AUTH_URL and NEXT_PUBLIC_APP_URL after deployment!"
```

