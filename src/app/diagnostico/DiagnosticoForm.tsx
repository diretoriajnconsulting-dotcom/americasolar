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
} from 'lucide-react'
import Link from 'next/link'
import { submitDiagnostic } from '../actions'
import { Button } from '@/components/ui/Button'

// ─── Tipos ────────────────────────────────────────────────────────────────────
interface DiagnosticoFormProps {
  productId?: string
  productName?: string | null
}

// ─── Helper: classe base para os inputs ──────────────────────────────────────
const inputClass =
  'w-full px-4 py-3 bg-surface-lowest/50 border border-white/10 rounded-xl text-sm text-text-body ' +
  'focus:ring-2 focus:ring-primary-base focus:border-transparent ' +
  'outline-none transition-all placeholder:text-text-muted/60'

const labelClass = 'block text-sm font-medium text-text-muted mb-1.5'

// ─── Componente: Campo com ícone ──────────────────────────────────────────────
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
          <span className="text-slate-400 font-normal ml-1">(Opcional)</span>
        )}
      </label>
      <div className="relative">
        <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
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

// ─── Componente: Select com ícone ─────────────────────────────────────────────
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
      <label htmlFor={id} className={labelClass}>
        {label}
      </label>
      <div className="relative">
        <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none z-10" />
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
  const [isSuccess, setIsSuccess] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSubmitting(true)
    setErrorMsg(null)

    const formData = new FormData(event.currentTarget)

    // Injetar campos de produto se vieram da URL
    if (productId) formData.set('product_id', productId)
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
        {/* Breadcrumb */}
        <Link
          href="/catalogo"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-text-muted/60 hover:text-primary-base
                     transition-colors mb-8 group tracking-wide lowercase"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          voltar ao catálogo
        </Link>

        <div className="glass-panel rounded-2xl shadow-2xl border border-white/10 overflow-hidden relative">
          {/* Subtle glow effect behind form */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary-base/5 rounded-full blur-[100px] pointer-events-none" />
          <AnimatePresence mode="wait">
            {!isSuccess ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="relative z-10"
              >
                {/* Header do formulário */}
                <div className="bg-surface-elevated/80 border-b border-white/5 px-8 py-7 backdrop-blur-sm">
                  <div className="flex items-center gap-4 mb-2">
                    <div className="w-10 h-10 bg-surface-lowest/80 border border-white/10 shadow-inner rounded-xl flex items-center justify-center">
                      <Zap className="w-5 h-5 text-primary-base drop-shadow-[0_0_8px_rgba(238,194,0,0.6)]" />
                    </div>
                    <h1 className="text-2xl font-display font-bold text-text-body tracking-tight">
                      Diagnóstico de Carga
                    </h1>
                  </div>
                  <p className="text-text-muted text-sm leading-relaxed mt-3">
                    Preencha os dados técnicos da sua demanda. Nossa equipe de
                    engenharia elaborará a proposta ideal para o seu projeto.
                  </p>
                </div>

                {/* Corpo do formulário */}
                <form onSubmit={handleSubmit} className="px-8 py-8 space-y-8">
                  {/* Campo de produto de interesse (somente leitura) */}
                  {productName && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-3 bg-surface-elevated/50 border border-white/10
                                 rounded-xl px-4 py-3 shadow-inner"
                    >
                      <Package className="w-4 h-4 text-primary-base shrink-0 drop-shadow-[0_0_5px_rgba(238,194,0,0.5)]" />
                      <div>
                        <p className="text-[11px] text-text-muted font-display uppercase tracking-widest mb-0.5">
                          Produto de Interesse
                        </p>
                        <p className="text-sm font-semibold text-text-body">
                          {productName}
                        </p>
                      </div>
                    </motion.div>
                  )}

                  {/* ── Seção: Dados de Contato ─────────────────────────── */}
                  <div>
                    <h3 className="text-[11px] font-display font-semibold tracking-widest text-primary-base uppercase mb-5 flex items-center gap-2">
                      <span className="w-4 h-px bg-primary-base/30"></span>
                      Dados de Contato
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <InputField
                        id="name"
                        name="name"
                        label="Nome Completo"
                        icon={User}
                        placeholder="Seu nome completo"
                        required
                      />
                      <InputField
                        id="company"
                        name="company"
                        label="Empresa"
                        icon={Building2}
                        placeholder="Nome da empresa"
                        optional
                      />
                      <InputField
                        id="email"
                        name="email"
                        label="E-mail Corporativo"
                        icon={Mail}
                        type="email"
                        placeholder="seu@email.com.br"
                        required
                      />
                      <InputField
                        id="whatsapp"
                        name="whatsapp"
                        label="WhatsApp"
                        icon={MessageCircle}
                        type="tel"
                        placeholder="(83) 9 0000-0000"
                        required
                      />
                    </div>
                  </div>

                  {/* Divisor */}
                  <div className="border-t border-white/5" />

                  {/* ── Seção: Especificações Técnicas ──────────────────── */}
                  <div>
                    <h3 className="text-[11px] font-display font-semibold tracking-widest text-primary-base uppercase mb-5 flex items-center gap-2">
                      <span className="w-4 h-px bg-primary-base/30"></span>
                      Especificações Técnicas
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <InputField
                        id="demand_kva"
                        name="demand_kva"
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
                        <option className="bg-surface-dim text-white" value="">Selecione o estágio...</option>
                        <option className="bg-surface-dim text-white" value="Planejamento">Planejamento / Estudo</option>
                        <option className="bg-surface-dim text-white" value="Execução">Execução da Obra</option>
                        <option className="bg-surface-dim text-white" value="Planta Pronta">Planta Pronta / Instalação</option>
                        <option className="bg-surface-dim text-white" value="Emergencial">Emergencial / Retrofit</option>
                      </SelectField>

                      <div className="md:col-span-2">
                        <SelectField
                          id="segment"
                          label="Segmento de Atuação"
                          icon={Briefcase}
                          required
                        >
                          <option className="bg-surface-dim text-white" value="">Selecione o segmento...</option>
                          <option className="bg-surface-dim text-white" value="Indústria">Indústria</option>
                          <option className="bg-surface-dim text-white" value="Shopping Center">Shopping Center</option>
                          <option className="bg-surface-dim text-white" value="Energia Renovável">
                            Energia Renovável (Solar / Eólica)
                          </option>
                          <option className="bg-surface-dim text-white" value="Construção Civil">Construção Civil</option>
                          <option className="bg-surface-dim text-white" value="Data Center">Data Center / TI</option>
                          <option className="bg-surface-dim text-white" value="Agronegócio">Agronegócio</option>
                          <option className="bg-surface-dim text-white" value="Mineração">Mineração</option>
                          <option className="bg-surface-dim text-white" value="Concessionária">
                            Concessionária de Energia
                          </option>
                          <option className="bg-surface-dim text-white" value="Outros">Outros</option>
                        </SelectField>
                      </div>
                    </div>
                  </div>

                  {/* ── Erro de validação ───────────────────────────────── */}
                  <AnimatePresence>
                    {errorMsg && (
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="flex items-start gap-2 bg-red-900/20 border border-red-500/30
                                   text-red-400 text-sm rounded-xl px-4 py-3"
                      >
                        <span className="shrink-0 mt-0.5">⚠</span>
                        <span>{errorMsg}</span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* ── Botão de submissão ──────────────────────────────── */}
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 text-base flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <svg
                          className="animate-spin w-4 h-4"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <circle
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="3"
                            className="opacity-25"
                          />
                          <path
                            d="M4 12a8 8 0 018-8"
                            stroke="currentColor"
                            strokeWidth="3"
                            strokeLinecap="round"
                          />
                        </svg>
                        Enviando Diagnóstico...
                      </span>
                    ) : (
                      <>
                        <Zap className="w-5 h-5" />
                        Solicitar Orçamento Técnico
                      </>
                    )}
                  </Button>

                  <p className="text-center text-xs text-text-muted/60 mt-6 pt-6 border-t border-white/5">
                    Seus dados são protegidos e usados exclusivamente para elaboração
                    da proposta técnica.
                  </p>
                </form>
              </motion.div>
            ) : (
              /* ── Card de Sucesso ──────────────────────────────────────── */
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.96, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
                className="px-8 py-16 flex flex-col items-center text-center relative z-10"
              >
                <div className="absolute inset-0 bg-emerald-900/10 pointer-events-none" />
                
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                  className="w-20 h-20 bg-emerald-900/30 border border-emerald-500/30 shadow-[0_0_30px_rgba(16,185,129,0.2)] rounded-2xl flex items-center justify-center
                             mb-6 text-emerald-400"
                >
                  <CheckCircle2 className="w-10 h-10 drop-shadow-[0_0_10px_rgba(16,185,129,0.4)]" />
                </motion.div>

                <h2 className="text-3xl font-display font-bold text-text-body mb-3">
                  Diagnóstico Recebido!
                </h2>

                <p className="text-text-muted max-w-md leading-relaxed mb-8">
                  Sua demanda foi registrada com sucesso. Nossa{' '}
                  <strong className="text-text-body font-semibold">equipe de engenharia</strong> analisará as especificações
                  técnicas e entrará em contato pelo WhatsApp ou e-mail em breve.
                </p>

                {productName && (
                  <div className="flex items-center justify-center gap-2 bg-surface-elevated/50 border border-white/10 rounded-xl
                                  px-5 py-3 mb-8 text-sm text-text-body shadow-inner max-w-sm w-full">
                    <Package className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className="truncate">
                      Produto de interesse: <strong className="font-semibold">{productName}</strong>
                    </span>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-2">
                  <Link
                    href="/"
                    className="px-6 py-3 bg-surface-elevated border border-white/10 text-text-body rounded-xl
                               text-sm font-semibold hover:bg-surface-elevated/80 transition-all text-center uppercase tracking-wide font-display w-full sm:w-auto"
                  >
                    Ir para o Início
                  </Link>
                  <Link
                    href="/catalogo"
                    className="px-6 py-3 bg-primary-base text-surface-lowest rounded-xl shadow-[0_0_15px_rgba(238,194,0,0.2)] hover:shadow-[0_0_25px_rgba(238,194,0,0.4)] hover:-translate-y-0.5
                               text-sm font-semibold transition-all text-center uppercase tracking-wide font-display w-full sm:w-auto"
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
