import { UserDashboard } from "@/components/account/user-dashboard"

export const metadata = {
  title: "Tableau de bord - InnovX",
  description: "Gérez votre compte et vos activités sur InnovX",
}

export default function AccountPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Tableau de bord</h2>
      <UserDashboard />
    </div>
  )
}
