"use client"

import { useState, useEffect } from "react"
import { X, Cookie } from "lucide-react"
import Link from "next/link"

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent")
    if (!consent) {
      // Small delay for better UX
      const timer = setTimeout(() => setIsVisible(true), 1500)
      return () => clearTimeout(timer)
    }
  }, [])

  const acceptCookies = () => {
    localStorage.setItem("cookie-consent", "accepted")
    setIsVisible(false)
  }

  const declineCookies = () => {
    localStorage.setItem("cookie-consent", "declined")
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6">
      <div className="mx-auto max-w-4xl">
        <div className="relative rounded-2xl border border-border bg-card/95 backdrop-blur-xl p-4 md:p-6 shadow-2xl">
          {/* Close button */}
          <button
            onClick={declineCookies}
            className="absolute top-3 right-3 p-1 rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/10 transition-colors"
            aria-label="Fechar"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="flex flex-col md:flex-row md:items-center gap-4">
            {/* Icon and Text */}
            <div className="flex items-start gap-4 flex-1">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 border border-primary/20">
                <Cookie className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1 pr-6 md:pr-0">
                <h3 className="text-base font-semibold text-foreground mb-1">
                  Utilizamos cookies
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Usamos cookies para melhorar sua experiencia, analisar o trafego e personalizar conteudo. 
                  Ao continuar navegando, voce concorda com nossa{" "}
                  <Link href="/cookies" className="text-primary hover:underline">
                    Politica de Cookies
                  </Link>{" "}
                  e{" "}
                  <Link href="/privacidade" className="text-primary hover:underline">
                    Politica de Privacidade
                  </Link>.
                </p>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex items-center gap-3 md:shrink-0">
              <button
                onClick={declineCookies}
                className="flex-1 md:flex-none px-4 py-2.5 rounded-lg border border-border text-sm font-medium text-foreground hover:bg-white/5 transition-colors"
              >
                Recusar
              </button>
              <button
                onClick={acceptCookies}
                className="flex-1 md:flex-none px-6 py-2.5 rounded-lg bg-primary text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors shadow-[0_0_15px_rgba(56,189,248,0.2)]"
              >
                Aceitar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
