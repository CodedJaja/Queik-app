import { CheckCircle, Clock, AlertCircle } from 'lucide-react'
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function KYCStatusSection() {
  const kycStatus = "verified" // Can be: "not-started", "pending", "verified"

  const getKYCDisplay = () => {
    switch (kycStatus) {
      case "verified":
        return {
          icon: CheckCircle,
          title: "Verified",
          subtitle: "Your account is verified",
          color: "emerald",
          badge: "Verified",
          showButton: false,
        }
      case "pending":
        return {
          icon: Clock,
          title: "Pending",
          subtitle: "Verification in progress",
          color: "yellow",
          badge: "Pending",
          showButton: false,
        }
      case "not-started":
        return {
          icon: AlertCircle,
          title: "Not Verified",
          subtitle: "Start verification to unlock features",
          color: "red",
          badge: "Not Started",
          showButton: true,
        }
      default:
        return {
          icon: AlertCircle,
          title: "Unknown",
          subtitle: "Unable to fetch status",
          color: "slate",
          badge: "Unknown",
          showButton: false,
        }
    }
  }

  const display = getKYCDisplay()
  const Icon = display.icon
  const colorMap = {
    emerald: "bg-emerald-50 text-emerald-600",
    yellow: "bg-yellow-50 text-yellow-600",
    red: "bg-red-50 text-red-600",
    slate: "bg-slate-50 text-slate-600",
  }

  return (
    <Card className="p-6">
      <div className="text-center space-y-4">
        <div className={`h-16 w-16 rounded-full flex items-center justify-center mx-auto ${colorMap[display.color as keyof typeof colorMap]}`}>
          <Icon className="h-8 w-8" />
        </div>

        <div>
          <h3 className="text-lg font-semibold text-slate-900">{display.title}</h3>
          <p className="text-sm text-slate-600">{display.subtitle}</p>
        </div>

        {display.showButton && (
          <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">
            Start Verification
          </Button>
        )}

        {!display.showButton && (
          <Alert className={`border-${display.color}-200 bg-${display.color}-50`}>
            <AlertDescription className={`text-${display.color}-800`}>
              KYC Status: {display.badge}
            </AlertDescription>
          </Alert>
        )}
      </div>
    </Card>
  )
}
