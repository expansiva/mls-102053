/// <mls fileReference="_102053_/l2/glassshowcase/demolote5.ts" enhancement="_102020_/l2/enhancementAura"/>
// =============================================================================
// GLASS SHOWCASE — DEMO LOTE 5 (entrada)
// =============================================================================
import { html, TemplateResult } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { StateLitElement } from '/_102029_/l2/stateLitElement.js';

import '/_102054_/l2/molecules/groupenternumber/ml-number-stepper';
import '/_102054_/l2/molecules/groupenternumber/ml-range-slider';
import '/_102054_/l2/molecules/groupentermoney/ml-currency-input';
import '/_102054_/l2/molecules/groupentertext/ml-password-strength-input';
import '/_102054_/l2/molecules/groupentertext/ml-tag-input';
import '/_102054_/l2/molecules/groupselectone/ml-combobox';
import '/_102054_/l2/molecules/groupselectone/ml-card-selector';
import '/_102054_/l2/molecules/groupselectmany/ml-popover-multi-select';
import '/_102054_/l2/molecules/groupsearchcontent/ml-search-bar';
import '/_102054_/l2/molecules/groupselectfileforupload/ml-file-upload-dropzone';

@customElement('glassshowcase--demolote5-102053')
export class GlassShowcaseDemoLote5 extends StateLitElement {
  @state() private qty = 2;
  @state() private priceLow = 200;
  @state() private priceHigh = 800;
  @state() private price = 129.9;
  @state() private password = 'Senha1!';
  @state() private tags = 'design, glass, lit';
  @state() private fruit = 'apple';
  @state() private tier = 'pro';
  @state() private langs = 'lit,ts';
  @state() private query: string | null = null;

  render(): TemplateResult {
    return html`
      <div class="page">
        <div class="shell">
          <header class="head">
            <div class="brand">◆ Aurora</div>
            <h1 class="title">Lote 5 — Entrada</h1>
            <p class="subtitle">stepper · range · currency · password · tags · combobox · cards · multi · search · upload</p>
          </header>

          <section class="block">
            <h2 class="block-title">Number Stepper</h2>
            <groupenternumber--ml-number-stepper
              .value=${this.qty}
              min="0"
              max="10"
              step="1"
              @input=${(e: CustomEvent) => {
                this.qty = e.detail.value;
              }}
            >
              <Label>Quantidade</Label>
              <Helper>Selecionado: ${this.qty}</Helper>
            </groupenternumber--ml-number-stepper>
          </section>

          <section class="block">
            <h2 class="block-title">Range Slider</h2>
            <groupenternumber--ml-range-slider
              .value=${this.priceLow}
              .valueHigh=${this.priceHigh}
              min="0"
              max="1000"
              step="50"
              locale="pt-BR"
              @input=${(e: CustomEvent) => {
                this.priceLow = e.detail.value.min;
                this.priceHigh = e.detail.value.max;
              }}
            >
              <Label>Faixa de preço</Label>
              <Helper>${this.priceLow} – ${this.priceHigh}</Helper>
              <Prefix>R$</Prefix>
            </groupenternumber--ml-range-slider>
          </section>

          <section class="block">
            <h2 class="block-title">Currency Input</h2>
            <groupentermoney--ml-currency-input
              .value=${this.price}
              currency="BRL"
              locale="pt-BR"
              @input=${(e: CustomEvent) => {
                this.price = e.detail.value;
              }}
            >
              <Label>Preço</Label>
              <Helper>Digite o valor em centavos</Helper>
            </groupentermoney--ml-currency-input>
          </section>

          <section class="block">
            <h2 class="block-title">Password Strength</h2>
            <groupentertext--ml-password-strength-input
              .value=${this.password}
              min-length="8"
              required
              @input=${(e: CustomEvent) => {
                this.password = e.detail.value;
              }}
            >
              <Label>Senha</Label>
              <Helper>Use letras, números e símbolos</Helper>
            </groupentertext--ml-password-strength-input>
          </section>

          <section class="block">
            <h2 class="block-title">Tag Input</h2>
            <groupentertext--ml-tag-input
              .value=${this.tags}
              @input=${(e: CustomEvent) => {
                this.tags = e.detail.value;
              }}
            >
              <Label>Tags</Label>
              <Helper>Enter ou vírgula para adicionar</Helper>
            </groupentertext--ml-tag-input>
          </section>

          <section class="block">
            <h2 class="block-title">Combobox</h2>
            <groupselectone--ml-combobox
              .value=${this.fruit}
              clearable
              @change=${(e: CustomEvent) => {
                this.fruit = e.detail.value;
              }}
            >
              <Label>Fruta</Label>
              <Helper>Selecionado: ${this.fruit ?? '—'}</Helper>
              <Item value="apple">Maçã</Item>
              <Item value="banana">Banana</Item>
              <Item value="grape">Uva</Item>
              <Item value="orange">Laranja</Item>
            </groupselectone--ml-combobox>
          </section>

          <section class="block">
            <h2 class="block-title">Card Selector</h2>
            <groupselectone--ml-card-selector
              .value=${this.tier}
              searchable
              @change=${(e: CustomEvent) => {
                this.tier = e.detail.value;
              }}
            >
              <Label>Tier</Label>
              <Helper>Selecionado: ${this.tier}</Helper>
              <Item value="free"><strong>Free</strong><br /><span style="opacity:.7">R$ 0/mês</span></Item>
              <Item value="pro"><strong>Pro</strong><br /><span style="opacity:.7">R$ 49/mês</span></Item>
              <Item value="business"><strong>Business</strong><br /><span style="opacity:.7">R$ 149/mês</span></Item>
            </groupselectone--ml-card-selector>
          </section>

          <section class="block">
            <h2 class="block-title">Popover Multi Select</h2>
            <groupselectmany--ml-popover-multi-select
              searchable
              max-selection="3"
              .value=${this.langs}
              @change=${(e: CustomEvent) => {
                this.langs = e.detail.value;
              }}
            >
              <Label>Habilidades (máx. 3)</Label>
              <Helper>Selecionadas: ${this.langs || '—'}</Helper>
              <Item value="lit">Lit</Item>
              <Item value="ts">TypeScript</Item>
              <Item value="less">LESS</Item>
              <Item value="a11y">Acessibilidade</Item>
              <Item value="design">Design Systems</Item>
            </groupselectmany--ml-popover-multi-select>
          </section>

          <section class="block">
            <h2 class="block-title">Search Bar</h2>
            <groupsearchcontent--ml-search-bar
              .value=${this.query}
              @change=${(e: CustomEvent) => {
                this.query = e.detail.value;
              }}
            >
              <Label>Buscar</Label>
              <Helper>Digite para ver sugestões</Helper>
              <Suggestion value="lit">Lit</Suggestion>
              <Suggestion value="ts">TypeScript</Suggestion>
              <Suggestion value="less">LESS</Suggestion>
              <Suggestion value="glass">Glassmorphism</Suggestion>
            </groupsearchcontent--ml-search-bar>
          </section>

          <section class="block">
            <h2 class="block-title">File Upload Dropzone</h2>
            <groupselectfileforupload--ml-file-upload-dropzone multiple accept="image/*" max-files="5" max-size-kb="2048">
              <Label>Imagens</Label>
              <Helper>Até 5 imagens, máx. 2 MB cada</Helper>
            </groupselectfileforupload--ml-file-upload-dropzone>
          </section>
        </div>
      </div>
    `;
  }
}
