"use client"

import { useState } from "react"
import { Check, X, Eye, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"

// Données fictives pour les publications à modérer
const mockPendingContent = [
  {
    id: "1",
    title: "Formation sur le trading de crypto-monnaies",
    type: "formation",
    author: "Jean Dupont",
    authorId: "user123",
    submittedDate: "2023-12-01T10:30:00",
    excerpt: "Apprenez les bases du trading de crypto-monnaies avec cette formation complète...",
    content:
      "Contenu complet de la formation sur le trading de crypto-monnaies. Cette formation vous permettra de maîtriser les techniques de base et avancées pour investir intelligemment dans les crypto-monnaies.",
  },
  {
    id: "2",
    title: "Service de consultation en marketing digital",
    type: "service",
    author: "Marie Martin",
    authorId: "user456",
    submittedDate: "2023-12-02T14:45:00",
    excerpt: "Offre de consultation personnalisée pour améliorer votre présence en ligne...",
    content:
      "Je propose un service de consultation en marketing digital pour aider votre entreprise à développer sa présence en ligne. Mon expertise inclut le SEO, les réseaux sociaux et le marketing par email.",
  },
  {
    id: "3",
    title: "E-book : Guide complet sur l'intelligence artificielle",
    type: "produit",
    author: "Pierre Durand",
    authorId: "user789",
    submittedDate: "2023-12-03T09:15:00",
    excerpt: "Un guide complet pour comprendre les concepts fondamentaux de l'IA...",
    content:
      "Ce guide électronique de 200 pages vous permettra de comprendre tous les concepts fondamentaux de l'intelligence artificielle, du machine learning au deep learning en passant par les réseaux de neurones.",
  },
]

const mockRejectedContent = [
  {
    id: "4",
    title: "Comment gagner de l'argent rapidement sans effort",
    type: "formation",
    author: "Lucas Bernard",
    authorId: "user101",
    submittedDate: "2023-11-28T15:20:00",
    rejectedDate: "2023-11-29T10:10:00",
    reason: "Contenu trompeur ou mensonger",
  },
  {
    id: "5",
    title: "Méthode secrète pour pirater des comptes",
    type: "service",
    author: "Sophie Lefebvre",
    authorId: "user202",
    submittedDate: "2023-11-29T11:30:00",
    rejectedDate: "2023-11-30T09:05:00",
    reason: "Contenu illégal ou contraire aux CGU",
  },
]

export function ContentModeration() {
  const [pendingContent, setPendingContent] = useState(mockPendingContent)
  const [rejectedContent, setRejectedContent] = useState(mockRejectedContent)
  const [selectedContent, setSelectedContent] = useState<any>(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false)
  const [rejectionReason, setRejectionReason] = useState("")

  const handleApproveContent = (contentId: string) => {
    // Logique d'approbation (dans un cas réel, appel API)
    setPendingContent(pendingContent.filter((item) => item.id !== contentId))
    toast({
      title: "Contenu approuvé",
      description: "Le contenu a été approuvé et est maintenant visible sur la plateforme.",
    })
  }

  const handleOpenRejectDialog = (content: any) => {
    setSelectedContent(content)
    setIsRejectDialogOpen(true)
  }

  const handleRejectContent = () => {
    // Logique de rejet (dans un cas réel, appel API)
    if (!selectedContent || !rejectionReason.trim()) return

    setRejectedContent([
      ...rejectedContent,
      {
        ...selectedContent,
        rejectedDate: new Date().toISOString(),
        reason: rejectionReason,
      },
    ])
    setPendingContent(pendingContent.filter((item) => item.id !== selectedContent.id))

    setIsRejectDialogOpen(false)
    setRejectionReason("")
    setSelectedContent(null)

    toast({
      title: "Contenu rejeté",
      description: "Le contenu a été rejeté et n'apparaîtra pas sur la plateforme.",
    })
  }

  const handleViewContent = (content: any) => {
    setSelectedContent(content)
    setIsViewDialogOpen(true)
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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="pending" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="pending">En attente ({pendingContent.length})</TabsTrigger>
          <TabsTrigger value="rejected">Rejetés ({rejectedContent.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-4 pt-4">
          {pendingContent.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {pendingContent.map((item) => (
                <Card key={item.id}>
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{item.title}</CardTitle>
                      {getContentTypeBadge(item.type)}
                    </div>
                    <CardDescription>
                      Par {item.author} • Soumis le {formatDate(item.submittedDate)}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground line-clamp-3">{item.excerpt}</p>
                  </CardContent>
                  <CardFooter className="flex justify-between pt-3">
                    <Button size="sm" variant="outline" onClick={() => handleViewContent(item)}>
                      <Eye className="h-4 w-4 mr-1" /> Voir
                    </Button>
                    <div className="flex gap-2">
                      <Button size="sm" variant="destructive" onClick={() => handleOpenRejectDialog(item)}>
                        <X className="h-4 w-4 mr-1" /> Rejeter
                      </Button>
                      <Button size="sm" variant="default" onClick={() => handleApproveContent(item.id)}>
                        <Check className="h-4 w-4 mr-1" /> Approuver
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-muted-foreground">Aucune publication en attente de modération.</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="rejected" className="space-y-4 pt-4">
          {rejectedContent.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {rejectedContent.map((item) => (
                <Card key={item.id} className="border-red-200 dark:border-red-900">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{item.title}</CardTitle>
                      {getContentTypeBadge(item.type)}
                    </div>
                    <CardDescription>
                      Par {item.author} • Rejeté le {formatDate(item.rejectedDate)}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-start gap-2 text-red-500 mb-2">
                      <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                      <p className="text-sm font-medium">Raison du rejet : {item.reason}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-muted-foreground">Aucune publication rejetée.</p>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Dialog pour afficher le contenu complet */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{selectedContent?.title}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Par {selectedContent?.author}</p>
              <p className="text-sm text-muted-foreground">
                Soumis le {selectedContent && formatDate(selectedContent.submittedDate)}
              </p>
              <div className="mt-2">{selectedContent && getContentTypeBadge(selectedContent.type)}</div>
            </div>
            <div className="border-t pt-4">
              <p>{selectedContent?.content}</p>
            </div>
          </div>
          <DialogFooter className="sm:justify-between">
            <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
              Fermer
            </Button>
            <div className="flex gap-2">
              <Button
                variant="destructive"
                onClick={() => {
                  setIsViewDialogOpen(false)
                  handleOpenRejectDialog(selectedContent)
                }}
              >
                <X className="h-4 w-4 mr-1" /> Rejeter
              </Button>
              <Button
                variant="default"
                onClick={() => {
                  handleApproveContent(selectedContent.id)
                  setIsViewDialogOpen(false)
                }}
              >
                <Check className="h-4 w-4 mr-1" /> Approuver
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog pour rejeter et fournir une raison */}
      <Dialog open={isRejectDialogOpen} onOpenChange={setIsRejectDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Rejeter la publication</DialogTitle>
            <DialogDescription>
              Veuillez fournir une raison pour le rejet de "{selectedContent?.title}".
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <Textarea
              placeholder="Raison du rejet..."
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              className="min-h-[100px]"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsRejectDialogOpen(false)}>
              Annuler
            </Button>
            <Button variant="destructive" onClick={handleRejectContent} disabled={!rejectionReason.trim()}>
              Confirmer le rejet
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
