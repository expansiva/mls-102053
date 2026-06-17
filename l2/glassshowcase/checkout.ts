/// <mls fileReference="_102053_/l2/glassshowcase/checkout.ts" enhancement="_102020_/l2/enhancementAura"/>
// =============================================================================
// GLASS SHOWCASE — CHECKOUT (Pagamento)
// =============================================================================
// Form controlado (campos mascarados + toggles). Accordion com conteúdo ESTÁTICO
// (resumo do pedido) → não precisa de delegação. Confirmar com loading.
import { html, TemplateResult } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { StateLitElement } from '/_102029_/l2/stateLitElement.js';

import '/_102054_/l2/molecules/groupentertext/ml-floating-text-input';
import '/_102054_/l2/molecules/groupenterboolean/ml-toggle-switch';
import '/_102054_/l2/molecules/groupexpandcontent/ml-accordion';
import '/_102054_/l2/molecules/grouptriggeraction/ml-button-standard';

@customElement('glassshowcase--checkout')
export class GlassShowcaseCheckout extends StateLitElement {
  @state() private cardName = '';
  @state() private cardNumber = '';
  @state() private expiry = '';
  @state() private cpf = '';
  @state() private saveCard = true;
  @state() private diffAddress = false;
  @state() private loading = false;

  private onCardName(e: CustomEvent) {
    this.cardName = e.detail.value;
  }
  private onCardNumber(e: CustomEvent) {
    this.cardNumber = e.detail.value;
  }
  private onExpiry(e: CustomEvent) {
    this.expiry = e.detail.value;
  }
  private onCpf(e: CustomEvent) {
    this.cpf = e.detail.value;
  }
  private onSaveCard(e: CustomEvent) {
    this.saveCard = e.detail.value;
  }
  private onDiffAddress(e: CustomEvent) {
    this.diffAddress = e.detail.value;
  }
  private onConfirm() {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
    }, 1800);
  }

  render(): TemplateResult {
    return html`
      <div class="page">
        <div class="shell">
          <header class="head">
            <div class="brand">◆ Aurora</div>
            <h1 class="title">Finalizar pagamento</h1>
          </header>

          <div class="grid">
            <!-- Formulário -->
            <section class="panel">
              <h2 class="panel-title">Dados do cartão</h2>
              <div class="fields">
                <groupentertext--ml-floating-text-input
                  name="cardName"
                  .value=${this.cardName}
                  .isEditing=${true}
                  @input=${this.onCardName}
                >
                  <Label>Nome impresso no cartão</Label>
                </groupentertext--ml-floating-text-input>

                <groupentertext--ml-floating-text-input
                  name="cardNumber"
                  mask="#### #### #### ####"
                  .value=${this.cardNumber}
                  .isEditing=${true}
                  @input=${this.onCardNumber}
                >
                  <Label>Número do cartão</Label>
                </groupentertext--ml-floating-text-input>

                <div class="two-col">
                  <groupentertext--ml-floating-text-input
                    name="expiry"
                    mask="##/##"
                    .value=${this.expiry}
                    .isEditing=${true}
                    @input=${this.onExpiry}
                  >
                    <Label>Validade</Label>
                  </groupentertext--ml-floating-text-input>
                  <groupentertext--ml-floating-text-input
                    name="cpf"
                    mask="###.###.###-##"
                    .value=${this.cpf}
                    .isEditing=${true}
                    @input=${this.onCpf}
                  >
                    <Label>CPF do titular</Label>
                  </groupentertext--ml-floating-text-input>
                </div>
              </div>

              <div class="toggles">
                <groupenterboolean--ml-toggle-switch
                  name="saveCard"
                  .value=${this.saveCard}
                  .isEditing=${true}
                  @change=${this.onSaveCard}
                >
                  <Label>Salvar cartão para a próxima compra</Label>
                </groupenterboolean--ml-toggle-switch>
                <groupenterboolean--ml-toggle-switch
                  name="diffAddress"
                  .value=${this.diffAddress}
                  .isEditing=${true}
                  @change=${this.onDiffAddress}
                >
                  <Label>Usar endereço de cobrança diferente</Label>
                </groupenterboolean--ml-toggle-switch>
              </div>
            </section>

            <!-- Resumo -->
            <aside class="panel">
              <h2 class="panel-title">Resumo</h2>
              <groupexpandcontent--ml-accordion multiple="true">
                <Section title="Itens (3)" expanded>
                  Plano Aurora Pro — R$ 49,00<br />
                  Armazenamento extra — R$ 19,00<br />
                  Suporte prioritário — R$ 12,00
                </Section>
                <Section title="Cupom / desconto">Nenhum cupom aplicado.</Section>
                <Section title="Total">
                  Subtotal: R$ 80,00<br />
                  Impostos: R$ 6,40<br />
                  <strong>Total: R$ 86,40</strong>
                </Section>
              </groupexpandcontent--ml-accordion>

              <div class="actions">
                <grouptriggeraction--ml-button-standard
                  data-variant="primary"
                  .loading=${this.loading}
                  @action=${this.onConfirm}
                >
                  <Label>Confirmar pagamento</Label>
                </grouptriggeraction--ml-button-standard>
                <grouptriggeraction--ml-button-standard data-variant="ghost">
                  <Label>Cancelar</Label>
                </grouptriggeraction--ml-button-standard>
              </div>
            </aside>
          </div>
        </div>
      </div>
    `;
  }
}
