import { createClient } from "@/lib/supabase/server"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser()

    if (userError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { currentPassword, newPassword } = body

    if (newPassword.length < 8) {
      return NextResponse.json({ error: "Password must be at least 8 characters" }, { status: 400 })
    }

    if (!/[A-Z]/.test(newPassword) || !/[0-9]/.test(newPassword)) {
      return NextResponse.json({ error: "Password must contain uppercase letters and numbers" }, { status: 400 })
    }

    // In production, we re-verify credentials to ensure it's the real user
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: user.email!,
      password: currentPassword,
    })

    if (signInError) {
      return NextResponse.json({ error: "Invalid current password" }, { status: 400 })
    }

    const { error: updateError } = await supabase.auth.updateUser({
      password: newPassword,
    })

    if (updateError) {
      throw updateError
    }

    return NextResponse.json({
      success: true,
      message: "Password changed successfully",
    })
  } catch (error: any) {
    console.error("[v0] API Error:", error)
    return NextResponse.json({ error: error.message || "Failed to change password" }, { status: 500 })
  }
}
