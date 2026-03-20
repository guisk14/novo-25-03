"use client"

import { Waves, MapPin, Bell, Users, ArrowRight, ChevronDown, Wind, Compass, Clock } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

const FEATURES = [
  {
    icon: <Waves className="h-6 w-6" />,
    title: "Previsao em Tempo Real",
    description: "Dados atualizados de altura, periodo e direcao das ondas para as melhores praias do Brasil.",
  },
  {
    icon: <MapPin className="h-6 w-6" />,
    title: "Mapa Interativo",
    description: "Visualize as condicoes de surf em um mapa interativo com todas as praias mapeadas.",
  },
  {
    icon: <Bell className="h-6 w-6" />,
    title: "Alertas Personalizados",
    description: "Receba notificacoes quando as condicoes estiverem perfeitas para seu nivel.",
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: "Comunidade Ativa",
    description: "Conecte-se com outros surfistas, compartilhe sessoes e descubra novos picos.",
  },
]

const STATS = [
  { value: "50+", label: "Praias Mapeadas" },
  { value: "24/7", label: "Dados em Tempo Real" },
  { value: "10k+", label: "Surfistas Ativos" },
  { value: "98%", label: "Precisao" },
]

const BEACHES_PREVIEW = [
  { name: "Maresias", location: "Sao Sebastiao, SP", rating: "Excelente" },
  { name: "Itamambuca", location: "Ubatuba, SP", rating: "Bom" },
  { name: "Praia do Rosa", location: "Imbituba, SC", rating: "Excelente" },
]

export function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative min-h-[100vh] flex flex-col items-center justify-center overflow-hidden px-6">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        
        {/* Animated wave lines in background */}
        <div className="absolute inset-0 overflow-hidden opacity-20">
          <svg className="absolute bottom-0 left-0 right-0 h-64" viewBox="0 0 1440 320" preserveAspectRatio="none">
            <path
              fill="currentColor"
              className="text-primary/30"
              d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            />
          </svg>
        </div>

        <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            Previsao atualizada agora
          </div>

          {/* Main headline */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight text-foreground text-balance leading-[1.1]">
            Encontre a{" "}
            <span className="text-primary">onda perfeita</span>
            {" "}para sua sessao
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl text-pretty">
            Previsao de surf precisa e em tempo real para as melhores praias do litoral brasileiro. 
            Nunca mais perca uma sessao epica.
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
            <Link
              href="/previsao"
              className="group flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-base font-bold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:shadow-primary/30 hover:scale-105"
            >
              Ver Previsao
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/comunidade"
              className="flex items-center gap-2 rounded-full border border-border bg-card/50 px-8 py-4 text-base font-semibold text-foreground transition-all hover:bg-card hover:border-primary/50"
            >
              Explorar Comunidade
            </Link>
          </div>

          {/* Quick stats */}
          <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-8 sm:gap-12">
            {STATS.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl sm:text-4xl font-black text-foreground">{stat.value}</p>
                <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground">
          <span className="text-xs font-medium uppercase tracking-widest">Rolar para baixo</span>
          <ChevronDown className="h-5 w-5 animate-bounce" />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-black text-foreground">
              Tudo que voce precisa para{" "}
              <span className="text-primary">surfar melhor</span>
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Ferramentas poderosas para planejar suas sessoes e nunca mais perder uma onda boa.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES.map((feature, i) => (
              <div
                key={feature.title}
                className="group relative rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5"
              >
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold text-foreground">{feature.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Preview Section */}
      <section className="py-24 px-6 bg-gradient-to-b from-transparent via-primary/5 to-transparent">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left - Text content */}
            <div>
              <h2 className="text-3xl sm:text-4xl font-black text-foreground leading-tight">
                Previsao detalhada para as{" "}
                <span className="text-primary">melhores praias</span>
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Acompanhe altura das ondas, periodo, direcao do swell, vento, mare e muito mais. 
                Dados precisos atualizados a cada hora.
              </p>

              {/* Mini feature list */}
              <div className="mt-8 space-y-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Waves className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Altura e Periodo</p>
                    <p className="text-sm text-muted-foreground">Previsao de 7 dias com graficos detalhados</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Wind className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Vento e Mare</p>
                    <p className="text-sm text-muted-foreground">Analise completa das condicoes</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Compass className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Direcao do Swell</p>
                    <p className="text-sm text-muted-foreground">Saiba de onde vem a ondulacao</p>
                  </div>
                </div>
              </div>

              <Link
                href="/previsao"
                className="mt-8 inline-flex items-center gap-2 text-primary font-bold hover:underline"
              >
                Ver previsao completa
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Right - Preview cards */}
            <div className="relative">
              <div className="space-y-4">
                {BEACHES_PREVIEW.map((beach, i) => (
                  <div
                    key={beach.name}
                    className="flex items-center justify-between rounded-xl border border-border bg-card p-4 transition-all hover:border-primary/30"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                        <Waves className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-bold text-foreground">{beach.name}</p>
                        <p className="text-sm text-muted-foreground">{beach.location}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold ${
                        beach.rating === "Excelente" 
                          ? "bg-green-500/10 text-green-500" 
                          : "bg-amber-500/10 text-amber-500"
                      }`}>
                        {beach.rating}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Decorative gradient */}
              <div className="absolute -inset-4 -z-10 bg-gradient-to-r from-primary/10 via-transparent to-primary/10 blur-3xl" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-black text-foreground">
            Pronto para pegar{" "}
            <span className="text-primary">sua proxima onda</span>?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Comece a usar o Tem Onda agora e nunca mais perca uma sessao perfeita.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/previsao"
              className="group flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-base font-bold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:shadow-primary/30 hover:scale-105"
            >
              Comecar Agora
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
