import { Resend } from "resend"

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null

export async function sendVerificationEmail(email: string, token: string) {
  if (!resend) {
    console.warn("RESEND_API_KEY not configured. Email not sent.")
    return { success: false, error: "Email service not configured" }
  }

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || process.env.AUTH_URL || "http://localhost:3000"
  const verifyUrl = `${baseUrl}/auth/verify-email?token=${token}`

  try {
    await resend.emails.send({
      from: process.env.EMAIL_FROM || "noreply@maincommerce.com",
      to: email,
      subject: "Verify your email address",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Verify Your Email Address</h2>
          <p>Thank you for signing up! Please click the button below to verify your email address:</p>
          <a href="${verifyUrl}" style="display: inline-block; padding: 12px 24px; background-color: #0070f3; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0;">
            Verify Email
          </a>
          <p>Or copy and paste this link into your browser:</p>
          <p style="word-break: break-all; color: #666;">${verifyUrl}</p>
          <p>This link will expire in 24 hours.</p>
          <p>If you didn't create an account, you can safely ignore this email.</p>
        </div>
      `,
    })
    return { success: true }
  } catch (error) {
    console.error("Error sending verification email:", error)
    return { success: false, error }
  }
}

export async function sendPasswordResetEmail(email: string, token: string) {
  if (!resend) {
    console.warn("RESEND_API_KEY not configured. Email not sent.")
    return { success: false, error: "Email service not configured" }
  }

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || process.env.AUTH_URL || "http://localhost:3000"
  const resetUrl = `${baseUrl}/auth/reset-password?token=${token}`

  try {
    await resend.emails.send({
      from: process.env.EMAIL_FROM || "noreply@maincommerce.com",
      to: email,
      subject: "Reset your password",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Reset Your Password</h2>
          <p>You requested to reset your password. Click the button below to reset it:</p>
          <a href="${resetUrl}" style="display: inline-block; padding: 12px 24px; background-color: #0070f3; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0;">
            Reset Password
          </a>
          <p>Or copy and paste this link into your browser:</p>
          <p style="word-break: break-all; color: #666;">${resetUrl}</p>
          <p>This link will expire in 1 hour.</p>
          <p>If you didn't request a password reset, you can safely ignore this email.</p>
        </div>
      `,
    })
    return { success: true }
  } catch (error) {
    console.error("Error sending password reset email:", error)
    return { success: false, error }
  }
}

