import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { FirecrawlProduto } from '@/lib/schemas';
import crypto from 'crypto';

// Instancia o Supabase Client do lado do servidor (Admin)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

const FIRECRAWL_WEBHOOK_SECRET = process.env.FIRECRAWL_WEBHOOK_SECRET || '';

export async function POST(req: Request) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get("x-firecrawl-signature");

    // Validação de segurança criptográfica (HMAC-SHA256)
    if (FIRECRAWL_WEBHOOK_SECRET && signature) {
      const expectedSignature = crypto
        .createHmac("sha256", FIRECRAWL_WEBHOOK_SECRET)
        .update(rawBody)
        .digest("hex");
      
      if (expectedSignature !== signature) {
        console.error("Assinatura do webhook inválida! Bloqueando requisição maliciosa.");
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
    } else if (FIRECRAWL_WEBHOOK_SECRET && !signature) {
      return NextResponse.json({ error: "Missing signature" }, { status: 401 });
    }

    const event = JSON.parse(rawBody);

    // Firecrawl envia webhooks com a ação "batch_scrape.completed" quando o trabalho termina
    if (event.action !== 'batch_scrape.completed' || !event.data || !Array.isArray(event.data)) {
      return NextResponse.json({ received: true, ignored: true });
    }

    const produtosExtraidos = event.data;
    const produtosParaInserir = [];

    for (const pagina of produtosExtraidos) {
      if (!pagina.json) continue;

      const infoProduto = pagina.json as FirecrawlProduto;

      const descCompleta = infoProduto.features && infoProduto.features.length > 0 
        ? `${infoProduto.description}\n\nEspecificações Técnicas:\n- ${infoProduto.features.join('\n- ')}`
        : infoProduto.description;

      const imageUrl = (pagina.images && pagina.images.length > 0) 
        ? pagina.images[0] 
        : null;

      produtosParaInserir.push({
        name: infoProduto.name,
        description: descCompleta,
        sku: infoProduto.sku,
        price: infoProduto.price,
        is_direct_sale: infoProduto.is_direct_sale, // Correção do tipo
        image_url: imageUrl,
      });
    }

    // Faz a inserção em lote na tabela 'products'
    if (produtosParaInserir.length > 0) {
      const { data, error } = await supabase
        .from('products')
        .insert(produtosParaInserir)
        .select();

      if (error) {
        console.error("Erro ao salvar webhook no Supabase:", error);
        throw error;
      }
      console.log(`Webhook processado: ${data.length} produtos sincronizados no banco.`);
    }

    return NextResponse.json({ success: true, count: produtosParaInserir.length });

  } catch (error: any) {
    console.error("Erro na rota do Webhook Firecrawl:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
