"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { LayoutDashboard, Users, FileText, Settings, LogOut, Layers, ListFilter, Shield } from "lucide-react"

const sidebarItems = [
  {
    title: "Tableau de bord",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Utilisateurs",
    href: "/admin/users",
    icon: Users,
  },
  {
    title: "Modération",
    href: "/admin/moderation",
    icon: Shield,
  },
  {
    title: "Contenu",
    href: "/admin/content",
    icon: FileText,
  },
  {
    title: "Sections",
    href: "/admin/sections",
    icon: Layers,
  },
  {
    title: "Tablists",
    href: "/admin/tablists",
    icon: ListFilter,
  },
  {
    title: "Paramètres",
    href: "/admin/settings",
    icon: Settings,
  },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <div className="flex flex-col h-full space-y-4 py-4">
      <div className="px-3 py-2">
        <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">InnovX Admin</h2>
        <div className="space-y-1">
          {sidebarItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors",
                pathname === item.href ? "bg-accent text-accent-foreground" : "transparent",
              )}
            >
              <item.icon className="mr-2 h-4 w-4" />
              {item.title}
            </Link>
          ))}
        </div>
      </div>
      <div className="mt-auto px-3 py-2">
        <Link
          href="/admin/login"
          className="flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Déconnexion
        </Link>
      </div>
    </div>
  )
}
