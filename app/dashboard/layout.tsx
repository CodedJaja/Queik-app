"use client"

import { useEffect, useState } from "react"
import { useRouter } from 'next/navigation'
import DashboardNav from "@/components/dashboard/nav"
import DashboardSidebar from "@/components/dashboard/sidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const [isAuthed, setIsAuthed] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(true)

  useEffect(() => {
    const user = localStorage.getItem("user")
    if (!user) {
      router.push("/auth/login")
    } else {
      setIsAuthed(true)
    }
  }, [router])

  if (!isAuthed) return null

  return (
    <div className="flex h-screen bg-slate-100">
      <DashboardSidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardNav />
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
