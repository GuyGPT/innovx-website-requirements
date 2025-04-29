"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Home, FileText, DollarSign, Settings, Bell, ShoppingBag } from "lucide-react"

const sidebarItems = [
  {
    title: "Tableau de bord",
    href: "/account",
    icon: Home,
  },
  {
    title: "Mes publications",
    href: "/account/publications",
    icon: FileText,
  },
  {
    title: "Programme d'affiliation",
    href: "/account/affiliation",
    icon: DollarSign,
  },
  {
    title: "Mes commandes",
    href: "/account/commandes",
    icon: ShoppingBag,
  },
  // {
  //   title: "Mes favoris",
  //   href: "/account/favoris",
  //   icon: Heart,
  // },
  // {
  //   title: "Moyens de paiement",
  //   href: "/account/paiement",
  //   icon: CreditCard,
  // },
  {
    title: "Notifications",
    href: "/account/notifications",
    icon: Bell,
  },
  {
    title: "Paramètres",
    href: "/account/parametres",
    icon: Settings,
  },
]

export function AccountSidebar() {
  const pathname = usePathname()

  return (
    <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-md">
      <nav className="space-y-1">
        {sidebarItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors",
              pathname === item.href
                ? "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700",
            )}
          >
            <item.icon className="mr-3 h-4 w-4" />
            {item.title}
          </Link>
        ))}
      </nav>
    </div>
  )
}
