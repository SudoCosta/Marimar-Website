import type { Lead } from "@/lib/lead-schema";

export interface LeadNotifier {
  notify(lead: Lead): Promise<void>;
}

export interface AvailabilityProvider {
  getAvailability(input: { postalCode: string; preferredDate?: string }): Promise<unknown>;
}

export interface PricingProvider {
  estimate(lead: Pick<Lead, "items" | "postalCode" | "serviceMode">): Promise<unknown>;
}

export interface PhotoStorageProvider {
  prepareUpload(input: { requestId: string; contentType: string }): Promise<unknown>;
}
