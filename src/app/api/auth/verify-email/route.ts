import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { verifyToken, deleteToken } from "@/lib/tokens"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const token = searchParams.get("token")

  if (!token) {
    return NextResponse.json(
      { error: "Token is required" },
      { status: 400 }
    )
  }

  try {
    const identifier = await verifyToken(token)

    if (!identifier) {
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 400 }
      )
    }

    // Verify the email
    const user = await prisma.user.findUnique({
      where: { email: identifier },
    })

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      )
    }

    // Update user's emailVerified status
    await prisma.user.update({
      where: { email: identifier },
      data: {
        emailVerified: new Date(),
      },
    })

    // Delete the used token
    await deleteToken(token)

    return NextResponse.json({
      success: true,
      message: "Email verified successfully",
    })
  } catch (error) {
    console.error("Error verifying email:", error)
    return NextResponse.json(
      { error: "An error occurred while verifying your email" },
      { status: 500 }
    )
  }
}

