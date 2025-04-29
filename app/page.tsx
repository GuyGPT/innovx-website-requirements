"use client"

import type React from "react"

import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// Ajouter l'import pour l'icône Search
import { BookOpen, ShoppingBag, Coins, Shield, Gift } from "lucide-react"
import { useState, useRef, useEffect } from "react"
import { useTheme } from "next-themes"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
// Importer le hook useChatBot
import { useChatBot } from "@/components/chat-bot-provider"
import { useRouter } from "next/navigation"
// Ajouter cette importation en haut du fichier, avec les autres importations
import SearchInput from "@/components/search-input"
// Importer le composant UnderConstructionLink en haut du fichier:
import UnderConstructionLink from "@/components/under-construction-link"
// Ajouter l'import pour le composant FeaturedPublications en haut du fichier
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

// Importer le service de recherche
// Supprimer cette ligne
//import { searchSiteContent } from "@/lib/search-service"

// Données de classement pour les services
const serviceRankings = {
  formations: { rating: 4.8, totalRatings: 124, rank: 1 },
  marketplace: { rating: 4.6, totalRatings: 87, rank: 2 },
  crypto: { rating: 4.5, totalRatings: 93, rank: 3 },
}

// Fonction pour afficher les étoiles
const renderStars = (rating) => {
  const stars = []
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 >= 0.5

  // Étoiles pleines
  for (let i = 0; i < fullStars; i++) {
    stars.push(
      <svg
        key={`full-${i}`}
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="text-blue-500"
      >
        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
      </svg>,
    )
  }

  // Demi-étoile si nécessaire
  if (hasHalfStar) {
    stars.push(
      <svg
        key="half"
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="text-blue-500"
      >
        <path
          d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
          opacity="0.5"
        ></path>
        <path d="M12 2v15.27l-6.18 3.73 1.64-7.03L2 9.24l7.19-.61L12 2z"></path>
      </svg>,
    )
  }

  // Étoiles vides
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)
  for (let i = 0; i < emptyStars; i++) {
    stars.push(
      <svg
        key={`empty-${i}`}
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-gray-300"
      >
        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
      </svg>,
    )
  }

  return stars
}

export const UnderConstructionLinkOriginal = ({ children }: { children: React.ReactNode }) => {
  return (
    <Link
      href="/under-construction"
      style={{ textDecoration: "none", color: "inherit", display: "inline-block", width: "100%" }}
    >
      {children}
    </Link>
  )
}

export default function Home() {
  // Ajouter ces états pour la notation
  const [isRatingDialogOpen, setIsRatingDialogOpen] = useState(false)
  const [selectedRating, setSelectedRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [currentService, setCurrentService] = useState("")

  // Ajouter cette fonction pour gérer le clic sur le bouton "Notez"
  const handleRateClick = (service) => {
    setCurrentService(service)
    setIsRatingDialogOpen(true)
  }

  // Ajouter cette fonction pour gérer la soumission de la note
  const handleRatingSubmit = () => {
    console.log(`Service ${currentService} rated with ${selectedRating} stars`)
    setIsRatingDialogOpen(false)
    setSelectedRating(0)
    setHoveredRating(0)
  }

  // Ajouter cet état pour suivre la position de défilement
  const [scrollPosition, setScrollPosition] = useState(0)
  const [scrollWidth, setScrollWidth] = useState(0)
  const tabsCarouselRef = useRef<HTMLDivElement>(null)
  // Ajouter un état pour la valeur de recherche après les autres états
  const { theme } = useTheme()
  // Ajouter cette ligne après les autres déclarations d'état
  const { openChat } = useChatBot()
  // Ajouter ces états et fonctions pour la recherche
  // Ajouter après les autres déclarations d'état, avant les useEffect
  const router = useRouter()
  // Ajouter ces états pour la recherche

  // Ajouter cette fonction pour mettre à jour la position de défilement
  const updateScrollPosition = () => {
    if (tabsCarouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = tabsCarouselRef.current
      const maxScroll = scrollWidth - clientWidth

      // Calculer la position en pourcentage (0-100)
      const position = maxScroll > 0 ? (scrollLeft / maxScroll) * 100 : 0

      setScrollPosition(position)
      setScrollWidth(maxScroll > 0 ? 100 : 0)

      // Mettre à jour l'onglet actif en fonction de la position de défilement
      const tabValues = ["formations", "marketplace", "coaching", "publicite", "crypto", "services"]
      const tabIndex = Math.min(tabValues.length - 1, Math.floor((position / 100) * tabValues.length))
      const currentTab = tabValues[tabIndex]

      // Sélectionner l'onglet correspondant si nécessaire
      const tabsContainer = document.querySelector(".tabs-carousel")
      if (tabsContainer) {
        const activeTab = tabsContainer.querySelector(`[data-state="active"]`)
        const activeTabValue = activeTab?.getAttribute("data-value")

        if (currentTab && activeTabValue !== currentTab) {
          const tabToActivate = tabsContainer.querySelector(`[data-value="${currentTab}"]`)
          if (tabToActivate && tabToActivate.getAttribute("data-state") !== "active") {
            ;(tabToActivate as HTMLElement).click()
          }
        }
      }
    }
  }

  // Ajouter cet effet après les autres useEffect existants
  useEffect(() => {
    updateScrollPosition()
    // Mettre à jour la position lors du redimensionnement de la fenêtre
    window.addEventListener("resize", updateScrollPosition)
    return () => window.removeEventListener("resize", updateScrollPosition)
  }, [])

  // Ajouter cet effet pour s'assurer que la position est mise à jour après le rendu
  useEffect(() => {
    // Petit délai pour s'assurer que le DOM est complètement rendu
    const timer = setTimeout(() => {
      updateScrollPosition()
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  // Ajouter un effet pour mettre à jour la barre d'état lorsque l'onglet change
  useEffect(() => {
    const handleTabChange = () => {
      const activeTab = document.querySelector(`.tabs-carousel [data-state="active"]`)
      if (activeTab) {
        const activeTabValue = activeTab.getAttribute("data-value")
        const activeIndex = ["formations", "marketplace", "crypto", "services"].findIndex((t) => t === activeTabValue)
        if (activeIndex >= 0) {
          // Mettre à jour la position de défilement en fonction de l'onglet actif
          setScrollPosition(activeIndex * 33.33)
        }
      }
    }

    // Observer les changements d'état des onglets
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "data-state") {
          handleTabChange()
        }
      })
    })

    const tabs = document.querySelectorAll(`.tabs-carousel [role="tab"]`)
    tabs.forEach((tab) => {
      observer.observe(tab, { attributes: true })
    })

    // Initialiser l'état
    handleTabChange()

    return () => observer.disconnect()
  }, [])

  // Ajouter un effet pour synchroniser les onglets et la barre de progression
  useEffect(() => {
    const tabsContainer = document.getElementById("tabs-container")
    if (!tabsContainer) return

    // Fonction pour mettre à jour la barre de progression en fonction de l'onglet actif
    const updateProgressBar = () => {
      const activeTab = document.querySelector('.tabs-carousel [data-state="active"]')
      if (!activeTab) return

      const activeTabValue = activeTab.getAttribute("data-value")
      const tabValues = ["formations", "marketplace", "crypto", "services"]
      const activeIndex = tabValues.findIndex((t) => t === activeTabValue)

      if (activeIndex >= 0) {
        // Calculer la position en pourcentage (0-100)
        const position = (activeIndex / (tabValues.length - 1)) * 100
        setScrollPosition(position)
      }
    }

    // Observer les changements d'état des onglets
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "data-state") {
          updateProgressBar()
        }
      })
    })

    // Observer tous les onglets
    const tabs = tabsContainer.querySelectorAll('[role="tab"]')
    tabs.forEach((tab) => {
      observer.observe(tab, { attributes: true })
    })

    // Initialiser l'état
    updateProgressBar()

    return () => observer.disconnect()
  }, [])

  // Ajouter un effet pour synchroniser le voyant jaune avec le défilement
  useEffect(() => {
    const handleScroll = () => {
      if (tabsCarouselRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = tabsCarouselRef.current
        const maxScroll = scrollWidth - clientWidth
        const position = maxScroll > 0 ? (scrollLeft / maxScroll) * 100 : 0
        setScrollPosition(position)
      }
    }

    const tabsCarousel = tabsCarouselRef.current
    if (tabsCarousel) {
      tabsCarousel.addEventListener("scroll", handleScroll)
      return () => tabsCarousel.removeEventListener("scroll", handleScroll)
    }
  }, [])

  // Ajouter un nouvel effet pour synchroniser le bouton poussoir avec le défilement du carrousel

  // Ajouter cet effet après les autres useEffect existants
  useEffect(() => {
    // Fonction pour synchroniser le bouton poussoir avec le défilement du carrousel
    const syncButtonWithCarousel = () => {
      if (tabsCarouselRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = tabsCarouselRef.current
        const maxScroll = scrollWidth - clientWidth

        // Ne mettre à jour que si le défilement est significatif
        if (maxScroll > 0) {
          const scrollPercentage = (scrollLeft / maxScroll) * 100

          // Éviter les boucles infinies en ne mettant à jour que si la différence est significative
          if (Math.abs(scrollPercentage - scrollPosition) > 2) {
            setScrollPosition(scrollPercentage)
          }
        }
      }
    }

    // Observer les changements de défilement du carrousel
    const tabsCarousel = tabsCarouselRef.current
    if (tabsCarousel) {
      // Utiliser un ResizeObserver pour détecter les changements de taille
      const resizeObserver = new ResizeObserver(() => {
        syncButtonWithCarousel()
      })

      resizeObserver.observe(tabsCarousel)

      // Ajouter un écouteur d'événements pour le défilement
      tabsCarousel.addEventListener("scroll", syncButtonWithCarousel)

      return () => {
        resizeObserver.disconnect()
        tabsCarousel.removeEventListener("scroll", syncButtonWithCarousel)
      }
    }
  }, [scrollPosition])

  // Ajouter un effet pour synchroniser le défilement du carrousel avec le bouton poussoir de manière fluide
  useEffect(() => {
    let animationFrameId: number

    // Fonction pour synchroniser le carrousel avec la position du bouton
    const syncCarouselWithButton = () => {
      if (tabsCarouselRef.current) {
        const { scrollWidth, clientWidth } = tabsCarouselRef.current
        const maxScroll = scrollWidth - clientWidth

        // Calculer la position de défilement en fonction de la position du bouton
        const newScrollLeft = (scrollPosition / 100) * maxScroll

        // Vérifier si le défilement est nécessaire (éviter les boucles infinies)
        const currentScrollLeft = tabsCarouselRef.current.scrollLeft

        // Utiliser une animation fluide pour le défilement
        if (Math.abs(currentScrollLeft - newScrollLeft) > 5) {
          // Annuler l'animation précédente si elle existe
          if (animationFrameId) {
            cancelAnimationFrame(animationFrameId)
          }

          // Créer une animation fluide
          const startTime = performance.now()
          const startPosition = currentScrollLeft
          const duration = 300 // ms

          const animateScroll = (timestamp: number) => {
            const elapsed = timestamp - startTime
            const progress = Math.min(elapsed / duration, 1)
            // Fonction d'easing pour un mouvement plus naturel
            const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)

            const currentPosition = startPosition + (newScrollLeft - startPosition) * easeProgress
            tabsCarouselRef.current!.scrollLeft = currentPosition

            if (progress < 1) {
              animationFrameId = requestAnimationFrame(animateScroll)
            }
          }

          animationFrameId = requestAnimationFrame(animateScroll)
        }
      }
    }

    // Appeler la fonction lorsque la position du bouton change
    syncCarouselWithButton()

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
    }
  }, [scrollPosition])

  // Effet pour les animations à l'entrée
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in")
            // Ne pas supprimer la classe après 3 secondes pour conserver l'état final
          }
        })
      },
      { threshold: 0.1 },
    )

    // Observer les éléments avec animation
    const animatedElements = document.querySelectorAll("#cta-section, .animate-title, .animate-fade-up")
    animatedElements.forEach((el) => observer.observe(el))

    return () => {
      animatedElements.forEach((el) => observer.unobserve(el))
    }
  }, [])

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-12 md:py-32 bg-secondary text-secondary-foreground">
        <div className="container flex flex-col md:flex-row items-center gap-8">
          {/* Texte d'accueil - au-dessus en mobile, à gauche en desktop */}
          <div className="w-full md:w-1/2 text-center md:text-left order-1 animate-fade-in-slide">
            <h1 className="text-3xl md:text-6xl font-bold tracking-tight mb-4 md:mb-6">
              Bienvenue sur <span style={{ color: "#F8E061" }}>InnovX</span>
            </h1>
            <p className="text-base md:text-xl max-w-3xl mb-6 md:mb-8">
              Plateforme multifonctionnelle intégrant services, formations, marketplace, publicité et nouvelles
              technologies.
            </p>
          </div>

          {/* Fenêtre vidéo - en dessous en mobile, à droite en desktop */}
          <div className="w-full md:w-1/2 order-2 mt-8 md:mt-0">
            <div className="rounded-lg overflow-hidden shadow-xl aspect-video">
              <video
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2mVID-20241226-WA0008-NyfvunklqyolprfB35vlOyHAvEtKcD.mp4"
                controls
                autoPlay
                muted
                loop
                className="w-full h-full object-cover"
                poster="/placeholder.svg?height=400&width=600"
              >
                Votre navigateur ne prend pas en charge la lecture de vidéos.
              </video>
            </div>
          </div>
        </div>
      </section>
      {/* Ajouter la barre de recherche juste après la section Hero et avant la section Features */}
      {/* Insérer ce code après la fermeture de la section Hero (</section>) et avant la section Features */}
      {/* Search Section */}
      <section className="py-8 bg-background">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-4 text-center">Que recherchez-vous ?</h2>
            <SearchInput
              placeholder="Rechercher tout le contenu du site (textes, sections, boutons, pages...)"
              id="home-search-results"
              className="w-full"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-background">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Nos Services Principaux</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Découvrez notre écosystème complet de services innovants conçus pour répondre à tous vos besoins.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="space-y-1">
                <div className="flex justify-center">
                  <div className="icon-container bg-[#F8E061] dark:bg-[#F8E061] p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer">
                    <BookOpen className="h-6 w-6 text-black" />
                  </div>
                </div>
                <CardTitle className="text-xl text-center">Formations</CardTitle>
                <CardDescription className="text-center">
                  Accédez à des formations de qualité dans divers domaines
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="mb-3">Des formations en ligne dispensées par des experts, accessibles à tout moment.</p>
              </CardContent>
              <CardFooter className="flex justify-center pt-0">
                <Link href="/formations">
                  <button className="bg-[#F8E061] text-black font-medium px-4 py-2 rounded-md hover:bg-[#F8E061]/90 transition-all dark:bg-[#F8E061] dark:text-black dark:border-black">
                    Voir les formations
                  </button>
                </Link>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="space-y-1">
                <div className="flex justify-center">
                  <div className="icon-container bg-[#F8E061] dark:bg-[#F8E061] p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer">
                    <ShoppingBag className="h-6 w-6 text-black" />
                  </div>
                </div>
                <CardTitle className="text-xl text-center">Marketplace</CardTitle>
                <CardDescription className="text-center">
                  Publiez et trouvez des offres de services variés
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="mb-3">
                  Une plateforme où les utilisateurs peuvent échanger des services en toute sécurité.
                </p>
              </CardContent>
              <CardFooter className="flex justify-center pt-0">
                <Link href="/marketplace">
                  <button className="bg-[#F8E061] text-black font-medium px-4 py-2 rounded-md hover:bg-[#F8E061]/90 transition-all dark:bg-[#F8E061] dark:text-black dark:border-black">
                    Explorer
                  </button>
                </Link>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="space-y-1">
                <div className="flex justify-center">
                  <div className="icon-container bg-[#F8E061] dark:bg-[#F8E061] p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer">
                    <Coins className="h-6 w-6 text-black" />
                  </div>
                </div>
                <CardTitle className="text-xl text-center">InnovX Coin</CardTitle>
                <CardDescription className="text-center">
                  Notre crypto-monnaie pour les transactions et récompenses
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="mb-3">
                  Sécurisée par la blockchain, échangeable contre du franc CFA et utilisable sur notre plateforme.
                </p>
              </CardContent>
              <CardFooter className="flex justify-center pt-0">
                <Link href="/crypto">
                  <button className="bg-[#F8E061] text-black font-medium px-4 py-2 rounded-md hover:bg-[#F8E061]/90 transition-all dark:bg-[#F8E061] dark:text-black dark:border-black">
                    En savoir plus
                  </button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* Services Tabs Section - Simplified */}
      <section className="py-16 bg-muted/50">
        <div className="container">
          <div className="flex justify-center">
            <Card className="w-full max-w-3xl bg-[#F8E061] dark:bg-[#F8E061] text-black border-black border-2">
              <CardHeader className="space-y-1">
                <div className="flex justify-center mb-4">
                  <div className="icon-container bg-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer">
                    <Gift className="h-6 w-6 text-black" />
                  </div>
                </div>
                <CardTitle className="text-xl text-center text-black">Explorez Nos Services GRATUITS</CardTitle>
              </CardHeader>
              <CardContent className="text-black">
                <p className="mb-4">
                  INNOVX propose des services gratuits pour faciliter votre quotidien, comme le repérage des pharmacies
                  de garde grâce à notre système de géolocalisation.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center gap-2">
                    <span className="text-black">✓</span> Localisation des pharmacies de garde
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-black">✓</span> Assistance rapide
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-black">✓</span> Conseils professionnels
                  </li>
                </ul>
                <div className="text-center mt-4">
                  <UnderConstructionLink>
                    <button className="bg-white text-black font-medium px-4 py-2 rounded-md hover:bg-gray-100 transition-all dark:bg-white dark:text-black dark:border-black border-2 border-black">
                      Accéder aux services gratuits
                    </button>
                  </UnderConstructionLink>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section className="py-16 pastel-section">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-4 pastel-section-text">Sécurité Renforcée</h2>
              <p className="mb-6 pastel-section-subtext">
                Chez InnovX, la sécurité est notre priorité. Nous utilisons des technologies de pointe pour protéger vos
                données et transactions.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Shield className="h-6 w-6 text-innovx-black dark:text-yellow-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold pastel-section-text">Langages Solides</h3>
                    <p className="text-sm pastel-section-subtext">
                      Utilisation de technologies robustes pour garantir la fiabilité du système.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Shield className="h-6 w-6 text-innovx-black dark:text-yellow-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold pastel-section-text">Blockchain</h3>
                    <p className="text-sm pastel-section-subtext">
                      Sécurisation des transactions et de la crypto-monnaie InnovX Coin.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Shield className="h-6 w-6 text-innovx-black dark:text-yellow-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold pastel-section-text">Intelligence Artificielle</h3>
                    <p className="text-sm pastel-section-subtext">
                      Détection des fraudes et amélioration de l'expérience utilisateur.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="md:w-1/2">
              <Image
                src="/placeholder.svg?height=400&width=500"
                alt="Sécurité InnovX"
                width={500}
                height={400}
                className="rounded-lg object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-muted/5">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Questions Fréquentes</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Trouvez des réponses aux questions les plus courantes concernant InnovX.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              {/* 1. Accueil */}
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-base md:text-lg font-medium">Qu'est-ce qu'InnovX ?</AccordionTrigger>
                <AccordionContent className="text-sm md:text-base">
                  InnovX est une plateforme multifonctionnelle qui intègre des services, des formations, une
                  marketplace, des solutions publicitaires et des technologies blockchain. Notre objectif est de fournir
                  un écosystème complet pour les particuliers et les entreprises.
                </AccordionContent>
              </AccordionItem>

              {/* 2. Services */}
              <AccordionItem value="item-2">
                <AccordionTrigger className="text-base md:text-lg font-medium">
                  Quels types de services sont proposés sur InnovX ?
                </AccordionTrigger>
                <AccordionContent className="text-sm md:text-base">
                  InnovX propose une large gamme de services, allant des services gratuits aux services premium. Nos
                  services incluent des outils de développement personnel, des ressources professionnelles, des
                  solutions technologiques et des services de conseil personnalisés pour répondre à vos besoins
                  spécifiques.
                </AccordionContent>
              </AccordionItem>

              {/* 3. Coaching */}
              <AccordionItem value="item-3">
                <AccordionTrigger className="text-base md:text-lg font-medium">
                  Comment fonctionne le coaching personnalisé ?
                </AccordionTrigger>
                <AccordionContent className="text-sm md:text-base">
                  Notre programme de coaching personnalisé vous met en relation avec des experts dans divers domaines.
                  Après avoir sélectionné un coach, vous pouvez planifier des sessions individuelles, suivre un
                  programme structuré et bénéficier d'un accompagnement sur mesure pour atteindre vos objectifs
                  personnels ou professionnels.
                </AccordionContent>
              </AccordionItem>

              {/* 4. Marketplace */}
              <AccordionItem value="item-4">
                <AccordionTrigger className="text-base md:text-lg font-medium">
                  Comment fonctionne la marketplace ?
                </AccordionTrigger>
                <AccordionContent className="text-sm md:text-base">
                  Notre marketplace permet aux utilisateurs de publier et de trouver des offres de services. Pour vendre
                  vos services, créez un compte, complétez votre profil et publiez votre offre. Pour acheter, parcourez
                  les offres disponibles, contactez le prestataire et effectuez le paiement de manière sécurisée via
                  notre plateforme.
                </AccordionContent>
              </AccordionItem>

              {/* 5. Formations */}
              <AccordionItem value="item-5">
                <AccordionTrigger className="text-base md:text-lg font-medium">
                  Comment puis-je m'inscrire aux formations ?
                </AccordionTrigger>
                <AccordionContent className="text-sm md:text-base">
                  Pour vous inscrire à nos formations, créez d'abord un compte sur InnovX, puis naviguez vers la section
                  "Formations". Vous pourrez y parcourir notre catalogue, sélectionner la formation qui vous intéresse
                  et procéder à l'inscription en quelques clics.
                </AccordionContent>
              </AccordionItem>

              {/* 6. InnovX Coin */}
              <AccordionItem value="item-6">
                <AccordionTrigger className="text-base md:text-lg font-medium">
                  Comment fonctionne la crypto-monnaie InnovX Coin ?
                </AccordionTrigger>
                <AccordionContent className="text-sm md:text-base">
                  InnovX Coin est notre crypto-monnaie propriétaire, sécurisée par la blockchain. Elle peut être
                  utilisée pour effectuer des transactions sur notre plateforme, être échangée contre du franc CFA, et
                  sert également de système de récompense pour les utilisateurs actifs.
                </AccordionContent>
              </AccordionItem>

              {/* 7. Publicité */}
              <AccordionItem value="item-7">
                <AccordionTrigger className="text-base md:text-lg font-medium">
                  Comment promouvoir mon entreprise sur InnovX ?
                </AccordionTrigger>
                <AccordionContent className="text-sm md:text-base">
                  InnovX offre diverses solutions publicitaires pour promouvoir votre entreprise. Vous pouvez créer des
                  campagnes ciblées, placer des bannières sur notre plateforme, sponsoriser du contenu ou utiliser notre
                  service de marketing d'influence. Notre équipe peut vous aider à élaborer une stratégie adaptée à vos
                  objectifs et à votre budget.
                </AccordionContent>
              </AccordionItem>

              {/* 8. Affiliation */}
              <AccordionItem value="item-8">
                <AccordionTrigger className="text-base md:text-lg font-medium">
                  Comment fonctionne le programme d'affiliation ?
                </AccordionTrigger>
                <AccordionContent className="text-sm md:text-base">
                  Notre programme d'affiliation vous permet de gagner des commissions en recommandant InnovX. Après
                  votre inscription au programme, vous recevez un lien d'affiliation unique à partager. Pour chaque
                  personne qui s'inscrit ou effectue un achat via votre lien, vous recevez une commission en InnovX
                  Coin. Plus vous parrainez d'utilisateurs actifs, plus vos gains augmentent.
                </AccordionContent>
              </AccordionItem>

              {/* 9. À propos */}
              <AccordionItem value="item-9">
                <AccordionTrigger className="text-base md:text-lg font-medium">
                  Comment contacter le support client ?
                </AccordionTrigger>
                <AccordionContent className="text-sm md:text-base">
                  Vous pouvez contacter notre équipe de support via le formulaire de contact sur notre site, par email à
                  support@innovx.com, ou par téléphone au (00226) 01073107 / 65539734. Nous sommes disponibles du lundi
                  au vendredi, de 8h à 18h.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-8 md:py-10 bg-background dark:bg-[#040504]" id="cta-section">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2
              className="text-3xl font-bold mb-4 opacity-0 transform translate-y-4 transition-all duration-500 ease-out"
              ref={(el) => {
                if (el) {
                  const observer = new IntersectionObserver(
                    ([entry]) => {
                      if (entry.isIntersecting) {
                        el.classList.add("opacity-100", "translate-y-0")
                      } else {
                        el.classList.remove("opacity-100", "translate-y-0")
                      }
                    },
                    { threshold: 0.1, rootMargin: "-100px 0px" },
                  )
                  observer.observe(el)
                  return () => observer.disconnect()
                }
              }}
            >
              Prêt à rejoindre InnovX ?
            </h2>
            <p
              className="text-lg mb-8 opacity-0 transform translate-y-4 transition-all duration-500 ease-out delay-150"
              ref={(el) => {
                if (el) {
                  const observer = new IntersectionObserver(
                    ([entry]) => {
                      if (entry.isIntersecting) {
                        el.classList.add("opacity-100", "translate-y-0")
                      } else {
                        el.classList.remove("opacity-100", "translate-y-0")
                      }
                    },
                    { threshold: 0.1, rootMargin: "-100px 0px" },
                  )
                  observer.observe(el)
                  return () => observer.disconnect()
                }
              }}
            >
              Créez votre compte dès maintenant et découvrez tous les avantages de notre plateforme multifonctionnelle.
            </p>
            <div
              className="flex flex-col sm:flex-row gap-4 justify-center opacity-0 transform translate-y-4 transition-all duration-500 ease-out delay-250"
              ref={(el) => {
                if (el) {
                  const observer = new IntersectionObserver(
                    ([entry]) => {
                      if (entry.isIntersecting) {
                        el.classList.add("opacity-100", "translate-y-0")
                      } else {
                        el.classList.remove("opacity-100", "translate-y-0")
                      }
                    },
                    { threshold: 0.1, rootMargin: "-100px 0px" },
                  )
                  observer.observe(el)
                  return () => observer.disconnect()
                }
              }}
            >
              <UnderConstructionLink>
                <button
                  style={{
                    backgroundColor: "#F8E061",
                    color: "black",
                    padding: window.innerWidth < 640 ? "0.75rem 1rem" : "1.25rem 1.75rem",
                    borderRadius: "1rem",
                    fontWeight: "bold",
                    fontSize: window.innerWidth < 640 ? "0.875rem" : "1rem",
                    border: "2px solid black",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                    transition: "all 0.3s ease",
                    border: "2px solid black",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                    transition: "all 0.3s ease",
                    cursor: "pointer",
                    display: "inline-block",
                    textAlign: "center",
                    width: "100%",
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.boxShadow = "0 6px 8px rgba(0, 0, 0, 0.15)"
                    e.currentTarget.style.transform = "translateY(-2px)"
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)"
                    e.currentTarget.style.transform = "translateY(0)"
                  }}
                >
                  Créer un compte
                </button>
              </UnderConstructionLink>
              <button
                onClick={openChat}
                style={{
                  backgroundColor: "#F8E061",
                  color: "black",
                  padding: window.innerWidth < 640 ? "0.75rem 1rem" : "1.25rem 1.75rem",
                  borderRadius: "1rem",
                  fontWeight: "bold",
                  fontSize: window.innerWidth < 640 ? "0.875rem" : "1rem",
                  border: "2px solid black",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                  display: "inline-block",
                  textAlign: "center",
                  width: "100%",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.boxShadow = "0 6px 8px rgba(0, 0, 0, 0.15)"
                  e.currentTarget.style.transform = "translateY(-2px)"
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)"
                  e.currentTarget.style.transform = "translateY(0)"
                }}
              >
                Nous contacter
              </button>
            </div>
          </div>
        </div>
      </section>
      {/* Ajouter cette boîte de dialogue à la fin du composant, juste avant la fermeture de la div principale */}
      <Dialog open={isRatingDialogOpen} onOpenChange={setIsRatingDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Noter ce service</DialogTitle>
            <DialogDescription>
              Donnez votre avis sur{" "}
              {currentService === "formations"
                ? "nos formations"
                : currentService === "marketplace"
                  ? "notre marketplace"
                  : "InnovX Coin"}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="flex justify-center mb-4">
              {[1, 2, 3, 4, 5].map((rating) => (
                <div
                  key={rating}
                  className="cursor-pointer p-1"
                  onClick={() => setSelectedRating(rating)}
                  onMouseEnter={() => setHoveredRating(rating)}
                  onMouseLeave={() => setHoveredRating(0)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill={rating <= (hoveredRating || selectedRating) ? "currentColor" : "none"}
                    stroke="currentColor"
                    strokeWidth="2"
                    className={rating <= (hoveredRating || selectedRating) ? "text-blue-500" : "text-gray-300"}
                  >
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
                  </svg>
                </div>
              ))}
            </div>
            <p className="text-center font-medium">
              {selectedRating > 0 ? `Votre note : ${selectedRating}/5` : "Sélectionnez une note"}
            </p>
          </div>
          <DialogFooter>
            <button
              className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100"
              onClick={() => setIsRatingDialogOpen(false)}
            >
              Annuler
            </button>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
              onClick={handleRatingSubmit}
              disabled={selectedRating === 0}
            >
              Soumettre
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
