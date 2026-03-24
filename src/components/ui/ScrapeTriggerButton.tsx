"use client";
import { useState } from "react";

export default function ScrapeTriggerButton() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: 'idle' | 'success' | 'error', message: string }>({ type: 'idle', message: '' });

  const handleStartScrape = async () => {
    setLoading(true);
    setStatus({ type: 'idle', message: '' });

    try {
      // Faz a requisição POST para a sua rota de inicialização
      const response = await fetch("/api/scrape-products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          // Aqui você pode passar as URLs dinamicamente de um input, ou deixar fixo para testes
          urls: [
            "https://balfarsolar.com.br/services/paineis-solares",
            "https://balfarsolar.com.br/services/bomba-dagua-solar-balfar",
            "https://balfarsolar.com.br/wp-content/uploads/2019/10/Growatt-15000-22000TL3-SL-IEC6211661727.pdf"
          ]
        })
      });

      const data = await response.json();

      if (data.success) {
        setStatus({ 
          type: 'success', 
          message: `Sucesso! Extração (ID: ${data.jobId}) iniciada em 2º plano. Os dados irão pro Supabase via Webhook.` 
        });
      } else {
        setStatus({ type: 'error', message: `Erro: ${data.error}` });
      }
    } catch (error) {
      console.error("Falha ao acionar a API:", error);
      setStatus({ type: 'error', message: "Erro de comunicação com o servidor." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
      <h3 className="text-xl font-bold text-gray-800 mb-2">
        Sincronizar Catálogo de Produtos
      </h3>
      <p className="text-gray-600 mb-4 text-sm">
        Inicia a leitura via I.A. dos produtos e PDFs configurados. A operação roda em segundo plano usando Firecrawl V2.
      </p>
      
      <button
        onClick={handleStartScrape}
        disabled={loading}
        className={`px-4 py-2 text-white font-medium rounded-md transition-colors ${
          loading ? "bg-gray-400 cursor-not-allowed" : "bg-orange-600 hover:bg-orange-700"
        }`}
      >
        {loading ? "Iniciando Rastreamento..." : "Disparar Extração via Firecrawl"}
      </button>

      {status.message && (
        <div className={`mt-4 p-3 rounded text-sm ${
          status.type === 'success' 
            ? 'bg-green-50 text-green-800 border border-green-200' 
            : 'bg-red-50 text-red-800 border border-red-200'
        }`}>
          {status.message}
        </div>
      )}
    </div>
  );
}
