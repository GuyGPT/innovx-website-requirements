import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Conditions Générales de Remboursement | InnovX",
  description:
    "Consultez nos conditions générales de remboursement pour comprendre notre politique de retour et de remboursement.",
}

export default function ConditionsRemboursementPage() {
  return (
    <div className="container py-12 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Conditions Générales de Remboursement</h1>

      <div className="prose dark:prose-invert max-w-none">
        <p className="lead">
          Chez InnovX, nous nous engageons à offrir des services de qualité et à assurer la satisfaction de nos clients.
          Nos conditions générales de remboursement sont conçues pour être équitables et transparentes.
        </p>

        <h2>1. Services Numériques</h2>
        <p>
          Pour les services numériques (formations en ligne, documents téléchargeables, etc.), un remboursement peut
          être accordé dans les 14 jours suivant l'achat, à condition que le contenu n'ait pas été consulté à plus de
          30%. Une fois cette limite dépassée, aucun remboursement ne sera accordé.
        </p>

        <h2>2. Services de Consultation</h2>
        <p>
          Pour les services de consultation, un remboursement peut être demandé avant la première session de
          consultation. Une fois la première session effectuée, des frais d'annulation de 30% seront appliqués. Aucun
          remboursement ne sera accordé après la deuxième session de consultation.
        </p>

        <h2>3. Formations en Présentiel</h2>
        <p>
          Pour les formations en présentiel, un remboursement complet peut être accordé si l'annulation est effectuée au
          moins 7 jours avant la date de la formation. Pour les annulations effectuées entre 3 et 7 jours avant la
          formation, un remboursement de 50% sera accordé. Aucun remboursement ne sera accordé pour les annulations
          effectuées moins de 3 jours avant la formation.
        </p>

        <h2>4. Produits Physiques</h2>
        <p>
          Pour les produits physiques, un remboursement peut être accordé dans les 14 jours suivant la réception du
          produit, à condition que le produit soit retourné dans son état d'origine, non utilisé et dans son emballage
          d'origine. Les frais de retour sont à la charge du client.
        </p>

        <h2>5. Cas Particuliers</h2>
        <p>
          Dans certains cas particuliers (problèmes techniques, erreurs de facturation, etc.), un remboursement peut
          être accordé en dehors des délais mentionnés ci-dessus. Ces cas seront évalués individuellement par notre
          équipe de service client.
        </p>

        <h2>6. Procédure de Remboursement</h2>
        <p>
          Pour demander un remboursement, veuillez contacter notre service client à l'adresse email info@innovxpro.com
          en indiquant votre numéro de commande et le motif de votre demande de remboursement. Nous traiterons votre
          demande dans les plus brefs délais.
        </p>

        <h2>7. Délai de Remboursement</h2>
        <p>
          Une fois votre demande de remboursement approuvée, le remboursement sera effectué dans un délai de 14 jours
          ouvrables, sur le même moyen de paiement que celui utilisé lors de l'achat.
        </p>

        <h2>8. Droit de Rétractation</h2>
        <p>
          Conformément à la législation en vigueur, vous disposez d'un délai de 14 jours à compter de la date d'achat
          pour exercer votre droit de rétractation, sans avoir à justifier de motifs ni à payer de pénalités. Ce droit
          de rétractation ne s'applique pas aux services entièrement exécutés avant la fin du délai de rétractation ou
          aux produits personnalisés.
        </p>

        <p>
          <strong>Dernière mise à jour :</strong> 20/04/2024
        </p>

        <p>
          Pour toute question concernant nos conditions générales de remboursement, n'hésitez pas à contacter notre
          service client à l'adresse email <a href="mailto:info@innovxpro.com">info@innovxpro.com</a>.
        </p>
      </div>
    </div>
  )
}
