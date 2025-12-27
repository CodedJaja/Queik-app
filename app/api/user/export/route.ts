import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const userData = {
      personalInfo: {
        fullName: "John Doe",
        email: "john.doe@example.com",
        phone: "+1 (555) 123-4567",
        createdAt: new Date().toISOString(),
      },
      transactions: [],
      settings: {},
      exportedAt: new Date().toISOString(),
    }

    return NextResponse.json({
      success: true,
      data: userData,
      message: "Data export generated. Download link sent to your email.",
      downloadUrl: `/exports/data-${Date.now()}.json`,
    })
  } catch (error) {
    console.error("[v0] API Error:", error)
    return NextResponse.json({ error: "Failed to generate data export" }, { status: 500 })
  }
}
