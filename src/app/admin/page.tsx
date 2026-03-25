import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { logout } from './actions'
import { LogOut, LayoutDashboard, Package, FileText, Activity } from 'lucide-react'
import ScrapeTriggerButton from '@/components/ui/ScrapeTriggerButton'

export default async function AdminDashboard() {
  const supabase = await createClient()

  // 1. Verificação de Autenticação Server-Side
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) {
    redirect('/admin/login')
  }

  // 2. Fetch dos dados (Ressalva: Supabase RLS permite SELECT para auth)
  // JOIN: orders -> customers
  const { data: orders, error: ordersError } = await supabase
    .from('orders')
    .select('*, customer:customers(*)')
    .order('created_at', { ascending: false })

  const { data: products, error: productsError } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      {/* Sidebar / Header Simplificado */}
      <nav className="bg-[#1B84FE] text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2">
              <Activity className="h-6 w-6 text-[#FBBF24]" />
              <span className="font-bold text-lg tracking-tight">Solar Admin</span>
            </div>
            
            <div className="flex items-center gap-4">
              <span className="text-sm text-slate-300 hidden sm:block">
                Olá, {user.email}
              </span>
              <form action={logout}>
                <button 
                  type="submit" 
                  className="flex items-center gap-2 text-sm bg-white/10 hover:bg-white/20 transition-colors px-3 py-1.5 rounded-md"
                >
                  <LogOut className="w-4 h-4" />
                  Sair
                </button>
              </form>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        
        {/* Orçamentos Solicitados / Dash */}
        <section>
          <div className="flex items-center gap-2 mb-6">
            <FileText className="w-6 h-6 text-[#1B84FE]" />
            <h2 className="text-2xl font-semibold text-[#1B84FE]">Orçamentos & Pedidos</h2>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-slate-50 text-slate-600 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-4 font-medium">Data</th>
                    <th className="px-6 py-4 font-medium">Cliente / Empresa</th>
                    <th className="px-6 py-4 font-medium">Demanda (KVA)</th>
                    <th className="px-6 py-4 font-medium">Segmento</th>
                    <th className="px-6 py-4 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {orders && orders.length > 0 ? (
                    orders.map((o: any) => (
                      <tr key={o.id} className="hover:bg-slate-50/50">
                        <td className="px-6 py-4">
                          {new Date(o.created_at).toLocaleDateString('pt-BR')}
                        </td>
                        <td className="px-6 py-4">
                          <div className="font-medium text-slate-900">{o.customer?.name || 'S/N'}</div>
                          <div className="text-slate-500 text-xs">{o.customer?.company || 'Sem empresa'}</div>
                        </td>
                        <td className="px-6 py-4">
                          {o.demand_kva ? <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-md font-medium text-xs">{o.demand_kva}</span> : '-'}
                        </td>
                        <td className="px-6 py-4 text-slate-600">
                          {o.segment || '-'}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${o.status === 'pending' ? 'bg-orange-50 text-orange-700 border-orange-200' : 'bg-green-50 text-green-700 border-green-200'}`}>
                            {o.status === 'pending' ? 'Pendente' : o.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                        Nenhum pedido ou orçamento encontrado.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Visão de Produtos */}
        <section>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-2">
              <Package className="w-6 h-6 text-[#1B84FE]" />
              <h2 className="text-2xl font-semibold text-[#1B84FE]">Catálogo de Produtos</h2>
            </div>
            
            {/* Componente que aciona a Extração I.A. Firecrawl */}
            <div className="w-full sm:w-auto">
              <ScrapeTriggerButton />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products && products.length > 0 ? (
              products.map((p: any) => (
                <div key={p.id} className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col justify-between">
                  <div>
                    <h3 className="font-semibold text-lg text-[#1B84FE]">{p.name}</h3>
                    <p className="text-sm text-slate-500 mt-1 line-clamp-2">{p.description}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded text-xs font-medium border border-slate-200">
                        SKU: {p.sku || 'N/A'}
                      </span>
                    </div>
                  </div>
                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="font-bold text-slate-900">
                      R$ {p.price ? p.price.toLocaleString('pt-BR') : 'Consulte'}
                    </span>
                    <span className={`text-xs font-semibold px-2 py-1 rounded-md ${
                      p.is_direct_sale 
                        ? 'bg-blue-100 text-blue-800' 
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      {p.is_direct_sale ? 'Venda Direta' : 'Sob Orçamento'}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-slate-500 bg-white p-6 rounded-xl border border-slate-200 text-center">
                Nenhum produto cadastrado no banco de dados.
              </div>
            )}
          </div>
        </section>

      </main>
    </div>
  )
}
