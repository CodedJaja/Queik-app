"use client"

import { useEffect, useRef, useState } from "react"

interface CountUpProps {
  end: number
  suffix?: string
  prefix?: string
  duration?: number
}

export function CountUp({ end, suffix = "", prefix = "", duration = 2 }: CountUpProps) {
  const [count, setCount] = useState(0)
  const started = useRef(false)

  useEffect(() => {
    if (started.current) return
    started.current = true

    let current = 0
    const increment = end / (duration * 60)
    const timer = setInterval(() => {
      current += increment
      if (current >= end) {
        setCount(end)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, 1000 / 60)

    return () => clearInterval(timer)
  }, [end, duration])

  return <span>{prefix}{count.toLocaleString()}{suffix}</span>
}
