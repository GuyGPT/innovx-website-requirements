import type { Metadata } from "next"
import { SectionManagement } from "@/components/admin/section-management"

export const metadata: Metadata = {
  title: "Gestion des sections - InnovX Admin",
  description: "Gérez les sections spécifiques de chaque page",
}

export default function SectionsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Gestion des sections</h1>
        <p className="text-muted-foreground">Gérez les sections spécifiques de chaque page du site.</p>
      </div>

      <SectionManagement />
    </div>
  )
}
