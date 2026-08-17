import { describe, expect, it } from "vitest";
import { leadRequestSchema, type LeadRequest } from "@/lib/lead-schema";
import { buildLead } from "@/lib/leads";

const validRequest: LeadRequest = {
  services: ["sofas"],
  items: [{ category: "sofas", variant: "3 lugares", quantity: 1, material: "Não sei", conditionNotes: "" }],
  serviceMode: "domicilio",
  postalCode: "2400-000",
  locality: "Leiria",
  preferredDate: "",
  preferredPeriod: "indiferente",
  accessNotes: "",
  customerName: "Cliente Teste",
  email: "cliente@example.com",
  phone: "",
  preferredContactMethod: "email",
  generalNotes: "",
  photoUrls: [],
  privacyConsent: true,
  marketingConsent: false,
  source: "website",
  website: "",
};

describe("leadRequestSchema", () => {
  it("aceita um pedido mínimo válido com apenas email", () => {
    expect(leadRequestSchema.safeParse(validRequest).success).toBe(true);
  });

  it("recusa pedidos sem artigo, contacto ou consentimento", () => {
    const result = leadRequestSchema.safeParse({ ...validRequest, items: [], services: [], email: "", phone: "", privacyConsent: false });
    expect(result.success).toBe(false);
    if (!result.success) {
      const fields = result.error.flatten().fieldErrors;
      expect(fields.items).toBeDefined();
      expect(fields.email).toBeDefined();
      expect(fields.privacyConsent).toBeDefined();
    }
  });

  it("exige o contacto correspondente ao meio preferido", () => {
    const result = leadRequestSchema.safeParse({ ...validRequest, email: "", phone: "912345678", preferredContactMethod: "email" });
    expect(result.success).toBe(false);
  });

  it("rejeita conteúdo demasiado longo e código postal incompleto", () => {
    const result = leadRequestSchema.safeParse({ ...validRequest, postalCode: "2400", generalNotes: "x".repeat(1001) });
    expect(result.success).toBe(false);
  });
});

describe("buildLead", () => {
  it("deriva serviços dos artigos e preserva o artigo não listado", () => {
    const lead = buildLead({ ...validRequest, services: [], items: [...validRequest.items, { category: "outro", variant: "Cabeceira", quantity: 1, material: "Tecido", conditionNotes: "" }] }, { id: "MAR-20260817-ABC123", createdAt: "2026-08-17T10:00:00.000Z" });
    expect(lead.services).toEqual(["sofas"]);
    expect(lead.items).toHaveLength(2);
    expect(lead.status).toBe("new");
    expect(lead.source).toBe("website");
  });
});
