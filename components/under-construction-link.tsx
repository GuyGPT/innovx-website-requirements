"use client"

import type React from "react"

import type { ReactNode } from "react"
import { useUnderConstructionPopup } from "./under-construction-popup"

interface UnderConstructionLinkProps {
  children: ReactNode
  className?: string
}

export default function UnderConstructionLink({ children, className }: UnderConstructionLinkProps) {
  const { openPopup, PopupComponent } = useUnderConstructionPopup()

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    openPopup()
  }

  return (
    <>
      <a href="#" onClick={handleClick} className={className}>
        {children}
      </a>
      <PopupComponent />
    </>
  )
}
