/// <mls fileReference="_102053_/l2/molecules/groupenterdate/index.ts" enhancement="_102020_/l2/enhancementAura"/>
import { html, TemplateResult } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { StateLitElement } from '/_102029_/l2/stateLitElement.js';
import '/_102053_/l2/molecules/groupenterdate/ml-compact-calendar-brutal';
import '/_102053_/l2/molecules/groupenterdate/ml-date-shortcut-picker-brutal';

@customElement('molecules--groupenterdate--index-102053')
export class GroupEnterDateIndex extends StateLitElement {
  // ── Showcase card states ─────────────────────────────────────────────
  @state() private card1: string | null = '2026-07-24';
  @state() private card2: string | null = '2026-08-15';

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
      <header style="background:#ffffff; border-bottom:3px solid #000;" class="px-8 py-20 text-center">
        <span style="background:#3b82f6; color:#ffffff; border:3px solid #000; box-shadow:4px 4px 0 #000; border-radius:0; font-family:'JetBrains Mono','SF Mono','Courier New',monospace; font-weight:700; text-transform:uppercase; letter-spacing:0.05em;" class="inline-block px-3 py-1 text-xs mb-6">
          groupEnterDate
        </span>
        <h1 style="color:#000000; font-family:'JetBrains Mono','SF Mono','Courier New',monospace; font-weight:700; text-transform:uppercase; letter-spacing:0.05em;" class="text-5xl mb-5 tracking-tight">
          Enter Date
        </h1>
        <p style="color:#333333; font-family:'JetBrains Mono','SF Mono','Courier New',monospace;" class="text-lg max-w-2xl mx-auto leading-relaxed">
          Allows the user to input a date only (no time). Ideal for birth dates, due dates, contract effective dates, expiration dates, and any scenario where the time of day is irrelevant. Implementations include date picker, masked date input, inline calendar, and month/year picker.
        </p>
      </header>
    `;
  }

  // ===========================================================================
  // SHOWCASE CARDS
  // ===========================================================================
  private renderShowcaseCards(): TemplateResult {
    return html`
      <section style="background:#f5f5f5; border-bottom:3px solid #000;" class="px-8 py-12">
        <div class="max-w-2xl mx-auto flex flex-col gap-5">

          <div style="background:#ffffff; border:3px solid #000; border-radius:0; box-shadow:4px 4px 0 #000;">
            <div style="height:4px; background:#8b5cf6; border-radius:0;"></div>
            <div class="p-6">
              <div class="flex items-center justify-between mb-1">
                <p style="color:#000000; font-family:'JetBrains Mono','SF Mono','Courier New',monospace; font-weight:700; text-transform:uppercase; letter-spacing:0.05em;" class="text-sm">Compact Calendar</p>
                <code style="background:#f5f5f5; color:#333333; border:3px solid #000; border-radius:0; font-family:'JetBrains Mono','SF Mono','Courier New',monospace;" class="text-xs px-2 py-0.5">groupenterdate--ml-compact-calendar-brutal</code>
              </div>
              <p style="color:#666666; font-family:'JetBrains Mono','SF Mono','Courier New',monospace;" class="text-xs mb-5">Inline compact calendar for picking a single date at a glance</p>
              <groupenterdate--ml-compact-calendar-brutal
                name="card-1"
                .value=${this.card1}
                .isEditing=${true}
                locale="en-US"
                @change=${(e: CustomEvent) => { this.card1 = e.detail.value; }}>
                <Label>Birth Date</Label>
                <Helper>Select your date of birth</Helper>
              </groupenterdate--ml-compact-calendar-brutal>
            </div>
          </div>

          <div style="background:#ffffff; border:3px solid #000; border-radius:0; box-shadow:4px 4px 0 #000;">
            <div style="height:4px; background:#10b981; border-radius:0;"></div>
            <div class="p-6">
              <div class="flex items-center justify-between mb-1">
                <p style="color:#000000; font-family:'JetBrains Mono','SF Mono','Courier New',monospace; font-weight:700; text-transform:uppercase; letter-spacing:0.05em;" class="text-sm">Date Shortcut Picker</p>
                <code style="background:#f5f5f5; color:#333333; border:3px solid #000; border-radius:0; font-family:'JetBrains Mono','SF Mono','Courier New',monospace;" class="text-xs px-2 py-0.5">groupenterdate--ml-date-shortcut-picker-brutal</code>
              </div>
              <p style="color:#666666; font-family:'JetBrains Mono','SF Mono','Courier New',monospace;" class="text-xs mb-5">Quick shortcuts plus calendar for common relative dates</p>
              <groupenterdate--ml-date-shortcut-picker-brutal
                name="card-2"
                .value=${this.card2}
                .isEditing=${true}
                locale="en-US"
                @change=${(e: CustomEvent) => { this.card2 = e.detail.value; }}>
                <Label>Due Date</Label>
                <Helper>Pick a due date or use a shortcut</Helper>
              </groupenterdate--ml-date-shortcut-picker-brutal>
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
    const rows: Array<{ scenario: string; compactCalendar: boolean; dateShortcutPicker: boolean }> = [
      { scenario: 'Need a compact inline calendar always visible for fast single-date selection', compactCalendar: true, dateShortcutPicker: false },
      { scenario: 'User often picks relative dates (today, tomorrow, next week) via shortcuts', compactCalendar: false, dateShortcutPicker: true },
      { scenario: 'Birth dates, contract effective dates, or any date where time is irrelevant', compactCalendar: true, dateShortcutPicker: true },
      { scenario: 'Prefer keyboard-friendly shortcut chips alongside a calendar grid', compactCalendar: false, dateShortcutPicker: true },
      { scenario: 'Minimal chrome — just the month grid without preset chips', compactCalendar: true, dateShortcutPicker: false },
      { scenario: 'Due dates and deadlines with common relative options', compactCalendar: true, dateShortcutPicker: true },
    ];
    const headers = [
      { label: 'Compact Calendar', cls: 'text-violet-600' },
      { label: 'Date Shortcut Picker', cls: 'text-emerald-600' },
    ];

    return html`
      <section style="background:#ffffff; border-top:3px solid #000;" class="px-8 py-20">
        <div class="max-w-5xl mx-auto">
          <h2 style="color:#000000; font-family:'JetBrains Mono','SF Mono','Courier New',monospace; font-weight:700; text-transform:uppercase; letter-spacing:0.05em;" class="text-2xl mb-2">Quick reference</h2>
          <p style="color:#333333; font-family:'JetBrains Mono','SF Mono','Courier New',monospace;" class="text-sm mb-8">Choose between a compact inline calendar and a shortcut-driven date picker when the user must supply a date with no time component.</p>
          <div style="background:#ffffff; border:3px solid #000; border-radius:0; box-shadow:4px 4px 0 #000; overflow:hidden;">
            <table class="w-full text-sm" style="font-family:'JetBrains Mono','SF Mono','Courier New',monospace;">
              <thead>
                <tr style="background:#f5f5f5; border-bottom:3px solid #000;">
                  <th class="text-left px-5 py-3.5 text-xs font-semibold uppercase tracking-wide w-3/4" style="color:#666666; letter-spacing:0.05em;">Scenario</th>
                  ${headers.map(h => html`
                    <th class="px-4 py-3.5 text-xs font-semibold uppercase tracking-wide ${h.cls}" style="letter-spacing:0.05em;">${h.label}</th>
                  `)}
                </tr>
              </thead>
              <tbody>
                ${rows.map((row, i) => html`
                  <tr style="${i % 2 !== 0 ? 'background:#f5f5f5;' : 'background:#ffffff;'} border-bottom:3px solid #000;" class="last:border-0">
                    <td class="px-5 py-3.5" style="color:#333333;">${row.scenario}</td>
                    ${([row.compactCalendar, row.dateShortcutPicker] as boolean[]).map(ok => html`
                      <td class="px-4 py-3.5 text-center">
                        ${ok
                          ? html`<span style="background:#86efac; color:#000000; border:3px solid #000; border-radius:0; box-shadow:2px 2px 0 #000;" class="inline-flex items-center justify-center w-6 h-6 text-xs font-bold">✓</span>`
                          : html`<span style="color:#cccccc;" class="text-sm">—</span>`
                        }
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
