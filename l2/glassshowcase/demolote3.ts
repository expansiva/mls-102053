/// <mls fileReference="_102053_/l2/glassshowcase/demolote3.ts" enhancement="_102020_/l2/enhancementAura"/>
// =============================================================================
// GLASS SHOWCASE — DEMO LOTE 3 (botões e cards)
// =============================================================================
import { html, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { StateLitElement } from '/_102029_/l2/stateLitElement.js';

import '/_102054_/l2/molecules/grouptriggeraction/ml-icon-button';
import '/_102054_/l2/molecules/grouptriggeraction/ml-split-button';
import '/_102054_/l2/molecules/groupviewcard/ml-profile-card';
import '/_102054_/l2/molecules/groupviewcard/ml-vertical-card';
import '/_102054_/l2/molecules/grouptriggeraction/ml-button-standard';

@customElement('glassshowcase--demolote3-102053')
export class GlassShowcaseDemoLote3 extends StateLitElement {
  render(): TemplateResult {
    return html`
      <div class="page">
        <div class="shell">
          <header class="head">
            <div class="brand">◆ Aurora</div>
            <h1 class="title">Lote 3 — Botões e Cards</h1>
            <p class="subtitle">icon-button · split-button · profile-card · vertical-card</p>
          </header>

          <section class="block">
            <h2 class="block-title">Icon Button</h2>
            <div class="row">
              <grouptriggeraction--ml-icon-button size="sm"><Label>Buscar</Label><Icon><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="100%" height="100%"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg></Icon></grouptriggeraction--ml-icon-button>
              <grouptriggeraction--ml-icon-button size="md"><Label>Adicionar</Label><Icon><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="100%" height="100%"><path d="M12 5v14M5 12h14"/></svg></Icon></grouptriggeraction--ml-icon-button>
              <grouptriggeraction--ml-icon-button size="lg" loading="true"><Label>Carregando</Label></grouptriggeraction--ml-icon-button>
            </div>
          </section>

          <section class="block">
            <h2 class="block-title">Split Button</h2>
            <div class="row">
              <grouptriggeraction--ml-split-button>
                <Label value="save">Salvar</Label>
                <span value="save-new">Salvar e criar novo</span>
                <span value="save-copy">Salvar como cópia</span>
              </grouptriggeraction--ml-split-button>
            </div>
          </section>

          <section class="block">
            <h2 class="block-title">Cards</h2>
            <div class="cards">
              <groupviewcard--ml-profile-card clickable="true">
                <CardTitle>Ada Lovelace</CardTitle>
                <CardDescription>Engenheira de software</CardDescription>
                <CardContent>Card de perfil clicável em vidro.</CardContent>
              </groupviewcard--ml-profile-card>

              <groupviewcard--ml-vertical-card selected="true">
                <CardTitle>Plano Pro</CardTitle>
                <CardDescription>R$ 49/mês (selecionado)</CardDescription>
                <CardContent>Card vertical com ação.</CardContent>
                <CardAction>
                  <grouptriggeraction--ml-button-standard data-variant="primary"><Label>Assinar</Label></grouptriggeraction--ml-button-standard>
                </CardAction>
              </groupviewcard--ml-vertical-card>
            </div>
          </section>
        </div>
      </div>
    `;
  }
}
