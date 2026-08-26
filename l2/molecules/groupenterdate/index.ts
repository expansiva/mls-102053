/// <mls fileReference="_102053_/l2/molecules/groupenterdate/index.ts" enhancement="_102020_/l2/enhancementAura"/>
import { html, TemplateResult } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { StateLitElement } from '/_102029_/l2/stateLitElement.js';
import '/_102053_/l2/molecules/groupenterdate/ml-compact-calendar';
import '/_102053_/l2/molecules/groupenterdate/ml-date-picker';
import '/_102053_/l2/molecules/groupenterdate/ml-date-shortcut-picker';
import '/_102053_/l2/molecules/groupenterdate/ml-inline-calendar';
import { molecules, scenarios } from '/_102053_/l2/molecules/groupenterdate/index.defs';
import { renderCatalogReferenceTable } from '/_102020_/l2/aura/molecules/shared/indexReferenceTable.js';

@customElement('molecules--groupenterdate--index-102053')
export class GroupEnterDateIndex extends StateLitElement {
  @state() private cardCompactCalendar: string | null = null;
  @state() private cardDatePicker = '2026-08-26';
  @state() private cardDateShortcutPicker = '2026-09-15';
  @state() private cardInlineCalendar = '2026-08-26';

  private renderHero(): TemplateResult {
    return html`
      <header class="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 px-8 py-20 text-center">
        <span class="inline-block px-3 py-1 bg-sky-100 dark:bg-sky-900 text-sky-600 dark:text-sky-300 rounded-full text-xs font-semibold uppercase tracking-widest mb-6">groupEnterDate</span>
        <h1 class="text-5xl font-bold text-slate-900 dark:text-slate-50 mb-5 tracking-tight">Enter Date</h1>
        <p class="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Allows the user to input a date only, with no time component. Choose from a date picker, masked date input, inline calendar, or month/year picker for birth dates, due dates, contracts, and expiration dates.
        </p>
      </header>
    `;
  }

  private renderShowcaseCards(): TemplateResult {
    return html`
      <section class="bg-slate-50 dark:bg-slate-950 px-8 py-12 border-b border-slate-200 dark:border-slate-700">
        <div class="max-w-2xl mx-auto flex flex-col gap-5">
          <div class="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
            <div class="h-1 bg-violet-500 rounded-t-2xl"></div>
            <div class="p-6">
              <div class="flex items-center justify-between mb-1">
                <p class="text-sm font-bold text-slate-900 dark:text-slate-50">Compact Calendar</p>
                <code class="text-xs bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 px-2 py-0.5 rounded">groupenterdate--ml-compact-calendar</code>
              </div>
              <p class="text-xs text-slate-400 mb-5">A compact calendar for selecting a date in constrained spaces.</p>
              <groupenterdate--ml-compact-calendar
                name="compact-calendar"
                .value=${this.cardCompactCalendar}
                .isEditing=${true}
                @change=${(e: CustomEvent) => { this.cardCompactCalendar = e.detail.value; }}>
                <Label>Preferred appointment date</Label>
                <Helper>Choose a date from the compact calendar.</Helper>
              </groupenterdate--ml-compact-calendar>
            </div>
          </div>

          <div class="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
            <div class="h-1 bg-emerald-500 rounded-t-2xl"></div>
            <div class="p-6">
              <div class="flex items-center justify-between mb-1">
                <p class="text-sm font-bold text-slate-900 dark:text-slate-50">Date Picker</p>
                <code class="text-xs bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 px-2 py-0.5 rounded">groupenterdate--ml-date-picker</code>
              </div>
              <p class="text-xs text-slate-400 mb-5">A familiar input with calendar assistance for everyday date entry.</p>
              <groupenterdate--ml-date-picker
                name="date-picker"
                value="${this.cardDatePicker}"
                locale="en-US"
                placeholder="MM/DD/YYYY"
                .isEditing=${true}
                @change=${(e: CustomEvent) => { this.cardDatePicker = e.detail.value; }}>
                <Label>Contract effective date</Label>
                <Helper>Enter the date the agreement becomes active.</Helper>
              </groupenterdate--ml-date-picker>
            </div>
          </div>

          <div class="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
            <div class="h-1 bg-amber-500 rounded-t-2xl"></div>
            <div class="p-6">
              <div class="flex items-center justify-between mb-1">
                <p class="text-sm font-bold text-slate-900 dark:text-slate-50">Date Shortcut Picker</p>
                <code class="text-xs bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 px-2 py-0.5 rounded">groupenterdate--ml-date-shortcut-picker</code>
              </div>
              <p class="text-xs text-slate-400 mb-5">A date picker with shortcuts for common relative dates.</p>
              <groupenterdate--ml-date-shortcut-picker
                name="date-shortcut-picker"
                value="${this.cardDateShortcutPicker}"
                locale="en-US"
                .isEditing=${true}
                @change=${(e: CustomEvent) => { this.cardDateShortcutPicker = e.detail.value; }}>
                <Label>Reminder date</Label>
                <Helper>Use a shortcut or select a specific date.</Helper>
              </groupenterdate--ml-date-shortcut-picker>
            </div>
          </div>

          <div class="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
            <div class="h-1 bg-rose-500 rounded-t-2xl"></div>
            <div class="p-6">
              <div class="flex items-center justify-between mb-1">
                <p class="text-sm font-bold text-slate-900 dark:text-slate-50">Inline Calendar</p>
                <code class="text-xs bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 px-2 py-0.5 rounded">groupenterdate--ml-inline-calendar</code>
              </div>
              <p class="text-xs text-slate-400 mb-5">An always-visible calendar for visual date selection and browsing.</p>
              <groupenterdate--ml-inline-calendar
                name="inline-calendar"
                .value=${this.cardInlineCalendar}
                locale="en-US"
                .isEditing=${true}
                @change=${(e: CustomEvent) => { this.cardInlineCalendar = e.detail.value; }}>
                <Label>Delivery date</Label>
                <Helper>Select the day your order should arrive.</Helper>
              </groupenterdate--ml-inline-calendar>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  private renderReferenceTable(): TemplateResult {
    return renderCatalogReferenceTable(molecules, scenarios);
  }

  render(): TemplateResult {
    return html`
      <div class="font-sans min-h-screen">
        ${this.renderHero()}
        ${this.renderShowcaseCards()}
        ${this.renderReferenceTable()}
      </div>
    `;
  }
}
