-- ============================================================
-- Migração: RLS Hardening — Solar América
-- Data: 2024-02-02
--
-- Objetivo: Remover as políticas temporárias de INSERT anônimo
-- e adotar o padrão Admin Client (service_role) para toda escrita.
--
-- Modelo de segurança final:
--   - PRODUCTS  : leitura pública (anon SELECT) | escrita só admin autenticado
--   - CUSTOMERS : sem acesso pela chave anon | só admin autenticado
--   - ORDERS    : sem acesso pela chave anon | só admin autenticado
--   - ORDER_ITEMS: sem acesso pela chave anon | só admin autenticado
--
-- Por que isso é seguro?
--   Todos os inserts de leads passam pela Server Action (Next.js),
--   que usa SUPABASE_SERVICE_ROLE_KEY (privada) e valida com Zod.
--   Nenhum cliente externo pode inserir dados diretamente via API pública.
-- ============================================================

-- ── 1. PRODUCTS ─────────────────────────────────────────────────────────────

-- Remove política antiga (caso exista com nome diferente)
DROP POLICY IF EXISTS "Produtos são visíveis para todos" ON public.products;
DROP POLICY IF EXISTS "products_public_read" ON public.products;
DROP POLICY IF EXISTS "products_admin_write" ON public.products;

-- Leitura pública: qualquer usuário (incluindo anon) pode ver produtos
CREATE POLICY "products_public_read"
ON public.products
FOR SELECT
USING (true);

-- Escrita restrita: apenas admin autenticado pode criar/editar/deletar produtos
CREATE POLICY "products_admin_write"
ON public.products
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- ── 2. CUSTOMERS ────────────────────────────────────────────────────────────

-- Remove políticas temporárias inseguras
DROP POLICY IF EXISTS "Permitir inserção anônima em clientes" ON public.customers;
DROP POLICY IF EXISTS "customers_anon_insert" ON public.customers;
DROP POLICY IF EXISTS "customers_admin_all" ON public.customers;

-- Apenas admin autenticado tem qualquer acesso à tabela de clientes
-- (Server Actions usam service_role que bypassa esta política)
CREATE POLICY "customers_admin_all"
ON public.customers
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- ── 3. ORDERS ───────────────────────────────────────────────────────────────

-- Remove políticas temporárias inseguras
DROP POLICY IF EXISTS "Permitir inserção anônima em pedidos" ON public.orders;
DROP POLICY IF EXISTS "orders_anon_insert" ON public.orders;
DROP POLICY IF EXISTS "orders_admin_all" ON public.orders;

-- Apenas admin autenticado tem qualquer acesso à tabela de orçamentos
CREATE POLICY "orders_admin_all"
ON public.orders
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- ── 4. ORDER_ITEMS ──────────────────────────────────────────────────────────

-- Remove política temporária se existir
DROP POLICY IF EXISTS "Permitir inserção anônima em itens do pedido" ON public.order_items;
DROP POLICY IF EXISTS "order_items_admin_all" ON public.order_items;

-- Apenas admin autenticado tem acesso
CREATE POLICY "order_items_admin_all"
ON public.order_items
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- ── 5. Confirmar que RLS está ativo em todas as tabelas ─────────────────────
-- (Idempotente — não falha se já estiver ativo)
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

-- ── RESUMO DO MODELO DE ACESSO ───────────────────────────────────────────────
--
--  Tabela        │ Anon (chave pública) │ Authenticated (admin) │ service_role
--  ──────────────┼─────────────────────┼───────────────────────┼─────────────
--  products      │ SELECT              │ SELECT/INSERT/UPDATE  │ Tudo
--  customers     │ NENHUM              │ SELECT/INSERT/UPDATE  │ Tudo
--  orders        │ NENHUM              │ SELECT/INSERT/UPDATE  │ Tudo
--  order_items   │ NENHUM              │ SELECT/INSERT/UPDATE  │ Tudo
--
--  Server Actions usam service_role → escrita irrestrita e validada (Zod)
--  Componentes client usam anon key → somente leitura de produtos
--
