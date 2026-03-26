'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { CheckCircle2, Zap, ArrowRight } from 'lucide-react'

// ─────────────────────────────────────────────────────────────────────────────
// PORTFÓLIO DE PRODUTOS & CASOS
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
  },
  {
    id: 2,
    title: 'Manutenção de 19 Transformadores 36 KV',
    client: 'Usina Eólica Casa Nova · Bahia',
    description:
      'Operação crítica de manutenção preventiva em 19 transformadores classe 36 KV a seco para parque eólico, assegurando máxima eficiência na transmissão de energia limpa para o sistema interligado nacional.',
    tag: 'Manutenção · Energia Renovável',
    image: '/casos/slide_a.svg',
  },
]

const PORTFOLIO = [
  { id: 3,  title: 'Parte Ativa-Núcleo 750 KVA',      descricao: 'Fabricação do núcleo magnético e parte ativa de transformador 750 KVA.',                                   image: '/casos/solar_1.svg' },
  { id: 4,  title: 'Linha de Produção — Seco e Óleo', descricao: 'Linha de produção completa de transformadores a seco e a óleo.',                                           image: '/casos/solar_3.svg' },
  { id: 5,  title: 'Transformadores a Seco 500 KVA',  descricao: 'Transformadores a seco 500 KVA para instalação em ambientes internos.',                                    image: '/casos/solar_5.svg' },
  { id: 6,  title: 'Auto Transformadores',             descricao: 'Auto transformadores de várias potências e voltagens.',                                                    image: '/casos/solar_6.svg' },
  { id: 7,  title: 'Transformador 300 KVA',            descricao: 'Transformador 300 KVA para uso industrial e comercial.',                                                   image: '/casos/solar_2.svg' },
  { id: 8,  title: 'Transformadores a Força',          descricao: 'Transformadores a força para aplicações de alta tensão.',                                                  image: '/casos/solar_9.svg' },
  { id: 9,  title: 'Sistema Fotovoltaico 225 KVA',     descricao: 'Transformadores para sistemas fotovoltaicos 225 KVA · 13.800/380/220 V · Fator K=8.',                     image: '/casos/slide_c.svg' },
  { id: 10, title: 'Transformadores Pedestal',         descricao: 'Transformadores pedestal para redes de distribuição urbana.',                                              image: '/casos/transformadores-pedestal.jpg' },
  { id: 11, title: 'Transformadores de Distribuição',  descricao: 'Transformadores de distribuição para concessionárias e redes de média tensão.',                           image: '/casos/transformadores-distribuicao.jpg' },
]

// ─── Placeholder quando a imagem ainda não existe ─────────────────────────────
function ImagePlaceholder({ title }: { title: string }) {
  return (
    <div className="absolute inset-0 bg-[#F1F5F9] flex flex-col items-center justify-center gap-3 p-4">
      <div className="w-12 h-12 rounded-xl bg-[#EBF3FF] border border-[#1B84FE]/20 flex items-center justify-center">
        <Zap strokeWidth={1.25} className="w-5 h-5 text-[#1B84FE]" />
      </div>
      <p className="text-[11px] text-[#9CA3AF] text-center font-heading uppercase tracking-widest leading-relaxed max-w-[160px]">
        {title}
      </p>
    </div>
  )
}

// ─── Card de destaque (grande) ────────────────────────────────────────────────
function CardDestaque({ caso, index }: { caso: typeof DESTAQUES[0]; index: number }) {
  const [imgError, setImgError] = React.useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, delay: index * 0.12 }}
      className="bg-white border border-[#E2E8F0] rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:border-[#1B84FE]/30 transition-all duration-300 group flex flex-col"
    >
      {/* Imagem */}
      <div className="h-64 relative overflow-hidden bg-[#F1F5F9] border-b border-[#E2E8F0]">
        {!imgError ? (
          <Image
            src={caso.image}
            alt={caso.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            onError={() => setImgError(true)}
          />
        ) : (
          <ImagePlaceholder title={caso.title} />
        )}
        {/* Tag */}
        <span className="absolute top-4 left-4 bg-white border border-[#E2E8F0] text-[10px] font-heading font-bold tracking-widest uppercase text-[#1B84FE] px-3 py-1.5 rounded-full shadow-sm">
          {caso.tag}
        </span>
      </div>

      {/* Conteúdo */}
      <div className="p-7 flex-grow">
        <div className="flex items-center gap-2 mb-3">
          <CheckCircle2 className="w-4 h-4 text-[#22C55E] shrink-0" />
          <span className="text-xs font-heading font-semibold tracking-wider uppercase text-[#9CA3AF]">
            {caso.client}
          </span>
        </div>
        <h3
          className="font-heading font-bold text-black mb-4 group-hover:text-[#1B84FE] transition-colors leading-snug"
          style={{ fontSize: '18px', fontFamily: 'var(--font-heading)' }}
        >
          {caso.title}
        </h3>
        <p className="text-[#4B5563] leading-relaxed text-sm font-body">{caso.description}</p>
      </div>
    </motion.div>
  )
}

// ─── Card de portfólio (pequeno) ──────────────────────────────────────────────
function CardPortfolio({ item, index }: { item: typeof PORTFOLIO[0]; index: number }) {
  const [imgError, setImgError] = React.useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, delay: (index % 3) * 0.07 }}
      className="bg-white border border-[#E2E8F0] rounded-xl overflow-hidden shadow-sm hover:shadow-md hover:border-[#1B84FE]/30 transition-all group"
    >
      <div className="h-40 relative bg-[#F1F5F9] overflow-hidden border-b border-[#E2E8F0]">
        {!imgError ? (
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            onError={() => setImgError(true)}
          />
        ) : (
          <ImagePlaceholder title={item.title} />
        )}
      </div>
      <div className="p-5">
        <h4
          className="font-heading font-bold text-black mb-1.5 leading-snug group-hover:text-[#1B84FE] transition-colors"
          style={{ fontSize: '14px', fontFamily: 'var(--font-heading)' }}
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
      <div className="bg-[#0A1628] py-16 px-6">
        <div className="container mx-auto max-w-7xl text-center">
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
            style={{ fontSize: '33px', fontFamily: 'var(--font-heading)' }}
          >
            Casos de{' '}
            <span className="text-[#1B84FE]">Sucesso</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white/60 max-w-2xl mx-auto leading-relaxed"
            style={{ fontSize: '16px', fontFamily: 'var(--font-body)' }}
          >
            Engenharia de alto desempenho aplicada em projetos reais — de shopping
            centers a usinas de energia renovável em todo o Brasil.
          </motion.p>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-6 py-16">

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
          className="flex items-center gap-4 mb-12"
        >
          <div className="flex-1 h-px bg-[#E2E8F0]" />
          <span className="text-[11px] font-heading font-semibold tracking-widest text-[#9CA3AF] uppercase whitespace-nowrap">
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
          className="bg-[#0A1628] rounded-2xl p-10 text-center max-w-3xl mx-auto relative overflow-hidden"
        >
          <div className="absolute inset-0 opacity-10"
            style={{ background: 'radial-gradient(circle at 50% 50%, #1B84FE, transparent 70%)' }} />
          <div className="relative z-10">
            <h2
              className="font-heading font-bold text-white mb-4"
              style={{ fontSize: '24px', fontFamily: 'var(--font-heading)' }}
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
              <ArrowRight strokeWidth={1.25} className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
