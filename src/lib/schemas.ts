import { z } from 'zod';

export const firecrawlProdutoSchema = z.object({
  name: z.string().describe("O nome completo do produto, painel, inversor ou modelo exato."),
  description: z.string().describe("Descrição completa e detalhada do produto e suas funções, escrita de forma fluida."),
  sku: z.string().nullable().describe("Código SKU ou referência do modelo, se existir na página. Retorne null se não houver."),
  price: z.number().nullable().describe("Preço em BRL. Retorne null se for 'sob consulta' ou não existir."),
  is_direct_sale: z.boolean().describe("Defina como true apenas se a página permitir a compra/adicionar ao carrinho diretamente."),
  features: z.array(z.string()).describe("Lista de especificações técnicas, voltagem, potência e dados do fabricante.")
});

export type FirecrawlProduto = z.infer<typeof firecrawlProdutoSchema>;
