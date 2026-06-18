/// <mls fileReference="_102053_/l2/glassshowcase/demomultiselect.ts" enhancement="_102020_/l2/enhancementAura"/>
// =============================================================================
// GLASS SHOWCASE — DEMO MULTI SELECT
// =============================================================================
// Exemplo enxuto do ml-multi-select-dropdown (glass, mls-102054). Controlado:
// .value (CSV) + .isEditing + @change. A página é o contrato de container.
import { html, TemplateResult } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { StateLitElement } from '/_102029_/l2/stateLitElement.js';

import '/_102054_/l2/molecules/groupselectmany/ml-multi-select-dropdown';

@customElement('glassshowcase--demomultiselect-102053')
export class GlassShowcaseDemoMultiSelect extends StateLitElement {
  @state() private skills = 'ts,js';
  @state() private teams = '';

  private onSkills(e: CustomEvent) {
    this.skills = e.detail.value;
  }
  private onTeams(e: CustomEvent) {
    this.teams = e.detail.value;
  }

  render(): TemplateResult {
    return html`
      <div class="page">
        <div class="card">
          <div class="brand">◆ Aurora</div>
          <h1 class="title">Multi Select</h1>
          <p class="subtitle">Exemplo glass do <code>ml-multi-select-dropdown</code></p>

          <div class="fields">
            <groupselectmany--ml-multi-select-dropdown
              name="skills"
              searchable="true"
              max-selection="3"
              .value=${this.skills}
              .isEditing=${true}
              @change=${this.onSkills}
            >
              <Label>Tecnologias</Label>
              <Helper>Até 3 — use a busca</Helper>
              <Item value="ts">TypeScript</Item>
              <Item value="js">JavaScript</Item>
              <Item value="py">Python</Item>
              <Item value="go">Go</Item>
              <Item value="rs">Rust</Item>
            </groupselectmany--ml-multi-select-dropdown>

            <groupselectmany--ml-multi-select-dropdown
              name="teams"
              .value=${this.teams}
              .isEditing=${true}
              @change=${this.onTeams}
            >
              <Label>Times</Label>
              <Group label="Engenharia">
                <Item value="fe">Front-end</Item>
                <Item value="be">Back-end</Item>
              </Group>
              <Group label="Produto">
                <Item value="pm">PM</Item>
                <Item value="ux">UX</Item>
              </Group>
            </groupselectmany--ml-multi-select-dropdown>
          </div>

          <p class="result">Skills: <strong>${this.skills || '—'}</strong> · Times: <strong>${this.teams || '—'}</strong></p>
        </div>
      </div>
    `;
  }
}
