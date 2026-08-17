import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

export default function NotFound() {
  return (
    <main id="conteudo" className="not-found">
      <div className="not-found-code" aria-hidden="true">404</div>
      <p className="eyebrow"><span />Página não encontrada</p>
      <h1>Este caminho não precisa<br /><em>de ficar por limpar.</em></h1>
      <p>A página pode ter mudado ou o endereço pode não estar correto.</p>
      <div><Link className="button" href="/"><ArrowLeft aria-hidden="true" />Voltar ao início</Link><Link className="text-link" href="/orcamento">Pedir orçamento <ArrowUpRight aria-hidden="true" /></Link></div>
    </main>
  );
}
