import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { userId, transactionType, amount, frequency, recipientCountry, userRiskProfile } = await request.json()

    let riskScore = 0
    const flags: string[] = []

    // Transaction-based risk
    if (amount > 50000) {
      riskScore += 0.2
      flags.push("large_amount")
    }

    // Frequency-based risk (rapid transactions)
    if (frequency > 5) {
      riskScore += 0.15
      flags.push("frequent_transactions")
    }

    // Geographic risk
    const highRiskCountries = ["KP", "IR", "SY", "CU"]
    if (highRiskCountries.includes(recipientCountry)) {
      riskScore += 0.3
      flags.push("high_risk_country")
    }

    // User profile risk
    if (userRiskProfile === "new") {
      riskScore += 0.1
      flags.push("new_user")
    }

    const riskLevel = riskScore > 0.5 ? "high" : riskScore > 0.2 ? "medium" : "low"

    return NextResponse.json({
      riskScore: Math.min(riskScore, 1),
      riskLevel,
      flags,
      requiresManualReview: riskScore > 0.5,
      recommendedAction: riskScore > 0.5 ? "block" : "approve",
    })
  } catch (error) {
    return NextResponse.json({ error: "Risk assessment failed" }, { status: 500 })
  }
}
