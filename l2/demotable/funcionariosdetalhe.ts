/// <mls fileReference="_102053_/l2/demotable/funcionariosdetalhe.ts" enhancement="_102020_/l2/enhancementAura"/>
// Demonstra a ml-lcrud-detail-grid: a lista some e o registro abre em um CENÁRIO próprio.
//
// É o contraste direto da `funcionariosedicao`, que usa a ml-inline-edit-table: mesmo dado, e as
// duas maneiras de editar lado a lado — na célula, uma linha por vez, ou na tela inteira, um
// registro por vez. Vale abrir as duas na apresentação.
//
// O cenário é UM formulário que serve para as duas coisas que a molécula promete: ficha e edição.
// Quem decide é o `is-editing` da grade, que a molécula propaga para os componentes do cenário —
// cada campo já sabe se desenhar como texto ou como campo. A página não mexe no `is-editing` de
// campo nenhum, só liga e desliga o da grade.
//
// Nada de `<label>` escrito à mão: cada molécula de campo tem o slot `<Label>` e desenha o rótulo
// pelo tema. Rótulo cru ao lado disso desalinha e ignora o design system.
//
// O carregamento é SIMULADO com um atraso curto, como num BFF de verdade: ao abrir, a molécula
// emite `rowClick` com o índice e só então a página busca o registro.
import { html, TemplateResult } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { StateLitElement } from '/_102029_/l2/stateLitElement.js';
import { parseFormattedNumber } from '/_102033_/l2/shared/molecules/tableSort.js';

import '/_102040_/l2/molecules/groupviewtable/ml-lcrud-detail-grid';
import '/_102040_/l2/molecules/groupentertext/ml-enter-text';
import '/_102040_/l2/molecules/groupselectone/ml-select';
import '/_102040_/l2/molecules/groupselectone/ml-segmented-control';
import '/_102040_/l2/molecules/groupenterdate/ml-date-picker';
import '/_102040_/l2/molecules/groupentermoney/ml-enter-money-br';
import '/_102040_/l2/molecules/grouptriggeraction/ml-button-standard';

import { FUNCIONARIOS, Funcionario, formatarMoeda } from '/_102053_/l2/demotable/dados.js';

/** Tags em uso na tela. Aparecem no cabeçalho, para a equipe ver o que vai escrever. */
const COMPONENTES = [
  'groupviewtable--ml-lcrud-detail-grid',
  'groupentertext--ml-enter-text',
  'groupselectone--ml-select',
  'groupselectone--ml-segmented-control',
  'groupenterdate--ml-date-picker',
  'groupentermoney--ml-enter-money-br',
  'grouptriggeraction--ml-button-standard',
];

// As listas de opções saem do próprio conjunto, em vez de exportar novas constantes do `dados.ts`
// — que outras quatro páginas do demotable consomem.
const DEPARTAMENTOS = [...new Set(FUNCIONARIOS.map((f) => f.departamento))].sort();
const CARGOS = [...new Set(FUNCIONARIOS.map((f) => f.cargo))].sort();
const SITUACOES: Funcionario['situacao'][] = ['Ativo', 'Férias', 'Afastado'];

// O dado nasce em `dd/mm/yyyy` e o ml-date-picker trabalha em ISO. A conversão fica AQUI, na
// página, e não no `dados.ts`: mudar o formato lá afetaria as outras páginas do demotable.
const paraIso = (br: string): string => {
  const [d, m, a] = br.split('/');
  return a && m && d ? `${a}-${m}-${d}` : '';
};
const paraBr = (iso: string): string => {
  const [a, m, d] = iso.split('-');
  return a && m && d ? `${d}/${m}/${a}` : '';
};

@customElement('demotable--funcionariosdetalhe-102053')
export class DemoTableFuncionariosDetalhe extends StateLitElement {
  /** 12 registros com 5 por página dão 3 páginas — o suficiente para testar abrir na página 2. */
  private readonly equipe = FUNCIONARIOS.slice(0, 12);

  /** Índices cujo registro já foi carregado. */
  @state() private carregados = new Set<number>();

  /** Índices em carregamento — é o que pinta o "carregando…". */
  @state() private carregando = new Set<number>();

  /** O que está salvo, por matrícula. O estado é da PÁGINA; a molécula não guarda valor. */
  @state() private registros: Record<string, Funcionario> = Object.fromEntries(
    FUNCIONARIOS.slice(0, 12).map((f) => [f.matricula, { ...f }]),
  );

  /** O registro em edição, isolado até salvar — é o que permite cancelar por inteiro. */
  @state() private rascunho: Funcionario | null = null;

  /** Liga o modo de edição da GRADE. Ela propaga para os campos do cenário. */
  @state() private editando = false;

  @state() private ultimoSalvo = '';

  /**
   * A molécula avisa que o registro abriu; a página busca o detalhe. A busca é simulada, mas o
   * formato é o de uma chamada real: pede, espera, e só então tem o conteúdo.
   */
  private onRowClick(e: Event): void {
    const indice = Number((e as CustomEvent).detail?.index);
    if (Number.isNaN(indice)) return;

    // Todo registro abre em LEITURA. Editar é um passo explícito.
    this.editando = false;
    this.ultimoSalvo = '';
    this.rascunho = { ...this.registros[this.equipe[indice].matricula] };
    if (this.carregados.has(indice) || this.carregando.has(indice)) return;

    this.carregando = new Set([...this.carregando, indice]);
    window.setTimeout(() => {
      const emCurso = new Set(this.carregando);
      emCurso.delete(indice);
      this.carregando = emCurso;
      this.carregados = new Set([...this.carregados, indice]);
    }, 600);
  }

  private alterar<K extends keyof Funcionario>(campo: K, valor: Funcionario[K]): void {
    if (!this.rascunho) return;
    this.rascunho = { ...this.rascunho, [campo]: valor };
  }

  private editar(): void {
    this.editando = true;
    this.ultimoSalvo = '';
  }

  private salvar(): void {
    if (!this.rascunho) return;
    const r = this.rascunho;
    this.registros = { ...this.registros, [r.matricula]: r };
    this.ultimoSalvo = r.nome;
    this.editando = false;
  }

  private cancelar(): void {
    if (!this.rascunho) return;
    this.rascunho = { ...this.registros[this.rascunho.matricula] };
    this.editando = false;
    this.ultimoSalvo = '';
  }

  private renderSituacao(situacao: Funcionario['situacao']): TemplateResult {
    const classe = situacao.toLowerCase().replace('é', 'e');
    return html`<span class="situacao ${classe}">${situacao}</span>`;
  }

  render(): TemplateResult {
    return html`
      <div class="page">
        <header class="head">
          <p class="eyebrow">Pessoas</p>
          <h1 class="title">Cadastro de funcionários</h1>
          <p class="subtitle">
            Clique na seta ao fim da linha para abrir o registro. A lista dá lugar ao cenário do
            funcionário, com a ficha inteira — e o botão <strong>Editar</strong> transforma a mesma
            ficha em formulário, sem trocar de tela.
          </p>
          <p class="subtitle">
            Quem alterna é o <code>is-editing</code> da grade: a molécula propaga para os
            componentes do cenário e <strong>cada campo se desenha</strong> como texto ou como
            campo. A página não toca no <code>is-editing</code> de campo nenhum.
          </p>
          <p class="subtitle">
            São 12 registros com 5 por página. Abra um funcionário na <strong>página 2</strong> e
            volte: a lista retorna na página 2, com a mesma ordenação. Ela é escondida, não
            desmontada.
          </p>
          <p class="componentes">
            <span>Componentes nesta tela:</span>
            ${COMPONENTES.map((c) => html`<code>${c}</code>`)}
          </p>
        </header>

        <groupviewtable--ml-lcrud-detail-grid
          page-size="5"
          .isEditing=${this.editando}
          @rowClick=${this.onRowClick}
        >
          <Caption>Funcionários</Caption>

          <TableHeader>
            <TableRow>
              <TableHead key="matricula" sortable>Matrícula</TableHead>
              <TableHead key="nome" sortable>Nome</TableHead>
              <TableHead key="departamento" sortable>Departamento</TableHead>
              <TableHead key="cargo">Cargo</TableHead>
              <TableHead key="salario" sortable>Salário</TableHead>
              <TableHead key="situacao">Situação</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            ${this.equipe.map((f, indice) => this.renderLinha(f.matricula, indice))}
          </TableBody>
        </groupviewtable--ml-lcrud-detail-grid>
      </div>
    `;
  }

  private renderLinha(matricula: string, indice: number): TemplateResult {
    const f = this.registros[matricula];
    return html`
      <TableRow>
        <TableCell>${f.matricula}</TableCell>
        <TableCell>${f.nome}</TableCell>
        <TableCell>${f.departamento}</TableCell>
        <TableCell>${f.cargo}</TableCell>
        <TableCell data-class="text-right" sort-value=${f.salario}>
          ${formatarMoeda(f.salario)}
        </TableCell>
        <TableCell>${this.renderSituacao(f.situacao)}</TableCell>

        <Detail label=${f.nome}>${this.renderCenario(indice)}</Detail>
      </TableRow>
    `;
  }

  private renderCenario(indice: number): TemplateResult {
    const f = this.equipe[indice];
    if (this.carregando.has(indice)) {
      return html`<p class="carregando">Carregando o cadastro de ${f.nome}…</p>`;
    }
    if (!this.carregados.has(indice)) return html``;

    const r = this.rascunho;
    if (!r || r.matricula !== f.matricula) return html``;

    return html`
      <div class="cenario">
        <div class="acoes">
          ${this.editando
            ? html`
                <grouptriggeraction--ml-button-standard
                  data-variant="primary"
                  size="xs"
                  @action=${() => this.salvar()}
                >
                  <Label>Salvar</Label>
                </grouptriggeraction--ml-button-standard>
                <grouptriggeraction--ml-button-standard
                  data-variant="ghost"
                  size="xs"
                  @action=${() => this.cancelar()}
                >
                  <Label>Cancelar</Label>
                </grouptriggeraction--ml-button-standard>
              `
            : html`
                <grouptriggeraction--ml-button-standard
                  data-variant="secondary"
                  size="xs"
                  @action=${() => this.editar()}
                >
                  <Label>Editar</Label>
                </grouptriggeraction--ml-button-standard>
              `}
        </div>

        ${this.ultimoSalvo
          ? html`<p class="resultado">Cadastro de ${this.ultimoSalvo} atualizado.</p>`
          : html``}

        <div class="form">
          <groupentertext--ml-enter-text readonly .value=${r.matricula}>
            <Label>Matrícula</Label>
            <Helper>Identificador do registro, não editável</Helper>
          </groupentertext--ml-enter-text>

          <groupentertext--ml-enter-text
            .value=${r.nome}
            @change=${(e: CustomEvent) => this.alterar('nome', e.detail.value)}
          >
            <Label>Nome</Label>
          </groupentertext--ml-enter-text>

          <groupselectone--ml-select
            .value=${r.departamento}
            @change=${(e: CustomEvent) => this.alterar('departamento', e.detail.value)}
          >
            <Label>Departamento</Label>
            ${DEPARTAMENTOS.map((d) => html`<Item value=${d}>${d}</Item>`)}
          </groupselectone--ml-select>

          <groupselectone--ml-select
            .value=${r.cargo}
            @change=${(e: CustomEvent) => this.alterar('cargo', e.detail.value)}
          >
            <Label>Cargo</Label>
            ${CARGOS.map((c) => html`<Item value=${c}>${c}</Item>`)}
          </groupselectone--ml-select>

          <groupenterdate--ml-date-picker
            .value=${paraIso(r.admissao)}
            @change=${(e: CustomEvent) => this.alterar('admissao', paraBr(e.detail.value))}
          >
            <Label>Admissão</Label>
          </groupenterdate--ml-date-picker>

          <groupentermoney--ml-enter-money-br
            .value=${r.salario}
            @change=${(e: CustomEvent) =>
              this.alterar('salario', parseFormattedNumber(e.detail.value) ?? r.salario)}
          >
            <Label>Salário</Label>
          </groupentermoney--ml-enter-money-br>

          <div class="form-largo">
            <groupselectone--ml-segmented-control
              .value=${r.situacao}
              @change=${(e: CustomEvent) =>
                this.alterar('situacao', e.detail.value as Funcionario['situacao'])}
            >
              <Label>Situação</Label>
              ${SITUACOES.map((s) => html`<Item value=${s}>${s}</Item>`)}
            </groupselectone--ml-segmented-control>
          </div>
        </div>
      </div>
    `;
  }
}
