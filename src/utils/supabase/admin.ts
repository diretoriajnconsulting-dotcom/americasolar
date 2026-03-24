/**
 * Cliente Supabase com permissão de service_role.
 *
 * ⚠️  IMPORTANTE:
 *   - Este cliente BYPASSA completamente o Row Level Security (RLS).
 *   - Use EXCLUSIVAMENTE em Server Actions e Route Handlers server-side.
 *   - NUNCA importe este arquivo em componentes 'use client'.
 *   - A variável SUPABASE_SERVICE_ROLE_KEY jamais deve estar em NEXT_PUBLIC_*.
 */
import { createClient as createSupabaseClient } from '@supabase/supabase-js'

export function createAdminClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error(
      '[Admin Client] Variáveis NEXT_PUBLIC_SUPABASE_URL ou SUPABASE_SERVICE_ROLE_KEY não estão definidas.'
    )
  }

  return createSupabaseClient(supabaseUrl, serviceRoleKey, {
    auth: {
      // Desabilita a persistência de sessão no cliente admin — não há usuário logado aqui
      autoRefreshToken: false,
      persistSession: false,
    },
  })
}
