'use client'

import { motion } from 'framer-motion'
import { Button } from './Button'

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
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
      className="glass-panel rounded-xl flex flex-col group relative overflow-hidden hover:shadow-[0_0_30px_rgba(238,194,0,0.15)] transition-all duration-300"
    >
      <div className="aspect-video bg-surface-lowest/50 relative flex items-center justify-center border-b border-white/5 overflow-hidden">
        {/* Subtle overlay gradient on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-surface-lowest/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10" />
        
        {product.image_url ? (
          <img 
            src={product.image_url} 
            alt={product.name} 
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" 
          />
        ) : (
          <div className="text-text-muted/60">Imagem Indisponível</div>
        )}
      </div>
      
      <div className="p-5 flex flex-col flex-grow relative z-20">
        <h3 className="text-lg font-display font-semibold text-text-body mb-2 group-hover:text-primary-base transition-colors leading-tight">
          {product.name}
        </h3>
        {product.description && (
          <p className="text-sm text-text-muted mb-4 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        )}
        
        <div className="mt-auto pt-4 border-t border-white/5">
          {product.is_direct_sale && product.price && (
            <p className="text-lg font-display font-bold text-primary-base mb-4 drop-shadow-[0_0_8px_rgba(238,194,0,0.4)]">
              R$ {product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </p>
          )}
          
          <Button 
            className="w-full shadow-lg" 
            variant={product.is_direct_sale ? 'primary' : 'outline'}
            onClick={() => onAction?.(product)}
          >
            {product.is_direct_sale ? 'Comprar Agora' : 'Solicitar Orçamento'}
          </Button>
        </div>
      </div>
    </motion.div>
  )
}
