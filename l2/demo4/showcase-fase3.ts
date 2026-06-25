/// <mls fileReference="_102053_/l2/demo4/showcase-fase3.ts" enhancement="_102020_/l2/enhancementAura"/>
// =============================================================================
// DEMO 4 — SHOWCASE FASE 3: class nos slot tags
// =============================================================================
// Demonstra que o consumidor pode passar classes nos slots (Label, Helper, etc.)

import { html, TemplateResult } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { StateLitElement } from '/_102029_/l2/stateLitElement.js';

import '/_102053_/l2/molecules/grouptriggeraction/ml-button-standard';
import '/_102053_/l2/molecules/groupentertext/ml-floating-text-input';
import '/_102053_/l2/molecules/groupenterboolean/ml-toggle-switch';
import '/_102053_/l2/molecules/groupexpandcontent/ml-accordion';

@customElement('demo4--showcase-fase3-102053')
export class Demo4ShowcaseFase3 extends StateLitElement {

  @state() private toggleVal = true;

  render(): TemplateResult {
    return html`
      <div>
        <h1>Showcase Fase 3 — class nos slot tags</h1>
        <p>Consumidor passa classes diretamente nos slots. As classes sao mergeadas no wrapper do componente.</p>

        <hr>

        <h2>Button — Label com classes</h2>
        <div>
          <grouptriggeraction--ml-button-standard data-variant="primary">
            <Label class="uppercase tracking-widest">Confirmar</Label>
          </grouptriggeraction--ml-button-standard>

          <grouptriggeraction--ml-button-standard data-variant="secondary">
            <Label class="italic">Cancelar</Label>
          </grouptriggeraction--ml-button-standard>

          <grouptriggeraction--ml-button-standard data-variant="primary">
            <Label>Sem class (controle)</Label>
          </grouptriggeraction--ml-button-standard>
        </div>

        <hr>

        <h2>Input — Label e Helper com classes</h2>
        <div>
          <groupentertext--ml-floating-text-input
            .value=${''}
            placeholder="Digite..."
            .isEditing=${true}>
            <Label class="uppercase text-xs tracking-widest">Nome completo</Label>
            <Helper class="italic">Preencha seu nome como no documento</Helper>
          </groupentertext--ml-floating-text-input>
        </div>

        <div>
          <groupentertext--ml-floating-text-input
            .value=${'João'}
            .isEditing=${true}>
            <Label>Sem class (controle)</Label>
            <Helper>Helper normal</Helper>
          </groupentertext--ml-floating-text-input>
        </div>

        <hr>

        <h2>Toggle — Label e Helper com classes</h2>
        <div>
          <groupenterboolean--ml-toggle-switch
            .value=${this.toggleVal}
            @change=${(e: CustomEvent) => { this.toggleVal = e.detail?.value; }}>
            <Label class="uppercase tracking-wide">Notificacoes</Label>
            <Helper class="italic">Receber alertas por e-mail</Helper>
          </groupenterboolean--ml-toggle-switch>
        </div>

        <div>
          <groupenterboolean--ml-toggle-switch
            .value=${false}>
            <Label>Sem class (controle)</Label>
            <Helper>Helper normal</Helper>
          </groupenterboolean--ml-toggle-switch>
        </div>

        <hr>

        <h2>Accordion — Label com classes</h2>
        <div>
          <groupexpandcontent--ml-accordion multiple>
            <Label class="uppercase tracking-widest text-xs">Configuracoes</Label>
            <Section title="Geral">Configuracoes gerais do sistema.</Section>
            <Section title="Avancado">Configuracoes avancadas.</Section>
          </groupexpandcontent--ml-accordion>
        </div>

        <div>
          <groupexpandcontent--ml-accordion multiple>
            <Label>Sem class (controle)</Label>
            <Section title="Item A">Conteudo A.</Section>
            <Section title="Item B">Conteudo B.</Section>
          </groupexpandcontent--ml-accordion>
        </div>

      </div>
    `;
  }
}
