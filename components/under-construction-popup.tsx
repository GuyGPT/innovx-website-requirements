"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

interface UnderConstructionPopupProps {
  isOpen: boolean
  onClose: () => void
}

export function UnderConstructionPopup({ isOpen, onClose }: UnderConstructionPopupProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg max-w-md w-full relative overflow-hidden">
        <div className="p-6">
          <div className="bg-[#F8E061]/20 p-4 rounded-lg mb-4">
            <h2 className="text-xl font-bold text-center mb-4">🚀 Page en cours de finalisation ! 🚀</h2>

            <p className="mb-4">
              Cher utilisateur, cette section de notre site est encore en construction afin de vous offrir la meilleure
              expérience possible.
            </p>

            <p className="font-medium text-center mb-4">📅 Disponibilité prévue : Très bientôt</p>

            <p className="mb-4">
              Nous vous remercions pour votre patience et votre intérêt pour InnovX. Restez connectés, nous arrivons
              bientôt avec du contenu de qualité !
            </p>

            <p className="font-medium text-center">🔔 Besoin d'informations ? Contactez-nous dès maintenant.</p>
          </div>

          <div className="flex justify-center">
            <Button
              onClick={onClose}
              className="bg-[#F8E061] hover:bg-[#F8E061]/90 text-black font-medium border-2 border-black"
            >
              Retour
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export function useUnderConstructionPopup() {
  const [isPopupOpen, setIsPopupOpen] = useState(false)

  const openPopup = () => setIsPopupOpen(true)
  const closePopup = () => setIsPopupOpen(false)

  return {
    isPopupOpen,
    openPopup,
    closePopup,
    PopupComponent: () => <UnderConstructionPopup isOpen={isPopupOpen} onClose={closePopup} />,
  }
}
