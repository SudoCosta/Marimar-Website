import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Service } from "@/data/services";

export function ServiceCard({ service, index }: { service: Service; index: number }) {
  const Icon = service.icon;
  return (
    <article className="service-card">
      <div className="service-card-top">
        <span className="service-number">{String(index + 1).padStart(2, "0")}</span>
        <Icon aria-hidden="true" />
      </div>
      {service.priceLabel && <span className="service-price">{service.priceLabel}</span>}
      <h3>{service.title}</h3>
      <p>{service.summary}</p>
      <Link href={`/servicos/${service.slug}`} aria-label={`Conhecer ${service.title.toLowerCase()}`}>
        Saber mais <ArrowUpRight aria-hidden="true" />
      </Link>
    </article>
  );
}
