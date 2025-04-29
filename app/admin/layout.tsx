import type React from "react"
import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { AdminSidebar } from "@/components/admin/sidebar"
import { AdminHeader } from "@/components/admin/header"

export const metadata: Metadata = {
  title: "InnovX Admin",
  description: "Panneau d'administration InnovX",
}

// Fonction simple de vérification d'authentification (à remplacer par votre système d'auth)
async function isAuthenticated() {
  // Simuler une vérification d'authentification
  // À remplacer par votre logique d'authentification réelle
  return true
}

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Vérifier si l'utilisateur est authentifié
  const authenticated = await isAuthenticated()

  // Rediriger vers la page de connexion si non authentifié
  if (!authenticated) {
    redirect("/admin/login")
  }

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <AdminSidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <AdminHeader />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">{children}</main>
      </div>
    </div>
  )
}
