'use client'

import { Calendar, MapPin, Wind, Waves } from 'lucide-react'

interface Session {
  id: number
  date: string
  beach: string
  time: string
  waves: string
  wind: string
  rating: number
}

export function ProfileSessions() {
  const sessions: Session[] = [
    {
      id: 1,
      date: '23 Mar 2026',
      beach: 'Maresias, SP',
      time: '06:30 - 08:30',
      waves: '1.2m - 1.8m',
      wind: 'NE 15km/h',
      rating: 5,
    },
    {
      id: 2,
      date: '22 Mar 2026',
      beach: 'Guaruja, SP',
      time: '15:00 - 17:00',
      waves: '0.8m - 1.2m',
      wind: 'E 10km/h',
      rating: 4,
    },
    {
      id: 3,
      date: '21 Mar 2026',
      beach: 'Ubatuba, SP',
      time: '05:45 - 07:45',
      waves: '1.5m - 2.1m',
      wind: 'NE 12km/h',
      rating: 5,
    },
    {
      id: 4,
      date: '20 Mar 2026',
      beach: 'Bertioga, SP',
      time: '16:30 - 18:30',
      waves: '0.5m - 1.0m',
      wind: 'SW 8km/h',
      rating: 3,
    },
  ]

  return (
    <div>
      <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">
        Sessões Recentes
      </h2>
      
      <div className="space-y-4">
        {sessions.map((session) => (
          <div
            key={session.id}
            className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 hover:border-primary/50 hover:bg-card/80 transition-all duration-300"
          >
            {/* Hover gradient effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-5 bg-gradient-to-r from-primary via-transparent to-primary transition-opacity" />
            
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Left: Beach info */}
              <div>
                <div className="flex items-start gap-3 mb-4">
                  <div className="p-2.5 rounded-lg bg-primary/20">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs uppercase text-primary font-semibold tracking-wider mb-1">
                      Praia
                    </p>
                    <p className="text-lg font-bold text-foreground">
                      {session.beach}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-lg bg-accent/20">
                    <Calendar className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-xs uppercase text-muted-foreground font-semibold tracking-wider mb-1">
                      Data e Hora
                    </p>
                    <p className="text-sm text-foreground">
                      {session.date} • {session.time}
                    </p>
                  </div>
                </div>
              </div>

              {/* Middle: Conditions */}
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-lg bg-cyan-400/20">
                    <Waves className="h-5 w-5 text-cyan-400" />
                  </div>
                  <div>
                    <p className="text-xs uppercase text-muted-foreground font-semibold tracking-wider mb-1">
                      Ondulação
                    </p>
                    <p className="text-lg font-bold text-foreground">
                      {session.waves}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-lg bg-lime-400/20">
                    <Wind className="h-5 w-5 text-lime-400" />
                  </div>
                  <div>
                    <p className="text-xs uppercase text-muted-foreground font-semibold tracking-wider mb-1">
                      Vento
                    </p>
                    <p className="text-lg font-bold text-foreground">
                      {session.wind}
                    </p>
                  </div>
                </div>
              </div>

              {/* Right: Rating */}
              <div className="flex flex-col items-center justify-center p-4 rounded-xl border border-border/50 bg-secondary/30">
                <p className="text-xs uppercase text-muted-foreground font-semibold tracking-wider mb-2">
                  Avaliação
                </p>
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className={`h-2.5 w-2.5 rounded-full transition-all ${
                        i < session.rating
                          ? 'bg-primary'
                          : 'bg-border'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-2xl font-black text-foreground">
                  {session.rating}/5
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
