'use client'

import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence, type Variants } from 'framer-motion'
import { Search, SlidersHorizontal, ChevronLeft, ChevronRight, Zap, Tag } from 'lucide-react'
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
    transition: { staggerChildren: 0.07, delayChildren: 0.1 },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' as const } },
}

// ─── Componente Principal ─────────────────────────────────────────────────────
export default function CatalogoClient({ products }: CatalogoClientProps) {
  const router = useRouter()

  // Estados de filtro e paginação
  const [search, setSearch] = useState('')
  const [filterType, setFilterType] = useState<'all' | 'direct' | 'quote'>('all')
  const [currentPage, setCurrentPage] = useState(1)

  // ─── Lógica de filtragem ──────────────────────────────────────────────────
  const filteredProducts = useMemo(() => {
    let result = products

    // Filtro por texto (nome, descrição ou SKU)
    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          (p.description?.toLowerCase().includes(q) ?? false) ||
          (p.sku?.toLowerCase().includes(q) ?? false)
      )
    }

    // Filtro por tipo de venda
    if (filterType === 'direct') result = result.filter((p) => p.is_direct_sale)
    if (filterType === 'quote') result = result.filter((p) => !p.is_direct_sale)

    return result
  }, [products, search, filterType])

  // ─── Paginação ────────────────────────────────────────────────────────────
  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / ITEMS_PER_PAGE))
  const safePage = Math.min(currentPage, totalPages)
  const paginatedProducts = filteredProducts.slice(
    (safePage - 1) * ITEMS_PER_PAGE,
    safePage * ITEMS_PER_PAGE
  )

  // Resetar página ao mudar filtros
  function handleSearch(value: string) {
    setSearch(value)
    setCurrentPage(1)
  }
  function handleFilterType(value: typeof filterType) {
    setFilterType(value)
    setCurrentPage(1)
  }

  // ─── Ação dos cards ───────────────────────────────────────────────────────
  function handleProductAction(product: Product) {
    router.push(`/diagnostico?produto=${product.id}`)
  }

  return (
    <div>
      {/* ── Barra de Filtros ─────────────────────────────────────────────── */}
      <div className="glass-panel p-4 mb-10 flex flex-col md:flex-row gap-4 items-start md:items-center shadow-lg rounded-2xl">
        {/* Busca por texto */}
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
          <input
            type="text"
            placeholder="Buscar por nome, descrição ou SKU..."
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 bg-surface-lowest/50 border border-white/10 rounded-lg text-sm text-text-body
                       focus:ring-2 focus:ring-primary-base focus:border-transparent outline-none
                       transition-all placeholder:text-text-muted/60"
          />
        </div>

        {/* Separador visual */}
        <div className="hidden md:block h-8 w-px bg-white/10" />

        {/* Filtro por tipo */}
        <div className="flex items-center gap-2 shrink-0">
          <SlidersHorizontal className="w-4 h-4 text-text-muted" />
          <span className="text-sm text-text-muted font-medium mr-1">Tipo:</span>
          {(
            [
              { value: 'all', label: 'Todos' },
              { value: 'direct', label: 'Venda Direta' },
              { value: 'quote', label: 'Sob Orçamento' },
            ] as const
          ).map(({ value, label }) => (
            <button
              key={value}
              onClick={() => handleFilterType(value)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                filterType === value
                  ? 'bg-primary-base text-surface-lowest shadow-[0_0_15px_rgba(238,194,0,0.3)]'
                  : 'bg-surface-lowest/50 text-text-muted hover:bg-surface-elevated border border-white/5'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Contador de resultados */}
        <div className="text-sm text-text-muted/60 shrink-0 font-medium">
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
            className="col-span-full flex flex-col items-center justify-center py-24 text-center glass-panel rounded-2xl"
          >
            <div className="w-16 h-16 bg-surface-lowest/50 border border-white/5 rounded-2xl flex items-center justify-center mb-4 shadow-inner">
              <Tag className="w-7 h-7 text-text-muted/60" />
            </div>
            <h3 className="text-lg font-display font-semibold text-text-body mb-2">
              Nenhum produto encontrado
            </h3>
            <p className="text-text-muted text-sm">
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
            title="Página Anterior"
            aria-label="Página Anterior"
            className="p-2 rounded-lg bg-surface-lowest/50 border border-white/10 text-text-muted hover:bg-surface-elevated hover:text-white
                       disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`w-9 h-9 rounded-lg text-sm font-medium transition-all ${
                page === safePage
                  ? 'bg-primary-base text-surface-lowest shadow-[0_0_15px_rgba(238,194,0,0.3)]'
                  : 'bg-surface-lowest/50 border border-white/5 text-text-muted hover:bg-surface-elevated hover:text-white'
              }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={safePage === totalPages}
            title="Próxima Página"
            aria-label="Próxima Página"
            className="p-2 rounded-lg bg-surface-lowest/50 border border-white/10 text-text-muted hover:bg-surface-elevated hover:text-white
                       disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </motion.div>
      )}

      {/* ── Banner de Conversão ───────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-16 glass-panel border border-primary-base/20 rounded-2xl p-8 md:p-12 text-center relative overflow-hidden"
      >
        {/* Glow effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary-base/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-surface-lowest/80 border border-white/10 rounded-2xl mb-6 shadow-inner">
            <Zap className="w-7 h-7 text-primary-base drop-shadow-[0_0_8px_rgba(238,194,0,0.6)]" />
          </div>
          <h2 className="text-2xl md:text-4xl font-display font-bold mb-4 text-text-body">
            Não encontrou o que precisa?
          </h2>
          <p className="text-text-muted text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
            Fabricamos transformadores customizados para qualquer especificação técnica.
            Fale com nossa equipe de engenharia e obtenha um projeto sob medida.
          </p>
          <button
            onClick={() => router.push('/diagnostico')}
            className="bg-primary-base text-surface-lowest font-bold px-8 py-3.5 rounded-xl
                       hover:bg-primary-hover transition-all text-sm uppercase tracking-wider
                       shadow-[0_0_20px_rgba(238,194,0,0.3)] hover:shadow-[0_0_30px_rgba(238,194,0,0.5)]
                       hover:-translate-y-0.5"
          >
            Solicitar Projeto Customizado
          </button>
        </div>
      </motion.div>
    </div>
  )
}
