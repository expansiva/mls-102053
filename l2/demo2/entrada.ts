/// <mls fileReference="_102053_/l2/demo2/entrada.ts" enhancement="_102020_/l2/enhancementAura"/>
// =============================================================================
// DEMO 2 — ENTRADA · componentes do mls-102054 (reimplementação standalone)
// =============================================================================
// Layout/dados idênticos ao demo1/demo3 (base comparável). Só mudam: as tags
// (sem sufixo, = 102040), os imports (102054) e o rótulo da demo.
import { html, TemplateResult } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { StateLitElement } from '/_102029_/l2/stateLitElement.js';

import '/_102054_/l2/molecules/groupenterboolean/ml-toggle-switch';
import '/_102054_/l2/molecules/groupenterdate/ml-date-picker';
import '/_102054_/l2/molecules/groupenterdatetime/ml-datetime-picker';
import '/_102054_/l2/molecules/groupentermoney/ml-currency-input';
import '/_102054_/l2/molecules/groupenternumber/ml-number-stepper';
import '/_102054_/l2/molecules/groupenternumber/ml-range-slider';
import '/_102054_/l2/molecules/groupentertext/ml-floating-text-input';
import '/_102054_/l2/molecules/groupentertext/ml-password-strength-input';
import '/_102054_/l2/molecules/groupentertext/ml-tag-input';
import '/_102054_/l2/molecules/groupentertime/ml-clock-time-picker';

@customElement('demo2--entrada-102053')
export class Demo2Entrada extends StateLitElement {
  @state() private tgOn = true;
  @state() private tgOff = false;
  @state() private date = '2026-03-15';
  @state() private dt = '2026-03-15T09:30';
  @state() private price = 1299.9;
  @state() private budget = 5000;
  @state() private qty = 3;
  @state() private rangeLow = 200;
  @state() private rangeHigh = 750;
  @state() private fullName = 'Maria Silva';
  @state() private username = 'maria.silva';
  @state() private password = 'Senha123!';
  @state() private tags = 'design, ux';
  @state() private time = '09:30';

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
            <div class="brand">◆ collab · 102054</div>
            <h1 class="title">Entrada — reimplementação (102054)</h1>
            <p class="subtitle">toggle · date · datetime · money · number · text · time</p>
          </header>

          <section class="block">
            <h2 class="block-title">groupEnterBoolean — ml-toggle-switch</h2>
            <div class="grid">
              <groupenterboolean--ml-toggle-switch .value=${this.tgOn} @change=${this.upd('tgOn')}>
                <Label>Notificações por e-mail</Label>
                <Helper>Resumo diário</Helper>
              </groupenterboolean--ml-toggle-switch>
              <groupenterboolean--ml-toggle-switch .value=${this.tgOff} @change=${this.upd('tgOff')}>
                <Label>Modo escuro</Label>
                <Helper>Tema do sistema</Helper>
              </groupenterboolean--ml-toggle-switch>
            </div>
          </section>

          <section class="block">
            <h2 class="block-title">groupEnterDate / groupEnterDatetime / groupEnterTime</h2>
            <div class="grid">
              <groupenterdate--ml-date-picker .value=${this.date} locale="pt-BR" @change=${this.upd('date')}>
                <Label>Data de início</Label>
                <Helper>Selecionada: ${this.date ?? '—'}</Helper>
              </groupenterdate--ml-date-picker>
              <groupenterdatetime--ml-datetime-picker .value=${this.dt} locale="pt-BR" minute-step="15" @change=${this.upd('dt')}>
                <Label>Agendamento</Label>
                <Helper>Selecionado: ${this.dt ?? '—'}</Helper>
              </groupenterdatetime--ml-datetime-picker>
              <groupentertime--ml-clock-time-picker .value=${this.time} locale="pt-BR" minute-step="5" @change=${this.upd('time')}>
                <Label>Horário</Label>
                <Helper>Selecionado: ${this.time ?? '—'}</Helper>
              </groupentertime--ml-clock-time-picker>
            </div>
          </section>

          <section class="block">
            <h2 class="block-title">groupEnterMoney — ml-currency-input</h2>
            <div class="grid">
              <groupentermoney--ml-currency-input .value=${this.price} currency="BRL" locale="pt-BR" @change=${this.upd('price')}>
                <Label>Preço</Label>
                <Helper>Valor de venda</Helper>
              </groupentermoney--ml-currency-input>
              <groupentermoney--ml-currency-input .value=${this.budget} currency="USD" locale="en-US" min="0" max="10000" @change=${this.upd('budget')}>
                <Label>Budget (USD)</Label>
              </groupentermoney--ml-currency-input>
            </div>
          </section>

          <section class="block">
            <h2 class="block-title">groupEnterNumber — ml-number-stepper / ml-range-slider</h2>
            <div class="grid">
              <groupenternumber--ml-number-stepper .value=${this.qty} min="0" max="10" step="1" @change=${this.upd('qty')}>
                <Label>Quantidade</Label>
                <Helper>Selecionado: ${this.qty}</Helper>
              </groupenternumber--ml-number-stepper>
              <groupenternumber--ml-range-slider
                .value=${this.rangeLow}
                .valueHigh=${this.rangeHigh}
                min="0"
                max="1000"
                step="50"
                locale="pt-BR"
                @change=${(e: CustomEvent) => {
                  this.rangeLow = e.detail?.value ?? this.rangeLow;
                  this.rangeHigh = e.detail?.valueHigh ?? this.rangeHigh;
                }}
              >
                <Label>Faixa de preço</Label>
                <Helper>${this.rangeLow} – ${this.rangeHigh}</Helper>
                <Prefix>R$</Prefix>
              </groupenternumber--ml-range-slider>
            </div>
          </section>

          <section class="block">
            <h2 class="block-title">groupEnterText — floating / password / tag</h2>
            <div class="grid">
              <groupentertext--ml-floating-text-input .value=${this.fullName} @change=${this.upd('fullName')}>
                <Label>Nome completo</Label>
                <Helper>Como no documento</Helper>
              </groupentertext--ml-floating-text-input>
              <groupentertext--ml-floating-text-input .value=${this.username} @change=${this.upd('username')}>
                <Label>Usuário</Label>
              </groupentertext--ml-floating-text-input>
              <groupentertext--ml-password-strength-input .value=${this.password} @change=${this.upd('password')}>
                <Label>Senha</Label>
                <Helper>Use letras, números e símbolos</Helper>
              </groupentertext--ml-password-strength-input>
              <groupentertext--ml-tag-input .value=${this.tags} @change=${this.upd('tags')}>
                <Label>Tags</Label>
                <Helper>Enter ou vírgula para adicionar</Helper>
              </groupentertext--ml-tag-input>
            </div>
          </section>
        </div>
      </div>
    `;
  }
}
