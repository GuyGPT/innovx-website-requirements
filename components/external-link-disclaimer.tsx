"use client"

import type React from "react"

// Composant simplifié qui ne fait que rediriger directement vers l'URL
export function ExternalLinkDisclaimer() {
  return null
}

export function useExternalLinkDisclaimer() {
  // Version simplifiée qui ne fait rien
  return {
    isDisclaimerOpen: false,
    externalUrl: "",
    openDisclaimer: () => {},
    closeDisclaimer: () => {},
    continueToExternalSite: () => {},
    DisclaimerComponent: () => null,
  }
}

export default function ExternalLink({
  href,
  children,
  className = "",
}: { href: string; children: React.ReactNode; className?: string }) {
  // Version simplifiée qui redirige directement sans pop-up
  return (
    <a href={href} className={className}>
      {children}
    </a>
  )
}
