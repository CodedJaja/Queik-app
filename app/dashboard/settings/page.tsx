"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, Lock, Bell, Shield, CreditCard, Palette, Trash2 } from "lucide-react"
import ProfileSection from "@/components/settings/profile-section"
import SecuritySection from "@/components/settings/security-section"
import NotificationsSection from "@/components/settings/notifications-section"
import KYCSection from "@/components/settings/kyc-section"
import BankAccountsSection from "@/components/settings/bank-accounts-section"
import AppearanceSection from "@/components/settings/appearance-section"
import DangerZoneSection from "@/components/settings/danger-zone-section"

export default function DashboardSettingsPage() {
  const [activeTab, setActiveTab] = useState("profile")

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Settings</h1>
          <p className="text-slate-600">Manage your account, security, and preferences</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-7 gap-1 bg-white border border-slate-200 p-1 h-auto mb-6">
            <TabsTrigger value="profile" className="flex items-center gap-2 text-xs md:text-sm py-2">
              <User className="w-4 h-4" />
              <span className="hidden md:inline">Profile</span>
              <span className="md:hidden">Profile</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2 text-xs md:text-sm py-2">
              <Lock className="w-4 h-4" />
              <span className="hidden md:inline">Security</span>
              <span className="md:hidden">Security</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2 text-xs md:text-sm py-2">
              <Bell className="w-4 h-4" />
              <span className="hidden md:inline">Alerts</span>
              <span className="md:hidden">Alerts</span>
            </TabsTrigger>
            <TabsTrigger value="kyc" className="flex items-center gap-2 text-xs md:text-sm py-2">
              <Shield className="w-4 h-4" />
              <span className="hidden md:inline">KYC</span>
              <span className="md:hidden">KYC</span>
            </TabsTrigger>
            <TabsTrigger value="banks" className="flex items-center gap-2 text-xs md:text-sm py-2">
              <CreditCard className="w-4 h-4" />
              <span className="hidden md:inline">Banks</span>
              <span className="md:hidden">Banks</span>
            </TabsTrigger>
            <TabsTrigger value="appearance" className="flex items-center gap-2 text-xs md:text-sm py-2">
              <Palette className="w-4 h-4" />
              <span className="hidden md:inline">Theme</span>
              <span className="md:hidden">Theme</span>
            </TabsTrigger>
            <TabsTrigger value="danger" className="flex items-center gap-2 text-xs md:text-sm py-2">
              <Trash2 className="w-4 h-4" />
              <span className="hidden md:inline">Danger</span>
              <span className="md:hidden">Danger</span>
            </TabsTrigger>
          </TabsList>

          <div className="mt-6 animate-fade-in">
            <TabsContent value="profile" className="space-y-6">
              <ProfileSection />
            </TabsContent>
            <TabsContent value="security" className="space-y-6">
              <SecuritySection />
            </TabsContent>
            <TabsContent value="notifications" className="space-y-6">
              <NotificationsSection />
            </TabsContent>
            <TabsContent value="kyc" className="space-y-6">
              <KYCSection />
            </TabsContent>
            <TabsContent value="banks" className="space-y-6">
              <BankAccountsSection />
            </TabsContent>
            <TabsContent value="appearance" className="space-y-6">
              <AppearanceSection />
            </TabsContent>
            <TabsContent value="danger" className="space-y-6">
              <DangerZoneSection />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </main>
  )
}
