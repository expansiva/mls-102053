/// <mls fileReference="_102053_/l2/demotable/clientessaldo.ts" enhancement="_102020_/l2/enhancementAura"/>
// Página C2 do todo/analise-paginas-demonstracao-com-table.md.
//
// Tabela simples de propósito — o interesse está no CONTEÚDO DA CÉLULA. A coluna Localização
// junta bandeira e nome do país, e a de saldo muda de cor conforme o sinal. É a demonstração de
// que a célula aceita markup do consumidor, não só texto.
//
// Bandeira como EMOJI e não imagem: a página do harness é autocontida, sem rede nem arquivo.
//
// Ordenação: a molécula ordena pelo TEXTO da célula. Em Localização isso ordena pelo país, porque
// o emoji vem antes e é igual para o mesmo país. No Saldo, o texto é a moeda formatada — e aí
// `numeric: true` do comparador dá conta dos milhares, mas o sinal negativo vem antes. É um bom
// gancho para falar de ordenação por texto versus por dado com a equipe.
import { html, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { StateLitElement } from '/_102029_/l2/stateLitElement.js';

import '/_102040_/l2/molecules/groupviewtable/ml-data-table';

import { CLIENTES, formatarMoeda } from '/_102053_/l2/demotable/dados.js';

/** Tags em uso na tela. Aparecem no cabeçalho, para a equipe ver o que vai escrever. */
const COMPONENTES = ['groupviewtable--ml-data-table'];

@customElement('demotable--clientessaldo-102053')
export class DemoTableClientesSaldo extends StateLitElement {
  render(): TemplateResult {
    return html`
      <div class="page">
        <header class="head">
          <p class="eyebrow">Financeiro</p>
          <h1 class="title">Saldo por cliente</h1>
          <p class="subtitle">
            Tabela simples, com conteúdo rico na célula: a localização traz bandeira e país, e o
            saldo muda de cor conforme o sinal. Todas as colunas são ordenáveis.
          </p>
          <p class="componentes">
            <span>Componentes nesta tela:</span>
            ${COMPONENTES.map((c) => html`<code>${c}</code>`)}
          </p>
        </header>

        <groupviewtable--ml-data-table>
          <Caption>Clientes ativos e saldo em conta</Caption>

          <TableHeader>
            <TableRow>
              <TableHead key="nome" sortable>Name</TableHead>
              <TableHead key="email" sortable>Email</TableHead>
              <TableHead key="local" sortable>Location</TableHead>
              <TableHead key="saldo" sortable>Balance ($)</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            ${CLIENTES.map(
              (c) => html`
                <TableRow>
                  <TableCell><strong class="nome">${c.nome}</strong></TableCell>
                  <TableCell><span class="email">${c.email}</span></TableCell>
                  <TableCell>
                    <span class="local">
                      <span class="bandeira" aria-hidden="true">${c.bandeira}</span>
                      <span>${c.pais}</span>
                    </span>
                  </TableCell>
                  <TableCell data-class="text-right" sort-value=${c.saldo}>
                    <span class="saldo ${c.saldo < 0 ? 'negativo' : c.saldo === 0 ? 'zerado' : ''}">
                      ${formatarMoeda(c.saldo)}
                    </span>
                  </TableCell>
                </TableRow>
              `,
            )}
          </TableBody>
        </groupviewtable--ml-data-table>
      </div>
    `;
  }
}
