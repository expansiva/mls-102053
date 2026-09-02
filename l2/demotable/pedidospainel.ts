/// <mls fileReference="_102053_/l2/demotable/pedidospainel.ts" enhancement="_102020_/l2/enhancementAura"/>
// Página B2 de `todo/ajuste-contrato-view-table/plano-fechamento-groupviewtable-2.md` §4.6,
// adaptada para a `ml-side-detail-table` — é literalmente o cenário dela: tabela ordenável e
// paginada, com o detalhe do registro ao lado ao clicar na linha.
//
// Modo EXTERNO, de propósito: `pedidosdetalhe` (a página de referência da `ml-lazy-record-detail-
// table`) já cobre o modo INTERNO, e `consultarPagina()` — pensado desde `dados.ts` para o modo
// externo — nunca tinha sido exercitado por nenhuma página. Aqui a PÁGINA ordena e pagina (10 por
// página); a tabela recebe só a página atual e `total-items` com o total real, e só reage a `sort`
// e `pageChange`.
//
// Os itens do checklist do B2:
//   1. `sort-value` nas células de valor (número) e data (ordinal) — o texto formatado não ordena
//      como o dado (R$ e dd/mm/aaaa);
//   2. um modo só, coerente: aqui é EXTERNO — todas as linhas da página, e `total-items` com o total
//      real, nunca as duas coisas ao mesmo tempo;
//   3. `<Detail>` como filho direto do `<TableRow>` — aqui vem cheio desde o início: a molécula não
//      precisa de carregamento sob demanda, ela só decide qual detalhe já presente mostrar;
//   4. `fit-height` no host, dentro de um contêiner com altura definida;
//   5. nenhum `data-class` de cor, fundo, sombra ou peso de fonte em slot tag — só alinhamento
//      (`text-right`), que é layout e continua permitido.
import { html, TemplateResult } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { StateLitElement } from '/_102029_/l2/stateLitElement.js';

import '/_102040_/l2/molecules/groupviewtable/ml-side-detail-table';
import '/_102040_/l2/molecules/groupviewtable/ml-data-table';

import {
  PEDIDOS_PAINEL,
  Pedido,
  formatarMoeda,
  consultarPagina,
  itensDoPedido,
  totalDoPedido,
} from '/_102053_/l2/demotable/dados.js';

const COMPONENTES = ['groupviewtable--ml-side-detail-table', 'groupviewtable--ml-data-table'];

const TAMANHO_PAGINA = 10;

/** Colunas ordenáveis que a molécula conhece → o campo real de `Linha` que carrega o valor comparável. */
type ChaveOrdem = 'id' | 'cliente' | 'total' | 'dataOrdinal';
const MAPA_ORDEM: Record<string, ChaveOrdem> = { numero: 'id', cliente: 'cliente', valor: 'total', data: 'dataOrdinal' };

interface Linha extends Pedido {
  total: number;
}

const LINHAS: Linha[] = PEDIDOS_PAINEL.map((pedido) => ({ ...pedido, total: totalDoPedido(pedido) }));

@customElement('demotable--pedidospainel-102053')
export class DemoTablePedidosPainel extends StateLitElement {
  @state() private pagina = 1;

  @state() private ordem: ChaveOrdem | '' = '';

  @state() private direcao: 'asc' | 'desc' = 'asc';

  /** A PÁGINA ordena e fatia — modo externo. A tabela só recebe a fatia e o total. */
  private paginaAtual(): { linhas: Linha[]; total: number } {
    return consultarPagina(LINHAS, {
      pagina: this.pagina,
      tamanho: TAMANHO_PAGINA,
      ordem: this.ordem || undefined,
      direcao: this.direcao,
    });
  }

  private onSort(e: Event): void {
    const { key, direction } = (e as CustomEvent).detail as { key: string; direction: 'asc' | 'desc' };
    const campo = MAPA_ORDEM[key];
    if (!campo) return;
    this.ordem = campo;
    this.direcao = direction;
    this.pagina = 1;
  }

  private onPageChange(e: Event): void {
    this.pagina = (e as CustomEvent).detail.page;
  }

  render(): TemplateResult {
    const { linhas, total } = this.paginaAtual();
    const paginas = Math.max(1, Math.ceil(total / TAMANHO_PAGINA));

    return html`
      <div class="page">
        <header class="head">
          <p class="eyebrow">Comercial</p>
          <h1 class="title">Pedidos com painel de detalhe</h1>
          <p class="subtitle">
            Ordenável por número, cliente e valor — clique num cabeçalho. ${TAMANHO_PAGINA} por
            página, em modo <strong>EXTERNO</strong>: esta página ordena e fatia
            (<code>consultarPagina</code>), a tabela só recebe a página atual e
            <code>total-items</code> com o total real. Clique numa linha para ver os itens do pedido
            no painel ao lado — o conteúdo já está pronto desde o início, sem carregamento.
          </p>
          <p class="componentes">
            <span>Componentes nesta tela:</span>
            ${COMPONENTES.map((c) => html`<code>${c}</code>`)}
          </p>
        </header>

        <div class="quadro">
          <groupviewtable--ml-side-detail-table
            fit-height
            page=${this.pagina}
            page-size=${TAMANHO_PAGINA}
            total-items=${total}
            @sort=${this.onSort}
            @pageChange=${this.onPageChange}
          >
            <Caption>Pedidos — página ${this.pagina} de ${paginas}</Caption>

            <TableHeader>
              <TableRow>
                <TableHead key="numero" sortable>Número</TableHead>
                <TableHead key="cliente" sortable>Cliente</TableHead>
                <TableHead key="valor" sortable>Valor</TableHead>
                <TableHead key="data" sortable>Data</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              ${linhas.map((linha) => this.renderLinha(linha))}
            </TableBody>
          </groupviewtable--ml-side-detail-table>
        </div>
      </div>
    `;
  }

  private renderLinha(linha: Linha): TemplateResult {
    return html`
      <TableRow key=${linha.id}>
        <TableCell>${linha.id}</TableCell>
        <TableCell>${linha.cliente}</TableCell>
        <TableCell data-class="text-right" sort-value=${linha.total}>${formatarMoeda(linha.total)}</TableCell>
        <TableCell data-class="text-right" sort-value=${linha.dataOrdinal}>${linha.data}</TableCell>

        <Detail label=${`Pedido ${linha.id}`}>${this.renderDetalhe(linha)}</Detail>
      </TableRow>
    `;
  }

  private renderDetalhe(linha: Linha): TemplateResult {
    return html`
      <div class="detalhe">
        <p class="detalhe-titulo">Itens do pedido ${linha.id}</p>
        <p class="detalhe-cliente">${linha.cliente} · ${itensDoPedido(linha)} itens · ${linha.data}</p>
        <groupviewtable--ml-data-table>
          <TableHeader>
            <TableRow>
              <TableHead key="produto" sortable>Produto</TableHead>
              <TableHead key="preco" sortable>Preço</TableHead>
              <TableHead key="qtd" sortable>Qtd.</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            ${linha.itens.map(
              (item) => html`
                <TableRow>
                  <TableCell>${item.produto}</TableCell>
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
