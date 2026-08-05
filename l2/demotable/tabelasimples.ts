/// <mls fileReference="_102053_/l2/demotable/tabelasimples.ts" enhancement="_102020_/l2/enhancementAura"/>
// Página C1 do todo/analise-paginas-demonstracao-com-table.md.
//
// As duas tabelas básicas do grupo, lado a lado, com os MESMOS dados. Serve para a equipe
// enxergar quando NÃO precisa das mais pesadas: a maioria das telas é uma listagem simples, e
// puxar a tabela avançada só porque ela existe custa markup e comportamento que ninguém pediu.
import { html, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { StateLitElement } from '/_102029_/l2/stateLitElement.js';

import '/_102040_/l2/molecules/groupviewtable/ml-view-table';
import '/_102040_/l2/molecules/groupviewtable/ml-data-table';

import { FUNCIONARIOS } from '/_102053_/l2/demotable/dados.js';

/** Tags em uso na tela. Aparecem no cabeçalho, para a equipe ver o que vai escrever. */
const COMPONENTES = [
  'groupviewtable--ml-view-table',
  'groupviewtable--ml-data-table',
];

const AMOSTRA = FUNCIONARIOS.slice(0, 6);

@customElement('demotable--tabelasimples-102053')
export class DemoTableTabelaSimples extends StateLitElement {
  render(): TemplateResult {
    return html`
      <div class="page">
        <header class="head">
          <p class="eyebrow">Comparação</p>
          <h1 class="title">As duas tabelas básicas</h1>
          <p class="subtitle">
            Mesmos dados, mesmo markup. À esquerda a de exibição pura; à direita a que já traz
            ordenação. Nenhuma das duas precisa de configuração para o caso comum.
          </p>
          <p class="componentes">
            <span>Componentes nesta tela:</span>
            ${COMPONENTES.map((c) => html`<code>${c}</code>`)}
          </p>
        </header>

        <div class="lado-a-lado">
          <section class="coluna">
            <h2 class="coluna-titulo">ml-view-table</h2>
            <p class="coluna-nota">Exibição. Sem ordenação, sem seleção.</p>
            <groupviewtable--ml-view-table>
              <Caption>Equipe</Caption>
              <TableHeader>
                <TableRow>
                  <TableHead key="nome">Nome</TableHead>
                  <TableHead key="departamento">Departamento</TableHead>
                  <TableHead key="cargo">Cargo</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                ${AMOSTRA.map(
                  (f) => html`
                    <TableRow>
                      <TableCell>${f.nome}</TableCell>
                      <TableCell>${f.departamento}</TableCell>
                      <TableCell>${f.cargo}</TableCell>
                    </TableRow>
                  `,
                )}
              </TableBody>
            </groupviewtable--ml-view-table>
          </section>

          <section class="coluna">
            <h2 class="coluna-titulo">ml-data-table</h2>
            <p class="coluna-nota">
              O mesmo, mais ordenação: basta marcar a coluna com <code>sortable</code>.
            </p>
            <groupviewtable--ml-data-table>
              <Caption>Equipe</Caption>
              <TableHeader>
                <TableRow>
                  <TableHead key="nome" sortable>Nome</TableHead>
                  <TableHead key="departamento" sortable>Departamento</TableHead>
                  <TableHead key="cargo" sortable>Cargo</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                ${AMOSTRA.map(
                  (f) => html`
                    <TableRow>
                      <TableCell>${f.nome}</TableCell>
                      <TableCell>${f.departamento}</TableCell>
                      <TableCell>${f.cargo}</TableCell>
                    </TableRow>
                  `,
                )}
              </TableBody>
            </groupviewtable--ml-data-table>
          </section>
        </div>
      </div>
    `;
  }
}
