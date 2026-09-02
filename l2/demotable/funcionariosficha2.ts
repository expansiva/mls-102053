/// <mls fileReference="_102053_/l2/demotable/funcionariosficha2.ts" enhancement="_102020_/l2/enhancementAura"/>
// Página B3a de `todo/ajuste-contrato-view-table/plano-fechamento-groupviewtable-2.md` §4.3,
// adaptada para a `ml-record-form-table` — a molécula nova cujo "editar" não acontece na própria
// linha (como a `ml-inline-edit-table` de `funcionariosedicao2`), e sim numa FICHA que substitui a
// lista inteira. É o par funcional de `funcionariosficha` (B3b): mesmo dado, mesma tabela, e aqui é
// a MOLÉCULA quem é dona do modo — de abertura da ficha e de edição dentro dela.
//
// Nenhum `editing-rows` no markup: quem decide qual linha abriu e se está editando é a própria
// `ml-record-form-table`, a partir dos `RowAction` que cada linha declara (`open`, `delete`,
// `edit`, `save`, `cancel`). A página só guarda o VALOR — é isso que faz "cancelar não altera nada"
// funcionar: o rascunho vive aqui, e no `cancel` é descartado sem nunca ter sido gravado.
//
// A ficha tem cinco campos (nome, departamento, cargo, admissão, salário) — mais do que cabe numa
// linha de tabela, de propósito: é o motivo de essa molécula existir (`prompt` original: "manutenção
// de registros com muitos campos"). `situação` fica só de leitura, para não sobrecarregar o teste
// com um editor de opções.
//
// O registro de eventos é o instrumento do teste. Vale conferir, em particular: `open` também emite
// `rowAction` (com `action: "open"`), além de abrir a ficha — não é um bug, é o contrato descrevendo
// duas coisas ao mesmo tempo.
import { html, TemplateResult } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { StateLitElement } from '/_102029_/l2/stateLitElement.js';

import '/_102040_/l2/molecules/groupviewtable/ml-record-form-table';
import '/_102040_/l2/molecules/groupentertext/ml-enter-text';
import '/_102040_/l2/molecules/grouptriggeraction/ml-button-standard';

import { FUNCIONARIOS, Funcionario } from '/_102053_/l2/demotable/dados.js';

/** Tags em uso na tela. Aparecem no cabeçalho, para a equipe ver o que vai escrever. */
const COMPONENTES = [
  'groupviewtable--ml-record-form-table',
  'groupentertext--ml-enter-text',
  'grouptriggeraction--ml-button-standard',
];

const EQUIPE = FUNCIONARIOS.slice(0, 6);

/** Os cinco campos que a ficha abre para edição. */
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

const VAZIO: Editaveis = { nome: '', departamento: '', cargo: '', admissao: '', salario: '' };

/** O registro em criação, na linha rascunho — só os três campos da lista, como na `funcionariosedicao2`. */
interface NovoRegistro {
  matricula: string;
  nome: string;
  departamento: string;
  cargo: string;
}

const NOVO_VAZIO: NovoRegistro = { matricula: '', nome: '', departamento: '', cargo: '' };

@customElement('demotable--funcionariosficha2-102053')
export class DemoTableFuncionariosFicha2 extends StateLitElement {
  /** Matrículas vivas na tabela. `delete` remove daqui. */
  @state() private matriculas: string[] = EQUIPE.map((f) => f.matricula);

  /** Situação de cada um, só para exibição — não faz parte da ficha editável. */
  private readonly situacoes: Record<string, Funcionario['situacao']> = Object.fromEntries(
    EQUIPE.map((f) => [f.matricula, f.situacao]),
  );

  /** Os cinco campos, por matrícula. O valor é da PÁGINA; a molécula não guarda valor. */
  @state() private registros: Record<string, Editaveis> = Object.fromEntries(
    EQUIPE.map((f) => [f.matricula, editaveisDe(f)]),
  );

  /**
   * Espelho de qual ficha a MOLÉCULA abriu para edição, mantido só pelos eventos `edit`/`save`/
   * `cancel`. Não vai para o markup como `editing-rows` — existe só para esta página saber se
   * mostra o valor persistido ou o rascunho.
   */
  @state() private matriculaEmEdicao = '';

  /** Rascunho em digitação, isolado até salvar — permite cancelar sem alterar nada. */
  @state() private rascunho: Editaveis = VAZIO;

  @state() private novo: NovoRegistro = NOVO_VAZIO;

  @state() private criados = 0;

  @state() private carregando = false;

  @state() private registro: string[] = [];

  private anotar(evento: string, detalhe: unknown): void {
    const linha = `${evento} — ${JSON.stringify(detalhe)}`;
    this.registro = [linha, ...this.registro].slice(0, 14);
  }

  private digitar(campo: keyof Editaveis, valor: string): void {
    this.rascunho = { ...this.rascunho, [campo]: valor };
  }

  private digitarNovo(campo: keyof NovoRegistro, valor: string): void {
    this.novo = { ...this.novo, [campo]: valor };
  }

  // ---- eventos da molécula ---------------------------------------------------
  private onEdit(e: Event): void {
    const { key } = (e as CustomEvent).detail;
    this.anotar('edit', (e as CustomEvent).detail);
    this.matriculaEmEdicao = key;
    this.rascunho = this.registros[key] ?? VAZIO;
  }

  private onSave(e: Event): void {
    const detalhe = (e as CustomEvent).detail;
    this.anotar('save', detalhe);

    if (detalhe.isNew) {
      this.criados += 1;
      const matricula = this.novo.matricula.trim() || `NOVO-${this.criados}`;
      this.registros = {
        ...this.registros,
        [matricula]: { ...VAZIO, nome: this.novo.nome, departamento: this.novo.departamento, cargo: this.novo.cargo },
      };
      this.matriculas = [...this.matriculas, matricula];
      this.novo = NOVO_VAZIO;
      return;
    }

    this.registros = { ...this.registros, [detalhe.key]: this.rascunho };
    this.matriculaEmEdicao = '';
    this.rascunho = VAZIO;
  }

  private onCancel(e: Event): void {
    const detalhe = (e as CustomEvent).detail;
    this.anotar('cancel', detalhe);

    if (detalhe.isNew) {
      this.novo = NOVO_VAZIO;
      return;
    }

    this.matriculaEmEdicao = '';
    this.rascunho = VAZIO;
  }

  private onDelete(e: Event): void {
    const { key } = (e as CustomEvent).detail;
    this.anotar('delete', (e as CustomEvent).detail);
    this.matriculas = this.matriculas.filter((m) => m !== key);
  }

  /** `open` cai aqui TAMBÉM — a molécula emite `rowAction` com `action: "open"` além de abrir a ficha. */
  private onRowAction(e: Event): void {
    this.anotar('rowAction', (e as CustomEvent).detail);
  }

  private onNewRecord(e: Event): void {
    this.anotar('newRecord', (e as CustomEvent).detail);
    this.novo = NOVO_VAZIO;
  }

  private onRowClick(e: Event): void {
    this.anotar('rowClick', (e as CustomEvent).detail);
  }

  // ---- controles da página --------------------------------------------------
  private restaurar(): void {
    this.matriculas = EQUIPE.map((f) => f.matricula);
    this.registros = Object.fromEntries(EQUIPE.map((f) => [f.matricula, editaveisDe(f)]));
    this.matriculaEmEdicao = '';
    this.rascunho = VAZIO;
    this.novo = NOVO_VAZIO;
    this.criados = 0;
    this.registro = [];
  }

  render(): TemplateResult {
    return html`
      <div class="page">
        <header class="head">
          <p class="eyebrow">Pessoas</p>
          <h1 class="title">Ficha de funcionário — a molécula é dona do modo</h1>
          <p class="subtitle">
            Clique em <strong>Abrir</strong> numa linha: a ficha substitui a lista inteira no mesmo
            espaço, com cinco campos (nome, departamento, cargo, admissão e salário) — mais do que
            cabe na tabela. <strong>Editar</strong> torna os campos editáveis; <strong>Salvar</strong>
            e <strong>Cancelar</strong> fecham a edição; o controle de voltar para a lista é da
            própria molécula. Não existe <code>editing-rows</code> no markup: quem decide o que está
            aberto e o que está em edição é a <code>ml-record-form-table</code>.
          </p>
          <p class="componentes">
            <span>Componentes nesta tela:</span>
            ${COMPONENTES.map((c) => html`<code>${c}</code>`)}
          </p>
        </header>

        <div class="barra">
          <grouptriggeraction--ml-button-standard data-variant="secondary" size="xs" @action=${this.restaurar}>
            <Label>Restaurar dados</Label>
          </grouptriggeraction--ml-button-standard>
          <grouptriggeraction--ml-button-standard
            data-variant="ghost"
            size="xs"
            @action=${() => (this.carregando = !this.carregando)}
          >
            <Label>${this.carregando ? 'Parar carregamento' : 'Simular carregamento'}</Label>
          </grouptriggeraction--ml-button-standard>
        </div>

        <groupviewtable--ml-record-form-table
          .loading=${this.carregando}
          @edit=${this.onEdit}
          @save=${this.onSave}
          @cancel=${this.onCancel}
          @delete=${this.onDelete}
          @rowAction=${this.onRowAction}
          @newRecord=${this.onNewRecord}
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
            ${this.matriculas.map((matricula) => this.renderLinha(matricula))}
          </TableBody>

          <NewRecordRow key="novo">
            <TableCell>
              <groupentertext--ml-enter-text
                .value=${this.novo.matricula}
                @change=${(e: Event) => this.digitarNovo('matricula', (e.target as HTMLInputElement).value)}
                @input=${(e: Event) => this.digitarNovo('matricula', (e.target as HTMLInputElement).value)}
              ></groupentertext--ml-enter-text>
            </TableCell>
            <TableCell>
              <groupentertext--ml-enter-text
                .value=${this.novo.nome}
                @change=${(e: Event) => this.digitarNovo('nome', (e.target as HTMLInputElement).value)}
                @input=${(e: Event) => this.digitarNovo('nome', (e.target as HTMLInputElement).value)}
              ></groupentertext--ml-enter-text>
            </TableCell>
            <TableCell>
              <groupentertext--ml-enter-text
                .value=${this.novo.departamento}
                @change=${(e: Event) => this.digitarNovo('departamento', (e.target as HTMLInputElement).value)}
                @input=${(e: Event) => this.digitarNovo('departamento', (e.target as HTMLInputElement).value)}
              ></groupentertext--ml-enter-text>
            </TableCell>
            <TableCell>
              <groupentertext--ml-enter-text
                .value=${this.novo.cargo}
                @change=${(e: Event) => this.digitarNovo('cargo', (e.target as HTMLInputElement).value)}
                @input=${(e: Event) => this.digitarNovo('cargo', (e.target as HTMLInputElement).value)}
              ></groupentertext--ml-enter-text>
            </TableCell>

            <RowActions>
              <RowAction action="save">
                <grouptriggeraction--ml-button-standard data-variant="primary" size="xs">
                  <Label>Salvar</Label>
                </grouptriggeraction--ml-button-standard>
              </RowAction>
              <RowAction action="cancel">
                <grouptriggeraction--ml-button-standard data-variant="ghost" size="xs">
                  <Label>Cancelar</Label>
                </grouptriggeraction--ml-button-standard>
              </RowAction>
            </RowActions>
          </NewRecordRow>

          <TableFooter>
            <RowAction action="new">
              <grouptriggeraction--ml-button-standard data-variant="secondary" size="xs">
                <Label>Novo funcionário</Label>
              </grouptriggeraction--ml-button-standard>
            </RowAction>
          </TableFooter>

          <Empty>Nenhum funcionário na lista. Use "Restaurar dados".</Empty>
          <Loading>Buscando funcionários...</Loading>
        </groupviewtable--ml-record-form-table>

        <section class="registro">
          <h2 class="registro-titulo">Eventos emitidos pela tabela</h2>
          <p class="nota">
            <code>delete</code> não deve fechar a ficha nem mudar o modo. Ao abrir (<code>open</code>),
            repare que <code>rowAction</code> também dispara, com <code>action: "open"</code>.
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
    if (!valores) return html``;

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
          <RowAction action="edit">
            <grouptriggeraction--ml-button-standard data-variant="secondary" size="xs">
              <Label>Editar</Label>
            </grouptriggeraction--ml-button-standard>
          </RowAction>
          <RowAction action="save">
            <grouptriggeraction--ml-button-standard data-variant="primary" size="xs">
              <Label>Salvar</Label>
            </grouptriggeraction--ml-button-standard>
          </RowAction>
          <RowAction action="cancel">
            <grouptriggeraction--ml-button-standard data-variant="ghost" size="xs">
              <Label>Cancelar</Label>
            </grouptriggeraction--ml-button-standard>
          </RowAction>
        </RowActions>
      </TableRow>
    `;
  }

  /**
   * O conteúdo da ficha — cinco campos vivos. Quem alterna entre leitura e edição é a MOLÉCULA,
   * carimbando `is-editing` em cada um; esta página só escolhe se o valor exibido é o persistido
   * ou o rascunho, exatamente como faria numa célula comum.
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
      </div>
    `;
  }
}
