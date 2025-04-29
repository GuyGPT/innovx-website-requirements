import type { Metadata } from "next"
import { AffiliationDashboard } from "@/components/account/affiliation-dashboard"

export const metadata: Metadata = {
  title: "Programme d'affiliation - InnovX",
  description: "Gérez votre programme d'affiliation sur InnovX",
}

export default function AffiliationPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Programme d'affiliation</h2>
      <AffiliationDashboard />
    </div>
  )
}
