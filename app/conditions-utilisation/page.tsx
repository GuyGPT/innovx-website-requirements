import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Conditions Générales d'Utilisation | InnovX",
  description:
    "Consultez nos conditions générales d'utilisation pour comprendre les règles d'utilisation de notre plateforme.",
}

export default function ConditionsUtilisationPage() {
  return (
    <div className="container py-12 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Conditions Générales d'Utilisation</h1>

      <div className="prose dark:prose-invert max-w-none">
        <h2>Article 1: Introduction</h2>
        <p>
          Les présentes conditions générales d'utilisation régissent votre utilisation des services d'audits, de
          formations, de nouvelles technologies, de sites web externes et d'autres activités connexes (ci-après dénommés
          collectivement "les Services") proposés par InnovX. En utilisant nos Services, vous acceptez d'être lié par
          ces conditions. Veuillez les lire attentivement avant de procéder.
        </p>

        <h2>Article 2: Description des Services</h2>
        <p>
          InnovX propose une gamme complète de services dans le domaine des hautes technologies. Nos Services
          comprennent :
        </p>

        <ol>
          <li>
            <strong>Audits :</strong> Nous effectuons des audits approfondis pour évaluer les infrastructures
            technologiques, les processus opérationnels et les systèmes de sécurité des entreprises clientes. Ces audits
            nous permettent d'identifier les lacunes, de proposer des recommandations et de mettre en œuvre des
            solutions pour améliorer leurs performances technologiques.
          </li>
          <li>
            <strong>Formations :</strong> Nous proposons des formations spécialisées destinées à renforcer les
            compétences techniques des professionnels et des entreprises dans divers domaines des hautes technologies.
            Ces formations sont conçues pour fournir des connaissances approfondies, des compétences pratiques et des
            meilleures pratiques pour relever les défis technologiques actuels.
          </li>
          <li>
            <strong>Conseils en Nouvelles Technologies :</strong> Nous offrons des conseils et des solutions sur mesure
            liés aux nouvelles technologies émergentes. Notre équipe d'experts vous accompagnera dans l'identification
            et la mise en place de solutions innovantes pour stimuler la croissance et la compétitivité de votre
            entreprise.
          </li>
          <li>
            <strong>Sites Web Externes :</strong> Nous sommes spécialisés dans la création, la conception et la
            maintenance de sites web externes pour nos clients. Nos services comprennent le développement de sites web
            personnalisés, l'intégration de fonctionnalités avancées, l'optimisation pour les moteurs de recherche (SEO)
            et la sécurité des sites.
          </li>
          <li>
            <strong>Activités Connexes :</strong> Nous proposons également d'autres activités connexes, telles que des
            consultations stratégiques, des évaluations de projets, des analyses de rentabilité et des services de
            support technique pour répondre aux besoins spécifiques de nos clients.
          </li>
        </ol>

        <h2>Article 3: Utilisation des Services</h2>
        <p>
          En utilisant nos Services, vous acceptez de les utiliser uniquement à des fins légales et conformément à ces
          conditions générales d'utilisation. Vous vous engagez à ne pas utiliser nos Services de manière abusive,
          frauduleuse, diffamatoire, illégale ou contraire à l'éthique. Vous êtes responsable de toutes les activités
          effectuées sous votre compte et vous devez protéger les informations d'identification de votre compte.
        </p>

        <h2>Article 4: Droits de Propriété Intellectuelle</h2>
        <p>
          Tous les droits de propriété intellectuelle associés à nos Services, y compris les contenus, les marques, les
          logos, les documents et les ressources, sont la propriété exclusive d'InnovX ou de ses partenaires. Vous
          reconnaissez et acceptez que tous les droits de propriété intellectuelle liés à nos Services restent la
          propriété de leur détenteur respectif. Vous vous engagez à respecter ces droits et à ne pas reproduire,
          distribuer, modifier ou exploiter de quelque manière que ce soit ces éléments sans l'autorisation préalable
          écrite de leur propriétaire.
        </p>

        <h2>Article 5: Liens vers des Sites Web Externes</h2>
        <p>
          Notre site web peut contenir des liens vers des sites web externes qui ne sont pas contrôlés ou exploités par
          InnovX. Nous ne sommes pas responsables du contenu, de la sécurité ou de la confidentialité de ces sites web
          externes. Vous accédez à ces sites web externes à vos propres risques et vous êtes soumis aux conditions
          d'utilisation spécifiques de ces sites. Nous vous encourageons à lire attentivement les politiques de
          confidentialité et les conditions d'utilisation de ces sites web externes avant de les utiliser.
        </p>

        <h2>Article 6: Responsabilité</h2>
        <p>
          InnovX s'efforce de fournir des Services de haute qualité, mais ne peut garantir des résultats spécifiques.
          Dans la mesure maximale permise par la loi, nous déclinons toute responsabilité en cas de perte, de dommage,
          de responsabilité ou de dépenses découlant de l'utilisation de nos Services, sauf en cas de négligence grave
          ou de faute intentionnelle.
        </p>

        <h2>Article 7: Modification des Services et des Conditions</h2>
        <p>
          InnovX se réserve le droit de modifier, de suspendre ou d'interrompre tout ou partie de ses services à tout
          moment, sans préavis. Nous nous réservons également le droit de modifier ces conditions générales
          d'utilisation à tout moment. Toutes les modifications entreront en vigueur dès leur publication sur notre site
          web. Il est de votre responsabilité de consulter régulièrement les conditions mises à jour. Votre utilisation
          continue de nos services après toute modification constitue votre acceptation des nouvelles conditions.
        </p>

        <h2>Article 8: Confidentialité</h2>
        <p>
          La collecte, l'utilisation et la divulgation de vos informations personnelles sont régies par notre politique
          de confidentialité séparée. Veuillez consulter cette politique pour comprendre comment nous traitons vos
          informations personnelles.
        </p>

        <p>
          Si vous avez des questions ou des préoccupations concernant nos services ou ces conditions générales
          d'utilisation, veuillez nous contacter à <a href="mailto:info@innovxpro.com">info@innovxpro.com</a>.
        </p>

        <p>
          <strong>Dernière mise à jour :</strong> 20/04/2024
        </p>

        <p>Nous vous remercions de votre confiance et de votre compréhension concernant nos services.</p>
      </div>
    </div>
  )
}
