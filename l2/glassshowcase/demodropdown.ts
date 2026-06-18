/// <mls fileReference="_102053_/l2/glassshowcase/demodropdown.ts" enhancement="_102020_/l2/enhancementAura"/>
// =============================================================================
// GLASS SHOWCASE — DEMO DROPDOWN
// =============================================================================
// Exemplo enxuto do ml-select-dropdown (glass, mls-102054). Padrão controlado:
// .value + .isEditing + @change realimentando o @state. A página é o contrato
// de container (fundo escuro rico) — ver demodropdown.less.
import { html, TemplateResult } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { StateLitElement } from '/_102029_/l2/stateLitElement.js';

import '/_102054_/l2/molecules/groupselectone/ml-select-dropdown';

@customElement('glassshowcase--demodropdown-102053')
export class GlassShowcaseDemoDropdown extends StateLitElement {
  @state() private country = '';
  @state() private team = '';

  private onCountry(e: CustomEvent) {
    this.country = e.detail.value;
  }
  private onTeam(e: CustomEvent) {
    this.team = e.detail.value;
  }

  render(): TemplateResult {
    return html`
      <div class="page">
        <div class="card">
          <div class="brand">◆ Aurora</div>
          <h1 class="title">Select Dropdown</h1>
          <p class="subtitle">Exemplo glass do <code>ml-select-dropdown</code></p>

          <div class="fields">
            <groupselectone--ml-select-dropdown
              name="country"
              searchable="true"
              .value=${this.country}
              .isEditing=${true}
              @change=${this.onCountry}
            >
              <Label>País</Label>
              <Helper>Use a busca para filtrar</Helper>
              <Item value="br">Brasil</Item>
              <Item value="us">Estados Unidos</Item>
              <Item value="pt">Portugal</Item>
              <Item value="jp">Japão</Item>
              <Item value="de">Alemanha</Item>
            </groupselectone--ml-select-dropdown>

            <groupselectone--ml-select-dropdown
              name="team"
              .value=${this.team}
              .isEditing=${true}
              @change=${this.onTeam}
            >
              <Label>Time</Label>
              <Group label="Engenharia">
                <Item value="fe">Front-end</Item>
                <Item value="be">Back-end</Item>
              </Group>
              <Group label="Produto">
                <Item value="pm">Product Manager</Item>
                <Item value="ux">UX Designer</Item>
              </Group>
            </groupselectone--ml-select-dropdown>
          </div>

          <p class="result">Selecionado — país: <strong>${this.country || '—'}</strong> · time: <strong>${this.team || '—'}</strong></p>
        </div>
      </div>
    `;
  }
}
