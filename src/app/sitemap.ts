import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { services } from "@/data/services";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const fixed = [
    { path: "", priority: 1, changeFrequency: "monthly" as const },
    { path: "/servicos", priority: .9, changeFrequency: "monthly" as const },
    { path: "/como-funciona", priority: .75, changeFrequency: "yearly" as const },
    { path: "/area-de-atuacao", priority: .8, changeFrequency: "yearly" as const },
    { path: "/orcamento", priority: .85, changeFrequency: "yearly" as const },
    { path: "/contactos", priority: .7, changeFrequency: "yearly" as const },
  ];
  return [
    ...fixed.map((entry) => ({ url: `${siteConfig.publicUrl}${entry.path}`, lastModified: "2026-08-17", changeFrequency: entry.changeFrequency, priority: entry.priority })),
    ...services.map((service) => ({ url: `${siteConfig.publicUrl}/servicos/${service.slug}`, lastModified: "2026-08-17", changeFrequency: "monthly" as const, priority: .8 })),
  ];
}
