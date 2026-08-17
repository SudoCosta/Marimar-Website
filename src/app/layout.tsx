import type { Metadata } from "next";
import "@fontsource-variable/cormorant-garamond";
import "@fontsource-variable/manrope";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { StructuredData } from "@/components/seo/structured-data";
import { siteConfig } from "@/config/site";

const basePath = process.env.PAGES_BASE_PATH?.replace(/\/$/, "") || "";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.publicUrl),
  title: { default: "Marimar | Limpeza de Sofás e Estofos em Leiria", template: "%s | Marimar" },
  description:
    "Higienização premium de sofás, colchões, tapetes e carpetes, e engomadoria ao domicílio em Leiria, Fátima, Ourém e arredores.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_PT",
    siteName: "Marimar",
    title: "Marimar | Limpeza de Sofás e Estofos em Leiria",
    description: "Higienização premium de têxteis e engomadoria ao domicílio em Leiria, Fátima, Ourém e arredores.",
    images: [{ url: "/og.png", width: 1732, height: 909, alt: "Marimar — higienização premium de têxteis em Leiria" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Marimar | Limpeza de Sofás e Estofos em Leiria",
    description: "Higienização premium de têxteis e engomadoria ao domicílio em Leiria, Fátima, Ourém e arredores.",
    images: ["/og.png"],
  },
  icons: { icon: [{ url: `${basePath}/icon.svg`, type: "image/svg+xml" }] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-PT">
      <body>
        <a className="skip-link" href="#conteudo">Saltar para o conteúdo</a>
        <Header />
        {children}
        <Footer />
        <StructuredData />
      </body>
    </html>
  );
}
