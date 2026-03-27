'use client'

import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence, type Variants } from 'framer-motion'
import { Search, SlidersHorizontal, ChevronLeft, ChevronRight, Tag, ArrowRight } from 'lucide-react'
import { ProductCard } from '@/components/ui/ProductCard'

// ─── Tipos ───────────────────────────────────────────────────────────────────
interface Product {
  id: string
  name: string
  description?: string
  sku?: string
  price?: number
  is_direct_sale: boolean
  image_url?: string
}

interface CatalogoClientProps {
  products: Product[]
}

// ─── Constantes ──────────────────────────────────────────────────────────────
const ITEMS_PER_PAGE = 9

// ─── Variants Framer Motion ───────────────────────────────────────────────────
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.05 },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' as const } },
}

// ─── Componente Principal ─────────────────────────────────────────────────────
export default function CatalogoClient({ products }: CatalogoClientProps) {
  const router = useRouter()

  const [search, setSearch]           = useState('')
  const [filterType, setFilterType]   = useState<'all' | 'direct' | 'quote'>('all')
  const [currentPage, setCurrentPage] = useState(1)

  // ─── Filtragem ────────────────────────────────────────────────────────────
  const filteredProducts = useMemo(() => {
    let result = products

    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          (p.description?.toLowerCase().includes(q) ?? false) ||
          (p.sku?.toLowerCase().includes(q) ?? false)
      )
    }

    if (filterType === 'direct') result = result.filter((p) => p.is_direct_sale)
    if (filterType === 'quote')  result = result.filter((p) => !p.is_direct_sale)

    return result
  }, [products, search, filterType])

  // ─── Paginação ────────────────────────────────────────────────────────────
  const totalPages       = Math.max(1, Math.ceil(filteredProducts.length / ITEMS_PER_PAGE))
  const safePage         = Math.min(currentPage, totalPages)
  const paginatedProducts = filteredProducts.slice(
    (safePage - 1) * ITEMS_PER_PAGE,
    safePage * ITEMS_PER_PAGE
  )

  function handleSearch(value: string)               { setSearch(value);     setCurrentPage(1) }
  function handleFilterType(value: typeof filterType) { setFilterType(value); setCurrentPage(1) }
  function handleProductAction(product: Product)      { router.push(`/diagnostico?produto=${product.id}`) }

  return (
    <div>
      {/* ── Barra de Filtros ─────────────────────────────────────────────── */}
      <div className="bg-white border border-[#E2E8F0] rounded-2xl p-4 mb-10 flex flex-col md:flex-row gap-4 items-start md:items-center shadow-sm">

        {/* Busca */}
        <div className="relative flex-1 w-full">
          <Search strokeWidth={1.25} className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
          <input
            type="text"
            placeholder="Buscar por nome, descrição ou SKU..."
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 bg-white border border-[#E2E8F0] rounded-[12px] text-sm text-black
                       focus:ring-2 focus:ring-[#1B84FE]/30 focus:border-[#1B84FE] outline-none
                       transition-all placeholder:text-[#9CA3AF]"
          />
        </div>

        {/* Divisor */}
        <div className="hidden md:block h-8 w-px bg-[#E2E8F0]" />

        {/* Filtros tipo */}
        <div className="flex items-center gap-2 shrink-0 flex-wrap">
          <SlidersHorizontal className="w-4 h-4 text-[#9CA3AF]" />
          <span className="text-sm text-[#4B5563] font-medium mr-1">Tipo:</span>
          {(
            [
              { value: 'all',    label: 'Todos' },
              { value: 'direct', label: 'Venda Direta' },
              { value: 'quote',  label: 'Sob Orçamento' },
            ] as const
          ).map(({ value, label }) => (
            <button
              key={value}
              onClick={() => handleFilterType(value)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                filterType === value
                  ? 'bg-[#F0A500] text-black shadow-sm'
                  : 'bg-[#F1F5F9] text-[#4B5563] hover:bg-[#EBF3FF] hover:text-[#1B84FE]'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Contador */}
        <div className="text-sm text-[#9CA3AF] shrink-0 font-medium font-body">
          {filteredProducts.length}{' '}
          {filteredProducts.length === 1 ? 'produto' : 'produtos'}
        </div>
      </div>

      {/* ── Grid de Produtos ─────────────────────────────────────────────── */}
      <AnimatePresence mode="wait">
        {paginatedProducts.length === 0 ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center py-24 text-center bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl"
          >
            <div className="w-16 h-16 bg-[#EBF3FF] rounded-2xl flex items-center justify-center mb-4">
              <Tag className="w-7 h-7 text-[#1B84FE]" />
            </div>
            <h3 className="text-lg font-heading font-semibold text-black mb-2">
              Nenhum produto encontrado
            </h3>
            <p className="text-[#4B5563] text-sm font-body">
              Tente ajustar os filtros ou a busca acima.
            </p>
          </motion.div>
        ) : (
          <motion.div
            key={`page-${safePage}-${search}-${filterType}`}
            variants={containerVariants}
            initial="hidden"
            animate="show"
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {paginatedProducts.map((product) => (
              <motion.div key={product.id} variants={itemVariants}>
                <ProductCard product={product} onAction={handleProductAction} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Paginação ────────────────────────────────────────────────────── */}
      {totalPages > 1 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex items-center justify-center gap-2 mt-12"
        >
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={safePage === 1}
            aria-label="Página Anterior"
            className="p-2 rounded-lg bg-white border border-[#E2E8F0] text-[#4B5563] hover:border-[#1B84FE] hover:text-[#1B84FE] disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          >
            <ChevronLeft strokeWidth={1.25} className="w-4 h-4" />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`w-9 h-9 rounded-lg text-sm font-medium transition-all ${
                page === safePage
                  ? 'bg-[#F0A500] text-black shadow-sm'
                  : 'bg-white border border-[#E2E8F0] text-[#4B5563] hover:border-[#1B84FE] hover:text-[#1B84FE]'
              }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={safePage === totalPages}
            aria-label="Próxima Página"
            className="p-2 rounded-lg bg-white border border-[#E2E8F0] text-[#4B5563] hover:border-[#1B84FE] hover:text-[#1B84FE] disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          >
            <ChevronRight strokeWidth={1.25} className="w-4 h-4" />
          </button>
        </motion.div>
      )}

      {/* ── Banner de conversão ───────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-16 bg-[#0A1628] rounded-2xl p-8 md:p-12 text-center relative overflow-hidden"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#1B84FE]/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="relative z-10">
          <h2 className="text-2xl md:text-3xl font-heading font-bold mb-3 text-white">
            Não encontrou o que precisa?
          </h2>
          <p className="text-white/60 text-base mb-8 max-w-2xl mx-auto leading-relaxed font-body">
            Fabricamos transformadores customizados para qualquer especificação técnica.
            Fale com nossa equipe de engenharia e obtenha um projeto sob medida.
          </p>
          <button
            onClick={() => router.push('/diagnostico')}
            className="inline-flex items-center gap-2 bg-[#1B84FE] text-black font-semibold px-8 py-3.5 rounded-[10px] hover:bg-[#1D67CD] transition-all text-sm shadow-lg"
          >
            Solicitar Projeto Customizado
            <ArrowRight strokeWidth={1.25} className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    </div>
  )
}
