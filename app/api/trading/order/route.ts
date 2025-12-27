import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const { symbol, type, quantity, price, assetType } = await request.json()
    const totalValue = quantity * price

    // 1. Check balance if buying
    if (type === "buy") {
      const { data: wallet } = await supabase.from("wallets").select("balance").eq("user_id", user.id).single()

      if (!wallet || wallet.balance < totalValue) {
        return NextResponse.json({ error: "Insufficient funds" }, { status: 400 })
      }
    }

    // 2. Perform transaction in a safe order (Atomic operations via Supabase/Postgres)
    const { data: order, error: orderError } = await supabase.rpc("execute_trade", {
      p_user_id: user.id,
      p_symbol: symbol,
      p_type: type,
      p_quantity: quantity,
      p_price: price,
      p_asset_type: assetType,
    })

    if (orderError) throw orderError

    return NextResponse.json({ success: true, order })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
