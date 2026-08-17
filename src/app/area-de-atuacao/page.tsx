import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Home, MapPin, PackageOpen } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { CtaBlock } from "@/components/ui/cta-block";

export const metadata: Metadata = {
  title: "Área de Atuação em Leiria e Zona Envolvente",
  description: "Serviço Marimar em Leiria, Fátima, Ourém e arredores, sujeito a confirmação da morada, artigo e modalidade.",
  alternates: { canonical: "/area-de-atuacao" },
};

export default function ServiceAreaPage() {
  return (
    <main id="conteudo">
      <section className="page-hero page-hero-split area-page-hero">
        <div><Breadcrumbs items={[{ label: "Início", href: "/" }, { label: "Área de atuação" }]} /><p className="eyebrow"><span />Leiria · Fátima · Ourém</p><h1>Perto de si,<br /><em>quando importa.</em></h1><p className="page-intro">A Marimar trabalha habitualmente em Leiria, Fátima, Ourém e arredores. Cerca de 30 km funciona como referência para planear a deslocação, não como uma fronteira automática.</p><Link className="button" href="/orcamento#localizacao">Confirmar a minha zona <ArrowUpRight aria-hidden="true" /></Link></div>
        <div className="area-map" role="img" aria-label="Representação ilustrativa da área aproximada em torno de Leiria; não representa uma fronteira exata"><span className="map-ring map-ring-one" /><span className="map-ring map-ring-two" /><span className="map-ring map-ring-three" /><div className="map-center"><MapPin aria-hidden="true" /><strong>Leiria</strong><small>ponto de referência</small></div><p>≈ 30 km</p></div>
      </section>
      <section className="coverage-note"><p><strong>A representação é ilustrativa.</strong> A elegibilidade final depende da morada exata, do artigo, da deslocação necessária e da modalidade do serviço.</p></section>
      <section className="section coverage-grid">
        <article><Home aria-hidden="true" /><span>01</span><h2>Serviço ao domicílio</h2><p>A morada, os acessos e as condições do local são analisados antes de confirmar a intervenção em casa.</p></article>
        <article><PackageOpen aria-hidden="true" /><span>02</span><h2>Recolha e entrega</h2><p>Quando necessário, a deslocação pode ser organizada em função do artigo e da rota a confirmar.</p></article>
        <article><MapPin aria-hidden="true" /><span>03</span><h2>Fora da referência</h2><p>Um pedido fora do raio aproximado não é recusado automaticamente. Envie a localização para análise.</p></article>
      </section>
      <section className="postal-cta"><div><p className="eyebrow eyebrow-light"><span />Confirmação simples</p><h2>Indique o código postal e a localidade.</h2></div><div><p>A equipa cruza a localização com os artigos e a modalidade necessária. A confirmação de deslocação é enviada juntamente com o orçamento.</p><Link className="button button-light" href="/orcamento">Começar pedido <ArrowUpRight aria-hidden="true" /></Link></div></section>
      <CtaBlock title="Tem dúvidas sobre a sua localização?" description="Envie o pedido mesmo que esteja fora da referência aproximada. A equipa avalia a deslocação sem rejeição automática." />
    </main>
  );
}
