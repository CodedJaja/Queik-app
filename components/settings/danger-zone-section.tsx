"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Trash2, AlertTriangle, Download } from 'lucide-react'

export default function DangerZoneSection() {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [deletePassword, setDeletePassword] = useState("")

  const handleDeleteAccount = async () => {
    try {
      const response = await fetch("/api/user/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: deletePassword })
      })
      if (response.ok) {
        alert("Account deletion initiated. You will receive a confirmation email.")
      }
    } catch (error) {
      console.error("[v0] Error deleting account:", error)
    }
  }

  const handleExportData = async () => {
    try {
      const response = await fetch("/api/user/export")
      if (response.ok) {
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = "my-data.json"
        a.click()
      }
    } catch (error) {
      console.error("[v0] Error exporting data:", error)
    }
  }

  return (
    <div className="space-y-4">
      {/* Export Data */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Download className="w-5 h-5 text-blue-600" />
            Data Export
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-slate-600 mb-4 text-sm">
            Download a copy of your data in JSON format. This includes your profile, transactions, and preferences.
          </p>
          <Button
            onClick={handleExportData}
            variant="outline"
            className="border-blue-200 text-blue-600"
          >
            <Download className="w-4 h-4 mr-2" />
            Export My Data
          </Button>
        </CardContent>
      </Card>

      {/* Delete Account */}
      <Card className="border-0 shadow-sm border-l-4 border-red-600 bg-red-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-600">
            <AlertTriangle className="w-5 h-5" />
            Danger Zone
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm text-red-900 font-medium mb-3">
              Deleting your account is permanent and cannot be undone. All your data will be permanently deleted.
            </p>
            {!showDeleteConfirm ? (
              <Button
                onClick={() => setShowDeleteConfirm(true)}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Account
              </Button>
            ) : (
              <div className="space-y-3 p-4 bg-white rounded-lg border border-red-300">
                <p className="text-sm font-medium text-slate-900">Confirm Account Deletion</p>
                <p className="text-sm text-slate-600">
                  This action is permanent. Please enter your password to confirm.
                </p>
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={deletePassword}
                  onChange={(e) => setDeletePassword(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                <div className="flex gap-2">
                  <Button
                    onClick={handleDeleteAccount}
                    disabled={!deletePassword}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                  >
                    Yes, Delete My Account
                  </Button>
                  <Button
                    onClick={() => {
                      setShowDeleteConfirm(false)
                      setDeletePassword("")
                    }}
                    variant="outline"
                    className="border-slate-300"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
