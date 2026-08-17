# Marimar — website institucional e pedidos de orçamento

Website em português de Portugal para a Marimar, especialista em limpeza, higienização e revitalização de estofos e superfícies têxteis na região de Leiria.

O projeto usa Next.js 16 com App Router, React, TypeScript strict, Tailwind CSS 4 para a base de estilos, React Hook Form, Zod, Resend e Vitest. Não inclui CMS, autenticação, base de dados, pagamentos, cookies não essenciais ou analytics ativos.

## Executar localmente

Requisitos: Node.js compatível com Next.js 16 e pnpm 11.

```bash
pnpm install
cp .env.example .env.local
pnpm dev
```

Abrir `http://localhost:3000`.

Validações disponíveis:

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

## Variáveis de ambiente

| Variável | Obrigatória | Utilização |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Produção | URL canónica, sitemap, robots e dados estruturados. |
| `NEXT_PUBLIC_PHONE` | Não | Telefone público. O botão é ocultado se estiver vazio. |
| `NEXT_PUBLIC_EMAIL` | Não | Email público. O botão é ocultado se estiver vazio. |
| `NEXT_PUBLIC_WHATSAPP` | Não | Número internacional para `wa.me`. O botão é ocultado se estiver vazio. |
| `NEXT_PUBLIC_SCHEDULE` | Não | Horário público, apenas depois de confirmado. |
| `RESEND_API_KEY` | Produção | Chave server-side do Resend. Nunca é exposta ao browser. |
| `LEADS_TO_EMAIL` | Produção | Caixa que recebe os pedidos validados. |
| `FROM_EMAIL` | Produção | Remetente verificado no Resend. |

Em desenvolvimento, a ausência do Resend ativa um adaptador controlado que confirma apenas a referência do pedido e a contagem de categorias no terminal, sem imprimir contactos ou observações. Em produção, a ausência de qualquer uma das três variáveis de email devolve um erro: o frontend nunca simula sucesso.

## Comportamento do pedido de orçamento

O fluxo em `/orcamento` tem quatro passos:

1. Artigos, quantidades e dimensão aproximada.
2. Materiais, estado, observações e modalidade preferida.
3. Código postal, localidade e preferência de data/período.
4. Contacto, consentimentos e revisão editável.

O estado permanece em memória enquanto o utilizador avança e recua, mas os dados pessoais não são guardados em `localStorage`, cookies ou analytics. A data é sempre uma preferência; o envio nunca é apresentado como agendamento confirmado.

`POST /api/leads` aplica validação Zod server-side, limite de 32 KB, honeypot, deduplicação básica durante dois minutos, prevenção de pedidos concorrentes idênticos e escaping do conteúdo enviado por email. A proteção em memória é adequada ao MVP, mas não substitui rate limiting distribuído numa fase com maior volume.

As interfaces `LeadNotifier`, `AvailabilityProvider`, `PricingProvider` e `PhotoStorageProvider` deixam pontos de integração claros sem ativar calendário, preços, fotografias ou armazenamento.

## Conteúdo centralizado

- Configuração comercial: `src/config/site.ts`
- Serviços: `src/data/services.ts`
- FAQ: `src/data/faq.ts`
- Schema do pedido: `src/lib/lead-schema.ts`
- Integração de email: `src/lib/integrations/lead-notifier.ts`

Não duplicar contactos, raio, região ou dados legais diretamente nos componentes. Um contacto não configurado deve continuar oculto.

## Dados ainda necessários do proprietário

Antes do lançamento, o responsável da Marimar deve fornecer ou confirmar:

- telefone, email, WhatsApp e horário público;
- nome legal, NIF, morada fiscal e contacto de privacidade;
- domínio público final;
- credenciais Resend, domínio de envio e email de destino;
- condições comerciais e meios de pagamento efetivamente aceites;
- política de retenção e eliminação dos pedidos;
- claims técnicos ou comerciais que possam ser comprovados.

Os textos legais incluídos são uma base técnica e devem ser revistos pelo responsável da empresa e, quando adequado, por aconselhamento jurídico antes do lançamento.

## Imagens

O website evita fotografias genéricas e usa composições CSS inspiradas em tecidos. `public/og.png` é uma imagem social original gerada para a direção visual deste MVP. Antes do lançamento, deve ser confirmada a sua adequação e podem ser adicionadas fotografias reais da Marimar — macros de fibras, costuras, equipamentos e processos — com direitos de utilização documentados.

Se forem adicionadas fotografias reais, otimizar com `next/image`, reservar dimensões e fornecer texto alternativo útil. Não publicar antes/depois encenados nem imagens sem licença clara.

## SEO e privacidade

Estão implementados metadata por página, canonical, Open Graph, Twitter cards, sitemap, robots, manifest, ícone, breadcrumbs e JSON-LD `LocalBusiness` com `areaServed` e catálogo dos seis serviços. Dados ausentes não são inventados nos dados estruturados.

O MVP não utiliza cookies não essenciais nem trackers, por isso não apresenta banner de cookies. A interface de analytics é um no-op preparado para eventos não sensíveis; qualquer ativação futura deve ser precedida de uma decisão de privacidade e nunca receber valores do formulário.

## Publicação na Vercel

1. Importar o repositório na Vercel.
2. Configurar todas as variáveis de produção.
3. Confirmar que `NEXT_PUBLIC_SITE_URL` usa o domínio HTTPS final.
4. Verificar o domínio de envio no Resend.
5. Executar um pedido real e um cenário de falha antes de anunciar o website.

Nenhuma publicação foi efetuada por este trabalho.

## Checklist de lançamento

- [ ] Confirmar telefone, email, WhatsApp e horário.
- [ ] Confirmar nome legal, morada fiscal, NIF e contacto de privacidade.
- [ ] Rever os textos legais.
- [ ] Adicionar fotografias reais e confirmar direitos de utilização.
- [ ] Confirmar claims comerciais e técnicos.
- [ ] Configurar domínio e `NEXT_PUBLIC_SITE_URL`.
- [ ] Configurar Resend, domínio de envio e email de destino.
- [ ] Testar pedidos reais e respostas de erro.
- [ ] Testar spam e submissões duplicadas.
- [ ] Testar em iPhone, Android e desktop.
- [ ] Validar acessibilidade por teclado.
- [ ] Validar sitemap, robots, canonical e JSON-LD.
- [ ] Rever a imagem Open Graph em partilhas reais.
- [ ] Configurar HTTPS.
- [ ] Configurar Search Console e perfil empresarial local.
- [ ] Definir política de retenção e eliminação de pedidos.
- [ ] Configurar backups ou arquivo dos pedidos.
- [ ] Só ativar analytics após decisão de privacidade.
- [ ] Fazer um último teste de performance.
- [ ] Confirmar que nenhum ambiente de produção contém dados fictícios.
