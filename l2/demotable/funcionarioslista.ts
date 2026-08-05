/// <mls fileReference="_102053_/l2/demotable/funcionarioslista.ts" enhancement="_102020_/l2/enhancementAura"/>
// Página F1 do todo/analise-paginas-demonstracao-com-table.md.
//
// É a página que mostra o ganho dos SLOTS VIVOS: o botão "Ver" dentro de cada célula é uma
// molécula de verdade (ml-button-standard) com o handler DESTA página. Antes da migração ele
// seria HTML morto — pintava e não respondia. Aqui ele abre o painel de detalhe.
//
// Usa o modo INTERNO do contrato (skills/groupViewTable/creation.ts §9): as 60 linhas vão no
// markup e a molécula ordena tudo e fatia de 10 em 10. Esse modo só passou a funcionar nesta
// molécula em 2026-08-04 — antes ela desenhava a paginação e mostrava as 60 linhas.
import { html, TemplateResult } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { StateLitElement } from '/_102029_/l2/stateLitElement.js';

import '/_102040_/l2/molecules/groupviewtable/ml-responsive-data-table';
import '/_102040_/l2/molecules/grouptriggeraction/ml-button-standard';

import { FUNCIONARIOS, Funcionario, formatarMoeda } from '/_102053_/l2/demotable/dados.js';

/** Tags em uso na tela. Aparecem no cabeçalho, para a equipe ver o que vai escrever. */
const COMPONENTES = [
  'groupviewtable--ml-responsive-data-table',
  'grouptriggeraction--ml-button-standard',
];

@customElement('demotable--funcionarioslista-102053')
export class DemoTableFuncionariosLista extends StateLitElement {
  /** Quem o usuário abriu pelo botão da linha. É a prova de que o handler chegou. */
  @state() private selecionado: Funcionario | null = null;

  private abrir(matricula: string): void {
    this.selecionado = FUNCIONARIOS.find((f) => f.matricula === matricula) ?? null;
  }

  private fechar(): void {
    this.selecionado = null;
  }

  render(): TemplateResult {
    return html`
      <div class="page">
        <header class="head">
          <p class="eyebrow">Pessoas</p>
          <h1 class="title">Quadro de funcionários</h1>
          <p class="subtitle">
            ${FUNCIONARIOS.length} pessoas, 10 por página. Ordene por qualquer coluna e navegue
            entre as páginas — a tabela cuida das duas coisas. O botão <strong>Ver</strong> de cada
            linha é um componente com o comportamento desta página.
          </p>
          <p class="componentes">
            <span>Componentes nesta tela:</span>
            ${COMPONENTES.map((c) => html`<code>${c}</code>`)}
          </p>
        </header>

        <div class="conteudo ${this.selecionado ? 'com-detalhe' : ''}">
          <div class="lista">
            ${this.renderTabela()}
          </div>
          ${this.renderDetalhe()}
        </div>
      </div>
    `;
  }

  /**
   * Duas colunas no amplo: lista à esquerda, detalhe à direita. No estreito o cenário TROCA — o
   * detalhe ocupa a tela e a lista some, com um botão para voltar. Quem decide é a classe
   * "com-detalhe" no contêiner; o resto é CSS, sem media query em JS.
   *
   * Efeito colateral bem-vindo: com o painel aberto, a tabela fica num contêiner mais estreito e
   * a própria molécula esconde as colunas que não cabem — ela mede a largura disponível.
   */
  private renderTabela(): TemplateResult {
    return html`
      <groupviewtable--ml-responsive-data-table page-size="10">
          <Caption>Quadro ativo, ordenável por qualquer coluna</Caption>

          <TableHeader>
            <TableRow>
              <TableHead key="matricula" sortable>Matrícula</TableHead>
              <TableHead key="nome" sortable>Nome</TableHead>
              <TableHead key="departamento" sortable>Departamento</TableHead>
              <TableHead key="cargo" sortable>Cargo</TableHead>
              <TableHead key="situacao" sortable>Situação</TableHead>
              <TableHead key="acao">Ação</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            ${FUNCIONARIOS.map(
              (f) => html`
                <TableRow>
                  <TableCell>${f.matricula}</TableCell>
                  <TableCell>${f.nome}</TableCell>
                  <TableCell>${f.departamento}</TableCell>
                  <TableCell>${f.cargo}</TableCell>
                  <TableCell>${f.situacao}</TableCell>
                  <TableCell>
                    <grouptriggeraction--ml-button-standard
                      data-variant="secondary"
                      size="xs"
                      @action=${() => this.abrir(f.matricula)}
                    >
                      <Label>Ver</Label>
                    </grouptriggeraction--ml-button-standard>
                  </TableCell>
                </TableRow>
              `,
            )}
          </TableBody>
        </groupviewtable--ml-responsive-data-table>
    `;
  }

  private renderDetalhe(): TemplateResult {
    if (!this.selecionado) return html``;
    const f = this.selecionado;
    return html`
      <section class="detalhe">
        <button class="voltar" @click=${this.fechar}>← voltar para a lista</button>
        <div class="detalhe-topo">
          <h2 class="detalhe-titulo">${f.nome}</h2>
          <button class="fechar" @click=${this.fechar} aria-label="Fechar detalhe">×</button>
        </div>
        <dl class="campos">
          <div><dt>Matrícula</dt><dd>${f.matricula}</dd></div>
          <div><dt>Departamento</dt><dd>${f.departamento}</dd></div>
          <div><dt>Cargo</dt><dd>${f.cargo}</dd></div>
          <div><dt>Admissão</dt><dd>${f.admissao}</dd></div>
          <div><dt>Salário</dt><dd>${formatarMoeda(f.salario)}</dd></div>
          <div><dt>Situação</dt><dd>${f.situacao}</dd></div>
        </dl>
      </section>
    `;
  }
}
