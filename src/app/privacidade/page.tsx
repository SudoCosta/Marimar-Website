import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description: "Base técnica da política de privacidade do website Marimar e dos pedidos de orçamento.",
  alternates: { canonical: "/privacidade" },
  robots: { index: false, follow: true },
};

export default function PrivacyPage() {
  return (
    <main id="conteudo" className="legal-page">
      <div className="legal-header"><Breadcrumbs items={[{ label: "Início", href: "/" }, { label: "Privacidade" }]} /><p className="eyebrow"><span />Informação legal</p><h1>Política de privacidade</h1><p>Última atualização técnica: 17 de agosto de 2026</p></div>
      <aside className="legal-notice"><strong>Documento em revisão antes da publicação.</strong> A identificação legal do responsável, o contacto de privacidade, os prestadores e os prazos finais de conservação devem ser confirmados pelo responsável da Marimar.</aside>
      <div className="legal-content">
        <section><h2>1. Âmbito e responsável</h2><p>Esta política explica como são tratados os dados pessoais enviados através do website Marimar para responder a pedidos de orçamento e preparar uma eventual prestação de serviço. A entidade legal responsável e o respetivo contacto de privacidade serão identificados na versão final antes do lançamento.</p></section>
        <section><h2>2. Dados recolhidos</h2><p>O pedido pode incluir nome, email, telefone, localização, artigos a tratar, características, estado, preferências de data e contacto, informação de acessos e observações fornecidas voluntariamente. Nesta fase não existe upload de fotografias, pagamento online, autenticação ou criação de conta.</p></section>
        <section><h2>3. Finalidades e fundamento</h2><p>Os dados do pedido são utilizados para analisar necessidades, preparar um orçamento, confirmar deslocação e disponibilidade, responder ao contacto e, quando aceite, preparar a prestação do serviço. O tratamento necessário para responder ao pedido depende do consentimento explícito apresentado no formulário. Comunicações de marketing dependem de um consentimento separado, opcional e revogável.</p></section>
        <section><h2>4. Partilha e prestadores</h2><p>Os dados podem ser processados por fornecedores técnicos estritamente necessários ao alojamento e envio de comunicações. Antes do lançamento devem ser identificados os prestadores efetivamente utilizados, as respetivas funções e, quando aplicável, transferências internacionais e garantias associadas.</p></section>
        <section><h2>5. Conservação</h2><p>Os pedidos devem ser conservados apenas durante o período necessário para resposta, acompanhamento, cumprimento de obrigações legais e defesa de direitos. O responsável deve definir e publicar prazos concretos de retenção e um processo de eliminação antes do lançamento.</p></section>
        <section><h2>6. Direitos</h2><p>Nos termos aplicáveis, o titular pode solicitar acesso, retificação, apagamento, limitação, oposição ou portabilidade, e retirar consentimentos sem comprometer a licitude do tratamento anterior. Pode ainda apresentar reclamação junto da autoridade de controlo competente. O canal para exercício destes direitos será publicado após confirmação.</p></section>
        <section><h2>7. Segurança e minimização</h2><p>O website recolhe apenas informação necessária ao pedido, valida os dados no servidor e não expõe credenciais no navegador. Não devem ser colocados dados pessoais em ferramentas de analytics ou registos de produção. Nenhuma transmissão eletrónica pode, contudo, ser descrita como isenta de risco.</p></section>
        <section><h2>8. Cookies e analytics</h2><p>O MVP não utiliza cookies não essenciais nem ferramentas de analytics. Por esse motivo, não é apresentado um banner de cookies. Qualquer futura integração de medição ou publicidade deve ser avaliada e, quando necessário, ficar dependente de consentimento apropriado.</p></section>
        <section><h2>9. Alterações</h2><p>Esta base deve ser atualizada quando mudarem finalidades, prestadores, integrações ou requisitos legais. A data da revisão material deverá acompanhar a versão final publicada.</p></section>
      </div>
    </main>
  );
}
