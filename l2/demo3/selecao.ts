/// <mls fileReference="_102053_/l2/demo3/selecao.ts" enhancement="_102020_/l2/enhancementAura"/>
// GERADO a partir de todo/.demo-fragments/selecao.frag.ts — base comparável demo1/demo2/demo3.
import { html, TemplateResult } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { StateLitElement } from '/_102029_/l2/stateLitElement.js';

import '/_102055_/l2/molecules/groupselectone/ml-select-dropdown-glass';
import '/_102055_/l2/molecules/groupselectone/ml-radio-group-glass';
import '/_102055_/l2/molecules/groupselectone/ml-segmented-control-glass';
import '/_102055_/l2/molecules/groupselectone/ml-combobox-glass';
import '/_102055_/l2/molecules/groupselectone/ml-card-selector-glass';
import '/_102055_/l2/molecules/groupselectmany/ml-multi-select-dropdown-glass';
import '/_102055_/l2/molecules/groupselectmany/ml-popover-multi-select-glass';
import '/_102055_/l2/molecules/groupsearchcontent/ml-search-bar-glass';
import '/_102055_/l2/molecules/groupselectfileforupload/ml-file-upload-dropzone-glass';

@customElement('demo3--selecao-102053')
export class Demo3Selecao extends StateLitElement {
  @state() private country = 'br';
  @state() private plan = 'standard';
  @state() private view = 'week';
  @state() private fruit = 'banana';
  @state() private tier = 'team';
  @state() private skills = 'ts,js';
  @state() private hab = 'lit,ts';
  @state() private q = 'lit';

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
            <div class="brand">◆ collab · 102055</div>
            <h1 class="title">Seleção — glass por herança (102055)</h1>
            <p class="subtitle">select-one · select-many · search · upload</p>
          </header>

          <section class="block">
            <h2 class="block-title">groupSelectOne — dropdown / radio / segmented / combobox / card</h2>
            <div class="grid">
              <groupselectone--ml-select-dropdown-glass name="country" searchable="true" .value=${this.country} .isEditing=${true} @change=${this.upd('country')}>
                <Label>País</Label>
                <Helper>Selecionado: ${this.country ?? '—'}</Helper>
                <Item value="br">Brasil</Item>
                <Item value="us">Estados Unidos</Item>
                <Item value="pt">Portugal</Item>
                <Item value="jp">Japão</Item>
              </groupselectone--ml-select-dropdown-glass>
              <groupselectone--ml-radio-group-glass name="plan" .value=${this.plan} .isEditing=${true} @change=${this.upd('plan')}>
                <Label>Plano</Label>
                <Item value="free">Gratuito</Item>
                <Item value="standard">Standard</Item>
                <Item value="pro">Pro</Item>
              </groupselectone--ml-radio-group-glass>
              <groupselectone--ml-segmented-control-glass name="view" .value=${this.view} .isEditing=${true} @change=${this.upd('view')}>
                <Label>Visualização</Label>
                <Item value="day">Dia</Item>
                <Item value="week">Semana</Item>
                <Item value="month">Mês</Item>
              </groupselectone--ml-segmented-control-glass>
              <groupselectone--ml-combobox-glass .value=${this.fruit} clearable .isEditing=${true} @change=${this.upd('fruit')}>
                <Label>Fruta</Label>
                <Helper>Selecionado: ${this.fruit ?? '—'}</Helper>
                <Item value="apple">Maçã</Item>
                <Item value="banana">Banana</Item>
                <Item value="grape">Uva</Item>
                <Item value="orange">Laranja</Item>
              </groupselectone--ml-combobox-glass>
              <groupselectone--ml-card-selector-glass name="tier" .value=${this.tier} .isEditing=${true} @change=${this.upd('tier')}>
                <Label>Nível</Label>
                <Item value="starter">Starter</Item>
                <Item value="team">Team</Item>
                <Item value="business">Business</Item>
              </groupselectone--ml-card-selector-glass>
            </div>
          </section>

          <section class="block">
            <h2 class="block-title">groupSelectMany — multi-select / popover</h2>
            <div class="grid">
              <groupselectmany--ml-multi-select-dropdown-glass name="skills" searchable="true" .value=${this.skills} .isEditing=${true} @change=${this.upd('skills')}>
                <Label>Tecnologias</Label>
                <Helper>Selecionadas: ${this.skills || '—'}</Helper>
                <Item value="ts">TypeScript</Item>
                <Item value="js">JavaScript</Item>
                <Item value="py">Python</Item>
                <Item value="go">Go</Item>
              </groupselectmany--ml-multi-select-dropdown-glass>
              <groupselectmany--ml-popover-multi-select-glass searchable max-selection="3" .value=${this.hab} .isEditing=${true} @change=${this.upd('hab')}>
                <Label>Habilidades (máx. 3)</Label>
                <Helper>Selecionadas: ${this.hab || '—'}</Helper>
                <Item value="lit">Lit</Item>
                <Item value="ts">TypeScript</Item>
                <Item value="less">LESS</Item>
                <Item value="a11y">Acessibilidade</Item>
                <Item value="design">Design Systems</Item>
              </groupselectmany--ml-popover-multi-select-glass>
            </div>
          </section>

          <section class="block">
            <h2 class="block-title">groupSearchContent / groupSelectFileForUpload</h2>
            <div class="grid">
              <groupsearchcontent--ml-search-bar-glass .value=${this.q} @change=${this.upd('q')}>
                <Label>Buscar</Label>
                <Helper>Última busca: ${this.q ?? '—'}</Helper>
                <Suggestion value="lit">Lit</Suggestion>
                <Suggestion value="ts">TypeScript</Suggestion>
                <Suggestion value="less">LESS</Suggestion>
                <Suggestion value="glass">Glassmorphism</Suggestion>
              </groupsearchcontent--ml-search-bar-glass>
              <groupselectfileforupload--ml-file-upload-dropzone-glass multiple accept="image/*" max-files="5" max-size-kb="2048">
                <Label>Imagens</Label>
                <Helper>Até 5 imagens, máx. 2 MB cada</Helper>
              </groupselectfileforupload--ml-file-upload-dropzone-glass>
            </div>
          </section>
        </div>
      </div>
    `;
  }
}
