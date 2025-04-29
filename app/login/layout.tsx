import type React from "react"

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // Ce layout ne contient pas de Header ni de Footer
  // Il utilise uniquement le Header du layout principal
  return <>{children}</>
}
