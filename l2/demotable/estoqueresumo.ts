/// <mls fileReference="_102053_/l2/demotable/estoqueresumo.ts" enhancement="_102020_/l2/enhancementAura"/>
// Página E3 do todo/analise-paginas-demonstracao-com-table.md.
//
// Contraste proposital com a `vendasmensal`: lá a molécula CALCULA os totais a partir do texto
// das células (`show-row-total` / `show-column-total`); aqui QUEM CALCULA É A PÁGINA, e a
// ml-pivot-table apenas formata as linhas marcadas com `subtotal` e `total`.
//
// Vale mostrar os dois na apresentação: a escolha entre eles é a pergunta "de quem é a conta?".
// Quando o número vem do backend já somado — o caso comum em relatório —, é esta molécula.
import { html, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { StateLitElement } from '/_102029_/l2/stateLitElement.js';

import '/_102040_/l2/molecules/groupviewtable/ml-pivot-table';

import { ESTOQUE, ItemEstoque, formatarMoeda } from '/_102053_/l2/demotable/dados.js';

/** Tags em uso na tela. Aparecem no cabeçalho, para a equipe ver o que vai escrever. */
const COMPONENTES = ['groupviewtable--ml-pivot-table'];

const DEPOSITOS = ['Matriz', 'CD Sul', 'CD Norte', 'Loja 1'] as const;

interface LinhaResumo {
  categoria: string;
  itens: Array<{ descricao: string; porDeposito: number[]; total: number }>;
  subtotal: number[];
  subtotalGeral: number;
}

/** A conta é da página: agrupa por categoria, soma por depósito e fecha o total geral. */
function montarResumo(): { grupos: LinhaResumo[]; totalPorDeposito: number[]; totalGeral: number } {
  const porCategoria = new Map<string, ItemEstoque[]>();
  for (const item of ESTOQUE.slice(0, 60)) {
    const lista = porCategoria.get(item.categoria) ?? [];
    lista.push(item);
    porCategoria.set(item.categoria, lista);
  }

  const totalPorDeposito = DEPOSITOS.map(() => 0);
  let totalGeral = 0;

  const grupos: LinhaResumo[] = [...porCategoria.entries()]
    .slice(0, 4)
    .map(([categoria, itens]) => {
      const subtotal = DEPOSITOS.map(() => 0);
      const linhas = itens.slice(0, 4).map((item) => {
        const valor = item.quantidade * item.precoUnitario;
        const porDeposito = DEPOSITOS.map((dep) => (dep === item.deposito ? valor : 0));
        porDeposito.forEach((v, i) => {
          subtotal[i] += v;
        });
        return { descricao: item.descricao, porDeposito, total: valor };
      });
      const subtotalGeral = subtotal.reduce((a, b) => a + b, 0);
      subtotal.forEach((v, i) => {
        totalPorDeposito[i] += v;
      });
      totalGeral += subtotalGeral;
      return { categoria, itens: linhas, subtotal, subtotalGeral };
    });

  return { grupos, totalPorDeposito, totalGeral };
}

const RESUMO = montarResumo();

@customElement('demotable--estoqueresumo-102053')
export class DemoTableEstoqueResumo extends StateLitElement {
  render(): TemplateResult {
    return html`
      <div class="page">
        <header class="head">
          <p class="eyebrow">Estoque</p>
          <h1 class="title">Resumo por categoria e depósito</h1>
          <p class="subtitle">
            Valor imobilizado por depósito. Os <strong>subtotais por categoria</strong> e o
            <strong>total geral</strong> são calculados por quem monta a página — a tabela recebe
            os números prontos e cuida de destacá-los.
          </p>
          <p class="componentes">
            <span>Componentes nesta tela:</span>
            ${COMPONENTES.map((c) => html`<code>${c}</code>`)}
          </p>
        </header>

        <groupviewtable--ml-pivot-table>
          <Caption>Valor imobilizado por categoria e depósito</Caption>

          <TableHeader>
            <TableRow>
              <TableHead key="descricao">Item</TableHead>
              ${DEPOSITOS.map((dep) => html`<TableHead key=${dep.toLowerCase()}>${dep}</TableHead>`)}
              <TableHead key="total">Total</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            ${RESUMO.grupos.map(
              (grupo) => html`
                ${grupo.itens.map(
                  (item) => html`
                    <TableRow>
                      <TableCell>${item.descricao}</TableCell>
                      ${item.porDeposito.map(
                        (valor) => html`
                          <TableCell data-class="text-right">
                            ${valor > 0 ? formatarMoeda(valor) : '—'}
                          </TableCell>
                        `,
                      )}
                      <TableCell data-class="text-right">${formatarMoeda(item.total)}</TableCell>
                    </TableRow>
                  `,
                )}
                <TableRow subtotal>
                  <TableCell>Subtotal · ${grupo.categoria}</TableCell>
                  ${grupo.subtotal.map(
                    (valor) => html`
                      <TableCell data-class="text-right">${formatarMoeda(valor)}</TableCell>
                    `,
                  )}
                  <TableCell data-class="text-right">${formatarMoeda(grupo.subtotalGeral)}</TableCell>
                </TableRow>
              `,
            )}

            <TableRow total>
              <TableCell>Total geral</TableCell>
              ${RESUMO.totalPorDeposito.map(
                (valor) => html`
                  <TableCell data-class="text-right">${formatarMoeda(valor)}</TableCell>
                `,
              )}
              <TableCell data-class="text-right">${formatarMoeda(RESUMO.totalGeral)}</TableCell>
            </TableRow>
          </TableBody>
        </groupviewtable--ml-pivot-table>
      </div>
    `;
  }
}
