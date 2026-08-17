import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Menu } from "lucide-react";

const navigation = [
  { href: "/servicos", label: "Serviços" },
  { href: "/#precos", label: "Preços" },
  { href: "/como-funciona", label: "Como funciona" },
  { href: "/area-de-atuacao", label: "Área de atuação" },
  { href: "/contactos", label: "Contactos" },
];

const basePath = process.env.PAGES_BASE_PATH?.replace(/\/$/, "") || "";

export function Brand() {
  return (
    <Link className="brand" href="/" aria-label="Marimar — página inicial">
      <span className="brand-mark" aria-hidden="true">
        <Image src={`${basePath}/marimar-emblem.png`} alt="" width={1254} height={1254} priority />
      </span>
      <span className="brand-wordmark"><strong>Marimar</strong><small>Clean Living</small></span>
    </Link>
  );
}

export function Header() {
  return (
    <header className="site-header-wrap">
      <div className="site-header">
        <Brand />
        <nav className="desktop-nav" aria-label="Navegação principal">
          {navigation.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}
        </nav>
        <Link className="button button-small header-cta" href="/orcamento">
          <span>Pedir orçamento</span> <ArrowUpRight aria-hidden="true" />
        </Link>
        <details className="mobile-menu">
          <summary aria-label="Abrir navegação"><Menu aria-hidden="true" /></summary>
          <nav aria-label="Navegação mobile">
            {navigation.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}
            <Link className="button" href="/orcamento">Pedir orçamento <ArrowUpRight aria-hidden="true" /></Link>
          </nav>
        </details>
      </div>
    </header>
  );
}
