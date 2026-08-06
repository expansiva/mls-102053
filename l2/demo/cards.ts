/// <mls fileReference="_102053_/l2/demo/cards.ts" enhancement="_102020_/l2/enhancementAura"/>
// P3 do todo/todo-demo-molecules-live-slots.md — valida os DOIS slots vivos do groupViewCard
// (`CardFooter` e `CardAction`) nas três moléculas migradas na Onda 1.
// Sem tema de propósito: o que está sob teste é o mecanismo de slot, não a aparência.
//
// Medido antes de escrever (e é o que dá o A/B desta página): nas três migradas, `CardFooter` e
// `CardAction` são VIVOS e os quatro `Card*` de conteúdo continuam no snapshot. A
// `ml-view-card-media` é da mesma família e **não foi migrada** — os seis slots dela ainda passam
// por `getSlotContent`. Ela é o lado B.
//
// Como na P2, estas moléculas não têm `visible` e não tiram a âncora do render, então o caso
// "a âncora some e volta" (§7.2) não existe aqui — quem o exercita é a P1 e a P4. No lugar dele,
// esta página troca o CONTEÚDO do slot, que é o caso do `_currentNodes`.
import { html, TemplateResult } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { StateLitElement } from '/_102029_/l2/stateLitElement.js';

// A molécula-controle DENTRO do slot. Sem este import ela nem é definida.
import '/_102040_/l2/molecules/grouptriggeraction/ml-button-standard';

// Bloco A — migradas (usesLiveSlots = true)
import '/_102040_/l2/molecules/groupviewcard/ml-profile-card';
import '/_102040_/l2/molecules/groupviewcard/ml-vertical-card';
import '/_102040_/l2/molecules/groupviewcard/ml-view-card-horizontal';

// Bloco B — o controle, e a escolha dele tem regra.
//
// A `ml-view-card-media` continua aqui porque é da MESMA família e o contraste vale — mas ela é o
// **piloto da Onda 3** e vai ser migrada. Quando isso acontecer, este lado B expira.
//
// Por isso entrou junto um controle da **Onda 2** (`ml-metric-card`), que por decisão de
// 2026-08-06 não será migrada em lote: é o único universo de moléculas serializadas estável, e é
// ele que mantém a página discriminando depois da Onda 3. A P1 já tinha aprendido isso trocando o
// `ml-profile-card`; a P2 trocou a `ml-geolocation-trigger` pelo mesmo motivo.
import '/_102040_/l2/molecules/groupviewcard/ml-view-card-media';
import '/_102040_/l2/molecules/groupviewmetric/ml-metric-card';

@customElement('demo--cards-102053')
export class DemoLiveSlotsCards extends StateLitElement {
  @state() private log: string[] = [];

  /** Valor do consumidor exibido DENTRO do slot — o teste de reatividade (§7.3). */
  @state() private contador = 0;

  /** Troca o conteúdo dos slots por outra árvore — o caso do `_currentNodes`. */
  @state() private alternativo = false;

  @state() private trocas = 0;

  // ===========================================================================
  // LOG
  // ===========================================================================

  private onAction(e: Event): void {
    const alvo = e.target as HTMLElement;
    const tag = alvo.tagName.toLowerCase();
    const origem = alvo.getAttribute('data-origem') || '(sem marca)';
    const ehBotao = tag === 'grouptriggeraction--ml-button-standard';
    this.registrar(
      `${ehBotao ? 'BOTÃO' : 'wrapper'} · ${origem} · contador=${this.contador} · trocas=${this.trocas}`,
    );
  }

  /** Os cards emitem `cardClick`. Serve para provar que o wrapper está vivo. */
  private onCardClick(e: Event): void {
    const origem = (e.target as HTMLElement).getAttribute('data-origem') || '(sem marca)';
    this.registrar(`wrapper · ${origem} · cardClick`);
  }

  private registrar(texto: string): void {
    this.log = [...this.log, `#${this.log.length + 1} · ${texto}`];
  }

  private limparLog(): void {
    this.log = [];
  }

  private incrementar(): void {
    this.contador = this.contador + 1;
  }

  private alternarConteudo(): void {
    this.alternativo = !this.alternativo;
    this.trocas = this.trocas + 1;
  }

  /**
   * §7.4 sem depender de olho: para cada card, confere que o botão do `CardFooter` e o do
   * `CardAction` ainda dizem o número DAQUELE card, e conta divergências.
   *
   * É o teste que pega conteúdo migrando de um card para outro — o modo de falha das âncoras
   * quando duas compartilham chave.
   */
  private conferirCards(): void {
    const hosts = Array.from(
      this.querySelectorAll('[data-card]'),
    ) as HTMLElement[];
    let divergencias = 0;
    hosts.forEach((host) => {
      const esperado = host.getAttribute('data-card') || '?';
      const botoes = Array.from(
        host.querySelectorAll('grouptriggeraction--ml-button-standard'),
      ) as HTMLElement[];
      botoes.forEach((b) => {
        const origem = b.getAttribute('data-origem') || '';
        if (!origem.startsWith(esperado)) {
          divergencias = divergencias + 1;
          this.registrar(`  DIVERGÊNCIA: card ${esperado} contém botão de origem "${origem}"`);
        }
      });
      this.registrar(`conferência ${esperado}: ${botoes.length} botão(ões) no card`);
    });
    this.registrar(
      divergencias === 0
        ? `conferência: ${hosts.length} cards, 0 divergências`
        : `conferência: ${divergencias} DIVERGÊNCIA(S) — conteúdo trocou de card`,
    );
  }

  /**
   * Os slot tags desta página. Serve para saber se um nó ainda está DENTRO do slot de origem.
   *
   * ⚠️ **Tem de listar os slots de TODAS as moléculas da página, não só as do grupo em teste.**
   * Em 2026-08-06 esta lista tinha só os `Card*`, e o `ml-metric-card` — cujo botão fica no
   * `<Label>` — apareceu como `VIVO`: o `closest()` não reconhecia `<LABEL>` como slot, então o
   * original RETIDO era contado como "fora do slot". Falso positivo do instrumento, com a molécula
   * certa. O sinal que denunciou foi `visível=false` num dos nós — original oculto no slot.
   */
  private static readonly SLOTS =
    'CardFooter, CardAction, CardHeader, CardTitle, CardDescription, CardContent, ' +
    'Label, Value, Trend, Helper, Icon';

  private diagnosticar(): void {
    this.diagnosticarHost('#1 profile MIGRADO', 'groupviewcard--ml-profile-card[data-origem="profile"]', 2);
    this.diagnosticarHost('#2 vertical MIGRADO', 'groupviewcard--ml-vertical-card[data-origem="vertical"]', 2);
    this.diagnosticarHost('#3 horizontal MIGRADO', 'groupviewcard--ml-view-card-horizontal[data-origem="horizontal"]', 2);
    this.diagnosticarHost('#4 media MIGRADA (piloto Onda 3)', 'groupviewcard--ml-view-card-media[data-origem="controle-nao-migrado"]', 2);
    this.diagnosticarHost('#5 metric-card — controle ESTÁVEL (Onda 2)', 'groupviewmetric--ml-metric-card[data-origem="controle-estavel"]', 1);
  }

  /**
   * O veredito, e é ele que vale — não o log de clique.
   *
   * Descoberto em 2026-08-06, testando a P2: **clicar não discrimina nada.** O caminho de snapshot
   * renderiza o slot com `unsafeHTML(getSlotContent(...))`, e como esta página importa o módulo do
   * `ml-button-standard`, o clone é um custom element de verdade, upgradeado e clicável. Ele
   * dispara `action` igual ao nó vivo, e o ouvinte da página é DELEGADO no contêiner — pega os
   * dois. O que o clone perde são props e listeners diretos, que a delegação não usa.
   *
   * Aqui cada card migrado tem DOIS slots vivos, então o número esperado é 2 nós, os dois fora do
   * slot. No card não migrado são 4: dois originais ocultos e dois clones.
   */
  private veredito(total: number, emSlot: number, fora: number, vivosEsperados: number): string {
    if (total === vivosEsperados && fora === vivosEsperados) {
      return `VIVO — ${total} nó(s), todos movidos do slot para a âncora`;
    }
    if (emSlot >= 1 && fora >= 1) {
      return `SNAPSHOT — originais ficaram no slot (ocultos) e nasceram clones (${total} nós)`;
    }
    if (total === 0) return 'NENHUM nó encontrado — o conteúdo do slot não chegou ao DOM';
    // Retenção sem nenhum nó fora não é snapshot — snapshot sempre produz clone. É molécula que
    // não renderizou aquele trecho. Ver a mesma distinção na P1 (`notificacoes.ts`).
    if (emSlot >= 1 && fora === 0) {
      return `NÃO PROJETADO — ${emSlot} original(is) retido(s) e nenhum clone: a região não está renderizada`;
    }
    return `INDEFINIDO — ${total} nós (${emSlot} em slot, ${fora} fora)`;
  }

  private diagnosticarHost(rotulo: string, seletor: string, vivosEsperados: number): void {
    const host = this.querySelector(seletor);
    if (!host) {
      this.registrar(`diagnóstico ${rotulo}: host não encontrado`);
      return;
    }
    const moleculas = Array.from(
      host.querySelectorAll('grouptriggeraction--ml-button-standard'),
    ) as HTMLElement[];
    const emSlot = moleculas.filter((b) => b.closest(DemoLiveSlotsCards.SLOTS) !== null).length;
    const fora = moleculas.length - emSlot;

    this.registrar(`${rotulo} → ${this.veredito(moleculas.length, emSlot, fora, vivosEsperados)}`);
    moleculas.forEach((b, i) => {
      const slotAncestral = b.closest(DemoLiveSlotsCards.SLOTS);
      const onde = slotAncestral ? `slot <${slotAncestral.tagName}>` : 'fora do slot';
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
      <div class="page" @action=${this.onAction} @cardClick=${this.onCardClick}>
        <header class="head">
          <h1 class="title">Slots vivos — groupViewCard (P3)</h1>
          <p class="subtitle">
            Cada card tem <strong>dois</strong> slots vivos: <code>CardFooter</code> e
            <code>CardAction</code>. Os quatro <code>Card*</code> de conteúdo continuam no
            snapshot e têm de seguir aparecendo.
          </p>
          <p class="subtitle">
            <strong>O veredito sai do botão <code>diagnosticar DOM</code>, não do clique.</strong>
            Medido em 2026-08-06: o clone do caminho de snapshot é um custom element de verdade,
            upgradeado e clicável, e dispara <code>action</code> igual ao nó vivo. O que separa os
            dois é estrutural: <strong>VIVO = o nó sai do slot</strong>;
            <strong>SNAPSHOT = o original fica no slot, oculto, e nasce um clone</strong>.
          </p>
        </header>

        ${this.renderControles()}
        ${this.renderMigrados()}
        ${this.renderControleExterno()}
        ${this.renderLog()}
      </div>
    `;
  }

  private renderControles(): TemplateResult {
    return html`
      <section class="controles">
        <button class="btn" @click=${this.incrementar}>contador +1</button>
        <button class="btn" @click=${this.alternarConteudo}>
          ${this.alternativo ? 'voltar conteúdo original' : 'trocar conteúdo dos slots'}
        </button>
        <button class="btn" @click=${this.conferirCards}>conferir cards</button>
        <button class="btn" @click=${this.diagnosticar}>diagnosticar DOM</button>
        <button class="btn" @click=${this.limparLog}>limpar log</button>
        <span class="leitura">contador = <strong>${this.contador}</strong></span>
        <span class="leitura">trocas = <strong>${this.trocas}</strong> (o roteiro pede 3)</span>
      </section>
    `;
  }

  private conteudoSlot(origem: string, texto: string): TemplateResult {
    if (this.alternativo) {
      return html`
        <grouptriggeraction--ml-button-standard data-variant="secondary" data-origem="${origem}-alt">
          <Label>${texto} (alt)</Label>
        </grouptriggeraction--ml-button-standard>
        <span class="eco">trocado · contador ${this.contador}</span>
      `;
    }
    return html`
      <grouptriggeraction--ml-button-standard data-variant="primary" data-origem=${origem}>
        <Label>${texto}</Label>
      </grouptriggeraction--ml-button-standard>
      <span class="eco">contador ${this.contador}</span>
    `;
  }

  /**
   * Os três migrados. Cada um leva um botão em CADA slot vivo, com origem marcada pelo número do
   * card — é o par "identificador + valor" que revela conteúdo migrando de lugar.
   */
  private renderMigrados(): TemplateResult {
    const cards: Array<[string, string, string]> = [
      ['#1', 'profile', 'groupviewcard--ml-profile-card'],
      ['#2', 'vertical', 'groupviewcard--ml-vertical-card'],
      ['#3', 'horizontal', 'groupviewcard--ml-view-card-horizontal'],
    ];
    return html`
      <section class="block">
        <h2 class="block-title">A — migrados (CardFooter e CardAction vivos)</h2>
        <p class="esperado">
          Esperado: clicar em QUALQUER um dos dois botões de um card gera BOTÃO + wrapper. Os
          quatro <code>Card*</code> de conteúdo têm de continuar visíveis, sem duplicar.
          <code>conferir cards</code> tem de acusar <strong>0 divergências</strong>.
        </p>
        <div class="grid">
          ${cards.map(([num, origem, tag]) => this.renderCard(num, origem, tag))}
        </div>
      </section>
    `;
  }

  /**
   * Um render só para os três, com a tag vindo por variável.
   *
   * `unsafeStatic` seria o caminho para variar a tag num template do Lit, mas ele não é usado em
   * nenhuma outra página destas e traz uma dependência nova só para economizar repetição. Como
   * são três, o `switch` é mais honesto do que a mágica.
   */
  private renderCard(num: string, origem: string, tag: string): TemplateResult {
    const rodape = this.conteudoSlot(`${num}-footer`, `${num} Rodapé`);
    const acao = this.conteudoSlot(`${num}-action`, `${num} Ação`);
    const cabecalho = html`
      <CardHeader>${num} Cabeçalho</CardHeader>
      <CardTitle>${num} Título</CardTitle>
      <CardDescription>${num} Descrição — snapshot, tem de aparecer.</CardDescription>
      <CardContent>${num} Conteúdo — snapshot, tem de aparecer.</CardContent>
    `;

    if (tag === 'groupviewcard--ml-profile-card') {
      return html`
        <groupviewcard--ml-profile-card data-origem=${origem} data-card=${num}>
          ${cabecalho}
          <CardFooter>${rodape}</CardFooter>
          <CardAction>${acao}</CardAction>
        </groupviewcard--ml-profile-card>
      `;
    }
    if (tag === 'groupviewcard--ml-vertical-card') {
      return html`
        <groupviewcard--ml-vertical-card data-origem=${origem} data-card=${num}>
          ${cabecalho}
          <CardFooter>${rodape}</CardFooter>
          <CardAction>${acao}</CardAction>
        </groupviewcard--ml-vertical-card>
      `;
    }
    return html`
      <groupviewcard--ml-view-card-horizontal data-origem=${origem} data-card=${num}>
        ${cabecalho}
        <CardFooter>${rodape}</CardFooter>
        <CardAction>${acao}</CardAction>
      </groupviewcard--ml-view-card-horizontal>
    `;
  }

  /** Mesma família, ainda no snapshot: os seis slots dela passam por `getSlotContent`. */
  private renderControleExterno(): TemplateResult {
    return html`
      <section class="block">
        <h2 class="block-title">B — o piloto da Onda 3, e o controle estável</h2>
        <p class="esperado">
          <strong>#4 — a <code>ml-view-card-media</code> FOI MIGRADA em 2026-08-06</strong>, como
          piloto da Onda 3: <code>CardFooter</code> e <code>CardAction</code> viraram vivos e os
          quatro <code>Card*</code> de conteúdo seguem serializados. Esperado agora:
          <code>VIVO — 2 nós</code>, igual aos de cima. Antes da migração ela dava
          <code>SNAPSHOT — 4 nós</code>.
          <br />
          <strong>§7.5 — o risco central da Onda 3:</strong> confira na tela que
          <code>CardTitle</code>, <code>CardDescription</code> e <code>CardContent</code> do #4
          aparecem <strong>uma vez só</strong>. Slot de dado duplicando é o que a migração de mista
          pode quebrar.
        </p>
        <p class="esperado">
          <strong>#5 — o controle ESTÁVEL</strong>, da Onda 2, que não será migrada: tem de
          continuar dando <code>SNAPSHOT</code>. É ele que mantém esta página discriminando depois
          que o #4 virou.
          <br />
          ⚠️ Os botões daqui <strong>também disparam no log</strong>, porque o clone é clicável.
          O critério é o veredito estrutural.
        </p>
        <div class="grid">
          <groupviewcard--ml-view-card-media data-origem="controle-nao-migrado" data-card="#4">
            <CardHeader>#4 Cabeçalho</CardHeader>
            <CardTitle>#4 MIGRADA na Onda 3 — piloto (era o controle desta página)</CardTitle>
            <CardContent>#4 Conteúdo</CardContent>
            <CardFooter>${this.conteudoSlot('#4-footer', '#4 rodapé')}</CardFooter>
            <CardAction>${this.conteudoSlot('#4-action', '#4 ação')}</CardAction>
          </groupviewcard--ml-view-card-media>

          <groupviewmetric--ml-metric-card data-origem="controle-estavel" data-card="#5">
            <Label>
              #5 controle ESTÁVEL — Onda 2, não será migrada
              ${this.conteudoSlot('#5-label', '#5 comparação')}
            </Label>
            <Value>—</Value>
          </groupviewmetric--ml-metric-card>
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
