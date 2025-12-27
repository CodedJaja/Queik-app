import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2 } from "lucide-react"

export default function SignupSuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <Card className="max-w-md w-full text-center p-6">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8 text-emerald-600" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">Check your email</CardTitle>
          <CardDescription className="text-slate-600 text-lg">
            We've sent a confirmation link to your email address.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-slate-500">
            Please click the link in the email to verify your account. Once verified, you can sign in to your dashboard.
          </p>
          <Link href="/auth/login" className="block">
            <Button className="w-full bg-slate-900 hover:bg-slate-800 text-white h-12 rounded-xl">
              Back to Sign In
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
