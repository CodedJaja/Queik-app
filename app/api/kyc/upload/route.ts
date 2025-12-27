import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File
    const type = formData.get("type") as string

    if (!file || !type) {
      return NextResponse.json({ error: "File and type are required" }, { status: 400 })
    }

    const validTypes = ["id", "selfie", "address"]
    if (!validTypes.includes(type)) {
      return NextResponse.json({ error: "Invalid document type" }, { status: 400 })
    }

    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: "File size must be less than 5MB" }, { status: 400 })
    }

    const uploadedFile = {
      type,
      name: file.name,
      size: file.size,
      uploadedAt: new Date().toISOString(),
      url: `/documents/${type}-${Date.now()}`,
    }

    return NextResponse.json({
      success: true,
      file: uploadedFile,
      message: "Document uploaded successfully",
    })
  } catch (error) {
    console.error("[v0] API Error:", error)
    return NextResponse.json({ error: "Failed to upload document" }, { status: 500 })
  }
}
