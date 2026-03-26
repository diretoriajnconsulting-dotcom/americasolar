'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  CheckCircle2,
  Zap,
  User,
  Building2,
  Mail,
  MessageCircle,
  Activity,
  Layers,
  Briefcase,
  Package,
  ArrowLeft,
  Send,
} from 'lucide-react'
import Link from 'next/link'
import { submitDiagnostic } from '../actions'

// ─── Tipos ────────────────────────────────────────────────────────────────────
interface DiagnosticoFormProps {
  productId?: string
  productName?: string | null
}

// ─── Estilos base (design branco/azul) ───────────────────────────────────────
const inputClass =
  'w-full px-4 py-3 bg-white border border-[#E2E8F0] rounded-[12px] text-sm text-black ' +
  'focus:ring-2 focus:ring-[#1B84FE]/30 focus:border-[#1B84FE] ' +
  'outline-none transition-all placeholder:text-[#9CA3AF]'

const labelClass = 'block text-sm font-heading font-semibold text-black mb-1.5'

// ─── Campo com ícone ──────────────────────────────────────────────────────────
function InputField({
  id,
  label,
  icon: Icon,
  required = false,
  optional = false,
  ...props
}: {
  id: string
  label: string
  icon: React.ElementType
  required?: boolean
  optional?: boolean
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label htmlFor={id} className={labelClass}>
        {label}
        {optional && (
          <span className="text-[#9CA3AF] font-normal ml-1 text-xs">(Opcional)</span>
        )}
      </label>
      <div className="relative">
        <Icon strokeWidth={1.25} className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF] pointer-events-none" />
        <input
          id={id}
          className={`${inputClass} pl-10`}
          required={required}
          {...props}
        />
      </div>
    </div>
  )
}

// ─── Select com ícone ─────────────────────────────────────────────────────────
function SelectField({
  id,
  label,
  icon: Icon,
  children,
  required = false,
}: {
  id: string
  label: string
  icon: React.ElementType
  children: React.ReactNode
  required?: boolean
}) {
  return (
    <div>
      <label htmlFor={id} className={labelClass}>{label}</label>
      <div className="relative">
        <Icon strokeWidth={1.25} className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF] pointer-events-none z-10" />
        <select
          id={id}
          name={id}
          required={required}
          className={`${inputClass} pl-10 appearance-none cursor-pointer`}
        >
          {children}
        </select>
      </div>
    </div>
  )
}

// ─── Componente Principal ──────────────────────────────────────────────────────
export default function DiagnosticoForm({ productId, productName }: DiagnosticoFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess]       = useState(false)
  const [errorMsg, setErrorMsg]         = useState<string | null>(null)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSubmitting(true)
    setErrorMsg(null)

    const formData = new FormData(event.currentTarget)
    if (productId)   formData.set('product_id',   productId)
    if (productName) formData.set('product_name', productName)

    const result = await submitDiagnostic(formData)

    setIsSubmitting(false)
    if (result.success) {
      setIsSuccess(true)
    } else {
      setErrorMsg(result.error || 'Ocorreu um erro inesperado. Tente novamente.')
    }
  }

  return (
    <div className="min-h-[85vh] flex items-start md:items-center justify-center py-12 px-4">
      <div className="w-full max-w-2xl">

        {/* Voltar ao catálogo */}
        <Link
          href="/catalogo"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-[#4B5563] hover:text-[#1B84FE] transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          Voltar ao Catálogo
        </Link>

        <div className="bg-white border border-[#E2E8F0] rounded-2xl shadow-lg overflow-hidden">
          <AnimatePresence mode="wait">
            {!isSuccess ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              >
                {/* Cabeçalho do formulário */}
                <div className="bg-[#0A1628] px-8 py-7">
                  <div className="flex items-center gap-4 mb-2">
                    <div className="w-10 h-10 bg-[#1B84FE]/20 border border-[#1B84FE]/30 rounded-xl flex items-center justify-center">
                      <Zap strokeWidth={1.25} className="w-5 h-5 text-[#1B84FE]" />
                    </div>
                    <h1
                      className="font-heading font-bold text-white"
                      style={{ fontSize: '22px', fontFamily: 'var(--font-heading)' }}
                    >
                      Diagnóstico de Carga
                    </h1>
                  </div>
                  <p
                    className="text-white/60 leading-relaxed mt-3"
                    style={{ fontSize: '14px', fontFamily: 'var(--font-body)' }}
                  >
                    Preencha os dados técnicos da sua demanda. Nossa equipe de
                    engenharia elaborará a proposta ideal para o seu projeto.
                  </p>
                </div>

                {/* Corpo */}
                <form onSubmit={handleSubmit} className="px-8 py-8 space-y-8">

                  {/* Produto de interesse (somente leitura) */}
                  {productName && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-3 bg-[#EBF3FF] border border-[#1B84FE]/20 rounded-xl px-4 py-3"
                    >
                      <Package className="w-4 h-4 text-[#1B84FE] shrink-0" />
                      <div>
                        <p className="text-[11px] text-[#1B84FE] font-heading font-semibold uppercase tracking-widest mb-0.5">
                          Produto de Interesse
                        </p>
                        <p className="text-sm font-semibold text-black">{productName}</p>
                      </div>
                    </motion.div>
                  )}

                  {/* ── Dados de Contato ──────────────────────────────────── */}
                  <div>
                    <h3 className="text-[11px] font-heading font-semibold tracking-widest text-[#1B84FE] uppercase mb-5 flex items-center gap-2">
                      <span className="w-4 h-px bg-[#1B84FE]/30" />
                      Dados de Contato
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <InputField
                        id="name" name="name"
                        label="Nome Completo"
                        icon={User}
                        placeholder="Seu nome completo"
                        required
                      />
                      <InputField
                        id="company" name="company"
                        label="Empresa"
                        icon={Building2}
                        placeholder="Nome da empresa"
                        optional
                      />
                      <InputField
                        id="email" name="email"
                        label="E-mail"
                        icon={Mail}
                        type="email"
                        placeholder="seu@email.com.br"
                        required
                      />
                      <InputField
                        id="whatsapp" name="whatsapp"
                        label="WhatsApp"
                        icon={MessageCircle}
                        type="tel"
                        placeholder="(83) 9 0000-0000"
                        required
                      />
                    </div>
                  </div>

                  {/* Divisor */}
                  <div className="border-t border-[#E2E8F0]" />

                  {/* ── Especificações Técnicas ───────────────────────────── */}
                  <div>
                    <h3 className="text-[11px] font-heading font-semibold tracking-widest text-[#1B84FE] uppercase mb-5 flex items-center gap-2">
                      <span className="w-4 h-px bg-[#1B84FE]/30" />
                      Especificações Técnicas
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <InputField
                        id="demand_kva" name="demand_kva"
                        label="Demanda de Energia (KVA)"
                        icon={Activity}
                        placeholder="Ex: 500 KVA"
                        required
                      />

                      <SelectField
                        id="project_stage"
                        label="Estágio do Projeto"
                        icon={Layers}
                        required
                      >
                        <option value="">Selecione o estágio...</option>
                        <option value="Planejamento">Planejamento / Estudo</option>
                        <option value="Execução">Execução da Obra</option>
                        <option value="Planta Pronta">Planta Pronta / Instalação</option>
                        <option value="Emergencial">Emergencial / Retrofit</option>
                      </SelectField>

                      <div className="md:col-span-2">
                        <SelectField
                          id="segment"
                          label="Segmento de Atuação"
                          icon={Briefcase}
                          required
                        >
                          <option value="">Selecione o segmento...</option>
                          <option value="Indústria">Indústria</option>
                          <option value="Shopping Center">Shopping Center</option>
                          <option value="Energia Renovável">Energia Renovável (Solar / Eólica)</option>
                          <option value="Construção Civil">Construção Civil</option>
                          <option value="Data Center">Data Center / TI</option>
                          <option value="Agronegócio">Agronegócio</option>
                          <option value="Mineração">Mineração</option>
                          <option value="Concessionária">Concessionária de Energia</option>
                          <option value="Outros">Outros</option>
                        </SelectField>
                      </div>
                    </div>
                  </div>

                  {/* Erro de validação */}
                  <AnimatePresence>
                    {errorMsg && (
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="flex items-start gap-2 bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3"
                      >
                        <span className="shrink-0 mt-0.5">⚠</span>
                        <span>{errorMsg}</span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Botão Enviar */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 bg-[#1D67CD] text-black
                               font-heading font-semibold rounded-[10px] py-3.5 text-sm
                               hover:bg-[#1565B8] transition-all shadow-md hover:shadow-lg
                               disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" className="opacity-25" />
                          <path d="M4 12a8 8 0 018-8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                        </svg>
                        Enviando...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Enviar Diagnóstico
                      </>
                    )}
                  </button>

                  <p className="text-center text-xs text-[#9CA3AF] font-body mt-2">
                    Seus dados são protegidos e usados exclusivamente para elaboração da proposta técnica.
                  </p>
                </form>
              </motion.div>
            ) : (
              /* ── Card de Sucesso ────────────────────────────────────────── */
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="bg-[#F0FDF4] px-8 py-16 flex flex-col items-center text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.15, type: 'spring', stiffness: 220 }}
                  className="w-20 h-20 bg-[#DCFCE7] border-2 border-[#22C55E]/40 rounded-2xl flex items-center justify-center mb-6"
                >
                  <CheckCircle2 className="w-10 h-10 text-[#16A34A]" />
                </motion.div>

                <h2
                  className="font-heading font-bold text-black mb-3"
                  style={{ fontSize: '24px', fontFamily: 'var(--font-heading)' }}
                >
                  Diagnóstico Recebido!
                </h2>

                <p
                  className="text-[#4B5563] max-w-md leading-relaxed mb-8"
                  style={{ fontSize: '15px', fontFamily: 'var(--font-body)' }}
                >
                  Sua demanda foi registrada com sucesso. Nossa{' '}
                  <strong className="text-black font-semibold">equipe de engenharia</strong>{' '}
                  analisará as especificações técnicas e entrará em contato pelo
                  WhatsApp ou e-mail em até 24 horas úteis.
                </p>

                {productName && (
                  <div className="flex items-center gap-2 bg-white border border-[#E2E8F0] rounded-xl px-5 py-3 mb-8 text-sm max-w-sm w-full shadow-sm">
                    <Package className="w-4 h-4 text-[#22C55E] shrink-0" />
                    <span className="truncate text-[#4B5563]">
                      Produto de interesse:{' '}
                      <strong className="text-black font-semibold">{productName}</strong>
                    </span>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                  <Link
                    href="/"
                    className="px-6 py-3 bg-white border border-[#E2E8F0] text-black rounded-[10px] text-sm font-semibold hover:border-[#1B84FE] transition-all text-center shadow-sm"
                  >
                    Ir para o Início
                  </Link>
                  <Link
                    href="/catalogo"
                    className="px-6 py-3 bg-[#1B84FE] text-black rounded-[10px] text-sm font-semibold hover:bg-[#1D67CD] transition-all text-center shadow-sm"
                  >
                    Ver Catálogo
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
