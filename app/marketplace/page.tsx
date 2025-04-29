"use client"

import { Button } from "@/components/ui/button"

import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
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

const products = [
  {
    id: 1,
    name: "Système de Gestion de Boutique en Ligne",
    category: "development",
    rating: 4.8,
    reviews: 24,
    price: "250,000 FCFA",
    image: "/placeholder.svg?height=200&width=200",
    description:
      "Solution complète pour gérer votre boutique en ligne, incluant gestion des stocks, paiements et livraisons.",
  },
  {
    id: 2,
    name: "Template Site Web Entreprise",
    category: "design",
    rating: 4.6,
    reviews: 18,
    price: "75,000 FCFA",
    image: "/placeholder.svg?height=200&width=200",
    description:
      "Template professionnel et responsive pour site d'entreprise, facile à personnaliser selon votre identité visuelle.",
  },
  {
    id: 3,
    name: "Application Mobile de Livraison",
    category: "development",
    rating: 4.9,
    reviews: 32,
    price: "350,000 FCFA",
    image: "/placeholder.svg?height=200&width=200",
    description:
      "Application mobile pour gérer les livraisons de vos produits, avec suivi en temps réel et notifications.",
  },
  {
    id: 4,
    name: "Kit d'Identité Visuelle",
    category: "design",
    rating: 4.7,
    reviews: 15,
    price: "120,000 FCFA",
    image: "/placeholder.svg?height=200&width=200",
    description:
      "Ensemble complet d'éléments graphiques pour votre marque: logo, cartes de visite, en-têtes, et plus encore.",
  },
  {
    id: 5,
    name: "Système de Gestion de Relation Client (CRM)",
    category: "development",
    rating: 4.8,
    reviews: 27,
    price: "280,000 FCFA",
    image: "/placeholder.svg?height=200&width=200",
    description: "Plateforme CRM complète pour gérer vos clients, prospects, et opportunités commerciales.",
  },
  {
    id: 6,
    name: "Template de Présentation PowerPoint",
    category: "design",
    rating: 4.5,
    reviews: 12,
    price: "45,000 FCFA",
    image: "/placeholder.svg?height=200&width=200",
    description: "Modèles de présentation professionnels avec plus de 100 diapositives uniques et animations.",
  },
  {
    id: 7,
    name: "Système de Gestion d'Inventaire",
    category: "development",
    rating: 4.7,
    reviews: 19,
    price: "200,000 FCFA",
    image: "/placeholder.svg?height=200&width=200",
    description:
      "Solution pour gérer efficacement vos stocks, avec alertes de réapprovisionnement et rapports détaillés.",
  },
  {
    id: 8,
    name: "Pack d'Icônes et Illustrations",
    category: "design",
    rating: 4.6,
    reviews: 14,
    price: "35,000 FCFA",
    image: "/placeholder.svg?height=200&width=200",
    description: "Collection de plus de 500 icônes et illustrations vectorielles pour vos projets web et mobiles.",
  },
  {
    id: 9,
    name: "Système de Réservation en Ligne",
    category: "development",
    rating: 4.8,
    reviews: 22,
    price: "230,000 FCFA",
    image: "/placeholder.svg?height=200&width=200",
    description: "Plateforme complète pour gérer les réservations et rendez-vous pour votre entreprise.",
  },
]

export default function MarketplacePage() {
  const [activeTab, setActiveTab] = useState("all")
  // Dans la fonction du composant, ajouter cette ligne après les autres déclarations d'état
  const { theme } = useTheme()

  // Style personnalisé pour le bouton souligné
  const underlinedButtonStyle = {
    textDecoration: "underline",
    textDecorationThickness: "2px",
    textUnderlineOffset: "4px",
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

  const [isRatingDialogOpen, setIsRatingDialogOpen] = useState(false)
  const [selectedRating, setSelectedRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [currentService, setCurrentService] = useState(null)

  const handleRateClick = (service) => {
    setCurrentService(service)
    setIsRatingDialogOpen(true)
  }

  const handleRatingSubmit = () => {
    console.log(`Service ${currentService?.title} rated with ${selectedRating} stars`)
    setIsRatingDialogOpen(false)
    setSelectedRating(0)
    setHoveredRating(0)
  }

  // Modifier les données mockées pour inclure les notes et les rangs
  const services = [
    {
      id: 1,
      title: "Conception de logo",
      description: "Je crée des logos professionnels et modernes pour votre entreprise.",
      price: "150 InnovX",
      category: "design",
      rating: 4.9,
      totalRatings: 87,
      rank: 1,
    },
    {
      id: 2,
      title: "Rédaction de contenu",
      description: "Rédaction d'articles, de descriptions de produits et de contenu pour les réseaux sociaux.",
      price: "120 InnovX",
      category: "redaction",
      rating: 4.7,
      totalRatings: 65,
      rank: 2,
    },
    {
      id: 3,
      title: "Application Mobile de Livraison",
      category: "development",
      rating: 4.9,
      reviews: 32,
      price: "350,000 FCFA",
      image: "/placeholder.svg?height=200&width=200",
      description:
        "Application mobile pour gérer les livraisons de vos produits, avec suivi en temps réel et notifications.",
      totalRatings: 70,
      rank: 3,
    },
    {
      id: 4,
      title: "Kit d'Identité Visuelle",
      category: "design",
      rating: 4.7,
      reviews: 15,
      price: "120,000 FCFA",
      image: "/placeholder.svg?height=200&width=200",
      description:
        "Ensemble complet d'éléments graphiques pour votre marque: logo, cartes de visite, en-têtes, et plus encore.",
      totalRatings: 50,
      rank: 4,
    },
    {
      id: 5,
      title: "Système de Gestion de Relation Client (CRM)",
      category: "development",
      rating: 4.8,
      reviews: 27,
      price: "280,000 FCFA",
      image: "/placeholder.svg?height=200&width=200",
      description: "Plateforme CRM complète pour gérer vos clients, prospects, et opportunités commerciales.",
      totalRatings: 60,
      rank: 5,
    },
    {
      id: 6,
      title: "Template de Présentation PowerPoint",
      category: "design",
      rating: 4.5,
      reviews: 12,
      price: "45,000 FCFA",
      image: "/placeholder.svg?height=200&width=200",
      description: "Modèles de présentation professionnels avec plus de 100 diapositives uniques et animations.",
      totalRatings: 40,
      rank: 6,
    },
    {
      id: 7,
      title: "Système de Gestion d'Inventaire",
      category: "development",
      rating: 4.7,
      reviews: 19,
      price: "200,000 FCFA",
      image: "/placeholder.svg?height=200&width=200",
      description:
        "Solution pour gérer efficacement vos stocks, avec alertes de réapprovisionnement et rapports détaillés.",
      totalRatings: 55,
      rank: 7,
    },
    {
      id: 8,
      title: "Pack d'Icônes et Illustrations",
      category: "design",
      rating: 4.6,
      reviews: 14,
      price: "35,000 FCFA",
      image: "/placeholder.svg?height=200&width=200",
      description: "Collection de plus de 500 icônes et illustrations vectorielles pour vos projets web et mobiles.",
      totalRatings: 45,
      rank: 8,
    },
    {
      id: 9,
      title: "Système de Réservation en Ligne",
      category: "development",
      rating: 4.8,
      reviews: 22,
      price: "230,000 FCFA",
      image: "/placeholder.svg?height=200&width=200",
      description: "Plateforme complète pour gérer les réservations et rendez-vous pour votre entreprise.",
      totalRatings: 65,
      rank: 9,
    },
  ]

  const [searchTerm, setSearchTerm] = useState("")
  const [category, setCategory] = useState("all")

  const filteredServices = services.filter((service) => {
    const searchMatch =
      service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase())

    const categoryMatch = category === "all" || service.category === category

    return searchMatch && categoryMatch
  })

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="py-8 bg-muted/10">
        <div className="container">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-2">Marketplace InnovX</h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Découvrez notre sélection de produits et services numériques pour développer votre entreprise.
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
                placeholder="Rechercher un produit..."
                className="w-full"
                onSearch={(query) => {
                  // Filtrer les produits en fonction de la recherche
                  // Cette fonction sera appelée lorsque l'utilisateur effectue une recherche
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16" id="products">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Nos Produits Numériques</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explorez notre catalogue de produits et services numériques conçus pour aider votre entreprise à se
              développer.
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
                value="development"
                className="h-10 px-4 py-2 bg-white text-black hover:bg-gray-100 border-2 border-black m-1 dark:bg-white dark:text-black dark:data-[state=active]:bg-[#F8E061] dark:data-[state=active]:text-black dark:border-2 dark:border-black dark:m-1"
              >
                Développement
              </TabsTrigger>
              <TabsTrigger
                value="design"
                className="h-10 px-4 py-2 bg-white text-black hover:bg-gray-100 border-2 border-black m-1 dark:bg-white dark:text-black dark:data-[state=active]:bg-[#F8E061] dark:data-[state=active]:text-black dark:border-2 dark:border-black dark:m-1"
              >
                Design
              </TabsTrigger>
              <TabsTrigger
                value="marketing"
                className="h-10 px-4 py-2 bg-white text-black hover:bg-gray-100 border-2 border-black m-1 dark:bg-white dark:text-black dark:data-[state=active]:bg-[#F8E061] dark:data-[state=active]:text-black dark:border-2 dark:border-black dark:m-1"
              >
                Marketing
              </TabsTrigger>
              <TabsTrigger
                value="business"
                className="h-10 px-4 py-2 bg-white text-black hover:bg-gray-100 border-2 border-black m-1 dark:bg-white dark:text-black dark:data-[state=active]:bg-[#F8E061] dark:data-[state=active]:text-black dark:border-2 dark:border-black dark:m-1"
              >
                Business
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
                  color: theme === "dark" ? "black" : undefined,
                }}
              >
                <option value="all" className="bg-white text-black">
                  Tous
                </option>
                <option value="development" className="bg-white text-black">
                  Développement
                </option>
                <option value="design" className="bg-white text-black">
                  Design
                </option>
                <option value="marketing" className="bg-white text-black">
                  Marketing
                </option>
                <option value="business" className="bg-white text-black">
                  Business
                </option>
              </select>
            </div>

            <TabsContent value="all">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <Card key={product.id}>
                    <CardHeader>
                      <div className="w-full h-48 rounded-md overflow-hidden mb-4">
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          width={400}
                          height={200}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <CardTitle className="text-xl">{product.name}</CardTitle>
                      <CardDescription>{product.category}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="mb-4">{product.description}</p>
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-innovx-yellow fill-innovx-yellow" />
                            <span className="text-sm ml-1">
                              {product.rating} ({product.reviews} avis)
                            </span>
                          </div>
                          <span className="font-bold">{product.price}</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between border-t pt-3 mt-auto">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/marketplace/${product.id}`}>Voir détails</Link>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleRateClick(product)}
                        className="flex items-center gap-1"
                      >
                        <Star className="h-4 w-4" /> Notez
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="development">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products
                  .filter((p) => p.category === "development")
                  .map((product) => (
                    <Card key={product.id}>
                      <CardHeader>
                        <div className="w-full h-48 rounded-md overflow-hidden mb-4">
                          <Image
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            width={400}
                            height={200}
                            className="object-cover w-full h-full"
                          />
                        </div>
                        <CardTitle className="text-xl">{product.name}</CardTitle>
                        <CardDescription>{product.category}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="mb-4">{product.description}</p>
                        <div className="flex flex-col gap-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <Star className="h-4 w-4 text-innovx-yellow fill-innovx-yellow" />
                              <span className="text-sm ml-1">
                                {product.rating} ({product.reviews} avis)
                              </span>
                            </div>
                            <span className="font-bold">{product.price}</span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between border-t pt-3 mt-auto">
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/marketplace/${product.id}`}>Voir détails</Link>
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleRateClick(product)}
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
                {products
                  .filter((p) => p.category === "design")
                  .map((product) => (
                    <Card key={product.id}>
                      <CardHeader>
                        <div className="w-full h-48 rounded-md overflow-hidden mb-4">
                          <Image
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            width={400}
                            height={200}
                            className="object-cover w-full h-full"
                          />
                        </div>
                        <CardTitle className="text-xl">{product.name}</CardTitle>
                        <CardDescription>{product.category}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="mb-4">{product.description}</p>
                        <div className="flex flex-col gap-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <Star className="h-4 w-4 text-innovx-yellow fill-innovx-yellow" />
                              <span className="text-sm ml-1">
                                {product.rating} ({product.reviews} avis)
                              </span>
                            </div>
                            <span className="font-bold">{product.price}</span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between border-t pt-3 mt-auto">
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/marketplace/${product.id}`}>Voir détails</Link>
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleRateClick(product)}
                          className="flex items-center gap-1"
                        >
                          <Star className="h-4 w-4" /> Notez
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="marketing">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="col-span-full text-center py-12">
                  <p className="text-muted-foreground">Aucun produit de marketing disponible pour le moment.</p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="business">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="col-span-full text-center py-12">
                  <p className="text-muted-foreground">Aucun produit business disponible pour le moment.</p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-primary/10">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Comment ça fonctionne</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Découvrez comment acheter et utiliser nos produits numériques en quelques étapes simples.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-innovx-yellow flex items-center justify-center text-innovx-black text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-bold mb-2">Choisissez un produit</h3>
              <p className="text-muted-foreground">
                Parcourez notre catalogue et sélectionnez le produit qui correspond le mieux à vos besoins.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-innovx-yellow flex items-center justify-center text-innovx-black text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-bold mb-2">Effectuez votre achat</h3>
              <p className="text-muted-foreground">
                Procédez au paiement sécurisé via notre plateforme avec plusieurs options de paiement disponibles.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-innovx-yellow flex items-center justify-center text-innovx-black text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-bold mb-2">Téléchargez et utilisez</h3>
              <p className="text-muted-foreground">
                Accédez immédiatement à votre produit et bénéficiez de notre support technique si nécessaire.
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
              Découvrez ce que nos clients disent de nos produits et services numériques.
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
                    <CardTitle className="text-lg">Ibrahim Diallo</CardTitle>
                    <CardDescription>Entrepreneur</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="italic">
                  "Le système de gestion de boutique en ligne a transformé mon business. L'installation a été simple et
                  le support technique est excellent."
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
                    <CardTitle className="text-lg">Aminata Touré</CardTitle>
                    <CardDescription>Designer</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="italic">
                  "Le pack d'icônes et d'illustrations est d'une qualité exceptionnelle. Il m'a fait gagner beaucoup de
                  temps dans mes projets de design."
                </p>
                <div className="flex mt-4">
                  <Star className="h-5 w-5 text-innovx-yellow fill-innovx-yellow" />
                  <Star className="h-5 w-5 text-innovx-yellow fill-innovx-yellow" />
                  <Star className="h-5 w-5 text-innovx-yellow fill-innovx-yellow" />
                  <Star className="h-5 w-5 text-innovx-yellow fill-innovx-yellow" />
                  <Star className="h-5 w-5 text-innovx-yellow" />
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
                    <CardTitle className="text-lg">Moussa Koné</CardTitle>
                    <CardDescription>Restaurateur</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="italic">
                  "L'application mobile de livraison a révolutionné mon service de restauration. Mes clients adorent
                  pouvoir suivre leurs commandes en temps réel."
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
              Prêt à développer votre entreprise ?
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
              Explorez notre marketplace et trouvez les outils numériques qui vous aideront à atteindre vos objectifs.
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
              <Link href="#products">
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
                  Explorer les produits
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
            <DialogTitle>Noter ce service</DialogTitle>
            <DialogDescription>Donnez votre avis sur "{currentService?.title}"</DialogDescription>
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
