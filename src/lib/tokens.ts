import crypto from "crypto"
import { prisma } from "@/lib/prisma"

/**
 * Generate a secure verification token
 */
export function generateToken(): string {
  return crypto.randomBytes(32).toString("hex")
}

/**
 * Create a verification token in the database
 */
export async function createVerificationToken(email: string) {
  const token = generateToken()
  const expires = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours

  // Delete any existing tokens for this email
  await prisma.verificationToken.deleteMany({
    where: {
      identifier: email,
    },
  })

  // Create new token
  await prisma.verificationToken.create({
    data: {
      identifier: email,
      token,
      expires,
    },
  })

  return token
}

/**
 * Create a password reset token in the database
 */
export async function createPasswordResetToken(email: string) {
  const token = generateToken()
  const expires = new Date(Date.now() + 60 * 60 * 1000) // 1 hour

  // Delete any existing tokens for this email
  await prisma.verificationToken.deleteMany({
    where: {
      identifier: `reset-${email}`,
    },
  })

  // Create new token
  await prisma.verificationToken.create({
    data: {
      identifier: `reset-${email}`,
      token,
      expires,
    },
  })

  return token
}

/**
 * Verify a token and return the identifier (email)
 */
export async function verifyToken(token: string): Promise<string | null> {
  const verificationToken = await prisma.verificationToken.findUnique({
    where: { token },
  })

  if (!verificationToken) {
    return null
  }

  // Check if token has expired
  if (verificationToken.expires < new Date()) {
    await prisma.verificationToken.delete({
      where: { token },
    })
    return null
  }

  return verificationToken.identifier
}

/**
 * Delete a verification token
 */
export async function deleteToken(token: string) {
  await prisma.verificationToken.deleteMany({
    where: { token },
  })
}

