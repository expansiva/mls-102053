/// <mls fileReference="_102053_/l2/molecules/groupnotifyuser/index.ts" enhancement="_102020_/l2/enhancementAura"/>
import { html, TemplateResult } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { StateLitElement } from '/_102029_/l2/stateLitElement.js';
import '/_102053_/l2/molecules/groupnotifyuser/ml-alert-modal-brutal';

@customElement('molecules--groupnotifyuser--index-102053')
export class GroupNotifyUserIndex extends StateLitElement {
  // ── Showcase card states ─────────────────────────────────────────────
  @state() private card1Visible = true;

  render(): TemplateResult {
    return html`
      <div class="font-sans" style="min-height:100vh; background: #f5f5f5; font-family:'JetBrains Mono','SF Mono','Courier New',monospace;">
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
      <header style="background:#ffffff; border-bottom:3px solid #000; padding:5rem 2rem; text-align:center;">
        <span style="display:inline-block; padding:0.25rem 0.75rem; background:#3b82f6; color:#ffffff; border:3px solid #000; box-shadow:4px 4px 0 #000; border-radius:0; font-size:0.75rem; font-weight:700; text-transform:uppercase; letter-spacing:0.05em; margin-bottom:1.5rem;">
          groupNotifyUser
        </span>
        <h1 style="font-size:3rem; font-weight:700; color:#000000; margin:0 0 1.25rem 0; letter-spacing:0.05em; text-transform:uppercase;">
          Notify User
        </h1>
        <p style="font-size:1.125rem; color:#333333; max-width:42rem; margin:0 auto; line-height:1.625;">
          Informs the user about events, status changes, or action results. Controlled via visible property. Supports notification types (info, success, warning, error), auto-dismiss with configurable duration, position hints, dismissible toggle, and optional action slot.
        </p>
      </header>
    `;
  }

  // ===========================================================================
  // SHOWCASE CARDS
  // ===========================================================================
  private renderShowcaseCards(): TemplateResult {
    return html`
      <section style="background:#f5f5f5; padding:3rem 2rem; border-bottom:3px solid #000;">
        <div style="max-width:42rem; margin:0 auto; display:flex; flex-direction:column; gap:1.25rem;">
          <div style="background:#ffffff; border:3px solid #000; box-shadow:4px 4px 0 #000; border-radius:0;">
            <div style="height:4px; background:#8b5cf6;"></div>
            <div style="padding:1.5rem;">
              <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:0.25rem; gap:1rem; flex-wrap:wrap;">
                <p style="font-size:0.875rem; font-weight:700; color:#000000; text-transform:uppercase; letter-spacing:0.05em; margin:0;">Alert Modal Brutal</p>
                <code style="font-size:0.75rem; background:#f5f5f5; color:#333333; padding:0.125rem 0.5rem; border:2px solid #000; border-radius:0;">groupnotifyuser--ml-alert-modal-brutal</code>
              </div>
              <p style="font-size:0.75rem; color:#666666; margin:0 0 1.25rem 0;">Blocking modal alert with hard edges, offset shadow, and kinetic dismiss</p>
              <groupnotifyuser--ml-alert-modal-brutal
                name="card-1"
                type="warning"
                .visible=${this.card1Visible}
                .dismissible=${true}
                .duration=${0}
                @dismiss=${() => { this.card1Visible = false; }}
                @action=${() => { this.card1Visible = false; }}>
                <Icon>⚠️</Icon>
                <Title>Update Available</Title>
                <Message>A new version is available. Please update to continue receiving security patches.</Message>
                <Action><button type="button">Update Now</button></Action>
              </groupnotifyuser--ml-alert-modal-brutal>
              ${!this.card1Visible ? html`
                <button
                  type="button"
                  style="margin-top:1rem; padding:0.5rem 1rem; background:#3b82f6; color:#ffffff; border:3px solid #000; box-shadow:4px 4px 0 #000; border-radius:0; font-family:inherit; font-weight:700; text-transform:uppercase; letter-spacing:0.05em; cursor:pointer;"
                  @click=${() => { this.card1Visible = true; }}>
                  Show Alert
                </button>
              ` : ''}
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
    const rows: Array<{ scenario: string; alertModalBrutal: boolean }> = [
      { scenario: 'Blocking modal that demands explicit user acknowledgement', alertModalBrutal: true },
      { scenario: 'Critical error or warning before a destructive action', alertModalBrutal: true },
      { scenario: 'Action result with an optional follow-up button', alertModalBrutal: true },
      { scenario: 'Non-blocking toast for transient status updates', alertModalBrutal: false },
      { scenario: 'Inline form-field validation message', alertModalBrutal: false },
    ];
    const headers = [
      { label: 'Alert Modal Brutal', cls: 'text-violet-600' },
    ];

    return html`
      <section style="background:#ffffff; padding:5rem 2rem; border-top:3px solid #000;">
        <div style="max-width:64rem; margin:0 auto;">
          <h2 style="font-size:1.5rem; font-weight:700; color:#000000; margin:0 0 0.5rem 0; text-transform:uppercase; letter-spacing:0.05em;">Quick reference</h2>
          <p style="font-size:0.875rem; color:#333333; margin:0 0 2rem 0;">Pick the right notify pattern for blocking vs transient feedback</p>
          <div style="background:#ffffff; border:3px solid #000; box-shadow:4px 4px 0 #000; border-radius:0; overflow:hidden;">
            <table style="width:100%; font-size:0.875rem; border-collapse:collapse;">
              <thead>
                <tr style="background:#f5f5f5; border-bottom:3px solid #000;">
                  <th style="text-align:left; padding:0.875rem 1.25rem; font-size:0.75rem; font-weight:700; color:#333333; text-transform:uppercase; letter-spacing:0.05em; width:75%;">Scenario</th>
                  ${headers.map(h => html`
                    <th style="padding:0.875rem 1rem; font-size:0.75rem; font-weight:700; text-transform:uppercase; letter-spacing:0.05em; color:#7c3aed;">${h.label}</th>
                  `)}
                </tr>
              </thead>
              <tbody>
                ${rows.map((row, i) => html`
                  <tr style="border-bottom:2px solid #e5e5e5; ${i % 2 !== 0 ? 'background:#f5f5f5;' : 'background:#ffffff;'}">
                    <td style="padding:0.875rem 1.25rem; color:#000000;">${row.scenario}</td>
                    <td style="padding:0.875rem 1rem; text-align:center;">
                      ${row.alertModalBrutal
                        ? html`<span style="display:inline-flex; align-items:center; justify-content:center; width:1.5rem; height:1.5rem; background:#d1fae5; border:2px solid #000; border-radius:0; color:#059669; font-size:0.75rem; font-weight:700;">✓</span>`
                        : html`<span style="color:#999999; font-size:0.875rem;">—</span>`
                      }
                    </td>
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
