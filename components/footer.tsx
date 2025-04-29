import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail, Phone, MapPin } from "lucide-react"
import { FacebookIcon, TelegramIcon, XIcon, WhatsAppIcon } from "@/components/social-icons"
// Ajouter l'import pour ExternalLink
import ExternalLink from "./external-link-disclaimer"

export default function Footer() {
  return (
    <footer className="bg-[#F8E061] dark:bg-[#040504] dark:border-t dark:border-yellow-500/20 text-foreground">
      <div className="container py-12 pb-4 md:py-16 md:pb-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-4">
          <div className="md:col-span-1 px-2">
            <h3 className="text-xl font-bold mb-4">InnovX</h3>
            <p className="text-sm mb-4 text-muted-foreground">
              Plateforme multifonctionnelle intégrant services, formations, marketplace, publicité et nouvelles
              technologies.
            </p>
            {/* Remplacer les liens des réseaux sociaux par ExternalLink */}
            {/* Modifier la section des liens sociaux comme suit: */}
            <div className="flex space-x-4">
              <ExternalLink
                href="https://www.facebook.com/share/1AhMSMG34H/"
                className="text-foreground hover:text-black dark:hover:text-[#F8E061] hover:font-medium"
              >
                <FacebookIcon />
                <span className="sr-only">Facebook</span>
              </ExternalLink>
              <ExternalLink
                href="https://t.me/innovxcoin"
                className="text-foreground hover:text-black dark:hover:text-[#F8E061] hover:font-medium"
              >
                <TelegramIcon />
                <span className="sr-only">Telegram</span>
              </ExternalLink>
              <ExternalLink
                href="https://x.com/innovxcoin?t=tVKJSet8RGMV0cujYTClDw&s=09"
                className="text-foreground hover:text-black dark:hover:text-[#F8E061] hover:font-medium"
              >
                <XIcon />
                <span className="sr-only">X</span>
              </ExternalLink>
              <ExternalLink
                href="https://chat.whatsapp.com/K3nbSIZK0LQDzh0iqmREZZ"
                className="text-foreground hover:text-black dark:hover:text-[#F8E061] hover:font-medium"
              >
                <WhatsAppIcon />
                <span className="sr-only">WhatsApp</span>
              </ExternalLink>
            </div>
          </div>

          <div className="md:col-span-1 px-2">
            <h3 className="text-xl font-bold mb-4">Liens Rapides</h3>
            <div className="grid grid-cols-2 gap-x-8 gap-y-2">
              <Link
                href="/"
                className="text-sm hover:text-black dark:hover:text-[#F8E061] hover:font-medium text-muted-foreground"
              >
                Accueil
              </Link>
              <Link
                href="/services"
                className="text-sm hover:text-black dark:hover:text-[#F8E061] hover:font-medium text-muted-foreground"
              >
                Services
              </Link>
              <Link
                href="/coaching"
                className="text-sm hover:text-black dark:hover:text-[#F8E061] hover:font-medium text-muted-foreground"
              >
                Coaching
              </Link>
              <Link
                href="/marketplace"
                className="text-sm hover:text-black dark:hover:text-[#F8E061] hover:font-medium text-muted-foreground"
              >
                Marketplace
              </Link>
              <Link
                href="/formations"
                className="text-sm hover:text-black dark:hover:text-[#F8E061] hover:font-medium text-muted-foreground"
              >
                Formations
              </Link>
              <Link
                href="/crypto"
                className="text-sm hover:text-black dark:hover:text-[#F8E061] hover:font-medium text-muted-foreground"
              >
                InnovX Coin
              </Link>
              <Link
                href="/publicite"
                className="text-sm hover:text-black dark:hover:text-[#F8E061] hover:font-medium text-muted-foreground"
              >
                Publicité
              </Link>
              <Link
                href="/affiliation"
                className="text-sm hover:text-black dark:hover:text-[#F8E061] hover:font-medium text-muted-foreground"
              >
                Affiliation
              </Link>
              <Link
                href="/apropos"
                className="text-sm hover:text-black dark:hover:text-[#F8E061] hover:font-medium text-muted-foreground"
              >
                À propos
              </Link>
            </div>
          </div>

          <div className="md:col-span-1 px-2">
            <h3 className="text-xl font-bold mb-4">Mentions légales</h3>
            <div className="grid grid-cols-1 gap-y-2">
              <Link
                href="/politique-confidentialite"
                className="text-sm hover:text-black dark:hover:text-[#F8E061] hover:font-medium text-muted-foreground text-left"
              >
                Politique de Confidentialité
              </Link>
              <Link
                href="/conditions-utilisation"
                className="text-sm hover:text-black dark:hover:text-[#F8E061] hover:font-medium text-muted-foreground text-left"
              >
                Conditions Générales D'Utilisation
              </Link>
              <Link
                href="/conditions-vente"
                className="text-sm hover:text-black dark:hover:text-[#F8E061] hover:font-medium text-muted-foreground text-left"
              >
                Conditions Générales de Vente
              </Link>
              <Link
                href="/conditions-remboursement"
                className="text-sm hover:text-black dark:hover:text-[#F8E061] hover:font-medium text-muted-foreground text-left"
              >
                Conditions Générales de Remboursement
              </Link>
              <Link
                href="/conditions-partenariat"
                className="text-sm hover:text-black dark:hover:text-[#F8E061] hover:font-medium text-muted-foreground text-left"
              >
                Conditions de Partenariat
              </Link>
            </div>
          </div>

          <div className="md:col-span-1 px-2">
            <h3 className="text-xl font-bold mb-4">Contact</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 flex-shrink-0" />
                <span>Réo, Secteur 3, Burkina Faso</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <span>(00226) 01073107 / 65539734</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4 flex-shrink-0" />
                <span>info@innovxpro.com</span>
              </div>
            </div>
          </div>

          <div className="md:col-span-1 px-2">
            <h3 className="text-xl font-bold mb-4">Newsletter</h3>
            <p className="text-sm mb-4 text-muted-foreground">Abonnez-vous pour recevoir nos actualités.</p>
            <div className="flex flex-col space-y-2">
              <Input type="email" placeholder="Votre email" className="bg-background border-input" />
              <Button className="w-full">S'abonner</Button>
            </div>
          </div>
        </div>

        <div className="border-t border-muted mt-8 pt-4 text-center text-sm text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} InnovX SARL. N° RCCM : BF-KDG-01-2024-B12-0053, N° IFU : 002493545. Tous
            droits réservés.
          </p>
        </div>
      </div>
    </footer>
  )
}
