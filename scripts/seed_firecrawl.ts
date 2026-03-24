import FirecrawlApp from '@mendable/firecrawl-js';
import { createClient } from '@supabase/supabase-js';
import { z } from 'zod';

// Configuração do Schema Zod
const firecrawlProdutoSchema = z.object({
  name: z.string().describe("O nome completo do produto, painel, inversor ou modelo exato."),
  description: z.string().describe("Descrição completa e detalhada do produto e suas funções, escrita de forma fluida."),
  sku: z.string().nullable().describe("Código SKU ou referência do modelo, se existir na página. Retorne null se não houver."),
  price: z.number().nullable().describe("Preço em BRL. Retorne null se for 'sob consulta' ou não existir."),
  is_direct_sale: z.boolean().describe("Defina como true apenas se a página permitir a compra/adicionar ao carrinho diretamente."),
  features: z.array(z.string()).describe("Lista de especificações técnicas, voltagem, potência e dados do fabricante.")
});
type FirecrawlProduto = z.infer<typeof firecrawlProdutoSchema>;

// Inicializando instâncias com variáveis de ambiente (já carregadas pelo --env-file)
const firecrawl = new FirecrawlApp({ apiKey: process.env.FIRECRAWL_API_KEY });
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function main() {
  console.log("----------------------------------------------------------------");
  console.log("🚀 Iniciando extração inicial de produtos via Firecrawl V2...");
  console.log("----------------------------------------------------------------");
  
  const urls = [
    "https://balfarsolar.com.br/services/paineis-solares",
    "https://balfarsolar.com.br/services/bomba-dagua-solar-balfar",
    "https://balfarsolar.com.br/services/transformadores-balfar-solar",
    // "https://balfarsolar.com.br/services/cabos-e-conectores-balfar",
    // "https://balfarsolar.com.br/services/kit-de-energia-solar-balfar",
    // "https://balfarsolar.com.br/wp-content/uploads/2019/10/Growatt-15000-22000TL3-SL-IEC6211661727.pdf"
  ];

  try {
    // Usando a extração SÍNCRONA da V2 no terminal local (não sofre timeout)
    console.log(`📡 Solicitando extração de ${urls.length} URLs (isso pode demorar de 30 a 60 segundos)...`);
    
    // Método síncrono da API V2 aguarda até status === 'completed'
    const batchScrapeResult = await firecrawl.batchScrape(urls, {
      options: {
        formats: [
          "images",
          {
            type: "json",
            prompt: "Extraia as informações vitais deste produto solar para um catálogo de e-commerce b2b.",
            schema: firecrawlProdutoSchema as any
          }
        ]
      }
    });

    if (batchScrapeResult.status !== "completed") {
      throw new Error("A extração falhou ou retornou incompleta.");
    }

    const produtosExtraidos = batchScrapeResult.data;
    const produtosParaInserir = [];

    for (const pagina of produtosExtraidos) {
      if (!pagina.json) continue;

      const infoProduto = pagina.json as FirecrawlProduto;
      const descCompleta = infoProduto.features && infoProduto.features.length > 0 
        ? `${infoProduto.description}\n\nEspecificações Técnicas:\n- ${infoProduto.features.join('\n- ')}`
        : infoProduto.description;

      const imageUrl = (pagina.images && pagina.images.length > 0) ? pagina.images[0] : null;

      produtosParaInserir.push({
        name: infoProduto.name,
        description: descCompleta,
        sku: infoProduto.sku,
        price: infoProduto.price,
        is_direct_sale: infoProduto.is_direct_sale,
        image_url: imageUrl,
      });
    }

    console.log(`✅ Extração concluída! Inserindo os produtos no banco de dados Supabase...`);

    const { data, error } = await supabase.from('products').insert(produtosParaInserir).select();

    if (error) {
      console.error("Erro no Supabase:", error);
      throw error;
    }

    console.log("🎉 Sucesso! Produtos inseridos no banco de dados:");
    data.forEach(p => console.log(`   - ${p.name}`));
    console.log("----------------------------------------------------------------");

  } catch (err: any) {
    console.error("❌ Ocorreu um erro:", err.message);
  }
}

main();
