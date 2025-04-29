"use client"

import SearchInput from "@/components/search-input"

interface SearchBarProps {
  placeholder?: string
  className?: string
}

export default function SearchBar({ placeholder = "Rechercher sur le site...", className = "" }: SearchBarProps) {
  return (
    <div className="w-full flex justify-center items-center">
      <div className="w-full max-w-[320px]">
        <SearchInput placeholder={placeholder} className={className} id="global-search-results" />
      </div>
    </div>
  )
}
