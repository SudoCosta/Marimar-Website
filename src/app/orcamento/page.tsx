import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { QuoteWizard } from "@/components/quote/quote-wizard";
import { serviceIds, type ServiceId } from "@/data/services";

export const metadata: Metadata = {
  title: "Pedir Orçamento Personalizado",
  description: "Selecione os artigos e envie um pedido de orçamento para limpeza de estofos e superfícies têxteis em Leiria.",
  alternates: { canonical: "/orcamento" },
};

export default async function QuotePage({ searchParams }: PageProps<"/orcamento">) {
  const value = (await searchParams).servico;
  const requested = typeof value === "string" && serviceIds.includes(value as ServiceId) ? value as ServiceId : undefined;
  return (
    <main id="conteudo" className="quote-page">
      <div className="quote-header"><Breadcrumbs items={[{ label: "Início", href: "/" }, { label: "Pedir orçamento" }]} /><p className="eyebrow"><span />Orçamento personalizado</p><h1>Conte-nos o que<br /><em>precisa de cuidar.</em></h1><p>Quatro passos curtos. Sem preços automáticos, sem pagamento e sem agendamento antes da confirmação da equipa.</p></div>
      <QuoteWizard initialService={requested} />
    </main>
  );
}
