import { Topbar } from "@/components/topbar"
import { Footer } from "@/components/footer"
import { Waves, MapPin, Heart, MessageCircle, Share2, Camera, Users, TrendingUp } from "lucide-react"
import Image from "next/image"

export const metadata = {
  title: "Comunidade | Tem Onda",
  description: "Conecte-se com surfistas, compartilhe sessoes e descubra novos picos.",
}

const posts = [
  {
    id: 1,
    author: "Lucas Medeiros",
    avatar: "LM",
    location: "Praia da Joaquina, SC",
    time: "2h atras",
    content: "Sessao incrivel hoje de manha! Ondas de 1.5m com vento terral. Melhor dia do mes!",
    image: "/images/surf-session-1.jpg",
    likes: 47,
    comments: 12,
  },
  {
    id: 2,
    author: "Marina Santos",
    avatar: "MS",
    location: "Praia do Rosa, SC",
    time: "5h atras",
    content: "Amanhecer perfeito no Rosa. Poucas pessoas na agua e ondas consistentes. Quem mais estava la?",
    image: "/images/surf-session-2.jpg",
    likes: 89,
    comments: 23,
  },
  {
    id: 3,
    author: "Pedro Costa",
    avatar: "PC",
    location: "Praia Mole, SC",
    time: "1d atras",
    content: "Dica: a previsao pro fim de semana esta otima! Swell de sul chegando com forca. Preparem as pranchas!",
    likes: 156,
    comments: 45,
  },
]

const topSpots = [
  { name: "Praia da Joaquina", waves: "1.2m", users: 24 },
  { name: "Praia Mole", waves: "0.9m", users: 18 },
  { name: "Praia do Rosa", waves: "1.5m", users: 31 },
  { name: "Praia do Campeche", waves: "0.8m", users: 12 },
]

export default function ComunidadePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Topbar />

      <main className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
            Comunidade
          </h1>
          <p className="text-white/60">
            Conecte-se com surfistas, compartilhe suas sessoes e descubra novos picos.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Feed Principal */}
          <div className="lg:col-span-2 space-y-6">
            {/* Criar Post */}
            <div className="rounded-2xl border border-[rgba(255,255,255,0.06)] bg-[rgba(10,15,25,0.6)] backdrop-blur-[10px] p-4">
              <div className="flex gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20 text-primary font-semibold">
                  V
                </div>
                <div className="flex-1">
                  <textarea
                    placeholder="Compartilhe sua sessao de surf..."
                    className="w-full bg-transparent border border-white/10 rounded-xl p-3 text-sm text-foreground placeholder:text-white/40 focus:outline-none focus:border-primary/50 resize-none"
                    rows={3}
                  />
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex gap-2">
                      <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 text-white/60 text-sm hover:bg-white/10 transition-colors">
                        <Camera className="h-4 w-4" />
                        Foto
                      </button>
                      <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 text-white/60 text-sm hover:bg-white/10 transition-colors">
                        <MapPin className="h-4 w-4" />
                        Local
                      </button>
                    </div>
                    <button className="px-4 py-1.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors">
                      Publicar
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Posts */}
            {posts.map((post) => (
              <div
                key={post.id}
                className="rounded-2xl border border-[rgba(255,255,255,0.06)] bg-[rgba(10,15,25,0.6)] backdrop-blur-[10px] overflow-hidden"
              >
                {/* Post Header */}
                <div className="p-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20 text-primary font-semibold text-sm">
                    {post.avatar}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{post.author}</p>
                    <div className="flex items-center gap-2 text-xs text-white/50">
                      <MapPin className="h-3 w-3" />
                      <span>{post.location}</span>
                      <span>•</span>
                      <span>{post.time}</span>
                    </div>
                  </div>
                </div>

                {/* Post Content */}
                <div className="px-4 pb-3">
                  <p className="text-white/80 text-sm leading-relaxed">{post.content}</p>
                </div>

                {/* Post Image */}
                {post.image && (
                  <div className="relative aspect-video bg-white/5">
                    <div className="absolute inset-0 flex items-center justify-center text-white/20">
                      <Waves className="h-12 w-12" />
                    </div>
                  </div>
                )}

                {/* Post Actions */}
                <div className="p-4 flex items-center gap-6 border-t border-white/5">
                  <button className="flex items-center gap-2 text-white/60 hover:text-red-400 transition-colors">
                    <Heart className="h-5 w-5" />
                    <span className="text-sm">{post.likes}</span>
                  </button>
                  <button className="flex items-center gap-2 text-white/60 hover:text-primary transition-colors">
                    <MessageCircle className="h-5 w-5" />
                    <span className="text-sm">{post.comments}</span>
                  </button>
                  <button className="flex items-center gap-2 text-white/60 hover:text-primary transition-colors ml-auto">
                    <Share2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Estatisticas */}
            <div className="rounded-2xl border border-[rgba(255,255,255,0.06)] bg-[rgba(10,15,25,0.6)] backdrop-blur-[10px] p-4">
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Comunidade
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 rounded-xl bg-white/5">
                  <p className="text-2xl font-bold text-primary">1.2k</p>
                  <p className="text-xs text-white/50">Membros</p>
                </div>
                <div className="text-center p-3 rounded-xl bg-white/5">
                  <p className="text-2xl font-bold text-primary">89</p>
                  <p className="text-xs text-white/50">Online</p>
                </div>
              </div>
            </div>

            {/* Picos em Alta */}
            <div className="rounded-2xl border border-[rgba(255,255,255,0.06)] bg-[rgba(10,15,25,0.6)] backdrop-blur-[10px] p-4">
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Picos em Alta
              </h3>
              <div className="space-y-3">
                {topSpots.map((spot, index) => (
                  <div
                    key={spot.name}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
                  >
                    <span className="text-sm font-medium text-white/40 w-5">
                      {index + 1}
                    </span>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">{spot.name}</p>
                      <p className="text-xs text-white/50">{spot.waves} • {spot.users} surfistas</p>
                    </div>
                    <Waves className="h-4 w-4 text-primary" />
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="rounded-2xl border border-primary/30 bg-primary/10 backdrop-blur-[10px] p-4 text-center">
              <Waves className="h-8 w-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold text-foreground mb-2">
                Junte-se a nos!
              </h3>
              <p className="text-sm text-white/60 mb-4">
                Crie sua conta e faca parte da maior comunidade de surf do Brasil.
              </p>
              <button className="w-full px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors">
                Criar Conta
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
