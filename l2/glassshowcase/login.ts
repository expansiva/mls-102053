/// <mls fileReference="_102053_/l2/glassshowcase/login.ts" enhancement="_102020_/l2/enhancementAura"/>
// =============================================================================
// GLASS SHOWCASE — LOGIN
// =============================================================================
// Página real usando as moléculas glass do mls-102054 (import cross-project).
// Padrão controlado: .value + .isEditing + @input/@change realimentando o @state.
// A página É o contrato de container (fundo escuro rico) — ver login.less.
import { html, TemplateResult } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { StateLitElement } from '/_102029_/l2/stateLitElement.js';

// Moléculas glass (mls-102054)
import '/_102054_/l2/molecules/groupentertext/ml-floating-text-input';
import '/_102054_/l2/molecules/groupenterboolean/ml-toggle-switch';
import '/_102054_/l2/molecules/grouptriggeraction/ml-button-standard';

@customElement('glassshowcase--login-102053')
export class GlassShowcaseLogin extends StateLitElement {
  // ── Estado controlado ──────────────────────────────────────────────────────
  @state() private email = '';
  @state() private password = '';
  @state() private remember = false;
  @state() private emailError = '';
  @state() private loading = false;

  // ── Handlers ─────────────────────────────────────────────────────────────--
  private onEmailInput(e: CustomEvent) {
    this.email = e.detail.value;
    if (this.emailError) this.emailError = '';
  }
  private onPasswordInput(e: CustomEvent) {
    this.password = e.detail.value;
  }
  private onRememberChange(e: CustomEvent) {
    this.remember = e.detail.value;
  }
  private isEmailValid(): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email);
  }
  private onSubmit() {
    if (!this.isEmailValid()) {
      this.emailError = 'Informe um e-mail válido';
      return;
    }
    this.loading = true;
    // simula request
    setTimeout(() => {
      this.loading = false;
    }, 1500);
  }
  private goToSignup() {
    // Navegação entre páginas é responsabilidade do app host (router).
    this.dispatchEvent(new CustomEvent('navigate', { bubbles: true, composed: true, detail: { to: 'signup' } }));
  }

  render(): TemplateResult {
    return html`
      <div class="page">
        <div class="card">
          <div class="brand">◆ Aurora</div>
          <h1 class="title">Bem-vindo de volta</h1>
          <p class="subtitle">Entre para continuar</p>

          <div class="fields">
            <groupentertext--ml-floating-text-input
              name="email"
              input-type="email"
              .value=${this.email}
              .isEditing=${true}
              .error=${this.emailError}
              @input=${this.onEmailInput}
            >
              <Label>E-mail</Label>
            </groupentertext--ml-floating-text-input>

            <groupentertext--ml-floating-text-input
              name="password"
              input-type="password"
              .value=${this.password}
              .isEditing=${true}
              @input=${this.onPasswordInput}
            >
              <Label>Senha</Label>
            </groupentertext--ml-floating-text-input>
          </div>

          <div class="row-between">
            <groupenterboolean--ml-toggle-switch
              name="remember"
              .value=${this.remember}
              .isEditing=${true}
              @change=${this.onRememberChange}
            >
              <Label>Manter conectado</Label>
            </groupenterboolean--ml-toggle-switch>
            <grouptriggeraction--ml-button-standard data-variant="link" size="sm">
              <Label>Esqueci a senha</Label>
            </grouptriggeraction--ml-button-standard>
          </div>

          <div class="submit">
            <grouptriggeraction--ml-button-standard
              data-variant="primary"
              .loading=${this.loading}
              @action=${this.onSubmit}
            >
              <Label>Entrar</Label>
            </grouptriggeraction--ml-button-standard>
          </div>

          <p class="footer">
            Não tem conta?
            <grouptriggeraction--ml-button-standard data-variant="link" size="sm" @action=${this.goToSignup}>
              <Label>Criar conta</Label>
            </grouptriggeraction--ml-button-standard>
          </p>
        </div>
      </div>
    `;
  }
}
