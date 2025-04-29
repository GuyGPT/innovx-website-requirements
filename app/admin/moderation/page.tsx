import type { Metadata } from "next"
import { ContentModeration } from "@/components/admin/content-moderation"

export const metadata: Metadata = {
  title: "Modération du contenu - InnovX Admin",
  description: "Modération des publications utilisateurs sur la plateforme InnovX",
}

export default function ModerationPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Modération du contenu</h1>
        <p className="text-muted-foreground">
          Modérez les publications des utilisateurs avant qu'elles ne soient visibles sur la plateforme.
        </p>
      </div>

      <ContentModeration />
    </div>
  )
}
