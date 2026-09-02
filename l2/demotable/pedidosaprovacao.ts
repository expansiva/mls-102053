/// <mls fileReference="_102053_/l2/demotable/pedidosaprovacao.ts" enhancement="_102020_/l2/enhancementAura"/>
// Página N2 de `todo/ajuste-contrato-view-table/plano-fechamento-groupviewtable-2.md` §4.4 —
// "verbo fora do vocabulário", a rota genérica de `rowAction`.
//
// O prompt original usa uma tabela de pedidos com "aprovar" e "duplicar", mas o alvo certo NÃO é a
// `ml-side-detail-table`: ela declara `RowActions`/`RowAction` na lista de slots por herança do
// boilerplate do grupo, mas não lê nenhum — não emite `rowAction`, não tem vocabulário de ação
// nenhum. Só a `ml-record-form-table` implementa isso de verdade. É o alvo desta página.
//
// `aprovar` e `duplicar` não pertencem ao vocabulário do grupo (`edit`/`delete`/`save`/`cancel`/
// `new`), então a molécula deve rotear os dois pelo evento genérico `rowAction`, com o verbo
// LITERAL em `detail.action` — nunca reaproveitando `edit` ou inventando um slot novo.
//
// O registro de eventos é o instrumento do teste: TODOS os eventos de ciclo de vida
// (`edit`/`save`/`cancel`/`delete`/`newRecord`) estão ligados ao mesmo log que `rowAction` — se
// algum deles aparecer ao clicar em "Aprovar" ou "Duplicar", a rota genérica não pegou.
import { html, TemplateResult } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { StateLitElement } from '/_102029_/l2/stateLitElement.js';

import '/_102040_/l2/molecules/groupviewtable/ml-record-form-table';
import '/_102040_/l2/molecules/grouptriggeraction/ml-button-standard';

import { PEDIDOS, Pedido, formatarMoeda, totalDoPedido } from '/_102053_/l2/demotable/dados.js';

const COMPONENTES = ['groupviewtable--ml-record-form-table', 'grouptriggeraction--ml-button-standard'];

interface Linha {
  chave: string;
  pedido: Pedido;
}

const BASE: Linha[] = PEDIDOS.slice(0, 6).map((pedido) => ({ chave: pedido.id, pedido }));

@customElement('demotable--pedidosaprovacao-102053')
export class DemoTablePedidosAprovacao extends StateLitElement {
  @state() private linhas: Linha[] = BASE;

  @state() private aprovados = new Set<string>();

  @state() private duplicacoes = 0;

  @state() private registro: string[] = [];

  private anotar(evento: string, detalhe: unknown): void {
    const linha = `${evento} — ${JSON.stringify(detalhe)}`;
    this.registro = [linha, ...this.registro].slice(0, 14);
  }

  /** Única rota de verbo: tudo que não é do vocabulário do grupo cai aqui, com o nome literal. */
  private onRowAction(e: Event): void {
    const { key, action } = (e as CustomEvent).detail as { key: string; action: string };
    this.anotar('rowAction', { key, action });

    if (action === 'aprovar') {
      this.aprovados = new Set([...this.aprovados, key]);
      return;
    }
    if (action === 'duplicar') {
      const original = this.linhas.find((l) => l.chave === key);
      if (!original) return;
      this.duplicacoes += 1;
      const chave = `${original.pedido.id}-DUP${this.duplicacoes}`;
      this.linhas = [...this.linhas, { chave, pedido: { ...original.pedido, id: chave } }];
    }
  }

  // Ligados ao MESMO log — se um destes aparecer para um clique em "Aprovar"/"Duplicar", a rota
  // genérica não pegou e o verbo foi lido como parte do vocabulário fixo do grupo.
  private onEdit(e: Event): void { this.anotar('edit (inesperado)', (e as CustomEvent).detail); }
  private onSave(e: Event): void { this.anotar('save (inesperado)', (e as CustomEvent).detail); }
  private onCancel(e: Event): void { this.anotar('cancel (inesperado)', (e as CustomEvent).detail); }
  private onDelete(e: Event): void { this.anotar('delete (inesperado)', (e as CustomEvent).detail); }
  private onNewRecord(e: Event): void { this.anotar('newRecord (inesperado)', (e as CustomEvent).detail); }

  private restaurar(): void {
    this.linhas = BASE;
    this.aprovados = new Set();
    this.duplicacoes = 0;
    this.registro = [];
  }

  render(): TemplateResult {
    return html`
      <div class="page">
        <header class="head">
          <p class="eyebrow">Comercial</p>
          <h1 class="title">Pedidos — ações fora do vocabulário</h1>
          <p class="subtitle">
            Cada linha tem <strong>Aprovar</strong> e <strong>Duplicar</strong> — nenhum dos dois é
            <code>edit</code>/<code>delete</code>/<code>save</code>/<code>cancel</code>/<code>new</code>.
            A tabela deve emitir <code>rowAction</code> com o verbo literal em
            <code>detail.action</code>, sem inventar um slot novo nem reaproveitar um verbo do
            vocabulário fixo.
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
        </div>

        <groupviewtable--ml-record-form-table
          @rowAction=${this.onRowAction}
          @edit=${this.onEdit}
          @save=${this.onSave}
          @cancel=${this.onCancel}
          @delete=${this.onDelete}
          @newRecord=${this.onNewRecord}
        >
          <Caption>Pedidos pendentes de aprovação</Caption>

          <TableHeader>
            <TableRow>
              <TableHead key="id" sortable>Pedido</TableHead>
              <TableHead key="cliente" sortable>Cliente</TableHead>
              <TableHead key="total" sortable>Total</TableHead>
              <TableHead key="status">Status</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            ${this.linhas.map((linha) => this.renderLinha(linha))}
          </TableBody>

          <Empty>Nenhum pedido pendente.</Empty>
        </groupviewtable--ml-record-form-table>

        <section class="registro">
          <h2 class="registro-titulo">Eventos emitidos pela tabela</h2>
          <p class="nota">
            Só <code>rowAction</code> deve aparecer para estes cliques. Qualquer linha marcada
            "(inesperado)" é regressão: o verbo caiu no vocabulário fixo em vez da rota genérica.
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

  private renderLinha(linha: Linha): TemplateResult {
    const { pedido } = linha;
    const aprovado = this.aprovados.has(linha.chave);
    const total = totalDoPedido(pedido);

    return html`
      <TableRow key=${linha.chave}>
        <TableCell>${pedido.id}</TableCell>
        <TableCell>${pedido.cliente}</TableCell>
        <TableCell data-class="text-right" sort-value=${total}>${formatarMoeda(total)}</TableCell>
        <TableCell>
          ${aprovado ? html`<span class="status aprovado">Aprovado</span>` : html`<span class="status pendente">${pedido.status}</span>`}
        </TableCell>

        <RowActions>
          <RowAction action="aprovar">
            <grouptriggeraction--ml-button-standard data-variant="primary" size="xs">
              <Label>Aprovar</Label>
            </grouptriggeraction--ml-button-standard>
          </RowAction>
          <RowAction action="duplicar">
            <grouptriggeraction--ml-button-standard data-variant="ghost" size="xs">
              <Label>Duplicar</Label>
            </grouptriggeraction--ml-button-standard>
          </RowAction>
        </RowActions>
      </TableRow>
    `;
  }
}
