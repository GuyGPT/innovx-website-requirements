"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"

export default function CTASection() {
  const titleRef = useRef<HTMLHeadingElement>(null)
  const descriptionRef = useRef<HTMLParagraphElement>(null)
  const buttonsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const titleElement = titleRef.current
    const descriptionElement = descriptionRef.current
    const buttonsElement = buttonsRef.current

    if (titleElement && descriptionElement && buttonsElement) {
      const observerOptions = { threshold: 0.1, rootMargin: "-100px 0px" }

      const titleObserver = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          titleElement.classList.add("opacity-100", "translate-y-0")
        } else {
          titleElement.classList.remove("opacity-100", "translate-y-0")
        }
      }, observerOptions)

      const descriptionObserver = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          descriptionElement.classList.add("opacity-100", "translate-y-0")
        } else {
          descriptionElement.classList.remove("opacity-100", "translate-y-0")
        }
      }, observerOptions)

      const buttonsObserver = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          buttonsElement.classList.add("opacity-100", "translate-y-0")
        } else {
          buttonsElement.classList.remove("opacity-100", "translate-y-0")
        }
      }, observerOptions)

      titleObserver.observe(titleElement)
      descriptionObserver.observe(descriptionElement)
      buttonsObserver.observe(buttonsElement)

      return () => {
        titleObserver.disconnect()
        descriptionObserver.disconnect()
        buttonsObserver.disconnect()
      }
    }
  }, [])

  return (
    <section className="py-8 md:py-10 bg-background dark:bg-[#040504]" id="cta-section">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <h2
            ref={titleRef}
            className="text-3xl font-bold mb-4 opacity-0 transform translate-y-4 transition-all duration-1000 ease-out"
          >
            Rejoignez l'aventure InnovX
          </h2>
          <p
            ref={descriptionRef}
            className="text-lg mb-8 opacity-0 transform translate-y-4 transition-all duration-1000 ease-out delay-300"
          >
            Que vous soyez un apprenant, un prestataire de services ou un partenaire potentiel, nous serions ravis de
            vous accueillir dans notre communauté.
          </p>
          <div
            ref={buttonsRef}
            className="flex flex-col sm:flex-row gap-4 justify-center opacity-0 transform translate-y-4 transition-all duration-1000 ease-out delay-500"
          >
            <Link href="/register">
              <button className="w-full bg-innovx-yellow text-black py-3 md:py-5 px-4 md:px-7 rounded-2xl font-bold text-sm md:text-base border-2 border-black shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all">
                Créer un compte
              </button>
            </Link>
            <Link href="/contact">
              <button className="w-full bg-innovx-yellow text-black py-3 md:py-5 px-4 md:px-7 rounded-2xl font-bold text-sm md:text-base border-2 border-black shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all">
                Nous contacter
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
