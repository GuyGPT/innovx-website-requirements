"use client"

import { useState, useEffect } from "react"
import { searchSiteContent, type SearchResult } from "@/lib/search-utils"

export function useSearch() {
  const [searchQuery, setSearchQuery] = useState("")
  const [results, setResults] = useState<SearchResult[]>([])
  const [showResults, setShowResults] = useState(false)
  const [isSearching, setIsSearching] = useState(false)

  // Effectuer la recherche lorsque la requête change
  useEffect(() => {
    if (searchQuery.trim()) {
      setIsSearching(true)

      const timer = setTimeout(() => {
        // Rechercher dans le contenu du site
        const searchResults = searchSiteContent(searchQuery)
        setResults(searchResults)
        setIsSearching(false)
      }, 300)

      return () => clearTimeout(timer)
    } else {
      setResults([])
      setIsSearching(false)
    }
  }, [searchQuery])

  // Fonction pour effectuer une recherche explicite (par exemple, lors de la soumission d'un formulaire)
  const performSearch = () => {
    if (searchQuery.trim()) {
      setIsSearching(true)

      // Simuler un délai de recherche (comme si on interrogeait une API)
      setTimeout(() => {
        const searchResults = searchSiteContent(searchQuery)
        setResults(searchResults)
        setIsSearching(false)
        setShowResults(true)
      }, 300)
    }
  }

  return {
    searchQuery,
    setSearchQuery,
    results,
    showResults,
    setShowResults,
    isSearching,
    performSearch,
  }
}
