"use client"

import { usePathname } from "next/navigation"
import { useEffect } from "react"

// Composant client simple pour gérer le défilement vers le haut
export default function ScrollToTop() {
  const pathname = usePathname()

  useEffect(() => {
    // Défiler vers le haut de la page lorsque le chemin change
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}
