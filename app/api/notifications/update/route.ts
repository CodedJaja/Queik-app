import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const preferences = {
      transactionAlerts: body.transactionAlerts ?? true,
      loanUpdates: body.loanUpdates ?? true,
      promotions: body.promotions ?? false,
      securityAlerts: body.securityAlerts ?? true,
      emailNotifications: body.emailNotifications ?? true,
      pushNotifications: body.pushNotifications ?? true,
      smsNotifications: body.smsNotifications ?? false,
    }

    return NextResponse.json({
      success: true,
      preferences,
      message: "Notification preferences updated",
    })
  } catch (error) {
    console.error("[v0] API Error:", error)
    return NextResponse.json({ error: "Failed to update notification preferences" }, { status: 500 })
  }
}
