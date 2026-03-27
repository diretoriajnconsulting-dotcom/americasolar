'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { CheckCircle2, ArrowRight, Zap } from 'lucide-react'

// ─────────────────────────────────────────────────────────────────────────────
// PORTFÓLIO DE PRODUTOS & CASOS
// Os solar_*.svg são silhuetas pretas — usamos as fotos do hero como backdrop
// com overlay colorido temático para cada categoria.
// ─────────────────────────────────────────────────────────────────────────────

const DESTAQUES = [
  {
    id: 1,
    title: 'Tanque de 750 KVA — Paraíba Mall',
    client: 'Paraíba Mall · João Pessoa, PB',
    description:
      'Fabricação e entrega de tanque completo de transformador 750 KVA para suportar a alta demanda energética do shopping, garantindo operação ininterrupta para mais de 150 lojistas.',
    tag: 'Transformador a Óleo',
    image: '/casos/slide_b.svg',
    fallbackBg: 'from-[#0A1628] to-[#1B84FE]/60',
  },
  {
    id: 2,
    title: 'Manutenção de 19 Transformadores 36 KV',
    client: 'Usina Eólica Casa Nova · Bahia',
    description:
      'Operação crítica de manutenção preventiva em 19 transformadores classe 36 KV a seco para parque eólico, assegurando máxima eficiência na transmissão de energia limpa para o sistema interligado nacional.',
    tag: 'Manutenção · Energia Renovável',
    image: '/casos/slide_a.svg',
    fallbackBg: 'from-[#064E3B] to-[#059669]/60',
  },
]

// Portfólio: usa as 3 fotos do hero rotacionadas + cores temáticas por categoria
const PORTFOLIO = [
  {
    id: 3,
    title: 'Parte Ativa-Núcleo 750 KVA',
    descricao: 'Fabricação do núcleo magnético e parte ativa de transformador 750 KVA para uso industrial.',
    photo: '/hero-carousel/1.png',
    accent: '#1B84FE',
    tag: 'Fabricação',
  },
  {
    id: 4,
    title: 'Linha de Produção — Seco e Óleo',
    descricao: 'Linha de produção completa de transformadores a seco e a óleo com controle de qualidade ISO.',
    photo: '/hero-carousel/1.png',
    accent: '#1D67CD',
    tag: 'Produção',
  },
  {
    id: 5,
    title: 'Transformadores a Seco 500 KVA',
    descricao: 'Transformadores a seco 500 KVA para instalação em ambientes internos sem risco de vazamento.',
    photo: '/hero-carousel/3.png',
    accent: '#0F766E',
    tag: 'A Seco',
  },
  {
    id: 6,
    title: 'Auto Transformadores',
    descricao: 'Auto transformadores trifásicos e monofásicos de diversas potências e voltagens.',
    photo: '/hero-carousel/3.png',
    accent: '#7C3AED',
    tag: 'Auto Trafo',
  },
  {
    id: 7,
    title: 'Transformador 300 KVA',
    descricao: 'Transformador 300 KVA para uso industrial e comercial com garantia de fábrica.',
    photo: '/hero-carousel/1.png',
    accent: '#B45309',
    tag: 'A Óleo',
  },
  {
    id: 8,
    title: 'Transformadores a Força',
    descricao: 'Transformadores de força para aplicações de alta tensão em transmissão e distribuição.',
    photo: '/hero-carousel/3.png',
    accent: '#DC2626',
    tag: 'Alta Tensão',
  },
  {
    id: 9,
    title: 'Sistema Fotovoltaico 225 KVA',
    descricao: 'Transformadores para sistemas fotovoltaicos · 225 KVA · 13.800/380/220 V · Fator K=8.',
    photo: '/hero-carousel/2.png',
    accent: '#D97706',
    tag: 'Fotovoltaico',
  },
  {
    id: 10,
    title: 'Transformadores Pedestal',
    descricao: 'Transformadores pedestal para redes de distribuição urbana e concessionárias.',
    photo: '/hero-carousel/3.png',
    accent: '#0369A1',
    tag: 'Distribuição',
  },
  {
    id: 11,
    title: 'Transformadores de Distribuição',
    descricao: 'Transformadores de distribuição para redes de média tensão em todo o Brasil.',
    photo: '/hero-carousel/3.png',
    accent: '#065F46',
    tag: 'Distribuição',
  },
]

// ─── Card de destaque (grande) ────────────────────────────────────────────────
function CardDestaque({ caso, index }: { caso: typeof DESTAQUES[0]; index: number }) {
  const [imgError, setImgError] = React.useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, delay: index * 0.12 }}
      className="bg-white border border-[#E2E8F0] rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:border-[#1B84FE]/30 transition-all duration-500 group flex flex-col"
    >
      {/* Imagem / slide SVG */}
      <div className="h-64 relative overflow-hidden border-b border-[#E2E8F0]">
        {!imgError ? (
          <>
            <img
              src={caso.image}
              alt={caso.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              onError={() => setImgError(true)}
            />
            {/* Overlay suave no bottom para legibilidade */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </>
        ) : (
          /* Fallback elegante quando o SVG não carrega */
          <div className={`absolute inset-0 bg-gradient-to-br ${caso.fallbackBg} flex items-center justify-center`}>
            <Zap className="w-16 h-16 text-white/30" strokeWidth={0.75} />
          </div>
        )}
        <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm border border-white/50 text-[10px] font-heading font-bold tracking-widest uppercase text-[#1B84FE] px-3 py-1.5 rounded-full shadow-sm">
          {caso.tag}
        </span>
      </div>

      {/* Conteúdo */}
      <div className="p-7 flex-grow">
        <div className="flex items-center gap-2 mb-3">
          <CheckCircle2 className="w-4 h-4 text-[#22C55E] shrink-0" strokeWidth={1.5} />
          <span className="text-xs font-heading font-semibold tracking-wider uppercase text-[#9CA3AF]">
            {caso.client}
          </span>
        </div>
        <h3
          className="font-heading font-bold text-black mb-4 group-hover:text-[#1B84FE] transition-colors leading-snug"
          style={{ fontSize: '18px' }}
        >
          {caso.title}
        </h3>
        <p className="text-[#4B5563] leading-relaxed text-sm font-body">{caso.description}</p>
      </div>
    </motion.div>
  )
}

// ─── Card de portfólio — foto real com overlay de cor temática ─────────────
function CardPortfolio({ item, index }: { item: typeof PORTFOLIO[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, delay: (index % 3) * 0.07 }}
      className="bg-white border border-[#E2E8F0] rounded-xl overflow-hidden shadow-sm hover:shadow-lg hover:border-[#1B84FE]/30 transition-all duration-300 group"
    >
      {/* Foto com overlay de cor temática */}
      <div className="h-44 relative overflow-hidden">
        <img
          src={item.photo}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Overlay suave com a cor temática */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-300"
          style={{ backgroundColor: item.accent }}
        />
        {/* Badge de categoria */}
        <span
          className="absolute top-3 left-3 text-white text-[10px] font-heading font-bold tracking-widest uppercase px-2.5 py-1 rounded-full"
          style={{ backgroundColor: item.accent + 'DD' }}
        >
          {item.tag}
        </span>
      </div>

      <div className="p-5">
        {/* Linha de destaque colorida */}
        <div
          className="w-8 h-0.5 rounded-full mb-3 transition-all duration-300 group-hover:w-16"
          style={{ backgroundColor: item.accent }}
        />
        <h4
          className="font-heading font-bold text-black mb-1.5 leading-snug group-hover:text-[#1B84FE] transition-colors"
          style={{ fontSize: '14px' }}
        >
          {item.title}
        </h4>
        <p className="text-xs text-[#4B5563] leading-relaxed font-body">{item.descricao}</p>
      </div>
    </motion.div>
  )
}

// ─── Página principal ─────────────────────────────────────────────────────────
export default function CasosDeSucesso() {
  return (
    <div className="min-h-screen bg-white">

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <div className="bg-[#0A1628] py-20 px-6 relative overflow-hidden">
        {/* Imagem de fundo com overlay */}
        <div className="absolute inset-0">
          <img src="/hero-carousel/1.png" alt="" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A1628] via-[#0A1628]/90 to-[#0A1628]/70" />
        </div>
        <div className="container mx-auto max-w-7xl text-center relative z-10">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-[#1B84FE] font-heading font-semibold text-xs uppercase tracking-widest mb-4"
          >
            — Portfólio & Cases
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-heading font-bold text-white leading-tight mb-4"
            style={{ fontSize: '38px' }}
          >
            Casos de{' '}
            <span className="text-[#1B84FE]">Sucesso</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white/60 max-w-2xl mx-auto leading-relaxed font-body"
            style={{ fontSize: '16px' }}
          >
            Engenharia de alto desempenho aplicada em projetos reais — de shopping
            centers a usinas de energia renovável em todo o Brasil.
          </motion.p>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-6 py-20">

        {/* ── Destaques ─────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {DESTAQUES.map((caso, i) => (
            <CardDestaque key={caso.id} caso={caso} index={i} />
          ))}
        </div>

        {/* ── Divisor ───────────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex items-center gap-4 mb-14"
        >
          <div className="flex-1 h-px bg-[#E2E8F0]" />
          <span className="text-[11px] font-heading font-semibold tracking-widest text-[#9CA3AF] uppercase whitespace-nowrap px-4">
            Linha de Produtos
          </span>
          <div className="flex-1 h-px bg-[#E2E8F0]" />
        </motion.div>

        {/* ── Portfólio (3 colunas) ─────────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {PORTFOLIO.map((item, i) => (
            <CardPortfolio key={item.id} item={item} index={i} />
          ))}
        </div>

        {/* ── CTA final ─────────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative rounded-2xl overflow-hidden max-w-3xl mx-auto"
        >
          <img src="/hero-carousel/3.png" alt="" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-[#0A1628]/85" />
          <div className="relative z-10 p-10 text-center">
            <h2
              className="font-heading font-bold text-white mb-4"
              style={{ fontSize: '24px' }}
            >
              Seu projeto é o próximo
            </h2>
            <p className="text-white/60 mb-8 leading-relaxed font-body text-sm">
              Fale com nossa equipe de engenharia e receba uma proposta técnica
              personalizada para sua demanda.
            </p>
            <Link
              href="/diagnostico"
              className="inline-flex items-center gap-2 bg-[#1B84FE] text-black font-semibold px-8 py-3.5 rounded-[10px] hover:bg-[#1D67CD] transition-all text-sm shadow-lg group"
            >
              Solicitar Diagnóstico de Carga
              <ArrowRight strokeWidth={1.5} className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
