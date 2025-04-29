"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, Bell, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"

export function AdminHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between h-16 px-4 md:px-6">
        <div className="flex items-center md:hidden">
          <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            <Menu className="h-5 w-5" />
            <span className="sr-only">Ouvrir le menu</span>
          </Button>
        </div>
        <div className="flex-1 flex items-center justify-end space-x-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
            <input
              type="search"
              placeholder="Rechercher..."
              className="w-full md:w-[200px] pl-8 h-9 bg-gray-100 dark:bg-gray-700 border-none rounded-md text-sm"
            />
          </div>
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Notifications</span>
          </Button>
          <ThemeToggle />
          <Link href="/" className="text-sm font-medium">
            Retour au site
          </Link>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 dark:border-gray-700">
          <nav className="flex flex-col p-2">
            <Link
              href="/admin"
              className="px-3 py-2 text-sm font-medium rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              Tableau de bord
            </Link>
            <Link
              href="/admin/users"
              className="px-3 py-2 text-sm font-medium rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              Utilisateurs
            </Link>
            <Link
              href="/admin/content"
              className="px-3 py-2 text-sm font-medium rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              Contenu
            </Link>
            <Link
              href="/admin/sections"
              className="px-3 py-2 text-sm font-medium rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              Sections
            </Link>
            <Link
              href="/admin/settings"
              className="px-3 py-2 text-sm font-medium rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              Paramètres
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
