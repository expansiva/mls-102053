/// <mls fileReference="_102053_/l2/demo4/showcase-fase4.ts" enhancement="_102020_/l2/enhancementAura"/>
// =============================================================================
// DEMO 4 — SHOWCASE FASE 4: Dark mode via tokens
// =============================================================================
// Os componentes nao mudam. O .less desta pagina define tokens dark que
// sobrescrevem os defaults quando a classe .dark esta no container.

import { html, TemplateResult } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { StateLitElement } from '/_102029_/l2/stateLitElement.js';

import '/_102053_/l2/molecules/grouptriggeraction/ml-button-standard';
import '/_102053_/l2/molecules/groupentertext/ml-floating-text-input';
import '/_102053_/l2/molecules/groupenterboolean/ml-toggle-switch';
import '/_102053_/l2/molecules/groupexpandcontent/ml-accordion';

@customElement('demo4--showcase-fase4-102053')
export class Demo4ShowcaseFase4 extends StateLitElement {

  @state() private darkMode = false;
  @state() private toggleVal = true;
  @state() private toggleOff = false;

  private toggleDarkMode() {
    this.darkMode = !this.darkMode;
  }

  render(): TemplateResult {
    return html`
      <div class="showcase-container ${this.darkMode ? 'dark' : ''}">

        <div class="showcase-topbar">
          <div>
            <h1>Showcase Fase 4 — Dark Mode</h1>
            <p>Mesmos componentes, zero alteracao. Apenas tokens trocados via classe .dark</p>
          </div>
          <button class="showcase-toggle" @click=${this.toggleDarkMode}>
            ${this.darkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>

        <hr>

        <h2>Button Standard</h2>
        <div>
          <grouptriggeraction--ml-button-standard data-variant="primary">
            <Label>Primary</Label>
          </grouptriggeraction--ml-button-standard>

          <grouptriggeraction--ml-button-standard data-variant="secondary">
            <Label>Secondary</Label>
          </grouptriggeraction--ml-button-standard>

          <grouptriggeraction--ml-button-standard data-variant="danger">
            <Label>Danger</Label>
          </grouptriggeraction--ml-button-standard>

          <grouptriggeraction--ml-button-standard data-variant="ghost">
            <Label>Ghost</Label>
          </grouptriggeraction--ml-button-standard>

          <grouptriggeraction--ml-button-standard data-variant="link">
            <Label>Link</Label>
          </grouptriggeraction--ml-button-standard>
        </div>

        <h3>States</h3>
        <div>
          <grouptriggeraction--ml-button-standard data-variant="primary" disabled>
            <Label>Disabled</Label>
          </grouptriggeraction--ml-button-standard>

          <grouptriggeraction--ml-button-standard data-variant="primary" loading>
            <Label>Loading</Label>
          </grouptriggeraction--ml-button-standard>
        </div>

        <hr>

        <h2>Floating Text Input</h2>
        <div>
          <groupentertext--ml-floating-text-input
            .value=${''}
            placeholder="Digite algo..."
            .isEditing=${true}>
            <Label>Campo normal</Label>
            <Helper>Texto de ajuda</Helper>
          </groupentertext--ml-floating-text-input>
        </div>

        <div>
          <groupentertext--ml-floating-text-input
            .value=${'maria@'}
            error="E-mail invalido"
            .isEditing=${true}>
            <Label>Com erro</Label>
          </groupentertext--ml-floating-text-input>
        </div>

        <div>
          <groupentertext--ml-floating-text-input
            .value=${'Valor fixo'}
            disabled
            .isEditing=${true}>
            <Label>Desabilitado</Label>
          </groupentertext--ml-floating-text-input>
        </div>

        <hr>

        <h2>Toggle Switch</h2>
        <div>
          <groupenterboolean--ml-toggle-switch
            .value=${this.toggleVal}
            @change=${(e: CustomEvent) => { this.toggleVal = e.detail?.value; }}>
            <Label>Ativo</Label>
            <Helper>Toggle ligado</Helper>
          </groupenterboolean--ml-toggle-switch>
        </div>

        <div>
          <groupenterboolean--ml-toggle-switch
            .value=${this.toggleOff}
            @change=${(e: CustomEvent) => { this.toggleOff = e.detail?.value; }}>
            <Label>Inativo</Label>
          </groupenterboolean--ml-toggle-switch>
        </div>

        <div>
          <groupenterboolean--ml-toggle-switch
            .value=${false}
            error="Obrigatorio">
            <Label>Com erro</Label>
          </groupenterboolean--ml-toggle-switch>
        </div>

        <hr>

        <h2>Accordion</h2>
        <div>
          <groupexpandcontent--ml-accordion multiple>
            <Section title="Secao 1">Conteudo da primeira secao.</Section>
            <Section title="Secao 2">Conteudo da segunda secao.</Section>
            <Section title="Secao 3">Conteudo da terceira secao.</Section>
          </groupexpandcontent--ml-accordion>
        </div>

      </div>
    `;
  }
}
