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
        <h1>Showcase Fase 2 — class-name no host</h1>
        <p>Componentes recebem class-name para customizar layout sem alterar o componente.</p>

        <hr>

        <h2>Button com class-name="w-full"</h2>
        <div style="max-width: 400px;">
          <grouptriggeraction--ml-button-standard data-variant="primary" class-name="w-full">
            <Label>Botao full width</Label>
          </grouptriggeraction--ml-button-standard>
        </div>

        <h2>Botoes com class-name de margem</h2>
        <div>
          <grouptriggeraction--ml-button-standard data-variant="primary" class-name="mr-2">
            <Label>Margem direita</Label>
          </grouptriggeraction--ml-button-standard>

          <grouptriggeraction--ml-button-standard data-variant="secondary" class-name="mr-2">
            <Label>Margem direita</Label>
          </grouptriggeraction--ml-button-standard>

          <grouptriggeraction--ml-button-standard data-variant="danger">
            <Label>Sem margem</Label>
          </grouptriggeraction--ml-button-standard>
        </div>

        <hr>

        <h2>Input com class-name="max-w-sm"</h2>
        <groupentertext--ml-floating-text-input
          .value=${''}
          placeholder="Largura limitada"
          class-name="max-w-sm"
          .isEditing=${true}>
          <Label>Campo estreito</Label>
        </groupentertext--ml-floating-text-input>

        <h2>Input com class-name="mt-6"</h2>
        <groupentertext--ml-floating-text-input
          .value=${''}
          placeholder="Com espaco acima"
          class-name="mt-6"
          .isEditing=${true}>
          <Label>Campo com margem top</Label>
        </groupentertext--ml-floating-text-input>

        <hr>

        <h2>Toggle com class-name="p-4 border rounded-lg"</h2>
        <groupenterboolean--ml-toggle-switch
          .value=${this.toggleVal}
          class-name="p-4 border rounded-lg"
          @change=${(e: CustomEvent) => { this.toggleVal = e.detail?.value; }}>
          <Label>Toggle dentro de um box</Label>
        </groupenterboolean--ml-toggle-switch>

        <hr>

        <h2>Accordion com class-name="max-w-lg"</h2>
        <groupexpandcontent--ml-accordion multiple class-name="max-w-lg">
          <Section title="Secao A">Accordion com largura limitada via class-name.</Section>
          <Section title="Secao B">Segundo item.</Section>
        </groupexpandcontent--ml-accordion>

        <hr>

        <h2>Sem class-name (controle)</h2>
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
