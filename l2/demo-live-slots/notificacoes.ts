/// <mls fileReference="_102053_/l2/demo-live-slots/notificacoes.ts" enhancement="_102020_/l2/enhancementAura"/>
// P1 do todo/todo-demo-molecules-live-slots.md — valida os slots vivos do groupNotifyUser.
// Sem tema de propósito: o que está sob teste é o mecanismo de slot, não a aparência.
import { html, TemplateResult } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { StateLitElement } from '/_102029_/l2/stateLitElement.js';

// A molécula-controle DENTRO do slot. É este import que o harness de playground não tem,
// e sem ele a molécula aninhada nem chega a ser definida — o teste provaria nada.
import '/_102040_/l2/molecules/grouptriggeraction/ml-button-standard';

// Bloco A — migradas (usesLiveSlots = true)
import '/_102040_/l2/molecules/groupnotifyuser/ml-notify-banner';
import '/_102040_/l2/molecules/groupnotifyuser/ml-contextual-feedback';
import '/_102040_/l2/molecules/groupnotifyuser/ml-toast-notification';
import '/_102040_/l2/molecules/groupnotifyuser/ml-alert-modal';

// Bloco B — grupo de CONTROLE, ainda no snapshot (CardAction via unsafeHTML).
import '/_102040_/l2/molecules/groupviewmetric/ml-metric-card';

@customElement('demo-live-slots--notificacoes-102053')
export class DemoLiveSlotsNotificacoes extends StateLitElement {
  /** Linhas do painel de log. É o que torna o resultado legível sem acompanhar a migração. */
  @state() private log: string[] = [];

  /** Valor do consumidor exibido DENTRO do slot — o teste de reatividade (§7.3). */
  @state() private contador = 0;

  /**
   * Visibilidade das REGIÕES (§7.2). Vai por `.visible` nas moléculas, não por render
   * condicional da página: as moléculas precisam ser as MESMAS instâncias escondendo e
   * reabrindo a própria região. Se a página as removesse do DOM, o Lit criaria outras
   * novas ao voltar, e o bug que este item persegue — projetar uma vez só funciona na
   * primeira abertura — passaria despercebido.
   */
  @state() private regioesAbertas = true;

  /** Quantas vezes já se escondeu e reabriu. O roteiro pede 3. */
  @state() private ciclos = 0;

  /**
   * O modal é controlado à parte porque é overlay: aberto, cobre a página inteira.
   * A molécula NÃO se fecha sozinha ao clicar na ação (`handleActionClick` só dispara
   * o evento) — quem fecha é o consumidor, ecoando o estado. É o mesmo contrato da
   * seleção da ml-data-table-minimal.
   */
  @state() private modalAberto = false;

  // ===========================================================================
  // LOG
  // ===========================================================================

  /**
   * Tanto ml-button-standard quanto as moléculas de notificação disparam 'action',
   * as duas com bubbles+composed. Registrar a TAG de quem disparou é o que separa
   * os dois casos — e é o discriminador do A/B:
   *
   *   slot vivo    → duas linhas: a do BOTÃO (molécula aninhada viva) e a do wrapper
   *   snapshot     → só a do wrapper; o botão é HTML morto e não dispara nada
   */
  private onAction(e: Event): void {
    const alvo = e.target as HTMLElement;
    const tag = alvo.tagName.toLowerCase();
    const origem = alvo.getAttribute('data-origem') || '(sem marca)';
    const ehBotao = tag === 'grouptriggeraction--ml-button-standard';
    this.registrar(`${ehBotao ? 'BOTÃO' : 'wrapper'} · ${origem} · contador=${this.contador}`);

    // Eco do consumidor: a ação do modal fecha o modal. Sem isto ele fica aberto para sempre.
    if (origem.startsWith('modal')) {
      this.modalAberto = false;
      this.registrar('página · fechou o modal ecoando a ação');
    }
  }

  /** O card de controle emite cardClick, não action. Serve para provar que ele está vivo. */
  private onCardClick(): void {
    this.registrar('wrapper · controle-card (cardClick) · o botão dentro dele NÃO disparou');
  }

  /** O X das moléculas mexe no `visible` DELAS; a página precisa ecoar ou o estado desencontra. */
  private onDismiss(e: Event): void {
    const origem = (e.target as HTMLElement).getAttribute('data-origem') || '(sem marca)';
    if (origem === 'modal') this.modalAberto = false;
    this.registrar(`wrapper · ${origem} · dismiss`);
  }

  private registrar(texto: string): void {
    this.log = [...this.log, `#${this.log.length + 1} · ${texto}`];
  }

  private limparLog(): void {
    this.log = [];
  }

  private alternarRegioes(): void {
    this.regioesAbertas = !this.regioesAbertas;
    if (this.regioesAbertas) this.ciclos = this.ciclos + 1;
  }

  private abrirModal(): void {
    this.modalAberto = true;
  }

  private incrementar(): void {
    this.contador = this.contador + 1;
  }

  /**
   * Diz ONDE cada botão do banner de controle está e se está visível. Existe porque a leitura
   * do código não bastou: o `_hideSlotTags()` do moleculeBase põe display:none no slot tag de
   * origem, o que me fez prever que o original ficaria oculto — e a tela mostrou dois botões.
   * Entre deduzir e medir, medir.
   */
  private diagnosticar(): void {
    this.diagnosticarHost('banner MIGRADO', 'groupnotifyuser--ml-notify-banner[data-origem="controle"]');
    this.diagnosticarHost('metric NÃO migrado', 'groupviewmetric--ml-metric-card[data-origem="controle-nao-migrado"]');
  }

  private diagnosticarHost(rotulo: string, seletor: string): void {
    const host = this.querySelector(seletor);
    if (!host) {
      this.registrar(`diagnóstico ${rotulo}: host não encontrado`);
      return;
    }
    const moleculas = Array.from(host.querySelectorAll('grouptriggeraction--ml-button-standard'));
    // O que o olho vê é o <button> nativo que a molécula-botão renderiza. Contar os dois
    // separadamente é o que distingue "existe no DOM" de "aparece na tela".
    const nativos = Array.from(host.querySelectorAll('button')).filter(
      (b) => (b as HTMLElement).offsetParent !== null,
    );
    this.registrar(
      `diagnóstico ${rotulo}: ${moleculas.length} molécula-botão no DOM · ${nativos.length} <button> VISÍVEL na tela`,
    );
    moleculas.forEach((b, i) => {
      const slotAncestral = b.closest('Message, Action, Label, Value, Trend, Helper, Title, Icon');
      const onde = slotAncestral
        ? `slot <${slotAncestral.tagName}>`
        : 'fora de slot (clone do unsafeHTML, ou nó projetado)';
      const displaySlot = slotAncestral ? getComputedStyle(slotAncestral as HTMLElement).display : '—';
      const visivel = (b as HTMLElement).offsetParent !== null;
      this.registrar(
        `  ${i + 1}) em ${onde} · display=${displaySlot} · visível=${visivel} · origem=${b.getAttribute('data-origem')}`,
      );
    });
    nativos.forEach((b, i) => {
      this.registrar(`  <button> visível ${i + 1}: "${(b.textContent || '').trim().slice(0, 40)}"`);
    });
  }

  // ===========================================================================
  // RENDER
  // ===========================================================================

  render(): TemplateResult {
    return html`
      <div class="page" @action=${this.onAction} @cardClick=${this.onCardClick} @dismiss=${this.onDismiss}>
        <header class="head">
          <h1 class="title">Slots vivos — groupNotifyUser (P1)</h1>
          <p class="subtitle">
            Cada botão abaixo é uma molécula (ml-button-standard) dentro do slot de outra molécula.
            O log só registra o BOTÃO se ele estiver vivo.
          </p>
        </header>

        ${this.renderControles()}
        ${this.renderMigradas()}
        ${this.renderControle()}
        ${this.renderModal()}
        ${this.renderLog()}
      </div>
    `;
  }

  private renderControles(): TemplateResult {
    return html`
      <section class="controles">
        <button class="btn" @click=${this.alternarRegioes}>
          ${this.regioesAbertas ? 'esconder regiões' : 'reabrir regiões'}
        </button>
        <button class="btn" @click=${this.incrementar}>contador +1</button>
        <button class="btn" @click=${this.abrirModal}>abrir modal</button>
        <button class="btn" @click=${this.diagnosticar}>diagnosticar DOM</button>
        <button class="btn" @click=${this.limparLog}>limpar log</button>
        <span class="leitura">contador = <strong>${this.contador}</strong></span>
        <span class="leitura">ciclos = <strong>${this.ciclos}</strong> (o roteiro pede 3)</span>
      </section>
    `;
  }

  /**
   * Conteúdo do slot: o botão-molécula (prova o §7.1 — molécula aninhada viva) MAIS um texto
   * com o contador da página (prova o §7.3 — reatividade do binding dentro do slot).
   *
   * O contador fica FORA do <Label> de propósito. O ml-button-standard ainda NÃO foi migrado
   * (ml-button-standard.ts:157 lê o Label por getSlotContent), então o que ele mostra é um
   * clone serializado: um binding do Lit posto ali dentro morre na serialização DELE, e o
   * teste mediria o slot errado. Como irmão do botão, o span está no slot da molécula
   * externa — que é o que esta migração mudou.
   */
  private conteudoSlot(origem: string, texto: string): TemplateResult {
    return html`
      <grouptriggeraction--ml-button-standard data-variant="primary" data-origem=${origem}>
        <Label>${texto}</Label>
      </grouptriggeraction--ml-button-standard>
      <span class="eco">contador ${this.contador}</span>
    `;
  }

  private renderMigradas(): TemplateResult {
    return html`
      <section class="block">
        <h2 class="block-title">A — migradas (slot vivo)</h2>
        <p class="esperado">
          Esperado: clicar no botão gera DUAS linhas — BOTÃO e wrapper. "esconder regiões" alterna
          o <code>visible</code> destas MESMAS instâncias; ao reabrir, o botão tem de continuar
          respondendo.
        </p>
        <div class="grid">
          <groupnotifyuser--ml-notify-banner
            type="warning"
            data-origem="banner"
            .visible=${this.regioesAbertas}
          >
            <Title>#1 Banner</Title>
            <Message>A sessão vai expirar.</Message>
            <Action>${this.conteudoSlot('banner-btn', '#1 Estender')}</Action>
          </groupnotifyuser--ml-notify-banner>

          <groupnotifyuser--ml-contextual-feedback
            type="success"
            data-origem="feedback"
            .visible=${this.regioesAbertas}
          >
            <Title>#2 Feedback</Title>
            <Message>Pagamento aprovado.</Message>
            <Action>${this.conteudoSlot('feedback-btn', '#2 Ver recibo')}</Action>
          </groupnotifyuser--ml-contextual-feedback>

          <groupnotifyuser--ml-toast-notification
            type="info"
            data-origem="toast"
            position=""
            .visible=${this.regioesAbertas}
          >
            <Title>#3 Toast</Title>
            <Message>Arquivo pronto.</Message>
            <Action>${this.conteudoSlot('toast-btn', '#3 Baixar')}</Action>
          </groupnotifyuser--ml-toast-notification>
        </div>
      </section>
    `;
  }

  /**
   * A/B dentro da MESMA instância, e é a forma mais limpa de isolar a variável: os dois botões
   * são o mesmo componente, na mesma molécula, no mesmo passe de render — só muda o SLOT.
   * `Action` é vivo; `Message` continua no snapshot e vai continuar (a régua da TASK manda
   * conteúdo ficar serializado), então este controle sobrevive a todas as ondas.
   *
   * A primeira versão usava ml-profile-card como controle, mas ele é da Onda 1: migrá-lo
   * apagaria o lado B da página.
   */
  private renderControle(): TemplateResult {
    return html`
      <section class="block">
        <h2 class="block-title">B — controle: dois slots da MESMA molécula</h2>
        <p class="esperado">
          Esperado: o botão em <code>Message</code> (snapshot) NÃO gera linha nenhuma — é HTML
          morto. O botão em <code>Action</code> (vivo) gera BOTÃO + wrapper. Mesma instância.
        </p>
        <div class="grid">
          <groupnotifyuser--ml-notify-banner type="error" data-origem="controle" .visible=${true}>
            <Title>#4 Controle</Title>
            <Message>
              slot Message, serializado:
              ${this.conteudoSlot('controle-morto', '#4 NÃO deve disparar')}
            </Message>
            <Action>${this.conteudoSlot('controle-vivo', '#4 DEVE disparar')}</Action>
          </groupnotifyuser--ml-notify-banner>

          <groupviewmetric--ml-metric-card data-origem="controle-nao-migrado">
            <Label>
              #5 molécula NÃO migrada
              ${this.conteudoSlot('nao-migrado-btn', '#5 comparação')}
            </Label>
            <Value>—</Value>
          </groupviewmetric--ml-metric-card>
        </div>
      </section>
    `;
  }

  /**
   * Fica fora dos blocos porque é overlay: aberto, cobre a página. Abre pelo botão da barra e
   * fecha pela ação ou pelo X — os dois caminhos passam pelo eco do consumidor.
   */
  private renderModal(): TemplateResult {
    return html`
      <groupnotifyuser--ml-alert-modal
        type="warning"
        data-origem="modal"
        dismissible
        .visible=${this.modalAberto}
      >
        <Title>#5 Modal</Title>
        <Message>Confirma a exclusão?</Message>
        <Action>${this.conteudoSlot('modal-btn', '#5 Excluir')}</Action>
      </groupnotifyuser--ml-alert-modal>
    `;
  }

  private renderLog(): TemplateResult {
    return html`
      <section class="block">
        <h2 class="block-title">Log de eventos</h2>
        ${this.log.length === 0
          ? html`<p class="vazio">nada ainda — clique nos botões acima</p>`
          : html`<ol class="log">${this.log.map((l) => html`<li>${l}</li>`)}</ol>`}
      </section>
    `;
  }
}
