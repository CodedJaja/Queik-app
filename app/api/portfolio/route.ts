import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const { data: holdings, error } = await supabase.from("portfolios").select("*").eq("user_id", user.id)

    if (error) throw error

    return NextResponse.json({ holdings })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
