/// <mls fileReference="_102053_/l2/molecules/groupenterboolean/index.ts" enhancement="_102020_/l2/enhancementAura"/>
import { html, TemplateResult } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { StateLitElement } from '/_102029_/l2/stateLitElement.js';
import '/_102053_/l2/molecules/groupenterboolean/ml-boolean-segmented-brutal';
import '/_102053_/l2/molecules/groupenterboolean/ml-checkbox-preference-brutal';

@customElement('molecules--groupenterboolean--index-102053')
export class GroupEnterBooleanIndex extends StateLitElement {
  // ── Showcase card states ─────────────────────────────────────────────
  @state() private card1 = false;
  @state() private card2 = false;

  render() {
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
      <header style="background:#ffffff; border-bottom:3px solid #000; padding:5rem 2rem; text-align:center; font-family:'JetBrains Mono','SF Mono','Courier New',monospace;">
        <span style="display:inline-block; padding:0.25rem 0.75rem; background:#3b82f6; color:#ffffff; border:3px solid #000; box-shadow:4px 4px 0 #000; font-size:0.75rem; font-weight:700; text-transform:uppercase; letter-spacing:0.05em; margin-bottom:1.5rem;">
          groupEnterBoolean
        </span>
        <h1 style="font-size:3rem; font-weight:700; color:#000000; margin:0 0 1.25rem; letter-spacing:0.05em; text-transform:uppercase;">
          Enter Boolean
        </h1>
        <p style="font-size:1.125rem; color:#333333; max-width:42rem; margin:0 auto; line-height:1.625; font-weight:700;">
          Allows the user to input a true/false decision. Value is boolean — starts as false until the user changes it. Implementations are toggle/switch and checkbox, fully interchangeable by swapping the component tag.
        </p>
      </header>
    `;
  }

  // ===========================================================================
  // SHOWCASE CARDS
  // ===========================================================================
  private renderShowcaseCards(): TemplateResult {
    return html`
      <section style="background:#f5f5f5; padding:3rem 2rem; border-bottom:3px solid #000; font-family:'JetBrains Mono','SF Mono','Courier New',monospace;">
        <div class="max-w-2xl mx-auto flex flex-col gap-5">

          <div style="background:#ffffff; border:3px solid #000; box-shadow:4px 4px 0 #000; border-radius:0;">
            <div style="height:4px; background:#8b5cf6;"></div>
            <div class="p-6">
              <div class="flex items-center justify-between mb-1">
                <p style="font-size:0.875rem; font-weight:700; color:#000000; text-transform:uppercase; letter-spacing:0.05em;">Boolean Segmented</p>
                <code style="font-size:0.75rem; background:#f5f5f5; color:#333333; padding:0.125rem 0.5rem; border:3px solid #000; font-weight:700;">groupenterboolean--ml-boolean-segmented-brutal</code>
              </div>
              <p style="font-size:0.75rem; color:#666666; margin-bottom:1.25rem; font-weight:700;">Segmented true/false control for binary decisions</p>
              <groupenterboolean--ml-boolean-segmented-brutal
                name="card-1"
                .value=${this.card1}
                .isEditing=${true}
                @change=${(e: CustomEvent) => { this.card1 = e.detail.value; }}>
                <Label>Enable notifications</Label>
                <Helper>Toggle to receive alerts about account activity</Helper>
              </groupenterboolean--ml-boolean-segmented-brutal>
            </div>
          </div>

          <div style="background:#ffffff; border:3px solid #000; box-shadow:4px 4px 0 #000; border-radius:0;">
            <div style="height:4px; background:#10b981;"></div>
            <div class="p-6">
              <div class="flex items-center justify-between mb-1">
                <p style="font-size:0.875rem; font-weight:700; color:#000000; text-transform:uppercase; letter-spacing:0.05em;">Checkbox Preference</p>
                <code style="font-size:0.75rem; background:#f5f5f5; color:#333333; padding:0.125rem 0.5rem; border:3px solid #000; font-weight:700;">groupenterboolean--ml-checkbox-preference-brutal</code>
              </div>
              <p style="font-size:0.75rem; color:#666666; margin-bottom:1.25rem; font-weight:700;">Checkbox-style preference for accepting terms or options</p>
              <groupenterboolean--ml-checkbox-preference-brutal
                name="card-2"
                .value=${this.card2}
                .isEditing=${true}
                @change=${(e: CustomEvent) => { this.card2 = e.detail.value; }}>
                <Label>I accept the terms and conditions</Label>
                <Helper>You must accept to continue</Helper>
              </groupenterboolean--ml-checkbox-preference-brutal>
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
    const rows: Array<{ scenario: string; segmented: boolean; checkbox: boolean }> = [
      { scenario: 'On/off setting with a clear binary choice (e.g. enable notifications)', segmented: true, checkbox: true },
      { scenario: 'Terms acceptance or preference confirmation in a form', segmented: true, checkbox: true },
      { scenario: 'Compact segmented control when space is tight and both states should be visible', segmented: true, checkbox: false },
      { scenario: 'Familiar checkbox pattern for multi-option preference lists', segmented: false, checkbox: true },
      { scenario: 'Interchangeable true/false field — swap tag without changing bindings', segmented: true, checkbox: true },
    ];
    const headers = [
      { label: 'Segmented', cls: 'text-violet-600' },
      { label: 'Checkbox', cls: 'text-emerald-600' },
    ];

    return html`
      <section style="background:#ffffff; padding:5rem 2rem; border-top:3px solid #000; font-family:'JetBrains Mono','SF Mono','Courier New',monospace;">
        <div class="max-w-5xl mx-auto">
          <h2 style="font-size:1.5rem; font-weight:700; color:#000000; margin:0 0 0.5rem; text-transform:uppercase; letter-spacing:0.05em;">Quick reference</h2>
          <p style="font-size:0.875rem; color:#333333; margin:0 0 2rem; font-weight:700;">
            Both implementations share the same boolean contract — pick segmented for dual-state visibility, checkbox for familiar preference patterns.
          </p>
          <div style="background:#ffffff; border:3px solid #000; box-shadow:4px 4px 0 #000; border-radius:0; overflow:hidden;">
            <table class="w-full text-sm" style="border-collapse:collapse;">
              <thead>
                <tr style="background:#f5f5f5; border-bottom:3px solid #000;">
                  <th class="text-left px-5 py-3.5 w-3/4" style="font-size:0.75rem; font-weight:700; color:#333333; text-transform:uppercase; letter-spacing:0.05em;">Scenario</th>
                  ${headers.map(h => html`
                    <th class="px-4 py-3.5 ${h.cls}" style="font-size:0.75rem; font-weight:700; text-transform:uppercase; letter-spacing:0.05em;">${h.label}</th>
                  `)}
                </tr>
              </thead>
              <tbody>
                ${rows.map((row, i) => html`
                  <tr style="border-bottom:3px solid #000; ${i % 2 !== 0 ? 'background:#f5f5f5;' : 'background:#ffffff;'}">
                    <td class="px-5 py-3.5" style="color:#000000; font-weight:700;">${row.scenario}</td>
                    ${([row.segmented, row.checkbox] as boolean[]).map(ok => html`
                      <td class="px-4 py-3.5 text-center">
                        ${ok
                          ? html`<span style="display:inline-flex; align-items:center; justify-content:center; width:1.5rem; height:1.5rem; background:#3b82f6; color:#ffffff; border:3px solid #000; box-shadow:2px 2px 0 #000; font-size:0.75rem; font-weight:700;">✓</span>`
                          : html`<span style="color:#999999; font-size:0.875rem; font-weight:700;">—</span>`}
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
