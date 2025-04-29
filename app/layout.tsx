import type React from "react"
import { Inter, Poppins } from "next/font/google"
import "./globals.css"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"
// Importer le composant ScrollToTop
import ScrollToTop from "@/components/scroll-to-top"
import ChatBotButton from "@/components/chat-bot-button"
import { ChatBotProvider } from "@/components/chat-bot-provider"

// Configure the Inter font
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
})

// Configure the Poppins font
const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
})

export const metadata = {
  title: "InnovX - Formation, Services, Marketplace",
  description:
    "Plateforme multifonctionnelle InnovX offrant services, formations, marketplace, publicité et technologies blockchain.",
  // Ajouter ces métadonnées pour renforcer l'indication de langue
  other: {
    "content-language": "fr",
    google: "notranslate",
  },
    generator: 'v0.dev'
}

// Modifier le layout pour améliorer le responsive

// Remplacer la fonction RootLayout par celle-ci pour ajuster les marges et paddings
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" suppressHydrationWarning className="notranslate">
      <body className={`${poppins.className} ${poppins.variable}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={true}
          disableTransitionOnChange
          storageKey="innovx-theme"
        >
          <ChatBotProvider>
            <ScrollToTop />
            <div className="flex min-h-screen flex-col">
              <Header />
              <main className="flex-1 w-full max-w-[100vw] overflow-x-hidden">
                <div className="mx-auto w-full md:w-[95%] lg:w-[90%]">{children}</div>
              </main>
              <Footer />
              <ChatBotButton />
            </div>
          </ChatBotProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
