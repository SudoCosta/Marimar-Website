export type AnalyticsEvent =
  | { name: "service_view"; service: string }
  | { name: "quote_started" }
  | { name: "quote_step_completed"; step: number }
  | { name: "quote_submitted" }
  | { name: "contact_clicked"; method: string };

export interface AnalyticsProvider {
  track(event: AnalyticsEvent): void;
}

export const analytics: AnalyticsProvider = { track: () => undefined };
