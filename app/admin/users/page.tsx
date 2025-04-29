import type { Metadata } from "next"
import { UserManagement } from "@/components/admin/user-management"

export const metadata: Metadata = {
  title: "Gestion des utilisateurs - InnovX Admin",
  description: "Gérez les utilisateurs de la plateforme InnovX",
}

export default function UsersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Gestion des utilisateurs</h1>
        <p className="text-muted-foreground">
          Gérez les vendeurs, coachs, annonceurs et autres utilisateurs de la plateforme.
        </p>
      </div>

      <UserManagement />
    </div>
  )
}
