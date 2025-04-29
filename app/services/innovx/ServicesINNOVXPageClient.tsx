"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Settings, Code, FileText, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import UnderConstructionLink from "@/components/under-construction-link"
import { useChatBot } from "@/components/chat-bot-provider"

export default function ServicesINNOVXPageClient() {
  const { openChat } = useChatBot()

  const serviceCategories = [
    {
      title: "Maintenance Professionnelle",
      description: "Solutions complètes de maintenance pour vos installations",
      icon: <Settings className="h-8 w-8 text-yellow-600" />,
      services: [
        { title: "Packs de Maintenance", href: "/services/maintenance/packs" },
        { title: "Maintenance Électrique", href: "/services/maintenance/electrique" },
        { title: "Maintenance Froid et Climatisation", href: "/services/maintenance/climatisation" },
      ],
      bgClass: "bg-gradient-to-br from-yellow-50 to-yellow-100",
    },
    {
      title: "Services Numériques",
      description: "Solutions digitales pour votre transformation numérique",
      icon: <Code className="h-8 w-8 text-blue-600" />,
      services: [
        { title: "Développement Web", href: "/services/numeriques/web" },
        { title: "Maintenance en bureautique", href: "/services/numeriques/bureautique" },
        { title: "Transformation Digitale", href: "/services/numeriques/transformation" },
      ],
      bgClass: "bg-gradient-to-br from-yellow-50 to-yellow-100",
    },
    {
      title: "Services d'Affaires",
      description: "Support administratif et fournitures pour votre entreprise",
      icon: <FileText className="h-8 w-8 text-green-600" />,
      services: [
        { title: "Secrétariat Public", href: "/services/affaires/secretariat" },
        { title: "Librairie et Consommables", href: "/services/affaires/librairie" },
      ],
      bgClass: "bg-gradient-to-br from-yellow-50 to-yellow-100",
    },
    {
      title: "Énergie et Environnement",
      description: "Solutions durables pour l'efficacité énergétique",
      icon: <Zap className="h-8 w-8 text-orange-600" />,
      services: [
        { title: "Solutions Énergétiques", href: "/services/energie/solutions" },
        { title: "Suivi Technique", href: "/services/energie/suivi" },
      ],
      bgClass: "bg-gradient-to-br from-yellow-50 to-yellow-100",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-black">
      {/* Hero Section */}
      <div className="relative bg-yellow-400 dark:bg-yellow-600 overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-10 dark:bg-opacity-40"></div>
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=600&width=1200')] bg-cover bg-center opacity-10"></div>
        <div className="container relative z-10 py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-black dark:text-white mb-6">
              Services INNOVX
            </h1>
            <p className="text-xl md:text-2xl text-black/80 dark:text-white/80 max-w-2xl mx-auto">
              Des solutions professionnelles adaptées à vos besoins, conçues pour optimiser votre performance et votre
              croissance
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white dark:from-gray-900 to-transparent"></div>
      </div>

      {/* Main Content */}
      <div className="container py-16">
        <div className="grid gap-8 md:grid-cols-2">
          {serviceCategories.map((category, index) => (
            <Card
              key={index}
              className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <CardHeader
                className={`${category.bgClass} dark:bg-gray-800 dark:border-b dark:border-yellow-500/20 p-8`}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-full bg-white dark:bg-gray-700 shadow-md">{category.icon}</div>
                  <div>
                    <CardTitle className="text-2xl font-bold">{category.title}</CardTitle>
                    <CardDescription className="text-base mt-1">{category.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-8">
                <ul className="space-y-4">
                  {category.services.map((service, serviceIndex) => (
                    <li key={serviceIndex} className="group">
                      <UnderConstructionLink className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all">
                        <div className="flex items-center">
                          <span className="h-2 w-2 rounded-full bg-yellow-400 mr-3"></span>
                          <span className="font-medium group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors">
                            {service.title}
                          </span>
                        </div>
                        <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-transform group-hover:translate-x-1" />
                      </UnderConstructionLink>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 bg-gradient-to-r from-yellow-400 to-yellow-500 dark:from-yellow-600 dark:to-yellow-700 rounded-2xl overflow-hidden shadow-xl">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="p-8 md:p-12">
              <h2 className="text-3xl font-bold text-black dark:text-white mb-4">Besoin d'un service sur mesure?</h2>
              <p className="text-black/80 dark:text-white/80 mb-8">
                Nos experts sont à votre disposition pour élaborer des solutions adaptées à vos besoins spécifiques.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black">
                  Demander un devis
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-black text-black hover:bg-black/10 dark:border-white dark:text-white"
                  onClick={openChat}
                >
                  Nous contacter
                </Button>
              </div>
            </div>
            <div className="hidden md:block relative h-full min-h-[300px]">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="Service personnalisé"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
