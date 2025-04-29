import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Conditions Générales de Vente | InnovX",
  description: "Consultez nos conditions générales de vente pour comprendre les modalités d'achat de nos services.",
}

export default function ConditionsVentePage() {
  return (
    <div className="container py-12 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Conditions Générales de Vente</h1>

      <div className="prose dark:prose-invert max-w-none">
        <h2>Article 1 : Champ d'application</h2>
        <p>
          Les présentes Conditions Générales de Vente (ci-après dénommées "CGV") régissent la fourniture des services
          proposés par InnovX SARL (ci-après dénommée "la Société") à ses Clients. Les CGV s'appliquent à toutes les
          commandes passées sur le site internet de la Société et constituent le contrat entre la Société et le Client.
        </p>

        <h2>Article 2 : Définitions</h2>
        <p>
          2.1. Société : InnovX SARL, dont le siège est situé à Réo, Secteur 3, Burkina Faso. La Société peut être
          contactée par email à l'adresse info@innovxpro.com et par téléphone au numéro (00226) 01073107 / 65539734.
        </p>
        <p>
          2.2. Site : Le site internet de la Société, accessible à partir de l'URL https://www.innovxpro.com, où sont
          présentés les services proposés par la Société.
        </p>
        <p>2.3. Utilisateur : Toute personne naviguant sur le Site.</p>
        <p>
          2.4. Service : Les prestations de services proposées par la Société, comprenant notamment les formations en
          ligne, les documents téléchargeables et l'accompagnement personnalisé.
        </p>
        <p>2.5. Commande : La souscription d'un Service par le Client auprès de la Société via le Site.</p>
        <p>
          2.6. Client : La personne physique ou morale, professionnelle ou non, souscrivant un Service auprès de la
          Société.
        </p>
        <p>
          2.7. CGV : Les présentes Conditions Générales de Vente, qui régissent la relation contractuelle entre la
          Société et ses Clients.
        </p>
        <p>
          2.8. Identifiants : Le nom d'utilisateur et le mot de passe fournis par la Société au Client pour accéder au
          Service souscrit.
        </p>
        <p>
          2.9. Partenaire : Tout partenaire professionnel avec qui la Société entretient une relation d'affaires dans le
          cadre de la fourniture du Service.
        </p>

        <h2>Article 3 : Commande</h2>
        <h3>3.1. Processus de commande</h3>
        <p>
          Le Client sélectionne le Service souhaité sur le Site et fournit les informations demandées, telles que ses
          coordonnées personnelles et les modalités de paiement. Le Client est responsable de l'exactitude des
          informations fournies.
        </p>

        <h3>3.2. Confirmation de commande</h3>
        <p>
          Une fois la commande validée, le Client reçoit un email de confirmation récapitulant sa commande et les
          informations relatives au Service souscrit.
        </p>

        <h3>3.3. Annulation de commande</h3>
        <p>
          La Société se réserve le droit de refuser ou d'annuler toute commande en cas de non-paiement, de violation des
          CGV ou de toute autre raison justifiée. Le Client peut également annuler sa commande en respectant les
          conditions spécifiées dans les CGV.
        </p>

        <h2>Article 4 : Modalités de livraison</h2>
        <h3>4.1. Lieu de livraison</h3>
        <p>Les Services sont délivrés en ligne via le Site. Aucune livraison physique n'est effectuée.</p>

        <h3>4.2. Délais de livraison</h3>
        <p>
          Les Services sont accessibles immédiatement après la confirmation de la commande, sauf indication contraire
          spécifiée sur le Site.
        </p>

        <h3>4.3. Frais de livraison</h3>
        <p>Aucun frais de livraison n'est facturé pour les Services délivrés en ligne.</p>

        <h2>Article 5 : Service</h2>
        <h3>5.1. Description du Service</h3>
        <p>
          Le Service proposé par la Société est décrit en détail sur le Site. Il peut s'agir de formations en ligne, de
          documents téléchargeables ou d'un accompagnement personnalisé.
        </p>

        <h3>5.2. Accès au Service</h3>
        <p>
          Une fois la commande validée, le Client reçoit les identifiants lui permettant d'accéder au Service souscrit.
          Les identifiants sont strictement personnels et ne doivent pas être partagés avec d'autres personnes.
        </p>

        <h3>5.3. Suspension du Service</h3>
        <p>
          La Société se réserve le droit de suspendre ou de limiter l'accès au Service en cas de non-respect des CGV par
          le Client ou en cas de maintenance du Site ou de problèmes techniques indépendants de sa volonté.
        </p>

        <h2>Article 6 : Conditions tarifaires</h2>
        <p>
          Pour plus de détails sur nos conditions tarifaires, veuillez consulter la section dédiée sur notre site ou
          nous contacter directement.
        </p>

        <h2>Article 7 : Rétractation</h2>
        <p>
          Pour plus d'informations sur votre droit de rétractation, veuillez consulter notre politique de remboursement
          ou nous contacter directement.
        </p>

        <h2>Article 8 : Responsabilités et limitations</h2>
        <p>
          Pour plus de détails sur nos responsabilités et limitations, veuillez consulter nos conditions générales
          d'utilisation.
        </p>

        <h2>Article 9 : Propriété intellectuelle</h2>
        <p>
          Tous les droits de propriété intellectuelle liés au Site et au Service, y compris les contenus, les documents
          et les supports pédagogiques, appartiennent à la Société. Le Client s'engage à ne pas utiliser, reproduire ou
          distribuer ces éléments sans l'autorisation écrite préalable de la Société.
        </p>

        <h2>Article 10 : Protection des données personnelles</h2>
        <p>
          La Société collecte et traite les données personnelles du Client conformément à sa politique de
          confidentialité. Le Client reconnaît avoir pris connaissance de cette politique et accepte les conditions de
          collecte et de traitement de ses données personnelles.
        </p>

        <h2>Article 11 : Force majeure</h2>
        <p>
          Aucune des parties ne pourra être tenue responsable de tout retard ou de toute inexécution résultant d'un cas
          de force majeure, tel que défini par la loi.
        </p>

        <h2>Article 12 : Litiges</h2>
        <p>
          En cas de litige entre la Société et le Client, les parties s'engagent à rechercher une solution amiable. À
          défaut d'accord amiable, le litige sera soumis aux tribunaux compétents conformément à la législation en
          vigueur.
        </p>

        <p>
          <strong>Dernière mise à jour :</strong> 20/04/2024
        </p>

        <p>
          &copy; {new Date().getFullYear()} InnovX SARL. N° RCCM : BF-KDG-01-2024-B12-0053, N° IFU : 002493545. Tous
          droits réservés.
        </p>
      </div>
    </div>
  )
}
