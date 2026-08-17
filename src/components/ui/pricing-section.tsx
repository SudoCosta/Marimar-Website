import Link from "next/link";
import { ArrowUpRight, Check, Sparkles } from "lucide-react";
import { ironingOffer, priceItems, pricingNotice, servicePacks } from "@/data/pricing";
import { SectionHeading } from "@/components/ui/section-heading";

export function PricingSection() {
  return (
    <section className="section pricing-section" id="precos">
      <SectionHeading
        eyebrow="Preços de referência"
        title={<>Cuidado premium,<br /><em>valores transparentes.</em></>}
        description="Consulte os valores base e escolha a solução que mais se aproxima do que precisa. Confirmamos sempre o total antes do serviço."
      />

      <div className="pricing-layout">
        <div className="price-list-card">
          <div className="price-card-heading"><span>Serviço</span><span>Preço</span></div>
          <dl className="price-list">
            {priceItems.map((item) => (
              <div key={item.service}><dt>{item.service}</dt><dd>{item.price}</dd></div>
            ))}
          </dl>
        </div>

        <div className="pricing-featured">
          <div className="packs-card">
            <p className="pricing-kicker"><Sparkles aria-hidden="true" /> Packs Marimar</p>
            <h3>Mais cuidado,<br />melhor oportunidade.</h3>
            <div className="pack-list">
              {servicePacks.map((pack) => (
                <article key={pack.name}>
                  <div><strong>{pack.name}</strong><small>{pack.includes}</small></div>
                  <b>{pack.price}</b>
                </article>
              ))}
            </div>
          </div>

          <aside className="ironing-card">
            <span>Também disponível</span>
            <h3>{ironingOffer.title}</h3>
            <strong>{ironingOffer.price}</strong>
            <ul>{ironingOffer.details.map((detail) => <li key={detail}><Check aria-hidden="true" />{detail}</li>)}</ul>
          </aside>
        </div>
      </div>

      <div className="pricing-note">
        <p>{pricingNotice}</p>
        <Link className="text-link" href="/orcamento">Pedir confirmação <ArrowUpRight aria-hidden="true" /></Link>
      </div>
    </section>
  );
}
