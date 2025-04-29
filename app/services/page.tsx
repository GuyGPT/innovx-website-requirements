"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useState, useEffect } from "react"
// Ajouter l'import pour useTheme
import { useTheme } from "next-themes"
import { Shield } from "lucide-react"
import SearchInput from "@/components/search-input"

export default function ServicesPage() {
  // État pour le carrousel
  const [currentSlide, setCurrentSlide] = useState(0)

  // État pour suivre si l'écran est en mode mobile
  const [isMobile, setIsMobile] = useState(false)

  // Dans la fonction du composant, ajouter cette ligne après les autres déclarations d'état
  const { theme } = useTheme()

  // Images du carrousel pour les services premium
  const premiumServices = [
    {
      title: "Pack Basique",
      description: "Accès prioritaire à l'assistance et 5 consultations d'experts par mois",
      price: "10,000 FCFA",
      image: "/placeholder.svg?height=400&width=600",
      link: "/register",
    },
    {
      title: "Pack Pro",
      description: "15 consultations d'experts et accès aux événements exclusifs",
      price: "25,000 FCFA",
      image: "/placeholder.svg?height=400&width=600",
      link: "/register",
    },
    {
      title: "Pack Entreprise",
      description: "Consultations illimitées et gestionnaire de compte dédié",
      price: "50,000 FCFA",
      image: "/placeholder.svg?height=400&width=600",
      link: "/contact",
    },
  ]

  // Fonction pour passer à la diapositive suivante
  const nextSlide = () => {
    const totalSlides = isMobile ? premiumServices.length : Math.ceil(premiumServices.length / 2)
    setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1))
  }

  // Fonction pour passer à la diapositive précédente
  const prevSlide = () => {
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768
    const totalSlides = isMobile ? premiumServices.length : Math.ceil(premiumServices.length / 2)
    setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1))
  }

  // Variables pour gérer le swipe sur mobile
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)

  // Fonctions pour gérer le swipe
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) {
      // Swipe gauche
      nextSlide()
    }

    if (touchEnd - touchStart > 75) {
      // Swipe droit
      prevSlide()
    }
  }

  // Rotation automatique des diapositives
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  // Détecter la taille de l'écran
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // Vérifier au chargement
    checkMobile()

    // Vérifier au redimensionnement
    window.addEventListener("resize", checkMobile)

    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Effet d'animation à l'entrée
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Ajouter les classes d'animation
            const animatedElements = entry.target.querySelectorAll(".animate-title, .animate-fade-up")
            animatedElements.forEach((el) => {
              el.classList.add("animate-in")
            })

            // Supprimer l'animation après 3 secondes
            setTimeout(() => {
              animatedElements.forEach((el) => {
                el.classList.remove("animate-in")
              })
            }, 3000)

            // Arrêter d'observer une fois animé
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 },
    )

    // Observer toutes les sections avec des animations
    const sections = document.querySelectorAll("section")
    sections.forEach((section) => {
      observer.observe(section)
    })

    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <div className="flex flex-col min-h-screen">
      {/* Search and Filter Section */}
      <section className="py-8 bg-muted/30">
        <div className="container">
          <div className="flex justify-center">
            <div className="w-full max-w-md">
              <SearchInput placeholder="Rechercher un service..." id="services-search-results" className="w-full" />
            </div>
          </div>
        </div>
      </section>
      {/* Hero Section with Tabs */}
      <section className="py-8 bg-muted/10">
        <div className="container">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-2">Services InnovX</h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Découvrez nos services gratuits et premium conçus pour faciliter votre quotidien et répondre à vos besoins
              professionnels.
            </p>
          </div>
          <div className="flex flex-col items-center mt-6">
            <p className="text-sm text-muted-foreground mb-2 animate-bounce">
              Cliquez pour basculer entre les services
            </p>
            <div className="inline-flex rounded-md shadow-sm relative mt-4" role="group">
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-yellow-600"
                >
                  <path d="M12 5v14"></path>
                  <path d="M19 12l-7 7-7-7"></path>
                </svg>
              </div>
              <button
                type="button"
                id="tab-innovx"
                className="px-5 py-2.5 text-sm font-medium bg-yellow-100 text-yellow-800 rounded-l-lg border border-yellow-300 hover:bg-yellow-200 focus:z-10 focus:ring-2 focus:ring-yellow-400 transition-all duration-200 hover:shadow-md"
                onClick={() => {
                  document.getElementById("services-innovx")?.classList.remove("hidden")
                  document.getElementById("services-gratuits")?.classList.add("hidden")
                  document.getElementById("tab-innovx")?.classList.add("bg-yellow-100", "text-yellow-800")
                  document.getElementById("tab-gratuits")?.classList.remove("bg-yellow-100", "text-yellow-800")
                }}
              >
                Services InnovX
              </button>
              <button
                type="button"
                id="tab-gratuits"
                className="px-5 py-2.5 text-sm font-medium rounded-r-lg border border-yellow-300 hover:bg-yellow-200 focus:z-10 focus:ring-2 focus:ring-yellow-400 transition-all duration-200 hover:shadow-md"
                onClick={() => {
                  document.getElementById("services-innovx")?.classList.add("hidden")
                  document.getElementById("services-gratuits")?.classList.remove("hidden")
                  document.getElementById("tab-innovx")?.classList.remove("bg-yellow-100", "text-yellow-800")
                  document.getElementById("tab-gratuits")?.classList.add("bg-yellow-100", "text-yellow-800")
                }}
              >
                Consultance
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Services InnovX Content */}
      <div id="services-innovx" className="py-16">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Services Professionnels</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Découvrez notre gamme complète de services professionnels pour répondre à tous vos besoins.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Service Technique */}
            <Card className="overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl border-t-4 border-t-yellow-400 dark:border-t-yellow-400 dark:bg-black dark:shadow-yellow-400/10 dark:border-yellow-400/50">
              <CardHeader className="bg-gradient-to-br from-yellow-50 to-white dark:from-black dark:to-black dark:text-yellow-400">
                <CardTitle>Service Technique</CardTitle>
                <CardDescription>
                  Solutions complètes pour l'entretien et la maintenance de vos équipements
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-innovx-yellow"></div>
                    <Link href="/services/maintenance/packs" className="hover:text-yellow-800">
                      Packs de Maintenance
                    </Link>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-innovx-yellow"></div>
                    <Link href="/services/maintenance/electrique" className="hover:text-yellow-800">
                      Maintenance Électrique
                    </Link>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-innovx-yellow"></div>
                    <Link href="/services/maintenance/climatisation" className="hover:text-yellow-800">
                      Maintenance Froid et Climatisation
                    </Link>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-innovx-yellow"></div>
                    <Link href="/services/energie/solutions" className="hover:text-yellow-800">
                      Solutions Énergétiques
                    </Link>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-innovx-yellow"></div>
                    <Link href="/services/energie/suivi" className="hover:text-yellow-800">
                      Suivi Technique
                    </Link>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Services Numériques */}
            <Card className="overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl border-t-4 border-t-yellow-400 dark:border-t-yellow-400 dark:bg-black dark:shadow-yellow-400/10 dark:border-yellow-400/50">
              <CardHeader className="bg-gradient-to-br from-yellow-50 to-white dark:from-black dark:to-black dark:text-yellow-400">
                <CardTitle>Services Numériques</CardTitle>
                <CardDescription>Solutions digitales pour optimiser votre présence en ligne</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-innovx-yellow"></div>
                    <Link href="/services/numeriques/web" className="hover:text-yellow-800">
                      Développement Web
                    </Link>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-innovx-yellow"></div>
                    <Link href="/services/numeriques/bureautique" className="hover:text-yellow-800">
                      Maintenance en bureautique
                    </Link>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-innovx-yellow"></div>
                    <Link href="/services/numeriques/transformation" className="hover:text-yellow-800">
                      Transformation Digitale
                    </Link>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Service commercial */}
            <Card className="overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl border-t-4 border-t-yellow-400 dark:border-t-yellow-400 dark:bg-black dark:shadow-yellow-400/10 dark:border-yellow-400/50">
              <CardHeader className="bg-gradient-to-br from-yellow-50 to-white dark:from-black dark:to-black dark:text-yellow-400">
                <CardTitle>Service commercial</CardTitle>
                <CardDescription>Solutions pour optimiser vos opérations commerciales</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-innovx-yellow"></div>
                    <Link href="/services/affaires/secretariat" className="hover:text-yellow-800">
                      Secrétariat Public
                    </Link>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-innovx-yellow"></div>
                    <Link href="/services/affaires/librairie" className="hover:text-yellow-800">
                      Librairie et Consommables
                    </Link>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Services Gratuits Content (Consultance) */}
      <div id="services-gratuits" className="hidden">
        <section className="py-16">
          <div className="container">
            {/* Hero Section avec animation */}
            <div className="mb-12 text-center relative overflow-hidden rounded-xl bg-gradient-to-r from-yellow-50 to-yellow-100 dark:from-black dark:to-black dark:border dark:border-yellow-500/30 p-8 shadow-lg dark:shadow-yellow-500/10">
              <div className="absolute top-0 left-0 w-full h-full bg-[url('/placeholder.svg?height=400&width=1200')] opacity-10 bg-cover bg-center"></div>
              <h1 className="text-5xl font-bold tracking-tight mb-4 relative z-10">Consultance InnovX</h1>
              <p className="mt-4 text-xl text-muted-foreground max-w-2xl mx-auto relative z-10 dark:text-white">
                Des services de consultance professionnels pour optimiser vos opérations industrielles et transformer
                vos défis en opportunités.
              </p>
              <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-24 h-3 bg-yellow-400 rounded-t-full"></div>
            </div>

            {/* Services Cards avec icônes et hover effects */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-16">
              <Card className="overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl border-t-4 border-t-yellow-400 dark:border-t-yellow-400 dark:bg-black dark:shadow-yellow-400/10 dark:border-yellow-400/50">
                <CardHeader className="bg-gradient-to-br from-yellow-50 to-white dark:from-black dark:to-black dark:text-yellow-400">
                  <div className="w-12 h-12 rounded-full bg-yellow-100 dark:bg-black dark:border dark:border-yellow-400 flex items-center justify-center mb-4 shadow-inner dark:shadow-yellow-400/10">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-yellow-600 dark:text-yellow-400"
                    >
                      <path d="M2 12a5 5 0 0 0 5 5 8 8 0 0 1 5 2 8 8 0 0 1 5-2 5 5 0 0 0 5-5V7H2Z"></path>
                      <path d="M6 11v.01"></path>
                      <path d="M10 11v.01"></path>
                      <path d="M14 11v.01"></path>
                      <path d="M18 11v.01"></path>
                    </svg>
                  </div>
                  <CardTitle className="dark:text-white">Diagnostic approfondi de vos systèmes</CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <p className="text-muted-foreground dark:text-white/70">
                    Nous analysons minutieusement vos installations pour identifier les points d'amélioration, assurant
                    ainsi une performance optimale de vos équipements et systèmes.
                  </p>
                  <ul className="mt-4 space-y-2">
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-yellow-400"></div>
                      <span className="text-sm dark:text-white">Analyse complète des infrastructures</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-yellow-400"></div>
                      <span className="text-sm dark:text-white">Identification des goulots d'étranglement</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-yellow-400"></div>
                      <span className="text-sm dark:text-white">Rapport détaillé et recommandations</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl border-t-4 border-t-yellow-400 dark:border-t-yellow-400 dark:bg-black dark:shadow-yellow-400/10 dark:border-yellow-400/50">
                <CardHeader className="bg-gradient-to-br from-yellow-50 to-white dark:from-black dark:to-black dark:text-yellow-400">
                  <div className="w-12 h-12 rounded-full bg-yellow-100 dark:bg-black dark:border dark:border-yellow-400 flex items-center justify-center mb-4 shadow-inner dark:shadow-yellow-400/10">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-yellow-600 dark:text-yellow-400"
                    >
                      <path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z"></path>
                      <path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"></path>
                      <path d="M12 2v2"></path>
                      <path d="M12 22v-2"></path>
                      <path d="m17 20.66-1-1.73"></path>
                      <path d="M11 10.27 7 3.34"></path>
                      <path d="m20.66 17-1.73-1"></path>
                      <path d="m3.34 7 1.73 1"></path>
                      <path d="M14 12h8"></path>
                      <path d="M2 12h2"></path>
                      <path d="m20.66 7-1.73 1"></path>
                      <path d="m3.34 17 1.73-1"></path>
                      <path d="m17 3.34-1 1.73"></path>
                      <path d="m7 20.66-1-1.73"></path>
                    </svg>
                  </div>
                  <CardTitle className="dark:text-white">Stratégies de maintenance sur mesure</CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <p className="text-muted-foreground dark:text-white/70">
                    Nous développons des plans de maintenance préventive et corrective adaptés à vos besoins
                    spécifiques, réduisant les temps d'arrêt et augmentant la durée de vie de vos équipements.
                  </p>
                  <ul className="mt-4 space-y-2">
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-yellow-400"></div>
                      <span className="text-sm dark:text-white">Planification préventive personnalisée</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-yellow-400"></div>
                      <span className="text-sm dark:text-white">Optimisation des cycles de maintenance</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-yellow-400"></div>
                      <span className="text-sm dark:text-white">Réduction des coûts opérationnels</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl border-t-4 border-t-yellow-400 dark:border-t-yellow-400 dark:bg-black dark:shadow-yellow-400/10 dark:border-yellow-400/50">
                <CardHeader className="bg-gradient-to-br from-yellow-50 to-white dark:from-black dark:to-black dark:text-yellow-400">
                  <div className="w-12 h-12 rounded-full bg-yellow-100 dark:bg-black dark:border dark:border-yellow-400 flex items-center justify-center mb-4 shadow-inner dark:shadow-yellow-400/10">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-yellow-600 dark:text-yellow-400"
                    >
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                      <circle cx="9" cy="7" r="4"></circle>
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                  </div>
                  <CardTitle className="dark:text-white">Formation et accompagnement</CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <p className="text-muted-foreground dark:text-white/70">
                    Nous renforçons les compétences de votre personnel en leur fournissant les outils et les
                    connaissances nécessaires pour maintenir des standards élevés de performance.
                  </p>
                  <ul className="mt-4 space-y-2">
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-yellow-400"></div>
                      <span className="text-sm dark:text-white">Ateliers pratiques personnalisés</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-yellow-400"></div>
                      <span className="text-sm dark:text-white">Documentation technique adaptée</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-yellow-400"></div>
                      <span className="text-sm dark:text-white">Suivi et évaluation continue</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl border-t-4 border-t-yellow-400 dark:border-t-yellow-400 dark:bg-black dark:shadow-yellow-400/10 dark:border-yellow-400/50">
                <CardHeader className="bg-gradient-to-br from-yellow-50 to-white dark:from-black dark:to-black dark:text-yellow-400">
                  <div className="w-12 h-12 rounded-full bg-yellow-100 dark:bg-black dark:border dark:border-yellow-400 flex items-center justify-center mb-4 shadow-inner dark:shadow-yellow-400/10">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-yellow-600 dark:text-yellow-400"
                    >
                      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"></path>
                      <path d="M5 3v4"></path>
                      <path d="M19 17v4"></path>
                      <path d="M3 5h4"></path>
                      <path d="M17 19h4"></path>
                    </svg>
                  </div>
                  <CardTitle className="dark:text-white">Intégration de technologies innovantes</CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <p className="text-muted-foreground dark:text-white/70">
                    Nous vous aidons à adopter des solutions technologiques avancées pour améliorer l'efficacité et la
                    fiabilité de vos opérations industrielles et commerciales.
                  </p>
                  <ul className="mt-4 space-y-2">
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-yellow-400"></div>
                      <span className="text-sm dark:text-white">Solutions IoT industrielles</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-yellow-400"></div>
                      <span className="text-sm dark:text-white">Automatisation des processus</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-yellow-400"></div>
                      <span className="text-sm dark:text-white">Analyse de données en temps réel</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Contenu principal avec mise en page améliorée */}
            <div className="max-w-4xl mx-auto">
              <div className="bg-white dark:bg-black dark:border dark:border-yellow-400/20 rounded-xl p-8 shadow-lg dark:shadow-yellow-400/5 mb-12 relative overflow-hidden backdrop-blur-sm">
                <div className="absolute top-0 right-0 w-40 h-40 bg-yellow-100 dark:bg-yellow-400/10 rounded-full -mr-20 -mt-20 z-0"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-yellow-100 dark:bg-yellow-400/10 rounded-full -ml-12 -mb-12 z-0"></div>

                <div className="relative z-10">
                  <h2 className="text-2xl font-bold mb-6 text-center dark:text-white">Notre Approche</h2>

                  <div className="flex flex-col md:flex-row gap-8 items-center mb-8">
                    <div className="md:w-1/3 flex justify-center">
                      <div className="w-40 h-40 rounded-full bg-yellow-100 dark:bg-black dark:border dark:border-yellow-400/30 flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="64"
                          height="64"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-yellow-600 dark:text-yellow-400"
                        >
                          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"></path>
                          <path d="m9 12 2 2 4-4"></path>
                        </svg>
                      </div>
                    </div>
                    <div className="md:w-2/3">
                      <p className="text-lg dark:text-white">
                        Chez InnovX SARL, nous comprenons que dans le secteur industriel, chaque minute compte et que
                        l'efficacité opérationnelle est essentielle. Notre équipe d'experts s'engage à transformer vos
                        défis techniques en opportunités de croissance grâce à une approche méthodique et personnalisée.
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row gap-8 items-center">
                    <div className="md:w-2/3 order-2 md:order-1">
                      <p className="text-lg dark:text-white">
                        Collaborer avec InnovX SARL, c'est choisir un partenaire dédié à l'excellence opérationnelle et
                        à l'innovation. Notre approche personnalisée garantit des solutions adaptées à vos défis
                        uniques, vous permettant de vous concentrer sur votre cœur de métier tout en assurant une
                        performance industrielle optimale.
                      </p>
                    </div>
                    <div className="md:w-1/3 flex justify-center order-1 md:order-2">
                      <div className="w-40 h-40 rounded-full bg-yellow-100 dark:bg-black dark:border dark:border-yellow-400/30 flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="64"
                          height="64"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-yellow-600 dark:text-yellow-400"
                        >
                          <path d="M16 16v-4a4 4 0 0 0-8 0v4"></path>
                          <path d="M12 12v4"></path>
                          <path d="M8 16h8"></path>
                          <path d="M3 5a9 9 0 0 1 18 0"></path>
                          <path d="M3 19a9 9 0 0 0 18 0"></path>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Témoignages */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-6 text-center dark:text-white">Ce que disent nos clients</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-yellow-50 dark:bg-black dark:border dark:border-yellow-400/30 p-6 rounded-lg shadow-md dark:shadow-yellow-400/10">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 rounded-full bg-yellow-200 dark:bg-black dark:border dark:border-yellow-400 flex items-center justify-center mr-4">
                        <span className="font-bold text-yellow-800 dark:text-yellow-400">SM</span>
                      </div>
                      <div>
                        <h3 className="font-bold dark:text-white">Société Minière du Katanga</h3>
                        <p className="text-sm text-muted-foreground dark:text-white/70">Client depuis 2021</p>
                      </div>
                    </div>
                    <p className="italic dark:text-white">
                      "L'équipe d'InnovX a transformé notre approche de la maintenance industrielle. Leur diagnostic
                      approfondi nous a permis de réduire nos temps d'arrêt de 35% en seulement six mois."
                    </p>
                  </div>

                  <div className="bg-yellow-50 dark:bg-black dark:border dark:border-yellow-400/30 p-6 rounded-lg shadow-md dark:shadow-yellow-400/10">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 rounded-full bg-yellow-200 dark:bg-black dark:border dark:border-yellow-400 flex items-center justify-center mr-4">
                        <span className="font-bold text-yellow-800 dark:text-yellow-400">TI</span>
                      </div>
                      <div>
                        <h3 className="font-bold dark:text-white">Textiles Industriels SA</h3>
                        <p className="text-sm text-muted-foreground dark:text-white/70">Client depuis 2022</p>
                      </div>
                    </div>
                    <p className="italic dark:text-white">
                      "La formation dispensée par les consultants d'InnovX a considérablement amélioré les compétences
                      de notre équipe technique. Nous sommes maintenant autonomes pour gérer 90% des problèmes
                      courants."
                    </p>
                  </div>
                </div>
              </div>

              {/* CTA amélioré */}
              <div className="bg-gradient-to-r from-yellow-400 to-yellow-300 dark:from-yellow-400 dark:to-yellow-500 dark:border dark:border-yellow-400 rounded-xl p-8 shadow-lg dark:shadow-yellow-400/20 text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 opacity-20">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="180"
                    height="180"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-black dark:text-black"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"></path>
                  </svg>
                </div>

                <h2 className="text-3xl font-bold mb-4 text-black">Prêt à transformer vos défis en opportunités?</h2>
                <p className="text-lg mb-8 text-black max-w-2xl mx-auto">
                  Ne laissez pas les problèmes techniques freiner votre croissance. Découvrez comment nos services de
                  consultance peuvent propulser votre entreprise vers de nouveaux sommets.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                  <Link href="/contact">
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
                  </Link>
                  <Link href="/faq">
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
                      FAQ
                    </button>
                  </Link>
                </div>

                <p className="mt-8 font-semibold text-black">Ensemble, transformons vos défis en succès durables.</p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Carrousel Services Premium */}
      <section className="py-16 bg-muted/5">
        <div className="container px-4 md:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Services Premium</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Découvrez nos services premium pour bénéficier d'avantages exclusifs et d'une assistance personnalisée.
            </p>
          </div>

          <div className="relative max-w-5xl mx-auto px-4 md:px-16">
            {/* Carrousel */}
            <div className="overflow-hidden rounded-lg">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * (isMobile ? 100 : 50)}%)` }}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                {premiumServices.map((service, index) => (
                  <div key={index} className="w-full md:w-1/2 flex-shrink-0 p-2 md:p-3">
                    <div className="relative aspect-square overflow-hidden rounded-lg shadow-md">
                      <Image
                        src={service.image || "/placeholder.svg"}
                        alt={service.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-4 text-white">
                        <h3 className="text-xl font-bold">{service.title}</h3>
                        <p className="text-sm font-semibold text-yellow-300">{service.price}/mois</p>
                        <p className="text-sm mb-3 line-clamp-2">{service.description}</p>
                        <Button asChild size="sm" className="w-full bg-yellow-500 hover:bg-yellow-600 text-black">
                          <Link href={service.link}>
                            {service.link === "/register" ? "S'abonner" : "Nous contacter"}
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contrôles du carrousel */}
            <button
              onClick={prevSlide}
              className="absolute -left-4 md:-left-12 top-1/2 -translate-y-1/2 bg-yellow-500 hover:bg-yellow-600 text-black p-2 md:p-3 rounded-full z-10 shadow-md"
              aria-label="Précédent"
            >
              <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute -right-4 md:-right-12 top-1/2 -translate-y-1/2 bg-yellow-500 hover:bg-yellow-600 text-black p-2 md:p-3 rounded-full z-10 shadow-md"
              aria-label="Suivant"
            >
              <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
            </button>

            {/* Indicateurs */}
            <div className="flex justify-center mt-4 gap-2">
              {Array.from({ length: isMobile ? premiumServices.length : Math.ceil(premiumServices.length / 2) }).map(
                (_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full ${currentSlide === index ? "bg-yellow-500" : "bg-gray-300"}`}
                    aria-label={`Aller à la diapositive ${index + 1}`}
                  />
                ),
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-8 md:py-10 bg-background dark:bg-[#040504]" id="cta-section">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2
              className="text-3xl font-bold mb-4 opacity-0 transform translate-y-4 transition-all duration-1000 ease-out"
              ref={(el) => {
                if (el) {
                  const observer = new IntersectionObserver(
                    ([entry]) => {
                      // Si l'élément entre dans le viewport
                      if (entry.isIntersecting) {
                        el.classList.add("opacity-100", "translate-y-0")
                      } else {
                        // Si l'élément sort du viewport, réinitialiser pour la prochaine animation
                        el.classList.remove("opacity-100", "translate-y-0")
                      }
                    },
                    { threshold: 0.1, rootMargin: "-100px 0px" },
                  )
                  observer.observe(el)

                  // Nettoyer l'observer lors du démontage du composant
                  return () => observer.disconnect()
                }
              }}
            >
              Besoin d'assistance ?
            </h2>
            <p
              className="text-lg mb-8 opacity-0 transform translate-y-4 transition-all duration-1000 ease-out delay-300"
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
              Notre équipe est disponible pour répondre à vos questions et vous aider à trouver les solutions adaptées à
              vos besoins.
            </p>
            <div
              className="flex flex-col sm:flex-row gap-4 justify-center opacity-0 transform translate-y-4 transition-all duration-1000 ease-out delay-500"
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
              <Link href="/contact">
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
              </Link>
              <Link href="/faq">
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
                  FAQ
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      {/* Correction dans la section Security pour les icônes Shield */}
      <section className="py-12 bg-muted/5">
        <div className="container">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Sécurité Avancée</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Nous utilisons les dernières technologies pour assurer la sécurité de vos données et de vos transactions.
            </p>
          </div>
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
      </section>
    </div>
  )
}
