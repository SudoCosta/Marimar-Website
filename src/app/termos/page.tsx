import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";

export const metadata: Metadata = {
  title: "Termos de Utilização",
  description: "Termos de utilização do website Marimar e informação sobre pedidos de orçamento.",
  alternates: { canonical: "/termos" },
  robots: { index: false, follow: true },
};

export default function TermsPage() {
  return (
    <main id="conteudo" className="legal-page">
      <div className="legal-header"><Breadcrumbs items={[{ label: "Início", href: "/" }, { label: "Termos" }]} /><p className="eyebrow"><span />Informação legal</p><h1>Termos de utilização</h1><p>Última atualização técnica: 17 de agosto de 2026</p></div>
      <aside className="legal-notice"><strong>Base técnica sujeita a revisão.</strong> A identificação legal da empresa, condições comerciais finais e meios de contacto devem ser confirmados antes da publicação.</aside>
      <div className="legal-content">
        <section><h2>1. Finalidade do website</h2><p>Este website apresenta os serviços Marimar e permite enviar pedidos de orçamento para limpeza, higienização e revitalização de estofos e superfícies têxteis.</p></section>
        <section><h2>2. Pedidos e agendamento</h2><p>O envio do formulário não confirma um agendamento, preço ou aceitação do serviço. Cada pedido está sujeito a análise dos artigos, localização, acessos, modalidade e disponibilidade. A prestação só é acordada após confirmação direta da equipa.</p></section>
        <section><h2>3. Informação sobre resultados</h2><p>Os resultados dependem da fibra, construção, estado, desgaste, origem das manchas, tratamentos anteriores e condições do local. Não é garantida a remoção integral de manchas, odores, danos ou alterações de cor, nem são comunicados resultados médicos ou terapêuticos.</p></section>
        <section><h2>4. Preferências de data</h2><p>As datas e períodos apresentados no formulário são preferências do cliente e não representam disponibilidade em tempo real. Qualquer horário é confirmado posteriormente.</p></section>
        <section><h2>5. Pagamento</h2><p>O website não processa pagamentos. O pagamento é realizado após a prestação, segundo as condições comerciais confirmadas diretamente com o cliente.</p></section>
        <section><h2>6. Utilização responsável</h2><p>O utilizador deve fornecer informação tão completa e verdadeira quanto possível, não tentar interferir com o funcionamento do website e não introduzir conteúdos ilegais ou dados de terceiros sem fundamento adequado.</p></section>
        <section><h2>7. Conteúdo e disponibilidade</h2><p>A informação pode ser atualizada para refletir alterações nos serviços. Embora exista cuidado técnico na manutenção do website, não é garantida disponibilidade ininterrupta.</p></section>
        <section><h2>8. Contacto e revisão</h2><p>Os dados legais e o canal formal para questões sobre estes termos serão incluídos antes do lançamento público. A versão final deve ser revista pelo responsável da empresa.</p></section>
      </div>
    </main>
  );
}
