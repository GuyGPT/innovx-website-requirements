"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Plus, Edit, Trash2, Eye, AlertCircle } from "lucide-react"

// Données fictives pour les publications de l'utilisateur
const mockPublications = [
  {
    id: "1",
    title: "Formation sur le trading de crypto-monnaies",
    type: "formation",
    status: "published",
    date: "2023-12-01",
    views: 128,
    purchases: 12,
    price: "200 InnovX",
    rating: 4.5,
    totalRatings: 24,
  },
  {
    id: "2",
    title: "Service de consultation en marketing digital",
    type: "service",
    status: "published",
    date: "2023-11-20",
    views: 45,
    purchases: 3,
    price: "170 InnovX",
    rating: 4.2,
    totalRatings: 10,
  },
  {
    id: "3",
    title: "E-book : Guide complet sur l'intelligence artificielle",
    type: "produit",
    status: "published",
    date: "2023-11-15",
    views: 89,
    purchases: 7,
    price: "120 InnovX",
    rating: 3.8,
    totalRatings: 15,
  },
]

const mockPendingPublications = [
  {
    id: "4",
    title: "Cours sur la programmation en Rust",
    type: "formation",
    status: "pending",
    date: "2023-12-02",
    message: "Votre publication est en cours d'examen par notre équipe de modération.",
    price: "180 InnovX",
  },
  {
    id: "5",
    title: "Services d'automatisation avec Python",
    type: "service",
    status: "pending",
    date: "2023-12-03",
    message: "Votre publication est en cours d'examen par notre équipe de modération.",
    price: "250 InnovX",
  },
]

const mockRejectedPublications = [
  {
    id: "6",
    title: "Comment gagner de l'argent rapidement sans effort",
    type: "formation",
    status: "rejected",
    date: "2023-11-28",
    reason: "Contenu trompeur ou mensonger",
    price: "150 InnovX",
  },
]

export function UserPublications() {
  const [activeTab, setActiveTab] = useState("published")
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedPublication, setSelectedPublication] = useState<any>(null)
  const [isRejectionDetailsOpen, setIsRejectionDetailsOpen] = useState(false)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "published":
        return <Badge className="bg-green-500 hover:bg-green-600">Publié</Badge>
      case "pending":
        return <Badge className="bg-yellow-500 hover:bg-yellow-600">En attente</Badge>
      case "rejected":
        return <Badge className="bg-red-500 hover:bg-red-600">Rejeté</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  const getContentTypeBadge = (type: string) => {
    switch (type) {
      case "formation":
        return <Badge className="bg-blue-500 hover:bg-blue-600">Formation</Badge>
      case "service":
        return <Badge className="bg-green-500 hover:bg-green-600">Service</Badge>
      case "produit":
        return <Badge className="bg-purple-500 hover:bg-purple-600">Produit</Badge>
      default:
        return <Badge>{type}</Badge>
    }
  }

  const renderStars = (rating: number) => {
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

  const handleDeleteClick = (publication: any) => {
    setSelectedPublication(publication)
    setIsDeleteDialogOpen(true)
  }

  const handleShowRejectionDetails = (publication: any) => {
    setSelectedPublication(publication)
    setIsRejectionDetailsOpen(true)
  }

  const handleDelete = () => {
    // Logique de suppression (dans un cas réel, appel API)
    console.log("Suppression de la publication:", selectedPublication.id)
    setIsDeleteDialogOpen(false)
    setSelectedPublication(null)
  }

  // Trier les publications par note moyenne (de la plus haute à la plus basse)
  const sortedPublications = [...mockPublications].sort((a, b) => b.rating - a.rating)

  // Ajouter un rang à chaque publication
  const rankedPublications = sortedPublications.map((pub, index) => ({
    ...pub,
    rank: index + 1,
  }))

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Gérez vos publications</h3>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Nouvelle publication
        </Button>
      </div>

      <Tabs defaultValue="published" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="published">Publiées ({mockPublications.length})</TabsTrigger>
          <TabsTrigger value="pending">En attente ({mockPendingPublications.length})</TabsTrigger>
          <TabsTrigger value="rejected">Rejetées ({mockRejectedPublications.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="published" className="pt-6">
          <div className="grid gap-6 md:grid-cols-2">
            {rankedPublications.map((publication) => (
              <Card key={publication.id}>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{publication.title}</CardTitle>
                    <div className="flex flex-col items-end gap-2">
                      {getContentTypeBadge(publication.type)}
                      {getStatusBadge(publication.status)}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pb-3">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Note moyenne</p>
                      <div className="flex items-center">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center mr-2 font-bold">
                          #{publication.rank}
                        </div>
                        <div className="flex mr-1">{renderStars(publication.rating)}</div>
                        <p className="font-medium">
                          {publication.rating.toFixed(1)} ({publication.totalRatings})
                        </p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Achats</p>
                      <p className="font-medium">{publication.purchases}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Prix</p>
                      <p className="font-medium">{publication.price}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Date de publication</p>
                      <p className="font-medium">{publication.date}</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between border-t pt-3">
                  <Button variant="ghost" size="sm">
                    <Eye className="mr-2 h-4 w-4" /> Voir
                  </Button>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="sm">
                      <Edit className="mr-2 h-4 w-4" /> Modifier
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-500 hover:text-red-600"
                      onClick={() => handleDeleteClick(publication)}
                    >
                      <Trash2 className="mr-2 h-4 w-4" /> Supprimer
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}

            {mockPublications.length === 0 && (
              <div className="col-span-2 text-center py-10">
                <p className="text-muted-foreground">Vous n'avez aucune publication active.</p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="pending" className="pt-6">
          <div className="grid gap-6 md:grid-cols-2">
            {mockPendingPublications.map((publication) => (
              <Card key={publication.id}>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{publication.title}</CardTitle>
                    <div className="flex flex-col items-end gap-2">
                      {getContentTypeBadge(publication.type)}
                      {getStatusBadge(publication.status)}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pb-3">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Date de soumission</p>
                    <p className="font-medium">{publication.date}</p>
                    <p className="text-sm text-muted-foreground">Prix proposé</p>
                    <p className="font-medium">{publication.price}</p>
                    <p className="text-sm mt-2">{publication.message}</p>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between border-t pt-3">
                  <Button variant="ghost" size="sm" disabled>
                    <Eye className="mr-2 h-4 w-4" /> Voir
                  </Button>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="sm">
                      <Edit className="mr-2 h-4 w-4" /> Modifier
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-500 hover:text-red-600"
                      onClick={() => handleDeleteClick(publication)}
                    >
                      <Trash2 className="mr-2 h-4 w-4" /> Supprimer
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}

            {mockPendingPublications.length === 0 && (
              <div className="col-span-2 text-center py-10">
                <p className="text-muted-foreground">Vous n'avez aucune publication en attente de modération.</p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="rejected" className="pt-6">
          <div className="grid gap-6 md:grid-cols-2">
            {mockRejectedPublications.map((publication) => (
              <Card key={publication.id} className="border-red-200 dark:border-red-900">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{publication.title}</CardTitle>
                    <div className="flex flex-col items-end gap-2">
                      {getContentTypeBadge(publication.type)}
                      {getStatusBadge(publication.status)}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pb-3">
                  <div className="space-y-2">
                    <div className="flex items-start gap-2 text-red-500">
                      <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                      <p className="text-sm">Cette publication a été rejetée.</p>
                    </div>
                    <p className="text-sm text-muted-foreground">Date de soumission</p>
                    <p className="font-medium">{publication.date}</p>
                    <p className="text-sm text-muted-foreground">Prix proposé</p>
                    <p className="font-medium">{publication.price}</p>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between border-t pt-3">
                  <Button variant="outline" size="sm" onClick={() => handleShowRejectionDetails(publication)}>
                    Voir la raison
                  </Button>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="sm">
                      <Edit className="mr-2 h-4 w-4" /> Modifier et resoumettre
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-500 hover:text-red-600"
                      onClick={() => handleDeleteClick(publication)}
                    >
                      <Trash2 className="mr-2 h-4 w-4" /> Supprimer
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}

            {mockRejectedPublications.length === 0 && (
              <div className="col-span-2 text-center py-10">
                <p className="text-muted-foreground">Vous n'avez aucune publication rejetée.</p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Supprimer la publication</DialogTitle>
            <DialogDescription>
              Êtes-vous sûr de vouloir supprimer "{selectedPublication?.title}" ? Cette action est irréversible.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Annuler
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Supprimer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isRejectionDetailsOpen} onOpenChange={setIsRejectionDetailsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Raison du rejet</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <div className="flex items-start gap-2 text-red-500 mb-4">
              <AlertCircle className="h-5 w-5 mt-0.5" />
              <p className="font-medium">Publication rejetée</p>
            </div>
            <p className="text-sm mb-2">Titre : {selectedPublication?.title}</p>
            <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-md">
              <p className="font-medium mb-1">Raison du rejet :</p>
              <p>{selectedPublication?.reason}</p>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => setIsRejectionDetailsOpen(false)}>Fermer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
