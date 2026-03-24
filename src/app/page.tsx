import { Button } from "@/components/ui/Button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-solar-blue mb-6">
        Potência e Confiança para o <span className="text-solar-yellow">Setor Elétrico</span>
      </h1>
      <p className="text-lg md:text-xl text-slate-600 max-w-2xl mb-8">
        A Solar América é especialista em fabricação de transformadores e soluções para energias renováveis. Explore nosso catálogo ou solicite um orçamento customizado.
      </p>
      <div className="flex gap-4">
        <Link href="/catalogo">
          <Button variant="primary" className="text-lg px-8 py-3">
            Acessar Catálogo
          </Button>
        </Link>
        <Link href="/casos-de-sucesso">
          <Button variant="outline" className="text-lg px-8 py-3">
            Casos de Sucesso
          </Button>
        </Link>
      </div>
    </div>
  );
}
