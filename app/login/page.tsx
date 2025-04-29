"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { useTheme } from "next-themes"

export default function LoginPage() {
  const { theme } = useTheme()

  return (
    <div className="flex min-h-screen">
      <div className="hidden md:flex flex-1 bg-secondary">
        <div className="flex flex-col justify-center items-center w-full p-8">
          <div className="max-w-md text-center text-secondary-foreground">
            <h1 className="text-3xl font-bold mb-6">Bienvenue sur INNOVX</h1>
            <p className="mb-8">
              Plateforme multifonctionnelle intégrant formations, services, marketplace, publicité, crypto-monnaie et
              nouvelles technologies.
            </p>
            <Image
              src="/placeholder.svg?height=400&width=400"
              alt="INNOVX"
              width={400}
              height={400}
              className="mx-auto rounded-lg"
            />
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-center items-center p-8">
        <div className="w-full max-w-md">
          <div className="flex flex-col items-center mb-8">
            <Image
              src="/placeholder.svg?height=60&width=60"
              alt="INNOVX Logo"
              width={60}
              height={60}
              className="mb-4"
            />
            <h2 className="text-2xl font-bold">Connexion</h2>
            <p className="text-muted-foreground mt-2">Connectez-vous à votre compte INNOVX</p>
          </div>

          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="nom@exemple.com" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Mot de passe</Label>
                <Link href="/forgot-password" className="text-sm text-foreground hover:underline">
                  Mot de passe oublié?
                </Link>
              </div>
              <Input id="password" type="password" placeholder="••••••••" />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="remember"
                className="border-gray-300 text-black data-[state=checked]:bg-black data-[state=checked]:border-black"
              />
              <Label htmlFor="remember" className="text-sm font-normal text-foreground">
                Se souvenir de moi
              </Label>
            </div>

            <Button type="submit" className="w-full">
              Se connecter
            </Button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">Ou continuer avec</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-6">
              <Button
                variant="outline"
                className="w-full"
                style={{
                  borderColor: theme === "dark" ? "white" : undefined,
                  borderWidth: theme === "dark" ? "1px" : undefined,
                }}
              >
                Google
              </Button>
              <Button
                variant="outline"
                className="w-full"
                style={{
                  borderColor: theme === "dark" ? "white" : undefined,
                  borderWidth: theme === "dark" ? "1px" : undefined,
                }}
              >
                Facebook
              </Button>
            </div>

            <div className="relative mt-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">Ou</span>
              </div>
            </div>

            <Button variant="outline" className="w-full mt-4" asChild>
              <Link href="/register">S'inscrire</Link>
            </Button>
          </div>

          <p className="text-center mt-6"></p>
        </div>
      </div>
    </div>
  )
}
