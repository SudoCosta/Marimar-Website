import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Check, Info } from "lucide-react";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { CtaBlock } from "@/components/ui/cta-block";
import { getServiceBySlug, services } from "@/data/services";

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: PageProps<"/servicos/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};
  const title = `${service.title} em Leiria`;
  return {
    title,
    description: service.seoDescription,
    alternates: { canonical: `/servicos/${service.slug}` },
    openGraph: { title, description: service.seoDescription, images: [] },
    twitter: { card: "summary", title, description: service.seoDescription, images: [] },
  };
}

export default async function ServiceDetailPage({ params }: PageProps<"/servicos/[slug]">) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();
  const Icon = service.icon;

  return (
    <main id="conteudo">
      <section className="service-detail-hero">
        <div className="service-detail-copy">
          <Breadcrumbs items={[{ label: "Início", href: "/" }, { label: "Serviços", href: "/servicos" }, { label: service.shortTitle }]} />
          <p className="eyebrow"><span />{service.eyebrow}</p>
          <h1>{service.title}<br /><em>em Leiria.</em></h1>
          <p>{service.description}</p>
          <Link className="button" href={`/orcamento?servico=${service.id}`}>Pedir orçamento <ArrowUpRight aria-hidden="true" /></Link>
        </div>
        <div className="service-detail-art"><span>0{services.indexOf(service) + 1}</span><Icon aria-hidden="true" /><p>{service.processNote}</p></div>
      </section>
      <section className="detail-columns">
        <div><p className="eyebrow"><span />Indicado para</p><h2>O que podemos avaliar</h2><ul className="detail-list">{service.suitableFor.map((item) => <li key={item}><Check aria-hidden="true" />{item}</li>)}</ul></div>
        <div><p className="eyebrow"><span />Benefícios</p><h2>Uma intervenção cuidada</h2><ul className="detail-list">{service.benefits.map((item) => <li key={item}><Check aria-hidden="true" />{item}</li>)}</ul></div>
      </section>
      <section className="expectations-section">
        <div><Info aria-hidden="true" /><p className="eyebrow eyebrow-light"><span />Expectativas transparentes</p><h2>O tecido define<br />o que é possível.</h2></div>
        <ul>{service.considerations.map((item) => <li key={item}>{item}</li>)}</ul>
      </section>
      <section className="section simple-process"><div><span>01</span><h3>Partilhe</h3><p>Selecione a categoria, quantidade e características que conhece.</p></div><div><span>02</span><h3>Confirmamos</h3><p>A equipa analisa o pedido, a deslocação e a modalidade adequada.</p></div><div><span>03</span><h3>Cuidamos</h3><p>O serviço acontece nas condições acordadas e o pagamento é feito no final.</p></div></section>
      <CtaBlock title={`Preparado para cuidar dos seus ${service.shortTitle.toLowerCase()}?`} />
    </main>
  );
}
