#!/bin/bash

# Script to add all required environment variables to Vercel
# Make sure you're logged in first: npx vercel login

set -e

echo "🚀 Adding Vercel environment variables..."
echo ""

# Check if logged in
if ! npx vercel whoami > /dev/null 2>&1; then
  echo "❌ Not logged in to Vercel"
  echo "Please run: npx vercel login"
  exit 1
fi

echo "✅ Logged in to Vercel"
echo ""

# Database URL
DATABASE_URL="postgresql://neondb_owner:npg_Fn6w0yUlWuMb@ep-winter-poetry-ahpds6ug-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require"

# Generate AUTH_SECRET
AUTH_SECRET=$(openssl rand -base64 32)

echo "📝 Adding DATABASE_URL to production and preview..."
echo "$DATABASE_URL" | npx vercel env add DATABASE_URL production
echo "$DATABASE_URL" | npx vercel env add DATABASE_URL preview

echo ""
echo "📝 Adding AUTH_SECRET to production and preview..."
echo "$AUTH_SECRET" | npx vercel env add AUTH_SECRET production
echo "$AUTH_SECRET" | npx vercel env add AUTH_SECRET preview

echo ""
echo "✅ Environment variables added successfully!"
echo ""
echo "📋 Generated AUTH_SECRET:"
echo "   $AUTH_SECRET"
echo ""
echo "⚠️  IMPORTANT: Save this AUTH_SECRET for your local .env file!"
echo ""
echo "📝 Next steps:"
echo "   1. Deploy your project to Vercel"
echo "   2. Get your deployment URL (e.g., https://maincommerce.vercel.app)"
echo "   3. Add AUTH_URL and NEXT_PUBLIC_APP_URL:"
echo "      echo 'https://your-project.vercel.app' | npx vercel env add AUTH_URL production"
echo "      echo 'https://your-project.vercel.app' | npx vercel env add NEXT_PUBLIC_APP_URL production"
echo ""
echo "💡 Optional variables (add later when needed):"
echo "   - OAuth providers (Google, GitHub)"
echo "   - Resend (Email)"
echo "   - Uploadthing (File uploads)"
echo "   - Stripe (Payments)"

