import { marketDataManager } from "@/lib/market-data"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const pairs = searchParams.get("pairs")?.split(",") || ["EURUSD", "GBPUSD", "USDJPY"]

    const data = await marketDataManager.getForex(pairs)

    return Response.json({
      success: true,
      data,
      timestamp: Date.now(),
    })
  } catch (error) {
    return Response.json({ success: false, error: "Failed to fetch forex data" }, { status: 500 })
  }
}
