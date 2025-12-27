"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertCircle, Check, Lock, Shield, Smartphone, Activity, Key } from "lucide-react"

export default function SecurityPage() {
  const [show2FA, setShow2FA] = useState(false)
  const [password, setPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")

  const loginHistory = [
    { device: "Chrome on Windows", ip: "192.168.1.1", date: "Today at 2:30 PM", location: "Lagos, Nigeria" },
    { device: "Safari on iPhone", ip: "192.168.1.2", date: "Yesterday at 10:15 AM", location: "Lagos, Nigeria" },
    { device: "Mobile App", ip: "192.168.1.3", date: "2 days ago", location: "Lagos, Nigeria" },
  ]

  return (
    <div className="space-y-6 font-sans">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Security & Privacy</h1>
        <p className="text-slate-600">Manage your account security and protect your funds</p>
      </div>

      <Tabs defaultValue="password" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="password">Password</TabsTrigger>
          <TabsTrigger value="2fa">2FA</TabsTrigger>
          <TabsTrigger value="devices">Devices</TabsTrigger>
          <TabsTrigger value="aml">AML/KYC</TabsTrigger>
        </TabsList>

        {/* Password Tab */}
        <TabsContent value="password">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="w-5 h-5" /> Change Password
              </CardTitle>
              <CardDescription>Update your password to keep your account secure</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="current">Current Password</Label>
                  <Input
                    id="current"
                    type="password"
                    placeholder="Enter current password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="new">New Password</Label>
                  <Input
                    id="new"
                    type="password"
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="mt-2"
                  />
                  <div className="mt-3 space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Check className={`w-4 h-4 ${newPassword.length >= 8 ? "text-emerald-600" : "text-slate-300"}`} />
                      <span>At least 8 characters</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Check
                        className={`w-4 h-4 ${/[0-9]/.test(newPassword) ? "text-emerald-600" : "text-slate-300"}`}
                      />
                      <span>Contains a number</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Check
                        className={`w-4 h-4 ${/[A-Z]/.test(newPassword) ? "text-emerald-600" : "text-slate-300"}`}
                      />
                      <span>Contains uppercase letter</span>
                    </div>
                  </div>
                </div>
              </div>
              <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">Update Password</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 2FA Tab */}
        <TabsContent value="2fa">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" /> Two-Factor Authentication
              </CardTitle>
              <CardDescription>Add an extra layer of security to your account</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 flex items-start gap-3">
                <Check className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-emerald-900">2FA is enabled</p>
                  <p className="text-sm text-emerald-800">Your account is protected with two-factor authentication</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-slate-900 mb-3">2FA Methods</h3>
                  <div className="space-y-3">
                    <Card className="border-emerald-200 bg-emerald-50">
                      <CardContent className="p-4 flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <Smartphone className="w-5 h-5 text-emerald-600 mt-0.5" />
                          <div>
                            <p className="font-semibold text-slate-900">Authenticator App</p>
                            <p className="text-sm text-slate-600">Google Authenticator, Authy</p>
                          </div>
                        </div>
                        <span className="text-green-600 font-semibold text-sm">Active</span>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4 flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <AlertCircle className="w-5 h-5 text-slate-400 mt-0.5" />
                          <div>
                            <p className="font-semibold text-slate-900">SMS/Text Message</p>
                            <p className="text-sm text-slate-600">Receive codes via SMS</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          Enable
                        </Button>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4 flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <AlertCircle className="w-5 h-5 text-slate-400 mt-0.5" />
                          <div>
                            <p className="font-semibold text-slate-900">Backup Codes</p>
                            <p className="text-sm text-slate-600">One-time codes if you lose access</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          Generate
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Devices Tab */}
        <TabsContent value="devices">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5" /> Active Devices & Login History
              </CardTitle>
              <CardDescription>Manage your connected devices and review login activity</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {loginHistory.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 border border-slate-200 rounded-lg hover:bg-slate-50 flex items-center justify-between"
                >
                  <div>
                    <p className="font-semibold text-slate-900">{item.device}</p>
                    <p className="text-sm text-slate-600">{item.location}</p>
                    <p className="text-xs text-slate-500 mt-1">{item.ip}</p>
                    <p className="text-xs text-slate-500">{item.date}</p>
                  </div>
                  {idx === 0 && (
                    <span className="text-xs font-semibold bg-blue-50 text-blue-600 px-3 py-1 rounded-full">
                      Current
                    </span>
                  )}
                </div>
              ))}
              <Button variant="outline" className="w-full bg-transparent">
                Logout from all devices
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* AML/KYC Tab */}
        <TabsContent value="aml">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="w-5 h-5" /> Compliance Status
              </CardTitle>
              <CardDescription>Your KYC/AML verification status</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-emerald-900">KYC Verified</p>
                    <p className="text-sm text-emerald-800">Your identity has been verified</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-slate-900 mb-3">Verification Details</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Status</span>
                      <span className="font-semibold text-emerald-600">Verified</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Verified on</span>
                      <span className="font-semibold">November 20, 2024</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Verification Level</span>
                      <span className="font-semibold">Full (Tier 3)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Daily Limit</span>
                      <span className="font-semibold">$10,000 USD</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Monthly Limit</span>
                      <span className="font-semibold">$100,000 USD</span>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h3 className="font-semibold text-slate-900 mb-3">AML Screening</h3>
                  <div className="bg-emerald-50 border border-emerald-200 rounded p-3 flex items-start gap-3">
                    <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-emerald-800">No sanctions or AML alerts detected</p>
                  </div>
                </div>
              </div>

              <Button className="w-full bg-slate-200 text-slate-900 hover:bg-slate-300">
                Update Verification Information
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
