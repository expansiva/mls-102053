/// <mls fileReference="_102053_/l2/demotable/funcionariosedicao2.ts" enhancement="_102020_/l2/enhancementAura"/>
// Página de aceite da Fase 3 do `todo/todo-ajustes-crud-ml-inline-edit-table.md`.
//
// É o contraste direto da `funcionariosedicao`: mesmo dado, mesma tabela, e a coluna de ações
// invertida de lado.
//
//   funcionariosedicao   — a PÁGINA é dona do modo. Passa `editing-rows`, escreve a própria coluna
//                          "Ação" num `<TableCell>` e condiciona os botões num ternário.
//   funcionariosedicao2  — a MOLÉCULA é dona do modo. Nenhum `editing-rows` no markup, nenhum
//                          ternário: os botões vão num `<RowActions>` e cada `<RowAction>` declara
//                          o que é. Quem decide o que aparece em cada modo é a tabela.
//
// A página continua dona do VALOR, e é isso que faz "cancelar sem modificar nada" funcionar: o
// `rascunho` é daqui, e no `cancel` ele é descartado sem nunca ter sido gravado em `registros`.
//
// `linhaEmEdicao` aqui é ESPELHO, não fonte: quem sabe qual linha está aberta é a molécula, e esta
// página descobre pelos eventos `edit` / `save` / `cancel`. É de propósito — se o espelho acompanha
// só com os eventos, a superfície de eventos está completa.
//
// O registro de eventos na tela é o instrumento do teste: mostra o que a molécula emitiu, com o
// detail e na ordem. É onde se vê que `delete` NÃO fecha a linha e que clicar numa ação NÃO emite
// `rowClick`.
import { html, TemplateResult } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { StateLitElement } from '/_102029_/l2/stateLitElement.js';

import '/_102040_/l2/molecules/groupviewtable/ml-inline-edit-table';
import '/_102040_/l2/molecules/groupentertext/ml-enter-text';
import '/_102040_/l2/molecules/grouptriggeraction/ml-button-standard';

import { FUNCIONARIOS, Funcionario } from '/_102053_/l2/demotable/dados.js';

/** Tags em uso na tela. Aparecem no cabeçalho, para a equipe ver o que vai escrever. */
const COMPONENTES = [
  'groupviewtable--ml-inline-edit-table',
  'groupentertext--ml-enter-text',
  'grouptriggeraction--ml-button-standard',
];

const EQUIPE = FUNCIONARIOS.slice(0, 6);

/** Os campos que a linha abre para edição. Três, para exercitar a propagação do `is-editing`. */
interface Editaveis {
  nome: string;
  departamento: string;
  cargo: string;
}

function editaveisDe(f: Funcionario): Editaveis {
  return { nome: f.nome, departamento: f.departamento, cargo: f.cargo };
}

const VAZIO: Editaveis = { nome: '', departamento: '', cargo: '' };

/** O registro em criação, na linha rascunho. Tem matrícula porque ela ainda não existe. */
interface NovoRegistro extends Editaveis {
  matricula: string;
}

const NOVO_VAZIO: NovoRegistro = { matricula: '', nome: '', departamento: '', cargo: '' };

@customElement('demotable--funcionariosedicao2-102053')
export class DemoTableFuncionariosEdicao2 extends StateLitElement {
  /** Matrículas vivas na tabela. `delete` remove daqui — é a página que tira a linha do corpo. */
  @state() private matriculas: string[] = EQUIPE.map((f) => f.matricula);

  /** Nome, departamento e cargo por matrícula. O valor é da PÁGINA; a tabela não guarda valor. */
  @state() private registros: Record<string, Editaveis> = Object.fromEntries(
    EQUIPE.map((f) => [f.matricula, editaveisDe(f)]),
  );

  /**
   * Espelho de qual linha a MOLÉCULA abriu, mantido só pelos eventos dela.
   *
   * Não vai para o markup como `editing-rows` — se fosse, a página voltaria a ser dona do modo e o
   * recurso em teste deixaria de ser exercitado.
   */
  @state() private linhaEmEdicao = '';

  /**
   * Valores em digitação, isolados até salvar. É o que permite cancelar sem alterar nada: os três
   * campos voltam juntos, porque nenhum deles foi gravado em `registros`.
   */
  @state() private rascunho: Editaveis = VAZIO;

  /**
   * Campos da linha RASCUNHO. Quem abre e fecha a linha é a molécula; estes valores são da página,
   * como todos os outros — no `cancel` são descartados, no `save` viram um registro.
   */
  @state() private novo: NovoRegistro = NOVO_VAZIO;

  @state() private criados = 0;

  @state() private carregando = false;

  @state() private registro: string[] = [];

  private anotar(evento: string, detalhe: unknown): void {
    const linha = `${evento} — ${JSON.stringify(detalhe)}`;
    this.registro = [linha, ...this.registro].slice(0, 14);
  }

  /** Um campo do rascunho de edição, sem repetir o spread em cada `@input` do template. */
  private digitar(campo: keyof Editaveis, valor: string): void {
    this.rascunho = { ...this.rascunho, [campo]: valor };
  }

  /** Um campo da linha rascunho de criação. */
  private digitarNovo(campo: keyof NovoRegistro, valor: string): void {
    this.novo = { ...this.novo, [campo]: valor };
  }

  // ---- eventos da molécula ---------------------------------------------------
  private onEdit(e: Event): void {
    const { key } = (e as CustomEvent).detail;
    this.anotar('edit', (e as CustomEvent).detail);
    this.linhaEmEdicao = key;
    this.rascunho = this.registros[key] ?? VAZIO;
  }

  private onSave(e: Event): void {
    const detalhe = (e as CustomEvent).detail;
    this.anotar('save', detalhe);

    // `isNew` é o que separa gravar um registro existente de CRIAR um. A tabela abriu e fechou a
    // linha; escrever o `<TableRow>` novo no corpo é trabalho da página.
    if (detalhe.isNew) {
      this.criados += 1;
      const matricula = this.novo.matricula.trim() || `NOVO-${this.criados}`;
      this.registros = {
        ...this.registros,
        [matricula]: { nome: this.novo.nome, departamento: this.novo.departamento, cargo: this.novo.cargo },
      };
      this.matriculas = [...this.matriculas, matricula];
      this.novo = NOVO_VAZIO;
      return;
    }

    this.registros = { ...this.registros, [detalhe.key]: this.rascunho };
    this.linhaEmEdicao = '';
    this.rascunho = VAZIO;
  }

  private onCancel(e: Event): void {
    const detalhe = (e as CustomEvent).detail;
    this.anotar('cancel', detalhe);

    // Reverter é só descartar o rascunho: `registros` nunca foi tocado, nos dois casos.
    if (detalhe.isNew) {
      this.novo = NOVO_VAZIO;
      return;
    }

    this.linhaEmEdicao = '';
    this.rascunho = VAZIO;
  }

  private onDelete(e: Event): void {
    const { key } = (e as CustomEvent).detail;
    this.anotar('delete', (e as CustomEvent).detail);
    this.matriculas = this.matriculas.filter((m) => m !== key);
  }

  private onRowAction(e: Event): void {
    this.anotar('rowAction', (e as CustomEvent).detail);
  }

  /** A tabela avisou que abriu a linha rascunho. Zerar os campos é trabalho da página. */
  private onNewRecord(e: Event): void {
    this.anotar('newRecord', (e as CustomEvent).detail);
    this.novo = NOVO_VAZIO;
  }

  /** Não deve aparecer no registro quando o clique for numa ação. É o teste da guarda. */
  private onRowClick(e: Event): void {
    this.anotar('rowClick', (e as CustomEvent).detail);
  }

  // ---- controles da página --------------------------------------------------
  private restaurar(): void {
    this.matriculas = EQUIPE.map((f) => f.matricula);
    this.registros = Object.fromEntries(EQUIPE.map((f) => [f.matricula, editaveisDe(f)]));
    this.linhaEmEdicao = '';
    this.rascunho = VAZIO;
    this.novo = NOVO_VAZIO;
    this.criados = 0;
    this.registro = [];
  }

  private esvaziar(): void {
    this.matriculas = [];
    this.linhaEmEdicao = '';
  }

  render(): TemplateResult {
    return html`
      <div class="page">
        <header class="head">
          <p class="eyebrow">Pessoas</p>
          <h1 class="title">Revisão de cargos — ações pela tabela</h1>
          <p class="subtitle">
            Aqui a <strong>tabela</strong> é dona do modo de edição. Não existe
            <code>editing-rows</code> no markup e não existe ternário de visibilidade: os botões
            ficam num <code>&lt;RowActions&gt;</code>, cada <code>&lt;RowAction&gt;</code> declara o
            que é, e a coluna <strong>Ações</strong> é criada pela própria tabela — o cabeçalho
            abaixo só declara quatro colunas. <strong>Nome</strong>, <strong>Departamento</strong> e
            <strong>Cargo</strong> abrem para edição juntos, e em modo leitura devem aparecer como
            texto, sem borda de campo. O botão <strong>Novo registro</strong>, no rodapé, abre uma
            linha rascunho no fim do corpo — ela não é ordenada nem paginada, e é uma por vez.
          </p>
          <p class="componentes">
            <span>Componentes nesta tela:</span>
            ${COMPONENTES.map((c) => html`<code>${c}</code>`)}
          </p>
        </header>

        <div class="barra">
          <grouptriggeraction--ml-button-standard
            data-variant="secondary"
            size="xs"
            @action=${this.restaurar}
          >
            <Label>Restaurar dados</Label>
          </grouptriggeraction--ml-button-standard>
          <grouptriggeraction--ml-button-standard
            data-variant="ghost"
            size="xs"
            @action=${this.esvaziar}
          >
            <Label>Esvaziar lista</Label>
          </grouptriggeraction--ml-button-standard>
          <grouptriggeraction--ml-button-standard
            data-variant="ghost"
            size="xs"
            @action=${() => (this.carregando = !this.carregando)}
          >
            <Label>${this.carregando ? 'Parar carregamento' : 'Simular carregamento'}</Label>
          </grouptriggeraction--ml-button-standard>
        </div>

        <groupviewtable--ml-inline-edit-table
          .loading=${this.carregando}
          @edit=${this.onEdit}
          @save=${this.onSave}
          @cancel=${this.onCancel}
          @delete=${this.onDelete}
          @rowAction=${this.onRowAction}
          @newRecord=${this.onNewRecord}
          @rowClick=${this.onRowClick}
        >
          <Caption>Cargos por pessoa</Caption>

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

          <!-- A linha RASCUNHO. Escrita UMA vez, não por linha: a tabela projeta estas células
               num <tr> extra quando o rascunho abre. Um por vez, por construção. -->
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

            <!-- Mesmo vocabulario da linha. A inferencia do when nao muda: a linha rascunho esta
                 sempre em edicao, entao save e cancel aparecem e editar/excluir nao. Sem backtick
                 aqui dentro: o comentario vive num template literal, e o backtick o encerraria. -->
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

          <!-- O gatilho e filho DIRETO do rodape e usa o mesmo RowAction: nenhum slot novo. -->
          <TableFooter>
            <RowAction action="new">
              <grouptriggeraction--ml-button-standard data-variant="secondary" size="xs">
                <Label>Novo registro</Label>
              </grouptriggeraction--ml-button-standard>
            </RowAction>
          </TableFooter>

          <Empty>Nenhum funcionário na lista. Use "Restaurar dados".</Empty>
          <Loading>Buscando funcionários...</Loading>
        </groupviewtable--ml-inline-edit-table>

        <section class="registro">
          <h2 class="registro-titulo">Eventos emitidos pela tabela</h2>
          <p class="nota">
            <code>delete</code> deve emitir <strong>sem</strong> fechar a linha aberta.
            <code>rowClick</code> <strong>não</strong> deve aparecer quando o clique for num botão de
            ação — só quando for na linha, fora dos controles.
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
    const editando = this.linhaEmEdicao === matricula;

    return html`
      <TableRow key=${matricula}>
        <TableCell>${matricula}</TableCell>
        ${this.renderCampo(matricula, 'nome', editando)}
        ${this.renderCampo(matricula, 'departamento', editando)}
        ${this.renderCampo(matricula, 'cargo', editando)}

        <RowActions>
          <RowAction action="edit">
            <grouptriggeraction--ml-button-standard data-variant="secondary" size="xs">
              <Label>Editar</Label>
            </grouptriggeraction--ml-button-standard>
          </RowAction>
          <RowAction action="delete">
            <grouptriggeraction--ml-button-standard data-variant="ghost" size="xs">
              <Label>Excluir</Label>
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
          <RowAction action="detalhes" when="always">
            <grouptriggeraction--ml-button-standard data-variant="ghost" size="xs">
              <Label>Detalhes</Label>
            </grouptriggeraction--ml-button-standard>
          </RowAction>
        </RowActions>
      </TableRow>
    `;
  }

  /**
   * Uma célula editável.
   *
   * Quem alterna entre leitura e edição é a MOLÉCULA, carimbando `is-editing` no componente. Esta
   * página não passa esse atributo em lugar nenhum — só escolhe se o valor exibido é o persistido
   * ou o rascunho.
   */
  private renderCampo(matricula: string, campo: keyof Editaveis, editando: boolean): TemplateResult {
    const valor = editando ? this.rascunho[campo] : this.registros[matricula][campo];

    return html`
      <TableCell>
        <groupentertext--ml-enter-text
          .value=${valor}
          @change=${(e: Event) => this.digitar(campo, (e.target as HTMLInputElement).value)}
          @input=${(e: Event) => this.digitar(campo, (e.target as HTMLInputElement).value)}
        ></groupentertext--ml-enter-text>
      </TableCell>
    `;
  }
}
