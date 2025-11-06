#!/bin/bash

# Script to add all environment variables to Vercel
# Make sure you're logged in: npx vercel login

echo "🚀 Setting up Vercel environment variables..."
echo ""

# Get the AUTH_SECRET (generate one if not set)
AUTH_SECRET=${AUTH_SECRET:-$(openssl rand -base64 32)}

# Database URL (your current Neon database)
DATABASE_URL="postgresql://neondb_owner:npg_Fn6w0yUlWuMb@ep-winter-poetry-ahpds6ug-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require"

# Get project name from package.json or use default
PROJECT_NAME=$(node -p "require('./package.json').name")

echo "📦 Project: $PROJECT_NAME"
echo ""

# Check if vercel is linked
if ! npx vercel project ls > /dev/null 2>&1; then
  echo "⚠️  Not linked to a Vercel project. Linking now..."
  npx vercel link
fi

echo "🔐 Adding environment variables..."
echo ""

# Required variables
echo "1. Adding DATABASE_URL..."
npx vercel env add DATABASE_URL production <<< "$DATABASE_URL"
npx vercel env add DATABASE_URL preview <<< "$DATABASE_URL"

echo "2. Adding AUTH_SECRET..."
npx vercel env add AUTH_SECRET production <<< "$AUTH_SECRET"
npx vercel env add AUTH_SECRET preview <<< "$AUTH_SECRET"

echo "3. Note: AUTH_URL and NEXT_PUBLIC_APP_URL need to be set after deployment"
echo "   You'll need to update these with your actual Vercel URL"
echo ""

# Optional variables (commented out - uncomment and fill in as needed)
echo "📝 Optional variables (not set - add them later when needed):"
echo "   - GOOGLE_CLIENT_ID & GOOGLE_CLIENT_SECRET"
echo "   - GITHUB_CLIENT_ID & GITHUB_CLIENT_SECRET"
echo "   - RESEND_API_KEY & EMAIL_FROM"
echo "   - UPLOADTHING_SECRET & UPLOADTHING_APP_ID"
echo "   - STRIPE keys"
echo ""

echo "✅ Setup complete!"
echo ""
echo "📋 Generated AUTH_SECRET: $AUTH_SECRET"
echo "   (Save this for your local .env file)"
echo ""
echo "🔗 Next steps:"
echo "   1. Deploy your project to Vercel"
echo "   2. Get your deployment URL"
echo "   3. Run this to set AUTH_URL and NEXT_PUBLIC_APP_URL:"
echo "      npx vercel env add AUTH_URL production"
echo "      npx vercel env add NEXT_PUBLIC_APP_URL production"

