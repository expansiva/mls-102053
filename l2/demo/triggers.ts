/// <mls fileReference="_102053_/l2/demo/triggers.ts" enhancement="_102020_/l2/enhancementAura"/>
// P2 do todo/todo-demo-molecules-live-slots.md — valida o slot `Trigger` vivo das moléculas de
// `groupScanCode` e `groupSelectFileForUpload` (Onda 1).
// Sem tema de propósito: o que está sob teste é o mecanismo de slot, não a aparência.
//
// DIFERENÇA EM RELAÇÃO À P1, e ela muda o roteiro: estas moléculas NÃO têm a prop `visible`, e
// nenhuma delas tira a âncora do render — o `renderLiveSlot('Trigger')` só depende de o slot
// existir, o que é estável. Ou seja, o caso "a âncora some e volta" (§7.2) **não existe aqui**;
// quem o exercita é a P1 (por `visible`) e a P4 (paginação e ordenação). Em lugar dele, esta
// página exercita o caso que ESTAS moléculas correm de verdade: o consumidor **trocar o conteúdo
// do slot por outro** (`_currentNodes`), que é o que envelhece a lista da captura.
import { html, TemplateResult } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { StateLitElement } from '/_102029_/l2/stateLitElement.js';

// A molécula-controle DENTRO do slot. Sem este import ela nem é definida, e o teste provaria nada.
import '/_102040_/l2/molecules/grouptriggeraction/ml-button-standard';

// Bloco A — as NOVE migradas destes dois grupos. Começou com um representante de cada, mas o
// veredito do diagnóstico é automático: cobrir as nove custa um clique igual, e evita aprovar
// sete moléculas por inferência.
import '/_102040_/l2/molecules/groupscancode/ml-scan-code';
import '/_102040_/l2/molecules/groupscancode/ml-scan-code-1d';
import '/_102040_/l2/molecules/groupscancode/ml-scan-document';
import '/_102040_/l2/molecules/groupscancode/ml-scan-ocr';
import '/_102040_/l2/molecules/groupselectfileforupload/ml-file-upload-dropzone';
import '/_102040_/l2/molecules/groupselectfileforupload/ml-file-metadata-uploader';
import '/_102040_/l2/molecules/groupselectfileforupload/ml-file-upload-preview';
import '/_102040_/l2/molecules/groupselectfileforupload/ml-upload-file-list';
import '/_102040_/l2/molecules/groupselectfileforupload/ml-user-photo-upload';

// Bloco B — grupo de CONTROLE, e a escolha dele tem regra.
//
// Trocado em 2026-08-06, ANTES da Onda 3: o controle anterior era a `ml-geolocation-trigger`, que
// é uma das MISTAS e vai ser migrada nessa onda. Controle que migra deixa de ser controle — a
// página se autodestruiria em silêncio, e é a segunda vez que isso quase acontece (a P1 já tinha
// trocado o `ml-profile-card` pelo mesmo motivo).
//
// A regra que sai daqui: **o controle tem de vir da Onda 2**, que por decisão de 2026-08-06 não
// será migrada em lote — é o único universo estável de moléculas serializadas.
import '/_102040_/l2/molecules/groupviewmetric/ml-metric-card';

@customElement('demo--triggers-102053')
export class DemoLiveSlotsTriggers extends StateLitElement {
  /** Linhas do painel de log. É o que torna o resultado legível sem acompanhar a migração. */
  @state() private log: string[] = [];

  /** Valor do consumidor exibido DENTRO do slot — o teste de reatividade (§7.3). */
  @state() private contador = 0;

  /**
   * Alterna o CONTEÚDO do slot entre duas árvores diferentes.
   *
   * É o caso do `_currentNodes`: quando o consumidor troca o conteúdo por outro em vez de só
   * atualizar valores, a lista tirada na captura envelhece. Se a molécula reanexar a lista velha,
   * o slot volta vazio ou com o botão antigo — que não responde mais.
   */
  @state() private alternativo = false;

  /** Quantas trocas de conteúdo já houve. O roteiro pede pelo menos 3. */
  @state() private trocas = 0;

  // ===========================================================================
  // LOG
  // ===========================================================================

  /**
   * O discriminador do A/B: `ml-button-standard` dispara `action` com bubbles+composed. Se o
   * botão está VIVO, a linha sai; se é clone de snapshot, é HTML morto e não sai nada.
   */
  private onAction(e: Event): void {
    const alvo = e.target as HTMLElement;
    const tag = alvo.tagName.toLowerCase();
    const origem = alvo.getAttribute('data-origem') || '(sem marca)';
    const ehBotao = tag === 'grouptriggeraction--ml-button-standard';
    this.registrar(
      `${ehBotao ? 'BOTÃO' : 'wrapper'} · ${origem} · contador=${this.contador} · trocas=${this.trocas}`,
    );
  }

  /** As moléculas de scan abrem e fecham o próprio scanner. Serve para provar que estão vivas. */
  private onOpen(e: Event): void {
    this.registrar(`wrapper · ${this.origemDe(e)} · open`);
  }

  private onClose(e: Event): void {
    this.registrar(`wrapper · ${this.origemDe(e)} · close`);
  }

  /** O dropzone recusa arquivo fora das regras. Não é o alvo do teste, mas polui menos logado. */
  private onReject(e: Event): void {
    this.registrar(`wrapper · ${this.origemDe(e)} · reject`);
  }

  private origemDe(e: Event): string {
    const alvo = e.target as HTMLElement;
    return alvo.getAttribute('data-origem') || alvo.tagName.toLowerCase();
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
   * Conta molécula-botão no DOM contra `<button>` VISÍVEL na tela, por host.
   *
   * Existe porque leitura de código não bastou na P1: o `_hideSlotTags()` esconde o slot de
   * origem, o que fazia prever que o original sumiria — e a tela mostrou dois botões. Entre
   * deduzir e medir, medir.
   */
  /** As nove migradas destes dois grupos, na ordem em que aparecem na tela. */
  private static readonly COBERTURA: Array<[string, string]> = [
    ['#1 scan-code', 'groupscancode--ml-scan-code[data-origem="scan"]'],
    ['#2 file-upload-dropzone', 'groupselectfileforupload--ml-file-upload-dropzone[data-origem="dropzone"]'],
    ['#5 scan-code-1d', 'groupscancode--ml-scan-code-1d'],
    ['#6 scan-document', 'groupscancode--ml-scan-document'],
    ['#7 scan-ocr', 'groupscancode--ml-scan-ocr'],
    ['#8 file-metadata-uploader', 'groupselectfileforupload--ml-file-metadata-uploader'],
    ['#9 file-upload-preview', 'groupselectfileforupload--ml-file-upload-preview'],
    ['#10 upload-file-list', 'groupselectfileforupload--ml-upload-file-list'],
    ['#11 user-photo-upload', 'groupselectfileforupload--ml-user-photo-upload'],
  ];

  private diagnosticar(): void {
    this.registrar('— as 9 migradas: todas têm de dizer VIVO —');
    DemoLiveSlotsTriggers.COBERTURA.forEach(([rotulo, seletor]) =>
      this.diagnosticarHost(rotulo, seletor),
    );
    this.registrar('— os controles: têm de dizer SNAPSHOT —');
    this.diagnosticarHost('#3b scan-code (estado Result)', 'groupscancode--ml-scan-code[data-origem="controle-interno-result"]');
    this.diagnosticarHost('#4 metric-card NÃO migrada (Onda 2)', 'groupviewmetric--ml-metric-card[data-origem="controle-nao-migrado"]');
  }

  /** Os slot tags desta página. Serve para saber se um nó ainda está DENTRO do slot de origem. */
  private static readonly SLOTS = 'Trigger, Label, Helper, Result, Suggestions, Item, Empty';

  /**
   * O veredito, e é ele que vale — não o log de clique.
   *
   * Descoberto em 2026-08-06, testando: **clicar não discrimina nada.** O caminho de snapshot
   * renderiza o slot com `unsafeHTML(getSlotContent(...))`, e como esta página importa o módulo do
   * `ml-button-standard`, o clone é um custom element de verdade, upgradeado e clicável. Ele
   * dispara `action` igual ao nó vivo, e o ouvinte da página é DELEGADO no contêiner — pega os
   * dois. O que o clone perde são props e listeners diretos, que a delegação não usa.
   *
   * A assinatura que separa os dois é estrutural, e essa é inequívoca:
   *
   *   VIVO      → 1 nó, que SAIU do slot (foi movido para a âncora)
   *   SNAPSHOT  → 2 nós: o original fica no slot, oculto pelo `_hideSlotTags`, e nasce um clone
   */
  private veredito(total: number, emSlot: number, fora: number): string {
    if (total === 1 && fora === 1) return 'VIVO — 1 nó, movido do slot para a âncora';
    if (total >= 2 && emSlot >= 1 && fora >= 1) {
      return `SNAPSHOT — o original ficou no slot (oculto) e nasceu um clone (${total} nós)`;
    }
    if (total === 1 && emSlot === 1) {
      return 'NÃO PROJETADO — o nó ficou no slot e não há clone: a molécula não renderiza este slot';
    }
    if (total === 0) return 'NENHUM nó encontrado — o conteúdo do slot não chegou ao DOM';
    return `INDEFINIDO — ${total} nós (${emSlot} em slot, ${fora} fora)`;
  }

  private diagnosticarHost(rotulo: string, seletor: string): void {
    const host = this.querySelector(seletor);
    if (!host) {
      this.registrar(`diagnóstico ${rotulo}: host não encontrado`);
      return;
    }
    const moleculas = Array.from(
      host.querySelectorAll('grouptriggeraction--ml-button-standard'),
    ) as HTMLElement[];
    const emSlot = moleculas.filter((b) => b.closest(DemoLiveSlotsTriggers.SLOTS) !== null).length;
    const fora = moleculas.length - emSlot;

    this.registrar(`${rotulo} → ${this.veredito(moleculas.length, emSlot, fora)}`);
    moleculas.forEach((b, i) => {
      const slotAncestral = b.closest(DemoLiveSlotsTriggers.SLOTS);
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
      <div
        class="page"
        @action=${this.onAction}
        @open=${this.onOpen}
        @close=${this.onClose}
        @reject=${this.onReject}
      >
        <header class="head">
          <h1 class="title">Slots vivos — Trigger (P2)</h1>
          <p class="subtitle">
            Cada botão abaixo é uma molécula (ml-button-standard) dentro do slot
            <code>Trigger</code> de outra molécula.
          </p>
          <p class="subtitle">
            <strong>O veredito sai do botão <code>diagnosticar DOM</code>, não do clique.</strong>
            Medido em 2026-08-06: clicar não discrimina nada, porque o clone do caminho de snapshot
            é um custom element de verdade — upgradeado e clicável — e dispara
            <code>action</code> igual ao nó vivo. O que separa os dois é estrutural:
            <strong>VIVO = 1 nó que saiu do slot</strong>; <strong>SNAPSHOT = 2 nós</strong>, o
            original oculto no slot mais um clone.
          </p>
        </header>

        ${this.renderControles()}
        ${this.renderMigradas()}
        ${this.renderRestante()}
        ${this.renderControleInterno()}
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
          ${this.alternativo ? 'voltar conteúdo original' : 'trocar conteúdo do slot'}
        </button>
        <button class="btn" @click=${this.diagnosticar}>diagnosticar DOM</button>
        <button class="btn" @click=${this.limparLog}>limpar log</button>
        <span class="leitura">contador = <strong>${this.contador}</strong></span>
        <span class="leitura">trocas = <strong>${this.trocas}</strong> (o roteiro pede 3)</span>
      </section>
    `;
  }

  /**
   * O conteúdo do slot, nas duas versões. A troca entre elas é o teste do `_currentNodes`: o Lit
   * remove uma árvore e insere outra entre os mesmos marcadores, e a lista da captura envelhece.
   *
   * O contador fica FORA do `<Label>` de propósito — o `ml-button-standard` ainda lê o Label por
   * `getSlotContent`, então um binding ali dentro morreria na serialização DELE e o teste mediria
   * o slot errado.
   */
  private conteudoSlot(origem: string, texto: string): TemplateResult {
    if (this.alternativo) {
      return html`
        <grouptriggeraction--ml-button-standard data-variant="secondary" data-origem="${origem}-alt">
          <Label>${texto} (alternativo)</Label>
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

  private renderMigradas(): TemplateResult {
    return html`
      <section class="block">
        <h2 class="block-title">A — migradas (Trigger vivo)</h2>
        <p class="esperado">
          Esperado — e é diferente da P1, porque estas moléculas <strong>não emitem
          <code>action</code></strong>:<br />
          • <strong>#1 scan</strong> → duas linhas: <code>BOTÃO · scan-btn</code> e
          <code>wrapper · scan · open</code> (o clique também abre a câmera).<br />
          • <strong>#2 dropzone</strong> → <strong>uma</strong> linha: <code>BOTÃO ·
          dropzone-btn</code> (o clique também abre o seletor de arquivo do sistema).<br />
          O que prova o slot vivo é a linha <strong>BOTÃO</strong>. Depois de
          <code>trocar conteúdo do slot</code>, o botão novo tem de continuar respondendo, agora
          com origem terminada em <code>-alt</code>. <code>Label</code> e <code>Helper</code>
          continuam no snapshot e têm de seguir aparecendo.
        </p>
        <p class="esperado">
          ⚠️ Efeitos colaterais reais destas moléculas: o <strong>#1 pede permissão de câmera</strong>
          (feche com <kbd>Esc</kbd> — sai <code>wrapper · scan · close</code>) e o <strong>#2 abre o
          diálogo de arquivo</strong> (pode cancelar; cancelar não gera linha). Nenhum dos dois
          atrapalha o teste — o que importa já foi registrado no log.
        </p>
        <div class="grid">
          <groupscancode--ml-scan-code data-origem="scan">
            <Label>#1 Leitor de código</Label>
            <Helper>Helper do #1 — continua no snapshot, tem de aparecer.</Helper>
            <Trigger>${this.conteudoSlot('scan-btn', '#1 Abrir leitor')}</Trigger>
          </groupscancode--ml-scan-code>

          <groupselectfileforupload--ml-file-upload-dropzone data-origem="dropzone">
            <Label>#2 Envio de arquivo</Label>
            <Helper>Helper do #2 — continua no snapshot, tem de aparecer.</Helper>
            <Trigger>${this.conteudoSlot('dropzone-btn', '#2 Escolher arquivo')}</Trigger>
          </groupselectfileforupload--ml-file-upload-dropzone>
        </div>
      </section>
    `;
  }

  /**
   * As outras SETE migradas dos mesmos dois grupos.
   *
   * Elas compartilham o padrão das duas de cima — slot `Trigger` vivo, `Label`/`Helper` no
   * snapshot —, mas "compartilham o padrão" é inferência, e o diagnóstico é automático: cobrir as
   * nove custa o mesmo clique. Sem isto, sete moléculas virariam `[x]` sem ninguém ter olhado.
   */
  private renderRestante(): TemplateResult {
    const outras: Array<[string, string]> = [
      ['#5', 'groupscancode--ml-scan-code-1d'],
      ['#6', 'groupscancode--ml-scan-document'],
      ['#7', 'groupscancode--ml-scan-ocr'],
      ['#8', 'groupselectfileforupload--ml-file-metadata-uploader'],
      ['#9', 'groupselectfileforupload--ml-file-upload-preview'],
      ['#10', 'groupselectfileforupload--ml-upload-file-list'],
      ['#11', 'groupselectfileforupload--ml-user-photo-upload'],
    ];
    return html`
      <section class="block">
        <h2 class="block-title">A2 — as outras sete migradas dos mesmos grupos</h2>
        <p class="esperado">
          Mesmo padrão das duas de cima. No <code>diagnosticar DOM</code>, as sete têm de dizer
          <code>VIVO — 1 nó</code>. Estão aqui para nenhuma virar verificada por inferência.
        </p>
        <div class="grid">
          ${outras.map(([num, tag]) => this.renderOutra(num, tag))}
        </div>
      </section>
    `;
  }

  /** Um card por molécula, com a tag escolhida por `switch` — o mesmo motivo da P3: sem mágica. */
  private renderOutra(num: string, tag: string): TemplateResult {
    const rotulo = html`<Label>${num} ${tag.split('--')[1]}</Label>`;
    const gatilho = html`<Trigger>${this.conteudoSlot(`${num}-btn`, `${num} Acionar`)}</Trigger>`;

    switch (tag) {
      case 'groupscancode--ml-scan-code-1d':
        return html`<groupscancode--ml-scan-code-1d data-origem=${num}>${rotulo}${gatilho}</groupscancode--ml-scan-code-1d>`;
      case 'groupscancode--ml-scan-document':
        return html`<groupscancode--ml-scan-document data-origem=${num}>${rotulo}${gatilho}</groupscancode--ml-scan-document>`;
      case 'groupscancode--ml-scan-ocr':
        return html`<groupscancode--ml-scan-ocr data-origem=${num}>${rotulo}${gatilho}</groupscancode--ml-scan-ocr>`;
      case 'groupselectfileforupload--ml-file-metadata-uploader':
        return html`<groupselectfileforupload--ml-file-metadata-uploader data-origem=${num}>${rotulo}${gatilho}</groupselectfileforupload--ml-file-metadata-uploader>`;
      case 'groupselectfileforupload--ml-file-upload-preview':
        return html`<groupselectfileforupload--ml-file-upload-preview data-origem=${num}>${rotulo}${gatilho}</groupselectfileforupload--ml-file-upload-preview>`;
      case 'groupselectfileforupload--ml-upload-file-list':
        return html`<groupselectfileforupload--ml-upload-file-list data-origem=${num}>${rotulo}${gatilho}</groupselectfileforupload--ml-upload-file-list>`;
      default:
        return html`<groupselectfileforupload--ml-user-photo-upload data-origem=${num}>${rotulo}${gatilho}</groupselectfileforupload--ml-user-photo-upload>`;
    }
  }

  /**
   * O controle mais forte que esta página tem: a MESMA molécula, no mesmo passe de render, com um
   * botão no slot VIVO (`Trigger`) e outro no slot que continua SERIALIZADO (`Result`, lido por
   * `unsafeHTML(getSlotContent('Result'))` em `ml-scan-code.ts:361-362`). Só muda o slot.
   */
  private renderControleInterno(): TemplateResult {
    return html`
      <section class="block">
        <h2 class="block-title">B1 — controle: dois slots da MESMA molécula</h2>
        <p class="esperado">
          A <code>ml-scan-code</code> tem TRÊS estados mutuamente exclusivos
          (<code>ml-scan-code.ts:432-436</code>): câmera aberta · <strong>valor lido</strong> ·
          gatilho. <code>Trigger</code> e <code>Result</code> <strong>nunca aparecem juntos</strong>,
          então o A/B precisa de duas instâncias.
        </p>
        <p class="esperado">
          Esperado no <code>diagnosticar DOM</code>: <strong>#3</strong> (gatilho, slot vivo) →
          <code>VIVO — 1 nó</code>. <strong>#3b</strong> (valor lido, slot <code>Result</code>
          serializado) → <code>SNAPSHOT — 2 nós</code>.
          <br />
          ⚠️ <strong>Os dois botões vão disparar no log, e isso é o certo</strong> — o clone também
          é clicável. Não use o clique como critério aqui.
        </p>
        <div class="grid">
          <groupscancode--ml-scan-code data-origem="controle-interno">
            <Label>#3 Estado GATILHO — slot Trigger, vivo</Label>
            <Trigger>${this.conteudoSlot('interno-vivo', '#3 DEVE disparar')}</Trigger>
          </groupscancode--ml-scan-code>

          <groupscancode--ml-scan-code data-origem="controle-interno-result" value="ABC-123">
            <Label>#3b Estado RESULTADO — slot Result, serializado</Label>
            <Result>
              slot Result, serializado:
              ${this.conteudoSlot('interno-morto', '#3b NÃO deve disparar')}
            </Result>
          </groupscancode--ml-scan-code>
        </div>
      </section>
    `;
  }

  /** Molécula inteira ainda no snapshot — e que NÃO será migrada, por ser da Onda 2. */
  private renderControleExterno(): TemplateResult {
    return html`
      <section class="block">
        <h2 class="block-title">B2 — controle: molécula NÃO migrada (e que não será)</h2>
        <p class="esperado">
          Esperado no <code>diagnosticar DOM</code>: <code>SNAPSHOT — 2 nós</code>, com o original
          <code>em slot &lt;LABEL&gt;</code> e invisível, e o clone fora do slot e visível. É a
          assinatura do caminho não migrado, e é contra ela que o lado A se compara.
          <br />
          ⚠️ Este botão <strong>também dispara no log</strong> — o clone é clicável. O critério é o
          veredito estrutural.
        </p>
        <p class="esperado">
          O controle era a <code>ml-geolocation-trigger</code> e foi trocado em 2026-08-06:
          <strong>ela é uma das mistas da Onda 3</strong> e vai ser migrada, o que apagaria o lado B
          desta página sem ninguém perceber. O controle passou a vir da <strong>Onda 2</strong>,
          que por decisão do mesmo dia não será migrada em lote — é o único universo de moléculas
          serializadas que se pode considerar estável.
        </p>
        <div class="grid">
          <groupviewmetric--ml-metric-card data-origem="controle-nao-migrado">
            <Label>
              #4 molécula NÃO migrada
              ${this.conteudoSlot('nao-migrado-btn', '#4 comparação')}
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
