"use client"

import type React from "react"

import { useEffect } from "react"
import { Search } from "lucide-react"
import { useRouter } from "next/navigation"
import { useSearch } from "@/hooks/use-search"

interface SearchInputProps {
  placeholder?: string
  className?: string
  onSearch?: (query: string) => void
  showResultsDropdown?: boolean
  id?: string
}

export default function SearchInput({
  placeholder = "Rechercher...", // Cette valeur sera ignorée
  className = "",
  onSearch,
  showResultsDropdown = true,
  id = "search-input",
}: SearchInputProps) {
  const router = useRouter()
  const { searchQuery, setSearchQuery, results, showResults, setShowResults, isSearching, performSearch } = useSearch()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      performSearch()
      if (onSearch) {
        onSearch(searchQuery)
      }
    }
  }

  // Gérer le focus/blur pour afficher/masquer les résultats
  const handleFocus = () => {
    if (searchQuery.trim() && showResultsDropdown) {
      setShowResults(true)
    }
  }

  // Gérer le clic en dehors de la zone de recherche
  useEffect(() => {
    if (!showResultsDropdown) return

    const handleClickOutside = (event: MouseEvent) => {
      const searchContainer = document.getElementById(id)?.parentElement
      if (searchContainer && !searchContainer.contains(event.target as Node)) {
        setShowResults(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [setShowResults, id, showResultsDropdown])

  return (
    <div className="relative w-full max-w-[320px] mx-auto">
      <form onSubmit={handleSearch} className={`relative w-full ${className}`}>
        <div className="relative flex h-10 w-full rounded-md overflow-hidden border border-gray-300 focus-within:border-[#F8E061] focus-within:ring focus-within:ring-[#F8E061]/20">
          <input
            type="search"
            placeholder="Rechercher..."
            value={searchQuery}
            onChange={(e) => {
              const newValue = e.target.value
              setSearchQuery(newValue)
              // Appeler immédiatement onSearch si fourni
              if (onSearch) {
                onSearch(newValue)
              }
              // Déclencher également la recherche standard si nécessaire
              if (newValue.trim() && showResultsDropdown) {
                performSearch()
              }
            }}
            onFocus={handleFocus}
            className="flex-grow pl-3 pr-2 py-2 text-sm bg-white text-black border-none focus:outline-none dark:bg-gray-900 dark:text-white"
            aria-label="Rechercher"
            aria-autocomplete={showResultsDropdown ? "list" : "none"}
            aria-controls={showResultsDropdown ? id : undefined}
            aria-expanded={showResultsDropdown && showResults && results.length > 0}
            autoComplete="off"
            spellCheck="true"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault()
                handleSearch(e as unknown as React.FormEvent)
              }
            }}
          />
          <button
            type="submit"
            className="h-full w-10 flex items-center justify-center bg-[#F8E061] hover:bg-[#F8E061]/90 text-black"
            disabled={!searchQuery.trim() || isSearching}
            aria-label="Rechercher"
          >
            {isSearching ? "..." : <Search className="h-4 w-4" />}
          </button>
        </div>
      </form>

      {/* Affichage des résultats */}
      {showResultsDropdown && showResults && searchQuery.trim() && (
        <div
          id={id}
          className="absolute z-50 w-full mt-1 bg-white rounded-md shadow-lg border border-gray-200 max-h-[70vh] overflow-y-auto"
        >
          {isSearching ? (
            <div className="p-4 text-center">
              <div
                className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-solid border-[#F8E061] border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                role="status"
              >
                <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                  Recherche en cours...
                </span>
              </div>
              <p className="mt-2 text-gray-500">Recherche approfondie sur tout le site en cours...</p>
            </div>
          ) : results.length > 0 ? (
            <div>
              <div className="sticky top-0 bg-gray-100 p-2 border-b border-gray-200 flex justify-between items-center">
                <span className="font-medium text-sm">{results.length} résultats trouvés</span>
                <button
                  onClick={() => setShowResults(false)}
                  className="text-gray-500 hover:text-gray-700"
                  aria-label="Fermer les résultats"
                >
                  ✕
                </button>
              </div>
              <ul className="py-2 divide-y divide-gray-100">
                {results.map((result, index) => (
                  <li key={index} className="hover:bg-gray-50 transition-colors">
                    <button
                      className="block px-4 py-3 w-full text-left"
                      onClick={() => {
                        setShowResults(false)
                        // Ajouter un log pour déboguer l'URL
                        console.log("Redirection vers:", result.url)

                        // Forcer la navigation complète pour s'assurer que la redirection fonctionne
                        window.location.href = result.url
                      }}
                    >
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            result.category === "formations"
                              ? "bg-blue-100 text-blue-800"
                              : result.category === "services"
                                ? "bg-green-100 text-green-800"
                                : result.category === "marketplace"
                                  ? "bg-purple-100 text-purple-800"
                                  : result.category === "crypto"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : result.category === "boutons"
                                      ? "bg-orange-100 text-orange-800"
                                      : result.category === "sections"
                                        ? "bg-indigo-100 text-indigo-800"
                                        : result.category === "textes"
                                          ? "bg-pink-100 text-pink-800"
                                          : result.category === "pages"
                                            ? "bg-teal-100 text-teal-800"
                                            : "bg-gray-200 text-gray-700"
                          }`}
                        >
                          {result.category}
                        </span>
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            result.elementType === "page"
                              ? "bg-blue-50 text-blue-600 border border-blue-200"
                              : result.elementType === "section"
                                ? "bg-green-50 text-green-600 border border-green-200"
                                : result.elementType === "button"
                                  ? "bg-yellow-50 text-yellow-600 border border-yellow-200"
                                  : result.elementType === "text"
                                    ? "bg-pink-50 text-pink-600 border border-pink-200"
                                    : "bg-gray-50 text-gray-600 border border-gray-200"
                          }`}
                        >
                          {result.elementType}
                        </span>
                        {result.tags && result.tags.length > 0 && (
                          <span className="text-xs text-gray-500">
                            {result.tags.slice(0, 3).join(", ")}
                            {result.tags.length > 3 ? "..." : ""}
                          </span>
                        )}
                      </div>
                      <h4 className="font-medium text-base">{result.title}</h4>
                      <p className="text-sm text-gray-600 mt-1 line-clamp-2">{result.description}</p>
                      <div className="mt-2 text-xs text-black hover:underline">Voir plus →</div>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="p-6 text-center">
              <p className="text-gray-500 mb-2">Aucun résultat trouvé pour "{searchQuery}"</p>
              <p className="text-sm text-gray-400 mb-3">Essayez avec d'autres mots-clés ou vérifiez l'orthographe</p>
              <div className="text-sm">
                <p className="font-medium mb-1">Suggestions :</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {["formations", "services", "crypto", "solana", "marketplace", "coaching"].map((suggestion) => (
                    <button
                      key={suggestion}
                      className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-xs"
                      onClick={() => setSearchQuery(suggestion)}
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
