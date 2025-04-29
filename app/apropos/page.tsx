"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Users, Target, Award, Briefcase } from "lucide-react"
import { useTheme } from "next-themes"

export default function AProposPage() {
  // Dans la fonction du composant, ajouter cette ligne après les autres déclarations d'état
  const { theme } = useTheme()
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="py-8 bg-muted/10">
        <div className="container">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-2">À Propos d'InnovX</h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Découvrez notre histoire, notre mission et notre vision pour l'avenir de la technologie et de l'éducation
              au Burkina Faso.
            </p>
          </div>
        </div>
      </section>

      {/* About Us */}
      <section className="py-16">
        <div className="container">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-6">Notre Histoire</h2>
              <p className="mb-4">
                InnovX a été fondée en 2023 avec une vision claire : démocratiser l'accès à la technologie et à
                l'éducation de qualité au Burkina Faso et en Afrique de l'Ouest.
              </p>
              <p className="mb-4">
                Face aux défis d'accès à la formation et aux services technologiques dans la région, nos fondateurs ont
                décidé de créer une plateforme multifonctionnelle qui intègre formations, services, marketplace,
                publicité et technologies blockchain.
              </p>
              <p>
                Aujourd'hui, InnovX est devenue une référence dans le domaine de l'innovation technologique et de la
                formation professionnelle, avec une communauté grandissante d'utilisateurs et de partenaires.
              </p>
            </div>
            <div className="md:w-1/2">
              <Image
                src="/placeholder.svg?height=400&width=500"
                alt="Histoire d'InnovX"
                width={500}
                height={400}
                className="rounded-lg object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Notre Mission & Vision</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Nous sommes guidés par des valeurs fortes et une vision ambitieuse pour l'avenir.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-innovx-yellow flex items-center justify-center mb-4">
                  <Target className="h-6 w-6 text-black" />
                </div>
                <CardTitle>Notre Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Notre mission est de démocratiser l'accès à la technologie et à l'éducation de qualité en Afrique de
                  l'Ouest, en offrant une plateforme multifonctionnelle qui répond aux besoins des individus et des
                  entreprises.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-black flex-shrink-0 mt-0.5" />
                    <span>Fournir des formations de qualité accessibles à tous</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-black flex-shrink-0 mt-0.5" />
                    <span>Faciliter l'échange de services et de compétences</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-black flex-shrink-0 mt-0.5" />
                    <span>Promouvoir l'innovation technologique locale</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-innovx-yellow flex items-center justify-center mb-4">
                  <Award className="h-6 w-6 text-black" />
                </div>
                <CardTitle>Notre Vision</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Notre vision est de devenir la plateforme de référence en Afrique de l'Ouest pour l'éducation, les
                  services et l'innovation technologique, en contribuant activement au développement économique et
                  social de la région.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-black flex-shrink-0 mt-0.5" />
                    <span>Créer un écosystème numérique complet et inclusif</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-black flex-shrink-0 mt-0.5" />
                    <span>Former la prochaine génération de talents africains</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-black flex-shrink-0 mt-0.5" />
                    <span>Intégrer les technologies blockchain pour plus de transparence</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Nos Valeurs</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Nos valeurs fondamentales guident chacune de nos actions et décisions.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="text-center">
                <div className="w-12 h-12 rounded-full bg-innovx-yellow flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-6 w-6 text-black" />
                </div>
                <CardTitle>Intégrité</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p>
                  Nous agissons avec honnêteté et transparence dans toutes nos interactions avec nos utilisateurs,
                  partenaires et collaborateurs.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <div className="w-12 h-12 rounded-full bg-innovx-yellow flex items-center justify-center mx-auto mb-4">
                  <Users className="h-6 w-6 text-black" />
                </div>
                <CardTitle>Inclusion</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p>
                  Nous croyons que la technologie et l'éducation doivent être accessibles à tous, indépendamment de leur
                  origine, genre ou statut social.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <div className="w-12 h-12 rounded-full bg-innovx-yellow flex items-center justify-center mx-auto mb-4">
                  <Target className="h-6 w-6 text-black" />
                </div>
                <CardTitle>Innovation</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p>
                  Nous encourageons la créativité et l'innovation pour résoudre les défis locaux et créer des solutions
                  adaptées à notre contexte.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <div className="w-12 h-12 rounded-full bg-innovx-yellow flex items-center justify-center mx-auto mb-4">
                  <Briefcase className="h-6 w-6 text-black" />
                </div>
                <CardTitle>Excellence</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p>
                  Nous visons l'excellence dans tous nos services et formations, en maintenant des standards élevés de
                  qualité.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Notre Équipe</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Découvrez les personnes passionnées qui font d'InnovX une réalité.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="text-center pb-2">
                <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4">
                  <Image
                    src="/placeholder.svg?height=96&width=96"
                    alt="Photo de profil"
                    width={96}
                    height={96}
                    className="object-cover w-full h-full"
                  />
                </div>
                <CardTitle>Amadou Konaté</CardTitle>
                <CardDescription>Fondateur & CEO</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm">
                  Expert en technologie avec plus de 10 ans d'expérience dans le développement de solutions numériques
                  innovantes.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center pb-2">
                <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4">
                  <Image
                    src="/placeholder.svg?height=96&width=96"
                    alt="Photo de profil"
                    width={96}
                    height={96}
                    className="object-cover w-full h-full"
                  />
                </div>
                <CardTitle>Fatima Traoré</CardTitle>
                <CardDescription>Directrice des Opérations</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm">
                  Spécialiste en gestion d'entreprise avec une expertise dans l'optimisation des processus et la
                  satisfaction client.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center pb-2">
                <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4">
                  <Image
                    src="/placeholder.svg?height=96&width=96"
                    alt="Photo de profil"
                    width={96}
                    height={96}
                    className="object-cover w-full h-full"
                  />
                </div>
                <CardTitle>Ibrahim Diallo</CardTitle>
                <CardDescription>Directeur Technique</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm">
                  Ingénieur en informatique passionné par les technologies blockchain et l'intelligence artificielle.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-8">
            <Button variant="outline" asChild>
              <Link href="/contact">Rencontrer toute l'équipe</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Our Partners */}
      <section className="py-16">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Nos Partenaires</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Nous collaborons avec des organisations de premier plan pour offrir les meilleurs services à nos
              utilisateurs.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="flex items-center justify-center p-4 bg-background rounded-lg border">
              <Image
                src="/placeholder.svg?height=60&width=120"
                alt="Logo partenaire"
                width={120}
                height={60}
                className="opacity-70 hover:opacity-100 transition-opacity"
              />
            </div>
            <div className="flex items-center justify-center p-4 bg-background rounded-lg border">
              <Image
                src="/placeholder.svg?height=60&width=120"
                alt="Logo partenaire"
                width={120}
                height={60}
                className="opacity-70 hover:opacity-100 transition-opacity"
              />
            </div>
            <div className="flex items-center justify-center p-4 bg-background rounded-lg border">
              <Image
                src="/placeholder.svg?height=60&width=120"
                alt="Logo partenaire"
                width={120}
                height={60}
                className="opacity-70 hover:opacity-100 transition-opacity"
              />
            </div>
            <div className="flex items-center justify-center p-4 bg-background rounded-lg border">
              <Image
                src="/placeholder.svg?height=60&width=120"
                alt="Logo partenaire"
                width={120}
                height={60}
                className="opacity-70 hover:opacity-100 transition-opacity"
              />
            </div>
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
              Rejoignez l'aventure InnovX
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
              Que vous soyez un apprenant, un prestataire de services ou un partenaire potentiel, nous serions ravis de
              vous accueillir dans notre communauté.
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
    </div>
  )
}
