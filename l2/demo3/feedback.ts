/// <mls fileReference="_102053_/l2/demo3/feedback.ts" enhancement="_102020_/l2/enhancementAura"/>
// GERADO a partir de todo/.demo-fragments/feedback.frag.ts — base comparável demo1/demo2/demo3.
import { html, TemplateResult } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { StateLitElement } from '/_102029_/l2/stateLitElement.js';

import '/_102055_/l2/molecules/groupnotifyuser/ml-notify-banner-glass';
import '/_102055_/l2/molecules/groupnotifyuser/ml-toast-notification-glass';
import '/_102055_/l2/molecules/groupnotifyuser/ml-alert-modal-glass';
import '/_102055_/l2/molecules/groupexpandcontent/ml-accordion-glass';
import '/_102055_/l2/molecules/groupexpandcontent/ml-collapsible-panel-glass';
import '/_102055_/l2/molecules/groupexpandcontent/ml-reveal-overlay-glass';
import '/_102055_/l2/molecules/grouprateitem/ml-star-rating-glass';
import '/_102055_/l2/molecules/grouprateitem/ml-emoji-mood-scale-glass';

@customElement('demo3--feedback-102053')
export class Demo3Feedback extends StateLitElement {
  @state() private stars = 3;
  @state() private mood = 4;
  @state() private modalOpen = false;

  private upd(key: string) {
    return (e: CustomEvent) => {
      (this as Record<string, unknown>)[key] = e.detail?.value;
    };
  }

  render(): TemplateResult {
    return html`
      <div class="page">
        <div class="shell">
          <header class="head">
            <div class="brand">◆ collab · 102055</div>
            <h1 class="title">Feedback & Conteúdo — glass por herança (102055)</h1>
            <p class="subtitle">banner · toast · modal · accordion · collapsible · reveal · rating</p>
          </header>

          <section class="block">
            <h2 class="block-title">groupNotifyUser — banner / toast / modal</h2>
            <div class="grid">
              <groupnotifyuser--ml-notify-banner-glass type="success" visible="true">
                <Title>Tudo certo</Title>
                <Message>As alterações foram salvas com sucesso.</Message>
              </groupnotifyuser--ml-notify-banner-glass>
              <groupnotifyuser--ml-toast-notification-glass type="info" visible="true">
                <Title>Atualização disponível</Title>
                <Message>Uma nova versão está pronta.</Message>
              </groupnotifyuser--ml-toast-notification-glass>
              <div>
                <button type="button" @click=${() => { this.modalOpen = true; }}>Abrir modal</button>
                <groupnotifyuser--ml-alert-modal-glass .visible=${this.modalOpen} @close=${() => { this.modalOpen = false; }}>
                  <Title>Atenção</Title>
                  <Message>Deseja confirmar esta ação?</Message>
                  <Action>
                    <button type="button" @click=${() => { this.modalOpen = false; }}>Entendi</button>
                  </Action>
                </groupnotifyuser--ml-alert-modal-glass>
              </div>
            </div>
          </section>

          <section class="block">
            <h2 class="block-title">groupExpandContent — accordion / collapsible / reveal</h2>
            <div class="grid">
              <groupexpandcontent--ml-accordion-glass multiple="true">
                <Label>Detalhes do projeto</Label>
                <Section title="Visão geral" expanded>Escopo do projeto e resultados esperados.</Section>
                <Section title="Cronograma">Entregas toda sexta-feira.</Section>
                <Section title="Riscos">Acompanhar atrasos de fornecedores.</Section>
              </groupexpandcontent--ml-accordion-glass>
              <groupexpandcontent--ml-collapsible-panel-glass>
                <Label>Perguntas frequentes</Label>
                <Section title="Como começar?" subtitle="Primeiros passos" icon="🚀" expanded>Crie a conta e siga o onboarding.</Section>
                <Section title="Posso cancelar?" subtitle="Assinatura">Sim, a qualquer momento.</Section>
              </groupexpandcontent--ml-collapsible-panel-glass>
              <groupexpandcontent--ml-reveal-overlay-glass multiple="true">
                <Label>Conteúdo oculto até revelar</Label>
                <Section title="Chave de API">sk-live-9f8a7b6c5d4e3f2a1b0c</Section>
              </groupexpandcontent--ml-reveal-overlay-glass>
            </div>
          </section>

          <section class="block">
            <h2 class="block-title">groupRateItem — star-rating / emoji-mood-scale</h2>
            <div class="grid">
              <grouprateitem--ml-star-rating-glass .value=${this.stars} min="1" max="5" @change=${this.upd('stars')}>
                <Label>Avaliação (${this.stars} ★)</Label>
                <Helper>Clique ou use as setas</Helper>
              </grouprateitem--ml-star-rating-glass>
              <grouprateitem--ml-emoji-mood-scale-glass .value=${this.mood} @change=${this.upd('mood')}>
                <Label>Como foi sua experiência? (${this.mood})</Label>
                <Item value="1">😡</Item>
                <Item value="2">🙁</Item>
                <Item value="3">😐</Item>
                <Item value="4">🙂</Item>
                <Item value="5">😍</Item>
              </grouprateitem--ml-emoji-mood-scale-glass>
            </div>
          </section>
        </div>
      </div>
    `;
  }
}
