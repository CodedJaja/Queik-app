import { createClient } from "@/lib/supabase/server"
import { stripe } from "@/lib/stripe"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { amount, provider } = await request.json()

    if (provider === "stripe") {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: "usd",
              product_data: {
                name: "Wallet Deposit",
                description: `Deposit to your Queik USD wallet`,
              },
              unit_amount: Math.round(amount * 100),
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: `${request.headers.get("origin")}/dashboard?deposit=success`,
        cancel_url: `${request.headers.get("origin")}/dashboard/wallet/add-money?deposit=cancelled`,
        metadata: {
          user_id: user.id,
          type: "deposit",
        },
      })

      // Create a pending transaction in Supabase
      await supabase.from("transactions").insert({
        user_id: user.id,
        type: "deposit",
        amount: amount,
        status: "pending",
        description: "Stripe Wallet Deposit",
        metadata: { stripe_session_id: session.id },
      })

      return NextResponse.json({ url: session.url })
    }

    // Handle other providers or mock
    return NextResponse.json({ error: "Provider not implemented" }, { status: 400 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to initiate deposit" }, { status: 500 })
  }
}
