/// <mls fileReference="_102053_/l2/demotable/vendasmensal.ts" enhancement="_102020_/l2/enhancementAura"/>
// Página E1 do todo/analise-paginas-demonstracao-com-table.md — prova de conceito do
// GroupViewTable para a equipe de desenvolvimento.
//
// Demonstra, numa tela só, os seis recursos pedidos: listagem, ordenação, somatória por linha,
// somatória por coluna, reordenação de colunas (arrastando o cabeçalho) e — por ausência — a
// razão de NÃO paginar aqui.
//
// SEM PAGINAÇÃO, de propósito: a molécula calcula o total de coluna sobre as linhas que recebeu
// (ml-advanced-data-table.ts, `renderColumnTotalFooter`), então numa tela paginada o rodapé
// mostraria o total da PÁGINA. Num relatório isso é número errado. Relatório mensal é conjunto
// fechado; a paginação se demonstra nas páginas de listagem, onde ela é natural.
import { html, TemplateResult } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { StateLitElement } from '/_102029_/l2/stateLitElement.js';

import '/_102040_/l2/molecules/groupviewtable/ml-advanced-data-table';
import '/_102040_/l2/molecules/groupenterboolean/ml-toggle-switch';

import { CANAIS, MES_REFERENCIA, VENDAS_DO_MES, formatarMoeda } from '/_102053_/l2/demotable/dados.js';

/** Tags em uso na tela. Aparecem no cabeçalho, para a equipe ver o que vai escrever. */
const COMPONENTES = [
  'groupviewtable--ml-advanced-data-table',
  'groupenterboolean--ml-toggle-switch',
];

@customElement('demotable--vendasmensal-102053')
export class DemoTableVendasMensal extends StateLitElement {
  @state() private totalPorLinha = true;
  @state() private totalPorColuna = true;

  render(): TemplateResult {
    return html`
      <div class="page">
        <header class="head">
          <p class="eyebrow">Relatório</p>
          <h1 class="title">Vendas por canal — ${MES_REFERENCIA}</h1>
          <p class="subtitle">
            ${VENDAS_DO_MES.length} produtos · ${CANAIS.length} canais · valores em reais.
            Clique num cabeçalho para ordenar; arraste um cabeçalho para reordenar a coluna.
          </p>
          <p class="componentes">
            <span>Componentes nesta tela:</span>
            ${COMPONENTES.map((c) => html`<code>${c}</code>`)}
          </p>
        </header>

        <section class="controles">
          <label class="controle">
            <groupenterboolean--ml-toggle-switch
              .value=${this.totalPorLinha}
              @change=${(e: Event) =>
                (this.totalPorLinha = !!(e as CustomEvent).detail?.value)}
            ></groupenterboolean--ml-toggle-switch>
            <span>Total por linha</span>
          </label>
          <label class="controle">
            <groupenterboolean--ml-toggle-switch
              .value=${this.totalPorColuna}
              @change=${(e: Event) =>
                (this.totalPorColuna = !!(e as CustomEvent).detail?.value)}
            ></groupenterboolean--ml-toggle-switch>
            <span>Total por coluna</span>
          </label>
        </section>

        <groupviewtable--ml-advanced-data-table
          ?show-row-total=${this.totalPorLinha}
          ?show-column-total=${this.totalPorColuna}
        >
          <Caption>Faturamento por produto e canal de venda</Caption>

          <TableHeader>
            <TableRow>
              <TableHead key="produto" sortable>Produto</TableHead>
              <TableHead key="categoria" sortable>Categoria</TableHead>
              ${CANAIS.map(
                (canal) => html`<TableHead key=${canal.toLowerCase()} sortable>${canal}</TableHead>`,
              )}
            </TableRow>
          </TableHeader>

          <TableBody>
            ${VENDAS_DO_MES.map(
              (linha) => html`
                <TableRow>
                  <TableCell>${linha.produto}</TableCell>
                  <TableCell>${linha.categoria}</TableCell>
                  ${CANAIS.map(
                    (canal) => html`
                      <TableCell data-class="text-right">
                        ${formatarMoeda(linha.porCanal[canal])}
                      </TableCell>
                    `,
                  )}
                </TableRow>
              `,
            )}
          </TableBody>
        </groupviewtable--ml-advanced-data-table>

        <p class="nota">
          A coluna <strong>Total da linha</strong> e a linha de totais no rodapé são calculadas pela
          própria molécula, a partir do texto das células — inclusive com a máscara de moeda.
        </p>
      </div>
    `;
  }
}
