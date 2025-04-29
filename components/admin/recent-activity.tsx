"use client"

export function AdminRecentActivity() {
  // Ces données seraient normalement chargées depuis une API
  const activities = [
    {
      user: "Jean Dupont",
      action: "a créé un nouveau compte",
      time: "Il y a 5 minutes",
    },
    {
      user: "Marie Martin",
      action: "a publié une nouvelle annonce",
      time: "Il y a 15 minutes",
    },
    {
      user: "Pierre Durand",
      action: "a modifié son profil",
      time: "Il y a 30 minutes",
    },
    {
      user: "Sophie Lefebvre",
      action: "a programmé une session de coaching",
      time: "Il y a 1 heure",
    },
    {
      user: "Lucas Bernard",
      action: "a ajouté un nouveau produit",
      time: "Il y a 2 heures",
    },
  ]

  return (
    <div className="space-y-4">
      {activities.map((activity, index) => (
        <div
          key={index}
          className="flex items-center justify-between pb-4 border-b border-gray-200 dark:border-gray-700 last:border-0 last:pb-0"
        >
          <div>
            <p className="text-sm font-medium">
              {activity.user} <span className="font-normal text-muted-foreground">{activity.action}</span>
            </p>
            <p className="text-xs text-muted-foreground">{activity.time}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
