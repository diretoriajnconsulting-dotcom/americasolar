import { createClient } from '@/utils/supabase/server'
import DiagnosticoForm from './DiagnosticoForm'

// Next.js 15+ recebe searchParams como Promise em Server Components
interface DiagnosticoPageProps {
  searchParams: Promise<{ produto?: string }>
}

export default async function DiagnosticoPage({ searchParams }: DiagnosticoPageProps) {
  const params = await searchParams
  const productId = params?.produto

  let productName: string | null = null

  // Se há um ID de produto na URL, buscamos o nome no Supabase server-side
  if (productId) {
    try {
      const supabase = await createClient()
      const { data } = await supabase
        .from('products')
        .select('name')
        .eq('id', productId)
        .single()

      productName = data?.name ?? null
    } catch {
      // Produto não encontrado — formulário abre sem produto pré-selecionado
      productName = null
    }
  }

  return (
    <DiagnosticoForm
      productId={productId}
      productName={productName}
    />
  )
}
