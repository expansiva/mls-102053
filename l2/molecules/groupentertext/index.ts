/// <mls fileReference="_102053_/l2/molecules/groupentertext/index.ts" enhancement="_102020_/l2/enhancementAura"/>
import { html, TemplateResult } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { StateLitElement } from '/_102029_/l2/stateLitElement.js';
import '/_102053_/l2/molecules/groupentertext/ml-cpf-input-brutal';
import '/_102053_/l2/molecules/groupentertext/ml-floating-text-input-brutal';
import '/_102053_/l2/molecules/groupentertext/ml-password-strength-input-brutal';

@customElement('molecules--groupentertext--index-102053')
export class GroupEnterTextIndex extends StateLitElement {
  // ── Showcase card states ─────────────────────────────────────
  @state() private cardCpf = '';
  @state() private cardFloating = '';
  @state() private cardPassword = '';

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
        <span class="inline-block px-3 py-1 text-xs font-bold uppercase mb-6"
          style="background:#3b82f6; color:#ffffff; border:3px solid #000; border-radius:0; box-shadow:4px 4px 0 #000; font-family:'JetBrains Mono','SF Mono','Courier New',monospace; letter-spacing:0.05em;">
          groupEnterText
        </span>
        <h1 class="text-5xl font-bold mb-5 tracking-tight"
          style="color:#000000; font-family:'JetBrains Mono','SF Mono','Courier New',monospace; text-transform:uppercase; letter-spacing:0.05em;">
          Enter Text
        </h1>
        <p class="text-lg max-w-2xl mx-auto leading-relaxed"
          style="color:#333333; font-family:'JetBrains Mono','SF Mono','Courier New',monospace;">
          Allows the user to input free-form text. Ideal for names, descriptions, comments, emails, passwords, and any textual data. Implementations include input, textarea, password input, masked input, input OTP, search input, and tag input.
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

          <!-- CPF Input Brutal -->
          <div style="background:#ffffff; border:3px solid #000; border-radius:0; box-shadow:4px 4px 0 #000;">
            <div class="h-1" style="background:#8b5cf6; border-radius:0;"></div>
            <div class="p-6">
              <div class="flex items-center justify-between mb-1">
                <p class="text-sm font-bold" style="color:#000000; font-family:'JetBrains Mono','SF Mono','Courier New',monospace; text-transform:uppercase; letter-spacing:0.05em;">CPF Input</p>
                <code class="text-xs px-2 py-0.5" style="background:#f5f5f5; color:#333333; border:3px solid #000; border-radius:0; font-family:'JetBrains Mono','SF Mono','Courier New',monospace;">groupentertext--ml-cpf-input-brutal</code>
              </div>
              <p class="text-xs mb-5" style="color:#666666; font-family:'JetBrains Mono','SF Mono','Courier New',monospace;">Masked CPF document field with brutal chrome</p>
              <groupentertext--ml-cpf-input-brutal
                name="card-cpf"
                value="${this.cardCpf}"
                .isEditing=${true}
                placeholder="000.000.000-00"
                @change=${(e: CustomEvent) => { this.cardCpf = e.detail.value; }}>
                <Label>CPF</Label>
                <Helper>Enter your 11-digit CPF number</Helper>
              </groupentertext--ml-cpf-input-brutal>
            </div>
          </div>

          <!-- Floating Text Input Brutal -->
          <div style="background:#ffffff; border:3px solid #000; border-radius:0; box-shadow:4px 4px 0 #000;">
            <div class="h-1" style="background:#10b981; border-radius:0;"></div>
            <div class="p-6">
              <div class="flex items-center justify-between mb-1">
                <p class="text-sm font-bold" style="color:#000000; font-family:'JetBrains Mono','SF Mono','Courier New',monospace; text-transform:uppercase; letter-spacing:0.05em;">Floating Text Input</p>
                <code class="text-xs px-2 py-0.5" style="background:#f5f5f5; color:#333333; border:3px solid #000; border-radius:0; font-family:'JetBrains Mono','SF Mono','Courier New',monospace;">groupentertext--ml-floating-text-input-brutal</code>
              </div>
              <p class="text-xs mb-5" style="color:#666666; font-family:'JetBrains Mono','SF Mono','Courier New',monospace;">Text field with floating label and hard-edge styling</p>
              <groupentertext--ml-floating-text-input-brutal
                name="card-floating"
                value="${this.cardFloating}"
                .isEditing=${true}
                placeholder="Your full name"
                @change=${(e: CustomEvent) => { this.cardFloating = e.detail.value; }}>
                <Label>Full Name</Label>
                <Helper>As it appears on your ID</Helper>
              </groupentertext--ml-floating-text-input-brutal>
            </div>
          </div>

          <!-- Password Strength Input Brutal -->
          <div style="background:#ffffff; border:3px solid #000; border-radius:0; box-shadow:4px 4px 0 #000;">
            <div class="h-1" style="background:#f59e0b; border-radius:0;"></div>
            <div class="p-6">
              <div class="flex items-center justify-between mb-1">
                <p class="text-sm font-bold" style="color:#000000; font-family:'JetBrains Mono','SF Mono','Courier New',monospace; text-transform:uppercase; letter-spacing:0.05em;">Password Strength Input</p>
                <code class="text-xs px-2 py-0.5" style="background:#f5f5f5; color:#333333; border:3px solid #000; border-radius:0; font-family:'JetBrains Mono','SF Mono','Courier New',monospace;">groupentertext--ml-password-strength-input-brutal</code>
              </div>
              <p class="text-xs mb-5" style="color:#666666; font-family:'JetBrains Mono','SF Mono','Courier New',monospace;">Password field with live strength meter in brutal style</p>
              <groupentertext--ml-password-strength-input-brutal
                name="card-password"
                value="${this.cardPassword}"
                .isEditing=${true}
                placeholder="Create a strong password"
                inputType="password"
                @change=${(e: CustomEvent) => { this.cardPassword = e.detail.value; }}>
                <Label>Password</Label>
                <Helper>Use 8+ characters with mixed case and symbols</Helper>
              </groupentertext--ml-password-strength-input-brutal>
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
    const rows: Array<{ scenario: string; cpf: boolean; floating: boolean; password: boolean }> = [
      { scenario: 'Brazilian CPF / document number with digit mask', cpf: true, floating: false, password: false },
      { scenario: 'General free-form text with floating label', cpf: false, floating: true, password: false },
      { scenario: 'Password creation with live strength feedback', cpf: false, floating: false, password: true },
      { scenario: 'Names, emails, comments, or short descriptions', cpf: false, floating: true, password: false },
      { scenario: 'Secure credential entry (masked characters)', cpf: false, floating: false, password: true },
      { scenario: 'Fixed-format numeric ID with auto-formatting', cpf: true, floating: false, password: false },
    ];
    const headers = [
      { label: 'CPF Input', cls: 'text-violet-600' },
      { label: 'Floating Text', cls: 'text-emerald-600' },
      { label: 'Password Strength', cls: 'text-amber-600' },
    ];

    return html`
      <section class="px-8 py-20" style="background:#ffffff; border-top:3px solid #000;">
        <div class="max-w-5xl mx-auto">
          <h2 class="text-2xl font-bold mb-2"
            style="color:#000000; font-family:'JetBrains Mono','SF Mono','Courier New',monospace; text-transform:uppercase; letter-spacing:0.05em;">
            Quick reference
          </h2>
          <p class="text-sm mb-8"
            style="color:#333333; font-family:'JetBrains Mono','SF Mono','Courier New',monospace;">
            Pick the brutal text-entry variant that matches your field: masked CPF, floating-label free text, or password with strength meter.
          </p>
          <div style="background:#ffffff; border:3px solid #000; border-radius:0; box-shadow:4px 4px 0 #000; overflow:hidden;">
            <table class="w-full text-sm">
              <thead>
                <tr style="background:#f5f5f5; border-bottom:3px solid #000;">
                  <th class="text-left px-5 py-3.5 text-xs font-bold uppercase tracking-wide w-3/4"
                    style="color:#333333; font-family:'JetBrains Mono','SF Mono','Courier New',monospace; letter-spacing:0.05em;">Scenario</th>
                  ${headers.map(h => html`
                    <th class="px-4 py-3.5 text-xs font-bold uppercase tracking-wide ${h.cls}"
                      style="font-family:'JetBrains Mono','SF Mono','Courier New',monospace; letter-spacing:0.05em;">${h.label}</th>
                  `)}
                </tr>
              </thead>
              <tbody>
                ${rows.map((row, i) => html`
                  <tr class="last:border-0" style="${i % 2 !== 0 ? 'background:#f5f5f5;' : 'background:#ffffff;'} border-bottom:1px solid #000;">
                    <td class="px-5 py-3.5" style="color:#000000; font-family:'JetBrains Mono','SF Mono','Courier New',monospace;">${row.scenario}</td>
                    ${([row.cpf, row.floating, row.password] as boolean[]).map(ok => html`
                      <td class="px-4 py-3.5 text-center">
                        ${ok
                          ? html`<span class="inline-flex items-center justify-center w-6 h-6 text-xs font-bold"
                              style="background:#86efac; color:#000000; border:3px solid #000; border-radius:0; box-shadow:2px 2px 0 #000;">✓</span>`
                          : html`<span class="text-sm" style="color:#999999;">—</span>`
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
