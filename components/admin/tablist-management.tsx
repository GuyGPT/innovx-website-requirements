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
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import { Edit, Plus, Trash, MoveUp, MoveDown, ArrowUpDown } from "lucide-react"
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd"

// Données fictives pour les tablists des différentes pages
const initialTablists = {
  formations: {
    sortOrder: "custom", // 'custom' ou 'alphabetical'
    items: [
      { id: "all", label: "Toutes", active: true, order: 1 },
      { id: "programmation", label: "Programmation", active: true, order: 2 },
      { id: "business", label: "Business", active: true, order: 3 },
      { id: "design", label: "Design", active: true, order: 4 },
      { id: "marketing", label: "Marketing", active: false, order: 5 },
    ],
  },
  marketplace: {
    sortOrder: "custom",
    items: [
      { id: "all", label: "Tous", active: true, order: 1 },
      { id: "development", label: "Développement", active: true, order: 2 },
      { id: "design", label: "Design", active: true, order: 3 },
      { id: "marketing", label: "Marketing", active: true, order: 4 },
      { id: "business", label: "Business", active: true, order: 5 },
    ],
  },
  coaching: {
    sortOrder: "alphabetical",
    items: [
      { id: "all", label: "Tous", active: true, order: 1 },
      { id: "personal", label: "Développement personnel", active: true, order: 2 },
      { id: "business", label: "Entrepreneuriat", active: true, order: 3 },
      { id: "career", label: "Carrière", active: true, order: 4 },
      { id: "leadership", label: "Leadership", active: true, order: 5 },
    ],
  },
  services: {
    sortOrder: "custom",
    items: [
      { id: "all", label: "Tous", active: true, order: 1 },
      { id: "maintenance", label: "Maintenance", active: true, order: 2 },
      { id: "digital", label: "Services Numériques", active: true, order: 3 },
      { id: "consulting", label: "Consultance", active: false, order: 4 },
    ],
  },
}

export function TablistManagement() {
  const [activeTab, setActiveTab] = useState("formations")
  const [tablists, setTablists] = useState(initialTablists)
  const [editingItem, setEditingItem] = useState<any>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newItemDialogOpen, setNewItemDialogOpen] = useState(false)
  const [newItem, setNewItem] = useState({ id: "", label: "", active: true })

  // Fonction pour trier les éléments selon l'ordre choisi
  const getSortedItems = (pageKey: string) => {
    const tablist = tablists[pageKey as keyof typeof tablists]
    const items = [...tablist.items]

    if (tablist.sortOrder === "alphabetical") {
      return items.sort((a, b) => a.label.localeCompare(b.label))
    } else {
      return items.sort((a, b) => a.order - b.order)
    }
  }

  // Gérer le changement d'ordre de tri
  const handleSortOrderChange = (pageKey: string, order: string) => {
    setTablists({
      ...tablists,
      [pageKey]: {
        ...tablists[pageKey as keyof typeof tablists],
        sortOrder: order,
      },
    })

    toast({
      title: "Ordre de tri modifié",
      description: `Les catégories sont maintenant triées par ordre ${order === "alphabetical" ? "alphabétique" : "personnalisé"}.`,
    })
  }

  // Gérer le changement de statut d'un élément
  const handleToggleItem = (pageKey: string, itemId: string) => {
    setTablists({
      ...tablists,
      [pageKey]: {
        ...tablists[pageKey as keyof typeof tablists],
        items: tablists[pageKey as keyof typeof tablists].items.map((item) =>
          item.id === itemId ? { ...item, active: !item.active } : item,
        ),
      },
    })

    toast({
      title: "Statut mis à jour",
      description: "Le statut de la catégorie a été mis à jour avec succès.",
    })
  }

  // Ouvrir la boîte de dialogue d'édition
  const handleEditItem = (item: any) => {
    setEditingItem({ ...item })
    setIsDialogOpen(true)
  }

  // Gérer la sauvegarde des modifications
  const handleSaveItem = () => {
    if (!editingItem) return

    setTablists({
      ...tablists,
      [activeTab]: {
        ...tablists[activeTab as keyof typeof tablists],
        items: tablists[activeTab as keyof typeof tablists].items.map((item) =>
          item.id === editingItem.id ? editingItem : item,
        ),
      },
    })

    setIsDialogOpen(false)

    toast({
      title: "Catégorie mise à jour",
      description: "La catégorie a été mise à jour avec succès.",
    })
  }

  // Gérer la suppression d'un élément
  const handleDeleteItem = (pageKey: string, itemId: string) => {
    setTablists({
      ...tablists,
      [pageKey]: {
        ...tablists[pageKey as keyof typeof tablists],
        items: tablists[pageKey as keyof typeof tablists].items.filter((item) => item.id !== itemId),
      },
    })

    toast({
      title: "Catégorie supprimée",
      description: "La catégorie a été supprimée avec succès.",
    })
  }

  // Gérer l'ajout d'un nouvel élément
  const handleAddItem = () => {
    // Vérifier que l'ID et le label ne sont pas vides
    if (!newItem.id.trim() || !newItem.label.trim()) {
      toast({
        title: "Erreur",
        description: "L'identifiant et le libellé sont obligatoires.",
        variant: "destructive",
      })
      return
    }

    // Vérifier que l'ID n'existe pas déjà
    const idExists = tablists[activeTab as keyof typeof tablists].items.some((item) => item.id === newItem.id)
    if (idExists) {
      toast({
        title: "Erreur",
        description: "Cet identifiant existe déjà. Veuillez en choisir un autre.",
        variant: "destructive",
      })
      return
    }

    // Ajouter le nouvel élément
    const maxOrder = Math.max(...tablists[activeTab as keyof typeof tablists].items.map((item) => item.order), 0)

    setTablists({
      ...tablists,
      [activeTab]: {
        ...tablists[activeTab as keyof typeof tablists],
        items: [...tablists[activeTab as keyof typeof tablists].items, { ...newItem, order: maxOrder + 1 }],
      },
    })

    // Réinitialiser et fermer le dialogue
    setNewItem({ id: "", label: "", active: true })
    setNewItemDialogOpen(false)

    toast({
      title: "Catégorie ajoutée",
      description: "La nouvelle catégorie a été ajoutée avec succès.",
    })
  }

  // Gérer le déplacement d'un élément vers le haut
  const handleMoveUp = (pageKey: string, itemId: string) => {
    const items = [...tablists[pageKey as keyof typeof tablists].items]
    const index = items.findIndex((item) => item.id === itemId)

    if (index > 0) {
      // Échanger l'ordre avec l'élément précédent
      const currentOrder = items[index].order
      items[index].order = items[index - 1].order
      items[index - 1].order = currentOrder

      setTablists({
        ...tablists,
        [pageKey]: {
          ...tablists[pageKey as keyof typeof tablists],
          items: items,
        },
      })

      toast({
        title: "Ordre modifié",
        description: "L'ordre des catégories a été mis à jour.",
      })
    }
  }

  // Gérer le déplacement d'un élément vers le bas
  const handleMoveDown = (pageKey: string, itemId: string) => {
    const items = [...tablists[pageKey as keyof typeof tablists].items]
    const index = items.findIndex((item) => item.id === itemId)

    if (index < items.length - 1) {
      // Échanger l'ordre avec l'élément suivant
      const currentOrder = items[index].order
      items[index].order = items[index + 1].order
      items[index + 1].order = currentOrder

      setTablists({
        ...tablists,
        [pageKey]: {
          ...tablists[pageKey as keyof typeof tablists],
          items: items,
        },
      })

      toast({
        title: "Ordre modifié",
        description: "L'ordre des catégories a été mis à jour.",
      })
    }
  }

  // Gérer le drag and drop pour réordonner les éléments
  const handleDragEnd = (result: any) => {
    if (!result.destination) return

    const pageKey = activeTab
    const items = [...tablists[pageKey as keyof typeof tablists].items]
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    // Mettre à jour l'ordre de tous les éléments
    const updatedItems = items.map((item, index) => ({
      ...item,
      order: index + 1,
    }))

    setTablists({
      ...tablists,
      [pageKey]: {
        ...tablists[pageKey as keyof typeof tablists],
        items: updatedItems,
      },
    })

    toast({
      title: "Ordre mis à jour",
      description: "L'ordre des catégories a été mis à jour avec succès.",
    })
  }

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="formations">Formations</TabsTrigger>
          <TabsTrigger value="marketplace">Marketplace</TabsTrigger>
          <TabsTrigger value="coaching">Coaching</TabsTrigger>
          <TabsTrigger value="services">Services</TabsTrigger>
        </TabsList>

        {Object.keys(tablists).map((pageKey) => (
          <TabsContent key={pageKey} value={pageKey} className="space-y-4 pt-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Ordre d'affichage</CardTitle>
                  <Select
                    value={tablists[pageKey as keyof typeof tablists].sortOrder}
                    onValueChange={(value) => handleSortOrderChange(pageKey, value)}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Sélectionner l'ordre" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="alphabetical">Alphabétique</SelectItem>
                      <SelectItem value="custom">Personnalisé</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <CardDescription>
                  Choisissez comment les catégories doivent être affichées sur la page {pageKey}.
                </CardDescription>
              </CardHeader>
            </Card>

            <div className="flex justify-end">
              <Button onClick={() => setNewItemDialogOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Ajouter une catégorie
              </Button>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Catégories de la page {pageKey}</CardTitle>
                <CardDescription>
                  Gérez les catégories affichées dans la tablist de la page {pageKey}.
                  {tablists[pageKey as keyof typeof tablists].sortOrder === "custom" &&
                    " Glissez-déposez pour réorganiser les catégories."}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <DragDropContext onDragEnd={handleDragEnd}>
                  <Droppable
                    droppableId={`droppable-${pageKey}`}
                    isDropDisabled={tablists[pageKey as keyof typeof tablists].sortOrder !== "custom"}
                  >
                    {(provided) => (
                      <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-2">
                        {getSortedItems(pageKey).map((item, index) => (
                          <Draggable
                            key={item.id}
                            draggableId={item.id}
                            index={index}
                            isDragDisabled={tablists[pageKey as keyof typeof tablists].sortOrder !== "custom"}
                          >
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 border rounded-md"
                              >
                                <div className="flex items-center gap-3">
                                  {tablists[pageKey as keyof typeof tablists].sortOrder === "custom" && (
                                    <div {...provided.dragHandleProps} className="cursor-grab">
                                      <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
                                    </div>
                                  )}
                                  <div className="flex flex-col">
                                    <span className="font-medium">{item.label}</span>
                                    <span className="text-xs text-muted-foreground">ID: {item.id}</span>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  {item.active ? (
                                    <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                                      Actif
                                    </span>
                                  ) : (
                                    <span className="px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded-full">
                                      Inactif
                                    </span>
                                  )}

                                  {tablists[pageKey as keyof typeof tablists].sortOrder === "custom" && (
                                    <>
                                      <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => handleMoveUp(pageKey, item.id)}
                                      >
                                        <MoveUp className="h-4 w-4" />
                                      </Button>
                                      <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => handleMoveDown(pageKey, item.id)}
                                      >
                                        <MoveDown className="h-4 w-4" />
                                      </Button>
                                    </>
                                  )}

                                  <Button variant="ghost" size="icon" onClick={() => handleEditItem(item)}>
                                    <Edit className="h-4 w-4" />
                                  </Button>

                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => handleToggleItem(pageKey, item.id)}
                                  >
                                    <Switch checked={item.active} />
                                  </Button>

                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="text-red-600"
                                    onClick={() => handleDeleteItem(pageKey, item.id)}
                                  >
                                    <Trash className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </DragDropContext>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      {/* Dialogue d'édition */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Modifier la catégorie</DialogTitle>
            <DialogDescription>
              Modifiez les détails de la catégorie. Cliquez sur Enregistrer lorsque vous avez terminé.
            </DialogDescription>
          </DialogHeader>
          {editingItem && (
            <div className="space-y-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="id">Identifiant (ID)</Label>
                <Input
                  id="id"
                  value={editingItem.id}
                  onChange={(e) => setEditingItem({ ...editingItem, id: e.target.value })}
                  disabled // L'ID ne devrait généralement pas être modifié pour éviter les problèmes de référence
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="label">Libellé</Label>
                <Input
                  id="label"
                  value={editingItem.label}
                  onChange={(e) => setEditingItem({ ...editingItem, label: e.target.value })}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="active"
                  checked={editingItem.active}
                  onCheckedChange={(checked) => setEditingItem({ ...editingItem, active: checked })}
                />
                <Label htmlFor="active">Catégorie active</Label>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Annuler
            </Button>
            <Button onClick={handleSaveItem}>Enregistrer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialogue d'ajout */}
      <Dialog open={newItemDialogOpen} onOpenChange={setNewItemDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Ajouter une nouvelle catégorie</DialogTitle>
            <DialogDescription>
              Remplissez les détails de la nouvelle catégorie. Cliquez sur Ajouter lorsque vous avez terminé.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="new-id">Identifiant (ID)</Label>
              <Input
                id="new-id"
                value={newItem.id}
                onChange={(e) => setNewItem({ ...newItem, id: e.target.value })}
                placeholder="ex: web_development"
              />
              <p className="text-xs text-muted-foreground">
                L'identifiant doit être unique et ne contenir que des lettres, des chiffres et des tirets bas.
              </p>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="new-label">Libellé</Label>
              <Input
                id="new-label"
                value={newItem.label}
                onChange={(e) => setNewItem({ ...newItem, label: e.target.value })}
                placeholder="ex: Développement Web"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="new-active"
                checked={newItem.active}
                onCheckedChange={(checked) => setNewItem({ ...newItem, active: checked })}
              />
              <Label htmlFor="new-active">Catégorie active</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setNewItemDialogOpen(false)}>
              Annuler
            </Button>
            <Button onClick={handleAddItem}>Ajouter</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
