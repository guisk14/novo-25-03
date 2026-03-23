'use client'

import { Activity, Wave, Calendar, Target } from 'lucide-react'

export function ProfileStats() {
  const stats = [
    {
      icon: Activity,
      label: 'Sessões Totais',
      value: '247',
      change: '+12 este mês',
      color: 'from-primary to-lime-400',
    },
    {
      icon: Wave,
      label: 'Ondas Previstas',
      value: '89%',
      change: 'Taxa de acerto',
      color: 'from-cyan-400 to-blue-500',
    },
    {
      icon: Calendar,
      label: 'Praias Visitadas',
      value: '34',
      change: '+3 novas este mês',
      color: 'from-amber-400 to-orange-500',
    },
    {
      icon: Target,
      label: 'Streak Atual',
      value: '12 dias',
      change: 'Usando o app diariamente',
      color: 'from-pink-400 to-rose-500',
    },
  ]

  return (
    <div className="mt-16 mb-16">
      <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">
        Suas Estatísticas
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => {
          const Icon = stat.icon
          return (
            <div
              key={idx}
              className="relative group overflow-hidden rounded-2xl border border-border bg-card p-6 hover:border-primary/50 transition-all duration-300"
            >
              {/* Gradient background */}
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity bg-gradient-to-br ${stat.color}`} />
              
              {/* Animated icon background */}
              <div className={`absolute -top-6 -right-6 h-24 w-24 rounded-full bg-gradient-to-br ${stat.color} opacity-10 group-hover:scale-110 transition-transform`} />
              
              <div className="relative z-10">
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${stat.color} mb-4`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                
                <p className="text-sm text-muted-foreground uppercase tracking-wide font-semibold mb-2">
                  {stat.label}
                </p>
                
                <p className="text-4xl font-black text-foreground mb-2">
                  {stat.value}
                </p>
                
                <p className="text-sm text-muted-foreground">
                  {stat.change}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
