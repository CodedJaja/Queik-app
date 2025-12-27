"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Palette, Sun, Moon, Zap } from 'lucide-react'

export default function AppearanceSection() {
  const [theme, setTheme] = useState("system")
  const [primaryColor, setPrimaryColor] = useState("emerald")

  const colors = [
    { name: "emerald", label: "Emerald", value: "#10b981" },
    { name: "blue", label: "Blue", value: "#3b82f6" },
    { name: "purple", label: "Purple", value: "#8b5cf6" },
    { name: "red", label: "Red", value: "#ef4444" },
    { name: "orange", label: "Orange", value: "#f97316" },
    { name: "pink", label: "Pink", value: "#ec4899" }
  ]

  return (
    <div className="space-y-4">
      {/* Theme Selection */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sun className="w-5 h-5 text-emerald-600" />
            Theme
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-3">
            {[
              { id: "light", label: "Light", icon: Sun },
              { id: "dark", label: "Dark", icon: Moon },
              { id: "system", label: "System", icon: Zap }
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setTheme(id)}
                className={`p-4 rounded-lg border-2 transition-all flex items-center gap-2 justify-center ${
                  theme === id
                    ? "border-emerald-600 bg-emerald-50"
                    : "border-slate-200 bg-white hover:border-slate-300"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{label}</span>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Primary Color Selection */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="w-5 h-5 text-emerald-600" />
            Primary Color
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
            {colors.map(color => (
              <button
                key={color.name}
                onClick={() => setPrimaryColor(color.name)}
                className="p-4 rounded-lg border-2 transition-all hover:scale-105"
                style={{
                  backgroundColor: color.value,
                  borderColor: primaryColor === color.name ? "#000" : color.value,
                  opacity: 0.9
                }}
              >
                <span className="text-xs text-white font-medium">{color.label}</span>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Preview */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle>Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 text-center">
            <p className="text-slate-600 mb-3">Your app will look like this with your preferences</p>
            <div className="flex gap-2 justify-center">
              <button className={`px-4 py-2 rounded-lg text-white font-medium`} style={{ backgroundColor: colors.find(c => c.name === primaryColor)?.value }}>
                Sample Button
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
