import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const kycStatus = {
      status: "pending",
      idVerification: "verified",
      selfieVerification: "pending",
      addressVerification: "not_started",
      completionPercentage: 33,
      lastUpdated: new Date().toISOString(),
    }

    return NextResponse.json(kycStatus)
  } catch (error) {
    console.error("[v0] API Error:", error)
    return NextResponse.json({ error: "Failed to fetch KYC status" }, { status: 500 })
  }
}
