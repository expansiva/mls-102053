/// <mls fileReference="_102053_/l2/glassshowcase/index.ts" enhancement="_102020_/l2/enhancementAura"/>
// =============================================================================
// GLASS SHOWCASE — HUB
// =============================================================================
// Navega entre as 4 páginas. Renderiza a página escolhida e escuta o evento
// 'navigate' que login/signup emitem para alternar entre si.
import { html, TemplateResult } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { StateLitElement } from '/_102029_/l2/stateLitElement.js';

import '/_102053_/l2/glassshowcase/login';
import '/_102053_/l2/glassshowcase/signup';
import '/_102053_/l2/glassshowcase/checkout';
import '/_102053_/l2/glassshowcase/settings';

type Page = 'home' | 'login' | 'signup' | 'checkout' | 'settings';

@customElement('glassshowcase--index')
export class GlassShowcaseIndex extends StateLitElement {
  @state() private page: Page = 'home';

  private go(page: Page) {
    this.page = page;
  }

  // login/signup emitem 'navigate' { to } — capturamos por delegação
  private onNavigate = (e: Event) => {
    const to = (e as CustomEvent).detail?.to as Page | undefined;
    if (to) this.page = to;
  };

  connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener('navigate', this.onNavigate);
  }
  disconnectedCallback(): void {
    this.removeEventListener('navigate', this.onNavigate);
    super.disconnectedCallback();
  }

  private renderHome(): TemplateResult {
    const cards: Array<{ id: Page; title: string; desc: string }> = [
      { id: 'login', title: 'Login', desc: 'Entrar na conta' },
      { id: 'signup', title: 'Cadastro', desc: 'Criar conta com máscara de telefone' },
      { id: 'checkout', title: 'Checkout', desc: 'Pagamento com máscaras e resumo' },
      { id: 'settings', title: 'Configurações', desc: 'Accordion + preferências' },
    ];
    return html`
      <div class="hub">
        <header class="hub-head">
          <div class="brand">◆ Aurora</div>
          <h1 class="title">Glass Showcase</h1>
          <p class="subtitle">Páginas montadas com as moléculas glassmorphism (mls-102054)</p>
        </header>
        <div class="cards">
          ${cards.map(
            (c) => html`
              <button class="nav-card" @click=${() => this.go(c.id)}>
                <span class="nav-card-title">${c.title}</span>
                <span class="nav-card-desc">${c.desc}</span>
              </button>
            `
          )}
        </div>
      </div>
    `;
  }

  private renderPage(): TemplateResult {
    const view =
      this.page === 'login'
        ? html`<glassshowcase--login></glassshowcase--login>`
        : this.page === 'signup'
          ? html`<glassshowcase--signup></glassshowcase--signup>`
          : this.page === 'checkout'
            ? html`<glassshowcase--checkout></glassshowcase--checkout>`
            : html`<glassshowcase--settings></glassshowcase--settings>`;
    return html`
      <div class="page-wrap">
        <button class="back" @click=${() => this.go('home')}>← Voltar</button>
        ${view}
      </div>
    `;
  }

  render(): TemplateResult {
    return html` <div class="root">${this.page === 'home' ? this.renderHome() : this.renderPage()}</div> `;
  }
}
