'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import {
  ArrowRight,
  BatteryCharging, Crosshair, BarChart2,
  Star, Users, TrendingUp, Leaf,
  Shield, Award,
} from 'lucide-react'

// ─── Animações ────────────────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
}
const stagger = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.09 } },
}

// ─── Ícones SVG customizados para a indústria elétrica ────────────────────────
// Representam equipamentos reais: bobinas de transformador, isolação, eficiência
function IconTransformerCoil({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Núcleo magnético (barras laterais) */}
      <rect x="5" y="10" width="5" height="28" rx="1.5" fill="currentColor" opacity="0.9"/>
      <rect x="38" y="10" width="5" height="28" rx="1.5" fill="currentColor" opacity="0.9"/>
      {/* Barras horizontais do núcleo */}
      <rect x="5" y="10" width="38" height="5" rx="1.5" fill="currentColor" opacity="0.6"/>
      <rect x="5" y="33" width="38" height="5" rx="1.5" fill="currentColor" opacity="0.6"/>
      {/* Bobina primária — espirais */}
      <path d="M14 18 Q17 15 20 18 Q23 21 26 18 Q29 15 32 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none"/>
      <path d="M14 22 Q17 19 20 22 Q23 25 26 22 Q29 19 32 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none"/>
      {/* Bobina secundária — espirais */}
      <path d="M14 28 Q17 25 20 28 Q23 31 26 28 Q29 25 32 28" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.7"/>
    </svg>
  )
}

function IconGalvanicIsolation({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Escudo externo */}
      <path d="M24 4L8 10V22C8 31 15 38.5 24 42C33 38.5 40 31 40 22V10L24 4Z"
        stroke="currentColor" strokeWidth="2" strokeLinejoin="round" fill="currentColor" opacity="0.12"/>
      <path d="M24 4L8 10V22C8 31 15 38.5 24 42C33 38.5 40 31 40 22V10L24 4Z"
        stroke="currentColor" strokeWidth="2" strokeLinejoin="round" fill="none"/>
      {/* Símbolo de isolação — dois círculos separados por linha */}
      <circle cx="18" cy="22" r="4" stroke="currentColor" strokeWidth="1.75" fill="none"/>
      <circle cx="30" cy="22" r="4" stroke="currentColor" strokeWidth="1.75" fill="none"/>
      <line x1="24" y1="18" x2="24" y2="26" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 1.5"/>
    </svg>
  )
}

function IconEfficiencyGauge({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Arco do medidor */}
      <path d="M8 34 A16 16 0 0 1 40 34" stroke="currentColor" strokeWidth="3" strokeLinecap="round"
        fill="none" opacity="0.25"/>
      {/* Arco de progresso — 80% */}
      <path d="M8 34 A16 16 0 0 1 36 18" stroke="currentColor" strokeWidth="3" strokeLinecap="round" fill="none"/>
      {/* Ponteiro */}
      <line x1="24" y1="34" x2="33" y2="17" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
      {/* Centro */}
      <circle cx="24" cy="34" r="3" fill="currentColor"/>
      {/* Marcações */}
      <line x1="8" y1="34" x2="10" y2="30" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
      <line x1="24" y1="18" x2="24" y2="21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
      <line x1="40" y1="34" x2="38" y2="30" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
    </svg>
  )
}

function IconIndustrialProcess({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Engrenagem grande */}
      <path d="M20 6H28L29 11A11 11 0 0 1 33.5 13.5L38.5 11.5L44 18L41 22.5A11 11 0 0 1 41 27.5L44 32L38.5 38.5L33.5 36.5A11 11 0 0 1 29 39L28 44H20L19 39A11 11 0 0 1 14.5 36.5L9.5 38.5L4 32L7 27.5A11 11 0 0 1 7 22.5L4 18L9.5 11.5L14.5 13.5A11 11 0 0 1 19 11L20 6Z"
        stroke="currentColor" strokeWidth="1.75" strokeLinejoin="round" fill="currentColor" opacity="0.1"/>
      <path d="M20 6H28L29 11A11 11 0 0 1 33.5 13.5L38.5 11.5L44 18L41 22.5A11 11 0 0 1 41 27.5L44 32L38.5 38.5L33.5 36.5A11 11 0 0 1 29 39L28 44H20L19 39A11 11 0 0 1 14.5 36.5L9.5 38.5L4 32L7 27.5A11 11 0 0 1 7 22.5L4 18L9.5 11.5L14.5 13.5A11 11 0 0 1 19 11L20 6Z"
        stroke="currentColor" strokeWidth="1.75" strokeLinejoin="round" fill="none"/>
      <circle cx="24" cy="25" r="6" stroke="currentColor" strokeWidth="2" fill="none"/>
      {/* Raio elétrico no centro */}
      <path d="M26 21L22 25H25L22 29" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

// ─── Ícone inline para tipos de produto ───────────────────────────────────────
function IconTransformerMini({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect x="2" y="4" width="2" height="12" rx="0.5" fill="currentColor"/>
      <rect x="16" y="4" width="2" height="12" rx="0.5" fill="currentColor"/>
      <rect x="2" y="4" width="16" height="2" rx="0.5" fill="currentColor" opacity="0.6"/>
      <rect x="2" y="14" width="16" height="2" rx="0.5" fill="currentColor" opacity="0.6"/>
      <path d="M5.5 8 Q7 6.5 8.5 8 Q10 9.5 11.5 8 Q13 6.5 14.5 8" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round"/>
      <path d="M5.5 12 Q7 10.5 8.5 12 Q10 13.5 11.5 12 Q13 10.5 14.5 12" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.65"/>
    </svg>
  )
}

// ─── Dados ────────────────────────────────────────────────────────────────────
const FEATURES = [
  {
    Icon: IconTransformerCoil,
    title: 'Fabricação Própria',
    desc: 'Projetamos e fabricamos transformadores a seco e a óleo diretamente em nossa planta industrial em João Pessoa — com rastreabilidade completa.',
  },
  {
    Icon: IconEfficiencyGauge,
    title: 'Eficiência e Durabilidade',
    desc: 'Equipamentos projetados para máxima performance com perdas mínimas em vazio e carga — aumentando a vida útil da sua instalação.',
  },
  {
    Icon: IconGalvanicIsolation,
    title: 'Isolação Galvânica',
    desc: 'Separação elétrica completa entre primário e secundário para máxima segurança ao circuito, ao operador e ao processo produtivo.',
  },
  {
    Icon: IconIndustrialProcess,
    title: 'Capacidade Industrial',
    desc: 'Atendemos demandas de 1 KVA até 10.000 KVA com especificações técnicas customizadas para cada projeto e segmento.',
  },
]

const TIPOS = [
  { label: 'Transformadores a Seco',  kva: 'Até 2.500 KVA' },
  { label: 'Transformadores a Óleo',  kva: 'Até 10.000 KVA' },
  { label: 'Autotransformadores',     kva: 'Trifásicos e Monofásicos' },
  { label: 'Fotovoltaicos / FV',      kva: 'Grid-Tie e Off-Grid' },
  { label: 'Isoladores de Comando',   kva: 'Linha Industrial' },
]

const VALORES = [
  { icon: BatteryCharging, label: 'Motivação' },
  { icon: Crosshair,       label: 'Comprometimento' },
  { icon: BarChart2,       label: 'Empreendedorismo' },
  { icon: Shield,          label: 'Integridade' },
  { icon: Star,            label: 'Bom Humor' },
  { icon: Users,           label: 'Valorização Humana' },
  { icon: Award,           label: 'Credibilidade' },
  { icon: TrendingUp,      label: 'Busca Contínua de Excelência' },
  { icon: Leaf,            label: 'Saúde, Segurança e Meio Ambiente' },
]

// ─── Contador animado ─────────────────────────────────────────────────────────
function AnimatedCounter({ target, suffix = '', prefix = '' }: { target: number; suffix?: string; prefix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          const duration = 1800
          const steps = 60
          const increment = target / steps
          let current = 0
          const timer = setInterval(() => {
            current = Math.min(current + increment, target)
            setCount(Math.round(current))
            if (current >= target) clearInterval(timer)
          }, duration / steps)
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [target])

  return <span ref={ref}>{prefix}{count.toLocaleString('pt-BR')}{suffix}</span>
}

const STATS = [
  { prefix: '+', value: 500, suffix: '',  label: 'Transformadores Entregues', sub: 'desde a fundação' },
  { prefix: '+', value: 15,  suffix: '',  label: 'Anos de Mercado',            sub: 'de experiência sólida' },
  { prefix: '+', value: 12,  suffix: '',  label: 'Estados Atendidos',          sub: 'em todo o Brasil' },
  { prefix: '',  value: 98,  suffix: '%', label: 'Índice de Satisfação',       sub: 'avaliado pelos clientes' },
]

// ─── Ícone SVG de certificação ────────────────────────────────────────────────
function CertBadge({ text, sub, color }: { text: string; sub: string; color: string }) {
  return (
    <svg viewBox="0 0 80 80" className="w-20 h-20 shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Anel exterior dentado (estilo selo) */}
      <path d="M40 4 L44 11 L52 8 L53 16 L61 17 L59 25 L67 29 L62 36 L68 42 L61 46 L63 54 L55 55 L53 63 L45 61 L40 68 L35 61 L27 63 L25 55 L17 54 L19 46 L12 42 L18 36 L13 29 L21 25 L19 17 L27 16 L28 8 L36 11 Z"
        fill={color} opacity="0.12" stroke={color} strokeWidth="1.25"/>
      {/* Anel interior */}
      <circle cx="40" cy="36" r="18" fill="white" stroke={color} strokeWidth="1.5"/>
      {/* Texto */}
      <text x="40" y="32" textAnchor="middle" fontFamily="Poppins, sans-serif" fontSize="10" fontWeight="700" fill={color}>{text}</text>
      <text x="40" y="44" textAnchor="middle" fontFamily="Poppins, sans-serif" fontSize="7" fontWeight="600" fill={color} opacity="0.8">{sub}</text>
    </svg>
  )
}

// ─── Página ───────────────────────────────────────────────────────────────────
export default function Home() {
  const [emblaRef] = useEmblaCarousel(
    { loop: true, duration: 40 },
    [Autoplay({ delay: 5000, stopOnInteraction: false })]
  )

  return (
    <div className="overflow-x-hidden">

      {/* ══════════════════════════════════════════════════════════
          1. HERO — carrossel com overlay gradiente
      ══════════════════════════════════════════════════════════ */}
      <section
        className="relative bg-[#0A1628] text-white overflow-hidden"
        style={{ minHeight: 'clamp(560px, 85vh, 900px)', display: 'flex', alignItems: 'center' }}
      >
        {/* Carrossel */}
        <div className="absolute inset-0 overflow-hidden z-0" ref={emblaRef}>
          <div className="flex h-full">
            {/* Cada slide usa object-position calibrada para as fotos 640×640:
                foto 1 (fábrica + transformador) → top center mostra melhor
                foto 2 (fazenda solar aérea) → center é ideal
                foto 3 (subestação ao entardecer) → center */}
            {[
              { i: 1, pos: 'center top' },
              { i: 2, pos: 'center center' },
              { i: 3, pos: 'center center' },
            ].map(({ i, pos }) => (
              <div key={i} className="relative flex-[0_0_100%] min-w-0 h-full">
                <img
                  src={`/hero-carousel/${i}.png`}
                  alt=""
                  loading={i === 1 ? 'eager' : 'lazy'}
                  className="w-full h-full object-cover"
                  style={{ objectPosition: pos }}
                />
              </div>
            ))}
          </div>
        </div>
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A1628]/96 via-[#0A1628]/82 to-[#0A1628]/45 z-0" />
        {/* Grade sutil */}
        <div className="absolute inset-0 opacity-[0.035] z-0"
          style={{ backgroundImage: 'linear-gradient(rgba(27,132,254,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(27,132,254,.5) 1px, transparent 1px)', backgroundSize: '64px 64px' }} />

        <div className="relative z-10 container mx-auto max-w-7xl px-6 py-28 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div variants={stagger} initial="hidden" animate="show">
            <motion.span variants={fadeUp}
              className="inline-flex items-center gap-2 bg-[#F0A500]/12 border border-[#F0A500]/40 rounded-full px-4 py-1.5 text-xs font-semibold tracking-widest text-[#F0A500] uppercase mb-7 backdrop-blur-md"
            >
              <IconTransformerMini className="w-3.5 h-3.5 text-[#F0A500]" />
              Fabricação Própria · João Pessoa – PB
            </motion.span>

            <motion.h1 variants={fadeUp}
              className="font-heading font-extrabold leading-[1.1] mb-6 drop-shadow-lg"
              style={{ fontSize: 'clamp(28px, 4vw, 46px)' }}
            >
              <span className="text-white">Transformadores</span>
              <span className="block text-[#1B84FE] mt-1">Elétricos de Alta<br />Performance</span>
            </motion.h1>

            <motion.p variants={fadeUp}
              className="text-white/75 leading-relaxed mb-10 max-w-lg"
              style={{ fontSize: '17px', fontFamily: 'var(--font-body)' }}
            >
              Fabricamos transformadores a seco e a óleo com rastreabilidade ISO,
              atendendo indústrias, shoppings, usinas renováveis e obras críticas
              em todo o Brasil.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4">
              <Link href="/diagnostico"
                className="inline-flex items-center justify-center gap-2 bg-[#1B84FE] text-black font-semibold rounded-[10px] px-8 py-4 hover:bg-[#1D67CD] transition-all shadow-xl text-sm group"
              >
                Quero um Orçamento
                <ArrowRight strokeWidth={1.5} className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link href="/catalogo"
                className="inline-flex items-center justify-center gap-2 bg-white/8 backdrop-blur-md border border-white/25 text-white font-semibold rounded-[10px] px-8 py-4 hover:border-[#1B84FE]/70 hover:bg-[#1B84FE]/10 transition-all text-sm"
              >
                Ver Catálogo
              </Link>
            </motion.div>
          </motion.div>

          {/* Cards de produto — lado direito */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.35, ease: 'easeOut' }}
            className="hidden lg:grid grid-cols-2 gap-4"
          >
            {[
              { kva: '225 KVA',  tipo: 'Fotovoltaico', cor: '#FBBF24', desc: 'Grid-Tie / Off-Grid' },
              { kva: '500 KVA',  tipo: 'A Seco',        cor: '#60A5FA', desc: 'NBR 5356-1' },
              { kva: '750 KVA',  tipo: 'A Óleo',        cor: '#34D399', desc: 'ONAN/ONAF' },
              { kva: 'Custom',   tipo: 'Sob Demanda',   cor: '#C084FC', desc: 'Qualquer especificação' },
            ].map((item) => (
              <div key={item.kva}
                className="bg-white/6 backdrop-blur-md border border-white/10 rounded-2xl p-5 hover:bg-white/10 hover:border-white/20 transition-all group shadow-xl"
              >
                {/* Linha de cor temática */}
                <div className="w-8 h-0.5 rounded-full mb-4 transition-all duration-300 group-hover:w-14"
                  style={{ backgroundColor: item.cor }} />
                <p className="text-2xl font-heading font-extrabold text-white leading-none mb-1">{item.kva}</p>
                <p className="text-xs text-white/60 font-body uppercase tracking-wider mb-0.5">{item.tipo}</p>
                <p className="text-[10px] text-white/35 font-body">{item.desc}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
        >
          <span className="text-[9px] text-white/40 tracking-[0.3em] uppercase font-body">scroll</span>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            className="w-px h-8 bg-gradient-to-b from-[#F0A500]/60 to-transparent rounded-full" />
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          2. FEATURES — ícones industriais customizados
      ══════════════════════════════════════════════════════════ */}
      <section className="bg-white py-24 px-6">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 divide-y sm:divide-y-0 sm:divide-x divide-[#E2E8F0]"
          >
            {FEATURES.map(({ Icon, title, desc }, idx) => (
              <motion.div key={title} variants={fadeUp}
                className="flex flex-col gap-5 px-8 py-8 group hover:bg-[#FAFBFF] transition-colors first:pl-0 last:pr-0"
              >
                {/* Barra de acento topo — pattern premium B2B */}
                <div className="w-10 h-[3px] bg-[#F0A500] rounded-full mb-1 transition-all duration-300 group-hover:w-16" />
                <div className="w-14 h-14 bg-[#EBF3FF] rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-[#1B84FE] transition-colors">
                  <Icon className="w-8 h-8 text-[#1B84FE] group-hover:text-white transition-colors" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-black leading-snug mb-2" style={{ fontSize: '15px' }}>
                    {title}
                  </h3>
                  <p className="text-[#6B7280] leading-relaxed font-body" style={{ fontSize: '13.5px' }}>
                    {desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          3. SOCIAL PROOF — números animados
      ══════════════════════════════════════════════════════════ */}
      <section className="bg-[#0A1628] py-16 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: 'radial-gradient(circle at 30% 50%, #1B84FE, transparent 60%)' }} />
        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {STATS.map(({ prefix, value, suffix, label, sub }) => (
              <div key={label} className="text-center">
                <p className="font-heading font-extrabold text-[#F0A500] leading-none mb-1.5" style={{ fontSize: '42px' }}>
                  <AnimatedCounter target={value} suffix={suffix} prefix={prefix} />
                </p>
                <p className="font-heading font-bold text-white text-sm mb-0.5">{label}</p>
                <p className="text-white/35 text-xs font-body">{sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          4. BANDA AZUL — linha de produtos com foto
      ══════════════════════════════════════════════════════════ */}
      <section className="bg-[#1B84FE] py-20 px-6 relative overflow-hidden">
        {/* Foto de fundo com baixa opacidade */}
        <div className="absolute inset-0">
          <img src="/hero-carousel/1.png" alt="" className="w-full h-full object-cover opacity-10" style={{ objectPosition: 'center top' }} />
        </div>
        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5 }}
            >
              <h2 className="font-heading font-bold text-black leading-tight mb-4" style={{ fontSize: '33px' }}>
                Linha Completa de<br />Transformadores
              </h2>
              <p className="text-black/70 leading-relaxed mb-8 font-body" style={{ fontSize: '16px' }}>
                Os transformadores Solar América são utilizados em instalações elétricas,
                circuitos industriais e sistemas de energia renovável — fabricados
                sob norma ABNT com certificação ISO 9001.
              </p>
              <Link href="/catalogo"
                className="inline-flex items-center gap-2 bg-black text-white font-semibold rounded-[10px] px-7 py-3.5 hover:bg-[#0A1628] transition-colors text-sm group"
              >
                Ver Catálogo Completo
                <ArrowRight strokeWidth={1.5} className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </motion.div>

            <motion.div
              variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}
              className="grid grid-cols-1 gap-2.5"
            >
              {TIPOS.map(({ label, kva }) => (
                <motion.div key={label} variants={fadeUp}
                  className="flex items-center justify-between bg-white/15 border border-white/20 rounded-xl px-5 py-3.5 hover:bg-white/25 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <IconTransformerMini className="w-5 h-5 text-black/70 shrink-0" />
                    <span className="font-heading font-semibold text-black text-sm">{label}</span>
                  </div>
                  <span className="text-black/55 text-xs font-body font-medium">{kva}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          5. QUEM SOMOS — foto real + texto
      ══════════════════════════════════════════════════════════ */}
      <section className="bg-[#F8FAFC] py-24 px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Foto real da fábrica */}
            <motion.div
              initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="rounded-2xl overflow-hidden shadow-xl border border-[#E2E8F0]">
                <img
                  src="/hero-carousel/1.png"
                  alt="Fábrica Solar América — transformadores industriais"
                  className="w-full h-80 object-cover"
                  style={{ objectPosition: 'center top' }}
                />
              </div>
              {/* Badge flutuante */}
              <div className="absolute -bottom-5 -right-4 bg-white border border-[#E2E8F0] rounded-2xl shadow-lg px-5 py-3.5 flex items-center gap-3">
                <div className="w-10 h-10 bg-[#EBF3FF] rounded-xl flex items-center justify-center">
                  <IconTransformerCoil className="w-6 h-6 text-[#1B84FE]" />
                </div>
                <div>
                  <p className="font-heading font-bold text-black text-sm leading-tight">Fabricação Própria</p>
                  <p className="text-[#9CA3AF] text-xs font-body">João Pessoa – PB</p>
                </div>
              </div>
            </motion.div>

            {/* Texto */}
            <motion.div
              variants={stagger} initial="hidden" whileInView="show"
              viewport={{ once: true, margin: '-60px' }}
            >
              <motion.p variants={fadeUp}
                className="text-[#F0A500] font-heading font-semibold text-xs uppercase tracking-widest mb-3"
              >
                — Quem Somos
              </motion.p>
              <motion.h2 variants={fadeUp}
                className="font-heading font-bold text-black leading-tight mb-6"
                style={{ fontSize: '33px' }}
              >
                Especialistas em<br />transformadores elétricos
              </motion.h2>
              <motion.p variants={fadeUp}
                className="text-[#4B5563] leading-relaxed mb-4 font-body" style={{ fontSize: '15.5px' }}
              >
                Somos uma empresa especializada na produção, venda e manutenção de
                transformadores a seco e a óleo — em constante busca pela excelência
                junto aos nossos fornecedores e clientes.
              </motion.p>
              <motion.p variants={fadeUp}
                className="text-[#4B5563] leading-relaxed mb-8 font-body" style={{ fontSize: '15.5px' }}
              >
                A Solar América projeta, fabrica e fornece transformadores para uma
                ampla faixa do mercado, integrando sistemas de qualidade e política
                ambiental em conformidade com as normas ABNT pertinentes.
              </motion.p>

              {/* Stats inline */}
              <motion.div variants={fadeUp} className="grid grid-cols-3 gap-4 mb-8">
                {[
                  { n: '+15', l: 'Anos' },
                  { n: '+500', l: 'Projetos' },
                  { n: 'ISO', l: '9001:2015' },
                ].map(({ n, l }) => (
                  <div key={l} className="text-center bg-white border border-[#E2E8F0] rounded-xl py-3 shadow-sm">
                    <p className="font-heading font-extrabold text-[#F0A500] text-xl">{n}</p>
                    <p className="text-[#6B7280] text-xs font-body mt-0.5">{l}</p>
                  </div>
                ))}
              </motion.div>

              <motion.div variants={fadeUp}>
                <Link href="/casos-de-sucesso"
                  className="inline-flex items-center gap-2 bg-[#1B84FE] text-black font-semibold rounded-[10px] px-7 py-3.5 hover:bg-[#1D67CD] transition-colors text-sm shadow-sm group"
                >
                  Ver Casos de Sucesso
                  <ArrowRight strokeWidth={1.5} className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          6. MISSÃO & VISÃO
      ══════════════════════════════════════════════════════════ */}
      <section className="bg-white py-24 px-6">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.45 }}
            className="text-center mb-16"
          >
            <p className="text-[#F0A500] font-heading font-semibold text-xs uppercase tracking-widest mb-3">— Propósito</p>
            <h2 className="font-heading font-bold text-black" style={{ fontSize: '33px' }}>O que nos move</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                iconPath: 'M13 10V3L4 14h7v7l9-11h-7z',
                title: 'Missão',
                color: '#1B84FE',
                paragraphs: [
                  'Fornecer soluções de alta qualidade em transformadores elétricos, comprometendo-nos com a inovação, a sustentabilidade e a excelência no atendimento ao cliente.',
                  'Garantir a eficiência e a segurança das redes elétricas, contribuindo para um futuro energético mais sustentável. Valorizamos a integridade, a ética e o trabalho em equipe.',
                ],
              },
              {
                iconPath: 'M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0-6 0',
                title: 'Visão',
                color: '#1D67CD',
                paragraphs: [
                  'Ser reconhecida como líder no setor de transformadores elétricos, destacando-nos pela tecnologia de ponta e pela qualidade superior de nossos produtos.',
                  'Almejamos ser uma referência em soluções sustentáveis, formando parcerias estratégicas que nos permitam antecipar tendências e superar as expectativas dos clientes.',
                ],
              },
            ].map(({ iconPath, title, color, paragraphs }) => (
              <motion.div key={title}
                initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.5 }}
                className="relative bg-white border border-[#E2E8F0] rounded-2xl p-8 shadow-sm hover:shadow-lg hover:border-[#1B84FE]/30 transition-all overflow-hidden group"
              >
                {/* Linha de acento lateral */}
                <div className="absolute left-0 top-6 bottom-6 w-1 rounded-r-full transition-all duration-300 group-hover:top-4 group-hover:bottom-4"
                  style={{ backgroundColor: color }} />
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 ml-3"
                  style={{ backgroundColor: color + '15' }}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.75"
                    strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"
                  >
                    <path d={iconPath}/>
                  </svg>
                </div>
                <h3 className="font-heading font-bold text-black mb-4 ml-3" style={{ fontSize: '20px' }}>{title}</h3>
                {paragraphs.map((p, i) => (
                  <p key={i} className="text-[#4B5563] leading-relaxed mb-3 last:mb-0 ml-3 font-body" style={{ fontSize: '15px' }}>{p}</p>
                ))}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          7. VALORES
      ══════════════════════════════════════════════════════════ */}
      <section className="bg-[#F1F5F9] py-24 px-6">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.45 }}
            className="text-center mb-16"
          >
            <p className="text-[#F0A500] font-heading font-semibold text-xs uppercase tracking-widest mb-3">— Cultura</p>
            <h2 className="font-heading font-bold text-black mb-4" style={{ fontSize: '33px' }}>Nossos Valores</h2>
            <p className="text-[#4B5563] max-w-xl mx-auto font-body" style={{ fontSize: '15.5px' }}>
              Os princípios que guiam cada projeto, cada entrega e cada relação com nossos clientes e parceiros.
            </p>
          </motion.div>

          <motion.div
            variants={stagger} initial="hidden" whileInView="show"
            viewport={{ once: true, margin: '-40px' }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {VALORES.map(({ icon: Icon, label }) => (
              <motion.div key={label} variants={fadeUp}
                className="flex items-center gap-4 bg-white border border-[#E2E8F0] rounded-xl px-5 py-4 shadow-sm hover:border-[#1B84FE]/40 hover:shadow-md transition-all group cursor-default"
              >
                <div className="w-10 h-10 bg-[#EBF3FF] rounded-lg flex items-center justify-center shrink-0 group-hover:bg-[#1B84FE] transition-colors">
                  <Icon strokeWidth={1.5} className="w-5 h-5 text-[#1B84FE] group-hover:text-white transition-colors" />
                </div>
                <span className="font-heading font-semibold text-black leading-snug" style={{ fontSize: '14px' }}>
                  {label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          8. CERTIFICAÇÕES — selos SVG ilustrativos
      ══════════════════════════════════════════════════════════ */}
      <section className="bg-white py-24 px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Selos com SVG ilustrativo */}
            <motion.div
              initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5 }}
              className="flex flex-col gap-5"
            >
              {[
                { badge: 'ISO', sub: '9001', title: 'ISO 9001:2015', desc: 'Seguimos rigorosos padrões de qualidade em nossos processos e produtos.', color: '#1B84FE' },
                { badge: 'ABNT', sub: 'NBR', title: 'ABNT NBR Conformidade', desc: 'Todos os transformadores são fabricados em conformidade com as normas técnicas brasileiras.', color: '#1D67CD' },
              ].map(({ badge, sub, title, desc, color }) => (
                <div key={badge}
                  className="flex items-center gap-6 bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl p-5 hover:border-[#1B84FE]/30 hover:shadow-md transition-all group"
                >
                  <CertBadge text={badge} sub={sub} color={color} />
                  <div>
                    <h4 className="font-heading font-bold text-black mb-1" style={{ fontSize: '17px' }}>{title}</h4>
                    <p className="text-[#4B5563] text-sm font-body leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Texto */}
            <motion.div
              variants={stagger} initial="hidden" whileInView="show"
              viewport={{ once: true, margin: '-60px' }}
            >
              <motion.p variants={fadeUp}
                className="text-[#F0A500] font-heading font-semibold text-xs uppercase tracking-widest mb-3"
              >— Qualidade Certificada</motion.p>
              <motion.h2 variants={fadeUp}
                className="font-heading font-bold text-black leading-tight mb-6" style={{ fontSize: '33px' }}
              >
                Somos certificados<br />
                <span className="text-[#1B84FE]">ISO 9001:2015</span>
              </motion.h2>
              <motion.p variants={fadeUp}
                className="text-[#4B5563] leading-relaxed mb-4 font-body" style={{ fontSize: '15.5px' }}
              >
                Quando você escolhe nossos transformadores, pode ter certeza de que
                está adquirindo um produto de alta qualidade, fabricado com os mais
                altos graus de excelência e rastreabilidade.
              </motion.p>
              <motion.p variants={fadeUp}
                className="text-[#4B5563] leading-relaxed mb-8 font-body" style={{ fontSize: '15.5px' }}
              >
                Desenvolvemos Autotransformadores trifásicos e monofásicos, além de
                toda a linha de Transformadores Isoladores de Comando — sempre em
                conformidade técnica e normas ABNT.
              </motion.p>
              <motion.div variants={fadeUp}>
                <Link href="/diagnostico"
                  className="inline-flex items-center gap-2 bg-[#1B84FE] text-black font-semibold rounded-[10px] px-7 py-3.5 hover:bg-[#1D67CD] transition-colors text-sm shadow-sm group"
                >
                  Quero um Orçamento
                  <ArrowRight strokeWidth={1.5} className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          9. CTA FINAL — fundo escuro com foto
      ══════════════════════════════════════════════════════════ */}
      <section className="relative bg-[#0A1628] py-24 px-6 overflow-hidden">
        <div className="absolute inset-0">
          <img src="/hero-carousel/3.png" alt="" className="w-full h-full object-cover opacity-15" style={{ objectPosition: 'center center' }} />
          <div className="absolute inset-0 bg-[#0A1628]/90" />
        </div>
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-[#F0A500]/12 border border-[#F0A500]/35 rounded-2xl mb-8">
              <IconTransformerCoil className="w-8 h-8 text-[#F0A500]" />
            </div>
            <h2 className="font-heading font-bold text-white mb-4" style={{ fontSize: '33px' }}>
              <span className="text-[#F0A500]">Preencha o formulário</span><br />
              e faça um orçamento agora mesmo
            </h2>
            <p className="text-white/55 mb-10 max-w-xl mx-auto font-body" style={{ fontSize: '16px' }}>
              Nossa equipe de engenharia responde em até 24 horas úteis com proposta técnica detalhada.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/diagnostico"
                className="inline-flex items-center justify-center gap-2 bg-[#1B84FE] text-black font-semibold rounded-[10px] px-10 py-4 hover:bg-[#1D67CD] transition-colors shadow-xl text-sm group"
              >
                Iniciar Diagnóstico de Carga
                <ArrowRight strokeWidth={1.5} className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link href="/catalogo"
                className="inline-flex items-center justify-center gap-2 border border-white/20 text-white font-semibold rounded-[10px] px-10 py-4 hover:border-[#1B84FE]/60 hover:bg-[#1B84FE]/10 transition-all text-sm"
              >
                Ver Catálogo
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  )
}
