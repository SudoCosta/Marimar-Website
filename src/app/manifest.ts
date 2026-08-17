import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Marimar — Cuidado Especializado de Estofos",
    short_name: "Marimar",
    description: "Limpeza e higienização especializada de estofos e superfícies têxteis em Leiria.",
    start_url: "/",
    display: "standalone",
    background_color: "#F7F5F0",
    theme_color: "#173F3A",
    lang: "pt-PT",
    icons: [{ src: "/icon", sizes: "64x64", type: "image/png" }],
  };
}
