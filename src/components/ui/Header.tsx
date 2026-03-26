'use client'

import Link from 'next/link'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { Menu, X, Zap } from 'lucide-react'

const navLinks = [
  { href: '/catalogo',          label: 'Catálogo' },
  { href: '/casos-de-sucesso',  label: 'Casos de Sucesso' },
  { href: '/diagnostico',       label: 'Orçamentos' },
]

export function Header() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  const isActive = (href: string) => pathname.startsWith(href)

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-[#E2E8F0] shadow-sm">
      <div className="container mx-auto flex h-[72px] items-center justify-between px-6 max-w-7xl">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group" onClick={() => setOpen(false)}>
          <Zap strokeWidth={1.25}
            className="h-6 w-6 text-[#1B84FE] group-hover:text-[#1D67CD] transition-colors"
            fill="currentColor"
          />
          <span
            className="text-xl font-heading font-bold tracking-tight text-black group-hover:text-[#1B84FE] transition-colors"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Solar América
          </span>
        </Link>

        {/* Nav desktop */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const active = isActive(link.href)
            return (
              <Link
                key={link.href}
                href={link.href}
                className={[
                  'relative px-4 py-2 rounded-lg text-sm font-medium transition-all',
                  active
                    ? 'text-[#1B84FE] font-semibold'
                    : 'text-[#4B5563] hover:text-[#1B84FE] hover:bg-[#F1F5F9]',
                ].join(' ')}
              >
                {link.label}
                {active && (
                  <span className="absolute bottom-0 left-4 right-4 h-[2px] rounded-full bg-[#1B84FE]" />
                )}
              </Link>
            )
          })}
        </nav>

        {/* CTA desktop */}
        <div className="hidden md:block">
          <Link
            href="/diagnostico"
            className="inline-flex items-center gap-2 bg-[#1B84FE] text-black text-sm font-semibold rounded-[10px] px-5 py-2.5 hover:bg-[#1D67CD] transition-colors shadow-sm"
          >
            Quero um Orçamento
          </Link>
        </div>

        {/* Hamburguer mobile */}
        <button
          className="md:hidden p-2 rounded-lg text-[#4B5563] hover:bg-[#F1F5F9] transition-colors"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
        >
          {open ? <X strokeWidth={1.25} className="w-5 h-5" /> : <Menu strokeWidth={1.25} className="w-5 h-5" />}
        </button>
      </div>

      {/* Menu mobile */}
      {open && (
        <div className="md:hidden border-t border-[#E2E8F0] bg-white px-6 py-4 flex flex-col gap-1">
          {navLinks.map((link) => {
            const active = isActive(link.href)
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={[
                  'px-4 py-3 rounded-lg text-sm font-medium transition-all',
                  active
                    ? 'text-[#1B84FE] font-semibold bg-[#EBF3FF]'
                    : 'text-[#4B5563] hover:text-[#1B84FE] hover:bg-[#F1F5F9]',
                ].join(' ')}
              >
                {link.label}
              </Link>
            )
          })}
          <Link
            href="/diagnostico"
            onClick={() => setOpen(false)}
            className="mt-2 text-center bg-[#1B84FE] text-black text-sm font-semibold rounded-[10px] px-5 py-3 hover:bg-[#1D67CD] transition-colors"
          >
            Quero um Orçamento
          </Link>
        </div>
      )}
    </header>
  )
}
