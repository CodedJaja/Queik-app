import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { password, reason } = body

    if (!password) {
      return NextResponse.json({ error: "Password confirmation is required" }, { status: 400 })
    }

    const deletionRequest = {
      id: `deletion-${Date.now()}`,
      status: "pending",
      reason,
      requestedAt: new Date().toISOString(),
      confirmationDeadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    }

    return NextResponse.json({
      success: true,
      deletionRequest,
      message: "Account deletion request submitted. Confirm via email within 30 days.",
    })
  } catch (error) {
    console.error("[v0] API Error:", error)
    return NextResponse.json({ error: "Failed to request account deletion" }, { status: 500 })
  }
}
