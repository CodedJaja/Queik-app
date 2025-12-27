"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

interface SearchResult {
  symbol: string
  name: string
  type: string
}

interface SearchBarProps {
  onSelect: (symbol: string) => void
}

export default function SearchBar({ onSelect }: SearchBarProps) {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<SearchResult[]>([])
  const [isOpen, setIsOpen] = useState(false)

  const handleSearch = async (value: string) => {
    setQuery(value)
    if (value.length < 1) {
      setResults([])
      setIsOpen(false)
      return
    }

    try {
      const response = await fetch(`/api/markets/search?q=${value}`)
      const data = await response.json()
      setResults(data.results || [])
      setIsOpen(true)
    } catch (error) {
      console.error("Search failed:", error)
    }
  }

  const handleSelect = (symbol: string) => {
    onSelect(symbol)
    setQuery("")
    setResults([])
    setIsOpen(false)
  }

  return (
    <div className="relative w-full max-w-md">
      <div className="relative">
        <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
        <Input
          placeholder="Search stocks, crypto, forex..."
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          className="pl-9 bg-white border-slate-200"
        />
      </div>

      {isOpen && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border border-slate-200 z-50 animate-scale-in">
          {results.map((result) => (
            <button
              key={result.symbol}
              onClick={() => handleSelect(result.symbol)}
              className="w-full text-left px-4 py-3 hover:bg-slate-50 transition-colors border-b border-slate-100 last:border-0"
            >
              <p className="font-semibold text-slate-900">{result.symbol}</p>
              <p className="text-xs text-slate-600">{result.name}</p>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
