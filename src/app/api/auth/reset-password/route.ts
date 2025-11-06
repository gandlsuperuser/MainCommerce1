import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { verifyToken, deleteToken } from "@/lib/tokens"
import bcrypt from "bcryptjs"
import { z } from "zod"

const resetPasswordSchema = z.object({
  token: z.string(),
  password: z.string().min(8, "Password must be at least 8 characters"),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { token, password } = resetPasswordSchema.parse(body)

    // Verify token
    const identifier = await verifyToken(token)

    if (!identifier) {
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 400 }
      )
    }

    // Extract email from identifier (format: "reset-email@example.com")
    const email = identifier.replace("reset-", "")

    // Find user
    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      )
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Update user's password
    await prisma.user.update({
      where: { email },
      data: {
        password: hashedPassword,
      },
    })

    // Delete the used token
    await deleteToken(token)

    return NextResponse.json({
      success: true,
      message: "Password reset successfully",
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      )
    }

    console.error("Error resetting password:", error)
    return NextResponse.json(
      { error: "An error occurred. Please try again later." },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const token = searchParams.get("token")

  if (!token) {
    return NextResponse.json(
      { error: "Token is required" },
      { status: 400 }
    )
  }

  // Verify token exists and is valid
  const identifier = await verifyToken(token)

  if (!identifier) {
    return NextResponse.json(
      { error: "Invalid or expired token" },
      { status: 400 }
    )
  }

  return NextResponse.json({
    success: true,
    message: "Token is valid",
  })
}

