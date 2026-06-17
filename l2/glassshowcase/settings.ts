/// <mls fileReference="_102053_/l2/glassshowcase/settings.ts" enhancement="_102020_/l2/enhancementAura"/>
// =============================================================================
// GLASS SHOWCASE — SETTINGS (Configurações)
// =============================================================================
// Moléculas DENTRO do accordion são renderizadas via unsafeHTML (string), então
// não aceitam bindings lit (.value/@change). Padrão: não-controladas + DELEGAÇÃO
// por `name` (listener @change/@input no accordion). Conteúdo das Section deve ser
// ESTÁVEL para o cache do unsafeHTML preservar o estado interno ao expandir/colapsar.
//
// Valores iniciais: usar value="true" para ligado e OMITIR value para desligado
// (evita ambiguidade do conversor Boolean de atributo).
import { html, TemplateResult } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { StateLitElement } from '/_102029_/l2/stateLitElement.js';

import '/_102054_/l2/molecules/groupentertext/ml-floating-text-input';
import '/_102054_/l2/molecules/groupenterboolean/ml-toggle-switch';
import '/_102054_/l2/molecules/groupexpandcontent/ml-accordion';
import '/_102054_/l2/molecules/grouptriggeraction/ml-button-standard';

@customElement('glassshowcase--settings')
export class GlassShowcaseSettings extends StateLitElement {
  // Estado observado via delegação (não realimenta as moléculas — apenas registra).
  @state() private dirty = false;
  @state() private loading = false;
  private values: Record<string, unknown> = {
    'profile-name': 'Ada Lovelace',
    'profile-email': 'ada@aurora.dev',
    'notif-weekly': true,
    'notif-product': false,
    'priv-2fa': true,
    'priv-profile-public': false,
  };

  // ── Delegação por name ──────────────────────────────────────────────────────
  private onFieldChange = (e: Event) => {
    const el = e.target as HTMLElement;
    const name = el?.getAttribute?.('name');
    if (!name) return;
    this.values[name] = (e as CustomEvent).detail?.value;
    if (!this.dirty) this.dirty = true;
  };

  private onSave() {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
      this.dirty = false;
    }, 1500);
  }
  private onCancel() {
    // Limitação conhecida: não reseta visualmente as moléculas não-controladas
    // (resetar exigiria mudar a string da Section e quebraria o cache do unsafeHTML).
    this.dirty = false;
  }

  render(): TemplateResult {
    return html`
      <div class="page">
        <div class="shell">
          <header class="head">
            <div class="brand">◆ Aurora</div>
            <h1 class="title">Configurações</h1>
            <p class="subtitle">Gerencie sua conta e preferências</p>
          </header>

          <div class="panel">
            <!-- Delegação: eventos das moléculas aninhadas borbulham até o accordion -->
            <groupexpandcontent--ml-accordion
              multiple="true"
              @change=${this.onFieldChange}
              @input=${this.onFieldChange}
            >
              <Label>Conta</Label>
              <Section title="Perfil" expanded>
                <div class="section-body">
                  <groupentertext--ml-floating-text-input name="profile-name" value="Ada Lovelace" is-editing="true">
                    <Label>Nome</Label>
                  </groupentertext--ml-floating-text-input>
                  <groupentertext--ml-floating-text-input
                    name="profile-email"
                    value="ada@aurora.dev"
                    input-type="email"
                    is-editing="true"
                  >
                    <Label>E-mail</Label>
                  </groupentertext--ml-floating-text-input>
                </div>
              </Section>
              <Section title="Notificações">
                <div class="section-body">
                  <groupenterboolean--ml-toggle-switch name="notif-weekly" value="true" is-editing="true">
                    <Label>Resumo semanal por e-mail</Label>
                  </groupenterboolean--ml-toggle-switch>
                  <groupenterboolean--ml-toggle-switch name="notif-product" is-editing="true">
                    <Label>Novidades do produto</Label>
                  </groupenterboolean--ml-toggle-switch>
                </div>
              </Section>
              <Section title="Privacidade">
                <div class="section-body">
                  <groupenterboolean--ml-toggle-switch name="priv-2fa" value="true" is-editing="true">
                    <Label>Autenticação em duas etapas</Label>
                  </groupenterboolean--ml-toggle-switch>
                  <groupenterboolean--ml-toggle-switch name="priv-profile-public" is-editing="true">
                    <Label>Tornar perfil público</Label>
                  </groupenterboolean--ml-toggle-switch>
                </div>
              </Section>
              <Section title="Faturamento (bloqueado)" disabled>
                Contate um administrador para alterar dados de faturamento.
              </Section>
            </groupexpandcontent--ml-accordion>

            <div class="actions">
              <grouptriggeraction--ml-button-standard
                data-variant="primary"
                .loading=${this.loading}
                .disabled=${!this.dirty}
                @action=${this.onSave}
              >
                <Label>Salvar alterações</Label>
              </grouptriggeraction--ml-button-standard>
              <grouptriggeraction--ml-button-standard data-variant="ghost" @action=${this.onCancel}>
                <Label>Cancelar</Label>
              </grouptriggeraction--ml-button-standard>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}
