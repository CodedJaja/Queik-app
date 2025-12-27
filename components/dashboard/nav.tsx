"use client"

import { useRouter } from "next/navigation"
import { LogOut, Bell, Settings, User } from "lucide-react"
import { useState } from "react"
import Link from "next/link"

export default function DashboardNav() {
  const router = useRouter()
  const [showMenu, setShowMenu] = useState(false)
  const user = typeof window !== "undefined" ? JSON.parse(localStorage.getItem("user") || "{}") : {}

  const handleLogout = () => {
    localStorage.removeItem("user")
    router.push("/")
  }

  return (
    <nav className="bg-white border-b border-slate-200 px-4 md:px-8 py-4 flex justify-between items-center font-sans">
      <div>
        <h2 className="text-lg font-semibold text-slate-900">Dashboard</h2>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        <Link href="/dashboard/notifications" className="p-2 hover:bg-slate-100 rounded-lg transition-smooth relative">
          <Bell size={20} className="text-slate-600" />
          <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500"></span>
        </Link>

        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="flex items-center gap-2 md:gap-3 p-2 hover:bg-slate-100 rounded-lg transition-smooth"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-slate-900 flex items-center justify-center text-white text-sm font-bold font-sans">
              {user.name?.[0] || user.email?.[0] || "U"}
            </div>
            <span className="hidden md:inline text-sm font-medium text-slate-900">{user.name || "User"}</span>
          </button>

          {showMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-slate-200 py-2 z-50 animate-scale-in">
              <button className="w-full flex items-center gap-3 px-4 py-2 hover:bg-slate-100 transition-smooth text-slate-900">
                <User size={16} />
                <span>Profile</span>
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-2 hover:bg-slate-100 transition-smooth text-slate-900">
                <Settings size={16} />
                <span>Settings</span>
              </button>
              <div className="my-1 border-t border-slate-200"></div>
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-2 hover:bg-red-50 transition-smooth text-red-600"
              >
                <LogOut size={16} />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}
