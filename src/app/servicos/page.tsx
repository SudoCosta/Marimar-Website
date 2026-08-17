import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { CtaBlock } from "@/components/ui/cta-block";
import { ServiceCard } from "@/components/ui/service-card";
import { services } from "@/data/services";

export const metadata: Metadata = {
  title: "Serviços de Limpeza e Higienização em Leiria",
  description: "Conheça os serviços Marimar para sofás, cadeiras, colchões, carpetes, tapetes e estofos automóveis em Leiria.",
  alternates: { canonical: "/servicos" },
};

export default function ServicesPage() {
  return (
    <main id="conteudo">
      <section className="page-hero page-hero-split">
        <div><Breadcrumbs items={[{ label: "Início", href: "/" }, { label: "Serviços" }]} /><p className="eyebrow"><span />Serviços especializados</p><h1>Cada tecido pede<br /><em>um cuidado próprio.</em></h1></div>
        <div className="page-hero-aside"><p>A Marimar trabalha estofos e superfícies têxteis com uma abordagem ajustada à peça, ao estado e ao contexto em que será realizado o serviço.</p><ul className="mini-checks"><li><Check aria-hidden="true" />Sem preços ou soluções indiferenciadas</li><li><Check aria-hidden="true" />Um pedido pode incluir várias categorias</li><li><Check aria-hidden="true" />Não precisa de saber o material exato</li></ul></div>
      </section>
      <section className="section compact-top"><div className="services-grid">{services.map((service, index) => <ServiceCard key={service.id} service={service} index={index} />)}</div></section>
      <section className="service-principles">
        <div><span>01</span><h2>Avaliar</h2><p>Compreender o artigo, a fibra, o uso, as manchas e as condições do local.</p></div>
        <div><span>02</span><h2>Tratar</h2><p>Definir uma abordagem adequada, sem prometer resultados que o tecido pode não permitir.</p></div>
        <div><span>03</span><h2>Orientar</h2><p>Explicar cuidados, ventilação e expectativas depois do serviço.</p></div>
      </section>
      <div className="section-link-row standalone"><Link className="button" href="/orcamento">Selecionar artigos <ArrowUpRight aria-hidden="true" /></Link></div>
      <CtaBlock />
    </main>
  );
}
