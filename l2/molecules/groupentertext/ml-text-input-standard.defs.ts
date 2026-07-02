/// <mls fileReference="_102053_/l2/molecules/groupentertext/ml-text-input-standard.defs.ts" enhancement="_blank" />

// Do not change – automatically generated code. 

export const group = 'groupEnterText';
export const skill = `# Metadata
- TagName: groupentertext--ml-text-input-standard
# Objective
Permitir que o usuário informe e visualize textos como nome, endereço e outros dados textuais, com suporte a modos de edição e visualização, máscara, validações e estados de feedback.
# Responsibilities
- Armazenar e emitir o valor como texto.
- Renderizar um campo de linha única quando a quantidade de linhas for 1 e um campo multilinha quando for maior que 1.
- Emitir evento de entrada a cada alteração durante a digitação com o valor atual.
- Emitir evento de mudança ao perder o foco ou confirmar a entrada com o valor atual.
- Emitir eventos de foco e perda de foco quando o campo receber ou perder foco.
- Suportar modo de edição com campo interativo e modo de visualização com texto estático.
- Em modo de visualização, exibir “—” quando o valor estiver vazio; para tipo senha, exibir “••••••••”; caso contrário, exibir o valor textual.
- Respeitar estados desabilitado, somente leitura, obrigatório e carregando, bloqueando interações quando aplicável e indicando carregamento.
- Respeitar o limite máximo de caracteres e sinalizar erro quando o valor estiver abaixo do mínimo.
- Exibir contador de caracteres no formato “atual / máximo” quando houver limite máximo e múltiplas linhas.
- Aplicar máscara de entrada quando fornecida, exibindo o valor formatado e armazenando apenas os caracteres brutos.
- Exibir mensagem de erro quando houver conteúdo de erro e nunca exibir erro em modo de visualização.
- Renderizar conteúdo opcional de rótulo, ajuda, prefixo e sufixo nas posições adequadas: rótulo acima, ajuda/erro abaixo, prefixo antes do campo e sufixo depois do campo.
- Propagar atributos de placeholder, autocomplete, tipo de entrada, nome, tamanho mínimo e máximo conforme definidos para o componente.
# Constraints
- Não permitir interação quando estiver desabilitado, somente leitura ou carregando.
- Não permitir que o valor ultrapasse o limite máximo de caracteres.
- Em modo de visualização, não exibir bordas, fundo, foco ou mensagem de erro.
# Notes
- O contador de caracteres é exibido apenas quando há limite máximo e múltiplas linhas.`;

