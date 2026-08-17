import { leadSchema, type Lead, type LeadRequest } from "@/lib/lead-schema";

export function buildLead(request: LeadRequest, input: { id: string; createdAt: string }): Lead {
  const services = [...new Set(request.items.filter((item) => item.category !== "outro").map((item) => item.category))];
  return leadSchema.parse({ ...request, services, source: "website", id: input.id, status: "new", createdAt: input.createdAt });
}
