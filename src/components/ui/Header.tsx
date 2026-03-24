import Link from 'next/link'
import { Zap } from 'lucide-react'

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full glass-panel">
      <div className="container mx-auto flex h-20 items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2">
          <Zap className="h-7 w-7 text-primary-base drop-shadow-[0_0_10px_rgba(238,194,0,0.5)]" fill="currentColor" />
          <span className="text-2xl font-display font-bold tracking-tight text-text-body">
            Solar América
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-8 font-medium text-sm tracking-wide">
          <Link href="/catalogo" className="text-text-muted hover:text-primary-hover transition-colors">
            Catálogo
          </Link>
          <Link href="/casos-de-sucesso" className="text-text-muted hover:text-primary-hover transition-colors">
            Casos de Sucesso
          </Link>
          <Link href="/diagnostico" className="text-text-muted hover:text-primary-hover transition-colors">
            Orçamentos
          </Link>
        </nav>
      </div>
    </header>
  )
}
