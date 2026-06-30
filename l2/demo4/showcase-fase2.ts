/// <mls fileReference="_102053_/l2/demo4/showcase-fase2.ts" enhancement="_102020_/l2/enhancementAura"/>
// =============================================================================
// DEMO 4 — SHOWCASE FASE 2: className no host
// =============================================================================
// Demonstra que o consumidor pode passar classes extras via class.

import { html, TemplateResult } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { StateLitElement } from '/_102029_/l2/stateLitElement.js';

import '/_102053_/l2/molecules/grouptriggeraction/ml-button-standard';
import '/_102053_/l2/molecules/groupentertext/ml-floating-text-input';
import '/_102053_/l2/molecules/groupenterboolean/ml-toggle-switch';
import '/_102053_/l2/molecules/groupexpandcontent/ml-accordion';

@customElement('demo4--showcase-fase2-102053')
export class Demo4ShowcaseFase2 extends StateLitElement {

  @state() private toggleVal = false;

  render(): TemplateResult {
    return html`
      <div>
        <h1>Showcase Fase 2 — data-class no host</h1>
        <p>Componentes recebem data-class para customizar layout sem alterar o componente.</p>

        <hr>

        <h2>Button com data-class="w-full"</h2>
        <div style="max-width: 400px;">
          <grouptriggeraction--ml-button-standard data-variant="primary" data-class="w-full">
            <Label>Botao full width</Label>
          </grouptriggeraction--ml-button-standard>
        </div>

        <h2>Botoes com data-class de margem</h2>
        <div>
          <grouptriggeraction--ml-button-standard data-variant="primary" data-class="mr-2">
            <Label>Margem direita</Label>
          </grouptriggeraction--ml-button-standard>

          <grouptriggeraction--ml-button-standard data-variant="secondary" data-class="mr-2">
            <Label>Margem direita</Label>
          </grouptriggeraction--ml-button-standard>

          <grouptriggeraction--ml-button-standard data-variant="danger">
            <Label>Sem margem</Label>
          </grouptriggeraction--ml-button-standard>
        </div>

        <hr>

        <h2>Input com data-class="max-w-sm"</h2>
        <groupentertext--ml-floating-text-input
          .value=${''}
          placeholder="Largura limitada"
          data-class="max-w-sm"
          .isEditing=${true}>
          <Label>Campo estreito</Label>
        </groupentertext--ml-floating-text-input>

        <h2>Input com data-class="mt-6"</h2>
        <groupentertext--ml-floating-text-input
          .value=${''}
          placeholder="Com espaco acima"
          data-class="mt-6"
          .isEditing=${true}>
          <Label>Campo com margem top</Label>
        </groupentertext--ml-floating-text-input>

        <hr>

        <h2>Toggle com data-class="p-4 border rounded-lg"</h2>
        <groupenterboolean--ml-toggle-switch
          .value=${this.toggleVal}
          data-class="p-4 border rounded-lg"
          @change=${(e: CustomEvent) => { this.toggleVal = e.detail?.value; }}>
          <Label>Toggle dentro de um box</Label>
        </groupenterboolean--ml-toggle-switch>

        <hr>

        <h2>Accordion com data-class="max-w-lg"</h2>
        <groupexpandcontent--ml-accordion multiple data-class="max-w-lg">
          <Section title="Secao A">Accordion com largura limitada via data-class.</Section>
          <Section title="Secao B">Segundo item.</Section>
        </groupexpandcontent--ml-accordion>

        <hr>

        <h2>Sem data-class (controle)</h2>
        <grouptriggeraction--ml-button-standard data-variant="primary">
          <Label>Botao normal</Label>
        </grouptriggeraction--ml-button-standard>

        <groupentertext--ml-floating-text-input
          .value=${''}
          placeholder="Input normal"
          .isEditing=${true}>
          <Label>Campo normal</Label>
        </groupentertext--ml-floating-text-input>

      </div>
    `;
  }
}
