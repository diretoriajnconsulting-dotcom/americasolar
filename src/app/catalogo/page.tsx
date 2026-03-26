import type { Metadata } from 'next'
import { createClient } from '@/utils/supabase/server'
import CatalogoClient from './CatalogoClient'

export const metadata: Metadata = {
  title: 'Catálogo de Transformadores',
  description:
    'Explore o catálogo completo da Solar América: transformadores a seco, a óleo, autotransformadores e fotovoltaicos. Solicite orçamento técnico direto com a fábrica.',
}


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
    <div className="min-h-screen bg-white">
      {/* ── Hero da Página ─────────────────────────────────────────────── */}
      <div className="bg-[#0A1628] py-16 px-6">
        <div className="container mx-auto max-w-7xl text-center">
          <span className="inline-block text-[#1B84FE] font-heading font-semibold text-xs uppercase tracking-widest mb-4">
            — Soluções Elétricas
          </span>
          <h1
            className="font-heading font-bold text-white leading-tight mb-4"
            style={{ fontSize: '33px', fontFamily: 'var(--font-heading)' }}
          >
            Nosso{' '}
            <span className="text-[#1B84FE]">Catálogo</span>
          </h1>
          <p
            className="text-white/60 max-w-2xl mx-auto leading-relaxed"
            style={{ fontSize: '16px', fontFamily: 'var(--font-body)' }}
          >
            Atendimento imediato para itens de prateleira e projetos customizados
            sob demanda. Selecione qualquer produto para solicitar um orçamento
            técnico detalhado.
          </p>
        </div>
      </div>

      {/* ── Grid de Produtos ──────────────────────────────────────────────── */}
      <div className="container mx-auto max-w-7xl px-6 py-16">
        <CatalogoClient products={products ?? []} />
      </div>
    </div>
  )
}
