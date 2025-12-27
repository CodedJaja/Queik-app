"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, Lock, Bell, Shield, CreditCard, Palette, Trash2 } from 'lucide-react'
import ProfileSection from "@/components/settings/profile-section"
import SecuritySection from "@/components/settings/security-section"
import NotificationsSection from "@/components/settings/notifications-section"
import KYCSection from "@/components/settings/kyc-section"
import BankAccountsSection from "@/components/settings/bank-accounts-section"
import AppearanceSection from "@/components/settings/appearance-section"
import DangerZoneSection from "@/components/settings/danger-zone-section"

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile")

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-6 font-sans">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Settings</h1>
          <p className="text-slate-600">Manage your account, security, and preferences</p>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-7 bg-white border border-slate-200 h-auto p-1">
            <TabsTrigger value="profile" className="flex items-center gap-2 text-sm">
              <User className="w-4 h-4 hidden md:block" />
              <span className="hidden md:inline">Profile</span>
              <span className="md:hidden">Profile</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2 text-sm">
              <Lock className="w-4 h-4 hidden md:block" />
              <span className="hidden md:inline">Security</span>
              <span className="md:hidden">Security</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2 text-sm">
              <Bell className="w-4 h-4 hidden md:block" />
              <span className="hidden md:inline">Alerts</span>
              <span className="md:hidden">Alerts</span>
            </TabsTrigger>
            <TabsTrigger value="kyc" className="flex items-center gap-2 text-sm">
              <Shield className="w-4 h-4 hidden md:block" />
              <span className="hidden md:inline">KYC</span>
              <span className="md:hidden">KYC</span>
            </TabsTrigger>
            <TabsTrigger value="banks" className="flex items-center gap-2 text-sm">
              <CreditCard className="w-4 h-4 hidden md:block" />
              <span className="hidden md:inline">Banks</span>
              <span className="md:hidden">Banks</span>
            </TabsTrigger>
            <TabsTrigger value="appearance" className="flex items-center gap-2 text-sm">
              <Palette className="w-4 h-4 hidden md:block" />
              <span className="hidden md:inline">Theme</span>
              <span className="md:hidden">Theme</span>
            </TabsTrigger>
            <TabsTrigger value="danger" className="flex items-center gap-2 text-sm">
              <Trash2 className="w-4 h-4 hidden md:block" />
              <span className="hidden md:inline">Danger</span>
              <span className="md:hidden">Danger</span>
            </TabsTrigger>
          </TabsList>

          {/* Content */}
          <div className="mt-6">
            <TabsContent value="profile">
              <ProfileSection />
            </TabsContent>
            <TabsContent value="security">
              <SecuritySection />
            </TabsContent>
            <TabsContent value="notifications">
              <NotificationsSection />
            </TabsContent>
            <TabsContent value="kyc">
              <KYCSection />
            </TabsContent>
            <TabsContent value="banks">
              <BankAccountsSection />
            </TabsContent>
            <TabsContent value="appearance">
              <AppearanceSection />
            </TabsContent>
            <TabsContent value="danger">
              <DangerZoneSection />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </main>
  )
}
