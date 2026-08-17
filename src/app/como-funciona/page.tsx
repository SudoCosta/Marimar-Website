import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Check, CircleDot, Droplets, Eye, Wind } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { CtaBlock } from "@/components/ui/cta-block";

export const metadata: Metadata = {
  title: "Como Funciona a Limpeza Especializada",
  description: "Conheça o processo Marimar: avaliação, preparação, tratamento, orientação de secagem, confirmação e pagamento após o serviço.",
  alternates: { canonical: "/como-funciona" },
};

const stages = [
  { number: "01", title: "Pedido e avaliação inicial", text: "O formulário recolhe artigos, quantidades, estado, localização e preferências. Se não souber o material ou a medida, pode indicá-lo sem bloquear o pedido." },
  { number: "02", title: "Confirmação do serviço", text: "A equipa analisa os dados e confirma a viabilidade, modalidade, orçamento e data. Até este contacto, a preferência indicada não corresponde a um agendamento." },
  { number: "03", title: "Observação e preparação", text: "No local ou após recolha, são observados tecido, construção, manchas, desgaste e condições envolventes antes de iniciar o tratamento." },
  { number: "04", title: "Tratamento cuidado", text: "A abordagem é ajustada ao artigo e às expectativas definidas. Não é aplicada a mesma solução a todas as fibras e superfícies." },
  { number: "05", title: "Secagem e orientação", text: "O resultado e a secagem dependem do tecido, ventilação, estado e tratamento. A equipa indica os cuidados adequados após a intervenção." },
  { number: "06", title: "Conclusão e pagamento", text: "O serviço é revisto nas condições acordadas e o pagamento é efetuado no final. Não existe pagamento online nesta fase." },
] as const;

export default function HowItWorksPage() {
  return (
    <main id="conteudo">
      <section className="page-hero page-hero-centered">
        <Breadcrumbs items={[{ label: "Início", href: "/" }, { label: "Como funciona" }]} />
        <p className="eyebrow"><span />Método e transparência</p>
        <h1>Um processo cuidado,<br /><em>do princípio ao fim.</em></h1>
        <p>Compreender antes de tratar. Confirmar antes de agendar. Orientar depois de concluir.</p>
      </section>
      <section className="timeline-section"><ol>{stages.map((stage) => <li key={stage.number}><span>{stage.number}</span><div><h2>{stage.title}</h2><p>{stage.text}</p></div></li>)}</ol></section>
      <section className="method-cards">
        <article><Eye aria-hidden="true" /><h3>Avaliação</h3><p>Material, estado, manchas e construção ajudam a definir o método adequado.</p></article>
        <article><Droplets aria-hidden="true" /><h3>Tratamento</h3><p>A intervenção é ajustada à peça, sem garantias absolutas de remoção.</p></article>
        <article><Wind aria-hidden="true" /><h3>Secagem</h3><p>Tecido, ventilação e ambiente influenciam o tempo necessário.</p></article>
        <article><CircleDot aria-hidden="true" /><h3>Confirmação</h3><p>Orçamento, deslocação e horário são sempre confirmados pela equipa.</p></article>
      </section>
      <section className="split-info">
        <div><p className="eyebrow"><span />Antes da visita</p><h2>Como pode preparar o pedido</h2><ul className="detail-list"><li><Check aria-hidden="true" />Conte os artigos e indique tamanhos aproximados</li><li><Check aria-hidden="true" />Descreva manchas, odores ou necessidades específicas</li><li><Check aria-hidden="true" />Partilhe informação sobre acessos e ventilação</li><li><Check aria-hidden="true" />Indique uma preferência de data, sem assumir disponibilidade</li></ul></div>
        <aside><p className="eyebrow eyebrow-light"><span />Nota importante</p><h2>Limpeza não é reparação.</h2><p>Desgaste, descoloração, fibras danificadas ou manchas que alteraram o tecido podem permanecer visíveis. A equipa distingue estes sinais da sujidade e comunica expectativas prudentes.</p><Link className="button button-light" href="/orcamento">Partilhar os detalhes <ArrowUpRight aria-hidden="true" /></Link></aside>
      </section>
      <CtaBlock />
    </main>
  );
}
