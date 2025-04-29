"use client"

import { useState, useEffect, useRef } from "react"

export type CurrencyOption = {
  value: string
  label: string
  imagePath: string
}

interface CurrencySelectorProps {
  options: CurrencyOption[]
  value: string
  onChange: (value: string) => void
  placeholder?: string
  disabled?: boolean
  className?: string
}

// Modifier le composant CurrencySelector pour améliorer son affichage sur mobile

// Ajouter ces styles pour améliorer l'apparence sur mobile
export const CurrencySelector = ({ options, value, onChange, placeholder }: CurrencySelectorProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Fermer le dropdown quand on clique à l'extérieur
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Trouver l'option sélectionnée
  const selectedOption = options.find((option) => option.value === value)

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <button
        type="button"
        className="w-full flex items-center justify-between bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md px-4 py-3 text-left cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedOption ? (
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full overflow-hidden mr-3 flex-shrink-0">
              <img
                src={selectedOption.imagePath || "/placeholder.svg"}
                alt={selectedOption.label}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="block truncate text-base">{selectedOption.label}</span>
          </div>
        ) : (
          <span className="block truncate text-gray-500 text-base">{placeholder}</span>
        )}
        <span className="ml-3 flex items-center">
          <svg
            className={`h-5 w-5 transition-transform ${isOpen ? "transform rotate-180" : ""}`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </span>
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-800 shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none">
          {options.map((option) => (
            <button
              key={option.value}
              className={`w-full text-left px-4 py-2 flex items-center hover:bg-gray-100 dark:hover:bg-gray-700 ${
                option.value === value ? "bg-gray-100 dark:bg-gray-700" : ""
              }`}
              onClick={() => {
                onChange(option.value)
                setIsOpen(false)
              }}
            >
              <div className="w-8 h-8 rounded-full overflow-hidden mr-3 flex-shrink-0">
                <img
                  src={option.imagePath || "/placeholder.svg"}
                  alt={option.label}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="block truncate text-base">{option.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
