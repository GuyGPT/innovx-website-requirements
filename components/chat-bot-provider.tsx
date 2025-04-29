"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

// Créer un contexte pour le chatbot
export const ChatBotContext = createContext<{
  isOpen: boolean
  openChat: () => void
  closeChat: () => void
  toggleChat: () => void
}>({
  isOpen: false,
  openChat: () => {},
  closeChat: () => {},
  toggleChat: () => {},
})

// Hook personnalisé pour utiliser le chatbot
export const useChatBot = () => useContext(ChatBotContext)

interface ChatBotProviderProps {
  children: ReactNode
}

export function ChatBotProvider({ children }: ChatBotProviderProps) {
  const [isOpen, setIsOpen] = useState(false)

  // Fonction pour ouvrir le chat
  const openChat = () => {
    setIsOpen(true)
  }

  // Fonction pour fermer le chat
  const closeChat = () => {
    setIsOpen(false)
  }

  // Fonction pour basculer l'état du chat
  const toggleChat = () => {
    setIsOpen(!isOpen)
  }

  // Fournir le contexte du chatbot
  const chatbotContextValue = {
    isOpen,
    openChat,
    closeChat,
    toggleChat,
  }

  return <ChatBotContext.Provider value={chatbotContextValue}>{children}</ChatBotContext.Provider>
}
