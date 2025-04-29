"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MoreHorizontal, Plus, Search } from "lucide-react"

// Types d'utilisateurs pour le filtrage
const userTypes = [
  { value: "all", label: "Tous les types" },
  { value: "seller", label: "Vendeurs" },
  { value: "coach", label: "Coachs" },
  { value: "advertiser", label: "Annonceurs" },
  { value: "admin", label: "Administrateurs" },
]

// Données fictives des utilisateurs
const users = [
  {
    id: 1,
    name: "Jean Dupont",
    email: "jean.dupont@example.com",
    type: "seller",
    status: "active",
    joinedDate: "12/05/2023",
  },
  {
    id: 2,
    name: "Marie Martin",
    email: "marie.martin@example.com",
    type: "coach",
    status: "active",
    joinedDate: "23/06/2023",
  },
  {
    id: 3,
    name: "Pierre Durand",
    email: "pierre.durand@example.com",
    type: "advertiser",
    status: "inactive",
    joinedDate: "05/04/2023",
  },
  {
    id: 4,
    name: "Sophie Lefebvre",
    email: "sophie.lefebvre@example.com",
    type: "admin",
    status: "active",
    joinedDate: "18/01/2023",
  },
  {
    id: 5,
    name: "Lucas Bernard",
    email: "lucas.bernard@example.com",
    type: "seller",
    status: "pending",
    joinedDate: "30/07/2023",
  },
]

export function UserManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState("all")

  // Filtrer les utilisateurs en fonction de la recherche et du type sélectionné
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesType = selectedType === "all" || user.type === selectedType

    return matchesSearch && matchesType
  })

  // Fonction pour obtenir le libellé du statut en français
  const getStatusLabel = (status: string) => {
    switch (status) {
      case "active":
        return "Actif"
      case "inactive":
        return "Inactif"
      case "pending":
        return "En attente"
      default:
        return status
    }
  }

  // Fonction pour obtenir la classe CSS du badge de statut
  const getStatusClass = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "inactive":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
    }
  }

  // Fonction pour obtenir le libellé du type d'utilisateur en français
  const getUserTypeLabel = (type: string) => {
    switch (type) {
      case "seller":
        return "Vendeur"
      case "coach":
        return "Coach"
      case "advertiser":
        return "Annonceur"
      case "admin":
        return "Administrateur"
      default:
        return type
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="flex flex-1 items-center space-x-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
            <Input
              type="search"
              placeholder="Rechercher un utilisateur..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Type d'utilisateur" />
            </SelectTrigger>
            <SelectContent>
              {userTypes.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button className="shrink-0">
          <Plus className="mr-2 h-4 w-4" />
          Ajouter un utilisateur
        </Button>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nom</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead>Date d'inscription</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{getUserTypeLabel(user.type)}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusClass(user.status)}`}>
                      {getStatusLabel(user.status)}
                    </span>
                  </TableCell>
                  <TableCell>{user.joinedDate}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Modifier</DropdownMenuItem>
                        <DropdownMenuItem>Désactiver</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">Supprimer</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                  Aucun utilisateur trouvé
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
