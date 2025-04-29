"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Menu,
  LogIn,
  Settings,
  User,
  Shield,
  History,
  CreditCard,
  HelpCircle,
  LogOut,
  AlertTriangle,
  Home,
  LayoutGrid,
  Brain,
  ShoppingCart,
  GraduationCap,
  Coins,
  Megaphone,
  Users,
  Info,
} from "lucide-react"
import Image from "next/image"
import { ThemeToggle } from "@/components/theme-toggle"
import { usePathname } from "next/navigation"
import UnderConstructionLink from "./under-construction-link"

// Ajouter ce style pour l'animation du texte défilant
const marqueeStyles = `
  @keyframes marquee {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
  
  .marquee-container {
    display: flex;
    width: 100%;
    overflow: hidden;
  }
  
  .marquee-content {
    display: flex;
    white-space: nowrap;
    animation: marquee 30s linear infinite;
    width: max-content;
  }
  
  .marquee-item {
    flex-shrink: 0;
    width: max-content;
    padding-right: 50px;
  }

  /* Styles pour corriger le problème du carré jaune */
  .dark .mobile-menu-button {
    outline: none !important;
    box-shadow: none !important;
    border: none !important;
  }

  .dark .mobile-menu-button:focus,
  .dark .mobile-menu-button:focus-visible {
    outline: none !important;
    box-shadow: none !important;
    border: none !important;
  }

  .dark .mobile-menu-button::before,
  .dark .mobile-menu-button::after,
  .dark .mobile-menu-button *::before,
  .dark .mobile-menu-button *::after {
    display: none !important;
    border: none !important;
    outline: none !important;
  }

  /* Styles pour assurer la visibilité de l'icône de fermeture */
  .mobile-menu-close {
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    height: 40px !important;
    width: 40px !important;
    background-color: transparent !important;
    border: none !important;
    outline: none !important;
    box-shadow: none !important;
    position: relative !important;
    z-index: 9999 !important;
    cursor: pointer !important;
  }

  .mobile-menu-close svg {
    display: block !important;
    visibility: visible !important;
    opacity: 1 !important;
    width: 24px !important;
    height: 24px !important;
    stroke-width: 2.5 !important;
    color: currentColor !important;
    stroke: currentColor !important;
  }

  /* Supprimer les styles qui pourraient interférer */
  [&_.lucide-x],
  [&_.lucide-arrow-left] {
    opacity: 1 !important;
    visibility: visible !important;
    display: block !important;
  }

  /* Assurer que le contenu du SheetContent n'interfère pas */
  .SheetContent {
    --sheet-icon-opacity: 1 !important;
  }
`

const mainNavItems = [
  {
    title: "Accueil",
    href: "/",
    icon: Home,
  },
  {
    title: "Services",
    href: "/services",
    icon: LayoutGrid,
  },
  {
    title: "Coaching",
    href: "/coaching",
    icon: Brain,
  },
  {
    title: "Marketplace",
    href: "/marketplace",
    icon: ShoppingCart,
  },
  {
    title: "Formations",
    href: "/formations",
    icon: GraduationCap,
  },
  {
    title: "InnovX Coin",
    href: "/crypto",
    icon: Coins,
  },
  {
    title: "Publicité",
    href: "/publicite",
    icon: Megaphone,
  },
  {
    title: "Affiliation",
    href: "/affiliation",
    icon: Users,
  },
  {
    title: "À propos",
    href: "/apropos",
    icon: Info,
  },
]

// Créer un composant réutilisable pour les éléments du menu des paramètres
// Ajouter ce code après les constantes et avant la fonction Header

const SettingsMenuItems = () => (
  <>
    <UnderConstructionLink className="flex items-center px-3 py-2 text-sm rounded-md hover:bg-gray-100 w-full">
      <User className="mr-2 h-4 w-4" />
      <span>Profil</span>
    </UnderConstructionLink>
    <UnderConstructionLink className="flex items-center px-3 py-2 text-sm rounded-md hover:bg-gray-100 w-full">
      <Shield className="mr-2 h-4 w-4" />
      <span>Sécurité</span>
    </UnderConstructionLink>
    <UnderConstructionLink className="flex items-center px-3 py-2 text-sm rounded-md hover:bg-gray-100 w-full">
      <History className="mr-2 h-4 w-4" />
      <span>Historique</span>
    </UnderConstructionLink>
    <UnderConstructionLink className="flex items-center px-3 py-2 text-sm rounded-md hover:bg-gray-100 w-full">
      <CreditCard className="mr-2 h-4 w-4" />
      <span>Paiements</span>
    </UnderConstructionLink>
    <UnderConstructionLink className="flex items-center px-3 py-2 text-sm rounded-md hover:bg-gray-100 w-full">
      <HelpCircle className="mr-2 h-4 w-4" />
      <span>Aide</span>
    </UnderConstructionLink>
  </>
)

export default function Header() {
  // Ajouter cette ligne après les déclarations d'état
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })
  const navRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const isMobileRef = useRef(false)
  const pathname = usePathname()
  const [showAlert, setShowAlert] = useState(true)

  // Ajouter cette ligne pour injecter les styles
  useEffect(() => {
    // Injecter les styles pour l'animation
    const styleElement = document.createElement("style")
    styleElement.innerHTML = marqueeStyles
    document.head.appendChild(styleElement)

    return () => {
      document.head.removeChild(styleElement)
    }
  }, [])

  // Mettre à jour la taille de la fenêtre
  useEffect(() => {
    // Fonction pour mettre à jour la taille de la fenêtre
    const updateWindowSize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    // Initialiser la taille
    if (typeof window !== "undefined") {
      updateWindowSize()
    }

    // Ajouter l'écouteur d'événement
    window.addEventListener("resize", updateWindowSize)

    // Nettoyer
    return () => window.removeEventListener("resize", updateWindowSize)
  }, [])

  // Vérifier si le menu doit être en mode mobile
  useEffect(() => {
    // Fonction pour vérifier le mode mobile
    const checkMobileMode = () => {
      if (!navRef.current || !headerRef.current) return

      const navContainer = navRef.current
      const headerContainer = headerRef.current

      // Obtenir les dimensions du conteneur
      const headerRect = headerContainer.getBoundingClientRect()

      // Calculer l'espace disponible
      const logoContainer = headerContainer.querySelector(".logo-container")
      const actionsContainer = headerContainer.querySelector(".actions-container")

      const logoWidth = logoContainer ? logoContainer.getBoundingClientRect().width : 0
      const actionsWidth = actionsContainer ? actionsContainer.getBoundingClientRect().width : 0

      // Espace disponible pour la navigation
      const availableWidth = headerRect.width - logoWidth - actionsWidth - 40 // 40px de marge

      // Obtenir tous les éléments de navigation
      const navItems = navContainer.querySelectorAll("a")

      // Calculer la largeur totale des éléments de navigation
      let totalNavWidth = 0
      let hasMultiLineText = false

      navItems.forEach((item) => {
        const itemRect = item.getBoundingClientRect()
        totalNavWidth += itemRect.width + 8 // 8px pour la marge

        // Vérifier si le texte est sur plusieurs lignes
        const computedStyle = window.getComputedStyle(item)
        const lineHeight = Number.parseInt(computedStyle.lineHeight)
        if (itemRect.height > lineHeight * 1.5) {
          hasMultiLineText = true
        }
      })

      // Déterminer si on doit passer en mode mobile
      const shouldBeMobile = hasMultiLineText || totalNavWidth > availableWidth || window.innerWidth < 768

      // Mettre à jour l'état uniquement si nécessaire
      if (isMobileRef.current !== shouldBeMobile) {
        isMobileRef.current = shouldBeMobile
        setIsMobile(shouldBeMobile)
      }
    }

    // Vérifier après un court délai pour s'assurer que tout est rendu
    const timeoutId = setTimeout(checkMobileMode, 100)

    return () => clearTimeout(timeoutId)
  }, [windowSize]) // Dépend uniquement de windowSize

  // Vérifier après le chargement des polices
  useEffect(() => {
    if (typeof document !== "undefined" && document.fonts) {
      document.fonts.ready.then(() => {
        // Utiliser un timeout pour éviter les problèmes de timing
        setTimeout(() => {
          if (navRef.current && headerRef.current) {
            const navContainer = navRef.current
            const headerContainer = headerRef.current

            // Obtenir les dimensions du conteneur
            const headerRect = headerContainer.getBoundingClientRect()

            // Calculer l'espace disponible
            const logoContainer = headerContainer.querySelector(".logo-container")
            const actionsContainer = headerContainer.querySelector(".actions-container")

            const logoWidth = logoContainer ? logoContainer.getBoundingClientRect().width : 0
            const actionsWidth = actionsContainer ? actionsContainer.getBoundingClientRect().width : 0

            // Espace disponible pour la navigation
            const availableWidth = headerRect.width - logoWidth - actionsWidth - 40 // 40px de marge

            // Obtenir tous les éléments de navigation
            const navItems = navContainer.querySelectorAll("a")

            // Calculer la largeur totale des éléments de navigation
            let totalNavWidth = 0
            let hasMultiLineText = false

            navItems.forEach((item) => {
              const itemRect = item.getBoundingClientRect()
              totalNavWidth += itemRect.width + 8 // 8px pour la marge

              // Vérifier si le texte est sur plusieurs lignes
              const computedStyle = window.getComputedStyle(item)
              const lineHeight = Number.parseInt(computedStyle.lineHeight)
              if (itemRect.height > lineHeight * 1.5) {
                hasMultiLineText = true
              }
            })

            // Déterminer si on doit passer en mode mobile
            const shouldBeMobile = hasMultiLineText || totalNavWidth > availableWidth || window.innerWidth < 768

            // Mettre à jour l'état uniquement si nécessaire
            if (isMobileRef.current !== shouldBeMobile) {
              isMobileRef.current = shouldBeMobile
              setIsMobile(shouldBeMobile)
            }
          }
        }, 200)
      })
    }
  }, []) // Exécuter une seule fois au chargement

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  // Fonction pour créer un bouton de menu mobile personnalisé sans outline
  // Remplacer la fonction CustomMobileMenuButton par celle-ci:
  const CustomMobileMenuButton = () => (
    <button
      onClick={() => setIsOpen(true)}
      className="mobile-menu-button h-10 w-10 p-0 flex items-center justify-center bg-transparent border-none outline-none focus:outline-none focus:ring-0 focus:border-none"
      style={{
        outline: "none",
        boxShadow: "none",
        border: "none",
      }}
      aria-label="Menu"
    >
      <Menu className="h-7 w-7 text-foreground" />
    </button>
  )

  // Forcer l'affichage du menu mobile sur les petits écrans
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsMobile(true)
      }
    }

    // Exécuter immédiatement
    handleResize()

    // Ajouter l'écouteur d'événement
    window.addEventListener("resize", handleResize)

    // Nettoyer
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <header
      ref={headerRef}
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled ? "bg-white/90 dark:bg-[#040504]/90 backdrop-blur-md shadow-md" : "bg-white dark:bg-[#040504]"
      }`}
    >
      <div className="w-full px-4 md:px-0 flex h-16 items-center justify-between">
        <div className="flex items-center gap-6 md:gap-0 logo-container">
          <Link href="/" className="flex items-center space-x-1 shadow-none md:ml-4">
            <Image
              src="/images/logo-innovx.png"
              alt="InnovX Logo"
              width={40}
              height={40}
              className="h-10 w-10 rounded-full shadow-none"
            />
            <span className="font-bold text-xl tracking-tight">InnovX</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div ref={navRef} className={`${isMobile ? "hidden" : "flex"} items-center gap-2`}>
          {mainNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`px-3 py-2 text-sm font-medium rounded-md transition-colors hover:bg-yellow-100 hover:text-yellow-800 whitespace-nowrap flex items-center ${
                pathname === item.href ? "text-yellow-800 bg-yellow-100" : "text-muted-foreground"
              }`}
            >
              {item.icon && <item.icon className="h-4 w-4 mr-1" />}
              {item.title}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4 actions-container">
          {/* Bouton Connexion d'abord */}
          <div className={isMobile ? "hidden" : "flex items-center gap-2"}>
            <Button variant="outline" size="sm" asChild className="whitespace-nowrap">
              <Link href="/account" className="flex items-center w-full">
                <LogIn className="mr-1 h-3.5 w-3.5" />
                <span className="text-xs sm:text-sm">Connexion</span>
              </Link>
            </Button>
          </div>

          {/* Puis ThemeToggle - caché en mode mobile */}
          <div className="block">
            <ThemeToggle />
          </div>

          {/* Puis Bouton Paramètres - caché en mode mobile */}
          <div className={isMobile ? "hidden" : "block"}>
            <details className="relative">
              <summary className="flex items-center justify-center w-9 h-9 rounded-full border border-input bg-background hover:bg-accent hover:text-accent-foreground cursor-pointer list-none">
                <Settings className="h-[1.2rem] w-[1.2rem]" />
                <span className="sr-only">Paramètres</span>
              </summary>
              <div className="absolute right-0 z-50 mt-2 w-56 rounded-md border bg-popover p-1 text-popover-foreground shadow-md outline-none">
                <div className="space-y-2 p-2">
                  <UnderConstructionLink className="flex items-center px-3 py-2 text-sm rounded-md hover:bg-gray-100 w-full">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profil</span>
                  </UnderConstructionLink>
                  <UnderConstructionLink className="flex items-center px-3 py-2 text-sm rounded-md hover:bg-gray-100 w-full">
                    <Shield className="mr-2 h-4 w-4" />
                    <span>Sécurité</span>
                  </UnderConstructionLink>
                  <UnderConstructionLink className="flex items-center px-3 py-2 text-sm rounded-md hover:bg-gray-100 w-full">
                    <History className="mr-2 h-4 w-4" />
                    <span>Historique</span>
                  </UnderConstructionLink>
                  <UnderConstructionLink className="flex items-center px-3 py-2 text-sm rounded-md hover:bg-gray-100 w-full">
                    <CreditCard className="mr-2 h-4 w-4" />
                    <span>Paiements</span>
                  </UnderConstructionLink>
                  <UnderConstructionLink className="flex items-center px-3 py-2 text-sm rounded-md hover:bg-gray-100 w-full">
                    <HelpCircle className="mr-2 h-4 w-4" />
                    <span>Aide</span>
                  </UnderConstructionLink>
                </div>
                <div className="border-t my-1"></div>
                <div className="p-2">
                  <UnderConstructionLink className="flex items-center px-3 py-2 text-sm rounded-md hover:bg-gray-100 w-full text-red-600">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Déconnexion</span>
                  </UnderConstructionLink>
                </div>
              </div>
            </details>
          </div>

          {/* Mobile Menu Button reste à la fin */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              {/* Remplacer le bouton par notre composant personnalisé */}
              <div className={isMobile ? "block" : "hidden"}>
                <CustomMobileMenuButton />
              </div>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[85%] sm:w-[350px] p-0 [&_.lucide-x]:text-white [&_.lucide-x]:opacity-0"
              hideCloseButton
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between p-4 border-b">
                  <Link href="/" className="flex items-center gap-1" onClick={() => setIsOpen(false)}>
                    <Image
                      src="/images/logo-innovx.png"
                      alt="InnovX Logo"
                      width={32}
                      height={32}
                      className="h-8 w-8 rounded-full"
                    />
                    <span className="font-bold text-xl">InnovX</span>
                  </Link>
                  {/* Remplacer le bouton de fermeture du menu mobile par une version plus robuste */}
                  <div
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center w-10 h-10 cursor-pointer"
                    style={{
                      position: "relative",
                      zIndex: 9999,
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{
                        minWidth: "24px",
                        minHeight: "24px",
                      }}
                    >
                      <path d="m12 19-7-7 7-7"></path>
                      <path d="M19 12H5"></path>
                    </svg>
                  </div>
                </div>

                <div className="flex-1 overflow-auto py-2">
                  <nav className="flex flex-col">
                    {mainNavItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`px-4 py-3 text-xl font-medium border-l-2 transition-colors flex items-center ${
                          pathname === item.href
                            ? "border-yellow-400 text-yellow-800 font-medium bg-yellow-50"
                            : "border-transparent text-muted-foreground hover:bg-yellow-50 hover:text-yellow-800"
                        }`}
                        onClick={() => setIsOpen(false)}
                      >
                        {item.icon && <item.icon className="h-5 w-5 mr-2" />}
                        {item.title}
                      </Link>
                    ))}
                  </nav>
                </div>

                <div className="p-4 border-t mt-auto">
                  <div className="flex flex-col space-y-4 items-start">
                    <Button
                      variant="outline"
                      asChild
                      className="w-full border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
                    >
                      <Link href="/account" className="flex items-center w-full justify-center">
                        <LogIn className="mr-1 h-3.5 w-3.5" />
                        Connexion
                      </Link>
                    </Button>

                    {/* Bouton Paramètres pour mobile avec menu dépliable */}
                    <div className="w-full">
                      <details className="w-full border rounded-md">
                        <summary className="flex items-center justify-between px-3 py-2 cursor-pointer hover:bg-gray-50">
                          <div className="flex items-center">
                            <Settings className="mr-2 h-4 w-4" />
                            <span className="font-medium">Paramètres</span>
                          </div>
                          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </summary>
                        <div className="px-3 py-2 border-t">
                          <div className="space-y-2">
                            <SettingsMenuItems />
                          </div>
                        </div>
                      </details>
                    </div>

                    <Button
                      variant="default"
                      asChild
                      className="w-full bg-innovx-yellow text-innovx-black hover:bg-yellow-400 border-2 border-innovx-black font-medium"
                    >
                      <UnderConstructionLink className="flex items-center w-full justify-center">
                        Télécharger l'application
                      </UnderConstructionLink>
                    </Button>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      {showAlert && (
        <div className="w-full bg-yellow-300 dark:bg-white py-1 overflow-hidden whitespace-nowrap relative">
          <div className="marquee-container">
            <div className="marquee-content">
              <div className="marquee-item flex items-center text-black">
                <AlertTriangle className="h-5 w-5 mr-2 flex-shrink-0" />
                <p className="font-medium text-base">
                  Attention aux arnaques - N'effectuez aucun paiement en dehors du site officiel www.innovxpro.com et
                  méfiez-vous des contacts non sollicités. InnovX ne vous contactera jamais en premier.
                </p>
              </div>
              <div className="marquee-item flex items-center text-black">
                <AlertTriangle className="h-5 w-5 mr-2 flex-shrink-0" />
                <p className="font-medium text-base">
                  Attention aux arnaques - N'effectuez aucun paiement en dehors du site officiel www.innovxpro.com et
                  méfiez-vous des contacts non sollicités. InnovX ne vous contactera jamais en premier.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
