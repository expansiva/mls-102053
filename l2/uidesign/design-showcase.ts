/// <mls fileReference="_102053_/l2/uidesign/design-showcase.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html, nothing } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { StateLitElement } from '/_102029_/l2/stateLitElement.js';
import '/_102053_/l2/molecules/groupentertext/ml-floating-text-input';
import '/_102053_/l2/molecules/groupenterboolean/ml-toggle-switch';
import '/_102053_/l2/molecules/groupexpandcontent/ml-accordion';
import '/_102053_/l2/molecules/grouptriggeraction/ml-button-standard';

@customElement('uidesign--design-showcase')
export class DesignShowcase extends StateLitElement {

  // ── State ──────────────────────────────────────────────────────────────────
  @state() designModel: 'material' | 'brutalism' | 'flat' | 'glass' = 'material';
  @state() darkMode = false;

  // ── Input demo state ───────────────────────────────────────────────────────
  @state() inputValue = '';
  @state() inputErrorValue = 'maria@';
  @state() inputFilledValue = 'João da Silva';

  // ── Toggle demo state ──────────────────────────────────────────────────────
  @state() toggleOn = true;
  @state() toggleOff = false;
  @state() toggleDisabled = true;

  // ── Design model switcher ──────────────────────────────────────────────────
  private setDesign(model: 'material' | 'brutalism' | 'flat' | 'glass') {
    this.designModel = model;
  }

  private toggleDarkMode() {
    this.darkMode = !this.darkMode;
  }

  // ── Render: Top bar ────────────────────────────────────────────────────────
  private renderTopBar() {
    return html`
      <div class="flex items-center justify-between px-6 py-4 border-b-2 mb-8"
           style="border-color: var(--ml-outline-variant); background: var(--ml-surface-dim);">
        <div>
          <h1 class="text-xl font-bold ml-text" style="font-family: var(--ml-font-family);">
            Design Model Showcase
          </h1>
          <p class="text-sm ml-text-muted" style="font-family: var(--ml-font-family);">
            POC: troca de modelo de design em runtime
          </p>
        </div>
        <div class="flex items-center gap-3">
          <button
            class="px-4 py-2 text-sm font-bold cursor-pointer
                   ${this.designModel === 'material' ? 'ml-button ml-button-primary' : 'ml-button ml-button-secondary'}"
            @click=${() => this.setDesign('material')}>
            Material
          </button>
          <button
            class="px-4 py-2 text-sm font-bold cursor-pointer
                   ${this.designModel === 'flat' ? 'ml-button ml-button-primary' : 'ml-button ml-button-secondary'}"
            @click=${() => this.setDesign('flat')}>
            Flat
          </button>
          <button
            class="px-4 py-2 text-sm font-bold cursor-pointer
                   ${this.designModel === 'glass' ? 'ml-button ml-button-primary' : 'ml-button ml-button-secondary'}"
            @click=${() => this.setDesign('glass')}>
            Glass
          </button>
          <button
            class="px-4 py-2 text-sm font-bold cursor-pointer
                   ${this.designModel === 'brutalism' ? 'ml-button ml-button-primary' : 'ml-button ml-button-secondary'}"
            @click=${() => this.setDesign('brutalism')}>
            Brutalism
          </button>
          <span class="w-px h-8" style="background: var(--ml-outline-variant);"></span>
          <button
            class="px-4 py-2 text-sm font-bold cursor-pointer ml-button ml-button-ghost"
            @click=${this.toggleDarkMode}>
            ${this.darkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>
      </div>
    `;
  }

  // ── Render: Section header ─────────────────────────────────────────────────
  private renderSection(title: string, description: string) {
    return html`
      <div class="mb-4 mt-8">
        <h2 class="text-lg font-bold ml-text" style="font-family: var(--ml-font-family);">${title}</h2>
        <p class="text-sm ml-text-muted" style="font-family: var(--ml-font-family);">${description}</p>
      </div>
    `;
  }

  // ── Render: Floating Text Input demos ──────────────────────────────────────
  private renderInputDemos() {
    return html`
      ${this.renderSection('Floating Text Input', 'groupentertext — input com label flutuante, estados e variações')}
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">

        <!-- Normal (empty) -->
        <div>
          <groupentertext--ml-floating-text-input
            value="${this.inputValue}"
            name="demo-empty"
            is-editing="true"
            @change=${(e: CustomEvent) => { this.inputValue = e.detail.value; }}
          >
            <Label>Nome completo</Label>
            <Helper>Informe seu nome e sobrenome</Helper>
          </groupentertext--ml-floating-text-input>
        </div>

        <!-- Filled -->
        <div>
          <groupentertext--ml-floating-text-input
            value="${this.inputFilledValue}"
            name="demo-filled"
            is-editing="true"
            @change=${(e: CustomEvent) => { this.inputFilledValue = e.detail.value; }}
          >
            <Label>Nome completo</Label>
          </groupentertext--ml-floating-text-input>
        </div>

        <!-- With error -->
        <div>
          <groupentertext--ml-floating-text-input
            value="${this.inputErrorValue}"
            name="demo-error"
            is-editing="true"
            error="Informe um e-mail válido"
            @change=${(e: CustomEvent) => { this.inputErrorValue = e.detail.value; }}
          >
            <Label>E-mail</Label>
          </groupentertext--ml-floating-text-input>
        </div>

        <!-- Disabled -->
        <div>
          <groupentertext--ml-floating-text-input
            value="Campo bloqueado"
            name="demo-disabled"
            is-editing="true"
            disabled
          >
            <Label>Campo desabilitado</Label>
          </groupentertext--ml-floating-text-input>
        </div>

        <!-- Password -->
        <div>
          <groupentertext--ml-floating-text-input
            value="secret123"
            name="demo-password"
            input-type="password"
            is-editing="true"
          >
            <Label>Senha</Label>
            <Helper>Mínimo de 8 caracteres</Helper>
          </groupentertext--ml-floating-text-input>
        </div>

        <!-- View mode -->
        <div>
          <groupentertext--ml-floating-text-input
            value="Ana Paula Rodrigues"
            name="demo-view"
            is-editing="false"
          >
            <Label>Nome (somente leitura)</Label>
          </groupentertext--ml-floating-text-input>
        </div>

      </div>
    `;
  }

  // ── Render: Toggle Switch demos ────────────────────────────────────────────
  private renderToggleDemos() {
    return html`
      ${this.renderSection('Toggle Switch', 'groupenterboolean — controle on/off com estados variados')}
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">

        <!-- On -->
        <groupenterboolean--ml-toggle-switch
          .value=${this.toggleOn}
          name="toggle-on"
          is-editing="true"
          @change=${(e: CustomEvent) => { this.toggleOn = e.detail.value; }}
        >
          <Label>Notificações</Label>
          <Helper>Receber alertas por e-mail</Helper>
        </groupenterboolean--ml-toggle-switch>

        <!-- Off -->
        <groupenterboolean--ml-toggle-switch
          .value=${this.toggleOff}
          name="toggle-off"
          is-editing="true"
          @change=${(e: CustomEvent) => { this.toggleOff = e.detail.value; }}
        >
          <Label>Modo avançado</Label>
          <Helper>Exibir configurações técnicas</Helper>
        </groupenterboolean--ml-toggle-switch>

        <!-- With error -->
        <groupenterboolean--ml-toggle-switch
          .value=${false}
          name="toggle-error"
          is-editing="true"
          error="Aceitação obrigatória"
        >
          <Label>Termos de uso</Label>
        </groupenterboolean--ml-toggle-switch>

        <!-- Disabled -->
        <groupenterboolean--ml-toggle-switch
          .value=${this.toggleDisabled}
          name="toggle-disabled"
          is-editing="true"
          disabled
        >
          <Label>Autenticação 2FA</Label>
          <Helper>Gerenciado pelo administrador</Helper>
        </groupenterboolean--ml-toggle-switch>

        <!-- View mode -->
        <groupenterboolean--ml-toggle-switch
          .value=${true}
          name="toggle-view"
          is-editing="false"
        >
          <Label>Status (somente leitura)</Label>
        </groupenterboolean--ml-toggle-switch>

      </div>
    `;
  }

  // ── Render: Button demos ───────────────────────────────────────────────────
  private renderButtonDemos() {
    return html`
      ${this.renderSection('Button Standard', 'grouptriggeraction — botões com variantes, tamanhos e estados')}

      <!-- Variants -->
      <p class="text-xs mb-2 ml-text-muted" style="font-family: var(--ml-font-family);">Variantes</p>
      <div class="flex flex-wrap items-center gap-3 mb-6">
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

      <!-- Sizes -->
      <p class="text-xs mb-2 ml-text-muted" style="font-family: var(--ml-font-family);">Tamanhos</p>
      <div class="flex flex-wrap items-end gap-3 mb-6">
        <grouptriggeraction--ml-button-standard size="xs" data-variant="primary">
          <Label>Extra Small</Label>
        </grouptriggeraction--ml-button-standard>

        <grouptriggeraction--ml-button-standard size="sm" data-variant="primary">
          <Label>Small</Label>
        </grouptriggeraction--ml-button-standard>

        <grouptriggeraction--ml-button-standard size="md" data-variant="primary">
          <Label>Medium</Label>
        </grouptriggeraction--ml-button-standard>

        <grouptriggeraction--ml-button-standard size="lg" data-variant="primary">
          <Label>Large</Label>
        </grouptriggeraction--ml-button-standard>
      </div>

      <!-- States -->
      <p class="text-xs mb-2 ml-text-muted" style="font-family: var(--ml-font-family);">Estados</p>
      <div class="flex flex-wrap items-center gap-3 mb-6">
        <grouptriggeraction--ml-button-standard data-variant="primary" loading>
          <Label>Loading</Label>
        </grouptriggeraction--ml-button-standard>

        <grouptriggeraction--ml-button-standard data-variant="primary" disabled>
          <Label>Disabled</Label>
        </grouptriggeraction--ml-button-standard>

        <grouptriggeraction--ml-button-standard data-variant="secondary" loading>
          <Label>Loading</Label>
        </grouptriggeraction--ml-button-standard>

        <grouptriggeraction--ml-button-standard data-variant="secondary" disabled>
          <Label>Disabled</Label>
        </grouptriggeraction--ml-button-standard>
      </div>

      <!-- With icon -->
      <p class="text-xs mb-2 ml-text-muted" style="font-family: var(--ml-font-family);">Com ícone</p>
      <div class="flex flex-wrap items-center gap-3">
        <grouptriggeraction--ml-button-standard data-variant="primary">
          <Label>Salvar</Label>
          <Icon><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" /></svg></Icon>
        </grouptriggeraction--ml-button-standard>

        <grouptriggeraction--ml-button-standard data-variant="danger">
          <Label>Excluir</Label>
          <Icon><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg></Icon>
        </grouptriggeraction--ml-button-standard>

        <grouptriggeraction--ml-button-standard data-variant="ghost" icon-position="end">
          <Label>Próximo</Label>
          <Icon><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" /></svg></Icon>
        </grouptriggeraction--ml-button-standard>
      </div>
    `;
  }

  // ── Render: Accordion demos ────────────────────────────────────────────────
  private renderAccordionDemos() {
    return html`
      ${this.renderSection('Accordion', 'groupexpandcontent — seções expansíveis com estados variados')}
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">

        <!-- Multiple -->
        <div>
          <groupexpandcontent--ml-accordion multiple>
            <Label>Perguntas Frequentes</Label>
            <Section title="Como funciona o sistema de temas?" expanded>
              <template>
                <p>O sistema usa CSS Custom Properties (variáveis CSS) para definir tokens de design.
                Cada modelo (Material, Brutalism, etc.) fornece valores diferentes para as mesmas variáveis.
                A troca é instantânea — basta alterar o atributo <code>data-design</code> no container.</p>
              </template>
            </Section>
            <Section title="Quantos modelos são suportados?">
              <template>
                <p>Neste POC, dois modelos: <strong>Material Design</strong> e <strong>Brutalism</strong>.
                A arquitetura suporta qualquer número de modelos — basta definir um novo bloco de tokens CSS.</p>
              </template>
            </Section>
            <Section title="Os componentes precisam mudar?">
              <template>
                <p>Não. Os componentes usam <em>classes semânticas</em> como <code>.ml-input</code>,
                <code>.ml-button-primary</code>, etc. O tema ativo decide como essas classes se parecem.</p>
              </template>
            </Section>
          </groupexpandcontent--ml-accordion>
        </div>

        <!-- Single + disabled section -->
        <div>
          <groupexpandcontent--ml-accordion .multiple=${false}>
            <Label>Configurações (modo único)</Label>
            <Section title="Geral" expanded>
              <template>
                <p>Apenas uma seção aberta por vez. Clicar em outra fecha a anterior automaticamente.</p>
              </template>
            </Section>
            <Section title="Avançado">
              <template>
                <p>Configurações avançadas do sistema.</p>
              </template>
            </Section>
            <Section title="Administrador" disabled>
              <template>
                <p>Esta seção está desabilitada.</p>
              </template>
            </Section>
          </groupexpandcontent--ml-accordion>
        </div>

      </div>
    `;
  }

  // ── Main render ────────────────────────────────────────────────────────────
  render() {
    return html`
      <div data-design="${this.designModel}"
           data-mode="${this.darkMode ? 'dark' : 'light'}"
           class="min-h-screen"
           style="background: ${this.designModel === 'glass'
             ? (this.darkMode
               ? 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 30%, #172554 60%, #0c4a6e 100%)'
               : 'linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 25%, #ddd6fe 50%, #e0f2fe 75%, #cffafe 100%)')
             : 'var(--ml-surface)'};
           transition: background 200ms;">

        ${this.renderTopBar()}

        <div class="max-w-5xl mx-auto px-6 pb-16">

          <!-- Active model indicator -->
          <div class="flex items-center gap-3 px-4 py-3 mb-4"
               style="background: var(--ml-primary-dim); border: var(--ml-border-width) var(--ml-border-style) var(--ml-primary); border-radius: var(--ml-radius-sm);">
            <span class="text-sm font-bold" style="color: var(--ml-primary); font-family: var(--ml-font-family);">
              Modelo ativo: ${{ material: 'Material Design', flat: 'Flat Design', glass: 'Glassmorphism', brutalism: 'Brutalism' }[this.designModel]}
              ${this.darkMode ? ' (Dark)' : ' (Light)'}
            </span>
          </div>

          ${this.renderInputDemos()}
          ${this.renderToggleDemos()}
          ${this.renderButtonDemos()}
          ${this.renderAccordionDemos()}

        </div>
      </div>
    `;
  }
}
