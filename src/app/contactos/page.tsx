import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Mail, MessageCircle, Phone } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { siteConfig, telephoneHref, whatsappHref } from "@/config/site";

export const metadata: Metadata = {
  title: "Contactos",
  description: "Contacte a Marimar ou envie um pedido de orçamento para limpeza especializada de estofos na região de Leiria.",
  alternates: { canonical: "/contactos" },
};

export default function ContactsPage() {
  const { contacts, leadsEndpoint } = siteConfig;
  const hasContacts = contacts.phone || contacts.email || contacts.whatsapp;
  const onlineRequestsAvailable = Boolean(leadsEndpoint);
  return (
    <main id="conteudo">
      <section className="page-hero page-hero-split contact-hero">
        <div><Breadcrumbs items={[{ label: "Início", href: "/" }, { label: "Contactos" }]} /><p className="eyebrow"><span />Estamos por perto</p><h1>Comece por<br /><em>partilhar os detalhes.</em></h1><p className="page-intro">{onlineRequestsAvailable ? "A forma mais eficaz de receber uma resposta útil é indicar artigos, quantidade, estado e localização no pedido de orçamento." : "O site está disponível em modo informativo enquanto os canais de contacto e a receção segura de pedidos são configurados."}</p>{onlineRequestsAvailable && <Link className="button" href="/orcamento">Pedir orçamento <ArrowUpRight aria-hidden="true" /></Link>}</div>
        <aside className="contact-panel">
          <p className="eyebrow eyebrow-light"><span />Contacto direto</p>
          {hasContacts ? <div className="contact-options">
            {contacts.phone && <a href={telephoneHref(contacts.phone)}><Phone aria-hidden="true" /><span><small>Telefone</small>{contacts.phone}</span></a>}
            {contacts.email && <a href={`mailto:${contacts.email}`}><Mail aria-hidden="true" /><span><small>Email</small>{contacts.email}</span></a>}
            {contacts.whatsapp && <a href={whatsappHref(contacts.whatsapp)}><MessageCircle aria-hidden="true" /><span><small>Mensagem</small>WhatsApp</span></a>}
          </div> : <div className="config-state"><MessageCircle aria-hidden="true" /><h2>Contactos em atualização</h2><p>Os contactos diretos ainda não estão publicados. Nenhum dado pessoal é recolhido enquanto o canal de receção dos pedidos não estiver configurado.</p></div>}
          {contacts.schedule && <p className="contact-schedule">{contacts.schedule}</p>}
        </aside>
      </section>
      {onlineRequestsAvailable ? <section className="contact-expectations"><div><span>01</span><h2>Envio</h2><p>O pedido chega à equipa com os dados essenciais.</p></div><div><span>02</span><h2>Análise</h2><p>Artigos, localização e modalidade são verificados.</p></div><div><span>03</span><h2>Resposta</h2><p>Orçamento e disponibilidade são confirmados por contacto.</p></div></section> : <section className="contact-expectations"><div><span>01</span><h2>Publicação</h2><p>O site já pode ser consultado no GitHub Pages.</p></div><div><span>02</span><h2>Contactos</h2><p>Os canais diretos serão apresentados depois de confirmados.</p></div><div><span>03</span><h2>Formulário</h2><p>O envio será ativado quando existir um endpoint externo seguro.</p></div></section>}
    </main>
  );
}
