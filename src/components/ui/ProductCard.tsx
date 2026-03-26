'use client'

import { motion } from 'framer-motion'
import { Tag, ShoppingCart, FileText } from 'lucide-react'

interface Product {
  id: string
  name: string
  description?: string
  sku?: string
  price?: number
  is_direct_sale: boolean
  image_url?: string
}

interface ProductCardProps {
  product: Product
  onAction?: (product: Product) => void
}

export function ProductCard({ product, onAction }: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="bg-white border border-[#E2E8F0] rounded-2xl flex flex-col overflow-hidden shadow-sm hover:shadow-lg hover:border-[#1B84FE]/30 transition-all duration-300 group"
    >
      {/* Imagem / placeholder */}
      <div className="aspect-video bg-[#F8FAFC] relative flex items-center justify-center overflow-hidden border-b border-[#E2E8F0]">
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.name}
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="flex flex-col items-center gap-2 text-[#9CA3AF]">
            <div className="w-12 h-12 bg-[#EBF3FF] rounded-full flex items-center justify-center">
              <Tag className="w-5 h-5 text-[#1B84FE]" />
            </div>
            <span className="text-xs font-body">Imagem Indisponível</span>
          </div>
        )}

        {/* Badge de venda direta */}
        {product.is_direct_sale && (
          <span className="absolute top-3 right-3 bg-[#1B84FE] text-black text-[10px] font-heading font-bold px-2.5 py-1 rounded-full uppercase tracking-wide">
            Compra Direta
          </span>
        )}
      </div>

      {/* Conteúdo */}
      <div className="p-5 flex flex-col flex-grow">
        {/* SKU */}
        {product.sku && (
          <p className="text-[#9CA3AF] text-[10px] font-body uppercase tracking-wider mb-1">
            SKU: {product.sku}
          </p>
        )}

        <h3
          className="font-heading font-bold text-black mb-2 leading-snug group-hover:text-[#1B84FE] transition-colors"
          style={{ fontSize: '15px', fontFamily: 'var(--font-heading)' }}
        >
          {product.name}
        </h3>

        {product.description && (
          <p
            className="text-[#4B5563] leading-relaxed line-clamp-2 mb-4"
            style={{ fontSize: '13px', fontFamily: 'var(--font-body)' }}
          >
            {product.description}
          </p>
        )}

        {/* Preço + CTA */}
        <div className="mt-auto pt-4 border-t border-[#F1F5F9]">
          {product.is_direct_sale && product.price && (
            <p
              className="font-heading font-bold text-[#1B84FE] mb-3"
              style={{ fontSize: '18px' }}
            >
              R$ {product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </p>
          )}

          <button
            onClick={() => onAction?.(product)}
            className={[
              'w-full flex items-center justify-center gap-2 font-semibold rounded-[10px] py-2.5 text-sm transition-all duration-200',
              product.is_direct_sale
                ? 'bg-[#1B84FE] text-black hover:bg-[#1D67CD] shadow-sm hover:shadow-md'
                : 'bg-transparent border-2 border-[#1B84FE] text-[#1B84FE] hover:bg-[#EBF3FF]',
            ].join(' ')}
          >
            {product.is_direct_sale ? (
              <>
                <ShoppingCart className="w-4 h-4" />
                Comprar Agora
              </>
            ) : (
              <>
                <FileText strokeWidth={1.25} className="w-4 h-4" />
                Solicitar Orçamento
              </>
            )}
          </button>
        </div>
      </div>
    </motion.div>
  )
}
