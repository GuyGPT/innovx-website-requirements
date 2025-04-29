"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { toast } from "@/components/ui/use-toast"
import { Edit, Eye, Plus, Trash } from "lucide-react"

// Données fictives pour les sections de page
const pageSections = {
  homepage: [
    {
      id: "hero",
      title: "Section Héro",
      description: "Section principale en haut de la page d'accueil",
      active: true,
    },
    {
      id: "features",
      title: "Fonctionnalités",
      description: "Section présentant les principales fonctionnalités",
      active: true,
    },
    {
      id: "testimonials",
      title: "Témoignages",
      description: "Section affichant les témoignages des clients",
      active: true,
    },
    {
      id: "cta",
      title: "Appel à l'action",
      description: "Section incitant les visiteurs à s'inscrire",
      active: false,
    },
  ],
  services: [
    {
      id: "services_list",
      title: "Liste des services",
      description: "Section présentant tous les services disponibles",
      active: true,
    },
    {
      id: "pricing",
      title: "Tarification",
      description: "Section affichant les différentes formules tarifaires",
      active: true,
    },
    {
      id: "faq",
      title: "FAQ",
      description: "Section de questions fréquemment posées",
      active: false,
    },
  ],
  formations: [
    {
      id: "courses",
      title: "Cours disponibles",
      description: "Section listant tous les cours disponibles",
      active: true,
    },
    {
      id: "instructors",
      title: "Formateurs",
      description: "Section présentant les formateurs",
      active: true,
    },
  ],
}

export function SectionManagement() {
  const [activeTab, setActiveTab] = useState("homepage")
  const [sections, setSections] = useState(pageSections)
  const [editingSection, setEditingSection] = useState<any>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  // Gérer le changement de statut d'une section
  const handleToggleSection = (page: string, sectionId: string) => {
    setSections({
      ...sections,
      [page]: sections[page as keyof typeof sections].map((section) =>
        section.id === sectionId ? { ...section, active: !section.active } : section,
      ),
    })

    toast({
      title: "Statut mis à jour",
      description: "Le statut de la section a été mis à jour avec succès.",
    })
  }

  // Ouvrir la boîte de dialogue d'édition
  const handleEditSection = (section: any) => {
    setEditingSection({ ...section })
    setIsDialogOpen(true)
  }

  // Gérer la sauvegarde des modifications
  const handleSaveSection = () => {
    if (!editingSection) return

    setSections({
      ...sections,
      [activeTab]: sections[activeTab as keyof typeof sections].map((section) =>
        section.id === editingSection.id ? editingSection : section,
      ),
    })

    setIsDialogOpen(false)

    toast({
      title: "Section mise à jour",
      description: "La section a été mise à jour avec succès.",
    })
  }

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="homepage">Page d'accueil</TabsTrigger>
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="formations">Formations</TabsTrigger>
        </TabsList>

        {Object.keys(sections).map((page) => (
          <TabsContent key={page} value={page} className="space-y-4 pt-4">
            <div className="flex justify-end">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Ajouter une section
              </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {sections[page as keyof typeof sections].map((section) => (
                <Card key={section.id}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle>{section.title}</CardTitle>
                      <Switch checked={section.active} onCheckedChange={() => handleToggleSection(page, section.id)} />
                    </div>
                    <CardDescription>{section.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" onClick={() => handleEditSection(section)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Modifier
                      </Button>
                      <Button variant="outline" size="sm">
                        <Eye className="mr-2 h-4 w-4" />
                        Aperçu
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-600">
                        <Trash className="mr-2 h-4 w-4" />
                        Supprimer
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Modifier la section</DialogTitle>
            <DialogDescription>
              Modifiez les détails de la section. Cliquez sur Enregistrer lorsque vous avez terminé.
            </DialogDescription>
          </DialogHeader>
          {editingSection && (
            <div className="space-y-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Titre</Label>
                <Input
                  id="title"
                  value={editingSection.title}
                  onChange={(e) => setEditingSection({ ...editingSection, title: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={editingSection.description}
                  onChange={(e) => setEditingSection({ ...editingSection, description: e.target.value })}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="active"
                  checked={editingSection.active}
                  onCheckedChange={(checked) => setEditingSection({ ...editingSection, active: checked })}
                />
                <Label htmlFor="active">Section active</Label>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Annuler
            </Button>
            <Button onClick={handleSaveSection}>Enregistrer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
