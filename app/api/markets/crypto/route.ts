import { marketDataManager } from "@/lib/market-data"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const symbols = searchParams.get("symbols")?.split(",") || ["BTC", "ETH", "SOL"]

    const data = await marketDataManager.getCrypto(symbols)

    return Response.json({
      success: true,
      data,
      timestamp: Date.now(),
    })
  } catch (error) {
    return Response.json({ success: false, error: "Failed to fetch crypto data" }, { status: 500 })
  }
}
