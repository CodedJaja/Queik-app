import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const supabase = await createClient()

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { data: wallet, error } = await supabase
      .from("wallets")
      .select("*")
      .eq("user_id", user.id)
      .eq("currency", "USD")
      .single()

    if (error) {
      // If wallet doesn't exist yet, it will be handled by the trigger or first visit
      return NextResponse.json({ error: "Wallet not found" }, { status: 404 })
    }

    return NextResponse.json({
      walletId: wallet.id,
      balance: wallet.balance,
      currency: wallet.currency,
      accountNumber: wallet.account_number,
      routing_number: wallet.routing_number,
      swiftCode: wallet.swift_code,
      bankName: wallet.bank_name,
      createdAt: wallet.created_at,
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch wallet" }, { status: 500 })
  }
}
