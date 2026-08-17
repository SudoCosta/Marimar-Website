import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  const basePath = process.env.PAGES_BASE_PATH?.replace(/\/$/, "") || "";
  return {
    name: "Marimar Clean Living — Higienização Premium",
    short_name: "Marimar",
    description: "Higienização premium de sofás, colchões, tapetes e carpetes, e engomadoria ao domicílio em Leiria.",
    start_url: `${basePath}/`,
    display: "standalone",
    background_color: "#FAF8F3",
    theme_color: "#2F6966",
    lang: "pt-PT",
    icons: [{ src: `${basePath}/icon.svg`, sizes: "any", type: "image/svg+xml" }],
  };
}
