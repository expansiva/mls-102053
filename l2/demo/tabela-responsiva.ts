/// <mls fileReference="_102053_/l2/demo/tabela-responsiva.ts" enhancement="_102020_/l2/enhancementAura"/>
// P4b do todo/todo-demo-molecules-live-slots.md — mesma bancada da P4, aplicada à
// ml-responsive-data-table.
//
// Por que ela existe: a molécula apareceu na árvore em 2026-08-04, já com `usesLiveSlots`, sem
// ter passado por nenhuma verificação §7. A leitura do código levantou dois pontos que só a
// medição resolve:
//
//   1. `getLiveSlot('X') || getSlot('X')` (:278, :297, :308) — o `getSlot` lê do SNAPSHOT
//      (moleculeBase.ts:533-535), e a regra do 2º piloto é que molécula que projeta não deve ler
//      de lá: a origem fica vazia depois da projeção. Se o fallback disparar, entrega elemento de
//      um Document isolado para o renderLiveSlotFrom, que espera elemento do DOM vivo.
//   2. `:645` ainda tem um ramo `unsafeHTML(getSlotContent('Caption'))` ao lado do caminho vivo.
//      Daí o <Caption> nesta página: se os dois ramos rodarem, a legenda aparece DUAS vezes.
import { html, TemplateResult } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { StateLitElement } from '/_102029_/l2/stateLitElement.js';

import '/_102040_/l2/molecules/groupviewtable/ml-responsive-data-table';
import '/_102040_/l2/molecules/grouptriggeraction/ml-button-standard';

interface Linha {
  id: string;
  valor: number;
}

@customElement('demo--tabela-responsiva-102053')
export class DemoLiveSlotsTabelaResponsiva extends StateLitElement {
  @state() private log: string[] = [];
  @state() private contador = 0;
  @state() private pagina = 1;
  @state() private ordemChave = '';
  @state() private ordemDirecao = 'asc';
  @state() private tamanhoPagina = 4;

  /**
   * Os dois modos do contrato (skills/groupViewTable/creation.ts §9), no mesmo lugar:
   *
   * - **interno** (padrão): a página entrega as 9 linhas e não informa `total-items`. A molécula
   *   ordena tudo e fatia. É o modo que a Mudança 1 destravou.
   * - **externo**: a página ordena, fatia e informa `total-items`. A molécula não reordena —
   *   Mudança 2. Antes disso, este modo embaralhava a tela.
   *
   * A conferência vale para os dois: em ambos a ORDEM na tela tem de bater com a esperada.
   */
  @state() private modoExterno = false;

  private alternarModo(): void {
    this.modoExterno = !this.modoExterno;
    this.pagina = 1;
    this.registrar(`página · modo = ${this.modoExterno ? 'EXTERNO (página fatia)' : 'INTERNO (molécula fatia)'}`);
  }

  /** Mesmos dados da P4, para os dois resultados serem comparáveis linha a linha. */
  private readonly linhas: Linha[] = [
    { id: 'Item 01', valor: 70 },
    { id: 'Item 02', valor: 30 },
    { id: 'Item 03', valor: 90 },
    { id: 'Item 04', valor: 10 },
    { id: 'Item 05', valor: 50 },
    { id: 'Item 06', valor: 20 },
    { id: 'Item 07', valor: 80 },
    { id: 'Item 08', valor: 40 },
    { id: 'Item 09', valor: 60 },
  ];

  // ===========================================================================
  // LOG E CONTROLES
  // ===========================================================================

  private registrar(texto: string): void {
    this.log = [...this.log, `#${this.log.length + 1} · ${texto}`];
  }

  private limparLog(): void {
    this.log = [];
  }

  private incrementar(): void {
    this.contador = this.contador + 1;
  }

  private alternarTamanho(): void {
    this.tamanhoPagina = this.tamanhoPagina === 4 ? 20 : 4;
    this.pagina = 1;
    this.registrar(`página · page-size = ${this.tamanhoPagina}`);
  }

  private onAction(e: Event): void {
    const origem = (e.target as HTMLElement).getAttribute('data-origem') || '(sem marca)';
    this.registrar(`BOTÃO · ${origem}`);
  }

  private onSort(e: Event): void {
    const d = (e as CustomEvent).detail || {};
    this.ordemChave = d.key || '';
    this.ordemDirecao = d.direction || 'asc';
    this.registrar(`tabela · sort key=${d.key} direção=${d.direction}`);
  }

  private onPageChange(e: Event): void {
    const d = (e as CustomEvent).detail || {};
    this.pagina = d.page;
    this.registrar(`tabela · pageChange → página ${d.page} (ecoada pela página)`);
  }

  // ===========================================================================
  // CONFERÊNCIA
  // ===========================================================================

  /**
   * O que deve estar na tela. No modo externo é o que a página mandou. No interno, quem ordena e
   * fatia é a molécula, então a página refaz a mesma conta para poder cobrar o resultado.
   */
  private ordemEsperada(): string[] {
    if (this.modoExterno) return this.linhasVisiveis().map((l) => l.id);

    const ordenadas = [...this.linhas];
    if (this.ordemChave === 'item' || this.ordemChave === 'valor') {
      const dir = this.ordemDirecao === 'asc' ? 1 : -1;
      ordenadas.sort((a, b) => {
        const at = this.ordemChave === 'valor' ? String(a.valor) : a.id;
        const bt = this.ordemChave === 'valor' ? String(b.valor) : b.id;
        return dir * at.localeCompare(bt, undefined, { numeric: true, sensitivity: 'base' });
      });
    }
    const inicio = (this.pagina - 1) * this.tamanhoPagina;
    return ordenadas.slice(inicio, inicio + this.tamanhoPagina).map((l) => l.id);
  }

  private conferirLinhas(): void {
    const tabela = this.querySelector('groupviewtable--ml-responsive-data-table');
    if (!tabela) {
      this.registrar('conferência: tabela não encontrada');
      return;
    }
    const linhas = Array.from(tabela.querySelectorAll('tbody tr'));
    const detalhes: string[] = [];
    let divergencias = 0;

    linhas.forEach((tr, i) => {
      const celulas = tr.querySelectorAll('td');
      const idNaCelula = (celulas[0]?.textContent || '').trim();
      const botao = tr.querySelector('grouptriggeraction--ml-button-standard');
      const origem = botao?.getAttribute('data-origem') || '(sem botão)';
      const eco = (tr.querySelector('.eco')?.textContent || '').trim();
      const ok = origem === `linha-${idNaCelula}`;
      if (!ok) divergencias += 1;
      const refs = Array.from(tr.querySelectorAll('[data-ml-live-ref]'))
        .map((s) => (s as HTMLElement).dataset.mlLiveRef)
        .join('/');
      detalhes.push(
        `  linha ${i + 1}: célula="${idNaCelula}" · botão=${origem} · eco=${eco} · refs=${refs} · ${ok ? 'OK' : '*** DIVERGE ***'}`,
      );
    });

    const naTela = linhas
      .map((tr) => (tr.querySelectorAll('td')[0]?.textContent || '').trim())
      .join(', ');
    const esperado = this.ordemEsperada().join(', ');

    this.registrar(
      `conferência: ${linhas.length} linha(s) na página ${this.pagina} · ${divergencias} divergência(s) dentro da linha`,
    );
    this.registrar(`  ORDEM esperada: ${esperado}`);
    this.registrar(`  ORDEM na tela : ${naTela}  ${naTela === esperado ? '· OK' : '· *** ORDEM ERRADA ***'}`);
    detalhes.forEach((d) => this.registrar(d));
    this.conferirCaption(tabela);
    this.dumpOrigem(tabela);
  }

  /**
   * Ponto 2 da suspeita: a molécula tem um caminho vivo e um `unsafeHTML` para o mesmo Caption.
   * Se os dois rodarem, o texto aparece duas vezes. Conta as ocorrências VISÍVEIS.
   */
  private conferirCaption(tabela: Element): void {
    const marca = 'LEGENDA-SONDA';
    const visiveis = Array.from(tabela.querySelectorAll('caption, .ml-caption')).filter(
      (el) => (el as HTMLElement).offsetParent !== null && (el.textContent || '').includes(marca),
    );
    const ocorrencias = (tabela.textContent || '').split(marca).length - 1;
    this.registrar(
      `caption: ${visiveis.length} elemento(s) visível(is) · ${ocorrencias} ocorrência(s) do texto` +
        `${ocorrencias > 1 ? '  ← *** DUPLICADO ***' : ''}`,
    );
  }

  private dumpOrigem(tabela: Element): void {
    const corpo = tabela.querySelector('TableBody');
    if (!corpo) {
      this.registrar('origem: TableBody não encontrado');
      return;
    }
    const linhas = Array.from(corpo.querySelectorAll('TableRow'));
    this.registrar(`origem: ${linhas.length} TableRow no slot`);
    linhas.forEach((tr) => {
      const celulas = tr.querySelectorAll('TableCell');
      const id = (celulas[0]?.textContent || '').trim();
      const valor = (celulas[1]?.textContent || '').trim();
      this.registrar(`  origem: id="${id}" · valor="${valor}"${valor === '' ? '  ← VAZIA (projetada)' : ''}`);
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
        @sort=${this.onSort}
        @pageChange=${this.onPageChange}
      >
        <header class="head">
          <h1 class="title">Slots vivos — ml-responsive-data-table (P4b)</h1>
          <p class="subtitle">
            Mesma bancada da P4, mesmos dados. A molécula chegou migrada em 2026-08-04 e nunca
            passou pelo §7.
          </p>
        </header>

        <section class="controles">
          <button class="btn" @click=${this.conferirLinhas}>conferir linhas</button>
          <button class="btn" @click=${this.alternarTamanho}>
            ${this.tamanhoPagina === 4 ? 'mostrar todas (sem paginar)' : 'voltar a 4 por página'}
          </button>
          <button class="btn" @click=${this.alternarModo}>
            ${this.modoExterno ? 'passar para modo INTERNO' : 'passar para modo EXTERNO'}
          </button>
          <button class="btn" @click=${this.incrementar}>contador +1</button>
          <button class="btn" @click=${this.limparLog}>limpar log</button>
          <span class="leitura">contador = <strong>${this.contador}</strong></span>
          <span class="leitura">página = <strong>${this.pagina}</strong></span>
          <span class="leitura">
            modo = <strong>${this.modoExterno ? 'EXTERNO' : 'INTERNO'}</strong>
          </span>
        </section>

        <p class="esperado">
          Esperado: ordem correta já na 1ª ordenação, 0 divergências dentro da linha, e a legenda
          aparecendo <strong>uma vez só</strong> — a molécula tem um caminho vivo e um
          <code>unsafeHTML</code> para o mesmo Caption.
        </p>

        ${this.renderTabela()}
        ${this.renderLog()}
      </div>
    `;
  }

  /**
   * Paginação EXTERNA, que é o que o contrato do grupo manda (skills/groupViewTable/creation.ts
   * §9): a molécula calcula as páginas a partir de `total-items`, desenha os controles e emite
   * `pageChange` — **quem fatia é o consumidor**. A `ml-responsive-data-table` segue isso à
   * risca: ela não tem nenhum `slice`.
   *
   * A P4 (ml-data-table-minimal) foi escrita com todas as linhas no DOM porque aquela molécula
   * ACEITA os dois modos — ela fatia sozinha quando `totalItems <= linhas recebidas`
   * (`ml-data-table-minimal.ts:590-593`). É uma divergência de contrato dentro do mesmo grupo,
   * registrada no todo.
   *
   * Ordenar também é do consumidor aqui: a molécula só enxerga a página corrente, então ordenar
   * lá dentro reordenaria 4 linhas em vez de 9.
   */
  private linhasVisiveis(): Linha[] {
    // MODO INTERNO: entrega tudo e não mexe em nada — a molécula ordena as 9 e fatia sozinha.
    if (!this.modoExterno) return this.linhas;

    const ordenadas = [...this.linhas];
    if (this.ordemChave === 'item' || this.ordemChave === 'valor') {
      const dir = this.ordemDirecao === 'asc' ? 1 : -1;
      ordenadas.sort((a, b) => {
        const at = this.ordemChave === 'valor' ? String(a.valor) : a.id;
        const bt = this.ordemChave === 'valor' ? String(b.valor) : b.id;
        return dir * at.localeCompare(bt, undefined, { numeric: true, sensitivity: 'base' });
      });
    }
    const inicio = (this.pagina - 1) * this.tamanhoPagina;
    return ordenadas.slice(inicio, inicio + this.tamanhoPagina);
  }

  private renderTabela(): TemplateResult {
    return html`
      <groupviewtable--ml-responsive-data-table
        .pageSize=${this.tamanhoPagina}
        .page=${this.pagina}
        .totalItems=${this.modoExterno ? this.linhas.length : 0}
      >
        <Caption>LEGENDA-SONDA · 9 itens · colunas Item e Valor ordenáveis</Caption>
        <TableHeader>
          <TableRow>
            <TableHead key="item" sortable>Item</TableHead>
            <TableHead key="valor" sortable>Valor</TableHead>
            <TableHead key="acao">Ação</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          ${this.linhasVisiveis().map(
            (l) => html`
              <TableRow>
                <TableCell>${l.id}</TableCell>
                <TableCell>${l.valor}</TableCell>
                <TableCell>
                  <grouptriggeraction--ml-button-standard
                    data-variant="secondary"
                    size="xs"
                    data-origem="linha-${l.id}"
                  >
                    <Label>ação ${l.id}</Label>
                  </grouptriggeraction--ml-button-standard>
                  <span class="eco">c=${this.contador}</span>
                </TableCell>
              </TableRow>
            `,
          )}
        </TableBody>
      </groupviewtable--ml-responsive-data-table>
    `;
  }

  private renderLog(): TemplateResult {
    return html`
      <section class="block">
        <h2 class="block-title">Log de eventos</h2>
        ${this.log.length === 0
          ? html`<p class="vazio">nada ainda — clique num botão de linha, ordene, pagine</p>`
          : html`<ol class="log">${this.log.map((l) => html`<li>${l}</li>`)}</ol>`}
      </section>
    `;
  }
}
