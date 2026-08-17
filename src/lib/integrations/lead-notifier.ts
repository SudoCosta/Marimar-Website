import "server-only";
import { Resend } from "resend";
import type { Lead } from "@/lib/lead-schema";
import type { LeadNotifier } from "@/lib/integrations/contracts";
import { getServiceById } from "@/data/services";

function escapeHtml(value: string | number | boolean | null | undefined) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function leadEmailHtml(lead: Lead) {
  const itemRows = lead.items.map((item) => {
    const label = getServiceById(item.category)?.title || "Outro artigo têxtil";
    return `<tr><td>${escapeHtml(label)}</td><td>${escapeHtml(item.quantity)}</td><td>${escapeHtml(item.variant || "—")}</td><td>${escapeHtml(item.material)}</td><td>${escapeHtml(item.conditionNotes || "—")}</td></tr>`;
  }).join("");
  return `<!doctype html><html lang="pt"><body style="font-family:Arial,sans-serif;color:#202523"><h1>Novo pedido ${escapeHtml(lead.id)}</h1><p><strong>Estado:</strong> pedido recebido; requer análise e confirmação.</p><h2>Artigos</h2><table cellpadding="8" cellspacing="0" border="1" style="border-collapse:collapse"><thead><tr><th>Categoria</th><th>Qtd.</th><th>Tipo/tamanho</th><th>Material</th><th>Estado</th></tr></thead><tbody>${itemRows}</tbody></table><h2>Serviço e localização</h2><p><strong>Modalidade:</strong> ${escapeHtml(lead.serviceMode)}<br><strong>Local:</strong> ${escapeHtml(lead.postalCode)} ${escapeHtml(lead.locality)}<br><strong>Data preferida:</strong> ${escapeHtml(lead.preferredDate || "Sem preferência")}<br><strong>Período:</strong> ${escapeHtml(lead.preferredPeriod)}<br><strong>Acessos:</strong> ${escapeHtml(lead.accessNotes || "—")}</p><h2>Cliente</h2><p><strong>Nome:</strong> ${escapeHtml(lead.customerName)}<br><strong>Email:</strong> ${escapeHtml(lead.email || "—")}<br><strong>Telefone:</strong> ${escapeHtml(lead.phone || "—")}<br><strong>Contacto preferido:</strong> ${escapeHtml(lead.preferredContactMethod)}</p><p><strong>Observações:</strong><br>${escapeHtml(lead.generalNotes || "—")}</p><p><strong>Marketing:</strong> ${lead.marketingConsent ? "Sim" : "Não"}</p><hr><small>Criado em ${escapeHtml(lead.createdAt)} · Origem ${escapeHtml(lead.source)}</small></body></html>`;
}

class ResendLeadNotifier implements LeadNotifier {
  constructor(private resend: Resend, private to: string, private from: string) {}

  async notify(lead: Lead) {
    const result = await this.resend.emails.send({
      from: this.from,
      to: this.to,
      subject: `Novo pedido Marimar · ${lead.id}`,
      html: leadEmailHtml(lead),
      replyTo: lead.email || undefined,
    });
    if (result.error) throw new Error("O serviço de email não aceitou o pedido.");
  }
}

class DevelopmentLeadNotifier implements LeadNotifier {
  async notify(lead: Lead) {
    console.info(`[Marimar] Pedido ${lead.id} validado em desenvolvimento (${lead.items.length} categorias).`);
  }
}

export function getLeadNotifier(): LeadNotifier {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.LEADS_TO_EMAIL;
  const from = process.env.FROM_EMAIL;
  if (apiKey && to && from) return new ResendLeadNotifier(new Resend(apiKey), to, from);
  if (process.env.NODE_ENV === "development") return new DevelopmentLeadNotifier();
  throw new Error("A receção de pedidos ainda não está configurada.");
}
