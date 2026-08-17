import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { QuoteWizard } from "@/components/quote/quote-wizard";

describe("QuoteWizard", () => {
  it("pré-seleciona o serviço recebido pela página", async () => {
    render(<QuoteWizard initialService="sofas" submissionEndpoint="/api/leads" />);
    const sofa = screen.getByRole("checkbox", { name: /Sofás/i });
    await waitFor(() => expect(sofa).toBeChecked());
    expect(screen.getByLabelText("Quantidade")).toHaveValue(1);
  });

  it("não avança sem pelo menos um artigo", async () => {
    const user = userEvent.setup();
    render(<QuoteWizard submissionEndpoint="/api/leads" />);
    await user.click(screen.getByRole("button", { name: /Continuar/i }));
    expect(await screen.findAllByText("Selecione pelo menos um artigo.")).not.toHaveLength(0);
    expect(screen.getByText("O que precisa de limpar?")).toBeInTheDocument();
  });

  it("não recolhe dados quando o endpoint de pedidos não está configurado", () => {
    render(<QuoteWizard submissionEndpoint={null} />);
    expect(screen.getByRole("heading", { name: /orçamento por contacto direto/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /WhatsApp/i })).toHaveAttribute("href", "https://wa.me/351911898896");
    expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
  });
});
