/// <mls fileReference="_102053_/l2/glassshowcase/demolote4.ts" enhancement="_102020_/l2/enhancementAura"/>
// =============================================================================
// GLASS SHOWCASE — DEMO LOTE 4 (navegação)
// =============================================================================
import { html, TemplateResult } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { StateLitElement } from '/_102029_/l2/stateLitElement.js';

import '/_102054_/l2/molecules/groupnavigatesection/ml-tabs';
import '/_102054_/l2/molecules/groupnavigatesection/ml-navigate-pills';
import '/_102054_/l2/molecules/groupnavigatesection/ml-breadcrumb-trail';
import '/_102054_/l2/molecules/groupnavigatemain/ml-sidebar-nav';

@customElement('glassshowcase--demolote4-102053')
export class GlassShowcaseDemoLote4 extends StateLitElement {
  @state() private tab = 'details';
  @state() private pill = 'overview';
  @state() private navItem = 'dashboard';

  render(): TemplateResult {
    return html`
      <div class="page">
        <div class="shell">
          <header class="head">
            <div class="brand">◆ Aurora</div>
            <h1 class="title">Lote 4 — Navegação</h1>
            <p class="subtitle">tabs · pills · breadcrumb · sidebar</p>
          </header>

          <section class="block">
            <h2 class="block-title">Breadcrumb</h2>
            <groupnavigatesection--ml-breadcrumb-trail value="produto">
              <Tab value="home" title="Início">Home.</Tab>
              <Tab value="catalogo" title="Catálogo">Catálogo.</Tab>
              <Tab value="eletronicos" title="Eletrônicos">Eletrônicos.</Tab>
              <Tab value="produto" title="Notebook Pro">Produto atual.</Tab>
            </groupnavigatesection--ml-breadcrumb-trail>
          </section>

          <section class="block">
            <h2 class="block-title">Pills</h2>
            <groupnavigatesection--ml-navigate-pills
              .value=${this.pill}
              @change=${(e: CustomEvent) => {
                this.pill = e.detail.value;
              }}
            >
              <Tab value="overview" title="Visão geral">Resumo do projeto.</Tab>
              <Tab value="timeline" title="Cronograma">Marcos e entregas.</Tab>
              <Tab value="team" title="Equipe">Pessoas envolvidas.</Tab>
            </groupnavigatesection--ml-navigate-pills>
          </section>

          <section class="block">
            <h2 class="block-title">Tabs</h2>
            <groupnavigatesection--ml-tabs
              .value=${this.tab}
              @change=${(e: CustomEvent) => {
                this.tab = e.detail.value;
              }}
            >
              <Tab value="details" title="Detalhes">Especificações do produto.</Tab>
              <Tab value="reviews" title="Avaliações">Comentários dos clientes.</Tab>
              <Tab value="shipping" title="Entrega">Prazos e custos.</Tab>
            </groupnavigatesection--ml-tabs>
          </section>

          <section class="block">
            <h2 class="block-title">Sidebar</h2>
            <div class="sidebar-frame">
              <groupnavigatemain--ml-sidebar-nav
                .value=${this.navItem}
                @change=${(e: CustomEvent) => {
                  this.navItem = e.detail.value;
                }}
              >
                <Label>Aurora</Label>
                <Item value="dashboard" icon="▦">Dashboard</Item>
                <Item value="projects" icon="▤" badge="3">Projetos</Item>
                <Group label="Workspace">
                  <Item value="tasks" icon="✓">Tarefas</Item>
                  <Item value="calendar" icon="▣">Calendário</Item>
                </Group>
                <Footer>
                  <Item value="settings" icon="⚙">Configurações</Item>
                </Footer>
              </groupnavigatemain--ml-sidebar-nav>
              <div class="sidebar-content">Selecionado: <strong>${this.navItem}</strong></div>
            </div>
          </section>
        </div>
      </div>
    `;
  }
}
