import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  const basePath = process.env.PAGES_BASE_PATH?.replace(/\/$/, "") || "";
  return {
    name: "Marimar — Cuidado Especializado de Estofos",
    short_name: "Marimar",
    description: "Limpeza e higienização especializada de estofos e superfícies têxteis em Leiria.",
    start_url: `${basePath}/`,
    display: "standalone",
    background_color: "#F7F5F0",
    theme_color: "#173F3A",
    lang: "pt-PT",
    icons: [{ src: `${basePath}/icon.svg`, sizes: "any", type: "image/svg+xml" }],
  };
}
