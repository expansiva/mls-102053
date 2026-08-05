/// <mls fileReference="_102053_/l2/demotable/funcionariosselecao.ts" enhancement="_102020_/l2/enhancementAura"/>
// Página F2 do todo/analise-paginas-demonstracao-com-table.md.
//
// Demonstra a seleção em lote da ml-data-table-select: `select-mode="multi"` liga a coluna de
// caixas de seleção, e a molécula emite `change` com as posições marcadas.
//
// Detalhe do contrato que vale mostrar para a equipe: a seleção vem por ÍNDICE, não por chave.
// Índice é posição, não identidade — por isso esta página trabalha com conjunto fechado e sem
// ordenação. Numa tela que ordena ou pagina, a posição muda e o consumidor precisa reconciliar.
import { html, TemplateResult } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { StateLitElement } from '/_102029_/l2/stateLitElement.js';

import '/_102040_/l2/molecules/groupviewtable/ml-data-table-select';
import '/_102040_/l2/molecules/grouptriggeraction/ml-button-standard';

import { FUNCIONARIOS, formatarMoeda } from '/_102053_/l2/demotable/dados.js';

/** Tags em uso na tela. Aparecem no cabeçalho, para a equipe ver o que vai escrever. */
const COMPONENTES = [
  'groupviewtable--ml-data-table-select',
  'grouptriggeraction--ml-button-standard',
];

const EQUIPE = FUNCIONARIOS.slice(0, 12);

@customElement('demotable--funcionariosselecao-102053')
export class DemoTableFuncionariosSelecao extends StateLitElement {
  /** Índices marcados, como a molécula os entrega. */
  @state() private selecionados: number[] = [];

  @state() private ultimaAcao = '';

  private onChange(e: Event): void {
    const valor = String((e as CustomEvent).detail?.value ?? '');
    this.selecionados = valor
      .split(',')
      .map((s) => parseInt(s.trim(), 10))
      .filter((n) => !Number.isNaN(n));
  }

  private enviarComunicado(): void {
    const nomes = this.selecionados.map((i) => EQUIPE[i]?.nome).filter(Boolean);
    this.ultimaAcao = `Comunicado enviado para ${nomes.length} pessoa(s): ${nomes.join(', ')}`;
  }

  render(): TemplateResult {
    const quantos = this.selecionados.length;
    return html`
      <div class="page">
        <header class="head">
          <p class="eyebrow">Pessoas</p>
          <h1 class="title">Comunicado à equipe</h1>
          <p class="subtitle">
            Marque as pessoas que devem receber o comunicado. A barra de ações acompanha a
            seleção — ela só habilita quando há alguém marcado.
          </p>
          <p class="componentes">
            <span>Componentes nesta tela:</span>
            ${COMPONENTES.map((c) => html`<code>${c}</code>`)}
          </p>
        </header>

        <div class="barra">
          <span class="contagem">
            ${quantos === 0
              ? 'Nenhuma pessoa selecionada'
              : `${quantos} de ${EQUIPE.length} selecionada(s)`}
          </span>
          <grouptriggeraction--ml-button-standard
            data-variant="primary"
            size="sm"
            ?disabled=${quantos === 0}
            @action=${this.enviarComunicado}
          >
            <Label>Enviar comunicado</Label>
          </grouptriggeraction--ml-button-standard>
        </div>

        ${this.ultimaAcao ? html`<p class="resultado">${this.ultimaAcao}</p>` : html``}

        <groupviewtable--ml-data-table-select
          selectable
          select-mode="multi"
          @change=${this.onChange}
        >
          <Caption>Equipe elegível para o comunicado</Caption>

          <TableHeader>
            <TableRow>
              <TableHead key="matricula">Matrícula</TableHead>
              <TableHead key="nome">Nome</TableHead>
              <TableHead key="departamento">Departamento</TableHead>
              <TableHead key="cargo">Cargo</TableHead>
              <TableHead key="salario">Salário</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            ${EQUIPE.map(
              (f) => html`
                <TableRow>
                  <TableCell>${f.matricula}</TableCell>
                  <TableCell>${f.nome}</TableCell>
                  <TableCell>${f.departamento}</TableCell>
                  <TableCell>${f.cargo}</TableCell>
                  <TableCell data-class="text-right">${formatarMoeda(f.salario)}</TableCell>
                </TableRow>
              `,
            )}
          </TableBody>
        </groupviewtable--ml-data-table-select>
      </div>
    `;
  }
}
