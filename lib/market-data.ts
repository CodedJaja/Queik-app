// Market Data Abstraction Layer - Provider-agnostic system for fetching and normalizing market data

export interface MarketDataProvider {
  name: string
  fetchStocks(symbols: string[]): Promise<any[]>
  fetchCrypto(symbols: string[]): Promise<any[]>
  fetchForex(pairs: string[]): Promise<any[]>
}

export interface PriceData {
  symbol: string
  name: string
  price: number
  change: number
  changePercent: number
  volume: string
  marketCap: string
  high24h: number
  low24h: number
  timestamp: number
}

export interface CandleData {
  timestamp: number
  open: number
  high: number
  low: number
  close: number
  volume: number
}

// Mock provider implementation
export class MockMarketProvider implements MarketDataProvider {
  name = "Mock Provider"

  async fetchStocks(symbols: string[]): Promise<PriceData[]> {
    return symbols.map((symbol) => ({
      symbol,
      name: `${symbol} Corp`,
      price: Math.random() * 500 + 50,
      change: Math.random() * 20 - 10,
      changePercent: Math.random() * 10 - 5,
      volume: `${Math.random() * 100}M`,
      marketCap: `${Math.random() * 1000}B`,
      high24h: Math.random() * 600 + 50,
      low24h: Math.random() * 400 + 30,
      timestamp: Date.now(),
    }))
  }

  async fetchCrypto(symbols: string[]): Promise<PriceData[]> {
    return symbols.map((symbol) => ({
      symbol,
      name: this.getCryptoName(symbol),
      price: Math.random() * 50000 + 100,
      change: Math.random() * 30 - 15,
      changePercent: Math.random() * 20 - 10,
      volume: `${Math.random() * 50}B`,
      marketCap: `${Math.random() * 500}B`,
      high24h: Math.random() * 55000 + 100,
      low24h: Math.random() * 45000 + 100,
      timestamp: Date.now(),
    }))
  }

  async fetchForex(pairs: string[]): Promise<PriceData[]> {
    return pairs.map((pair) => ({
      symbol: pair,
      name: pair,
      price: Math.random() * 2 + 0.8,
      change: Math.random() * 0.1 - 0.05,
      changePercent: Math.random() * 5 - 2.5,
      volume: `${Math.random() * 100}B`,
      marketCap: "N/A",
      high24h: Math.random() * 2.2 + 0.8,
      low24h: Math.random() * 1.8 + 0.8,
      timestamp: Date.now(),
    }))
  }

  private getCryptoName(symbol: string): string {
    const names: { [key: string]: string } = {
      BTC: "Bitcoin",
      ETH: "Ethereum",
      SOL: "Solana",
      XRP: "Ripple",
      DOGE: "Dogecoin",
      ADA: "Cardano",
    }
    return names[symbol] || symbol
  }
}

// Market Data Manager
export class MarketDataManager {
  private provider: MarketDataProvider
  private cache: Map<string, { data: any; timestamp: number }> = new Map()
  private cacheExpiry = 60000 // 1 minute

  constructor(provider?: MarketDataProvider) {
    // In production, you would check for process.env.ALPHA_VANTAGE_API_KEY etc.
    // and initialize a real provider. For now, we still provide a structured fallback.
    this.provider = provider || new MockMarketProvider()
  }

  async getStocks(symbols: string[]): Promise<PriceData[]> {
    const cacheKey = `stocks:${symbols.join(",")}`
    if (this.isCacheValid(cacheKey)) {
      return this.cache.get(cacheKey)!.data
    }

    const data = await this.provider.fetchStocks(symbols)
    this.cache.set(cacheKey, { data, timestamp: Date.now() })
    return data
  }

  async getCrypto(symbols: string[]): Promise<PriceData[]> {
    const cacheKey = `crypto:${symbols.join(",")}`
    if (this.isCacheValid(cacheKey)) {
      return this.cache.get(cacheKey)!.data
    }

    const data = await this.provider.fetchCrypto(symbols)
    this.cache.set(cacheKey, { data, timestamp: Date.now() })
    return data
  }

  async getForex(pairs: string[]): Promise<PriceData[]> {
    const cacheKey = `forex:${pairs.join(",")}`
    if (this.isCacheValid(cacheKey)) {
      return this.cache.get(cacheKey)!.data
    }

    const data = await this.provider.fetchForex(pairs)
    this.cache.set(cacheKey, { data, timestamp: Date.now() })
    return data
  }

  private isCacheValid(key: string): boolean {
    const cached = this.cache.get(key)
    if (!cached) return false
    return Date.now() - cached.timestamp < this.cacheExpiry
  }

  clearCache(): void {
    this.cache.clear()
  }
}

// Singleton instance
export const marketDataManager = new MarketDataManager()
