/// <mls fileReference="_102053_/l2/demo/tabela.ts" enhancement="_102020_/l2/enhancementAura"/>
// P4 do todo/todo-demo-molecules-live-slots.md — regressão do caminho renderLiveSlotFrom.
//
// Por que esta página existe, e por que ela é REGRESSÃO e não teste novo: em 2026-08-03 o
// `_checkIfInert` do moleculeBase perdeu o atalho de `usesLiveSlots` (Etapa 0, caminho (a)).
// A P1 provou que o caminho de âncora por TAG (renderLiveSlot) sobreviveu — mas a tabela usa
// o outro caminho, âncora por ELEMENTO (renderLiveSlotFrom + WeakMap de ids + despejo de
// âncora reusada), que é o mais frágil dos dois e não foi exercitado depois da mudança.
//
// Os dados são da própria página, de propósito: o stub do harness de templates não pagina
// (item 8.1 do controle), então paginar por aqui é o que torna o teste possível hoje.
import { html, TemplateResult } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { StateLitElement } from '/_102029_/l2/stateLitElement.js';

import '/_102040_/l2/molecules/groupviewtable/ml-data-table-minimal';
import '/_102040_/l2/molecules/grouptriggeraction/ml-button-standard';

interface Linha {
  id: string;
  valor: number;
}

@customElement('demo--tabela-102053')
export class DemoLiveSlotsTabela extends StateLitElement {
  @state() private log: string[] = [];
  @state() private contador = 0;
  @state() private pagina = 1;

  /** Espelho do sort que a molécula anunciou, para a página saber o que esperar ver. */
  @state() private ordemChave = '';
  @state() private ordemDirecao = 'asc';

  /**
   * 4 = pagina (só 4 linhas chegam a ser renderizadas/projetadas).
   * 20 = mostra as 9 (todas renderizadas e projetadas).
   * A comparação entre os dois é o que isola a hipótese "linha nunca renderizada não entra
   * na ordenação": se ordenar certo com 20 e errado com 4, é isso.
   */
  @state() private tamanhoPagina = 4;

  private alternarTamanho(): void {
    this.tamanhoPagina = this.tamanhoPagina === 4 ? 20 : 4;
    this.pagina = 1;
    this.registrar(`página · page-size = ${this.tamanhoPagina}`);
  }

  /**
   * O valor está fora de ordem em relação ao id de propósito: ordenar por Valor tem de
   * embaralhar visivelmente a ordem dos ids. Se as duas colunas subissem juntas, uma troca
   * de conteúdo entre linhas passaria despercebida.
   */
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
  // LOG
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

  /** Clique num botão de linha. O `data-origem` diz de qual linha ele veio. */
  private onAction(e: Event): void {
    const alvo = e.target as HTMLElement;
    const origem = alvo.getAttribute('data-origem') || '(sem marca)';
    this.registrar(`BOTÃO · ${origem}`);
  }

  private onSort(e: Event): void {
    const d = (e as CustomEvent).detail || {};
    this.ordemChave = d.key || '';
    this.ordemDirecao = d.direction || 'asc';
    this.registrar(`tabela · sort key=${d.key} direção=${d.direction}`);
  }

  /**
   * A ordem que a página ESPERA ver, calculada aqui a partir dos mesmos dados que ela deu à
   * molécula. Existe porque a conferência linha a linha só enxerga divergência DENTRO da
   * linha: se a linha inteira estiver errada, célula e botão continuam casando e o teste
   * passa. Foi o que aconteceu na 1ª rodada da P4.
   */
  private ordemEsperada(): string[] {
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

  /** O que cada célula de Valor tem no DOM de ORIGEM — é o que a ordenação da molécula lê. */
  private dumpOrigem(): void {
    const tabela = this.querySelector('groupviewtable--ml-data-table-minimal');
    const corpo = tabela?.querySelector('TableBody');
    if (!corpo) {
      this.registrar('origem: TableBody não encontrado');
      return;
    }
    const linhas = Array.from(corpo.querySelectorAll('TableRow'));
    this.registrar(`origem: ${linhas.length} TableRow no slot (o que a ordenação enxerga)`);
    linhas.forEach((tr) => {
      const celulas = tr.querySelectorAll('TableCell');
      const id = (celulas[0]?.textContent || '').trim();
      const valor = (celulas[1]?.textContent || '').trim();
      this.registrar(`  origem: id="${id}" · valor="${valor}"${valor === '' ? '  ← VAZIA (projetada)' : ''}`);
    });
  }

  /** Paginação é prop controlada: sem este eco a tabela avança e o pai nunca sabe. */
  private onPageChange(e: Event): void {
    const d = (e as CustomEvent).detail || {};
    this.pagina = d.page;
    this.registrar(`tabela · pageChange → página ${d.page} (ecoada pela página)`);
  }

  /**
   * O teste do §7.4, sem depender de olho: para cada <tr> renderizada, compara o texto da
   * PRIMEIRA célula com o `data-origem` do botão que está naquela mesma linha. Se a âncora
   * reusada entregar o conteúdo à linha errada — o bug que o 2º piloto corrigiu com
   * `data-ml-live-held` —, os dois deixam de casar e a divergência aparece aqui.
   */
  private conferirLinhas(): void {
    const tabela = this.querySelector('groupviewtable--ml-data-table-minimal');
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
      const esperado = `linha-${idNaCelula}`;
      const ok = origem === esperado;
      if (!ok) divergencias += 1;
      // O `data-ml-live-ref` diz de QUAL célula de origem a molécula quis puxar o conteúdo
      // daquele <td>. É o que separa "a ordenação escolheu as linhas erradas" de "a âncora
      // entregou o conteúdo errado": se os refs forem os das linhas certas mas o texto for de
      // outras, o defeito é na entrega.
      const refs = Array.from(tr.querySelectorAll('[data-ml-live-ref]'))
        .map((s) => (s as HTMLElement).dataset.mlLiveRef)
        .join('/');
      detalhes.push(
        `  linha ${i + 1}: célula="${idNaCelula}" · botão=${origem} · eco=${eco} · refs=${refs} · ${ok ? 'OK' : '*** DIVERGE ***'}`,
      );
    });

    // Conferência de ORDEM: o que está na tela contra o que a página calculou dos mesmos dados.
    const naTela = linhas
      .map((tr) => (tr.querySelectorAll('td')[0]?.textContent || '').trim())
      .join(', ');
    const esperado = this.ordemEsperada().join(', ');
    const ordemOk = naTela === esperado;

    this.registrar(
      `conferência: ${linhas.length} linha(s) na página ${this.pagina} · ${divergencias} divergência(s) dentro da linha`,
    );
    this.registrar(`  ORDEM esperada: ${esperado}`);
    this.registrar(`  ORDEM na tela : ${naTela}  ${ordemOk ? '· OK' : '· *** ORDEM ERRADA ***'}`);
    detalhes.forEach((d) => this.registrar(d));
    this.dumpOrigem();
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
          <h1 class="title">Slots vivos — tabela (P4)</h1>
          <p class="subtitle">
            Regressão do caminho <code>renderLiveSlotFrom</code>: célula de tabela é destino
            aninhado (N×M) e a molécula reordena e pagina o que recebeu.
          </p>
        </header>

        <section class="controles">
          <button class="btn" @click=${this.conferirLinhas}>conferir linhas</button>
          <button class="btn" @click=${this.alternarTamanho}>
            ${this.tamanhoPagina === 4 ? 'mostrar todas (sem paginar)' : 'voltar a 4 por página'}
          </button>
          <button class="btn" @click=${this.incrementar}>contador +1</button>
          <button class="btn" @click=${this.limparLog}>limpar log</button>
          <span class="leitura">contador = <strong>${this.contador}</strong></span>
          <span class="leitura">página = <strong>${this.pagina}</strong></span>
        </section>

        <p class="esperado">
          Esperado: clicar no botão de uma linha registra o id DAQUELA linha. Depois de ordenar
          por Valor e de trocar de página, "conferir linhas" tem de acusar
          <strong>0 divergências</strong>.
        </p>

        ${this.renderTabela()}
        ${this.renderLog()}
      </div>
    `;
  }

  private renderTabela(): TemplateResult {
    return html`
      <groupviewtable--ml-data-table-minimal .pageSize=${this.tamanhoPagina} .page=${this.pagina}>
        <Caption>9 itens · 4 por página · colunas Item e Valor ordenáveis</Caption>
        <TableHeader>
          <TableRow>
            <TableHead key="item" sortable>Item</TableHead>
            <TableHead key="valor" sortable>Valor</TableHead>
            <TableHead key="acao">Ação</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          ${this.linhas.map(
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
      </groupviewtable--ml-data-table-minimal>
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
