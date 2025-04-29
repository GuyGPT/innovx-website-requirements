"use client"
import { Check, Star } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import styles from "./consultance.module.css"

export default function ConsultancePage() {
  return (
    <div className={styles.consultanceContainer}>
      <header className={styles.consultanceHeader}>
        <h1 className={styles.consultanceTitle}>Services de Consultance InnovX</h1>
        <p className={styles.consultanceSubtitle}>
          Expertise professionnelle pour vous guider dans l'univers de la blockchain et des cryptomonnaies
        </p>
      </header>

      <div className={styles.servicesGrid}>
        {/* Service 1 */}
        <div className={styles.serviceCard}>
          <div className={styles.serviceCardHeader}>
            <h2 className={styles.serviceCardTitle}>Consultation Personnalisée</h2>
          </div>
          <div className={styles.serviceCardContent}>
            <p>Obtenez des conseils adaptés à votre situation spécifique et à vos objectifs.</p>
            <ul className={styles.serviceCardFeatures}>
              <li className={styles.serviceCardFeature}>
                <Check className={styles.featureIcon} size={16} />
                <span>Analyse de votre portefeuille</span>
              </li>
              <li className={styles.serviceCardFeature}>
                <Check className={styles.featureIcon} size={16} />
                <span>Stratégies d'investissement</span>
              </li>
              <li className={styles.serviceCardFeature}>
                <Check className={styles.featureIcon} size={16} />
                <span>Recommandations personnalisées</span>
              </li>
            </ul>
          </div>
          <div className={styles.serviceCardFooter}>
            <Button className={styles.ctaButton}>Réserver une consultation</Button>
          </div>
        </div>

        {/* Service 2 */}
        <div className={styles.serviceCard}>
          <div className={styles.serviceCardHeader}>
            <h2 className={styles.serviceCardTitle}>Formation Entreprise</h2>
          </div>
          <div className={styles.serviceCardContent}>
            <p>Formez votre équipe aux technologies blockchain et aux opportunités qu'elles offrent.</p>
            <ul className={styles.serviceCardFeatures}>
              <li className={styles.serviceCardFeature}>
                <Check className={styles.featureIcon} size={16} />
                <span>Ateliers sur mesure</span>
              </li>
              <li className={styles.serviceCardFeature}>
                <Check className={styles.featureIcon} size={16} />
                <span>Formation technique</span>
              </li>
              <li className={styles.serviceCardFeature}>
                <Check className={styles.featureIcon} size={16} />
                <span>Cas d'usage pour votre secteur</span>
              </li>
            </ul>
          </div>
          <div className={styles.serviceCardFooter}>
            <Button className={styles.ctaButton}>Demander un devis</Button>
          </div>
        </div>

        {/* Service 3 */}
        <div className={styles.serviceCard}>
          <div className={styles.serviceCardHeader}>
            <h2 className={styles.serviceCardTitle}>Audit de Projets</h2>
          </div>
          <div className={styles.serviceCardContent}>
            <p>Évaluation complète de votre projet blockchain ou crypto pour identifier les opportunités et risques.</p>
            <ul className={styles.serviceCardFeatures}>
              <li className={styles.serviceCardFeature}>
                <Check className={styles.featureIcon} size={16} />
                <span>Analyse technique</span>
              </li>
              <li className={styles.serviceCardFeature}>
                <Check className={styles.featureIcon} size={16} />
                <span>Évaluation économique</span>
              </li>
              <li className={styles.serviceCardFeature}>
                <Check className={styles.featureIcon} size={16} />
                <span>Recommandations d'amélioration</span>
              </li>
            </ul>
          </div>
          <div className={styles.serviceCardFooter}>
            <Button className={styles.ctaButton}>Demander un audit</Button>
          </div>
        </div>
      </div>

      {/* Témoignages */}
      <section className={styles.testimonialSection}>
        <header className={styles.testimonialHeader}>
          <h2 className={styles.testimonialTitle}>Ce que disent nos clients</h2>
          <p className={styles.testimonialSubtitle}>
            Découvrez les expériences de ceux qui ont bénéficié de nos services de consultance
          </p>
        </header>

        <div className={styles.testimonialGrid}>
          {/* Témoignage 1 */}
          <div className={styles.testimonialCard}>
            <div className="flex mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} className="text-[#F8E061] fill-[#F8E061]" />
              ))}
            </div>
            <p className={styles.testimonialContent}>
              "Grâce aux conseils d'InnovX, j'ai pu optimiser mon portefeuille et comprendre les mécanismes de la DeFi."
            </p>
            <p className={styles.testimonialAuthor}>Thomas L.</p>
            <p className={styles.testimonialRole}>Investisseur particulier</p>
          </div>

          {/* Témoignage 2 */}
          <div className={styles.testimonialCard}>
            <div className="flex mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} className="text-[#F8E061] fill-[#F8E061]" />
              ))}
            </div>
            <p className={styles.testimonialContent}>
              "La formation blockchain pour notre équipe a été un véritable catalyseur pour notre transformation
              numérique."
            </p>
            <p className={styles.testimonialAuthor}>Marie D.</p>
            <p className={styles.testimonialRole}>Directrice Innovation, Entreprise XYZ</p>
          </div>

          {/* Témoignage 3 */}
          <div className={styles.testimonialCard}>
            <div className="flex mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} className="text-[#F8E061] fill-[#F8E061]" />
              ))}
            </div>
            <p className={styles.testimonialContent}>
              "L'audit de notre projet a révélé des opportunités d'amélioration cruciales que nous n'avions pas
              identifiées."
            </p>
            <p className={styles.testimonialAuthor}>Alexandre B.</p>
            <p className={styles.testimonialRole}>Fondateur de Startup</p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className={styles.faqSection}>
        <header className={styles.faqHeader}>
          <h2 className={styles.faqTitle}>Questions fréquentes</h2>
          <p className={styles.faqSubtitle}>
            Trouvez des réponses aux questions les plus courantes sur nos services de consultance
          </p>
        </header>

        <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto">
          <AccordionItem value="item-1">
            <AccordionTrigger>Comment se déroule une consultation personnalisée ?</AccordionTrigger>
            <AccordionContent>
              Nos consultations personnalisées commencent par un entretien initial pour comprendre vos besoins et
              objectifs. Nous analysons ensuite votre situation actuelle et préparons des recommandations sur mesure.
              Une session de suivi est incluse pour répondre à vos questions après la mise en œuvre des recommandations.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Quels sont les tarifs de vos services ?</AccordionTrigger>
            <AccordionContent>
              Nos tarifs varient en fonction de la complexité et de l'étendue des services requis. Nous proposons des
              forfaits adaptés aux particuliers et aux entreprises. Contactez-nous pour obtenir un devis personnalisé en
              fonction de vos besoins spécifiques.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Combien de temps dure un audit de projet ?</AccordionTrigger>
            <AccordionContent>
              La durée d'un audit dépend de la complexité du projet. En général, un audit complet prend entre 1 et 3
              semaines. Nous commençons par une analyse préliminaire, suivie d'une évaluation approfondie et d'un
              rapport détaillé avec des recommandations.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>Proposez-vous des services à l'international ?</AccordionTrigger>
            <AccordionContent>
              Oui, nous proposons nos services de consultance à l'échelle internationale. Les consultations peuvent se
              faire à distance via des plateformes de visioconférence. Pour les formations et audits plus importants,
              nous pouvons également nous déplacer sur site.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      {/* Contact */}
      <section className={styles.contactSection}>
        <header className={styles.contactHeader}>
          <h2 className={styles.contactTitle}>Prêt à commencer ?</h2>
          <p className={styles.contactSubtitle}>Contactez-nous pour discuter de vos besoins en consultance</p>
        </header>

        <form className={styles.contactForm}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className={styles.formGroup}>
              <label htmlFor="name" className={styles.formLabel}>
                Nom
              </label>
              <input type="text" id="name" className={styles.formInput} required />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.formLabel}>
                Email
              </label>
              <input type="email" id="email" className={styles.formInput} required />
            </div>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="subject" className={styles.formLabel}>
              Sujet
            </label>
            <input type="text" id="subject" className={styles.formInput} required />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="message" className={styles.formLabel}>
              Message
            </label>
            <textarea id="message" className={styles.formTextarea} required></textarea>
          </div>
          <Button type="submit" className={styles.submitButton}>
            Envoyer
          </Button>
        </form>
      </section>
    </div>
  )
}
