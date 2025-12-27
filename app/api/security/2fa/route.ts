import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { enabled } = body

    const twoFASecret = enabled ? `secret-${Date.now()}` : null

    return NextResponse.json({
      success: true,
      enabled,
      secret: twoFASecret,
      message: `Two-Factor Authentication ${enabled ? "enabled" : "disabled"}`,
    })
  } catch (error) {
    console.error("[v0] API Error:", error)
    return NextResponse.json({ error: "Failed to update 2FA settings" }, { status: 500 })
  }
}
