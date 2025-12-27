import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Wallet | FinFlow",
  description: "Manage your wallet, view transactions, and control your bank accounts",
}

export default function WalletLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
