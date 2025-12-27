import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { bankName, accountNumber, accountType } = body

    if (!bankName || !accountNumber || !accountType) {
      return NextResponse.json({ error: "Missing required bank details" }, { status: 400 })
    }

    const newBankAccount = {
      id: `bank-${Date.now()}`,
      bankName,
      accountNumber: `****${accountNumber.slice(-4)}`,
      accountType,
      isDefault: false,
      addedAt: new Date().toISOString(),
      verified: false,
    }

    return NextResponse.json({
      success: true,
      bankAccount: newBankAccount,
      message: "Bank account added successfully",
    })
  } catch (error) {
    console.error("[v0] API Error:", error)
    return NextResponse.json({ error: "Failed to add bank account" }, { status: 500 })
  }
}
