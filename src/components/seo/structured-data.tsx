import { siteConfig } from "@/config/site";
import { services } from "@/data/services";

export function StructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: siteConfig.name,
    url: siteConfig.publicUrl,
    description: "Higienização premium de sofás, colchões, tapetes e carpetes, e engomadoria ao domicílio.",
    areaServed: ["Leiria", "Fátima", "Ourém"].map((name) => ({ "@type": "City", name })),
    sameAs: siteConfig.socialProfiles,
    priceRange: "€€",
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
