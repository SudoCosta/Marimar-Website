const publicUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "http://localhost:3000";
const leadsEndpoint = process.env.NEXT_PUBLIC_LEADS_ENDPOINT?.trim() || null;

export const siteConfig = {
  name: "Marimar",
  tagline: "Luxo é viver num lar limpo.",
  region: "Leiria",
  approximateRadiusKm: 30,
  publicUrl,
  leadsEndpoint,
  contacts: {
    phone: process.env.NEXT_PUBLIC_PHONE?.trim() || "911 898 896",
    email: process.env.NEXT_PUBLIC_EMAIL?.trim() || "geral.marimarlimpeza@gmail.com",
    whatsapp: process.env.NEXT_PUBLIC_WHATSAPP?.trim() || "351911898896",
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM?.trim() || "https://www.instagram.com/marimar.limpeza/",
    schedule: process.env.NEXT_PUBLIC_SCHEDULE?.trim() || null,
  },
  socialProfiles: [process.env.NEXT_PUBLIC_INSTAGRAM?.trim() || "https://www.instagram.com/marimar.limpeza/"],
  legal: {
    legalName: null,
    taxId: null,
    fiscalAddress: null,
    privacyContact: null,
  },
} as const;

export function telephoneHref(value: string) {
  return `tel:${value.replace(/[^+\d]/g, "")}`;
}

export function whatsappHref(value: string) {
  return `https://wa.me/${value.replace(/\D/g, "")}`;
}
