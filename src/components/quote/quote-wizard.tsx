"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, ArrowRight, Check, CheckCircle2, CircleAlert, LoaderCircle, Mail, MessageCircle, Minus, Phone, Plus } from "lucide-react";
import { useMemo, useState } from "react";
import { useFieldArray, useForm, useWatch, type FieldErrors, type Path } from "react-hook-form";
import { analytics } from "@/lib/analytics";
import { leadRequestSchema, type LeadRequest } from "@/lib/lead-schema";
import { getServiceById, serviceIds, services, type ServiceId } from "@/data/services";
import { siteConfig, telephoneHref, whatsappHref } from "@/config/site";

const steps = ["Artigos", "Detalhes", "Localização", "Contacto e revisão"] as const;
const materials = ["Não sei", "Tecido", "Microfibra", "Veludo", "Lã", "Fibra sintética", "Mistura de fibras", "Outro"];

const initialValues: LeadRequest = {
  services: [], items: [], serviceMode: "aconselhamento", postalCode: "", locality: "", preferredDate: "", preferredPeriod: "indiferente", accessNotes: "", customerName: "", email: "", phone: "", preferredContactMethod: "email", generalNotes: "", photoUrls: [], privacyConsent: false, marketingConsent: false, source: "website", website: "",
};

function errorMessages(errors: FieldErrors<LeadRequest>): string[] {
  const output: string[] = [];
  const visited = new WeakSet<object>();
  const walk = (value: unknown) => {
    if (!value || typeof value !== "object") return;
    if (visited.has(value)) return;
    visited.add(value);
    if ("message" in value && typeof value.message === "string") output.push(value.message);
    Object.values(value).forEach(walk);
  };
  walk(errors);
  return [...new Set(output)];
}

function ErrorMessage({ message, id }: { message?: string; id?: string }) {
  return message ? <p className="field-error" id={id}><CircleAlert aria-hidden="true" />{message}</p> : null;
}

function focusErrors() {
  requestAnimationFrame(() => document.getElementById("quote-errors")?.focus());
}

function QuoteUnavailable() {
  const { contacts } = siteConfig;
  const hasContacts = contacts.phone || contacts.email || contacts.whatsapp;
  return (
    <section className="quote-success quote-unavailable" aria-labelledby="quote-unavailable-title">
      <CircleAlert aria-hidden="true" />
      <p className="eyebrow"><span />Pedidos online</p>
      <h2 id="quote-unavailable-title">O formulário ainda não está ativo neste alojamento.</h2>
      <p>Esta versão do site não recolhe nem envia dados pessoais. O formulário será ativado quando existir um endpoint externo seguro para receber os pedidos.</p>
      {hasContacts ? <div className="quote-unavailable-actions">
        {contacts.phone && <a className="button" href={telephoneHref(contacts.phone)}><Phone aria-hidden="true" />Telefonar</a>}
        {contacts.email && <a className="button" href={`mailto:${contacts.email}`}><Mail aria-hidden="true" />Enviar email</a>}
        {contacts.whatsapp && <a className="button" href={whatsappHref(contacts.whatsapp)}><MessageCircle aria-hidden="true" />WhatsApp</a>}
      </div> : <p className="availability-note">Os contactos diretos também serão publicados assim que forem confirmados pela Marimar.</p>}
      <Link className="button button-secondary" href="/">Voltar à página inicial <ArrowRight aria-hidden="true" /></Link>
    </section>
  );
}

function InteractiveQuoteWizard({ initialService, submissionEndpoint }: { initialService?: ServiceId; submissionEndpoint: string }) {
  const [step, setStep] = useState(0);
  const [serverError, setServerError] = useState("");
  const [requestId, setRequestId] = useState("");
  const defaultValues = useMemo<LeadRequest>(() => initialService ? {
    ...initialValues,
    services: [initialService],
    items: [{ category: initialService, variant: "", quantity: 1, material: "Não sei", conditionNotes: "" }],
  } : initialValues, [initialService]);
  const form = useForm<LeadRequest>({ resolver: zodResolver(leadRequestSchema), defaultValues, mode: "onTouched" });
  const { fields, append, remove } = useFieldArray({ control: form.control, name: "items" });
  const errors = form.formState.errors;
  const messages = useMemo(() => errorMessages(errors), [errors]);

  function toggleService(id: ServiceId | "outro") {
    const index = fields.findIndex((field) => field.category === id);
    if (index >= 0) remove(index);
    else append({ category: id, variant: "", quantity: 1, material: "Não sei", conditionNotes: "" });
    const nextServices = fields
      .filter((field) => field.category !== id && field.category !== "outro")
      .map((field) => field.category as ServiceId);
    if (index < 0 && id !== "outro") nextServices.push(id);
    form.setValue("services", nextServices, { shouldValidate: true });
    form.clearErrors("items");
  }

  const validationFields: Path<LeadRequest>[][] = [
    ["items", "services"],
    ["items", "serviceMode", "generalNotes"],
    ["postalCode", "locality", "preferredDate", "preferredPeriod", "accessNotes"],
    ["customerName", "email", "phone", "preferredContactMethod", "privacyConsent", "marketingConsent"],
  ];

  async function nextStep() {
    if (step === 0 && fields.length === 0) {
      form.setError("items", { message: "Selecione pelo menos um artigo." });
      focusErrors();
      return;
    }
    const valid = await form.trigger(validationFields[step], { shouldFocus: true });
    if (!valid) {
      focusErrors();
      return;
    }
    analytics.track({ name: "quote_step_completed", step: step + 1 });
    setStep((current) => Math.min(current + 1, 3));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function submit(data: LeadRequest) {
    setServerError("");
    try {
      const response = await fetch(submissionEndpoint, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      const result = (await response.json()) as { id?: string; error?: string };
      if (!response.ok || !result.id) throw new Error(result.error || "Não foi possível enviar o pedido.");
      setRequestId(result.id);
      analytics.track({ name: "quote_submitted" });
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      setServerError(error instanceof Error ? error.message : "Não foi possível enviar o pedido. Confirme a ligação e tente novamente.");
      focusErrors();
    }
  }

  const watchedItems = useWatch({ control: form.control, name: "items" });
  const serviceMode = useWatch({ control: form.control, name: "serviceMode" });
  const postalCode = useWatch({ control: form.control, name: "postalCode" });
  const locality = useWatch({ control: form.control, name: "locality" });
  const preferredDate = useWatch({ control: form.control, name: "preferredDate" });

  if (requestId) {
    return (
      <section className="quote-success" aria-labelledby="success-title">
        <CheckCircle2 aria-hidden="true" />
        <p className="eyebrow"><span />Pedido recebido</p>
        <h2 id="success-title">Obrigado. A equipa vai analisar os detalhes.</h2>
        <p className="success-id">Referência <strong>{requestId}</strong></p>
        <p>Este pedido ainda não corresponde a um agendamento. A Marimar irá confirmar o orçamento, a deslocação e qualquer preferência de data ou horário.</p>
        <div className="success-next"><div><span>01</span><p>O pedido é revisto</p></div><div><span>02</span><p>Recebe um contacto</p></div><div><span>03</span><p>Confirma as condições</p></div></div>
        <Link className="button" href="/">Voltar à página inicial <ArrowRight aria-hidden="true" /></Link>
      </section>
    );
  }

  return (
    <form className="quote-form" onSubmit={form.handleSubmit(submit)} noValidate>
      <div className="honeypot" aria-hidden="true"><label htmlFor="website">Website</label><input id="website" tabIndex={-1} autoComplete="off" {...form.register("website")} /></div>
      <nav className="form-stepper" aria-label="Progresso do pedido">
        <ol>{steps.map((label, index) => <li key={label} className={index === step ? "active" : index < step ? "complete" : ""} aria-current={index === step ? "step" : undefined}><span>{index < step ? <Check aria-hidden="true" /> : index + 1}</span><small>{label}</small></li>)}</ol>
      </nav>

      {(messages.length > 0 || serverError) && <div className="error-summary" id="quote-errors" role="alert" tabIndex={-1}><CircleAlert aria-hidden="true" /><div><strong>Revise o pedido</strong>{serverError && <p>{serverError}</p>}<ul>{messages.map((message) => <li key={message}>{message}</li>)}</ul></div></div>}

      {step === 0 && <fieldset className="form-step"><legend><span>Passo 1 de 4</span>O que precisa de limpar?</legend><p className="step-intro">Selecione uma ou várias categorias. Pode ajustar quantidades e tamanhos aproximados.</p>
        <div className="selectable-services">{services.map((service) => { const index = fields.findIndex((field) => field.category === service.id); const selected = index >= 0; const Icon = service.icon; return <div key={service.id} className={`selectable-service ${selected ? "selected" : ""}`}><label><input type="checkbox" checked={selected} onChange={() => toggleService(service.id)} /><span className="select-check"><Check aria-hidden="true" /></span><Icon aria-hidden="true" /><strong>{service.shortTitle}</strong><small>{service.summary}</small></label>{selected && <div className="selected-controls"><label>Quantidade<input type="number" min="1" max="50" inputMode="numeric" {...form.register(`items.${index}.quantity`, { valueAsNumber: true })} /></label><label>Tipo ou tamanho aproximado<select {...form.register(`items.${index}.variant`)}><option value="">Selecione, se souber</option>{service.variants.map((variant) => <option key={variant} value={variant}>{variant}</option>)}</select></label></div>}</div>; })}
          {(() => { const index = fields.findIndex((field) => field.category === "outro"); const selected = index >= 0; return <div className={`selectable-service selectable-other ${selected ? "selected" : ""}`}><label><input type="checkbox" checked={selected} onChange={() => toggleService("outro")} /><span className="select-check"><Check aria-hidden="true" /></span><Plus aria-hidden="true" /><strong>Outro artigo têxtil</strong><small>Indique uma peça que não encontra na lista.</small></label>{selected && <div className="selected-controls"><label>Quantidade<input type="number" min="1" max="50" inputMode="numeric" {...form.register(`items.${index}.quantity`, { valueAsNumber: true })} /></label><label>Que artigo é?<input type="text" maxLength={100} placeholder="Ex.: cabeceira estofada" {...form.register(`items.${index}.variant`)} /></label></div>}</div>; })()}
        </div><ErrorMessage message={errors.items?.message} />
      </fieldset>}

      {step === 1 && <fieldset className="form-step"><legend><span>Passo 2 de 4</span>Partilhe os detalhes</legend><p className="step-intro">Não precisa de conhecer o material exato. Indique apenas o que sabe e as necessidades que gostaria de avaliar.</p>
        <div className="form-section"><h3>Modalidade preferida</h3><div className="radio-cards">{[["domicilio", "Serviço ao domicílio", "Sempre que o local e o artigo o permitam."], ["recolha-entrega", "Recolha e entrega", "Sujeita a confirmação da peça e deslocação."], ["aconselhamento", "Preciso de aconselhamento", "A equipa recomenda a modalidade adequada."]].map(([value, label, copy]) => <label key={value}><input type="radio" value={value} {...form.register("serviceMode")} /><span><strong>{label}</strong><small>{copy}</small></span></label>)}</div></div>
        <div className="item-details">{fields.map((field, index) => { const service = getServiceById(field.category); return <article key={field.id}><div className="item-detail-title"><span>{String(index + 1).padStart(2, "0")}</span><h3>{service?.title || "Outro artigo têxtil"}</h3><small>Quantidade: {watchedItems[index]?.quantity || 1}</small></div><div className="field-grid"><label>Material<select {...form.register(`items.${index}.material`)}>{materials.map((material) => <option key={material} value={material}>{material}</option>)}</select></label><label className="field-span">Manchas, odores ou necessidades específicas<textarea rows={3} maxLength={500} placeholder="Ex.: mancha antiga no assento; odor que gostaria de avaliar." {...form.register(`items.${index}.conditionNotes`)} /></label></div></article>; })}</div>
        <label className="full-field">Observações gerais <span>(opcional)</span><textarea rows={4} maxLength={1000} placeholder="Partilhe qualquer outra informação útil sobre o conjunto do pedido." {...form.register("generalNotes")} /></label>
        <div className="future-note"><Plus aria-hidden="true" /><p><strong>Fotografias numa fase futura.</strong> O pedido já está preparado para receber fotografias quando esta funcionalidade for ativada, mas não é possível carregá-las neste MVP.</p></div>
      </fieldset>}

      {step === 2 && <fieldset className="form-step" id="localizacao"><legend><span>Passo 3 de 4</span>Localização e preferência</legend><p className="step-intro">A cobertura principal é Leiria e cerca de 30 km. A equipa confirma a elegibilidade; não recusamos automaticamente pedidos fora desta referência.</p>
        <div className="field-grid"><label>Código postal<input type="text" inputMode="numeric" autoComplete="postal-code" placeholder="0000-000" maxLength={8} aria-invalid={!!errors.postalCode} aria-describedby={errors.postalCode ? "postal-error" : undefined} {...form.register("postalCode")} /><ErrorMessage id="postal-error" message={errors.postalCode?.message} /></label><label>Localidade<input type="text" autoComplete="address-level2" maxLength={100} aria-invalid={!!errors.locality} aria-describedby={errors.locality ? "locality-error" : undefined} {...form.register("locality")} /><ErrorMessage id="locality-error" message={errors.locality?.message} /></label><label>Data preferida <span>(opcional)</span><input type="date" aria-invalid={!!errors.preferredDate} aria-describedby={errors.preferredDate ? "date-error" : undefined} {...form.register("preferredDate")} /><small>É uma preferência, não disponibilidade confirmada.</small><ErrorMessage id="date-error" message={errors.preferredDate?.message} /></label><label>Período preferido<select {...form.register("preferredPeriod")}><option value="indiferente">Indiferente</option><option value="manha">Manhã</option><option value="tarde">Tarde</option></select></label><label className="field-span">Informação de acesso <span>(opcional)</span><textarea rows={4} maxLength={500} placeholder="Ex.: terceiro andar sem elevador, estacionamento condicionado, acesso por escadas." {...form.register("accessNotes")} /></label></div>
        <div className="coverage-info"><strong>Fora dos 30 km aproximados?</strong><p>Envie o pedido na mesma. A deslocação é analisada em função da morada, do artigo e da modalidade.</p></div>
      </fieldset>}

      {step === 3 && <fieldset className="form-step"><legend><span>Passo 4 de 4</span>Contacto e revisão</legend><p className="step-intro">Precisamos de pelo menos um contacto válido para responder ao pedido. O email e o telefone não são guardados permanentemente no seu browser.</p>
        <div className="field-grid"><label>Nome<input type="text" autoComplete="name" maxLength={120} aria-invalid={!!errors.customerName} aria-describedby={errors.customerName ? "name-error" : undefined} {...form.register("customerName")} /><ErrorMessage id="name-error" message={errors.customerName?.message} /></label><label>Email <span>(email ou telefone)</span><input type="email" autoComplete="email" maxLength={160} aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-error" : undefined} {...form.register("email")} /><ErrorMessage id="email-error" message={errors.email?.message} /></label><label>Telefone <span>(email ou telefone)</span><input type="tel" inputMode="tel" autoComplete="tel" maxLength={30} aria-invalid={!!errors.phone} aria-describedby={errors.phone ? "phone-error" : undefined} {...form.register("phone")} /><ErrorMessage id="phone-error" message={errors.phone?.message} /></label><label>Contacto preferido<select aria-invalid={!!errors.preferredContactMethod} aria-describedby={errors.preferredContactMethod ? "contact-method-error" : undefined} {...form.register("preferredContactMethod")}><option value="email">Email</option><option value="telefone">Telefone</option></select><ErrorMessage id="contact-method-error" message={errors.preferredContactMethod?.message} /></label></div>
        <section className="request-review" aria-labelledby="review-title"><div className="review-heading"><div><span>Revisão</span><h3 id="review-title">Confirme o seu pedido</h3></div></div><div className="review-grid"><div><strong>Artigos</strong><ul>{watchedItems.map((item, index) => <li key={`${item.category}-${index}`}>{item.quantity} × {getServiceById(item.category)?.shortTitle || item.variant || "Outro artigo"}{item.variant && item.category !== "outro" ? ` — ${item.variant}` : ""}</li>)}</ul><button type="button" onClick={() => setStep(0)}>Editar artigos</button></div><div><strong>Modalidade</strong><p>{{ domicilio: "Ao domicílio", "recolha-entrega": "Recolha e entrega", aconselhamento: "Aconselhamento" }[serviceMode]}</p><button type="button" onClick={() => setStep(1)}>Editar detalhes</button></div><div><strong>Localização</strong><p>{postalCode || "—"} {locality}</p><p>{preferredDate ? `Preferência: ${preferredDate}` : "Sem data preferida"}</p><button type="button" onClick={() => setStep(2)}>Editar localização</button></div></div></section>
        <div className="consents"><label><input type="checkbox" aria-invalid={!!errors.privacyConsent} aria-describedby={errors.privacyConsent ? "privacy-error" : undefined} {...form.register("privacyConsent")} /><span>Li a <Link href="/privacidade" target="_blank">política de privacidade</Link> e autorizo o tratamento dos dados para análise e resposta a este pedido. <strong>Obrigatório</strong></span></label><ErrorMessage id="privacy-error" message={errors.privacyConsent?.message} /><label><input type="checkbox" {...form.register("marketingConsent")} /><span>Quero receber novidades e comunicações da Marimar. <em>Opcional; pode retirar o consentimento.</em></span></label></div>
        <div className="submission-note"><CircleAlert aria-hidden="true" /><p><strong>Este é um pedido sujeito a análise.</strong> O envio não confirma automaticamente o preço, a deslocação, a data ou o agendamento.</p></div>
      </fieldset>}

      <div className="form-actions">{step > 0 ? <button className="button button-secondary" type="button" onClick={() => setStep((current) => current - 1)}><ArrowLeft aria-hidden="true" />Anterior</button> : <span />}{step < 3 ? <button className="button" type="button" onClick={nextStep}>Continuar <ArrowRight aria-hidden="true" /></button> : <button className="button" type="submit" disabled={form.formState.isSubmitting}>{form.formState.isSubmitting ? <><LoaderCircle className="spin" aria-hidden="true" />A enviar…</> : <>Enviar pedido <ArrowRight aria-hidden="true" /></>}</button>}</div>
      {step === 0 && fields.length > 0 && <button className="clear-items" type="button" onClick={() => { remove(); form.setValue("services", []); }}><Minus aria-hidden="true" />Limpar seleção</button>}
    </form>
  );
}

export function QuoteWizard({ initialService, submissionEndpoint = siteConfig.leadsEndpoint }: { initialService?: ServiceId; submissionEndpoint?: string | null }) {
  if (!submissionEndpoint) return <QuoteUnavailable />;
  return <InteractiveQuoteWizard initialService={initialService} submissionEndpoint={submissionEndpoint} />;
}

export function QuoteWizardFromSearchParams() {
  const searchParams = useSearchParams();
  const value = searchParams.get("servico");
  const initialService = value && serviceIds.includes(value as ServiceId) ? value as ServiceId : undefined;
  return <QuoteWizard initialService={initialService} />;
}
