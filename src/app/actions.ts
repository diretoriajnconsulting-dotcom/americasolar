'use server'

/**
 * Server Actions — Solar América
 *
 * Todas as operações de escrita passam pelo createAdminClient()
 * que usa a SUPABASE_SERVICE_ROLE_KEY (privada, nunca exposta ao cliente).
 *
 * O fluxo de segurança é:
 *   Browser → Server Action (valida com Zod) → Admin Client (service_role, bypassa RLS) → Supabase
 *
 * Isso significa que a chave anon pública jamais é usada para escrita,
 * e nenhum cliente externo pode inserir dados diretamente no banco.
 */

import { createAdminClient } from '@/utils/supabase/admin'
import { z } from 'zod'

// ─── Schema de Validação ──────────────────────────────────────────────────────
const diagnosticSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres.'),
  company: z.string().optional(),
  email: z.string().email('Por favor, insira um e-mail válido.'),
  whatsapp: z.string().min(10, 'WhatsApp deve ter pelo menos 10 dígitos.'),
  demand_kva: z.string().min(1, 'Informe a demanda de energia em KVA.'),
  project_stage: z.string().min(1, 'Selecione o estágio do projeto.'),
  segment: z.string().min(2, 'Informe o segmento de atuação.'),
  product_id: z.string().optional(),
  product_name: z.string().optional(),
})

export type DiagnosticInput = z.infer<typeof diagnosticSchema>

// ─── Action: submitDiagnostic ─────────────────────────────────────────────────
export async function submitDiagnostic(formData: FormData) {
  try {
    // 1. Extrair dados brutos
    const rawData = {
      name: formData.get('name') as string,
      company: (formData.get('company') as string) || undefined,
      email: formData.get('email') as string,
      whatsapp: formData.get('whatsapp') as string,
      demand_kva: formData.get('demand_kva') as string,
      project_stage: formData.get('project_stage') as string,
      segment: formData.get('segment') as string,
      product_id: (formData.get('product_id') as string) || undefined,
      product_name: (formData.get('product_name') as string) || undefined,
    }

    // 2. Validar com Zod — primeiro firewall contra dados inválidos
    const validation = diagnosticSchema.safeParse(rawData)
    if (!validation.success) {
      const firstError = validation.error.issues[0]
      return { success: false, error: firstError.message }
    }

    const data = validation.data

    // 3. Admin client: service_role bypassa RLS, escrita 100% server-side
    const supabase = createAdminClient()

    // 4. Inserir cliente (customers)
    const { data: customerData, error: customerError } = await supabase
      .from('customers')
      .insert({
        company_name: data.company || data.name,
        contact_name: data.name,
        email: data.email,
        phone: data.whatsapp,
        cnpj: `PENDENTE-${Date.now()}`,
      })
      .select('id')
      .single()

    if (customerError) {
      console.error('[submitDiagnostic] Erro ao inserir customer:', customerError)
      return { success: false, error: 'Erro ao cadastrar cliente. Tente novamente.' }
    }

    // 5. Inserir order com diagnostic_details completo
    const { error: orderError } = await supabase.from('orders').insert({
      customer_id: customerData.id,
      status: 'pending_diagnostic',
      diagnostic_details: {
        demand_kva: data.demand_kva,
        project_stage: data.project_stage,
        segment: data.segment,
        whatsapp: data.whatsapp,
        product_id: data.product_id ?? null,
        product_name: data.product_name ?? null,
      },
    })

    if (orderError) {
      console.error('[submitDiagnostic] Erro ao inserir order:', orderError)
      return { success: false, error: 'Erro ao registrar solicitação. Tente novamente.' }
    }

    return { success: true }
  } catch (error) {
    console.error('[submitDiagnostic] Erro inesperado:', error)
    return { success: false, error: 'Erro interno do servidor.' }
  }
}
