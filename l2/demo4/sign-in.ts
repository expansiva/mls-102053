/// <mls fileReference="_102053_/l2/demo4/sign-in.ts" enhancement="_102020_/l2/enhancementAura"/>
// =============================================================================
// DEMO 4 — SIGN IN: pagina real usando componentes com DS
// =============================================================================

import { html, TemplateResult } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { StateLitElement } from '/_102029_/l2/stateLitElement.js';

import '/_102053_/l2/molecules/grouptriggeraction/ml-button-standard';
import '/_102053_/l2/molecules/groupentertext/ml-floating-text-input';
import '/_102053_/l2/molecules/groupenterboolean/ml-toggle-switch';

@customElement('demo4--sign-in-102053')
export class Demo4SignIn extends StateLitElement {

  @state() private email = '';
  @state() private password = '';
  @state() private remember = false;
  @state() private loading = false;
  @state() private error = '';

  private handleSubmit() {
    if (!this.email || !this.password) {
      this.error = 'Preencha todos os campos';
      return;
    }
    this.error = '';
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
    }, 2000);
  }

  render(): TemplateResult {
    return html`
      <div class="sign-in-page">
        <div class="sign-in-card">

          <div class="sign-in-header">
            <h1 class="sign-in-title">Entrar</h1>
            <p class="sign-in-subtitle">Acesse sua conta para continuar</p>
          </div>

          ${this.error ? html`
            <div class="sign-in-error">${this.error}</div>
          ` : html``}

          <div class="sign-in-form">
            <groupentertext--ml-floating-text-input
              .value=${this.email}
              input-type="email"
              placeholder="seu@email.com"
              .isEditing=${true}
              ?disabled=${this.loading}
              @input=${(e: CustomEvent) => { this.email = e.detail?.value; }}>
              <Label>E-mail</Label>
            </groupentertext--ml-floating-text-input>

            <groupentertext--ml-floating-text-input
              class-name="mt-4"
              .value=${this.password}
              input-type="password"
              placeholder="********"
              .isEditing=${true}
              ?disabled=${this.loading}
              @input=${(e: CustomEvent) => { this.password = e.detail?.value; }}>
              <Label>Senha</Label>
            </groupentertext--ml-floating-text-input>

            <div class="sign-in-options">
              <groupenterboolean--ml-toggle-switch
                .value=${this.remember}
                ?disabled=${this.loading}
                @change=${(e: CustomEvent) => { this.remember = e.detail?.value; }}>
                <Label class="text-xs">Lembrar de mim</Label>
              </groupenterboolean--ml-toggle-switch>

              <grouptriggeraction--ml-button-standard data-variant="link" size="sm">
                <Label class="text-xs">Esqueci minha senha</Label>
              </grouptriggeraction--ml-button-standard>
            </div>

            <grouptriggeraction--ml-button-standard
              class-name="w-full"
              data-variant="primary"
              size="lg"
              ?loading=${this.loading}
              @action=${this.handleSubmit}>
              <Label>Entrar</Label>
            </grouptriggeraction--ml-button-standard>
          </div>

          <div class="sign-in-footer">
            <span class="sign-in-footer-text">Nao tem uma conta?</span>
            <grouptriggeraction--ml-button-standard data-variant="link" size="sm">
              <Label>Criar conta</Label>
            </grouptriggeraction--ml-button-standard>
          </div>

        </div>
      </div>
    `;
  }
}
