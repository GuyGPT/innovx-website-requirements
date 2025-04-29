"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

export function AffiliationDashboard() {
  const [withdrawAmount, setWithdrawAmount] = useState("")
  const [withdrawMethod, setWithdrawMethod] = useState("innovx-coin")
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  return (
    <div className="space-y-6">
      {/* Compteur du Programme d'Affiliation */}
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-xl tracking-tight">Tableau de bord d'affiliation</CardTitle>
          <CardDescription>Suivez vos performances et vos commissions en temps réel</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <Card className="bg-muted/20">
              <CardHeader className="pb-2 p-3">
                <CardDescription>Total des commissions</CardDescription>
                <CardTitle className="text-2xl text-black dark:text-white font-semibold">241 InnovX</CardTitle>
              </CardHeader>
            </Card>

            <Card className="bg-muted/20">
              <CardHeader className="pb-2 p-3">
                <CardDescription>Affiliés recrutés</CardDescription>
                <CardTitle className="text-2xl text-black dark:text-white font-semibold">24</CardTitle>
              </CardHeader>
            </Card>

            <Card className="bg-muted/20">
              <CardHeader className="pb-2 p-3">
                <CardDescription>Niveau actuel</CardDescription>
                <CardTitle className="text-2xl text-black dark:text-white font-semibold">Silver</CardTitle>
              </CardHeader>
            </Card>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-bold mb-3">Votre lien d'affiliation</h3>
            <div className="flex flex-col sm:flex-row items-center gap-2 p-2 sm:p-3 bg-muted/20 rounded-md">
              <input
                type="text"
                value="https://innovx.com/ref/votre-identifiant"
                readOnly
                className="flex-1 min-w-0 p-2 bg-transparent border-none focus:outline-none focus:ring-0 text-xs sm:text-sm overflow-x-auto whitespace-nowrap font-mono"
              />
              <Button variant="outline" size="sm" className="w-full sm:w-auto">
                Copier
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Partagez ce lien pour gagner des commissions sur chaque inscription ou achat.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Tabs pour les différentes sections */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid grid-cols-4 mb-4">
          <TabsTrigger value="overview">Aperçu</TabsTrigger>
          <TabsTrigger value="commissions">Commissions</TabsTrigger>
          <TabsTrigger value="withdrawals">Retraits</TabsTrigger>
          <TabsTrigger value="affiliates">Mes affiliés</TabsTrigger>
        </TabsList>

        {/* Aperçu */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card className="bg-muted/20">
              <CardHeader className="pb-2 p-3">
                <CardDescription>Solde des entrées</CardDescription>
                <CardTitle className="text-2xl text-black dark:text-white font-semibold">370 InnovX</CardTitle>
              </CardHeader>
            </Card>

            <Card className="bg-muted/20">
              <CardHeader className="pb-2 p-3">
                <CardDescription>Solde des sorties</CardDescription>
                <CardTitle className="text-2xl text-black dark:text-white font-semibold">129 InnovX</CardTitle>
              </CardHeader>
            </Card>

            <Card className="bg-muted/20">
              <CardHeader className="pb-2 p-3">
                <CardDescription>Solde actuel</CardDescription>
                <CardTitle className="text-2xl text-black dark:text-white font-semibold">241 InnovX</CardTitle>
              </CardHeader>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Activité récente</CardTitle>
              <CardDescription>Vos dernières transactions et activités</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    date: "15/03/2023",
                    type: "Entrée",
                    description: "Commission de Amadou Diallo",
                    amount: "+30 InnovX",
                    status: "Complété",
                  },
                  {
                    date: "28/02/2023",
                    type: "Entrée",
                    description: "Commission de Fatou Sow",
                    amount: "+17 InnovX",
                    status: "Complété",
                  },
                  {
                    date: "20/03/2023",
                    type: "Sortie",
                    description: "Retrait vers InnovX Coin",
                    amount: "-90 InnovX",
                    status: "Complété",
                  },
                  {
                    date: "05/04/2023",
                    type: "Entrée",
                    description: "Commission de Aminata Koné",
                    amount: "+36 InnovX",
                    status: "En attente",
                  },
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between pb-3 border-b last:border-0 last:pb-0">
                    <div className="flex flex-col">
                      <span className="font-medium">{item.description}</span>
                      <span className="text-sm text-muted-foreground">{item.date}</span>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className={item.type === "Entrée" ? "text-green-600" : "text-red-600"}>{item.amount}</span>
                      <Badge variant={item.status === "Complété" ? "success" : "warning"} className="text-xs">
                        {item.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button>Demander un retrait</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Demande de retrait</DialogTitle>
                  <DialogDescription>Veuillez remplir les informations pour effectuer votre retrait.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="amount">Montant (InnovX)</Label>
                    <Input
                      id="amount"
                      type="number"
                      placeholder="Montant à retirer"
                      value={withdrawAmount}
                      onChange={(e) => setWithdrawAmount(e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">Solde disponible: 241 InnovX</p>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="method">Méthode de retrait</Label>
                    <Select value={withdrawMethod} onValueChange={setWithdrawMethod}>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez une méthode" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="innovx-coin">InnovX Coin</SelectItem>
                        <SelectItem value="bank-transfer">Virement bancaire</SelectItem>
                        <SelectItem value="mobile-money">Mobile Money</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Annuler
                  </Button>
                  <Button>Confirmer le retrait</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </TabsContent>

        {/* Commissions */}
        <TabsContent value="commissions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Historique des commissions</CardTitle>
              <CardDescription>Détail de toutes les commissions générées par vos affiliés</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto -mx-6 px-6">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Date</th>
                      <th className="text-left p-2">Affilié</th>
                      <th className="text-left p-2">Produit</th>
                      <th className="text-left p-2">Montant</th>
                      <th className="text-left p-2">Commission</th>
                      <th className="text-left p-2">Statut</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="p-2">15/03/2023</td>
                      <td className="p-2">Amadou Diallo</td>
                      <td className="p-2">Formation Trading</td>
                      <td className="p-2">200 InnovX</td>
                      <td className="p-2">30 InnovX</td>
                      <td className="p-2">
                        <Badge variant="success">Payé</Badge>
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2">28/02/2023</td>
                      <td className="p-2">Fatou Sow</td>
                      <td className="p-2">Coaching Crypto</td>
                      <td className="p-2">170 InnovX</td>
                      <td className="p-2">17 InnovX</td>
                      <td className="p-2">
                        <Badge variant="success">Payé</Badge>
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2">10/02/2023</td>
                      <td className="p-2">Ibrahim Touré</td>
                      <td className="p-2">Pack Premium</td>
                      <td className="p-2">440 InnovX</td>
                      <td className="p-2">44 InnovX</td>
                      <td className="p-2">
                        <Badge variant="success">Payé</Badge>
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2">05/04/2023</td>
                      <td className="p-2">Aminata Koné</td>
                      <td className="p-2">Formation Débutant</td>
                      <td className="p-2">240 InnovX</td>
                      <td className="p-2">36 InnovX</td>
                      <td className="p-2">
                        <Badge variant="warning">En attente</Badge>
                      </td>
                    </tr>
                    <tr>
                      <td className="p-2">22/04/2023</td>
                      <td className="p-2">Moussa Camara</td>
                      <td className="p-2">Coaching Personnalisé</td>
                      <td className="p-2">300 InnovX</td>
                      <td className="p-2">45 InnovX</td>
                      <td className="p-2">
                        <Badge variant="warning">En attente</Badge>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Retraits */}
        <TabsContent value="withdrawals" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Historique des retraits</CardTitle>
              <CardDescription>Détail de tous vos retraits de commissions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto -mx-6 px-6">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Date</th>
                      <th className="text-left p-2">Méthode</th>
                      <th className="text-left p-2">Montant</th>
                      <th className="text-left p-2">Frais</th>
                      <th className="text-left p-2">Statut</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="p-2">20/03/2023</td>
                      <td className="p-2">InnovX Coin</td>
                      <td className="p-2">90 InnovX</td>
                      <td className="p-2">0 InnovX</td>
                      <td className="p-2">
                        <Badge variant="success">Complété</Badge>
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2">15/02/2023</td>
                      <td className="p-2">InnovX Coin</td>
                      <td className="p-2">60 InnovX</td>
                      <td className="p-2">0 InnovX</td>
                      <td className="p-2">
                        <Badge variant="success">Complété</Badge>
                      </td>
                    </tr>
                    <tr>
                      <td className="p-2">10/04/2023</td>
                      <td className="p-2">InnovX Coin</td>
                      <td className="p-2">50 InnovX</td>
                      <td className="p-2">0 InnovX</td>
                      <td className="p-2">
                        <Badge variant="warning">En cours</Badge>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="mt-4 flex justify-end">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>Nouveau retrait</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Demande de retrait</DialogTitle>
                      <DialogDescription>
                        Veuillez remplir les informations pour effectuer votre retrait.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="amount">Montant (InnovX)</Label>
                        <Input id="amount" type="number" placeholder="Montant à retirer" />
                        <p className="text-xs text-muted-foreground">Solde disponible: 241 InnovX</p>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="method">Méthode de retrait</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionnez une méthode" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="innovx-coin">InnovX Coin</SelectItem>
                            <SelectItem value="bank-transfer">Virement bancaire</SelectItem>
                            <SelectItem value="mobile-money">Mobile Money</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline">Annuler</Button>
                      <Button>Confirmer le retrait</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Affiliés */}
        <TabsContent value="affiliates" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Mes affiliés directs</CardTitle>
              <CardDescription>Coordonnées et performances de vos affiliés directs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto -mx-6 px-6">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Nom</th>
                      <th className="text-left p-2">Email</th>
                      <th className="text-left p-2">Téléphone</th>
                      <th className="text-left p-2">Date d'inscription</th>
                      <th className="text-left p-2">Commissions générées</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="p-2">Amadou Diallo</td>
                      <td className="p-2">amadou.diallo@email.com</td>
                      <td className="p-2">+225 07 12 34 56</td>
                      <td className="p-2">10/01/2023</td>
                      <td className="p-2">90 InnovX</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2">Fatou Sow</td>
                      <td className="p-2">fatou.sow@email.com</td>
                      <td className="p-2">+225 05 98 76 54</td>
                      <td className="p-2">15/01/2023</td>
                      <td className="p-2">65 InnovX</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2">Ibrahim Touré</td>
                      <td className="p-2">ibrahim.toure@email.com</td>
                      <td className="p-2">+225 01 23 45 67</td>
                      <td className="p-2">22/01/2023</td>
                      <td className="p-2">116 InnovX</td>
                    </tr>
                    <tr>
                      <td className="p-2">Aminata Koné</td>
                      <td className="p-2">aminata.kone@email.com</td>
                      <td className="p-2">+225 07 65 43 21</td>
                      <td className="p-2">05/02/2023</td>
                      <td className="p-2">36 InnovX</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Outils de promotion</CardTitle>
              <CardDescription>Ressources marketing pour promouvoir InnovX</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="p-3">
                    <CardTitle className="text-base">Bannières publicitaires</CardTitle>
                  </CardHeader>
                  <CardContent className="p-3">
                    <p className="text-sm mb-2">
                      Téléchargez des bannières optimisées pour vos sites web et réseaux sociaux.
                    </p>
                    <Button variant="outline" size="sm">
                      Télécharger
                    </Button>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="p-3">
                    <CardTitle className="text-base">Textes promotionnels</CardTitle>
                  </CardHeader>
                  <CardContent className="p-3">
                    <p className="text-sm mb-2">Utilisez nos modèles de textes pour vos emails et publications.</p>
                    <Button variant="outline" size="sm">
                      Voir les modèles
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
