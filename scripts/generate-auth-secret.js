#!/usr/bin/env node

/**
 * Generate AUTH_SECRET for NextAuth.js
 * Run: node scripts/generate-auth-secret.js
 */

const crypto = require('crypto')

const secret = crypto.randomBytes(32).toString('base64')

console.log('\n🔐 Generated AUTH_SECRET for NextAuth.js:\n')
console.log(secret)
console.log('\n📋 Copy this value and add it to:')
console.log('   - Your .env file (for local development)')
console.log('   - Vercel Environment Variables (for production)')
console.log('\n⚠️  Keep this secret secure and never commit it to Git!\n')
