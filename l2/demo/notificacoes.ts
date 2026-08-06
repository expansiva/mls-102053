/// <mls fileReference="_102053_/l2/demo/notificacoes.ts" enhancement="_102020_/l2/enhancementAura"/>
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

@customElement('demo--notificacoes-102053')
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
  /** Os slot tags desta página. Serve para saber se um nó ainda está DENTRO do slot de origem. */
  private static readonly SLOTS = 'Message, Action, Label, Value, Trend, Helper, Title, Icon';

  private diagnosticar(): void {
    this.registrar('— as 3 migradas do groupNotifyUser: todas têm de dizer VIVO —');
    this.diagnosticarHost('#1 notify-banner', 'groupnotifyuser--ml-notify-banner[data-origem="banner"]');
    this.diagnosticarHost('#2 contextual-feedback', 'groupnotifyuser--ml-contextual-feedback[data-origem="feedback"]');
    this.diagnosticarHost('#3 toast-notification', 'groupnotifyuser--ml-toast-notification[data-origem="toast"]');
    this.registrar('— os controles —');
    this.diagnosticarHost('#4 banner MISTO (Action vivo + Message snapshot)', 'groupnotifyuser--ml-notify-banner[data-origem="controle"]');
    this.diagnosticarHost('#5 metric-card NÃO migrada', 'groupviewmetric--ml-metric-card[data-origem="controle-nao-migrado"]');
    this.registrar('(o modal só entra no diagnóstico com ele aberto)');
    this.diagnosticarHost('modal (se aberto)', 'groupnotifyuser--ml-alert-modal[data-origem="modal"]');
  }

  /**
   * O veredito, e é ele que vale — não o log de clique.
   *
   * Reescrito em 2026-08-06, depois que a P2 mostrou que **clicar não discrimina nada**: o clone do
   * `unsafeHTML` é um custom element de verdade, upgradeado e clicável, que dispara `action` igual
   * ao nó vivo — e o ouvinte desta página é DELEGADO no contêiner, então captura os dois. O lado B
   * original desta página (o botão no `<Label>` do `ml-metric-card`) **nunca discriminou**:
   * `ml-metric-card.ts:106` também renderiza por `unsafeHTML(getSlotContent('Label'))`.
   *
   * O sinal que separa os dois é **o original ficar ou não retido no slot**:
   *
   *   slot VIVO      → o nó é MOVIDO; não sobra nada dentro do slot tag
   *   slot SNAPSHOT  → o original FICA no slot (oculto pelo `_hideSlotTags`) e nasce um clone fora
   *
   * Por isso o veredito nomeia **quais slots retiveram original** — é o que permite ler o #4, que
   * é misto de propósito: `Action` vivo e `Message` serializado na mesma molécula.
   */
  private veredito(retidos: string[], fora: number, total: number): string {
    if (total === 0) return 'NENHUM nó encontrado — o conteúdo do slot não chegou ao DOM';
    if (retidos.length === 0) {
      return `VIVO — ${total} nó(s), nenhum retido em slot: todos foram movidos para a âncora`;
    }
    const nomes = [...new Set(retidos)].join(', ');
    // Retenção com ZERO nós fora não é snapshot: snapshot sempre produz um clone. É molécula que
    // não renderizou — a região está fechada (`visible=false`) e não há âncora para projetar.
    // Sem esta distinção o modal fechado aparecia como SNAPSHOT, o que assustou à toa em
    // 2026-08-06. O sinal de snapshot é original retido **E** clone fora.
    if (fora === 0) {
      return `NÃO PROJETADO em ${nomes} — original retido e NENHUM nó fora: a região não está renderizada (feche/abra para conferir), não é snapshot`;
    }
    return `SNAPSHOT em ${nomes} — original(is) retido(s) no slot + ${fora} nó(s) fora`;
  }

  private diagnosticarHost(rotulo: string, seletor: string): void {
    const host = this.querySelector(seletor);
    if (!host) {
      this.registrar(`${rotulo}: host não encontrado (normal se a região estiver fechada)`);
      return;
    }
    const moleculas = Array.from(
      host.querySelectorAll('grouptriggeraction--ml-button-standard'),
    ) as HTMLElement[];
    const retidos: string[] = [];
    moleculas.forEach((b) => {
      const slot = b.closest(DemoLiveSlotsNotificacoes.SLOTS);
      if (slot) retidos.push(`<${slot.tagName}>`);
    });

    this.registrar(
      `${rotulo} → ${this.veredito(retidos, moleculas.length - retidos.length, moleculas.length)}`,
    );
    moleculas.forEach((b, i) => {
      const slot = b.closest(DemoLiveSlotsNotificacoes.SLOTS);
      const onde = slot ? `retido no slot <${slot.tagName}>` : 'fora do slot';
      this.registrar(
        `  ${i + 1}) ${onde} · visível=${b.offsetParent !== null} · origem=${b.getAttribute('data-origem')}`,
      );
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
          </p>
          <p class="subtitle">
            <strong>O veredito sai do botão <code>diagnosticar DOM</code>, não do clique.</strong>
            Corrigido em 2026-08-06: a régua original desta página — "o botão do lado B não pode
            disparar" — <strong>estava errada</strong>. O clone do caminho de snapshot é um custom
            element de verdade, upgradeado e clicável, e dispara <code>action</code> igual ao nó
            vivo; o ouvinte daqui é delegado no contêiner e captura os dois. O sinal real é
            <strong>o original ficar ou não retido no slot</strong>: slot vivo MOVE o nó e não deixa
            nada para trás; snapshot mantém o original oculto e cria um clone.
          </p>
        </header>

        ${this.renderControles()}
        ${this.renderMigradas()}
        ${this.renderControle()}
        ${this.renderSondaOnda2()}
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

  /**
   * SONDA DA ONDA 2 — a pergunta que decide se ela vale 119 moléculas.
   *
   * O controle justifica a Onda 2 com "reatividade de graça: o binding do consumidor passa a
   * atualizar no lugar, em vez de congelar no primeiro parse". Só que o `moleculeBase` observa
   * `characterData` com `subtree: true` e re-renderiza quando a mutação cai DENTRO de um slot tag
   * — então texto em `<Label>` talvez já atualize hoje, com o atraso do debounce de 16 ms, sem
   * migração nenhuma.
   *
   * Aqui o MESMO contador aparece em três lugares de uma molécula NÃO migrada: dentro do `<Label>`
   * (slot serializado), dentro do `<Value>` (idem) e fora dela, como referência. Aperte
   * `contador +1` e compare.
   */
  private renderSondaOnda2(): TemplateResult {
    return html`
      <section class="block">
        <h2 class="block-title">Sonda — a Onda 2 entrega mesmo reatividade?</h2>
        <p class="esperado">
          O <code>ml-metric-card</code> NÃO foi migrado: <code>Label</code> e <code>Value</code>
          passam por <code>unsafeHTML(getSlotContent(...))</code>. Aperte
          <code>contador +1</code> algumas vezes e compare os três números.
          <br />
          • Se os três andarem juntos → <strong>o texto do slot serializado JÁ é reativo</strong>
          (o observer re-snapshota), e o ganho principal da Onda 2 não existe.
          <br />
          • Se só o de fora andar → o binding realmente congela, e a Onda 2 se justifica.
        </p>
        <div class="grid">
          <groupviewmetric--ml-metric-card data-origem="sonda-onda2">
            <Label>#6 no slot Label: contador ${this.contador}</Label>
            <Value>no slot Value: ${this.contador}</Value>
          </groupviewmetric--ml-metric-card>
          <p class="leitura">
            referência, fora de qualquer slot: contador <strong>${this.contador}</strong>
          </p>
        </div>
      </section>
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
