import Link from 'next/link'
import { Zap, MapPin, Phone, Mail } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-[#0A1628] text-white">
      {/* ── Corpo principal ─────────────────────────────────────────────── */}
      <div className="container mx-auto max-w-7xl px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-12">

        {/* Marca */}
        <div>
          <Link href="/" className="flex items-center gap-2 mb-5 group">
            <Zap className="h-6 w-6 text-[#1B84FE] group-hover:text-white transition-colors" fill="currentColor" />
            <span
              className="text-xl font-heading font-bold text-white tracking-tight group-hover:text-[#1B84FE] transition-colors"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Solar América
            </span>
          </Link>
          <p
            className="text-white/50 text-xs uppercase tracking-widest font-heading mb-2"
          >
            Indústria e Comércio de Máquinas<br />e Equipamentos Elétricos
          </p>
          <p className="text-white/30 text-xs font-body">
            CNPJ: 49.221.284/0001-35
          </p>
          <div className="mt-6 flex gap-2">
            <span className="inline-flex items-center gap-1.5 bg-[#1B84FE]/10 border border-[#1B84FE]/20 rounded-lg px-3 py-1.5 text-[10px] font-heading font-bold text-[#1B84FE] uppercase tracking-wider">
              ISO 9001
            </span>
            <span className="inline-flex items-center gap-1.5 bg-[#1B84FE]/10 border border-[#1B84FE]/20 rounded-lg px-3 py-1.5 text-[10px] font-heading font-bold text-[#1B84FE] uppercase tracking-wider">
              ABNT NBR
            </span>
          </div>
        </div>

        {/* Contato */}
        <div>
          <h3
            className="font-heading font-bold text-white mb-6"
            style={{ fontSize: '15px', fontFamily: 'var(--font-heading)' }}
          >
            Contato
          </h3>
          <ul className="space-y-5">
            {[
              {
                dept: 'Engenharia',
                phone: '(83) 98741-1529',
                tel: '+5583987411529',
                email: 'alexandre@solaramerica.ind.br',
              },
              {
                dept: 'Comercial',
                phone: '(83) 99306-1388',
                tel: '+5583993061388',
                email: 'darci@solaramerica.ind.br',
              },
              {
                dept: 'Recepção',
                phone: '(83) 98609-6488',
                tel: '+5583986096488',
                email: 'recepcao1@solaramerica.ind.br',
              },
            ].map(({ dept, phone, tel, email }) => (
              <li key={dept}>
                <span className="text-[#1B84FE] text-[10px] font-heading font-semibold uppercase tracking-widest block mb-1">
                  {dept}
                </span>
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                  <a
                    href={`tel:${tel}`}
                    className="flex items-center gap-1.5 text-sm font-semibold text-white hover:text-[#1B84FE] transition-colors"
                  >
                    <Phone className="w-3 h-3" />
                    {phone}
                  </a>
                  <span className="text-white/20 text-xs">·</span>
                  <a
                    href={`mailto:${email}`}
                    className="flex items-center gap-1.5 text-xs text-white/50 hover:text-[#1B84FE] transition-colors"
                  >
                    <Mail className="w-3 h-3" />
                    {email}
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Localização */}
        <div>
          <h3
            className="font-heading font-bold text-white mb-6"
            style={{ fontSize: '15px', fontFamily: 'var(--font-heading)' }}
          >
            Localização
          </h3>
          <div className="flex items-start gap-3 text-white/60 text-sm font-body leading-relaxed mb-6">
            <MapPin className="w-4 h-4 text-[#1B84FE] shrink-0 mt-0.5" />
            <div>
              <p>R. Maria Presotto Pucci, 1050</p>
              <p>Galpão 03 / Galpão 04 — Distrito Industrial</p>
              <p>João Pessoa – PB, 58082-011</p>
            </div>
          </div>

          {/* Links rápidos */}
          <h4 className="text-white/30 text-[10px] uppercase tracking-widest font-heading mb-3">
            Links
          </h4>
          <nav className="flex flex-col gap-2">
            {[
              { href: '/catalogo',         label: 'Catálogo de Produtos' },
              { href: '/casos-de-sucesso', label: 'Casos de Sucesso' },
              { href: '/diagnostico',      label: 'Solicitar Orçamento' },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-sm text-white/50 hover:text-[#1B84FE] transition-colors font-body"
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* ── Rodapé ────────────────────────────────────────────────────────── */}
      <div className="border-t border-white/5">
        <div className="container mx-auto max-w-7xl px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-2">
          <p className="text-white/30 text-xs font-body">
            &copy; {new Date().getFullYear()} Solar América. Todos os direitos reservados.
          </p>
          <p className="text-white/20 text-xs font-body">
            Atendemos todo o Brasil
          </p>
        </div>
      </div>
    </footer>
  )
}
