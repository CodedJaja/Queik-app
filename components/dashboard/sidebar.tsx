"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { LayoutDashboard, TrendingUp, Send, Globe, CreditCard, Bell, Settings, LogOut, Menu, X } from "lucide-react"
import { useRouter } from "next/navigation"

interface SidebarProps {
  open: boolean
  setOpen: (open: boolean) => void
}

export default function DashboardSidebar({ open, setOpen }: SidebarProps) {
  const router = useRouter()
  const pathname = usePathname()

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
    { icon: TrendingUp, label: "Trading", href: "/dashboard/trading" },
    { icon: Send, label: "Transfer", href: "/dashboard/transfer" },
    { icon: Globe, label: "Markets", href: "/dashboard/markets" },
    { icon: CreditCard, label: "Cards & Accounts", href: "/dashboard/cards" },
    { icon: Bell, label: "Notifications", href: "/dashboard/notifications" },
  ]

  const handleLogout = () => {
    localStorage.removeItem("user")
    router.push("/")
  }

  const isActive = (href: string) => {
    if (href === "/dashboard") {
      return pathname === "/dashboard"
    }
    return pathname.startsWith(href)
  }

  return (
    <>
      <button
        className="md:hidden fixed top-4 left-4 z-40 p-2 bg-white rounded-lg border border-slate-200 hover:bg-slate-100"
        onClick={() => setOpen(!open)}
      >
        {open ? <X size={24} /> : <Menu size={24} />}
      </button>

      <div
        className={`fixed md:static top-0 left-0 h-screen w-64 bg-white border-r border-slate-200 p-6 transition-transform duration-300 z-30 font-sans ${
          open ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <Link href="/" className="flex items-center gap-2 mb-12">
          <Image src="/images/design-mode/queik2.0(1).jpg" alt="Queik" width={40} height={40} className="w-10 h-10" />
          <span className="font-bold text-lg text-slate-900 font-sans">Queik</span>
        </Link>

        <nav className="space-y-2 flex-1">
          {menuItems.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-smooth ${
                  isActive(item.href)
                    ? "bg-gradient-to-r from-slate-900 to-slate-800 text-white"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                <Icon size={20} />
                <span className="font-medium">{item.label}</span>
              </Link>
            )
          })}
        </nav>

        <div className="pt-6 border-t border-slate-200 space-y-2">
          <Link
            href="/dashboard/settings"
            onClick={() => setOpen(false)}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-smooth ${
              isActive("/dashboard/settings")
                ? "bg-gradient-to-r from-slate-900 to-slate-800 text-white"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            }`}
          >
            <Settings size={20} />
            <span className="font-medium font-sans">Settings</span>
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-red-600 rounded-lg hover:bg-red-50 transition-smooth font-sans"
          >
            <LogOut size={20} />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>

      {open && <div className="fixed md:hidden inset-0 bg-black/50 z-20" onClick={() => setOpen(false)}></div>}
    </>
  )
}
