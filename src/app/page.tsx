import Link from "next/link";
import Image from "next/image";
import { ArrowDown, ArrowUpRight, Check, ClipboardList, Home, MapPin, MessageSquareText, ShieldCheck, Sparkles, WalletCards } from "lucide-react";
import { CtaBlock } from "@/components/ui/cta-block";
import { Faq } from "@/components/ui/faq";
import { PricingSection } from "@/components/ui/pricing-section";
import { SectionHeading } from "@/components/ui/section-heading";
import { ServiceCard } from "@/components/ui/service-card";
import { faqItems } from "@/data/faq";
import { services } from "@/data/services";

const basePath = process.env.PAGES_BASE_PATH?.replace(/\/$/, "") || "";

const serviceProcess = [
  { icon: ClipboardList, title: "Indique o que precisa de limpar", text: "Selecione um ou vários artigos e as respetivas quantidades." },
  { icon: MessageSquareText, title: "Partilhe os detalhes", text: "Diga-nos o que sabe sobre o tecido, estado, localização e preferências." },
  { icon: ShieldCheck, title: "Receba a confirmação", text: "A equipa analisa o pedido e confirma orçamento, deslocação e horário." },
  { icon: WalletCards, title: "Serviço e pagamento no final", text: "O tratamento é realizado nas condições acordadas. Não existe checkout online." },
] as const;

export default function HomePage() {
  return (
    <main id="conteudo">
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow"><span />Higienização premium de têxteis em Leiria</p>
          <h1>Luxo é viver<br />num lar <em>limpo.</em></h1>
          <p className="hero-intro">Cuidamos de sofás, colchões, tapetes e carpetes com limpeza profunda, produtos adequados ao tecido e atendimento próximo em sua casa.</p>
          <div className="hero-actions">
            <Link className="button" href="/orcamento">Pedir orçamento <ArrowUpRight aria-hidden="true" /></Link>
            <Link className="text-link" href="#servicos">Conhecer os serviços <ArrowDown aria-hidden="true" /></Link>
          </div>
          <p className="hero-note">Leiria · Fátima · Ourém e arredores · Recolha e entrega quando necessário</p>
        </div>
        <div className="hero-art" role="img" aria-label="Detalhe de tecidos em tons marfim e verde-petróleo">
          <Image className="hero-art-image" src={`${basePath}/og.png`} alt="" fill sizes="(max-width: 850px) 100vw, 46vw" priority />
          <div className="fabric fabric-back" />
          <div className="fabric fabric-front"><span className="stitch stitch-one" /><span className="stitch stitch-two" /></div>
          <div className="fiber-detail"><span /><span /><span /></div>
          <div className="art-note"><span>01</span><p>Precisão no tratamento.<br />Cuidado em cada fibra.</p></div>
        </div>
      </section>

      <section className="trust-bar" aria-label="Vantagens do serviço">
        <div><MapPin aria-hidden="true" /><span><strong>Leiria · Fátima · Ourém</strong> e arredores</span></div>
        <div><Home aria-hidden="true" /><span><strong>Em sua casa</strong> quando possível</span></div>
        <div><Sparkles aria-hidden="true" /><span><strong>Orçamento</strong> personalizado</span></div>
      </section>

      <section className="section services-section" id="servicos">
        <SectionHeading eyebrow="Especialização têxtil" title={<>O cuidado certo para<br /><em>cada superfície.</em></>} description="Não tratamos todos os tecidos da mesma forma. A categoria, construção e estado do artigo orientam a avaliação e o método." />
        <div className="services-grid">{services.map((service, index) => <ServiceCard key={service.id} service={service} index={index} />)}</div>
        <div className="section-link-row"><Link className="text-link" href="/servicos">Ver todos os serviços <ArrowUpRight aria-hidden="true" /></Link></div>
      </section>

      <PricingSection />

      <section className="care-section">
        <div className="care-visual" aria-hidden="true"><div className="care-circle"><span>M</span></div><p>Matéria · Método · Manutenção</p></div>
        <div className="care-copy">
          <p className="eyebrow eyebrow-light"><span />Mais do que limpar</p>
          <h2>Cuidar do que já faz parte da sua casa.</h2>
          <p>Um tecido bem tratado pode recuperar presença, conforto e frescura. A Marimar combina observação, método e atenção ao detalhe para trabalhar cada artigo com o cuidado que merece.</p>
          <ul className="check-list">
            <li><Check aria-hidden="true" />Avaliação antes do tratamento</li>
            <li><Check aria-hidden="true" />Expectativas realistas sobre manchas e desgaste</li>
            <li><Check aria-hidden="true" />Conveniência sem comprometer o cuidado técnico</li>
          </ul>
          <Link className="button button-light" href="/como-funciona">Como funciona <ArrowUpRight aria-hidden="true" /></Link>
        </div>
      </section>

      <section className="section process-section">
        <SectionHeading eyebrow="Um processo simples" title={<>Do primeiro detalhe<br /><em>à realização do serviço.</em></>} description="Um pedido claro permite preparar uma resposta mais útil. O agendamento só fica confirmado depois da análise da equipa." />
        <ol className="process-grid">
          {serviceProcess.map((item, index) => { const Icon = item.icon; return <li key={item.title}><span className="process-index">0{index + 1}</span><Icon aria-hidden="true" /><h3>{item.title}</h3><p>{item.text}</p></li>; })}
        </ol>
      </section>

      <section className="section mode-section">
        <div className="mode-copy">
          <p className="eyebrow"><span />Serviço à sua medida</p>
          <h2>Em sua casa.<br /><em>Ou com recolha.</em></h2>
          <p>Sempre que o artigo, os acessos, a água, energia e ventilação o permitam, o serviço pode ser realizado no local. Quando a peça ou o tratamento exigem outras condições, avaliamos recolha e entrega.</p>
          <Link className="text-link" href="/como-funciona">Perceber a avaliação <ArrowUpRight aria-hidden="true" /></Link>
        </div>
        <div className="mode-options">
          <article><span>01</span><Home aria-hidden="true" /><h3>Ao domicílio</h3><p>Maior conveniência, sujeita às condições do espaço e do artigo.</p></article>
          <article><span>02</span><Sparkles aria-hidden="true" /><h3>Recolha e entrega</h3><p>Uma alternativa quando o tratamento beneficia de outras condições.</p></article>
        </div>
      </section>

      <section className="area-teaser">
        <div className="area-rings" aria-hidden="true"><span className="ring ring-one" /><span className="ring ring-two" /><span className="ring-center">Leiria</span><i>N</i><i>S</i></div>
        <div className="area-copy">
          <p className="eyebrow eyebrow-light"><span />Área de atuação</p>
          <h2>Leiria, Fátima e Ourém.</h2>
          <p>Trabalhamos nestas localidades e arredores, tendo cerca de 30 km como referência. A cobertura final depende da morada, do artigo e da modalidade do serviço.</p>
          <Link className="button button-light" href="/area-de-atuacao">Consultar a área <ArrowUpRight aria-hidden="true" /></Link>
        </div>
      </section>

      <section className="section faq-section">
        <SectionHeading eyebrow="Questões frequentes" title={<>Informação clara,<br /><em>antes de decidir.</em></>} />
        <Faq items={faqItems} />
      </section>

      <CtaBlock />
    </main>
  );
}
