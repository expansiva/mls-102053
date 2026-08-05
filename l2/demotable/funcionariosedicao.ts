/// <mls fileReference="_102053_/l2/demotable/funcionariosedicao.ts" enhancement="_102020_/l2/enhancementAura"/>
// Página F3 do todo/analise-paginas-demonstracao-com-table.md.
//
// Edição POR LINHA: cada linha tem "Editar", e só a linha aberta vira campo. É o que o nome
// "inline edit" faz esperar, e é como um cadastro real funciona — edita-se um registro por vez,
// com salvar e cancelar.
//
// Quem controla a edição é a MOLÉCULA, pelo modo por linha: a página informa
// `editing-rows` com a chave da linha aberta, e cada `<TableRow key="...">` se identifica.
// A página não mexe no `is-editing` de campo nenhum.
//
// O botão de cada linha carrega o handler DESTA página, com a matrícula certa — o que só é
// possível porque a molécula foi migrada para slots vivos: no caminho antigo ele seria um clone
// de string e não chamaria nada.
import { html, TemplateResult } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { StateLitElement } from '/_102029_/l2/stateLitElement.js';

import '/_102040_/l2/molecules/groupviewtable/ml-inline-edit-table';
import '/_102040_/l2/molecules/groupentertext/ml-enter-text';
import '/_102040_/l2/molecules/grouptriggeraction/ml-button-standard';

import { FUNCIONARIOS } from '/_102053_/l2/demotable/dados.js';

/** Tags em uso na tela. Aparecem no cabeçalho, para a equipe ver o que vai escrever. */
const COMPONENTES = [
  'groupviewtable--ml-inline-edit-table',
  'groupentertext--ml-enter-text',
  'grouptriggeraction--ml-button-standard',
];

@customElement('demotable--funcionariosedicao-102053')
export class DemoTableFuncionariosEdicao extends StateLitElement {
  private readonly equipe = FUNCIONARIOS.slice(0, 8);

  /** Cargo por matrícula — o estado é da PÁGINA; a tabela não guarda valor. */
  @state() private cargos: Record<string, string> = Object.fromEntries(
    FUNCIONARIOS.slice(0, 8).map((f) => [f.matricula, f.cargo]),
  );

  /** Qual linha está aberta para edição. Vazio = todas em leitura. */
  @state() private linhaEmEdicao = '';

  /** Valor em digitação, isolado até salvar — é o que permite cancelar. */
  @state() private rascunho = '';

  @state() private ultimoSalvo = '';

  private editar(matricula: string): void {
    this.linhaEmEdicao = matricula;
    this.rascunho = this.cargos[matricula];
    this.ultimoSalvo = '';
  }

  private cancelar(): void {
    this.linhaEmEdicao = '';
    this.rascunho = '';
  }

  private salvar(matricula: string): void {
    this.cargos = { ...this.cargos, [matricula]: this.rascunho };
    this.ultimoSalvo = `${this.equipe.find((f) => f.matricula === matricula)?.nome}: ${this.rascunho}`;
    this.linhaEmEdicao = '';
    this.rascunho = '';
  }

  render(): TemplateResult {
    return html`
      <div class="page">
        <header class="head">
          <p class="eyebrow">Pessoas</p>
          <h1 class="title">Revisão de cargos</h1>
          <p class="subtitle">
            Clique em <strong>Editar</strong> numa linha para alterar o cargo dela. Só a linha
            aberta vira campo — as demais continuam em leitura.
          </p>
          <p class="componentes">
            <span>Componentes nesta tela:</span>
            ${COMPONENTES.map((c) => html`<code>${c}</code>`)}
          </p>
        </header>

        ${this.ultimoSalvo
          ? html`<p class="resultado">Cargo atualizado — ${this.ultimoSalvo}</p>`
          : html``}

        <groupviewtable--ml-inline-edit-table editing-rows=${this.linhaEmEdicao}>
          <Caption>Cargos por pessoa</Caption>

          <TableHeader>
            <TableRow>
              <TableHead key="matricula" sortable>Matrícula</TableHead>
              <TableHead key="nome" sortable>Nome</TableHead>
              <TableHead key="departamento" sortable>Departamento</TableHead>
              <TableHead key="cargo">Cargo</TableHead>
              <TableHead key="acao">Ação</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            ${this.equipe.map((f) => this.renderLinha(f.matricula))}
          </TableBody>
        </groupviewtable--ml-inline-edit-table>
      </div>
    `;
  }

  private renderLinha(matricula: string): TemplateResult {
    const f = this.equipe.find((x) => x.matricula === matricula)!;
    const editando = this.linhaEmEdicao === matricula;

    return html`
      <TableRow key=${f.matricula}>
        <TableCell>${f.matricula}</TableCell>
        <TableCell>${f.nome}</TableCell>
        <TableCell>${f.departamento}</TableCell>
        <TableCell>
          <groupentertext--ml-enter-text
            .value=${editando ? this.rascunho : this.cargos[matricula]}
            @change=${(e: Event) => (this.rascunho = (e.target as HTMLInputElement).value)}
            @input=${(e: Event) => (this.rascunho = (e.target as HTMLInputElement).value)}
          ></groupentertext--ml-enter-text>
        </TableCell>
        <TableCell>
          ${editando
            ? html`
                <grouptriggeraction--ml-button-standard
                  data-variant="primary"
                  size="xs"
                  @action=${() => this.salvar(matricula)}
                >
                  <Label>Salvar</Label>
                </grouptriggeraction--ml-button-standard>
                <grouptriggeraction--ml-button-standard
                  data-variant="ghost"
                  size="xs"
                  @action=${this.cancelar}
                >
                  <Label>Cancelar</Label>
                </grouptriggeraction--ml-button-standard>
              `
            : html`
                <grouptriggeraction--ml-button-standard
                  data-variant="secondary"
                  size="xs"
                  @action=${() => this.editar(matricula)}
                >
                  <Label>Editar</Label>
                </grouptriggeraction--ml-button-standard>
              `}
        </TableCell>
      </TableRow>
    `;
  }
}
