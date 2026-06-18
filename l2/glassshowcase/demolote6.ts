/// <mls fileReference="_102053_/l2/glassshowcase/demolote6.ts" enhancement="_102020_/l2/enhancementAura"/>
// =============================================================================
// GLASS SHOWCASE — DEMO LOTE 6 (métricas / progresso / steps / rating)
// =============================================================================
import { html, TemplateResult } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { StateLitElement } from '/_102029_/l2/stateLitElement.js';

import '/_102054_/l2/molecules/groupviewmetric/ml-metric-card';
import '/_102054_/l2/molecules/groupviewmetric/ml-metric-big-number';
import '/_102054_/l2/molecules/groupshowprogress/ml-linear-progress';
import '/_102054_/l2/molecules/groupshowprogress/ml-circular-progress';
import '/_102054_/l2/molecules/groupnavigatesteps/ml-horizontal-stepper';
import '/_102054_/l2/molecules/groupnavigatesteps/ml-wizard-steps';
import '/_102054_/l2/molecules/grouprateitem/ml-star-rating';
import '/_102054_/l2/molecules/grouprateitem/ml-emoji-mood-scale';
import '/_102054_/l2/molecules/groupexpandcontent/ml-collapsible-panel';

@customElement('glassshowcase--demolote6-102053')
export class GlassShowcaseDemoLote6 extends StateLitElement {
  @state() private step = 1;
  @state() private wiz = 1;
  @state() private stars = 3;
  @state() private mood = 4;

  render(): TemplateResult {
    return html`
      <div class="page">
        <div class="shell">
          <header class="head">
            <div class="brand">◆ Aurora</div>
            <h1 class="title">Lote 6 — Métricas, Progresso, Steps e Rating</h1>
            <p class="subtitle">metric-card · big-number · linear/circular · stepper · wizard · stars · mood · collapsible</p>
          </header>

          <section class="block">
            <h2 class="block-title">Métricas</h2>
            <div class="grid">
              <groupviewmetric--ml-metric-card>
                <Icon>📈</Icon>
                <Label>Receita mensal</Label>
                <Value>R$ 128.430</Value>
                <Trend direction="up">+12,5%</Trend>
                <Helper>vs. mês anterior</Helper>
              </groupviewmetric--ml-metric-card>
              <groupviewmetric--ml-metric-card>
                <Icon>👥</Icon>
                <Label>Churn</Label>
                <Value>3,2%</Value>
                <Trend direction="down">-0,8%</Trend>
                <Helper>últimos 30 dias</Helper>
              </groupviewmetric--ml-metric-card>
              <groupviewmetric--ml-metric-big-number>
                <Label>Usuários ativos</Label>
                <Value>24.918</Value>
                <Trend direction="up">▲ 8,1%</Trend>
                <Helper>há 5 min</Helper>
              </groupviewmetric--ml-metric-big-number>
            </div>
          </section>

          <section class="block">
            <h2 class="block-title">Progresso</h2>
            <div style="display:flex; flex-direction:column; gap:1.25rem;">
              <groupshowprogress--ml-linear-progress value="72" show-value label="Upload"></groupshowprogress--ml-linear-progress>
              <groupshowprogress--ml-linear-progress value="40" variant="success" size="sm" show-value></groupshowprogress--ml-linear-progress>
              <groupshowprogress--ml-linear-progress value="88" variant="warning" size="lg" show-value></groupshowprogress--ml-linear-progress>
              <div style="display:flex; align-items:center; gap:2rem; justify-content:center; margin-top:0.5rem;">
                <groupshowprogress--ml-circular-progress value="68" size="lg" show-value></groupshowprogress--ml-circular-progress>
                <groupshowprogress--ml-circular-progress value="33" size="lg" show-value></groupshowprogress--ml-circular-progress>
                <groupshowprogress--ml-circular-progress size="lg"></groupshowprogress--ml-circular-progress>
              </div>
            </div>
          </section>

          <section class="block">
            <h2 class="block-title">Horizontal Stepper</h2>
            <groupnavigatesteps--ml-horizontal-stepper
              .value=${this.step}
              @change=${(e: CustomEvent) => {
                this.step = e.detail.value;
              }}
            >
              <Label>Cadastro</Label>
              <Step title="Conta" description="Acesso"></Step>
              <Step title="Perfil" description="Dados"></Step>
              <Step title="Pagamento" description="Plano"></Step>
              <Step title="Pronto" description="Revisão"></Step>
            </groupnavigatesteps--ml-horizontal-stepper>
          </section>

          <section class="block">
            <h2 class="block-title">Wizard Steps</h2>
            <groupnavigatesteps--ml-wizard-steps
              .value=${this.wiz}
              linear="false"
              @change=${(e: CustomEvent) => {
                this.wiz = e.detail.value;
              }}
            >
              <Label>Onboarding</Label>
              <Step title="Conta" description="Acesso" completed></Step>
              <Step title="Perfil" description="Dados pessoais"></Step>
              <Step title="Plano" description="Escolha"></Step>
            </groupnavigatesteps--ml-wizard-steps>
          </section>

          <section class="block">
            <h2 class="block-title">Star Rating</h2>
            <grouprateitem--ml-star-rating
              .value=${this.stars}
              min="1"
              max="5"
              @change=${(e: CustomEvent) => {
                this.stars = e.detail.value;
              }}
            >
              <Label>Avaliação (${this.stars} ★)</Label>
              <Helper>Clique ou use as setas</Helper>
            </grouprateitem--ml-star-rating>
          </section>

          <section class="block">
            <h2 class="block-title">Emoji Mood Scale</h2>
            <grouprateitem--ml-emoji-mood-scale
              .value=${this.mood}
              @change=${(e: CustomEvent) => {
                this.mood = e.detail.value;
              }}
            >
              <Label>Como foi sua experiência? (${this.mood})</Label>
              <Item value="1">😡</Item>
              <Item value="2">🙁</Item>
              <Item value="3">😐</Item>
              <Item value="4">🙂</Item>
              <Item value="5">😍</Item>
            </grouprateitem--ml-emoji-mood-scale>
          </section>

          <section class="block">
            <h2 class="block-title">Collapsible Panel</h2>
            <groupexpandcontent--ml-collapsible-panel>
              <Label>Perguntas frequentes</Label>
              <Section title="Como começar?" subtitle="Primeiros passos" icon="🚀" expanded>
                Crie a conta e siga o assistente de onboarding.
              </Section>
              <Section title="Posso cancelar?" subtitle="Assinatura">Sim, a qualquer momento, sem multa.</Section>
              <Section title="Suporte prioritário?" subtitle="Suporte" disabled>Apenas no plano Business.</Section>
            </groupexpandcontent--ml-collapsible-panel>
          </section>
        </div>
      </div>
    `;
  }
}
