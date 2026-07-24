/// <mls fileReference="_102053_/l2/molecules/groupselectone/index.ts" enhancement="_102020_/l2/enhancementAura"/>
import { html, TemplateResult } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { StateLitElement } from '/_102029_/l2/stateLitElement.js';
import '/_102053_/l2/molecules/groupselectone/ml-combobox-brutal';
import '/_102053_/l2/molecules/groupselectone/ml-dial-select-brutal';
import '/_102053_/l2/molecules/groupselectone/ml-select-one-autocomplete-brutal';

@customElement('molecules--groupselectone--index-102053')
export class GroupSelectOneIndex extends StateLitElement {
  // ── Showcase card states ─────────────────────────────────────────────
  @state() private card1: string | null = null;
  @state() private card2: string | null = 'pro';
  @state() private card3: string | null = null;

  render(): TemplateResult {
    return html`
      <div class="font-sans" style="min-height:100vh; background: #f5f5f5;">
        ${this.renderHero()}
        ${this.renderShowcaseCards()}
        ${this.renderReferenceTable()}
      </div>
    `;
  }

  // ===========================================================================
  // HERO
  // ===========================================================================
  private renderHero(): TemplateResult {
    return html`
      <header class="px-8 py-20 text-center" style="background:#ffffff; border-bottom:3px solid #000;">
        <span class="inline-block px-3 py-1 text-xs font-bold uppercase mb-6" style="background:#3b82f6; color:#ffffff; border:3px solid #000; border-radius:0; letter-spacing:0.05em; font-family:'JetBrains Mono','SF Mono','Courier New',monospace; box-shadow:4px 4px 0 #000;">
          groupSelectOne
        </span>
        <h1 class="text-5xl font-bold mb-5 tracking-tight" style="color:#000000; font-family:'JetBrains Mono','SF Mono','Courier New',monospace; text-transform:uppercase; letter-spacing:0.05em;">
          Select One
        </h1>
        <p class="text-lg max-w-2xl mx-auto leading-relaxed" style="color:#333333; font-family:'JetBrains Mono','SF Mono','Courier New',monospace;">
          Allows the user to select exactly one option from a list of mutually exclusive choices. Ideal for scenarios where a single, clear decision is required. Layout is chosen via the variant property: dropdown/combobox, radio group, segmented control, list picker, and table.
        </p>
      </header>
    `;
  }

  // ===========================================================================
  // SHOWCASE CARDS
  // ===========================================================================
  private renderShowcaseCards(): TemplateResult {
    return html`
      <section class="px-8 py-12" style="background:#f5f5f5; border-bottom:3px solid #000;">
        <div class="max-w-2xl mx-auto flex flex-col gap-5">

          <!-- Card 1: Combobox Brutal -->
          <div style="background:#ffffff; border:3px solid #000; border-radius:0; box-shadow:4px 4px 0 #000;">
            <div class="h-1" style="background:#8b5cf6; border-radius:0;"></div>
            <div class="p-6">
              <div class="flex items-center justify-between mb-1">
                <p class="text-sm font-bold" style="color:#000000; font-family:'JetBrains Mono','SF Mono','Courier New',monospace; text-transform:uppercase; letter-spacing:0.05em;">Combobox</p>
                <code class="text-xs px-2 py-0.5" style="background:#f5f5f5; color:#333333; border:3px solid #000; border-radius:0; font-family:'JetBrains Mono','SF Mono','Courier New',monospace;">groupselectone--ml-combobox-brutal</code>
              </div>
              <p class="text-xs mb-5" style="color:#666666; font-family:'JetBrains Mono','SF Mono','Courier New',monospace;">Dropdown combobox for picking one option from a compact list</p>
              <groupselectone--ml-combobox-brutal
                name="card-1"
                .value=${this.card1}
                .isEditing=${true}
                placeholder="Select a country..."
                @change=${(e: CustomEvent) => { this.card1 = e.detail.value; }}>
                <Label>Country</Label>
                <Helper>Choose the country for this profile</Helper>
                <Item value="br">Brazil</Item>
                <Item value="us">United States</Item>
                <Item value="de">Germany</Item>
                <Item value="jp">Japan</Item>
                <Empty>No countries available</Empty>
              </groupselectone--ml-combobox-brutal>
            </div>
          </div>

          <!-- Card 2: Dial Select Brutal -->
          <div style="background:#ffffff; border:3px solid #000; border-radius:0; box-shadow:4px 4px 0 #000;">
            <div class="h-1" style="background:#10b981; border-radius:0;"></div>
            <div class="p-6">
              <div class="flex items-center justify-between mb-1">
                <p class="text-sm font-bold" style="color:#000000; font-family:'JetBrains Mono','SF Mono','Courier New',monospace; text-transform:uppercase; letter-spacing:0.05em;">Dial Select</p>
                <code class="text-xs px-2 py-0.5" style="background:#f5f5f5; color:#333333; border:3px solid #000; border-radius:0; font-family:'JetBrains Mono','SF Mono','Courier New',monospace;">groupselectone--ml-dial-select-brutal</code>
              </div>
              <p class="text-xs mb-5" style="color:#666666; font-family:'JetBrains Mono','SF Mono','Courier New',monospace;">Rotary dial control for cycling through mutually exclusive choices</p>
              <groupselectone--ml-dial-select-brutal
                name="card-2"
                .value=${this.card2}
                .isEditing=${true}
                @change=${(e: CustomEvent) => { this.card2 = e.detail.value; }}>
                <Label>Plan</Label>
                <Helper>Rotate to pick a billing plan</Helper>
                <Item value="basic">Basic</Item>
                <Item value="pro">Pro</Item>
                <Item value="enterprise">Enterprise</Item>
                <Empty>No plans available</Empty>
              </groupselectone--ml-dial-select-brutal>
            </div>
          </div>

          <!-- Card 3: Select One Autocomplete Brutal -->
          <div style="background:#ffffff; border:3px solid #000; border-radius:0; box-shadow:4px 4px 0 #000;">
            <div class="h-1" style="background:#f59e0b; border-radius:0;"></div>
            <div class="p-6">
              <div class="flex items-center justify-between mb-1">
                <p class="text-sm font-bold" style="color:#000000; font-family:'JetBrains Mono','SF Mono','Courier New',monospace; text-transform:uppercase; letter-spacing:0.05em;">Autocomplete</p>
                <code class="text-xs px-2 py-0.5" style="background:#f5f5f5; color:#333333; border:3px solid #000; border-radius:0; font-family:'JetBrains Mono','SF Mono','Courier New',monospace;">groupselectone--ml-select-one-autocomplete-brutal</code>
              </div>
              <p class="text-xs mb-5" style="color:#666666; font-family:'JetBrains Mono','SF Mono','Courier New',monospace;">Type-ahead single select for long option lists</p>
              <groupselectone--ml-select-one-autocomplete-brutal
                name="card-3"
                .value=${this.card3}
                .isEditing=${true}
                placeholder="Search a city..."
                @change=${(e: CustomEvent) => { this.card3 = e.detail.value; }}>
                <Label>City</Label>
                <Helper>Start typing to filter cities</Helper>
                <Item value="nyc">New York</Item>
                <Item value="ldn">London</Item>
                <Item value="tyo">Tokyo</Item>
                <Item value="par">Paris</Item>
                <Item value="syd">Sydney</Item>
                <Empty>No cities match your search</Empty>
              </groupselectone--ml-select-one-autocomplete-brutal>
            </div>
          </div>

        </div>
      </section>
    `;
  }

  // ===========================================================================
  // REFERENCE TABLE
  // ===========================================================================
  private renderReferenceTable(): TemplateResult {
    const rows: Array<{ scenario: string; combobox: boolean; dial: boolean; autocomplete: boolean }> = [
      { scenario: 'Compact form field with a short fixed list of options', combobox: true, dial: false, autocomplete: false },
      { scenario: 'Playful or spatial UI where options are cycled one-by-one', combobox: false, dial: true, autocomplete: false },
      { scenario: 'Long option list that benefits from type-ahead filtering', combobox: false, dial: false, autocomplete: true },
      { scenario: 'User needs to see all choices at a glance without typing', combobox: true, dial: true, autocomplete: false },
      { scenario: 'Keyboard-first search across dozens of labeled values', combobox: false, dial: false, autocomplete: true },
      { scenario: 'Single clear decision with brutalist visual chrome', combobox: true, dial: true, autocomplete: true },
    ];
    const headers = [
      { label: 'Combobox', cls: 'text-violet-600' },
      { label: 'Dial Select', cls: 'text-emerald-600' },
      { label: 'Autocomplete', cls: 'text-amber-600' },
    ];

    return html`
      <section class="px-8 py-20" style="background:#ffffff; border-top:3px solid #000;">
        <div class="max-w-5xl mx-auto">
          <h2 class="text-2xl font-bold mb-2" style="color:#000000; font-family:'JetBrains Mono','SF Mono','Courier New',monospace; text-transform:uppercase; letter-spacing:0.05em;">Quick reference</h2>
          <p class="text-sm mb-8" style="color:#333333; font-family:'JetBrains Mono','SF Mono','Courier New',monospace;">Pick the layout that matches how users should discover and commit to a single choice — compact dropdown, dial, or searchable autocomplete.</p>
          <div style="background:#ffffff; border:3px solid #000; border-radius:0; box-shadow:4px 4px 0 #000; overflow:hidden;">
            <table class="w-full text-sm" style="font-family:'JetBrains Mono','SF Mono','Courier New',monospace;">
              <thead>
                <tr style="background:#f5f5f5; border-bottom:3px solid #000;">
                  <th class="text-left px-5 py-3.5 text-xs font-bold uppercase tracking-wide w-3/4" style="color:#333333; letter-spacing:0.05em;">Scenario</th>
                  ${headers.map(h => html`
                    <th class="px-4 py-3.5 text-xs font-bold uppercase tracking-wide ${h.cls}" style="letter-spacing:0.05em;">${h.label}</th>
                  `)}
                </tr>
              </thead>
              <tbody>
                ${rows.map((row, i) => html`
                  <tr class="last:border-0" style="border-bottom:3px solid #000; ${i % 2 !== 0 ? 'background:#f5f5f5;' : 'background:#ffffff;'}">
                    <td class="px-5 py-3.5" style="color:#333333;">${row.scenario}</td>
                    ${([row.combobox, row.dial, row.autocomplete] as boolean[]).map(ok => html`
                      <td class="px-4 py-3.5 text-center">
                        ${ok
                          ? html`<span class="inline-flex items-center justify-center w-6 h-6 text-xs font-bold" style="background:#86efac; color:#000000; border:3px solid #000; border-radius:0;">✓</span>`
                          : html`<span class="text-sm" style="color:#999999;">—</span>`}
                      </td>
                    `)}
                  </tr>
                `)}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    `;
  }
}
