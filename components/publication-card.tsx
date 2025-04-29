"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export interface Publication {
  id: string
  title: string
  type: string
  description?: string
  image?: string
  price?: string
  rating: number
  totalRatings: number
  rank?: number
  author?: string
}

interface PublicationCardProps {
  publication: Publication
  showRank?: boolean
  className?: string
}

export function PublicationCard({ publication, showRank = true, className = "" }: PublicationCardProps) {
  const [isRatingDialogOpen, setIsRatingDialogOpen] = useState(false)
  const [selectedRating, setSelectedRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)

  const getContentTypeBadge = (type: string) => {
    switch (type) {
      case "formation":
        return <Badge className="bg-blue-500 hover:bg-blue-600">Formation</Badge>
      case "service":
        return <Badge className="bg-green-500 hover:bg-green-600">Service</Badge>
      case "produit":
        return <Badge className="bg-purple-500 hover:bg-purple-600">Produit</Badge>
      case "coaching":
        return <Badge className="bg-indigo-500 hover:bg-indigo-600">Coaching</Badge>
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

  const handleRateClick = () => {
    setIsRatingDialogOpen(true)
  }

  const handleRatingSubmit = () => {
    // Ici, vous implémenteriez la logique pour soumettre la note à votre API
    console.log(`Publication ${publication.id} rated with ${selectedRating} stars`)
    setIsRatingDialogOpen(false)
    setSelectedRating(0)
    setHoveredRating(0)
  }

  return (
    <>
      <Card className={`h-full flex flex-col ${className}`}>
        <CardHeader className="pb-3">
          <div className="flex justify-between items-start">
            <CardTitle className="text-lg">{publication.title}</CardTitle>
            <div className="flex flex-col items-end gap-2">{getContentTypeBadge(publication.type)}</div>
          </div>
        </CardHeader>
        <CardContent className="pb-3 flex-grow">
          {publication.description && <p className="text-sm mb-4">{publication.description}</p>}

          <div className="flex items-center mb-2">
            {showRank && publication.rank && (
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center mr-2 font-bold">
                #{publication.rank}
              </div>
            )}
            <div className="flex mr-1">{renderStars(publication.rating)}</div>
            <p className="font-medium">
              {publication.rating.toFixed(1)} ({publication.totalRatings})
            </p>
          </div>

          {publication.price && (
            <div className="mt-2">
              <p className="text-sm text-muted-foreground">Prix</p>
              <p className="font-medium">{publication.price}</p>
            </div>
          )}

          {publication.author && (
            <div className="mt-2">
              <p className="text-sm text-muted-foreground">Auteur</p>
              <p className="font-medium">{publication.author}</p>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between border-t pt-3 mt-auto">
          <Button variant="outline" size="sm">
            Voir détails
          </Button>
          <Button variant="outline" size="sm" onClick={handleRateClick}>
            <Star className="mr-1 h-4 w-4" /> Notez
          </Button>
        </CardFooter>
      </Card>

      <Dialog open={isRatingDialogOpen} onOpenChange={setIsRatingDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Noter cette publication</DialogTitle>
            <DialogDescription>Donnez votre avis sur "{publication.title}"</DialogDescription>
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
    </>
  )
}
