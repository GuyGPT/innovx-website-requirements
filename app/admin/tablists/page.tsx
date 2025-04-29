import type { Metadata } from "next"
import { TablistManagement } from "@/components/admin/tablist-management"

export const metadata: Metadata = {
  title: "Gestion des Tablists - InnovX Admin",
  description: "Gérez les catégories et l'ordre d'affichage des tablists sur le site InnovX",
}

export default function TablistsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Gestion des Tablists</h1>
        <p className="text-muted-foreground">
          Modifiez les catégories des tablists et contrôlez leur ordre d'affichage sur les différentes pages.
        </p>
      </div>

      <TablistManagement />
    </div>
  )
}
