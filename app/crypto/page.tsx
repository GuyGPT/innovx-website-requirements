"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, ArrowUpDown, BarChart3, FileText, Archive, Phone, CreditCard, Award, ChevronRight } from "lucide-react"
import { useTheme } from "next-themes"
import ExternalLink, { useExternalLinkDisclaimer } from "@/components/external-link-disclaimer"
import { CurrencySelector, type CurrencyOption } from "@/components/currency-selector"

// Définir l'animation de brillance pour l'effet sur l'adresse du contrat
const shimmerAnimation = {
  "0%": { transform: "translateX(-100%)" },
  "100%": { transform: "translateX(100%)" },
}

export default function CryptoPage() {
  // Taux de change: 1 InnovX = 0.004 Fiat
  const exchangeRate = 0.004
  const [fiatAmount, setFiatAmount] = useState("")
  const [innovxAmount, setInnovxAmount] = useState("")
  const [receiveAddress, setReceiveAddress] = useState("")
  const [activeMenuItem, setActiveMenuItem] = useState("projet")

  // Ajouter ces états pour gérer le menu mobile déroulant
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Remplacer ces lignes
  // const [fromCurrency, setFromCurrency] = useState("orange_burkina")
  // const [toCurrency, setToCurrency] = useState("innovx")
  // const [fromCurrencyCode, setFromCurrencyCode] = useState("XOF (FCFA)")
  // const [toCurrencyCode, setToCurrencyCode] = useState("INNOVX")

  // Par celles-ci
  const [fromCurrency, setFromCurrency] = useState("")
  const [toCurrency, setToCurrency] = useState("innovx")
  const [fromCurrencyCode, setFromCurrencyCode] = useState("")
  const [toCurrencyCode, setToCurrencyCode] = useState("INNOVX")

  // Ajouter cet état avec les autres états au début du composant
  const [copied, setCopied] = useState(false)

  // Ajouter cet état avec les autres états au début du composant
  const [isPulsing, setIsPulsing] = useState(true)
  const [pulseCount, setPulseCount] = useState(0)

  // Ajouter cet état avec les autres états au début du composant
  const [termsAccepted, setTermsAccepted] = useState(false)

  // Add this state with the other states at the beginning of the component
  const [showConfirmation, setShowConfirmation] = useState(false)

  // Add a state variable to hold the InnovX Coin balance:
  const [innovxCoinBalance, setInnovxCoinBalance] = useState(1250000)

  // Ajouter cet état avec les autres états au début du composant
  const [showTermsModal, setShowTermsModal] = useState(false)

  // Définir les options de devises avec leurs chemins d'images
  const currencyOptions: CurrencyOption[] = [
    { value: "orange_burkina", label: "Orange Burkina", imagePath: "/images/currencies/orange_burkina.jpg" },
    { value: "moov_burkina", label: "Moov Burkina", imagePath: "/images/currencies/moov_burkina.jpg" },
    { value: "orange_ci", label: "Orange CI", imagePath: "/images/currencies/orange_ci.jpg" },
    { value: "moov_ci", label: "Moov CI", imagePath: "/images/currencies/moov_ci.jpg" },
    { value: "orange_cameroun", label: "Orange Cameroun", imagePath: "/images/currencies/orange_cameroun.jpg" },
    { value: "mtn_cameroun", label: "MTN Cameroun", imagePath: "/images/currencies/mtn_cameroun.jpg" },
    { value: "mtn", label: "MTN", imagePath: "/images/currencies/mtn.jpg" },
    { value: "visa", label: "Visa", imagePath: "/images/currencies/visa.jpg" },
    { value: "solana", label: "Solana", imagePath: "/images/currencies/solana.jpg" },
    { value: "innovx", label: "InnovX", imagePath: "/images/currencies/innovx.jpg" },
    { value: "bonus", label: "Bonus affiliation", imagePath: "/images/currencies/bonus.jpg" },
  ]

  // Effet pour animer le menu latéral au chargement de la page
  useEffect(() => {
    // Ouvrir le menu au chargement
    setMobileMenuOpen(true)

    // Fermer le menu après 1.5 secondes
    const timer = setTimeout(() => {
      setMobileMenuOpen(false)
    }, 1500)

    // Nettoyer le timer si le composant est démonté
    return () => clearTimeout(timer)
  }, []) // Exécuter uniquement au montage du composant

  // Ajouter cet effet après l'effet existant pour le menu mobile
  useEffect(() => {
    if (isPulsing) {
      // Créer un intervalle pour compter les pulsations
      const interval = setInterval(() => {
        setPulseCount((prev) => {
          // Arrêter après 7 pulsations
          if (prev >= 6) {
            clearInterval(interval)
            setIsPulsing(false)
            return prev
          }
          return prev + 1
        })
      }, 1000) // Chaque pulsation dure environ 1 seconde

      return () => clearInterval(interval)
    }
  }, [isPulsing])

  // Ajouter cet effet pour s'assurer que la page d'accueil est correctement chargée
  useEffect(() => {
    // Définir la page d'accueil par défaut
    setActiveMenuItem("projet")

    // Récupérer la page active depuis l'URL si elle existe
    const hash = window.location.hash.replace("#", "")
    if (hash && ["projet", "tokenomics", "roadmap", "explorateur", "acheter", "echanges", "contact"].includes(hash)) {
      setActiveMenuItem(hash)
    }
  }, [])

  useEffect(() => {
    // Simulate real-time balance updates
    const interval = setInterval(() => {
      // Random fluctuation between -1000 and +1000
      const fluctuation = Math.floor(Math.random() * 2000) - 1000
      setInnovxCoinBalance((prevBalance) => Math.max(0, prevBalance + fluctuation))
    }, 5000) // Update every 5 seconds

    return () => clearInterval(interval)
  }, [])

  const { theme } = useTheme()

  // Fonction pour convertir Fiat en InnovX
  const fiatToInnovx = (fiat) => {
    return fiat / exchangeRate
  }

  // Fonction pour convertir InnovX en Fiat
  const innovxToFiat = (innovx) => {
    return innovx * exchangeRate
  }

  // Update the handleCalculate function
  const handleCalculate = () => {
    setShowConfirmation(true)
  }

  // Add a new function to handle the actual calculation after confirmation
  const confirmCalculation = () => {
    if (fiatAmount !== "" && innovxAmount === "") {
      // Si seul le montant Fiat est renseigné, calculer l'équivalent en InnovX
      setInnovxAmount(fiatToInnovx(Number(fiatAmount)))
    } else if (fiatAmount === "" && innovxAmount !== "") {
      // Si seul le montant InnovX est renseigné, calculer l'équivalent en Fiat
      setFiatAmount(innovxToFiat(Number(innovxAmount)))
    } else if (fiatAmount !== "" && innovxAmount !== "") {
      // Si les deux sont renseignés, priorité au Fiat
      setInnovxAmount(fiatToInnovx(Number(fiatAmount)))
    }

    // Close the confirmation popup
    setShowConfirmation(false)
  }

  const { openDisclaimer, DisclaimerComponent } = useExternalLinkDisclaimer()

  // Fonction pour obtenir le code de la monnaie
  const getCurrencyCode = (currency) => {
    switch (currency) {
      case "orange_burkina":
      case "moov_burkina":
        return "XOF (FCFA)"
      case "orange_cameroun":
      case "mtn_cameroun":
        return "XAF"
      case "orange_ci":
      case "moov_ci":
        return "XOF (FCFA)"
      case "visa":
        return "USD"
      case "solana":
        return "SOL"
      case "innovx":
        return "INNOVX"
      case "bonus":
        return "BONUS"
      case "mtn":
        return "XOF (FCFA)"
      default:
        return "Fiat"
    }
  }

  // Fonction pour gérer la redirection vers un lien externe
  const handleExternalRedirect = (url) => {
    openDisclaimer(url)
  }

  // Définition des éléments du menu
  const menuItems = [
    { id: "projet", label: "Le Projet", icon: <FileText className="h-5 w-5" /> },
    { id: "tokenomics", label: "Tokenomics", icon: <BarChart3 className="h-5 w-5" /> },
    { id: "roadmap", label: "Feuille de Route", icon: <Archive className="h-5 w-5" /> },
    {
      id: "explorateur",
      label: "Explorateur",
      icon: <Shield className="h-5 w-5" />,
      url: "https://solscan.io/token/BnFx9eT5QtinQFYHSrRvMV7KBTmKgA7YQqAHe4HApump",
    },
    { id: "echanges", label: "Acheter InnovX", icon: <ArrowUpDown className="h-5 w-5" /> },
    { id: "contact", label: "Besoin d'Aide", icon: <Phone className="h-5 w-5" /> },
  ]

  // Remplacer la fonction existante
  // const getAvailableCurrencyOptions = (currentValue: string, excludeValue: string) => {
  //   return currencyOptions.filter((option) => {
  //     // Ne pas afficher la monnaie déjà sélectionnée dans l'autre dropdown
  //     if (option.value === excludeValue) return false

  //     // Ne pas permettre l'échange d'InnovX vers Bonus d'affiliation et vice versa
  //     if (
  //       (excludeValue === "innovx" && option.value === "bonus") ||
  //       (excludeValue === "bonus" && option.value === "innovx")
  //     )
  //       return false

  //     return true
  //   })
  // }

  // Par cette version mise à jour
  const getAvailableCurrencyOptions = (currentValue: string, excludeValue: string) => {
    // Define which currencies are cryptocurrencies
    const cryptoCurrencies = ["innovx", "bonus", "solana"]

    // Si aucune devise n'est sélectionnée dans "Je reçois", afficher toutes les options dans "Je donne"
    if (currentValue === "") {
      return currencyOptions
    }

    return currencyOptions.filter((option) => {
      // Ne pas afficher la monnaie déjà sélectionnée dans l'autre dropdown
      if (option.value === excludeValue && excludeValue !== "") return false

      // Ne pas permettre l'échange d'InnovX vers Bonus d'affiliation et vice versa
      if (
        (excludeValue === "innovx" && option.value === "bonus") ||
        (excludeValue === "bonus" && option.value === "innovx")
      )
        return false

      // Vérifier si la monnaie sélectionnée est une monnaie fiduciaire
      const isExcludeValueFiat = excludeValue !== "" && !cryptoCurrencies.includes(excludeValue)
      const isOptionFiat = !cryptoCurrencies.includes(option.value)

      // Si les deux sont des monnaies fiduciaires, ne pas permettre l'échange
      if (isExcludeValueFiat && isOptionFiat) return false

      return true
    })
  }

  // Fonction pour rendre le contenu du projet
  const renderProjectContent = () => {
    if (activeMenuItem === "projet") {
      return (
        <div className="space-y-12">
          {/* Hero Section */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#F8E061] to-[#F8E061] p-8 md:p-12">
            <div className="absolute inset-0 bg-grid-white/25 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.5))]"></div>
            <div className="relative z-10">
              <h1 className="text-3xl md:text-5xl font-bold mb-4 text-black drop-shadow-sm">
                InnovX – Simplifions la Crypto !
              </h1>
              <p className="text-xl text-black/90 max-w-2xl">
                Une crypto-monnaie accessible, utile et pensée pour tous les utilisateurs.
              </p>
            </div>
          </div>

          {/* Qu'est-ce que InnovX */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="bg-[#F8E061]/10 p-3 rounded-full border border-[#F8E061]/20 shadow-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-[#F8E061]"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M12 16v-4"></path>
                  <path d="M12 8h.01"></path>
                </svg>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold">💡 C'est quoi InnovX ?</h2>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-border">
              <p className="text-lg">
                InnovX est la crypto-monnaie officielle de la Société InnovX SARL, conçue pour simplifier les
                transactions et récompenser ses utilisateurs. Fondé sur l'intégrité et la transparence, ce projet ne
                vise ni la spéculation abusive ni l'exploitation des investisseurs. Conscients des risques liés aux
                crypto-monnaies, nous encourageons chacun à prendre des décisions stratégiques et avisées.
              </p>
              <div className="mt-6 p-4 bg-[#F8E061]/10 rounded-lg border border-[#F8E061]/20">
                <p className="font-medium">
                  C'est une crypto-monnaie simple et accessible, conçue pour un usage quotidien et concret :
                </p>
                <ul className="space-y-3 mt-4">
                  <li className="flex items-center gap-3">
                    <div className="bg-green-100 dark:bg-green-900/30 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-green-600 dark:text-green-400"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                    <span>Payer facilement des services en ligne.</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="bg-green-100 dark:bg-green-900/30 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-green-600 dark:text-green-400"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                    <span>Recevoir des récompenses (cashback, parrainage…).</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="bg-green-100 dark:bg-green-900/30 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-green-600 dark:text-green-400"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                    <span>
                      Échanger en toute simplicité contre des monnaies classiques (dollars, monnaies locales,…).
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Pourquoi choisir InnovX */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="bg-[#F8E061]/10 p-3 rounded-full">
                <Award className="text-[#F8E061] h-6 w-6" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold">Pourquoi choisir InnovX ?</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-white dark:bg-gray-800 border border-border hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardHeader className="bg-gradient-to-r from-[#F8E061]/5 to-[#F8E061]/10 dark:from-[#F8E061]/10 dark:to-[#F8E061]/5 rounded-t-lg border-b border-border">
                  <CardTitle className="flex items-center gap-3">
                    <div className="bg-[#FFFFFF] dark:bg-[#040504] p-2 rounded-full shadow-sm border border-[#F8E061]/20">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-[#F8E061]"
                      >
                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                        <circle cx="9" cy="7" r="4"></circle>
                        <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                      </svg>
                    </div>
                    Accessible à tous
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <p className="text-lg">Débutants ou initiés, tout est pensé pour être simple.</p>
                </CardContent>
              </Card>

              <Card className="bg-white dark:bg-gray-800 border border-border hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardHeader className="bg-gradient-to-r from-[#F8E061]/5 to-[#F8E061]/10 dark:from-[#F8E061]/10 dark:to-[#F8E061]/5 rounded-t-lg border-b border-border">
                  <CardTitle className="flex items-center gap-3">
                    <div className="bg-[#FFFFFF] dark:bg-[#040504] p-2 rounded-full shadow-sm border border-[#F8E061]/20">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-[#F8E061]"
                      >
                        <path d="M12 2v20"></path>
                        <path d="m17 5-5-3-5 3"></path>
                        <path d="m17 19-5 3-5-3"></path>
                        <path d="M12 11.15V13"></path>
                        <path d="M12 17v1.85"></path>
                      </svg>
                    </div>
                    Utilité réelle
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <p className="text-lg">Achetez, échangez, gagnez des récompenses.</p>
                </CardContent>
              </Card>

              <Card className="bg-white dark:bg-gray-800 border border-border hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardHeader className="bg-gradient-to-r from-[#F8E061]/5 to-[#F8E061]/10 dark:from-[#F8E061]/10 dark:to-[#F8E061]/5 rounded-t-lg border-b border-border">
                  <CardTitle className="flex items-center gap-3">
                    <div className="bg-[#FFFFFF] dark:bg-[#040504] p-2 rounded-full shadow-sm border border-[#F8E061]/20">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-[#F8E061]"
                      >
                        <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
                        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                      </svg>
                    </div>
                    Sécurité garantie
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <p className="text-lg">Conforme à la réglementation, 100% transparent.</p>
                </CardContent>
              </Card>

              <Card className="bg-white dark:bg-gray-800 border border-border hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardHeader className="bg-gradient-to-r from-[#F8E061]/5 to-[#F8E061]/10 dark:from-[#F8E061]/10 dark:to-[#F8E061]/5 rounded-t-lg border-b border-border">
                  <CardTitle className="flex items-center gap-3">
                    <div className="bg-[#FFFFFF] dark:bg-[#040504] p-2 rounded-full shadow-sm border border-[#F8E061]/20">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-[#F8E061]"
                      >
                        <path d="M12 22V8"></path>
                        <path d="m20 12-8-8-8 8"></path>
                        <path d="M8 16v-4h8v4"></path>
                      </svg>
                    </div>
                    Basé sur Solana
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <p className="text-lg">Rapide, fiable, écologique.</p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* 3 usages concrets */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="bg-[#F8E061]/10 p-3 rounded-full">
                <span className="text-[#F8E061] text-2xl">✦</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold">3 usages concrets d'InnovX</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="bg-white dark:bg-gray-800 border border-border overflow-hidden">
                <div className="h-2 bg-[#F8E061]"></div>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div className="bg-[#F8E061] text-[#040504] rounded-full w-8 h-8 flex items-center justify-center shadow-md">
                      <span>1</span>
                    </div>
                    <span>Payer en ligne facilement</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <p>Utilisez vos InnovX pour régler vos achats sur nos sites partenaires, sans frais élevés.</p>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-muted-foreground italic">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-[#F8E061] mt-0.5"
                    >
                      <circle cx="12" cy="12" r="10"></circle>
                      <path d="m9.09 9 .57 5.55 2.34.35 2.34-.35 .57-5.55"></path>
                      <rect width="10" height="6" x="7" y="3" rx="1"></rect>
                    </svg>
                    <span>Exemple : Payez un abonnement ou une commande e-commerce avec InnovX.</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white dark:bg-gray-800 border border-border overflow-hidden">
                <div className="h-2 bg-[#F8E061]"></div>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div className="bg-[#F8E061] text-[#040504] rounded-full w-8 h-8 flex items-center justify-center shadow-md">
                      <span>2</span>
                    </div>
                    <span>Récompenses et Parrainage</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <p>Parrainez vos amis et recevez des InnovX en bonus. Obtenez du cashback sur vos achats.</p>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-muted-foreground italic">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-[#F8E061] mt-0.5"
                    >
                      <path d="M12 2v20"></path>
                      <path d="m17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                    </svg>
                    <span>Une partie de ce que vous dépensez vous revient directement en InnovX !</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white dark:bg-gray-800 border border-border overflow-hidden">
                <div className="h-2 bg-[#F8E061]"></div>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div className="bg-[#F8E061] text-[#040504] rounded-full w-8 h-8 flex items-center justify-center shadow-md">
                      <span>3</span>
                    </div>
                    <span>Échanges en toute liberté</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <p>
                      Vendez vos InnovX pour recevoir des monnaies locales (mobile money, virement, carte bancaire…).
                    </p>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-muted-foreground italic">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-[#F8E061] mt-0.5"
                    >
                      <path d="M8 3v3a2 2 0 0 1-2 2H3"></path>
                      <path d="M21 8h-3a2 2 0 0 1-2-2V3"></path>
                      <path d="M3 16h3a2 2 0 0 1 2 2v3"></path>
                      <path d="M16 21v-3a2 2 0 0 1 2-2h3"></path>
                    </svg>
                    <span>Achetez facilement avec mobile money.</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      )
    } else if (activeMenuItem === "tokenomics") {
      return (
        <div className="space-y-12">
          {/* Hero Section */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#F8E061] to-[#F8E061] p-8 md:p-12">
            <div className="absolute inset-0 bg-grid-white/25 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.5))]"></div>
            <div className="relative z-10 text-center">
              <h1 className="text-3xl md:text-5xl font-bold mb-4 text-black drop-shadow-sm">Tokenomics d'InnovX</h1>
              <p className="text-xl text-black/90 max-w-2xl mx-auto">
                Une distribution équitable, transparente et orientée communauté
              </p>
            </div>
          </div>

          {/* Offre Totale avec Visualisation */}
          <div className="space-y-8">
            <div className="flex items-center gap-3">
              <div className="bg-[#F8E061]/10 p-3 rounded-full shadow-inner">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-[#F8E061]"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                  <path d="M2 12h20"></path>
                </svg>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold">Offre Totale : 1 milliard de tokens</h2>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-border">
              {/* Visualisation circulaire */}
              <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="relative w-72 h-72 group">
                  {/* Cercle d'arrière-plan avec animation d'ombre */}
                  <div className="absolute inset-0 rounded-full bg-[#F8E061] shadow-xl transition-all duration-500 group-hover:shadow-[#F8E061]/20 group-hover:shadow-2xl"></div>

                  {/* Segment 10% avec effet de survol */}
                  <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-[1.02] group-hover:rotate-3">
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                      <defs>
                        <linearGradient id="segment-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#F8E061" />
                          <stop offset="100%" stopColor="#F8C140" />
                        </linearGradient>
                      </defs>
                      {/* Arc pour le segment de 10% (36 degrés) */}
                      <path
                        d="M50,50 L50,0 A50,50 0 0,1 85,15 L50,50"
                        fill="url(#segment-gradient)"
                        className="drop-shadow-md transition-all duration-500"
                      />
                      {/* Ligne de séparation */}
                      <path d="M50,0 L50,50" stroke="white" strokeWidth="0.5" className="opacity-70" />
                      <path d="M85,15 L50,50" stroke="white" strokeWidth="0.5" className="opacity-70" />
                    </svg>
                  </div>

                  {/* Cercle central avec effet de profondeur */}
                  <div className="absolute inset-[22%] rounded-full bg-white dark:bg-gray-800 flex items-center justify-center shadow-inner border border-white/20 transition-all duration-500 group-hover:scale-105">
                    <div className="text-center">
                      <p className="text-sm font-medium text-muted-foreground">Total Supply</p>
                      <p className="text-xl font-bold">1 Milliard</p>
                    </div>
                  </div>

                  {/* Étiquettes flottantes */}
                  <div className="absolute -top-2 right-0 bg-white dark:bg-gray-800 px-2 py-1 rounded-full text-xs font-bold text-[#F8E061] shadow-md border border-[#F8E061]/30 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    10%
                  </div>
                  <div className="absolute bottom-0 left-1/4 bg-white dark:bg-gray-800 px-2 py-1 rounded-full text-xs font-bold text-[#F8E061] shadow-md border border-[#F8E061]/30 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    90%
                  </div>
                </div>

                <div className="space-y-6 flex-1">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 bg-[#F8E061] rounded-sm"></div>
                      <div>
                        <h3 className="text-xl font-bold">90% - Communauté (900M tokens)</h3>
                        <p className="text-muted-foreground">Achats publics, récompenses et liquidités</p>
                      </div>
                    </div>
                    <ul className="ml-7 space-y-2">
                      <li className="flex items-start">
                        <span className="text-[#F8E061] mr-2">•</span>
                        <p>40% - Achats publics (Pump.fun, Jupiter, site officiel)</p>
                      </li>
                      <li className="flex items-start">
                        <span className="text-[#F8E061] mr-2">•</span>
                        <p>30% - Récompenses (parrainage, cashback, staking…)</p>
                      </li>
                      <li className="flex items-start">
                        <span className="text-[#F8E061] mr-2">•</span>
                        <p>20% - Liquidités (Raydium, échanges décentralisés)</p>
                      </li>
                    </ul>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 bg-[#F8E061] rounded-sm"></div>
                      <div>
                        <h3 className="text-xl font-bold">10% - Réserve de sécurité (100M tokens)</h3>
                        <p className="text-muted-foreground">Portefeuille verrouillé pour urgences</p>
                      </div>
                    </div>
                    <ul className="ml-7 space-y-2">
                      <li className="flex items-start">
                        <span className="text-[#F8E061] mr-2">•</span>
                        <p>Activée uniquement en cas d'urgence (bug critique, attaque…)</p>
                      </li>
                      <li className="flex items-start">
                        <span className="text-[#F8E061] mr-2">•</span>
                        <p>Utilisation soumise à un vote communautaire (DAO)</p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Statistiques */}
              <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 bg-muted/30 rounded-lg text-center">
                  <p className="text-sm text-muted-foreground">Offre totale</p>
                  <p className="font-bold text-xl">1 milliard</p>
                </div>
                <div className="p-4 bg-muted/30 rounded-lg text-center">
                  <p className="text-sm text-muted-foreground">Tokens brûlés</p>
                  <p className="font-bold text-xl">0</p>
                </div>
                <div className="p-4 bg-muted/30 rounded-lg text-center">
                  <p className="text-sm text-muted-foreground">Prix initial</p>
                  <p className="font-bold text-xl">0.004 Fiat</p>
                </div>
                <div className="p-4 bg-muted/30 rounded-lg text-center">
                  <p className="text-sm text-muted-foreground">Blockchain</p>
                  <p className="font-bold text-xl">Solana</p>
                </div>
              </div>
            </div>
          </div>

          {/* Où et comment acheter */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="bg-[#F8E061]/10 p-3 rounded-full border border-[#F8E061]/20 shadow-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-[#F8E061]"
                >
                  <path d="M20.91 8.84 8.56 2.23a1.93 1.93 0 0 0-1.81 0L3.1 4.13a1.93 1.93 0 0 0-.97 1.68v4.8a1.93 1.93 0 0 0 .97 1.68l3.65 1.9"></path>
                  <path d="m22 17.92-3.37-1.75a1.77 1.77 0 0 0-1.63 0l-4.63 2.4a1.77 1.77 0 0 1-1.63 0l-3.74-1.94a1.77 1.77 0 0 0-1.63 0L2 18.38"></path>
                  <path d="M11.7 8.35a1 1 0 0 0-.94-1.35H9.5a1 1 0 0 0 0 2h.33a1 1 0 0 1 .94 1.35l-.45 1.35a1 1 0 0 1-.94.65H8.5a1 1 0 0 0 0 2h.33a1 1 0 0 0 .94-.65l.45-1.35a1 1 0 0 1 .94-.65H12a1 1 0 0 0 0-2h-.33a1 1 0 0 1-.94-.65Z"></path>
                </svg>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold">Où et comment acheter InnovX ?</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-border hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-[#F8E061]/10 p-3 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-[#F8E061]"
                    >
                      <rect width="20" height="14" x="2" y="5" rx="2"></rect>
                      <line x1="2" x2="22" y1="10" y2="10"></line>
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold">Phase 1: Lancement</h3>
                </div>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-green-500"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span>Pump.fun</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-green-500"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span>Jupiter</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-green-500"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span>Site web InnovX</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-border">
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-[#F8E061]/10 p-3 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-[#F8E061]"
                    >
                      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
                      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
                      <path d="M4 22h16"></path>
                      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path>
                      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path>
                      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold">Phase 2: Expansion</h3>
                </div>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-green-500"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span>Raydium</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-green-500"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span>Échanges décentralisés</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span>Liquidité progressive</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-border">
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-[#F8E061]/10 p-3 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-[#F8E061]"
                    >
                      <path d="M21.21 15.89A10 10 0 1 1 8 2.83"></path>
                      <path d="M22 12A10 10 0 0 0 12 2v10z"></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold">Phase 3: Adoption</h3>
                </div>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-green-500"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span>Échanges centralisés</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-green-500"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span>Partenariats stratégiques</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-green-500"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span>Adoption massive</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="bg-[#F8E061]/10 p-3 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-[#F8E061]"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"></path>
                  <path d="m9 12 2 2 4-4"></path>
                </svg>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold">Mécanisme anti-abus & anti-dump</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md border border-border hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="h-2 bg-[#F8E061]"></div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-[#F8E061]/10 p-2 rounded-full">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-[#F8E061]"
                      >
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"></path>
                        <path d="m14.5 9-5 5"></path>
                        <path d="m9.5 9 5 5"></path>
                      </svg>
                    </div>
                    <h3 className="font-bold text-lg">Supply contrôlée</h3>
                  </div>
                  <p>
                    Aucune vente massive ou soudaine de tokens pour éviter les manipulations de marché et protéger les
                    investisseurs.
                  </p>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md border border-border hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="h-2 bg-[#F8E061]"></div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-[#F8E061]/10 p-2 rounded-full">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-[#F8E061]"
                      >
                        <path d="M21 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2-2v3"></path>
                        <path d="M21 16v3a2 2 0 0 1-2-2H5a2 2 0 0 1-2-2v-3"></path>
                        <path d="M9 12h6"></path>
                        <path d="M12 9v6"></path>
                      </svg>
                    </div>
                    <h3 className="font-bold text-lg">Brûlage de tokens</h3>
                  </div>
                  <p>
                    Mise en place de brûlage de tokens pour réduire l'offre progressivement et augmenter la valeur pour
                    les détenteurs à long terme.
                  </p>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md border border-border hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="h-2 bg-[#F8E061]"></div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-[#F8E061]/10 p-2 rounded-full">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-[#F8E061]"
                      >
                        <path d="M12 2v20"></path>
                        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                      </svg>
                    </div>
                    <h3 className="font-bold text-lg">Récompenses à l'usage</h3>
                  </div>
                  <p>
                    Les utilisateurs qui paient des services chez InnovX ou ses partenaires reçoivent des bonus en
                    tokens, encourageant l'utilisation réelle.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="bg-[#F8E061]/10 p-3 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-[#F8E061]"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"></path>
                  <path d="m9 12 2 2 4-4"></path>
                </svg>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold">Pourquoi faire confiance à InnovX ?</h2>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-md border border-border">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-green-100 dark:bg-green-900/30 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-green-600 dark:text-green-400"
                    >
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"></path>
                      <path d="M12 8v4"></path>
                      <path d="M12 16h.01"></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Équitable</h3>
                  <p>
                    Pas de favoritisme, tout le monde commence au même niveau. Aucune pré-vente privée ou allocation
                    privilégiée.
                  </p>
                </div>

                <div className="flex flex-col items-center text-center">
                  <div className="bg-green-100 dark:bg-green-900/30 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-green-600 dark:text-green-400"
                    >
                      <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Sécurisé</h3>
                  <p>
                    Une réserve bloquée pour protéger l'écosystème. Audits réguliers et transparence totale des
                    opérations.
                  </p>
                </div>

                <div className="flex flex-col items-center text-center">
                  <div className="bg-green-100 dark:bg-green-900/30 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-green-600 dark:text-green-400"
                    >
                      <path
                        d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0
0-4 4v2"
                      ></path>
                      <circle cx="9" cy="7" r="4"></circle>
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Accessible</h3>
                  <p>
                    Même sans expérience en crypto, vous pouvez participer facilement. Interface intuitive et support
                    dédié.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-r from-[#F8E061]/10 to-[#F8E061]/10 p-8 rounded-xl border-2 border-[#F8E061]/30">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-[#F8E061] p-3 rounded-full text-[#040504]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M12 16v-4"></path>
                  <path d="M12 8h.01"></path>
                </svg>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold">En résumé</h2>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-border">
              <p className="text-lg">
                InnovX est une crypto conçue pour durer, protéger ses utilisateurs et favoriser une croissance saine,
                avec une communauté au cœur du projet. Notre approche équilibrée de la tokenomics garantit une
                distribution juste et transparente, favorisant l'adoption à long terme et la stabilité du token.
              </p>
            </div>
          </div>
          <div className="space-y-4 bg-[#F8E061]/10 p-6 rounded-xl border-2 border-[#F8E061]">
            <h2 className="text-2xl font-bold flex items-center justify-center gap-2">
              <span className="bg-[#F8E061]/10 p-1 rounded-full text-[#F8E061]">🚀</span> Prêt à rejoindre l'aventure
              InnovX ?
            </h2>
            <p className="text-lg text-center font-medium">Tout commence ici. Simple, rapide, et sécurisé.</p>
            <div className="flex justify-center mt-4">
              <ExternalLink href="https://pump.fun/token/BnFx9eT5QtinQFYHSrRvMV7KBTmKgA7YQqAHe4HApump">
                <Button className="bg-[#F8E061] hover:bg-[#F8E061]/80 text-[#040504] font-bold py-3 px-6">
                  Acheter des InnovX
                </Button>
              </ExternalLink>
            </div>
          </div>
        </div>
      )
    } else if (activeMenuItem === "roadmap") {
      return (
        <div className="space-y-10">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Feuille de Route InnovX</h1>
            <p className="text-xl text-muted-foreground">Une crypto pensée pour tous, déployée en 3 grandes étapes.</p>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Ligne verticale */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-[#F8E061]/50"></div>

            {/* Phase 1 */}
            <div className="relative z-10 mb-16">
              <div className="flex items-center justify-center mb-4">
                <div className="bg-[#F8E061] text-[#040504] text-2xl font-bold rounded-full w-12 h-12 flex items-center justify-center shadow-lg">
                  <span>1</span>
                </div>
              </div>
              <Card className="max-w-2xl mx-auto border-2 border-[#F8E061]/30">
                <CardHeader>
                  <CardTitle className="text-2xl text-center">Phase 1 : Lancement Initial – On démarre !</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="text-[#F8E061] mr-2 text-xl">•</span>
                      <p>Déploiement de la crypto InnovX sur Pump.fun</p>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#F8E061] mr-2 text-xl">•</span>
                      <p>Ajout progressif des premières liquidités sur Raydium</p>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#F8E061] mr-2 text-xl">•</span>
                      <p>Lancement d'un site web simple et intuitif pour acheter, vendre ou suivre l'actu du projet</p>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Phase 2 */}
            <div className="relative z-10 mb-16">
              <div className="flex items-center justify-center mb-4">
                <div className="bg-[#F8E061] text-[#040504] text-2xl font-bold rounded-full w-12 h-12 flex items-center justify-center shadow-lg">
                  <span>2</span>
                </div>
              </div>
              <Card className="max-w-2xl mx-auto border-2 border-[#F8E061]/30">
                <CardHeader>
                  <CardTitle className="text-2xl text-center">Phase 2 : Utilisation Active – On s'en sert !</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="text-[#F8E061] mr-2 text-xl">•</span>
                      <p>Paiement en InnovX chez nos partenaires (services, abonnements, e-commerce…)</p>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#F8E061] mr-2 text-xl">•</span>
                      <p>Récompenses de parrainage et bonus de fidélité</p>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#F8E061] mr-2 text-xl">•</span>
                      <p>Échange facilité : convertissez vos InnovX en euros par virement ou carte bancaire</p>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Phase 3 */}
            <div className="relative z-10 mb-16">
              <div className="flex items-center justify-center mb-4">
                <div className="bg-[#F8E061] text-[#040504] text-2xl font-bold rounded-full w-12 h-12 flex items-center justify-center shadow-lg">
                  <span>3</span>
                </div>
              </div>
              <Card className="max-w-2xl mx-auto border-2 border-[#F8E061]/30">
                <CardHeader>
                  <CardTitle className="text-2xl text-center">
                    Phase 3 : Adoption Massive – Pour tout le monde !
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="text-[#F8E061] mr-2 text-xl">•</span>
                      <p>Lancement de l'application mobile tout-en-un : portefeuille, paiement, échange, suivi</p>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#F8E061] mr-2 text-xl">•</span>
                      <p>Intégration de plus de 50 boutiques et services(CEX,...) qui acceptent InnovX</p>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#F8E061] mr-2 text-xl">•</span>
                      <p>Conformité légale renforcée pour garantir sécurité, transparence et durabilité</p>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Vision */}
          <div className="space-y-4 bg-muted/50 p-6 rounded-xl border border-border">
            <h2 className="text-2xl font-bold text-center">Notre vision ?</h2>
            <p className="text-lg text-center">
              Faire d'InnovX une crypto simple, pratique et utile au quotidien, même pour les débutants.
            </p>
          </div>

          {/* CTA */}
          <div className="space-y-4 bg-[#F8E061]/10 p-6 rounded-xl border-2 border-[#F8E061]">
            <h2 className="text-2xl font-bold flex items-center justify-center gap-2">
              <span className="bg-[#F8E061]/10 p-1 rounded-full text-[#F8E061]">🚀</span> Rejoignez le mouvement dès
              aujourd'hui !
            </h2>
            <p className="text-lg text-center">
              InnovX, c'est plus qu'une crypto. C'est une nouvelle façon d'échanger, de gagner et de participer.
            </p>
            <div className="flex justify-center mt-4">
              <ExternalLink href="https://pump.fun/token/BnFx9eT5QtinQFYHSrRvMV7KBTmKgA7YQqAHe4HApump">
                <Button className="bg-[#F8E061] hover:bg-[#F8E061]/80 text-[#040504] font-bold py-3 px-6">
                  Commencer maintenant
                </Button>
              </ExternalLink>
            </div>
          </div>
        </div>
      )
    } else if (activeMenuItem === "acheter") {
      return (
        <>
          {/* Simplified Exchange Section */}
          <section className="py-8 md:py-16 bg-gradient-to-b from-background to-muted/30">
            <div className="container px-4 md:px-6 mb-4">
              <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-4">
                <div className="bg-black text-white px-3 py-1 rounded text-sm inline-flex items-center whitespace-nowrap">
                  <span>Nos heures de validations : 5h 00 - 23h 00, GMT</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm">Operateur:</span>
                  <span className="bg-green-500 text-white px-2 py-0.5 rounded text-sm">En ligne</span>
                </div>
              </div>
              {/* Modify the div to display the balance and improve the design: */}

              <div className="max-w-2xl mx-auto">
                <div className="bg-gradient-to-r from-[#111] to-[#222] text-white px-4 py-3 rounded-lg shadow-lg mb-4 flex items-center justify-between border border-[#F8E061]/20 group hover:border-[#F8E061]/50 transition-all duration-300">
                  <div className="flex items-center gap-2">
                    <div className="bg-[#F8E061] rounded-full p-1.5 flex-shrink-0"></div>
                    <div>
                      <span className="text-xs text-gray-400">Réserve du compte principal</span>
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold">{innovxCoinBalance.toLocaleString()}</span>
                        <span className="text-[#F8E061] font-medium">INNOVX</span>
                        <div className="relative w-2 h-2">
                          <div className="absolute top-0 right-[-4px] w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="container px-4 md:px-6">
              <div className="max-w-2xl mx-auto">
                <Card className="mb-8">
                  <CardHeader>
                    <CardTitle className="text-center">Echange manuel</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    {/* Exchange Form */}
                    <div className="space-y-6">
                      {/* "Je donne" section */}
                      <div className="space-y-3">
                        <label className="text-base md:text-lg font-medium">Je donne</label>
                        <div className="p-4 rounded-lg bg-muted/50 border border-border">
                          <div className="flex flex-col items-start gap-3">
                            <div className="w-full">
                              <CurrencySelector
                                options={getAvailableCurrencyOptions(toCurrency, fromCurrency)}
                                value={toCurrency}
                                onChange={(value) => {
                                  setToCurrency(value)
                                  setToCurrencyCode(getCurrencyCode(value))
                                  // Recalculer la conversion si les deux montants sont renseignés
                                  if (innovxAmount) {
                                    const event = { target: { value: innovxAmount } }
                                    // @ts-ignore - simuler l'événement onChange
                                    document
                                      .querySelectorAll('input[placeholder="0"]')[1]
                                      .dispatchEvent(new Event("change", { bubbles: true }))
                                  }
                                }}
                                placeholder="Sélectionner une devise"
                              />
                            </div>
                            <input
                              type="number"
                              placeholder="0"
                              value={fiatAmount}
                              className="w-full bg-transparent border border-border rounded-md px-4 py-3 text-xl font-medium focus:outline-none focus:ring-2 focus:ring-ring min-w-0 overflow-visible"
                              onChange={(e) => {
                                setFiatAmount(e.target.value)
                                if (e.target.value) {
                                  // Conversion dynamique basée sur les devises sélectionnées
                                  const amount = Number(e.target.value)
                                  let convertedAmount = amount

                                  // Conversion de la devise source vers Fiat (si nécessaire)
                                  if (fromCurrency !== "orange_burkina" && fromCurrency !== "moov_burkina") {
                                    // Appliquer les taux de conversion appropriés
                                    if (fromCurrency === "orange_cameroun" || fromCurrency === "mtn_cameroun") {
                                      convertedAmount = amount * 0.98 // XAF à Fiat
                                    } else if (fromCurrency === "orange_ci" || fromCurrency === "moov_ci") {
                                      convertedAmount = amount * 1 // XOF à Fiat (même valeur)
                                    } else if (fromCurrency === "visa") {
                                      convertedAmount = amount * 600 // USD à Fiat approximatif
                                    } else if (fromCurrency === "solana") {
                                      convertedAmount = amount * 40000 // SOL à Fiat approximatif
                                    } else if (fromCurrency === "innovx") {
                                      convertedAmount = amount / exchangeRate // InnovX à Fiat
                                    } else if (fromCurrency === "bonus") {
                                      convertedAmount = amount * 1.2 // Bonus à Fiat (20% de bonus)
                                    } else if (fromCurrency === "mtn") {
                                      convertedAmount = amount * 1 // MTN à Fiat (même valeur)
                                    }
                                  }

                                  // Conversion de Fiat vers la devise cible
                                  if (toCurrency === "innovx") {
                                    convertedAmount = convertedAmount * exchangeRate
                                  } else if (toCurrency === "orange_cameroun" || toCurrency === "mtn_cameroun") {
                                    convertedAmount = convertedAmount / 0.98
                                  } else if (toCurrency === "orange_ci" || toCurrency === "moov_ci") {
                                    convertedAmount = convertedAmount / 1 // Fiat à XOF (même valeur)
                                  } else if (toCurrency === "visa") {
                                    convertedAmount = convertedAmount / 600
                                  } else if (toCurrency === "solana") {
                                    convertedAmount = convertedAmount / 40000
                                  } else if (toCurrency === "bonus") {
                                    convertedAmount = convertedAmount / 1.2
                                  } else if (toCurrency === "mtn") {
                                    convertedAmount = convertedAmount / 1 // Fiat à MTN (même valeur)
                                  }

                                  setInnovxAmount(convertedAmount.toFixed(2))
                                } else {
                                  setInnovxAmount("")
                                }
                              }}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Exchange icon */}
                      <div className="flex justify-center items-center my-5">
                        <div className="bg-[#F8E061]/20 p-3 rounded-full">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="32"
                            height="32"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className={`${theme === "light" ? "text-black" : "text-[#F8E061]"} transform rotate-90`}
                          >
                            <path d="M17 3L21 7L17 11"></path>
                            <path d="M3 7H21"></path>
                            <path d="M7 21L3 17L7 13"></path>
                            <path d="M21 17H3"></path>
                          </svg>
                        </div>
                      </div>

                      {/* "Je reçois" section */}
                      <div className="space-y-3">
                        <label className="text-base md:text-lg font-medium">Je reçois</label>
                        <div className="p-4 rounded-lg bg-muted/50 border border-border">
                          <div className="flex flex-col items-start gap-3">
                            <div className="w-full">
                              {/* Dans la section "Je reçois", modifiez le CurrencySelector : */}
                              <CurrencySelector
                                options={getAvailableCurrencyOptions(fromCurrency, toCurrency)}
                                value={fromCurrency}
                                onChange={(value) => {
                                  setFromCurrency(value)
                                  setFromCurrencyCode(getCurrencyCode(value))
                                  // Recalculer la conversion si les deux montants sont renseignés
                                  if (fiatAmount) {
                                    const event = { target: { value: fiatAmount } }
                                    // @ts-ignore - simuler l'événement onChange
                                    document
                                      .querySelectorAll('input[placeholder="0"]')[0]
                                      .dispatchEvent(new Event("change", { bubbles: true }))
                                  }
                                }}
                                placeholder={
                                  fromCurrency === ""
                                    ? "Sélectionnez d'abord une devise à donner"
                                    : "Sélectionner une devise"
                                }
                              />
                            </div>
                            <input
                              type="number"
                              placeholder="0"
                              value={innovxAmount}
                              className="w-full bg-transparent border border-border rounded-md px-4 py-3 text-xl font-medium focus:outline-none focus:ring-2 focus:ring-ring min-w-0 overflow-visible"
                              onChange={(e) => {
                                setInnovxAmount(e.target.value)
                                if (e.target.value) {
                                  // Conversion dynamique basée sur les devises sélectionnées
                                  const amount = Number(e.target.value)
                                  let convertedAmount = amount

                                  // Conversion de la devise source vers Fiat (si nécessaire)
                                  if (fromCurrency !== "orange_burkina" && fromCurrency !== "moov_burkina") {
                                    // Appliquer les taux de conversion appropriés
                                    if (fromCurrency === "orange_cameroun" || fromCurrency === "mtn_cameroun") {
                                      convertedAmount = amount * 0.98 // XAF à Fiat
                                    } else if (fromCurrency === "orange_ci" || fromCurrency === "moov_ci") {
                                      convertedAmount = amount * 1 // XOF à Fiat (même valeur)
                                    } else if (fromCurrency === "visa") {
                                      convertedAmount = amount * 600 // USD à Fiat approximatif
                                    } else if (fromCurrency === "solana") {
                                      convertedAmount = amount * 40000 // SOL à Fiat approximatif
                                    } else if (fromCurrency === "innovx") {
                                      convertedAmount = amount / exchangeRate // InnovX à Fiat
                                    } else if (fromCurrency === "bonus") {
                                      convertedAmount = amount * 1.2 // Bonus à Fiat (20% de bonus)
                                    } else if (fromCurrency === "mtn") {
                                      convertedAmount = amount * 1 // MTN à Fiat (même valeur)
                                    }
                                  }

                                  // Conversion de Fiat vers la devise cible
                                  if (toCurrency === "innovx") {
                                    convertedAmount = convertedAmount * exchangeRate
                                  } else if (toCurrency === "orange_cameroun" || toCurrency === "mtn_cameroun") {
                                    convertedAmount = convertedAmount / 0.98
                                  } else if (toCurrency === "orange_ci" || toCurrency === "moov_ci") {
                                    convertedAmount = convertedAmount / 1 // Fiat à XOF (même valeur)
                                  } else if (toCurrency === "visa") {
                                    convertedAmount = convertedAmount / 600
                                  } else if (toCurrency === "solana") {
                                    convertedAmount = convertedAmount / 40000
                                  } else if (toCurrency === "bonus") {
                                    convertedAmount = convertedAmount / 1.2
                                  } else if (toCurrency === "mtn") {
                                    convertedAmount = convertedAmount / 1 // Fiat à MTN (même valeur)
                                  }

                                  setFiatAmount(convertedAmount.toFixed(2))
                                } else {
                                  setFiatAmount("")
                                }
                              }}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Receive Address Input */}
                      <div className="space-y-3">
                        <label className="text-base md:text-lg font-medium">Adresse de réception</label>
                        <input
                          type="text"
                          placeholder="Coller votre adresse ici"
                          value={receiveAddress}
                          onChange={(e) => setReceiveAddress(e.target.value)}
                          className="w-full bg-muted/50 rounded-md px-4 py-4 border border-border focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1 text-lg"
                        />
                      </div>

                      {/* Calculate Button */}
                      <div className="mt-10">
                        {/* Remplacer la section des termes et conditions (lignes 1073-1093 environ) par ce code: */}
                        <div className="mb-5">
                          <div className="flex flex-wrap items-start gap-2">
                            <div className="flex items-center">
                              <input
                                type="checkbox"
                                id="terms"
                                className="h-4 w-4 rounded border-gray-300 text-[#F8E061] focus:ring-[#F8E061]"
                                checked={termsAccepted}
                                onChange={(e) => setTermsAccepted(e.target.checked)}
                              />
                              <label htmlFor="terms" className="ml-2 text-base">
                                lus et approuvés
                              </label>
                            </div>
                            <button
                              type="button"
                              className="text-blue-600 hover:underline focus:outline-none text-base flex items-center"
                              onClick={() => {
                                setShowTermsModal(true)
                              }}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="mr-1"
                              >
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                                <polyline points="14 2 14 8 20 8"></polyline>
                                <line x1="16" y1="13" x2="8" y2="13"></line>
                                <line x1="16" y1="17" x2="8" y2="17"></line>
                                <polyline points="10 9 9 9 8 9"></polyline>
                              </svg>
                              Termes et Conditions
                            </button>
                          </div>
                        </div>

                        {!termsAccepted && (
                          <div className="text-red-500 text-sm mb-3 flex items-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="mr-2"
                            >
                              <circle cx="12" cy="12" r="10"></circle>
                              <line x1="12" y1="8" x2="12" y2="12"></line>
                              <line x1="12" y1="16" x2="12.01" y2="16"></line>
                            </svg>
                            Veuillez accepter les conditions pour continuer
                          </div>
                        )}

                        <Button className="w-full text-lg py-6" onClick={handleCalculate} disabled={!termsAccepted}>
                          Continuer
                        </Button>
                      </div>

                      {/* Confirmation Popup */}
                      {showConfirmation && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full">
                            <h3 className="text-xl font-bold mb-4">Confirmation</h3>
                            <div className="mb-6 space-y-3 text-sm md:text-base">
                              <p>Êtes-vous sûr de vouloir procéder à cette transaction ?</p>
                              <p className="font-medium mt-2">Veuillez noter que dans ce mode d'achat :</p>
                              <ul className="space-y-2 list-disc pl-5">
                                <li>
                                  Les validations peuvent se faire dans un délai de 1 heure si un validateur est en
                                  ligne.
                                </li>
                                <li>En cas d'indisponibilité, le traitement peut prendre jusqu'à 24 heures maximum.</li>
                                <li>Les horaires de ce service sont de 6h à 23h (heure GMT).</li>
                              </ul>
                            </div>
                            <div className="flex flex-col sm:flex-row sm:justify-end space-y-2 sm:space-y-0 sm:space-x-4">
                              <Button
                                variant="outline"
                                onClick={() => setShowConfirmation(false)}
                                className="w-full sm:w-auto"
                              >
                                Annuler
                              </Button>
                              <Button
                                className="bg-[#F8E061] hover:bg-[#F8E061]/80 text-[#040504] w-full sm:w-auto"
                                onClick={confirmCalculation}
                              >
                                Confirmer
                              </Button>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Modal des Termes et Conditions */}
                      {showTermsModal && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-3xl w-full max-h-[80vh] overflow-y-auto">
                            <h3 className="text-xl font-bold mb-4">Termes et Conditions</h3>
                            <div className="prose dark:prose-invert max-w-none mb-6">
                              <p>
                                Bienvenue sur la plateforme d'échange InnovX. En utilisant notre service, vous acceptez
                                les termes et conditions suivants :
                              </p>

                              <h4>1. Utilisation du Service</h4>
                              <p>
                                L'utilisation de notre plateforme d'échange est soumise à votre acceptation et au
                                respect des présentes conditions générales. Vous devez avoir au moins 18 ans pour
                                utiliser ce service.
                              </p>

                              <h4>2. Risques liés aux crypto-monnaies</h4>
                              <p>
                                Les investissements en crypto-monnaies comportent des risques significatifs. Les cours
                                peuvent être volatils et les pertes potentielles importantes. N'investissez que ce que
                                vous êtes prêt à perdre.
                              </p>

                              <h4>3. Responsabilité</h4>
                              <p>
                                InnovX ne peut être tenu responsable des pertes financières résultant de l'utilisation
                                de notre plateforme, de fluctuations de marché ou d'erreurs techniques.
                              </p>

                              <h4>4. Sécurité</h4>
                              <p>
                                Vous êtes responsable de la sécurité de vos identifiants et mots de passe. Toute
                                transaction effectuée avec vos identifiants sera considérée comme autorisée par vous.
                              </p>

                              <h4>5. Modifications</h4>
                              <p>
                                InnovX se réserve le droit de modifier ces conditions à tout moment. Les modifications
                                prendront effet dès leur publication sur notre site.
                              </p>
                            </div>
                            <div className="flex justify-end">
                              <Button onClick={() => setShowTermsModal(false)}>Fermer</Button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Disclaimer */}
                <p className="text-sm text-muted-foreground text-center">
                  Les taux de change sont donnés à titre indicatif et peuvent varier.
                </p>
              </div>
            </div>
          </section>

          {/* How to Buy Section */}
          <section className="py-8 md:py-16">
            <div className="container px-4 md:px-6">
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-bold">Comment acheter des InnovX ?</h2>
                <p className="text-lg text-muted-foreground">
                  Plusieurs options s'offrent à vous pour acquérir des InnovX.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Option 1: Mobile Money */}
                <Card className="bg-white dark:bg-gray-800 border border-border hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <CardHeader className="bg-gradient-to-r from-[#F8E061]/5 to-[#F8E061]/10 dark:from-[#F8E061]/10 dark:to-[#F8E061]/5 rounded-t-lg border-b border-border">
                    <CardTitle className="flex items-center gap-3">
                      <div className="bg-[#FFFFFF] dark:bg-[#040504] p-2 rounded-full shadow-sm border border-[#F8E061]/20">
                        <Phone className="text-[#F8E061]" />
                      </div>
                      Mobile Money
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <p className="text-lg">
                      Achetez directement avec votre compte mobile money (Orange Money, Moov Money, MTN Mobile Money).
                    </p>
                    <ExternalLink href="https://pump.fun/token/BnFx9eT5QtinQFYHSrRvMV7KBTmKgA7YQqAHe4HApump">
                      <Button className="mt-4 bg-[#F8E061] hover:bg-[#F8E061]/80 text-[#040504] font-bold">
                        Acheter avec Mobile Money
                      </Button>
                    </ExternalLink>
                  </CardContent>
                </Card>

                {/* Option 2: Carte Bancaire */}
                <Card className="bg-white dark:bg-gray-800 border border-border hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <CardHeader className="bg-gradient-to-r from-[#F8E061]/5 to-[#F8E061]/10 dark:from-[#F8E061]/10 dark:to-[#F8E061]/5 rounded-t-lg border-b border-border">
                    <CardTitle className="flex items-center gap-3">
                      <div className="bg-[#FFFFFF] dark:bg-[#040504] p-2 rounded-full shadow-sm border border-[#F8E061]/20">
                        <CreditCard className="text-[#F8E061]" />
                      </div>
                      Carte Bancaire
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <p className="text-lg">
                      Utilisez votre carte bancaire Visa ou Mastercard pour un achat rapide et sécurisé.
                    </p>
                    <ExternalLink href="https://pump.fun/token/BnFx9eT5QtinQFYHSrRvMV7KBTmKgA7YQqAHe4HApump">
                      <Button className="mt-4 bg-[#F8E061] hover:bg-[#F8E061]/80 text-[#040504] font-bold">
                        Acheter avec Carte Bancaire
                      </Button>
                    </ExternalLink>
                  </CardContent>
                </Card>

                {/* Option 3: Échange de Cryptos */}
                <Card className="bg-white dark:bg-gray-800 border border-border hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <CardHeader className="bg-gradient-to-r from-[#F8E061]/5 to-[#F8E061]/10 dark:from-[#F8E061]/10 dark:to-[#F8E061]/5 rounded-t-lg border-b border-border">
                    <CardTitle className="flex items-center gap-3">
                      <div className="bg-[#FFFFFF] dark:bg-[#040504] p-2 rounded-full shadow-sm border border-[#F8E061]/20">
                        <ArrowUpDown className="text-[#F8E061]" />
                      </div>
                      Échange de Cryptos
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <p className="text-lg">
                      Échangez vos Bitcoins, Ethereums ou Solanas contre des InnovX en quelques clics.
                    </p>
                    <ExternalLink href="https://pump.fun/token/BnFx9eT5QtinQFYHSrRvMV7KBTmKgA7YQqAHe4HApump">
                      <Button className="mt-4 bg-[#F8E061] hover:bg-[#F8E061]/80 text-[#040504] font-bold">
                        Échanger des Cryptos
                      </Button>
                    </ExternalLink>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* Disclaimer */}
          <section className="py-4">
            <div className="container px-4 md:px-6">
              <p className="text-sm text-muted-foreground text-center">
                Assurez-vous de faire vos propres recherches avant d'acheter des cryptomonnaies. Les investissements en
                cryptomonnaies sont risqués.
              </p>
            </div>
          </section>
          <DisclaimerComponent />
        </>
      )
    } else if (activeMenuItem === "echanges") {
      return (
        <div className="space-y-10">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Acheter des InnovX – Facile pour Tous !</h1>
          </div>

          {/* Section pour débutants */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-border">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-[#F8E061]/20 p-3 rounded-full">
                <span className="text-[#F8E061] text-2xl">👉🏽</span>
              </div>
              <h2 className="text-2xl font-bold">Débutants ? Pas de souci, c'est ultra simple !</h2>
            </div>

            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">🛒 Achetez directement sur notre site :</h3>

                <div className="space-y-6 pl-4">
                  <div className="flex items-start gap-4">
                    <div className="bg-[#F8E061] text-[#040504] rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0 mt-1">
                      1
                    </div>
                    <p className="text-lg">Indiquez le montant d'InnovX que vous souhaitez.</p>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-[#F8E061] text-[#040504] rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0 mt-1">
                      2
                    </div>
                    <div>
                      <p className="text-lg mb-2">Choisissez votre méthode de paiement :</p>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>Carte bancaire (Visa / Mastercard)</li>
                        <li>Mobile Money (Orange, MTN, Moov…)</li>
                      </ul>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-[#F8E061] text-[#040504] rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0 mt-1">
                      3
                    </div>
                    <p className="text-lg">Recevez vos InnovX directement dans votre portefeuille personnel</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bouton Achat manuel */}
            <div className="mt-8 flex justify-center">
              <Button
                className="bg-[#F8E061] hover:bg-[#F8E061]/80 text-[#040504] font-bold py-3 px-8 text-lg"
                onClick={() => setActiveMenuItem("acheter")}
              >
                Achat manuel
              </Button>
            </div>
          </div>

          {/* Section pour utilisateurs familiers */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-border">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-[#F8E061]/20 p-3 rounded-full">
                <span className="text-[#F8E061] text-2xl">👉🏽</span>
              </div>
              <h2 className="text-2xl font-bold">Déjà familier avec la crypto ?</h2>
            </div>

            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">💻 Procédure rapide via Phantom ou Solflare :</h3>

                <div className="space-y-6 pl-4">
                  <div className="flex items-start gap-4">
                    <div className="bg-[#F8E061] text-[#040504] rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0 mt-1">
                      1
                    </div>
                    <p className="text-lg">Téléchargez un portefeuille Phantom ou Solflare</p>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-[#F8E061] text-[#040504] rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0 mt-1">
                      2
                    </div>
                    <p className="text-lg">Achetez des SOL (Coin de la blockchain Solana)</p>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-[#F8E061] text-[#040504] rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0 mt-1">
                      3
                    </div>
                    <p className="text-lg">Échangez vos SOL contre des InnovX en 1 clic</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bouton Achat automatique */}
            <div className="mt-8 flex justify-center">
              <Button
                className="bg-[#F8E061] hover:bg-[#F8E061]/80 text-[#040504] font-bold py-3 px-8 text-lg"
                onClick={() => setActiveMenuItem("acheter")}
              >
                Achat automatique
              </Button>
            </div>
          </div>

          {/* Section à retenir */}
          <div className="bg-[#F8E061]/10 rounded-xl p-8 shadow-md border border-[#F8E061]/30">
            <h3 className="text-xl font-bold mb-6 text-center">Ce qu'il faut retenir :</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-start gap-3">
                <div className="bg-green-100 dark:bg-green-900/30 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-green-600 dark:text-green-400"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <p className="font-medium">Transactions sécurisées : Plateforme fiable et certifiée</p>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-[#F8E061]/20 p-1 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-lg">🆘</span>
                </div>
                <p className="font-medium">Assistance disponible : Notre équipe vous accompagne à chaque étape</p>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-green-100 dark:bg-green-900/30 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-green-600 dark:text-green-400"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <p className="font-medium">Simple et rapide, même pour les débutants</p>
              </div>
            </div>
          </div>

          {/* Section Solana */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-border">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-[#F8E061]/20 p-3 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-[#F8E061]"
                >
                  <path d="M12 22V8"></path>
                  <path d="m20 12-8-8-8 8"></path>
                  <path d="M8 16v-4h8v4"></path>
                </svg>
              </div>
              <h2 className="text-2xl font-bold">Basé sur Solana</h2>
            </div>

            <div className="space-y-4 pl-4">
              <div className="flex items-start gap-3">
                <div className="bg-green-100 dark:bg-green-900/30 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-green-600 dark:text-green-400"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <p className="text-lg">Rapide, fiable, écologique et avec des frais de transaction minimes.</p>
              </div>
            </div>

            <div className="mt-8 p-4 bg-[#F8E061]/10 rounded-lg border border-[#F8E061]/30">
              <p className="font-medium mb-2">Adresse contrat officielle :</p>
              <div
                className="bg-muted/50 p-3 rounded-md border border-border flex items-center justify-between cursor-pointer group"
                onClick={() => {
                  navigator.clipboard.writeText("BnFx9eT5QtinQFYHSrRvMV7KBTmKgA7YQqAHe4HApump")
                  // Vous pourriez ajouter une notification de copie réussie ici
                }}
              >
                <code className="text-sm font-mono">BnFx9eT5QtinQFYHSrRvMV7KBTmKgA7YQqAHe4HApump</code>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-[#F8E061]"
                  >
                    <rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect>
                    <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path>
                  </svg>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-2">Cliquez sur l'adresse pour la copier</p>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-xl shadow-md border border-border">
            <p className="text-xl font-bold mb-6">Prêt à rejoindre InnovX ? Choisissez votre méthode :</p>
            <ExternalLink href="https://pump.fun/token/BnFx9eT5QtinQFYHSrRvMV7KBTmKgA7YQqAHe4HApump">
              <Button className="bg-[#F8E061] hover:bg-[#F8E061]/80 text-[#040504] font-bold py-3 px-8 text-lg">
                ACHETER MAINTENANT
              </Button>
            </ExternalLink>
          </div>
        </div>
      )
    } else if (activeMenuItem === "contact") {
      return (
        <div className="container mx-auto py-12 px-4 md:px-6">
          <h1 className="text-3xl font-bold text-center mb-8">Besoin d'aide ? Contactez-nous !</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Contact Form */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-border">
              <h2 className="text-xl font-semibold mb-4">Envoyez-nous un message</h2>
              <form className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Nom
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder="Votre nom"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder="Votre email"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows="4"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder="Votre message"
                  ></textarea>
                </div>
                <Button className="w-full bg-[#F8E061] hover:bg-[#F8E061]/80 text-[#040504] font-bold">
                  Envoyer le message
                </Button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-border">
              <h2 className="text-xl font-semibold mb-4">Nos informations de contact</h2>
              <div className="space-y-3">
                <div>
                  <p className="font-medium">Email:</p>
                  <ExternalLink href="mailto:contact@innovx.solutions">contact@innovx.solutions</ExternalLink>
                </div>
                <div>
                  <p className="font-medium">Téléphone:</p>
                  <ExternalLink href="tel:+22600000000">+226 00 00 00 00</ExternalLink>
                </div>
                <div>
                  <p className="font-medium">Adresse:</p>
                  <p>Ouagadougou, Burkina Faso</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }

    // Other menu items content remains the same
    // ...

    return <p>Contenu à venir...</p>
  }

  // Définir l'animation de brillance pour l'effet sur l'adresse du contrat
  useEffect(() => {
    // Ajouter l'animation de brillance et de pulsation aux styles
    const style = document.createElement("style")
    style.textContent = `
    @keyframes shimmer {
      0% { transform: translateX(-100%); }
      100% { transform: translateX(100%); }
    }
    .animate-shimmer {
      animation: shimmer 3s infinite;
    }
    
    @keyframes pulse-yellow {
      0%, 100% { 
        box-shadow: 0 0 0 0 rgba(248, 224, 97, 0.7);
      }
      50% { 
        box-shadow: 0 0 0 10px rgba(248, 224, 97, 0);
      }
    }
    .animate-pulse-yellow {
      animation: pulse-yellow 1s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    }

  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.3; }
  }
  .animate-blink {
    animation: blink 1.5s ease-in-out infinite;
  }
`
    document.head.appendChild(style)

    // Nettoyer lors du démontage du composant
    return () => {
      document.head.removeChild(style)
    }
  }, [])

  return (
    <div className="container mx-auto pt-2 pb-6">
      {/* Menu de navigation */}
      <div className="md:flex md:items-center md:justify-between mb-8">
        {/* Languette de menu collée à la paroi gauche */}
        <div
          className={`fixed left-0 top-[6.2rem] z-50 bg-[#F8E061] hover:bg-[#F8E061]/80 text-[#040504] p-2 rounded-r-md shadow-md cursor-pointer flex items-center hover:animate-none transition-all duration-300 hover:scale-105 hover:shadow-lg ${mobileMenuOpen ? "hidden" : ""}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Menu"
        >
          <ChevronRight className="h-5 w-5 animate-blink" strokeWidth="4" />
        </div>

        {/* Menu déroulant latéral */}
        <div
          className={`fixed top-24 left-0 bottom-0 z-50 w-64 bg-white dark:bg-gray-900 shadow-lg transform transition-transform duration-300 ease-in-out ${
            mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-4 border-b mt-8">
              <h2 className="font-bold text-lg">InnovX Coin</h2>
              <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 6 6 18"></path>
                  <path d="m6 6 12 12"></path>
                </svg>
              </Button>
            </div>

            <div className="flex-1 overflow-auto py-2 flex flex-col justify-between">
              <nav className="flex flex-col">
                {menuItems.map((item) => (
                  <a
                    key={item.id}
                    href={item.url ? item.url : `#${item.id}`}
                    onClick={(e) => {
                      if (item.url) {
                        e.preventDefault()
                        openDisclaimer(item.url)
                      } else {
                        setActiveMenuItem(item.id)
                        setMobileMenuOpen(false) // Fermer le menu après la sélection
                      }
                    }}
                    target={item.url ? "_blank" : undefined}
                    rel={item.url ? "noopener noreferrer" : undefined}
                    className={`flex items-center gap-3 px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-800 ${
                      activeMenuItem === item.id
                        ? "bg-[#F8E061] text-black dark:text-[#F8E061] dark:bg-gray-800 border-l-2 border-[#F8E061]"
                        : "border-l-2 border-transparent"
                    }`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </a>
                ))}
              </nav>

              <div className="mt-auto pt-4 border-t border-gray-200 dark:border-gray-700">
                <Button
                  variant="ghost"
                  className="w-full justify-start px-4 py-3 text-left font-normal"
                  onClick={() => {
                    setMobileMenuOpen(false)
                    setShowTermsModal(true)
                  }}
                >
                  Termes et Conditions
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Overlay pour fermer le menu en cliquant à l'extérieur */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setMobileMenuOpen(false)}></div>
        )}
      </div>

      {/* Contenu principal */}
      <main className="mb-16">{renderProjectContent()}</main>

      {/* DisclaimerComponent */}
      <DisclaimerComponent />
    </div>
  )
}
