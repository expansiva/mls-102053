/// <mls fileReference="_102053_/l2/demotable/funcionariosficha.ts" enhancement="_102020_/l2/enhancementAura"/>
// Página B3b de `todo/ajuste-contrato-view-table/plano-fechamento-groupviewtable-2.md` §4.5,
// adaptada para a `ml-record-form-table`. É o contraste direto da `funcionariosficha2`: mesmo
// dado, mesma ficha de cinco campos, e aqui é a PÁGINA quem é dona do modo de EDIÇÃO.
//
// A abertura da ficha continua sendo da molécula — não existe propriedade externa para forçar
// "ficha aberta" (só o `RowAction action="open"` abre), e por isso o `RowActions` de cada linha
// ainda declara `open` e `delete`. O que muda é a EDIÇÃO dentro da ficha aberta: a página passa
// `editing-rows` com a matrícula que ela decidiu abrir, e os botões "Editar" / "Salvar" / "Cancelar"
// são botões COMUNS desta página dentro do `<Detail>` — não `<RowAction>`. Se fossem `<RowAction
// action="edit">`, a receita MODO×VALOR vira via única: com `editing-rows` presente, o clique nesse
// botão só emitiria `edit` e a ficha nunca entraria em edição de verdade (é o aviso do próprio
// `usage.ts` do grupo — "pick ONE per instance").
import { html, TemplateResult } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { StateLitElement } from '/_102029_/l2/stateLitElement.js';

import '/_102040_/l2/molecules/groupviewtable/ml-record-form-table';
import '/_102040_/l2/molecules/groupentertext/ml-enter-text';
import '/_102040_/l2/molecules/grouptriggeraction/ml-button-standard';

import { FUNCIONARIOS, Funcionario } from '/_102053_/l2/demotable/dados.js';

const COMPONENTES = [
  'groupviewtable--ml-record-form-table',
  'groupentertext--ml-enter-text',
  'grouptriggeraction--ml-button-standard',
];

const EQUIPE = FUNCIONARIOS.slice(0, 6);

interface Editaveis {
  nome: string;
  departamento: string;
  cargo: string;
  admissao: string;
  salario: string;
}

function editaveisDe(f: Funcionario): Editaveis {
  return {
    nome: f.nome,
    departamento: f.departamento,
    cargo: f.cargo,
    admissao: f.admissao,
    salario: f.salario.toFixed(2),
  };
}

@customElement('demotable--funcionariosficha-102053')
export class DemoTableFuncionariosFicha extends StateLitElement {
  private readonly equipe = EQUIPE;

  private readonly situacoes: Record<string, Funcionario['situacao']> = Object.fromEntries(
    EQUIPE.map((f) => [f.matricula, f.situacao]),
  );

  @state() private registros: Record<string, Editaveis> = Object.fromEntries(
    EQUIPE.map((f) => [f.matricula, editaveisDe(f)]),
  );

  /**
   * Fonte de verdade do modo — vai para o markup como `editing-rows`. Vazio = nenhuma ficha em
   * edição (mas pode haver uma aberta em modo leitura).
   */
  @state() private matriculaEmEdicao = '';

  /** Rascunho isolado até salvar. */
  @state() private rascunho: Editaveis = { nome: '', departamento: '', cargo: '', admissao: '', salario: '' };

  @state() private ultimoSalvo = '';

  @state() private registro: string[] = [];

  private anotar(evento: string, detalhe: unknown): void {
    const linha = `${evento} — ${JSON.stringify(detalhe)}`;
    this.registro = [linha, ...this.registro].slice(0, 14);
  }

  private digitar(campo: keyof Editaveis, valor: string): void {
    this.rascunho = { ...this.rascunho, [campo]: valor };
  }

  // ---- decisões de modo, tomadas pela PÁGINA ---------------------------------
  private editar(matricula: string): void {
    this.matriculaEmEdicao = matricula;
    this.rascunho = this.registros[matricula];
    this.ultimoSalvo = '';
  }

  private cancelar(): void {
    this.matriculaEmEdicao = '';
  }

  private salvar(matricula: string): void {
    this.registros = { ...this.registros, [matricula]: this.rascunho };
    this.ultimoSalvo = this.equipe.find((f) => f.matricula === matricula)?.nome ?? matricula;
    this.matriculaEmEdicao = '';
  }

  // ---- eventos da molécula ---------------------------------------------------
  /** `delete` continua roteado pela molécula — o eixo em teste aqui é só a edição. */
  private onDelete(e: Event): void {
    this.anotar('delete', (e as CustomEvent).detail);
  }

  private onRowAction(e: Event): void {
    this.anotar('rowAction', (e as CustomEvent).detail);
  }

  private onRowClick(e: Event): void {
    this.anotar('rowClick', (e as CustomEvent).detail);
  }

  render(): TemplateResult {
    return html`
      <div class="page">
        <header class="head">
          <p class="eyebrow">Pessoas</p>
          <h1 class="title">Ficha de funcionário — a página é dona do modo</h1>
          <p class="subtitle">
            Abrir a ficha continua sendo ação da tabela (<code>RowAction action="open"</code>): não
            há como forçar isso de fora. Mas <strong>quem decide qual ficha está em edição é esta
            página</strong>, por <code>editing-rows</code> — os botões Editar/Salvar/Cancelar, dentro
            da ficha, são botões comuns desta tela, não <code>&lt;RowAction&gt;</code>.
          </p>
          <p class="componentes">
            <span>Componentes nesta tela:</span>
            ${COMPONENTES.map((c) => html`<code>${c}</code>`)}
          </p>
        </header>

        ${this.ultimoSalvo
          ? html`<p class="resultado">Ficha atualizada — ${this.ultimoSalvo}</p>`
          : html``}

        <groupviewtable--ml-record-form-table
          editing-rows=${this.matriculaEmEdicao}
          @delete=${this.onDelete}
          @rowAction=${this.onRowAction}
          @rowClick=${this.onRowClick}
        >
          <Caption>Equipe — cadastro completo</Caption>

          <TableHeader>
            <TableRow>
              <TableHead key="matricula" sortable>Matrícula</TableHead>
              <TableHead key="nome" sortable>Nome</TableHead>
              <TableHead key="departamento" sortable>Departamento</TableHead>
              <TableHead key="cargo" sortable>Cargo</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            ${this.equipe.map((f) => this.renderLinha(f.matricula))}
          </TableBody>
        </groupviewtable--ml-record-form-table>

        <section class="registro">
          <h2 class="registro-titulo">Eventos emitidos pela tabela</h2>
          <p class="nota">
            Sem <code>@edit</code>/<code>@save</code>/<code>@cancel</code> aqui: quem move o modo de
            edição é esta página, diretamente — a molécula só reflete <code>editing-rows</code>.
          </p>
          ${this.registro.length === 0
            ? html`<p class="registro-vazio">Nenhum evento ainda.</p>`
            : html`<ol class="registro-lista">
                ${this.registro.map((linha) => html`<li>${linha}</li>`)}
              </ol>`}
        </section>
      </div>
    `;
  }

  private renderLinha(matricula: string): TemplateResult {
    const valores = this.registros[matricula];

    return html`
      <TableRow key=${matricula}>
        <TableCell>${matricula}</TableCell>
        <TableCell>${valores.nome}</TableCell>
        <TableCell>${valores.departamento}</TableCell>
        <TableCell>${valores.cargo}</TableCell>

        <Detail label=${`Ficha de ${valores.nome}`}>${this.renderFicha(matricula)}</Detail>

        <RowActions>
          <RowAction action="open">
            <grouptriggeraction--ml-button-standard data-variant="secondary" size="xs">
              <Label>Abrir</Label>
            </grouptriggeraction--ml-button-standard>
          </RowAction>
          <RowAction action="delete">
            <grouptriggeraction--ml-button-standard data-variant="ghost" size="xs">
              <Label>Excluir</Label>
            </grouptriggeraction--ml-button-standard>
          </RowAction>
        </RowActions>
      </TableRow>
    `;
  }

  /**
   * O conteúdo da ficha. Os campos recebem `is-editing` da MOLÉCULA (via `editing-rows`), como em
   * qualquer outro modo — o que muda é só quem decide a matrícula que entra nesse estado: aqui, os
   * botões Editar/Salvar/Cancelar são desta página, comuns, fora do vocabulário de `RowAction`.
   */
  private renderFicha(matricula: string): TemplateResult {
    const persistido = this.registros[matricula];
    const editando = this.matriculaEmEdicao === matricula;
    const valor = (campo: keyof Editaveis) => (editando ? this.rascunho[campo] : persistido[campo]);

    return html`
      <div class="ficha">
        <p class="ficha-situacao">Situação: <strong>${this.situacoes[matricula]}</strong></p>
        <div class="ficha-campo">
          <label>Nome</label>
          <groupentertext--ml-enter-text
            .value=${valor('nome')}
            @change=${(e: Event) => this.digitar('nome', (e.target as HTMLInputElement).value)}
            @input=${(e: Event) => this.digitar('nome', (e.target as HTMLInputElement).value)}
          ></groupentertext--ml-enter-text>
        </div>
        <div class="ficha-campo">
          <label>Departamento</label>
          <groupentertext--ml-enter-text
            .value=${valor('departamento')}
            @change=${(e: Event) => this.digitar('departamento', (e.target as HTMLInputElement).value)}
            @input=${(e: Event) => this.digitar('departamento', (e.target as HTMLInputElement).value)}
          ></groupentertext--ml-enter-text>
        </div>
        <div class="ficha-campo">
          <label>Cargo</label>
          <groupentertext--ml-enter-text
            .value=${valor('cargo')}
            @change=${(e: Event) => this.digitar('cargo', (e.target as HTMLInputElement).value)}
            @input=${(e: Event) => this.digitar('cargo', (e.target as HTMLInputElement).value)}
          ></groupentertext--ml-enter-text>
        </div>
        <div class="ficha-campo">
          <label>Admissão</label>
          <groupentertext--ml-enter-text
            .value=${valor('admissao')}
            @change=${(e: Event) => this.digitar('admissao', (e.target as HTMLInputElement).value)}
            @input=${(e: Event) => this.digitar('admissao', (e.target as HTMLInputElement).value)}
          ></groupentertext--ml-enter-text>
        </div>
        <div class="ficha-campo">
          <label>Salário</label>
          <groupentertext--ml-enter-text
            .value=${valor('salario')}
            @change=${(e: Event) => this.digitar('salario', (e.target as HTMLInputElement).value)}
            @input=${(e: Event) => this.digitar('salario', (e.target as HTMLInputElement).value)}
          ></groupentertext--ml-enter-text>
        </div>

        <div class="ficha-acoes">
          ${editando
            ? html`
                <grouptriggeraction--ml-button-standard
                  data-variant="primary"
                  size="xs"
                  @action=${() => this.salvar(matricula)}
                >
                  <Label>Salvar</Label>
                </grouptriggeraction--ml-button-standard>
                <grouptriggeraction--ml-button-standard data-variant="ghost" size="xs" @action=${this.cancelar}>
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
        </div>
      </div>
    `;
  }
}
