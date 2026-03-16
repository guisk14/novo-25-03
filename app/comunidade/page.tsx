import { Topbar } from "@/components/topbar"
import { Footer } from "@/components/footer"
import { Waves, Users, TrendingUp } from "lucide-react"
import { createClient } from "@/lib/supabase/server"
import { PostsFeed } from "@/components/community/posts-feed"
import Link from "next/link"

export const metadata = {
  title: "Comunidade | Tem Onda",
  description: "Conecte-se com surfistas, compartilhe sessoes e descubra novos picos.",
}

const topSpots = [
  { name: "Praia da Joaquina", waves: "1.2m", users: 24 },
  { name: "Praia Mole", waves: "0.9m", users: 18 },
  { name: "Praia do Rosa", waves: "1.5m", users: 31 },
  { name: "Praia do Campeche", waves: "0.8m", users: 12 },
]

export default async function ComunidadePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // Get community stats
  const { count: postsCount } = await supabase
    .from("community_posts")
    .select("*", { count: "exact", head: true })

  const { count: usersCount } = await supabase
    .from("profiles")
    .select("*", { count: "exact", head: true })

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
          <div className="lg:col-span-2">
            <PostsFeed currentUserId={user?.id || null} />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* User Info (if logged in) */}
            {user && (
              <div className="rounded-2xl border border-[rgba(255,255,255,0.06)] bg-[rgba(10,15,25,0.6)] backdrop-blur-[10px] p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20 text-primary font-semibold">
                    {user.email?.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{user.email}</p>
                    <p className="text-xs text-white/50">Membro da comunidade</p>
                  </div>
                </div>
              </div>
            )}

            {/* Estatisticas */}
            <div className="rounded-2xl border border-[rgba(255,255,255,0.06)] bg-[rgba(10,15,25,0.6)] backdrop-blur-[10px] p-4">
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Comunidade
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 rounded-xl bg-white/5">
                  <p className="text-2xl font-bold text-primary">{usersCount || 0}</p>
                  <p className="text-xs text-white/50">Membros</p>
                </div>
                <div className="text-center p-3 rounded-xl bg-white/5">
                  <p className="text-2xl font-bold text-primary">{postsCount || 0}</p>
                  <p className="text-xs text-white/50">Posts</p>
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

            {/* CTA (if not logged in) */}
            {!user && (
              <div className="rounded-2xl border border-primary/30 bg-primary/10 backdrop-blur-[10px] p-4 text-center">
                <Waves className="h-8 w-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold text-foreground mb-2">
                  Junte-se a nos!
                </h3>
                <p className="text-sm text-white/60 mb-4">
                  Crie sua conta e faca parte da maior comunidade de surf do Brasil.
                </p>
                <Link
                  href="/auth/sign-up"
                  className="block w-full px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors text-center"
                >
                  Criar Conta
                </Link>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
