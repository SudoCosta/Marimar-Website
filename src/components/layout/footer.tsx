import Link from "next/link";
import { Camera, Mail, MessageCircle, Phone } from "lucide-react";
import { siteConfig, telephoneHref, whatsappHref } from "@/config/site";
import { Brand } from "@/components/layout/header";

export function Footer() {
  const { contacts } = siteConfig;
  const hasContacts = contacts.phone || contacts.email || contacts.whatsapp || contacts.instagram;

  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div className="footer-intro">
          <Brand />
          <p>Higienização premium de têxteis e engomadoria ao domicílio em Leiria, Fátima, Ourém e arredores.</p>
        </div>
        <div>
          <p className="footer-label">Navegação</p>
          <nav className="footer-links" aria-label="Navegação no rodapé">
            <Link href="/servicos">Serviços</Link>
            <Link href="/como-funciona">Como funciona</Link>
            <Link href="/area-de-atuacao">Área de atuação</Link>
            <Link href="/orcamento">Pedir orçamento</Link>
          </nav>
        </div>
        <div>
          <p className="footer-label">Informação</p>
          <nav className="footer-links" aria-label="Informação legal">
            <Link href="/contactos">Contactos</Link>
            <Link href="/privacidade">Privacidade</Link>
            <Link href="/termos">Termos de utilização</Link>
          </nav>
        </div>
        {hasContacts ? (
          <div>
            <p className="footer-label">Contacto</p>
            <div className="footer-links contact-links">
              {contacts.phone && <a href={telephoneHref(contacts.phone)}><Phone aria-hidden="true" />{contacts.phone}</a>}
              {contacts.email && <a href={`mailto:${contacts.email}`}><Mail aria-hidden="true" />{contacts.email}</a>}
              {contacts.whatsapp && <a href={whatsappHref(contacts.whatsapp)}><MessageCircle aria-hidden="true" />WhatsApp</a>}
              {contacts.instagram && <a href={contacts.instagram} target="_blank" rel="noreferrer"><Camera aria-hidden="true" />@marimar.limpeza</a>}
            </div>
          </div>
        ) : (
          <div className="footer-quote">
            <p className="footer-label">O seu artigo</p>
            <p>Partilhe os detalhes para receber uma avaliação personalizada.</p>
            <Link className="footer-action" href="/orcamento">Começar pedido</Link>
          </div>
        )}
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Marimar</span>
        <span>Leiria · Fátima · Ourém</span>
        <span>Pagamento após o serviço</span>
      </div>
    </footer>
  );
}
