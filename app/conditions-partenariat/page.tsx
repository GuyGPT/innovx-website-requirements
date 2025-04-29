import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Conditions de Partenariat | InnovX",
  description: "Découvrez nos conditions de partenariat et comment devenir partenaire d'InnovX.",
}

export default function ConditionsPartenariatPage() {
  return (
    <div className="container py-12 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Conditions de Partenariat</h1>

      <div className="prose dark:prose-invert max-w-none">
        <h2>Article 1 : Utilisation du Site Web en tant que Partenaire</h2>
        <p>
          En tant que partenaire d'InnovX, vous pouvez utiliser notre site web (ci-après dénommé "le Site") comme canal
          d'activité ou de publicité pour promouvoir vos produits, services ou projets conformément aux termes du
          partenariat établis dans les Conditions Générales de Partenariat. Cette opportunité vous est offerte moyennant
          le versement de frais annuels déterminés en fonction de la fréquence d'activité que vous prévoyez sur le Site.
        </p>

        <h2>Article 2 : Montants des Frais de Partenariat</h2>
        <p>
          En tant que partenaire d'InnovX, vous bénéficiez d'un accès privilégié à notre réseau et à nos services pour
          propulser votre entreprise vers le succès. Les frais annuels à verser par les partenaires seront déterminés
          entre 10 000F CFA et 25 000F CFA, en fonction de la fréquence d'activité prévue sur notre Site. Ces montants
          seront convenus en accord avec InnovX et devront être réglés chaque fin d'année pour maintenir votre statut de
          partenaire actif.
        </p>
        <p>
          Les versements des montants de partenariat sont destinés à assurer l'entretien du site web et à soutenir le
          travail abattu en arrière-plan par l'équipe technique d'InnovX pour maintenir la qualité et les performances
          du site.
        </p>

        <h2>Article 3 : Obligations du Partenaire</h2>
        <p>En tant que partenaire d'InnovX, vous vous engagez à respecter les conditions suivantes :</p>
        <ul>
          <li>
            <strong>Utilisation Conforme :</strong> Vous utiliserez le Site Web conformément aux termes et conditions
            spécifiés par InnovX, en évitant toute utilisation abusive ou frauduleuse.
          </li>
          <li>
            <strong>Informations Exactes :</strong> Vous fournirez des informations précises et à jour concernant vos
            produits, services ou projets, et vous vous assurerez que toute information communiquée est véridique.
          </li>
          <li>
            <strong>Conformité Légale :</strong> Vous vous engagez à respecter les lois et réglementations applicables
            dans le cadre de vos activités sur le Site et à ne pas proposer des produits ou services illégaux ou
            nuisibles.
          </li>
          <li>
            <strong>Respect des Engagements :</strong> Le partenaire s'engage à respecter les engagements financiers et
            contractuels établis dans le partenariat avec InnovX. Tout manquement à ces engagements pourra entraîner la
            suspension ou la résiliation du partenariat.
          </li>
          <li>
            <strong>Confidentialité :</strong> Vous traiterez comme confidentielles toutes les informations non
            publiques relatives à InnovX auxquelles vous pourriez avoir accès en tant que partenaire.
          </li>
        </ul>

        <h2>Article 4 : Obligations d'InnovX</h2>
        <p>En tant qu'InnovX, nous nous engageons à :</p>
        <ul>
          <li>
            <strong>Accès au Site :</strong> Fournir un accès sécurisé au Site Web pour que vous puissiez y promouvoir
            vos produits, services ou projets en tant que partenaire actif.
          </li>
          <li>
            <strong>Transactions Financières :</strong> Traiter de manière confidentielle et sécurisée les transactions
            financières liées à votre activité sur le Site.
          </li>
          <li>
            <strong>Communication :</strong> Vous informer de toute modification des conditions d'utilisation du Site
            Web par écrit ou par un moyen de communication approprié.
          </li>
        </ul>

        <h2>Article 5 : Confidentialité</h2>
        <p>
          Vous vous engagez à traiter comme confidentielles toutes les informations non publiques relatives à InnovX
          auxquelles vous pourriez avoir accès en tant que partenaire. Ces informations ne devront pas être divulguées à
          des tiers sans le consentement écrit préalable d'InnovX.
        </p>

        <h2>Article 6 : Responsabilité</h2>
        <p>
          InnovX n'assume aucune responsabilité quant aux activités, produits ou services proposés par les partenaires
          sur le Site. Chaque partenaire est responsable de ses activités, de la qualité de ses produits ou services,
          ainsi que du respect des lois et réglementations applicables.
        </p>

        <h2>Article 7 : Modification des Conditions d'utilisation</h2>
        <p>
          InnovX se réserve le droit de modifier les présentes conditions d'utilisation du Site à tout moment. Toute
          modification sera notifiée aux partenaires par écrit ou par un moyen de communication approprié. En continuant
          à utiliser le Site après la notification des modifications, vous acceptez les conditions d'utilisation
          modifiées.
        </p>

        <p>
          <strong>Dernière mise à jour :</strong> 20/04/2024
        </p>

        <p>
          En utilisant le Site Web en tant que partenaire, vous reconnaissez avoir lu, compris et accepté les présentes
          conditions générales de partenariat et d'utilisation du Site Web d'InnovX.
        </p>
      </div>
    </div>
  )
}
