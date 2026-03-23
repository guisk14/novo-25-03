'use client'

import { useState } from 'react'
import { Mail, MapPin, Calendar, Trophy } from 'lucide-react'

interface ProfileHeaderProps {
  isEditing: boolean
  onEditToggle: (value: boolean) => void
}

export function ProfileHeader({ isEditing, onEditToggle }: ProfileHeaderProps) {
  const [formData, setFormData] = useState({
    name: 'João Silva',
    email: 'joao@temonda.com',
    location: 'Guaruja, SP',
    joinDate: 'Membro desde Jan 2024',
    bio: 'Apaixonado por surf e previsões precisas',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  return (
    <div className="flex flex-col md:flex-row gap-8 items-start md:items-end">
      {/* Avatar */}
      <div className="relative">
        <div className="h-40 w-40 rounded-2xl bg-gradient-to-br from-primary to-cyan-400 flex items-center justify-center text-7xl font-black text-primary-foreground shadow-lg ring-4 ring-border">
          JS
        </div>
        <div className="absolute -bottom-2 -right-2 h-12 w-12 rounded-full bg-green-500 border-4 border-card flex items-center justify-center">
          <Trophy className="h-6 w-6 text-white" />
        </div>
      </div>

      {/* User info */}
      <div className="flex-1">
        {isEditing ? (
          <div className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-primary uppercase">Nome</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full mt-1 px-4 py-2 rounded-lg bg-secondary border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-primary uppercase">Bio</label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                rows={2}
                className="w-full mt-1 px-4 py-2 rounded-lg bg-secondary border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              />
            </div>
            <button
              onClick={() => onEditToggle(false)}
              className="px-4 py-2 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
            >
              Salvar
            </button>
          </div>
        ) : (
          <>
            <h1 className="text-4xl md:text-5xl font-black text-foreground mb-2">
              {formData.name}
            </h1>
            <p className="text-lg text-primary font-semibold mb-4">
              Surfista & Apaixonado por Previsões
            </p>
            <p className="text-foreground/80 mb-4 max-w-2xl">
              {formData.bio}
            </p>
            
            {/* Meta info */}
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span className="text-sm">{formData.email}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">{formData.location}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span className="text-sm">{formData.joinDate}</span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
