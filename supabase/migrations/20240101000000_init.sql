-- Configuração inicial do banco de dados Solar América

-- Tabela de Produtos (Híbrida)
CREATE TABLE IF NOT EXISTS public.products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    description TEXT,
    sku TEXT UNIQUE,
    ean TEXT UNIQUE,
    price NUMERIC(10, 2),
    is_direct_sale BOOLEAN DEFAULT false,
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de Clientes B2B
CREATE TABLE IF NOT EXISTS public.customers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_name TEXT NOT NULL,
    cnpj TEXT UNIQUE NOT NULL,
    contact_name TEXT,
    email TEXT,
    phone TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de Pedidos / Orçamentos
DO $$ BEGIN
    CREATE TYPE order_status AS ENUM ('pending_diagnostic', 'awaiting_engineering', 'approved', 'paid', 'cancelled');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS public.orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_id UUID REFERENCES public.customers(id),
    status order_status DEFAULT 'pending_diagnostic',
    total_amount NUMERIC(10, 2),
    diagnostic_details JSONB, -- Armazena setor, demanda, estágio, etc.
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de Itens do Pedido
CREATE TABLE IF NOT EXISTS public.order_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE,
    product_id UUID REFERENCES public.products(id),
    quantity INTEGER DEFAULT 1,
    unit_price NUMERIC(10, 2)
);

-- Configuração de Row Level Security (RLS)

-- Habilitar RLS
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

-- Políticas de Leitura Pública para Produtos
DROP POLICY IF EXISTS "Produtos são visíveis para todos" ON public.products;
CREATE POLICY "Produtos são visíveis para todos" 
ON public.products FOR SELECT 
USING (true);

-- As outras políticas (Admin/Clientes) serão configuradas na Fase 5.
-- Temporariamente, permitimos inserções anônimas em customers e orders para o formulário público funcionar.
DROP POLICY IF EXISTS "Permitir inserção anônima em clientes" ON public.customers;
CREATE POLICY "Permitir inserção anônima em clientes" 
ON public.customers FOR INSERT 
WITH CHECK (true);

DROP POLICY IF EXISTS "Permitir inserção anônima em pedidos" ON public.orders;
CREATE POLICY "Permitir inserção anônima em pedidos" 
ON public.orders FOR INSERT 
WITH CHECK (true);

DROP POLICY IF EXISTS "Permitir inserção anônima em itens do pedido" ON public.order_items;
CREATE POLICY "Permitir inserção anônima em itens do pedido" 
ON public.order_items FOR INSERT 
WITH CHECK (true);
