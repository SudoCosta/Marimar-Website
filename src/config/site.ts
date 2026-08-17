const publicUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "http://localhost:3000";

export const siteConfig = {
  name: "Marimar",
  tagline: "Limpeza profissional. Cuidado especializado. Conveniência.",
  region: "Leiria",
  approximateRadiusKm: 30,
  publicUrl,
  contacts: {
    phone: process.env.NEXT_PUBLIC_PHONE?.trim() || null,
    email: process.env.NEXT_PUBLIC_EMAIL?.trim() || null,
    whatsapp: process.env.NEXT_PUBLIC_WHATSAPP?.trim() || null,
    schedule: process.env.NEXT_PUBLIC_SCHEDULE?.trim() || null,
  },
  socialProfiles: [] as string[],
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
