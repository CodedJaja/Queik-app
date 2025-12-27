// Technical Indicators for financial analysis

export function calculateSMA(prices: number[], period: number): number[] {
  const sma: number[] = []
  for (let i = 0; i <= prices.length - period; i++) {
    const slice = prices.slice(i, i + period)
    const avg = slice.reduce((a, b) => a + b, 0) / period
    sma.push(avg)
  }
  return sma
}

export function calculateRSI(prices: number[], period = 14): number {
  const gains: number[] = []
  const losses: number[] = []

  for (let i = 1; i < prices.length; i++) {
    const diff = prices[i] - prices[i - 1]
    gains.push(diff > 0 ? diff : 0)
    losses.push(diff < 0 ? -diff : 0)
  }

  const avgGain = gains.slice(-period).reduce((a, b) => a + b, 0) / period
  const avgLoss = losses.slice(-period).reduce((a, b) => a + b, 0) / period

  const rs = avgGain / avgLoss
  const rsi = 100 - 100 / (1 + rs)

  return isNaN(rsi) ? 50 : rsi
}

export function calculateMACD(prices: number[]): { macd: number[]; signal: number[]; histogram: number[] } {
  const ema12 = calculateEMA(prices, 12)
  const ema26 = calculateEMA(prices, 26)

  const macd = ema12.map((val, i) => (val || 0) - (ema26[i] || 0))
  const signal = calculateEMA(macd, 9)
  const histogram = macd.map((val, i) => val - (signal[i] || 0))

  return { macd, signal, histogram }
}

export function calculateEMA(prices: number[], period: number): number[] {
  const ema: number[] = []
  const k = 2 / (period + 1)

  for (let i = 0; i < prices.length; i++) {
    if (i === 0) {
      ema.push(prices[i])
    } else {
      ema.push(prices[i] * k + (ema[i - 1] || 0) * (1 - k))
    }
  }

  return ema
}

export function calculateBollingerBands(prices: number[], period = 20) {
  const sma = calculateSMA(prices, period)
  const lastSMA = sma[sma.length - 1]

  const variance = prices.slice(-period).reduce((sum, price) => sum + Math.pow(price - lastSMA, 2), 0) / period

  const stdDev = Math.sqrt(variance)

  return {
    upper: lastSMA + stdDev * 2,
    middle: lastSMA,
    lower: lastSMA - stdDev * 2,
  }
}
