
import { Zap } from 'lucide-react'

export function Footer() {
  return (
    <footer className="w-full bg-[#070d1f] text-text-muted mt-12 py-16 border-t border-white/5">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
        <div>
          <div className="flex items-center gap-2 mb-6">
            <Zap className="h-7 w-7 text-primary-base drop-shadow-[0_0_10px_rgba(238,194,0,0.5)]" fill="currentColor" />
            <span className="text-2xl font-display font-bold tracking-tight text-text-body">
              Solar América
            </span>
          </div>
          <p className="text-sm text-text-muted/80 mb-2 font-display uppercase tracking-widest text-xs">
            Indústria e Comércio de Máquinas e Equipamentos Elétricos
          </p>
          <p className="text-sm text-text-muted/60">
            CNPJ: 49.221.284/0001-35
          </p>
        </div>
        
        <div>
          <h3 className="text-lg font-display font-semibold mb-6 text-text-body">Contato</h3>
          <ul className="space-y-3 text-sm text-text-muted/80">
            <li><a href="mailto:engenharia@solaramerica.com.br" className="hover:text-primary-hover transition-colors">engenharia@solaramerica.com.br</a></li>
            <li><a href="mailto:comercial@solaramerica.com.br" className="hover:text-primary-hover transition-colors">comercial@solaramerica.com.br</a></li>
            <li><a href="mailto:darci@lgtransformadores.com.br" className="hover:text-primary-hover transition-colors">darci@lgtransformadores.com.br</a></li>
            <li className="pt-2"><a href="tel:+558393061388" className="hover:text-primary-base transition-colors font-semibold text-text-body">(83) 9306-1388</a></li>
          </ul>
        </div>
        
        <div>
          <h3 className="text-lg font-display font-semibold mb-6 text-text-body">Localização</h3>
          <p className="text-sm text-text-muted/80 space-y-2">
            <span className="block">R. Maria Presotto Pucci, 1050</span>
            <span className="block">Galpão 03 / Galpão 04 - Distrito Industrial</span>
            <span className="block">João Pessoa - PB, 58082-011</span>
          </p>
        </div>
      </div>
      <div className="container mx-auto px-6 mt-12 pt-8 border-t border-white/5 text-sm text-center text-text-muted/50">
        &copy; {new Date().getFullYear()} Solar América. Todos os direitos reservados.
      </div>
    </footer>
  )
}
