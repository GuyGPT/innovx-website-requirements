"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react"
// Ajouter l'import pour useTheme
import { useTheme } from "next-themes"
import SearchInput from "@/components/search-input"
import { Star } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

// Modifier les données mockées pour inclure les notes et les rangs
const formations = [
  {
    id: 1,
    title: "Formation en Trading",
    description: "Apprenez les bases du trading et développez vos compétences d'investissement.",
    price: "200 InnovX",
    category: "finance",
    rating: 4.8,
    totalRatings: 124,
    rank: 1,
  },
  {
    id: 2,
    title: "Développement Web",
    description: "Maîtrisez les langages de programmation web et créez vos propres sites.",
    price: "180 InnovX",
    category: "tech",
    rating: 4.6,
    totalRatings: 98,
    rank: 2,
  },
  {
    id: 3,
    title: "Design Graphique",
    category: "design",
    level: "Débutant",
    duration: "25 heures",
    price: "50000 FCFA",
    instructor: "M. Ouédraogo Paul",
    image: "/placeholder.svg?height=200&width=300",
    description: "Initiez-vous aux principes fondamentaux du design graphique et aux outils professionnels.",
    rating: 3.5,
    totalRatings: 50,
    rank: 3,
  },
  {
    id: 4,
    title: "Intelligence Artificielle",
    category: "programmation",
    level: "Avancé",
    duration: "45 heures",
    price: "85000 FCFA",
    instructor: "Prof. Diallo Ibrahim",
    image: "/placeholder.svg?height=200&width=300",
    description: "Découvrez les concepts et applications de l'IA et du machine learning.",
    rating: 4.2,
    totalRatings: 75,
    rank: 4,
  },
  {
    id: 5,
    title: "Gestion de Projet",
    category: "business",
    level: "Intermédiaire",
    duration: "35 heures",
    price: "65000 FCFA",
    instructor: "Mme. Sawadogo Aïcha",
    image: "/placeholder.svg?height=200&width=300",
    description: "Apprenez les méthodologies et outils pour gérer efficacement des projets complexes.",
    rating: 4.9,
    totalRatings: 150,
    rank: 5,
  },
  {
    id: 6,
    title: "UX/UI Design",
    category: "design",
    level: "Intermédiaire",
    duration: "30 heures",
    price: "60000 FCFA",
    instructor: "M. Kaboré Jean",
    image: "/placeholder.svg?height=200&width=300",
    description: "Créez des interfaces utilisateur intuitives et esthétiques pour applications web et mobile.",
    rating: 4.0,
    totalRatings: 60,
    rank: 6,
  },
]

export default function FormationsPage() {
  const [activeTab, setActiveTab] = useState("all")
  // Dans la fonction du composant, ajouter cette ligne après les autres déclarations d'état
  const { theme } = useTheme()

  // Style personnalisé pour le bouton souligné
  const underlinedButtonStyle = {
    textDecoration: "underline",
    textDecorationThickness: "2px",
    textUnderlineOffset: "4px",
  }

  const [isRatingDialogOpen, setIsRatingDialogOpen] = useState(false)
  const [selectedRating, setSelectedRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [currentFormation, setCurrentFormation] = useState(null)

  const handleRateClick = (formation) => {
    setCurrentFormation(formation)
    setIsRatingDialogOpen(true)
  }

  const handleRatingSubmit = () => {
    console.log(`Formation ${currentFormation?.title} rated with ${selectedRating} stars`)
    setIsRatingDialogOpen(false)
    setSelectedRating(0)
    setHoveredRating(0)
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

  const filteredFormations = activeTab === "all" ? formations : formations.filter((f) => f.category === activeTab)

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="py-8 bg-muted/10">
        <div className="container">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-2">Formations InnovX</h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Développez vos compétences avec nos formations de qualité dispensées par des experts dans divers domaines.
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 bg-muted/30">
        <div className="container">
          <div className="flex justify-center">
            <div className="relative w-full max-w-md">
              <SearchInput
                placeholder="Rechercher une formation..."
                onSearch={(query) => {
                  // Vous pouvez ajouter ici la logique pour filtrer les formations
                  console.log("Recherche de formations:", query)
                }}
                id="formations-search"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Formations Categories */}
      <section className="py-16" id="formations">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Catégories de Formations</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explorez nos différentes catégories de formations pour trouver celle qui correspond à vos besoins et
              objectifs professionnels.
            </p>
          </div>

          <Tabs defaultValue="all" className="w-full" value={activeTab} onValueChange={(value) => setActiveTab(value)}>
            {/* Version desktop - visible uniquement sur md et plus */}
            <TabsList className="hidden md:flex md:items-center md:justify-center mb-8 justify-center bg-[#F8E061] text-black rounded-md p-4 px-6 gap-3 min-h-[70px] dark:bg-[#F8E061] dark:text-black dark:rounded-md dark:p-4 dark:px-6 dark:gap-3 dark:min-h-[70px]">
              <TabsTrigger
                value="all"
                className="h-10 px-4 py-2 bg-white text-black hover:bg-gray-100 border-2 border-black m-1 dark:bg-white dark:text-black dark:data-[state=active]:bg-[#F8E061] dark:data-[state=active]:text-black dark:border-2 dark:border-black dark:m-1"
              >
                Toutes
              </TabsTrigger>
              <TabsTrigger
                value="programmation"
                className="h-10 px-4 py-2 bg-white text-black hover:bg-gray-100 border-2 border-black m-1 dark:bg-white dark:text-black dark:data-[state=active]:bg-[#F8E061] dark:data-[state=active]:text-black dark:border-2 dark:border-black dark:m-1"
              >
                Programmation
              </TabsTrigger>
              <TabsTrigger
                value="business"
                className="h-10 px-4 py-2 bg-white text-black hover:bg-gray-100 border-2 border-black m-1 dark:bg-white dark:text-black dark:data-[state=active]:bg-[#F8E061] dark:data-[state=active]:text-black dark:border-2 dark:border-black dark:m-1"
              >
                Business
              </TabsTrigger>
              <TabsTrigger
                value="design"
                className="h-10 px-4 py-2 bg-white text-black hover:bg-gray-100 border-2 border-black m-1 dark:bg-white dark:text-black dark:data-[state=active]:bg-[#F8E061] dark:data-[state=active]:text-black dark:border-2 dark:border-black dark:m-1"
              >
                Design
              </TabsTrigger>
            </TabsList>

            {/* Version mobile - menu déroulant visible uniquement sur petit écran */}
            <div className="md:hidden mb-8">
              <select
                className="w-full p-3 border-2 border-gray-300 rounded-md bg-white focus:border-innovx-yellow focus:ring focus:ring-innovx-yellow/20 focus:outline-none text-center font-medium transition-all dark:bg-white dark:text-black dark:border-2 dark:border-black"
                value={activeTab}
                onChange={(e) => {
                  const tabId = e.target.value
                  setActiveTab(tabId)
                }}
                style={{
                  backgroundImage:
                    "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23000000' strokeLinecap='round' strokeLinejoin='round' strokeWidth='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e\")",
                  backgroundPosition: "right 0.75rem center",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "1.5em 1.5em",
                  paddingRight: "2.5rem",
                  appearance: "none",
                }}
              >
                <option value="all">Toutes</option>
                <option value="programmation">Programmation</option>
                <option value="business">Business</option>
                <option value="design">Design</option>
              </select>
            </div>

            <TabsContent value="all">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredFormations.map((formation) => (
                  <Card key={formation.id} className="h-full flex flex-col">
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{formation.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-3 flex-grow">
                      <p className="text-sm mb-4">{formation.description}</p>

                      {formation.rating && (
                        <div className="flex items-center mb-2">
                          <div className="flex mr-1">{renderStars(formation.rating)}</div>
                          <p className="text-sm">
                            {formation.rating.toFixed(1)} ({formation.totalRatings})
                          </p>
                        </div>
                      )}

                      <div className="mt-2">
                        <p className="text-sm text-muted-foreground">Prix</p>
                        <p className="font-medium">{formation.price}</p>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between border-t pt-3 mt-auto">
                      <Button variant="outline" size="sm">
                        Voir détails
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleRateClick(formation)}
                        className="flex items-center gap-1"
                      >
                        <Star className="h-4 w-4" /> Notez
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="programmation">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredFormations
                  .filter((f) => f.category === "programmation")
                  .map((formation) => (
                    <Card key={formation.id} className="h-full flex flex-col">
                      <CardHeader className="pb-3">
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-lg">{formation.title}</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent className="pb-3 flex-grow">
                        <p className="text-sm mb-4">{formation.description}</p>

                        {formation.rating && (
                          <div className="flex items-center mb-2">
                            <div className="flex mr-1">{renderStars(formation.rating)}</div>
                            <p className="text-sm">
                              {formation.rating.toFixed(1)} ({formation.totalRatings})
                            </p>
                          </div>
                        )}

                        <div className="mt-2">
                          <p className="text-sm text-muted-foreground">Prix</p>
                          <p className="font-medium">{formation.price}</p>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between border-t pt-3 mt-auto">
                        <Button variant="outline" size="sm">
                          Voir détails
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleRateClick(formation)}
                          className="flex items-center gap-1"
                        >
                          <Star className="h-4 w-4" /> Notez
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
              </div>
            </TabsContent>

            {/* Similar structure for other tabs */}
            <TabsContent value="business">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredFormations
                  .filter((f) => f.category === "business")
                  .map((formation) => (
                    <Card key={formation.id} className="h-full flex flex-col">
                      <CardHeader className="pb-3">
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-lg">{formation.title}</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent className="pb-3 flex-grow">
                        <p className="text-sm mb-4">{formation.description}</p>

                        {formation.rating && (
                          <div className="flex items-center mb-2">
                            <div className="flex mr-1">{renderStars(formation.rating)}</div>
                            <p className="text-sm">
                              {formation.rating.toFixed(1)} ({formation.totalRatings})
                            </p>
                          </div>
                        )}

                        <div className="mt-2">
                          <p className="text-sm text-muted-foreground">Prix</p>
                          <p className="font-medium">{formation.price}</p>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between border-t pt-3 mt-auto">
                        <Button variant="outline" size="sm">
                          Voir détails
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleRateClick(formation)}
                          className="flex items-center gap-1"
                        >
                          <Star className="h-4 w-4" /> Notez
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="design">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredFormations
                  .filter((f) => f.category === "design")
                  .map((formation) => (
                    <Card key={formation.id} className="h-full flex flex-col">
                      <CardHeader className="pb-3">
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-lg">{formation.title}</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent className="pb-3 flex-grow">
                        <p className="text-sm mb-4">{formation.description}</p>

                        {formation.rating && (
                          <div className="flex items-center mb-2">
                            <div className="flex mr-1">{renderStars(formation.rating)}</div>
                            <p className="text-sm">
                              {formation.rating.toFixed(1)} ({formation.totalRatings})
                            </p>
                          </div>
                        )}

                        <div className="mt-2">
                          <p className="text-sm text-muted-foreground">Prix</p>
                          <p className="font-medium">{formation.price}</p>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between border-t pt-3 mt-auto">
                        <Button variant="outline" size="sm">
                          Voir détails
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleRateClick(formation)}
                          className="flex items-center gap-1"
                        >
                          <Star className="h-4 w-4" /> Notez
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Become Instructor Section */}
      <section className="py-16 bg-primary/10">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2">
              <Image
                src="/placeholder.svg?height=400&width=500"
                alt="Devenir formateur InnovX"
                width={500}
                height={400}
                className="rounded-lg object-cover"
              />
            </div>
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-4">Devenez Formateur</h2>
              <p className="mb-6">
                Partagez votre expertise et enseignez sur InnovX. Rejoignez notre communauté de formateurs et touchez un
                public plus large.
              </p>
              <ul className="space-y-4 mb-6">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-innovx-yellow flex items-center justify-center text-innovx-black text-xs flex-shrink-0 mt-1">
                    1
                  </div>
                  <div>
                    <h3 className="font-bold">Créez votre profil</h3>
                    <p className="text-sm text-muted-foreground">
                      Inscrivez-vous et complétez votre profil de formateur avec vos compétences et expériences.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-innovx-yellow flex items-center justify-center text-innovx-black text-xs flex-shrink-0 mt-1">
                    2
                  </div>
                  <div>
                    <h3 className="font-bold">Proposez votre formation</h3>
                    <p className="text-sm text-muted-foreground">
                      Soumettez votre proposition de formation pour validation par notre équipe.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-innovx-yellow flex items-center justify-center text-innovx-black text-xs flex-shrink-0 mt-1">
                    3
                  </div>
                  <div>
                    <h3 className="font-bold">Commencez à enseigner</h3>
                    <p className="text-sm text-muted-foreground">
                      Une fois approuvée, publiez votre formation et commencez à enseigner.
                    </p>
                  </div>
                </li>
              </ul>
              <Button asChild>
                <Link href="/contact">
                  <span
                    style={{
                      color: "white",
                    }}
                  >
                    Devenir formateur
                  </span>
                </Link>
              </Button>
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
              Prêt à développer vos compétences ?
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
              Inscrivez-vous dès maintenant et accédez à nos formations de qualité dispensées par des experts.
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
              <Link href="/register">
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
                  S'inscrire gratuitement
                </button>
              </Link>
              <Link href="#formations">
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
                  Voir les formations
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <Dialog open={isRatingDialogOpen} onOpenChange={setIsRatingDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Noter cette formation</DialogTitle>
            <DialogDescription>Donnez votre avis sur "{currentFormation?.title}"</DialogDescription>
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
            <Button variant="outline" onClick={() => setIsRatingDialogOpen(false)}>
              Annuler
            </Button>
            <Button onClick={handleRatingSubmit} disabled={selectedRating === 0}>
              Soumettre
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
