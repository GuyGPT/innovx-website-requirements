import type { Metadata } from "next"
import { UserPublications } from "@/components/account/user-publications"

export const metadata: Metadata = {
  title: "Mes Publications - InnovX",
  description: "Gérez vos publications sur InnovX",
}

export default function UserPublicationsPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Mes Publications</h2>
      <UserPublications />
    </div>
  )
}
