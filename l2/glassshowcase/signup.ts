/// <mls fileReference="_102053_/l2/glassshowcase/signup.ts" enhancement="_102020_/l2/enhancementAura"/>
// =============================================================================
// GLASS SHOWCASE — SIGNUP (Cadastro)
// =============================================================================
// Padrão controlado (.value + .isEditing + @input/@change). Telefone com máscara.
// "Criar conta" desabilitado até aceitar os termos. A página é o container glass.
import { html, TemplateResult } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { StateLitElement } from '/_102029_/l2/stateLitElement.js';

import '/_102054_/l2/molecules/groupentertext/ml-floating-text-input';
import '/_102054_/l2/molecules/groupenterboolean/ml-toggle-switch';
import '/_102054_/l2/molecules/grouptriggeraction/ml-button-standard';

@customElement('glassshowcase--signup')
export class GlassShowcaseSignup extends StateLitElement {
  @state() private name = '';
  @state() private email = '';
  @state() private phone = '';
  @state() private password = '';
  @state() private acceptedTerms = false;
  @state() private loading = false;

  private onName(e: CustomEvent) {
    this.name = e.detail.value;
  }
  private onEmail(e: CustomEvent) {
    this.email = e.detail.value;
  }
  private onPhone(e: CustomEvent) {
    this.phone = e.detail.value;
  }
  private onPassword(e: CustomEvent) {
    this.password = e.detail.value;
  }
  private onTerms(e: CustomEvent) {
    this.acceptedTerms = e.detail.value;
  }
  private onSubmit() {
    if (!this.acceptedTerms) return;
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
    }, 1500);
  }
  private goToLogin() {
    this.dispatchEvent(new CustomEvent('navigate', { bubbles: true, composed: true, detail: { to: 'login' } }));
  }

  render(): TemplateResult {
    return html`
      <div class="page">
        <div class="card">
          <div class="brand">◆ Aurora</div>
          <h1 class="title">Crie sua conta</h1>
          <p class="subtitle">Leva menos de um minuto</p>

          <div class="fields">
            <groupentertext--ml-floating-text-input
              name="name"
              .value=${this.name}
              .isEditing=${true}
              @input=${this.onName}
            >
              <Label>Nome completo</Label>
            </groupentertext--ml-floating-text-input>

            <groupentertext--ml-floating-text-input
              name="email"
              input-type="email"
              .value=${this.email}
              .isEditing=${true}
              @input=${this.onEmail}
            >
              <Label>E-mail</Label>
            </groupentertext--ml-floating-text-input>

            <groupentertext--ml-floating-text-input
              name="phone"
              input-type="tel"
              mask="(##) #####-####"
              .value=${this.phone}
              .isEditing=${true}
              @input=${this.onPhone}
            >
              <Label>Telefone</Label>
            </groupentertext--ml-floating-text-input>

            <groupentertext--ml-floating-text-input
              name="password"
              input-type="password"
              .value=${this.password}
              .isEditing=${true}
              @input=${this.onPassword}
            >
              <Label>Senha</Label>
            </groupentertext--ml-floating-text-input>
          </div>

          <div class="terms">
            <groupenterboolean--ml-toggle-switch
              name="terms"
              .value=${this.acceptedTerms}
              .isEditing=${true}
              @change=${this.onTerms}
            >
              <Label>Aceito os termos de uso</Label>
            </groupenterboolean--ml-toggle-switch>
          </div>

          <div class="submit">
            <grouptriggeraction--ml-button-standard
              data-variant="primary"
              .loading=${this.loading}
              .disabled=${!this.acceptedTerms}
              @action=${this.onSubmit}
            >
              <Label>Criar conta</Label>
            </grouptriggeraction--ml-button-standard>
          </div>

          <p class="footer">
            Já tem conta?
            <grouptriggeraction--ml-button-standard data-variant="link" size="sm" @action=${this.goToLogin}>
              <Label>Entrar</Label>
            </grouptriggeraction--ml-button-standard>
          </p>
        </div>
      </div>
    `;
  }
}
