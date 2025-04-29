"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { MessageSquare, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { usePathname } from "next/navigation"
import { useChatBot } from "./chat-bot-provider"

export default function ChatBotButton() {
  const { isOpen, openChat, closeChat, toggleChat } = useChatBot()
  const [messages, setMessages] = useState<{ sender: "user" | "bot"; text: string }[]>([
    { sender: "bot", text: "Bonjour ! Comment puis-je vous aider aujourd'hui ?" },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isShaking, setIsShaking] = useState(false)
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null)
  const pathname = usePathname()

  // Effet pour déclencher l'animation après changement de page
  useEffect(() => {
    // Déclencher l'animation
    setIsShaking(true)

    // Arrêter l'animation après 1 seconde
    const animationTimer = setTimeout(() => {
      setIsShaking(false)
    }, 1000)

    // Réinitialiser le timer d'inactivité
    resetInactivityTimer()

    return () => {
      clearTimeout(animationTimer)
      if (inactivityTimerRef.current) {
        clearTimeout(inactivityTimerRef.current)
      }
    }
  }, [pathname])

  // Fonction pour réinitialiser le timer d'inactivité
  const resetInactivityTimer = () => {
    if (inactivityTimerRef.current) {
      clearTimeout(inactivityTimerRef.current)
    }

    inactivityTimerRef.current = setTimeout(() => {
      setIsShaking(true)

      // Arrêter l'animation après 1 seconde
      setTimeout(() => {
        setIsShaking(false)
      }, 1000)
    }, 10000) // 10 secondes
  }

  // Effet pour configurer les écouteurs d'événements pour réinitialiser le timer d'inactivité
  useEffect(() => {
    // Événements qui réinitialisent le timer d'inactivité
    const events = ["mousedown", "mousemove", "keypress", "scroll", "touchstart"]

    // Ajouter les écouteurs d'événements
    events.forEach((event) => {
      document.addEventListener(event, resetInactivityTimer)
    })

    // Initialiser le timer
    resetInactivityTimer()

    // Nettoyer les écouteurs d'événements
    return () => {
      events.forEach((event) => {
        document.removeEventListener(event, resetInactivityTimer)
      })

      if (inactivityTimerRef.current) {
        clearTimeout(inactivityTimerRef.current)
      }
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim()) return

    // Ajouter le message de l'utilisateur
    setMessages([...messages, { sender: "user", text: inputValue }])

    // Simuler une réponse du bot après un court délai
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "Merci pour votre message. Un conseiller INNOVX vous répondra très bientôt.",
        },
      ])
    }, 1000)

    setInputValue("")
  }

  return (
    <>
      {/* Bouton du chatbot */}
      <button
        onClick={toggleChat}
        className={`fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-50 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm text-black dark:text-white flex items-center justify-center shadow-lg transition-all duration-300 !border-0 !outline-none !ring-0 hover:bg-white/40 dark:hover:bg-gray-800/40 ${isShaking ? "animate-shake" : ""}`}
        aria-label="Ouvrir le chat"
      >
        <MessageSquare className="h-5 w-5 sm:h-6 sm:w-6" />
      </button>

      {/* Fenêtre de chat */}
      {isOpen && (
        <div className="fixed bottom-20 sm:bottom-24 right-2 sm:right-6 z-50 w-[calc(100%-1rem)] max-w-[20rem] sm:max-w-[24rem] bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 flex flex-col overflow-hidden">
          {/* En-tête */}
          <div className="bg-[#F8E061] text-black p-3 sm:p-4 flex justify-between items-center">
            <h3 className="font-bold text-sm sm:text-base">Chat INNOVX</h3>
            <Button
              variant="ghost"
              size="icon"
              onClick={closeChat}
              className="h-7 w-7 sm:h-8 sm:w-8 rounded-full hover:bg-yellow-500/20"
            >
              <X className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-3 sm:p-4 overflow-y-auto max-h-60 sm:max-h-80 space-y-3 sm:space-y-4">
            {messages.map((message, index) => (
              <div key={index} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[85%] p-2 sm:p-3 rounded-lg text-sm sm:text-base ${
                    message.sender === "user"
                      ? "bg-[#F8E061] text-black rounded-br-none"
                      : "bg-gray-200 dark:bg-gray-700 text-black dark:text-white rounded-bl-none"
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </div>

          {/* Formulaire de saisie */}
          <form
            onSubmit={handleSubmit}
            className="border-t border-gray-200 dark:border-gray-700 p-2 sm:p-4 flex gap-2 w-full max-w-full overflow-hidden"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Tapez votre message..."
              className="flex-1 min-w-0 p-2 text-sm sm:text-base border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F8E061] dark:bg-gray-700 dark:text-white"
            />
            <Button
              type="submit"
              className="bg-[#F8E061] hover:bg-[#F8E061]/90 text-black text-sm sm:text-base px-2 sm:px-4 flex-shrink-0"
            >
              Envoyer
            </Button>
          </form>
        </div>
      )}
      {/* Style pour l'animation de trémouissement */}
      <style jsx global>{`
        @keyframes shake {
          0% { transform: translateX(0); }
          25% { transform: translateX(-5px) rotate(-5deg); }
          50% { transform: translateX(5px) rotate(5deg); }
          75% { transform: translateX(-5px) rotate(-5deg); }
          100% { transform: translateX(0); }
        }
        
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>
    </>
  )
}
