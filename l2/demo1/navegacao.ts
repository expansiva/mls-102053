/// <mls fileReference="_102053_/l2/demo1/navegacao.ts" enhancement="_102020_/l2/enhancementAura"/>
// GERADO a partir de todo/.demo-fragments/navegacao.frag.ts — base comparável demo1/demo2/demo3.
import { html, TemplateResult } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { StateLitElement } from '/_102029_/l2/stateLitElement.js';

import '/_102040_/l2/molecules/groupnavigatesection/ml-tabs';
import '/_102040_/l2/molecules/groupnavigatesection/ml-navigate-pills';
import '/_102040_/l2/molecules/groupnavigatesection/ml-breadcrumb-trail';
import '/_102040_/l2/molecules/groupnavigatesteps/ml-horizontal-stepper';
import '/_102040_/l2/molecules/groupnavigatesteps/ml-wizard-steps';
import '/_102040_/l2/molecules/groupnavigatemain/ml-sidebar-nav';

@customElement('demo1--navegacao-102053')
export class Demo1Navegacao extends StateLitElement {
  @state() private main = 'dashboard';
  @state() private tab = 'details';
  @state() private pill = 'overview';
  @state() private step = 1;
  @state() private wiz = 1;

  private upd(key: string) {
    return (e: CustomEvent) => {
      (this as Record<string, unknown>)[key] = e.detail?.value;
    };
  }

  render(): TemplateResult {
    return html`
      <div class="page">
        <div class="shell">
          <header class="head">
            <div class="brand">◆ collab · 102040</div>
            <h1 class="title">Navegação — originais (102040)</h1>
            <p class="subtitle">tabs · pills · breadcrumb · stepper · wizard · sidebar</p>
          </header>

          <section class="block">
            <h2 class="block-title">groupNavigateSection — tabs / pills / breadcrumb</h2>
            <div class="grid">
              <groupnavigatesection--ml-tabs .value=${this.tab} @change=${this.upd('tab')}>
                <Label>Produto</Label>
                <Tab value="details" title="Detalhes">Descrição do produto.</Tab>
                <Tab value="reviews" title="Avaliações">Comentários dos clientes.</Tab>
              </groupnavigatesection--ml-tabs>
              <groupnavigatesection--ml-navigate-pills .value=${this.pill} @change=${this.upd('pill')}>
                <Label>Seções</Label>
                <Tab value="overview" title="Visão geral">Resumo.</Tab>
                <Tab value="team" title="Equipe">Pessoas.</Tab>
              </groupnavigatesection--ml-navigate-pills>
              <groupnavigatesection--ml-breadcrumb-trail value="produto">
                <Tab value="home" title="Início">Home.</Tab>
                <Tab value="catalogo" title="Catálogo">Catálogo.</Tab>
                <Tab value="produto" title="Notebook Pro">Produto atual.</Tab>
              </groupnavigatesection--ml-breadcrumb-trail>
            </div>
          </section>

          <section class="block">
            <h2 class="block-title">groupNavigateSteps — horizontal / wizard</h2>
            <div class="grid">
              <groupnavigatesteps--ml-horizontal-stepper .value=${this.step} @change=${this.upd('step')}>
                <Label>Cadastro (etapa ${this.step})</Label>
                <Step title="Conta" description="Acesso"></Step>
                <Step title="Perfil" description="Dados"></Step>
                <Step title="Pagamento" description="Plano"></Step>
                <Step title="Pronto" description="Revisão"></Step>
              </groupnavigatesteps--ml-horizontal-stepper>
              <groupnavigatesteps--ml-wizard-steps .value=${this.wiz} linear="false" @change=${this.upd('wiz')}>
                <Label>Onboarding (etapa ${this.wiz})</Label>
                <Step title="Conta" description="Acesso" completed></Step>
                <Step title="Perfil" description="Dados pessoais"></Step>
                <Step title="Plano" description="Escolha"></Step>
              </groupnavigatesteps--ml-wizard-steps>
            </div>
          </section>

          <section class="block">
            <h2 class="block-title">groupNavigateMain — sidebar-nav</h2>
            <div class="grid">
              <div style="height:22rem; border-radius:14px; overflow:hidden; display:flex;">
                <groupnavigatemain--ml-sidebar-nav .value=${this.main} @change=${this.upd('main')}>
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
              </div>
            </div>
          </section>
        </div>
      </div>
    `;
  }
}
