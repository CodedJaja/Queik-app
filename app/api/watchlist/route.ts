export async function GET(request: Request) {
  try {
    // Get watchlist from localStorage (client-side) or database
    const watchlist = [
      { symbol: "BTC", name: "Bitcoin", addedAt: Date.now() },
      { symbol: "ETH", name: "Ethereum", addedAt: Date.now() },
    ]

    return Response.json({
      success: true,
      watchlist,
    })
  } catch (error) {
    return Response.json({ success: false, error: "Failed to fetch watchlist" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const { symbol, action } = await request.json()

    if (action === "add") {
      // Add to watchlist
      return Response.json({ success: true, message: "Added to watchlist" })
    } else if (action === "remove") {
      // Remove from watchlist
      return Response.json({ success: true, message: "Removed from watchlist" })
    }

    return Response.json({ success: false, error: "Invalid action" }, { status: 400 })
  } catch (error) {
    return Response.json({ success: false, error: "Failed to update watchlist" }, { status: 500 })
  }
}
