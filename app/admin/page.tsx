import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AdminDashboardStats } from "@/components/admin/dashboard-stats"
import { AdminRecentActivity } from "@/components/admin/recent-activity"

export const metadata: Metadata = {
  title: "Tableau de bord - InnovX Admin",
  description: "Tableau de bord d'administration InnovX",
}

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Tableau de bord</h1>
        <p className="text-muted-foreground">Bienvenue dans le panneau d'administration InnovX.</p>
      </div>

      <AdminDashboardStats />

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Activité récente</CardTitle>
            <CardDescription>Les dernières actions effectuées sur la plateforme</CardDescription>
          </CardHeader>
          <CardContent>
            <AdminRecentActivity />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Accès rapide</CardTitle>
            <CardDescription>Accédez rapidement aux fonctionnalités principales</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-2">
            <a
              href="/admin/users"
              className="flex items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
            >
              <span className="ml-2">Gestion des utilisateurs</span>
            </a>
            <a
              href="/admin/content"
              className="flex items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
            >
              <span className="ml-2">Gestion du contenu</span>
            </a>
            <a
              href="/admin/sections"
              className="flex items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
            >
              <span className="ml-2">Gestion des sections</span>
            </a>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
