/// <mls fileReference="_102053_/l2/demo2/acao-visualizacao.ts" enhancement="_102020_/l2/enhancementAura"/>
// GERADO a partir de todo/.demo-fragments/acao-visualizacao.frag.ts — base comparável demo1/demo2/demo3.
import { html, TemplateResult } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { StateLitElement } from '/_102029_/l2/stateLitElement.js';

import '/_102054_/l2/molecules/grouptriggeraction/ml-button-standard';
import '/_102054_/l2/molecules/grouptriggeraction/ml-icon-button';
import '/_102054_/l2/molecules/grouptriggeraction/ml-split-button';
import '/_102054_/l2/molecules/groupshowprogress/ml-linear-progress';
import '/_102054_/l2/molecules/groupshowprogress/ml-circular-progress';
import '/_102054_/l2/molecules/groupviewcard/ml-profile-card';
import '/_102054_/l2/molecules/groupviewcard/ml-vertical-card';
import '/_102054_/l2/molecules/groupviewmetric/ml-metric-card';
import '/_102054_/l2/molecules/groupviewmetric/ml-metric-big-number';

@customElement('demo2--acao-visualizacao-102053')
export class Demo2AcaoVisualizacao extends StateLitElement {
  render(): TemplateResult {
    return html`
      <div class="page">
        <div class="shell">
          <header class="head">
            <div class="brand">◆ collab · 102054</div>
            <h1 class="title">Ação & Visualização — reimplementação (102054)</h1>
            <p class="subtitle">button · icon · split · progress · cards · metrics</p>
          </header>

          <section class="block">
            <h2 class="block-title">groupTriggerAction — button / icon / split</h2>
            <div class="grid">
              <grouptriggeraction--ml-button-standard data-variant="primary"><Label>Primary</Label></grouptriggeraction--ml-button-standard>
              <grouptriggeraction--ml-button-standard data-variant="secondary"><Label>Secondary</Label></grouptriggeraction--ml-button-standard>
              <grouptriggeraction--ml-button-standard data-variant="danger"><Label>Danger</Label></grouptriggeraction--ml-button-standard>
              <grouptriggeraction--ml-icon-button data-variant="primary"><Icon>★</Icon><Label>Favoritar</Label></grouptriggeraction--ml-icon-button>
              <grouptriggeraction--ml-split-button data-variant="primary"><Label>Salvar</Label></grouptriggeraction--ml-split-button>
            </div>
          </section>

          <section class="block">
            <h2 class="block-title">groupShowProgress — linear / circular</h2>
            <div class="grid">
              <groupshowprogress--ml-linear-progress value="72" show-value label="Upload"></groupshowprogress--ml-linear-progress>
              <groupshowprogress--ml-linear-progress value="40" variant="success" size="sm" show-value></groupshowprogress--ml-linear-progress>
              <groupshowprogress--ml-circular-progress value="68" size="lg" show-value></groupshowprogress--ml-circular-progress>
              <groupshowprogress--ml-circular-progress value="33" size="lg" show-value></groupshowprogress--ml-circular-progress>
            </div>
          </section>

          <section class="block">
            <h2 class="block-title">groupViewCard — profile / vertical</h2>
            <div class="grid">
              <groupviewcard--ml-profile-card clickable="true">
                <CardTitle>Ada Lovelace</CardTitle>
                <CardDescription>Engenheira de software</CardDescription>
                <CardContent>Card de perfil clicável.</CardContent>
              </groupviewcard--ml-profile-card>
              <groupviewcard--ml-vertical-card>
                <CardTitle>Plano Pro</CardTitle>
                <CardDescription>R$ 49/mês</CardDescription>
                <CardContent>Card vertical com ação.</CardContent>
                <CardAction>
                  <grouptriggeraction--ml-button-standard data-variant="primary"><Label>Assinar</Label></grouptriggeraction--ml-button-standard>
                </CardAction>
              </groupviewcard--ml-vertical-card>
            </div>
          </section>

          <section class="block">
            <h2 class="block-title">groupViewMetric — metric-card / big-number</h2>
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
                <Helper>Atualizado há 5 min</Helper>
              </groupviewmetric--ml-metric-big-number>
            </div>
          </section>
        </div>
      </div>
    `;
  }
}
