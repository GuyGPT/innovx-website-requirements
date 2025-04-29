"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, MapPin, Clock, Megaphone, BriefcaseBusiness, CalendarDays, Star } from "lucide-react"
import { useTheme } from "next-themes"
import SearchInput from "@/components/search-input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

const events = [
  {
    id: 1,
    title: "Salon de l'Innovation Technologique",
    category: "Technologie",
    date: "15 Juin 2024",
    time: "09:00 - 18:00",
    location: "Centre des congrès, Ouagadougou",
    image: "/placeholder.svg?height=200&width=300",
    description: "Découvrez les dernières innovations technologiques et rencontrez des experts du secteur.",
  },
  {
    id: 2,
    title: "Forum de l'Emploi",
    category: "Emploi",
    date: "22 Juillet 2024",
    time: "10:00 - 17:00",
    location: "Hôtel Splendide, Bobo-Dioulasso",
    image: "/placeholder.svg?height=200&width=300",
    description: "Rencontrez des recruteurs et découvrez des opportunités d'emploi dans divers secteurs.",
  },
  {
    id: 3,
    title: "Conférence sur l'Entrepreneuriat",
    category: "Business",
    date: "5 Août 2024",
    time: "14:00 - 18:00",
    location: "Université de Ouagadougou",
    image: "/placeholder.svg?height=200&width=300",
    description: "Apprenez des entrepreneurs à succès et développez votre réseau professionnel.",
  },
  {
    id: 4,
    title: "Festival des Arts Numériques",
    category: "Culture",
    date: "18-20 Septembre 2024",
    time: "Toute la journée",
    location: "Parc de la Culture, Ouagadougou",
    image: "/placeholder.svg?height=200&width=300",
    description: "Exposition d'art numérique, performances et ateliers créatifs.",
  },
  {
    id: 5,
    title: "Séminaire sur la Finance Digitale",
    category: "Finance",
    date: "10 Octobre 2024",
    time: "09:00 - 16:00",
    location: "Centre d'affaires, Koudougou",
    image: "/placeholder.svg?height=200&width=300",
    description: "Découvrez les nouvelles tendances en matière de finance digitale et de crypto-monnaies.",
  },
  {
    id: 6,
    title: "Hackathon InnovX",
    category: "Technologie",
    date: "25-26 Novembre 2024",
    time: "48 heures non-stop",
    location: "Campus InnovX, Ouagadougou",
    image: "/placeholder.svg?height=200&width=300",
    description: "Participez à notre hackathon annuel et développez des solutions innovantes.",
  },
]

const jobs = [
  {
    id: 1,
    title: "Développeur Full Stack",
    company: "TechInnovate",
    location: "Ouagadougou",
    type: "Temps plein",
    salary: "400,000 - 600,000 FCFA",
    posted: "Il y a 2 jours",
    image: "/placeholder.svg?height=60&width=60",
    description: "Nous recherchons un développeur Full Stack expérimenté pour rejoindre notre équipe.",
  },
  {
    id: 2,
    title: "Responsable Marketing Digital",
    company: "MediaGroup",
    location: "Bobo-Dioulasso",
    type: "Temps plein",
    salary: "350,000 - 500,000 FCFA",
    posted: "Il y a 5 jours",
    image: "/placeholder.svg?height=60&width=60",
    description: "Gérez nos campagnes de marketing digital et développez notre présence en ligne.",
  },
  {
    id: 3,
    title: "Comptable",
    company: "Finance Plus",
    location: "Ouagadougou",
    type: "Temps plein",
    salary: "300,000 - 450,000 FCFA",
    posted: "Il y a 1 semaine",
    image: "/placeholder.svg?height=60&width=60",
    description: "Nous recherchons un comptable qualifié pour rejoindre notre cabinet comptable.",
  },
  {
    id: 4,
    title: "Designer UX/UI",
    company: "CreativeStudio",
    location: "Ouagadougou",
    type: "Freelance",
    salary: "Selon projet",
    posted: "Il y a 3 jours",
    image: "/placeholder.svg?height=60&width=60",
    description: "Créez des interfaces utilisateur intuitives et esthétiques pour nos clients.",
  },
]

export default function PublicitePage() {
  const [activeTab, setActiveTab] = useState("events")
  // Dans la fonction du composant, ajouter cette ligne après les autres déclarations d'état
  const { theme } = useTheme()

  const [isRatingDialogOpen, setIsRatingDialogOpen] = useState(false)
  const [selectedRating, setSelectedRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [currentEvent, setCurrentEvent] = useState(null)

  const handleRateClick = (event) => {
    setCurrentEvent(event)
    setIsRatingDialogOpen(true)
  }

  const handleRatingSubmit = () => {
    console.log(`Événement ${currentEvent?.title} noté avec ${selectedRating} étoiles`)
    setIsRatingDialogOpen(false)
    setSelectedRating(0)
    setHoveredRating(0)
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="py-8 bg-muted/10">
        <div className="container">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-2">Publicité InnovX</h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Découvrez les événements à venir, les offres d'emploi et publiez vos propres annonces sur notre
              plateforme.
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
                placeholder="Rechercher..."
                className="pl-3 pr-12 bg-white text-black placeholder:text-gray-500 focus:border-innovx-yellow dark:border-0 dark:bg-black dark:text-white"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container">
          <Tabs
            defaultValue="events"
            className="w-full"
            value={activeTab}
            onValueChange={(value) => setActiveTab(value)}
          >
            {/* Version desktop - visible uniquement sur md et plus */}
            <TabsList className="hidden md:flex md:items-center md:justify-center mb-8 justify-center bg-[#F8E061] text-black rounded-md p-4 px-6 gap-3 min-h-[70px] dark:bg-[#F8E061] dark:text-black dark:rounded-md dark:p-4 dark:px-6 dark:gap-3 dark:min-h-[70px]">
              <TabsTrigger
                value="ads"
                className="h-10 px-4 py-2 bg-white text-black hover:bg-gray-100 border-2 border-black m-1 dark:bg-white dark:text-black dark:data-[state=active]:bg-[#F8E061] dark:data-[state=active]:text-black dark:border-2 dark:border-black dark:m-1"
              >
                Annonces
              </TabsTrigger>
              <TabsTrigger
                value="events"
                className="h-10 px-4 py-2 bg-white text-black hover:bg-gray-100 border-2 border-black m-1 dark:bg-white dark:text-black dark:data-[state=active]:bg-[#F8E061] dark:data-[state=active]:text-black dark:border-2 dark:border-black dark:m-1"
              >
                Événements
              </TabsTrigger>
              <TabsTrigger
                value="jobs"
                className="h-10 px-4 py-2 bg-white text-black hover:bg-gray-100 border-2 border-black m-1 dark:bg-white dark:text-black dark:data-[state=active]:bg-[#F8E061] dark:data-[state=active]:text-black dark:border-2 dark:border-black dark:m-1"
              >
                Offres
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
                }}
              >
                <option value="ads">Annonces</option>
                <option value="events">Événements</option>
                <option value="jobs">Offres</option>
              </select>
            </div>

            {/* Events Tab */}
            <TabsContent value="events" id="events">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Événements à venir</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Découvrez les événements à venir et ne manquez aucune opportunité de networking et d'apprentissage.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.map((event) => (
                  <Card key={event.id} className="overflow-hidden">
                    <div className="aspect-video relative">
                      <Image src={event.image || "/placeholder.svg"} alt={event.title} fill className="object-cover" />
                    </div>
                    <CardHeader>
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-xs font-medium px-2 py-1 rounded-full bg-innovx-yellow text-innovx-black">
                          {event.category}
                        </span>
                      </div>
                      <CardTitle className="text-xl">{event.title}</CardTitle>
                      <CardDescription>{event.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>{event.date}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span>{event.location}</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/publicite/events/${event.id}`}>Plus d'informations</Link>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleRateClick(event)}
                        className="flex items-center gap-1"
                      >
                        <Star className="h-4 w-4" /> Notez
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>

              <div className="mt-8 text-center">
                <Button variant="outline" asChild>
                  <Link href="/publicite/events">Voir tous les événements</Link>
                </Button>
              </div>
            </TabsContent>

            {/* Jobs Tab */}
            <TabsContent value="jobs">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Offres d'emploi</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Trouvez votre prochain emploi ou publiez vos offres pour recruter les meilleurs talents.
                </p>
              </div>

              <div className="space-y-6">
                {jobs.map((job) => (
                  <Card key={job.id}>
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row gap-4 items-start">
                        <div className="w-16 h-16 rounded-md bg-muted flex-shrink-0 overflow-hidden">
                          <Image
                            src={job.image || "/placeholder.svg"}
                            alt={job.company}
                            width={60}
                            height={60}
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold mb-1">{job.title}</h3>
                          <p className="text-muted-foreground mb-2">{job.company}</p>
                          <div className="flex flex-wrap gap-2 mb-3">
                            <span className="text-xs px-2 py-1 rounded-full bg-innovx-yellow text-innovx-black">
                              {job.location}
                            </span>
                            <span className="text-xs px-2 py-1 rounded-full bg-innovx-yellow text-innovx-black">
                              {job.type}
                            </span>
                            <span className="text-xs px-2 py-1 rounded-full bg-innovx-yellow text-innovx-black">
                              {job.salary}
                            </span>
                          </div>
                          <p className="text-sm mb-4">{job.description}</p>
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-muted-foreground">{job.posted}</span>
                            <Button asChild>
                              <Link href={`/publicite/jobs/${job.id}`}>Postuler</Link>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="mt-8 text-center">
                <Button variant="outline" asChild>
                  <Link href="/publicite/jobs">Voir toutes les offres</Link>
                </Button>
              </div>
            </TabsContent>

            {/* Ads Tab */}
            <TabsContent value="ads">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Annonces</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Parcourez les annonces ou publiez les vôtres pour atteindre un large public.
                </p>
              </div>

              <div className="bg-muted/30 rounded-lg p-8 text-center">
                <Megaphone className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-xl font-bold mb-2">Publiez votre annonce</h3>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  Atteignez des milliers d'utilisateurs InnovX en publiant votre annonce sur notre plateforme.
                </p>
                <Button asChild>
                  <Link href="/register">
                    <span
                      style={{
                        color: "white",
                      }}
                    >
                      Publier une annonce
                    </span>
                  </Link>
                </Button>
              </div>

              <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Sample ads would go here */}
                <Card>
                  <CardHeader>
                    <CardTitle>Vente de matériel informatique</CardTitle>
                    <CardDescription>Ordinateurs, imprimantes et accessoires à prix compétitifs</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4">
                      Notre entreprise propose du matériel informatique neuf et reconditionné avec garantie. Livraison
                      disponible à Ouagadougou.
                    </p>
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>Ouagadougou, Secteur 15</span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      Contacter l'annonceur
                    </Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Formation en développement web</CardTitle>
                    <CardDescription>Apprenez à créer des sites web en 4 semaines</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4">
                      Formation intensive en développement web. HTML, CSS, JavaScript et PHP. Places limitées,
                      inscrivez-vous dès maintenant.
                    </p>
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>Début: 15 Juillet 2024</span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      Contacter l'annonceur
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Publish Section */}
      <section className="py-16 bg-primary/10">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-4">Publiez sur InnovX</h2>
              <p className="mb-6">
                Atteignez un large public en publiant vos événements, offres d'emploi ou annonces sur notre plateforme.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <Card className="bg-background">
                  <CardHeader className="pb-2">
                    <div className="w-10 h-10 rounded-full bg-innovx-yellow flex items-center justify-center mb-2">
                      <CalendarDays className="h-5 w-5 text-black" />
                    </div>
                    <CardTitle className="text-lg">Événements</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-sm text-muted-foreground">Publiez vos événements et attirez des participants.</p>
                  </CardContent>
                </Card>

                <Card className="bg-background">
                  <CardHeader className="pb-2">
                    <div className="w-10 h-10 rounded-full bg-innovx-yellow flex items-center justify-center mb-2">
                      <BriefcaseBusiness className="h-5 w-5 text-black" />
                    </div>
                    <CardTitle className="text-lg">Emplois</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-sm text-muted-foreground">
                      Recrutez les meilleurs talents pour votre entreprise.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-background">
                  <CardHeader className="pb-2">
                    <div className="w-10 h-10 rounded-full bg-innovx-yellow flex items-center justify-center mb-2">
                      <Megaphone className="h-5 w-5 text-black" />
                    </div>
                    <CardTitle className="text-lg">Annonces</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-sm text-muted-foreground">Faites la promotion de vos produits et services.</p>
                  </CardContent>
                </Card>
              </div>
              <Button asChild>
                <Link href="/register">Commencer à publier</Link>
              </Button>
            </div>
            <div className="md:w-1/2">
              <Image
                src="/placeholder.svg?height=400&width=500"
                alt="Publier sur InnovX"
                width={500}
                height={400}
                className="rounded-lg object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Tarifs de publication</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Choisissez le forfait qui correspond à vos besoins de publication.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="text-center pb-2">
                <CardTitle>Basique</CardTitle>
                <div className="text-3xl font-bold mt-2">
                  5,000 FCFA
                  <span className="text-sm font-normal text-muted-foreground">/publication</span>
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center text-xs">✓</div>
                    <span>1 publication standard</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center text-xs">✓</div>
                    <span>Visible pendant 7 jours</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center text-xs">✓</div>
                    <span>Statistiques de base</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>{/* Bouton "Choisir" supprimé */}</CardFooter>
            </Card>

            <Card className="border-primary relative">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary text-primary-foreground px-3 py-1 text-xs font-medium rounded-full">
                Populaire
              </div>
              <CardHeader className="text-center pb-2">
                <CardTitle>Standard</CardTitle>
                <div className="text-3xl font-bold mt-2">
                  12,000 FCFA
                  <span className="text-sm font-normal text-muted-foreground">/mois</span>
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center text-xs">✓</div>
                    <span>5 publications par mois</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center text-xs">✓</div>
                    <span>Visible pendant 15 jours chacune</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center text-xs">✓</div>
                    <span>Mise en avant dans les résultats</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center text-xs">✓</div>
                    <span>Statistiques détaillées</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>{/* Bouton "Choisir" supprimé */}</CardFooter>
            </Card>

            <Card>
              <CardHeader className="text-center pb-2">
                <CardTitle>Premium</CardTitle>
                <div className="text-3xl font-bold mt-2">
                  25,000 FCFA
                  <span className="text-sm font-normal text-muted-foreground">/mois</span>
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center text-xs">✓</div>
                    <span>Publications illimitées</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center text-xs">✓</div>
                    <span>Visible pendant 30 jours chacune</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center text-xs">✓</div>
                    <span>Placement prioritaire</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center text-xs">✓</div>
                    <span>Statistiques avancées</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center text-xs">✓</div>
                    <span>Support dédié</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>{/* Bouton "Choisir" supprimé */}</CardFooter>
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
              Prêt à publier sur InnovX ?
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
              Créez votre compte dès maintenant et commencez à publier vos événements, offres d'emploi et annonces.
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
              <Link href="/register">
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
                  Créer un compte
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

      {/* Boîte de dialogue de notation */}
      <Dialog open={isRatingDialogOpen} onOpenChange={setIsRatingDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Noter cet événement</DialogTitle>
            <DialogDescription>Donnez votre avis sur "{currentEvent?.title}"</DialogDescription>
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
