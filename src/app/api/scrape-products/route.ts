import Firecrawl from '@mendable/firecrawl-js';
import { NextResponse } from 'next/server';
import { firecrawlProdutoSchema } from '@/lib/schemas';

// Inicializando o cliente Firecrawl
const firecrawl = new Firecrawl({ apiKey: process.env.FIRECRAWL_API_KEY });

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const urlsToScrape: string[] = body.urls; // Array de URLs enviado pelo frontend/script

    if (!urlsToScrape || !Array.isArray(urlsToScrape) || urlsToScrape.length === 0) {
      return NextResponse.json({ error: "O campo 'urls' é obrigatório e deve ser um array." }, { status: 400 });
    }

    // Opcional: Para evitar timeout na Vercel, pegamos a baseURL atual para montar o Webhook URL absoluto
    const host = req.headers.get("host") || "seusite.com";
    const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
    // NOTE: Em desenvolvimento local o webhook só funciona se você usar Ngrok ou se o webhookUrl for acessível externamente pelo Firecrawl
    const webhookUrl = `${protocol}://${host}/api/webhook-firecrawl`;

    // 1. Inicia o trabalho em lote sem esperar ele terminar (API V2)
    const batchScrapeJob = await firecrawl.startBatchScrape(urlsToScrape, {
      options: {
        formats: [
          "images",
          {
            type: "json",
            prompt: "Extraia as informações vitais deste produto solar para um catálogo de e-commerce b2b.",
            schema: firecrawlProdutoSchema as any
          }
        ]
      },
      // O webhook notifica nosso backend automaticamente quando a extração encerrar
      webhook: {
        url: webhookUrl,
        events: ["completed"]
      }
    });

    if (!batchScrapeJob.id) {
      return NextResponse.json({ error: "Falha ao iniciar o scrape em lote." }, { status: 500 });
    }

    // Retorna imediatamente para o frontend que o processo começou
    return NextResponse.json({ 
      success: true, 
      message: "Extração iniciada em segundo plano! Notificaremos via webhook quando terminar.", 
      jobId: batchScrapeJob.id 
    });

  } catch (error: any) {
    console.error("Falha na operação de extração:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
