'use client'

import { useState } from 'react'
import { Topbar } from '@/components/topbar'
import { Footer } from '@/components/footer'
import { ProfileHeader } from '@/components/profile-header'
import { ProfileStats } from '@/components/profile-stats'
import { ProfileSessions } from '@/components/profile-sessions'
import { Settings, Edit2, LogOut } from 'lucide-react'
import Link from 'next/link'

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      <Topbar />
      
      {/* Hero background with gradient */}
      <div className="relative overflow-hidden bg-gradient-to-b from-[rgba(163,230,53,0.08)] to-background pt-8 pb-20">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-[rgba(163,230,53,0.1)] blur-3xl opacity-50" />
          <div className="absolute -bottom-20 -left-40 w-60 h-60 rounded-full bg-[rgba(163,230,53,0.08)] blur-3xl opacity-40" />
        </div>

        <div className="relative z-10 mx-auto max-w-[1440px] px-6 lg:px-8">
          {/* Profile Header */}
          <ProfileHeader isEditing={isEditing} onEditToggle={setIsEditing} />

          {/* Action buttons */}
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
            >
              <Edit2 className="h-4 w-4" />
              Editar Perfil
            </button>
            <Link href="/configuracoes" className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-border bg-card text-foreground font-semibold hover:bg-secondary transition-colors">
              <Settings className="h-4 w-4" />
              Configurações
            </Link>
            <button className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-destructive/30 bg-destructive/10 text-destructive font-semibold hover:bg-destructive/20 transition-colors ml-auto sm:ml-0">
              <LogOut className="h-4 w-4" />
              Sair
            </button>
          </div>
        </div>
      </div>

      {/* Content sections */}
      <div className="mx-auto max-w-[1440px] px-6 lg:px-8 pb-20">
        {/* Stats grid */}
        <ProfileStats />

        {/* Recent sessions */}
        <ProfileSessions />
      </div>

      <Footer />
    </div>
  )
}
