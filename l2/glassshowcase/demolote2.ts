/// <mls fileReference="_102053_/l2/glassshowcase/demolote2.ts" enhancement="_102020_/l2/enhancementAura"/>
// =============================================================================
// GLASS SHOWCASE — DEMO LOTE 2 (overlays)
// =============================================================================
// Reúne os overlays glass do lote 2 (mls-102054): banner, toast, modal, reveal.
// A página é o contrato de container (fundo escuro rico).
import { html, TemplateResult } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { StateLitElement } from '/_102029_/l2/stateLitElement.js';

import '/_102054_/l2/molecules/groupnotifyuser/ml-notify-banner';
import '/_102054_/l2/molecules/groupnotifyuser/ml-toast-notification';
import '/_102054_/l2/molecules/groupnotifyuser/ml-alert-modal';
import '/_102054_/l2/molecules/groupexpandcontent/ml-reveal-overlay';
import '/_102054_/l2/molecules/grouptriggeraction/ml-button-standard';

@customElement('glassshowcase--demolote2-102053')
export class GlassShowcaseDemoLote2 extends StateLitElement {
  @state() private bannerVisible = true;
  @state() private toastVisible = true;
  @state() private modalOpen = false;

  render(): TemplateResult {
    return html`
      <div class="page">
        <div class="shell">
          <header class="head">
            <div class="brand">◆ Aurora</div>
            <h1 class="title">Lote 2 — Overlays</h1>
            <p class="subtitle">banner · toast · modal · reveal (glassmorphism)</p>
          </header>

          <!-- Banner -->
          <section class="block">
            <h2 class="block-title">Notify Banner</h2>
            <groupnotifyuser--ml-notify-banner
              type="info"
              .visible=${this.bannerVisible}
              @dismiss=${() => {
                this.bannerVisible = false;
              }}
            >
              <Title>Atualização disponível</Title>
              <Message>Uma nova versão está pronta para instalar.</Message>
              <Action>Atualizar</Action>
            </groupnotifyuser--ml-notify-banner>
            ${!this.bannerVisible
              ? html`<grouptriggeraction--ml-button-standard
                  data-variant="ghost"
                  size="sm"
                  @action=${() => {
                    this.bannerVisible = true;
                  }}
                  ><Label>Mostrar banner</Label></grouptriggeraction--ml-button-standard
                >`
              : html``}
          </section>

          <!-- Toast -->
          <section class="block">
            <h2 class="block-title">Toast Notification</h2>
            <groupnotifyuser--ml-toast-notification
              type="success"
              .visible=${this.toastVisible}
              @dismiss=${() => {
                this.toastVisible = false;
              }}
            >
              <Title>Salvo!</Title>
              <Message>Suas alterações foram salvas.</Message>
            </groupnotifyuser--ml-toast-notification>
            ${!this.toastVisible
              ? html`<grouptriggeraction--ml-button-standard
                  data-variant="ghost"
                  size="sm"
                  @action=${() => {
                    this.toastVisible = true;
                  }}
                  ><Label>Mostrar toast</Label></grouptriggeraction--ml-button-standard
                >`
              : html``}
          </section>

          <!-- Modal -->
          <section class="block">
            <h2 class="block-title">Alert Modal</h2>
            <grouptriggeraction--ml-button-standard
              data-variant="primary"
              @action=${() => {
                this.modalOpen = true;
              }}
            >
              <Label>Abrir modal</Label>
            </grouptriggeraction--ml-button-standard>
          </section>

          <!-- Reveal -->
          <section class="block">
            <h2 class="block-title">Reveal Overlay</h2>
            <groupexpandcontent--ml-reveal-overlay multiple="true">
              <Label>Conteúdo oculto até revelar</Label>
              <Section title="Chave de API">sk-live-9f8a7b6c5d4e3f2a1b0c9d8e7f6a5b4c</Section>
              <Section title="Token">eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...</Section>
            </groupexpandcontent--ml-reveal-overlay>
          </section>
        </div>

        <groupnotifyuser--ml-alert-modal
          type="warning"
          .visible=${this.modalOpen}
          @dismiss=${() => {
            this.modalOpen = false;
          }}
        >
          <Title>Confirmar ação</Title>
          <Message>O scrim desfoca esta página atrás do modal.</Message>
          <Action>
            <grouptriggeraction--ml-button-standard
              data-variant="ghost"
              @action=${() => {
                this.modalOpen = false;
              }}
              ><Label>Cancelar</Label></grouptriggeraction--ml-button-standard
            >
            <grouptriggeraction--ml-button-standard
              data-variant="primary"
              @action=${() => {
                this.modalOpen = false;
              }}
              ><Label>Confirmar</Label></grouptriggeraction--ml-button-standard
            >
          </Action>
        </groupnotifyuser--ml-alert-modal>
      </div>
    `;
  }
}
