import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Politique de Confidentialité | InnovX",
  description: "Découvrez notre politique de confidentialité et comment nous protégeons vos données personnelles.",
}

export default function PolitiqueConfidentialitePage() {
  return (
    <div className="container py-12 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Politique de Confidentialité</h1>

      <div className="prose dark:prose-invert max-w-none">
        <p className="lead">
          Chez InnovX, nous attachons une grande importance à la confidentialité et à la sécurité de vos informations
          personnelles. Cette politique de confidentialité explique comment nous recueillons, utilisons, divulguons et
          protégeons vos informations lors de votre utilisation de nos services.
        </p>

        <h2>1. Collecte des informations</h2>
        <p>
          Lorsque vous utilisez nos services ou interagissez avec notre site web, nous pouvons collecter des
          informations personnelles vous concernant. Cela peut inclure votre nom, votre adresse e-mail, votre numéro de
          téléphone, votre adresse postale et d'autres informations nécessaires pour fournir nos services et répondre à
          vos demandes. Nous recueillons ces informations de manière légitime et avec votre consentement.
        </p>

        <h2>2. Utilisation des informations</h2>
        <p>
          Nous utilisons les informations personnelles que nous collectons dans le but de fournir nos services, de
          répondre à vos demandes, de vous informer sur les mises à jour et les offres spéciales, et d'améliorer
          l'expérience globale de nos utilisateurs. Nous pouvons également utiliser ces informations à des fins internes
          telles que l'analyse des données, le développement de produits et l'amélioration de nos opérations.
        </p>

        <h2>3. Divulgation des informations</h2>
        <p>
          Nous ne vendons pas, ne louons pas et ne partageons pas vos informations personnelles avec des tiers à des
          fins de marketing, sauf si vous nous donnez votre consentement explicite. Cependant, nous pouvons divulguer
          vos informations dans les cas suivants : lorsque cela est requis par la loi, pour répondre à une demande
          légale ou pour protéger nos droits, notre propriété ou notre sécurité, ainsi que celle de nos utilisateurs.
        </p>

        <h2>4. Sécurité des informations</h2>
        <p>
          Nous prenons des mesures de sécurité appropriées pour protéger vos informations personnelles contre tout accès
          non autorisé, toute divulgation, altération ou destruction. Nous utilisons des protocoles de sécurité standard
          pour garantir la sécurité de vos informations lors de leur transmission sur Internet. Cependant, veuillez
          noter qu'aucune méthode de transmission sur Internet ou de stockage électronique n'est totalement sécurisée.
          Nous ne pouvons donc garantir une sécurité absolue des informations.
        </p>

        <h2>5. Cookies et technologies similaires</h2>
        <p>
          Nous utilisons des cookies et d'autres technologies similaires pour améliorer votre expérience sur notre site
          web. Les cookies sont de petits fichiers texte qui sont stockés sur votre appareil lorsque vous visitez notre
          site. Ils nous aident à personnaliser le contenu, à analyser les tendances, à gérer le site, et à collecter
          des informations démographiques sur nos utilisateurs. Vous pouvez modifier vos paramètres de cookies dans
          votre navigateur, mais veuillez noter que certaines fonctionnalités de notre site peuvent ne pas fonctionner
          correctement sans l'utilisation de cookies.
        </p>

        <h2>6. Liens externes</h2>
        <p>
          Notre site web peut contenir des liens vers des sites tiers. Veuillez noter que nous ne sommes pas
          responsables des pratiques de confidentialité de ces sites. Nous vous encourageons à lire les politiques de
          confidentialité de ces sites tiers avant de fournir vos informations personnelles.
        </p>

        <h2>7. Consentement et modifications</h2>
        <p>
          En utilisant nos services ou en fournissant vos informations personnelles, vous consentez à la collecte, à
          l'utilisation et à la divulgation de vos informations conformément à cette politique de confidentialité. Nous
          nous réservons le droit de modifier cette politique de confidentialité à tout moment. Toutes les modifications
          seront publiées sur cette page, et votre utilisation continue de nos services après ces modifications
          constitue votre acceptation des nouvelles conditions.
        </p>

        <p>
          Si vous avez des questions ou des préoccupations concernant notre politique de confidentialité, veuillez nous
          contacter à l'adresse e-mail <a href="mailto:info@innovxpro.com">info@innovxpro.com</a>.
        </p>

        <p>
          <strong>Dernière mise à jour :</strong> 20/04/2024
        </p>

        <p>
          Nous vous remercions de votre confiance et de votre compréhension concernant notre politique de
          confidentialité.
        </p>
      </div>
    </div>
  )
}
