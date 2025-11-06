#!/usr/bin/env node

/**
 * Script to add all environment variables to Vercel
 * Usage: node scripts/setup-vercel-env.js
 * 
 * Prerequisites:
 * 1. Make sure you're logged in: npx vercel login
 * 2. Make sure your project is linked: npx vercel link
 */

const { execSync } = require('child_process')
const crypto = require('crypto')
const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

const question = (query) => new Promise((resolve) => rl.question(query, resolve))

async function main() {
  console.log('🚀 Setting up Vercel environment variables...\n')

  // Check if logged in
  try {
    execSync('npx vercel whoami', { stdio: 'ignore' })
    console.log('✅ Logged in to Vercel\n')
  } catch (error) {
    console.log('❌ Not logged in to Vercel')
    console.log('Please run: npx vercel login\n')
    process.exit(1)
  }

  // Get project name
  const packageJson = require('../package.json')
  const projectName = packageJson.name

  console.log(`📦 Project: ${projectName}\n`)

  // Check if linked
  try {
    execSync('npx vercel project ls', { stdio: 'ignore' })
  } catch (error) {
    console.log('⚠️  Not linked to a Vercel project. Linking now...')
    execSync('npx vercel link', { stdio: 'inherit' })
  }

  // Generate AUTH_SECRET
  const authSecret = crypto.randomBytes(32).toString('base64')
  console.log(`🔐 Generated AUTH_SECRET: ${authSecret}\n`)

  // Database URL
  const databaseUrl = 'postgresql://neondb_owner:npg_Fn6w0yUlWuMb@ep-winter-poetry-ahpds6ug-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require'

  // Environment variables to add
  const envVars = [
    {
      key: 'DATABASE_URL',
      value: databaseUrl,
      environments: ['production', 'preview']
    },
    {
      key: 'AUTH_SECRET',
      value: authSecret,
      environments: ['production', 'preview']
    }
  ]

  console.log('📝 Adding required environment variables...\n')

  for (const envVar of envVars) {
    console.log(`Adding ${envVar.key}...`)
    for (const env of envVar.environments) {
      try {
        execSync(
          `echo "${envVar.value}" | npx vercel env add ${envVar.key} ${env}`,
          { stdio: 'pipe' }
        )
        console.log(`  ✅ Added to ${env}`)
      } catch (error) {
        console.log(`  ⚠️  ${env}: ${error.message}`)
      }
    }
    console.log('')
  }

  console.log('✅ Setup complete!\n')
  console.log('📋 Next steps:')
  console.log('   1. Deploy your project to Vercel')
  console.log('   2. Get your deployment URL')
  console.log('   3. Add AUTH_URL and NEXT_PUBLIC_APP_URL with your Vercel URL')
  console.log('   4. Add optional variables (OAuth, Stripe, etc.) as needed\n')

  rl.close()
}

main().catch(console.error)

