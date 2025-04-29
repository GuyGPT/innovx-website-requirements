"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, ShoppingBag, FileText, Calendar } from "lucide-react"

export function AdminDashboardStats() {
  // Ces données seraient normalement chargées depuis une API
  const stats = [
    {
      title: "Utilisateurs totaux",
      value: "1,234",
      icon: Users,
      description: "+12% depuis le mois dernier",
    },
    {
      title: "Vendeurs actifs",
      value: "342",
      icon: ShoppingBag,
      description: "+5% depuis le mois dernier",
    },
    {
      title: "Annonces publiées",
      value: "573",
      icon: FileText,
      description: "+18% depuis le mois dernier",
    },
    {
      title: "Sessions de coaching",
      value: "89",
      icon: Calendar,
      description: "+7% depuis le mois dernier",
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
