'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  Shield, Zap, CheckCircle, Award,
  Flame, Target, Rocket,
  Smile, Users, TrendingUp, Leaf,
  Eye, BookOpen,
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

// ─── Dados ────────────────────────────────────────────────────────────────────
const FEATURES = [
  {
    icon: Zap,
    title: 'Prática, Simples e Rápida',
    desc:  'Soluções de fornecimento de energia para painéis, contatos, relés, motores e condicionadores de ar — mais simples e eficientes.',
  },
  {
    icon: CheckCircle,
    title: 'Eficiência e Durabilidade',
    desc:  'Proporcionamos a melhor experiência ao seu processo industrial com equipamentos de última linha e longa vida útil.',
  },
  {
    icon: Shield,
    title: 'Maior Segurança',
    desc:  'Isolação galvânica entre primário e secundário para oferecer máxima segurança ao circuito e ao operador.',
  },
  {
    icon: TrendingUp,
    title: 'Acelere o Processo Industrial',
    desc:  'Capacidade de desempenho projetada para otimizar todo o processo industrial, reduzindo o tempo e aumentando a produtividade.',
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
  { icon: Flame,       label: 'Motivação' },
  { icon: Target,      label: 'Comprometimento' },
  { icon: Rocket,      label: 'Empreendedorismo' },
  { icon: Shield,      label: 'Integridade' },
  { icon: Smile,       label: 'Bom Humor' },
  { icon: Users,       label: 'Valorização Humana' },
  { icon: Award,       label: 'Credibilidade' },
  { icon: TrendingUp,  label: 'Busca Contínua de Excelência' },
  { icon: Leaf,        label: 'Saúde, Segurança e Meio Ambiente' },
]

export default function Home() {
  return (
    <div className="overflow-x-hidden">

      {/* ══════════════════════════════════════════════════════════
          1. HERO — fundo escuro, headline bold, CTA azul
      ══════════════════════════════════════════════════════════ */}
      <section
        className="relative bg-[#0A1628] text-white overflow-hidden"
        style={{ minHeight: '88vh', display: 'flex', alignItems: 'center' }}
      >
        {/* Padrão de grade sutil */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(27,132,254,.6) 1px, transparent 1px), linear-gradient(90deg, rgba(27,132,254,.6) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
          }}
        />
        {/* Brilho azul */}
        <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] bg-[#1B84FE]/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative z-10 container mx-auto max-w-7xl px-6 py-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Texto */}
          <motion.div variants={stagger} initial="hidden" animate="show">
            <motion.span
              variants={fadeUp}
              className="inline-flex items-center gap-2 bg-[#1B84FE]/15 border border-[#1B84FE]/30 rounded-full px-4 py-1.5 text-xs font-semibold tracking-widest text-[#1B84FE] uppercase mb-6"
            >
              <Zap className="w-3 h-3" fill="currentColor" />
              Os melhores do Brasil
            </motion.span>

            <motion.h1
              variants={fadeUp}
              className="font-heading font-bold leading-tight mb-6"
              style={{ fontSize: '33px', fontFamily: 'var(--font-heading)' }}
            >
              <span className="text-white">Transformadores</span>{' '}
              <span
                className="text-[#1B84FE]"
                style={{ display: 'block', marginTop: '4px' }}
              >
                Elétricos de Alta<br />Performance
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-white/70 leading-relaxed mb-10 max-w-lg"
              style={{ fontSize: '17px', fontFamily: 'var(--font-body)' }}
            >
              Agilize todo o processo industrial tornando a alimentação elétrica
              dos seus equipamentos mais prática, simples, rápida e segura.
              Fabricação própria em João Pessoa – PB.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/diagnostico"
                className="inline-flex items-center justify-center gap-2 bg-[#1B84FE] text-black font-semibold rounded-[10px] px-8 py-3.5 hover:bg-[#1D67CD] transition-colors shadow-lg text-sm"
              >
                Quero um Orçamento
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/catalogo"
                className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-white/30 text-white font-semibold rounded-[10px] px-8 py-3.5 hover:border-[#1B84FE] hover:text-[#1B84FE] transition-all text-sm"
              >
                Ver Catálogo
              </Link>
            </motion.div>
          </motion.div>

          {/* Cards de produto */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
            className="hidden lg:grid grid-cols-2 gap-4"
          >
            {[
              { kva: '225 KVA',   tipo: 'Fotovoltaico',  cor: '#FBBF24' },
              { kva: '500 KVA',   tipo: 'A Seco',        cor: '#1B84FE' },
              { kva: '750 KVA',   tipo: 'A Óleo',        cor: '#34D399' },
              { kva: 'Custom',    tipo: 'Sob Demanda',   cor: '#A78BFA' },
            ].map((item) => (
              <div
                key={item.kva}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/8 hover:border-[#1B84FE]/40 transition-all group"
              >
                <Zap className="w-5 h-5 mb-3 transition-all" style={{ color: item.cor }} fill="currentColor" />
                <p className="text-xl font-heading font-bold text-white">{item.kva}</p>
                <p className="text-xs text-white/50 mt-1 font-body uppercase tracking-wider">{item.tipo}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Seta de scroll */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] text-white/30 tracking-widest uppercase font-body">scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
            className="w-px h-8 bg-gradient-to-b from-[#1B84FE]/50 to-transparent rounded-full"
          />
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          2. FEATURES — fundo branco, 4 diferenciais c/ ícone
      ══════════════════════════════════════════════════════════ */}
      <section className="bg-white py-24 px-6">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {FEATURES.map(({ icon: Icon, title, desc }) => (
              <motion.div key={title} variants={fadeUp} className="flex flex-col gap-4">
                <div className="w-12 h-12 bg-[#EBF3FF] rounded-xl flex items-center justify-center shrink-0">
                  <Icon className="w-6 h-6 text-[#1B84FE]" />
                </div>
                <h3
                  className="font-heading font-bold text-black leading-snug"
                  style={{ fontSize: '16px', fontFamily: 'var(--font-heading)' }}
                >
                  {title}
                </h3>
                <p
                  className="text-[#4B5563] leading-relaxed"
                  style={{ fontSize: '14px', fontFamily: 'var(--font-body)' }}
                >
                  {desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          3. BANDA AZUL — linha de produtos
      ══════════════════════════════════════════════════════════ */}
      <section className="bg-[#1B84FE] py-20 px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2
                className="font-heading font-bold text-black leading-tight mb-4"
                style={{ fontSize: '33px', fontFamily: 'var(--font-heading)' }}
              >
                Linha Completa de<br />Transformadores
              </h2>
              <p
                className="text-black/70 leading-relaxed mb-8"
                style={{ fontSize: '16px', fontFamily: 'var(--font-body)' }}
              >
                Os transformadores Solar América são utilizados em instalações
                elétricas, circuitos industriais e diversas outras aplicações
                — com ou sem necessidade de isolação elétrica.
              </p>
              <Link
                href="/catalogo"
                className="inline-flex items-center gap-2 bg-black text-white font-semibold rounded-[10px] px-7 py-3.5 hover:bg-[#0A1628] transition-colors text-sm"
              >
                Ver Catálogo Completo
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>

            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid grid-cols-1 gap-3"
            >
              {TIPOS.map(({ label, kva }) => (
                <motion.div
                  key={label}
                  variants={fadeUp}
                  className="flex items-center justify-between bg-white/15 border border-white/20 rounded-xl px-5 py-4 hover:bg-white/25 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Zap className="w-4 h-4 text-black/80" fill="currentColor" />
                    <span className="font-heading font-semibold text-black text-sm">{label}</span>
                  </div>
                  <span className="text-black/60 text-xs font-body">{kva}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          4. QUEM SOMOS — fundo cinza claro, split layout
      ══════════════════════════════════════════════════════════ */}
      <section className="bg-[#F1F5F9] py-24 px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Stats / visual */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
              className="grid grid-cols-2 gap-6"
            >
              {[
                { num: '+15',   label: 'Anos no Mercado',       sub: 'de experiência sólida' },
                { num: '100%',  label: 'Nacional',               sub: 'fabricação própria' },
                { num: 'ISO',   label: '9001:2015',              sub: 'certificação de qualidade' },
                { num: 'ABNT',  label: 'NBR Conformidade',       sub: 'normas técnicas brasileiras' },
              ].map(({ num, label, sub }) => (
                <div key={label} className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-sm">
                  <p
                    className="font-heading font-extrabold text-[#1B84FE] leading-none mb-1"
                    style={{ fontSize: '32px', fontFamily: 'var(--font-heading)' }}
                  >
                    {num}
                  </p>
                  <p className="text-black font-heading font-semibold text-sm">{label}</p>
                  <p className="text-[#9CA3AF] text-xs font-body mt-0.5">{sub}</p>
                </div>
              ))}
            </motion.div>

            {/* Texto */}
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-60px' }}
            >
              <motion.p
                variants={fadeUp}
                className="text-[#1B84FE] font-heading font-semibold text-xs uppercase tracking-widest mb-3"
              >
                — Quem Somos
              </motion.p>
              <motion.h2
                variants={fadeUp}
                className="font-heading font-bold text-black leading-tight mb-6"
                style={{ fontSize: '33px', fontFamily: 'var(--font-heading)' }}
              >
                Especialistas em<br />transformadores elétricos
              </motion.h2>
              <motion.p
                variants={fadeUp}
                className="text-[#4B5563] leading-relaxed mb-4"
                style={{ fontSize: '16px', fontFamily: 'var(--font-body)' }}
              >
                Somos uma empresa especializada na produção, venda e manutenção de
                transformadores a seco e a óleo, em constante busca pela excelência
                junto aos nossos fornecedores e clientes.
              </motion.p>
              <motion.p
                variants={fadeUp}
                className="text-[#4B5563] leading-relaxed mb-8"
                style={{ fontSize: '16px', fontFamily: 'var(--font-body)' }}
              >
                A Solar América projeta, fabrica e fornece transformadores para uma
                ampla faixa do mercado, integrando sistemas de qualidade e política
                ambiental em conformidade com as normas legais pertinentes.
              </motion.p>
              <motion.div variants={fadeUp}>
                <Link
                  href="/casos-de-sucesso"
                  className="inline-flex items-center gap-2 bg-[#1B84FE] text-black font-semibold rounded-[10px] px-7 py-3.5 hover:bg-[#1D67CD] transition-colors text-sm shadow-sm"
                >
                  Ver Casos de Sucesso
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          5. MISSÃO & VISÃO — fundo branco
      ══════════════════════════════════════════════════════════ */}
      <section className="bg-white py-24 px-6">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="text-center mb-16"
          >
            <p className="text-[#1B84FE] font-heading font-semibold text-xs uppercase tracking-widest mb-3">— Propósito</p>
            <h2
              className="font-heading font-bold text-black"
              style={{ fontSize: '33px', fontFamily: 'var(--font-heading)' }}
            >
              O que nos move
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                icon: Rocket,
                title: 'Missão',
                color: '#1B84FE',
                paragraphs: [
                  'Fornecer soluções de alta qualidade em transformadores elétricos, comprometendo-nos com a inovação, a sustentabilidade e a excelência no atendimento ao cliente.',
                  'Garantir a eficiência e a segurança das redes elétricas, contribuindo para um futuro energético mais sustentável. Valorizamos a integridade, a ética e o trabalho em equipe.',
                ],
              },
              {
                icon: Eye,
                title: 'Visão',
                color: '#1D67CD',
                paragraphs: [
                  'Ser reconhecida como líder no setor de transformadores elétricos, destacando-nos pela tecnologia de ponta e pela qualidade superior de nossos produtos.',
                  'Almejamos ser uma referência em soluções sustentáveis, formando parcerias estratégicas que nos permitam antecipar tendências e superar as expectativas dos clientes.',
                ],
              },
            ].map(({ icon: Icon, title, color, paragraphs }) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5 }}
                className="bg-white border border-[#E2E8F0] rounded-2xl p-8 shadow-sm hover:shadow-md hover:border-[#1B84FE]/30 transition-all"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
                  style={{ backgroundColor: color + '15' }}
                >
                  <Icon className="w-6 h-6" style={{ color }} />
                </div>
                <h3
                  className="font-heading font-bold text-black mb-4"
                  style={{ fontSize: '20px', fontFamily: 'var(--font-heading)' }}
                >
                  {title}
                </h3>
                {paragraphs.map((p, i) => (
                  <p
                    key={i}
                    className="text-[#4B5563] leading-relaxed mb-3 last:mb-0"
                    style={{ fontSize: '15px', fontFamily: 'var(--font-body)' }}
                  >
                    {p}
                  </p>
                ))}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          6. VALORES — cinza claro, 9 pills
      ══════════════════════════════════════════════════════════ */}
      <section className="bg-[#F1F5F9] py-24 px-6">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="text-center mb-16"
          >
            <p className="text-[#1B84FE] font-heading font-semibold text-xs uppercase tracking-widest mb-3">— Cultura</p>
            <h2
              className="font-heading font-bold text-black mb-4"
              style={{ fontSize: '33px', fontFamily: 'var(--font-heading)' }}
            >
              Nossos Valores
            </h2>
            <p
              className="text-[#4B5563] max-w-xl mx-auto"
              style={{ fontSize: '16px', fontFamily: 'var(--font-body)' }}
            >
              Os princípios que guiam cada projeto, cada entrega e cada relação
              com nossos clientes e parceiros.
            </p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-40px' }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {VALORES.map(({ icon: Icon, label }) => (
              <motion.div
                key={label}
                variants={fadeUp}
                className="flex items-center gap-4 bg-white border border-[#E2E8F0] rounded-xl px-5 py-4 shadow-sm hover:border-[#1B84FE]/40 hover:shadow-md transition-all group"
              >
                <div className="w-10 h-10 bg-[#EBF3FF] rounded-lg flex items-center justify-center shrink-0 group-hover:bg-[#1B84FE] transition-colors">
                  <Icon className="w-5 h-5 text-[#1B84FE] group-hover:text-white transition-colors" />
                </div>
                <span
                  className="font-heading font-semibold text-black leading-snug"
                  style={{ fontSize: '14px', fontFamily: 'var(--font-heading)' }}
                >
                  {label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          7. CERTIFICAÇÕES — fundo branco, selos ISO + confiança
      ══════════════════════════════════════════════════════════ */}
      <section className="bg-white py-24 px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Selos */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-col gap-6"
            >
              {[
                {
                  badge: 'ISO',
                  title: 'ISO 9001:2015',
                  desc: 'Seguimos rigorosos padrões de qualidade em nossos processos e produtos.',
                  color: '#1B84FE',
                },
                {
                  badge: 'ABNT',
                  title: 'ABNT NBR Conformidade',
                  desc: 'Todos os transformadores são fabricados em conformidade com as normas técnicas brasileiras.',
                  color: '#1D67CD',
                },
              ].map(({ badge, title, desc, color }) => (
                <div
                  key={badge}
                  className="flex items-start gap-5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl p-6"
                >
                  <div
                    className="w-16 h-16 rounded-full border-4 flex items-center justify-center shrink-0 font-heading font-extrabold text-sm"
                    style={{ borderColor: color, color }}
                  >
                    {badge}
                  </div>
                  <div>
                    <h4
                      className="font-heading font-bold text-black mb-1"
                      style={{ fontSize: '18px' }}
                    >
                      {title}
                    </h4>
                    <p className="text-[#4B5563] text-sm font-body leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Texto */}
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-60px' }}
            >
              <motion.p
                variants={fadeUp}
                className="text-[#1B84FE] font-heading font-semibold text-xs uppercase tracking-widest mb-3"
              >
                — Qualidade Certificada
              </motion.p>
              <motion.h2
                variants={fadeUp}
                className="font-heading font-bold text-black leading-tight mb-6"
                style={{ fontSize: '33px', fontFamily: 'var(--font-heading)' }}
              >
                Somos certificados<br />
                <span className="text-[#1B84FE]">ISO 9001:2015</span>
              </motion.h2>
              <motion.p
                variants={fadeUp}
                className="text-[#4B5563] leading-relaxed mb-4"
                style={{ fontSize: '16px', fontFamily: 'var(--font-body)' }}
              >
                Quando você escolhe nossos transformadores, pode ter certeza de que
                está adquirindo um produto de alta qualidade, fabricado com os mais
                altos graus de excelência.
              </motion.p>
              <motion.p
                variants={fadeUp}
                className="text-[#4B5563] leading-relaxed mb-8"
                style={{ fontSize: '16px', fontFamily: 'var(--font-body)' }}
              >
                Desenvolvemos não somente Autotransformadores trifásicos, como também
                Monofásicos, além de toda a linha de Transformadores Isoladores de
                Comando — sempre com rastreabilidade e conformidade técnica.
              </motion.p>
              <motion.div variants={fadeUp}>
                <Link
                  href="/diagnostico"
                  className="inline-flex items-center gap-2 bg-[#1B84FE] text-black font-semibold rounded-[10px] px-7 py-3.5 hover:bg-[#1D67CD] transition-colors text-sm shadow-sm"
                >
                  Quero um Orçamento
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          8. CTA FINAL — fundo escuro, formulário rápido
      ══════════════════════════════════════════════════════════ */}
      <section className="bg-[#0A1628] py-24 px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center justify-center w-14 h-14 bg-[#1B84FE]/15 border border-[#1B84FE]/30 rounded-2xl mb-6">
              <BookOpen className="w-7 h-7 text-[#1B84FE]" />
            </div>
            <h2
              className="font-heading font-bold text-white mb-4"
              style={{ fontSize: '33px', fontFamily: 'var(--font-heading)' }}
            >
              <span className="text-[#1B84FE]">Preencha o formulário</span><br />
              e faça um orçamento agora mesmo
            </h2>
            <p
              className="text-white/60 mb-10 max-w-xl mx-auto"
              style={{ fontSize: '16px', fontFamily: 'var(--font-body)' }}
            >
              Nossa equipe de engenharia responde em até 24 horas úteis com
              proposta técnica detalhada.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/diagnostico"
                className="inline-flex items-center justify-center gap-2 bg-[#1B84FE] text-black font-semibold rounded-[10px] px-10 py-4 hover:bg-[#1D67CD] transition-colors shadow-lg text-sm"
              >
                Iniciar Diagnóstico de Carga
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/catalogo"
                className="inline-flex items-center justify-center gap-2 border-2 border-white/20 text-white font-semibold rounded-[10px] px-10 py-4 hover:border-[#1B84FE] hover:text-[#1B84FE] transition-all text-sm"
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
