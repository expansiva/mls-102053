/// <mls fileReference="_102053_/l2/demotable/estoquecategoria.ts" enhancement="_102020_/l2/enhancementAura"/>
// Página E2 do todo/analise-paginas-demonstracao-com-table.md.
//
// Demonstra o AGRUPAMENTO, que só existe na ml-grouping-table: o consumidor marca as colunas
// agrupáveis com `groupable` e a própria molécula desenha o seletor "Agrupar por", monta os
// cabeçalhos de grupo e permite recolher cada um.
//
// SEM PAGINAÇÃO: agrupar e paginar não combinam — um grupo ficaria partido entre páginas. A
// molécula, aliás, não fatia (nenhum `slice`), então a decisão aqui é a mesma da vendasmensal:
// conjunto fechado, recorte de 40 itens para a tela caber numa apresentação.
import { html, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { StateLitElement } from '/_102029_/l2/stateLitElement.js';

import '/_102040_/l2/molecules/groupviewtable/ml-grouping-table';

import { ESTOQUE, formatarMoeda } from '/_102053_/l2/demotable/dados.js';

const RECORTE = ESTOQUE.slice(0, 40);

/** Tags em uso na tela. Aparecem no cabeçalho, para a equipe ver o que vai escrever. */
const COMPONENTES = ['groupviewtable--ml-grouping-table'];

@customElement('demotable--estoquecategoria-102053')
export class DemoTableEstoqueCategoria extends StateLitElement {
  render(): TemplateResult {
    return html`
      <div class="page">
        <header class="head">
          <p class="eyebrow">Estoque</p>
          <h1 class="title">Posição por categoria e fornecedor</h1>
          <p class="subtitle">
            ${RECORTE.length} itens. Use o seletor <strong>Agrupar por</strong> da própria tabela
            para alternar entre Categoria, Fornecedor e Depósito — e clique no cabeçalho de um
            grupo para recolhê-lo.
          </p>
          <p class="componentes">
            <span>Componentes nesta tela:</span>
            ${COMPONENTES.map((c) => html`<code>${c}</code>`)}
          </p>
        </header>

        <groupviewtable--ml-grouping-table>
          <Caption>Itens em estoque com valor imobilizado</Caption>

          <TableHeader>
            <TableRow>
              <TableHead key="codigo" sortable>Código</TableHead>
              <TableHead key="descricao" sortable>Descrição</TableHead>
              <TableHead key="categoria" sortable groupable>Categoria</TableHead>
              <TableHead key="fornecedor" sortable groupable>Fornecedor</TableHead>
              <TableHead key="deposito" groupable>Depósito</TableHead>
              <TableHead key="quantidade" sortable>Quantidade</TableHead>
              <TableHead key="valor" sortable>Valor imobilizado</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            ${RECORTE.map(
              (item) => html`
                <TableRow>
                  <TableCell>${item.codigo}</TableCell>
                  <TableCell>${item.descricao}</TableCell>
                  <TableCell>${item.categoria}</TableCell>
                  <TableCell>${item.fornecedor}</TableCell>
                  <TableCell>${item.deposito}</TableCell>
                  <TableCell data-class="text-right">${item.quantidade}</TableCell>
                  <TableCell data-class="text-right">
                    ${formatarMoeda(item.quantidade * item.precoUnitario)}
                  </TableCell>
                </TableRow>
              `,
            )}
          </TableBody>
        </groupviewtable--ml-grouping-table>
      </div>
    `;
  }
}
