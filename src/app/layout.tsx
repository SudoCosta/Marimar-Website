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
    "Limpeza e higienização especializada de sofás, colchões, cadeiras, tapetes, carpetes e estofos automóveis em Leiria e zona envolvente.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_PT",
    siteName: "Marimar",
    title: "Marimar | Limpeza de Sofás e Estofos em Leiria",
    description: "Limpeza especializada de estofos e superfícies têxteis em Leiria e zona envolvente.",
    images: [{ url: "/og.png", width: 1732, height: 909, alt: "Marimar — limpeza profissional e cuidado especializado de estofos em Leiria" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Marimar | Limpeza de Sofás e Estofos em Leiria",
    description: "Limpeza especializada de estofos e superfícies têxteis em Leiria e zona envolvente.",
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
