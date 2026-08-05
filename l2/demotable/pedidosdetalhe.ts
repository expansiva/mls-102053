/// <mls fileReference="_102053_/l2/demotable/pedidosdetalhe.ts" enhancement="_102020_/l2/enhancementAura"/>
// Página C4 do todo/analise-paginas-demonstracao-com-table.md.
//
// Demonstra a ml-lazy-record-detail-table: tabela com linha de detalhe sob demanda, um misto de
// tabela com accordion. Ao expandir, a molécula emite `rowClick` com o índice; a página busca os
// itens do pedido e escreve dentro do `<Detail>` daquela linha.
//
// O carregamento é SIMULADO com um atraso curto, de propósito: é assim que se comporta com um BFF
// de verdade, e mostra o estado "carregando…" que a tela precisa ter.
//
// Duas coisas dependem de o slot ser VIVO, e as duas aparecem aqui: o detalhe é OUTRA TABELA
// (uma molécula dentro de um slot), e ela chega depois, num segundo momento — conteúdo serializado
// entregaria markup morto e perderia o binding.
import { html, TemplateResult } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { StateLitElement } from '/_102029_/l2/stateLitElement.js';

import '/_102040_/l2/molecules/groupviewtable/ml-lazy-record-detail-table';
import '/_102040_/l2/molecules/groupviewtable/ml-data-table';

import {
  PEDIDOS,
  Pedido,
  formatarMoeda,
  itensDoPedido,
  totalDoPedido,
} from '/_102053_/l2/demotable/dados.js';

/** Tags em uso na tela. Aparecem no cabeçalho, para a equipe ver o que vai escrever. */
const COMPONENTES = [
  'groupviewtable--ml-lazy-record-detail-table',
  'groupviewtable--ml-data-table',
];

@customElement('demotable--pedidosdetalhe-102053')
export class DemoTablePedidosDetalhe extends StateLitElement {
  /** Índices cujo detalhe já foi carregado. */
  @state() private carregados = new Set<number>();

  /** Índices em carregamento — é o que pinta o "carregando…". */
  @state() private carregando = new Set<number>();

  /**
   * A molécula avisa que a linha abriu; a página busca o detalhe. Aqui a busca é simulada, mas o
   * formato é o de uma chamada real: pede, espera, e só então tem o conteúdo.
   */
  private onRowClick(e: Event): void {
    const indice = Number((e as CustomEvent).detail?.index);
    if (Number.isNaN(indice) || this.carregados.has(indice) || this.carregando.has(indice)) return;

    this.carregando = new Set([...this.carregando, indice]);
    window.setTimeout(() => {
      const emCurso = new Set(this.carregando);
      emCurso.delete(indice);
      this.carregando = emCurso;
      this.carregados = new Set([...this.carregados, indice]);
    }, 600);
  }

  private renderStatus(status: Pedido['status']): TemplateResult {
    const classe = status.toLowerCase();
    return html`<span class="status ${classe}">${status}</span>`;
  }

  render(): TemplateResult {
    return html`
      <div class="page">
        <header class="head">
          <p class="eyebrow">Comercial</p>
          <h1 class="title">Pedidos por cliente</h1>
          <p class="subtitle">
            Clique na seta de uma linha para ver os itens do pedido. O conteúdo é buscado só nesse
            momento — a tabela avisa que a linha abriu e a página carrega o detalhe.
          </p>
          <p class="subtitle">
            São 8 pedidos com 5 por página, no modo INTERNAL: a página escreve TODAS as linhas e não
            informa <code>total-items</code>, então quem pagina é a molécula. O teste que interessa é
            abrir um detalhe na página 1, ir para a página 2 e voltar — o conteúdo tem de continuar lá.
          </p>
          <p class="componentes">
            <span>Componentes nesta tela:</span>
            ${COMPONENTES.map((c) => html`<code>${c}</code>`)}
          </p>
        </header>

        <groupviewtable--ml-lazy-record-detail-table page-size="5" @rowClick=${this.onRowClick}>
          <Caption>Pedidos recentes</Caption>

          <TableHeader>
            <TableRow>
              <TableHead key="cliente" sortable>Customer</TableHead>
              <TableHead key="itens" sortable>Items</TableHead>
              <TableHead key="total" sortable>Total</TableHead>
              <TableHead key="status" sortable>Status</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            ${PEDIDOS.map((pedido, indice) => this.renderLinha(pedido, indice))}
          </TableBody>
        </groupviewtable--ml-lazy-record-detail-table>
      </div>
    `;
  }

  private renderLinha(pedido: Pedido, indice: number): TemplateResult {
    return html`
      <TableRow>
        <TableCell>
          <span class="pessoa">
            <span class="avatar" style="background:${pedido.cor}" aria-hidden="true">
              ${pedido.iniciais}
            </span>
            <span class="pessoa-texto">
              <strong class="pessoa-nome">${pedido.cliente}</strong>
              <span class="pessoa-email">${pedido.email}</span>
            </span>
          </span>
        </TableCell>
        <TableCell data-class="text-center" sort-value=${itensDoPedido(pedido)}>${itensDoPedido(pedido)}</TableCell>
        <TableCell data-class="text-right" sort-value=${totalDoPedido(pedido)}>
          ${formatarMoeda(totalDoPedido(pedido))}
        </TableCell>
        <TableCell>${this.renderStatus(pedido.status)}</TableCell>

        <Detail>${this.renderDetalhe(pedido, indice)}</Detail>
      </TableRow>
    `;
  }

  private renderDetalhe(pedido: Pedido, indice: number): TemplateResult {
    if (this.carregando.has(indice)) {
      return html`<p class="carregando">Carregando itens do pedido ${pedido.id}…</p>`;
    }
    if (!this.carregados.has(indice)) return html``;

    return html`
      <div class="detalhe">
        <p class="detalhe-titulo">Itens do pedido ${pedido.id}</p>
        <groupviewtable--ml-data-table>
          <TableHeader>
            <TableRow>
              <TableHead data-class="text-left" key="produto" sortable>Product</TableHead>
              <TableHead data-class="text-left" key="categoria" sortable>Category</TableHead>
              <TableHead data-class="text-right" key="preco" sortable>Price</TableHead>
              <TableHead data-class="text-right" key="qtd" sortable>Qty</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            ${pedido.itens.map(
              (item) => html`
                <TableRow>
                  <TableCell>${item.produto}</TableCell>
                  <TableCell>${item.categoria}</TableCell>
                  <TableCell data-class="text-right" sort-value=${item.preco}>${formatarMoeda(item.preco)}</TableCell>
                  <TableCell data-class="text-right" sort-value=${item.quantidade}>${item.quantidade}</TableCell>
                </TableRow>
              `,
            )}
          </TableBody>
        </groupviewtable--ml-data-table>
      </div>
    `;
  }
}
