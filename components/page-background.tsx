"use client"

export function PageBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-background" />
      
      {/* Primary radial glow - top left */}
      <div 
        className="absolute -top-[30%] -left-[20%] w-[70%] h-[70%] rounded-full opacity-[0.03] dark:opacity-[0.05]"
        style={{
          background: 'radial-gradient(circle, var(--primary) 0%, transparent 70%)',
        }}
      />
      
      {/* Secondary radial glow - bottom right */}
      <div 
        className="absolute -bottom-[20%] -right-[10%] w-[60%] h-[60%] rounded-full opacity-[0.02] dark:opacity-[0.04]"
        style={{
          background: 'radial-gradient(circle, var(--primary) 0%, transparent 70%)',
        }}
      />
      
      {/* Subtle grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.015] dark:opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '64px 64px',
        }}
      />
      
      {/* Diagonal lines overlay */}
      <div 
        className="absolute inset-0 opacity-[0.008] dark:opacity-[0.015]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            -45deg,
            transparent,
            transparent 80px,
            rgba(56, 189, 248, 0.1) 80px,
            rgba(56, 189, 248, 0.1) 81px
          )`,
        }}
      />
      
      {/* Floating light particles */}
      <div className="absolute inset-0">
        {/* Particle 1 */}
        <div 
          className="absolute top-[15%] left-[10%] w-1 h-1 rounded-full bg-primary/20 dark:bg-primary/30"
          style={{ 
            animation: 'float 12s ease-in-out infinite',
            boxShadow: '0 0 8px 2px rgba(56, 189, 248, 0.15)'
          }}
        />
        {/* Particle 2 */}
        <div 
          className="absolute top-[45%] left-[85%] w-1.5 h-1.5 rounded-full bg-primary/15 dark:bg-primary/25"
          style={{ 
            animation: 'float 15s ease-in-out infinite reverse',
            boxShadow: '0 0 10px 3px rgba(56, 189, 248, 0.1)'
          }}
        />
        {/* Particle 3 */}
        <div 
          className="absolute top-[70%] left-[25%] w-0.5 h-0.5 rounded-full bg-primary/25 dark:bg-primary/35"
          style={{ 
            animation: 'float 10s ease-in-out infinite',
            animationDelay: '-3s',
            boxShadow: '0 0 6px 1px rgba(56, 189, 248, 0.2)'
          }}
        />
        {/* Particle 4 */}
        <div 
          className="absolute top-[25%] left-[70%] w-1 h-1 rounded-full bg-primary/10 dark:bg-primary/20"
          style={{ 
            animation: 'float 18s ease-in-out infinite',
            animationDelay: '-5s',
            boxShadow: '0 0 12px 4px rgba(56, 189, 248, 0.08)'
          }}
        />
        {/* Particle 5 */}
        <div 
          className="absolute top-[80%] left-[60%] w-0.5 h-0.5 rounded-full bg-primary/20 dark:bg-primary/30"
          style={{ 
            animation: 'float 14s ease-in-out infinite reverse',
            animationDelay: '-2s',
            boxShadow: '0 0 8px 2px rgba(56, 189, 248, 0.12)'
          }}
        />
        {/* Particle 6 */}
        <div 
          className="absolute top-[55%] left-[5%] w-1 h-1 rounded-full bg-primary/15 dark:bg-primary/20"
          style={{ 
            animation: 'float 16s ease-in-out infinite',
            animationDelay: '-7s',
            boxShadow: '0 0 10px 3px rgba(56, 189, 248, 0.1)'
          }}
        />
      </div>
      
      {/* Soft vignette effect */}
      <div 
        className="absolute inset-0 opacity-40 dark:opacity-60"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, transparent 50%, rgba(0,0,0,0.15) 100%)',
        }}
      />
      
      {/* Noise texture overlay for depth */}
      <div 
        className="absolute inset-0 opacity-[0.015] dark:opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
      
      {/* Animation keyframes */}
      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
            opacity: 0.3;
          }
          25% {
            transform: translateY(-20px) translateX(10px);
            opacity: 0.6;
          }
          50% {
            transform: translateY(-10px) translateX(-5px);
            opacity: 0.4;
          }
          75% {
            transform: translateY(-30px) translateX(15px);
            opacity: 0.7;
          }
        }
      `}</style>
    </div>
  )
}
