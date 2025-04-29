"use client"

import { useState, useEffect } from "react"
import { PublicationCard, type Publication } from "./publication-card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Données fictives pour les publications
const mockPublications = [
  {
    id: "1",
    title: "Formation sur le trading de crypto-monnaies",
    type: "formation",
    description: "Apprenez les bases du trading de crypto-monnaies et développez vos compétences d'investissement.",
    price: "200 InnovX",
    rating: 4.8,
    totalRatings: 124,
    author: "Jean Dupont",
  },
  {
    id: "2",
    title: "Service de consultation en marketing digital",
    type: "service",
    description: "Obtenez des conseils d'experts pour améliorer votre présence en ligne et augmenter vos conversions.",
    price: "170 InnovX",
    rating: 4.6,
    totalRatings: 87,
    author: "Marie Martin",
  },
  {
    id: "3",
    title: "Coaching en développement personnel",
    type: "coaching",
    description: "Séances individuelles pour vous aider à atteindre vos objectifs personnels et professionnels.",
    price: "250 InnovX",
    rating: 4.9,
    totalRatings: 56,
    author: "Sophie Leclerc",
  },
  {
    id: "4",
    title: "E-book : Guide complet sur l'intelligence artificielle",
    type: "produit",
    description: "Un guide détaillé pour comprendre les concepts fondamentaux de l'IA et ses applications.",
    price: "120 InnovX",
    rating: 4.5,
    totalRatings: 93,
    author: "Thomas Bernard",
  },
  {
    id: "5",
    title: "Formation en développement web",
    type: "formation",
    description: "Apprenez à créer des sites web modernes avec les dernières technologies.",
    price: "180 InnovX",
    rating: 4.7,
    totalRatings: 112,
    author: "Lucie Dubois",
  },
  {
    id: "6",
    title: "Service de création de logo",
    type: "service",
    description: "Obtenez un logo professionnel qui représente parfaitement votre marque.",
    price: "150 InnovX",
    rating: 4.4,
    totalRatings: 78,
    author: "Pierre Moreau",
  },
]

export function FeaturedPublications() {
  const [activeTab, setActiveTab] = useState("all")
  const [rankedPublications, setRankedPublications] = useState<Publication[]>([])

  useEffect(() => {
    // Filtrer les publications en fonction de l'onglet actif
    let filteredPublications = [...mockPublications]

    if (activeTab !== "all") {
      filteredPublications = mockPublications.filter((pub) => pub.type === activeTab)
    }

    // Trier par note et ajouter le rang
    const sorted = filteredPublications
      .sort((a, b) => b.rating - a.rating)
      .map((pub, index) => ({
        ...pub,
        rank: index + 1,
      }))

    setRankedPublications(sorted)
  }, [activeTab])

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold mb-2">Publications les mieux notées</h2>
        <p className="text-muted-foreground">Découvrez nos contenus les plus appréciés par la communauté</p>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all">Tous</TabsTrigger>
          <TabsTrigger value="formation">Formations</TabsTrigger>
          <TabsTrigger value="service">Services</TabsTrigger>
          <TabsTrigger value="coaching">Coaching</TabsTrigger>
          <TabsTrigger value="produit">Produits</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="pt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {rankedPublications.map((publication) => (
              <PublicationCard key={publication.id} publication={publication} showRank={true} />
            ))}

            {rankedPublications.length === 0 && (
              <div className="col-span-3 text-center py-10">
                <p className="text-muted-foreground">Aucune publication disponible dans cette catégorie.</p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
