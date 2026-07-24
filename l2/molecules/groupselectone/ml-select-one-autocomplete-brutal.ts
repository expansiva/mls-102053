/// <mls fileReference="_102053_/l2/molecules/groupselectone/ml-select-one-autocomplete-brutal.ts" enhancement="_102020_/l2/enhancementAura"/>
// =============================================================================
// SELECT ONE AUTOCOMPLETE — BRUTALISM (mls-102053)
// =============================================================================
// Skill Group: groupSelectOne
// Casca (estratégia D): herda tudo de SelectOneAutocompleteMolecule (mls-102040),
// inclusive render() — o markup base emite classes semânticas ml-*; a aparência
// vem do .less irmão, escopado sob esta tag.
// This molecule does NOT contain business logic.
import { customElement } from 'lit/decorators.js';
import { SelectOneAutocompleteMolecule } from '/_102040_/l2/molecules/groupselectone/ml-select-one-autocomplete.js';

@customElement('groupselectone--ml-select-one-autocomplete-brutal')
export class SelectOneAutocompleteMoleculeBrutal extends SelectOneAutocompleteMolecule {}
