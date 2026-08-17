import { siteConfig } from "@/config/site";
import { services } from "@/data/services";

export function StructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: siteConfig.name,
    url: siteConfig.publicUrl,
    description: "Limpeza e higienização especializada de estofos e superfícies têxteis em Leiria e zona envolvente.",
    areaServed: { "@type": "City", name: "Leiria" },
    ...(siteConfig.contacts.phone ? { telephone: siteConfig.contacts.phone } : {}),
    ...(siteConfig.contacts.email ? { email: siteConfig.contacts.email } : {}),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Serviços de tratamento têxtil",
      itemListElement: services.map((service) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: service.title, url: `${siteConfig.publicUrl}/servicos/${service.slug}` },
      })),
    },
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}
