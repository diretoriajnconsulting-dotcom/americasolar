import { createClient } from '@/utils/supabase/server'
import CatalogoClient from './CatalogoClient'

// Forçar renderização dinâmica para evitar cache com lista vazia (devido ao seed posterior)
export const dynamic = 'force-dynamic'

export default async function CatalogoPage() {
  const supabase = await createClient()

  const { data: products, error } = await supabase
    .from('products')
    .select('id, name, description, sku, price, is_direct_sale, image_url')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('[CatalogoPage] Erro ao buscar produtos:', error)
  }

  return (
    <div className="container mx-auto px-4 py-12">
      {/* ── Cabeçalho da Página ─────────────────────────────────────────── */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <span className="inline-block text-xs font-semibold tracking-widest text-solar-yellow uppercase mb-4">
          Soluções Elétricas
        </span>
        <h1 className="text-4xl md:text-5xl font-bold text-solar-blue mb-5 leading-tight">
          Nosso{' '}
          <span className="relative">
            <span className="text-solar-yellow">Catálogo</span>
            <span
              className="absolute -bottom-1 left-0 w-full h-0.5 bg-solar-yellow/40 rounded-full"
              aria-hidden="true"
            />
          </span>
        </h1>
        <p className="text-lg text-slate-500 leading-relaxed">
          Atendimento imediato para itens de prateleira e projetos customizados
          sob demanda. Selecione qualquer produto para solicitar um orçamento
          técnico detalhado.
        </p>
      </div>

      {/* ── Client Component com filtros e paginação ───────────────────── */}
      <CatalogoClient products={products ?? []} />
    </div>
  )
}
