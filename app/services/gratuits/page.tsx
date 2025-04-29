import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function ServicesGratuitsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="py-8 bg-muted/10">
        <div className="container">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-2">Consultance INNOVX</h1>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container max-w-4xl">
          <div className="prose prose-lg mx-auto dark:prose-invert">
            <p>
              Chez InnovX SARL, nous comprenons que dans le secteur industriel, chaque minute compte et que l'efficacité
              opérationnelle est essentielle à votre InnovX SARL m'engage à transformer vos défis techniques en
              opportunités de croissance.
            </p>

            <p className="font-bold mt-6 mb-4">Nos services de consultance incluent :</p>

            <p>
              <strong>Diagnostic approfondi de vos systèmes :</strong> Nous analysons minutieusement vos installations
              pour identifier les points d'amélioration, assurant ainsi une performance optimale.
            </p>

            <p>
              <strong>Élaboration de stratégies de maintenance sur mesure :</strong> Nous développons des plans de
              maintenance préventive et corrective adaptés à vos besoins spécifiques, réduisant les temps d'arrêt et
              augmentant la durée de vie de vos équipements.
            </p>

            <p>
              <strong>Formation et accompagnement de vos équipes :</strong> Nous renforçons les compétences de votre
              personnel en leur fournissant les outils et les connaissances nécessaires pour maintenir des standards
              élevés de performance.
            </p>

            <p>
              <strong>Intégration de technologies innovantes :</strong> Nous vous aidons à adopter des solutions
              technologiques avancées pour améliorer l'efficacité et la fiabilité de vos opérations.
            </p>

            <p className="mt-6">
              Collaborer avec InnovX SARL, c'est choisir un partenaire dédié à l'excellence opérationnelle et à
              l'innovation. Notre approche personnalisée garantit des solutions adaptées à vos défis uniques, vous
              permettant de vous concentrer sur votre cœur de métier tout en assurant une performance industrielle
              optimale.
            </p>

            <p>
              Ne laissez pas les problèmes techniques freiner votre croissance. Cliquez sur le lien ci-dessous pour
              découvrir comment nos services de consultance peuvent propulser votre entreprise vers de nouveaux sommets.
            </p>

            <div className="flex justify-center my-8">
              <Button
                size="lg"
                asChild
                className="bg-primary text-primary-foreground hover:bg-primary/90 dark:bg-yellow-400 dark:text-black dark:hover:bg-yellow-500"
              >
                <Link href="/contact">Demandez une consultance dès maintenant</Link>
              </Button>
            </div>

            <p className="text-center font-semibold">Ensemble, transformons vos défis en succès durables.</p>
          </div>
        </div>
      </section>
    </div>
  )
}
