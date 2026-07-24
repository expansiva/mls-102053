/// <mls fileReference="_102053_/l2/molecules/groupselectone/ml-dial-select-brutal.ts" enhancement="_102020_/l2/enhancementAura"/>
// =============================================================================
// DIAL SELECT — BRUTALISM (mls-102053)
// =============================================================================
// Skill Group: groupSelectOne
// Casca (estratégia D): herda tudo de DialSelectMolecule (mls-102040),
// inclusive render() — o markup base emite classes semânticas ml-*; a aparência
// vem do .less irmão, escopado sob esta tag.
// This molecule does NOT contain business logic.
import { customElement } from 'lit/decorators.js';
import { DialSelectMolecule } from '/_102040_/l2/molecules/groupselectone/ml-dial-select.js';

@customElement('groupselectone--ml-dial-select-brutal')
export class DialSelectMoleculeBrutal extends DialSelectMolecule {}
