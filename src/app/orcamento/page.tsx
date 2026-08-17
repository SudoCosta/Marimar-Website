import type { Metadata } from "next";
import { Suspense } from "react";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { QuoteWizard, QuoteWizardFromSearchParams } from "@/components/quote/quote-wizard";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Pedir Orçamento Personalizado",
  description: "Selecione os artigos e envie um pedido de orçamento para limpeza de estofos e superfícies têxteis em Leiria.",
  alternates: { canonical: "/orcamento" },
};

export default function QuotePage() {
  const onlineRequestsAvailable = Boolean(siteConfig.leadsEndpoint);
  return (
    <main id="conteudo" className="quote-page">
      <div className="quote-header"><Breadcrumbs items={[{ label: "Início", href: "/" }, { label: "Pedir orçamento" }]} /><p className="eyebrow"><span />Orçamento personalizado</p><h1>Conte-nos o que<br /><em>precisa de cuidar.</em></h1><p>{onlineRequestsAvailable ? "Quatro passos curtos. Sem preços automáticos, sem pagamento e sem agendamento antes da confirmação da equipa." : "A versão informativa já está disponível. O envio online será ativado quando o canal de receção dos pedidos estiver configurado."}</p></div>
      {onlineRequestsAvailable ? <Suspense fallback={<div className="quote-success"><p>A preparar o formulário…</p></div>}><QuoteWizardFromSearchParams /></Suspense> : <QuoteWizard submissionEndpoint={null} />}
    </main>
  );
}
