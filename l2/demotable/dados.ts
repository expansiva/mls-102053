/// <mls fileReference="_102053_/l2/demotable/dados.ts" enhancement="_blank" />

// Dados das páginas de demonstração do GroupViewTable.
//
// Existe como módulo separado porque o contrato do grupo tem um modo EXTERNO em que a página
// ordena e fatia (skills/groupViewTable/creation.ts §9). Concentrar isso aqui evita repetir a
// mesma lógica em cada página e deixa as páginas comparáveis entre si.
//
// Tudo é DETERMINÍSTICO: os números são gerados por um LCG com semente fixa, então a mesma tela
// aparece em toda recarga. Numa apresentação isso importa — ninguém quer explicar por que o total
// mudou entre um slide e outro.

// =============================================================================
// FORMATAÇÃO
// =============================================================================

export function formatarMoeda(valor: number): string {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

// =============================================================================
// GERADOR DETERMINÍSTICO
// =============================================================================

function criarSorteio(semente: number) {
  let estado = semente;
  return (min: number, max: number): number => {
    estado = (estado * 1103515245 + 12345) & 0x7fffffff;
    return min + (estado % (max - min + 1));
  };
}

// =============================================================================
// VENDAS DO MÊS — página `vendasmensal`
// =============================================================================

/** Colunas do relatório. Canal, e não mês, para que reordenar coluna faça sentido. */
export const CANAIS = ['Loja', 'E-commerce', 'Marketplace', 'Televendas'] as const;
export type Canal = (typeof CANAIS)[number];

export interface VendaProduto {
  produto: string;
  categoria: string;
  /** Valor vendido por canal, em reais. */
  porCanal: Record<Canal, number>;
}

const PRODUTOS_VENDAS: Array<[string, string]> = [
  ['Notebook Pro 14', 'Informática'],
  ['Monitor 27 4K', 'Informática'],
  ['Teclado Mecânico', 'Periféricos'],
  ['Mouse Ergonômico', 'Periféricos'],
  ['Headset Studio', 'Áudio'],
  ['Caixa de Som Bluetooth', 'Áudio'],
  ['Cadeira Ergonômica', 'Mobiliário'],
  ['Mesa Ajustável', 'Mobiliário'],
  ['Webcam Full HD', 'Periféricos'],
  ['Impressora Laser', 'Escritório'],
  ['Nobreak 1200VA', 'Energia'],
  ['SSD 1TB', 'Informática'],
  ['Hub USB-C', 'Periféricos'],
  ['Tablet 11', 'Informática'],
  ['Suporte de Monitor', 'Mobiliário'],
];

export const VENDAS_DO_MES: VendaProduto[] = (() => {
  const sorteia = criarSorteio(20260804);
  return PRODUTOS_VENDAS.map(([produto, categoria]) => ({
    produto,
    categoria,
    porCanal: {
      Loja: sorteia(8, 90) * 1000 + sorteia(0, 99) * 10,
      'E-commerce': sorteia(15, 140) * 1000 + sorteia(0, 99) * 10,
      Marketplace: sorteia(4, 70) * 1000 + sorteia(0, 99) * 10,
      Televendas: sorteia(1, 25) * 1000 + sorteia(0, 99) * 10,
    },
  }));
})();

/** Mês de referência do relatório — vai no título, já que as colunas são canais. */
export const MES_REFERENCIA = 'julho de 2026';

// =============================================================================
// ESTOQUE — páginas de agrupamento (fase 2)
// =============================================================================

export interface ItemEstoque {
  codigo: string;
  descricao: string;
  categoria: string;
  fornecedor: string;
  deposito: string;
  quantidade: number;
  precoUnitario: number;
}

const CATEGORIAS = ['Informática', 'Periféricos', 'Áudio', 'Mobiliário', 'Escritório', 'Energia'];
const FORNECEDORES = ['Tecnova', 'Global Parts', 'Suprimix', 'AlphaTech', 'NorteSupply'];
const DEPOSITOS = ['Matriz', 'CD Sul', 'CD Norte', 'Loja 1'];

export const ESTOQUE: ItemEstoque[] = (() => {
  const sorteia = criarSorteio(97531);
  return Array.from({ length: 120 }, (_, i) => ({
    codigo: `PRD-${String(i + 1).padStart(4, '0')}`,
    descricao: `${PRODUTOS_VENDAS[i % PRODUTOS_VENDAS.length][0]} ${String.fromCharCode(65 + (i % 26))}`,
    categoria: CATEGORIAS[sorteia(0, CATEGORIAS.length - 1)],
    fornecedor: FORNECEDORES[sorteia(0, FORNECEDORES.length - 1)],
    deposito: DEPOSITOS[sorteia(0, DEPOSITOS.length - 1)],
    quantidade: sorteia(0, 480),
    precoUnitario: sorteia(29, 4800) + sorteia(0, 99) / 100,
  }));
})();

// =============================================================================
// FUNCIONÁRIOS — páginas de listagem, seleção e edição (fase 2)
// =============================================================================

export interface Funcionario {
  matricula: string;
  nome: string;
  departamento: string;
  cargo: string;
  admissao: string;
  salario: number;
  situacao: 'Ativo' | 'Férias' | 'Afastado';
}

const NOMES = [
  'Ana Souza', 'Bruno Lima', 'Carla Nunes', 'Diego Alves', 'Elisa Prado',
  'Fábio Rocha', 'Gabriela Reis', 'Henrique Dias', 'Isabel Moraes', 'João Pedro',
  'Karina Melo', 'Lucas Barros', 'Marina Castro', 'Nelson Faria', 'Olívia Ramos',
];
const DEPARTAMENTOS = ['Engenharia', 'Comercial', 'Financeiro', 'Suporte', 'Marketing'];
const CARGOS = ['Analista', 'Especialista', 'Coordenador', 'Assistente', 'Gerente'];
const SITUACOES: Funcionario['situacao'][] = ['Ativo', 'Ativo', 'Ativo', 'Férias', 'Afastado'];

export const FUNCIONARIOS: Funcionario[] = (() => {
  const sorteia = criarSorteio(13579);
  return Array.from({ length: 60 }, (_, i) => {
    const dia = sorteia(1, 28);
    const mes = sorteia(1, 12);
    const ano = sorteia(2015, 2025);
    return {
      matricula: `F${String(1000 + i)}`,
      // Nome SORTEADO, não `NOMES[i % ...]`. A lista está em ordem alfabética, então percorrê-la
      // em sequência produzia um conjunto já ordenado por nome — e uma demonstração de ordenação
      // em que clicar no cabeçalho não muda nada. O sufixo mantém os nomes distintos.
      nome: `${NOMES[sorteia(0, NOMES.length - 1)]} ${String.fromCharCode(65 + (i % 26))}.`,
      departamento: DEPARTAMENTOS[sorteia(0, DEPARTAMENTOS.length - 1)],
      cargo: CARGOS[sorteia(0, CARGOS.length - 1)],
      admissao: `${String(dia).padStart(2, '0')}/${String(mes).padStart(2, '0')}/${ano}`,
      salario: sorteia(3200, 22000) + sorteia(0, 99) / 100,
      situacao: SITUACOES[sorteia(0, SITUACOES.length - 1)],
    };
  });
})();

// =============================================================================
// CLIENTES — página `clientessaldo` (célula com bandeira + país)
// =============================================================================

export interface Cliente {
  nome: string;
  email: string;
  pais: string;
  /** Bandeira como emoji: sem arquivo, sem rede — a página do harness é autocontida. */
  bandeira: string;
  saldo: number;
}

export const CLIENTES: Cliente[] = [
  { nome: 'Marina Duarte', email: 'marina.duarte@nortex.com', pais: 'Brasil', bandeira: '🇧🇷', saldo: 12480.9 },
  { nome: 'Owen Fletcher', email: 'owen.fletcher@lumenar.co.uk', pais: 'Reino Unido', bandeira: '🇬🇧', saldo: -845.2 },
  { nome: 'Yuki Tanaka', email: 'yuki.tanaka@sakuralab.jp', pais: 'Japão', bandeira: '🇯🇵', saldo: 30215.0 },
  { nome: 'Sofia Ricci', email: 'sofia.ricci@vialume.it', pais: 'Itália', bandeira: '🇮🇹', saldo: 7620.45 },
  { nome: 'Lucas Meyer', email: 'lucas.meyer@hafen.de', pais: 'Alemanha', bandeira: '🇩🇪', saldo: 0 },
  { nome: 'Camille Roux', email: 'camille.roux@atelier.fr', pais: 'França', bandeira: '🇫🇷', saldo: 18930.75 },
  { nome: 'Diego Salas', email: 'diego.salas@andesmar.cl', pais: 'Chile', bandeira: '🇨🇱', saldo: -2310.6 },
  { nome: 'Aisha Khan', email: 'aisha.khan@zenithsys.ca', pais: 'Canadá', bandeira: '🇨🇦', saldo: 45120.3 },
  { nome: 'Peter Novak', email: 'peter.novak@vltava.cz', pais: 'Tchéquia', bandeira: '🇨🇿', saldo: 990.1 },
  { nome: 'Ana Beatriz Lima', email: 'ana.lima@nortex.com', pais: 'Brasil', bandeira: '🇧🇷', saldo: 26540.0 },
];

// =============================================================================
// COLABORADORES — página `equipemedia` (célula com foto + nome + e-mail)
// =============================================================================

export interface Colaborador {
  nome: string;
  email: string;
  /** Iniciais e cor do avatar. Sem imagem externa, pelo mesmo motivo da bandeira. */
  iniciais: string;
  cor: string;
  empresa: string;
  cargo: string;
  salario: number;
}

export const COLABORADORES: Colaborador[] = [
  { nome: 'Marina Duarte', email: 'marina.duarte@nortex.com', iniciais: 'MD', cor: '#3b82f6', empresa: 'Nortex', cargo: 'Product Designer', salario: 14200 },
  { nome: 'Owen Fletcher', email: 'owen.fletcher@lumenar.co', iniciais: 'OF', cor: '#8b5cf6', empresa: 'Lumenar', cargo: 'Backend Engineer', salario: 18600 },
  { nome: 'Yuki Tanaka', email: 'yuki.tanaka@sakuralab.jp', iniciais: 'YT', cor: '#ec4899', empresa: 'Sakura Lab', cargo: 'Data Scientist', salario: 21150 },
  { nome: 'Sofia Ricci', email: 'sofia.ricci@vialume.it', iniciais: 'SR', cor: '#f59e0b', empresa: 'Vialume', cargo: 'QA Lead', salario: 12800 },
  { nome: 'Lucas Meyer', email: 'lucas.meyer@hafen.de', iniciais: 'LM', cor: '#10b981', empresa: 'Hafen', cargo: 'Tech Writer', salario: 9700 },
  { nome: 'Camille Roux', email: 'camille.roux@atelier.fr', iniciais: 'CR', cor: '#ef4444', empresa: 'Atelier', cargo: 'Engineering Manager', salario: 24300 },
  { nome: 'Diego Salas', email: 'diego.salas@andesmar.cl', iniciais: 'DS', cor: '#0ea5e9', empresa: 'Andesmar', cargo: 'Frontend Engineer', salario: 15400 },
  { nome: 'Aisha Khan', email: 'aisha.khan@zenithsys.ca', iniciais: 'AK', cor: '#14b8a6', empresa: 'Zenith Systems', cargo: 'Solutions Architect', salario: 26900 },
];

// =============================================================================
// PEDIDOS — página `pedidosdetalhe` (tabela com linha de detalhe sob demanda)
// =============================================================================

export type StatusPedido = 'Shipped' | 'Processing' | 'Delivered' | 'Cancelled' | 'Pending';

export interface ItemPedido {
  produto: string;
  categoria: string;
  preco: number;
  quantidade: number;
}

export interface Pedido {
  id: string;
  cliente: string;
  email: string;
  iniciais: string;
  cor: string;
  status: StatusPedido;
  itens: ItemPedido[];
}

const CATALOGO: Array<[string, string, number]> = [
  ['Notebook Pro 14', 'Informática', 8990.0],
  ['Monitor 27 4K', 'Informática', 2740.5],
  ['Teclado Mecânico', 'Periféricos', 689.9],
  ['Mouse Ergonômico', 'Periféricos', 349.9],
  ['Headset Studio', 'Áudio', 1290.0],
  ['Cadeira Ergonômica', 'Mobiliário', 3450.0],
  ['Webcam Full HD', 'Periféricos', 799.0],
  ['SSD 1TB', 'Informática', 619.9],
  ['Nobreak 1200VA', 'Energia', 1180.0],
  ['Hub USB-C', 'Periféricos', 429.9],
];

const STATUS: StatusPedido[] = ['Shipped', 'Processing', 'Delivered', 'Cancelled', 'Pending'];

export const PEDIDOS: Pedido[] = (() => {
  const sorteia = criarSorteio(24680);
  return COLABORADORES.map((p, i) => {
    const quantos = sorteia(4, 7);
    const itens: ItemPedido[] = Array.from({ length: quantos }, () => {
      const [produto, categoria, preco] = CATALOGO[sorteia(0, CATALOGO.length - 1)];
      return { produto, categoria, preco, quantidade: sorteia(1, 6) };
    });
    return {
      id: `PED-${String(3100 + i)}`,
      cliente: p.nome,
      email: p.email,
      iniciais: p.iniciais,
      cor: p.cor,
      status: STATUS[sorteia(0, STATUS.length - 1)],
      itens,
    };
  });
})();

export function totalDoPedido(pedido: Pedido): number {
  return pedido.itens.reduce((soma, item) => soma + item.preco * item.quantidade, 0);
}

export function itensDoPedido(pedido: Pedido): number {
  return pedido.itens.reduce((soma, item) => soma + item.quantidade, 0);
}

// =============================================================================
// CONSULTA PAGINADA — para as páginas que usarem o modo EXTERNO
// =============================================================================

export interface Consulta<T> {
  pagina: number;
  tamanho: number;
  ordem?: keyof T | '';
  direcao?: 'asc' | 'desc';
}

/**
 * Simula o que um BFF devolveria: a página pedida e o total do conjunto. As páginas que usarem o
 * modo EXTERNO alimentam a molécula com isto e informam `total-items` com o `total`.
 */
export function consultarPagina<T>(fonte: T[], consulta: Consulta<T>): { linhas: T[]; total: number } {
  const { pagina, tamanho, ordem, direcao } = consulta;
  let dados = fonte;

  if (ordem) {
    const dir = direcao === 'desc' ? -1 : 1;
    dados = [...fonte].sort((a, b) => {
      const va = a[ordem];
      const vb = b[ordem];
      if (typeof va === 'number' && typeof vb === 'number') return (va - vb) * dir;
      return String(va).localeCompare(String(vb), 'pt-BR', { numeric: true, sensitivity: 'base' }) * dir;
    });
  }

  const inicio = (pagina - 1) * tamanho;
  return { linhas: dados.slice(inicio, inicio + tamanho), total: fonte.length };
}
