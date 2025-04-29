import type { Metadata } from "next"
import { ContentManagement } from "@/components/admin/content-management"

export const metadata: Metadata = {
  title: "Gestion du contenu - InnovX Admin",
  description: "Gérez le contenu du site InnovX",
}

export default function ContentPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Gestion du contenu</h1>
        <p className="text-muted-foreground">Modifiez les textes des boutons, titres et autres éléments du site.</p>
      </div>

      <ContentManagement />
    </div>
  )
}
