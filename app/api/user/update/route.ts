import { type NextRequest, NextResponse } from "next/server"

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()

    if (!body.fullName || !body.email || !body.phone) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const updatedUser = {
      id: "user-123",
      ...body,
      updatedAt: new Date().toISOString(),
    }

    return NextResponse.json({
      success: true,
      user: updatedUser,
      message: "Profile updated successfully",
    })
  } catch (error) {
    console.error("[v0] API Error:", error)
    return NextResponse.json({ error: "Failed to update profile" }, { status: 500 })
  }
}
