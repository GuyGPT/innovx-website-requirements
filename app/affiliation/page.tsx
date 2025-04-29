"use client"

import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, DollarSign, Award } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { useEffect } from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import ExternalLink from "@/components/external-link-disclaimer"

export default function AffiliationPage() {
  const { theme } = useTheme()

  useEffect(() => {
    // Injecter les styles pour corriger les problèmes de chevauchement
    const styleElement = document.createElement("style")
    styleElement.innerHTML = `
      /* Styles généraux pour corriger les chevauchements tout en améliorant la lisibilité */
      @media (max-width: 768px) {
        /* Ajuster la taille des textes pour une meilleure lisibilité */
        .text-xs {
          font-size: 0.75rem !important;
          line-height: 1.25 !important;
        }
        
        .text-sm {
          font-size: 0.875rem !important;
          line-height: 1.4 !important;
        }
        
        /* Assurer que les tableaux sont scrollables */
        .table-container {
          width: 100%;
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
          margin-bottom: 1rem;
        }
        
        /* Fixer la largeur des colonnes de tableau */
        table {
          table-layout: fixed;
          width: 100%;
          font-size: 0.75rem;
        }
        
        /* Réduire le padding dans les cellules */
        td, th {
          padding: 0.5rem !important;
          word-break: break-word;
          overflow-wrap: break-word;
          max-width: 100px;
        }
        
        /* Tronquer les textes longs */
        .truncate-text {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          display: block;
          max-width: 100%;
        }
        
        /* Limiter le nombre de lignes */
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        /* Réduire les paddings dans les cartes */
        .card-header {
          padding: 1rem !important;
        }
        
        .card-content {
          padding: 1rem !important;
        }
        
        /* Ajuster les espacements */
        .gap-4 {
          gap: 0.75rem !important;
        }
        
        .mb-4, .mb-6, .mb-8 {
          margin-bottom: 1.5rem !important;
        }
        
        .py-8, .py-12, .py-16 {
          padding-top: 1.5rem !important;
          padding-bottom: 1.5rem !important;
        }
        
        /* Ajuster la taille des icônes */
        .icon-container {
          width: 2.5rem !important;
          height: 2.5rem !important;
          margin-bottom: 0.75rem !important;
        }
        
        .icon-container svg {
          width: 1.25rem !important;
          height: 1.25rem !important;
        }
        
        /* Ajuster les avatars */
        .w-10.h-10, .w-12.h-12, .w-14.h-14 {
          width: 2.5rem !important;
          height: 2.5rem !important;
        }
        
        /* Ajuster la taille des titres */
        h1, .text-3xl, .text-4xl {
          font-size: 1.75rem !important;
          line-height: 1.3 !important;
        }
        
        h2, .text-2xl {
          font-size: 1.5rem !important;
          line-height: 1.3 !important;
        }
        
        h3, .text-xl {
          font-size: 1.25rem !important;
          line-height: 1.3 !important;
        }
        
        /* Ajuster les boutons */
        button {
          padding: 0.5rem 1rem !important;
          font-size: 0.875rem !important;
        }
      }

      /* Styles pour les écrans moyens */
      @media (min-width: 769px) and (max-width: 1024px) {
        .text-xs {
          font-size: 0.8125rem !important;
        }
        
        .text-sm {
          font-size: 0.9375rem !important;
        }
        
        table {
          font-size: 0.8125rem;
        }
        
        td, th {
          padding: 0.625rem !important;
        }
      }

      /* Styles pour tous les écrans */
      .card {
        height: 100%;
      }
      
      .testimonial-card p {
        margin-bottom: 0;
      }
      
      .table-container {
        border-radius: 0.375rem;
        overflow: hidden;
      }
      
      /* Améliorer l'espacement vertical */
      section {
        margin-bottom: 1.5rem;
      }
      
      /* Améliorer la lisibilité des textes */
      p {
        margin-bottom: 0.5rem;
      }
      
      /* Assurer que les textes ne débordent pas */
      .card-description {
        margin-top: 0.25rem;
      }

      /* Assurer que le bouton de menu mobile est visible */
      .mobile-menu-button {
        display: flex !important;
        visibility: visible !important;
        opacity: 1 !important;
      }

      /* Éviter les interférences avec le header */
      header .mobile-menu-button {
        z-index: 50;
      }

      /* Réinitialiser les styles qui pourraient interférer */
      @media (max-width: 768px) {
        header button.mobile-menu-button {
          padding: 0 !important;
          height: 2.5rem !important;
          width: 2.5rem !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
        }
      }

      /* Styles spécifiques pour l'icône de fermeture du menu mobile */
      .mobile-menu-close {
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        height: 40px !important;
        width: 40px !important;
        background-color: transparent !important;
        border: none !important;
        outline: none !important;
        box-shadow: none !important;
        position: relative !important;
        z-index: 9999 !important;
        cursor: pointer !important;
      }

      .mobile-menu-close svg {
        display: block !important;
        visibility: visible !important;
        opacity: 1 !important;
        width: 24px !important;
        height: 24px !important;
        stroke-width: 2.5 !important;
        color: currentColor !important;
        stroke: currentColor !important;
      }

      /* Forcer l'affichage des icônes Lucide */
      .lucide,
      .lucide-arrow-left,
      .lucide-x {
        display: inline-block !important;
        visibility: visible !important;
        opacity: 1 !important;
        color: currentColor !important;
        stroke: currentColor !important;
        stroke-width: 2px !important;
      }

      /* Supprimer les styles qui pourraient masquer l'icône */
      [&_.lucide-x],
      [&_.lucide-arrow-left] {
        opacity: 1 !important;
        visibility: visible !important;
        display: block !important;
      }

      /* Assurer que le contenu du SheetContent n'interfère pas */
      .SheetContent {
        --sheet-icon-opacity: 1 !important;
      }

      /* Styles pour le bouton de fermeture spécifiquement */
      button.mobile-menu-close {
        opacity: 1 !important;
        visibility: visible !important;
        display: flex !important;
      }

      /* Styles pour le conteneur du bouton de fermeture */
      .SheetContent .flex.items-center.justify-between {
        position: relative !important;
        z-index: 9999 !important;
      }

      /* Assurer que l'icône de fermeture est visible */
      .lucide-arrow-left {
        display: inline-block !important;
        visibility: visible !important;
        opacity: 1 !important;
        color: currentColor !important;
        stroke: currentColor !important;
        stroke-width: 2.5px !important;
      }

      /* Styles spécifiques pour le bouton de fermeture */
      button.mobile-menu-close {
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        visibility: visible !important;
        opacity: 1 !important;
        background-color: transparent !important;
        border: none !important;
        outline: none !important;
        box-shadow: none !important;
      }
    `
    document.head.appendChild(styleElement)

    return () => {
      document.head.removeChild(styleElement)
    }
  }, [])

  return (
    <div className="flex flex-col min-h-screen affiliation-page">
      {/* Hero Section */}
      <section className="py-8 bg-muted/10">
        <div className="container px-4">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl font-bold mb-2 tracking-tight">Programme d'Affiliation InnovX</h1>
            <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Gagnez des commissions en recommandant InnovX à votre réseau.
            </p>

            {/* Titre de section */}
            <div className="flex justify-center mt-6 px-2 sm:px-0">
              <div className="bg-muted/30 p-1 rounded-lg w-full max-w-xs sm:max-w-md text-center">
                <h2 className="rounded-md px-3 sm:px-5 py-3 text-base sm:text-xl font-bold bg-[#F8E061] dark:bg-white text-black tracking-tight">
                  Programme d'affiliation InnovX
                </h2>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Compteur d'affiliation */}
      <section className="py-6">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="shadow-lg">
              <CardHeader className="text-center card-header">
                <CardTitle className="text-xl md:text-2xl tracking-tight">
                  Compteur du Programme d'Affiliation
                </CardTitle>
                <CardDescription className="text-sm md:text-base leading-relaxed">
                  Suivez vos performances et vos commissions
                </CardDescription>
              </CardHeader>
              <CardContent className="card-content">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 sm:gap-4 mb-3 sm:mb-6">
                  <Card className="bg-muted/20">
                    <CardHeader className="pb-1 sm:pb-2 p-2 sm:p-3 card-header">
                      <CardDescription>Total des commissions</CardDescription>
                      <CardTitle className="text-2xl md:text-3xl text-black dark:text-white font-semibold">
                        241 InnovX
                      </CardTitle>
                    </CardHeader>
                  </Card>

                  <Card className="bg-muted/20">
                    <CardHeader className="pb-1 sm:pb-2 p-2 sm:p-3 card-header">
                      <CardDescription>Affiliés recrutés</CardDescription>
                      <CardTitle className="text-2xl md:text-3xl text-black dark:text-white font-semibold">
                        24
                      </CardTitle>
                    </CardHeader>
                  </Card>

                  <Card className="bg-muted/20">
                    <CardHeader className="pb-1 sm:pb-2 p-2 sm:p-3 card-header">
                      <CardDescription>Niveau actuel</CardDescription>
                      <CardTitle className="text-2xl md:text-3xl text-black dark:text-white font-semibold">
                        Silver
                      </CardTitle>
                    </CardHeader>
                  </Card>
                </div>

                <h3 className="text-lg md:text-xl font-bold mb-3">Historique des commissions</h3>
                <div className="table-container overflow-x-auto">
                  <table className="w-full text-xs sm:text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2 w-1/5">Date</th>
                        <th className="text-left p-2 w-1/5">Source</th>
                        <th className="text-left p-2 w-1/5">Montant</th>
                        <th className="text-left p-2 w-2/5">Statut</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="p-2">15/03/23</td>
                        <td className="p-2">Vente</td>
                        <td className="p-2">30 InnovX</td>
                        <td className="p-2">
                          <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Payé</span>
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2">28/02/23</td>
                        <td className="p-2">Sous-aff.</td>
                        <td className="p-2">17 InnovX</td>
                        <td className="p-2">
                          <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Payé</span>
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2">10/02/23</td>
                        <td className="p-2">Vente</td>
                        <td className="p-2">44 InnovX</td>
                        <td className="p-2">
                          <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Payé</span>
                        </td>
                      </tr>
                      <tr>
                        <td className="p-2">05/04/23</td>
                        <td className="p-2">Vente</td>
                        <td className="p-2">36 InnovX</td>
                        <td className="p-2">
                          <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">
                            En attente
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="mt-6">
                  <h3 className="text-lg md:text-xl font-bold mb-3">Votre lien d'affiliation</h3>
                  <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 p-2 bg-muted/20 rounded-md">
                    <input
                      type="text"
                      value="https://innovx.com/ref/votre-id"
                      readOnly
                      className="flex-1 min-w-0 p-2 bg-transparent border-none focus:outline-none focus:ring-0 text-xs sm:text-sm overflow-x-auto whitespace-nowrap font-mono"
                    />
                    <Button variant="outline" size="sm" className="w-full sm:w-auto mt-2 sm:mt-0">
                      Copier
                    </Button>
                  </div>
                  <p className="text-xs md:text-sm text-muted-foreground mt-2">
                    Partagez ce lien pour gagner des commissions.
                  </p>
                  <ExternalLink />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Historiques et Soldes */}
      <section className="py-8">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 tracking-tight text-center">
              Tableau de bord financier
            </h2>

            {/* Soldes actuels */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <Card className="bg-muted/20">
                <CardHeader className="pb-2 p-3 card-header">
                  <CardDescription>Solde des entrées</CardDescription>
                  <CardTitle className="text-2xl md:text-3xl text-black dark:text-white font-semibold">
                    370 InnovX
                  </CardTitle>
                </CardHeader>
              </Card>

              <Card className="bg-muted/20">
                <CardHeader className="pb-2 p-3 card-header">
                  <CardDescription>Solde des sorties</CardDescription>
                  <CardTitle className="text-2xl md:text-3xl text-black dark:text-white font-semibold">
                    129 InnovX
                  </CardTitle>
                </CardHeader>
              </Card>

              <Card className="bg-muted/20">
                <CardHeader className="pb-2 p-3 card-header">
                  <CardDescription>Solde actuel</CardDescription>
                  <CardTitle className="text-2xl md:text-3xl text-black dark:text-white font-semibold">
                    241 InnovX
                  </CardTitle>
                </CardHeader>
              </Card>
            </div>

            {/* Historique des commissions entrantes */}
            <Card className="mb-8 shadow-md">
              <CardHeader className="card-header">
                <CardTitle className="text-xl font-bold">Historique des commissions entrantes</CardTitle>
                <CardDescription>Détail des commissions générées</CardDescription>
              </CardHeader>
              <CardContent className="card-content">
                <div className="table-container overflow-x-auto">
                  <table className="w-full text-xs sm:text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2 w-1/6">Date</th>
                        <th className="text-left p-2 w-1/6">Affilié</th>
                        <th className="text-left p-2 w-1/6">Produit</th>
                        <th className="text-left p-2 w-1/6">Montant</th>
                        <th className="text-left p-2 w-1/6">Commission</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="p-2">15/03/23</td>
                        <td className="p-2">Amadou</td>
                        <td className="p-2">Formation</td>
                        <td className="p-2">200 InnovX</td>
                        <td className="p-2">30 InnovX</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2">28/02/23</td>
                        <td className="p-2">Fatou</td>
                        <td className="p-2">Coaching</td>
                        <td className="p-2">170 InnovX</td>
                        <td className="p-2">17 InnovX</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2">10/02/23</td>
                        <td className="p-2">Ibrahim</td>
                        <td className="p-2">Pack</td>
                        <td className="p-2">440 InnovX</td>
                        <td className="p-2">44 InnovX</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2">05/04/23</td>
                        <td className="p-2">Aminata</td>
                        <td className="p-2">Formation</td>
                        <td className="p-2">240 InnovX</td>
                        <td className="p-2">36 InnovX</td>
                      </tr>
                      <tr>
                        <td className="p-2">22/04/23</td>
                        <td className="p-2">Moussa</td>
                        <td className="p-2">Coaching</td>
                        <td className="p-2">300 InnovX</td>
                        <td className="p-2">45 InnovX</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="mt-4 text-right">
                  <Button variant="outline" size="sm">
                    Voir tout
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Historique des retraits */}
            <Card className="mb-8 shadow-md">
              <CardHeader className="card-header">
                <CardTitle className="text-xl font-bold">Historique des retraits</CardTitle>
                <CardDescription>Détail de vos retraits</CardDescription>
              </CardHeader>
              <CardContent className="card-content">
                <div className="table-container overflow-x-auto">
                  <table className="w-full text-xs sm:text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2 w-1/5">Date</th>
                        <th className="text-left p-2 w-1/5">Méthode</th>
                        <th className="text-left p-2 w-1/5">Montant</th>
                        <th className="text-left p-2 w-1/5">Frais</th>
                        <th className="text-left p-2 w-1/5">Statut</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="p-2">20/03/23</td>
                        <td className="p-2">InnovX</td>
                        <td className="p-2">90 InnovX</td>
                        <td className="p-2">0 InnovX</td>
                        <td className="p-2">
                          <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Complété</span>
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2">15/02/23</td>
                        <td className="p-2">InnovX</td>
                        <td className="p-2">60 InnovX</td>
                        <td className="p-2">0 InnovX</td>
                        <td className="p-2">
                          <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Complété</span>
                        </td>
                      </tr>
                      <tr>
                        <td className="p-2">10/04/23</td>
                        <td className="p-2">InnovX</td>
                        <td className="p-2">50 InnovX</td>
                        <td className="p-2">0 InnovX</td>
                        <td className="p-2">
                          <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">En cours</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="mt-4 text-right">
                  <Button variant="outline" size="sm">
                    Voir tout
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Coordonnées des affiliés */}
            <Card className="shadow-md">
              <CardHeader className="card-header">
                <CardTitle className="text-xl font-bold">Mes affiliés directs</CardTitle>
                <CardDescription>Coordonnées et performances</CardDescription>
              </CardHeader>
              <CardContent className="card-content">
                <div className="table-container overflow-x-auto">
                  <table className="w-full text-xs sm:text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2 w-1/6">Nom</th>
                        <th className="text-left p-2 w-1/6">Email</th>
                        <th className="text-left p-2 w-1/6">Tél.</th>
                        <th className="text-left p-2 w-1/6">Date</th>
                        <th className="text-left p-2 w-1/6">Comm.</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="p-2">Amadou</td>
                        <td className="p-2">
                          <span className="truncate-text">a.diallo@email.com</span>
                        </td>
                        <td className="p-2">+225 0712</td>
                        <td className="p-2">10/01/23</td>
                        <td className="p-2">90 InnovX</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2">Fatou</td>
                        <td className="p-2">
                          <span className="truncate-text">f.sow@email.com</span>
                        </td>
                        <td className="p-2">+225 0598</td>
                        <td className="p-2">15/01/23</td>
                        <td className="p-2">65 InnovX</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2">Ibrahim</td>
                        <td className="p-2">
                          <span className="truncate-text">i.toure@email.com</span>
                        </td>
                        <td className="p-2">+225 0123</td>
                        <td className="p-2">22/01/23</td>
                        <td className="p-2">116 InnovX</td>
                      </tr>
                      <tr>
                        <td className="p-2">Aminata</td>
                        <td className="p-2">
                          <span className="truncate-text">a.kone@email.com</span>
                        </td>
                        <td className="p-2">+225 0765</td>
                        <td className="p-2">05/02/23</td>
                        <td className="p-2">36 InnovX</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="mt-4 text-right">
                  <Button variant="outline" size="sm">
                    Voir tous
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-8">
        <div className="container px-4">
          <div className="text-center mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold mb-2">Comment ça fonctionne</h2>
            <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Notre programme d'affiliation est simple et rentable.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center bg-muted/10 p-4 rounded-lg border border-muted/20 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-full bg-innovx-yellow flex items-center justify-center text-innovx-black text-xl font-bold mx-auto mb-3 shadow-sm">
                1
              </div>
              <h3 className="text-lg font-bold mb-2">Inscrivez-vous</h3>
              <p className="text-sm text-foreground/80 leading-relaxed mx-auto">
                Créez votre compte et activez votre compte d'affilié.
              </p>
            </div>

            <div className="text-center bg-muted/10 p-4 rounded-lg border border-muted/20 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-full bg-innovx-yellow flex items-center justify-center text-innovx-black text-xl font-bold mx-auto mb-3 shadow-sm">
                2
              </div>
              <h3 className="text-lg font-bold mb-2">Partagez</h3>
              <p className="text-sm text-foreground/80 leading-relaxed mx-auto">
                Partagez votre lien d'affiliation avec votre réseau.
              </p>
            </div>

            <div className="text-center bg-muted/10 p-4 rounded-lg border border-muted/20 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-full bg-innovx-yellow flex items-center justify-center text-innovx-black text-xl font-bold mx-auto mb-3 shadow-sm">
                3
              </div>
              <h3 className="text-lg font-bold mb-2">Gagnez</h3>
              <p className="text-sm text-foreground/80 leading-relaxed mx-auto">
                Recevez des commissions pour chaque inscription via votre lien.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-8 bg-muted/30">
        <div className="container px-4">
          <div className="text-center mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold mb-2">Avantages du Programme</h2>
            <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
              Notre programme est l'un des plus avantageux du marché.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="card-header">
                <div className="icon-container">
                  <DollarSign className="h-5 w-5 icon-yellow" />
                </div>
                <CardTitle className="text-lg font-semibold">Commissions Généreuses</CardTitle>
                <CardDescription className="text-sm">Jusqu'à 30% de commission sur chaque vente</CardDescription>
              </CardHeader>
              <CardContent className="card-content">
                <p className="text-sm line-clamp-3">
                  Notre programme offre des taux de commission parmi les plus élevés du secteur, avec des paiements
                  rapides et transparents.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="card-header">
                <div className="icon-container">
                  <Users className="h-5 w-5 icon-yellow" />
                </div>
                <CardTitle className="text-lg font-semibold">Affiliation Multi-niveaux</CardTitle>
                <CardDescription className="text-sm">Gagnez sur les affiliés que vous recrutez</CardDescription>
              </CardHeader>
              <CardContent className="card-content">
                <p className="text-sm line-clamp-3">
                  Notre système vous permet de gagner des commissions sur les ventes générées par vos affiliés.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="card-header">
                <div className="icon-container">
                  <Award className="h-5 w-5 icon-yellow" />
                </div>
                <CardTitle className="text-lg font-semibold">Outils Marketing</CardTitle>
                <CardDescription className="text-sm">Ressources marketing professionnelles</CardDescription>
              </CardHeader>
              <CardContent className="card-content">
                <p className="text-sm line-clamp-3">
                  Nous fournissons des bannières et textes promotionnels pour vous aider à promouvoir efficacement.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Commission Structure */}
      <section className="py-8">
        <div className="container px-4">
          <div className="text-center mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold mb-2">Structure des Commissions</h2>
            <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
              Notre structure de commissions récompense votre engagement.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Card>
              <CardContent className="p-0">
                <div className="table-container overflow-x-auto">
                  <table className="w-full text-xs sm:text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2 w-1/3">Type</th>
                        <th className="text-left p-2 w-1/6">Taux</th>
                        <th className="text-left p-2 w-1/2">Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="p-2">Commission filleul</td>
                        <td className="p-2">3%</td>
                        <td className="p-2">Quand votre filleul paye des services</td>
                      </tr>
                      <tr>
                        <td className="p-2">Cashback</td>
                        <td className="p-2">3%</td>
                        <td className="p-2">Sur vos propres achats</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            <div className="mt-4 p-3 bg-yellow-50 dark:bg-black border border-yellow-200 dark:border-yellow-400/30 rounded-md">
              <p className="text-xs sm:text-sm font-medium text-yellow-800 dark:text-yellow-400">
                Important : Les bonus sont prélevés sur les bénéfices et non sur le prix de vente.
              </p>
            </div>

            <div className="mt-4 bg-muted/10 p-3 rounded-md border border-muted/20">
              <p className="text-xs sm:text-sm text-foreground/80 mb-2 leading-relaxed">
                <span className="font-medium text-foreground">•</span> Les bonus sont calculés à hauteur de 3% sur les
                bénéfices des achats de vos filleuls.
              </p>
              <p className="text-xs sm:text-sm text-foreground/80 leading-relaxed">
                <span className="font-medium text-foreground">•</span> Les paiements sont effectués en InnovX Coin.
                Minimum de retrait : 5 InnovX.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-8 bg-muted/30">
        <div className="container px-4">
          <div className="text-center mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold mb-2">Témoignages d'Affiliés</h2>
            <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
              Ce que nos affiliés disent de notre programme.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <Card className="h-full">
              <CardHeader className="card-header">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-primary/20 overflow-hidden flex-shrink-0">
                    <Image src="/placeholder.svg?height=40&width=40" alt="Avatar" width={40} height={40} />
                  </div>
                  <div>
                    <CardTitle className="text-sm sm:text-base">Mariam O.</CardTitle>
                    <CardDescription className="text-xs sm:text-sm">6 mois</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="card-content">
                <p className="italic text-xs sm:text-sm leading-relaxed line-clamp-3">
                  "Le programme m'a permis de générer un revenu complémentaire. Les outils marketing sont excellents."
                </p>
              </CardContent>
            </Card>

            <Card className="h-full">
              <CardHeader className="card-header">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-primary/20 overflow-hidden flex-shrink-0">
                    <Image src="/placeholder.svg?height=40&width=40" alt="Avatar" width={40} height={40} />
                  </div>
                  <div>
                    <CardTitle className="text-sm sm:text-base">Issouf K.</CardTitle>
                    <CardDescription className="text-xs sm:text-sm">1 an</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="card-content">
                <p className="italic text-xs sm:text-sm leading-relaxed line-clamp-3">
                  "J'apprécie la transparence du programme et la régularité des paiements. Les commissions sont
                  élevées."
                </p>
              </CardContent>
            </Card>

            <Card className="h-full sm:col-span-2 md:col-span-1">
              <CardHeader className="card-header">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-primary/20 overflow-hidden flex-shrink-0">
                    <Image src="/placeholder.svg?height=40&width=40" alt="Avatar" width={40} height={40} />
                  </div>
                  <div>
                    <CardTitle className="text-sm sm:text-base">Sophie C.</CardTitle>
                    <CardDescription className="text-xs sm:text-sm">3 mois</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="card-content">
                <p className="italic text-xs sm:text-sm leading-relaxed line-clamp-3">
                  "Même en tant que débutante, j'ai pu générer des revenus dès le premier mois grâce aux outils
                  fournis."
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-8">
        <div className="container px-4">
          <div className="text-center mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold mb-2">Questions Fréquentes</h2>
            <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
              Réponses aux questions courantes.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-sm sm:text-base font-medium leading-relaxed py-2">
                  Comment devenir affilié ?
                </AccordionTrigger>
                <AccordionContent className="text-xs sm:text-sm leading-relaxed">
                  Créez un compte InnovX, puis activez votre compte d'affilié dans votre espace membre. L'inscription
                  est gratuite.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger className="text-sm sm:text-base font-medium leading-relaxed py-2">
                  Quand suis-je payé ?
                </AccordionTrigger>
                <AccordionContent className="text-xs sm:text-sm leading-relaxed">
                  Les paiements sont effectués mensuellement, entre le 1er et le 5 du mois suivant, en InnovX Coin.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger className="text-sm sm:text-base font-medium leading-relaxed py-2">
                  Y a-t-il un minimum de paiement ?
                </AccordionTrigger>
                <AccordionContent className="text-xs sm:text-sm leading-relaxed">
                  Oui, le minimum est de 5 InnovX. Si vos commissions n'atteignent pas ce montant, elles seront
                  reportées.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger className="text-sm sm:text-base font-medium leading-relaxed py-2">
                  Puis-je promouvoir sur les réseaux sociaux ?
                </AccordionTrigger>
                <AccordionContent className="text-xs sm:text-sm leading-relaxed">
                  Absolument ! Nous encourageons l'utilisation des réseaux sociaux et fournissons des visuels optimisés.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-8 bg-background dark:bg-[#040504]" id="cta-section">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2
              className="text-2xl sm:text-3xl font-bold mb-4 opacity-0 transform translate-y-4 transition-all duration-1000 ease-out tracking-tight"
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
              Prêt à devenir affilié ?
            </h2>
            <p
              className="text-sm sm:text-base mb-6 opacity-0 transform translate-y-4 transition-all duration-1000 ease-out delay-300 leading-relaxed"
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
              Rejoignez notre programme d'affiliation dès aujourd'hui et commencez à gagner des commissions.
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
              <Link href="/register" className="w-full sm:w-auto">
                <button className="w-full bg-[#F8E061] text-black font-bold border-2 border-black rounded-2xl shadow-md transition-all duration-300 ease-in-out cursor-pointer text-center sm:text-base text-sm sm:py-5 sm:px-7 py-3 px-4 hover:shadow-lg hover:-translate-y-0.5">
                  Devenir affilié
                </button>
              </Link>
              <Link href="/contact" className="w-full sm:w-auto">
                <button className="w-full bg-[#F8E061] text-black font-bold border-2 border-black rounded-2xl shadow-md transition-all duration-300 ease-in-out cursor-pointer text-center sm:text-base text-sm sm:py-5 sm:px-7 py-3 px-4 hover:shadow-lg hover:-translate-y-0.5">
                  Nous contacter
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
