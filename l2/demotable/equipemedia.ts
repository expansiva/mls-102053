/// <mls fileReference="_102053_/l2/demotable/equipemedia.ts" enhancement="_102020_/l2/enhancementAura"/>
// Página C3 do todo/analise-paginas-demonstracao-com-table.md.
//
// A célula como MÍDIA: foto redonda à esquerda, nome em cima e e-mail embaixo — três informações
// numa coluna só. É o padrão de tabela de pessoas que a equipe reconhece de produtos prontos.
//
// Usa a ml-advanced-data-table por dois recursos que só ela tem e que combinam com este caso:
// **redimensionar coluna** (arrastando a divisa do cabeçalho) e **reordenar coluna** (arrastando
// o cabeçalho). A coluna de pessoa é a que mais se beneficia de largura ajustável.
//
// Avatar com INICIAIS e não foto: a página do harness é autocontida — sem rede, sem arquivo. O
// desenho é o mesmo que uma foto teria.
import { html, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { StateLitElement } from '/_102029_/l2/stateLitElement.js';

import '/_102040_/l2/molecules/groupviewtable/ml-advanced-data-table';

import { COLABORADORES, formatarMoeda } from '/_102053_/l2/demotable/dados.js';

/** Tags em uso na tela. Aparecem no cabeçalho, para a equipe ver o que vai escrever. */
const COMPONENTES = ['groupviewtable--ml-advanced-data-table'];

@customElement('demotable--equipemedia-102053')
export class DemoTableEquipeMedia extends StateLitElement {
  render(): TemplateResult {
    return html`
      <div class="page">
        <header class="head">
          <p class="eyebrow">Pessoas</p>
          <h1 class="title">Equipe por empresa</h1>
          <p class="subtitle">
            A coluna <strong>Name</strong> traz três informações numa célula só: avatar, nome e
            e-mail. Arraste a divisa do cabeçalho para <strong>mudar a largura</strong> da coluna,
            ou arraste o próprio cabeçalho para <strong>reordenar</strong>.
          </p>
          <p class="componentes">
            <span>Componentes nesta tela:</span>
            ${COMPONENTES.map((c) => html`<code>${c}</code>`)}
          </p>
        </header>

        <groupviewtable--ml-advanced-data-table>
          <Caption>Quadro por empresa, cargo e remuneração</Caption>

          <TableHeader>
            <TableRow>
              <TableHead key="nome" sortable>Name</TableHead>
              <TableHead key="empresa" sortable>Company</TableHead>
              <TableHead key="cargo" sortable>Occupation</TableHead>
              <TableHead key="salario" sortable>Salary</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            ${COLABORADORES.map(
              (p) => html`
                <TableRow>
                  <TableCell>
                    <span class="pessoa">
                      <span class="avatar" style="background:${p.cor}" aria-hidden="true">
                        ${p.iniciais}
                      </span>
                      <span class="pessoa-texto">
                        <strong class="pessoa-nome">${p.nome}</strong>
                        <span class="pessoa-email">${p.email}</span>
                      </span>
                    </span>
                  </TableCell>
                  <TableCell>${p.empresa}</TableCell>
                  <TableCell>${p.cargo}</TableCell>
                  <TableCell data-class="text-right">${formatarMoeda(p.salario)}</TableCell>
                </TableRow>
              `,
            )}
          </TableBody>
        </groupviewtable--ml-advanced-data-table>

        <p class="nota">
          A ordenação por <strong>Name</strong> lê o texto da célula inteira — nome e e-mail juntos.
          Como o nome vem primeiro, o resultado é o esperado; vale saber que a regra é essa.
        </p>
      </div>
    `;
  }
}
