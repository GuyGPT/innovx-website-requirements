"use client"

import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState, useEffect } from "react"
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
import { Button } from "@/components/ui/button"

// Modifier les données mockées pour inclure les notes et les rangs
const coaches = [
  {
    id: 1,
    name: "Dr. Konaté Amadou",
    specialty: "Développement personnel",
    description: "Coach certifié avec plus de 10 ans d'expérience dans le développement personnel et professionnel.",
    price: "45,000 FCFA / mois",
    image: "/placeholder.svg?height=200&width=200",
    category: "personnel",
    rating: 4.9,
    reviews: 27,
    totalRatings: 56,
    rank: 1,
  },
  {
    id: 2,
    name: "Mme. Traoré Fatima",
    specialty: "Entrepreneuriat",
    description:
      "Entrepreneure à succès qui accompagne les porteurs de projets dans le développement de leur entreprise.",
    price: "50,000 FCFA / mois",
    image: "/placeholder.svg?height=200&width=200",
    category: "business",
    rating: 4.8,
    reviews: 19,
    totalRatings: 42,
    rank: 2,
  },
  {
    id: 3,
    name: "M. Ouédraogo Paul",
    specialty: "Carrière professionnelle",
    description: "Expert en ressources humaines qui aide les professionnels à atteindre leurs objectifs de carrière.",
    price: "40,000 FCFA / mois",
    image: "/placeholder.svg?height=200&width=200",
    category: "career",
    rating: 4.7,
    reviews: 23,
    totalRatings: 35,
    rank: 3,
  },
  {
    id: 4,
    name: "Prof. Diallo Ibrahim",
    specialty: "Leadership",
    description: "Professeur et consultant en leadership qui forme les cadres et dirigeants d'entreprises.",
    price: "55,000 FCFA / mois",
    image: "/placeholder.svg?height=200&width=200",
    category: "leadership",
    rating: 4.9,
    reviews: 31,
    totalRatings: 62,
    rank: 1,
  },
  {
    id: 5,
    name: "Mme. Sawadogo Aïcha",
    specialty: "Finances personnelles",
    description:
      "Conseillère financière qui aide les particuliers à gérer leur budget et à atteindre l'indépendance financière.",
    price: "45,000 FCFA / mois",
    image: "/placeholder.svg?height=200&width=200",
    category: "business",
    rating: 4.6,
    reviews: 18,
    totalRatings: 29,
    rank: 4,
  },
  {
    id: 6,
    name: "M. Kaboré Jean",
    specialty: "Bien-être et équilibre",
    description:
      "Coach en bien-être qui accompagne ses clients vers un meilleur équilibre entre vie professionnelle et personnelle.",
    price: "42,000 FCFA / mois",
    image: "/placeholder.svg?height=200&width=200",
    category: "personal",
    rating: 4.8,
    reviews: 25,
    totalRatings: 48,
    rank: 2,
  },
]

export default function CoachingPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [filteredCoaches, setFilteredCoaches] = useState(coaches)
  // Dans la fonction du composant, ajouter cette ligne après les autres déclarations d'état
  const { theme } = useTheme()

  const [isRatingDialogOpen, setIsRatingDialogOpen] = useState(false)
  const [selectedRating, setSelectedRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [currentCoach, setCurrentCoach] = useState(null)

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

  const handleRateClick = (coach) => {
    setCurrentCoach(coach)
    setIsRatingDialogOpen(true)
  }

  const handleRatingSubmit = () => {
    console.log(`Coach ${currentCoach?.name} rated with ${selectedRating} stars`)
    setIsRatingDialogOpen(false)
    setSelectedRating(0)
    setHoveredRating(0)
  }

  // Ajouter un effet pour gérer la recherche globale
  useEffect(() => {
    // Fonction pour gérer les événements de recherche personnalisés
    const handleSearch = (event: CustomEvent) => {
      const query = event.detail?.query || ""

      if (!query.trim()) {
        setFilteredCoaches(coaches)
        return
      }

      const q = query.toLowerCase()
      const results = coaches.filter(
        (coach) =>
          coach.name.toLowerCase().includes(q) ||
          coach.specialty.toLowerCase().includes(q) ||
          coach.description.toLowerCase().includes(q),
      )

      setFilteredCoaches(results)
    }

    // Écouter l'événement de recherche personnalisé
    window.addEventListener("search", handleSearch as EventListener)

    return () => {
      window.removeEventListener("search", handleSearch as EventListener)
    }
  }, [coaches])

  // Style personnalisé pour le bouton souligné
  const underlinedButtonStyle = {
    textDecoration: "underline",
    textDecorationThickness: "2px",
    textUnderlineOffset: "4px",
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="py-8 bg-muted/10">
        <div className="container">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-2">Coaching InnovX</h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Bénéficiez d'un accompagnement personnalisé avec nos coachs experts pour atteindre vos objectifs
              personnels et professionnels.
            </p>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-8 bg-muted/30">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-4 text-center">Rechercher un coach</h2>
            <SearchInput
              placeholder="Rechercher un coach par nom, spécialité ou description..."
              id="coach-search-results"
              className="w-full"
            />
          </div>
        </div>
      </section>

      {/* Coaching Categories */}
      <section className="py-16" id="coaches">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Nos Coachs Experts</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Découvrez nos coachs professionnels qui vous accompagneront dans votre développement personnel et
              professionnel.
            </p>
          </div>

          <Tabs defaultValue="all" className="w-full" value={activeTab} onValueChange={(value) => setActiveTab(value)}>
            {/* Version desktop - visible uniquement sur md et plus */}
            <TabsList className="hidden md:flex md:items-center md:justify-center mb-8 justify-center bg-[#F8E061] text-black rounded-md p-4 px-6 gap-3 min-h-[70px] dark:bg-[#F8E061] dark:text-black dark:rounded-md dark:p-4 dark:px-6 dark:gap-3 dark:min-h-[70px]">
              <TabsTrigger
                value="all"
                className="h-10 px-4 py-2 bg-white text-black hover:bg-gray-100 border-2 border-black m-1 dark:bg-white dark:text-black dark:data-[state=active]:bg-[#F8E061] dark:data-[state=active]:text-black dark:border-2 dark:border-black dark:m-1"
              >
                Tous
              </TabsTrigger>
              <TabsTrigger
                value="personal"
                className="h-10 px-4 py-2 bg-white text-black hover:bg-gray-100 border-2 border-black m-1 dark:bg-white dark:text-black dark:data-[state=active]:bg-[#F8E061] dark:data-[state=active]:text-black dark:border-2 dark:border-black dark:m-1"
              >
                Développement personnel
              </TabsTrigger>
              <TabsTrigger
                value="business"
                className="h-10 px-4 py-2 bg-white text-black hover:bg-gray-100 border-2 border-black m-1 dark:bg-white dark:text-black dark:data-[state=active]:bg-[#F8E061] dark:data-[state=active]:text-black dark:border-2 dark:border-black dark:m-1"
              >
                Entrepreneuriat
              </TabsTrigger>
              <TabsTrigger
                value="career"
                className="h-10 px-4 py-2 bg-white text-black hover:bg-gray-100 border-2 border-black m-1 dark:bg-white dark:text-black dark:data-[state=active]:bg-[#F8E061] dark:data-[state=active]:text-black dark:border-2 dark:border-black dark:m-1"
              >
                Carrière
              </TabsTrigger>
              <TabsTrigger
                value="leadership"
                className="h-10 px-4 py-2 bg-white text-black hover:bg-gray-100 border-2 border-black m-1 dark:bg-white dark:text-black dark:data-[state=active]:bg-[#F8E061] dark:data-[state=active]:text-black dark:border-2 dark:border-black dark:m-1"
              >
                Leadership
              </TabsTrigger>
            </TabsList>

            {/* Version mobile - menu déroulant visible uniquement sur petit écran */}
            <div className="md:hidden mb-8">
              <select
                className="w-full p-3 border-2 border-gray-300 rounded-md bg-white focus:border-innovx-yellow focus:ring focus:ring-innovx-yellow/20 focus:outline-none text-center font-medium transition-all dark:bg-white dark:text-black dark:border-2 dark:border-black h-auto min-h-[50px] text-ellipsis"
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
                  whiteSpace: "normal",
                  textOverflow: "ellipsis",
                  overflow: "visible",
                  color: theme === "dark" ? "black" : undefined,
                }}
              >
                <option value="all" className="bg-white text-black">
                  Tous
                </option>
                <option value="personal" className="bg-white text-black">
                  Développement personnel
                </option>
                <option value="business" className="bg-white text-black">
                  Entrepreneuriat
                </option>
                <option value="career" className="bg-white text-black">
                  Carrière
                </option>
                <option value="leadership" className="bg-white text-black">
                  Leadership
                </option>
              </select>
            </div>

            <TabsContent value="all">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCoaches.length > 0 ? (
                  filteredCoaches.map((coach) => (
                    <Card key={coach.id} className="h-full flex flex-col">
                      <CardHeader className="pb-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-lg">{coach.name}</CardTitle>
                            <CardDescription>{coach.specialty}</CardDescription>
                          </div>
                          {/* Le badge de classement a été supprimé à la demande du client */}
                        </div>
                      </CardHeader>
                      <CardContent className="pb-3 flex-grow">
                        <p className="text-sm mb-4">{coach.description}</p>

                        {coach.rating && (
                          <div className="flex items-center mb-2">
                            <div className="flex mr-1">{renderStars(coach.rating)}</div>
                            <p className="text-sm">
                              {coach.rating.toFixed(1)} ({coach.totalRatings})
                            </p>
                          </div>
                        )}

                        <div className="mt-2">
                          <p className="text-sm text-muted-foreground">Prix</p>
                          <p className="font-medium">{coach.price}</p>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between border-t pt-3 mt-auto">
                        <Button variant="outline" size="sm">
                          Voir profil
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleRateClick(coach)}
                          className="flex items-center gap-1"
                        >
                          <Star className="h-4 w-4" /> Notez
                        </Button>
                      </CardFooter>
                    </Card>
                  ))
                ) : (
                  <div className="col-span-full text-center py-12">
                    <p className="text-muted-foreground">Aucun coach ne correspond à votre recherche.</p>
                  </div>
                )}
              </div>
            </TabsContent>

            {/* Autres onglets avec filtrage par spécialité */}
            <TabsContent value="personal">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCoaches.length > 0 ? (
                  filteredCoaches
                    .filter(
                      (c) => c.specialty === "Développement personnel" || c.specialty === "Bien-être et équilibre",
                    )
                    .map((coach) => (
                      <Card key={coach.id} className="h-full flex flex-col">
                        <CardHeader className="pb-3">
                          <div className="flex justify-between items-start">
                            <div>
                              <CardTitle className="text-lg">{coach.name}</CardTitle>
                              <CardDescription>{coach.specialty}</CardDescription>
                            </div>
                            {/* Le badge de classement a été supprimé à la demande du client */}
                          </div>
                        </CardHeader>
                        <CardContent className="pb-3 flex-grow">
                          <p className="text-sm mb-4">{coach.description}</p>

                          {coach.rating && (
                            <div className="flex items-center mb-2">
                              <div className="flex mr-1">{renderStars(coach.rating)}</div>
                              <p className="text-sm">
                                {coach.rating.toFixed(1)} ({coach.totalRatings})
                              </p>
                            </div>
                          )}

                          <div className="mt-2">
                            <p className="text-sm text-muted-foreground">Prix</p>
                            <p className="font-medium">{coach.price}</p>
                          </div>
                        </CardContent>
                        <CardFooter className="flex justify-between border-t pt-3 mt-auto">
                          <Button variant="outline" size="sm">
                            Voir profil
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleRateClick(coach)}
                            className="flex items-center gap-1"
                          >
                            <Star className="h-4 w-4" /> Notez
                          </Button>
                        </CardFooter>
                      </Card>
                    ))
                ) : (
                  <div className="col-span-full text-center py-12">
                    <p className="text-muted-foreground">Aucun coach ne correspond à votre recherche.</p>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="business">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCoaches.length > 0 ? (
                  filteredCoaches
                    .filter((c) => c.specialty === "Entrepreneuriat" || c.specialty === "Finances personnelles")
                    .map((coach) => (
                      <Card key={coach.id} className="h-full flex flex-col">
                        <CardHeader className="pb-3">
                          <div className="flex justify-between items-start">
                            <div>
                              <CardTitle className="text-lg">{coach.name}</CardTitle>
                              <CardDescription>{coach.specialty}</CardDescription>
                            </div>
                            {/* Le badge de classement a été supprimé à la demande du client */}
                          </div>
                        </CardHeader>
                        <CardContent className="pb-3 flex-grow">
                          <p className="text-sm mb-4">{coach.description}</p>

                          {coach.rating && (
                            <div className="flex items-center mb-2">
                              <div className="flex mr-1">{renderStars(coach.rating)}</div>
                              <p className="text-sm">
                                {coach.rating.toFixed(1)} ({coach.totalRatings})
                              </p>
                            </div>
                          )}

                          <div className="mt-2">
                            <p className="text-sm text-muted-foreground">Prix</p>
                            <p className="font-medium">{coach.price}</p>
                          </div>
                        </CardContent>
                        <CardFooter className="flex justify-between border-t pt-3 mt-auto">
                          <Button variant="outline" size="sm">
                            Voir profil
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleRateClick(coach)}
                            className="flex items-center gap-1"
                          >
                            <Star className="h-4 w-4" /> Notez
                          </Button>
                        </CardFooter>
                      </Card>
                    ))
                ) : (
                  <div className="col-span-full text-center py-12">
                    <p className="text-muted-foreground">Aucun coach ne correspond à votre recherche.</p>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="career">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCoaches.length > 0 ? (
                  filteredCoaches
                    .filter((c) => c.specialty === "Carrière professionnelle")
                    .map((coach) => (
                      <Card key={coach.id} className="h-full flex flex-col">
                        <CardHeader className="pb-3">
                          <div className="flex justify-between items-start">
                            <div>
                              <CardTitle className="text-lg">{coach.name}</CardTitle>
                              <CardDescription>{coach.specialty}</CardDescription>
                            </div>
                            {/* Le badge de classement a été supprimé à la demande du client */}
                          </div>
                        </CardHeader>
                        <CardContent className="pb-3 flex-grow">
                          <p className="text-sm mb-4">{coach.description}</p>

                          {coach.rating && (
                            <div className="flex items-center mb-2">
                              <div className="flex mr-1">{renderStars(coach.rating)}</div>
                              <p className="text-sm">
                                {coach.rating.toFixed(1)} ({coach.totalRatings})
                              </p>
                            </div>
                          )}

                          <div className="mt-2">
                            <p className="text-sm text-muted-foreground">Prix</p>
                            <p className="font-medium">{coach.price}</p>
                          </div>
                        </CardContent>
                        <CardFooter className="flex justify-between border-t pt-3 mt-auto">
                          <Button variant="outline" size="sm">
                            Voir profil
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleRateClick(coach)}
                            className="flex items-center gap-1"
                          >
                            <Star className="h-4 w-4" /> Notez
                          </Button>
                        </CardFooter>
                      </Card>
                    ))
                ) : (
                  <div className="col-span-full text-center py-12">
                    <p className="text-muted-foreground">Aucun coach ne correspond à votre recherche.</p>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="leadership">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCoaches.length > 0 ? (
                  filteredCoaches
                    .filter((c) => c.specialty === "Leadership")
                    .map((coach) => (
                      <Card key={coach.id} className="h-full flex flex-col">
                        <CardHeader className="pb-3">
                          <div className="flex justify-between items-start">
                            <div>
                              <CardTitle className="text-lg">{coach.name}</CardTitle>
                              <CardDescription>{coach.specialty}</CardDescription>
                            </div>
                            {/* Le badge de classement a été supprimé à la demande du client */}
                          </div>
                        </CardHeader>
                        <CardContent className="pb-3 flex-grow">
                          <p className="text-sm mb-4">{coach.description}</p>

                          {coach.rating && (
                            <div className="flex items-center mb-2">
                              <div className="flex mr-1">{renderStars(coach.rating)}</div>
                              <p className="text-sm">
                                {coach.rating.toFixed(1)} ({coach.totalRatings})
                              </p>
                            </div>
                          )}

                          <div className="mt-2">
                            <p className="text-sm text-muted-foreground">Prix</p>
                            <p className="font-medium">{coach.price}</p>
                          </div>
                        </CardContent>
                        <CardFooter className="flex justify-between border-t pt-3 mt-auto">
                          <Button variant="outline" size="sm">
                            Voir profil
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleRateClick(coach)}
                            className="flex items-center gap-1"
                          >
                            <Star className="h-4 w-4" /> Notez
                          </Button>
                        </CardFooter>
                      </Card>
                    ))
                ) : (
                  <div className="col-span-full text-center py-12">
                    <p className="text-muted-foreground">Aucun coach ne correspond à votre recherche.</p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Reste du code inchangé... */}
      {/* How It Works */}
      <section className="py-16 bg-primary/10">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Comment ça fonctionne</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Découvrez comment fonctionne notre service de coaching et commencez votre parcours de développement.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-innovx-yellow flex items-center justify-center text-innovx-black text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-bold mb-2">Choisissez votre coach</h3>
              <p className="text-muted-foreground">
                Parcourez les profils de nos coachs et sélectionnez celui qui correspond le mieux à vos besoins.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-innovx-yellow flex items-center justify-center text-innovx-black text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-bold mb-2">Planifiez votre session</h3>
              <p className="text-muted-foreground">
                Réservez une session à une date et une heure qui vous conviennent, en présentiel ou en ligne.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-innovx-yellow flex items-center justify-center text-innovx-black text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-bold mb-2">Commencez votre parcours</h3>
              <p className="text-muted-foreground">
                Travaillez avec votre coach pour définir vos objectifs et élaborer un plan d'action personnalisé.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 pastel-section">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 pastel-section-text">Témoignages</h2>
            <p className="pastel-section-subtext max-w-2xl mx-auto">
              Découvrez ce que nos clients disent de leur expérience de coaching avec InnovX.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-background border-input">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/20 overflow-hidden">
                    <Image src="/placeholder.svg?height=48&width=48" alt="Avatar" width={48} height={48} />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Mariam Ouédraogo</CardTitle>
                    <CardDescription>Entrepreneure</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="italic">
                  "Le coaching avec Mme. Traoré m'a permis de structurer mon projet d'entreprise et de surmonter mes
                  blocages. Je recommande vivement!"
                </p>
                <div className="flex mt-4">
                  <Star className="h-5 w-5 text-innovx-yellow fill-innovx-yellow" />
                  <Star className="h-5 w-5 text-innovx-yellow fill-innovx-yellow" />
                  <Star className="h-5 w-5 text-innovx-yellow fill-innovx-yellow" />
                  <Star className="h-5 w-5 text-innovx-yellow fill-innovx-yellow" />
                  <Star className="h-5 w-5 text-innovx-yellow fill-innovx-yellow" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-background border-input">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/20 overflow-hidden">
                    <Image src="/placeholder.svg?height=48&width=48" alt="Avatar" width={48} height={48} />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Issouf Koné</CardTitle>
                    <CardDescription>Cadre d'entreprise</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="italic">
                  "Le coaching en leadership avec Prof. Diallo a transformé ma façon de manager mon équipe. Les
                  résultats sont visibles et durables."
                </p>
                <div className="flex mt-4">
                  <Star className="h-5 w-5 text-innovx-yellow fill-innovx-yellow" />
                  <Star className="h-5 w-5 text-innovx-yellow fill-innovx-yellow" />
                  <Star className="h-5 w-5 text-innovx-yellow fill-innovx-yellow" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-background border-input">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/20 overflow-hidden">
                    <Image src="/placeholder.svg?height=48&width=48" alt="Avatar" width={48} height={48} />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Sophie Compaoré</CardTitle>
                    <CardDescription>Étudiante</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="italic">
                  "Le coaching en développement personnel m'a aidée à gagner en confiance et à mieux gérer mon stress.
                  Une expérience très enrichissante."
                </p>
                <div className="flex mt-4">
                  <Star className="h-5 w-5 text-innovx-yellow fill-innovx-yellow" />
                  <Star className="h-5 w-5 text-innovx-yellow fill-innovx-yellow" />
                  <Star className="h-5 w-5 text-innovx-yellow fill-innovx-yellow" />
                  <Star className="h-5 w-5 text-innovx-yellow" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Nos Formules de Coaching</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Choisissez la formule de coaching qui correspond le mieux à vos besoins et à votre budget.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-primary/50">
              <CardHeader className="text-center pb-2">
                <CardTitle>Découverte</CardTitle>
                <div className="text-3xl font-bold mt-2">
                  25,000 FCFA
                  <span className="text-sm font-normal text-muted-foreground">/mois</span>
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center text-xs">✓</div>
                    <span>2 sessions de coaching par mois</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center text-xs">✓</div>
                    <span>Sessions de 45 minutes</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center text-xs">✓</div>
                    <span>Suivi par email</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>{/* Bouton supprimé */}</CardFooter>
            </Card>

            <Card className="border-primary relative">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary text-primary-foreground px-3 py-1 text-xs font-medium rounded-full">
                Populaire
              </div>
              <CardHeader className="text-center pb-2">
                <CardTitle>Standard</CardTitle>
                <div className="text-3xl font-bold mt-2">
                  45,000 FCFA
                  <span className="text-sm font-normal text-muted-foreground">/mois</span>
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center text-xs">✓</div>
                    <span>4 sessions de coaching par mois</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center text-xs">✓</div>
                    <span>Sessions de 60 minutes</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center text-xs">✓</div>
                    <span>Suivi par email et WhatsApp</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center text-xs">✓</div>
                    <span>Ressources personnalisées</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>{/* Bouton supprimé */}</CardFooter>
            </Card>

            <Card className="border-primary/50">
              <CardHeader className="text-center pb-2">
                <CardTitle>Premium</CardTitle>
                <div className="text-3xl font-bold mt-2">
                  75,000 FCFA
                  <span className="text-sm font-normal text-muted-foreground">/mois</span>
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center text-xs">✓</div>
                    <span>8 sessions de coaching par mois</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center text-xs">✓</div>
                    <span>Sessions de 60 minutes</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center text-xs">✓</div>
                    <span>Disponibilité 7j/7</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center text-xs">✓</div>
                    <span>Plan d'action personnalisé</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center text-xs">✓</div>
                    <span>Accès à des formations exclusives</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>{/* Bouton supprimé */}</CardFooter>
            </Card>
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
              Prêt à transformer votre vie ?
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
              Commencez votre parcours de coaching dès aujourd'hui et atteignez vos objectifs personnels et
              professionnels.
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
                  Commencer maintenant
                </button>
              </Link>
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
            </div>
          </div>
        </div>
      </section>
      {/* Ajouter cette boîte de dialogue à la fin du composant */}
      <Dialog open={isRatingDialogOpen} onOpenChange={setIsRatingDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Noter ce coach</DialogTitle>
            <DialogDescription>Donnez votre avis sur {currentCoach?.name}</DialogDescription>
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
