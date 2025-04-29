import type React from "react"
import { AccountSidebar } from "@/components/account/sidebar"
import ScrollToTop from "@/components/scroll-to-top"

export const metadata = {
  title: "Mon Compte - InnovX",
  description: "Gestion de votre compte InnovX",
}

// Fonction simple de vérification d'authentification
async function isAuthenticated() {
  // Simuler une vérification d'authentification
  // À remplacer par votre logique d'authentification réelle
  return true
}

export default async function AccountLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Vérifier si l'utilisateur est authentifié
  const authenticated = await isAuthenticated()

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Mon Compte</h1>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <AccountSidebar />
        <div className="lg:col-span-3">{children}</div>
      </div>
      <ScrollToTop />
    </div>
  )
}
