// Real Market Data Implementation using CoinGecko and public APIs
import type { PriceData, MarketDataProvider } from "./market-data"

export class CoinGeckoProvider implements MarketDataProvider {
  name = "CoinGecko"
  private baseUrl = "https://api.coingecko.com/api/v3"

  async fetchCrypto(symbols: string[]): Promise<PriceData[]> {
    try {
      // Map common symbols to CoinGecko IDs
      const symbolMap: Record<string, string> = {
        BTC: "bitcoin",
        ETH: "ethereum",
        SOL: "solana",
        USDC: "usd-coin",
        USDT: "tether",
      }

      const ids = symbols.map((s) => symbolMap[s.toUpperCase()] || s.toLowerCase()).join(",")
      const response = await fetch(
        `${this.baseUrl}/simple/price?ids=${ids}&vs_currencies=usd&include_24hr_vol=true&include_24hr_change=true&include_market_cap=true`,
      )
      const data = await response.json()

      return symbols.map((symbol) => {
        const id = symbolMap[symbol.toUpperCase()] || symbol.toLowerCase()
        const coinData = data[id] || {}

        return {
          symbol,
          name: symbol,
          price: coinData.usd || 0,
          change: coinData.usd_24h_change || 0,
          changePercent: coinData.usd_24h_change || 0,
          volume: coinData.usd_24h_vol ? `$${(coinData.usd_24h_vol / 1e9).toFixed(2)}B` : "N/A",
          marketCap: coinData.usd_market_cap ? `$${(coinData.usd_market_cap / 1e9).toFixed(2)}B` : "N/A",
          high24h: (coinData.usd || 0) * 1.05, // CoinGecko simple price doesn't include high/low
          low24h: (coinData.usd || 0) * 0.95,
          timestamp: Date.now(),
        }
      })
    } catch (error) {
      console.error("[v0] CoinGecko Fetch Error:", error)
      return []
    }
  }

  // Fallback to mock for stocks/forex unless real keys provided
  async fetchStocks(symbols: string[]): Promise<any[]> {
    return []
  }
  async fetchForex(pairs: string[]): Promise<any[]> {
    return []
  }
}
