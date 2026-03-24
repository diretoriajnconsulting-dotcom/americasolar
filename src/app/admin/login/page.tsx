'use client'

import { login } from './actions'
import { Button } from '@/components/ui/Button'
import { Zap } from 'lucide-react'

// Adaptação simples caso useActionState não esteja disponível ou se prefere uma abordagem de form clássica
import { useState } from 'react'

export default function LoginPage() {
  const [errorMsg, setErrorMsg] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setErrorMsg('')
    const formData = new FormData(e.currentTarget)
    
    // Server action com next/navigation redirect acionará o throw se sucesso (não chega no final do bloco se for redirecionado)
    // Se der erro de credencial ele retorna um obj com .error
    try {
      const res = await login(formData)
      if (res?.error) setErrorMsg(res.error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 bg-white p-10 rounded-2xl shadow-xl border border-slate-100">
        <div className="flex flex-col items-center text-center">
          <Zap className="h-12 w-12 text-solar-yellow mb-4" />
          <h2 className="text-3xl font-bold tracking-tight text-solar-blue">
            Portal Administrativo
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Acesso restrito à equipe da Solar América.
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4 rounded-md shadow-sm">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">E-mail Corporativo</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="seu.email@empresa.com"
                title="E-mail Corporativo"
                required
                className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-solar-yellow outline-none"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-1">Senha</label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Sua senha"
                title="Senha"
                required
                className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-solar-yellow outline-none"
              />
            </div>
          </div>

          {errorMsg && (
            <div className="text-red-600 text-sm font-medium text-center">
              {errorMsg}
            </div>
          )}

          <Button type="submit" disabled={loading} className="w-full py-3">
            {loading ? 'Autenticando...' : 'Entrar no Sistema'}
          </Button>
        </form>
      </div>
    </div>
  )
}
