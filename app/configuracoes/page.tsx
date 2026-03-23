"use client"

import { useState } from "react"
import { Topbar } from "@/components/topbar"
import { Footer } from "@/components/footer"
import { 
  User, 
  Bell, 
  Shield, 
  Palette, 
  MapPin, 
  Smartphone,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ChevronRight,
  Check,
  X,
  Globe,
  Volume2,
  Vibrate,
  Sun,
  Moon,
  Monitor
} from "lucide-react"
import { useTheme } from "next-themes"

type SettingsSection = "conta" | "notificacoes" | "privacidade" | "aparencia" | "localizacao"

const MENU_ITEMS = [
  { id: "conta" as const, label: "Conta", icon: User, description: "Dados pessoais e segurança" },
  { id: "notificacoes" as const, label: "Notificações", icon: Bell, description: "Alertas e avisos" },
  { id: "privacidade" as const, label: "Privacidade", icon: Shield, description: "Controle seus dados" },
  { id: "aparencia" as const, label: "Aparência", icon: Palette, description: "Tema e visual" },
  { id: "localizacao" as const, label: "Localização", icon: MapPin, description: "Praias favoritas" },
]

export default function ConfiguracoesPage() {
  const [activeSection, setActiveSection] = useState<SettingsSection>("conta")
  const [showPassword, setShowPassword] = useState(false)
  const { theme, setTheme } = useTheme()
  
  // Estados das configurações
  const [settings, setSettings] = useState({
    // Conta
    nome: "João Surfista",
    email: "joao@temonda.com",
    telefone: "(13) 99999-9999",
    
    // Notificações
    alertaOndas: true,
    alertaVento: true,
    alertaMare: true,
    emailDigest: false,
    pushNotifications: true,
    som: true,
    vibracao: true,
    
    // Privacidade
    perfilPublico: true,
    mostrarLocalizacao: false,
    compartilharEstatisticas: true,
    
    // Localização
    cidadePadrao: "santos",
    unidadeDistancia: "km",
    unidadeTemperatura: "celsius",
  })

  const updateSetting = (key: string, value: boolean | string) => {
    setSettings(prev => ({ ...prev, [key]: value }))
  }

  const Toggle = ({ enabled, onChange }: { enabled: boolean; onChange: (v: boolean) => void }) => (
    <button
      onClick={() => onChange(!enabled)}
      className={`relative h-6 w-11 rounded-full transition-colors ${
        enabled ? "bg-primary" : "bg-muted"
      }`}
    >
      <span
        className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow-md transition-transform ${
          enabled ? "translate-x-5" : "translate-x-0"
        }`}
      />
    </button>
  )

  return (
    <div className="min-h-screen bg-background">
      <Topbar />

      <main className="mx-auto max-w-6xl px-4 py-8 md:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground md:text-3xl">Configurações</h1>
          <p className="mt-1 text-sm text-muted-foreground">Gerencie sua conta e preferências</p>
        </div>

        <div className="flex flex-col gap-6 lg:flex-row">
          {/* Menu lateral */}
          <nav className="lg:w-72 lg:shrink-0">
            <div className="rounded-xl border border-border bg-card p-2">
              {MENU_ITEMS.map((item) => {
                const Icon = item.icon
                const isActive = activeSection === item.id
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveSection(item.id)}
                    className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left transition-all ${
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                    }`}
                  >
                    <Icon className="h-5 w-5 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold">{item.label}</p>
                      <p className="text-xs text-muted-foreground truncate">{item.description}</p>
                    </div>
                    <ChevronRight className={`h-4 w-4 shrink-0 transition-transform ${isActive ? "rotate-90" : ""}`} />
                  </button>
                )
              })}
            </div>
          </nav>

          {/* Conteúdo */}
          <div className="flex-1">
            <div className="rounded-xl border border-border bg-card">
              
              {/* Seção: Conta */}
              {activeSection === "conta" && (
                <div className="divide-y divide-border">
                  <div className="p-6">
                    <h2 className="text-lg font-bold text-foreground">Dados da Conta</h2>
                    <p className="text-sm text-muted-foreground">Atualize suas informações pessoais</p>
                  </div>

                  <div className="p-6 space-y-6">
                    {/* Nome */}
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">Nome completo</label>
                      <input
                        type="text"
                        value={settings.nome}
                        onChange={(e) => updateSetting("nome", e.target.value)}
                        className="w-full rounded-lg border border-border bg-secondary px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">
                        <Mail className="inline h-4 w-4 mr-1.5" />
                        Email
                      </label>
                      <input
                        type="email"
                        value={settings.email}
                        onChange={(e) => updateSetting("email", e.target.value)}
                        className="w-full rounded-lg border border-border bg-secondary px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                      />
                    </div>

                    {/* Telefone */}
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">
                        <Smartphone className="inline h-4 w-4 mr-1.5" />
                        Telefone
                      </label>
                      <input
                        type="tel"
                        value={settings.telefone}
                        onChange={(e) => updateSetting("telefone", e.target.value)}
                        className="w-full rounded-lg border border-border bg-secondary px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                      />
                    </div>

                    {/* Senha */}
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">
                        <Lock className="inline h-4 w-4 mr-1.5" />
                        Alterar senha
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          placeholder="Nova senha"
                          className="w-full rounded-lg border border-border bg-secondary px-4 py-3 pr-12 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        >
                          {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                      </div>
                    </div>

                    <button className="rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors">
                      Salvar alterações
                    </button>
                  </div>
                </div>
              )}

              {/* Seção: Notificações */}
              {activeSection === "notificacoes" && (
                <div className="divide-y divide-border">
                  <div className="p-6">
                    <h2 className="text-lg font-bold text-foreground">Notificações</h2>
                    <p className="text-sm text-muted-foreground">Configure quais alertas você deseja receber</p>
                  </div>

                  <div className="p-6 space-y-1">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-primary mb-4">Alertas de Surf</h3>
                    
                    <div className="flex items-center justify-between py-4 border-b border-border/50">
                      <div>
                        <p className="text-sm font-semibold text-foreground">Alerta de ondas</p>
                        <p className="text-xs text-muted-foreground">Receba avisos quando as ondas estiverem boas</p>
                      </div>
                      <Toggle enabled={settings.alertaOndas} onChange={(v) => updateSetting("alertaOndas", v)} />
                    </div>

                    <div className="flex items-center justify-between py-4 border-b border-border/50">
                      <div>
                        <p className="text-sm font-semibold text-foreground">Alerta de vento</p>
                        <p className="text-xs text-muted-foreground">Aviso de vento offshore favorável</p>
                      </div>
                      <Toggle enabled={settings.alertaVento} onChange={(v) => updateSetting("alertaVento", v)} />
                    </div>

                    <div className="flex items-center justify-between py-4">
                      <div>
                        <p className="text-sm font-semibold text-foreground">Alerta de maré</p>
                        <p className="text-xs text-muted-foreground">Notificação antes da maré ideal</p>
                      </div>
                      <Toggle enabled={settings.alertaMare} onChange={(v) => updateSetting("alertaMare", v)} />
                    </div>
                  </div>

                  <div className="p-6 space-y-1">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-primary mb-4">Canais</h3>
                    
                    <div className="flex items-center justify-between py-4 border-b border-border/50">
                      <div className="flex items-center gap-3">
                        <Bell className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-semibold text-foreground">Push notifications</p>
                          <p className="text-xs text-muted-foreground">Alertas no celular</p>
                        </div>
                      </div>
                      <Toggle enabled={settings.pushNotifications} onChange={(v) => updateSetting("pushNotifications", v)} />
                    </div>

                    <div className="flex items-center justify-between py-4 border-b border-border/50">
                      <div className="flex items-center gap-3">
                        <Mail className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-semibold text-foreground">Email digest</p>
                          <p className="text-xs text-muted-foreground">Resumo semanal por email</p>
                        </div>
                      </div>
                      <Toggle enabled={settings.emailDigest} onChange={(v) => updateSetting("emailDigest", v)} />
                    </div>

                    <div className="flex items-center justify-between py-4 border-b border-border/50">
                      <div className="flex items-center gap-3">
                        <Volume2 className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-semibold text-foreground">Som</p>
                          <p className="text-xs text-muted-foreground">Tocar som nas notificações</p>
                        </div>
                      </div>
                      <Toggle enabled={settings.som} onChange={(v) => updateSetting("som", v)} />
                    </div>

                    <div className="flex items-center justify-between py-4">
                      <div className="flex items-center gap-3">
                        <Vibrate className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-semibold text-foreground">Vibração</p>
                          <p className="text-xs text-muted-foreground">Vibrar ao receber notificação</p>
                        </div>
                      </div>
                      <Toggle enabled={settings.vibracao} onChange={(v) => updateSetting("vibracao", v)} />
                    </div>
                  </div>
                </div>
              )}

              {/* Seção: Privacidade */}
              {activeSection === "privacidade" && (
                <div className="divide-y divide-border">
                  <div className="p-6">
                    <h2 className="text-lg font-bold text-foreground">Privacidade</h2>
                    <p className="text-sm text-muted-foreground">Controle quem pode ver suas informações</p>
                  </div>

                  <div className="p-6 space-y-1">
                    <div className="flex items-center justify-between py-4 border-b border-border/50">
                      <div>
                        <p className="text-sm font-semibold text-foreground">Perfil público</p>
                        <p className="text-xs text-muted-foreground">Outros surfistas podem ver seu perfil</p>
                      </div>
                      <Toggle enabled={settings.perfilPublico} onChange={(v) => updateSetting("perfilPublico", v)} />
                    </div>

                    <div className="flex items-center justify-between py-4 border-b border-border/50">
                      <div>
                        <p className="text-sm font-semibold text-foreground">Mostrar localização</p>
                        <p className="text-xs text-muted-foreground">Exibir sua praia favorita no perfil</p>
                      </div>
                      <Toggle enabled={settings.mostrarLocalizacao} onChange={(v) => updateSetting("mostrarLocalizacao", v)} />
                    </div>

                    <div className="flex items-center justify-between py-4">
                      <div>
                        <p className="text-sm font-semibold text-foreground">Compartilhar estatísticas</p>
                        <p className="text-xs text-muted-foreground">Suas sessões aparecem no ranking</p>
                      </div>
                      <Toggle enabled={settings.compartilharEstatisticas} onChange={(v) => updateSetting("compartilharEstatisticas", v)} />
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-destructive mb-4">Zona de Perigo</h3>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <button className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-2.5 text-sm font-semibold text-destructive hover:bg-destructive/20 transition-colors">
                        Baixar meus dados
                      </button>
                      <button className="rounded-lg border border-destructive bg-destructive/10 px-4 py-2.5 text-sm font-semibold text-destructive hover:bg-destructive hover:text-white transition-colors">
                        Excluir minha conta
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Seção: Aparência */}
              {activeSection === "aparencia" && (
                <div className="divide-y divide-border">
                  <div className="p-6">
                    <h2 className="text-lg font-bold text-foreground">Aparência</h2>
                    <p className="text-sm text-muted-foreground">Personalize o visual do app</p>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-primary mb-4">Tema</h3>
                    <div className="grid grid-cols-3 gap-3">
                      <button
                        onClick={() => setTheme("light")}
                        className={`flex flex-col items-center gap-2 rounded-xl border-2 p-4 transition-all ${
                          theme === "light"
                            ? "border-primary bg-primary/10"
                            : "border-border bg-secondary hover:border-primary/50"
                        }`}
                      >
                        <Sun className={`h-6 w-6 ${theme === "light" ? "text-primary" : "text-muted-foreground"}`} />
                        <span className={`text-sm font-semibold ${theme === "light" ? "text-primary" : "text-foreground"}`}>Claro</span>
                        {theme === "light" && <Check className="h-4 w-4 text-primary" />}
                      </button>

                      <button
                        onClick={() => setTheme("dark")}
                        className={`flex flex-col items-center gap-2 rounded-xl border-2 p-4 transition-all ${
                          theme === "dark"
                            ? "border-primary bg-primary/10"
                            : "border-border bg-secondary hover:border-primary/50"
                        }`}
                      >
                        <Moon className={`h-6 w-6 ${theme === "dark" ? "text-primary" : "text-muted-foreground"}`} />
                        <span className={`text-sm font-semibold ${theme === "dark" ? "text-primary" : "text-foreground"}`}>Escuro</span>
                        {theme === "dark" && <Check className="h-4 w-4 text-primary" />}
                      </button>

                      <button
                        onClick={() => setTheme("system")}
                        className={`flex flex-col items-center gap-2 rounded-xl border-2 p-4 transition-all ${
                          theme === "system"
                            ? "border-primary bg-primary/10"
                            : "border-border bg-secondary hover:border-primary/50"
                        }`}
                      >
                        <Monitor className={`h-6 w-6 ${theme === "system" ? "text-primary" : "text-muted-foreground"}`} />
                        <span className={`text-sm font-semibold ${theme === "system" ? "text-primary" : "text-foreground"}`}>Sistema</span>
                        {theme === "system" && <Check className="h-4 w-4 text-primary" />}
                      </button>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-primary mb-4">Idioma</h3>
                    <select className="w-full rounded-lg border border-border bg-secondary px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary">
                      <option value="pt-BR">Português (Brasil)</option>
                      <option value="en-US">English (US)</option>
                      <option value="es-ES">Español</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Seção: Localização */}
              {activeSection === "localizacao" && (
                <div className="divide-y divide-border">
                  <div className="p-6">
                    <h2 className="text-lg font-bold text-foreground">Localização</h2>
                    <p className="text-sm text-muted-foreground">Configure suas preferências de localização</p>
                  </div>

                  <div className="p-6 space-y-6">
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">Cidade padrão</label>
                      <select
                        value={settings.cidadePadrao}
                        onChange={(e) => updateSetting("cidadePadrao", e.target.value)}
                        className="w-full rounded-lg border border-border bg-secondary px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                      >
                        <option value="santos">Santos (SP)</option>
                        <option value="guaruja">Guarujá (SP)</option>
                        <option value="ubatuba">Ubatuba (SP)</option>
                        <option value="florianopolis">Florianópolis (SC)</option>
                        <option value="rio">Rio de Janeiro (RJ)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">Unidade de distância</label>
                      <div className="flex gap-3">
                        <button
                          onClick={() => updateSetting("unidadeDistancia", "km")}
                          className={`flex-1 rounded-lg border-2 px-4 py-3 text-sm font-semibold transition-all ${
                            settings.unidadeDistancia === "km"
                              ? "border-primary bg-primary/10 text-primary"
                              : "border-border bg-secondary text-foreground hover:border-primary/50"
                          }`}
                        >
                          Quilômetros (km)
                        </button>
                        <button
                          onClick={() => updateSetting("unidadeDistancia", "mi")}
                          className={`flex-1 rounded-lg border-2 px-4 py-3 text-sm font-semibold transition-all ${
                            settings.unidadeDistancia === "mi"
                              ? "border-primary bg-primary/10 text-primary"
                              : "border-border bg-secondary text-foreground hover:border-primary/50"
                          }`}
                        >
                          Milhas (mi)
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">Unidade de temperatura</label>
                      <div className="flex gap-3">
                        <button
                          onClick={() => updateSetting("unidadeTemperatura", "celsius")}
                          className={`flex-1 rounded-lg border-2 px-4 py-3 text-sm font-semibold transition-all ${
                            settings.unidadeTemperatura === "celsius"
                              ? "border-primary bg-primary/10 text-primary"
                              : "border-border bg-secondary text-foreground hover:border-primary/50"
                          }`}
                        >
                          Celsius (°C)
                        </button>
                        <button
                          onClick={() => updateSetting("unidadeTemperatura", "fahrenheit")}
                          className={`flex-1 rounded-lg border-2 px-4 py-3 text-sm font-semibold transition-all ${
                            settings.unidadeTemperatura === "fahrenheit"
                              ? "border-primary bg-primary/10 text-primary"
                              : "border-border bg-secondary text-foreground hover:border-primary/50"
                          }`}
                        >
                          Fahrenheit (°F)
                        </button>
                      </div>
                    </div>

                    <button className="rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors">
                      Salvar preferências
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
