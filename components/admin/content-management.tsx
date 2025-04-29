"use client"

import { useState } from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"

// Données fictives pour les textes des boutons
const buttonTexts = {
  header: [
    { id: "home", label: "Accueil", value: "Accueil" },
    { id: "services", label: "Services", value: "Services" },
    { id: "formations", label: "Formations", value: "Formations" },
    { id: "coaching", label: "Coaching", value: "Coaching" },
    { id: "marketplace", label: "Marketplace", value: "Marketplace" },
  ],
  footer: [
    { id: "privacy", label: "Politique de confidentialité", value: "Politique de Confidentialité" },
    { id: "terms", label: "Conditions d'utilisation", value: "Conditions Générales D'Utilisation" },
    { id: "sales", label: "Conditions de vente", value: "Conditions Générales de Vente" },
    { id: "refund", label: "Conditions de remboursement", value: "Conditions de Remboursement" },
    { id: "partnership", label: "Conditions de partenariat", value: "Conditions de Partenariat" },
  ],
  homepage: [
    { id: "cta_primary", label: "Bouton d'action principal", value: "Découvrir nos services" },
    { id: "cta_secondary", label: "Bouton d'action secondaire", value: "En savoir plus" },
  ],
}

// Données fictives pour les textes des sections
const sectionTexts = {
  homepage: [
    { id: "hero_title", label: "Titre principal", value: "Bienvenue sur InnovX" },
    { id: "hero_subtitle", label: "Sous-titre", value: "La plateforme qui révolutionne votre expérience digitale" },
    { id: "about_title", label: "Titre À propos", value: "À propos d'InnovX" },
    {
      id: "about_content",
      label: "Contenu À propos",
      value: "InnovX est une plateforme innovante qui propose des services de qualité...",
    },
  ],
  services: [
    { id: "services_title", label: "Titre Services", value: "Nos Services" },
    { id: "services_subtitle", label: "Sous-titre Services", value: "Découvrez notre gamme complète de services" },
  ],
}

export function ContentManagement() {
  const [activeTab, setActiveTab] = useState("buttons")
  const [editedButtonTexts, setEditedButtonTexts] = useState(buttonTexts)
  const [editedSectionTexts, setEditedSectionTexts] = useState(sectionTexts)

  // Gérer les modifications des textes des boutons
  const handleButtonTextChange = (section: string, id: string, value: string) => {
    setEditedButtonTexts({
      ...editedButtonTexts,
      [section]: editedButtonTexts[section as keyof typeof editedButtonTexts].map((item) =>
        item.id === id ? { ...item, value } : item,
      ),
    })
  }

  // Gérer les modifications des textes des sections
  const handleSectionTextChange = (section: string, id: string, value: string) => {
    setEditedSectionTexts({
      ...editedSectionTexts,
      [section]: editedSectionTexts[section as keyof typeof editedSectionTexts].map((item) =>
        item.id === id ? { ...item, value } : item,
      ),
    })
  }

  // Simuler la sauvegarde des modifications
  const handleSave = () => {
    // Ici, vous enverriez normalement les données à votre API
    toast({
      title: "Modifications enregistrées",
      description: "Les modifications ont été enregistrées avec succès.",
    })
  }

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="buttons">Textes des boutons</TabsTrigger>
          <TabsTrigger value="sections">Textes des sections</TabsTrigger>
        </TabsList>

        <TabsContent value="buttons" className="space-y-4 pt-4">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="header">
              <AccordionTrigger>En-tête</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  {editedButtonTexts.header.map((item) => (
                    <div key={item.id} className="grid gap-2">
                      <Label htmlFor={`header-${item.id}`}>{item.label}</Label>
                      <Input
                        id={`header-${item.id}`}
                        value={item.value}
                        onChange={(e) => handleButtonTextChange("header", item.id, e.target.value)}
                      />
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="footer">
              <AccordionTrigger>Pied de page</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  {editedButtonTexts.footer.map((item) => (
                    <div key={item.id} className="grid gap-2">
                      <Label htmlFor={`footer-${item.id}`}>{item.label}</Label>
                      <Input
                        id={`footer-${item.id}`}
                        value={item.value}
                        onChange={(e) => handleButtonTextChange("footer", item.id, e.target.value)}
                      />
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="homepage">
              <AccordionTrigger>Page d'accueil</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  {editedButtonTexts.homepage.map((item) => (
                    <div key={item.id} className="grid gap-2">
                      <Label htmlFor={`homepage-${item.id}`}>{item.label}</Label>
                      <Input
                        id={`homepage-${item.id}`}
                        value={item.value}
                        onChange={(e) => handleButtonTextChange("homepage", item.id, e.target.value)}
                      />
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div className="flex justify-end">
            <Button onClick={handleSave}>Enregistrer les modifications</Button>
          </div>
        </TabsContent>

        <TabsContent value="sections" className="space-y-4 pt-4">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="homepage">
              <AccordionTrigger>Page d'accueil</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  {editedSectionTexts.homepage.map((item) => (
                    <div key={item.id} className="grid gap-2">
                      <Label htmlFor={`section-homepage-${item.id}`}>{item.label}</Label>
                      {item.id.includes("content") ? (
                        <Textarea
                          id={`section-homepage-${item.id}`}
                          value={item.value}
                          onChange={(e) => handleSectionTextChange("homepage", item.id, e.target.value)}
                          rows={4}
                        />
                      ) : (
                        <Input
                          id={`section-homepage-${item.id}`}
                          value={item.value}
                          onChange={(e) => handleSectionTextChange("homepage", item.id, e.target.value)}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="services">
              <AccordionTrigger>Services</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  {editedSectionTexts.services.map((item) => (
                    <div key={item.id} className="grid gap-2">
                      <Label htmlFor={`section-services-${item.id}`}>{item.label}</Label>
                      {item.id.includes("content") ? (
                        <Textarea
                          id={`section-services-${item.id}`}
                          value={item.value}
                          onChange={(e) => handleSectionTextChange("services", item.id, e.target.value)}
                          rows={4}
                        />
                      ) : (
                        <Input
                          id={`section-services-${item.id}`}
                          value={item.value}
                          onChange={(e) => handleSectionTextChange("services", item.id, e.target.value)}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div className="flex justify-end">
            <Button onClick={handleSave}>Enregistrer les modifications</Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
