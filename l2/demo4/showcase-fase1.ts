/// <mls fileReference="_102053_/l2/demo4/showcase-fase1.ts" enhancement="_102020_/l2/enhancementAura"/>
// =============================================================================
// DEMO 4 — SHOWCASE FASE 1: componentes com design system via .less
// =============================================================================
// Pagina sem estilo proprio. Os componentes renderizam apenas com seus defaults.

import { html, TemplateResult } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { StateLitElement } from '/_102029_/l2/stateLitElement.js';

import '/_102053_/l2/molecules/grouptriggeraction/ml-button-standard';
import '/_102053_/l2/molecules/groupentertext/ml-floating-text-input';
import '/_102053_/l2/molecules/groupenterboolean/ml-toggle-switch';
import '/_102053_/l2/molecules/groupexpandcontent/ml-accordion';

@customElement('demo4--showcase-fase1-102053')
export class Demo4ShowcaseFase1 extends StateLitElement {

  @state() private inputValue = '';
  @state() private inputError = 'Campo obrigatorio';
  @state() private toggleOn = true;
  @state() private toggleOff = false;

  private handleInput(key: string) {
    return (e: CustomEvent) => {
      (this as Record<string, unknown>)[key] = e.detail?.value;
    };
  }

  render(): TemplateResult {
    return html`
      <div>
        <h1>Showcase Fase 1 — Design System via .less</h1>
        <p>Nenhum estilo proprio nesta pagina. Componentes renderizam com defaults do .less.</p>

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

        <h3>Sizes</h3>
        <div>
          <grouptriggeraction--ml-button-standard data-variant="primary" size="xs">
            <Label>XS</Label>
          </grouptriggeraction--ml-button-standard>

          <grouptriggeraction--ml-button-standard data-variant="primary" size="sm">
            <Label>SM</Label>
          </grouptriggeraction--ml-button-standard>

          <grouptriggeraction--ml-button-standard data-variant="primary" size="md">
            <Label>MD</Label>
          </grouptriggeraction--ml-button-standard>

          <grouptriggeraction--ml-button-standard data-variant="primary" size="lg">
            <Label>LG</Label>
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

          <grouptriggeraction--ml-button-standard data-variant="primary">
            <Icon><svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg></Icon>
            <Label>Com icone</Label>
          </grouptriggeraction--ml-button-standard>
        </div>

        <hr>

        <h2>Floating Text Input</h2>
        <div>
          <groupentertext--ml-floating-text-input
            .value=${''}
            placeholder="Digite algo..."
            @input=${this.handleInput('inputValue')}>
            <Label>Campo normal</Label>
            <Helper>Texto de ajuda</Helper>
          </groupentertext--ml-floating-text-input>
        </div>

        <div>
          <groupentertext--ml-floating-text-input
            .value=${'João da Silva'}
            .isEditing=${true}>
            <Label>Preenchido</Label>
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

        <div>
          <groupentertext--ml-floating-text-input
            .value=${''}
            loading
            .isEditing=${true}>
            <Label>Carregando</Label>
          </groupentertext--ml-floating-text-input>
        </div>

        <hr>

        <h2>Toggle Switch</h2>
        <div>
          <groupenterboolean--ml-toggle-switch
            .value=${this.toggleOn}
            @change=${this.handleInput('toggleOn')}>
            <Label>Ativo</Label>
            <Helper>Toggle ligado</Helper>
          </groupenterboolean--ml-toggle-switch>
        </div>

        <div>
          <groupenterboolean--ml-toggle-switch
            .value=${this.toggleOff}
            @change=${this.handleInput('toggleOff')}>
            <Label>Inativo</Label>
          </groupenterboolean--ml-toggle-switch>
        </div>

        <div>
          <groupenterboolean--ml-toggle-switch
            .value=${true}
            disabled>
            <Label>Desabilitado (on)</Label>
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
            <Section title="Secao 1">Conteudo da primeira secao. Texto livre para demonstrar o expand/collapse.</Section>
            <Section title="Secao 2">Conteudo da segunda secao. Mais texto para testar a altura variavel.</Section>
            <Section title="Secao 3">Conteudo da terceira secao.</Section>
          </groupexpandcontent--ml-accordion>
        </div>

        <h3>Disabled</h3>
        <div>
          <groupexpandcontent--ml-accordion disabled>
            <Section title="Secao desabilitada">Este conteudo nao deveria ser acessivel.</Section>
          </groupexpandcontent--ml-accordion>
        </div>

      </div>
    `;
  }
}
