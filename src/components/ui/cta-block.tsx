import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function CtaBlock({ title = "Conte-nos o que precisa de cuidar.", description = "Descreva os artigos e indique a sua localização. A equipa analisa o pedido antes de confirmar orçamento, deslocação e horário." }: { title?: string; description?: string }) {
  return (
    <section className="cta-block">
      <div>
        <p className="eyebrow eyebrow-light"><span />Orçamento personalizado</p>
        <h2>{title}</h2>
      </div>
      <div className="cta-block-copy">
        <p>{description}</p>
        <Link className="button button-light" href="/orcamento">Pedir orçamento <ArrowUpRight aria-hidden="true" /></Link>
        <small>O envio não confirma automaticamente um agendamento.</small>
      </div>
    </section>
  );
}
