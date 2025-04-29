"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { ArrowLeft } from "lucide-react"
import { CreditCard, HelpCircle, History, LogOut, Settings, Shield, User } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { cn } from "@/lib/utils"
import { useTheme } from "next-themes"
import { useRouter } from "next/navigation"

// Modifier la définition de buttonVariants pour ajouter des classes spécifiques au mode sombre
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:size-5 [&_svg]:shrink-0 [&_svg.x-icon]:text-white dark:border dark:border-yellow-500/30 dark:hover:border-yellow-500/70",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 dark:border-yellow-500/50",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border-2 border-black bg-background text-foreground hover:bg-accent hover:text-accent-foreground hover:border-black dark:border-yellow-500/50",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 dark:border-white/20",
        ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:border-yellow-500/50",
        link: "text-primary underline-offset-4 hover:underline dark:border-transparent",
        back: "flex items-center gap-2 text-foreground hover:bg-accent hover:text-accent-foreground dark:border-white/20",
        search:
          "bg-[#F8E061] text-black hover:bg-[#F8E061] disabled:bg-[#F8E061] disabled:opacity-70 dark:border-yellow-500/50",
      },
      size: {
        default: "h-12 px-6 py-3 text-base",
        sm: "h-9 rounded-md px-3",
        lg: "h-14 rounded-md px-10 py-4 text-lg",
        icon: "h-12 w-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isSettingsButton?: boolean
  isSendIcon?: boolean
  isTermsButton?: boolean
  id?: string
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size, isSettingsButton = false, isSendIcon = false, isTermsButton = false, ...props },
    ref,
  ) => {
    // Suppression de la logique conditionnelle avec Comp
    const { theme } = useTheme()
    const router = useRouter()

    // Modifier le gestionnaire d'événements handleClick pour intercepter toutes les redirections vers /politiques-conditions
    // Remplacer la fonction handleClick existante par celle-ci:

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      // Conserver uniquement les comportements essentiels
      if (isSettingsButton) {
        e.preventDefault()
        window.location.href = "/settings"
      } else if (isTermsButton) {
        e.preventDefault()
        router.push("/conditions-generales")
      }

      // Appeler le gestionnaire d'événements onClick d'origine s'il existe
      if (props.onClick) {
        props.onClick(e)
      }
    }

    return (
      <button
        className={cn(
          buttonVariants({
            variant: variant,
            size,
            className,
          }),
          // Ajuster la taille du bouton et de l'icône pour le menu mobile
          props["aria-label"] === "Menu" ? "h-10 w-10 p-0 [&_svg]:size-6 [&_svg]:w-6 [&_svg]:h-6" : "",
          // Réduire davantage la taille du bouton de recherche en mode mobile
          variant === "search" ? "md:h-12 md:w-12 h-8 w-8 p-0 text-xs [&_svg]:size-4 md:[&_svg]:size-5" : "",
          // Supprimer tous les effets de focus et d'outline en mode sombre
          "dark:focus:outline-none dark:focus:ring-0 dark:focus-visible:outline-none dark:focus-visible:ring-offset-0",
        )}
        ref={ref}
        {...props}
        onClick={isSettingsButton || isTermsButton ? handleClick : props.onClick}
        style={{
          marginTop: "4px", // Ajouter une marge de 4px (environ 1mm) en haut
          ...(theme === "dark"
            ? {
                outline: "none",
                boxShadow: "none",
                "--tw-ring-color": "transparent",
                "--tw-ring-offset-color": "transparent",
                "--tw-ring-shadow": "none",
              }
            : {}),
        }}
      >
        {isSendIcon ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
          >
            <path d="m22 2-7 20-4-9-9-4Z" />
            <path d="M22 2 11 13" />
          </svg>
        ) : (
          props.children
        )}
      </button>
    )
  },
)
Button.displayName = "Button"

// Composant de bouton retour séparé
const BackButton = React.forwardRef<HTMLButtonElement, Omit<ButtonProps, "variant">>((props, ref) => {
  const { theme } = useTheme()

  return (
    <Button
      ref={ref}
      variant="back"
      {...props}
      className={cn(
        "dark:focus:outline-none dark:focus:ring-0 dark:focus-visible:outline-none dark:focus-visible:ring-offset-0",
        props.className,
      )}
      style={{
        ...(theme === "dark"
          ? {
              outline: "none",
              boxShadow: "none",
              border: "none",
            }
          : {}),
      }}
      aria-label="Retour"
    >
      <ArrowLeft className="mr-1" />
      {props.children}
    </Button>
  )
})
BackButton.displayName = "BackButton"

// Composant de bouton avec une seule icône
const IconButton = React.forwardRef<HTMLButtonElement, Omit<ButtonProps, "children">>((props, ref) => {
  return (
    <Button
      ref={ref}
      variant={props.variant || "ghost"}
      size="icon"
      {...props}
      className={cn(
        "dark:focus:outline-none dark:focus:ring-0 dark:focus-visible:outline-none dark:focus-visible:ring-offset-0",
        props.className,
      )}
    >
      <ArrowLeft className="h-4 w-4" />
    </Button>
  )
})
IconButton.displayName = "IconButton"

// Composant de bouton paramètres avec menu déroulant
const SettingsButton = React.forwardRef<HTMLButtonElement, Omit<ButtonProps, "onClick">>((props, ref) => {
  const [open, setOpen] = React.useState(false)

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          ref={ref}
          variant={props.variant || "outline"}
          size={props.size || "icon"}
          {...props}
          className={cn(
            "dark:focus:outline-none dark:focus:ring-0 dark:focus-visible:outline-none dark:focus-visible:ring-offset-0",
            props.className,
          )}
        >
          <Settings className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuItem className="cursor-pointer">
          <User className="mr-2 h-4 w-4" />
          <span>Profil</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer">
          <Shield className="mr-2 h-4 w-4" />
          <span>Sécurité</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer">
          <History className="mr-2 h-4 w-4" />
          <span>Historique</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer">
          <CreditCard className="mr-2 h-4 w-4" />
          <span>Paiements</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer">
          <HelpCircle className="mr-2 h-4 w-4" />
          <span>Aide</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer text-red-600">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Déconnexion</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
})
SettingsButton.displayName = "SettingsButton"

// Composant de bouton paramètres qui redirige vers la page des paramètres
const SettingsPageButton = React.forwardRef<HTMLButtonElement, Omit<ButtonProps, "isSettingsButton">>((props, ref) => {
  return (
    <Button
      ref={ref}
      isSettingsButton={true}
      variant={props.variant || "outline"}
      size={props.size || "icon"}
      {...props}
      className={cn(
        "dark:focus:outline-none dark:focus:ring-0 dark:focus-visible:outline-none dark:focus-visible:ring-offset-0",
        props.className,
      )}
    >
      <Settings className="h-4 w-4" />
      {props.children}
    </Button>
  )
})
SettingsPageButton.displayName = "SettingsPageButton"

const PolicyButton = React.forwardRef<HTMLButtonElement, Omit<ButtonProps, "isSettingsButton">>((props, ref) => {
  return (
    <Button
      ref={ref}
      isTermsButton={true}
      variant={props.variant || "outline"}
      size={props.size || "icon"}
      {...props}
      className={cn(
        "dark:focus:outline-none dark:focus:ring-0 dark:focus-visible:outline-none dark:focus-visible:ring-offset-0",
        props.className,
      )}
    >
      {props.children}
    </Button>
  )
})
PolicyButton.displayName = "PolicyButton"

// Ajoutez SettingsButton à l'export
export { Button, BackButton, IconButton, SettingsButton, SettingsPageButton, buttonVariants, PolicyButton }
