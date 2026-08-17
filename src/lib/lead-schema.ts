import { z } from "zod";
import { serviceIds } from "@/data/services";

const optionalEmail = z.union([z.literal(""), z.string().trim().email("Introduza um email válido.").max(160)]);
const optionalPhone = z.union([z.literal(""), z.string().trim().min(6, "Introduza um telefone válido.").max(30)]);

export const leadItemSchema = z.object({
  category: z.enum([...serviceIds, "outro"]),
  variant: z.string().trim().max(100),
  quantity: z.number().int().min(1, "A quantidade mínima é 1.").max(50, "Confirme diretamente quantidades superiores a 50."),
  material: z.string().trim().max(80),
  conditionNotes: z.string().trim().max(500),
});

export const leadRequestSchema = z.object({
  services: z.array(z.enum(serviceIds)).max(serviceIds.length),
  items: z.array(leadItemSchema).min(1, "Selecione pelo menos um artigo.").max(12),
  serviceMode: z.enum(["domicilio", "recolha-entrega", "aconselhamento"]),
  postalCode: z.string().trim().regex(/^\d{4}-\d{3}$/, "Utilize o formato 0000-000."),
  locality: z.string().trim().min(2, "Indique a localidade.").max(100),
  preferredDate: z.union([z.literal(""), z.string().regex(/^\d{4}-\d{2}-\d{2}$/)]),
  preferredPeriod: z.enum(["manha", "tarde", "indiferente"]),
  accessNotes: z.string().trim().max(500),
  customerName: z.string().trim().min(2, "Indique o seu nome.").max(120),
  email: optionalEmail,
  phone: optionalPhone,
  preferredContactMethod: z.enum(["email", "telefone"]),
  generalNotes: z.string().trim().max(1000),
  photoUrls: z.array(z.string().url()).max(10),
  privacyConsent: z.boolean().refine((value) => value, "É necessário aceitar o tratamento dos dados do pedido."),
  marketingConsent: z.boolean(),
  source: z.string().trim().max(80),
  website: z.string().max(0),
}).superRefine((data, ctx) => {
  if (!data.email && !data.phone) {
    ctx.addIssue({ code: "custom", path: ["email"], message: "Indique um email ou telefone." });
    ctx.addIssue({ code: "custom", path: ["phone"], message: "Indique um email ou telefone." });
  }
  if (data.preferredContactMethod === "email" && !data.email) {
    ctx.addIssue({ code: "custom", path: ["preferredContactMethod"], message: "Adicione um email ou escolha contacto por telefone." });
  }
  if (data.preferredContactMethod === "telefone" && !data.phone) {
    ctx.addIssue({ code: "custom", path: ["preferredContactMethod"], message: "Adicione um telefone ou escolha contacto por email." });
  }
});

export const leadSchema = leadRequestSchema.safeExtend({
  id: z.string(),
  status: z.enum(["new", "notified", "failed"]),
  createdAt: z.string().datetime(),
});

export type LeadRequest = z.infer<typeof leadRequestSchema>;
export type Lead = z.infer<typeof leadSchema>;
