// Fonctions utilitaires pour la recherche

// Fonction pour normaliser le texte (supprimer les accents, mettre en minuscule)
export const normalizeText = (text: string): string => {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w\s]/g, " ")
    .trim()
}

// Fonction pour calculer la distance de Levenshtein (pour la tolérance aux fautes d'orthographe)
export const levenshteinDistance = (a: string, b: string): number => {
  if (a.length === 0) return b.length
  if (b.length === 0) return a.length

  const matrix = []

  // Initialiser la matrice
  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i]
  }
  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j
  }

  // Remplir la matrice
  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1]
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitution
          Math.min(
            matrix[i][j - 1] + 1, // insertion
            matrix[i - 1][j] + 1, // suppression
          ),
        )
      }
    }
  }

  return matrix[b.length][a.length]
}

// Fonction pour vérifier si un terme est similaire à un autre (tolérance aux fautes d'orthographe)
export const isSimilar = (term: string, target: string, threshold = 0.25): boolean => {
  if (term.length < 3) return term === target // Pour les termes courts, exiger une correspondance exacte

  const distance = levenshteinDistance(term, target)
  const maxLength = Math.max(term.length, target.length)
  const similarity = 1 - distance / maxLength

  return similarity >= 1 - threshold
}

// Dictionnaire de synonymes pour améliorer la recherche
export const synonyms: Record<string, string[]> = {
  formation: ["cours", "apprentissage", "tutoriel", "education", "atelier"],
  gratuit: ["free", "offert", "cadeau", "sans frais", "zero"],
  crypto: ["cryptomonnaie", "bitcoin", "blockchain", "monnaie", "innovx coin", "solana", "ethereum", "web3"],
  solana: ["sol", "blockchain solana", "crypto solana", "token sol"],
  service: ["prestation", "aide", "assistance", "support"],
  marketplace: ["marche", "boutique", "magasin", "ecommerce", "vente"],
  coaching: ["accompagnement", "mentorat", "conseil", "guide"],
  securite: ["protection", "surete", "confidentialite", "privacy"],
}

// Fonction pour étendre les termes de recherche avec des synonymes
export const expandSearchTerms = (terms: string[]): string[] => {
  const expanded: string[] = [...terms]

  terms.forEach((term) => {
    const normalizedTerm = normalizeText(term)

    // Traitement spécial pour les termes de blockchain
    if (normalizedTerm === "solana" || normalizedTerm === "sol") {
      expanded.push("blockchain", "crypto", "web3", "nft")
    }

    // Ajouter des synonymes si disponibles
    Object.entries(synonyms).forEach(([key, values]) => {
      if (isSimilar(normalizedTerm, key, 0.3) || values.some((v) => isSimilar(normalizedTerm, v, 0.3))) {
        expanded.push(key)
        expanded.push(...values)
      }
    })
  })

  // Éliminer les doublons
  return [...new Set(expanded)]
}

// Interface pour les résultats de recherche
export interface SearchResult {
  title: string
  description: string
  url: string
  category: string
  elementType: string
  content?: string
  tags?: string[]
}

// Base de données simulée pour la recherche
export const siteContent: SearchResult[] = [
  // Pages principales
  {
    title: "Accueil - InnovX",
    description: "Plateforme multifonctionnelle intégrant services, formations, marketplace et technologies blockchain",
    url: "/",
    category: "pages",
    elementType: "page",
    content:
      "Bienvenue sur InnovX. Plateforme multifonctionnelle intégrant services, formations, marketplace, publicité et nouvelles technologies. Découvrez notre écosystème complet de services innovants conçus pour répondre à tous vos besoins.",
    tags: ["accueil", "home", "innovx", "plateforme"],
  },
  {
    title: "Formation Développement Web",
    description: "Apprenez les bases du développement web avec HTML, CSS et JavaScript",
    url: "/formations/developpement-web",
    category: "formations",
    elementType: "page",
    content:
      "Notre formation complète en développement web vous permettra de maîtriser HTML, CSS et JavaScript. Apprenez à créer des sites web responsives et des applications web interactives. Formation dispensée par des experts du domaine.",
    tags: ["formation", "développement", "web", "html", "css", "javascript"],
  },
  {
    title: "Formation Marketing Digital",
    description: "Maîtrisez les techniques du marketing digital pour promouvoir votre entreprise",
    url: "/formations/marketing-digital",
    category: "formations",
    elementType: "page",
    content:
      "Découvrez les stratégies de marketing digital les plus efficaces pour promouvoir votre entreprise en ligne. SEO, réseaux sociaux, publicité en ligne, email marketing et plus encore.",
    tags: ["formation", "marketing", "digital", "seo", "réseaux sociaux"],
  },
  {
    title: "Services de Maintenance",
    description: "Découvrez nos services de maintenance professionnelle pour vos installations",
    url: "/services/maintenance",
    category: "services",
    elementType: "page",
    content:
      "Nos services de maintenance professionnelle garantissent le bon fonctionnement de vos installations. Maintenance préventive et corrective, assistance technique 24/7, et suivi personnalisé.",
    tags: ["services", "maintenance", "assistance", "technique"],
  },
  {
    title: "InnovX Coin - Crypto-monnaie",
    description: "Tout ce que vous devez savoir sur notre crypto-monnaie propriétaire",
    url: "/crypto",
    category: "crypto",
    elementType: "page",
    content:
      "InnovX Coin est notre crypto-monnaie propriétaire, sécurisée par la blockchain. Elle peut être utilisée pour effectuer des transactions sur notre plateforme, être échangée contre du franc CFA, et sert également de système de récompense pour les utilisateurs actifs.",
    tags: ["crypto", "blockchain", "innovx coin", "monnaie", "token"],
  },
  // Sections de pages
  {
    title: "Section Hero - Accueil",
    description: "Section d'introduction de la page d'accueil",
    url: "/#hero",
    category: "sections",
    elementType: "section",
    content:
      "Bienvenue sur InnovX. Plateforme multifonctionnelle intégrant services, formations, marketplace, publicité et nouvelles technologies.",
    tags: ["hero", "accueil", "introduction"],
  },
  {
    title: "Section Services Principaux",
    description: "Présentation des services principaux d'InnovX",
    url: "/#services",
    category: "sections",
    elementType: "section",
    content:
      "Découvrez notre écosystème complet de services innovants conçus pour répondre à tous vos besoins. Formations, Marketplace, InnovX Coin.",
    tags: ["services", "formations", "marketplace", "crypto"],
  },
  // Boutons
  {
    title: "Bouton Créer un compte",
    description: "Bouton pour créer un compte utilisateur",
    url: "/#cta",
    category: "boutons",
    elementType: "button",
    content: "Créer un compte",
    tags: ["bouton", "compte", "inscription", "utilisateur"],
  },
  {
    title: "Bouton Nous contacter",
    description: "Bouton pour contacter l'équipe InnovX",
    url: "/#contact",
    category: "boutons",
    elementType: "button",
    content: "Nous contacter",
    tags: ["bouton", "contact", "support"],
  },
  // Textes
  {
    title: "Qu'est-ce qu'InnovX ?",
    description: "Explication de ce qu'est InnovX",
    url: "/#faq",
    category: "textes",
    elementType: "text",
    content:
      "InnovX est une plateforme multifonctionnelle qui intègre des services, des formations, une marketplace, des solutions publicitaires et des technologies blockchain. Notre objectif est de fournir un écosystème complet pour les particuliers et les entreprises.",
    tags: ["faq", "innovx", "plateforme", "explication"],
  },
  // Contenu Solana
  {
    title: "Solana Blockchain - Intégration",
    description: "Découvrez comment InnovX intègre la blockchain Solana pour des transactions rapides et sécurisées",
    url: "/crypto/solana",
    category: "crypto",
    elementType: "page",
    content:
      "InnovX intègre la blockchain Solana pour offrir des transactions ultra-rapides et à faible coût. Solana est l'une des blockchains les plus performantes avec une capacité de plus de 65 000 transactions par seconde. Notre intégration permet des échanges instantanés entre InnovX Coin et SOL, ainsi que l'accès à l'écosystème Solana complet.",
    tags: ["solana", "blockchain", "crypto", "transactions", "sol"],
  },
  {
    title: "Formation Solana Development",
    description: "Apprenez à développer des applications sur la blockchain Solana",
    url: "/formations/blockchain/solana",
    category: "formations",
    elementType: "page",
    content:
      "Notre formation complète en développement Solana vous permettra de maîtriser la création d'applications décentralisées sur cette blockchain performante. Vous apprendrez le langage Rust, les concepts de programmation blockchain, et comment déployer des smart contracts sur Solana. Formation dispensée par des développeurs expérimentés.",
    tags: ["formation", "solana", "blockchain", "développement", "rust", "smart contracts"],
  },
  // Ajout de contenu supplémentaire pour couvrir tout le site
  {
    title: "Politique de confidentialité",
    description: "Informations sur la protection de vos données personnelles",
    url: "/mentions-legales/confidentialite",
    category: "textes",
    elementType: "text",
    content:
      "Chez InnovX, nous prenons la protection de vos données personnelles très au sérieux. Notre politique de confidentialité détaille comment nous collectons, utilisons et protégeons vos informations. Nous respectons le RGPD et autres réglementations sur la protection des données.",
    tags: ["confidentialité", "rgpd", "données", "protection", "légal"],
  },
  {
    title: "Conditions Générales d'Utilisation",
    description: "Règles d'utilisation de notre plateforme",
    url: "/mentions-legales/cgu",
    category: "textes",
    elementType: "text",
    content:
      "Les présentes Conditions Générales d'Utilisation régissent l'utilisation de la plateforme InnovX. En utilisant nos services, vous acceptez de vous conformer à ces conditions. Elles définissent vos droits et obligations en tant qu'utilisateur, ainsi que nos responsabilités en tant que fournisseur de services.",
    tags: ["cgu", "conditions", "utilisation", "règles", "légal"],
  },
  {
    title: "FAQ - Questions fréquemment posées",
    description: "Réponses aux questions les plus courantes sur InnovX",
    url: "/#faq",
    category: "sections",
    elementType: "section",
    content:
      "Trouvez des réponses aux questions les plus courantes concernant InnovX. Qu'est-ce qu'InnovX ? Comment fonctionne la crypto-monnaie InnovX Coin ? Comment puis-je m'inscrire aux formations ? Comment fonctionne la marketplace ? Comment contacter le support client ?",
    tags: ["faq", "questions", "réponses", "aide"],
  },
  {
    title: "Section Sécurité Renforcée",
    description: "Informations sur notre technologie de sécurité",
    url: "/#securite",
    category: "sections",
    elementType: "section",
    content:
      "Chez InnovX, la sécurité est notre priorité. Nous utilisons des technologies de pointe pour protéger vos données et transactions. Langages Solides: Utilisation de technologies robustes pour garantir la fiabilité du système. Blockchain: Sécurisation des transactions et de la crypto-monnaie InnovX Coin. Intelligence Artificielle: Détection des fraudes et amélioration de l'expérience utilisateur.",
    tags: ["sécurité", "protection", "blockchain", "ia", "données"],
  },
  // Page de coaching
  {
    title: "Page de Coaching",
    description: "Découvrez nos services de coaching personnalisé",
    url: "/coaching",
    category: "coaching",
    elementType: "page",
    content:
      "Bénéficiez d'un accompagnement personnalisé avec nos coachs experts pour atteindre vos objectifs personnels et professionnels.",
    tags: ["coaching", "accompagnement", "personnel", "professionnel"],
  },
  // Page de publicité
  {
    title: "Page de Publicité",
    description: "Nos solutions publicitaires pour promouvoir votre entreprise",
    url: "/publicite",
    category: "publicite",
    elementType: "page",
    content:
      "Découvrez nos solutions publicitaires efficaces pour promouvoir votre entreprise et atteindre votre audience cible.",
    tags: ["publicité", "promotion", "marketing", "entreprise"],
  },
  // Et bien d'autres contenus...
]

// Fonction pour rechercher dans le contenu du site
export const searchSiteContent = (query: string) => {
  if (!query.trim()) return []

  const searchTerms = query
    .toLowerCase()
    .split(" ")
    .filter((term) => term.length > 0)

  // Étendre les termes de recherche avec des synonymes
  const expandedTerms = expandSearchTerms(searchTerms)

  // Normaliser les termes de recherche
  const normalizedTerms = expandedTerms.map(normalizeText)

  // Filtrer le contenu en fonction des termes de recherche
  const matchedResults = siteContent.filter((item) => {
    // Normaliser le contenu de l'élément
    const normalizedTitle = normalizeText(item.title)
    const normalizedDesc = normalizeText(item.description)
    const normalizedContent = item.content ? normalizeText(item.content) : ""
    const normalizedCategory = normalizeText(item.category)
    const normalizedType = normalizeText(item.elementType)
    const normalizedTags = item.tags ? item.tags.map(normalizeText) : []

    const contentText = `${normalizedTitle} ${normalizedDesc} ${normalizedContent} ${normalizedCategory} ${normalizedType} ${normalizedTags.join(" ")}`

    // Vérifier les correspondances exactes (priorité élevée)
    const exactMatches = normalizedTerms.filter((term) => contentText.includes(term) || normalizedTitle.includes(term))

    // Vérifier les correspondances approximatives (tolérance aux fautes)
    const fuzzyMatches = normalizedTerms.filter((term) => {
      // Diviser le contenu en mots
      const words = contentText.split(/\s+/)

      // Vérifier si un mot est similaire au terme de recherche
      return words.some((word) => isSimilar(term, word, 0.3))
    })

    // Retourner true si au moins une correspondance exacte ou approximative
    return exactMatches.length > 0 || fuzzyMatches.length > 0
  })

  // Trier les résultats par pertinence
  const sortedResults = matchedResults.sort((a, b) => {
    const normalizedA = {
      title: normalizeText(a.title),
      desc: normalizeText(a.description),
      content: a.content ? normalizeText(a.content) : "",
      category: normalizeText(a.category),
      tags: a.tags ? a.tags.map(normalizeText) : [],
    }

    const normalizedB = {
      title: normalizeText(b.title),
      desc: normalizeText(b.description),
      content: b.content ? normalizeText(b.content) : "",
      category: normalizeText(b.category),
      tags: b.tags ? b.tags.map(normalizeText) : [],
    }

    let aScore = 0
    let bScore = 0

    // Calculer le score de pertinence pour chaque résultat
    normalizedTerms.forEach((term) => {
      // Correspondances exactes (priorité élevée)
      if (normalizedA.title === term) aScore += 100
      if (normalizedB.title === term) bScore += 100

      // Correspondances dans le titre
      if (normalizedA.title.includes(term)) aScore += 50
      if (normalizedB.title.includes(term)) bScore += 50

      // Correspondances au début du titre
      if (normalizedA.title.startsWith(term)) aScore += 30
      if (normalizedB.title.startsWith(term)) bScore += 30

      // Correspondances dans la description
      if (normalizedA.desc.includes(term)) aScore += 20
      if (normalizedB.desc.includes(term)) bScore += 20

      // Correspondances dans le contenu complet
      if (normalizedA.content.includes(term)) aScore += 15
      if (normalizedB.content.includes(term)) bScore += 15

      // Correspondances dans les tags
      if (normalizedA.tags.some((tag) => tag.includes(term))) aScore += 25
      if (normalizedB.tags.some((tag) => tag.includes(term))) bScore += 25

      // Correspondances dans la catégorie
      if (normalizedA.category.includes(term)) aScore += 10
      if (normalizedB.category.includes(term)) bScore += 10

      // Correspondances approximatives (moins prioritaires)
      const aWords = `${normalizedA.title} ${normalizedA.desc} ${normalizedA.content}`.split(/\s+/)
      const bWords = `${normalizedB.title} ${normalizedB.desc} ${normalizedB.content}`.split(/\s+/)

      aWords.forEach((word) => {
        if (isSimilar(term, word, 0.3)) aScore += 5
      })

      bWords.forEach((word) => {
        if (isSimilar(term, word, 0.3)) bScore += 5
      })
    })

    // Trier par score décroissant
    return bScore - aScore
  })

  return sortedResults.slice(0, 30) // Limiter à 30 résultats pour de meilleures performances
}
