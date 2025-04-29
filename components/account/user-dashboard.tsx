"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, DollarSign, Clock, AlertCircle } from "lucide-react"
import Link from "next/link"

export function UserDashboard() {
  // Ces données seraient normalement chargées depuis une API
  const userData = {
    name: "Jean Dupont",
    email: "jean.dupont@example.com",
    stats: {
      publications: 12,
      pendingPublications: 2,
      affiliationBalance: "250 InnovX",
      commissions: "75 InnovX",
    },
    recentActivity: [
      {
        id: "act1",
        type: "publication_approved",
        title: "Formation sur le trading de crypto-monnaies",
        date: "2023-12-02T14:30:00",
      },
      {
        id: "act2",
        type: "commission_earned",
        title: "Commission sur l'achat de 'Guide complet sur l'IA'",
        amount: "25 InnovX",
        date: "2023-12-01T10:15:00",
      },
      {
        id: "act3",
        type: "publication_pending",
        title: "Services de consultation en SEO",
        date: "2023-11-30T16:45:00",
      },
    ],
    notifications: [
      {
        id: "notif1",
        type: "warning",
        message: "Votre publication 'Méthode de trading algorithmique' ne respecte pas nos règles et a été rejetée.",
        date: "2023-12-01T09:20:00",
      },
      {
        id: "notif2",
        type: "info",
        message: "Une nouvelle commission de 25 InnovX a été créditée sur votre compte.",
        date: "2023-12-01T10:15:00",
      },
    ],
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Publications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userData.stats.publications}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {userData.stats.pendingPublications} en attente de modération
            </p>
            <Link
              href="/account/publications"
              className="text-xs text-muted-foreground hover:underline inline-block mt-2"
            >
              Voir toutes mes publications
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Solde d'affiliation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userData.stats.affiliationBalance}</div>
            <p className="text-xs text-muted-foreground mt-1">{userData.stats.commissions} de commissions ce mois-ci</p>
            <Link
              href="/account/affiliation"
              className="text-xs text-muted-foreground hover:underline inline-block mt-2"
            >
              Gérer mon programme d'affiliation
            </Link>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Activités récentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {userData.recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  {activity.type === "publication_approved" && <FileText className="h-5 w-5 text-green-500 mt-0.5" />}
                  {activity.type === "commission_earned" && (
                    <DollarSign className="h-5 w-5 text-muted-foreground mt-0.5" />
                  )}
                  {activity.type === "publication_pending" && (
                    <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
                  )}
                  <div>
                    <p className="text-sm font-medium">{activity.title}</p>
                    {activity.amount && <p className="text-sm text-muted-foreground">{activity.amount}</p>}
                    <p className="text-xs text-muted-foreground">{formatDate(activity.date)}</p>
                  </div>
                </div>
              ))}

              {userData.recentActivity.length === 0 && (
                <p className="text-sm text-muted-foreground">Aucune activité récente.</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {userData.notifications.map((notification) => (
                <div key={notification.id} className="flex items-start space-x-3">
                  <AlertCircle
                    className={`h-5 w-5 mt-0.5 ${notification.type === "warning" ? "text-red-500" : "text-blue-500"}`}
                  />
                  <div>
                    <p className="text-sm">{notification.message}</p>
                    <p className="text-xs text-muted-foreground">{formatDate(notification.date)}</p>
                  </div>
                </div>
              ))}

              {userData.notifications.length === 0 && (
                <p className="text-sm text-muted-foreground">Aucune notification.</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
