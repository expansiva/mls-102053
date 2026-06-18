/// <mls fileReference="_102053_/l2/glassshowcase/demolote7.ts" enhancement="_102020_/l2/enhancementAura"/>
// =============================================================================
// GLASS SHOWCASE — DEMO LOTE 7 (pickers de data/hora)
// =============================================================================
import { html, TemplateResult } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { StateLitElement } from '/_102029_/l2/stateLitElement.js';

import '/_102054_/l2/molecules/groupenterdate/ml-date-picker';
import '/_102054_/l2/molecules/groupenterdatetime/ml-datetime-picker';
import '/_102054_/l2/molecules/groupentertime/ml-clock-time-picker';

@customElement('glassshowcase--demolote7-102053')
export class GlassShowcaseDemoLote7 extends StateLitElement {
  @state() private date: string | null = '2026-06-18';
  @state() private dt: string | null = '2026-06-18T14:30:00';
  @state() private time: string | null = '14:30';

  render(): TemplateResult {
    return html`
      <div class="page">
        <div class="shell">
          <header class="head">
            <div class="brand">◆ Aurora</div>
            <h1 class="title">Lote 7 — Pickers de Data/Hora</h1>
            <p class="subtitle">date-picker · datetime-picker · clock-time-picker</p>
          </header>

          <section class="block">
            <h2 class="block-title">Date Picker</h2>
            <groupenterdate--ml-date-picker
              .value=${this.date}
              locale="pt-BR"
              first-day-of-week="1"
              @change=${(e: CustomEvent) => {
                this.date = e.detail.value;
              }}
            >
              <Label>Data de início</Label>
              <Helper>Selecionada: ${this.date ?? '—'}</Helper>
            </groupenterdate--ml-date-picker>
          </section>

          <section class="block">
            <h2 class="block-title">Datetime Picker</h2>
            <groupenterdatetime--ml-datetime-picker
              .value=${this.dt}
              locale="pt-BR"
              minute-step="15"
              @change=${(e: CustomEvent) => {
                this.dt = e.detail.value;
              }}
            >
              <Label>Agendamento</Label>
              <Helper>Selecionado: ${this.dt ?? '—'}</Helper>
            </groupenterdatetime--ml-datetime-picker>
          </section>

          <section class="block">
            <h2 class="block-title">Clock Time Picker</h2>
            <groupentertime--ml-clock-time-picker
              .value=${this.time}
              locale="pt-BR"
              minute-step="5"
              @change=${(e: CustomEvent) => {
                this.time = e.detail.value;
              }}
            >
              <Label>Horário</Label>
              <Helper>Selecionado: ${this.time ?? '—'}</Helper>
            </groupentertime--ml-clock-time-picker>
          </section>
        </div>
      </div>
    `;
  }
}
