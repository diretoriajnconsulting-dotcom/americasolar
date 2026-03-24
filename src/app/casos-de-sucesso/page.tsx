'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'

const CASOS = [
  {
    id: 1,
    title: 'Instalação de Tanque de 750KVA',
    client: 'Paraíba Mall',
    description: 'Projeto completo de infraestrutura elétrica para suportar a alta demanda energética do shopping, garantindo segurança e operação ininterrupta para mais de 150 operações.',
    image: 'https://images.unsplash.com/photo-1519494140681-8b17b830a3f9?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 2,
    title: 'Manutenção de 19 transformadores',
    client: 'Usina Eólica Casa Nova Bahia',
    description: 'Operação crítica de manutenção preventiva e corretiva em parque eólico, assegurando a máxima eficiência na transmissão de energia limpa para o sistema interligado nacional.',
    image: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?q=80&w=800&auto=format&fit=crop'
  }
]

export default function CasosDeSucesso() {
  return (
    <div className="container mx-auto px-6 py-16">
      <div className="text-center max-w-3xl mx-auto mb-20 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary-base/10 rounded-full blur-[80px] pointer-events-none" />
        <h1 className="text-4xl md:text-6xl font-display font-bold text-text-body mb-6 tracking-tight relative z-10">
          Casos de <span className="text-primary-base drop-shadow-[0_0_15px_rgba(255,206,0,0.4)]">Sucesso</span>
        </h1>
        <p className="text-lg text-text-muted leading-relaxed relative z-10">
          Nossa engenharia e expertise aplicadas em equipamentos elétricos de alta performance. Conheça as operações críticas que confiam na Solar América.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
        {CASOS.map((caso, index) => (
          <motion.div
            key={caso.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className="glass-panel rounded-2xl flex flex-col group overflow-hidden border border-white/10 hover:shadow-[0_0_30px_rgba(255,206,0,0.15)] transition-all duration-500"
          >
            <div className="h-72 overflow-hidden relative border-b border-white/10">
              <div className="absolute inset-0 bg-gradient-to-t from-surface-lowest to-transparent opacity-60 z-10" />
              <Image 
                src={caso.image} 
                alt={caso.title} 
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>
            <div className="p-8 relative z-20 bg-surface-lowest/50 flex-grow">
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle2 className="w-5 h-5 text-primary-base" />
                <span className="text-xs font-display font-semibold tracking-widest uppercase text-text-muted">{caso.client}</span>
              </div>
              <h3 className="text-2xl font-display font-bold text-text-body mb-4 group-hover:text-primary-base transition-colors">{caso.title}</h3>
              <p className="text-text-muted leading-relaxed">
                {caso.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
