import { createHash, randomBytes } from "node:crypto";
import { NextResponse } from "next/server";
import { leadRequestSchema } from "@/lib/lead-schema";
import { getLeadNotifier } from "@/lib/integrations/lead-notifier";
import { buildLead } from "@/lib/leads";

const MAX_BODY_BYTES = 32_000;
const DEDUPLICATION_MS = 2 * 60 * 1000;
const completed = new Map<string, { id: string; expiresAt: number }>();
const inFlight = new Set<string>();

function friendlyId() {
  const day = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  return `MAR-${day}-${randomBytes(3).toString("hex").toUpperCase()}`;
}

function cleanExpired(now: number) {
  for (const [key, value] of completed) if (value.expiresAt <= now) completed.delete(key);
}

export async function POST(request: Request) {
  const contentType = request.headers.get("content-type") || "";
  if (!contentType.includes("application/json")) return NextResponse.json({ error: "Formato de pedido inválido." }, { status: 415 });

  let raw = "";
  try {
    raw = await request.text();
  } catch {
    return NextResponse.json({ error: "Não foi possível ler o pedido." }, { status: 400 });
  }
  if (new TextEncoder().encode(raw).byteLength > MAX_BODY_BYTES) return NextResponse.json({ error: "O pedido é demasiado extenso. Reduza as observações e tente novamente." }, { status: 413 });

  let json: unknown;
  try { json = JSON.parse(raw); } catch { return NextResponse.json({ error: "O pedido contém dados inválidos." }, { status: 400 }); }
  const parsed = leadRequestSchema.safeParse(json);
  if (!parsed.success) return NextResponse.json({ error: "Existem campos inválidos. Reveja o formulário e tente novamente.", fields: parsed.error.flatten().fieldErrors }, { status: 422 });
  if (parsed.data.website) return NextResponse.json({ error: "Não foi possível validar o pedido." }, { status: 400 });

  const fingerprint = createHash("sha256").update(JSON.stringify(parsed.data)).digest("hex");
  const now = Date.now();
  cleanExpired(now);
  const duplicate = completed.get(fingerprint);
  if (duplicate) return NextResponse.json({ id: duplicate.id, duplicate: true }, { status: 200 });
  if (inFlight.has(fingerprint)) return NextResponse.json({ error: "Este pedido já está a ser enviado. Aguarde alguns segundos antes de tentar novamente." }, { status: 409 });

  inFlight.add(fingerprint);
  const id = friendlyId();
  const lead = buildLead(parsed.data, { id, createdAt: new Date().toISOString() });
  try {
    const notifier = getLeadNotifier();
    await notifier.notify(lead);
    completed.set(fingerprint, { id, expiresAt: now + DEDUPLICATION_MS });
    return NextResponse.json({ id }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Não foi possível entregar o pedido à equipa. Os seus dados continuam no formulário; tente novamente dentro de momentos." }, { status: 503 });
  } finally {
    inFlight.delete(fingerprint);
  }
}
