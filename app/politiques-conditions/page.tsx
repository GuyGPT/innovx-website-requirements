export default function PolitiquesConditionsPage() {
  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 md:p-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Politiques et Conditions d'Utilisation</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-8 text-center">
          Dernière mise à jour : 21 avril 2025
        </p>

        <div className="prose dark:prose-invert max-w-none">
          <h2 className="text-2xl font-bold mt-8 mb-4">1. Introduction</h2>
          <p className="mb-4">
            Bienvenue sur la plateforme InnovX. En accédant à notre site et en utilisant nos services, vous acceptez de
            vous conformer à ces politiques et conditions d'utilisation et de vous y tenir. Ces conditions s'appliquent
            à tous les visiteurs, utilisateurs et autres personnes qui accèdent ou utilisent notre service.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">2. Utilisation de la Cryptomonnaie InnovX</h2>
          <p className="mb-4">
            InnovX est une cryptomonnaie développée sur la blockchain Solana. En utilisant InnovX, vous reconnaissez
            comprendre les risques associés aux cryptomonnaies, notamment la volatilité des prix et les incertitudes
            réglementaires.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">2.1. Transactions</h3>
          <p className="mb-4">
            Toutes les transactions effectuées avec InnovX sont irrévocables et définitives. Nous ne sommes pas
            responsables des erreurs de transaction, y compris l'envoi à une adresse incorrecte ou la perte de clés
            privées.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">2.2. Sécurité</h3>
          <p className="mb-4">
            Vous êtes responsable de maintenir la sécurité de votre portefeuille et de vos clés privées. Nous vous
            recommandons fortement d'utiliser des méthodes d'authentification à deux facteurs et de sauvegarder vos clés
            privées dans un endroit sûr.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">3. Échanges et Conversions</h2>
          <p className="mb-4">
            Les taux de change affichés sur notre plateforme sont indicatifs et peuvent varier. Nous nous efforçons de
            fournir les taux les plus précis et à jour, mais nous ne garantissons pas l'exactitude de ces informations à
            tout moment.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">3.1. Frais</h3>
          <p className="mb-4">
            Des frais peuvent s'appliquer aux transactions, conversions et autres opérations sur notre plateforme. Ces
            frais seront clairement indiqués avant la finalisation de toute transaction.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">4. Responsabilités de l'Utilisateur</h2>
          <p className="mb-4">En utilisant notre plateforme, vous acceptez de :</p>
          <ul className="list-disc pl-6 mb-4">
            <li className="mb-2">Ne pas utiliser notre service à des fins illégales ou non autorisées</li>
            <li className="mb-2">Ne pas violer les lois de votre juridiction</li>
            <li className="mb-2">Ne pas tenter de nuire à notre service ou à sa sécurité</li>
            <li className="mb-2">Fournir des informations exactes et à jour lors de l'inscription</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">5. Limitation de Responsabilité</h2>
          <p className="mb-4">
            InnovX SARL ne sera pas responsable des pertes ou dommages résultant de l'utilisation de notre plateforme, y
            compris mais sans s'y limiter, les pertes financières dues à la volatilité du marché, les problèmes
            techniques ou les erreurs de l'utilisateur.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">6. Modifications des Conditions</h2>
          <p className="mb-4">
            Nous nous réservons le droit de modifier ces conditions à tout moment. Les modifications prendront effet dès
            leur publication sur notre site. Il est de votre responsabilité de consulter régulièrement nos conditions
            pour rester informé des mises à jour.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">7. Contact</h2>
          <p className="mb-4">Si vous avez des questions concernant ces conditions, veuillez nous contacter à :</p>
          <p className="mb-1">Email : info@innovxpro.com</p>
          <p className="mb-6">Site Web : www.innovxpro.com</p>

          <p className="mt-8 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
            En utilisant notre plateforme, vous reconnaissez avoir lu, compris et accepté ces politiques et conditions
            d'utilisation.
          </p>
        </div>

        <div className="flex justify-center mt-8">
          <a
            href="/politiques-echanges"
            className="inline-block border-4 border-black px-8 py-4 text-black font-medium rounded hover:bg-gray-100 transition-colors bg-yellow-300"
          >
            Voir les politiques d'échange
          </a>
        </div>
      </div>
    </div>
  )
}
